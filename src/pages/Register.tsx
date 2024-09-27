import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState("");

  const formHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;
    const username = target.username.value;

    try {
      const res = await fetch("https://backend-uoiu.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData : {err: string} = await res.json();
        throw new Error(errorData.err || "An error occurred");
      }

      setErr("");
      
      const data = await res.json();

      console.log(data);
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message); 
      }
    }
  };

  return (
    <div className="main register" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <form style={{ width: "fit-content" }} method="POST" onSubmit={formHandler}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <label htmlFor="username" style={{ display: "flex", flexDirection: "column" }}>
            Username
            <input type="text" name="username" title="Special characters and spaces are not allowed" required />
          </label>
          <label htmlFor="email" style={{ display: "flex", flexDirection: "column" }}>
            Email
            <input type="email" name="email" title="Email required" required />
          </label>
          <label htmlFor="password" style={{ display: "flex", flexDirection: "column" }}>
            Password
            <input type="password" name="password" title="Special characters and spaces are not allowed" required />
          </label>
          <button style={{ width: "fit-content" }}>Register</button>
          <div className="errors" style={{ color: "red" }}>{err}</div>
        </div>
      </form>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span>Already have an account?</span>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
