'use client'

import { BalaoComp } from "@/components/BalaoComp"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"


interface BalaoPros {
    id: string;
    name: string;
    limitUse: number;
    primaryColor: string;
    secondaryColor: string;
    bgColor: string;
    premios: string;
}

interface DataBalaoProps {
    data: BalaoPros
    tentativas: () => void
}


export function DataBalaoComp ( { data, tentativas }: DataBalaoProps ){

    console.log("Data Rolette log", data)

    const newPremios = data.premios?.split(',')
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

    const [restantes, setRestantes] = useState<number>(data.limitUse)
    


    const newData: [string, string][] = premios.map((item, index) => {
        return (
            [newPremios[index], item]
        )
    })

    console.log("New Data log",newData)


    function shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }


    const randomizedArray: [string, string][] = shuffleArray(newData);

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



    return (
        <div className="flex items-center justify-center flex-col w-full h-screen overflow-y-hidden">
            <div className="flex items-center justify-center p-4 rounded-lg text-2xl">
                Restam <span className="p-1 mx-1 border-2 bg-white/30 text-black rounded-md">{ restantes }</span> tentativa(s)!
            </div>
            <div className="mt-4 items-center justify-center flex gap-2 bg-black/20 p-8 sm:p-4 rounded-lg">

                {
                    randomizedArray.map((balao, index) => {
                        return (
                            <BalaoComp restantes={attIps} block={blockIp} tentativas={tentativas} key={index} color={data.primaryColor} name={balao[1]} id={balao[0].toString()}/>
                        )
                    })
                }
                

            </div>
        </div>
    )
}