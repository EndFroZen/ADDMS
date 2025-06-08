import React from 'react';

export const FileIcon = ({ type, className }: { type: string, className?: string }) => {
  const iconColor = "text-blue-500";
  
  return (
    <svg className={`${className} ${iconColor}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5A1.75 1.75 0 002 3.25v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.75v-7a.75.75 0 00-.22-.53l-3.5-3.5A.75.75 0 009.75 1.5h-6z" fill="currentColor"></path>
    </svg>
  );
};

export const FolderIcon = ({ className }: { className?: string }) => {
  const iconColor = "text-yellow-500";
  
  return (
    <svg className={`${className} ${iconColor}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H7.56a.25.25 0 01-.177-.073L5.823 2.573A.25.25 0 005.646 2.5H1.75z" fill="currentColor"></path>
    </svg>
  );
};

export const ChevronRightIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" fill="currentColor"></path>
    </svg>
  );
};