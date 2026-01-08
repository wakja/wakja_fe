"use client";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
}

export default function Toast({ message, type = "info", isVisible }: ToastProps) {
  if (!isVisible) return null;

  const bgColor = {
    success: "bg-green-600",
    error: "bg-[var(--danger)]",
    info: "bg-[#333]",
  }[type];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100]">
      <div className={`${bgColor} text-white px-4 py-2 rounded-[2px] shadow-lg text-[13px] animate-fade-in`}>
        {message}
      </div>
    </div>
  );
}
