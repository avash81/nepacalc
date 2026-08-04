const fs = require('fs');
const path = require('path');

const markdownContent = `
## CONTENTS

**A. Collection and Application Summary**
**B. Major Highlights**
**C. Sector Wise Summary**
1. Information Technology
2. Health & Education
3. Transportation & Ride Sharing
4. Agriculture, Food & Beverages
5. Capital Market & Real Estate
6. Energy & Manpower
7. Amendments in Income Tax Act
8. Amendments in Value Added Tax
9. Excise Rate Changes
10. Tax Reliefs & Concessions

---

## BUDGET COMPARISON (CY VS PY)

### Revenue & Financing Sources

| SN | Source | NPR (Billion) 2083/84 | NPR (Billion) 2082/83 |
|---|---|---|---|
| 1 | Tax Revenue | 1405.31 (66%) | 1315.00 (67%) |
| 2 | Loans & Borrowings | 657.29 (31%) | 595.66 (30%) |
| 3 | Foreign Grant | 61.74 (3%) | 53.45 (3%) |
| | **Total** | **2124.34** | **1964.11** |

### Expenditure & Financing Applications

| SN | Application | NPR (Billion) 2083/84 | NPR (Billion) 2082/83 |
|---|---|---|---|
| 1 | Recurring Expenditure | 1270.58 (60%) | 1180.98 (60%) |
| 2 | Capital Expenditure | 431.11 (20%) | 407.89 (21%) |
| 3 | Debt Financing | 422.65 (20%) | 375.24 (19%) |
| | **Total** | **2124.34** | **1964.11** |

### Expected Economic Growth & Inflation

| Particulars | 2083/84 (Expected) | Current (2082/83 End) |
|---|---|---|
| Economic Growth (%) | 7% | 4.61% |
| Inflation (%) | 6% | 5.44% |

---

## SECTOR WISE BUDGET ALLOCATION
*(Amount in Billion NPR)*

| Sector | 2083/84 (Billion) | 2082/83 (Billion) | Change |
|---|---|---|---|
| Science Technology and Innovation | 4 | – | ↑ |
| Industry, Commerce, & Supply | 8 | 10 | ↓ |
| Labour, Employment and Social Security | 4 | 4 | ↓ |
| Civil Aviation | 3 | – | ↑ |
| Culture and Tourism | 7 | 13 | ↓ |
| Forest, Environment and Climate | 12 | 19 | ↓ |
| Agriculture and Livestock Development | 47 | 58 | ↓ |
| Women, Children, Gender and Sexual Minorities | 2 | 2 | ↑ |
| Health | 102 | 96 | ↑ |
| Education | 218 | 211 | ↑ |
| Sports | 4 | 6 | ↓ |
| Information and Communication | 6 | 8 | ↓ |
| Energy Generation, Distribution and Transmission | 86 | 86 | ↓ |
| Water Supply and Sanitation | 37 | 34 | ↑ |
| Road & Urban Infrastructure Development | 286 | 118 | ↑ |

*All figures are in Billion Nepalese Rupees (NPR).*

---

## MAJOR BUDGET HIGHLIGHTS

1. The income tax exemption limit has been raised to **Rs. 10,00,000 (Ten Lakh Rupees)** for individuals, with the maximum rate of personal income tax reduced to **29%** from the previous 39%.
2. Government has allocated **Rs. 20,00,00,000 (20 Arba Rupees)** for initial estimated savings. This amount is expected to be generated from the deduction of ministries from previous 22 to now 18; 31 entities to be abolished, 6 merged, 6 transferred, and 18 restructured.
3. VAT to be levied **@5%** on electricity consumption over 50 units and on ride-sharing platforms. A high-level advisory committee is to be constituted to study and recommend a multi-VAT rate in the context of Nepal.
4. The tax audit period has been fixed at **3 years** (reduced from the previous 4 years). An AI-driven e-assessment system is to be developed for risk-based investigation and audits.
5. Excise duty abolished on **360 goods**; custom duty reduced on **273 types of raw materials**, reducing custom duty tiers from 11 to 7. Various custom point taxes have been consolidated into a single **Green Tax**.
6. Third-party vehicle insurance raised to **Rs. 1 million**. Customs duties on electric vehicles to be levied on an **ad-valorem basis**, replacing the peak-power-capacity system.
7. Businesses with annual transactions above **Rs. 10,00,00,000 (10 Crore Rupees)** issuing electronic invoices must be mandatorily linked to the **Central Billing Monitoring System (CBMS)**.
8. The initial salary scale of public servants increased by **10%**, plus a performance-based monthly incentive allowance of **10%** of the revised salary — a probable net remuneration increase of approximately **21%**.
9. Capital Gains Tax on sale of securities clarified as final withholding tax, with rates increased:
   - Within 1 year: 5% → **7.5%**
   - After 1 year: 7.5% → **10%**
   - Real estate remains subject to the **5-year** holding period rule.

---

## 1. INFORMATION TECHNOLOGY

- Nepal's first **Sovereign AI Computer Center** to be established at **Syuchatar, Kathmandu**.
- Special fellowship for **15 Nepali AI researchers** abroad to return home.
- Minimum **1%** of Capital Budget allocated for Science & Research for the first time in this budget.
- **Nagarik App** to be developed with more than **a dozen (12+)** new features for government service.
- Government to sell shares of **Nepal Telecom** from its current holding of **91% to 66%**; divestment funds to be used to develop Nepal into a regional technology hub.
- **Digital Service Tax (DST) = 2%** on sales amount received by non-residents through:
  a. Electronic service provided to users in Nepal
  b. Sales of data collected from Nepal
- **Exceptions:**
  1. Annual transactions up to **30 lakhs**
  2. Person residing in Nepal uses digital interface for business purpose and earns revenue
- **Annual Filing** to be done within **3 months** of end of FY to avoid:
  - Penalty of **0.1% p.a.**
  - Interest of **15% p.a.**
  - Concealment/understatement fine of **50%** of the amount

---

## 2. HEALTH & EDUCATION

**Major Points**
- Total education budget: **Rs. 218.30 Billion**
- Total Health Budget: **Rs. 96.43 Billion**
- **Rs. 8.60 Billion** allocated for scholarships
- Significant increase in seats for Medicine, Nursing and IT
- AI and Ed-Tech to be used in school education
- Paid internship system to be institutionalized
- Target: **45%** completion rate up to Grade 12
- Internet access in **75%** of educational institutions
- Foreign universities encouraged to operate campuses in Nepal

**Education Equity Fee**
- **3%** fee levied on all categories of fees and service charges collected by private educational institutions (except training and refresher training programs).
- Fee to be collected via invoice; tax return to be filed within **25 days** of each trimester.

**Health Equity Fee**
- **3%** fee levied and collected on all categories of service fees collected by private health institutions.
- Fee to be collected via invoice; tax return to be filed within **25 days** of each trimester.

**Other Provisions**
- Education Service Fee of **3%** to be levied by the Bank/Financial Institution on foreign currency exchange for tuition fees for students travelling abroad for studies.
- Bank/Financial Institution to deposit such amount by the **25th of the next month**.
- Income earned by universities established and operating in Nepal through their main objective is now **Exempt from Tax**.
- Night duty allowance for nurses in public health facilities **doubled** — from **Rs. 150** to **Rs. 300** per night.

---

## 3. AGRICULTURE, FOOD & BEVERAGES

**Major Points**
- **Rs. 32.46 Billion** allocated for fertilizer procurement
- Up to **40%** incentive grant for commercial farmers (minimum Rs. 2 crore investment)
- Start-up support for **1,000 youth** in agriculture & livestock
- Mango processing in Siraha/Saptari; tomato processing in Sarlahi
- **'Green Urea' fertilizer industry** to be established

**Tax Provisions**
- **No tax** on windfall gain income (e.g., prizes, awards) received from domestic and international organizations for agriculture purposes.
- Definition of **'Agricultural Business'** under **Section 11(6)** broadened to include fruit cultivation, animal husbandry, fisheries, and beekeeping alongside crop cultivation — extending tax exemption to more categories of agricultural business (Refer 11(2) — 12.5%).

---

## LIQUOR INDUSTRY

- Permitted alcohol volume variation: **0.5%** (reduced from 1%)
- **Health Risk Surcharge** (treated as excise duty) — levied and collected on tobacco/nicotine goods and liquor
- **Electronic Track & Trace System** — controls production, storage, release, sale, distribution and wholesale movement of liquor and tobacco/nicotine goods
- **Non-compliance / unauthorized access penalty:** Fine of **200%** of claimed amount or **Rs. 100,000**, whichever is higher, with license suspension
- **Liquor sales violations** (buying/selling without authorization; misusing excise exemption/credit for commercial purposes): Fine — higher of claimed amount or **Rs. 100,000**, plus confiscation of goods
- **Outstanding fines:** Annual interest of **5% p.a.**

---

## 4. TRANSPORTATION

### Ride Sharing
- **Advance Tax on ride-sharing = 1%** — ride-sharing operators (e.g., Pathao, Indrive) must deduct advance tax on payments to drivers/service providers.
- **VAT on ride-sharing = 5% (Reverse Charge)** — imposed on ride-sharing services via Nepal-based platforms and on electricity supplied to end users; platform operator responsible for calculating, collecting, and depositing VAT at each transaction.
- These measures aim to ensure fair taxation, transparency, and accountability in the transportation sector.

### Vehicle Offences & Confiscation
**1. Offence (Excise related) by hired vehicle**
- **Vehicle CAN be confiscated** if committed with owner's permission/knowledge
- **Vehicle CANNOT be confiscated** if committed without owner's permission/knowledge
- **Penalties (same for both cases):**
  - Vehicle owner: up to **NPR 25,000** maximum fine
  - Driver: up to **3 months** imprisonment, and/or up to **NPR 25,000** fine

**2. Goods carried by vehicle**
- Vehicle/means of transport **cannot normally be confiscated**.
- **Exceptions:**
  1. Owner of the vehicle cannot be found
  2. No person claims ownership after a notice of claim is issued

### Annual Tax Rate for Vehicle on Hire

| Type of Vehicle | Rate |
|---|---|
| Car, Jeep, Van, Microbus — Up to 1300cc | Rs. 6,500 |
| — 1301cc–2000cc | Rs. 7,000 |
| — 2001cc–2900cc | Rs. 7,500 |
| — 2901cc–4000cc | Rs. 9,500 |
| — 4001cc and above | Rs. 11,000 |
| Mini Truck, Mini-Bus, Water Tanker | Rs. 9,500 |
| Mini Tipper | Rs. 11,000 |
| Truck, Bus | Rs. 12,500 |
| Dozer, Excavator, Loader, Roller and Crane | Rs. 17,500 |
| Oil Tanker, Gas Bullet, Tripper | Rs. 17,500 |
| Tractor | Rs. 3,500 |
| Power Tiller | Rs. 3,000 |
| Electronic Vehicle — Up to 50kW | Rs. 4,000 |
| — 50kW–125kW | Rs. 5,000 |
| — 125kW–200kW | Rs. 7,500 |
| — Above 200kW | Rs. 9,500 |
| Two-Wheeler Vehicle | Rs. 3,000 |
| Auto Rickshaw, Three-Wheeler, Tempo, Electric Rickshaw | Rs. 3,500 |

*Rates applicable per vehicle per year.*

---

## 5. CAPITAL MARKET & REAL ESTATE

1. Capital gains advance tax rates increased by **2.5 percentage points** on disposal of shares and non-business chargeable assets.
2. New concessional **2.5%** rate for involuntary government acquisition.
3. Exemption from capital gains tax when donating property to government.
4. Capital Gain Taxes on disposal of shares and real estate clarified as **final withholding tax** under **Section 92**.

---

## 6. ENERGY & MANPOWER

- For hydropower capacity expansion or design review: construction works can be carried out through public or private sector, or through **Build-Operate**. Contractor/developer can provide goods as bank guarantee collateral in lieu of cash (requires recommendation of the Electricity Development Department).
- **VAT** charged at **5%** on electricity consumption over **50 units**.

**Foreign Employment Service Fee**
- A person licensed to operate a foreign employment business shall deposit a service fee at **1%** of the amount collected from a person going for foreign employment.
- Amount to be deposited into the revenue account by the **25th of the following month**.

---

## 7. AMENDMENTS IN INCOME TAX

**New Definitions & Transfer Pricing**
New definitions of *International Taxation*, *Associated person*, and *Safe Harbor Rule* inserted as clauses 2(Kha1), 2(Kana)(4), 2(KaBha1) to support new transfer pricing provisions under **Sections 33Ka and 33Kha**.

**Section 33Ka — Safe Harbor Rule**
- Simplifies and standardizes transactions based on arm's length principles for taxpayers with annual controlled transactions up to **Rs. 1 billion**, avoiding detailed transfer pricing studies.
- Three specific safe harbors: **IT service exports, inter-group loans, and low value-added services**.
- Once elected, applies for **5 consecutive years**.

**Section 33Kha — Advance Pricing Agreement (APA)**
- Nepal introduces the APA mechanism for the first time — fixes transfer pricing in advance, reducing uncertainty and future disputes.
- Can be **unilateral** (with the Department) or **bilateral/multilateral** (with foreign tax authorities under DTAAs).
- **Rollback facility** allows agreed pricing to apply to up to **4 prior years**.

**New Tax-Exempt Incomes under Section 10**
- **(Jha1):** Income from disposal of land/private buildings donated free of cost to Federal, Provincial, or Local Government.
- **(Jha2):** Interest income of nonprofit financial institutions wholly owned by foreign governments, from loan investments in Nepal.
- **(Jha3):** Income earned by registered water supply and sanitation consumer organizations, in line with their objectives.
- **(Tha1):** Income earned by universities established and operating in Nepal, in accordance with their objectives.

**Section 11(2Ka) — Interest Income Exemption**
- Annual interest income up to **Rs. 25,000** from deposits in microfinance institutions, rural development banks, postal savings banks, and eligible cooperatives is tax-free.
- Only the portion exceeding Rs. 25,000 is subject to tax.

**Deduction & Threshold Changes**
- **Section 12:** Maximum deductible donation limit to tax-exempt entities increased from **Rs. 1,00,000 to Rs. 3,00,000** (the 5% of adjusted taxable income ceiling remains unchanged).
- **Section 12Gha (new):** Deduction allowed for expenses incurred for discharging Corporate Social Responsibility (CSR), up to **1%** of total taxable income.
- **Schedule 1, Section 1(16Ka):** Threshold doubled from **Rs. 5,000 to Rs. 10,000** for resident natural persons insuring their private building with a resident insurance company.
- **Schedule 1, Section 1(16Kha):** Resident natural person paying tuition fees for their children's education gets a deduction — whichever is **lower** of:
  1. 25% of annual tuition fee paid
  2. Fixed cap of **NPR 25,000 per year**

**Section 21(2) — Cash Expenses**
- Cash expenses exceeding **Rs. 25,000 per transaction** are non-deductible.
- Applies to **all taxpayers**; replaces the previous Rs. 50,000 transaction limit; annual turnover threshold removed.

**Section 21(3) — Share/Debenture Issuance Expenses**
- Expenses incurred for issuance of shares or debentures are **not treated as Capital Expenditure**. "Capital expenses" excludes such issuance costs and covers: (1) feasibility study/exploration/development of natural resources, (2) acquisition of property with useful life over twelve months, (3) expenses in disposing of a liability.

**Section 47Ka — Repealed**
- Special provisions for disposal on merger of Banking/Financial Institutions repealed; standard **Section 57** rules now apply.

**Income Tax Slab Changes**

| Income Range | Tax Rate |
|---|---|
| Up to Rs 10,00,000 | 1% |
| Rs. 10,00,001 – Rs. 15,00,000 | 10% |
| Rs. 15,00,001 – Rs. 25,00,000 | 20% |
| Rs. 25,00,001 – Rs. 40,00,000 | 27% |
| Above Rs. 40,00,001 | 29% (27% + 2% Surcharge) |

*1% tax shall not be levied on pension income, contributions to pension fund or Social Security Fund, and income of sole proprietorship firms.*

**Other Amendments**
- **Section 57(1):** Not applicable in case of involuntary transfer of interest to legal heir due to death of a beneficial owner, and ownership changes in subsidiary entities when the resident parent entity's ownership changes.
- **Section 75(1Ka):** The Department's interpretation/ruling on written public circulars or explanations of provisions is now **final**.
- **Section 82(Ka):** New power granted to the Inland Revenue Department to electronically obtain financial transaction data from taxpayers and also data related to their customers, employees, service recipients, members, and other record holders.

**TDS & Advance Tax Provisions**
- **Section 88(1), new clause (14):** Specific **20% TDS** on commissions/service fees paid to resident natural person insurance agents (increased from 15%).
- **Section 92(1), new clauses (Yna1)/(Ja1) and (Yna2)/(Ja2):** Cover income/gain of resident natural persons and non-residents not wishing to file returns under Section 95Ka(2)/(5); foreign currency payments under (6Kha)/(6Ga)/(6Gha); service payments under (6Nga); and service charges/commissions paid to insurance agents.
- **Section 97(1):** Exemption clause for persons with only foreign-exchange income under (6Kha), (6Ga), (6Gha) removed — now covered under Section 92 as final withholding income.
- **Section 89(3Ka) — Repealed:** 1.5% withholding tax on payments exceeding 50 lakhs for consumer committee work no longer necessary.

**Assessment, Refund & Fee Provisions**
- **Section 101(3):** Tax assessment period reduced from **4 to 3 years**.
- **Section 113(4):** Refund claim window extended from **2 to 5 years**, counted from the latest of: (a) expiration of the income year of excess payment, (b) date excess amount paid, or (c) date the case is decided.
- **Section 119(Ka):** Simplified two-tier fee structure for electronic invoicing under Section 81(4):
  - **Rs. 5,00,000** fee for using software capable of deleting/modifying invoice data
  - **Rs. 1,00,000** fee for non-compliance with other provisions of Section 81(4)

---

## 8. AMENDMENTS IN VALUE ADDED TAX ACT 2052

**Section 14(ka) — Digital Invoice (Stricter Measures)**
- Department may prescribe standards and procedures for digital invoice issuance (previously self-initiated with pre-approval).
- Department may mandate CBMS registration and digital invoicing, or use of the Department's billing system.
- Department to implement guidelines on safety/reliability of invoicing software/equipment.

**Section 18(1ka) — VAT Return Submission**
- Taxpayers in districts without an Inland Revenue Office may submit returns/payments to the related local level or Office of Financial Comptroller General within **15 days**. ("Local level" added; "Taxpayer Service Office" removed.)

**Section 18(4) — Amendment of Submitted Tax Return (New)**
- Department may amend tax returns submitted within deadline, within **7 days** of submission, per prescribed procedures.

**Section 25(1kha) — Digital Payment Rebate**
- Consumers making digital payments on notified goods/services get an **immediate rebate of 10%** of the tax amount ("Refund" replaced by "Rebate" — discount given at point of invoice, not claimed later).

**Section 25(Ga1) — Deleted**
- Provision on refund of excess tax paid under contract deleted.

**Penalty Provisions**
- **Section 29(1 Chha 2):** Rs. **5 lakh** fine for digital invoices using software capable of deleting/modifying data; Rs. **1 lakh** fine (new tier) for non-compliance with Section 14(ka)(1)/(2).
- **Section 29(1 Ta):** General violation fine increased from **Rs. 1,000 to Rs. 10,000** per occurrence.
- **Section 29(1 Da) (New):** Rs. **50,000** fine per occurrence for violating Department directives on internal transfer of commercial-purpose goods.

---

## 9. EXCISE RATE CHANGES

### Food & Agriculture

| Description | Old Rate | New Rate |
|---|---|---|
| Frozen Poultry (chicken, turkey, duck) | 5% | 15% |
| Areca Nuts (Supari) | Rs. 25/kg | Rs. 100/kg |
| Apricots (fresh) | 5% | 10% |
| Provisionally preserved fruits; Dried fruits (apricots, prunes, others) | 5% | 10% |
| Copra (Coconut) | Nil / Not listed | 15% |
| Dried leguminous veg flour; Sago/starch flour; Products from Ch. 8 | Not listed | 20% |

### Pan Masala / Tobacco Inputs

| Description | Old Rate | New Rate |
|---|---|---|
| Pan Masala without Tobacco | Rs. 812/kg | Rs. 1,150/kg |
| Scented Areca Nuts without Tobacco | Rs. 281/kg | Rs. 500/kg |

### Non-Alcoholic Beverages

| Description | Old Rate | New Rate |
|---|---|---|
| Non-Alcoholic Beer | Rs. 20/ltr | Rs. 90/ltr |
| Energy Drinks | Rs. 36/ltr | Rs. 120/ltr |
| Milk-based Beverages | Not listed | Rs. 60/ltr |
| Other Non-Alcoholic Beverages | Rs. 14/ltr | Rs. 60/ltr |

### Beer, Wine & Fermented Beverages

| Description | Old Rate | New Rate |
|---|---|---|
| Beer (Malt) – up to 5% alcohol | Rs. 198/ltr (single rate) | Rs. 251/ltr |
| Beer (Malt) – above 5% alcohol | Rs. 198/ltr (single rate) | Rs. 251/ltr |
| Wine (all categories) & Vermouth | Rs. 444–516/ltr | Rs. 490–570/ltr |
| Cider/Champagne/Sherry (imported); Domestic Cider; Cocktail/Mixed liquor >17% | Rs. 516/ltr | Rs. 570/ltr |
| Extra Neutral Alcohol (ENA) | Rs. 76/ltr | Rs. 80/ltr |

### Readymade Liquor / Spirits

| Description | Old Rate | New Rate |
|---|---|---|
| Readymade Liquor – 15 UP (48.5% alc) | Rs. 1,592/ltr \| Rs. 1,872/LP ltr | Rs. 1,660/ltr \| Rs. 1,944/LP ltr |
| Readymade Liquor – 25 UP (42.8% alc) | Rs. 1,188/ltr \| Rs. 1,584/LP ltr | Rs. 1,390/ltr \| Rs. 1,653/LP ltr |
| Readymade Liquor – 30 UP (39.94% alc) | Rs. 1,105/ltr \| Rs. 1,578/LP ltr | Rs. 1,290/ltr \| Rs. 1,843/LP ltr |

### Tobacco Products

| Description | Old Rate | New Rate |
|---|---|---|
| Cigarettes – Unfiltered | Rs. 618/1,000 | Rs. 700/1,000 |
| Filtered Cigarettes – up to 70mm | Rs. 1,418/1,000 | Rs. 1,600/1,000 |
| Filtered Cigarettes – 70–75mm | Rs. 1,843/1,000 | Rs. 2,100/1,000 |
| Filtered Cigarettes – 75–85mm | Rs. 2,400/1,000 | Rs. 2,750/1,000 |
| Filtered Cigarettes – above 85mm | Rs. 3,393/1,000 | Rs. 3,900/1,000 |
| Beedie | Rs. 94/1,000 | Rs. 100/1,000 |
| Cigar | Rs. 21/stick | Rs. 25/stick |
| Khaini / Jarda / Snuff / Gutkha | Rs. 812/kg | Rs. 1,000/kg |
| Electronic Cigarette / Vape | 30% (under 8543.70.10) | 55% (reclassified to Ch. 24) |

### Automobiles

| Description | Old Rate | New Rate |
|---|---|---|
| Petrol Cars – up to 1,000cc | 55–60% | 60% |
| Electric Vehicles (non-standard / other) | 40% | 60% |
| Hybrid Vehicles (plug-in & non-plug-in) | 40% | 40% |
| Motorcycles – 250–400cc | 80% | 60% |
| Motorcycles – 400–500cc (new band) | 80% | 80% |
| Double Cab Pick-up (>5T GVW) | 60% | 75% |

*All rates are exclusive of applicable taxes unless otherwise specified. New rates are effective as per government notification.*

---

## 10. TAX RELIEFS & CONCESSIONS

**Sec 26 — Destroyed Business Stock**
- Uninsured stock destroyed during the Gen-Z Movement can be claimed as **Cost of Goods Sold (COGS)**.
- Input VAT remains claimable.
- Businesses need only submit a loss report to the Inland Revenue Office.

**Sec 27 — 50% Duty Exemption on Restoration**
- Businesses damaged by fire or vandalism during the Gen-Z Movement get **50% exemption** on customs and excise duty on goods imported to restart operations.
- Casino businesses: royalty fees and renewal fees waived for the period they couldn't operate.

**Sec 31 — Luxury/VAT on Gold & Jewellery**
- Luxury tax on gold/jewellery and VAT on precious stones not collected before **2 Bhadra 2082** is automatically remitted — no returns needed.
- VAT uncollected by gold/silver jewellery makers in FY 2082/83 or earlier also waived, including all interest and penalties.

**Sec 32 — Expired Industrial Goods Write-off**
- Industries can write off expired/unusable raw materials, finished/semi-finished goods without claiming excise refunds.
- Write-off must be completed by **end of Poush 2083** in presence of designated officials.

**Sec 33 — Damaged Excise Stamps**
- Excise stamps destroyed during the Gen-Z Movement or otherwise unfit for use can be written off from official records through a supervised destruction process.

**Sec 34 — Post-Clearance Audit Liabilities**
- Unpaid customs/excise/VAT assessed under post-clearance audit (outstanding as of end of Baisakh 2083) can be settled by paying the full assessed amount by **end of Poush 2083** — all penalties and accrued interest waived.

**Sec 36 — Shipping Containers Release**
- Shipping containers held at customs for long periods can be reclaimed free of charge (no demurrage fees) if the company applies by **end of Mangsir 2083**.

**Sec 37 — Universities, Missions & Non-Residents**
- Universities, diplomatic missions, development partners, and non-resident investors in Nepal exempt from filing income returns for all years up to FY 2082/83 (except withheld advance tax).
- Community schools and health institutions get prior-year filing exemptions and tax waivers upon filing for 2082/83.

**Sec 38 — Non-Profit Institutions**
- Non-profit institutions whose assets devolve to government upon dissolution get tax, interest, and fee waivers on donation/grant income for FY 2082/83 and earlier — if they file the 2082/83 return by end of Poush 2083.

**Sec 39 — Insurance Agents (VAT)**
- Insurance agents who didn't collect VAT in FY 2082/83 or earlier get a full waiver of all uncollected VAT plus interest, fees, and penalties. No tax return required.

**Sec 40 — PAN Regularisation Scheme**
- **No PAN yet:** Get a PAN, file returns for FY 2079/80–2082/83, pay tax → all fees/interest waived; no filing needed for earlier years.
- **Inactive PAN:** File 2082/83 return, pay tax, apply for cancellation/resumption by end of Poush 2083 → exempt from all prior-year returns.
- **Defaulting PAN holder:** File return + pay tax + 1% extra by end of Poush 2083 → all fees and interest waived.

**Sec 41 — VAT Liability Settlement**
- VAT-registered persons who collected tax but didn't file, or didn't collect at all, can settle by depositing tax + 1% extra and filing returns up to Chaitra 2082 by end of Poush 2083 → all interest, fees, and penalties waived.

**Sec 42 — Paneer (Cheese) VAT**
- Outstanding VAT on past credit sales of milk-based paneer (cheese) is fully waived.

**Sec 44 — Outstanding Self-Assessed Tax**
- Persons who filed VAT/income tax/excise returns but have outstanding balances as of 15 Jestha 2083 can pay outstanding amount + 1% by end of Poush 2083 → all fees, penalties, interest, and late charges waived.

**Sec 45 — Assessed/Reassessed Liabilities**
- Where VAT/income tax/excise assessed by IRD on or before 15 Jestha 2083 remains unpaid, paying assessed amount + 1% by end of Poush 2083 → all fees, charges, penalties, and interest waived. (Excludes telecom service providers.)

**Sec 48 — Non-Compliant Companies**
- Companies under the Companies Act that failed to file returns, renew registration, or pay taxes can comply for FY 2082/83 by end of Ashwin 2083 → all prior-year taxes, fees, charges, interest, and penalties waived.

**Sec 49 — Special Provisions for Waiver of Penalties and Interest**
- **Tax/Fee Settlement Scheme:** Settle outstanding taxes/fees/duties by paying principal + 1% additional payment by **Mangsir-end 2083** → 100% waiver of penalties, interest, and related charges.
- **Litigation Cases:** Taxpayers with pending disputes can avail the waiver by withdrawing cases and making the required payment.
- **Casino License Regularization:** Casinos with cleared dues up to FY 2082/83 may renew licenses for FY 2083/84 by paying 15% of the pending renewal fee and meeting regulatory requirements.
- **Court Cases:** Casino cases under judicial review governed by the court's final decision.

**Sec 50 — Revenue Leakage Cases**
- Income tax/VAT cases filed under the Revenue Leakage Investigation and Control Act and pending in court can be withdrawn by government if taxpayer pays principal liability + 1% and applies by end of Poush 2083 → applicable penalty also waived.

**Sec 51 — Release of Bank Guarantees and Refund of Cash Deposits**
- Applicable to: bonded warehouse industries importing raw materials under bank guarantee facilities, and non-bonded warehouse industries using passbook facilities.
- Eligible industries that failed to export finished goods within the prescribed period may obtain release of bank guarantees or refund of cash deposits.
- **Conditions:** Export finished products by Mangsir-end 2083; receive related foreign exchange earnings; submit required application and supporting documents.
- **Benefit:** Eligible businesses can regularize export obligations and recover pledged guarantees or deposited funds.

---
*End of document.*
`;

