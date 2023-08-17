import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"


export default function NovaRoleta() {
    const quantidadePaletas = 8;
    const premioSelect = [];

    for (let i = 0; i < quantidadePaletas; i++) {
        premioSelect.push(<Input title="Selecione o Prêmio" type="text"/>);
    }


  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Adicionar Prêmios</h1>
      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2 mb-2">
        {
            premioSelect
        }

      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Button title="Confirmar" type="1" />
        <Button title="Voltar" type="0" />
      </div>

    </div>
  )
} 