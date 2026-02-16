import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface BuildStep {
  number: number;
  slug: string;
  title: string;
  route: string;
}

export const BUILD_STEPS: BuildStep[] = [
  { number: 1, slug: "01-problem", title: "Problem Definition", route: "/rb/01-problem" },
  { number: 2, slug: "02-market", title: "Market Research", route: "/rb/02-market" },
  { number: 3, slug: "03-architecture", title: "Architecture", route: "/rb/03-architecture" },
  { number: 4, slug: "04-hld", title: "High-Level Design", route: "/rb/04-hld" },
  { number: 5, slug: "05-lld", title: "Low-Level Design", route: "/rb/05-lld" },
  { number: 6, slug: "06-build", title: "Build", route: "/rb/06-build" },
  { number: 7, slug: "07-test", title: "Test", route: "/rb/07-test" },
  { number: 8, slug: "08-ship", title: "Ship", route: "/rb/08-ship" },
];

interface BuildTrackState {
  artifacts: Record<number, string>;
  saveArtifact: (stepNumber: number, value: string) => void;
  removeArtifact: (stepNumber: number) => void;
  isStepUnlocked: (stepNumber: number) => boolean;
  isStepCompleted: (stepNumber: number) => boolean;
  allCompleted: boolean;
  highestUnlockedStep: number;
}

const BuildTrackContext = createContext<BuildTrackState | null>(null);

const STORAGE_PREFIX = "rb_step_";

function loadArtifacts(): Record<number, string> {
  const artifacts: Record<number, string> = {};
  for (let i = 1; i <= 8; i++) {
    const val = localStorage.getItem(`${STORAGE_PREFIX}${i}_artifact`);
    if (val) artifacts[i] = val;
  }
  return artifacts;
}

export function BuildTrackProvider({ children }: { children: React.ReactNode }) {
  const [artifacts, setArtifacts] = useState<Record<number, string>>(loadArtifacts);

  const saveArtifact = useCallback((stepNumber: number, value: string) => {
    localStorage.setItem(`${STORAGE_PREFIX}${stepNumber}_artifact`, value);
    setArtifacts((prev) => ({ ...prev, [stepNumber]: value }));
  }, []);

  const removeArtifact = useCallback((stepNumber: number) => {
    localStorage.removeItem(`${STORAGE_PREFIX}${stepNumber}_artifact`);
    setArtifacts((prev) => {
      const next = { ...prev };
      delete next[stepNumber];
      return next;
    });
  }, []);

  const isStepCompleted = useCallback(
    (stepNumber: number) => !!artifacts[stepNumber],
    [artifacts]
  );

  const highestUnlockedStep = (() => {
    for (let i = 1; i <= 8; i++) {
      if (!artifacts[i]) return i;
    }
    return 8;
  })();

  const isStepUnlocked = useCallback(
    (stepNumber: number) => stepNumber <= highestUnlockedStep,
    [highestUnlockedStep]
  );

  const allCompleted = Object.keys(artifacts).length === 8;

  return (
    <BuildTrackContext.Provider
      value={{ artifacts, saveArtifact, removeArtifact, isStepUnlocked, isStepCompleted, allCompleted, highestUnlockedStep }}
    >
      {children}
    </BuildTrackContext.Provider>
  );
}

export function useBuildTrack() {
  const ctx = useContext(BuildTrackContext);
  if (!ctx) throw new Error("useBuildTrack must be used within BuildTrackProvider");
  return ctx;
}
