export type Item = {
  id: string;
  name: string;
  description: string;
  image: string;
  gold?: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
};