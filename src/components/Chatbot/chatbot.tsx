"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chatbotService } from "@/service/chatbotService";
// import { AiOutlineLoading } from "react-icons/ai";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [humanMessage, setHumanMessage] = useState("");
  const [AIMessage, setAIMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([{ role: "bot", content: "Olá! Como posso ajudar você hoje?" }]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [humanMessage, AIMessage, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    try {
      // setIsLoading(true);
      setHumanMessage(inputValue);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: inputValue },
      ]);
      setInputValue("");

      const AIResponse = chatbotService.getAIResponse(inputValue);
      AIResponse.then((response) => {
        setAIMessage(response);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "bot", content: response },
        ]);
        // setIsLoading(false);
      }).catch((error) => {
        console.error("Error getting AI response:", error);
        // setIsLoading(false);
        const errorMessage = error.message || "Desculpe, ocorreu um erro ao obter a resposta.";
        setAIMessage(errorMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content: errorMessage,
          },
        ]);
      });
    } catch (error) {
      // setIsLoading(false);
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-[var(--card)] text-[var(--card-foreground)] border-border animate-in fade-in slide-in-from-bottom-10 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl border shadow-xl sm:w-[400px]">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Suporte CodeNotes</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-[var(--primary-foreground)] hover:bg-[var(--primary)/20] h-8 w-8 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-[80%] gap-2",
                    msg.role === "user"
                      ? "ml-auto flex-row-reverse"
                      : "mr-auto",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      msg.role === "user"
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      msg.role === "user"
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]",
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Digite sua dúvida..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
                className="flex-1 text-[var(--foreground)] "
              />
              <Button
                type="submit"
                size="icon"
                className="text-[var(--foreground)] cursor-pointer"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4 text-[var(--foreground)] cursor-pointer" />
              </Button>
            </form>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-105 bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};
