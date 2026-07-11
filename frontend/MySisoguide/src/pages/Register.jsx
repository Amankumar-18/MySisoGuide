







// import { BookOpen } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// import { saveToken } from "../utils/auth";

// function Register() {
//   const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
//      const [form, setForm] = useState({ username: "", password: "" });
//      const [msg, setMsg] = useState("");
//      const nav=useNavigate();
 
//      const handleChange = (e) => {
//      setForm({ ...form, [e.target.name]: e.target.value });
//      };
 
 
//      const handleSubmit = async (event) => {
//      event.preventDefault();
//      setMsg("");
 
//      try {
//        const response = await fetch(`${BASEURL}/api/auth/register`, {
//          method: "POST",
//          headers: {
//            "Content-Type": "application/json",
//          },
//          body: JSON.stringify(form),
//        });
 
//        const data = await response.json();
 
//        if (response.ok) {
         
//          saveToken(data);
//          setMsg("Registration successful!");
//          setTimeout(() => {
//            nav("/login");
//          }, 800);
//        } else {
//          setMsg(data.detail || "Registration failed. Please try again.");
//        }
//      } catch (error) {
//      setMsg("Registration Failed.");}
//    };

//   return (
//     <section className="auth-page">
//       <div className="auth-card">
//         <div className="auth-logo">
//           <BookOpen size={32} />
//         </div>

//         <h1>Create an account</h1>
//         <p>Join PaperVault to access all resources.</p>

//         <form className="form" onSubmit={handleSubmit}>
//           <label>
//             Username
//             <input
//               className="input"
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             First Name
//             <input
//               className="input"
//               type="text"
//               name="first_name"
//               value={form.first_name}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Last Name
//             <input
//               className="input"
//               type="text"
//               name="last_name"
//               value={form.last_name}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Email Address
//             <input
//               className="input"
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Password
//             <input
//               className="input"
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <button className="button gold" type="submit">
//             Create Account
//           </button>
//         </form>

//         <div className="auth-switch">
//           Already have an account?{" "}
//           <Link to="/login">Sign In</Link>
//         </div>
//       </div>
//     </section>
//   );
// }


// export default Register;



import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await fetch(`${BASEURL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg("Registration successful! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        if (data.username) {
          setMsg(data.username[0]);
        } else if (data.email) {
          setMsg(data.email[0]);
        } else if (data.password) {
          setMsg(data.password[0]);
        } else if (data.detail) {
          setMsg(data.detail);
        } else {
          setMsg("Registration failed.");
        }
      }
    } catch (error) {
      console.error(error);
      setMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <BookOpen size={32} />
        </div>

        <h1>Create an account</h1>
        <p>Join PaperVault to access all resources.</p>

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
              required
            />
          </label>

          <label>
            First Name
            <input
              className="input"
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name
            <input
              className="input"
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
              required
            />
          </label>

          <button className="button gold" type="submit">
            Create Account
          </button>
        </form>

        <div className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;