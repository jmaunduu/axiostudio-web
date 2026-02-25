import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: '+=150%', // Scroll for 1.5 viewport heights to see the sequence
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                }
            });

            // Step 1: Fade out the initial text and slightly darken the background overlay
            tl.to('.text-1', { opacity: 0, y: -40, duration: 1 }, 0)
                .to('.hero-overlay', { backgroundColor: 'rgba(0,0,0,0.6)', duration: 1 }, 0);

            // Step 2: Fade in the second statement
            tl.fromTo('.text-2',
                { opacity: 0, scale: 0.95, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1 },
                "-=0.5"
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full z-0 px-4 md:px-6 pt-4">
            <div ref={triggerRef} className="relative h-[95vh] w-full overflow-hidden text-white rounded-[2rem] max-w-[calc(100vw-32px)] md:max-w-[calc(100vw-48px)] mx-auto flex items-center justify-center">

                {/* Performance optimized background image - pure opacity change on overlay, no CSS blur */}
                <div className="absolute inset-0 w-full h-full bg-black">
                    <img
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2600&auto=format&fit=crop"
                        alt="Luxury Restaurant Background"
                        className="w-full h-full object-cover object-center opacity-80"
                    />
                    <div className="hero-overlay absolute inset-0 bg-black/20 transition-colors will-change-[background-color]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-8 w-full pt-24 md:pt-0">

                    {/* First View: The Hook */}
                    <div className="text-1 absolute w-full flex flex-col items-center z-20">
                        <h1 className="text-5xl md:text-[80px] lg:text-[100px] leading-[1.05] font-sans font-light tracking-tight text-white mb-6 text-balance drop-shadow-lg">
                            Most AI gives you anxiety.
                            <br className="hidden md:block" />
                            Ours gives you time back.
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 font-sans font-light max-w-3xl mt-4 hidden md:block drop-shadow-md leading-relaxed text-balance">
                            We integrate directly into your restaurant to handle overflowing call volume, secure missed revenue, and totally eliminate no-shows—giving your front-of-house their focus back.
                        </p>
                    </div>

                    {/* Second View: The Pillar (Revealed on Scroll) */}
                    <div className="text-2 absolute w-full flex flex-col items-center opacity-0 z-10 pointer-events-none">
                        <h2 className="text-5xl md:text-[80px] lg:text-[100px] leading-[1.05] font-sans font-light tracking-tight text-white mb-6 text-balance drop-shadow-lg">
                            Axiostudio makes <br className="hidden md:block" /> business better.
                        </h2>
                    </div>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-20">
                    <span className="font-sans font-medium tracking-widest text-[10px] uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
