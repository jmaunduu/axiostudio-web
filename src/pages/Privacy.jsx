import React, { useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black">

            <Navbar />

            {/* Cinematic Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter-privacy">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter-privacy)" />
                </svg>
            </div>

            <div className="w-full max-w-4xl mx-auto px-6 pt-40 pb-32 flex-grow flex flex-col gap-12 relative z-10">
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-white/40">Legal Protocol</span>
                    <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight leading-[1.05]">
                        Privacy Policy
                    </h1>
                </div>

                <div className="flex flex-col gap-8 text-white/70 font-light leading-relaxed">
                    <p>Last updated: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-serif text-white">1. Information Collection</h2>
                        <p>We collect information that you provide directly to us, including your name, email address, phone number, and business details when you book a consultation or submit a contact inquiry.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-serif text-white">2. Use of Information</h2>
                        <p>The information we collect is used strictly for the purpose of communicating with you regarding your inquiry, scheduling consultations, and architecting your custom voice pipeline. We do not sell your personal data.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-serif text-white">3. Third-Party Services</h2>
                        <p>We utilize third-party services such as Cal.com for scheduling. By using these embedded features, you are also subject to their respective privacy policies and terms of service.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default Privacy;
