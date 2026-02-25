import React, { useState, useEffect, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

// Initialize the Retell Web Client
const retellWebClient = new RetellWebClient();

const VoiceSandbox = () => {
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, connecting, active
    const [waves, setWaves] = useState(Array(7).fill(10));

    // Fallback animation ref if we don't get volume updates
    const animationRef = useRef(null);

    useEffect(() => {
        // Setup Retell Event Listeners
        const handleCallStarted = () => {
            console.log('Retell call started');
            setIsActive(true);
            setStatus("active");

            // Start a subtle simulated animation in case volume events aren't firing perfectly
            animationRef.current = setInterval(() => {
                setWaves(prev => prev.map(() => Math.floor(Math.random() * 40) + 15));
            }, 100);
        };

        const handleCallEnded = () => {
            console.log('Retell call ended');
            setIsActive(false);
            setStatus("idle");
            setWaves(Array(7).fill(10));
            if (animationRef.current) clearInterval(animationRef.current);
        };

        const handleError = (error) => {
            console.error('Retell error:', error);
            setIsActive(false);
            setStatus("idle");
            if (animationRef.current) clearInterval(animationRef.current);
        };

        // You can also use audio updates once the call is active for a more accurate visualizer
        const handleUpdate = (update) => {
            // Retell sends updates, if you want to parse transcriptions or volume levels you do it here.
        };

        retellWebClient.on('call_started', handleCallStarted);
        retellWebClient.on('call_ended', handleCallEnded);
        retellWebClient.on('error', handleError);
        retellWebClient.on('update', handleUpdate);

        return () => {
            retellWebClient.off('call_started', handleCallStarted);
            retellWebClient.off('call_ended', handleCallEnded);
            retellWebClient.off('error', handleError);
            retellWebClient.off('update', handleUpdate);
            if (animationRef.current) clearInterval(animationRef.current);
        };
    }, []);

    const toggleCall = async () => {
        if (status === "idle") {
            try {
                // EXPLICIT MICROPHONE PROMPT
                // Request microphone access strictly before starting the call so the browser prompts the user
                await navigator.mediaDevices.getUserMedia({ audio: true });
            } catch (err) {
                console.error("Microphone access denied or not available:", err);
                alert("Microphone access is required to use the voice AI demo.");
                return; // Stop if no mic
            }

            setStatus("connecting");

            try {
                // Securely fetch token from local express backend (proxied by Vite)
                const response = await fetch('/api/get-retell-token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    let errorMessage = "Failed to fetch token from secure endpoint.";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.error || errorMessage;
                    } catch (e) {
                        // If Vite proxy returns a plain text error (like 500 when port is wrong)
                        errorMessage = `Server Error: ${response.status} ${response.statusText}`;
                    }
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                const accessToken = data.accessToken;

                // This starts the WebRTC connection
                await retellWebClient.startCall({
                    accessToken: accessToken,
                });

            } catch (err) {
                console.error("Failed to start Retell call", err);
                setStatus("idle");
                setIsActive(false);
                alert("Connection failed: " + err.message);
                if (animationRef.current) clearInterval(animationRef.current);
            }
        } else {
            retellWebClient.stopCall();
            setIsActive(false);
            setStatus("idle");
            if (animationRef.current) clearInterval(animationRef.current);
            setWaves(Array(7).fill(10));
        }
    };

    return (
        <section className="py-24 px-4 md:px-6 w-full flex justify-center z-10 relative">
            <div className="max-w-7xl w-full bg-black rounded-[3rem] p-10 md:p-24 flex flex-col items-center justify-center text-center overflow-hidden relative shadow-2xl border border-white/5 mx-4 md:mx-6">

                {/* Ambient light pulse */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] transition-all duration-1000 pointer-events-none ${isActive ? 'opacity-100 scale-110' : 'opacity-30 scale-90'}`}></div>

                <div className="relative z-20 flex flex-col items-center gap-16 w-full">

                    <div className="flex flex-col gap-6 items-center max-w-2xl">
                        <span className="font-mono text-white/30 uppercase tracking-widest text-sm">Live System Target</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight leading-[1.05] text-white">
                            Stop reading.<br />Start talking.
                        </h2>
                        <p className="text-lg text-white/60 font-sans font-light leading-relaxed">
                            Experience the sub-second latency, natural interruption handling, and dynamic memory of our hospitality agent right now in your browser.
                        </p>
                    </div>

                    {/* The Orb Visualizer */}
                    <div
                        className={`w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 relative ${isActive ? 'bg-white/10 shadow-[0_0_80px_rgba(255,255,255,0.15)] scale-105' : 'bg-black/50'} ${status === 'connecting' ? 'animate-pulse' : ''}`}
                    >
                        {/* Pulsing rings when active */}
                        {isActive && (
                            <>
                                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30 duration-1000 scale-125"></div>
                                <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20 duration-1000 delay-300 scale-150"></div>
                            </>
                        )}

                        {/* Soundwaves */}
                        <div className="flex items-center justify-center gap-2 h-20">
                            {waves.map((height, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 md:w-2 bg-white rounded-full transition-all duration-[100px] ease-out"
                                    style={{ height: `${height}px`, opacity: isActive ? 1 : 0.2 }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-center gap-6">
                        <button
                            onClick={toggleCall}
                            className={`px-10 py-5 rounded-full font-sans text-lg font-medium tracking-tight transition-all duration-300 w-72 flex items-center justify-center gap-3 ${isActive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30' : 'bg-white text-black hover:scale-105 shadow-xl border border-transparent'}`}
                        >
                            {status === "connecting" ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    Connecting...
                                </>
                            ) : (
                                isActive ? 'End Demo Call' : 'Initialize Voice Engine'
                            )}
                        </button>

                        <div className="flex flex-col items-center gap-2">
                            <p className={`font-mono text-xs uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'text-white/50 opacity-100' : 'opacity-0'}`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                Live Audio Channel Connected
                            </p>
                            <p className="text-[10px] text-white/30 font-sans mt-2">
                                *Requires Microphone Permissions
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default VoiceSandbox;
