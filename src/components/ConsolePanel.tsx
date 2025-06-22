"use client";
interface ConsolePanelProps {
    logs: string[];
}

const ConsolePanel = ({ logs }: ConsolePanelProps) => {
    return (
        <div className="w-1/3 h-full bg-gray-900 text-white p-4 overflow-y-auto font-mono text-sm space-y-1">
            {logs.map((log, index) => (
                <pre key={index} className="whitespace-pre-wrap break-words">
                    {log}
                </pre>
            ))}
        </div>
    );
};

export default ConsolePanel;
