/**
 * 이미지 경로 매핑 — 원본 uniondata.co.kr 이미지를 로컬 경로로
 * public/images/uniondata/ 기준
 */

const BASE = '/images/uniondata';

export const IMAGES = {
  // ─── 로고 ───
  logo: `${BASE}/logo.png`,
  footerLogo: `${BASE}/footer_dadq-logo.png`,
  fLogo: `${BASE}/f-logo.png`,

  // ─── 퀵메뉴 아이콘 ───
  quickMenu: {
    download: `${BASE}/down_icon.png`,
    education: `${BASE}/quick-menu_free.png`,
    seminar: `${BASE}/quick-menu_visiting-edu.png`,
  },

  // ─── 메인 히어로: DA# ───
  hero: {
    da: {
      img: `${BASE}/main_01-da_img.png`,
      bg: `${BASE}/main_01-da_bg.png`,
      bg2: `${BASE}/main_01-da_bg-2.png`,
      advantage1: `${BASE}/main_01-da_advantage-1.png`,
      advantage2: `${BASE}/main_01-da_advantage-2.png`,
      advantage3: `${BASE}/main_01-da_advantage-3.png`,
    },
    dq: {
      img: `${BASE}/main_02-da-dq-edition_img.png`,
      bg: `${BASE}/main_02-da-dq-edition_bg.png`,
      bg2: `${BASE}/main_02-da-dq-edition_bg-2.png`,
      advantage1: `${BASE}/main_01-da-dq-edition_advantage-1.png`,
      advantage2: `${BASE}/main_01-da-dq-edition_advantage-2.png`,
      advantage3: `${BASE}/main_01-da-dq-edition_advantage-3.png`,
    },
  },

  // ─── 사용자 페르소나 ───
  persona: {
    modeller: `${BASE}/main_03_01-modeller.png`,
    da: `${BASE}/main_03_02-dba.png`,
    developer: `${BASE}/main_03_03-developer.png`,
  },

  // ─── DA# 선택하는 이유 인포그래픽 (메인) ───
  mainInfographic: Array.from({ length: 9 }, (_, i) =>
    `${BASE}/main_function_infographic-${String(i + 1).padStart(2, '0')}.png`
  ),

  // ─── AI Powered Pack ───
  ai: {
    main: `${BASE}/AI.png`,
    icon01: `${BASE}/icon01.png`,
    icon02: `${BASE}/icon02.png`,
    icon03: `${BASE}/icon03.png`,
  },

  // ─── 고객사 로고 (개별) ───
  clientLogos: {
    ssg: `${BASE}/${encodeURIComponent('쓱닷컴')}.png`,
    kwater: `${BASE}/${encodeURIComponent('한국수자원공사')}.png`,
    amore: `${BASE}/${encodeURIComponent('아모레퍼시픽')}.png`,
    todayHouse: `${BASE}/${encodeURIComponent('오늘의집')}-1.png`,
    hyundaiMarine: `${BASE}/${encodeURIComponent('현대해상')}.png`,
    dongyangLife: `${BASE}/${encodeURIComponent('수호천사동양생명')}.png`,
    lotteShopping: `${BASE}/${encodeURIComponent('롯데쇼핑')}.png`,
    kbLife: `${BASE}/KB${encodeURIComponent('생명')}.png`,
    kakaoBank: `${BASE}/${encodeURIComponent('카카오뱅크')}.png`,
    lgUplus: `${BASE}/LG${encodeURIComponent('유플러스')}.png`,
    hyundaiCard: `${BASE}/${encodeURIComponent('현대카드')}.png`,
  },

  // ─── 고객사 로고 배너 (섹션 이미지) ───
  clientLogoSections: [
    `${BASE}/main_06-clients_logo_section-1.jpg`,
    `${BASE}/main_06-clients_logo_section-2.jpg`,
    `${BASE}/main_06-clients_logo_section-3.jpg`,
    `${BASE}/main_06-clients_logo_section-4.jpg`,
  ],

  // ─── 번호 로고 (clients-logo-N.jpg) ───
  clientLogoNumbered: [2, 4, 5, 6, 7, 8, 9, 10, 14, 15].map(
    (n) => `${BASE}/clients-logo-${n}.jpg`
  ),

  // ─── 고객사례 상세 이미지 ───
  customerStory: {
    ssg: `${BASE}/clients_img_ssg.png`,
    kwater: `${BASE}/clients_img_kwater.png`,
    kwaterDetail: `${BASE}/clients_img_kwater-2.png`,
    amore: `${BASE}/clients_img_amore.png`,
    amoreDetail: `${BASE}/clients_img_amore-2.png`,
    hyundaiMarine: `${BASE}/clients_img_hyundai-marine.png`,
    hyundaiMarineDetail: `${BASE}/clients_img_hyundai-marine-2.png`,
    dongyangLife: `${BASE}/clients_img_tong-yang-life.png`,
    dongyangLifeDetail: `${BASE}/clients_img_tong-yang-life-2.png`,
  },

  // ─── CTA 섹션 ───
  cta: {
    consulting: `${BASE}/main_07_01-consulting.png`,
    introduction: `${BASE}/main_07_02-introduction.png`,
  },

  // ─── 다운로드 페이지 썸네일 ───
  download: {
    daIntro: `${BASE}/sub_04-download_da.png`,
    dqIntro: `${BASE}/sub_04-download_da_dq.png`,
    daPersonal: `${BASE}/sub_04-download_da_personal.png`,
    daBusiness: `${BASE}/sub_04-download_da_business.png`,
  },

  // ─── 가격 페이지 ───
  pricing: {
    architecture: `${BASE}/da_package_img.png`,
    totalPackage: `${BASE}/da-total-package-img.png`,
    repository: `${BASE}/da_repository_img.png`,
    naraJangter1: `${BASE}/3-1.jpg`,
    naraJangter2: `${BASE}/sub_04-price_procurement_img.png`,
    stepApply: `${BASE}/sub_03-consulting_step_icon-01.png`,
    stepReview: `${BASE}/sub_03-consulting_step_icon-02.png`,
    stepProposal: `${BASE}/sub_03-consulting_step_icon-03.png`,
  },

  // ─── DA# 제품 페이지 ───
  product: {
    stepAnalysis: `${BASE}/sub_01-da_step_01-icon.png`,
    stepDev: `${BASE}/sub_01-da_step_02-icon.png`,
    stepTest: `${BASE}/sub_01-da_step_03-icon.png`,
    stepOps: `${BASE}/sub_01-da_step_04-icon.png`,
    caseShopping: `${BASE}/customer_thumnail_shopping-mall.png`,
    caseStock: `${BASE}/customer_thumnail_stock.png`,
    caseBank: `${BASE}/customer_thumnail_bank.png`,
    arrow: `${BASE}/arrow_b.png`,
  },

  // ─── DA# 기능 인포그래픽 (제품 페이지) ───
  daInfographic: Array.from({ length: 9 }, (_, i) =>
    `${BASE}/sub_function-da_infographic-${String(i + 1).padStart(2, '0')}.png`
  ),

  // ─── DQ Edition 인포그래픽 (통합패키지 페이지) ───
  dqInfographic: Array.from({ length: 9 }, (_, i) =>
    `${BASE}/sub_function-dadq_infographic-${String(i + 1).padStart(2, '0')}.png`
  ),

  // ─── 통합 패키지 ───
  totalPackage: {
    mainImg: `${BASE}/main_02-da-total_package_img-2_129.png`,
    spec01: `${BASE}/sub_spec_icon_01_130.png`,
    spec02: `${BASE}/sub_spec_icon_02_131.png`,
    spec03: `${BASE}/sub_spec_icon_03_132.png`,
    spec04: `${BASE}/sub_spec_icon_04_133.png`,
    dqPackage: `${BASE}/da_dq_edition_package_img_137.png`,
    dqStep01: `${BASE}/sub_02-da-dq-edition_step_01-icon_134.png`,
    dqStep02: `${BASE}/sub_02-da-dq-edition_step_02-icon_135.png`,
    dqStep03: `${BASE}/sub_02-da-dq-edition_step_03-icon_136.png`,
    groupTable: `${BASE}/sub_02-da-dq-edition_group-table_138.png`,
  },

  // ─── 교육 관련 ───
  education: {
    easyTool: `${BASE}/education-list_img-01.png`,
    onlineCourse: `${BASE}/education-list_img-02.png`,
    expertGroup: `${BASE}/education-list_img-03.png`,
    stepConfirm: `${BASE}/sub_03-consulting_step_icon-02.png`,
    stepApply: `${BASE}/sub_03-consulting_step_icon-01.png`,
    stepComplete: `${BASE}/sub_04-edu_step_icon-03.png`,
  },

  // ─── 방문세미나 ───
  seminar: {
    stepIntro: `${BASE}/sub_04-visiting-edu_step_icon-01.png`,
    stepDemo: `${BASE}/sub_04-visiting-edu_step_icon-02.png`,
    stepQna: `${BASE}/sub_04-visiting-edu_step_icon-03.png`,
  },

  // ─── 동영상 강의 썸네일 ───
  videoLecture: {
    thum02: `${BASE}/video-lecture_seminar_thum-02.jpg`,
    thum03: `${BASE}/video-lecture_seminar_thum-03.jpg`,
    thum05: `${BASE}/video-lecture_seminar_thum-05.jpg`,
    thum06: `${BASE}/video-lecture_seminar_thum-06.jpg`,
  },

  // ─── 공지사항 썸네일 ───
  notices: {
    dqEdition: `${BASE}/0.png`,
    reviewDq: `${BASE}/6.-%EC%86%94%EB%A3%A8%EC%85%98%EB%A6%AC%EB%B7%B0-dq.png`,
    gsInjeung: `${BASE}/2.-GS%EC%9D%B8%EC%A6%9D.png`,
  },

  // ─── SNS ───
  sns: {
    blog: `${BASE}/sns_blog.png`,
    facebook: `${BASE}/sns_facebook.png`,
  },
} as const;

