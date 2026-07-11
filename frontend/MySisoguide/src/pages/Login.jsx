// import React from "react";
// import {Link, useNavigate} from "react-router-dom";
// import {BookOpen, ArrowLeft} from "lucide-react";
// import {useState} from "react";
// import {saveToken} from "../utils/auth";


// function Login() {

//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
//     const [form, setForm] = useState({ username: "", password: "" });
//     const [msg, setMsg] = useState("");
//     const nav=useNavigate();

//     const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     };


//     const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMsg("");

//     try {
//       const response = await fetch(`${BASEURL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await response.json();

//       if (response.ok) {
        
//         saveToken(data);
//         setMsg("Login successful!");
//         setTimeout(() => {
//           nav("/");
//         }, 800);
//       } else {
//         setMsg(data.detail || "Login failed. Please try again.");
//       }
//     } catch (error) {
//     setMsg("Login Failed.");}
//   };


//   return (
//     <section className="auth-page">
//       <div className="auth-card">
//         <div className="auth-logo"><BookOpen size={32} /></div>
//         <h1>Welcome back</h1>
//         <p>Enter your credentials to access the vault.</p>
//         <form className="form" onSubmit={(event) => { event.preventDefault(); navigate('home'); }}>
//           <label>Email address<input name="username" value={form.username} onChange={handleChange} className="input" type="email" placeholder="Username" required /></label>
//           <label>Password<input name="password"value={form.password} onChange={handleChange} className="input" type="password" placeholder="Password" required /></label>
//           <button className="button primary" type="submit">Sign in</button>
//         </form>
//         <div className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></div>
//       </div>
//       <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link>
//     </section>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { saveToken } from "../utils/auth";

function Login() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMsg("");

    try {
      const response = await fetch(`${BASEURL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data);
        setMsg("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setMsg(data.detail || "Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
      setMsg("Unable to connect to the server.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <BookOpen size={32} />
        </div>

        <h1>Welcome back</h1>
        <p>Enter your credentials to access the vault.</p>

        {msg && (
          <p
            style={{
              color: msg.includes("successful") ? "green" : "red",
              marginBottom: "15px",
            }}
          >
            {msg}
          </p>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </label>

          <label>
            Password
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>

          <button className="button primary" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </div>
        <div className="auth-switch">
          <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to home
      </Link>
        </div>
      </div>

      
    </section>
  );
}

export default Login;