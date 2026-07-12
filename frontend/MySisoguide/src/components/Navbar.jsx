



// import { NavLink, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BookOpen, LogOut, ShieldCheck } from "lucide-react";
// import { getAccessToken, clearTokens } from "../utils/auth";

// export default function Navbar() {
//   const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);

//   const token = getAccessToken();
//   const isLoggedIn = !!token;

//   useEffect(() => {
//     if (!token) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`${BASEURL}/api/auth/me/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.status === 401) {
//           clearTokens();
//           navigate("/login");
//           return;
//         }

//         const data = await res.json();
//         setProfile(data);
//         console.log("Profile data:", data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProfile();
//   }, [BASEURL, token, navigate]);

//   const handleLogout = () => {
//     clearTokens();
//     navigate("/login");
//   };

//   return (
//     <header className="topbar">
//       <button
//         className="brand"
//         onClick={() => navigate("/")}
//       >
//         <span className="brand-mark">
//           <BookOpen size={24} />
//         </span>

//         <span className="font-serif">SisoGuide</span>
//       </button>

//       <nav className="nav">
//         <NavLink to="/courses">Courses</NavLink>

//         { profile?.role =="ADMIN" && (<NavLink to="/admin">
//           <ShieldCheck size={16} />
//           <span>Admin</span>
//         </NavLink>)}

//         { profile?.role =="SUPERADMIN" && (<NavLink to="/superadmin">
//           <ShieldCheck size={16} />
//           <span>Superadmin</span>
//         </NavLink>)}
//         </nav>
      

//       {!isLoggedIn ? (
//         <button
//           className="button gold"
//           onClick={() => navigate("/login")}
//         >
//           Login
//         </button>
//       ) : (
//         <div className="profile">
//           <div className="profile-email">
//             <span className="avatar">
//               {profile?.username?.charAt(0).toUpperCase() || "U"}
//             </span>

//             <span>{profile?.first_name} {profile?.last_name}</span>
//           </div>

//           <button
//             onClick={handleLogout}
//             title="Logout"
//           >
//             <LogOut size={20} />
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }




import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, LogOut, ShieldCheck, Menu, X, KeyRound } from "lucide-react";
import { getAccessToken, clearTokens } from "../utils/auth";
import ChangePasswordModal from "./resourcemodal/ChangePasswordModal";

export default function Navbar() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for mobile menu

  const token = getAccessToken();
  const isLoggedIn = !!token;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASEURL}/api/auth/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          clearTokens();
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProfile(data);
        console.log("Profile data:", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [BASEURL, token, navigate]);

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <button
        className="brand"
        onClick={() => navigate("/")}
      >
        <span className="brand-mark">
          <BookOpen size={24} />
        </span>
        <span className="font-serif">SisoGuide</span>
      </button>

      {/* --- DESKTOP NAV --- */}
      <nav className="nav">
        <NavLink to="/courses">Courses</NavLink>

        {profile?.role === "ADMIN" && (
          <NavLink to="/admin">
            <ShieldCheck size={16} />
            <span>Admin</span>
          </NavLink>
        )}

        {profile?.role === "SUPERADMIN" && (
          <NavLink to="/superadmin">
            <ShieldCheck size={16} />
            <span>Superadmin</span>
          </NavLink>
        )}
      </nav>

      {/* --- DESKTOP AUTH/PROFILE (Hide on mobile) --- */}
      <div className="desktop-auth">
        {!isLoggedIn ? (
          <button
            className="button gold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <div className="profile">
            <div className="profile-email">
              <span className="avatar">
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </span>
              <span>{profile?.first_name} {profile?.last_name}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>

      {/* --- MOBILE HAMBURGER BUTTON --- */}
      
      {/* --- MOBILE RIGHT SECTION --- */}
{isLoggedIn ? (
  <>
    <button
      className="hamburger-btn"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* --- MOBILE MENU SLIDER --- */}
    <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
      {isLoggedIn && (
        <div className="mobile-profile-header">
          <span className="avatar">
            {profile?.username?.charAt(0).toUpperCase() || "U"}
          </span>
          <span>
            {profile?.first_name} {profile?.last_name}
          </span>
        </div>
      )}

      <NavLink to="/courses" onClick={() => setIsMenuOpen(false)}>
        <BookOpen size={16} />
        Courses
      </NavLink>

      {profile?.role === "ADMIN" && (
        <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>
          <ShieldCheck size={16} />
          <span>Admin</span>
        </NavLink>
      )}

      {profile?.role === "SUPERADMIN" && (
        <NavLink to="/superadmin" onClick={() => setIsMenuOpen(false)}>
          <ShieldCheck size={16} />
          <span>Superadmin</span>
        </NavLink>
      )}
      <button
  className="menu-btn"
  onClick={() => {
    setIsMenuOpen(false);
    setModalOpen(true);
  }}
>
  <KeyRound size={16} />
  Change Password
</button>

      <button
        className="logout-btn"
        onClick={() => {
          setIsMenuOpen(false);
          handleLogout();
        }}
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  </>
) : (
  <button
    className="button gold mobile-login-btn"
    onClick={() => navigate("/login")}
  >
    Login
  </button>
)}
       
      <ChangePasswordModal
              isOpen={modalOpen}
              onClose={() => {
                setModalOpen(false);
                
              }}
              
            />
    </header>
  );
}