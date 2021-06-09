export const tailorMobilePage = (nRecords: number, pageNo: number = 1, perPage: number = 5) => {
  const total = Math.ceil(nRecords / perPage);
  const page = {
    limit: perPage,
    offset: Math.max((Math.min(total, pageNo) - 1) * perPage, 0),
    total_pages: total,
  };
  return page;
};
