import * as d3 from "d3";
import bit from "../../icons/bit.svg";

export const generateBitIcon = async () => {
  const bitSvg = await d3.xml(bit);

  return bitSvg.documentElement;
};
