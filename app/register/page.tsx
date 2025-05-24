'use client';

import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../config/plublicpara';
export default function Register() {
  const router = useRouter();

  async function NRegister() {
    const username = (document.getElementById("username") as HTMLInputElement)?.value || '';
    const email = (document.getElementById("email") as HTMLInputElement)?.value || '';
    const password = (document.getElementById("password") as HTMLInputElement)?.value || '';
    const confirm = (document.getElementById("confirm") as HTMLInputElement)?.value || '';

    // ตรวจสอบ password กับ confirm password
    if (password !== confirm) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL }/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();

      if (res.status === 200 || result.status === 200) {
        alert("Register successful! Redirecting to login...");
        router.push('/login');
      } else {
        alert(result.message || "Register failed");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  function registerWithGithub() {
    // ตัวอย่าง URL OAuth Github (แก้ client_id ให้ถูกต้อง)
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID';
  }

  return (
    <div className="register-page">
      <h2>Register to ADDMS</h2>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>

      <div className="form-group">
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" id="confirm" name="confirm" required />
      </div>

      <button type="button" onClick={NRegister} className="register-btn">Register</button>

      <div className="divider">or</div>

      <button type="button" onClick={registerWithGithub} className="github-btn">
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
