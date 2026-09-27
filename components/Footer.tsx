import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100/30 bg-white py-8 text-center font-sans">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center gap-2">
        <p className="text-xs font-light tracking-[0.2em] text-gray-800 uppercase">
          © {new Date().getFullYear()} Monna Colección
        </p>
        
        <a 
          href="https://www.instagram.com/ayyquemonna" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group mt-1 flex items-center gap-1.5 text-xs font-light tracking-wide text-gray-500 transition-colors hover:text-pink-500"
        >
          <span>Seguinos en Instagram:</span>
          <span className="font-normal text-gray-700 group-hover:text-pink-500 transition-colors">@ayyquemonna</span>
          <span className="text-xs transition-transform group-hover:scale-110">📸</span>
        </a>
      </div>
    </footer>
  );
}