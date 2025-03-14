# 🏆 리그 오브 레전드 정보 앱

Riot Games API를 활용하여 리그 오브 레전드(LoL)의 챔피언, 아이템, 로테이션 정보를 제공하는 웹 애플리케이션입니다.

## 🚀 프로젝트 개요

- **Framework**: Next.js (14)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Riot API (DDragon), ISR (Incremental Static Regeneration)
- **Deployment**: Vercel
- **State Management**: 없음 (필요 시 Zustand 도입 가능)

## 📌 주요 기능

### 1️⃣ **챔피언 목록 조회**
- 최신 패치 버전의 모든 챔피언 목록을 표시합니다.
- 챔피언 클릭 시 상세 페이지로 이동합니다.
- `fetchChampionList()`를 통해 Riot API에서 데이터 가져오기
- **ISR 적용**: 24시간마다 갱신 (`revalidate: 86400`)

### 2️⃣ **챔피언 상세 정보 조회**
- 챔피언의 기본 정보 (이름, 타이틀, 설명)를 표시합니다.
- 챔피언의 패시브 및 QWER 스킬을 표시합니다.
- `fetchChampionDetail(id)` 함수로 Riot API에서 개별 챔피언 데이터 가져오기

### 3️⃣ **챔피언 로테이션**
- 매주 변경되는 무료 챔피언 로테이션 정보를 제공합니다.
- Riot API에서 `freeChampionIds`를 가져와 전체 챔피언 데이터와 매칭
- **최적화**: 가장 상위 3개 챔피언은 `priority` 속성을 부여하여 빠르게 로드

### 4️⃣ **아이템 목록 조회**
- 최신 패치 버전의 모든 아이템 목록을 표시합니다.
- 가격이 존재하는 아이템만 필터링하여 보여줍니다.
- `fetchItemList()`를 사용해 아이템 데이터를 가져옵니다.

### 5️⃣ **반응형 UI 지원**
- Tailwind CSS를 활용하여 모든 디바이스에서 최적의 UI 제공
- **다크 테마 기반 디자인** 적용 (OP.GG 스타일 참고)

## 🔥 기술 스택
 Next.js : React 기반의 프레임워크, SSR 및 SSG 지원
 TypeScript : 타입 안정성을 제공하는 JavaScript 확장 
 Tailwind CSS : 빠른 스타일링을 위한 유틸리티 클래스 기반 CSS 
 Riot API : LoL 챔피언, 아이템, 로테이션 데이터 제공 
 Vercel : 배포 플랫폼, Next.js 최적화 

## 📜 라이선스
이 프로젝트는 Riot Games와 공식적으로 관련이 없으며, Riot API를 활용하여 정보를 제공합니다.