/* ─── 엔코어 제품 이미지 (public/images/encore/) ─── */
const ENCORE = '/images/encore';

export const ENCORE_IMAGES = {
  dataware: {
    overview: `${ENCORE}/solutions_data13-phone.jpg`,
    logo1: `${ENCORE}/data_logo1.jpg`,
    logo2: `${ENCORE}/data_logo2.jpg`,
    logo3: `${ENCORE}/data_logo3.jpg`,
    /* DATAWARE 제품 로고 (8개 솔루션 아이콘) */
    productLogos: [
      `${ENCORE}/solutions_data13-logo1-1.jpg`,
      `${ENCORE}/solutions_data13-logo1-2.jpg`,
      `${ENCORE}/solutions_data13-logo1-3.jpg`,
      `${ENCORE}/solutions_data13-logo1-4.jpg`,
      `${ENCORE}/solutions_data13-logo1-5.jpg`,
      `${ENCORE}/solutions_data13-logo1-6.jpg`,
      `${ENCORE}/solutions_data13-logo1-7.jpg`,
      `${ENCORE}/solutions_data13-logo1-8.jpg`,
    ],
  },
  da: {
    main: `${ENCORE}/data2_tmb1_3.jpg`,
    tmb1: `${ENCORE}/data2_tmb1_1.jpg`,
    tmb2: `${ENCORE}/data2_tmb1_2.jpg`,
    tmb3: `${ENCORE}/data2_tmb1_3.jpg`,
    tmb4: `${ENCORE}/data2_tmb1_4.jpg`,
  },
  meta: {
    screenshot: `${ENCORE}/solutions_data3-img2.jpg`,
    architecture: `${ENCORE}/solutions_data3-img3.jpg`,
    logo: `${ENCORE}/solutions_data3-logo1.jpg`,
  },
  dq: {
    screenshot: `${ENCORE}/solutions_data4-img2.jpg`,
    architecture: `${ENCORE}/solutions_data4-img3.jpg`,
    logo: `${ENCORE}/solutions_data4-logo1.jpg`,
  },
  ap: {
    screenshot: `${ENCORE}/solutions_data5-img2.jpg`,
    architecture: `${ENCORE}/solutions_data5-tbl-img1.jpg`,
    logo: `${ENCORE}/solutions_data5-logo1.jpg`,
  },
  dp: {
    screenshot: `${ENCORE}/solutions_data10-img2.jpg`,
    architecture: `${ENCORE}/solutions_data10-tbl-img1.jpg`,
    logo: `${ENCORE}/solutions_data10-logo1.jpg`,
  },
  /* AI 솔루션 */
  metaAi: {
    main: `${ENCORE}/ai/solutions_ai4-tbl-img1.jpg`,
    screenshot: `${ENCORE}/ai/unified-meta-img2.jpg`,
    architecture: `${ENCORE}/ai/unified-meta-img3.jpg`,
  },
  daAiPack: {
    main: `${ENCORE}/ai/dataware-ai-hub-arch1.jpg`,
    architecture: `${ENCORE}/ai/dataware-ai-hub-arch2.jpg`,
    screenshot: `${ENCORE}/ai/solutions_ai5-img3.jpg`,
  },
} as const;
