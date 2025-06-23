import TextScope from "./TextScope";

interface ConsolePanelProps {
    logs: string[];
};

const ConsolePanel = ({ logs }: ConsolePanelProps) => {

    return (
        <div className="h-full w-auto text-white overflow-y-auto font-mono text-sm space-y-1 p-2">
            {logs.map((log, index) => (
                <pre key={index} className="whitespace-pre-wrap break-words">
                    <TextScope log={log} />
                </pre>
            ))}
        </div>
    );
};

export default ConsolePanel;
