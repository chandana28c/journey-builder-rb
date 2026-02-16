import { useResume } from "@/contexts/ResumeContext";
import { ResumeRenderer } from "./ResumeRenderer";

export function LivePreviewPanel() {
  const { resume } = useResume();
  const { personalInfo, summary, education, experience } = resume;
  const hasContent = personalInfo.name || summary || education.length || experience.length;

  return (
    <div className="rounded-lg border border-border bg-card p-0 overflow-hidden shadow-sm">
      {!hasContent ? (
        <div className="flex h-96 items-center justify-center p-6 text-sm text-muted-foreground">
          Your resume preview will appear here as you fill in the form.
        </div>
      ) : (
        <ResumeRenderer resume={resume} className="scale-[0.6] origin-top w-[calc(100%/0.6)]" />
      )}
    </div>
  );
}
