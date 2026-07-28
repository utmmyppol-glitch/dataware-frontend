/**
 * 제품 데이터 — 크롤링 원본 기준
 */

/* ─── DA# 제품 ─── */
export const DA_SHARP = {
  name: 'DA#',
  slug: 'da-shop',
  tagline: '데이터를 알아야 비즈니스가 보입니다.',
  subtitle: '데이터를 쉽고, 명확하게!',
  coreValuesSubheading: 'DA#을 사용하면 직관적 표현으로 논리적 설계와 생산의 효율이 올라갑니다.',
  coreValues: [
    {
      id: 'logical',
      label: '논리적인 설계',
      headline: '데이터 품질을 높이는 맞춤 설계',
      tabs: [
        { title: '데이터베이스 분석', desc: '데이터베이스 용도 파악, 사용자 요구사항 수집, 분석' },
        { title: '개선점 도출', desc: '기업의 비즈니스 목적, 사용자 환경에 부합한 개선점 도출' },
        { title: '고품질데이터', desc: '데이터 품질을 높이는 설계 환경구축, 표준화로 고품질 데이터 확보' },
      ],
    },
    {
      id: 'efficient',
      label: '효율적인 생산',
      headline: '협업, 관리, 자동화로 업무 생산성 향상',
      tabs: [
        { title: '편의성 제공', desc: '다중 DMBS 지원, Undo / Redo 편집, 다양한 형태 산출물 제공 등 편의성 제공' },
        { title: '생산성 향상', desc: 'Repository 기반 팀 모델링, 웹 실시간 VIEW, 편집 기능 생산성 향상' },
        { title: '편리한 자동화', desc: '다른 모델링 툴 연계, 리버스 모델링, 자동 배치, API를 활용한 자동화' },
      ],
    },
    {
      id: 'intuitive',
      label: '직관적인 표현',
      headline: '복잡한 비즈니스 규칙 시각적 간소화',
      tabs: [
        { title: '직관적인 UI', desc: '초성 검색, 폰트, 색상변경 등 시각화 기능 직관적인 사용자 인터페이스' },
        { title: '뛰어난 가독성', desc: '엔터티 통합, 다중 선택, 크기 최적화, 강조, 색상변경 등 시각적 가독성 향상' },
        { title: '정확한 업무 규칙', desc: '구분 속성별 그룹핑, 다계층, 다차원 서브타입으로 정확한 업무 규칙 표현' },
      ],
    },
  ],
  features: {
    quickDesign: {
      label: '빠른설계',
      subheading: '복잡한 데이터를 쉽고 빠르게 설계합니다.',
      tabs: [
        { title: '다양한 설계 Layer 지원', desc: '개괄 모델부터 개념, 논리, 물리 모델까지 데이터 아키텍처 구축의 모든 단계를 지원' },
        { title: '테이블 구조 자동변경', desc: 'M:M 해소, 테이블 구조 변경 가능, 변경 내용 논리/물리 모델 실시간 반영' },
        { title: '모델링 객체 상세한 표현', desc: '엔터티 상태, 관계, 목적 등 의미를 분명하게 파악할 수 있는 다양한 유형 설정 기능' },
      ],
    },
    easyUse: {
      label: '편리한 사용',
      subheading: '업무규칙 시각화, 자동화로 생산성을 높입니다.',
      tabs: [
        { title: '편리한 UI 지원', desc: '모델의 계층화, Object 추적, 이동, 생성 등 손쉬운 모델링 위한 그래픽한 환경 제공' },
        { title: '리버스 엔지니어링', desc: 'ERD 자동 생성, 엔터티 간 관계 정보와 명칭 활용한 자동 관계 찾기/배치로 빠른 모델링' },
        { title: '자동배치', desc: '자동 관계 찾기 기능으로 부모 자식간 관계 정보 생성, 자동 배치 기능으로 관계선 정렬' },
      ],
    },
    collaboration: {
      label: '원활한 협업',
      subheading: '실시간, 공유, 호환성으로 업무 효율성을 높입니다.',
      tabs: [
        { title: 'Repository 기반 팀 모델링', desc: '주제 영역별 동시 모델링 지원, 모든 작업자들에게 모델 공유, 동기화' },
        { title: '타 모델링 도구 호환성', desc: '타 도구인 Erwin, Power Designer 에서 설계된 모델 Import 지원' },
        { title: '다양한 산출물 자동생성', desc: '한글, 워드, PDF, CSV, EXCEL, HTML 등 보고서의 다양한 파일 형식으로 변환 가능' },
      ],
    },
  },
  personasSubheading: '모델러, DA, 개발자가 편한 시스템 구축',
  personas: [
    { role: '모델러', desc: '설계 시 표준 자동추천, 표준화된 데이터 컬럼·값 생성 지원' },
    { role: 'DA', desc: '데이터모델(ERD) 기반의 DB객체(table 등) 생성/변경' },
    { role: '개발자', desc: '데이터모델(ERD) 별도 툴 설치 없이 웹 뷰어 실시간 공유' },
  ],
  concerns: [
    '데이터모델링 없이 서비스 구축했다가 사용자가 늘면서 성능문제가 생겼어요.',
    '방대한 데이터를 제대로 활용 못해요. 데이터 관리가 필요해요.',
    '데이터 표준화가 되지않아 부서간 업무협업에 문제가 있어요.',
  ],
  solution: {
    headline: '쌓여있는 데이터를 쉽고 빠르게 설계, 좋은 데이터는 매출로 연결',
    desc: '데이터 컨설팅 경험으로 목적에 맞는 데이터 모델 설계, 데이터 품질 확보로 데이터를 기반으로 한 의사결정, 시각적 표현으로 비기술 사용자와의 업무 효율성 향상',
  },
  steps: [
    { step: 1, label: '분석/설계', desc: '' },
    { step: 2, label: '개발', desc: '' },
    { step: 3, label: '테스트', desc: '' },
    { step: 4, label: '운영', desc: '' },
  ],
  cases: [
    {
      company: 'S쇼핑몰',
      problem: '그룹 내 각 서비스들이 서로 다른 용어를 사용하면서 서비스 내 데이터 간의 연동이 어려워지고 협업이 이뤄지지 않아요!',
      effect: '데이터 관리체계를 효율적으로 전환하고 전사 데이터의 현행화 표준화 작업수행 기획팀-개발팀 사이 소통을 원활히 하고 데이터의 효과적 활용 기반 마련',
    },
    {
      company: 'D증권',
      problem: '모델 통합관리 부재로 데이터 모델과 DBMS간 데이터 불일치, 데이터 모델정보 신뢰성 저하 및 개발 조직간 의사소통이 어려워요!',
      effect: 'DA#을 통한 전사 데이터 모델 통합으로 연관업무 파악이 수월해지고, 데이터 구조가 통제 됨. 데이터 품질이 높아져 개발생산성 향상',
    },
    {
      company: 'H은행',
      problem: '모델 수집 시 프로세스의 복잡성으로 인해 처리시간이 과다하게 걸려서 성능 저하가 발생해요!',
      effect: '모델 수집 요소 최적화, 동시 로딩 기능으로 서비스 향상, DB 정보와의 GAP 분석을 통한 정보의 일관성 보장으로 데이터의 품질이 향상',
    },
  ],
};