// Helper to convert markdown to TSX
function parseMarkdownToTSX(md) {
    let lines = md.split('\\n');
    let tsx = [];
    let inTable = false;
    let inList = false;
    let tableLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Skip empty lines unless needed
        if (line === '') {
            if (inList) {
                tsx.push('</ul>');
                inList = false;
            }
            if (inTable) {
                tsx.push(parseTable(tableLines));
                tableLines = [];
                inTable = false;
            }
            continue;
        }

        if (line === '---') {
            if (inList) { tsx.push('</ul>'); inList = false; }
            if (inTable) { tsx.push(parseTable(tableLines)); tableLines = []; inTable = false; }
            tsx.push('<hr className="my-10 border-gray-200" />');
            continue;
        }

        // Table
        if (line.startsWith('|')) {
            if (inList) { tsx.push('</ul>'); inList = false; }
            inTable = true;
            tableLines.push(line);
            continue;
        }

        // Headings
        if (line.startsWith('## ')) {
            if (inList) { tsx.push('</ul>'); inList = false; }
            tsx.push(\`<h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 border-b border-gray-200 pb-2">\${formatInline(line.substring(3))}</h2>\`);
            continue;
        }
        if (line.startsWith('### ')) {
            if (inList) { tsx.push('</ul>'); inList = false; }
            tsx.push(\`<h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">\${formatInline(line.substring(4))}</h3>\`);
            continue;
        }

        // Unordered List
        if (line.startsWith('- ')) {
            if (!inList) {
                tsx.push('<ul className="list-disc list-outside ml-6 text-gray-700 space-y-3 mb-6">');
                inList = true;
            }
            tsx.push(\`<li>\${formatInline(line.substring(2))}</li>\`);
            continue;
        }
        
        // Ordered List (1. , 2. )
        if (/^\\d+\\.\\s/.test(line)) {
            if (inList) { tsx.push('</ul>'); inList = false; }
            tsx.push(\`<div className="flex gap-3 mb-4"><span className="font-bold text-blue-600">\${line.split('.')[0]}.</span><p className="text-gray-700">\${formatInline(line.substring(line.indexOf('.') + 1).trim())}</p></div>\`);
            continue;
        }

        // Paragraphs / Bold lines
        if (inList) { tsx.push('</ul>'); inList = false; }
        
        if (line.startsWith('**') && line.endsWith('**')) {
             tsx.push(\`<h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">\${formatInline(line)}</h4>\`);
        } else if (line.startsWith('*') && line.endsWith('*')) {
             tsx.push(\`<p className="text-sm italic text-gray-500 mb-6">\${formatInline(line)}</p>\`);
        } else {
             tsx.push(\`<p className="text-gray-700 mb-4 leading-relaxed">\${formatInline(line)}</p>\`);
        }
    }

    if (inList) tsx.push('</ul>');
    if (inTable) tsx.push(parseTable(tableLines));
    
    return tsx.join('\\n');
}

function parseTable(lines) {
    if (lines.length < 3) return '';
    let thead = lines[0].split('|').map(x => x.trim()).filter(x => x);
    let rows = lines.slice(2).map(l => l.split('|').map(x => x.trim()).filter(x => x));

    let html = \`<div className="overflow-x-auto mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
                <tr>
                    \${thead.map(h => \`<th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">\${formatInline(h)}\</th>\`).join('')}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                \${rows.map((row, i) => \`<tr className="\${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors">
                    \${row.map(cell => \`<td className="px-4 py-3 text-gray-700">\${formatInline(cell)}\</td>\`).join('')}
                </tr>\`).join('')}
            </tbody>
        </table>
    </div>\`;
    return html;
}

function formatInline(text) {
    // Replace **bold**
    text = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong className="font-bold text-gray-900">$1</strong>');
    // Replace *italic*
    text = text.replace(/(?<!\\*)\\*(.*?)\\*(?!\\*)/g, '<em>$1</em>');
    // Escape { and }
    text = text.replace(/\\{/g, '&#123;').replace(/\\}/g, '&#125;');
    // Escape < and >
    // text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return text;
}

const finalOutput = \`
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nepal Budget 2083/84 (2026/27) — Summary & Analysis | NepaCalc',
  description: 'Complete sector-wise summary and analysis of Nepal\\'s Budget for Fiscal Year 2083/84. Covers changes in Income Tax slabs, VAT, Excise Duties, and allocations.',
  keywords: ['Nepal Budget 2083/84', 'Nepal Budget Summary 2026', 'Income Tax Slab Nepal 2083', 'Nepal VAT amendments', 'Nepal Excise duty changes', 'Capital Gains Tax Nepal', 'NepaCalc Budget'],
  alternates: {
    canonical: 'https://nepacalc.com/nepal-budget/',
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "@id": "https://nepacalc.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Nepal",
      "@id": "https://nepacalc.com/nepal/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Nepal Budget 2083/84 Summary",
      "@id": "https://nepacalc.com/nepal-budget/"
    }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Nepal Budget 2083/84 — Summary & Sector-Wise Analysis",
  "description": "Complete sector-wise summary and analysis of Nepal's Budget for Fiscal Year 2083/84.",
  "author": {
    "@type": "Organization",
    "name": "NepaCalc"
  },
  "publisher": {
    "@type": "Organization",
    "name": "NepaCalc",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nepacalc.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://nepacalc.com/nepal-budget/"
  }
};

export default function NepalBudgetPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/nepal/" className="hover:text-blue-600 transition-colors">Nepal Tools</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">Budget 2083/84</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            NEPAL BUDGET 2083/84 <br className="hidden md:block"/>
            <span className="text-blue-600">SUMMARY & SECTOR-WISE ANALYSIS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            A comprehensive breakdown of Nepal's Fiscal Year 2083/84 (2026/27) Budget, covering key changes in Income Tax, VAT, Excise Duties, and sector allocations.
          </p>
        </div>

        {/* Content Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          
          {/* Main Article */}
          <article className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
            \n${parseMarkdownToTSX(markdownContent)}\n
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 mt-8 lg:mt-0 space-y-6 sticky top-24">
            
            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Related Calculators
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Income Tax Slab 2083/84</p>
                      <p className="text-xs text-gray-500">Calculate updated taxes</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/nepal-salary/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Salary Calculator</p>
                      <p className="text-xs text-gray-500">Net salary & PF/CIT</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/property-tax/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Property Tax Calculator</p>
                      <p className="text-xs text-gray-500">Land & building tax</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/nepal-vehicle-tax/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Vehicle Tax Calculator</p>
                      <p className="text-xs text-gray-500">Annual bagmati tax</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">Disclaimer</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                This summary is intended for informational purposes only. While every effort has been made to ensure accuracy, please refer to the official Income Tax Act, VAT Act, and government notifications for complete legal definitions and current implementations.
              </p>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}
\`;

fs.mkdirSync(path.join(__dirname, 'src/app/nepal-budget'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src/app/nepal-budget/page.tsx'), finalOutput);
console.log("Successfully generated src/app/nepal-budget/page.tsx");
