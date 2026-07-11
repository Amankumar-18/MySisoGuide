import { useState } from "react";

import {
  ShieldCheck,
  Users,
  Shield,
  BookOpen,
  GraduationCap,
  FileText,
  Activity,
  Key,
} from "lucide-react";

import UsersTab from "./UsersTab";
import AdminsTab from "./AdminsTab";
import CoursesTab from "./CoursesTab";
import SubjectsTab from "./SubjectsTab";
import PapersTab from "./PapersTab";
import ActivityTab from "./ActivityTab";
import AccountTab from "./AccountTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("courses");

  const tabs = [
    
    {
      id: "courses",
      label: "Courses",
      icon: BookOpen,
    },
    {
      id: "subjects",
      label: "Subjects",
      icon: GraduationCap,
    },
    {
      id: "papers",
      label: "Papers",
      icon: FileText,
    },
    
    {
      id: "account",
      label: "Account",
      icon: Key,
    },
  ];

  return (
    <section className="page dashboard">

      <div className="container">

        {/* Heading */}

        <div className="control-title">

          <div className="eyebrow">
            <ShieldCheck size={16} />
            <span>Admin Panel</span>
          </div>

          <h1>Control Center</h1>

          <p className="muted">
            Manage courses, subjects,
             and question papers.
          </p>

        </div>

        {/* Tabs */}

        <div className="tabs hide-scrollbar">

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}

        </div>

        {/* Content */}

        <div className="tab-panel">

          

          {activeTab === "courses" && <CoursesTab />}

          {activeTab === "subjects" && <SubjectsTab />}

          {activeTab === "papers" && <PapersTab />}

          

          {activeTab === "account" && <AccountTab />}

        </div>

      </div>

    </section>
  );
}