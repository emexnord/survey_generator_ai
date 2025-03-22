import React from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  classnames?: string;
}

function Search({ title, classnames, ...rest }: SearchProps) {
  return (
    <div className='flex flex-col gap-y-4 items-center justify-center py-4'>
      <p className='text-[#FFFFFFBF] '>{title}</p>
      <div className="relative max-w-xl">
        <input
          type="text"
          placeholder="Search "
          className="w-64 bg-white/10 backdrop-blur-sm text-white px-6 py-1 rounded-lg pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...rest}
        />
        <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>

  );
}

export default Search;