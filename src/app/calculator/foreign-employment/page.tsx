import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foreign Employment Fee & Manpower Checker — Nepal DOFE Safety',
  description: 'Check legal manpower fees and free visa/ticket policies for Qatar, UAE, Malaysia, and Korea. Protect yourself from overcharging.',
};

export default function Page() {
  return <Calculator />;
}
