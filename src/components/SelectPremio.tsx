'use client'

import { api } from "@/lib/api"
import Select from 'react-select'

interface SelectPremioProps {
    id: string
}


export async function SelectPremio({id}: SelectPremioProps ) {
    const res = await api.get('/listpremios')
    console.log(res.data)
    const options = res.data

    return (
        <Select id={id} name={id} options={options} className="border-cyan-600 border-2 h-12 text-[22px] rounded-md px-2 w-full bg-slate-100"/>
    )
}