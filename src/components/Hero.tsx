"use client";
import { useEffect, useState } from "react";
import * as ts from "typescript";
import MonacoEditorComponent from "./MonacoEditor";
import ConsolePanel from "./ConsolePanel";
import { logger } from "@/utils/logger";
import CONSTANTS from "@/utils/constants";

const Hero = () => {
    const [code, setCode] = useState<string>(`//Write your TypeScript code here
console.log("Hello, world!");
`);
    const [logs, setLogs] = useState<string[]>([]);

    const runCode = () => {
        setLogs([]); //Clear console before new run

        const originalLog = console.log;
        const originalError = console.error;

        try {
            //Capture logs for this run only
            console.log = (...args) => {
                const logStrs = args.map(arg => logger(arg)).join(',');
                setLogs(prev => [...prev, logStrs]);
            };

            const compiledCode = ts.transpile(code);
            new Function(compiledCode)(); //code execution
        } catch (error: unknown) {
            const err = error as Error;
            setLogs(prev => [...prev, `RUNTIME ERROR: ${err?.message}`]);
        } finally {
            console.log = originalLog;
            console.error = originalError;
        }
    };

    useEffect(() => {
        console.log(CONSTANTS.devNote);
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/*Code Editor Section (70%) */}
            <div className="w-full md:w-[65%] h-1/2 md:h-full">
                <MonacoEditorComponent value={code} onChange={setCode} />
            </div>

            {/*Console Section (30%) */}
            <div className="w-full md:w-[35%] h-1/2 md:h-full bg-gray-900 flex flex-col">
                {/*Console Header (compact with round buttons) */}
                <div className="flex justify-start items-center p-2 bg- space-x-2">
                    <button
                        onClick={runCode}
                        className="w-8 h-8 cursor-pointer bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600"
                        title="Run Code"
                    >
                        {/*Example: <img src="/icons/run.svg" alt="Run" className="w-4 h-4" /> */}
                    </button>
                    <button
                        onClick={() => setLogs([])}
                        className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        title="Clear Logs"
                    >
                        {/*Example: <img src="/icons/clear.svg" alt="Clear" className="w-4 h-4" /> */}
                    </button>
                    <button
                        onClick={() => navigator.clipboard.writeText(logs.join('\n'))}
                        className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        title="Copy Logs"
                    >
                        {/*Example: <img src="/icons/copy.svg" alt="Copy" className="w-4 h-4" /> */}
                    </button>
                </div>

                {/*Console Output */}
                <div className="flex-1 overflow-auto text-white font-mono text-sm">
                    <ConsolePanel logs={logs} />
                </div>
            </div>
        </div>


    );
};

export default Hero;
