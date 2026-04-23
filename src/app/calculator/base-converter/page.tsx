import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Number Base Converter | Hex, Binary, Octal, Decimal NepaCalc",
  description: "Convert numbers instantly between Decimal, Binary, Hexadecimal, and Octal formats. Includes bitwise logic operations and ASCII char preview.",
  slug: 'base-converter',
  keywords: ["base converter", "hex to binary", "decimal to hex", "octal converter", "binary calculator", "bitwise logic calculator", "hexadecimal to decimal"],
});
export default function Page() { return <Calculator />; }
