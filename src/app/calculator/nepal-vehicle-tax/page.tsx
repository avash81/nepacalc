import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Vehicle Tax in Nepal 2083/84: Bluebook Renewal Calculator",
  description: "Calculate your annual vehicle tax in Nepal for FY 2083/84. Check the latest bluebook renewal fees, late penalty rates, and bike or car tax slabs.",
  slug: 'nepal-vehicle-tax',
  keywords: ["vehicle tax in nepal 2083/84", "vehicle tax calculator nepal", "bluebook renew calculator", "bike tax in nepal 2083/84", "car tax nepal 2083", "road tax calculator nepal", "bluebook renewal penalty calculation nepal"],
  ogImage: "https://nepacalc.com/assets/images/og-nepal-vehicle-tax-2083.jpg"
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepal-vehicle-tax/#webapp",
      "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
      "name": "Nepal Vehicle Tax Calculator 2083/84",
      "description": "An automated online bluebook renewal calculator to compute annual provincial vehicle tax, penalties, and insurance fees in Nepal for FY 2083/84.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires HTML5 support. Requires JavaScript.",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "NPR"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepal-vehicle-tax/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I pay my vehicle tax in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can pay vehicle road tax at your registered Transport Management Office (TMO) in person. For Bagmati and Gandaki provinces, online payment is available through the Nagarik App, eSewa, Khalti, and MyPay digital wallets. After online payment, you must still visit the TMO to get the physical Bluebook renewal stamp. Verify current payment options at dotm.gov.np."
          }
        },
        {
          "@type": "Question",
          "name": "What is the penalty for late Bluebook renewal in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you renew after the 90-day grace period, penalties start at 5%–10% of your annual road tax for delays within the same fiscal year, rising to 20% for the next year, and compounding up to 32% per year for multi-year delays, capped at 4 years. A bike with Rs. 5,000 annual tax delayed 2 fiscal years could owe Rs. 5,000 base + accumulated compounding penalties + Rs. 300 renewal fee + insurance."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I renew my vehicle tax in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vehicle road tax must be renewed every year. The fiscal year runs from Shrawan 1 to Ashad end (mid-July to mid-July). You have a 90-day grace period after Shrawan 1 to renew without any penalty. Missing this window triggers progressive penalty interest. Renewal also requires a valid Third-Party Insurance policy for the new year."
          }
        },
        {
          "@type": "Question",
          "name": "Is Third-Party Insurance mandatory for vehicle tax renewal in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Third-Party Insurance is legally mandatory for all vehicles in Nepal and is a required document for Bluebook renewal at the TMO. Without a valid insurance certificate, the TMO will not process your renewal. Annual premiums are approximately Rs. 2,200 for motorcycles/scooters and Rs. 4,500–Rs. 8,000 for private cars, depending on engine capacity and the insurance company."
          }
        },
        {
          "@type": "Question",
          "name": "How is Electric Vehicle (EV) road tax calculated in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EV road tax is based on the motor's kilowatt (kW) rating as listed in the Bluebook, not CC. FY 2083/84 rates: 10–50 kW = Rs. 5,000, 51–125 kW = Rs. 15,000, 126–200 kW = Rs. 20,000, above 200 kW = Rs. 30,000. EVs still pay the renewal fee and mandatory Third-Party Insurance but are not subject to the CIF-based import surcharge that applies to new petrol/diesel vehicle imports."
          }
        },
        {
          "@type": "Question",
          "name": "Is vehicle tax different across Nepal's provinces?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Since federalisation, vehicle road tax is a provincial subject. Bagmati (Kathmandu), Koshi, Lumbini, Gandaki, and Madhesh provinces may apply different slab rates and penalty structures. This calculator uses Bagmati Province rates as the default (the most commonly searched benchmark). Select your province in the calculator for more accurate results."
          }
        },
        {
          "@type": "Question",
          "name": "How is bus or microbus tax calculated in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Public and commercial four-wheelers like buses, minibuses, and microbuses are calculated strictly based on their seating capacity profiles rather than engine displacement. Under the Bagmati Province Finance Act for FY 2083/84, public microbuses (1–14 seats) carry a base tax of Rs. 8,000, minibuses (15–25 seats) cost Rs. 12,000, medium buses (26–35 seats) cost Rs. 18,000, and large buses with 36+ seats are charged Rs. 35,000 annually."
          }
        },
        {
          "@type": "Question",
          "name": "What is the EV import duty structure for 2083/84?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The FY 2083/84 federal budget structurally overhauled passenger EV imports by abolishing excise duties entirely and moving to a baseline CIF (Cost, Insurance, and Freight) valuation model. All passenger EVs now face a flat 20% customs duty on their net CIF value. In addition, a progressive Clean Infrastructure Investment Fee is levied based on asset valuation tiers, starting from a low 2.5% levy up to a maximum 112.5% effective rate for high-end luxury electric models."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I do not renew my bluebook for over 5 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your registration lapses beyond 5 consecutive years, your vehicle details are flagged as delinquent and automatically blacklisted within the central DoTM TMIS server. While your base tax penalty is legally capped at a maximum of 4 years of liabilities, the 32% annual compound fine continues to stack against those active billing cycles. Furthermore, a blacklisted vehicle cannot undergo a legal name transfer (Naamshari) during a resale until all historical back-taxes are manually cleared at the Yatayat office."
          }
        },
        {
          "@type": "Question",
          "name": "Do public or rental EVs get a discount on road tax?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. To promote green public transit infrastructures across local transport networks, eco-conscious fleet operators, public electric microbuses, and registered rental electric vehicles receive a flat 50% statutory concession on their annual running kilowatt (kW) tax slabs. This brings their recurring annual registration costs significantly lower than privately owned consumer EVs."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />
      <Calculator />
    </div>
  );
}
