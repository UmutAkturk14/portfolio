interface Props {
  tag: string;
  delay: number;
}

export default function TagPill({ tag, delay }: Props) {
  return (
    <span
      className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium shadow-sm border bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200 subtle-float"
      style={{ animationDelay: `${delay}s` }}
    >
      {tag}
    </span>
  );
}
