"use client";
import MonacoEditor from "@monaco-editor/react";

interface MonacoEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MonacoEditorComponent = ({ value, onChange }: MonacoEditorProps) => {
    const handleEditorChange = (newValue: string | undefined) => {
        if (typeof newValue === "string") {
            onChange(newValue);
        }
    };

    return (
        <div className="h-full w-full">
            <MonacoEditor
                language="typescript"
                value={value}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    wordWrap: "on",
                    fontSize: 18,
                    lineHeight: 24,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                }}
            />
        </div>
    );
};

export default MonacoEditorComponent;
