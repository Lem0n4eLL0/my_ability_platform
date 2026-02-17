import { ImgHTMLAttributes } from 'react';

interface IIMGIcon extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
}

export const IMGIcon = (props: IIMGIcon) => {
  const { src, alt, className, wrapperClassName, ...rest } = props;
  return (
    <div className={wrapperClassName}>
      <img src={src} alt={alt} className={className} {...rest} />
    </div>
  );
};
