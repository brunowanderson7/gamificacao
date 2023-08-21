'use client'

import { DataRoulette } from "@/components/DataRoulette"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { useRouter } from "next/router"



export default function Roleta() {

  

  // const { name } = useParams()
  // const router = useRouter();
  // const { name } = router.query;
  const name = 'ROLETA3'
  const [data, setData] = useState([])


  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.post('/findroulette', {
              name: name
          } );
          const mData = response.data;
          console.log("data puro", mData.data)
          setData(mData.data);
        } catch (error) {
          console.error('Erro ao buscar roleta', error);
        }
      };
  
      fetchData();
  }, []);


  console.log(data)
  

  return (
      <div  className='flex items-center justify-center flex-col w-full h-screen bg-cyan-300'>

        { // @ts-ignore
          (data.length !== 0) && <DataRoulette data={data}/>
        }
                
      
      </div>
  )
}