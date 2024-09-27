import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="main login"  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <form style={{width: 'fit-content'}}>
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
          <label htmlFor="username" style={{display: 'flex', flexDirection: 'column'}}>
            username
            <input
              type="text"
              name="username"
              pattern="^[a-zA-Z0-9]+$"
              title="Special characters and spaces are not allowed"
              required
            />
          </label>
          <label htmlFor="password" style={{display: 'flex', flexDirection: 'column'}}>
            password
            <input
              type="text"
              name="password"
              pattern="^[a-zA-Z0-9]+$"
              title="Special characters and spaces are not allowed"
              required
            />
          </label>
          <button style={{width: 'fit-content'}}>Login</button>
          <div className="errors" style={{color: 'red'}}></div>
        </div>
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span>Don't have an account?</span>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
