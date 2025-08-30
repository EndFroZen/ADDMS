"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Globe, Zap, Shield, Server, ArrowRight, Check, Play, Star, Users, Rocket, GitBranch, Settings, Upload, BarChart3, Lock, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeployDomainLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const route = useRouter();
  const navigation = (path: string) => {
    route.push(`${path}`);
  };
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg>
                  <svg className="w-12 h-12" viewBox="0 0 543 527" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M229.239 6.18066C230.965 5.23071 233.081 5.27371 234.776 6.31836L417.794 119.152L418.056 119.325C419.339 120.221 420.185 121.625 420.37 123.189L450.063 374.772C450.306 376.83 449.372 378.85 447.647 379.997L236.554 520.365C234.729 521.579 232.358 521.592 230.518 520.4L8.08838 376.254C6.5239 375.24 5.57959 373.502 5.57959 371.638V154.067C5.57963 152.203 6.52465 150.466 8.08936 149.452L228.899 6.38379L229.239 6.18066Z" fill="#F7931E" stroke="white" strokeWidth="11" strokeLinejoin="round" />
                    <path d="M414.908 123.834L231.89 11L233.509 515.785L444.601 375.417L414.908 123.834Z" fill="#FF6B35" />
                    <path d="M529.361 172.104C529.743 171.956 530.171 171.971 530.545 172.148C530.973 172.352 531.28 172.745 531.373 173.209L537.851 205.602C537.97 206.198 537.717 206.808 537.21 207.145C536.704 207.481 536.044 207.479 535.54 207.138L519.525 196.304V219.933C519.525 220.483 519.223 220.989 518.74 221.251C518.257 221.513 517.669 221.49 517.208 221.19L497.929 208.659V228.03C497.929 228.511 497.7 228.962 497.311 229.244C496.922 229.526 496.421 229.606 495.964 229.457L472.584 221.832L469.251 232.786C469.117 233.227 468.788 233.581 468.359 233.748C467.93 233.915 467.447 233.874 467.051 233.64L453.95 225.876L447.062 242.113C446.89 242.518 446.549 242.827 446.129 242.959C445.71 243.09 445.254 243.031 444.882 242.797L430.829 233.948L409.838 238.672C409.105 238.837 408.363 238.434 408.102 237.729C407.841 237.023 408.144 236.234 408.808 235.883L529.201 172.177L529.361 172.104Z" fill="white" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                    <path d="M403.031 238.288L392.773 255.024L403.031 264.202H488.871C503.988 257.544 534.869 241.743 537.46 231.81C540.051 221.876 531.341 214.713 526.663 212.374L522.883 228.03H505.607L501.288 238.288L479.153 231.81L474.834 243.687L455.399 234.509L447.84 249.626L428.945 238.288L422.466 249.626L403.031 238.288Z" fill="white" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                    <path d="M10 262.042L43.4724 233.969L39.1534 310.092L66.1472 302.534C66.1472 302.534 60.7485 341.584 66.1472 353.822L93.1411 327.908L101.779 372.717L123.374 352.202L144.969 374.877L150.908 339.245C150.908 339.245 184.2 366.239 188.16 364.08L184.92 327.908C184.92 327.908 199.857 335.646 201.656 333.846L197.877 284.178C197.877 284.178 226.491 301.993 234.589 308.472L226.491 212.914L263.202 158.386L327.988 141.11C327.988 141.11 411.129 98.9999 455.399 109.257C468.176 111.237 496.118 117.608 505.668 127.256C515.219 136.904 522.564 165.706 525.043 178.901C496.638 207.7 412.018 237.04 360.137 236.556C356.126 236.518 353.934 241.853 357.085 244.336C364.57 250.234 374.262 257.445 380.315 260.318C382.425 261.32 384.705 261.551 387.041 261.606C405.197 262.034 490.41 262.518 529.362 235.588C548.798 298.214 470.515 299.834 439.202 314.41L445.141 373.797L231.89 514.165L10 372.717V262.042Z" fill="#003366" />
                    <path d="M231.35 519.564C231.35 519.564 357.681 376.497 357.681 241.528L380.356 253.945L393.313 258.264L465.116 253.945L505.067 241.528L532.061 232.35L538 246.926L532.061 276.62L505.067 299.834L447.84 319.81V376.497L231.35 519.564Z" fill="#011C37" stroke="#011C37" />
                    <path d="M415.935 104.985C430.153 102.444 444.344 101.611 456.327 104.343C462.922 105.373 473.259 107.5 483.23 110.607C488.26 112.174 493.288 114.018 497.733 116.138C502.117 118.229 506.246 120.732 509.222 123.738L509.771 124.311C512.49 127.245 514.845 131.178 516.874 135.356C519.071 139.88 521.041 145.017 522.753 150.173C526.176 160.48 528.684 171.203 529.957 177.978C530.26 179.589 529.753 181.245 528.603 182.412C513.565 197.659 484.399 212.498 453.04 223.431C422.154 234.2 388.156 241.516 361.648 241.559C368.923 247.234 377.354 253.378 382.459 255.802L382.675 255.898C383.771 256.365 385.138 256.561 387.158 256.608L389.031 256.647C399.338 256.834 423.478 256.846 449.846 253.887C478.219 250.703 508.151 244.174 526.519 231.475L526.768 231.314C528.034 230.545 529.584 230.375 530.994 230.862C532.498 231.382 533.666 232.586 534.138 234.106C539.296 250.726 538.161 264.042 532.25 274.7C526.434 285.185 516.43 292.295 505.468 297.53C494.494 302.771 481.981 306.397 470.572 309.569C460.532 312.361 451.541 314.757 444.541 317.554L450.116 373.3C450.301 375.15 449.444 376.951 447.891 377.973L234.639 518.342C232.993 519.425 230.864 519.441 229.202 518.382L7.3125 376.933C5.87226 376.015 5.00012 374.425 5 372.718V262.043C5 260.564 5.65443 259.162 6.78711 258.212L40.2598 230.138C41.7878 228.857 43.9312 228.606 45.7139 229.5C47.4964 230.394 48.5778 232.262 48.4648 234.253L44.541 303.39L64.7988 297.719C66.422 297.264 68.1656 297.658 69.4355 298.766C70.7054 299.875 71.3314 301.549 71.1006 303.219L71.0996 303.222C71.0991 303.226 71.0987 303.232 71.0977 303.24C71.0954 303.256 71.0916 303.283 71.0869 303.317C71.0775 303.387 71.0633 303.492 71.0449 303.631C71.0081 303.909 70.9538 304.324 70.8867 304.858C70.7525 305.927 70.5661 307.474 70.3584 309.371C69.9426 313.169 69.4454 318.347 69.1143 323.887C68.7822 329.444 68.6229 335.277 68.8643 340.411C68.925 341.703 69.0096 342.914 69.1172 344.038L89.6787 324.301L89.9326 324.073C91.2377 322.981 93.0184 322.622 94.6553 323.142C96.4012 323.697 97.704 325.163 98.0508 326.962L104.959 362.8L119.931 348.577L120.121 348.405C122.127 346.684 125.152 346.818 126.995 348.754L141.683 364.177L145.976 338.424L146.041 338.097C146.42 336.487 147.577 335.161 149.137 334.57C150.801 333.94 152.674 334.241 154.057 335.361L150.908 339.245C153.902 335.553 154.049 335.371 154.057 335.362H154.058C154.058 335.363 154.06 335.364 154.062 335.365C154.065 335.368 154.071 335.373 154.078 335.379C154.093 335.391 154.116 335.41 154.146 335.434C154.207 335.484 154.299 335.557 154.419 335.654C154.659 335.848 155.014 336.133 155.468 336.496C156.376 337.222 157.68 338.258 159.258 339.496C162.417 341.974 166.658 345.246 171.01 348.443C175.051 351.412 179.105 354.254 182.445 356.333L179.94 328.354C179.778 326.536 180.618 324.774 182.134 323.757C183.649 322.739 185.599 322.629 187.22 323.469V323.468L187.221 323.469C187.222 323.469 187.223 323.47 187.226 323.471C187.231 323.474 187.241 323.479 187.253 323.485C187.278 323.498 187.316 323.518 187.367 323.544C187.469 323.596 187.622 323.675 187.819 323.774C188.214 323.974 188.785 324.258 189.476 324.595C190.864 325.273 192.712 326.148 194.596 326.962C195.132 327.193 195.658 327.413 196.168 327.62L192.892 284.557C192.749 282.679 193.674 280.879 195.285 279.902C196.897 278.925 198.921 278.937 200.521 279.933L200.521 279.934C200.522 279.935 200.524 279.936 200.525 279.937C200.529 279.94 200.535 279.943 200.542 279.947C200.556 279.956 200.577 279.969 200.604 279.986C200.66 280.021 200.742 280.072 200.849 280.138C201.062 280.272 201.375 280.467 201.776 280.719C202.579 281.221 203.732 281.945 205.142 282.834C207.96 284.611 211.805 287.05 215.905 289.693C220.112 292.405 224.676 295.387 228.692 298.109L221.509 213.337C221.413 212.201 221.707 211.067 222.343 210.122L259.055 155.594L259.186 155.409C259.858 154.502 260.819 153.847 261.914 153.554L326.206 136.41C326.347 136.34 326.518 136.255 326.719 136.156C327.355 135.842 328.287 135.387 329.485 134.812C331.881 133.664 335.343 132.039 339.633 130.125C348.206 126.299 360.112 121.3 373.435 116.62C386.741 111.945 401.559 107.554 415.935 104.985Z" stroke="white" strokeWidth="10" strokeLinejoin="round" />
                    <path d="M326.367 197.798C305.853 177.822 362.539 145.429 362.539 191.859M448.92 137.871H464.037" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M102.859 173.503H73.1655V203.736H102.859V173.503Z" fill="#D9D9D9" />
                    <path d="M146.589 143.81H116.896V174.043H146.589V143.81Z" fill="#D9D9D9" />
                    <path d="M189.779 118.976H160.086V149.209H189.779V118.976Z" fill="#D9D9D9" />
                  </svg>
                </svg>
              </div>
              <span className="text-4xl font-black text-orange-500">ADDMS</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">

              <a href="/register" className="text-gray-600 hover:text-orange-600 transition-colors">Sign Up</a>
              <button onClick={() => navigation('/login')} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-orange-50 to-white">
        <div className="max-w-7xl mx-auto mt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full mb-6 text-sm">
                <span>🚀 Deploy your websites in seconds</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-orange-500">A</span>utomated Web Application 
                <span className="text-orange-500"> D</span>eployment with 
                <span className="text-orange-500"> D</span>omain 
                <span className="text-orange-500"> M</span>apping
              </h1>



              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                เพียงแค่อัปโหลดไฟล์โปรเจ็กต์ของคุณแล้วระบบจะดำเนินการให้โดยอัตโนมัติ
                ไม่ต้องกังวลเรื่องการตั้งค่าหรือการกำหนดค่า Deploy ที่ยุ่งยาก
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <button onClick={() => navigation('/login')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Get Started
                </button>

              </div>

              {/* Stats */}

            </div>

            {/* Right side illustration */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500">Auto Deploy</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Upload Files</div>
                      <div className="text-sm text-gray-500">Drag & drop your project</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Auto Configure</div>
                      <div className="text-sm text-gray-500">Smart detection & setup</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Deploy Live</div>
                      <div className="text-sm text-gray-500">Your site is ready!</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Custom Domain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ทุกอย่างที่คุณต้องการ <span className="text-orange-500">ในที่เดียว</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              เพียงแค่อัปโหลดโปรเจ็กต์ของคุณ ระบบจะจัดการทุกอย่างให้โดยอัตโนมัติ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Automated Deployment
              </h3>
              <p className="text-gray-600">
                Deploy ได้ทันทีด้วยการแค่ลาก-วาง ไม่จำเป็นต้องตั้งค่าใดๆ เลย
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Domain Mapping
              </h3>
              <p className="text-gray-600">
                เชื่อมต่อโดเมนส่วนตัว หรือ SSL Certificate ได้ทันที
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <GitBranch className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Git Integration
              </h3>
              <p className="text-gray-600">
                เชื่อมต่อกับ GitHub, GitLab หรือ Bitbucket สำหรับ Auto Deploy
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Performance Monitoring
              </h3>
              <p className="text-gray-600">
                ติดตามสถานะและประสิทธิภาพของเว็บไซต์แบบ Real-time
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                ความปลอดภัยระดับองค์กร พร้อมการเข้ารหัสและการยืนยันตัวตน
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Multiple Frameworks
              </h3>
              <p className="text-gray-600">
                รองรับ React, Vue, Angular, Next.js และ Static Site อื่นๆ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              เริ่มใช้งานใน <span className="text-orange-500">3 ขั้นตอน</span>
            </h2>
            <p className="text-lg text-gray-600">
              ง่าย 3 ขั้นตอน คุณก็สามารถใส่โดเมนได้แล้วเผยแพร่
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  1. Connect Repository
                </h3>
                <p className="text-gray-600 mb-4">
                  เชื่อมต่อ Git Repository ของคุณ<br />
                  หรือลาก-วางไฟล์โปรเจ็กต์
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <code className="text-sm text-green-600">
                    🌟 git push origin main<br />
                    → connecting to repository...
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  2. Configure Settings
                </h3>
                <p className="text-gray-600 mb-4">
                  กำหนดค่าโปรเจ็กต์อัตโนมัติ<br />
                  หรือปรับแต่งตามต้องการ
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <code className="text-sm text-blue-600">
                    ⚙️ Framework → configured<br />
                    🔧 SSL Certificate → active
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  3. Deploy Automatically
                </h3>
                <p className="text-gray-600 mb-4">
                  Deploy เสร็จสมบูรณ์และใช้งานได้ทันที<br />
                  🎉 เสร็จแล้ว! พร้อมใช้งาน
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <code className="text-sm text-green-600">
                    🚀 Deploying... [█████████] 100%<br />
                    ✅ Live at myproject.com
                  </code>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section */}


      {/* Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="md:col-span-1 flex justify-center flex-col items-center">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-white">DeployDomain</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                แพลตฟอร์มสำหรับ Deploy Website ที่ง่ายและรวดเร็วที่สุดสำหรับนักพัฒนาทุกระดับ
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
                  <span className="text-white text-sm">🐦</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
                  <span className="text-white text-sm">📷</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
                  <span className="text-white text-sm">💼</span>
                </div>
              </div>
            </div>

            {/* <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">CLI</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Tutorials</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Community</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Status</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">System Status</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms</a>
              </div>
            </div> */}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 DeployDomain. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm"></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}