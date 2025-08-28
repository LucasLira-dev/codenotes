'use client'

import { FaRegFileCode, FaRegCheckCircle } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { LuTerminal } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { autocompletion } from '@codemirror/autocomplete'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react";

export const CodeEditor = () => {

    const [code, setCode ] = useState("console.log(\"Hello, world!\");")
    const [copied, setCopied] = useState(false)
    const [output, setOutput ] = useState<string[]>([])
    const workerRef = useRef<Worker | null>(null);

    const [activeTab, setActiveTab ] = useState("editor")
    const [language, setLanguage ] = useState("javascript")

    const languages = {
        javascript: javascript( { jsx: true }),
        python: python(),
        html: html(),
        css: css()
    }

     useEffect(() => {
    // Cria o Worker dinamicamente
    const workerCode = `
      self.onmessage = function(e) {
        const code = e.data;
        let logs = [];
        const originalLog = console.log;
        
        console.log = (...args) => {
          logs.push(args.join(" "));
          originalLog(...args);
        };

        try {
          new Function(code)(); // executa código JS
          self.postMessage({ logs });
        } catch (err) {
          self.postMessage({ logs: ["Erro: " + err.message] });
        }

        console.log = originalLog;
      }
    `;
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    worker.onmessage = (e) => {
      setOutput(e.data.logs);
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const runCode = () => {
    workerRef.current?.postMessage(code);
  };


  const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code);
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  } catch (err) {
    console.error('Erro ao copiar código:', err);
  }
};

    return(
        <article>
            <h3
            className="text-[var(--foreground)] mb-1 font-semibold">
                Código
            </h3>
            <aside
            className={"rounded-md bg-[#1E293B] p-4"}>
                <div
                className="flex items-center justify-between gap-2 mb-2 text-[20px] text-[var(--muted-foreground)]">
                    <div
                    className="flex items-center gap-1">
                        <FaRegFileCode className="text-[var(--primary)] mr-1 text-md" />
                        Editor <span className="hidden sm:block"> de código </span>
                    </div>

                    <div 
                    className="flex items-center gap-4">
                        <Select
                            onValueChange={(value) => {
                                setLanguage(value)
                            }}
                            defaultValue="javascript">
                            <SelectTrigger
                            className="gap-2 bg-[#0F172A]">
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent
                            className="text-[var(--foreground)] bg-[#1E293B]">
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="html"> HTML </SelectItem>
                                <SelectItem value="css">
                                    CSS
                                </SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                            </SelectContent>
                        </Select>

                        <div
                        className="flex items-center gap-2 text-[var(--foreground)]">

                            { copied ? (
                                <FaRegCheckCircle
                                className="text-[var(--primary)]"
                                 />
                            ): (
                                <MdContentCopy
                                onClick={copyCode}
                                className="cursor-pointer hover:text-[var(--primary)] transition-colors" 
                                />
                            )}

                        </div>
                    </div>
                </div>

                <div
                className="bg-[#233043]">
                    <Tabs 
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="h-full">
                        <div
                        className="flex items-center justify-between">
                            <div
                            className="p-2">
                                <TabsList
                                className="bg-[#334155] text-[var(--foreground)]">
                                    <TabsTrigger value="editor"
                                    className={activeTab === "editor" ? "text-[var(--foreground)] bg-[#0F172A]" : "text-[var(--foreground)]"}
                                     >
                                        <FaRegFileCode className="mr-1 text-md" />
                                        Código
                                    </TabsTrigger>
                                    <TabsTrigger 
                                    value="saida"
                                    className={activeTab==="saida" ? "text-[var(--foreground)] bg-[#0F172A]" : "text-[var(--foreground)]" }
                                    >
                                        <LuTerminal className=" mr-1 text-md" />
                                        Saida
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {
                                language==="javascript" && (
                                    <button
                                    className="bg-[var(--primary)] text-black hover:brightness-90 py-1 px-3 rounded cursor-pointer flex items-center gap-2"
                                    onClick={() => { runCode(); setActiveTab("saida"); }}>
                                    <VscDebugStart className="mr-1" />
                                    Executar
                                </button>
                                )
                            }
                        </div>
                        <TabsContent 
                        value="editor"
                        className="bg-[#0F172A] text-[var(--foreground)] p-4 overflow-auto h-[400px] max-h-[700px]">
                            <CodeMirror
                                value={code}
                                theme= {oneDark}
                                extensions={[languages[language as keyof typeof languages],
                                autocompletion({
                                    activateOnTyping: true,
                                    maxRenderedOptions: 10
                                })
                                ]}
                                height= '350px'
                                onChange={(value) => setCode(value)}
                            />
                        
                        </TabsContent>
                        <TabsContent 
                        value="saida"
                        className="bg-[#293548] text-[var(--foreground)] p-4 overflow-auto h-[400px] max-h-[700px]">
                            <div className="prose">
                                { language==="javascript" ? (
                                    output.map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))
                                ): (
                                    <div>
                                        <p>
                                            Infelizmente não temos saida para essa linguagem.. :(
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </aside>
        </article>
    )
}