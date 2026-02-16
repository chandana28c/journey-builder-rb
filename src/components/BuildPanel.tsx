import React, { useState } from 'react';
import { Copy, ExternalLink, Check, AlertCircle, ImagePlus } from 'lucide-react';
import { useBuildState } from '../context/BuildStateContext'; // Adjust path if needed

interface BuildPanelProps {
    stepNumber: number;
}

const BuildPanel: React.FC<BuildPanelProps> = ({ stepNumber }) => {
    const { saveArtifact } = useBuildState();
    const [artifactContent, setArtifactContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleCopy = () => {
        navigator.clipboard.writeText(artifactContent);
        // Maybe show a toast
    };

    const handleItWorked = () => {
        if (!artifactContent.trim()) {
            setStatus('error');
            return;
        }
        saveArtifact(stepNumber, artifactContent);
        setStatus('success');
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 border-l border-gray-700 p-4">
            <h3 className="text-zinc-400 text-sm font-semibold mb-2">BUILD ARTIFACT</h3>

            <div className="flex-1 flex flex-col gap-4">
                <div className="relative flex-1">
                    <textarea
                        className="w-full h-full bg-gray-800 text-zinc-300 p-3 rounded-md border border-gray-700 focus:outline-none focus:border-indigo-500 resize-none text-sm font-mono"
                        placeholder="Paste your Lovable artifact prompt here..."
                        value={artifactContent}
                        onChange={(e) => setArtifactContent(e.target.value)}
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded text-zinc-300"
                        title="Copy to Clipboard"
                    >
                        <Copy size={16} />
                    </button>
                </div>

                <a
                    href="https://lovable.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
                >
                    <ExternalLink size={16} />
                    Build in Lovable
                </a>

                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={handleItWorked}
                        className={`flex flex-col items-center justify-center p-2 rounded-md border ${status === 'success' ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-gray-800 border-gray-700 hover:bg-gray-750 text-zinc-400'}`}
                    >
                        <Check size={20} className="mb-1" />
                        <span className="text-xs">It Worked</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-2 rounded-md border bg-gray-800 border-gray-700 hover:bg-gray-750 text-zinc-400">
                        <AlertCircle size={20} className="mb-1" />
                        <span className="text-xs">Error</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-2 rounded-md border bg-gray-800 border-gray-700 hover:bg-gray-750 text-zinc-400">
                        <ImagePlus size={20} className="mb-1" />
                        <span className="text-xs">Screenshot</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuildPanel;
