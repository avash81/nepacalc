import { GraphApp } from '@/components/ecosystem/GraphApp';

export default function GraphingCalculatorPage() {
  return (
    <div className="w-full flex-1 flex flex-col bg-white overflow-hidden">
      <h1 className="sr-only">Free Online Graphing Calculator</h1>
      <GraphApp />
    </div>
  );
}

