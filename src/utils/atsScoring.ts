import { ResumeData } from "@/contexts/ResumeContext";

export interface ATSScoreResult {
    score: number;
    suggestions: string[];
}

export function calculateATSScore(resume: ResumeData): ATSScoreResult {
    let score = 0;
    const suggestions: string[] = [];

    // 1. Summary Length (40-120 words) -> +15
    const summaryWords = resume.summary.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (summaryWords >= 40 && summaryWords <= 120) {
        score += 15;
    } else {
        suggestions.push("Write a stronger summary (40–120 words).");
    }

    // 2. Projects >= 2 -> +10
    if (resume.projects.length >= 2) {
        score += 10;
    } else {
        suggestions.push("Add at least 2 projects.");
    }

    // 3. Experience >= 1 -> +10
    if (resume.experience.length >= 1) {
        score += 10;
    } else {
        // suggestions.push("Add at least 1 experience entry."); // Optional, maybe prioritize projects
    }

    // 4. Skills >= 8 items -> +10
    // Assuming skills are comma separated string
    const skillsList = resume.skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
    if (skillsList.length >= 8) {
        score += 10;
    } else {
        suggestions.push("Add more skills (target 8+).");
    }

    // 5. GitHub or LinkedIn link exists -> +10
    if (resume.links.github || resume.links.linkedin) {
        score += 10;
    } else {
        suggestions.push("Add a GitHub or LinkedIn profile link.");
    }

    // 6. Numbers in bullets -> +15
    // Check experience and projects descriptions for numbers (%, X, k, etc.)
    // Regex: \d+%?|\d+k|\d+x
    // Simple check for digits
    const hasNumbers = [...resume.experience, ...resume.projects].some(item =>
        /\d/.test(item.description || "") || (('description' in item) && /\d/.test(item.description))
    );

    if (hasNumbers) {
        score += 15;
    } else {
        suggestions.push("Add measurable impact (numbers) in bullets.");
    }

    // 7. Education complete -> +10
    // Check if at least one education entry exists and has institution, degree, startDate, endDate
    const hasCompleteEducation = resume.education.some(edu =>
        edu.institution && edu.degree && edu.startDate && edu.endDate
    );
    if (hasCompleteEducation) {
        score += 10;
    } else {
        suggestions.push("Complete the education section.");
    }

    // Base score (optional? prompt says 0-100 based on criteria)
    // Let's sum up: 15+10+10+10+10+15+10 = 80.
    // Wait, the prompt says "Cap at 100".
    // Maybe there are other criteria? Or base score?
    // "Compute score deterministically... Cap at 100."
    // Total potential points: 80.
    // Maybe give 20 points for just having a name and email?
    if (resume.personalInfo.name && resume.personalInfo.email) {
        score += 20;
    } else {
        suggestions.push("Add your name and email.");
    }

    // Cap at 100
    score = Math.min(100, score);

    // Limit suggestions to 3
    return {
        score,
        suggestions: suggestions.slice(0, 3)
    };
}
