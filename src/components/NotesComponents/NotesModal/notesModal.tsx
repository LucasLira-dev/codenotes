import { useState, useEffect } from "react";
import { Dialog, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import {Highlight, themes} from "prism-react-renderer";

interface Note {
  id: number;
  title: string;
  code: string;
  language: string;
}

interface NotesModalProps {
  open: boolean;
  onClose: () => void;
  note?: Note;
  action: "edit" | "delete";
  onSave?: (title: string, code: string) => void;
  onDelete?: () => void;
}

export const NotesModal = ({
  open,
  onClose,
  note,
  action,
  onSave,
  onDelete,
}: NotesModalProps) => {
  const [editTitle, setEditTitle] = useState(note?.title || "");
  const [editCode, setEditCode] = useState(note?.code || "");

  useEffect(() => {
    setEditTitle(note?.title || "");
    setEditCode(note?.code || "");
  }, [note]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/40 z-50" />
        <DialogContent

        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-[var(--card)] text-[var(--foreground)] rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw]">
          {action === "edit" && note ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (onSave) onSave(editTitle, editCode);
              }}
              className="flex flex-col gap-4"
            >
              <DialogTitle>
                <div
                className="font-bold text-lg mb-4">
                  Editar Nota
                </div>
              </DialogTitle>
              <DialogDescription>
                Altere o título ou código da nota e clique em salvar.
              </DialogDescription>
              <label className="text-sm font-semibold">Título</label>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="border rounded px-3 py-2 mb-2 w-full"
                required
              />
              <label className="text-sm font-semibold">Código</label>
              <textarea
                value={editCode}
                onChange={e => setEditCode(e.target.value)}
                className="border rounded px-3 py-2 font-mono w-full min-h-[120px] mb-2"
                required
              />
              <div>
                <span className="text-xs text-gray-500">Visualização:</span>
                <Highlight
                  code={editCode}
                  language={note.language || "javascript"}
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
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-[var(--card)] cursor-pointer"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[var(--primary)] text-black font-semibold cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <DialogTitle>
                <div className="font-bold text-lg mb-4">
                  Excluir Nota
                </div>
              </DialogTitle>

              <DialogDescription>
                Confirme para excluir esta anotação permanentemente.
              </DialogDescription>
              <p className="mb-6">Tem certeza que deseja excluir a nota?</p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-[var(--card)] cursor-pointer"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white font-semibold cursor-pointer"
                  onClick={onDelete}
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};