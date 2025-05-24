'use client';

import React from 'react';

export default function Register() {
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // TODO: ดำเนินการเข้าสู่ระบบด้วย username/gmail + password
    console.log("Login submitted");
  }

  function loginWithGithub() {
    // TODO: ดำเนินการเข้าสู่ระบบผ่าน GitHub OAuth
    console.log("Login with GitHub");
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login to ADDMS</h2>

        <div className="form-group">
          <label htmlFor="username">Username or Gmail</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="login-btn">Login</button>

        <div className="divider">or</div>

        <button type="button" onClick={loginWithGithub} className="github-btn">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="github-logo"
          />
          Continue with GitHub
        </button>
      </form>
    </div>
  );
}
