import { ResumeData } from "@/contexts/ResumeContext";

export function resumeToPlainText(resume: ResumeData): string {
  const lines: string[] = [];

  // Name
  if (resume.personalInfo.name) {
    lines.push(resume.personalInfo.name.toUpperCase());
  }

  // Contact
  const contact = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
  ].filter(Boolean);
  if (contact.length) lines.push(contact.join(" · "));

  // Links
  const links = [resume.links.github, resume.links.linkedin].filter(Boolean);
  if (links.length) lines.push(links.join(" | "));

  lines.push("");

  // Summary
  if (resume.summary.trim()) {
    lines.push("SUMMARY");
    lines.push(resume.summary.trim());
    lines.push("");
  }

  // Experience
  if (resume.experience.length > 0) {
    lines.push("EXPERIENCE");
    resume.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company} (${exp.startDate} – ${exp.endDate})`);
      if (exp.description.trim()) lines.push(exp.description.trim());
      lines.push("");
    });
  }

  // Projects
  if (resume.projects.length > 0) {
    lines.push("PROJECTS");
    resume.projects.forEach((proj) => {
      const tech = proj.techStack ? ` [${proj.techStack}]` : "";
      lines.push(`${proj.name}${tech}`);
      if (proj.description.trim()) lines.push(proj.description.trim());
      if (proj.link) lines.push(proj.link);
      lines.push("");
    });
  }

  // Education
  if (resume.education.length > 0) {
    lines.push("EDUCATION");
    resume.education.forEach((edu) => {
      const field = edu.field ? ` in ${edu.field}` : "";
      lines.push(`${edu.degree}${field} — ${edu.institution} (${edu.startDate} – ${edu.endDate})`);
    });
    lines.push("");
  }

  // Skills
  if (resume.skills.trim()) {
    lines.push("SKILLS");
    lines.push(resume.skills.trim());
    lines.push("");
  }

  return lines.join("\n").trim();
}
