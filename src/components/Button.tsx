'use client'

import { motion } from "framer-motion"


interface ButtonProps {
    title: string;
    type: string;
}


export function Button({ title, type }: ButtonProps) {
    return (
        <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full hover:opacity-80">
            {/* button */}
            <button className={`${type === '1' ? 'bg-cyan-600 text-white' : 'bg-white border-2 border-cyan-600 text-cyan-600'} font-semibold text-[22px] h-12 rounded-md px-2 w-full hover:shadow-black hover:shadow-sm`}>{title}</button>
        </motion.div>
    )
}