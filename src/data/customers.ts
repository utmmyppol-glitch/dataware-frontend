/**
 * 고객사례 데이터 — 원본 uniondata.co.kr 기준
 */

export type IndustryFilter = 'All' | '공공기관' | '금융' | '유통';

export const INDUSTRY_FILTERS: IndustryFilter[] = ['All', '공공기관', '금융', '유통'];

/* ─── 고객사례 상세 타입 ─── */
export interface CustomerDetail {
  companyDesc: string;
  pageHeading: string;
  background: string[];
  features?: string[];
  effects: string[];
  quote: string;
  quoteSource?: string;
  meta: {
    date: string;
    industry: string;
    purpose: string;
  };
}

/* ─── 고객사례 목록 ─── */
export const CUSTOMER_STORIES = [
  {
    company: '오늘의집',
    industry: '유통' as const,
    slug: 'ohouse',
    summary: '명확한 데이터 표준 관리와 품질관리로 사용자에게 보다 편리하고 최적의 고객 경험을 제공하기 위해 DA# DQ_Edition을 도입',
    detail: {
      companyDesc: '올인원 라이프 스타일 플랫폼 오늘의집 운영사 버킷플레이스',
      pageHeading: '버킷플레이스, 데이터 품질진단 솔루션 공급',
      background: [
        '컨텐츠/커머스/커뮤니티 유기적으로 결합된 서비스',
        '회원 수와 빠르게 증가하는 데이터 관리',
      ],
      features: ['DA# DQ_Edition'],
      effects: [
        '명확한 데이터 표준 관리, 품질관리',
        '개발 생산성, 편의성 제고, 데이터 의사결정 활용',
      ],
      quote: '버킷플레이스 관계자는 "명확한 데이터 표준 관리와 품질관리로 사용자에게 보다 편리하고 최적의 고객 경험을 제공하기 위해 DA# DQ_Edition을 도입하게 됐다"며 "데이터 모델링과 품질진단을 하나의 패키지 도입으로 해결할 수 있어 효율적으로 활용할 수 있을 것으로 기대하고 있다"고 전했다.',
      quoteSource: '디지털데일리',
      meta: {
        date: '2021-11-26',
        industry: '유통',
        purpose: '그룹웨어, 데이터 효과적 활용 기반 마련',
      },
    } as CustomerDetail,
  },
  {
    company: 'SSG닷컴',
    industry: '유통' as const,
    slug: 'ssg',
    summary: '데이터를 설계하여 구성원들이 데이터를 비즈니스에 활용하는 것이 데이터모델링의 목적이다.',
    detail: {
      companyDesc: '신세계 그룹의 온라인 쇼핑 포털 SSG닷컴을 운영하는 이커머스 기업',
      pageHeading: 'SSG닷컴이 데이터를 활용하는 법',
      background: [
        '방대한 데이터의 수집·저장·통합·활용 등 전 과정을 효과적으로 관리의 필요성',
        '따로 운영되던 유통 서비스를 단일 채널로 통합하기 위한 용어 표준화 필요',
      ],
      features: [
        'DA#, DQ#, META# 을 통한 서비스 단일채널 통합',
        '용어 표준화, 전사 데이터 현행화·표준화',
      ],
      effects: [
        '기획팀 – 개발팀 소통 원활화',
        '데이터 효과적 활용 기반마련',
        '데이터 품질 향상',
        '계보 관리로 향상된 데이터 프로세스 마련',
      ],
      quote: '데이터의 품질을 높이고, 데이터베이스를 설계하여 구성원들이 데이터를 비즈니스에 활용하는 것이 데이터모델링의 목적이다. DB관리는 무엇보다 다른 조직과의 소통을 통한 어떤 것을 필요로 하고, 어떤 것들을 제공하는지 협의하는 것이 중요하다.\n\nSSG닷컴은 2017년에는 \'대한민국 데이터 품질대상\'에서 과학기술정보통신부 장관상(대상)을 수상했으며, 한국데이터진흥원이 수행하는 \'데이터품질관리인증(DQC-M)\' 3레벨을 획득하고 품질 관리 모범 사례로 선정되기도 했다.',
      quoteSource: '컴퓨터월드',
      meta: {
        date: '2021-11-11',
        industry: '유통',
        purpose: '그룹웨어, 데이터 효과적 활용 기반 마련',
      },
    } as CustomerDetail,
  },
  {
    company: '한국수자원공사',
    industry: '공공기관' as const,
    slug: 'kwater',
    summary: '데이터 관리 포털 구축 프로젝트는 여타 다른 기업·기관의 프로젝트에 비해 요구사항도 많고 필요한 기능이 많았다.',
    detail: {
      companyDesc: '국내의 모든 수자원 관리를 담당하는 환경부 산하 공기업',
      pageHeading: '한국수자원공사, 데이터 관리 포털 구축',
      background: [
        '현업 담당자들에게 객관적인 데이터 관련 서비스 제공',
        '데이터모델 기반 테이블 변경 관리 체계를 구축하여 데이터 구조 품질확보',
        '비즈니스 분류 관리 및 시스템/DB서버/테이블/컬럼의 메타데이터를 관리하는 데이터 전문 솔루션 도입',
      ],
      effects: [
        '개발 생산성, 편의성 제고, 데이터 활용 극대화',
        '데이터모델(ERD) 기반 테이블 변경 프로세스 구축',
        'IT부서 중심의 DB를 다양한 사용자가 활용할 수 있도록 시스템 구축',
      ],
      quote: '정보화 사업은 힘들고 어려운 프로젝트다. 수자원공사가 진행한 데이터 관리 포털 구축 프로젝트는 여타 다른 기업·기관의 프로젝트에 비해 요구사항도 많고 필요한 기능이 많았다.\n\n표준화된 고품질 데이터는 어느 순간 아무런 준비 없이 얻어지는게 아니다. 충분한 준비를 해야만 좋은 데이터를 확보할 수 있다. 생성 시점부터 잘 관리될 수 있도록 적절한 체계를 갖춰야 하고, 이것이 구성원 모두에게 내재돼야 한다.',
      quoteSource: '컴퓨터월드',
      meta: {
        date: '2021-11-11',
        industry: '공공기관',
        purpose: '데이터 효과적 활용 기반 마련, 프로세스 구축',
      },
    } as CustomerDetail,
  },
  {
    company: '아모레퍼시픽',
    industry: '유통' as const,
    slug: 'amore',
    summary: '현장의 영업, 마케팅, 생산자가 데이터를 활용하여 의사결정과 업무에 활용할 수 있도록 하는 것이 목표다.',
    detail: {
      companyDesc: '화장품, 생활용품, 건강식품 등을 생산, 판매하는 대한민국 대표적인 화장품 기업',
      pageHeading: '아모레퍼시픽, 메타데이터 관리체계 고도화',
      background: [
        '전사 데이터 표준 및 모델관리 프로세스 개선과 시스템 구축',
        '시스템 운영 수준 향상 및 장기적인 고품질 데이터 체계 기반 마련',
        '효율적인 데이터 활용 및 분석을 위한 데이터 기반 비즈니스 의사결정 시스템 구축',
      ],
      features: [
        'DATAWARE의 DA#, META# 활용',
        '데이터 아키텍트, 데이터 설계·표준화·모델링 자체 수행',
      ],
      effects: [
        '필요한 시점 데이터를 분석해 실시간 의사결정 도출 기반마련',
        '데이터 리터러시 구축으로 마케팅, 영업 경쟁력 강화',
      ],
      quote: '데이터를 자체적으로 분석하고 다루는 환경이 안 되면 데이터 기반 영업과 마케팅이 근본적으로 불가능한 시대가 됐다. 데이터 활용에 성공하려면 조직이 데이터 분석능력을 갖고 하부 데이터에 대한 제어권을 직접 갖는게 핵심이다.\n\n언택트·모바일·e커머스 시대가 되면서 데이터의 가치가 올라갔다. 서울에 사는 20대 후반 여성의 어제 구매형태를 알고 싶다거나, 지난번 마케팅 이벤트 참여한 사람들의 이후 행동과 매출성과를 바로 확인할 수 있어야 한다. 현장의 영업, 마케팅, 생산자가 데이터를 활용하여 의사결정과 업무에 활용할 수 있도록 하는 것이 목표다.',
      quoteSource: '디지털타임스',
      meta: {
        date: '2021-11-11',
        industry: '유통',
        purpose: '실시간 의사결정 도출 기반마련, 경쟁력 강화',
      },
    } as CustomerDetail,
  },
  {
    company: '현대해상',
    industry: '금융' as const,
    slug: 'hyundai-marine',
    summary: '메타데이터를 통한 애플리케이션, 정보, 시스템 관리와 비즈니스 의사결정에 데이터 활용',
    detail: {
      companyDesc: '1955년 3월 5일 설립, 1999년 현대그룹에서 분리된 해상보험 전업회사',
      pageHeading: '현대해상, 메타데이터 관리시스템 재구축',
      background: [
        '메타데이터 시스템의 노후화로 인한 유지보수 및 지원 부재',
        '운영인원 감소 및 관리대상 시스템 증가로 인한 효율적인 프로세스 필요',
      ],
      effects: [
        '메타데이터를 통한 애플리케이션, 정보, 시스템 관리',
        '축적된 데이터의 효율적 관리의 필요성 비즈니스 의사결정에 데이터 활용',
      ],
      quote: '단독으로 데이터 관리만을 위한 목적으로 메타데이터 관리솔루션 도입은 의미가 없다. 비즈니스 플로우를 통해 조직 내부에서 유동성 있게 데이터를 활용할 수 있는 환경 구축이 중요하다.\n\n네이숀스뱅크는 분단돼 있는 데이터를 효율적으로 관리하기 위해 메타데이터를 구축해 데이터를 기업의 지식베이스에 신속히 추가, 기업의 성장에 따른 정보를 원활히 흡수할 수 있도록 했다. 국내에서도 은행, 보험 등 금융권을 중심으로 데이터의 비즈니스 관점의 구축 및 필요성이 확산되고 있다.',
      meta: {
        date: '2021-11-10',
        industry: '금융',
        purpose: '그룹웨어, 데이터 효과적 활용 기반 마련',
      },
    } as CustomerDetail,
  },
  {
    company: '동양생명',
    industry: '금융' as const,
    slug: 'dongyang-life',
    summary: '',
  },
];

