// React
import { ButtonHTMLAttributes } from "react";

// Css
import styles from "./button.module.css"

export default function Button( { children, className, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement> ){
    return <button {...restProps} className={`${styles.container} ${className}`} >{children}</button>
}