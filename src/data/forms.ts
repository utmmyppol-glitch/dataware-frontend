/**
 * 폼 데이터 — 원본 uniondata.co.kr 기준
 * 모달 다운로드 폼, 방문세미나 폼, 도입문의 폼
 */

/* ─── 공통 필드 ─── */
export const COMMON_FIELDS = [
  { name: 'name', label: '이름', type: 'text' as const, required: true },
  { name: 'company', label: '회사명', type: 'text' as const, required: true },
  { name: 'phone', label: '연락처', type: 'tel' as const, required: true, placeholder: '010-0000-0000' },
  { name: 'email', label: '이메일', type: 'email' as const, required: true },
];

/* ─── 개인정보 수집 및 이용 안내 상세 ─── */
export const PRIVACY_NOTICE = {
  collectItems: '이름, 회사명, 연락처, 이메일',
  purpose: '문의 사항에 대한 답변을 전달하기 위한 의사소통 경로의 확보와 안내, 상담, 기타 이벤트 안내 등',
  retentionPolicy: '원칙적으로 개인정보의 수집/이용 목적 달성 시 바로 파기합니다.',
  retentionExceptions: [
    '계약 또는 청약철회 등에 관한 기록 : 5년',
    '대금결제 및 재화등의 공급에 관한 기록 : 5년',
    '소비자의 불만 또는 분쟁처리에 관한 기록 : 3년',
  ],
  retentionNote: '수집/이용 목적을 달성한 경우에도 법률의 규정에 따라 보존할 필요가 있다면 고객의 개인정보를 보유할 수 있습니다.',
};

/* ─── 제3자 제공동의 상세 ─── */
export const THIRD_PARTY_NOTICE = {
  recipient: '㈜엔코아',
  items: '이름, 회사명, 연락처, 이메일',
  purpose: '수집된 개인정보는 이벤트 당첨자 경품 제공 등을 위해 이용됩니다.',
  retention: '이벤트 종료 및 발송 완료 후 1년 이내 폐기 (단, 관련 법령에서 별도로 정하는 경우는 해당기간까지 보관)',
  notice: '유니온시스템즈에 입력된 정보는 서비스의 원활한 제공을 위하여 다음과 같이 ㈜엔코아에 제공됩니다.',
  optOutNotice: '개인정보의 제 3자 제공을 원하지 않을 경우 수집하지 않으며, 미동의 하실 경우, 이벤트 참가가 불가능합니다.',
};

/* ─── 동의 항목 ─── */
export const CONSENT_ITEMS = [
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용동의',
    required: true,
    type: 'checkbox' as const,
    detail: PRIVACY_NOTICE,
  },
  {
    id: 'marketing',
    label: '세미나개최, 제품 업데이트 소식 정보수신 동의',
    required: false,
    type: 'radio' as const,
    options: ['동의합니다', '동의하지않습니다'],
  },
  {
    id: 'thirdParty',
    label: '제3자 제공동의 - (주)엔코아',
    required: true,
    type: 'checkbox' as const,
    description: '수집된 개인정보는 (주)엔코아에 제공됩니다.',
    detail: THIRD_PARTY_NOTICE,
  },
];

/* ─── 모달 다운로드 폼 4종 ─── */
export const DOWNLOAD_MODALS = [
  {
    id: 'da-business',
    title: 'DA#5 설치파일(기업용) 다운로드 신청',
    fields: COMMON_FIELDS,
  },
  {
    id: 'da-personal',
    title: 'DA#5 설치파일(개인용) 다운로드 신청',
    fields: COMMON_FIELDS,
  },
  {
    id: 'dq-intro',
    title: 'DA# DQ Edition 소개서 다운로드 신청',
    fields: COMMON_FIELDS,
  },
  {
    id: 'da-intro',
    title: 'DA#소개서 다운로드신청',
    fields: COMMON_FIELDS,
  },
];

/* ─── 방문세미나 폼 ─── */
export const SEMINAR_FORM = {
  title: '방문세미나 신청',
  fields: [
    { name: 'visitDate', label: '방문일 선택', type: 'date' as const, required: true, placeholder: '방문세미나를 원하시는 일자를 선택해주세요.' },
    ...COMMON_FIELDS,
  ],
};

/* ─── 도입문의 폼 ─── */
export const INQUIRY_FORM = {
  title: '도입문의',
  fields: [
    {
      name: 'category',
      label: '구분',
      type: 'select' as const,
      required: true,
      placeholder: '상담 구분을 선택해주세요.',
      options: ['DA# 제품소개서', 'DQ Edition 제품소개서', 'DA# 도입문의', 'DQ Edition 도입문의'],
    },
    { name: 'company', label: '회사명', type: 'text' as const, required: true },
    { name: 'name', label: '이름', type: 'text' as const, required: true },
    { name: 'phone', label: '연락처', type: 'tel' as const, required: true },
    { name: 'email', label: '이메일', type: 'email' as const, required: true },
    { name: 'message', label: '문의작성', type: 'textarea' as const, required: false, placeholder: '자세히 남겨주시면 더 정확한 상담이 가능합니다.' },
    { name: 'file', label: '파일첨부', type: 'file' as const, required: false, accept: '.jpg,.png,.pdf' },
  ],
};

/* ─── 다운로드 페이지 ─── */
export const DOWNLOAD_PAGE = {
  heading: '다운로드 신청',
  subheading: 'DA# 제품 소개서 및 무료 라이선스를 신청하실 수 있습니다.',
  sections: [
    { id: 'brochure', label: '제품소개서' },
    { id: 'installer', label: '설치파일', notice: '다운로드는 PC에서만 가능합니다.' },
  ],
};

export const DOWNLOAD_CARDS = [
  {
    id: 'da-intro',
    section: 'brochure',
    title: 'DA# 소개서',
    desc: '',
    ctaLabel: '제품소개서 신청',
    modalId: 'da-intro',
  },
  {
    id: 'dq-intro',
    section: 'brochure',
    title: 'DA# DQ Edition 소개서',
    desc: '',
    ctaLabel: '제품소개서 신청',
    modalId: 'dq-intro',
  },
  {
    id: 'da-personal',
    section: 'installer',
    title: 'DA#5 개인용',
    desc: '',
    ctaLabel: '개인용 다운로드',
    modalId: 'da-personal',
  },
  {
    id: 'da-business',
    section: 'installer',
    title: 'DA#5 기업용',
    desc: '',
    ctaLabel: '기업용 다운로드',
    modalId: 'da-business',
  },
];