/* ─── DA# DQ Edition ─── */
export const DA_DQ_EDITION = {
  name: 'DA# DQ Edition',
  slug: 'da-shop-total-package',
  tagline: '쌓여있던 데이터 품질을 높이다.',
  subtitle: '데이터 퀄리티의 시작, 데이터 품질진단 DA# DQ Edition',
  certifications: ['GS인증 1등급', '조달청 나라장터 등록'],
  publicDataSupport: '공공데이터 품질관리 수준평가 대응 (제17조, 제22조)',
  features: {
    standard: {
      label: '데이터 표준지원',
      tabs: [
        { title: '데이터 표준관리', desc: '' },
        { title: '데이터 표준개선', desc: '' },
        { title: '데이터 구조지원', desc: '' },
      ],
    },
    quality: {
      label: '데이터 품질지원',
      tabs: [
        { title: '품질진단 기준등록', desc: '' },
        { title: '품질진단 대상설정', desc: '' },
        { title: '진단결과 조회', desc: '' },
      ],
    },
    infra: {
      label: '품질관리 인프라 구축',
      tabs: [
        { title: '품질 오류 원인 개선', desc: '' },
        { title: '품질 측정 결과 분석', desc: '' },
        { title: '기술 이전, 기능 개선', desc: '' },
      ],
    },
  },
  steps: [
    { step: 1, label: '기준', desc: '오류데이터 파악' },
    { step: 2, label: '측정', desc: '기준 수립 및 적용' },
    { step: 3, label: '개선', desc: '관리 개선' },
  ],
};

