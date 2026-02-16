import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BUILD_STEPS, useBuildTrack } from "@/contexts/BuildTrackContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepFooterProps {
  stepNumber: number;
}

export function StepFooter({ stepNumber }: StepFooterProps) {
  const navigate = useNavigate();
  const { isStepCompleted, allCompleted } = useBuildTrack();

  const prevStep = BUILD_STEPS.find((s) => s.number === stepNumber - 1);
  const nextStep = BUILD_STEPS.find((s) => s.number === stepNumber + 1);
  const canGoNext = isStepCompleted(stepNumber);

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        disabled={!prevStep}
        onClick={() => prevStep && navigate(prevStep.route)}
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </Button>

      <div className="flex gap-1">
        {BUILD_STEPS.map((s) => (
          <div
            key={s.number}
            className={`h-2 w-6 rounded-full ${
              isStepCompleted(s.number)
                ? "bg-primary"
                : s.number === stepNumber
                ? "bg-primary/40"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      {nextStep ? (
        <Button
          size="sm"
          disabled={!canGoNext}
          onClick={() => navigate(nextStep.route)}
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          size="sm"
          disabled={!allCompleted}
          onClick={() => navigate("/rb/proof")}
        >
          View Proof <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
