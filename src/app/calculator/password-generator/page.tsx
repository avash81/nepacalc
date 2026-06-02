import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Secure Password Generator | Strong Random Pwd Online Nepal NepaCalc",
  description: "Generate high-entropy, secure random passwords instantly. Protect your online accounts in Nepal with custom length and special character options.",
  slug: 'password-generator',
  keywords: ["password generator nepal", "secure random password", "strong password maker", "random string generator", "online security tool", "high entropy passwords"],
});

const PASSWORD_FAQS = [
  {
    question: "What makes a password 'Strong'?",
    answer: "A strong password is at least 12 characters long and contains a mix of uppercase letters, lowercase letters, numbers, and special symbols (!@#$%^&*)."
  },
  {
    question: "Why should I use a random generator?",
    answer: "Random generators eliminate human patterns (like birthdays or names) that hackers use in 'Brute Force' and 'Dictionary' attacks, making your accounts much more secure."
  },
  {
    question: "Is it safe to generate passwords online?",
    answer: "Our tool generates passwords locally in your browser using high-entropy random algorithms. No data is sent to or stored on our servers."
  },
  {
    question: "How often should I change my passwords in Nepal?",
    answer: "For sensitive accounts (banking, email), security experts recommend updating passwords every 3-6 months and using a unique password for every service."
  },
  {
    question: "Should I write down my generated passwords?",
    answer: "No. It is best to use a reputable password manager to store your complex, randomly generated credentials securely."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper disableSchema={true}
        hideHeader={true}
        title="Cryptographic Password Engine"
        description="High-entropy security tool for generating non-sequential, pattern-free random passwords for maximum digital protection."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Password Generator' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'QR Generator', slug: 'qr-generator' },
          { name: 'Word Counter', slug: 'word-counter' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="Random Entropy Logic"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-white border border-[#dadce0] text-[#202124] px-6 py-3 rounded-2xl inline-block shadow-sm">
              Security Guide: Protecting Your Identity
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                In the modern digital landscape, a <strong>strong password</strong> is your first line of defense against cyber threats. Simple passwords based on personal information are easily cracked by automated scripts.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Cryptographic Security Laboratory</strong> empowers users in Nepal to take control of their online privacy. By utilizing advanced random-number generation, we create <strong>pattern-free passwords</strong> that are virtually impossible to guess. Best of all, our engine processes everything within your browser, ensuring your new credentials never leave your device.
              </p>
            </div>

            <PillarFAQ disableSchema={true} faqs={PASSWORD_FAQS} title="Online Security & Passwords FAQ" />
          </div>
        </div>
      </CalcWrapper>    </div>
  );
}

