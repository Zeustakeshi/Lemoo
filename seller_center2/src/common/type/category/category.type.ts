export type Category = {
  id: string;
  name: string;
  isLeaf?: boolean;
  children?: Category[];
};
