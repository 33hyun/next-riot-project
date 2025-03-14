export interface Champion {
    id: string;
    name: string;
    title: string;
    image: { full: string };
  }
  
  export interface ChampionDetail extends Champion {
    lore: string;
    tags: string[];
    stats: {
      hp: number;
      attackdamage: number;
      armor: number;
      spellblock: number;
    };
  }