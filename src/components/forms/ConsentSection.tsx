'use client';

import { useState } from 'react';

const ACCENT = '#36c88a';

interface ConsentSectionProps {
  errors?: Record<string, string>;
  showThirdParty?: boolean;
}

export default function ConsentSection({ errors = {}, showThirdParty = false }: Readonly<ConsentSectionProps>) {
  const [consentMarketing, setConsentMarketing] = useState<'yes' | 'no' | null>(null);

  return (
    <div>
      {/* ── 개인정보 수집 및 이용에 대한 안내 ── */}
      <div style={{ marginBottom: 20 }}>
        <h3 className="text-[14px] font-bold mb-3" style={{ color: ACCENT }}>개인정보 수집 및 이용에 대한 안내</h3>
        <div
          style={{
            border: '1px solid #e6e8ec',
            padding: '20px 24px',
            maxHeight: 180,
            overflowY: 'auto',
            fontSize: 13,
            color: '#475467',
            lineHeight: 1.8,
            backgroundColor: '#fafafa',
          }}
        >
          <p style={{ fontWeight: 700, color: '#101828', marginBottom: 4 }}>수집하는 개인정보의 항목</p>
          <p style={{ marginBottom: 14 }}>이름, 회사명, 연락처, 이메일</p>

          <p style={{ fontWeight: 700, color: '#101828', marginBottom: 4 }}>개인정보의 수집 · 이용 목적</p>
          <p style={{ marginBottom: 14 }}>문의 사항에 대한 답변을 전달하기 위한 의사소통 경로의 확보와 안내, 상담, 기타 이벤트 안내 등</p>

          <p style={{ fontWeight: 700, color: '#101828', marginBottom: 4 }}>개인정보의 보유 및 이용기간</p>
          <p style={{ marginBottom: 6 }}>원칙적으로 개인정보의 수집 · 이용 목적 달성 시 바로 파기합니다.</p>
          <p style={{ marginBottom: 6 }}>수집 · 이용 목적을 달성한 경우에도 법률의 규정에 따라 보존할 필요가 있다면 고객의 개인정보를 보유할 수 있습니다.</p>
          <ul style={{ paddingLeft: 18, margin: '6px 0 0', listStyle: 'disc' }}>
            <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
            <li>대금결제 및 재화등의 공급에 관한 기록 : 5년</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 등</li>
          </ul>
        </div>
      </div>

      {/* ── 개인정보 수집 동의 (필수) ── */}
      <div style={{ marginBottom: 16 }}>
        <p className="text-[13px] font-bold mb-2" style={{ color: '#101828' }}>
          개인정보 수집 및 이용동의 내용을 확인했으며, 이에 동의합니다. <span style={{ color: '#ef4444' }}>(필수)</span> <span style={{ color: '#ef4444' }}>*</span>
        </p>
        <label className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: '#475467' }}>
          <input type="radio" name="consentPrivacyRadio" value="on" onChange={(e) => {
            const hidden = e.target.form?.querySelector('input[name="consentPrivacy"]') as HTMLInputElement;
            if (hidden) hidden.checked = true;
          }} style={{ accentColor: ACCENT, width: 16, height: 16 }} />
          동의합니다.
        </label>
        <input type="checkbox" name="consentPrivacy" className="hidden" />
        {errors.consentPrivacy && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.consentPrivacy}</p>}
      </div>

      {/* ── 마케팅 정보수신 동의 (선택) ── */}
      <div style={{ marginBottom: showThirdParty ? 24 : 24 }}>
        <p className="text-[13px] font-bold mb-2" style={{ color: '#101828' }}>
          세미나개최, 제품 업데이트 소식에 대한 정보수신을 동의합니다. <span style={{ color: '#98A2B3' }}>(선택)</span> <span style={{ color: '#ef4444' }}>*</span>
        </p>
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: '#475467' }}>
            <input
              type="radio"
              name="consentMarketingRadio"
              checked={consentMarketing === 'yes'}
              onChange={() => setConsentMarketing('yes')}
              style={{ accentColor: ACCENT, width: 16, height: 16 }}
            />
            동의합니다.
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: '#475467' }}>
            <input
              type="radio"
              name="consentMarketingRadio"
              checked={consentMarketing === 'no'}
              onChange={() => setConsentMarketing('no')}
              style={{ accentColor: ACCENT, width: 16, height: 16 }}
            />
            동의하지 않습니다.
          </label>
        </div>
      </div>

      {/* ── 제3자 제공동의 (다운로드 신청에만 표시) ── */}
      {showThirdParty && (
        <>
          <div style={{ marginBottom: 20 }}>
            <h3 className="text-[14px] font-bold mb-3" style={{ color: ACCENT }}>제 3자 제공동의</h3>
            <div
              style={{
                border: '1px solid #e6e8ec',
                padding: '20px 24px',
                maxHeight: 160,
                overflowY: 'auto',
                fontSize: 13,
                color: '#475467',
                lineHeight: 1.8,
                backgroundColor: '#fafafa',
              }}
            >
              <p style={{ marginBottom: 12 }}>유니온시스템즈에 입력된 정보는 서비스의 원활한 제공을 위하여 다음과 같이 ㈜엔코아에 제공됩니다.</p>
              <ul style={{ paddingLeft: 18, margin: 0, listStyle: 'disc' }}>
                <li>개인정보를 제공받는 자 : ㈜엔코아</li>
                <li>제공하는 개인정보의 항목 : 이름, 회사명, 연락처, 이메일</li>
                <li>개인정보를 제공받는 자의 개인정보 이용목적 : 수집된 개인정보는 이벤트 당첨자 경품 제공 등을 위해 이용됩니다.</li>
                <li>개인정보 보유 및 이용기간 : 이벤트 종료 및 발송 완료 후 1년 이내 폐기 (단, 관련 법령에서 별도로 정하는 경우는 해당기간까지 보관)</li>
                <li>개인정보의 제 3자 제공을 원하지 않을 경우 수집하지 않으며, 미동의 하실 경우, 이벤트 참가가 불가능합니다.</li>
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p className="text-[13px] font-bold mb-2" style={{ color: '#101828' }}>
              제 3자 제공동의 내용을 확인했으며, 이에 동의합니다. <span style={{ color: '#ef4444' }}>(필수)</span> <span style={{ color: '#ef4444' }}>*</span>
            </p>
            <label className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: '#475467' }}>
              <input type="radio" name="consentThirdPartyRadio" value="on" onChange={(e) => {
                const hidden = e.target.form?.querySelector('input[name="consentThirdParty"]') as HTMLInputElement;
                if (hidden) hidden.checked = true;
              }} style={{ accentColor: ACCENT, width: 16, height: 16 }} />
              동의합니다.
            </label>
            <input type="checkbox" name="consentThirdParty" className="hidden" />
            {errors.consentThirdParty && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.consentThirdParty}</p>}
          </div>
        </>
      )}
    </div>
  );
}
