export const totalTaskFormatter = (value: number, lable: string = 'тестов'): string => {
  const strValue = String(value);
  if (strValue.length === 1) {
    return `${10}+ ${lable}`;
  } else {
    return `${Math.ceil(value / 10) * 10}+ ${lable}`;
  }
};
