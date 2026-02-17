import { TopNav } from "@/components/resume/TopNav";
import { useResume } from "@/contexts/ResumeContext";
import { ResumeRenderer } from "@/components/resume/ResumeRenderer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PreviewPage() {
  const { resume, updateField } = useResume();
  const { personalInfo, summary, education, experience } = resume;
  const hasContent = personalInfo.name || summary || education.length || experience.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="mx-auto w-full px-6 py-10 flex flex-col items-center gap-6">
        <Tabs value={resume.template} onValueChange={(v) => updateField("template", v as "classic" | "modern" | "minimal")}>
          <TabsList>
            <TabsTrigger value="classic">Classic</TabsTrigger>
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
          </TabsList>
        </Tabs>
        {!hasContent ? (
          <div className="flex h-96 w-full max-w-3xl items-center justify-center rounded-lg border border-border text-sm text-muted-foreground">
            Nothing to preview yet. Go to Builder and fill in your resume.
          </div>
        ) : (
          <ResumeRenderer resume={resume} />
        )}
      </main>
    </div>
  );
}
