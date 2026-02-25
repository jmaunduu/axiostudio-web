import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-[#0A0A0A] text-white pt-16 pb-8 px-4 md:px-16 border-t border-white/10 mt-12 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Brand */}
                    <div className="flex flex-col gap-4 max-w-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>
                            <span className="font-sans font-semibold tracking-tight text-lg">axiostudio</span>
                        </div>
                        <p className="font-sans font-light text-sm text-white/50 leading-relaxed">
                            Voice AI infrastructure for the hospitality and service industry. Turn every missed call into captured revenue.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-2 gap-12 md:gap-24">
                        <div className="flex flex-col gap-4">
                            <span className="font-sans font-medium text-xs tracking-widest uppercase text-white/30">Company</span>
                            <div className="flex flex-col gap-3 font-sans font-medium text-sm text-white/80">
                                <a href="/#services" className="hover:text-white transition-colors">Services</a>
                                <a href="/#process" className="hover:text-white transition-colors">Process</a>
                                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="font-sans font-medium text-xs tracking-widest uppercase text-white/30">Legal</span>
                            <div className="flex flex-col gap-3 font-sans font-medium text-sm text-white/80">
                                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 font-sans text-xs text-white/40 gap-4">
                    <span>© {new Date().getFullYear()} Axiostudio. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter X</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
