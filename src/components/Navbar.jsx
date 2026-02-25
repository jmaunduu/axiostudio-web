import React, { useRef, useLayoutEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar = () => {
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Floating iOS-style dark glass navbar
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const isHome = location.pathname === '/';
            // Homepage: wait until Hero pin finishes (~1.5 to 2 viewports)
            // Other pages: trigger quickly
            const triggerStart = isHome ? window.innerHeight * 1.8 : 50;

            ScrollTrigger.create({
                start: triggerStart,
                end: 99999,
                toggleClass: {
                    targets: navRef.current,
                    className: 'scrolled'
                },
                onEnter: () => gsap.to(navRef.current, { padding: '12px 24px', duration: 0.4, ease: 'power3.out' }),
                onLeaveBack: () => gsap.to(navRef.current, { padding: '16px 32px', duration: 0.4, ease: 'power3.out' }),
            });
        }, navRef);
        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <>
            <div className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
                {/* 
                  Default state (top): Transparent, White Text 
                  Scrolled state: Dark Glass, White Text, White Border
                */}
                <nav ref={navRef} className="pointer-events-auto flex items-center justify-between gap-12 rounded-full transition-all duration-500 bg-transparent text-white px-8 py-4 w-full max-w-5xl 
                    [&:is(.scrolled)]:bg-white/[0.03] [&:is(.scrolled)]:backdrop-blur-3xl [&:is(.scrolled)]:backdrop-saturate-150 [&:is(.scrolled)]:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] [&:is(.scrolled)]:border [&:is(.scrolled)]:border-white/20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-95">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                        <span className="font-sans font-semibold tracking-tight text-lg">axiostudio</span>
                    </Link>

                    {/* Desktop Links - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="/#services" className="relative overflow-hidden group">
                            <span>Services</span>
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                        </a>
                        <a href="/#process" className="relative overflow-hidden group">
                            <span>Process</span>
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                        </a>
                        <Link to="/about" className="relative overflow-hidden group">
                            <span>About Us</span>
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                        </Link>
                        <Link to="/contact" className="relative overflow-hidden group">
                            <span>Contact</span>
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                        </Link>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Link to="/booking">
                            <button className="px-6 py-2.5 rounded-full border border-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300">
                                Book a Call
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <div className="text-white transition-colors duration-300">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </div>
                    </button>

                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl z-40 transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <a href="/#services" className="text-3xl font-sans font-light text-white tracking-tight hover:text-white/50 transition-colors" onClick={() => setIsOpen(false)}>Services</a>
                <a href="/#process" className="text-3xl font-sans font-light text-white tracking-tight hover:text-white/50 transition-colors" onClick={() => setIsOpen(false)}>Process</a>
                <Link to="/about" className="text-3xl font-sans font-light text-white tracking-tight hover:text-white/50 transition-colors" onClick={() => setIsOpen(false)}>About Us</Link>
                <Link to="/contact" className="text-3xl font-sans font-light text-white tracking-tight hover:text-white/50 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>

                <Link to="/booking" onClick={() => setIsOpen(false)}>
                    <button className="mt-4 px-8 py-4 rounded-full bg-white text-black text-lg font-medium">
                        Book a Call
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
