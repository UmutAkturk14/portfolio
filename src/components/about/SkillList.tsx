import SkillItem from "./SkillItem";

type SkillListProps = {
  title: string;
  skills: { name: string; level: number }[];
};

const SkillList = ({ title, skills }: SkillListProps) => {
  // Sort descending by level
  const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

  return (
    <div className="max-w-md mx-auto my-8 flex flex-col">
      <h3 className="text-xl text-center underline underline-offset-6 font-semibold text-gray-700 dark:text-gray-100 mb-20">
        {title}
      </h3>
      <div className="space-y-3 min-h-[30svh] sm:min-h-[40svh] flex flex-col items-start justify-start">
        {sortedSkills.map((skill, idx) => (
          <SkillItem key={idx} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;
