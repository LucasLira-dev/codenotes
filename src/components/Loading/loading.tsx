'use client'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center">
        <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--primary)] mb-4"></span>
        <span className="text-[var(--foreground)] text-lg font-medium">Carregando...</span>
      </div>
    </div>
  );
}