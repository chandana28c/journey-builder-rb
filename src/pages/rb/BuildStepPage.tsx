import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BUILD_STEPS, useBuildTrack } from "@/contexts/BuildTrackContext";
import { PremiumLayout } from "@/components/rb/PremiumLayout";
import { BuildPanel } from "@/components/rb/BuildPanel";
import { StepFooter } from "@/components/rb/StepFooter";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

const STEP_DESCRIPTIONS: Record<number, string> = {
  1: "Define the core problem your AI Resume Builder will solve. Who is the target user and what pain points exist?",
  2: "Research existing resume tools, identify gaps, and define your unique value proposition.",
  3: "Design the system architecture — components, data flow, and technology choices.",
  4: "Create a high-level design showing modules, APIs, and integration points.",
  5: "Detail the low-level design: class diagrams, database schema, and API contracts.",
  6: "Build the core features of the AI Resume Builder in Lovable.",
  7: "Test your build — write test cases, verify edge cases, and document results.",
  8: "Ship it! Deploy your project, set up CI/CD, and share the live link.",
};

export default function BuildStepPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isStepUnlocked, highestUnlockedStep } = useBuildTrack();

  const step = BUILD_STEPS.find((s) => s.slug === slug);

  useEffect(() => {
    if (!step) {
      navigate("/rb/01-problem", { replace: true });
      return;
    }
    if (!isStepUnlocked(step.number)) {
      const active = BUILD_STEPS.find((s) => s.number === highestUnlockedStep);
      navigate(active?.route ?? "/rb/01-problem", { replace: true });
    }
  }, [step, isStepUnlocked, highestUnlockedStep, navigate]);

  if (!step || !isStepUnlocked(step.number)) return null;

  return (
    <PremiumLayout
      stepNumber={step.number}
      buildPanel={<BuildPanel stepNumber={step.number} />}
      footer={<StepFooter stepNumber={step.number} />}
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            Step {step.number}
          </Badge>
          <h1 className="text-2xl font-bold">{step.title}</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {STEP_DESCRIPTIONS[step.number]}
        </p>
        <div className="rounded-lg border border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
          Complete this step by saving an artifact in the build panel →
        </div>
      </div>
    </PremiumLayout>
  );
}
