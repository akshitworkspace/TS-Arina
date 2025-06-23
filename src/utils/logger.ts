const arrayHelper = (arg: unknown[]) => {
    if (!arg.length) return `[]`;
    return `[${arg.map((element) => logger(element)).join(',')}]`
}
export const logger = (val: unknown): string => {
    if (typeof val === "string") return val;
    if (typeof val === "function") return "ƒ";
    if (Array.isArray(val)) {
        return arrayHelper(val)
    };
    if (val === undefined) return "undefined";
    if (typeof val === "object" && val !== null) {
        const entries = Object.entries(val).map(([key, value]) => {
            if (typeof value === "function") return `${key}: ƒ`;
            if (Array.isArray(value)) {
                return arrayHelper(value)
            };
            return `${key}: ${JSON.stringify(value)}`;
        });
        return `{${entries.join(", ")}}`;
    }
    return String(val);
};