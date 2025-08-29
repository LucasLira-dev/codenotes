'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {EditorHeader } from '@/components/EditorHeader/editorHeader'
import { CodeEditor } from '@/components/CodeEditor/codeEditor'
import Loading from '@/components/Loading/loading'
import { TitleInput } from '@/components/TitleInput/titleInput'
import { EditorProvider} from '@/contexts/EditorContext'

export default function EditorPage() {


  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router, session?.accessToken])

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated" || !session?.accessToken) {
    router.push("/login")
  }


  return (
    <EditorProvider>
      <EditorHeader />
      <main
      className='bg-[var(--background)] flex flex-col justify-center items-center'>
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