import React from 'react';

interface ContentProps {
  className?: string;
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ className, children }) => {
  return (
    <div className={`Content ${className}`}>
      {children}
    </div>
  );
};

export default Content;
