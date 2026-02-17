import { ResumeData, getAllSkills } from "@/contexts/ResumeContext";

export function resumeToPlainText(resume: ResumeData): string {
  const lines: string[] = [];

  if (resume.personalInfo.name) {
    lines.push(resume.personalInfo.name.toUpperCase());
  }

  const contact = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
  ].filter(Boolean);
  if (contact.length) lines.push(contact.join(" · "));

  const links = [resume.links.github, resume.links.linkedin].filter(Boolean);
  if (links.length) lines.push(links.join(" | "));

  lines.push("");

  if (resume.summary.trim()) {
    lines.push("SUMMARY");
    lines.push(resume.summary.trim());
    lines.push("");
  }

  if (resume.experience.length > 0) {
    lines.push("EXPERIENCE");
    resume.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company} (${exp.startDate} – ${exp.endDate})`);
      if (exp.description.trim()) lines.push(exp.description.trim());
      lines.push("");
    });
  }

  if (resume.projects.length > 0) {
    lines.push("PROJECTS");
    resume.projects.forEach((proj) => {
      const tech = proj.techStack.length > 0 ? ` [${proj.techStack.join(", ")}]` : "";
      lines.push(`${proj.name}${tech}`);
      if (proj.description.trim()) lines.push(proj.description.trim());
      if (proj.link) lines.push(proj.link);
      if (proj.githubLink) lines.push(proj.githubLink);
      lines.push("");
    });
  }

  if (resume.education.length > 0) {
    lines.push("EDUCATION");
    resume.education.forEach((edu) => {
      const field = edu.field ? ` in ${edu.field}` : "";
      lines.push(`${edu.degree}${field} — ${edu.institution} (${edu.startDate} – ${edu.endDate})`);
    });
    lines.push("");
  }

  const allSkills = getAllSkills(resume.skills);
  if (allSkills.length > 0) {
    lines.push("SKILLS");
    if (resume.skills.technical.length > 0) lines.push(`Technical: ${resume.skills.technical.join(", ")}`);
    if (resume.skills.soft.length > 0) lines.push(`Soft Skills: ${resume.skills.soft.join(", ")}`);
    if (resume.skills.tools.length > 0) lines.push(`Tools: ${resume.skills.tools.join(", ")}`);
    lines.push("");
  }

  return lines.join("\n").trim();
}
