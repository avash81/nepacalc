import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Nepal Vehicle Tax (Bluebook) Calculator 2081/82',
  description: 'Calculate Bagmati Pradesh road tax and bluebook renewal fees for motorcycles and cars for the current fiscal year.',
  keywords: ['vehicle tax nepal', 'bluebook renewal fee', 'road tax bagmati', 'bike tax nepal']
};

export default function Page() {
  return <Calculator />;
}
