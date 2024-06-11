type LinkCardProps = {
  label: string;
  url: string;
  style: string | undefined;
};

const LinkCard = ({ label, url, style }: LinkCardProps) => {
  return (
    <li
      className={`relative text-center px-4 py-2 hover:scale-[1.03] transition-all duration-200 cursor-pointer ${style}`}
    >
      <a target="_blank" href={url} rel="noreferrer" className="w-full">
        {label}
      </a>
    </li>
  );
};

export default LinkCard;
