'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { OverlayModal } from './OverlayModal'

interface BalaoProps {
    color: string;
    name: string;
    id: string;
    tentativas: () => void;
    restantes: () => void;
}

export function BalaoComp( {color, name, id, tentativas, restantes}: BalaoProps ) {
    const [poow, setPoow] = useState(true)
    const [modal, setModal] = useState(false)

    function close () {
        setModal(false)
        tentativas()
    }



    const changePoow = () => {
        
        if (poow) {
            restantes()
        }
        setModal(poow)
        setPoow(false)
    }

    

    return (
        <>
            <motion.div whileTap={{ scale: 0.78 }} onClick={changePoow} className='items-center justify-center flex flex-col'>
                {
                    poow ? <Image src={color} width={100} height={100} alt='' /> : <Image src={'/poow.png'} width={100} height={100} alt='' />
                }

            </motion.div>

            {
                modal && <OverlayModal name={name} info={'Você ganhou um prêmio!'} close={close}/>
            }
        </>
        
    )
}