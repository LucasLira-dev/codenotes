import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Highlight, themes } from "prism-react-renderer"

const code = `idade = 19
if idade >= 18:
    print("Maior de idade")`

export const AllNotes = () => {
    return(
        <article
        className="flex flex-col gap-2">
            <Card
            className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full ">
                <CardHeader>
                    <CardTitle
                    className="text-[var(--foreground)] text-[18px]">
                        Como usar if no Python
                    </CardTitle>
                    <p
                    className="text-sm text-gray-400">
                        Python
                    </p>
                </CardHeader>
                <CardContent>
                    <Highlight
                        code={code}
                        language="python"
                        theme={themes.dracula}
                    >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                className={`rounded-md p-4 text-sm font-mono overflow-x-auto mb-2 ${className}`}
                                style={style}
                            >
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line, key: i })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight> 

                    <p
                    className="text-sm text-gray-400">
                        Criada em 01/01/2025, 12:49
                    </p>
                </CardContent>
            </Card>

            <Card
            className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full ">
                <CardHeader>
                    <CardTitle
                    className="text-[var(--foreground)] text-[18px]">
                        Como usar if no Python
                    </CardTitle>
                    <p
                    className="text-sm text-gray-400">
                        Python
                    </p>
                </CardHeader>
                <CardContent>
                    <Highlight
                        code={code}
                        language="python"
                        theme={themes.dracula}
                    >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                className={`rounded-md p-4 text-sm font-mono overflow-x-auto mb-2 ${className}`}
                                style={style}
                            >
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line, key: i })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight> 

                    <p
                    className="text-sm text-gray-400">
                        Criada em 01/01/2025, 12:49
                    </p>
                </CardContent>
            </Card>
        </article>
    )
}