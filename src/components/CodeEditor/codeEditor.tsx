'use client'

import { FaRegFileCode } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { RiExpandDiagonalFill } from "react-icons/ri";
import { LuTerminal } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";

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
import { useState } from "react";

export const CodeEditor = () => {

    const [activeTab, setActiveTab ] = useState("editor")

    return(
        <article>
            <h3
            className="text-[var(--foreground)] mb-1 font-semibold">
                Código
            </h3>
            <aside
            className="rounded-md bg-[#1E293B] p-4 ">
                <div
                className="flex items-center justify-between gap-2 mb-2 text-[20px] text-[var(--muted-foreground)]">
                    <div
                    className="flex items-center gap-1">
                        <FaRegFileCode className="text-[var(--primary)] mr-1 text-md" />
                        Editor <span className="hidden sm:block"> de código </span>
                    </div>

                    <div 
                    className="flex items-center gap-4">
                        <Select>
                            <SelectTrigger
                            className="gap-2 bg-[#0F172A]">
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent
                            className="text-[var(--foreground)] bg-[#1E293B]">
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="typescript">TypeScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                            </SelectContent>
                        </Select>

                        <div
                        className="flex items-center gap-2 text-[var(--foreground)]">
                            <MdContentCopy />
                            <RiExpandDiagonalFill />
                        </div>
                    </div>
                </div>

                <div
                className="bg-[#233043]">
                    <Tabs defaultValue={activeTab} className="h-full">
                        <div
                        className="flex items-center justify-between">
                            <div
                            className="p-2">
                                <TabsList
                                className="bg-[#334155] text-[var(--foreground)]">
                                    <TabsTrigger value="editor"
                                    className={activeTab === "editor" ? "text-[var(--foreground)] bg-[#0F172A]" : "text-[var(--foreground)]"}
                                    onClick={() => setActiveTab("editor")}>
                                        <FaRegFileCode className="mr-1 text-md" />
                                        Código
                                    </TabsTrigger>
                                    <TabsTrigger 
                                    value="saida"
                                    className={activeTab==="saida" ? "text-[var(--foreground)] bg-[#0F172A]" : "text-[var(--foreground)]" }
                                    onClick={() => setActiveTab("saida")}>
                                        <LuTerminal className=" mr-1 text-md" />
                                        Saida
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <button
                            className="bg-[var(--primary)] text-black hover:brightness-90 py-1 px-3 rounded cursor-pointer flex items-center gap-2">
                                <VscDebugStart className="mr-1" />
                                Executar
                            </button>
                        </div>
                        <TabsContent 
                        value="editor"
                        className="bg-[#0F172A] text-[var(--foreground)] p-4 overflow-auto h-[400px] max-h-[700px]">
                            <pre>
                                <code className="language-javascript">
                                    {`const hello = "Hello, world!";
console.log(hello);`}
                                </code>
                            </pre>
                        </TabsContent>
                        <TabsContent 
                        value="saida"
                        className="bg-[#0F172A] text-[var(--foreground)] p-4 overflow-auto h-[400px] max-h-[700px]">
                            <div className="prose">
                                <h1>Hello, world!</h1>
                                <p>This is a preview of the rendered output.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </aside>
        </article>
    )
}