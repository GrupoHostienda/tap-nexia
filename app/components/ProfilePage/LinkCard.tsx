type LinkCardProps = {
  label: string;
  url: string;
  style: string | undefined;
};

const LinkCard = ({ label, url, style }: LinkCardProps) => {
  return (
    <li
      className={`relative text-center hover:scale-[1.03] transition-all duration-200 cursor-pointer `}
    >
      <a
        target="_blank"
        href={url}
        rel="noreferrer"
        className={` ${style} w-full block px-4 py-2  `}
      >
        {label}
      </a>
    </li>
  );
};

export default LinkCard;
