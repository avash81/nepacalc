import type { Metadata } from 'next';
import Link from 'next/link';

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
  description:
    'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
  keywords: [
    'bluebook renewal nepal',
    'vehicle tax nepal',
    'bluebook renewal fee nepal',
    'bike bluebook renewal nepal',
    'nepal vehicle tax online',
    'bluebook renewal process nepal',
    'vehicle registration renewal nepal',
    'provincial vehicle tax nepal',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    title: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
    description:
      'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
    url: 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
    siteName: 'NepaCalc',
    images: [{ url: 'https://nepacalc.com/logo.png?v=final' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
    description:
      'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
  },
  alternates: {
    canonical: 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
  },
};

// ─── SCHEMA ──────────────────────────────────────────────────────────────────
const schemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://nepacalc.com/guide/bluebook-renewal-nepal/#article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
      },
      headline: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
      description:
        'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
      author: {
        '@type': 'Organization',
        name: 'NepaCalc Editorial Team',
        url: 'https://nepacalc.com/about/editorial-policy/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'NepaCalc',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nepacalc.com/logo.png?v=final',
        },
      },
      image: 'https://nepacalc.com/logo.png?v=final',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://nepacalc.com/guide/bluebook-renewal-nepal/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
        { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://nepacalc.com/guide/' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bluebook Renewal in Nepal',
          item: 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
        },
      ],
    },
  ],
};

// ─── REUSABLE SECTION COMPONENTS ─────────────────────────────────────────────
function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-3 scroll-mt-24">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base sm:text-lg font-semibold text-slate-800 mt-6 mb-2">{children}</h3>;
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 text-sm text-amber-900 leading-relaxed">
      {children}
    </div>
  );
}

