type PhotoBlockProps = {
  photoUrl: string;
};

const PhotoBlock = ({ photoUrl }: PhotoBlockProps) => {
  return (
    <div className="w-32 h-32 md:w-50 md:h-50 rounded-full overflow-hidden shadow-lg mx-auto mb-6 border-4 border-white dark:border-gray-800">
      <img
        src={photoUrl}
        alt="Profile photo"
        className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
};

export default PhotoBlock;
