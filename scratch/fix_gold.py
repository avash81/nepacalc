
import sys

def fix_gold_calculator():
    path = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\gold-converter\Calculator.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove subValue props
    fixed = content.replace("subValue={`@ Rs. ${fmt(activeRate)} per ${is10g ? '10g' : 'Tola'}`}", "")
    fixed = fixed.replace("subValue={`${makingChargeType === 'percent' ? MAKING_PERCENT_HINT : 'Fixed crafting fee'}`}", "")
    # Remove icon props (PowerShell already did this, but just in case)
    fixed = fixed.replace('icon={<Coins className="w-5 h-5 text-amber-500" />}', "")
    fixed = fixed.replace('icon={<Settings2 className="w-5 h-5 text-slate-400" />}', "")
    # Remove className from ValidatedInput (PowerShell already did this)
    fixed = fixed.replace('className="bg-slate-50/50"', "")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(fixed)
    print("Successfully fixed Gold Calculator")

if __name__ == "__main__":
    fix_gold_calculator()
