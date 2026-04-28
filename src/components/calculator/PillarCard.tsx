import Link from 'next/link';

interface PillarCardProps {
  slug: string;
  icon: string | React.ReactNode;
  name: string;
  description: string;
  tag?: string;
  isNepal?: boolean;
  isNew?: boolean;
  isHot?: boolean;
}

export function PillarCard({ slug, icon, name, description, tag, isNew, isHot }: PillarCardProps) {
  const href = slug.includes('/') ? `/${slug}/` : `/calculator/${slug}/`;
  return (
    <div className="bg-white border border-[#dadce0] rounded-xl p-5 flex flex-col hover:shadow-md hover:border-[#c5c9d0] transition-all group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xl leading-none">{icon}</span>
        <div className="flex items-center gap-1.5">
          {isNew && <span className="text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">NEW</span>}
          {isHot && <span className="text-[9px] font-black uppercase tracking-widest bg-red-100 text-red-600 px-1.5 py-0.5 rounded">HOT</span>}
          {tag && <span className="text-[9px] font-black uppercase tracking-widest text-[#5f6368]">{tag}</span>}
        </div>
      </div>
      <h3 className="text-[15px] font-bold text-[#202124] mb-1.5 group-hover:text-[#1a73e8] transition-colors">{name}</h3>
      <p className="text-[13px] text-[#5f6368] leading-snug flex-1 mb-4">{description}</p>
      <Link href={href} className="text-[13px] font-bold text-[#1a73e8] hover:underline inline-flex items-center gap-1">
        Open Tool →
      </Link>
    </div>
  );
}
