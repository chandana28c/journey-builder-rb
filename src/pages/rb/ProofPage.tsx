import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BUILD_STEPS, useBuildTrack } from "@/contexts/BuildTrackContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Circle, Copy, ChevronLeft } from "lucide-react";

export default function ProofPage() {
  const navigate = useNavigate();
  const { isStepCompleted, allCompleted } = useBuildTrack();

  const [lovableLink, setLovableLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!allCompleted) {
      navigate("/rb/01-problem", { replace: true });
    }
  }, [allCompleted, navigate]);

  if (!allCompleted) return null;

  const handleCopySubmission = async () => {
    const lines = [
      "=== AI Resume Builder — Final Submission ===",
      "",
      ...BUILD_STEPS.map(
        (s) => `Step ${s.number}: ${s.title} — ${isStepCompleted(s.number) ? "✅ Complete" : "⬜ Pending"}`
      ),
      "",
      `Lovable Project: ${lovableLink || "(not provided)"}`,
      `GitHub Repo: ${githubLink || "(not provided)"}`,
      `Deploy/Live: ${deployLink || "(not provided)"}`,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <span className="text-sm font-bold tracking-wide">AI Resume Builder</span>
        <span className="text-sm font-medium text-muted-foreground">Project 3 — Proof</span>
        <Badge>Complete</Badge>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-8 p-6">
        <h1 className="text-2xl font-bold">Final Proof & Submission</h1>

        {/* Status Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Step Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BUILD_STEPS.map((s) => (
                <div
                  key={s.number}
                  className="flex items-center gap-2 rounded-md border border-border p-3 text-sm"
                >
                  {isStepCompleted(s.number) ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="truncate">{s.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submission Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Submission Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Lovable Project Link</label>
              <Input
                placeholder="https://lovable.dev/projects/..."
                value={lovableLink}
                onChange={(e) => setLovableLink(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">GitHub Repo Link</label>
              <Input
                placeholder="https://github.com/..."
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Deploy / Live Link</label>
              <Input
                placeholder="https://your-app.vercel.app"
                value={deployLink}
                onChange={(e) => setDeployLink(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/rb/08-ship")}>
            <ChevronLeft className="h-4 w-4" /> Back to Steps
          </Button>
          <Button onClick={handleCopySubmission}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Final Submission"}
          </Button>
        </div>
      </main>
    </div>
  );
}
