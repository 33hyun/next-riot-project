// 챔피언 패시브 스킬 타입
export type ChampionPassive = {
  name: string;
  description: string;
  image: {
    full: string;
  };
};

// 챔피언 개별 스킬 타입 (Q, W, E, R)
export type ChampionSpell = {
  id: string;
  name: string;
  description: string;
  image: {
    full: string;
  };
};

// 챔피언 기본 정보 타입
export type Champion = {
  id: string;
  key: string; 
  name: string;
  title: string;
  image: {
    full: string;
  };
};

// 챔피언 상세 정보 타입
export type ChampionDetail = Champion & {
  lore: string; // 챔피언의 배경 이야기
  passive: ChampionPassive; // 패시브 스킬
  spells: ChampionSpell[]; // QWER 스킬들
};