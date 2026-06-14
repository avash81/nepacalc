import os
path = 'src/components/layout/ModernCalcLayout.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target1 = '''import { usePathname } from 'next/navigation';
import { RecentSidebar } from './RecentSidebar';
import { CALCULATORS } from '@/data/calculators';'''

replacement1 = '''import { usePathname } from 'next/navigation';
import { CALCULATORS } from '@/data/calculators';'''

target2 = '''          </div>
          <div className="w-full lg:w-[320px] space-y-6 no-print">
            <div className="space-y-6">
            <RecentSidebar />
            {sidebar && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-white border-b border-[#DADCE0]">'''

replacement2 = '''          </div>
          <div className="w-full lg:w-[320px] space-y-6 no-print">
            <div className="space-y-6">
            {/* Financial Toolkit Block */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-4">
               <h3 className="text-xl font-bold text-[#202124] mb-4">Explore More Nepal Financial Tools</h3>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#3C4043]">
                 <li><a href="/calculator/nea-bill/" className="flex items-center gap-2 hover:text-[#1A73E8] transition-colors"><span className="text-xl">⚡</span> <span className="font-medium underline underline-offset-2">NEA Electricity Bill Calculator</span></a></li>
                 <li><a href="/calculator/property-tax/" className="flex items-center gap-2 hover:text-[#1A73E8] transition-colors"><span className="text-xl">🏡</span> <span className="font-medium underline underline-offset-2">Property Tax Calculator</span></a></li>
                 <li><a href="/calculator/nepal-salary/" className="flex items-center gap-2 hover:text-[#1A73E8] transition-colors"><span className="text-xl">💼</span> <span className="font-medium underline underline-offset-2">Salary Tax Calculator Nepal</span></a></li>
                 <li><a href="/calculator/nepal-income-tax/" className="flex items-center gap-2 hover:text-[#1A73E8] transition-colors"><span className="text-xl">💸</span> <span className="font-medium underline underline-offset-2">Income Tax Calculator</span></a></li>
               </ul>
            </div>
            
            {sidebar && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-white border-b border-[#DADCE0]">'''

if target1 in content and target2 in content:
    content = content.replace(target1, replacement1)
    content = content.replace(target2, replacement2)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS')
else:
    print('COULD NOT FIND TARGETS:', target1 in content, target2 in content)
