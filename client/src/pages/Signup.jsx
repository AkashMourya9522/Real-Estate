import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      toast.success("User Created Successfully")
      setLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);
      navigate('/sign-in')
    } catch (err) {
      setLoading(false);
      setError(err.response.data.errorMessage);
      toast.error(err.response.data.errorMessage)
      return;
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">SignUp</h1>
      <form className="flex flex-col gap-7" onSubmit={handleFormSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="p-3  border-2 rounded-lg "
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          id="email"
          type="text"
          placeholder="Email"
          className="p-3  border-2 rounded-lg "
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="p-3 border-2 rounded-lg "
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          disabled={loading}
          className="bg-red-500 text-white font-semibold p-3 rounded-lg hover:opacity-95"
        >
          {loading ? "Loading" : "Sign up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 hover:underline">Signin</span>
        </Link>
      </div>
      {error ? <p className="text-red-600"> {error} </p>  : ""}
    </div>
  );
}

export default Signup;
