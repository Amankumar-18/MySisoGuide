import { ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";
import { useState,useEffect } from "react";
export default function Home() {
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const token = getAccessToken();
    const isLoggedIn = !!token;

  
  const [counts, setCounts] = useState({
    courses: 0,
    subjects: 0,
    papers: 0,
  });


  useEffect(() => {
    fetch(`${BASEURL}/api/stats/`)
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch(console.error);
  }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="eyebrow">
          <ShieldCheck size={16} />
          <span>The PYQ Archive</span>
        </div>

        <h1 className="font-serif">
          Every previous year paper. <span>One vault.</span>
        </h1>

        <p>
          SisoGuide is a curated archive of previous year question papers
          across courses, subjects and years, verified by admins and ready
          when you need to study.
        </p>

        <div className="hero-actions">
          <button
            className="button gold"
            onClick={() => navigate("/courses")}
          >
            <span>Browse Courses</span>
            <ArrowRight size={18} />
          </button>

          {!isLoggedIn ?(<button
            className="button ghost"
            onClick={() => navigate("/login")}
          >
            Sign in to download
          </button>):(<button
            className="button ghost"
            onClick={() => navigate("/courses")}
          >
            Go to download
          </button>)}
        </div>

        <div className="stats">
          <div className="stat">
            <strong>{counts.courses}+</strong>
            <span>Courses</span>
          </div>

          <div className="stat">
            <strong>{counts.subjects}+</strong>
            <span>Subjects</span>
          </div>

          <div className="stat">
            <strong>{counts.papers}+</strong>
            <span>Papers</span>
          </div>
        </div>
      </div>
    </section>
  );
}