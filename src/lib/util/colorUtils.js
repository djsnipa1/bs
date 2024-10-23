export const oklchObj2String = (colorObj) => {
  const formattedColor = {
    l: colorObj.l.toFixed(4),
    c: colorObj.c.toFixed(4),
    h: colorObj.h.toFixed(4)
  };
  return `oklch(${formattedColor.l} ${formattedColor.c} ${formattedColor.h})`;
};

