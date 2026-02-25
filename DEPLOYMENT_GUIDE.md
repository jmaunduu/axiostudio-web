# Axiostudio Deployment & Hosting Guide

This guide walks you through the exact steps to take this perfectly built local project and put it live on the internet for free (or extremely cheap) without breaking the premium aesthetic or zero-lag Voice AI.

---

## 🏗 Phase 0: The Architecture

You actually have **two** separate programs running in this folder:
1. **The Frontend (Vite + React):** The beautiful cinematic UI you see. We will host this on **Vercel** (the absolute best platform for React).
2. **The Backend (Node.js Express):** The invisible security guard (`server.js`) that hides your Retell API key and handles the `get-retell-token` requests. We will host this on **Render** (the best free platform for always-on servers).

*Why not Railway?* Railway is amazing, but they recently removed their free tier. Render is the undeniable winner for free backend hosting.

---

## 🐙 Phase 1: Set Up GitHub (Your Cloud Backup)

Vercel and Render don't want you to upload zip files. They want to connect directly to your GitHub account so that every time you save a file, the website updates automatically (CI/CD).

**Step 1: Save your Local Code**
Open your terminal inside the `axiostudio-calm` folder and run:
```bash
git init
git add .
git commit -m "First cinematic release"
```

**Step 2: Push to GitHub**
1. Go to **github.com** and log in (or create an account).
2. Click the **`+`** icon in the top right -> **New Repository**.
3. Name it `axiostudio-web` and click **Create**.
4. GitHub will give you terminal commands that look like this under "push an existing repository". Run them in your terminal:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/axiostudio-web.git
   git push -u origin main
   ```
*Boom. Your code is now safely backed up in the cloud.*

---

## 🛡️ Phase 2: Deploy the Backend (The Proxy) to Render

We have to deploy the backend **first** so it can give us a public URL that the frontend can talk to.

1. Go to **render.com** and login with GitHub.
2. Click **New +** -> **Web Service**.
3. Select "Build and deploy from a Git repository."
4. Connect the `axiostudio-web` repository you just made.
5. Setup the deployment:
   - **Name:** `axiostudio-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
6. Scroll down to **Environment Variables** and click Add:
   - Key: `RETELL_API_KEY` | Value: `your-private-key`
   - Key: `RETELL_AGENT_ID` | Value: `your-agent-id`
7. Click **Create Web Service**.

Wait about 3 minutes. Render will give you a live URL at the top left (like `https://axiostudio-api.onrender.com`). **Copy this URL**.

---

## 🎬 Phase 3: Connect Frontend to Backend

Now we need to tell the cinematic UI where the live backend lives (since it's no longer on `localhost:3111`).

1. In your local code editor, open `vite.config.js`.
2. Delete the entire `proxy` section. You don't need proxies in production.
   ```javascript
   // Change this:
   export default defineConfig({
     plugins: [react()],
     // DELETE the server block completely
   });
   ```
3. Open `src/components/VoiceSandbox.jsx`.
4. Find the fetch call on **line 78**:
   ```javascript
   // Change from this:
   const response = await fetch('/api/get-retell-token', { ... })
   
   // EXACTLY to this (using your copied Render URL):
   const response = await fetch('https://axiostudio-api.onrender.com/api/get-retell-token', { ... })
   ```
5. Save the files, push the update to GitHub:
   ```bash
   git add .
   git commit -m "Connected to live Render backend"
   git push
   ```

---

## 🚀 Phase 4: Deploy the Frontend to Vercel

1. Go to **vercel.com** and login with GitHub.
2. Click **Add New** -> **Project**.
3. Select your `axiostudio-web` repository and click **Import**.
4. Leave all settings exactly as they are (Framework: Vite).
5. Click **Deploy**.

Wait 1 minute. Vercel will give you a live URL (like `https://axiostudio-web.vercel.app`). Your beautiful site is now live on the internet! 

---

## 🌐 Phase 5: Pointing Your GHL Domain to Vercel

You said your domain is currently hooked up to GoHighLevel (GHL). 

**What happens to GHL?**
Nothing "happens" to GHL itself; it just stops being your primary website. You can still use GHL for your CRM, funnels, and email marketing. You just can't have your homepage (`axiostudioai.com`) point to two places at once. We are re-routing the *Domain Name System (DNS)*.

**How to re-route to Vercel:**
1. Log in to wherever you actually *bought* the domain name (Namecheap, GoDaddy, Cloudflare, etc.).
2. Find the **DNS Settings** or **DNS Management** page.
3. You will see an `A Record` or `CNAME` pointing to GoHighLevel (usually `flash.funnels.msgsndr.com`). **Delete those GHL records**.
4. Go back to Vercel. Go to your project -> **Settings** -> **Domains**.
5. Type in your domain (`axiostudioai.com`) and click Add.
6. Vercel will explicitly show you the exact Name (Hostname) and Value to paste into your DNS Settings.
7. Go back to your domain provider, add the new `A Record` pointing to Vercel's IP address (usually `76.76.21.21`), and a `CNAME` for `www` pointing to `cname.vercel-dns.com`.

*Note: DNS changes can take a few hours to propagate. Be patient.*

---

## 🔮 The Future: Making Safe Updates

Because Vercel is tied to your GitHub, updating the site is magical:

1. Open your code locally. Change some text, or add a beautiful new picture.
2. In the terminal run:
   ```bash
   git add .
   git commit -m "Changed the hero text"
   git push
   ```
3. The very second you press push, **Vercel instantly detects the change, rebuilds the site, and updates the live internet version automatically**. You never need to touch FTP servers or upload zips ever again.
