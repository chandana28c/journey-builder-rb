import React, { createContext, useContext, useState, useEffect } from 'react';

interface BuildState {
    currentStep: number;
    artifacts: Record<string, string>; // step_id -> artifact_content
    stepStatus: Record<number, 'c' | 'u' | 'l'>; // completed, unlocked, locked
}

interface BuildContextType {
    state: BuildState;
    saveArtifact: (step: number, content: string) => void;
    canProceed: (step: number) => boolean;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<BuildState>(() => {
        const saved = localStorage.getItem('rb_build_state');
        return saved ? JSON.parse(saved) : {
            currentStep: 1,
            artifacts: {},
            stepStatus: { 1: 'u' } // Step 1 unlocked
        };
    });

    useEffect(() => {
        localStorage.setItem('rb_build_state', JSON.stringify(state));
    }, [state]);

    const saveArtifact = (step: number, content: string) => {
        setState(prev => {
            const newArtifacts = { ...prev.artifacts, [`rb_step_${step}_artifact`]: content };
            const newStatus = { ...prev.stepStatus, [step]: 'c' as const, [step + 1]: 'u' as const };
            return {
                ...prev,
                artifacts: newArtifacts,
                stepStatus: newStatus
            };
        });
    };

    const canProceed = (step: number) => {
        return !!state.artifacts[`rb_step_${step}_artifact`];
    };

    return (
        <BuildContext.Provider value={{ state, saveArtifact, canProceed }}>
            {children}
        </BuildContext.Provider>
    );
};

export const useBuildState = () => {
    const context = useContext(BuildContext);
    if (!context) throw new Error('useBuildState must be used within a BuildProvider');
    return context;
};
