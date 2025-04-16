import React from 'react';

interface ToastProps {
  visible: boolean;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ visible, message, type }) => {
  if (!visible) return null;
  
  const bgColor = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-amber-500",
    error: "bg-red-500"
  }[type];
  
  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in transition-opacity`}>
      {type === "success" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
      {type === "info" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      )}
      {type === "warning" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v2M12 15h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      )}
      {type === "error" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      )}
      <span>{message}</span>
    </div>
  );
};
