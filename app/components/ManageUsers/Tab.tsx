import React from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  extraPadding?: string; // Optional prop for extra padding
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick, extraPadding }) => {
  return (
    <button
      className={`px-4 py-2 pr-6 font-semibold ${
        isActive ? 'bg-[#006330] text-white' : 'bg-[#D9D9D9] text-black'
      } ${extraPadding || ''} mx-2`} // Apply margin for separation
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
