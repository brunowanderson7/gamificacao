'use client'

import { motion } from "framer-motion"


interface ButtonProps {
    title: string;
    type: string;
}


export function Button({ title, type }: ButtonProps) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full hover:opacity-80 mb-2">
            {/* button */}
            <button className={`${type === '1' ? 'bg-cyan text-white' : 'bg-white border-2 border-cyan text-cyan'} font-semibold text-[22px] h-12 rounded-md px-2 w-full hover:shadow-black hover:shadow-sm`}>{title}</button>
        </motion.div>
    )
}