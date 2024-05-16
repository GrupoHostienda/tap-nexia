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

export type UserType = {
  id: number;
  username: string;
  email: string;
  role: string;
  cover?: string;
  created_at: string;
  updated_at: string;
};
