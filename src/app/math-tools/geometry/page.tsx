import { calcMeta } from '@/lib/calcMeta';
import { GeometryApp } from '@/components/ecosystem/GeometryApp';

export const metadata = calcMeta({
  title: "Geometry Calculator & Canvas – NepaCalc",
  description: "Construct, measure, and analyze 2D geometric shapes, lines, angles, and polygons with real-time coordinate calculations.",
  slug: 'math-tools/geometry',
  canonical: '/engineering/geometry/',
});

export default function GeometryToolPage() {
  return (
    <>
      <GeometryApp />
    </>
  );
}
