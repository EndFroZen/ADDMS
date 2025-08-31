'use client';

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-white overflow-hidden relative">
      {/* Floating server parts */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-orange-500 rounded-lg animate-float-1"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-400 rounded-full animate-float-2"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-8 bg-blue-400 animate-float-3"></div>
      <div className="absolute bottom-1/3 right-1/3 w-10 h-10 bg-orange-300 rotate-45 animate-float-4"></div>
      
      {/* Cracked screen effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-16 bg-white opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Animated server icon */}
        <div className="relative mb-8 animate-bounce">
          <div className="w-32 h-48 bg-gray-800 rounded-lg mx-auto relative overflow-hidden">
            {/* Server lights */}
            <div className="absolute top-4 left-4 flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
            </div>
            
            {/* Server "screen" */}
            <div className="absolute top-12 left-4 right-4 bottom-4 bg-black rounded flex items-center justify-center">
              <div className="text-red-500 font-mono text-xs animate-flicker">
                ERROR 404
              </div>
            </div>
          </div>
          
          {/* Flying server parts */}
          <div className="absolute -top-8 -left-8 w-12 h-4 bg-gray-700 rounded animate-fly-away-1"></div>
          <div className="absolute -bottom-4 -right-8 w-8 h-8 bg-gray-600 rounded-full animate-fly-away-2"></div>
        </div>

        {/* Error message */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-orange-400 animate-pulse">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-200">
          Server Meltdown Detected!
        </h2>
        <p className="text-center max-w-lg mb-8 text-blue-100">
          Our servers are currently experiencing technical difficulties. 
          Meanwhile, enjoy this light show while we work on the fix!
        </p>

        {/* Animated buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-all transform hover:scale-105 animate-wiggle">
            Try Again
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all transform hover:scale-105 animate-wiggle delay-100">
            Go Home
          </button>
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all transform hover:scale-105 animate-wiggle delay-200">
            Call IT Support
          </button>
        </div>

        {/* Techy error details - animated typing effect */}
        <div className="mt-12 bg-black bg-opacity-50 p-4 rounded-lg max-w-2xl w-full border border-orange-500 border-opacity-30">
          <div className="font-mono text-sm text-green-400 overflow-hidden">
            <div className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-green-500">
              $ root@server:~ diagnostics --error=404<br />
              &gt Checking server status...<br />
              &gt [ERROR] Critical failure detected!<br />
              &gt Memory cores: ████ 25% corrupted<br />
              &gt Network: ████████ 80% unstable<br />
              &gt Storage: █████ 50% fragmented<br />
              &gt [SOLUTION] Try again later or contact support
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(5deg); }
          50% { transform: translate(-5px, 5px) rotate(-5deg); }
          75% { transform: translate(-10px, 10px) rotate(3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, -10px) rotate(-3deg); }
          50% { transform: translate(5px, 15px) rotate(2deg); }
          75% { transform: translate(10px, -5px) rotate(-2deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, 5px); }
          50% { transform: translate(-5px, -10px); }
          75% { transform: translate(-15px, 5px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          25% { transform: translate(5px, -20px) rotate(60deg); }
          50% { transform: translate(-10px, 10px) rotate(30deg); }
          75% { transform: translate(20px, 5px) rotate(50deg); }
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.2; }
        }
        @keyframes fly-away-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-100px, -100px) rotate(-360deg); }
        }
        @keyframes fly-away-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(100px, 100px) rotate(360deg); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
          75% { transform: rotate(1deg); }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 12s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 9s ease-in-out infinite; }
        .animate-flicker { animation: flicker 3s linear infinite; }
        .animate-fly-away-1 { animation: fly-away-1 5s ease-in infinite alternate; }
        .animate-fly-away-2 { animation: fly-away-2 5s ease-out infinite alternate; }
        .animate-typing { 
          animation: typing 6s steps(60, end) 1s 1 normal both;
          white-space: nowrap;
          overflow: hidden;
        }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
        .animate-wiggle:hover { animation: none; }
      `}</style>
    </div>
  );
}