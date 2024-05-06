/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { motion, AnimatePresence } from "framer-motion";
import Iframe from "./Iframe";

/* eslint-disable jsx-a11y/click-events-have-key-events */
type LinkCardProps = {
  label: string;
  url: string;
  setIframeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  iFrameVisible: boolean;
};

const LinkCard = ({
  label,
  url,
  setIframeVisible,
  iFrameVisible,
}: LinkCardProps) => {
  return (
    <div>
      {label === "favorite music video" ? (
        <div>
          <li
            className="bg-slate-200 capitalize text-center text-slate-700 rounded-full px-4 py-2 hover:text-slate-200 hover:bg-transparent border border-slate-200 transition-all text-lg w-full"
            onClick={() => setIframeVisible(true)}
          >
            {label}
          </li>
          <AnimatePresence>
            {iFrameVisible && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <Iframe setIframeVisible={setIframeVisible} url={url} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default LinkCard;
