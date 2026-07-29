export type FieldErrors = Record<string, string>;

export function validateCommonFields(formData: FormData): FieldErrors {
  const errs: FieldErrors = {};
  if (!String(formData.get('name') ?? '').trim()) errs.name = '이름을 입력해주세요.';
  if (!String(formData.get('company') ?? '').trim()) errs.company = '회사명을 입력해주세요.';
  if (!String(formData.get('phone') ?? '').trim()) errs.phone = '연락처를 입력해주세요.';
  if (!String(formData.get('email') ?? '').trim()) errs.email = '이메일을 입력해주세요.';
  if (formData.get('consentPrivacy') !== 'on') errs.consentPrivacy = '개인정보 수집 및 이용에 동의해주세요.';
  return errs;
}

export const inputBase =
  'w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors';

export const inputError =
  'w-full bg-white border border-red-400 px-4 py-4 text-[16px] text-[#111111] focus:border-red-400 focus:ring-1 focus:ring-red-400 focus:outline-none transition-colors';
