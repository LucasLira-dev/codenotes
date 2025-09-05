import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from "@radix-ui/react-toast";

type ToastType = "success" | "error";

interface CustomToastProps {
  open: boolean;
  type: ToastType;
  title: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
}

export const CustomToast = ({
  open,
  type,
  title,
  description,
  onOpenChange,
}: CustomToastProps) => {
  const bgColor =
    type === "success"
      ? "bg-[var(--primary)] text-black"
      : "bg-[var(--destructive)] text-white";

  return (
    <ToastProvider>
      <Toast
        open={open}
        onOpenChange={onOpenChange}
        className={`rounded-lg shadow-lg px-4 py-3 ${bgColor} border border-[var(--border)]`}
      >
        <ToastTitle className="font-bold">{title}</ToastTitle>
        {description && (
          <ToastDescription className="text-sm mt-1">{description}</ToastDescription>
        )}
        <ToastClose className="absolute top-2 right-2 text-lg cursor-pointer" />
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-50" />
    </ToastProvider>
  );
};