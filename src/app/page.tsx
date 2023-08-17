import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

export default () => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Sistema de Games</h1>
      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input type="text" title="Usuário" />
        <Input type="password" title="Senha" />
        <Button title="Entrar" type="1" />
      </div> 
 



    </div>
  )
}