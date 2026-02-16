import { TopNav } from "@/components/resume/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Circle } from "lucide-react";
import { useState } from "react";

const artifacts = [
  "Problem Definition",
  "Market Research",
  "Architecture",
  "High-Level Design",
  "Low-Level Design",
  "Build",
  "Test",
  "Ship",
];

export default function ProofPageResume() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = artifacts.map((a, i) => `Step ${i + 1}: ${a} — ⬜ Pending`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="mx-auto w-full max-w-3xl space-y-8 px-6 py-10">
        <h1 className="text-2xl font-bold">Proof & Artifacts</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Artifact Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {artifacts.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-md border border-border p-3 text-sm"
                >
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="truncate">{name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submission Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Lovable Project Link" />
            <Input placeholder="GitHub Repo Link" />
            <Input placeholder="Deploy / Live Link" />
          </CardContent>
        </Card>

        <Button onClick={handleCopy}>
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Final Submission"}
        </Button>
      </main>
    </div>
  );
}
