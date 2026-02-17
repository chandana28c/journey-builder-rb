import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { calculateATSScore, ATSScoreResult } from "@/utils/atsScoring";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string;
  link: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string;
  links: {
    github: string;
    linkedin: string;
  };
  template: "classic" | "modern" | "minimal";
}

const emptyResume: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: "",
  links: { github: "", linkedin: "" },
  template: "modern",
};

const sampleResume: ResumeData = {
  personalInfo: {
    name: "Ananya Sharma",
    email: "ananya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
  },
  summary:
    "Full-stack developer with 2+ years of experience building scalable web applications. Passionate about clean code, system design, and delivering user-centric products.",
  education: [
    {
      id: "edu-1",
      institution: "Indian Institute of Technology, Bangalore",
      degree: "B.Tech",
      field: "Computer Science",
      startDate: "2019",
      endDate: "2023",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechCorp Solutions",
      role: "Software Engineer",
      startDate: "Jul 2023",
      endDate: "Present",
      description:
        "Built microservices handling 10K+ requests/min. Led migration from monolith to event-driven architecture.",
    },
    {
      id: "exp-2",
      company: "StartupXYZ",
      role: "Frontend Intern",
      startDate: "Jan 2023",
      endDate: "Jun 2023",
      description:
        "Developed React dashboard used by 500+ daily active users. Reduced page load time by 40%.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "AI Resume Builder",
      description: "A smart resume builder with ATS scoring and live preview.",
      techStack: "React, TypeScript, Tailwind CSS",
      link: "https://github.com/ananya/resume-builder",
    },
  ],
  skills: "React, TypeScript, Node.js, Python, PostgreSQL, Docker, AWS, Git",
  links: {
    github: "https://github.com/ananya-sharma",
    linkedin: "https://linkedin.com/in/ananya-sharma",
  },
  template: "modern",
};

interface ResumeContextType {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  loadSampleData: () => void;
  clearData: () => void;
  atsScore: ATSScoreResult;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<ResumeData>(emptyResume);
  const [atsScore, setAtsScore] = useState<ATSScoreResult>({ score: 0, suggestions: [] });

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResume((prev) => ({ ...prev, [key]: value }));
  }, []);

  const loadSampleData = useCallback(() => setResume(sampleResume), []);
  const clearData = useCallback(() => setResume(emptyResume), []);

  // Autosave & Load Logic
  useEffect(() => {
    const savedData = localStorage.getItem("resumeBuilderData");
    if (savedData) {
      try {
        setResume(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse resume data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeBuilderData", JSON.stringify(resume));
    setAtsScore(calculateATSScore(resume));
  }, [resume]);

  return (
    <ResumeContext.Provider value={{ resume, setResume, updateField, loadSampleData, clearData, atsScore }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}

let idCounter = 0;
export function genId(prefix: string) {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}
