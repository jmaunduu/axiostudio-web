import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactPlayer from 'react-player';

const messages = [
    { id: 1, type: 'system', text: 'Reservation Reminder: Table for 4 at 7:30 PM.' },
    { id: 2, type: 'user', text: 'Actually we are running late, can we do 8:00 PM?' },
    { id: 3, type: 'ai', text: 'I have adjusted your reservation to 8:00 PM. See you then!' },
    { id: 4, type: 'system', text: 'Deposit secured. $100 authorized.' },
];

const FeatureChat = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // Simple fade-up for the text content
            gsap.from('.feature-content', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                }
            });

            // Staggered fade-up for chat bubbles (no pinning required)
            gsap.from('.chat-bubble', {
                y: 40,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: '.chat-container',
                    start: 'top 75%',
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-6 bg-background max-w-[calc(100vw-32px)] md:max-w-[calc(100vw-48px)] mx-auto relative z-10 hidden-overflow">
            <div className="relative w-full h-auto min-h-[700px] md:min-h-[800px] rounded-[3rem] overflow-hidden bg-black flex flex-col md:flex-row shadow-2xl border border-black/5">

                {/* Mux Video Background (Set behind everything) */}
                <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity overflow-hidden pointer-events-none z-0">
                    <ReactPlayer
                        url="https://stream.mux.com/b5TsWTJIutPO8RGHDogt8k88qoirRPLo.m3u8?max_resolution=2160p&min_resolution=1080p&redundant_streams=true"
                        playing
                        loop
                        muted
                        playsinline
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', objectFit: 'cover' }}
                        config={{
                            file: {
                                attributes: {
                                    style: { width: '100%', height: '100%', objectFit: 'cover' }
                                }
                            }
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                </div>

                {/* Left Side: Copy */}
                <div className="relative z-20 w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
                    <div className="feature-content">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        </div>
                        <h2 className="text-white text-5xl md:text-7xl font-serif font-light tracking-tight mb-8 leading-[1.05]">
                            Eliminate no-shows. Automatically.
                        </h2>
                        <p className="text-lg md:text-xl text-white/80 font-sans font-light max-w-md leading-relaxed">
                            Axiostudio Engine confirms bookings, reschedules late arrivals, and secures deposits via SMS in real-time. Your tables stay full, and your staff stay focused.
                        </p>
                    </div>
                </div>

                {/* Right Side: Chat Bubbles */}
                <div className="relative z-20 w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center items-center md:items-end">
                    <div className="chat-container w-full max-w-sm flex flex-col gap-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-bubble w-full flex ${msg.type === 'user' ? 'justify-end' : (msg.type === 'system' ? 'justify-center' : 'justify-start')}`}>
                                <div className={`
                                    max-w-[85%] p-4 text-sm md:text-base font-sans font-medium leading-relaxed shadow-lg backdrop-blur-md
                                    ${msg.type === 'user'
                                        ? 'bg-white text-black rounded-[2rem] rounded-tr-sm'
                                        : (msg.type === 'system'
                                            ? 'bg-black/40 text-white/60 text-xs rounded-full border border-white/10 text-center uppercase tracking-widest px-6'
                                            : 'bg-white/10 text-white border border-white/20 rounded-[2rem] rounded-tl-sm')
                                    }
                                `}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeatureChat;
