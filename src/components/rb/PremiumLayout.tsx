import React from "react";
import { Badge } from "@/components/ui/badge";
import { BUILD_STEPS, useBuildTrack } from "@/contexts/BuildTrackContext";

interface PremiumLayoutProps {
  stepNumber: number;
  children: React.ReactNode;
  buildPanel: React.ReactNode;
  footer: React.ReactNode;
}

export function PremiumLayout({ stepNumber, children, buildPanel, footer }: PremiumLayoutProps) {
  const { isStepCompleted, highestUnlockedStep } = useBuildTrack();

  const status = isStepCompleted(stepNumber)
    ? "Complete"
    : stepNumber === highestUnlockedStep
    ? "In Progress"
    : "Not Started";

  const statusVariant = status === "Complete" ? "default" : status === "In Progress" ? "secondary" : "outline";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <span className="text-sm font-bold tracking-wide">AI Resume Builder</span>
        <span className="text-sm font-medium text-muted-foreground">
          Project 3 — Step {stepNumber} of 8
        </span>
        <Badge variant={statusVariant}>{status}</Badge>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-[7] overflow-y-auto border-r border-border p-6">{children}</main>
        <aside className="flex-[3] overflow-y-auto p-6">{buildPanel}</aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4">{footer}</footer>
    </div>
  );
}
