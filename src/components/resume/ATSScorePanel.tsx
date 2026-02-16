import { useResume } from "@/contexts/ResumeContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

export function ATSScorePanel() {
    const { atsScore } = useResume();
    const { score, suggestions } = atsScore;

    // Color logic for score
    const scoreColor = score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";
    const progressColor = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

    return (
        <div className="mb-6 rounded-lg border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold tracking-tight">ATS Readiness Score</h3>
                    <p className="text-xs text-muted-foreground">Deterministic analysis v1</p>
                </div>
                <div className={`text-2xl font-bold ${scoreColor}`}>
                    {score}/100
                </div>
            </div>

            <Progress value={score} className="h-2" indicatorClassName={progressColor} />

            {suggestions.length > 0 && (
                <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" /> Top 3 Improvements
                    </div>
                    <ul className="space-y-2">
                        {suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                                <span>{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {score === 100 && (
                <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Resume is optimized!</span>
                </div>
            )}
        </div>
    );
}
