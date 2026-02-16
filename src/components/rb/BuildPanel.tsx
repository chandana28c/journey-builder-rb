import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBuildTrack } from "@/contexts/BuildTrackContext";
import { Copy, Check, Upload, AlertCircle, Camera } from "lucide-react";

interface BuildPanelProps {
  stepNumber: number;
}

export function BuildPanel({ stepNumber }: BuildPanelProps) {
  const { artifacts, saveArtifact } = useBuildTrack();
  const [artifactText, setArtifactText] = useState(artifacts[stepNumber] ?? "");
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!artifactText) return;
    await navigator.clipboard.writeText(artifactText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveArtifact = () => {
    if (artifactText.trim()) {
      saveArtifact(stepNumber, artifactText.trim());
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Copy This Into Lovable</h3>
      <Textarea
        className="flex-1 min-h-[160px] text-xs font-mono"
        placeholder="Paste or type your artifact here…"
        value={artifactText}
        onChange={(e) => setArtifactText(e.target.value)}
      />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={handleCopy} disabled={!artifactText}>
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button size="sm" asChild variant="outline">
          <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">
            Build in Lovable
          </a>
        </Button>
      </div>

      <Button size="sm" onClick={handleSaveArtifact} disabled={!artifactText.trim()}>
        <Upload className="h-3 w-3" />
        Save Artifact
      </Button>

      <div className="mt-auto border-t border-border pt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Feedback</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={feedback === "worked" ? "default" : "outline"}
            onClick={() => setFeedback("worked")}
          >
            <Check className="h-3 w-3" /> It Worked
          </Button>
          <Button
            size="sm"
            variant={feedback === "error" ? "destructive" : "outline"}
            onClick={() => setFeedback("error")}
          >
            <AlertCircle className="h-3 w-3" /> Error
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFeedback("screenshot")}
          >
            <Camera className="h-3 w-3" /> Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
}
