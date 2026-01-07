import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

function RepoAccess() {
    const [repoName, setRepoName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [isWrite, setIsWrite] = useState(true);
    const [copied, setCopied] = useState(false);
    const outputRef = useRef(null);

    const generateOutput = () => {
        if (!repoName || !purpose) return '';

        let output = `📦 Repo Name : ${repoName}\n`;
        output += `📋 Purpose: ${purpose}\n`;
        output += `🔐 Access: ${isWrite ? 'WRITE' : 'READ'}\n`;

        if (isWrite) {
            output += `ℹ️ Also provide READ access to jenkins@hashcashconsultants.com\n`;
        }

        output += `👥 @repo-admin @Raj`;

        return output;
    };

    const handleCopy = async () => {
        const text = generateOutput();
        if (text) {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const output = generateOutput();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                        Repository Access Manager
                    </h1>
                    <p className="text-purple-300 text-lg">Generate repository access requests</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 animate-slide-in-left">
                        <h2 className="text-2xl font-semibold text-white mb-6">Request Details</h2>

                        <div className="space-y-6">
                            {/* Repo Name */}
                            <div className="group">
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Repository Name
                                </label>
                                <input
                                    type="text"
                                    value={repoName}
                                    onChange={(e) => setRepoName(e.target.value)}
                                    placeholder="Add repo name here"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-400"
                                />
                            </div>

                            {/* Purpose */}
                            <div className="group">
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Purpose
                                </label>
                                <textarea
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    placeholder="Describe the purpose..."
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none group-hover:border-purple-400"
                                />
                            </div>

                            {/* Access Toggle */}
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                                <span className="text-white font-medium">Access Type</span>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm transition-colors ${!isWrite ? 'text-purple-300' : 'text-gray-500'}`}>
                                        READ
                                    </span>
                                    <button
                                        onClick={() => setIsWrite(!isWrite)}
                                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isWrite ? 'bg-purple-600' : 'bg-gray-600'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${isWrite ? 'translate-x-7' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                    <span className={`text-sm transition-colors ${isWrite ? 'text-purple-300' : 'text-gray-500'}`}>
                                        WRITE
                                    </span>
                                </div>
                            </div>

                            {/* Additional Users */}
                            <div className="p-4 bg-purple-500/20 border border-purple-400/30 rounded-lg">
                                <p className="text-purple-200 text-sm font-medium">
                                    📌 Auto-tagged: @repo-admin @Raj
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Output Preview */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 animate-slide-in-right">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">Preview</h2>
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 font-medium"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5 text-white" />
                                        <span className="text-white">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5 text-white" />
                                        <span className="text-white">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div
                            ref={outputRef}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 border-2 border-purple-500/30 min-h-[300px] shadow-2xl"
                        >
                            {output ? (
                                <div className="animate-fade-in space-y-3">
                                    {/* Repo Name */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-cyan-400 font-bold text-lg">📦 Repo Name:</span>
                                        <span className="text-white font-semibold text-lg">{repoName}</span>
                                    </div>

                                    {/* Purpose */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-yellow-400 font-bold text-lg whitespace-nowrap">📋 Purpose:</span>
                                        <span className="text-gray-200 text-lg whitespace-pre-wrap">{purpose}</span>
                                    </div>

                                    {/* Access */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400 font-bold text-lg">🔐 Access:</span>
                                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 font-bold text-lg">
                                            {isWrite ? 'WRITE' : 'READ'}
                                        </span>
                                    </div>

                                    {/* Jenkins Info */}
                                    {isWrite && (
                                        <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                            <span className="text-blue-400 text-lg">ℹ️</span>
                                            <span className="text-blue-300 text-base">Also provide READ access to jenkins@hashcashconsultants.com</span>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-500/30">
                                        <span className="text-purple-400 text-lg">👥</span>
                                        <span className="text-purple-300 font-semibold text-lg">@repo-admin @Raj</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4 animate-pulse">📝</div>
                                        <p className="text-gray-400 text-lg">Fill in the details to see preview</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {isWrite && output && (
                            <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg animate-fade-in">
                                <p className="text-blue-200 text-sm">
                                    ℹ️ WRITE access includes automatic READ access for Jenkins
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}

export default RepoAccess;