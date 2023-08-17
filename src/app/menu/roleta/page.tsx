import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"


export default function NovaRoleta() {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Cadastro de Roleta</h1>
      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input type="text" title="URL Banner" />
        <Input type="text" title="Cor Primaria" />
        <Input type="text" title="Cor Secundaria" />
        <Select min={4} max={16} title="Numero de Paletas" /> {/*  Apenas numeros pares */}
        <Select min={1} max={99} title="Limite de Tentativas" />
        <Button title="Confirmar" type="1" />
        <Button title="Voltar" type="0" />

      </div>
    </div>
  )
} 