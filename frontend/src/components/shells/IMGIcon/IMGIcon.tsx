import { ImgHTMLAttributes } from 'react';
import style from './IMGIcon.module.scss';
import clsx from 'clsx';

interface IIMGIcon extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
}

export const IMGIcon = (props: IIMGIcon) => {
  const { src, alt, className, wrapperClassName, ...rest } = props;
  return (
    <div className={clsx(wrapperClassName, style['icon__wrapper'])}>
      <img src={src} alt={alt} className={className} {...rest} />
    </div>
  );
};
