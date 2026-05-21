interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-gray-500">{description}</p>
      )}
    </div>
  );
}
