import React, { useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black">

            <Navbar />

            {/* Cinematic Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter-terms">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter-terms)" />
                </svg>
            </div>

            <div className="w-full max-w-4xl mx-auto px-6 pt-40 pb-32 flex-grow flex flex-col gap-12 relative z-10">
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-white/40">Legal Protocol</span>
                    <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight leading-[1.05]">
                        Terms of Service
                    </h1>
                </div>

                <div className="flex flex-col gap-8 text-white/70 font-light leading-relaxed">
                    <p>Last updated: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-serif text-white">1. Agreement to Terms</h2>
                        <p>By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-serif text-white">2. Architectural Services</h2>
                        <p>Axiostudio provides custom Voice AI architecture and consulting services. Deliverables, timelines, and payment structures for specific projects will be outlined in explicit Statements of Work (SOW) independent of this website.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-serif text-white">3. Intellectual Property</h2>
                        <p>The original content, features, and functionality of this website are owned by Axiostudio. Client-specific pipelines engineered by us remain the property of the client upon final delivery, subject to their respective SOWs.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default Terms;
