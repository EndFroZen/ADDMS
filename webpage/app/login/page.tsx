import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="main-container">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form action="/dashboard" method="get">
          <label htmlFor="username" className="input-label">Email or Username</label>
          <input 
            type="text" 
            name="TextNameUser" 
            id="username" 
            className="input-field" 
            placeholder="Enter your email or username"
            required
          />

          <label htmlFor="password" className="input-label">Password</label>
          <input 
            type="password" 
            name="PassWordUser" 
            id="password" 
            className="input-field" 
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
