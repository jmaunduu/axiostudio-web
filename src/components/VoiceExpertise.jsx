import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Clock, Database, ShieldCheck, Play, Square, RefreshCcw } from 'lucide-react';

const VoiceExpertise = () => {
    const containerRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Generated conversation demo using edge-tts
    const audioSrc = "/demo-audio.mp3";

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Provide a catch for browsers blocking autoplay
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    const restartAudio = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // Only pin the left column on desktop screens (lg breakpoint)
            mm.add("(min-width: 1024px)", () => {
                ScrollTrigger.create({
                    trigger: leftColRef.current,
                    start: 'top 20%',
                    end: () => `+=${rightColRef.current.offsetHeight - leftColRef.current.offsetHeight}`,
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                });
            });

            gsap.utils.toArray('.tech-card').forEach((card) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Handle audio time update
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            if (total) {
                setProgress((current / total) * 100);
            }
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('ended', () => setIsPlaying(false));
            return () => audio.removeEventListener('ended', () => setIsPlaying(false));
        }
    }, []);

    const technicalSpecs = [
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Sub-800ms Latency Engine",
            desc: "Human conversation requires an immediate response to feel natural. We bypass standard LLM processing delays by utilizing edge-deployed models and aggressively streaming audio chunks in parallel, eliminating the awkward 'AI pause'."
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: "Dynamic Menu Context (RAG)",
            desc: "Our agents don't memorize static texts. We connect them dynamically to your live POS and menu databases using Retrieval-Augmented Generation. When a caller asks 'Do you have gluten-free options today?', the AI queries your live kitchen inventory instantly."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Real-time Booking Sync",
            desc: "No more double-bookings. The engine integrates directly through secure APIs into Resy, OpenTable, or SevenRooms. It checks live availability, secures the deposit via Stripe, and pushes the reservation into your system before the caller hangs up."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Semantic Sentiment Routing",
            desc: "If a caller is upset, frustrated, or making a highly specific inquiry (like a VIP buyout request), the AI detects semantic urgency and instantly forwards the call to the manager-on-duty with a live text transcription."
        }
    ];

    return (
        <section className="py-24 px-4 md:px-6 w-full z-10 my-12 relative flex justify-center">

            <div ref={containerRef} className="w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl pb-12 text-white">

                {/* High-Fidelity Background Image */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')` }}
                ></div>

                {/* Heavy Dark Glass Overlay */}
                <div className="absolute inset-0 w-full h-full bg-[#0A0A0A]/80 backdrop-blur-2xl z-10"></div>

                {/* Subtle dark texture gradient */}
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-black/90 opacity-80 pointer-events-none z-10"></div>

                <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-20 pt-24 px-6 md:px-12">
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <span className="font-sans font-medium text-white/40 uppercase tracking-widest text-sm">Engineering & Architecture</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-light leading-[1.05] tracking-tight">
                            Built like a machine.<br />Sounds like your best host.
                        </h2>
                        <p className="text-lg text-white/60 font-sans font-light max-w-xl leading-relaxed">
                            We don't wrap generic APIs. We engineer entirely custom voice pipelines optimized for the high-pressure acoustics and operational demands of hospitality.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 relative items-start">

                        {/* Left Column (Pinned Video Demo) */}
                        <div ref={leftColRef} className="w-full lg:w-1/2 flex flex-col gap-6 relative z-20 top-4">
                            <div className="w-full aspect-[4/5] bg-[#111116] rounded-[2.5rem] p-8 border border-white/[0.05] shadow-2xl flex items-center justify-center relative overflow-hidden group">

                                <audio
                                    ref={audioRef}
                                    src={audioSrc}
                                    onTimeUpdate={handleTimeUpdate}
                                    preload="auto"
                                />

                                <div className="absolute inset-0 w-full h-full p-8 flex flex-col items-center justify-center z-10">

                                    {/* Active Caller UI */}
                                    <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 shadow-lg flex items-center justify-center mb-12 relative transition-all duration-500">
                                        {isPlaying && (
                                            <>
                                                <div className="absolute inset-0 rounded-full border border-white/20 scale-150 animate-ping opacity-20 duration-1000"></div>
                                                <div className="absolute inset-0 rounded-full border border-white/10 scale-125 animate-ping opacity-40 duration-700 delay-150"></div>
                                            </>
                                        )}
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-500 ${isPlaying ? 'bg-white' : 'bg-white/20'}`}>
                                            <div className="flex gap-1 items-center">
                                                {[1, 2, 3, 2, 1].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1 rounded-full ${isPlaying ? 'bg-black animate-pulse' : 'bg-white/50'}`}
                                                        style={{
                                                            height: `${h * 8}px`,
                                                            animationDelay: isPlaying ? `${i * 0.1}s` : '0s'
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="font-sans text-2xl font-light mb-2">Axiostudio Spec Demo</h3>
                                    <p className="font-mono text-xs text-white/40 mb-12 uppercase tracking-widest">
                                        {isPlaying ? "Live Conversion" : "System Ready"}
                                    </p>

                                    {/* Audio Controls */}
                                    <div className="flex gap-6 items-center">
                                        <button
                                            onClick={restartAudio}
                                            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-sm flex items-center justify-center transition-colors border border-white/5"
                                        >
                                            <RefreshCcw size={20} strokeWidth={2} />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className={`w-20 h-20 rounded-full text-white shadow-lg flex items-center justify-center font-medium transition-all duration-300 ${isPlaying ? 'bg-red-500/80 hover:bg-red-500 shadow-red-500/20' : 'bg-white text-black hover:scale-105'}`}
                                        >
                                            {isPlaying ? <Square size={24} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
                                        </button>
                                    </div>

                                    {/* Scrub Bar */}
                                    <div className="absolute bottom-12 w-3/4 max-w-[240px] h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Right Column (Scrolling Architecture Cards) */}
                        <div ref={rightColRef} className="w-full lg:w-1/2 flex flex-col gap-8 pb-32">
                            {technicalSpecs.map((spec, index) => (
                                <div key={index} className="tech-card w-full bg-[#111116] p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-white/[0.05] flex flex-col gap-6 group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 transition-colors group-hover:bg-white group-hover:text-black shadow-inner border border-white/5">
                                        {spec.icon}
                                    </div>
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <h3 className="font-sans text-2xl max-w-xs">{spec.title}</h3>
                                        <p className="font-sans font-light text-white/50 text-base leading-relaxed group-hover:text-white/70 transition-colors">
                                            {spec.desc}
                                        </p>
                                    </div>
                                    <div className="relative z-10 w-full h-px bg-white/5 mt-auto pt-6 group-hover:bg-white/10"></div>
                                    <div className="relative z-10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                        Module 0{index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default VoiceExpertise;
