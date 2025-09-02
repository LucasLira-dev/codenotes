'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Highlight, themes } from "prism-react-renderer"

import { useNotes} from "@/contexts/NotesContext"

export const AllNotes = () => {

    const { notes } = useNotes()

    return (
      <article className="flex flex-col gap-2">
        {notes.length > 0 &&
          notes.map((note, idx) => (
            <Card
              className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full "
              key={idx}
            >
              <CardHeader>
                <CardTitle className="text-[var(--foreground)] text-[18px]">
                  {note.title}
                </CardTitle>
                <p className="text-sm text-gray-400">{note.language}</p>
              </CardHeader>
              <CardContent>
                <Highlight
                  code={note.code}
                  language={note.language}
                  theme={themes.dracula}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={`rounded-md p-4 text-sm font-mono overflow-x-auto mb-2 ${className}`}
                      style={style}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>

                <p className="text-sm text-gray-400">
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  }).format(new Date(note.createdAt))}
                </p>
              </CardContent>
            </Card>
          ))}
      </article>
    );
}