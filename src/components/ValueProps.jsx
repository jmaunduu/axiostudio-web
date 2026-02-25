import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Simulated chat for the top card animation (Updated to Glassmorphism)
const TopCardChat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const sequence = [
            { text: "Missed call from +1 (555) 0192", type: 'system', delay: 1000 },
            { text: "Axiostudio AI handled the call.", type: 'system', delay: 2500 },
            { text: "Booked table for 4 at 7 PM.", type: 'ai', delay: 4000 },
            { text: "Upsold $85 prefix menu.", type: 'ai', delay: 5500 },
        ];

        let timeouts = [];
        let isMounted = true;

        const runSequence = () => {
            if (!isMounted) return;
            setMessages([]);
            sequence.forEach((msg) => {
                const id = setTimeout(() => {
                    if (isMounted) setMessages(prev => [...prev, msg]);
                }, msg.delay);
                timeouts.push(id);
            });
        };

        runSequence();
        const loop = setInterval(runSequence, 8500);

        return () => {
            isMounted = false;
            timeouts.forEach(clearTimeout);
            clearInterval(loop);
        };
    }, []);

    return (
        <div className="w-full max-w-[320px] md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-12 md:max-w-[320px] h-[400px] md:h-[500px] bg-black/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col pointer-events-none md:group-hover:-translate-y-[55%] transition-transform duration-700 ease-out z-10 text-white mt-8 md:mt-0 relative self-center md:self-auto ml-auto mr-auto md:ml-0 md:mr-0 xl:-mr-12">
            <div className="bg-white/10 py-4 flex flex-col items-center border-b border-white/10 backdrop-blur-md">
                <span className="font-semibold text-sm">Axiostudio AI</span>
                <span className="text-[10px] text-white/50 tracking-widest uppercase">Live Recovery</span>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-3 justify-end pb-8">
                {messages.map((m, i) => (
                    <div key={i} className={`animate-fade-in-up text-sm md:text-base p-3 rounded-2xl max-w-[85%] shadow-sm transition-all duration-300 ${m.type === 'system' ? 'bg-white/10 text-white/70 self-center text-center text-xs' : 'bg-white text-black self-start rounded-tl-sm'}`}>
                        {m.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ValueProps = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.prop-card', {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-6 bg-background max-w-7xl mx-auto flex flex-col gap-8 relative z-10">

            {/* Top Banner Prop - Full Width w/ Phone Animation */}
            <div className="prop-card relative w-full rounded-[3rem] overflow-hidden bg-black text-white group cursor-pointer border border-black/5 flex flex-col md:block min-h-[600px] md:h-[650px]">

                {/* Luxury Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2600&auto=format&fit=crop"
                        alt="Luxury Restaurant Interior"
                        className="w-full h-full object-cover object-center opacity-80 transition-transform duration-1000 group-hover:scale-105 filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/70 to-transparent w-full z-10"></div>
                </div>

                <div className="relative z-20 w-full h-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto pb-16">
                    <div className="flex flex-col max-w-2xl w-full text-center md:text-left pt-12 md:pt-0">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-tight leading-[1.05]">Revenue Recovery <br className="hidden md:block" /> & Growth</h3>
                        <p className="font-sans font-light text-white/80 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
                            Capture missed calls, convert more orders, and increase average ticket size through consistent AI upselling — turning every call into revenue.
                        </p>
                    </div>

                    <TopCardChat />
                </div>
            </div>

            {/* Two Column Props - Lifestyle Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                {/* Prop 2 */}
                <div className="prop-card relative h-[600px] rounded-[3rem] overflow-hidden bg-black text-white group cursor-pointer border border-black/5">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {/* High end operational / chef / kitchen vibe */}
                        <img
                            src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop"
                            alt="Operational Efficiency"
                            className="w-full h-full object-cover object-center opacity-90 transition-transform duration-1000 group-hover:scale-105 filter brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                    </div>

                    <div className="absolute bottom-12 left-8 max-w-md pr-8 z-20">
                        <h3 className="text-3xl md:text-4xl font-serif font-light mb-4 leading-[1.05]">Operational <br />Efficiency</h3>
                        <p className="font-sans font-light text-white/80 text-base leading-relaxed">
                            Automate reservations, orders, and FAQs so staff focus on in-house service and peak-hour execution instead of repetitive phone work.
                        </p>
                    </div>
                </div>

                {/* Prop 3 */}
                <div className="prop-card relative h-[600px] rounded-[3rem] overflow-hidden bg-black text-white group cursor-pointer border border-black/5">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {/* High fidelity data / modern architecture / calm vibe */}
                        <img
                            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2600&auto=format&fit=crop"
                            alt="Call Intelligence"
                            className="w-full h-full object-cover object-center opacity-90 transition-transform duration-1000 group-hover:scale-105 filter brightness-75 sepia-[.2]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                    </div>

                    <div className="absolute bottom-12 left-8 max-w-md pr-8 z-20">
                        <h3 className="text-3xl md:text-4xl font-serif font-light mb-4 leading-[1.05]">Actionable Call<br />Intelligence</h3>
                        <p className="font-sans font-light text-white/80 text-base leading-relaxed">
                            Provide real-time analytics on call volume, customer intent, and missed opportunities — giving owners data to optimize staffing, marketing, and sales.
                        </p>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default ValueProps;
