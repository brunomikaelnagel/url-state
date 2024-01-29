// React
import { ChangeEvent, FormEvent, KeyboardEvent } from "react"

//  Nextjs
import { useRouter, usePathname, useSearchParams } from "next/navigation"

// Componets
import Input from "../input"
import Button from "../button"
import Select from "../select"

// Icons
import { iconSearch } from "@/icons"

// Css
import styles from "./filter.module.css"

function useFilter(){

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function getIdadeOption() {
    if (searchParams.get("idade")) {
      return "idade";
    } else if (searchParams.get("idade>")) {
      return "idade>";
    } else if (searchParams.get("idade<")) {
      return "idade<";
    } else {
      return null;
    }
  }

  function getIdade() {
    const idadeOption = getIdadeOption();
    if (idadeOption) {
      return searchParams.get(idadeOption);
    }
    return null;
  }

  function handleFilters(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
  
    const fId = e.currentTarget.f_id.value
    const fNome = e.currentTarget.f_nome.value
    const fIdade = e.currentTarget.f_idade.value
    const fIdadeOption = e.currentTarget.f_idade_options.value

    const params = new URLSearchParams()

    if(fId){
      params.append("id", fId)
    }else{
      params.delete("id")
    }

    if(fNome){
      params.append("nome", fNome)
    }else{
      params.delete("nome")
    }

    if(fIdade){
      params.append(fIdadeOption, fIdade)
    }else{
      params.delete(fIdadeOption)
    }

    router.push(pathname + "?" + params.toString())
  } 

  function onlyNumbers(e : ChangeEvent<HTMLInputElement>){
    const value = e.currentTarget.value
    const numericValue = value.replace(/\D/g, '')
    e.currentTarget.value = numericValue
  }

  return {
    handleFilters,
    getIdadeOption,
    getIdade,
    searchParams,
    onlyNumbers
  }
}

export default function Filter(){

  const { handleFilters, getIdadeOption, getIdade, searchParams, onlyNumbers } = useFilter()

  return (
      <form onSubmit={handleFilters} className={styles.container}>
          <Input onChange={onlyNumbers} placeholder="Código" type="text" name="f_id" defaultValue={searchParams.get("id")??""} />
          <Input placeholder="Nome" type="text" name="f_nome" defaultValue={searchParams.get("nome")??""} />
          <Input onChange={onlyNumbers} placeholder="Idade" type="text" name="f_idade" defaultValue={getIdade()??""} />
          <Select name="f_idade_options" defaultValue={getIdadeOption()??"idade"} options={[
            {value: "idade", optionText: "idade igual"},
            {value: "idade>", optionText: "idade maior"},
            {value: "idade<", optionText: "idade menor"}
          ]}    
          />
          <Button>{iconSearch} Buscar</Button>
      </form>
    )
}