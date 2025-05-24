'use client';

import React from 'react';

export default function Register() {
  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    // TODO: ดำเนินการสมัครสมาชิก เช่นส่งข้อมูลไปยัง backend
    console.log("Register submitted");
  }

  function registerWithGithub() {
    // TODO: ดำเนินการสมัครสมาชิกผ่าน GitHub OAuth
    console.log("Register with GitHub");
  }

  return (
    <div className="register-page">
      <form onSubmit={handleRegister} className="register-form">
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

        <button type="submit" className="register-btn">Register</button>

        <div className="divider">or</div>

        <button
          type="button"
          onClick={registerWithGithub}
          className="github-btn"
        >
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
