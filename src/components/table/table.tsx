// Interface
import { IClient } from "@/interface/client"

interface IListaProps {
    clientes: IClient[]
    headers: string[]
    columns: string[]
}

// Css
import styles from "./table.module.css"

function useTable( { headers, columns, clientes }:IListaProps ){

    function renderHeader(){
        return (
            <tr key="header" className={styles.header_row}>
                {
                    headers.map(header => {
                        return <td key={header} className={styles.header_data}>{header}</td>
                    })
                }
            </tr>
        )
    }

    function renderBodyData(cliente: IClient){
        return columns.map( column => {
            const data = cliente[column as keyof IClient]
            return <td className={styles.body_data} key={data}>{data}</td>
        })
    }

    function renderBody(){

        return clientes.map( cliente => {
            return (
                <tr key={cliente.id} className={styles.body_row}>
                    {renderBodyData(cliente)}
                </tr>
            )
        } )
        
    }

    return {
        renderHeader,
        renderBody
    }
}

export default function Table( props: IListaProps ){

    const { renderHeader, renderBody } = useTable(props)

    return (
        <table className={styles.container}>
            <thead>
                {renderHeader()}
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </table>
    )
}