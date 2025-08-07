'use client';
import React from 'react';
import { Search } from 'lucide-react';

function Navbar() {
  return (
    <nav className="flex items-center h-16 justify-between px-4 py-3 bg-white shadow-md">

      <div className="flex items-center gap-2">
        {/* <Search size={16} className="text-gray-500" /> */}
        {/* <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
      </div>


      <button
        className="text-gray-600 hover:text-black"
        aria-label="Profile or Settings"
      >
        
      </button>
    </nav>
  );
}

export default Navbar;
