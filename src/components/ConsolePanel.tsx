"use client";
import { useEffect, useState } from "react";

const developerNote = `
  -----------------------------------------------
  Developed by: Akshit Lakhanpal
  Open for contribution! Feel free to fork and contribute.
  GitHub: https://github.com/akshitworkspace
  -----------------------------------------------
`;

const ConsolePanel = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const originalLog = console.log;
        console.log = (message: string) => {
            const newLog = message === developerNote ? "" : message
            setLogs((prevLogs) => [...prevLogs, newLog]);
        };
        originalLog(developerNote);

        return () => {
            console.log = originalLog; //Restore original console.log when the component unmounts
        };
    }, []);

    return (
        <div className="w-1/3 h-full bg-gray-800 text-white p-4 overflow-y-auto font-mono">
            {logs.map((log, index) => (
                <p key={index}>{log}</p>
            ))}
        </div>
    );
};

export default ConsolePanel;
