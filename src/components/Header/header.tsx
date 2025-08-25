import { FaCode } from "react-icons/fa";

export const Header = () => {
  return (
    <header
    className="bg-[var(--header)] flex justify-between items-center p-4 border-b-1 border-b-[var(--border)]">
      <div
      className="flex items-center gap-2 text-2xl font-bold sm:ml-10 sm:mr-10 md:ml-15 md:mr-15">
        <FaCode
        className="text-[var(--primary)]"
         />
        <span
        className="text-[var(--foreground)]">
            CodeNotes
        </span>
      </div>
      <div
      className="flex gap-3 sm:ml-10 sm:mr-10 md:ml-15 md:mr-15 text-[14px] font-normal">
        <button
        className="text-[var(--foreground)] hover:bg-[var(--chart1-primary)] hover:text-black py-1 px-3 rounded cursor-pointer">
            Buscar
        </button>
        <button
        className="bg-[var(--primary)] text-black hover:brightness-90 py-1 px-3 rounded cursor-pointer">
            Começar
        </button>
      </div>
    </header>
  );
};