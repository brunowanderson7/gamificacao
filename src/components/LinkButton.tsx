'use client'

import { motion } from "framer-motion"
import Link from 'next/link'


interface ButtonProps {
    title: string;
    type: string;
    href: string;
}


export function LinkButton({ title, type, href }: ButtonProps) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full hover:opacity-80 mb-2">
            {/* button */}
            <Link href={href} className={`${type === '1' ? 'bg-cyan-600 text-white' : 'bg-white border-2 border-cyan-600 text-cyan-600'} font-semibold text-[22px] h-12 rounded-md px-2 w-full hover:shadow-black hover:shadow-sm`}>{title}</Link>
        </motion.div>
    )
}