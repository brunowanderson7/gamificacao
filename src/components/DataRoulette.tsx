'use client'

import { api } from "@/lib/api";
import { Roulette } from "./Roulette";
import { useEffect, useState } from "react";


export interface DataProps {
    id: string;
    name: string;
    amountSlice: number;
    limitUse: number;
    primaryColor: string;
    secondaryColor: string;
    bgColor: string;
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
    const [restantes, setRestantes] = useState<number>(data.limitUse)


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


    async function attIps() {
        const up = await api.post('/updateip', {
            name: data.name,
            typ: 0,
        }).then((up) => {
            setRestantes(restantes - 1)
        })
    }

    async function blockIp () {
        await api.post('/blockip', {
            name: data.name,
            limit: data.limitUse
        })
    }

    console.log("Dados para roleta",newData)

    return (
        <div className="flex items-center justify-center flex-col w-full h-screen overflow-y-hidden">
            <div className="flex items-center justify-center p-4 rounded-lg text-2xl">
                Restam <span className="p-1 mx-1 border-2 bg-white/30 text-black rounded-md">{ restantes }</span> tentativa(s)!
            </div>
            {(newData.length !== 0 ) && <Roulette restantes={attIps} block={blockIp} tentativas={tentativas} data={newData}/>}
        </div>
    )
}