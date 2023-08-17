'use client'


import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { motion } from "framer-motion";

const data = [
    { option: 'grana', style: { backgroundColor: 'transparent', textColor: 'white' } },
    { option: 'açaí', style: { backgroundColor: 'white', textColor: 'purple' } },
    { option: 'sorvete', style: { backgroundColor: 'transparent', textColor: 'white' } },
    { option: 'nadinha', style: { backgroundColor: 'white', textColor: 'purple' } },
    { option: '-500', style: { backgroundColor: 'transparent', textColor: 'white' } },
    { option: '20%', style: { backgroundColor: 'white', textColor: 'purple' } },
    { option: 'faca', style: { backgroundColor: 'transparent', textColor: 'white' } },
    { option: 'nada', style: { backgroundColor: 'white', textColor: 'purple' } }
]

export default function Roleta() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        console.log(newPrizeNumber)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }

    return (
        <div className='flex items-center justify-center flex-col w-full h-screen bg-cyan-300'>
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