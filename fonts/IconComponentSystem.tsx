import React from 'react';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, color = 'currentColor' }) => {
  return <i className={icon icon-} style={{ fontSize: size, color }} />;
};