/* ─── DA# AI Powered Pack ─── */
export const DA_AI_PACK = {
  name: 'DA# AI Powered Pack',
  headline: 'AI 기반 업무 프로세스 자동화를 통해 80% 이상 공수 절감 효과',
  features: [
    {
      title: 'ChatGPT 기반 데이터 표준화',
      desc: 'ChatGPT를 활용한 데이터 표준 자동화 기능 탑재 (DB 논리명 분석·변환, 업무 요구사항 분석 및 테이블·컬럼 자동 생성 등), 데이터 표준사전생성·출력 자동화',
    },
    {
      title: 'ChatGPT 기반 모델 현행화',
      desc: '모든 종류의 SQL을 분석하여 쉽고 정확한 관계 분석을 통한 모델 현행화 자동화',
    },
    {
      title: 'ChatGPT 기반 비즈니스 분류',
      desc: 'AI 기반 누구나 빠르고 효과적으로 할 수 있는 비즈니스 분류 및 매핑',
    },
  ],
};

/* ─── DA# Contents Builder Edition ─── */
export const DA_CONTENTS_BUILDER = {
  name: 'DA# Contents Builder Edition',
  desc: '자동 표준 분석, 표준 사전 컨텐츠 생성 패키지. 컬럼정의서로부터 단어/도메인 추출, 표준단어/도메인 등록을 자동화합니다.',
};

/* ─── DA# 통합 패키지 ─── */
export const DA_TOTAL_PACKAGE = {
  name: 'DA# 통합 패키지',
  slug: 'da-shop-total-package',
  tagline: '하나의 라이선스로 4개 제품 스펙 제공!',
  subtitle: '더욱 강력해진 데이터 자산화 솔루션',
  products: ['DA#', 'DA# AI Powered Pack', 'DA# DQ Edition', 'DA# Contents Builder'],
  solutions: [
    { num: '01', title: '데이터 모델링의 Full Spec 제공', desc: '' },
    { num: '02', title: 'LLM 기반의 자동화 기능 제공', desc: '' },
    { num: '03', title: '공공데이터 품질관리 수준평가 대응', desc: '' },
    { num: '04', title: '데이터 표준화 과정의 자동화', desc: '' },
  ],
};

/* ─── DA# Repository ─── */
export const DA_REPOSITORY = {
  name: 'DA# Repository',
  desc: '통합 모델링의 시작. Server 기반 팀 모델링 환경을 제공합니다.',
  requirements: {
    server: 'Linux 계열 (Rocky 9.x 권장), PostgreSQL 14 이상, 디스크 1.5GB 이상',
  },
};

