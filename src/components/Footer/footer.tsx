import { Code2 } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="border-t bg-[var(--card)]">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-[var(--primary)]" />
              <span className="font-semibold">CodeNotes</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              © 2025 CodeNotes. Feito para programadores, por um programador.
            </p>
          </div>
        </div>
      </footer>
    )
}