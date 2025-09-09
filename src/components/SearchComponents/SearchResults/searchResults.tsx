import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";
import { BiErrorAlt } from "react-icons/bi";

interface SearchResultsProps {
    searchTerm: string;
    notes: Array<{ 
        id: number; 
        title: string; 
        language: string; 
        code: string
        createdAt: string;}>;
}

export const SearchResults = ({ searchTerm, notes }: SearchResultsProps) => {
    return(
        <div
            className="flex flex-col w-full md:max-w-[1000px]">
                <div
                className='flex items-center justify-between text-[var(--foreground)] gap-4 mb-2'>
                    <h4
                    className='text-lg font-semibold'>
                        Resultados de {searchTerm}
                    </h4>
                    <span
                    className='text-sm text-[var(--muted-foreground)]'
                    >
                        {notes.length} {notes.length === 1 ? 'anotação encontrada' : 'anotações encontradas'}
                    </span>
                </div>

                {notes.length > 0 ? (
        <article className="flex flex-col gap-2">
          {notes.map((note) => (
            <Card
              className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full"
              key={note.id}
            >
              <CardHeader>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex justify-between items-center w-full">
                    <CardTitle className="text-[var(--foreground)] text-[18px] leading-normal w-full md:max-w-full">
                      {note.title}
                    </CardTitle>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[var(--primary)] bg-opacity-10 border border-[var(--primary)] w-fit">
                    <span className="text-xs font-medium text-[var(--foreground)]">{note.language}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Highlight
                  code={note.code}
                  language={note.language}
                  theme={themes.dracula}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className={`rounded-md p-4 text-sm font-mono overflow-x-auto mb-2 ${className}`}
                      style={style}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
                {note.createdAt && (
                  <p className="text-sm text-gray-400">
                    {note.createdAt && !isNaN(new Date(note.createdAt).getTime())
                      ? new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(note.createdAt))
                      : "Data inválida"}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </article>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <BiErrorAlt className="text-[var(--primary)]" size={80} />
          <span className="text-lg text-[var(--muted-foreground)] font-semibold text-center">
            Nenhuma anotação encontrada.<br />
            Verifique a ortografia ou tente outro termo!
          </span>
        </div>
      )}
    </div>
    )
}