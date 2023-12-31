'use client'


import React, { useState, useEffect } from 'react'
import { Wheel } from 'react-custom-roulette'
import { motion } from "framer-motion";
import { OverlayModal } from './OverlayModal';
import { api } from '@/lib/api';
import { OverlayBlock } from './OverlayBlock';

interface Zap {
    zap: string;
}

interface DataProps {
    option: string;
    style: {
        backgroundColor: string;
        textColor: string;
    }
}

interface RouletteProps {
    data: DataProps[]
    zap: Zap;
    tentativas: () => void;
    restantes: () => void;
    block: () => void;
}

export function Roulette({ data, zap, tentativas, restantes, block }: RouletteProps){


    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [modal, setModal] = useState(false)
    const [win, setWin] = useState<number>(0)
    const [over , setOver] = useState(false)


    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        console.log(newPrizeNumber)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
        restantes()
        setOver(true)
        setTimeout(() => {
            setOver(false)
            setWin(newPrizeNumber)
            setModal(true)
        }, 12000)
    }

    function close () {
        setModal(false)
        tentativas()
    }




    return (
        <div className='flex flex-col items-center justify-center'>
            {
                over && <OverlayBlock/>
            }            
            <div className='flex relative p-2 rounded-full items-center justify-center bg-violet-600 shadow-black shadow-md'>
                <Wheel
                    fontWeight={700}
                    fontSize={30}
                    mustStartSpinning={mustSpin}
                    radiusLineColor={'black'}
                    prizeNumber={prizeNumber}
                    data={data}
                    innerRadius={20}
                    radiusLineWidth={2}
                    outerBorderWidth={0}
                    onStopSpinning={() => {
                        setMustSpin(false)
                    }}
                />
                <motion.div
                    className="absolute rounded-full w-[64px] h-[64px] border-2 bg-white flex items-center justify-center border-black"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <button className='text-xl font-bold font-mono ' onClick={handleSpinClick}>SPIN</button>
                </motion.div>
            </div>
            {
                modal && <OverlayModal zap={zap.zap} block={block} name={data[win].option} info={'Você ganhou um prêmio!'} close={close}/>
            }
            
        </div>
    )

}