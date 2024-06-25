import { Filter } from "@/types/filter";

const typeMapping = (inputString: string): string => {
  switch (inputString) {
    case "exact":
      return "equals";
    default:
      return "contains";
  }
};

export const getQuery = (filterArray: Filter[]): Array<Object> => {
  const queryArray: Array<Object> = [];
  filterArray.forEach((filterArrayElement) => {
    let newQueryEntry = {
      [filterArrayElement[0]]: {
        [typeMapping(filterArrayElement[1])]: filterArrayElement[2],
      },
    };
    queryArray.push(newQueryEntry);
  });

  return queryArray;
};
