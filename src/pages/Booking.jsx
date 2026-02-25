import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Cal, { getCalApi } from "@calcom/embed-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Booking = () => {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.booking-header', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });
        });
        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "axiostudio-voice-ai-discovery-call" });
            cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col items-center selection:bg-white selection:text-black">

            <Navbar />

            {/* Cinematic Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <filter id="noise-booking">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.2 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise-booking)" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="w-full max-w-5xl mx-auto px-4 pt-32 pb-24 flex flex-col gap-12 flex-grow relative z-10 items-center">

                {/* Header Text */}
                <div className="flex flex-col gap-4 text-center items-center">
                    <span className="booking-header font-mono text-xs tracking-widest uppercase text-white/40">Secure Your Allocation</span>
                    <h1 className="booking-header text-5xl md:text-6xl font-serif font-light tracking-tight leading-tight">
                        Discovery Protocol
                    </h1>
                    <p className="booking-header text-lg font-sans font-light text-white/60 max-w-lg mt-2 leading-relaxed">
                        Select a time below for a focused technical consultation. We will audit your current call volume and architect a custom voice pipeline.
                    </p>
                </div>

                {/* Cal.com Embed Container */}
                <div className="booking-header w-full flex justify-center mt-8">
                    <div className="w-full overflow-hidden rounded-[2rem] shadow-2xl border border-white/5 bg-[#111116] sm:p-2">
                        <Cal
                            namespace="axiostudio-voice-ai-discovery-call"
                            calLink="joelkakundi/axiostudio-voice-ai-discovery-call"
                            style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "650px" }}
                            config={{ "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "theme": "dark" }}
                        />
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
};

export default Booking;
