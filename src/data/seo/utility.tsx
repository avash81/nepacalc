import React from 'react';
import { SEOContent } from './types';

export const utilitySEO: Record<string, SEOContent> = {
  'date-duration': {
    title: "Date Duration Calculator | Time Between Two Dates",
    description: "Calculate the exact duration between two dates in years, months, and days. Perfect for project planning, age calculation, and meeting deadlines.",
    howToUse: {
      steps: [
        "1. Start Date: Select the beginning date.",
        "2. End Date: Select the end date.",
        "3. Calculation: The tool instantly shows the difference in years, months, and days.",
        "4. Options: You can choose to include or exclude the end date in the total count."
      ]
    },
    formula: {
      title: "How Date Duration is Calculated",
      description: "The calculation accounts for different month lengths and leap years to give you an exact result.",
      raw: "Duration = End Date - Start Date",
      variables: ["The result is broken down into years, months, and days."]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-slate-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Understanding Date Duration
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Calculating the exact time between two dates is essential for many tasks, from tracking project milestones to determining eligibility for government services like <a href="/calculator/lok-sewa-age/" className="text-blue-700 underline font-bold">Lok Sewa</a>. This tool simplifies the process by handling the complexities of the calendar, such as leap years and varying month lengths.
                </p>
            </div>

            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    Why Use a Date Duration Calculator?
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                    <p>
                        While subtracting years or months manually might seem simple, the Gregorian calendar's irregularities make it easy to be off by a day or two. For legal documents, employment contracts, or financial planning, that one-day difference can be significant. Our calculator ensures you get the precise duration every time.
                    </p>
                </div>
            </section>

            <section className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
                <h3 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-3">
                    💡 Helpful Tip: The Power of Time
                </h3>
                <p className="text-sm text-amber-800 leading-relaxed mb-6">
                    Small differences in time can have a big impact on financial growth. For example, knowing the exact duration of your <a href="/calculator/sip-calculator/" className="text-amber-900 underline font-bold">SIP investment</a> helps you better understand your projected returns and plan your future wealth.
                </p>
            </section>
        </div>
    ),
    faqs: [
      { question: "How many days are between two dates?", answer: "This tool provides the exact day count, taking into account leap years and the specific number of days in each month." }
    ]
  },
  'lead-time': {
    title: "Lead Time Calculator | Procurement & Logistics Guide",
    description: "Calculate the total lead time for orders and deliveries. Optimize your supply chain by understanding the time taken from order to fulfillment.",
    howToUse: {
      steps: [
        "1. Order Date: Enter the date the order was placed.",
        "2. Delivery Date: Enter the date the items were received.",
        "3. Calculation: View the total lead time in days."
      ]
    },
    formula: {
      title: "Lead Time Formula",
      description: "Lead time is the total time between the initiation of an order and its completion.",
      raw: "Lead Time = Delivery Date - Order Date",
      variables: ["Order Date: When the process started.", "Delivery Date: When the process finished."]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-amber-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Optimizing Your Supply Chain
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Lead time is a critical metric for businesses and project managers. It measures how long it takes for a product or service to be delivered once an order is placed. By tracking and reducing lead times, you can improve efficiency, reduce costs, and better serve your customers.
                </p>
            </div>

            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-amber-400">
                    🚀 Improving Efficiency
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                    Understanding your average lead time helps you maintain the right amount of stock. In Nepal, where transit times can vary due to geography or border processes, having a clear picture of your lead times is essential for avoiding stockouts or overstocking.
                </p>
            </section>
        </div>
    ),
    faqs: [
      { question: "Why should I track lead time?", answer: "Tracking lead time helps you identify delays in your procurement process and ensures you have goods when you need them." }
    ]
  },
  'paint-cost': {
    title: "Paint Quantity & Cost Estimator",
    description: "Calculate how much paint you need for your walls and estimate the total cost. Avoid waste and plan your home renovation budget accurately.",
    howToUse: {
      steps: [
        "1. Area: Enter the total surface area of your walls.",
        "2. Coats: Choose the number of coats of paint you plan to apply.",
        "3. Spread Rate: Check the paint bucket for the coverage rate (sq ft per liter).",
        "4. Price: Enter the cost per liter to get a total budget estimate."
      ]
    },
    formula: {
      title: "Paint Calculation",
      description: "Total paint needed is based on the wall area, the number of coats, and the paint's coverage efficiency.",
      raw: "Paint Needed = (Area / Spread Rate) * Number of Coats",
      variables: ["Area is total wall surface minus windows/doors.", "Spread Rate is the coverage per liter."]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Plan Your Home Painting
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Estimating the right amount of paint prevents multiple trips to the store and ensures you have enough to finish the job. This tool helps you calculate the liters needed based on your wall measurements and the specific coverage of the paint you've chosen.
                </p>
            </div>

            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-sky-400">
                    🛡️ Waste Reduction Tip
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                    Always add a small buffer (about 10%) for spills and touch-ups. Buying all your paint at once also ensures that the color is consistent across all walls.
                </p>
            </section>
        </div>
    ),
    faqs: [
      { question: "How many coats of paint do I need?", answer: "Usually, two coats are recommended for a smooth and durable finish. For darker colors, you might need three." }
    ]
  },
  'number-to-words': {
    title: "Number to Words Converter | Lakh & Crore Formatter",
    description: "Convert numbers into words for cheques, bank vouchers, and legal documents. Supports both international and South Asian (Lakh/Crore) formats.",
    howToUse: {
      steps: [
        "1. Number: Enter the numeric value.",
        "2. Format: Choose between Millions/Billions or Lakhs/Crores.",
        "3. Result: The tool generates the text for you to copy onto your document."
      ]
    },
    formula: {
      title: "Number Formatting",
      description: "The tool converts digits into their written counterparts according to standard naming rules.",
      raw: "1,00,000 = One Lakh",
      variables: ["The South Asian system uses commas at different positions than the international system."]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            <div className="bg-slate-900 text-white rounded-r-xl p-8 border-l-4 border-emerald-500 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <h2 className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Writing Numbers in Words
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                    Writing the correct amount in words on a cheque or legal document is a simple but vital step in financial accuracy. In Nepal, we use the Lakh and Crore system. This converter helps you ensure the text matches the numbers perfectly, reducing the risk of errors or fraud.
                </p>
            </div>

            <section className="bg-emerald-600 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-black mb-4">Legal Importance</h3>
                <p className="text-emerald-50 leading-relaxed">
                    In many legal documents in Nepal, if there is a discrepancy between the numeric amount and the written amount, the written words are often given priority. Using a tool like this helps you avoid costly mistakes in contracts and bank transactions.
                </p>
            </section>
        </div>
    ),
    faqs: [
      { question: "What is 100 million in Nepali units?", answer: "100 million is equivalent to 10 Crore in the Nepali numbering system." }
    ]
  }
};
