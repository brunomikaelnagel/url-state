// React
import { InputHTMLAttributes } from "react"

// Css
import styles from "./input.module.css"

export default function Input( { className, ...restProps }: InputHTMLAttributes<HTMLInputElement>){
    return (
        <input {...restProps} className={`${styles.container} ${className}`}  />
    )
}