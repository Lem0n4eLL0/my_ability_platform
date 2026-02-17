import { IMGIcon } from '../shells/IMGIcon';
import style from './StepIcon.module.scss';

interface IStepIcon {
  src: string;
  alt: string;
  width?: number | string;
}

export const StepIcon = (props: IStepIcon) => {
  const { src, alt, width } = props;
  return (
    <IMGIcon
      src={src}
      alt={alt}
      width={width || '100%'}
      className={style['icon']}
      wrapperClassName={style['wrapper']}
    />
  );
};
