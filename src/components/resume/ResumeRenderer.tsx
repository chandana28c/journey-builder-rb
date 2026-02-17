import { ResumeData } from "@/contexts/ResumeContext";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";

interface ResumeRendererProps {
    resume: ResumeData;
    className?: string;
}

export function ResumeRenderer({ resume, className }: ResumeRendererProps) {
    const { template } = resume;

    const Header = () => {
        const { name, email, phone, location } = resume.personalInfo;
        const { links } = resume;
        const contact = [email, phone, location, links.github, links.linkedin].filter(Boolean).join(" · ");

        if (template === "classic") {
            return (
                <div className="border-b-2 border-black pb-4 text-center mb-6">
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-black uppercase">{name}</h1>
                    <p className="mt-2 text-sm font-serif text-black">{contact}</p>
                </div>
            );
        }
        if (template === "minimal") {
            return (
                <div className="mb-8 font-mono">
                    <h1 className="text-2xl font-bold tracking-tighter text-black mb-2">{name}</h1>
                    <p className="text-xs text-gray-600 block">{email}</p>
                    <p className="text-xs text-gray-600 block">{phone}</p>
                    <p className="text-xs text-gray-600 block">{location}</p>
                    <div className="mt-2 text-xs text-blue-600 underline decoration-blue-300 underline-offset-2">
                        {[links.github, links.linkedin].filter(Boolean).join(" ")}
                    </div>
                </div>
            );
        }
        return (
            <div className="border-b border-gray-200 pb-5 text-center mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{name}</h1>
                <p className="mt-2 text-xs tracking-wide text-gray-500">
                    {[email, phone, location, links.github, links.linkedin].filter(Boolean).join(" · ")}
                </p>
            </div>
        );
    };

    const SectionTitle = ({ title }: { title: string }) => {
        if (template === "classic") {
            return (
                <h2 className="mb-3 text-sm font-serif font-bold uppercase tracking-widest text-black border-b border-black pb-1">
                    {title}
                </h2>
            );
        }
        if (template === "minimal") {
            return (
                <h2 className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
                    // {title}
                </h2>
            );
        }
        return (
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {title}
            </h2>
        );
    };

    const ExperienceItem = ({ exp }: { exp: ResumeData["experience"][0] }) => {
        if (template === "classic") {
            return (
                <div className="mb-4 font-serif">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-black">{exp.company}</h3>
                        <span className="text-sm text-black italic">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-sm italic text-black mb-1">{exp.role}</div>
                    <p className="text-sm leading-relaxed text-black text-justify">{exp.description}</p>
                </div>
            );
        }
        if (template === "minimal") {
            return (
                <div className="mb-6 grid grid-cols-[120px_1fr] gap-4 font-mono text-sm">
                    <div className="text-gray-500 text-xs mt-1">
                        {exp.startDate}<br />{exp.endDate}
                    </div>
                    <div>
                        <h3 className="font-bold text-black">{exp.role} @ {exp.company}</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed text-xs">{exp.description}</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <span className="text-xs text-gray-500 font-medium">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-xs font-medium text-gray-700 mb-1.5">{exp.company}</div>
                <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
            </div>
        );
    };

    const SkillPill = ({ skill }: { skill: string }) => (
        <span className="inline-block rounded-sm border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
            {skill}
        </span>
    );

    const allSkillsEmpty = resume.skills.technical.length === 0 && resume.skills.soft.length === 0 && resume.skills.tools.length === 0;

    const containerClass = cn(
        "mx-auto w-full bg-white text-left overflow-hidden min-h-[11in] shadow-sm",
        template === "classic" ? "font-serif p-12 max-w-[8.5in] border-2 border-gray-100" : "",
        template === "minimal" ? "font-mono p-12 max-w-3xl" : "",
        template === "modern" ? "font-sans p-10 max-w-3xl border border-gray-100 rounded-lg" : "",
        className
    );

    return (
        <div className={containerClass}>
            <Header />

            {resume.summary && (
                <section className="mb-8">
                    <SectionTitle title={template === "classic" ? "Summary" : template === "minimal" ? "About" : "Professional Summary"} />
                    <p className={template === "classic" ? "text-sm text-black leading-relaxed text-justify" : template === "minimal" ? "text-xs text-gray-700 leading-relaxed" : "text-sm leading-relaxed text-gray-600"}>
                        {resume.summary}
                    </p>
                </section>
            )}

            {resume.experience.length > 0 && (
                <section className="mb-8">
                    <SectionTitle title="Experience" />
                    {resume.experience.map(exp => <ExperienceItem key={exp.id} exp={exp} />)}
                </section>
            )}

            {resume.projects.length > 0 && (
                <section className="mb-8">
                    <SectionTitle title="Projects" />
                    {resume.projects.map(proj => (
                        <div key={proj.id} className={cn("mb-5 rounded border border-gray-100 p-3", template === "minimal" ? "text-sm" : "")}>
                            <div className="flex items-baseline justify-between mb-1">
                                <span className={template === "classic" ? "font-bold text-black" : "font-semibold text-gray-900"}>
                                    {proj.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    {proj.link && (
                                        <span className="text-xs text-gray-500 flex items-center gap-0.5">
                                            <ExternalLink className="h-3 w-3" /> Live
                                        </span>
                                    )}
                                    {proj.githubLink && (
                                        <span className="text-xs text-gray-500 flex items-center gap-0.5">
                                            <Github className="h-3 w-3" /> Code
                                        </span>
                                    )}
                                </div>
                            </div>
                            {proj.description && (
                                <p className={template === "minimal" ? "text-xs text-gray-700 mb-2" : "text-sm leading-relaxed text-gray-600 mb-2"}>
                                    {proj.description}
                                </p>
                            )}
                            {proj.techStack.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {proj.techStack.map((tech, i) => (
                                        <SkillPill key={i} skill={tech} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {resume.education.length > 0 && (
                <section className="mb-8">
                    <SectionTitle title="Education" />
                    {resume.education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className={template === "classic" ? "font-bold text-black" : "font-semibold text-gray-900"}>
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </span>
                                <span className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</span>
                            </div>
                            <div className={template === "minimal" ? "text-xs text-gray-600" : "text-xs text-gray-700"}>{edu.institution}</div>
                        </div>
                    ))}
                </section>
            )}

            {!allSkillsEmpty && (
                <section>
                    <SectionTitle title="Skills" />
                    <div className="space-y-3">
                        {resume.skills.technical.length > 0 && (
                            <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Technical</div>
                                <div className="flex flex-wrap gap-1">
                                    {resume.skills.technical.map((s, i) => <SkillPill key={i} skill={s} />)}
                                </div>
                            </div>
                        )}
                        {resume.skills.soft.length > 0 && (
                            <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Soft Skills</div>
                                <div className="flex flex-wrap gap-1">
                                    {resume.skills.soft.map((s, i) => <SkillPill key={i} skill={s} />)}
                                </div>
                            </div>
                        )}
                        {resume.skills.tools.length > 0 && (
                            <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Tools & Technologies</div>
                                <div className="flex flex-wrap gap-1">
                                    {resume.skills.tools.map((s, i) => <SkillPill key={i} skill={s} />)}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
