'use client'

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {EditorHeader } from '@/components/EditorComponents/EditorHeader/editorHeader'
import { CodeEditor } from '@/components/EditorComponents/CodeEditor/codeEditor'
import Loading from '@/components/Loading/loading'
import { TitleInput } from '@/components/EditorComponents/TitleInput/titleInput'
import { EditorProvider} from '@/contexts/EditorContext'
import { Chatbot } from "@/components/Chatbot/chatbot"

export default function EditorPage() {


  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login")
    }
  }, [isPending, router, session])

  if (isPending) {
    return <Loading />
  }

  return (
    <EditorProvider>
      <EditorHeader />
      <main
      className='bg-[var(--background)] flex flex-col justify-center items-center min-h-screen w-full'>
        <Chatbot />
        <section
        className="container mx-auto flex flex-col md:max-w-[1000px] px-4 py-16 gap-4">
          <article>
            <TitleInput />
          </article>
          <CodeEditor
           />
        </section>
      </main>
    </EditorProvider>
  )
}