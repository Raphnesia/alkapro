'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LiveChatBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed right-[30px] bottom-[30px] z-40 w-[130px] cursor-pointer transition-all hover:scale-105 md:w-[170px] lg:w-[250px] flex">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-600"
        aria-label="Close support button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full w-full items-center justify-center"
        href="https://linktr.ee/smpmuh.alkautsarpk"
      >
        <Image
          src="/Alkapro Live Chat.png"
          alt="Contact Support - Live Chat"
          width={250}
          height={100}
          className="h-full w-full object-contain"
          priority
        />
      </a>
    </div>
  );
}
