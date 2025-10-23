import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaLock, FaGlobe, FaPalette, FaImages, FaLightbulb, FaArrowRight, FaCheck, FaStar, FaRocket } from "react-icons/fa";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen -mt-4 -mx-4">
      
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10">
        
 
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

 
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute top-40 right-[10%] w-80 h-80 bg-pink-400/20 rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-[40%] w-64 h-64 bg-orange-400/20 rounded-full filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>

        <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
    
          <div className="inline-flex items-center gap-2 bg-[color:var(--card)] backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg mb-8 border border-purple-500/20 hover:scale-105 transition-transform">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
            </span>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Caption Generation
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]">
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Every Image Has a
            </span>
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Unique Story
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[color:var(--muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Create captions that match your style and language with advanced AI that understands your images in seconds
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <FeaturePill icon={<FaPalette />} text="7 Tone Styles" />
            <FeaturePill icon={<FaGlobe />} text="10+ Languages" />
            <FeaturePill icon={<FaBolt />} text="2-3s Fast" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              to="/create"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Creating Free
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/signin"
              className="px-8 py-4  bg-[color:var(--card)] text-[color:var(--muted)] rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 dark:border-gray-800"
            >
              Sign In
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[color:var(--muted)]">
            <TrustBadge icon={<FaCheck />} text="No Credit Card" />
            <TrustBadge icon={<FaCheck />} text="Free Forever" />
            <TrustBadge icon={<FaCheck />} text="Secure & Private" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
              <FaRocket className="text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[color:var(--muted)] ">
              Powerful Features That Set Us Apart
            </h2>
            <p className="text-xl text-[color:var(--muted)] max-w-2xl mx-auto">
              Everything you need to create perfect captions for any occasion
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[color:var(--muted)]">
            <FeatureCard
              icon={<FaPalette />}
              title="7 Customizable Tones"
              description="From formal to humorous, choose the perfect voice that matches your brand and style"
              color="purple"
            />
            <FeatureCard
              icon={<FaGlobe />}
              title="Multi-Language Support"
              description="Generate captions in 10+ languages with native-level fluency"
              color="blue"
            />
            <FeatureCard
              icon={<FaLightbulb />}
              title="Smart Context"
              description="AI analyzes your image and context to create highly relevant captions"
              color="yellow"
            />
            <FeatureCard
              icon={<FaBolt />}
              title="Lightning Fast"
              description="Get professional-quality captions in just 2-3 seconds"
              color="green"
            />
            <FeatureCard
              icon={<FaLock />}
              title="Secure & Private"
              description="Bank-level encryption and SOC 2 compliance guaranteed"
              color="red"
            />
            <FeatureCard
              icon={<FaImages />}
              title="Smart Gallery"
              description="Organize and manage all your captioned images in one place"
              color="pink"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-semibold text-pink-600">Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[color:var(--muted)] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[color:var(--muted)]">
              Four simple steps to perfect captions
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 -translate-y-1/2 z-0"></div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <StepCard
                number="01"
                icon="📤"
                title="Upload Image"
                description="Drag & drop or click to upload JPG, PNG, or GIF up to 5MB"
              />
              <StepCard
                number="02"
                icon="🎨"
                title="Choose Style"
                description="Select tone, language, and add custom context"
              />
              <StepCard
                number="03"
                icon="✨"
                title="AI Generates"
                description="Gemini AI creates your perfect caption instantly"
              />
              <StepCard
                number="04"
                icon="💾"
                title="Save & Share"
                description="Access your gallery anytime, anywhere"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full mb-4">
              <FaStar className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">Testimonials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[color:var(--muted)]">
              Loved by Creators
            </h2>
            <p className="text-xl text-[color:var(--muted)]">
              Join thousands of satisfied users worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              avatar="🎨"
              name="Akib"
              role="Social Media Manager"
              text="The multi-language feature is a game-changer! My engagement rates doubled since using creative tone captions."
            />
            <TestimonialCard
              avatar="📸"
              name="Sumit Sharma"
              role="Professional Photographer"
              text="Perfect for client galleries. The formal tone with custom context makes my work look incredibly professional."
            />
            <TestimonialCard
              avatar="✈️"
              name="Sakshi Sharma"
              role="Travel Blogger"
              text="Speed and quality are unmatched! The humorous tone adds so much personality to my travel stories."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-12 sm:p-16 text-center shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Ready to Transform Your Images?
              </h2>
              <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed">
                Start creating captivating captions today. No credit card required.
              </p>
              <Link
                to="/create"
                className="inline-block px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
              >
                Get Started for Free →
              </Link>
              
              <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-white" />
                  <span>Free Forever Plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-white" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-white" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function FeaturePill({ icon, text }) {
  return (
    <div className="inline-flex text-gray-500 items-center gap-2 bg-[color:var(--card)] px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300">
      <span className="text-purple-600 text-sm">{icon}</span>
      <span className="font-semibold text-sm">{text}</span>
    </div>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-green-500">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-rose-500',
    pink: 'from-pink-500 to-purple-500',
  };

  return (
    <div className="group relative bg-[color:var(--card)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:-translate-y-1">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>
      <p className="text-[color:var(--muted)] text-sm leading-relaxed">
        {description}
      </p>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-100 rounded-b-2xl transition-opacity duration-300`}></div>
    </div>
  );
}

function StepCard({ number, icon, title, description }) {
  return (
    <div className="relative bg-[color:var(--card)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 group hover:-translate-y-1">
      {/* Large Number Background */}
      <div className="absolute -top-4 -right-4 text-7xl font-black text-purple-500/10 select-none">
        {number}
      </div>
      
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-3 text-[color:var(--muted)]">
          {title}
        </h3>
        <p className="text-[color:var(--muted)] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function TestimonialCard({ avatar, name, role, text }) {
  return (
    <div className="bg-[color:var(--card)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:-translate-y-1">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-4xl">{avatar}</div>
        <div className="flex-1">
          <div className="font-bold text-[color:var(--muted)] text-lg mb-1">{name}</div>
          <div className="text-sm text-[color:var(--muted)]">{role}</div>
        </div>
      </div>
      
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ))}
      </div>
      
      <p className="text-[color:var(--muted)] text-sm leading-relaxed italic">
        "{text}"
      </p>
    </div>
  );
}