
export const loadMode = function () {
  let mode: string;
  try {
    mode = localStorage.getItem('mode');
  } catch (err) {
    // Ignore
  }

  return mode || 'active';
};

export const saveMode = function (mode: string) {
  try {
    localStorage.setItem('mode', mode);
  } catch (err) {
    // Ignore
  }
};

export const loadActiveExchangeAccountId = function () {
  let id: number;
  try {
    id = +localStorage.getItem('activeExchangeAccountId');
  } catch (err) {
    // Ignore
  }

  return id;
};

export const saveActiveExchangeAccountId = function (id: number) {
  try {
    localStorage.setItem('activeExchangeAccountId', id + '');
  } catch (err) {
    // Ignore
  }
};
