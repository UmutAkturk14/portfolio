type InterestTagsProps = {
  interests: string[];
};

const InterestTags = ({ interests }: InterestTagsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {interests.map((interest) => (
        <span
          key={interest}
          className="bg-blue-100 dark:bg-blue-800/20 text-blue-700 dark:text-blue-200 text-sm font-medium px-6 py-2 rounded-full shadow-sm hover:scale-105 transition-transform"
        >
          {interest}
        </span>
      ))}
    </div>
  );
};

export default InterestTags;