/* ─── DATAWARE 소개 ─── */
export const DATAWARE_OVERVIEW = {
  name: 'DATAWARE',
  slug: 'dataware',
  tagline: '기업의 DX와 AIX를 가속화하는 데이터 거버넌스 All-in-One Package',
  description: 'DATAWARE™ All-in-One Package는 엔코아가 제공하는 데이터 거버넌스 통합관리 솔루션으로 메타 데이터 관리, 데이터 품질관리, 영향도 관리에서 흐름 관리까지 데이터 거버넌스 구축을 위한 솔루션을 하나의 패키지로 제공합니다.',
  components: [
    { key: 'portal', name: 'Portal', product: 'DP#', desc: '데이터 포털', features: ['IT메타/Biz 메타에 대한 통합 검색', '전사 데이터 관리 현황 대시보드', '인기 검색어/데이터셋 등 다양한 통계 정보', '댓글, 게시판, Q&A 등 커뮤니케이션 채널'] },
    { key: 'meta', name: 'Meta', product: 'META#', desc: '메타 정보 관리', features: ['DB 카탈로그 수집 및 추적 관리', '데이터 모델-DB Gap 분석', '표준-모델-구조 간의 연관정보 분석', '범정부 중앙 메타시스템 연계'] },
    { key: 'quality', name: 'Quality', product: 'DQ#', desc: '데이터 품질 관리', features: ['품질관리를 위한 다계층 구조 지원', '오류 데이터 원인 분석 및 개선 관리', '모델링 도구 및 메타데이터 기능 연계', '안정적인 대용량 데이터 처리'] },
    { key: 'flow', name: 'Flow', product: 'DF#/AP#', desc: '흐름 및 영향도 분석', features: ['DB에서 소스코드까지 데이터 흐름 시각화', 'DB 및 소스코드 간 매트릭스 분석', 'SQL, 문자열, 주석, DB오브젝트 검색', 'DB별 다양한 통계 및 보고서 제공'] },
  ],
  coreFeatures: [
    '최적의 End-to-End 데이터 거버넌스 관리 체계 제공',
    '메타/품질/영향도 솔루션을 하나의 패키지로 제공',
    'Multi OS, Multi Browser 지원',
    '유기적 결합으로 모든 기능을 하나의 플랫폼으로 제공',
    '전자정부 프레임워크 호환성 제공',
    '국제 웹 표준 준수 웹기반 관리 포털',
    'On-Premise / Cloud 환경 최적화',
    '개별 솔루션은 플러그인 형태로 별도 장착 가능',
  ],
  coreValues: [
    { title: '데이터 라이프 사이클 통합 패키지', desc: '고객 환경과 요구사항에 맞춰 데이터 거버넌스를 구성하는 모든 기능들을 하나의 통합 제품군으로 제공' },
    { title: '조직의 데이터 리터러시 향상', desc: '조직 전체에서 데이터의 가치를 극대화하고 데이터 리터러시를 향상시키는 핵심적인 역할을 수행' },
    { title: '데이터에 대한 가시성 확보', desc: '표준/모델/품질/흐름 및 영향도 분석과 데이터 포털을 활용해 데이터 관리 영역 전체에 대한 가시성 확보' },
  ],
};

/* ─── META# ─── */
export const META_SHARP = {
  name: 'META#',
  slug: 'meta-sharp',
  tagline: '데이터 거버넌스 메타 데이터 관리 시스템',
  subtitle: '효율적이고 체계적인 메타 데이터 관리를 통해 고품질의 데이터를 활용할 수 있는 최적의 시스템 구축을 지원합니다.',
  certification: 'GS인증 1등급',
  description: '데이터 표준 관리, 데이터 구조 관리, DBMS 정보 관리, 데이터 메타 영향 분석 등의 기능을 통하여 데이터 구조의 전 단계를 일관성 있게 통제 및 관리할 수 있도록 지원하는 도구입니다. 모델링 도구와 편리한 연계를 통한 데이터 구조 관리 기능을 지원하여 생산성을 높이고, 데이터 변경에 따른 영향도 정보를 제공하여 시스템 운영 시 안정성을 향상시킬 수 있는 체계적인 메타데이터 관리 시스템입니다.',
  strengths: [
    { category: '연계 및 확장성', items: ['다양한 플랫폼(OS, 브라우저)을 지원하는 웹 기반의 GS인증 1등급 획득 솔루션', '범정부 데이터플랫폼과 연계 자동화', '모델링 도구, AP#, DQ#, 데이터 흐름관리 등 다양한 시스템과의 연계 자동화'] },
    { category: '프로세스 관리', items: ['표준부터 모델, DB 반영까지의 모든 메타데이터에 대한 라이프사이클 관리'] },
    { category: '편의성', items: ['모든 메타데이터의 엑셀 일괄 업로드 및 다운로드 기능 제공', '메타 데이터의 다양한 현황 정보 제공', '표준 항목 형태소 분석(자동 분할) 및 추천 기능'] },
  ],
  integrations: ['DA#', 'AP#', 'DQ#', 'DF#', '범정부 중앙 메타시스템'],
  featuresSummary: '체계적인 메타 데이터 관리는 물론 데이터 모델링 도구와의 편리한 연계로 개발 생산성 제고',
  architectureCaption: '편리한 메타 데이터 관리는 물론 DATAWARE™ 각 솔루션과의 유연한 연계를 지원하는 아키텍처',
  screenshotCaption: '웹 기반의 가시적인 포탈 화면 제공으로 편리한 메타 데이터 관리',
  features: [
    { num: '01', title: '데이터 표준 관리', desc: '멀티 표준분류체계 별 표준 사전 관리, 표준단어/도메인/용어/금칙어 관리' },
    { num: '02', title: '데이터베이스 정보 관리', desc: 'DDL 생성 지원, DB 스키마 수집, 개발/테스트/검증/운영 DB 관리' },
    { num: '03', title: '데이터 구조 관리', desc: '주제영역/데이터모델 관리, DA Alignment, 구조 품질 검증, 모델 Viewer' },
    { num: '04', title: '영향도 분석', desc: '메타데이터 간 연관정보 분석, 표준 준수율, 표준/모델/DB 간 갭 분석' },
    { num: '05', title: '관리자 기능', desc: 'DB 수집 스케줄러, 사용자/권한/메뉴/역할 관리' },
    { num: '06', title: '연계 및 확장성', desc: '중앙 메타 연계, 모델링 도구/AP#/DQ# 등 다양한 시스템 연계 자동화' },
  ],
};

