import { Link } from "react-router-dom"

const Register = () => {

  const formHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: {value: string};
      email : {value: string};
      password: {value: string};
    }
    const email = target.email.value;
    const password = target.password.value;
    const username = target.username.value;

    console.log(`email: ${email}, username: ${username} ,password: ${password}`);

  }

  return (
    <div className="main register"  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <form style={{width: 'fit-content'}} method="POST" onSubmit={formHandler}>
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
          <label htmlFor="email" style={{display: 'flex', flexDirection: 'column'}}>
            email
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              title="Email required"
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
          <button style={{width: 'fit-content'}}>register</button>
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
        <span>Already have an account?</span>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  )
}

export default Register