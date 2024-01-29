// React
import { SelectHTMLAttributes } from "react"

// Css
import styles from "./select.module.css"

interface IOptionData {
    value: string | number | readonly string[];
    optionText: string
} 

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: IOptionData[]
}

function useSelect( { options, ...restProps }: ISelectProps ){

    function renderOptions(){
        return options.map( option  => {
            const { value, optionText } = option
            return <option key={optionText} value={value}>{optionText}</option>
        })
    }

    return {
        ...restProps,
        renderOptions
    }
}

export default function Select( props: ISelectProps ){

    const { renderOptions, ...restProps } = useSelect(props)

    return (
        <select className={styles.container} {...restProps}>
            {renderOptions()}
        </select>
    )
}