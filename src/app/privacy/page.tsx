import { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY } from '@/data';

export const metadata: Metadata = {
  title: '개인정보처리방침 | UNION DATAWARE',
  description: '유니온시스템즈 개인정보처리방침',
};

const ACCENT = '#36c88a';

export default async function PrivacyPage() {

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* 히어로 */}
      <section style={{ position: 'relative', backgroundColor: '#0B1220', paddingTop: 100, paddingBottom: 56, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.3, marginBottom: 12 }}>
            유니온시스템즈의<br />개인정보처리방침을 알려드립니다.
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
            주식회사 유니온시스템즈(이하 &quot;회사&quot;)는 고객님의 개인정보를 중요시하며, &quot;정보통신망 이용촉진 및 정보보호&quot;에 관한 법률을 준수하고 있습니다.
            회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>시행일자 : 2022년 07월 08일</p>
        </div>
      </section>

      {/* 본문 */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 80px' }}>
        <div style={{ fontSize: 15, color: '#334155', lineHeight: 2 }}>

          {/* 제1조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>1. 수집하는 개인정보 항목</h2>
            <p>회사는 서비스 이용, 본인 식별, 원활한 고객상담, 불만처리 등의 각종 서비스 제공을 위한 최소한의 필수정보와 이용자 맞춤 서비스 제공을 위한 선택항목으로 구분하여 개인정보를 수집하고 있습니다.</p>
            <div style={{ marginTop: 16, border: '1px solid #e6e8ec', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr', backgroundColor: '#f9fafb', borderBottom: '1px solid #e6e8ec' }}>
                <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, color: '#101828' }}>수집영역</div>
                <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, color: '#101828' }}>구분</div>
                <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, color: '#101828' }}>수집 및 이용 항목 / 목적</div>
                <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, color: '#101828' }}>보유기간</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr' }}>
                <div style={{ padding: '12px 16px', fontSize: 13 }}>홈페이지 문의</div>
                <div style={{ padding: '12px 16px', fontSize: 13 }}>필수</div>
                <div style={{ padding: '12px 16px', fontSize: 13 }}>이름, 회사명, 연락처, 이메일 / 고객 요청사항 처리</div>
                <div style={{ padding: '12px 16px', fontSize: 13 }}>응대 후 5년</div>
              </div>
            </div>
          </article>

          {/* 제2조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>2. 개인정보의 수집 및 이용목적</h2>
            <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
            <ul style={{ paddingLeft: 20, marginTop: 12, listStyle: 'disc' }}>
              <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
              <li>회원 관리 : 본인확인, 개인 식별, 불량회원의 부정 이용 방지, 가입 의사 확인, 불만처리 등 민원처리, 고지사항 전달</li>
              <li>마케팅 및 광고에 활용 : 이벤트 등 광고성 정보 전달, 접속 빈도 파악 또는 서비스 이용에 대한 통계</li>
            </ul>
          </article>

          {/* 제3조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>3. 개인정보의 보유 및 이용기간</h2>
            <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 기간 동안 보관합니다.</p>
            <ul style={{ paddingLeft: 20, marginTop: 12, listStyle: 'disc' }}>
              <li>계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
            </ul>
          </article>

          {/* 제4조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>4. 개인정보의 파기절차 및 방법</h2>
            <p>회원님이 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</p>
            <ul style={{ paddingLeft: 20, marginTop: 12, listStyle: 'disc' }}>
              <li><strong>파기절차</strong> : 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유 이외의 다른 목적으로 이용되지 않습니다.</li>
              <li><strong>파기방법</strong> : 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
            </ul>
          </article>

          {/* 제5조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>5. 개인정보 제공</h2>
            <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
            <ul style={{ paddingLeft: 20, marginTop: 12, listStyle: 'disc' }}>
              <li>이용자들이 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </article>

          {/* 제6조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>6. 수집한 개인정보의 위탁</h2>
            <p>회사는 서비스 이행을 위해 아래와 같이 외부 전문업체에 위탁하여 운영하고 있습니다.</p>
            <div style={{ marginTop: 12, border: '1px solid #e6e8ec', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', backgroundColor: '#f9fafb', borderBottom: '1px solid #e6e8ec' }}>
                <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, color: '#101828' }}>위탁 대상자</div>
                <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, color: '#101828' }}>위탁업무 내용</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                <div style={{ padding: '12px 16px', fontSize: 13 }}>주식회사 엔코아</div>
                <div style={{ padding: '12px 16px', fontSize: 13 }}>DATAWARE 제품 기술지원, 교육, 고객 문의 응대</div>
              </div>
            </div>
          </article>

          {/* 제7조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>7. 이용자의 권리와 그 행사방법</h2>
            <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 삭제를 요청할 수도 있습니다.</p>
            <p style={{ marginTop: 8 }}>개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
            <p style={{ marginTop: 8 }}>개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.</p>
          </article>

          {/* 제8조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>8. 개인정보 자동수집 장치의 설치, 운영 및 거부</h2>
            <p>회사는 귀하의 정보를 수시로 저장하고 찾아내는 &quot;쿠키(cookie)&quot; 등을 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다.</p>
            <p style={{ marginTop: 8 }}>귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.</p>
            <ul style={{ paddingLeft: 20, marginTop: 12, listStyle: 'disc' }}>
              <li><strong>Chrome</strong> : 설정 &gt; 개인정보 및 보안 &gt; 쿠키 및 사이트 데이터</li>
              <li><strong>Edge</strong> : 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 저장된 데이터</li>
            </ul>
          </article>

          {/* 제9조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>9. 개인정보에 관한 민원서비스</h2>
            <p>회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div style={{ marginTop: 16, padding: 24, backgroundColor: '#f9fafb', border: '1px solid #e6e8ec' }}>
              <p style={{ fontWeight: 700, color: '#101828', marginBottom: 8 }}>개인정보 보호책임자</p>
              <p>이름 : 백나래 대리</p>
              <p>전화 : {COMPANY.tel}</p>
              <p>팩스 : 02-706-8990</p>
              <p>이메일 : union@unionsystems.co.kr</p>
            </div>
            <p style={{ marginTop: 16 }}>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, listStyle: 'disc' }}>
              <li>개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
              <li>개인정보침해신고센터 (privacy.kisa.or.kr / 118)</li>
              <li>대검찰청 사이버수사과 (www.spo.go.kr / 1301)</li>
              <li>경찰청 사이버수사국 (ecrm.police.go.kr / 182)</li>
            </ul>
          </article>

          {/* 제10조 */}
          <article style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}` }}>10. 정책 변경에 따른 공지의무</h2>
            <p>이 개인정보취급방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 변경되는 개인정보취급방침을 시행하기 최소 7일 전에 홈페이지를 통해 변경이유 및 내용 등을 공지하도록 하겠습니다.</p>
            <p style={{ marginTop: 12, fontWeight: 700, color: '#101828' }}>시행일자 : 2022년 07월 08일</p>
          </article>

        </div>

        {/* 하단 */}
        <div style={{ paddingTop: 32, borderTop: '1px solid #e6e8ec', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 600, color: '#667085', textDecoration: 'none', padding: '12px 20px', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec' }}>
            홈으로
          </Link>
          <Link href="/contact" style={{ fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none', padding: '12px 24px', backgroundColor: ACCENT }}>
            도입문의
          </Link>
        </div>
      </section>
    </main>
  );
}