/* ─── DQ# ─── */
export const DQ_SHARP = {
  name: 'DQ#',
  slug: 'dq-sharp',
  tagline: '데이터 거버넌스, 데이터 품질관리 솔루션',
  subtitle: '산재되어 있는 기업 데이터의 지속적인 품질 관리로 데이터 가치 향상을 지원합니다.',
  certification: 'GS인증 1등급',
  publicDataSupport: '공공데이터 품질관리 수준평가 지원',
  description: '기업에서 운영하는 정보 시스템의 확장과 복잡도의 증가로 발생하는 데이터의 부정확성, 중복성, 불일치성 등의 품질 이슈를 전사적인 관점에서 체계적으로 관리하여 기업의 데이터가 실질적인 자산이 될 수 있도록 지원합니다.',
  strengths: [
    { category: '연계 및 확장성', items: ['다양한 플랫폼(OS, 브라우저)을 지원하는 웹 기반의 GS인증 1등급 획득 솔루션', '모델링 도구, AP#, META#, 데이터 흐름관리 등 다양한 시스템과의 연계 자동화', '공공데이터 품질관리 수준평가 지원'] },
    { category: '대용량 데이터 처리', items: ['대용량 DB 기술을 적용하여 프로파일링, BR 검증 등 대용량 데이터 처리를 빠르고 안정적으로 수행'] },
    { category: '효율적인 품질관리', items: ['품질 기준 정의부터 결과 분석, 오류 개선까지 통합 관리', '품질 현황, 등록 현황 등 다양한 현황 정보 제공', '메타데이터 및 모델링 도구 연계를 통한 메타데이터 기반 품질 관리'] },
  ],
  integrations: ['DA#', 'META#', 'AP#', 'DF#'],
  featuresSummary: '데이터 품질 관리를 위한 편리한 기능과 가시적인 품질 현황 모니터링 기능 제공',
  architectureCaption: '명확한 데이터 품질 관리 기준을 적용함은 물론 다양한 OS, 브라우저를 지원하는 웹 기반 솔루션',
  screenshotCaption: '지속적인 데이터 품질 관리와 가시적인 모니터링으로 언제나 최적의 데이터 품질 확보',
  features: [
    { num: '01', title: '데이터 품질 관리기준 정의', desc: '다계층 구조 지원, DQI/CTQ 관리, Role 기반 권한 관리' },
    { num: '02', title: '프로파일링 및 업무 규칙 관리', desc: '통계적 분석 프로파일링, 모델 정보 활용 일괄 등록' },
    { num: '03', title: '지속적인 품질개선 관리', desc: '스케줄링 등록, 주기적 데이터 품질 측정 지원' },
    { num: '04', title: '데이터 품질 오류 원인 분석', desc: '오류 원인 분석/개선 관리, 기준별 오류 현황 제공' },
    { num: '05', title: '데이터 품질 측정 결과 분석', desc: 'CTQ/DQI/BR별 품질 현황 및 추이 분석 차트 제공' },
  ],
};

