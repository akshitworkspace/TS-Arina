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
        <div className="flex h-screen">
            <MonacoEditorComponent value={code} onChange={setCode} />
            <ConsolePanel logs={logs} />

            <div
                className="absolute top-4 right-4 bg-black text-white p-3 rounded-md cursor-pointer"
                onClick={runCode}
            >
                Run Code
            </div>
        </div>
    );
};

export default Hero;
