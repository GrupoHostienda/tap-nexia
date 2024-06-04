import { z } from "zod";
import {
  BackgroundSchema,
  LinksStylesAPISchema,
  UserLinkSchema,
  UserSchema,
} from "./schemas";

export type LinkStylesType = z.infer<typeof LinksStylesAPISchema>;

export type BackgroundType = z.infer<typeof BackgroundSchema>;

export type UserType = z.infer<typeof UserSchema>;

export type UserLinkType = z.infer<typeof UserLinkSchema>;

export type PreviewProps = {
  id: number;
  isHidden: 0 | 1;
  url: string;
  title: string;
  style: {
    id: number;
    link_id: number;
    class?: string;
  };
};

export type ContextType = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  outline: string;
  setOutline: React.Dispatch<React.SetStateAction<string>>;
  shadow: string;
  setShadow: React.Dispatch<React.SetStateAction<string>>;
  linkId: number;
  setLinkId: React.Dispatch<React.SetStateAction<number>>; //delete | DropDown component
  //selectedLinkId: number; //editar | styles route
  //selectedLink: UserLinkType[]; //edit | styles route
  //setSelectedLinkId: React.Dispatch<React.SetStateAction<number>>; //edit | styles route
  //idPosition0: number; //edit | styles route
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
};
