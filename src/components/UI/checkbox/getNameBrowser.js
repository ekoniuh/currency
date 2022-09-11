
export const getNameBrowser = (sUsrAg) => {
  if (sUsrAg.indexOf('Firefox') > -1) {
    return 'Mozilla Firefox';
  } else if (sUsrAg.indexOf('Opera') > -1) {
    return 'Opera';
  } else if (sUsrAg.indexOf('Trident') > -1) {
    return 'Microsoft Internet Explorer';
  } else if (sUsrAg.indexOf('Edge') > -1) {
    return 'Microsoft Edge';
  } else if (sUsrAg.indexOf('Chrome') > -1) {
    return 'Google Chrome or Chromium';
  } else if (sUsrAg.indexOf('Safari') > -1) {
    return 'Apple Safari';
  } else {
    return 'unknown';
  }
};