export const CLIENT_LOGOS = [
  { name: '오늘의집', key: 'todayHouse' },
  { name: 'SSG닷컴', key: 'ssg' },
  { name: '한국수자원공사', key: 'kwater' },
  { name: '아모레퍼시픽', key: 'amore' },
  { name: '현대해상', key: 'hyundaiMarine' },
  { name: '동양생명', key: 'dongyangLife' },
  { name: '롯데쇼핑', key: 'lotteShopping' },
  { name: 'KB생명', key: 'kbLife' },
  { name: 'LG유플러스', key: 'lgUplus' },
  { name: '카카오뱅크', key: 'kakaoBank' },
  { name: '현대카드', key: 'hyundaiCard' },
] as const;

/** 메인 페이지 TRUSTED BY 그리드용 — clients-logo-N.jpg 만 사용 (확실히 로드되는 파일들) */
export const TRUSTED_LOGOS = [
  { id: 'samsungElec', name: '삼성전자', image: '/images/uniondata/clients-logo-9.jpg', scale: 1.0 },
  { id: 'skHynix', name: 'SK hynix', image: '/images/uniondata/clients-logo-10.jpg', scale: 1.0 },
  { id: 'kotra', name: 'KOTRA', image: '/images/uniondata/clients-logo-7.jpg', scale: 1.0 },
  { id: 'kwater', name: '한국수자원공사', image: '/images/uniondata/clients-logo-8.jpg', scale: 1.0 },
  { id: 'mopaas', name: '행정안전부', image: '/images/uniondata/clients-logo-4.jpg', scale: 1.0 },
  { id: 'jodal', name: '조달청', image: '/images/uniondata/clients-logo-5.jpg', scale: 1.0 },
  { id: 'cheongwadae', name: '청와대', image: '/images/uniondata/clients-logo-6.jpg', scale: 1.0 },
  { id: 'bcCard', name: 'BCcard', image: '/images/uniondata/clients-logo-14.jpg', scale: 1.0 },
  { id: 'samsungCard', name: '삼성카드', image: '/images/uniondata/clients-logo-15.jpg', scale: 1.0 },
  { id: 'samsungFire', name: '삼성화재', image: '/images/uniondata/clients-logo-2.jpg', scale: 1.0 },
] as const;

/** 메인 페이지 카피 */
export const CUSTOMER_HEADLINE = '금융, 공공, 제조, 서비스, 유통, 교육, 병원이 DA#를 선택했습니다.';
