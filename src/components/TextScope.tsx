import { FC } from "react";

const TextScope: FC<{ log: string }> = ({ log }) => {
    if (!log) return "";
    if (log.startsWith("RUNTIME ERROR:")) return (
        <>
            <span className="text-red-500 text-sm">RUNTIME ERROR:</span>{log.replace("RUNTIME ERROR:", "")}
        </>
    );
    return log;
};
TextScope.displayName = "TextScope";
export default TextScope;