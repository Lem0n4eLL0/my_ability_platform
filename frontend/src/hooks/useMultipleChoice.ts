import { ChoiceBox } from '@/common/commonTypes';
import { useMemo, useState } from 'react';

type MultipleChoiceType = 'checkbox' | 'radio';

type UseMultipleChoiceProps<T extends string = string> = {
  variants: readonly T[];
  type: MultipleChoiceType;
  disabled?: boolean;
};

export const useMultipleChoice = <T extends string>(props: UseMultipleChoiceProps<T>) => {
  const { variants, type, disabled = false } = props;
  const [variantsState, setVariantsState] = useState<Record<T, boolean>>(() =>
    variants.reduce((prev, cur) => ({ ...prev, [cur]: false }), {} as Record<T, boolean>)
  );

  const selectedKeys = useMemo(
    (): string[] => (Object.keys(variantsState) as T[]).filter(key => variantsState[key] === true),
    [variantsState]
  );

  const onClick = (name: T) => {
    if (type === 'checkbox') {
      setVariantsState(prev => ({ ...prev, [name]: !prev[name] }));
    } else if (type === 'radio') {
      setVariantsState(pr => {
        const newState = { ...pr };
        Object.keys(newState).forEach(key => {
          newState[key as T] = false;
        });
        newState[name] = true;
        return newState;
      });
    }
  };

  const clear = () => {
    setVariantsState(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key as T] = false;
      });
      return newState;
    });
  };

  const register = (name: T): ChoiceBox => {
    return {
      isChecked: variantsState[name],
      disabled: !!disabled,
      onClick: _ => onClick(name),
    };
  };

  return {
    register,
    selected: selectedKeys,
    clear,
    values: { disabled: disabled, variantsState },
  };
};
