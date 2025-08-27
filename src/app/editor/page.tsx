import { EditorHeader } from '@/components/EditorHeader/editorHeader'
import { CodeEditor } from '@/components/CodeEditor/codeEditor'

export default function EditorPage() {
  return (
    <>
      <EditorHeader />
      <main
      className='bg-[var(--background)] flex flex-col justify-center items-center'>
        <section
        className="container mx-auto flex flex-col md:max-w-[1000px] px-4 py-16 gap-4">
          <article>
            <h3
            className="text-[var(--foreground)] mb-1 font-semibold">
              Descrição
            </h3>
            <textarea
              className="border-1 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] py-1 px-2 rounded w-full h-30"
              placeholder="Descreva sua nota aqui..."
            />
          </article>
          <CodeEditor />
        </section>
      </main>
    </>
  )
}