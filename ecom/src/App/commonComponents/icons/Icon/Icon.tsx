import cn from 'classnames';
import * as React from 'react';
import './Icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      {...props}
      className={cn('icon', color && `icon_color-${color}`, className)}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {children}
    </svg>
  );
};

export default Icon;
