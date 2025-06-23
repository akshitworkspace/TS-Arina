"use client";
import { useCallback, useEffect, useState } from "react";
import * as ts from "typescript";
import MonacoEditorComponent from "./MonacoEditor";
import ConsolePanel from "./ConsolePanel";
import { logger } from "@/utils/logger";
import CONSTANTS from "@/utils/constants";
import play from "@/assets/play.svg";
import copy from "@/assets/copy.svg";
import clean from "@/assets/clean.svg";
import ButtonPrimary from "./ButtonPrimary";

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

    const copyLogs = useCallback(() => {
        navigator.clipboard.writeText(logs.join('\n'))
    }, [logs]);

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
                <div className="flex justify-end items-center p-2 bg- space-x-2">
                    <ButtonPrimary
                        onClick={runCode}
                        src={play}
                        className="bg-green-500 hover:bg-green-600"
                    />
                    <ButtonPrimary
                        onClick={() => setLogs([])}
                        src={clean}
                        className="bg-gray-200 hover:bg-gray-300"
                    />
                    <ButtonPrimary
                        onClick={copyLogs}
                        src={copy}
                        className="bg-gray-200 hover:bg-gray-300"
                    />
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