function CalcCTA() {
  return (
    <div className="my-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Estimation Tool</div>
        <p className="font-semibold text-slate-900 text-sm">
          Estimate your vehicle tax and Bluebook-renewal liability before payment.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          The calculator is an estimate only. The government assessment is the final authority.
        </p>
      </div>
      <Link
        href="/calculator/nepal-vehicle-tax/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
      >
        Calculate Vehicle Tax →
      </Link>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BluebookRenewalPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-20">

          {/* ── BREADCRUMB ── */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[13px] text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/guide/" className="hover:text-blue-600 hover:underline">Guide</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">Bluebook Renewal in Nepal</span>
          </nav>

          {/* ── HERO ── */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Transport Guide · Nepal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Bluebook Renewal in Nepal
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Bluebook renewal in Nepal is the process of keeping a vehicle's registration certificate current by
              completing the applicable renewal requirements, including vehicle tax and other required charges or
              documents.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mt-3 max-w-2xl">
              The exact amount you need to pay and the steps you need to follow depend on several factors, including
              your province, vehicle category, engine capacity or other applicable vehicle specification, renewal
              status, insurance and any overdue charges.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mt-3 max-w-2xl">
              There is no single vehicle-tax amount that applies identically to every vehicle throughout Nepal. Vehicle
              taxation and many transport-related charges are administered through the provincial framework, while the
              national vehicle and transport laws provide the broader registration and renewal framework.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mt-3 max-w-2xl">
              This guide explains the national rules, provincial differences, online-service options, required
              documents, late renewal, vehicle-tax calculation and the practical steps vehicle owners should check
              before renewing a Bluebook.
            </p>
          </div>

          <InfoBox>
            <strong>Important:</strong> NepaCalc is an independent information and calculation platform, not a
            government transport office. Government laws, provincial tax schedules, fees, penalties, online services
            and office procedures can change. Use this guide to understand the process, then verify the final amount
            and current service requirements with the relevant government authority.
          </InfoBox>

          {/* ── QUICK ANSWER ── */}
          <SectionHeading id="quick-answer">Bluebook Renewal: Quick Answer</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            In Nepal, a Bluebook generally refers to the vehicle registration certificate. Renewing a Bluebook means
            completing the requirements needed to keep that vehicle registration valid. Depending on the vehicle and
            province, the renewal process can involve:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
            <li>vehicle tax;</li>
            <li>registration renewal charges;</li>
            <li>required insurance;</li>
            <li>pollution or other required certification;</li>
            <li>route-permit requirements for applicable vehicles;</li>
            <li>late charges or penalties where renewal is overdue; and</li>
            <li>other prescribed fees.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            The national vehicle law establishes the registration-renewal framework, while provincial laws and
            transport systems determine many of the taxes and practical service arrangements.
          </p>

          {/* ── WHAT IS A BLUEBOOK ── */}
          <SectionHeading id="what-is-bluebook">What Is a Bluebook in Nepal?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            The Bluebook is the commonly used name for a vehicle's registration certificate. An official Department
            of Transport Management resource describes the vehicle registration certificate/Blue Book as a certificate
            containing the description of the vehicle.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            The registration record is different from a driver's licence. It is also different from:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
            <li>vehicle insurance;</li>
            <li>road or vehicle tax;</li>
            <li>route permits;</li>
            <li>pollution certification; and</li>
            <li>vehicle ownership-transfer documents.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            These things can be connected during vehicle administration or renewal, but they are not the same document.
          </p>

          {/* ── WHAT DOES RENEWAL MEAN ── */}
          <SectionHeading id="what-does-renewal-mean">What Does Bluebook Renewal Mean?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Bluebook renewal means renewing the vehicle's registration certificate after its validity period. Under
            the national Motor Vehicles and Transport Management Act, the registration certificate is renewed through
            the prescribed application and payment process. The Act also contains provisions concerning delayed
            renewal and multi-year renewal for eligible vehicle categories.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            The practical process can differ between provinces because vehicle tax and transport-service administration
            operate within the provincial system. That means a vehicle owner should not assume that an instruction,
            tax amount or online procedure found for one province automatically applies to another province.
          </p>

          {/* ── SAME AS VEHICLE TAX? ── */}
          <SectionHeading id="vs-vehicle-tax">Is Bluebook Renewal the Same as Vehicle Tax?</SectionHeading>
          <p className="text-slate-600 leading-relaxed font-semibold">No. This distinction causes a lot of confusion.</p>

          <SubHeading>Vehicle tax</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            Vehicle tax is the recurring tax applicable to the registered vehicle under the relevant provincial law.
            Depending on the vehicle and the province, the tax schedule can be based on factors such as: engine
            capacity; vehicle type; motor power; seating capacity; carrying capacity; or another category specified
            by the applicable law.
          </p>

          <SubHeading>Bluebook renewal fee</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            This is the applicable charge associated with renewing the registration certificate.
          </p>

          <SubHeading>Insurance</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            Required insurance is separate from vehicle tax. The national law makes required insurance a condition
            for registration-certificate renewal.
          </p>

          <SubHeading>Pollution or other certification</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            Where the applicable rules require a pollution certificate or other technical documentation, those
            requirements are separate from the vehicle tax itself.
          </p>

          <SubHeading>Total amount</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            Therefore, the amount a vehicle owner pays during a renewal transaction can be greater than the annual
            vehicle-tax amount alone.
          </p>

          {/* ── WHO SETS VEHICLE TAX ── */}
          <SectionHeading id="who-sets-vehicle-tax">Who Sets Vehicle Tax in Nepal?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Vehicle tax is administered within the provincial framework. The Department of Transport Management's
            official material provides provincial tax-law references, including separate economic acts for Bagmati,
            Gandaki, Karnali, Lumbini, Madhesh and Sudurpashchim and the former Province No. 1/Koshi framework.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            This is why a vehicle-tax table should always identify the province and the applicable legal schedule. A
            rate shown for Bagmati should not automatically be described as the "Nepal vehicle tax rate."
          </p>

          {/* ── WHY DIFFERS BY PROVINCE ── */}
          <SectionHeading id="province-differences">Why Vehicle Tax Can Differ Between Provinces</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Nepal's seven provinces have their own provincial legal and administrative frameworks. For a vehicle owner,
            this means two otherwise similar vehicles can have different tax obligations depending on the provincial
            schedule that applies.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">The correct question is therefore not:</p>
          <blockquote className="border-l-4 border-slate-300 pl-4 my-3 text-slate-500 italic">
            "How much is vehicle tax in Nepal?"
          </blockquote>
          <p className="text-slate-600 leading-relaxed">but:</p>
          <blockquote className="border-l-4 border-emerald-400 pl-4 my-3 text-slate-700 font-medium">
            "What is the current vehicle tax and renewal requirement for my vehicle under the applicable province and
            vehicle category?"
          </blockquote>
          <p className="text-slate-600 leading-relaxed mt-2">
            This distinction is especially important for motorcycles and scooters; private cars and jeeps; commercial
            vehicles; public transport; electric vehicles; and vehicles with overdue renewal.
          </p>

          {/* ── PROVINCE GUIDE ── */}
          <SectionHeading id="provinces">Bluebook Renewal Across Nepal's Seven Provinces</SectionHeading>

          {[
            {
              name: 'Koshi Province',
              body: 'Koshi has a provincial vehicle-registration and service framework, and the current government EDL/VRS portal provides a vehicle-registration system with options covering registration, tax payment and ownership transfer. Vehicle owners should verify the current Koshi provincial tax schedule and the latest instructions from the relevant transport office before payment. The official Department of Transport Management network also lists Koshi-related transport offices and tax/circular resources.',
            },
            {
              name: 'Madhesh Province',
              body: 'Madhesh also has a provincial EDL/VRS portal with vehicle-registration, tax-payment and ownership-transfer functionality. The relevant transport authority should be used to confirm the current tax schedule, applicable renewal charge, overdue treatment and current service procedure. Do not transfer a Bagmati or another province's motorcycle/car tax figure directly to Madhesh.',
            },
            {
              name: 'Bagmati Province',
              body: 'Bagmati has a provincial vehicle-registration system and current EDL/VRS portal. The portal identifies VRS as the vehicle-registration system for vehicle registration, tax payment and ownership transfer. Bagmati is particularly important for vehicle owners in Kathmandu Valley and surrounding areas, but its tax schedule should still be treated as a Bagmati-specific schedule, not a nationwide rate.',
            },
            {
              name: 'Gandaki Province',
              body: 'Gandaki has a provincial EDL/VRS portal for vehicle registration, tax payment and ownership transfer. The provincial legal framework also includes its own economic legislation covering vehicle taxation and transport-related charges. The provincial gazette is therefore an important source when verifying applicable rates.',
            },
            {
              name: 'Lumbini Province',
              body: 'Lumbini has its own government EDL/VRS portal for vehicle registration, tax payment and ownership transfer. The portal exists, but current detailed VRS availability can change, so vehicle owners should check the current government service status rather than assuming every digital function is available at all times. The detailed VRS interface currently indicates that some services are still being introduced.',
            },
            {
              name: 'Karnali Province',
              body: 'Karnali has a government EDL/VRS portal that includes the vehicle-registration, tax-payment and ownership-transfer system. Vehicle owners should verify the current provincial economic-law provisions and the latest transport-office instructions before calculating or paying tax.',
            },
            {
              name: 'Sudurpashchim Province',
              body: 'Sudurpashchim has a government EDL/VRS portal covering vehicle-registration administration, tax payment and ownership transfer at the portal level. However, the current detailed VRS page indicates that some functions, including vehicle registration and tax payment, are marked "Coming Soon." That is why online-service claims on an evergreen guide should always be qualified by current government availability.',
            },
          ].map(({ name, body }) => (
            <div key={name} className="mt-6 border-l-4 border-emerald-200 pl-4">
              <h3 className="font-bold text-slate-900 mb-1">{name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}

          {/* ── WHEN TO RENEW ── */}
          <SectionHeading id="when-to-renew">When Should You Renew Your Bluebook?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            The safest approach is to renew before the registration certificate expires. The national Act provides a
            three-month period after the expiry of the registration certificate for renewal before the
            delayed-renewal provisions apply.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            This should not be interpreted as a recommendation to wait. Renewing before expiry reduces the risk of:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
            <li>late charges;</li>
            <li>additional paperwork;</li>
            <li>service delays;</li>
            <li>insurance problems; and</li>
            <li>uncertainty about the amount due.</li>
          </ul>

          {/* ── LATE RENEWAL ── */}
          <SectionHeading id="late-renewal">What Happens When Bluebook Renewal Is Late?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Late renewal can result in additional charges. The national Act contains provisions for additional
            charges when registration renewal is delayed and provides escalating additional charges depending on the
            length of the delay.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            Long-overdue cases require more care because the registration can eventually reach the statutory
            cancellation stage. Therefore, there is an important difference between <em>slightly overdue renewal</em>{' '}
            and <em>registration that has remained unrenewed long enough to trigger cancellation provisions</em>.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            A vehicle owner should not assume that a long-overdue vehicle can simply be renewed by multiplying one
            year's tax by the number of missed years.
          </p>

          {/* ── CANCELLED REGISTRATION ── */}
          <SectionHeading id="cancelled-registration">
            Can a Cancelled Vehicle Registration Be Restored?
          </SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Long-overdue registration is different from an ordinary late renewal. The national Act contains
            provisions dealing with automatic cancellation after the prescribed period and subsequent re-registration
            procedures subject to the applicable legal requirements and charges. Because the financial and procedural
            consequences depend on the circumstances, owners of long-overdue vehicles should contact the relevant
            transport authority instead of relying on a generic online calculator.
          </p>

          {/* ── INSURANCE ── */}
          <SectionHeading id="insurance">Is Insurance Required for Bluebook Renewal?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Yes, where the required vehicle insurance applies. The Motor Vehicles and Transport Management Act
            provides that required insurance must be obtained and that the registration certificate will not be
            renewed when the required insurance has not been obtained. Insurance is therefore not simply an optional
            addition to the renewal calculation. However, the insurance premium itself is separate from the
            provincial vehicle-tax amount.
          </p>

          {/* ── POLLUTION ── */}
          <SectionHeading id="pollution">Is Pollution Certification Required?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            For vehicles subject to applicable pollution-testing requirements, the renewal documentation includes
            pollution-test information. The Transport Management Rules' registration-renewal documentation
            specifically includes pollution-related information for applicable vehicles. The exact practical
            requirements can depend on vehicle type, age, fuel type and current transport-office procedures.
          </p>

          {/* ── DOCUMENTS ── */}
          <SectionHeading id="documents">What Documents Are Needed for Bluebook Renewal?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            The precise checklist can vary by vehicle category and service process. Commonly relevant documents or
            information can include:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
            <li>original Bluebook/registration certificate;</li>
            <li>vehicle-tax payment evidence;</li>
            <li>valid required insurance;</li>
            <li>pollution certificate where applicable;</li>
            <li>route permit for applicable public or hired vehicles;</li>
            <li>ownership or identification documents where required;</li>
            <li>payment receipts; and</li>
            <li>other documents specified by the relevant transport office.</li>
          </ul>
          <InfoBox>
            <strong>Before visiting an office:</strong> Check the latest notice from the relevant transport authority.
            Do not rely on a checklist copied from an old article when the government service process may have changed.
          </InfoBox>

          {/* ── ONLINE PAYMENT ── */}
          <SectionHeading id="online-payment">Can You Pay Vehicle Tax Online in Nepal?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            In some provincial systems and service channels, yes. But there is an important distinction:{' '}
            <strong>online tax payment is not automatically the same thing as completely renewing the Bluebook online.</strong>
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            Government EDL/VRS portals currently exist for all seven provinces and expose vehicle-registration and
            tax-payment functionality at the portal level. However, service readiness can change. For example, the
            current detailed Sudurpashchim VRS page says vehicle registration and tax payment are "Coming Soon,"
            while the Lumbini VRS page likewise currently shows those functions as "Coming Soon."
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            So the correct statement is: online vehicle-tax and registration systems are being used or introduced
            through provincial digital transport systems, but availability and the exact end-to-end renewal workflow
            vary.
          </p>

          {/* ── PORTAL TABLE ── */}
          <SectionHeading id="portals">Government Vehicle Registration and Tax Portals</SectionHeading>
          <p className="text-slate-600 leading-relaxed mb-4">
            The official provincial portal network currently includes:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Province</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['Koshi Province', 'Government EDL/VRS portal'],
                  ['Madhesh Province', 'Government EDL/VRS portal'],
                  ['Bagmati Province', 'Government EDL/VRS portal'],
                  ['Gandaki Province', 'Government EDL/VRS portal'],
                  ['Lumbini Province', 'Government EDL/VRS portal'],
                  ['Karnali Province', 'Government EDL/VRS portal'],
                  ['Sudurpashchim Province', 'Government EDL/VRS portal'],
                ].map(([province, portal]) => (
                  <tr key={province} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">{province}</td>
                    <td className="px-4 py-3 text-slate-500">{portal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <InfoBox>
            These are provided as government entry points. The services available inside each portal can change, and
            a portal existing does not guarantee that every vehicle transaction can currently be completed entirely
            online.
          </InfoBox>

          {/* ── HOW MUCH DOES IT COST ── */}
          <SectionHeading id="cost">How Much Does Bluebook Renewal Cost?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            There is no single amount that applies to every vehicle in Nepal. A useful way to think about the total is:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 text-sm text-slate-700 font-mono">
            Total = vehicle tax + renewal fee + required insurance + applicable certification charges + late charges
            (if any) + other prescribed fees
          </div>
          <p className="text-slate-600 leading-relaxed">
            The exact components and amounts depend on the vehicle and applicable provincial rules. That is why an
            online article that says "Bluebook renewal costs Rs. X in Nepal" without identifying the province and
            vehicle category is incomplete.
          </p>

          <CalcCTA />

          {/* ── HOW IS TAX CALCULATED ── */}
          <SectionHeading id="tax-calculation">How Is Vehicle Tax Calculated?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            The applicable provincial schedule determines the calculation. For motorcycles and scooters, engine
            capacity is commonly an important classification factor. For other vehicle categories, the relevant law
            can use different characteristics, such as: vehicle type; seating capacity; carrying capacity; engine
            displacement; motor power; or another legally defined category. Electric vehicles require particular care
            because provinces may use different tax classifications or calculation methods.
          </p>

          {/* ── BIKE RENEWAL ── */}
          <SectionHeading id="bike-renewal">Bike and Scooter Bluebook Renewal</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Motorcycle and scooter owners should check: engine capacity; vehicle category; private/commercial
            classification; applicable province; current annual vehicle tax; renewal fee; insurance; pollution
            requirements where applicable; renewal status; and late charges, if any.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            A 125cc bike should not automatically be assumed to have the same renewal liability as a 200cc bike.
            Likewise, a motorcycle-tax amount published for one province should not automatically be used for another
            province.
          </p>

          {/* ── CAR RENEWAL ── */}
          <SectionHeading id="car-renewal">Car and Jeep Bluebook Renewal</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Private car and jeep renewal costs depend on the applicable provincial vehicle-tax schedule and the
            vehicle's classification. Before payment, confirm: provincial vehicle tax; registration renewal charge;
            insurance; pollution or inspection requirements where applicable; late charges; and other prescribed fees.
            Do not use a generic national car-tax figure when the applicable province uses a different schedule.
          </p>

          {/* ── EV RENEWAL ── */}
          <SectionHeading id="ev-renewal">Electric Vehicle Bluebook Renewal</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Electric vehicles need particular attention because several different charges are often confused.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600">
            <li>
              <strong>Annual vehicle tax</strong> — the recurring tax associated with the registered vehicle.
            </li>
            <li>
              <strong>EV import taxation</strong> — applies during vehicle importation and is a separate matter.
            </li>
            <li>
              <strong>Registration and renewal</strong> — relates to keeping the vehicle's registration current.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            A statement such as "EV tax in Nepal is Rs. X" is incomplete unless it specifies what tax, which province,
            which vehicle category and which legal schedule.
          </p>

          {/* ── PUBLIC VEHICLES ── */}
          <SectionHeading id="public-commercial">Public and Commercial Vehicles</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            Public and commercial vehicles can have additional regulatory requirements. Depending on the vehicle and
            service, these may include: route permit; insurance; pollution certification; vehicle tax; registration
            renewal; inspection or other technical requirements; and other transport-management documents. A
            private-car renewal guide should not be assumed to describe every requirement for a public bus, taxi,
            truck or other commercial vehicle.
          </p>

          {/* ── KEY DISTINCTIONS ── */}
          <SectionHeading id="distinctions">Key Distinctions</SectionHeading>

          <SubHeading>Bluebook Renewal and Route Permit Are Different</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            A Bluebook renewal concerns the vehicle registration certificate. A route permit is a separate transport
            authorization relevant to applicable public or hired vehicles. They may be handled through the same
            transport administration, but one does not automatically replace the other.
          </p>

          <SubHeading>Bluebook Renewal and Driving Licence Renewal Are Different</SubHeading>
          <p className="text-slate-600 leading-relaxed">
            A driver's licence belongs to the driver. A Bluebook belongs to the vehicle registration. Renewing a
            driver's licence does not renew the vehicle's registration certificate. These are separate administrative
            processes under the transport framework.
          </p>

          {/* ── MULTI YEAR RENEWAL ── */}
          <SectionHeading id="multi-year">Can You Renew a Bluebook for Multiple Years?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            The national Motor Vehicles and Transport Management Act includes a provision allowing eligible vehicle
            owners, including private vehicles under the relevant conditions, to renew registration for up to five
            years by paying the applicable renewal charges for that period. The actual availability and practical
            procedure should still be confirmed with the responsible transport authority.
          </p>

          {/* ── DIFFERENT OFFICE ── */}
          <SectionHeading id="different-office">Can You Renew a Bluebook From Another Office?</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            The national Transport Management Rules provide circumstances under which a registration certificate can
            be renewed through an office other than the original registration office, with the relevant information
            being communicated according to the prescribed process. However, service arrangements and exceptions can
            apply. Always confirm with the current transport office before travelling to a different district.
          </p>

          {/* ── PRE-PAYMENT CHECKLIST ── */}
          <SectionHeading id="pre-payment-checklist">What Should You Check Before Paying?</SectionHeading>
          <div className="space-y-4 mt-4">
            {[
              { step: '1. Identify the province', desc: 'Know which provincial vehicle-tax schedule applies.' },
              {
                step: '2. Identify your vehicle',
                desc: 'Confirm whether it is a bike/scooter, car/jeep, taxi, bus, truck, tractor, EV or another category.',
              },
              {
                step: '3. Check the vehicle specification',
                desc: 'For example: CC, kW, seats, tonnes or other applicable classification.',
              },
              {
                step: '4. Check renewal status',
                desc: 'Determine whether the Bluebook is current, within the applicable post-expiry period, or significantly overdue.',
              },
              { step: '5. Check insurance', desc: 'Make sure required insurance is valid.' },
              {
                step: '6. Check applicable certification',
                desc: 'For example, pollution certification where required.',
              },
              {
                step: '7. Check current government notices',
                desc: 'A temporary waiver, concession, system change or special procedure can change the amount or process.',
              },
              { step: '8. Keep the receipt', desc: 'Retain the government payment receipt and digital confirmation.' },
            ].map(({ step, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{step}</p>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── COMMON MISTAKES ── */}
          <SectionHeading id="common-mistakes">Common Bluebook Renewal Mistakes</SectionHeading>
          <div className="space-y-4 mt-4">
            {[
              {
                title: 'Using an old tax table',
                desc: 'Vehicle-tax rates can change through provincial economic legislation and subsequent government decisions.',
              },
              {
                title: 'Applying Bagmati rates nationwide',
                desc: 'Provincial tax schedules are not interchangeable.',
              },
              {
                title: 'Treating tax as the total renewal cost',
                desc: 'Tax, renewal fees, insurance and other charges can be separate.',
              },
              {
                title: 'Assuming online payment means the entire process is complete',
                desc: 'Some services may be digital while other steps still depend on the transport office.',
              },
              {
                title: 'Forgetting insurance',
                desc: 'Required insurance is part of the legal renewal framework.',
              },
              {
                title: 'Ignoring late charges',
                desc: 'Overdue renewal can create additional liabilities.',
              },
              {
                title: 'Treating a long-overdue vehicle as an ordinary renewal',
                desc: 'Long delays can eventually involve cancellation and re-registration provisions.',
              },
              {
                title: 'Using an unofficial source as the final authority',
                desc: 'Use government legislation and transport-office notices to verify the final legal requirement.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="border-l-4 border-rose-200 pl-4">
                <p className="font-semibold text-slate-900 text-sm">{title}</p>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── DECISION GUIDE ── */}
          <SectionHeading id="decision-guide">A Simple Bluebook Renewal Decision Guide</SectionHeading>
          <div className="space-y-4 mt-4">
            {[
              {
                situation: 'My Bluebook is still valid',
                action:
                  'Check the current provincial tax, insurance and applicable renewal requirements and renew before expiry.',
                color: 'emerald',
              },
              {
                situation: 'My Bluebook has recently expired',
                action:
                  'Check the applicable post-expiry rules and any additional charges before payment.',
                color: 'amber',
              },
              {
                situation: 'My Bluebook is overdue by a long period',
                action:
                  'Do not assume the amount can be calculated with a simple annual-tax multiplication. Check the legal status of the registration and the relevant transport office.',
                color: 'rose',
              },
              {
                situation: 'My vehicle is electric',
                action:
                  'Check the province-specific EV tax classification and do not confuse annual vehicle tax with import taxation.',
                color: 'blue',
              },
              {
                situation: 'My vehicle is public or commercial',
                action: 'Check route permits and additional transport requirements.',
                color: 'purple',
              },
              {
                situation: 'I want to pay online',
                action:
                  'Check the official provincial VRS/payment service first and verify whether the transaction is fully digital or requires additional office processing.',
                color: 'slate',
              },
            ].map(({ situation, action }) => (
              <div key={situation} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-semibold text-slate-900 text-sm mb-1">{situation}</p>
                <p className="text-slate-600 text-sm">{action}</p>
              </div>
            ))}
          </div>

          {/* ── OFFICIAL SOURCES ── */}
          <SectionHeading id="official-sources">Official Sources for Bluebook and Vehicle Tax Information</SectionHeading>
          <p className="text-slate-600 leading-relaxed mb-4">
            For legal and procedural accuracy, use the following source hierarchy.
          </p>

          <SubHeading>National legal framework</SubHeading>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>
              <a
                href="https://www.lawcommission.gov.np/en/wp-content/uploads/2021/08/motor-vehicles-and-transport-management-act-2049-1993.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Nepal Law Commission — Motor Vehicles and Transport Management Act
              </a>{' '}
              — the primary source for national registration, renewal, insurance and related legal provisions.
            </li>
            <li>
              <a
                href="https://www.lawcommission.gov.np/en/archives/category/documents/prevailing-law/rules/motor-vehicle-and-transport-management-rules"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Nepal Law Commission — Motor Vehicles and Transport Management Rules
              </a>{' '}
              — important administrative and documentation requirements for vehicle-related services.
            </li>
          </ul>

          <SubHeading>Department of Transport Management</SubHeading>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>
              <a
                href="https://www.dotm.gov.np/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Department of Transport Management (DoTM)
              </a>{' '}
              — publishes tax-rate circulars, provincial economic-law references, office information and other
              vehicle-service materials.
            </li>
          </ul>

          <SubHeading>Provincial government systems</SubHeading>
          <p className="text-slate-600 text-sm">
            Use the applicable province's government transport/VRS portal and current economic legislation to verify
            the current vehicle-tax and service arrangements.
          </p>

          {/* ── RENEWAL CHECKLIST ── */}
          <SectionHeading id="renewal-checklist">Bluebook Renewal Checklist</SectionHeading>
          <p className="text-slate-600 leading-relaxed mb-4">Before you complete the process, check:</p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <ul className="space-y-2">
              {[
                'Registration certificate / Bluebook',
                'Applicable provincial vehicle tax',
                'Renewal charge',
                'Valid required insurance',
                'Pollution certificate where applicable',
                'Route permit where applicable',
                'Late charges if overdue',
                'Current government notice',
                'Payment receipt',
                'Any additional document required by the transport office',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded border-2 border-slate-300 flex-shrink-0 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── ESTIMATE CTA (REPEATED) ── */}
          <CalcCTA />

          {/* ── FAQ ── */}
          <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>
          <div className="space-y-6 mt-4">
            {[
              {
                q: 'What is Bluebook renewal in Nepal?',
                a: 'Bluebook renewal is the process of renewing a vehicle's registration certificate and completing the applicable tax, fee, insurance and other requirements.',
              },
              {
                q: 'Is Bluebook renewal the same as road tax?',
                a: 'No. Vehicle tax and registration-renewal charges are separate components, although they may be paid during the same renewal transaction.',
              },
              {
                q: 'Does vehicle tax differ by province in Nepal?',
                a: 'Yes. Provincial governments administer vehicle taxation through their applicable laws and schedules.',
              },
              {
                q: 'How much does Bluebook renewal cost in Nepal?',
                a: 'There is no single nationwide amount. The total depends on the province, vehicle category, applicable tax, renewal fee, insurance, certification requirements and any late charges.',
              },
              {
                q: 'How much is bike Bluebook renewal?',
                a: 'It depends on the motorcycle's applicable province, engine-capacity category, renewal charge, insurance and other applicable costs.',
              },
              {
                q: 'Can I pay vehicle tax online?',
                a: 'Online vehicle-registration and tax-payment systems are being used or introduced through provincial government systems, but availability and workflow differ.',
              },
              {
                q: 'Can I completely renew my Bluebook online?',
                a: 'Not necessarily. Online tax payment does not always mean every registration-renewal step can be completed without additional government processing.',
              },
              {
                q: 'Is insurance required for Bluebook renewal?',
                a: 'The required vehicle insurance must be in place, and the national Act provides that registration renewal cannot proceed without the required insurance.',
              },
              {
                q: 'Is a pollution certificate required?',
                a: 'Where the applicable rules require pollution certification, the relevant certificate or information must be available for the renewal process.',
              },
              {
                q: 'What happens if my Bluebook renewal is late?',
                a: 'Additional charges can apply, and prolonged non-renewal can eventually lead to registration-cancellation consequences under the national law.',
              },
              {
                q: 'Can I renew my Bluebook for five years?',
                a: 'The national Act provides a multi-year renewal provision for eligible categories, including private vehicles under the applicable conditions.',
              },
              {
                q: 'Is Bluebook renewal the same as driving licence renewal?',
                a: 'No. A Bluebook concerns vehicle registration; a driving licence concerns the driver.',
              },
              {
                q: 'Is Bluebook renewal the same as route-permit renewal?',
                a: 'No. A route permit is a separate transport authorization for applicable vehicles.',
              },
              {
                q: 'Does the same vehicle tax apply throughout Nepal?',
                a: 'No. Check the applicable provincial schedule.',
              },
              {
                q: 'Where should I check the final amount?',
                a: 'Check the latest applicable provincial government schedule and the relevant Transport Management Office. A calculator can provide an estimate, but the government assessment/receipt is the final authority.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-5">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-2">{q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          {/* ── EDITORIAL NOTE ── */}
          <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 text-base mb-2">Editorial Note</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              This guide is designed to explain Nepal's Bluebook-renewal system using the national legal framework,
              provincial transport systems and government-published information. Because transport laws, provincial
              tax schedules, online services, penalties and administrative procedures can change, this page should
              be reviewed whenever a relevant law, provincial economic act, official tax schedule or
              transport-system procedure changes.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mt-2">
              NepaCalc provides calculations and explanatory information as an independent platform. It does not
              replace the authority of Nepal's federal or provincial governments.
            </p>
            <p className="text-xs text-slate-400 mt-3">
              Published by{' '}
              <Link href="/about/editorial-policy/" className="hover:underline text-slate-500">
                NepaCalc Editorial Team
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
