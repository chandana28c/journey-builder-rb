import { useResume, genId } from "@/contexts/ResumeContext";
import type { Education, Experience, Project } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Sparkles } from "lucide-react";

export function ResumeForm() {
  const { resume, updateField, loadSampleData } = useResume();

  const updatePersonal = (key: string, value: string) =>
    updateField("personalInfo", { ...resume.personalInfo, [key]: value });

  const updateLinks = (key: string, value: string) =>
    updateField("links", { ...resume.links, [key]: value });

  // Education helpers
  const addEducation = () =>
    updateField("education", [
      ...resume.education,
      { id: genId("edu"), institution: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);
  const removeEducation = (id: string) =>
    updateField("education", resume.education.filter((e) => e.id !== id));
  const updateEducation = (id: string, key: keyof Education, value: string) =>
    updateField("education", resume.education.map((e) => (e.id === id ? { ...e, [key]: value } : e)));

  // Experience helpers
  const addExperience = () =>
    updateField("experience", [
      ...resume.experience,
      { id: genId("exp"), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);
  const removeExperience = (id: string) =>
    updateField("experience", resume.experience.filter((e) => e.id !== id));
  const updateExperience = (id: string, key: keyof Experience, value: string) =>
    updateField("experience", resume.experience.map((e) => (e.id === id ? { ...e, [key]: value } : e)));

  // Project helpers
  const addProject = () =>
    updateField("projects", [
      ...resume.projects,
      { id: genId("proj"), name: "", description: "", techStack: "", link: "" },
    ]);
  const removeProject = (id: string) =>
    updateField("projects", resume.projects.filter((p) => p.id !== id));
  const updateProject = (id: string, key: keyof Project, value: string) =>
    updateField("projects", resume.projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Resume Builder</h2>
        <Button variant="outline" size="sm" onClick={loadSampleData}>
          <Sparkles className="h-3.5 w-3.5" /> Load Sample Data
        </Button>
      </div>

      {/* Personal Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Input placeholder="Full Name" value={resume.personalInfo.name} onChange={(e) => updatePersonal("name", e.target.value)} />
          <Input placeholder="Email" value={resume.personalInfo.email} onChange={(e) => updatePersonal("email", e.target.value)} />
          <Input placeholder="Phone" value={resume.personalInfo.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
          <Input placeholder="Location" value={resume.personalInfo.location} onChange={(e) => updatePersonal("location", e.target.value)} />
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Write a brief professional summary…" value={resume.summary} onChange={(e) => updateField("summary", e.target.value)} className="min-h-[100px]" />
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Education</CardTitle>
          <Button variant="outline" size="sm" onClick={addEducation}><Plus className="h-3.5 w-3.5" /> Add</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.education.length === 0 && <p className="text-sm text-muted-foreground">No education entries yet.</p>}
          {resume.education.map((edu) => (
            <div key={edu.id} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Education Entry</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeEducation(edu.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
              <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                <Input placeholder="Field of Study" value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start Date" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} />
                <Input placeholder="End Date" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Experience</CardTitle>
          <Button variant="outline" size="sm" onClick={addExperience}><Plus className="h-3.5 w-3.5" /> Add</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.experience.length === 0 && <p className="text-sm text-muted-foreground">No experience entries yet.</p>}
          {resume.experience.map((exp) => (
            <div key={exp.id} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Experience Entry</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeExperience(exp.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                <Input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} />
                <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} />
              </div>
              <Textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} className="min-h-[80px]" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Projects</CardTitle>
          <Button variant="outline" size="sm" onClick={addProject}><Plus className="h-3.5 w-3.5" /> Add</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.projects.length === 0 && <p className="text-sm text-muted-foreground">No project entries yet.</p>}
          {resume.projects.map((proj) => (
            <div key={proj.id} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Project Entry</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeProject(proj.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} />
                <Input placeholder="Tech Stack" value={proj.techStack} onChange={(e) => updateProject(proj.id, "techStack", e.target.value)} />
              </div>
              <Textarea placeholder="Description" value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} className="min-h-[60px]" />
              <Input placeholder="Link" value={proj.link} onChange={(e) => updateProject(proj.id, "link", e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="React, TypeScript, Node.js, Python…" value={resume.skills} onChange={(e) => updateField("skills", e.target.value)} />
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Links</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Input placeholder="GitHub URL" value={resume.links.github} onChange={(e) => updateLinks("github", e.target.value)} />
          <Input placeholder="LinkedIn URL" value={resume.links.linkedin} onChange={(e) => updateLinks("linkedin", e.target.value)} />
        </CardContent>
      </Card>
    </div>
  );
}
