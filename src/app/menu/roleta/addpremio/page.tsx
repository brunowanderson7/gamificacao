'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/Button"
import { FormEvent } from "react"
import { api } from "@/lib/api"
import { AxiosError } from "axios"
import { SelectPremio } from "@/components/SelectPremio"
import { ModalLink } from "@/components/ModalLink"



export default function RoletaPremio() {
  const [paletes, setPaletes] = useState(0);
  const [options, setOptions] = useState([])
  const [modLink, setModLink] = useState(false)
  const [url, setUrl] = useState('')
  const name = localStorage.getItem('name')


  useEffect(() => {
    const amountSliceString = localStorage.getItem('amountSlice');
    if (amountSliceString !== null) {
      const parsedAmount = parseInt(amountSliceString);
      setPaletes(parsedAmount);
    }
  }, []);
  const premioSelect = []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/listpremios');
        const premios = response.data;
        setOptions(premios.data);
        console.log(premios)
      } catch (error) {
        console.error('Erro ao buscar os prêmios', error);
      }
    };

    fetchData();
  }, []);


  async function handleSubmitPremio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita o comportamento padrão de abrir uma nova página
    const premioSelected = []

    const formData = new FormData(event.currentTarget)
    for (let i = 0; i < paletes; i++) {
      premioSelected.push(formData.get('id'+i))
    }
    const name = localStorage.getItem('name')
    const premios = premioSelected.join(',')

    console.log(name, premios)

    const res = await api.post('/addroulettepremio', {
      name: name,
      premios: premios
    }).then((res) => {
      console.log(res)
      setUrl(`/roleta?name=${name}`)
      setModLink(true)
      localStorage.removeItem('name')
      localStorage.removeItem('amountSlice')
    }).catch((err: AxiosError) => {
      console.log(err.response)
    })
    console.log(res)
  }

  
  function close () {
    setModLink(false)
    window.location.href = '/menu'
  }



  for (let i = 0; i < paletes; i++) {
    premioSelect.push(<SelectPremio id={'id'+i} options={options} />);
  }


  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Adicionar Prêmios</h1>
      </div>

      <form onSubmit={handleSubmitPremio} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2 mb-2">
        {
            premioSelect
        }
        <Button title="Confirmar" type="1" />
      </form>

      {modLink && <ModalLink close={() => close()} url={url} />}
    </div>
  )
} 