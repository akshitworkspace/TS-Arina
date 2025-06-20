"use client";
import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface MonacoEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MonacoEditorComponent = ({ value, onChange }: MonacoEditorProps) => {
    const [editorValue, setEditorValue] = useState(value);

    const handleEditorChange = (newValue: string | undefined) => {
        if (newValue) {
            setEditorValue(newValue);
            onChange(newValue);
        }
    };

    return (
        <div className="w-2/3 h-full">
            <MonacoEditor
                height="100vh"
                language="typescript"
                value={editorValue}
                onChange={handleEditorChange}
                theme='vs-dark'
                options={{
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    fontSize: 18,
                    lineHeight: 1.6,
                }}
            />
        </div>
    );
};

export default MonacoEditorComponent;
