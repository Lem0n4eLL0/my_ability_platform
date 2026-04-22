import { SyntheticEvent } from 'react';
import { InformationField } from '../FieldInformation';
import style from './FIeldInfoDouble.module.scss';

export type IFieldInfoDouble = {
  children: React.ReactNode;
  description: string;
  canChange?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  canAdd?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  lable?: string;
};

export const FieldInfoDouble = (props: IFieldInfoDouble) => {
  const { children, description, ...rest } = props;

  return (
    <InformationField {...rest}>
      <div className={style['content']}>
        {children}
        <span className={style['content__description']}>{description}</span>
      </div>
    </InformationField>
  );
};
