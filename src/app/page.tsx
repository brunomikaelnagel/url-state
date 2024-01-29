"use client"

import {useEffect, useState } from "react";
import { useSearchParams} from "next/navigation";

import styles from "./page.module.css";

// interface
import { IClient } from "@/interface/client";

// components
import Table from "@/components/table";
import Filter from "@/components/filter";

export default function Home() {

  const searchParams = useSearchParams()
  const [clientes, setClientes] = useState<IClient[]>([])

  function fetchClientes(){
    let urlSearchParams = searchParams.toString()
    urlSearchParams = urlSearchParams ? "?" + urlSearchParams : ""

    fetch(`http://localhost:3000/api/clientes${urlSearchParams}`)
    .then(resp => resp.json())
    .then(data => setClientes(data))
  }

  useEffect(fetchClientes, [searchParams])

  return (
    <main className={styles.main}>
      <h1>Clientes</h1>
      <Filter />
      <Table
        clientes={clientes}
        columns={["id", "nome", "idade"]}
        headers={["Código", "Nome", "Idade"]}
      />
    </main>
  );
}
