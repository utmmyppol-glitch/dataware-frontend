export interface Notice {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  thumbnail: string;
}

export const NOTICES: Notice[] = [
  {
    id: 1,
    slug: 'da-dq-edition-g2b',
    title: 'DA#_DQ_Edition 조달청 나라장터 등록',
    date: '2021-11-22',
    excerpt: 'DA#-DQ# 패키지로 구성해 데이터 표준화 기반의 체계적인 품질진단 지원. 공공데이터 품질관리 수준평가에 대응하기 위한 최적의 툴 제공.',
    content: '데이터 비즈니스 전문기업 엔코아(대표 이화식)가 자사의 \'데이터웨어 디에이샵 디큐에디션(DATAWARE DA#_DQ Edition)\'이 조달청 나라장터에 등록되었다고 밝혔다.\n\nDA#_DQ Edition은 데이터 모델링 툴 DA#과 데이터 품질관리 솔루션 DQ#의 품질진단 기능을 하나의 패키지로 구성한 제품이다.\n\n최근 데이터 표준화와 데이터 품질관리는 데이터 관리 프로세스의 기반이 되는 필수 항목으로, DA#_DQ Edition은 데이터 표준화 기반의 체계적인 품질진단을 지원하며 공공데이터 품질관리 수준평가에 대응하기 위한 최적의 툴을 제공한다.\n\n편리한 모델링 기능과 강력한 품질진단 기능을 하나의 패키지에서 사용할 수 있어 도입 비용 절감과 운영 효율성 향상이 가능하다.',
    thumbnail: '/images/uniondata/0.png',
  },
  {
    id: 2,
    slug: 'review-da-dq-edition',
    title: '[리뷰] 데이터 품질진단 DA# DQ_Edition',
    date: '2021-06-02',
    excerpt: '데이터 모델링과 품질진단 자동화로 관리 효율성 향상. 코로나19 팬데믹 사태로 비대면 활성화와 클라우드 활용이 필수적인 시대.',
    content: '지속되고 있는 코로나19 팬데믹 사태는 비즈니스 환경을 빠르게 변화시키고 있다. 비대면이 활성화되고 재택근무가 일상이 되면서 정보를 공유할 수 있는 클라우드의 활용은 필수적이 되었고, 공유된 정보와 온라인상에서 정보 보호를 위하여 개인정보보호를 위한 컴퓨팅도 많이 활용되고 있다.\n\n엔코아가 제안하는 디에이샵 디큐 에디션은 데이터 모델링과 품질진단을 한 번에 지원하는 솔루션으로 데이터 모델링 툴 DA#과 데이터 품질관리 솔루션 DQ#의 품질진단 기능을 하나의 패키지로 구성한 제품이다.\n\n출처: IT DAILY',
    thumbnail: '/images/uniondata/0-1.png',
  },
  {
    id: 3,
    slug: 'review-da-sharp',
    title: '[리뷰] 데이터모델링 DA#',
    date: '2021-06-01',
    excerpt: '차세대 프로젝트에서 단위 업무 모델링까지, 개발 생산성과 성능 제고. 데이터 비즈니스의 기본, 데이터 모델링 툴.',
    content: '체계적인 기업의 데이터 품질 관리는 데이터 모델링에서 시작된다. DA#은 차세대 프로젝트에서 단위 업무 모델링까지 폭넓게 활용되며, 개발 생산성과 성능을 높이는 핵심 도구이다.\n\n다중 DBMS 지원, Undo/Redo 편집, 다양한 형태의 산출물 제공 등 편의성을 갖추고 있으며, Repository 기반 팀 모델링과 웹 실시간 VIEW 기능으로 협업 생산성을 극대화한다.\n\n출처: IT DAILY',
    thumbnail: '/images/uniondata/0000.png',
  },
  {
    id: 4,
    slug: 'da-dq-edition-gs-cert',
    title: 'DA# DQ_Edition GS인증 1등급',
    date: '2021-05-30',
    excerpt: '엔코아가 데이터 표준화 기반 데이터 품질진단 솔루션 DA# DQ Edition이 굿소프트웨어(GS)인증 1등급을 획득했다고 밝혔다.',
    content: '엔코아(대표 이화식)가 데이터 표준화 기반 데이터 품질진단 솔루션 \'디에이샵 디큐 에디션(DA# DQ_Edition)\'이 굿소프트웨어(GS)인증 1등급을 획득했다고 밝혔다.\n\nGS인증은 한국정보통신기술협회(TTA)가 소프트웨어의 기능성, 신뢰성, 효율성, 사용성, 유지보수성, 이식성 등 국제표준(ISO/IEC 25023) 기반 품질특성을 시험하여 인증하는 제도로, 1등급은 최고 등급이다.\n\nDA# DQ_Edition은 데이터 모델링과 품질진단을 하나의 패키지로 제공하여 데이터 관리의 효율성을 극대화한 제품이다.',
    thumbnail: '/images/uniondata/0000-1.png',
  },
  {
    id: 5,
    slug: 'da-sharp-renewal-open',
    title: '유니온시스템즈 DA# 리뉴얼 오픈',
    date: '2021-05-01',
    excerpt: '넓어진 화면, 모바일 검색, 디지털 환경 변화에 맞춰 정보를 전달하는데 기존 홈페이지는 부족함이 있었습니다.',
    content: '넓어진 화면, 모바일 검색, 디지털 환경 변화에 맞춰 정보를 전달하는데 기존의 홈페이지는 부족함이 있었습니다.\n\n이번 리뉴얼을 통해 DA#과 DA# DQ_Edition 기능, 모델링도구 팁과 활용법, 칼럼, 온&오프라인 참여 가능한 교육 등 다양한 정보를 보다 쉽게 확인하실 수 있습니다.\n\n앞으로도 유니온시스템즈는 고객 여러분께 더 나은 서비스를 제공하기 위해 지속적으로 노력하겠습니다.',
    thumbnail: '/images/uniondata/board__notice.png',
  },
  {
    id: 6,
    slug: 'encore-unionsystems-dealer-agreement',
    title: '엔코아·유니온시스템즈 DA# 총판 협약',
    date: '2021-02-24',
    excerpt: '엔코아가 데이터 통합관리 솔루션 DATAWARE 주력 제품인 데이터 모델링 툴 DA# 시장 확대를 위해 유니온시스템즈와 총판 협약을 체결했다.',
    content: '엔코아(대표 이화식)가 데이터 통합관리 솔루션 \'데이터웨어(DATAWARE)\' 주력 제품인 데이터 모델링 툴 \'디에이샵(DA#)\' 시장 확대를 위해 유니온시스템즈와 총판 협약을 체결했다.\n\n이번 총판 협약을 통해 유니온시스템즈는 DA# 및 DATAWARE 제품군의 판매, 기술지원, 교육 등 전반적인 비즈니스를 담당하게 된다.\n\n엔코아 이화식 대표는 "유니온시스템즈는 데이터 거버넌스 분야에서 풍부한 경험과 전문성을 보유한 파트너로, 이번 협약을 통해 DA# 제품의 시장 확대와 고객 서비스 강화에 큰 시너지가 기대된다"고 전했다.',
    thumbnail: '/images/uniondata/board__notice.png',
  },
];
