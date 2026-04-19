import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Geometry (Volume & Surface Area) Calculator | NEPACALC',
  description: 'Free online 3D geometry calculator to find volume and surface area of spheres, cubes, cylinders, cones, and pyramids accurately.',
  keywords: ['volume', 'surface area', 'geometry', 'sphere', 'cube', 'cylinder', 'cone', 'shape calculator'],

  openGraph: {
    title: '3D Geometry (Volume & Surface Area) Calculator | NEPACALC',
    description: 'Free online 3D geometry calculator to find volume and surface area of spheres, cubes, cylinders, cones, and pyramids accurately.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Geometry (Volume & Surface Area) Calculator | NEPACALC',
    description: 'Free online 3D geometry calculator to find volume and surface area of spheres, cubes, cylinders, cones, and pyramids accurately.',
  },
};

export default function Page() {
  return <Calculator />;
}
