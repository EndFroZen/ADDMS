"use client"
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { initParticles, initGlowEffects, initTerminalAnimation } from './backgound';


export default function ADDMSLanding() {
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  function goPage(page:string){
    router.push(page)
  }
  useEffect(() => {
    initParticles();
    initGlowEffects();
    if (terminalRef.current) {
      initTerminalAnimation(terminalRef.current);
    }
    
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-100 overflow-x-hidden">
      <Head>
        <title>ADDMS</title>
        <meta name="description" content="Deploy. Control. Automate. Manage servers, domains, and team deployments effortlessly from a single sci-fi dashboard." />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-blue-900/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
              ADDMS
            </span>
          </div>

          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-md border border-[#f97316] text-[#f97316] hover:bg-[#f97316]/20 transition-colors" onClick={()=>goPage("/register")}>
              Register
            </button>
            <button className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#f97316] to-[#fb923c]  hover:opacity-90 transition-opacity" onClick={()=>goPage("/login")}>
              Login 
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <canvas id="particle-canvas" className="absolute inset-0 w-full h-full"></canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-blue-900/20"
                  data-glow
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#f97316] to-[#fb923c] font-black text-6xl tracking-tight"
              style={{
                textShadow: '0 0 30px rgba(248, 234, 224, 0.35), 0 0 25px rgba(233, 169, 116, 0.85)',
              }}
            >
              Deploy. Control. Automate.
            </span>


          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto mb-12">
            Automated Web Application Deployment with Domain Mapping System.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <button
          onClick={() => {
            const featuresSection = document.getElementById('features');
            featuresSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          id="scroll-button"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20
    w-14 h-14 rounded-full bg-blue-600/20 border border-blue-400
    flex items-center justify-center text-white text-2xl
    hover:bg-orange-400 hover:text-black transition-all duration-300"
        >
          ↓
        </button>


      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
              Power Up Your Workflow
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "1-Click Deploy",
                desc: "Instant deployment with zero configuration",
                icon: "🚀"
              },
              {
                title: "Server Monitoring",
                desc: "Real-time analytics and performance tracking",
                icon: "📊"
              },
              {
                title: "Domain Mapping",
                desc: "Easy DNS management and SSL automation",
                icon: "🌐"
              },
              {
                title: "Multi-Framework",
                desc: "Supports Node.js, Go, PHP, Python and more",
                icon: "🧩"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-blue-900/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/10 relative overflow-hidden"
                data-card
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-orange-900/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Preview */}
      <section className="relative py-24 bg-white border-t border-blue-900/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div
              ref={terminalRef}
              className="bg-gray-500 rounded-xl overflow-hidden border border-blue-900/50 shadow-2xl shadow-blue-600/10"
            >
              <div className="flex items-center px-4 py-3 bg-gray-600 border-b border-blue-900/30">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-blue-300">terminal — ADDMS v3.2.1</div>
              </div>
              <div className="p-4 font-mono text-green-400 h-64 overflow-hidden">
                <div id="terminal-content"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-900/30 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-lg font-bold">ADDMS</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-blue-300">
              <a href="#" className="hover:text-orange-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-blue-900">
            © {new Date().getFullYear()} ADDMS Technologies. All systems operational.
          </div>
        </div>
      </footer>
    </div>
  );
}