'use client'


import React, { useState, useEffect } from 'react'
import { Wheel } from 'react-custom-roulette'
import { motion } from "framer-motion";
import { api } from '@/lib/api';


interface DataProps {
    option: string;
    style: {
        backgroundColor: string;
        textColor: string;
    }
}

interface RouletteProps {
    data: DataProps[]
    tentativas: () => void;
}

export function Roulette({ data, tentativas }: RouletteProps){


    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        console.log(newPrizeNumber)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }




    return (
        <div>
            <div className='flex relative p-2 rounded-full items-center justify-center bg-purple-500 shadow-black shadow-md'>
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
        </div>
    )

}