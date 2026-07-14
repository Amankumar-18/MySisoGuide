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

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "admins",
      label: "Admins",
      icon: Shield,
    },
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
      id: "activity",
      label: "Activity",
      icon: Activity,
    },
    
  ];

  return (
    <section className="page dashboard">

      <div className="container">

        {/* Heading */}

        <div className="control-title">

          <div className="eyebrow">
            <ShieldCheck size={16} />
            <span>Super Admin Panel</span>
          </div>

          <h1>Control Center</h1>

          <p className="muted">
            Manage users, admins, courses, subjects,
            question papers and activities.
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

          {activeTab === "users" && <UsersTab />}

          {activeTab === "admins" && <AdminsTab />}

          {activeTab === "courses" && <CoursesTab />}

          {activeTab === "subjects" && <SubjectsTab />}

          {activeTab === "papers" && <PapersTab />}

          {activeTab === "activity" && <ActivityTab />}

          
        </div>

      </div>

    </section>
  );
}