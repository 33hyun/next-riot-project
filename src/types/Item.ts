export interface Item {
    id: string;
    name: string;
    description: string;
    gold: {
      total: number;
      base: number;
      sell: number;
    };
    image: string;
  }