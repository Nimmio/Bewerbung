interface getPagesCountParams {
  entrysCount: number;
  perPage: number;
}

export const getPagesCount = (params: getPagesCountParams): number => {
  const { entrysCount, perPage } = params;
  return Math.ceil(entrysCount / perPage);
};
