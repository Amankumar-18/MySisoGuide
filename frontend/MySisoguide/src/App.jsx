// // import {Link, useNavigate} from "react-router-dom";

// // import {useEffect,useState} from "react";


// // import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// // import { BookOpen, LogOut, ShieldCheck } from 'lucide-react';
// // import Navbar from "./components/Navbar";


// // function App() {
// //   return (
// //     <div className="app-shell">
// //       <Router>
// //   <Navbar />
// // </Router>
// //   <main className="main-content">
    
// //   </main>

// //   <footer className="footer">
// //     <div>
// //       <strong className="font-serif">PaperVault</strong>
// //       <span> · PYQ Archive</span>
// //     </div>
// //     <span>
// //       © 2026 PaperVault. All papers belong to their respective institutions.
// //     </span>
// //   </footer>
// // </div>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";

// import Home from "./pages/Home";
// import Courses from "./pages/Courses";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Subjects from "./pages/Subjects";
// import Paperspdf from "./pages/Paperspdf";
// // import AdminDashboard from "./pages/AdminDashboard";

// export default function App() {
//   return (
    
//       <Routes>
//         <Route element={<Layout />}>
//            <Route path="/" element={<Home />} />
//           <Route path="/courses" element={<Courses />} />
//           <Route path="/subjects/:courseId" element={<Subjects />} />
//           <Route path="/papers/:subjectId" element={<Paperspdf />} />

//           {/*}
//           <Route path="/admin" element={<AdminDashboard />} /> */}
//         </Route>

//         <Route path="/login" element={<Login/>} />
//         <Route path="/register" element={<Register/>} />
//       </Routes>
//   );
// }



import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import Paperspdf from "./pages/Paperspdf";

import Login from "./pages/Login";
import Register from "./pages/Register";

import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminDashboard from "./pages/superadmin/AdminDashboard";
export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

        <Route
          path="/subjects/:courseId"
          element={<Subjects />}
        />

        <Route
          path="/papers/:subjectId"
          element={<ProtectedRoute><Paperspdf /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "SUPERADMIN"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin"
          element={
            <ProtectedRoute
              allowedRoles={["SUPERADMIN"]}
            >
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

    </Routes>
  );
}