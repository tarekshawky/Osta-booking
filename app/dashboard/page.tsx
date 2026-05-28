import "./login/login.css";
export default function LoginPage() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Dashboard Login</h1>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}