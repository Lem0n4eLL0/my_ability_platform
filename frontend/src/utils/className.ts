import { TestLevel } from '@/common/commonTypes';
import { assertNever } from './utils';
import commonStyle from '@styles/common.module.scss';

export const testLevelClasses = (level: TestLevel) => {
  switch (level) {
    case 'ENTRANCE':
      return [commonStyle['test__entrance_bg'], commonStyle['test__entrance_box-shadow']];
    case 'MEDIUM':
      return [commonStyle['test__medium_bg'], commonStyle['test__medium_box-shadow']];
    case 'HARD':
      return [commonStyle['test__hard_bg'], commonStyle['test__hard_box-shadow']];
    case 'EXPERT':
      return [commonStyle['test__expert_bg'], commonStyle['test__expert_box-shadow']];
    default:
      assertNever(level);
      return [commonStyle['test__none_bg'], commonStyle['test__none_box-shadow']];
  }
};

export const testResultClasses = (level: TestLevel) => {
  switch (level) {
    case 'ENTRANCE':
      return [
        commonStyle['test__entrance_box-shadow-small'],
        commonStyle['test__entrance_color'],
        commonStyle['test__entrance_stroke'],
      ];
    case 'MEDIUM':
      return [
        commonStyle['test__medium_box-shadow-small'],
        commonStyle['test__medium_color'],
        commonStyle['test__medium_stroke'],
      ];
    case 'HARD':
      return [
        commonStyle['test__hard_box-shadow-small'],
        commonStyle['test__hard_color'],
        commonStyle['test__hard_stroke'],
      ];
    case 'EXPERT':
      return [
        commonStyle['test__expert_box-shadow-small'],
        commonStyle['test__expert_color'],
        commonStyle['test__expert_stroke'],
      ];
    default:
      assertNever(level);
      return [
        commonStyle['test__none_box-shadow-small'],
        commonStyle['test__none_color'],
        commonStyle['test__none_stroke'],
      ];
  }
};
