'use client'

import { api } from "@/lib/api";
import { Roulette } from "./Roulette";
import { useEffect, useState } from "react";


export interface DataProps {
    id: string;
    nome: string;
    amountSlice: number;
    limitUse: number;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    premios: string;
}


interface RouletteProps {
    data: DataProps
    tentativas: () => void
}


export function DataRoulette({ data, tentativas }: RouletteProps){

    console.log("Data Rolette log", data)
    // const newPremios = data.premios?.split(',')

    const [premios, setPremios] = useState<string[]>([])
     

    useEffect( () => {
        async function getNames() {
            const res = await api.post('/getnames2', {
                id: data.premios
            }).then((res) => {
                console.log("res", res.data)
                const names = res.data
                setPremios(names.data)
            })
        }

        getNames()
    }, [])



    console.log("array de premios id", premios)

    
    const newData = premios.map((item, index) => {
        
        if(index % 2 === 0){
            return {
                option: item,
                style: {
                    backgroundColor: data.primaryColor,
                    textColor: data.textColor
                }
            }
        }else {
            return {
                option: item,
                style: {
                    backgroundColor: data.secondaryColor,
                    textColor: data.textColor
                }
            }
        }
    })

    console.log("Dados para roleta",newData)

    return (
        <>{(newData.length !== 0 ) && <Roulette tentativas={tentativas} data={newData}/>}</>
    )
}