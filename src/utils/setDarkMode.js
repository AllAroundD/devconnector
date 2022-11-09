import { DC_DARKMODE } from "./constants";

const setDarkMode = (darkmode) => {
  if (darkmode) {
    localStorage.setItem(DC_DARKMODE, darkmode);
  } else {
    localStorage.removeItem(DC_DARKMODE);
  }
};

export default setDarkMode;
