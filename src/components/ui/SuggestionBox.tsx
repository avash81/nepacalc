import Link from 'next/link';
import { AlertCircle, Lightbulb } from 'lucide-react';

interface SuggestionBoxProps {
  calculatorName: string;
}

export function SuggestionBox({ calculatorName }: SuggestionBoxProps) {
  return (
    <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-gray-500 shrink-0" />
        <p className="text-sm text-gray-600">
          Something look wrong? We strive for 100% accuracy.
        </p>
      </div>
      <Link 
        href={`/contact?subject=correction&calculator=${encodeURIComponent(calculatorName)}`}
        className="shrink-0 text-sm font-bold text-blue-600 hover:text-blue-800 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <Lightbulb className="w-4 h-4" />
        Report a correction
      </Link>
    </div>
  );
}
