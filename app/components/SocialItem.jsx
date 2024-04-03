/* eslint-disable react/prop-types */
const SocialItem = ({ social, children }) => {
  return (
    <li className=" hover:scale-125 transition-all cursor-pointer">
      <a href={social.url}>{children}</a>
    </li>
  );
};

export default SocialItem;
