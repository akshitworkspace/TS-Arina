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

const originalLog = console.log;

const Hero = () => {
    const [code, setCode] = useState<string>(`//Write your TypeScript code here
console.log("Hello, world!");
`);
    const [logs, setLogs] = useState<string[]>([]);

    const runCode = () => {
        setLogs([]);
        try {
            const compiledCode = ts.transpile(code);
            new Function(compiledCode)(); //code execution
        } catch (error: unknown) {
            const err = error as Error;
            setLogs(prev => [...prev, `RUNTIME ERROR: ${err?.message}`]);
        }
    };

    const copyLogs = useCallback(() => {
        navigator.clipboard.writeText(logs.join('\n'))
    }, [logs]);

    useEffect(() => {
        console.log(CONSTANTS.devNote);
        console.log = (...args) => {
            const logStrs = args.map(arg => logger(arg)).join(' ');
            setLogs(prev => [...prev, logStrs]);
        };
        return () => {
            console.log = originalLog;
        }
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full h-dvh">
            {/* Code Editor Section (65%) */}
            <div className="w-full md:basis-[65%] md:flex-none max-h-full min-h-2/3">
                <MonacoEditorComponent value={code} onChange={setCode} />
            </div>

            {/* Console Section (35%) */}
            <div className="w-full md:basis-[35%] md:flex-none max-h-full min-h-1/3 bg-gray-900 flex flex-col">
                {/* Console Header */}
                <div className="flex justify-end items-center p-2 space-x-2 select-none">
                    <span className="mr-auto font-bold">Console</span>
                    <ButtonPrimary onClick={runCode} src={play} className="bg-green-500 hover:bg-green-600" />
                    <ButtonPrimary onClick={() => setLogs([])} src={clean} className="bg-gray-200 hover:bg-gray-300" />
                    <ButtonPrimary onClick={copyLogs} src={copy} className="bg-gray-200 hover:bg-gray-300" />
                </div>

                {/* Console Output */}
                <div className="flex-1 overflow-auto text-white font-mono text-sm">
                    <ConsolePanel logs={logs} />
                </div>
            </div>
        </div>

    );
};

export default Hero;
