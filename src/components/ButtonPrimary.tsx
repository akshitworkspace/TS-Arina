import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    src: string | StaticImport;
}

function ButtonPrimary({ src, className = "", ...rest }: ButtonPrimaryProps) {
    return (
        <button
            {...rest}
            className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center ${className}`}
        >
            <Image src={src} alt="Run" width={20} height={20} className="w-5 h-5" />
        </button>
    );
}

export default ButtonPrimary;
