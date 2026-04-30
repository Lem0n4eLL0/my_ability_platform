import { Time } from './Time';

export type TimeAccuracy = 'seconds' | 'minuts' | 'hours' | 'days';
export const TimeAccuracyPriority: { [key in TimeAccuracy]: number } = {
  seconds: 0,
  minuts: 1,
  hours: 2,
  days: 3,
};

export const pad = (num: number): string => String(num).padStart(2, '0');
export const timeFormatter = (time: Time, accuracy: TimeAccuracy = 'seconds'): string => {
  const totalSeconds = time.seconds;
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));

  switch (accuracy) {
    case 'seconds':
      return `${pad(totalSeconds)}`;
    case 'minuts':
      return `${pad(minutes + hours * 60 + days * 60 * 24)}:${pad(seconds)}`;
    case 'hours':
      return `${pad(hours + days * 24)}:${pad(minutes)}:${pad(seconds)}`;
    case 'days':
      return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    default:
      return `${pad(totalSeconds)}`;
  }
};

export const timeFormatterText = (
  time: Time,
  accuracyMax: TimeAccuracy = 'hours',
  accuracyMin: TimeAccuracy = 'hours'
): string => {
  const totalSeconds = time.seconds;
  const seconds = totalSeconds % 60;
  const minuts = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));

  let result = '';
  if (
    days !== 0 &&
    TimeAccuracyPriority[accuracyMax] >= TimeAccuracyPriority['days'] &&
    TimeAccuracyPriority[accuracyMin] <= TimeAccuracyPriority['days']
  ) {
    result += `${days} дней `;
  } else if (
    hours !== 0 &&
    TimeAccuracyPriority[accuracyMax] >= TimeAccuracyPriority['hours'] &&
    TimeAccuracyPriority[accuracyMin] <= TimeAccuracyPriority['hours']
  ) {
    result += hours === 1 ? `${hours} час ` : `${hours} часов `;
  } else if (
    minuts !== 0 &&
    TimeAccuracyPriority[accuracyMax] >= TimeAccuracyPriority['minuts'] &&
    TimeAccuracyPriority[accuracyMin] <= TimeAccuracyPriority['minuts']
  ) {
    result += `${minuts} минут `;
  } else if (
    seconds !== 0 &&
    TimeAccuracyPriority[accuracyMax] >= TimeAccuracyPriority['seconds'] &&
    TimeAccuracyPriority[accuracyMin] <= TimeAccuracyPriority['seconds']
  ) {
    result += `${seconds} секунд `;
  }
  return result.trim();
};
