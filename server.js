import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting to prevent abuse of the Retell API proxy
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', apiLimiter);

const PORT = process.env.PORT || 3111; // 3111 to avoid any Vite port conflicts

// Endpoint to fetch the Retell Web Call Token securely
app.post('/api/get-retell-token', async (req, res) => {
    try {
        const apiKey = process.env.RETELL_API_KEY;
        const agentId = process.env.RETELL_AGENT_ID;

        if (!apiKey || !agentId) {
            return res.status(500).json({ error: "Server missing Retell configuration." });
        }

        // Retell API endpoint for creating a web call structure and fetching the token
        const response = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                agent_id: agentId,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create web call");
        }

        const data = await response.json();

        // Return the access token to the frontend
        res.json({ accessToken: data.access_token });

    } catch (error) {
        console.error("Retell Token Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/test', (req, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
    console.error("EXPRESS ERROR CATCHER:", err);
    res.status(500).json({ expressCatcher: err.message });
});

app.listen(PORT, () => {
    console.log(`Secure Backend Server running on port ${PORT}`);
});
