'use client';
import { BASE_URL } from '../../config/plublicpara';
import { useRouter } from 'next/navigation';
export default function Login() {
  const router = useRouter();
  
  async function Nlogin() {
    const userNoun = (document.getElementById("userNoun") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    console.log(userNoun,password)
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernoun: userNoun, password}),
      });

      const result = await res.json();
      if (res.status === 200) {
        localStorage.setItem('token', result.token);
        router.push('/dashboard');
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      router.push('/errorpage/servererror')
    }
  }
  function loginWithGithub() {
    // ตัวอย่าง redirect ไป GitHub OAuth
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID';
  }
  return (
    

    <div className="loginbox">
      <h2>Login to ADDMS</h2>

      <div className="form-group">
        <label htmlFor="username">Username or Gmail</label>
        <input type="text" id="userNoun" name="username" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>

      <button type="button" onClick={Nlogin} className="login-btn">Login</button>

      <div className="divider">or</div>

      <button type="button" onClick={loginWithGithub} className="github-btn">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          className="github-logo"
        />
        Continue with GitHub
      </button>
    </div>

  );
}
