import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ValueProps from '../components/ValueProps';
import FeatureChat from '../components/FeatureChat';
import VoiceExpertise from '../components/VoiceExpertise';
import VoiceSandbox from '../components/VoiceSandbox';
import FooterCTA from '../components/FooterCTA';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <main className="bg-background min-h-screen relative flex flex-col items-center overflow-x-hidden">
            <Navbar />
            <Hero />

            {/* The major sections need IDs for exactly matching the Navbar scroll targets */}
            <div id="services" className="w-full">
                <ValueProps />
            </div>

            <div id="process" className="w-full">
                <FeatureChat />
            </div>

            <div id="about" className="w-full">
                <VoiceExpertise />
            </div>

            <VoiceSandbox />

            <div id="contact" className="w-full">
                <FooterCTA />
            </div>

            <Footer />
        </main>
    );
};

export default Landing;
