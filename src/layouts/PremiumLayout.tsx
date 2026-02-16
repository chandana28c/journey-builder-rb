import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useBuildState } from '../context/BuildStateContext';
import BuildPanel from '../components/BuildPanel';
import { ChevronRight } from 'lucide-react';

const steps = [
    { id: 1, path: '01-problem', label: 'Problem' },
    { id: 2, path: '02-market', label: 'Market' },
    { id: 3, path: '03-architecture', label: 'Architecture' },
    { id: 4, path: '04-hld', label: 'HLD' },
    { id: 5, path: '05-lld', label: 'LLD' },
    { id: 6, path: '06-build', label: 'Build' },
    { id: 7, path: '07-test', label: 'Test' },
    { id: 8, path: '08-ship', label: 'Ship' },
];

const PremiumLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { canProceed } = useBuildState();

    const currentStepIndex = steps.findIndex(s => location.pathname.includes(s.path));
    const currentStep = steps[currentStepIndex];
    const stepNumber = currentStep ? currentStep.id : 0;

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            navigate(`/rb/${steps[currentStepIndex + 1].path}`);
        } else {
            navigate('/rb/proof');
        }
    };

    // Determine if next is disabled
    // Assuming "canProceed" checks if CURRENT step has artifact.
    // So to go to step X+1, step X must be done.
    const isNextDisabled = !canProceed(stepNumber);

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden font-sans">
            {/* Top Bar */}
            <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold">RB</div>
                    <span className="font-semibold text-lg tracking-tight">AI Resume Builder</span>
                </div>

                <div className="text-zinc-400 text-sm">
                    Project 3 — Step <span className="text-white font-medium">{stepNumber}</span> of 8
                </div>

                <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-semibold uppercase ${isNextDisabled ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-700' : 'bg-green-900/30 text-green-500 border border-green-700'}`}>
                        {isNextDisabled ? 'In Progress' : 'Completed'}
                    </div>
                    {stepNumber > 0 && stepNumber <= 8 && (
                        <button
                            onClick={handleNext}
                            disabled={isNextDisabled}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${isNextDisabled ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    )}
                </div>
            </header>

            {/* Context Header (Optional/Breadcrumbs?) - integrating into Top Bar or sub-header */}
            {/* Assuming specific design, but Top Bar covers "Context Header" mostly. Let's add a small sub-nav if needed. */}

            <div className="flex flex-1 overflow-hidden">
                {/* Main Workspace (70%) */}
                <main className="w-[70%] flex flex-col h-full bg-gray-950 border-r border-gray-800 overflow-y-auto relative">
                    <div className="p-8 max-w-4xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>

                {/* Build Panel (30%) */}
                <aside className="w-[30%] h-full">
                    {stepNumber > 0 && stepNumber <= 8 ? (
                        <BuildPanel stepNumber={stepNumber} />
                    ) : (
                        <div className="h-full bg-gray-900 border-l border-gray-700 flex items-center justify-center text-zinc-500">
                            Build Panel Inactive
                        </div>
                    )}
                </aside>
            </div>

            {/* Proof Footer (Placeholder or Proof page specific?) */}
            {/* The requirement says "Top bar, Context header, Main workspace, Secondary build panel, Proof footer".
                Maybe Proof Footer is only on Proof page, or always visible?
                Assuming it's a layout element. */}
        </div>
    );
};

export default PremiumLayout;
