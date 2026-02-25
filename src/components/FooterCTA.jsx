import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FooterCTA = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.cta-text', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            });
            gsap.from('.cta-btn', {
                y: 40,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative py-32 md:py-48 bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-[3rem] mt-12 mb-8 mx-4 md:mx-6 max-w-[calc(100vw-32px)] md:max-w-[calc(100vw-48px)] z-10 shadow-2xl">

            {/* Background Image - Rich warm hospitality / business lifestyle */}
            <div className="absolute inset-0 opacity-40">
                <img
                    src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=2600&auto=format&fit=crop"
                    alt="High res lifestyle texture"
                    className="w-full h-full object-cover mix-blend-luminosity filter brightness-110 sepia-[.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent"></div>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center gap-12 z-20">
                <h2 className="cta-text text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white leading-[1.05] text-balance">
                    Book a call to see how we can implement this to your business.
                </h2>

                <Link to="/booking">
                    <button className="cta-btn group flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-sans text-lg font-medium tracking-tight hover:scale-[1.02] transition-transform duration-300 shadow-xl">
                        <span>Book a consultation</span>
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <ArrowUpRight size={18} strokeWidth={2.5} />
                        </div>
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default FooterCTA;
