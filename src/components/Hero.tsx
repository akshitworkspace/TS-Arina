"use client";
import { useEffect, useState } from "react";
import * as ts from "typescript";
import MonacoEditorComponent from "./MonacoEditor";
import ConsolePanel from "./ConsolePanel";

const developerNote = `
  -----------------------------------------------
  Developed by: Akshit Lakhanpal
  Open for contribution! Feel free to fork and contribute.
  GitHub: https://github.com/akshitworkspace
  -----------------------------------------------
`;

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
                const logStrs = args.map(arg =>
                    typeof arg === "string" ? arg : JSON.stringify(arg)
                );
                setLogs(prev => [...prev, ...logStrs]);
            };

            const compiledCode = ts.transpile(code);
            new Function(compiledCode)(); //code execution
        } catch (error: any) {
            setLogs(prev => [...prev, `RUNTIME ERROR: ${error.message}`]);
        } finally {
            console.log = originalLog;
            console.error = originalError;
        }
    };

    useEffect(()=>{
        console.log(developerNote);
    },[]);

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
