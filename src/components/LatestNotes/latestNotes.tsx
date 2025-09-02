import { Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const LatestNotes = () => {
    return (
      <Card className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full">
        <CardHeader className="p-4 text-[var(--foreground)]">
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Notas Recentes</CardTitle>
            <div>
              <Clock />
            </div>
          </div>
          <p className="text-sm text-gray-400">Suas últimas anotações</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
          <div className="flex justify-between bg-[var(--card)] border-1 border-[var(--border)] shadow-md rounded-md p-4 w-full">
            <div className="text-[var(--foreground)]">
              <p className="font-bold">Como usar if no Python</p>
              <span className="text-sm text-gray-400">01/09, 11:57</span>
            </div>
            <FileText className="text-[var(--foreground)]" />
          </div>

          <div className="flex justify-between bg-[var(--card)] border-1 border-[var(--border)] shadow-md rounded-md p-4 w-full">
            <div className="text-[var(--foreground)]">
              <p className="font-bold">Função no JavaScript</p>
              <span className="text-sm text-gray-400">01/09, 21:57</span>
            </div>
            <FileText className="text-[var(--foreground)]" />
          </div>
        </CardContent>
      </Card>
    );
}