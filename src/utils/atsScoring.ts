import { ResumeData, getAllSkills } from "@/contexts/ResumeContext";

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
    }

    // 4. Skills >= 8 items -> +10
    const skillsList = getAllSkills(resume.skills);
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
    const hasNumbers = [...resume.experience, ...resume.projects].some(item =>
        /\d/.test(item.description || "")
    );
    if (hasNumbers) {
        score += 15;
    } else {
        suggestions.push("Add measurable impact (numbers) in bullets.");
    }

    // 7. Education complete -> +10
    const hasCompleteEducation = resume.education.some(edu =>
        edu.institution && edu.degree && edu.startDate && edu.endDate
    );
    if (hasCompleteEducation) {
        score += 10;
    } else {
        suggestions.push("Complete the education section.");
    }

    // 8. Base: name and email -> +20
    if (resume.personalInfo.name && resume.personalInfo.email) {
        score += 20;
    } else {
        suggestions.push("Add your name and email.");
    }

    score = Math.min(100, score);

    return {
        score,
        suggestions: suggestions.slice(0, 3)
    };
}
