import { AlertCircle, Hash, Zap } from "lucide-react";

interface BulletGuidanceProps {
    text: string;
}

const ACTION_VERBS = [
    "built",
    "developed",
    "designed",
    "implemented",
    "led",
    "improved",
    "created",
    "optimized",
    "automated",
    "managed",
    "engineered",
    "architected",
    "orchestrated",
    "deployed",
    "reduced",
    "increased",
];

export function BulletGuidance({ text }: BulletGuidanceProps) {
    if (!text) return null;

    const suggestions: { icon: any; text: string; color: string }[] = [];

    // 1. Check for Action Verbs
    // We check the first word of the text (or each line if multi-line, but simple text check is safer for now)
    const firstWord = text.trim().split(" ")[0]?.toLowerCase().replace(/[^a-z]/g, "");
    const hasActionVerb = ACTION_VERBS.includes(firstWord);

    if (!hasActionVerb) {
        suggestions.push({
            icon: Zap,
            text: "Start with a strong action verb (e.g., Built, Led, Optimized).",
            color: "text-amber-600",
        });
    }

    // 2. Check for Numbers
    const hasNumbers = /\d+%?|\d+k|\d+x/i.test(text);
    if (!hasNumbers) {
        suggestions.push({
            icon: Hash,
            text: "Add measurable impact (numbers, %, metrics).",
            color: "text-blue-600",
        });
    }

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-2 space-y-1">
            {suggestions.map((suggestion, idx) => {
                const Icon = suggestion.icon;
                return (
                    <div key={idx} className={`flex items-center gap-1.5 text-xs font-medium ${suggestion.color} bg-background/50 px-2 py-1 rounded border border-border/50`}>
                        <Icon className="h-3 w-3" />
                        <span>{suggestion.text}</span>
                    </div>
                );
            })}
        </div>
    );
}
