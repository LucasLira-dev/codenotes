'use client'

import {EditorHeaderDemo } from '@/components/DemoComponents/EditorHeaderDemo/editorHeaderDemo'
import { CodeEditorDemo } from '@/components/DemoComponents/CodeEditorDemo/codeEditorDemo'
import { TitleInputDemo } from '@/components/DemoComponents/TitleInputDemo/titleInputDemo'
import { DemoProvider} from '@/contexts/DemoContext'

export default function EditorPage() {

  return (
    <DemoProvider>
      <EditorHeaderDemo
       />
      <main
      className='bg-[var(--background)] flex flex-col justify-center items-center min-h-screen w-full'>
        <section
        className="container mx-auto flex flex-col md:max-w-[1000px] px-4 py-16 gap-4">
          <article>
            <TitleInputDemo
            />
          </article>
          <CodeEditorDemo
           />
        </section>
      </main>
    </DemoProvider>
  )
}