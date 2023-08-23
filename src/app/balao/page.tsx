'use client'


import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { DataBalaoComp } from "@/components/DataBalaoComp"
import { useSearchParams } from "next/navigation"


export default function Balao() {

  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('/findbalao', {
            name: name
        } );
        const mData = response.data;
        console.log("data puro", mData.data)
        setData(mData.data);

        if (mData.data) {
          setTentativas(true)
        } else {
          setTentativas(false)
        }

      } catch (error) {
        console.error('Erro ao buscar balão', error);
      }
    };
  
    fetchData();
  }, []);
  console.log("BALÃO: ", data)

  const [tentativas, setTentativas] = useState(true)

  async function attTentativas () {
    const test = await api.post('/updateip', {
      name: name,
    }).then((test) => {
      console.log("test", test.data)
      setTentativas(test.data.data)
      
    })
  }



  return (
      <div className='flex items-center justify-center flex-col w-full h-screen bg-cyan-300'>
          
          {// @ts-ignore
            ((data.length !== 0 ) && (tentativas)) ? <DataBalaoComp tentativas={() => attTentativas()} data={data}/> : (tentativas === false) ? <h1 className='text-4xl'>Tentativas esgotadas</h1> : <h1 className='text-4xl'>Carregando...</h1>
          }
      </div>
  )
} 