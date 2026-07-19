export const LCM_GCF_FAQS = [
  {
    question: "What is the mathematical difference between GCF, HCF, and GCD?",
    answer: "There is no mathematical difference. GCF (Greatest Common Factor), HCF (Highest Common Factor), and GCD (Greatest Common Divisor) are interchangeable terms used in different regions and educational systems. In Nepal, HCF (or Masa) is the most commonly used term in the SEE curriculum."
  },
  {
    question: "Why is the identity LCM × GCF = a × b only true for two numbers?",
    answer: "This identity relies on the unique prime power representation of two integers. When you add a third number, the overlap of prime factors between the three numbers can be shared in ways that don't neatly multiply to the total product. For three or more numbers, LCM × GCF is almost never equal to a × b × c."
  },
  {
    question: "How does the calculator handle prime numbers in the dataset?",
    answer: "If you enter prime numbers (e.g., 11 and 13), the calculator will correctly identify that their only common factor is 1 (the GCF) and their LCM is simply their product (11 × 13 = 143). Numbers with a GCF of 1 are called 'Coprime' or 'Relatively Prime'."
  },
  {
    question: "Can I find the LCM of decimals?",
    answer: "LCM and GCF are strictly defined for integers (whole numbers). To find the 'LCM' of decimals like 0.5 and 0.75, you must first convert them to a common scale (e.g., 50/100 and 75/100) and find the LCM of the numerators, then divide by the common denominator."
  },
  {
    question: "What is the 'Prime Factorization' method for LCM?",
    answer: "To find the LCM of a set of numbers, you list the prime factors of each number. The LCM is the product of the highest power of every prime factor present in any of the numbers. For example, 12 = 2² × 3 and 18 = 2 × 3². The LCM is 2² × 3² = 4 × 9 = 36."
  },
  {
    question: "Why is 0 not allowed in the LCM calculator?",
    answer: "LCM is the 'Least Common Multiple'. Since every number multiplied by 0 is 0, every number would share 0 as a common multiple. However, division by zero is undefined, and 0 does not have positive multiples, making it mathematically incompatible with the LCM definition."
  },
  {
    question: "How is LCM used in adding fractions with different denominators?",
    answer: "To add fractions like 1/6 and 1/8, you must find a common denominator. The most efficient common denominator is the LCM of 6 and 8, which is 24. This allows you to convert the fractions to 4/24 and 3/24, giving a sum of 7/24."
  },
  {
    question: "What is a 'Perfect Number'?",
    answer: "A perfect number is a positive integer that is equal to the sum of its proper divisors (excluding the number itself). For example, 6 is a perfect number because its divisors are 1, 2, and 3, and 1+2+3=6. GCF calculations help in identifying these unique number patterns."
  },
  {
    question: "How does this tool help in competitive exams in Nepal?",
    answer: "Entrance exams for IOE (Engineering) and Lok Sewa Aayog often include time-pressured aptitude questions involving cyclic patterns, bells ringing at intervals, or distributing objects equally. These are all LCM/GCF problems in disguise. Our tool helps students master the logic behind these shortcuts."
  },
  {
    question: "What is the 'Division Method' for HCF?",
    answer: "The division method is the long-form version of the Euclidean algorithm. You divide the larger number by the smaller, then divide the previous divisor by the remainder, and repeat until the remainder is zero. The final divisor used is the HCF."
  },
  {
    question: "Can the HCF ever be larger than the smallest number in the set?",
    answer: "No. By definition, a 'factor' must be less than or equal to the number it divides. Therefore, the HCF of a set can never exceed the smallest number in that set. If the smallest number divides all others, then it is the HCF."
  }
];