/* ─── AP# ─── */
export const AP_SHARP = {
  name: 'AP#',
  slug: 'ap-sharp',
  tagline: '데이터 거버넌스 애플리케이션 영향도 분석 솔루션',
  subtitle: '기업의 다양한 데이터베이스와 애플리케이션 간의 명확한 상호 영향도 분석으로 효율적인 유지보수 체계를 지원합니다.',
  certification: 'GS인증 1등급',
  description: '시스템의 데이터베이스 카탈로그 정보와 다양한 프로그래밍 언어의 애플리케이션 소스 코드를 AP# 솔루션이 운영 관리하는 단일/통합 저장소에 자동 수집 및 분석하여 이들 간의 정확한 구조와 연관 정보를 제공하는 솔루션입니다. AP#을 통해 애플리케이션 소스 및 데이터베이스 변경에 따른 위험 예방, AS-IS 분석 비용 절감, 업무 효율성 향상 등 효율적인 유지보수 체계를 확보할 수 있습니다.',
  strengths: [
    { category: '연계 및 확장성', items: ['다양한 플랫폼(OS, 브라우저)을 지원하는 웹 기반의 GS인증 1등급 획득 솔루션', '모델링 도구, META#, DQ#, 데이터 흐름관리 등 다양한 시스템과의 연계 자동화', '다양한 차세대 시스템 프레임워크 분석 기술 보유 (AnyFrame, SynergeFrame, Proframe, EJB, 데본 등)'] },
    { category: '편의성', items: ['영향 분석에 대한 다양한 통계 및 보고서 제공', 'Web 기반으로 사용자 접근성 향상 및 관리 편의성 향상', 'HTML5 지원 및 다양한 브라우저 지원'] },
    { category: '성능 및 안정성', items: ['UNIX 서버 프로그램, 빠르고 안정적인 시스템 최적화된 분석 엔진', 'WAS의 Context를 활용한 배포 및 서비스 제공으로 타 SW에 영향 최소화'] },
  ],
  integrations: ['META#', 'DQ#', 'DF#', 'DA#'],
  featuresSummary: '애플리케이션 소스 분석은 물론 다양한 검색 및 보고 기능으로 편의성 극대화',
  architectureCaption: '독립성과 확장성 동시 지원으로 유연한 아키텍처 제공',
  screenshotCaption: 'DB에서 소스코드까지 영향도 분석',
  features: [
    { num: '01', title: '소스 영향 분석', desc: '기본/통계 정보, UDP, SQL 정보, 클래스 다이어그램, Include/Import, 함수/파일/DB 영향도 분석' },
    { num: '02', title: '매트릭스 분석', desc: '소스-소스 포함관계, 소스-함수 호출관계, 클래스 상속관계, 소스-테이블 CRUD 매트릭스' },
    { num: '03', title: '다양한 검색 기능', desc: 'DB 오브젝트, 소스 객체, SQL, 문자열, 주석 등 다양한 검색' },
    { num: '04', title: '보고서 및 산출물', desc: 'PDF, 엑셀 등 통계 보고서 및 산출물 제공' },
  ],
};

