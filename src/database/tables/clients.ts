// interface
import { IFilter } from "@/interface/filter"
import { isClientList } from "@/interface/client"
import pg_conn from "@/database/pg_config"

export class TableClient{
    
    #filterMap: { [key: string]: string } = {
        id: "id =",
        nome: "nome ILIKE",
        cpf: "cpf ILIKE",
        idade: "idade =",
        "idade>": "idade >",
        "idade<": "idade <",
    }

    #filterParseInt: string[] = ["id", "idade", "idade>", "idade<"]
    #filterIlike: string[] = ["nome", "cpf"]
    #filterEqual: string[] = []

    buildFilter(filters: IFilter[]){
        let where = ""
        const params: (number | string)[] = []

        filters.forEach(( filter, index ) => {
            
            const { key, value } = filter
            const field = this.#filterMap[key]

            if(field !== undefined){

                if(where) {
                    where += " AND "
                }

                where += `${field} $${index + 1}`

                if(this.#filterParseInt.includes(key)){
                    params.push(parseInt(value))
                }else if(this.#filterIlike.includes(key)){
                    params.push(`%${value}%`)
                }else{
                    params.push(value)
                }
            }
        })

        where = where ? " WHERE " + where : ""
        return {
            where,
            params
        }
    }

    async getAll(filters?: IFilter[]) {
        const baseQuery = "SELECT id, nome, idade FROM clientes ";
        let whereClause = "";
        let queryParams: (number | string)[] = [];
    
        if (filters) {
            const { where, params } = this.buildFilter(filters);
            whereClause = where;
            queryParams = params;
        }

        const res = await pg_conn.query(baseQuery + whereClause, queryParams);
        const data = res.rows;

        if (isClientList(data)) {
            return data;
        }
    }
}
