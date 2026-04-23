import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "3D Geometry Calculator | Volume & Surface Area NepaCalc",
  description: "Calculate exact volume and surface area for complex 3D shapes including spheres, cylinders, pyramids, cones, and toruses.",
  slug: 'geometry-3d',
  keywords: ["3d geometry calculator", "volume calculator", "surface area calculator", "sphere volume formula", "cylinder volume", "cone surface area"],
});
export default function Page() { return <Calculator />; }
