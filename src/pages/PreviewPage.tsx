import { useState } from "react";
import { TopNav } from "@/components/resume/TopNav";
import { useResume } from "@/contexts/ResumeContext";
import { ResumeRenderer } from "@/components/resume/ResumeRenderer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Printer, Copy, AlertTriangle, CheckCircle } from "lucide-react";
import { resumeToPlainText } from "@/utils/resumeToText";

export default function PreviewPage() {
  const { resume, updateField } = useResume();
  const { personalInfo, experience, projects, education, summary } = resume;
  const hasContent = personalInfo.name || summary || education.length || experience.length;
  const [copied, setCopied] = useState(false);

  // Validation warnings (non-blocking)
  const warnings: string[] = [];
  if (!personalInfo.name.trim()) warnings.push("Name is missing.");
  if (experience.length === 0 && projects.length === 0)
    warnings.push("Add at least one experience or project entry.");

  const handlePrint = () => window.print();

  const handleCopyText = async () => {
    const text = resumeToPlainText(resume);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* TopNav hidden in print */}
      <div className="print:hidden">
        <TopNav />
      </div>

      <main className="mx-auto w-full px-6 py-10 flex flex-col items-center gap-6 print:p-0 print:m-0">
        {/* Controls — hidden in print */}
        <div className="flex flex-wrap items-center justify-center gap-4 print:hidden">
          <Tabs value={resume.template} onValueChange={(v) => updateField("template", v as "classic" | "modern" | "minimal")}>
            <TabsList>
              <TabsTrigger value="classic">Classic</TabsTrigger>
              <TabsTrigger value="modern">Modern</TabsTrigger>
              <TabsTrigger value="minimal">Minimal</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-3.5 w-3.5 mr-1.5" /> Print / Save as PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyText}>
              {copied ? (
                <><CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Copied!</>
              ) : (
                <><Copy className="h-3.5 w-3.5 mr-1.5" /> Copy as Text</>
              )}
            </Button>
          </div>
        </div>

        {/* Validation warning — hidden in print */}
        {warnings.length > 0 && (
          <div className="flex items-start gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground max-w-3xl w-full print:hidden">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <span>Your resume may look incomplete: {warnings.join(" ")}</span>
          </div>
        )}

        {!hasContent ? (
          <div className="flex h-96 w-full max-w-3xl items-center justify-center rounded-lg border border-border text-sm text-muted-foreground print:hidden">
            Nothing to preview yet. Go to Builder and fill in your resume.
          </div>
        ) : (
          <div id="resume-print-area">
            <ResumeRenderer resume={resume} />
          </div>
        )}
      </main>
    </div>
  );
}
