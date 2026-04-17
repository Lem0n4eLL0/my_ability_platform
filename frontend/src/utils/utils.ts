export const assertNever = (_: never) => {
  throw new Error('Not possible');
};

export type OmitID<T extends { id: string }> = Omit<T, 'id'>;