/* ─── DF# ─── */
export const DF_SHARP = {
  name: 'DF#',
  slug: 'df-sharp',
  tagline: '데이터 흐름 관리 솔루션',
  subtitle: '기업의 시스템과 데이터의 흐름을 종합적으로 추적하여 분석 결과를 비즈니스에 활용할 수 있도록 지원합니다.',
  description: '기업의 중요한 자산인 시스템 및 데이터의 흐름을 종합적으로 추적하기 위해 복잡한 전사 데이터 구조를 종합적으로 수집 및 분석하여 체계적이고 효율적으로 관리하는 데이터 흐름 분석 솔루션입니다.',
  strengths: [
    { category: '연계 및 확장성', items: ['다양한 플랫폼(OS, 브라우저)을 지원하는 웹 기반 솔루션', '모델링 도구, META#, AP#, DQ# 등 다양한 시스템과의 연계 자동화', 'CDC, ETL, EAI, ESB, 대외 연계 데이터 흐름 시각화'] },
  ],
  integrations: ['META#', 'AP#', 'DQ#', 'DA#'],
  featuresSummary: '데이터의 Lineage 분석에서 연계 분석까지 편리하게 확인할 수 있는 편의 기능 제공',
  architectureCaption: '분석에서 모니터링, 솔루션 연계가 가능한 유연한 아키텍처',
  screenshotCaption: '엔터프라이즈 시스템의 데이터 흐름을 종합적으로 분석 모니터링',
  features: [
    { num: '01', title: '데이터 구조 추출 및 Lineage 분석', desc: '데이터 흐름 정보를 매핑 정의서 등록, 모델 기반 매핑, 수집기 개발 등으로 분석' },
    { num: '02', title: 'DBMS 및 시스템 영향분석', desc: 'DB 오브젝트를 사용하는 시스템간 영향도 분석' },
    { num: '03', title: 'CDC/ETL/EAI/ESB 데이터 흐름 시각화', desc: '정보자산간 데이터 흐름의 기준 정보 수집 및 분석' },
    { num: '04', title: '애플리케이션 영향도 연계 분석', desc: '정보 자산과 애플리케이션 서비스의 연관 관계 분석' },
    { num: '05', title: '데이터 모델 및 품질 연계 분석', desc: '데이터 모델과 품질 항목의 데이터 흐름 확인' },
    { num: '06', title: '데이터 흐름 종합 모니터링', desc: '가시적인 시각화로 편리한 모니터링' },
  ],
};

/* ─── ETT# ─── */
export const ETT_SHARP = {
  name: 'ETT#',
  slug: 'ett-sharp',
  tagline: '초고속 데이터 마이그레이션 솔루션',
  subtitle: '이기종 데이터, RDBMS, NoSQL, Cloud까지 기업 시스템 간의 데이터 마이그레이션을 효율적으로 지원합니다.',
  description: '일반적인 ETL 솔루션과 달리 데이터의 추출, 변환, 적재 및 검증을 효과적이고 안정적으로 처리하여, 기업의 데이터를 필요한 요소에 적시에 제공함으로써 데이터의 분석 및 활용을 용이하게 하여 기업 자산으로써의 데이터 가치를 높여줍니다. 차세대 시스템 구축을 위한 데이터 이행 및 Cloud 마이그레이션을 위한 고가용성 데이터 통합 도구로써도 공급됩니다.',
  strengths: [
    { category: 'DA# 연계', items: ['DBMS 리버스(Reverse)를 통한 모델 및 TOBE 모델 연동 가능', 'TOBE 모델 및 컬럼 정보 변경 시 자동 체크 가능'] },
    { category: 'META# 연계', items: ['ASIS/TOBE 코드 매핑 기능을 활용한 코드 검증 연계 가능'] },
    { category: '고속 데이터 처리', items: ['Text(fixed width, delimiter), XML, XLS, 상용DBMS(국산 DB 포함) 등 다양한 소스로부터 고속 추출 및 적재'] },
  ],
  integrations: ['DA#', 'META#'],
  featuresSummary: '고속 데이터 추출과 적재의 안정적 처리를 위한 독자적인 기능과 성능 제공',
  architectureCaption: 'DBMS는 물론 다양한 파일까지 빠르고 정확한 이행 지원',
  screenshotCaption: '직관적인 GUI 환경 제공으로 데이터의 Extract, Transform, Load 전 프로세스를 효율적으로 관리',
  features: [
    { num: '01', title: '소스-타겟 간의 매핑 정의', desc: '데이터의 추출, 변환, 적재 및 검증을 효과적이고 안정적으로 처리' },
    { num: '02', title: '다양한 데이터 변환 기능', desc: '1:1/컬럼통합/서브/로우 통합, 사용자 정의 중심의 데이터 변환' },
    { num: '03', title: '다양한 실행 방식 및 실시간 모니터링', desc: '직접실행/스케줄링/API 방식, 실시간 모니터링' },
  ],
};

