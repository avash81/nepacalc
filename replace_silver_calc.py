with open('src/app/market-rates/silver-price-nepal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the inline calculator block with a simple anchor link card
old_calc = """              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-[13px] font-black uppercase tracking-[.2em] text-slate-800">Quick Valuation Calculator</h3>
                </div>
                <div className="p-6">
                  <SilverCalculatorClient silverPerTola={currentSilver} />
                </div>
              </div>"""

new_calc = """              <div className="mb-8">
                <a
                  href="/calculator/silver-converter/"
                  className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[15px] font-black text-slate-900 group-hover:text-blue-700 transition-colors">Quick Valuation Calculator</div>
                    <div className="text-[12px] text-slate-500 font-medium mt-0.5">Official silver valuation based on daily FENEGOSIDA benchmark rates.</div>
                  </div>
                  <div className="ml-auto text-slate-400 group-hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>"""

content = content.replace(old_calc, new_calc)

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Replaced inline calculator with anchor link card in Silver page")
