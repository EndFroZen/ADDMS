package content

func HtmlCSS()string{
	return `:root {
            --deep-blue: #0a192f;
            --navy: #112240;
            --light-navy: #233554;
            --orange: #ff7a59;
            --orange-accent: #F7931E;
            --white: #e6f1ff;
            --light-slate: #a8b2d1;
            --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
            --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-sans);
            background-color: var(--deep-blue);
            color: var(--white);
            overflow-x: hidden;
            line-height: 1.6;
        }

        .content-main {
            display: grid;
            grid-template-columns: 1fr 1.5fr 1fr;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }

        .box1 {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background-color: rgba(10, 25, 47, 0.8);
            z-index: 2;
            position: relative;
        }

        .logo-svg {
            width: 120px;
            height: 120px;
            margin-bottom: 2rem;
            filter: drop-shadow(0 0 10px rgba(247, 147, 30, 0.4));
            animation: float 6s ease-in-out infinite;
        }

        .name {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--orange-accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 1rem;
            text-shadow: 0 0 10px rgba(247, 147, 30, 0.4);
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s 0.3s forwards;
        }

        .box2 {
            display: flex;
            align-items: center;
            padding: 4rem;
            background-color: rgba(17, 34, 64, 0.6);
            z-index: 2;
            position: relative;
        }

        .hero-content {
            max-width: 600px;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s 0.5s forwards;
        }

        .hero-subtitle {
            font-size: 1rem;
            color: var(--orange-accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            font-weight: 500;
        }

        .hero-title {
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            background: linear-gradient(90deg, #ffffff, var(--light-slate));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .hero-description {
            font-size: 1.1rem;
            color: var(--light-slate);
            margin-bottom: 2.5rem;
        }

        .cta-button {
            display: inline-block;
            padding: 1rem 2rem;
            background-color: var(--orange-accent);
            color: var(--deep-blue);
            font-weight: 600;
            text-decoration: none;
            border-radius: 4px;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 20px -10px rgba(247, 147, 30, 0.5);
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 25px -10px rgba(247, 147, 30, 0.6);
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: 0.5s;
        }

        .cta-button:hover::before {
            left: 100%;
        }

        .box3 {
            position: relative;
            overflow: hidden;
            background-color: rgba(35, 53, 84, 0.4);
        }

        /* Animated background elements */
        .box3::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(247, 147, 30, 0.1) 0%, transparent 70%);
            animation: rotate 30s linear infinite;
            z-index: 1;
        }

        .box3::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="none" width="200" height="200"/><path fill="rgba(168, 178, 209, 0.05)" d="M100 0h100v100H100zM0 100h100v100H0z"/></svg>');
            background-size: 30px 30px;
            opacity: 0.3;
            z-index: 1;
        }

        /* Floating server icons */
        .server-icon {
            position: absolute;
            opacity: 0.6;
            z-index: 2;
            animation: float 6s ease-in-out infinite;
        }

        .server-icon:nth-child(1) {
            top: 20%;
            left: 30%;
            width: 40px;
            height: 40px;
            animation-delay: 0s;
        }

        .server-icon:nth-child(2) {
            top: 60%;
            left: 20%;
            width: 30px;
            height: 30px;
            animation-delay: 1s;
        }

        .server-icon:nth-child(3) {
            top: 40%;
            right: 25%;
            width: 50px;
            height: 50px;
            animation-delay: 2s;
        }

        .server-icon:nth-child(4) {
            bottom: 20%;
            right: 30%;
            width: 35px;
            height: 35px;
            animation-delay: 3s;
        }

        /* Terminal window animation */
        .terminal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            max-width: 500px;
            background-color: rgba(10, 25, 47, 0.8);
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            z-index: 3;
            opacity: 0;
            animation: fadeIn 1s 1s forwards;
        }

        .terminal-header {
            height: 30px;
            background-color: var(--light-navy);
            display: flex;
            align-items: center;
            padding: 0 10px;
        }

        .terminal-button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .terminal-button.red {
            background-color: #ff5f56;
        }

        .terminal-button.yellow {
            background-color: #ffbd2e;
        }

        .terminal-button.green {
            background-color: #27c93f;
        }

        .terminal-body {
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #7afb4c;
            line-height: 1.5;
        }

        .terminal-line {
            margin-bottom: 8px;
            opacity: 0;
            transform: translateY(10px);
        }

        .terminal-line:nth-child(1) { animation: terminalTyping 0.5s 1.5s forwards; }
        .terminal-line:nth-child(2) { animation: terminalTyping 0.5s 2s forwards; }
        .terminal-line:nth-child(3) { animation: terminalTyping 0.5s 2.5s forwards; }
        .terminal-line:nth-child(4) { animation: terminalTyping 0.5s 3s forwards; }
        .terminal-line:nth-child(5) { animation: terminalTyping 0.5s 3.5s forwards; }
        .terminal-line:nth-child(6) { animation: terminalTyping 0.5s 4s forwards; }

        .cursor {
            display: inline-block;
            width: 8px;
            height: 16px;
            background-color: #7afb4c;
            animation: blink 1s infinite;
            vertical-align: middle;
            margin-left: 2px;
        }

        /* Animations */
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes terminalTyping {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* Responsive design */
        @media (max-width: 1024px) {
            .content-main {
                grid-template-columns: 1fr;
                grid-template-rows: auto 1fr auto;
            }

            .box1 {
                padding: 1.5rem;
                flex-direction: row;
                align-items: center;
            }

            .logo-svg {
                width: 60px;
                height: 60px;
                margin-bottom: 0;
                margin-right: 1rem;
            }

            .name {
                font-size: 1.8rem;
                margin-top: 0;
            }

            .box2 {
                padding: 2rem;
            }

            .hero-title {
                font-size: 2rem;
            }

            .terminal {
                width: 90%;
                position: relative;
                top: auto;
                left: auto;
                transform: none;
                margin: 2rem auto;
            }
        }`
}