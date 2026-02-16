import React from 'react';

const stepTitles: Record<string, string> = {
    '01-problem': 'Define the Problem',
    '02-market': 'Analyze the Market',
    '03-architecture': 'System Architecture',
    '04-hld': 'High Level Design',
    '05-lld': 'Low Level Design',
    '06-build': 'Implementation',
    '07-test': 'Testing & Verification',
    '08-ship': 'Deployment & Release',
};

const StepPage: React.FC = () => {
    const locationStep = window.location.pathname.split('/').pop() || '';
    const title = stepTitles[locationStep] || 'Step';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="border-b border-gray-800 pb-6">
                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">{title}</h1>
                <p className="text-zinc-400 text-lg">
                    Follow the instructions to complete this step.
                </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-indigo-400 mb-6">Action Items</h2>
                <div className="space-y-4 text-zinc-300">
                    <p className="leading-relaxed">
                        This is the workspace for <strong>{locationStep}</strong>.
                    </p>
                    <ul className="list-disc list-inside space-y-3 ml-2 marker:text-indigo-500">
                        <li>Review the requirements for this phase.</li>
                        <li>Draft your findings or code.</li>
                        <li>Paste your final artifact into the Build Panel on the right.</li>
                        <li>Click "It Worked" to secure your progress.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StepPage;
