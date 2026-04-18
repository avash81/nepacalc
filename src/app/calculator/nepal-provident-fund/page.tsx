import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'EPF/Provident Fund & CIT Projector (Nepal)',
  description: 'Project your retirement savings with Employees Provident Fund (Kosh) and CIT logic for 2081/82.',
  keywords: ['epf calculator nepal', 'provident fund kosh', 'retirement fund nepal', 'cit calculator']
};

export default function Page() {
  return <Calculator />;
}
