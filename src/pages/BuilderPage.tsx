import { TopNav } from "@/components/resume/TopNav";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { LivePreviewPanel } from "@/components/resume/LivePreviewPanel";
import { ATSScorePanel } from "@/components/resume/ATSScorePanel";

export default function BuilderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-6 py-6">
        <div className="flex-[6] overflow-y-auto">
          <ResumeForm />
        </div>
        <div className="sticky top-20 flex-[4] self-start">
          <ATSScorePanel />
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live Preview
          </div>
          <LivePreviewPanel />
        </div>
      </main>
    </div>
  );
}
