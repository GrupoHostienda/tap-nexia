type LinkCardProps = {
  label: string;
  url: string;
};

const LinkCard = ({ label, url }: LinkCardProps) => {
  return (
    <li className=" bg-slate-200 capitalize text-center text-slate-700 rounded-full px-4 py-2 hover:text-slate-200 hover:bg-transparent border border-slate-200 transition-all">
      <a
        target="_blank"
        href={url}
        rel="noreferrer"
        className=" text-lg block "
      >
        {label}
      </a>
    </li>
  );
};

export default LinkCard;
