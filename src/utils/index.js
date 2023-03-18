
export const getPageCount = (totalCount, limit = 10) => {
    return Math.ceil(totalCount / limit);
  };
  