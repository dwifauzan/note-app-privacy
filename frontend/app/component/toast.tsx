// Toast.tsx
import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-600 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 18 8-8-8-8-2 2 6 6-6 6z"/>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg>
        );
      case 'warning':
        return (
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h4m0 0V8m0 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
            </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 12 12m0-12-12 12"/>
          </svg>
        );
    }
  };

  return (
    <div
      id="toast-simple"
      className={`flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800 ${
        type === 'success' ? 'border-green-500' : type === 'warning' ? 'border-yellow-500' : type === 'error' ? 'border-red-500' : ''
      }`}
      role="alert"
    >
      {getIcon()}
      <div className="ps-4 text-sm font-normal">{message}</div>
    </div>
  );
};

export default Toast;