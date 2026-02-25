import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.about-animate', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.1
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black">

            <Navbar />

            {/* Cinematic Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <filter id="noise-about">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.2 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise-about)" />
                </svg>
            </div>

            {/* Hero Section */}
            <section className="w-full px-4 pt-32 pb-16 flex flex-col items-center text-center relative z-10">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <span className="about-animate font-mono text-xs tracking-widest uppercase text-white/40">The Axiostudio Philosophy</span>
                    <h1 className="about-animate text-5xl md:text-7xl lg:text-[100px] font-sans font-light tracking-tight leading-[1.05] text-balance">
                        We change how<br />industries operate.
                    </h1>
                    <p className="about-animate text-lg md:text-xl font-sans font-light text-white/60 max-w-2xl mt-4 leading-relaxed text-balance">
                        Most AI agencies sell novelty. We architect high-fidelity, industrial-grade voice systems that permanently solve operational bottlenecks.
                    </p>
                </div>
            </section>

            {/* Image Break - High-end hospitality aesthetic */}
            <section className="about-animate w-full px-4 md:px-6 my-12 relative z-10 flex justify-center">
                <div className="w-full max-w-7xl h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl relative border border-white/5">
                    <div className="absolute inset-0 bg-[#0A0A0A]/60 mix-blend-multiply z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2600&auto=format&fit=crop"
                        alt="High-end hospitality environment"
                        className="w-full h-full object-cover object-center opacity-80"
                    />
                </div>
            </section>

            {/* Content Body */}
            <section className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col gap-16 relative z-10">
                <div className="about-animate flex flex-col gap-6">
                    <h2 className="text-3xl font-serif font-light tracking-tight">The Pursuit of Quality</h2>
                    <p className="text-white/70 font-light leading-relaxed text-lg">
                        At Axiostudio, what sets us apart is an obsessive dedication to quality. We do not deploy off-the-shelf wrappers or generic chatbots. Every pipeline we build—from the sub-800ms latency routing to the dynamic context architecture—is custom-engineered to feel completely natural to your customers.
                    </p>
                    <p className="text-white/70 font-light leading-relaxed text-lg">
                        We believe that automation should never feel like a compromise. When a guest calls your restaurant, they expect hospitality. Our Voice AI infrastructure absorbs the grueling volume of inbound calls, capturing every missed reservation and eliminating no-shows, while allowing your front-of-house to return their focus to the human beings standing in front of them.
                    </p>
                </div>

                <div className="about-animate flex flex-col gap-6 pt-12 border-t border-white/10">
                    <h2 className="text-3xl font-serif font-light tracking-tight">Our Standard</h2>
                    <ul className="flex flex-col gap-4 text-white/70 font-light text-lg">
                        <li className="flex gap-4"><span className="text-white">01.</span> Uncompromising latency and natural interruption handling.</li>
                        <li className="flex gap-4"><span className="text-white">02.</span> Deep API integrations into your existing POS and booking systems.</li>
                        <li className="flex gap-4"><span className="text-white">03.</span> A design aesthetic and sonic brand that elevates your business.</li>
                    </ul>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default About;
