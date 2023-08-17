import { Button } from "@/components/Button"

export default function Balao() {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Sistema de Games</h1>
      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Button title="Cadastrar Usuário" type="1" />
        <Button title="Cadastrar Prêmio" type="1" />
        <Button title="Criar Roleta" type="1" />
        <Button title="Criar Balão" type="1" />
        <Button title="Sair" type="0" />

      </div>

    </div>
  )
} 