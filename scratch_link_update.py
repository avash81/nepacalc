import os

filepath = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\kukl-bill\KuklSeoContent.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Link 1
search1 = "presents a transparent breakdown of every charge, making it easier to understand your water consumption and monthly costs.\n        </p>"
replace1 = search1 + "\n        <p>\n          Whether you are checking your monthly household water usage or estimating future bills, this calculator provides a quick and reliable estimate based on the official KUKL tariff structure. You can also explore more useful <a href=\"/\" className=\"text-[#1A73E8] hover:underline\">Nepal Calculators</a> for taxes, utilities, finance, and everyday calculations.\n        </p>"
content = content.replace(search1, replace1)

# Link 2
search2 = "              </tbody>\n            </table>\n          </div>\n\n          <h3 className=\"text-xl font-bold text-[#202124] mt-8 mb-4\">Why Your Actual Bill May Be Different</h3>"
replace2 = "              </tbody>\n            </table>\n          </div>\n\n          <p className=\"mt-4\">If you're planning your monthly household budget, you may also want to estimate your electricity expenses using our <a href=\"/calculator/electricity-bill/\" className=\"text-[#1A73E8] hover:underline\">Electricity Bill Calculator</a>.</p>\n\n          <h3 className=\"text-xl font-bold text-[#202124] mt-8 mb-4\">Why Your Actual Bill May Be Different</h3>"
content = content.replace(search2, replace2)

# Link 3
search3 = "<p>Your monthly KUKL bill would therefore be calculated using 15 units under the applicable tariff for your connection type.</p>"
replace3 = search3 + "\n          <p className=\"mt-4\">Understanding household water consumption is an important part of monthly financial planning. You can also estimate your income deductions using our <a href=\"/calculator/nepal-salary/\" className=\"text-[#1A73E8] hover:underline\">Nepal Salary Tax Calculator</a>.</p>"
content = content.replace(search3, replace3)

# Link 4
search4 = "<p className=\"text-sm italic\">Most payments are processed instantly, although settlement times may vary depending on the payment provider.</p>"
replace4 = search4 + "\n          <p className=\"mt-4\">Along with paying your utility bills online, many households also plan other recurring monthly expenses. Our <a href=\"/calculator/emi/\" className=\"text-[#1A73E8] hover:underline\">EMI Calculator</a> can help you estimate loan repayments and manage your monthly budget more effectively.</p>"
content = content.replace(search4, replace4)

# Link 5 & External links
search5 = """          </div>

        </div>
      </section>

    </article>
  );
}"""
replace5 = """          </div>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <p className="m-0 font-medium">Looking for more financial tools? You can also calculate applicable tax deductions using our <a href="/calculator/tds/" className="text-[#1A73E8] font-bold hover:underline">TDS Calculator</a>.</p>
          </div>

        </div>
      </section>

      {/* Phase 13 — External Linking / References */}
      <section className="mt-12 pt-8 border-t border-[#DADCE0] mb-8">
        <h3 className="text-lg font-bold text-[#202124] mb-4">Sources & Official References</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F6368]">
          <li>Tariff rates and billing methodology are based on official information from <a href="https://kathmanduwater.org/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">Kathmandu Upatyaka Khanepani Limited (KUKL)</a>.</li>
          <li>National drinking water quality requirements are established by the <a href="https://mows.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">Ministry of Water Supply, Government of Nepal</a>.</li>
        </ul>
      </section>

    </article>
  );
}"""
content = content.replace(search5, replace5)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully.")
