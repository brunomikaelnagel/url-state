import { NextRequest, NextResponse } from "next/server";
import { IFilter } from "@/interface/filter";
import { TableClient } from "@/database/tables/clients";

const tableClientes = new TableClient()

export async function GET( req: NextRequest ){
    
    const filters: IFilter[] = []

    req.nextUrl.searchParams.forEach((value, key) => {
        filters.push({ key, value })
    })

    const data = await tableClientes.getAll(filters)

    if(data){
        return NextResponse.json(data)
    }else{
        return NextResponse.json( { status: "error", msg: 'Erro com banco de dados!' } )
    }
}