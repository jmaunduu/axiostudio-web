import React, { useLayoutEffect, useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Cal, { getCalApi } from "@calcom/embed-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', business: '', message: ''
    });

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.contact-anim', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.1
            });
        });

        // Initialize Cal
        (async function () {
            const cal = await getCalApi({ "namespace": "axiostudio-voice-ai-discovery-call" });
            cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        })();

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Axiostudio Inquiry: ${formData.business} - ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBusiness: ${formData.business}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:joel@axiostudioai.com?subject=${subject}&body=${body}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black">

            <Navbar />

            {/* Cinematic Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <filter id="noise-contact">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.2 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise-contact)" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-32 pb-24 flex-grow flex flex-col lg:flex-row gap-16 relative z-10">

                {/* Left Side - Contact Info & Form */}
                <div className="w-full lg:w-1/2 flex flex-col gap-12 pt-8">
                    <div className="flex flex-col gap-4">
                        <span className="contact-anim font-mono text-xs tracking-widest uppercase text-white/40">Initiate Protocol</span>
                        <h1 className="contact-anim text-5xl md:text-6xl font-serif font-light tracking-tight leading-[1.05]">
                            Contact Us
                        </h1>
                        <p className="contact-anim text-lg font-light text-white/60 max-w-sm mt-2">
                            Request a technical audit or inquire about our custom Voice AI architecture.
                        </p>
                    </div>

                    <div className="contact-anim flex flex-col gap-4 font-mono text-sm">
                        <a href="mailto:joel@axiostudioai.com" className="flex items-center gap-4 hover:text-white/50 transition-colors text-white/80">
                            <Mail size={16} />
                            joel@axiostudioai.com
                        </a>
                        <div className="flex items-center gap-4 text-white/60">
                            <MapPin size={16} />
                            Remote / Global Architecture
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-anim flex flex-col gap-6 mt-4 w-full max-w-md">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 text-white" placeholder="John Doe" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 text-white" placeholder="john@company.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Phone</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 text-white" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Business (Optional)</label>
                                <input type="text" name="business" value={formData.business} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 text-white" placeholder="Company Name" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Message</label>
                            <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors rounded-none resize-none placeholder:text-white/20 text-white" placeholder="How can we help optimize your operations?"></textarea>
                        </div>

                        <button type="submit" className="mt-8 bg-white text-black py-4 px-8 rounded-full font-medium hover:scale-[1.02] transition-transform w-fit text-sm">
                            Submit Inquiry
                        </button>
                    </form>
                </div>

                {/* Right Side - Cal.com Embed */}
                <div className="contact-anim w-full lg:w-1/2 flex flex-col justify-center mt-12 lg:mt-0">
                    <div className="w-full bg-[#111116] rounded-[2rem] p-2 md:p-6 shadow-2xl border border-white/5 relative overflow-hidden h-[700px]">
                        <Cal
                            namespace="axiostudio-voice-ai-discovery-call"
                            calLink="joelkakundi/axiostudio-voice-ai-discovery-call"
                            style={{ width: "100%", height: "100%", overflow: "scroll" }}
                            config={{ "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "theme": "dark" }}
                        />
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
};

export default Contact;
