import { Code2, Plus, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"

export const QuickActions = () => {
    return (
      <Card className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full sm:max-w-md">
        <CardHeader className=" p-4 text-[var(--foreground)]">
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Ações Rápidas</CardTitle>
            <div>
              <Zap />
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Acesse rapidamente as funcionalidades principais
          </p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
          <button className="bg-[var(--primary)] rounded-md flex flex-row items-center justify-center p-3 gap-2 mb-2 w-full hover:brightness-90 cursor-pointer">
            <Plus />
            <span className="block md:hidden xl:block">Criar Nova Nota</span>
            <span className="hidden md:inline xl:hidden">Nota</span>
          </button>
          <button className="bg-[var(--background)] border-1 border-[var(--border)] text-[var(--foreground)] hover:brightness-90 p-3 gap-2 mb-2 rounded-md flex flex-row items-center justify-center w-full cursor-pointer">
            <Code2 />
            <span className="block md:hidden xl:block"> Editor de Código </span>
            <span className="hidden md:inline xl:hidden"> Código</span>
          </button>
        </CardContent>
      </Card>
    );
}