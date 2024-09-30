import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [err, setErr] = useState("");
  const auth = useAuth();

  const formHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      const res = await fetch("https://backend-uoiu.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData : {err: string} = await res.json();
        throw new Error(errorData.err || "An error occurred");
      }

      auth.login({email , password})

      setErr(""); 
      return;
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message); 
      }
    }
  };

  return (
    <div className="main login"  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <form style={{width: 'fit-content'}} method="POST"  onSubmit={formHandler}>
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
          <label htmlFor="email" style={{display: 'flex', flexDirection: 'column'}}>
            email
            <input
              type="email"
              name="email"
              title="email required to login"
              required
            />
          </label>
          <label htmlFor="password" style={{display: 'flex', flexDirection: 'column'}}>
            password
            <input
              type="password"
              name="password"
              title="Special characters and spaces are not allowed"
              required
            />
          </label>
          <button style={{width: 'fit-content'}}>Login</button>
          <div className="errors" style={{color: 'red'}}>{err}</div>
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
