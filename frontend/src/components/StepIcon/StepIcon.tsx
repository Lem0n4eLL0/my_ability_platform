import clsx from 'clsx';
import { IMGIcon } from '../shells/IMGIcon';
import style from './StepIcon.module.scss';

interface IStepIcon {
  src: string;
  alt: string;
  width?: number | string;
  padding?: number | string;
  extraClassName?: string;
}

export const StepIcon = (props: IStepIcon) => {
  const { src, alt, width, extraClassName } = props;
  return (
    <IMGIcon
      src={src}
      alt={alt}
      width={width || '100%'}
      className={style['icon']}
      wrapperClassName={clsx(style['wrapper'], extraClassName)}
    />
  );
};
