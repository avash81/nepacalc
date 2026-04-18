import { ProgrammerApp } from '@/components/ecosystem/ProgrammerApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programmer Logic Terminal — NEPACALC',
  description: 'High-precision base converter (Hex, Bin, Dec, Oct) with 64-bit interactive logic and bitwise gates. Digital engineering laboratory.',
  keywords: ['programmer calculator', 'base converter', 'binary calculator', 'hex to decimal', 'bitwise operations'],
};

export default function ProgrammerPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <ProgrammerApp />
    </div>
  );
}
