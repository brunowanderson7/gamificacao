import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"

export default function Balao() {
    return (
        <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
            <div>
                {/* title */}
                <h1 className="text-center font-bold text-[38px] mb-8">Cadastrar Admin</h1>
            </div>

            <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
                <Input type="text" title="Novo Usuário" />
                <Input type="password" title="Senha" />
                <Input type="password" title="Confirmar Senha" />
                <Select min={0} max={999} title="Limite de Criação" />
                <Button title="Confirmar" type="1" />
                <Button title="Voltar" type="0" />

            </div>
        </div>
    )
} 