'use client'

import { BalaoComp } from "@/components/BalaoComp"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"


interface BalaoPros {
    id: string;
    name: string;
    title: string;
    subtitle: string;
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

    const [zap, setZap] = useState({zap: ''})

    useEffect (() => {
        async function getZap() {
            const res = await api.get('/getzap').then((res) => {
                setZap(res.data)
            })
        }

        getZap()
    }, [])

    
    const newPremios = data.premios?.split(',')
    const [premios, setPremios] = useState<string[]>([])
     

    useEffect( () => {
        async function getNames() {
            const res = await api.post('/getnames2', {
                id: data.premios
            }).then((res) => {
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
            typ: 1,
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
        <div className={`${data.bgColor} flex items-center justify-center flex-col w-full h-screen`} >
            <div className="relative flex flex-col items-center justify-center text-center">
                <h1 className="text-[38px] sm:text-[32px] font-black">{data.title}</h1>
                <h2 className="text-[28px] sm:text-[22px] font-semibold">{data.subtitle}</h2>
            </div>
            <div className="flex items-center justify-center p-4 rounded-lg text-2xl">
                Restam <span className="p-1 mx-1 border-2 text-black rounded-md">{ restantes }</span> tentativa(s)!
            </div>
            <div className={`${data.secondaryColor} mt-4 items-center justify-center flex flex-wrap gap-2 p-2 rounded-lg`}>

                {
                    randomizedArray.map((balao, index) => {
                        return (
                            <BalaoComp zap={zap} restantes={attIps} block={blockIp} tentativas={tentativas} key={index} color={data.primaryColor} name={balao[1]} id={balao[0].toString()}/>
                        )
                    })
                }
                

            </div>
        </div>
    )
}