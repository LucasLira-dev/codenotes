import { Dialog, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const DeleteAccountModal = ({
  open,
  onClose,
  onConfirm,
isLoading,
}: DeleteAccountModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/40 z-50" />
        <DialogContent
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-[var(--card)] text-[var(--foreground)] rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw] border border-[var(--destructive)]"
        >
          <DialogTitle>
            <div className="font-bold text-lg mb-4 text-[var(--destructive)]">
              Deletar Conta
            </div>
          </DialogTitle>
          <DialogDescription>
            <p className="mb-4 text-[var(--muted-foreground)]">
              Tem certeza que deseja <span className="font-semibold text-[var(--destructive)]">deletar sua conta</span>?<br />
              Esta ação é <span className="font-semibold">permanente e irreversível</span>. Todos os seus dados serão perdidos.
            </p>
          </DialogDescription>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-[var(--card)] cursor-pointer"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 rounded bg-[var(--destructive)] text-white font-semibold cursor-pointer hover:bg-red-700 transition"
              disabled={isLoading}
              onClick={onConfirm}
            >
                {isLoading ? 'Deletando...' : 'Deletar Conta'}
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};