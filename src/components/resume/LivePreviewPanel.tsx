import { useResume } from "@/contexts/ResumeContext";

export function LivePreviewPanel() {
  const { resume } = useResume();
  const { personalInfo, summary, education, experience, projects, skills, links } = resume;
  const hasContent = personalInfo.name || summary || education.length || experience.length;

  return (
    <div className="rounded-lg border border-border bg-card p-6 font-serif">
      {!hasContent ? (
        <div className="flex h-96 items-center justify-center text-sm text-muted-foreground">
          Your resume preview will appear here as you fill in the form.
        </div>
      ) : (
        <div className="space-y-5 text-sm">
          {/* Header */}
          {personalInfo.name && (
            <div className="border-b border-border pb-4 text-center">
              <h2 className="text-xl font-bold">{personalInfo.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {[personalInfo.email, personalInfo.phone, personalInfo.location]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Summary
              </h3>
              <p className="leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Experience
              </h3>
              {experience.map((e) => (
                <div key={e.id} className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{e.role}</span>
                    <span className="text-xs text-muted-foreground">
                      {e.startDate} — {e.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.company}</p>
                  {e.description && <p className="mt-1 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Education
              </h3>
              {education.map((e) => (
                <div key={e.id} className="mb-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">
                      {e.degree} {e.field && `in ${e.field}`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {e.startDate} — {e.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.institution}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Projects
              </h3>
              {projects.map((p) => (
                <div key={p.id} className="mb-2">
                  <span className="font-semibold">{p.name}</span>
                  {p.techStack && (
                    <span className="ml-2 text-xs text-muted-foreground">({p.techStack})</span>
                  )}
                  {p.description && <p className="mt-0.5 leading-relaxed">{p.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Skills
              </h3>
              <p>{skills}</p>
            </div>
          )}

          {/* Links */}
          {(links.github || links.linkedin) && (
            <div>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Links
              </h3>
              <p className="text-xs">
                {[links.github, links.linkedin].filter(Boolean).join(" · ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