/* ─── DP# ─── */
export const DP_SHARP = {
  name: 'DP#',
  slug: 'dp-sharp',
  tagline: '데이터 거버넌스 기반의 데이터 포털 솔루션',
  subtitle: '기업 데이터 활용 극대화를 위한 데이터 포털의 효율적인 구축을 지원합니다.',
  description: '효율적인 기업의 데이터 포털 구축을 위한 솔루션으로 손쉬운 데이터 탐색, 요청, 분석 및 활용을 가능하게 합니다. IT 관리자는 물론 일반 사용자까지 데이터 관리와 활용이 가능하며 Cloud에서 On-Premise 환경까지 다양한 고객의 IT환경을 지원합니다.',
  strengths: [
    { category: '현업 담당자를 위한 포털 환경', items: ['직관적인 비즈니스 분류와 용어 검색 및 데이터 활용', '데이터 카탈로그, 통합 검색, 데이터 신청, 작업 요청, 오류 신고를 하나의 패키지로 제공', '각종 사용자 커뮤니케이션 및 정보 전달을 위한 유기적 기능 제공'] },
    { category: '최적의 데이터 관리를 위한 확장성', items: ['DA#, META#, DQ#, AP#, DF# add-in 연계 지원', 'ITSM/SSO/전자결재, 기타 시스템 연동', 'JDBC 표준 인터페이스를 지원하는 모든 종류의 RDB 및 NoSQL DBMS 지원'] },
  ],
  integrations: ['DA#', 'META#', 'DQ#', 'AP#', 'DF#', 'ITSM/SSO/전자결재', 'DV# add-in', 'SQL# add-in'],
  featuresSummary: '효율적인 데이터 작업을 위한 기능과 편리한 데이터 활용을 위한 통합 검색 기능 제공',
  architectureCaption: '다양한 데이터 전문 솔루션과의 유연한 연계로 효율적인 데이터 포털 구축',
  screenshotCaption: '기업 데이터 활용을 극대화하는 데이터 포털의 효율적 구축',
  features: [
    { num: '01', title: '데이터 통합 검색', desc: '통합검색, 데이터 제공 요청, 오류 신고, 수요 조사' },
    { num: '02', title: '데이터 작업', desc: '표준변경/모델변경/DB객체변경 신청, DB계정/접근권한 신청' },
    { num: '03', title: '데이터 맵', desc: '시스템별/업무분류별 데이터 현황 데이터맵 제공' },
    { num: '04', title: '데이터 산출물', desc: '실시간 산출물 제공, 프로젝트 검수~운영까지 산출물' },
  ],
};

/* ─── 제품 라인업 (GNB 메뉴 순서) ─── */
export const PRODUCT_LINEUP = [
  { name: 'DA#', slug: 'da-shop', subtitle: '데이터 모델링', isNew: false },
  { name: 'DA# 통합 패키지', slug: 'da-shop-total-package', subtitle: '4-in-1 패키지', isNew: false },
] as const;

/* ─── DATAWARE 라인업 (TO-BE, 엔코아 기반 신규) ─── */
export const DATAWARE_LINEUP = [
  { name: 'DATAWARE', slug: 'dataware', subtitle: 'All-in-One Package', isNew: false },
  { name: 'DA#', slug: 'da-sharp', subtitle: '데이터 모델링', isNew: false },
  { name: 'META#', slug: 'meta-sharp', subtitle: '메타데이터 관리', isNew: true, gs: true },
  { name: 'DQ#', slug: 'dq-sharp', subtitle: '데이터 품질관리', isNew: true, gs: true },
  { name: 'AP#', slug: 'ap-sharp', subtitle: '애플리케이션 영향도 분석', isNew: true, gs: true },
  { name: 'DF#', slug: 'df-sharp', subtitle: '데이터 흐름 관리', isNew: true },
  { name: 'ETT#', slug: 'ett-sharp', subtitle: '데이터 마이그레이션', isNew: true },
  { name: 'DP#', slug: 'dp-sharp', subtitle: '데이터 포털', isNew: true },
] as const;
