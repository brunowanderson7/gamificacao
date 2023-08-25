'use client'

import { api } from "@/lib/api";
import { Roulette } from "./Roulette";
import { useEffect, useState } from "react";
import Image from "next/image";


export interface DataProps {
    id: string;
    name: string;
    title: string;
    subtitle: string;
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

    const [zap, setZap] = useState({zap: ''})

    useEffect (() => {
        async function getZap() {
            const res = await api.get('/getzap').then((res) => {
                setZap(res.data)
            })
        }

        getZap()
    }, [])

    const [restantes, setRestantes] = useState<number>(data.limitUse)
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

    return (
        <div className={`${data.bgColor} flex items-center justify-center flex-col w-full h-screen overflow-y-hidden`} >
            <div className={`text-${data.textColor} relative flex flex-col items-center justify-center text-center`}>
                <h1 className="text-[38px] sm:text-[32px] font-black">{data.title}</h1>
                <h2 className="text-[28px] sm:text-[22px] font-semibold">{data.subtitle}</h2>
            </div>
            <div className={`text-${data.textColor} flex items-center justify-center p-4 rounded-lg text-2xl`}>
                Restam <span className={`p-1 mx-1 border-2 bg-white/30 text-${data.textColor} rounded-md`}>{ restantes }</span> tentativa(s)!
            </div>
            {(newData.length !== 0 ) && <Roulette zap={zap} restantes={attIps} block={blockIp} tentativas={tentativas} data={newData} />}
        </div>
    )
}