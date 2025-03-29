"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Header() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <header className="fixed bg-blue-600 right-0 left-0 top-0 text-white p-4 flex justify-between items-center w-full z-50">
      <h1 className="text-2xl font-bold">Menthee Technologies</h1>
      <button className="md:hidden text-white text-xl" onClick={() => setOpen(!isOpen)}>
        &#9776;
      </button>

      <nav className="hidden md:flex space-x-4">
        <Link href="../#car" className="hover:text-gray-300" >Home</Link>
        <Link href="../#about" className="hover:text-gray-300" >About</Link>
        <Link href="../#contact" className="hover:text-gray-300" >Contact</Link>
        <Link href="/form" className="hover:text-gray-300">Login as user</Link>
        <Link href="/adminlog" className="hover:text-gray-300" >Admin</Link>
      </nav>

      {isOpen && (
        <nav className="absolute top-16 right-4 bg-blue-700 p-4 rounded-lg w-40 flex flex-col space-y-2">
          <Link href="../#car" className="hover:bg-gray-600 p-2 rounded text-center" onClick={() => setOpen(!isOpen)}>Home</Link>
          <Link href="../#about" className="hover:bg-gray-600 p-2 rounded text-center" onClick={() => setOpen(!isOpen)} >About</Link>
          <Link href="../#contact" className="hover:bg-gray-600 p-2 rounded text-center" onClick={() => setOpen(!isOpen)}>Contact</Link>
          <Link href="/form" className="hover:bg-gray-600 p-2 rounded text-center" onClick={() => setOpen(!isOpen)}>Login as user</Link>
          <Link href="/adminlog" className="hover:bg-gray-600 p-2 rounded text-center" onClick={() => setOpen(!isOpen)}>Admin</Link>
        </nav>
      )}
    </header>
  );
}
