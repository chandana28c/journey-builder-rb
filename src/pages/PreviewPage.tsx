import { TopNav } from "@/components/resume/TopNav";
import { useResume } from "@/contexts/ResumeContext";

export default function PreviewPage() {
  const { resume } = useResume();
  const { personalInfo, summary, education, experience, projects, skills, links } = resume;
  const hasContent = personalInfo.name || summary || education.length || experience.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        {!hasContent ? (
          <div className="flex h-96 items-center justify-center rounded-lg border border-border text-sm text-muted-foreground">
            Nothing to preview yet. Go to Builder and fill in your resume.
          </div>
        ) : (
          <div className="rounded-lg border border-foreground/10 bg-card p-10 font-serif text-foreground shadow-sm">
            {/* Header */}
            {personalInfo.name && (
              <div className="border-b border-foreground/10 pb-5 text-center">
                <h1 className="text-2xl font-bold tracking-tight">{personalInfo.name}</h1>
                <p className="mt-2 text-xs tracking-wide text-muted-foreground">
                  {[personalInfo.email, personalInfo.phone, personalInfo.location]
                    .filter(Boolean)
                    .join("  ·  ")}
                </p>
                {(links.github || links.linkedin) && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {[links.github, links.linkedin].filter(Boolean).join("  ·  ")}
                  </p>
                )}
              </div>
            )}

            {/* Summary */}
            {summary && (
              <section className="mt-6">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed">{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Experience
                </h2>
                {experience.map((e) => (
                  <div key={e.id} className="mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold">{e.role}</span>
                      <span className="text-xs text-muted-foreground">
                        {e.startDate} — {e.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{e.company}</p>
                    {e.description && (
                      <p className="mt-1.5 text-sm leading-relaxed">{e.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Education
                </h2>
                {education.map((e) => (
                  <div key={e.id} className="mb-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold">
                        {e.degree} {e.field && `in ${e.field}`}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {e.startDate} — {e.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{e.institution}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Projects
                </h2>
                {projects.map((p) => (
                  <div key={p.id} className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold">{p.name}</span>
                      {p.techStack && (
                        <span className="text-xs text-muted-foreground">({p.techStack})</span>
                      )}
                    </div>
                    {p.description && (
                      <p className="mt-0.5 text-sm leading-relaxed">{p.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills && (
              <section className="mt-6">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Skills
                </h2>
                <p className="text-sm">{skills}</p>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
