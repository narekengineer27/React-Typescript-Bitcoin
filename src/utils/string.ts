export const updateSort = (sort: string, field: string, decreasing: boolean = false) => {
  if (!field) {
    return sort;
  }
  const items = sort.split(',').map(i => i.trim()).filter(i => !!i);
  const existingIndex = items.findIndex(item => {
    return item.replace(/-/g, '') === field;
  });

  if (existingIndex >= 0) {
    items.splice(existingIndex, 1);
  }
  items.unshift((decreasing ? '-' : '') + field);

  // We sort by one field only
  return items[0];
};

export const getLodashSort = (sort: string) => {
  const lodashSort = [[], []];
  const fields = sort.split(',').map(s => s.trim());
  for (const f of fields) {
    if (f[0] === '-') {
      lodashSort[0].push(f.substr(1));
      lodashSort[1].push('desc');
    } else {
      lodashSort[0].push(f);
      lodashSort[1].push('asc');
    }
  }
  return lodashSort;
};
