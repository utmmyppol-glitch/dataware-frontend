# Dataware Frontend

유니온데이터웨어 공식 홈페이지 프론트엔드.

엔코아 DATAWARE 솔루션(DA#, META#, DQ#, AP#, DP# 등)의 소개, 도입 문의, 교육/세미나 신청을 처리한다. 백엔드(`union-backend`)의 `/api/dataware/` 엔드포인트를 사용한다.

## 기술 스택

- **Next.js 14** (App Router, standalone 빌드)
- **React 18** / TypeScript
- **Tailwind CSS**
- **GSAP** (스크롤 애니메이션)
- **DOMPurify** (HTML sanitize)
- **Husky + lint-staged** (커밋 시 ESLint 자동 실행)

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 페이지 |
| `/products` | 제품 소개 |
| `/customers` | 고객사례 |
| `/pricing` | 요금제 |
| `/education` | 무료교육 신청 |
| `/seminar` | 방문 세미나 |
| `/events` | 이벤트 |
| `/download` | 다운로드 신청 |
| `/resources` | 공지사항 |
| `/diagnosis` | 데이터 진단 |
| `/contact` | 도입문의 |
| `/form-view` | 폼 조회 |
| `/privacy` | 개인정보처리방침 |

## 로컬 개발

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/dataware
BACKEND_URL=http://localhost:8080
```

| 변수 | 용도 | 기본값 |
|------|------|--------|
| `NEXT_PUBLIC_API_URL` | 클라이언트 사이드 API 호출 | `http://localhost:8080/api/dataware` |
| `BACKEND_URL` | 서버 사이드 API 프록시 (rewrites) | `http://localhost:8080` |

### 3. 개발 서버

```bash
npm run dev
```

`http://localhost:3001`에서 확인.

### 4. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx             # 메인 페이지
│   ├── HomePageClient.tsx   # 메인 페이지 클라이언트 컴포넌트
│   ├── layout.tsx           # 루트 레이아웃 (Noto Sans KR, 메뉴 SSR)
│   ├── products/            # 제품 소개
│   ├── customers/           # 고객사례
│   ├── pricing/             # 요금제
│   ├── education/           # 교육 신청
│   ├── seminar/             # 세미나 신청
│   ├── download/            # 자료 다운로드
│   ├── contact/             # 도입 문의
│   ├── events/              # 이벤트
│   ├── diagnosis/           # 데이터 진단
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml
├── components/
│   ├── layout/              # Header, Footer, ChatBot
│   ├── home/                # 메인 페이지 섹션 컴포넌트
│   ├── forms/               # 폼 컴포넌트 (문의, 교육, 세미나, 다운로드)
│   ├── animations/          # 애니메이션 컴포넌트
│   ├── EditMarker.tsx       # CMS 편집 마커
│   └── SolutionDiagram.tsx  # 솔루션 다이어그램
└── lib/
    ├── api.ts               # 백엔드 API 호출 함수
    ├── editable.tsx         # CMS 인라인 편집
    ├── form-validation.ts   # 폼 유효성 검증 유틸
    ├── format.ts            # 날짜/숫자 포맷팅
    └── gsap-init.ts         # GSAP 초기화
```

## 주요 설정 (next.config.mjs)

### API 프록시 (rewrites)

`/api/*` 요청을 백엔드로 프록시한다:

```
/api/:path* → ${BACKEND_URL}/api/:path*
```

이 설정은 서버 사이드에서 동작하므로 `BACKEND_URL` 환경변수가 필요하다.

### iframe 보안

CSP `frame-ancestors`로 백오피스(`localhost:3002`, `admin.unionsystems.co.kr`)에서만 iframe 임베드를 허용한다.

### 뷰포트

`viewport.width`가 `1200`으로 고정되어 있다. 모바일에서도 데스크톱 레이아웃으로 표시된다.

## API 연동

`src/lib/api.ts`에서 `api` 객체로 백엔드 호출:

- `api.getProducts(category)` — 제품 목록
- `api.getProduct(slug)` — 제품 상세 (slug로 조회)
- `api.getPosts(category, page, size)` — 게시글
- `api.getPostBySlug(slug)` — 게시글 상세 (slug)
- `api.getCustomerStories(industry, page, size)` — 고객사례
- `api.getCustomerStoryBySlug(slug)` — 고객사례 상세 (slug)
- `api.getBanners(position)` — 배너
- `api.getClientLogos()` — 고객사 로고
- `api.submitInquiry(data)` — 문의 접수
- `api.submitInquiryWithFile(formData)` — 파일 첨부 문의
- `api.submitDownload(data)` — 다운로드 신청
- `api.submitEducation(data)` — 교육 신청
- `api.submitSeminar(data)` — 세미나 신청

메뉴는 `layout.tsx`에서 SSR 시점에 `/api/dataware/menu`를 호출하여 Header에 전달한다 (60초 revalidate). 노출 여부(`isExposed`)와 정렬순서(`sortOrder`)를 필터링/정렬한다.

## 폰트

Google Fonts의 **Noto Sans KR** (400~900)을 사용한다. CSS 변수 `--font-noto`로 접근 가능.

## 연관 프로젝트

| 프로젝트 | 포트 | 설명 |
|----------|------|------|
| union-backend | 8080 | 백엔드 API |
| union-frontend | 3000 | 유니온시스템즈 홈페이지 |
| backoffice | 3002 | 백오피스 관리자 |
