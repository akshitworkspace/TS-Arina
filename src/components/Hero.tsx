"use client"
import { useState } from "react";
import * as ts from "typescript";
import MonacoEditorComponent from "./MonacoEditor";
import ConsolePanel from "./ConsolePanel";

const Home = () => {
    const [code, setCode] = useState<string>(`// Write your TypeScript code here
console.log("Hello, world!");`);

    const runCode = () => {
        try {
            //Compile TypeScript to JavaScript
            const compiledCode = ts.transpile(code);
            new Function(compiledCode)();
        } catch (error) {
            console.error("Error during execution:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <MonacoEditorComponent value={code} onChange={setCode} />
            <ConsolePanel />

            {/* "Run Code" Button - Top Right */}
            <div
                className="absolute top-4 right-4 bg-black text-white p-3 rounded-md cursor-pointer"
                onClick={runCode}
            >
                Run Code
            </div>
        </div>
    );
};

export default Home;
