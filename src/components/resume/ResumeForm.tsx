import { useState } from "react";
import { useResume, genId } from "@/contexts/ResumeContext";
import type { Education, Experience, Project, SkillsData } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Trash2, Sparkles, ChevronDown, ExternalLink, Github, Loader2 } from "lucide-react";
import { BulletGuidance } from "./BulletGuidance";
import { TagInput } from "./TagInput";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ResumeForm() {
  const { resume, updateField, loadSampleData } = useResume();
  const [suggestingSkills, setSuggestingSkills] = useState(false);
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

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
  const addProject = () => {
    const newId = genId("proj");
    updateField("projects", [
      ...resume.projects,
      { id: newId, name: "", description: "", techStack: [], link: "", githubLink: "" },
    ]);
    setOpenProjects((prev) => ({ ...prev, [newId]: true }));
  };
  const removeProject = (id: string) =>
    updateField("projects", resume.projects.filter((p) => p.id !== id));
  const updateProject = (id: string, updates: Partial<Project>) =>
    updateField("projects", resume.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));

  const toggleProject = (id: string) =>
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }));

  // Skills helpers
  const updateSkillCategory = (category: keyof SkillsData, tags: string[]) =>
    updateField("skills", { ...resume.skills, [category]: tags });

  const handleSuggestSkills = () => {
    setSuggestingSkills(true);
    setTimeout(() => {
      const suggested: SkillsData = {
        technical: [...new Set([...resume.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
        soft: [...new Set([...resume.skills.soft, "Team Leadership", "Problem Solving"])],
        tools: [...new Set([...resume.skills.tools, "Git", "Docker", "AWS"])],
      };
      updateField("skills", suggested);
      setSuggestingSkills(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Resume Builder</h2>
        <Button variant="outline" size="sm" onClick={loadSampleData}>
          <Sparkles className="h-3.5 w-3.5 mr-1" /> Load Sample Data
        </Button>
      </div>

      {/* Template Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Template</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={resume.template} onValueChange={(v) => updateField("template", v as "classic" | "modern" | "minimal")}>
            <TabsList className="w-full">
              <TabsTrigger value="classic" className="flex-1">Classic</TabsTrigger>
              <TabsTrigger value="modern" className="flex-1">Modern</TabsTrigger>
              <TabsTrigger value="minimal" className="flex-1">Minimal</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

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
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  className="min-h-[100px]"
                />
                <BulletGuidance text={exp.description} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects — Collapsible */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Projects</CardTitle>
          <Button variant="outline" size="sm" onClick={addProject}><Plus className="h-3.5 w-3.5" /> Add Project</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {resume.projects.length === 0 && <p className="text-sm text-muted-foreground">No project entries yet.</p>}
          {resume.projects.map((proj) => (
            <Collapsible key={proj.id} open={openProjects[proj.id] ?? false} onOpenChange={() => toggleProject(proj.id)}>
              <div className="rounded-md border border-border">
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors">
                    <span>{proj.name || "Untitled Project"}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openProjects[proj.id] ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-3 px-3 pb-3 pt-1 border-t border-border">
                    <Input
                      placeholder="Project Title"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                    />
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Description</Label>
                        <span className={`text-xs ${proj.description.length > 200 ? "text-destructive" : "text-muted-foreground"}`}>
                          {proj.description.length}/200
                        </span>
                      </div>
                      <Textarea
                        placeholder="What does this project do?"
                        value={proj.description}
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            updateProject(proj.id, { description: e.target.value });
                          }
                        }}
                        className="min-h-[60px]"
                      />
                      <BulletGuidance text={proj.description} />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Tech Stack</Label>
                      <TagInput
                        tags={proj.techStack}
                        onChange={(tags) => updateProject(proj.id, { techStack: tags })}
                        placeholder="Add technology…"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs mb-1 flex items-center gap-1"><ExternalLink className="h-3 w-3" /> Live URL</Label>
                        <Input
                          placeholder="https://..."
                          value={proj.link}
                          onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs mb-1 flex items-center gap-1"><Github className="h-3 w-3" /> GitHub URL</Label>
                        <Input
                          placeholder="https://github.com/..."
                          value={proj.githubLink}
                          onChange={(e) => updateProject(proj.id, { githubLink: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      {/* Skills — Categorized */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Skills</CardTitle>
          <Button variant="outline" size="sm" onClick={handleSuggestSkills} disabled={suggestingSkills}>
            {suggestingSkills ? (
              <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Suggesting…</>
            ) : (
              <><Sparkles className="h-3.5 w-3.5 mr-1" /> Suggest Skills</>
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs font-medium mb-1.5 block">
              Technical Skills ({resume.skills.technical.length})
            </Label>
            <TagInput
              tags={resume.skills.technical}
              onChange={(tags) => updateSkillCategory("technical", tags)}
              placeholder="e.g. React, TypeScript…"
            />
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">
              Soft Skills ({resume.skills.soft.length})
            </Label>
            <TagInput
              tags={resume.skills.soft}
              onChange={(tags) => updateSkillCategory("soft", tags)}
              placeholder="e.g. Leadership, Communication…"
            />
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">
              Tools & Technologies ({resume.skills.tools.length})
            </Label>
            <TagInput
              tags={resume.skills.tools}
              onChange={(tags) => updateSkillCategory("tools", tags)}
              placeholder="e.g. Git, Docker, AWS…"
            />
          </div>
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
