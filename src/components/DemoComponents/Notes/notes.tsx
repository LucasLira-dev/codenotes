import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";
import { Note, useEditorDemo } from "@../../../src/contexts/DemoContext";

export const Notes = () => {
  const { notes } = useEditorDemo();

  return (
    <section>
      <h2 className="text-2xl font-bold mt-4 mb-4 text-[var(--foreground)]">
        Notas Salvas{notes.length > 0 ? ` (${notes.length})` : ""}
      </h2>
      {notes.length > 0 ? (
        <article className="flex flex-col gap-2">
          {notes.map((note: Note, idx: number) => (
            <Card
              className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full"
              key={idx}
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
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </CardContent>
            </Card>
          ))}
        </article>
      ) : (
        <div className="text-[var(--muted-foreground)] rounded-lg border border-dashed border-[var(--border)] p-6 text-center">
          Nenhuma nota salva ainda. Crie sua primeira anotação!
        </div>
      )}
    </section>
  );
};