import React from 'react';
import { useBuildState } from '../context/BuildStateContext';
import { CheckCircle, Circle, ExternalLink, Github, Globe } from 'lucide-react';

const steps = [
    { id: 1, label: 'Problem' },
    { id: 2, label: 'Market' },
    { id: 3, label: 'Architecture' },
    { id: 4, label: 'HLD' },
    { id: 5, label: 'LLD' },
    { id: 6, label: 'Build' },
    { id: 7, label: 'Test' },
    { id: 8, label: 'Ship' },
];

const ProofPage: React.FC = () => {
    const { state } = useBuildState();

    return (
        <div className="max-w-3xl mx-auto space-y-10 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Proof of Work
                </h1>
                <p className="text-zinc-400 text-lg">
                    Verify your progress and submit your final build.
                </p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map(step => {
                    const isCompleted = state.stepStatus[step.id] === 'c';
                    return (
                        <div key={step.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-900/20 border-green-800' : 'bg-gray-900 border-gray-800'} flex items-center justify-between`}>
                            <span className="font-medium text-zinc-300">{step.label}</span>
                            {isCompleted ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-600" />}
                        </div>
                    );
                })}
            </div>

            {/* Submission Form */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-6">
                <h2 className="text-xl font-semibold text-white">Final Submission</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Lovable Project Link</label>
                        <div className="relative">
                            <input type="text" className="w-full bg-gray-950 border border-gray-700 rounded-md p-2.5 pl-10 text-white focus:outline-none focus:border-indigo-500" placeholder="https://lovable.dev/..." />
                            <ExternalLink size={18} className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">GitHub Repository</label>
                        <div className="relative">
                            <input type="text" className="w-full bg-gray-950 border border-gray-700 rounded-md p-2.5 pl-10 text-white focus:outline-none focus:border-indigo-500" placeholder="https://github.com/..." />
                            <Github size={18} className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Deployment URL</label>
                        <div className="relative">
                            <input type="text" className="w-full bg-gray-950 border border-gray-700 rounded-md p-2.5 pl-10 text-white focus:outline-none focus:border-indigo-500" placeholder="https://..." />
                            <Globe size={18} className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-md shadow-lg shadow-indigo-900/20 transition-all transform hover:scale-[1.01]">
                    Submit Final Proof
                </button>
            </div>
        </div>
    );
};

export default ProofPage;
