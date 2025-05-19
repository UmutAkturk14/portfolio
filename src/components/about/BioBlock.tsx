type BioBlockProps = {
  bio: string;
};

const BioBlock = ({ bio }: BioBlockProps) => {
  return (
    <div className="text-lg md:text-xl text-center font-light text-primary leading-relaxed max-w-3xl mx-auto">
      {bio}
    </div>
  );
};

export default BioBlock;
