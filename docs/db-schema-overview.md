# UNION DATAWARE 백오피스 DB 스키마

## 테이블 구조 (15개)

### 사이트 관리
| 테이블 | 용도 | 주요 컬럼 |
|--------|------|-----------|
| `menus` | GNB/서브 메뉴 트리 | parent_id, name, url, sort_order, is_exposed |
| `contents` | 페이지별 CMS 키-값 | key(unique), value, content_type, page |
| `banners` | 배너 (히어로/팝업) | title, image_url, position, start/end_date |

### 제품/고객
| 테이블 | 용도 | 주요 컬럼 |
|--------|------|-----------|
| `products` | DATAWARE 솔루션 라인업 | name, slug, features(JSONB), is_active |
| `customer_stories` | 고객사 도입 사례 | company, industry, content, effects(JSONB) |
| `client_logos` | 고객사/신뢰 로고 | name, logo_url, category(client/trusted) |
| `posts` | 공지사항/뉴스/블로그 | title, slug, category, is_published |

### 고객 접수 (폼 제출)
| 테이블 | 용도 | 공통 필드 |
|--------|------|-----------|
| `inquiries` | 도입문의/견적 | name, company, phone, email, product, file, status |
| `downloads` | 소개서 다운로드 | name, company, phone, email, file_type |
| `education_applications` | 무료교육 신청 | + position, preferred_date |
| `seminar_applications` | 방문세미나 신청 | + department, attendees, topic |

### 교육 일정
| 테이블 | 용도 | 주요 컬럼 |
|--------|------|-----------|
| `education_sessions` | 교육 프로그램 | title, session_date, curriculum(JSONB), capacity |

### 시스템 관리
| 테이블 | 용도 | 주요 컬럼 |
|--------|------|-----------|
| `admins` | 관리자 계정 (RBAC) | email, password_hash, role(super_admin/admin/editor/viewer) |
| `content_audit_logs` | 변경 감사 로그 | admin_id, table_name, action, old/new_value(JSONB) |
| `uploaded_files` | 파일 메타데이터 | original_name, stored_name, mime_type, file_size |

## 정규화 원칙

1. **3NF 준수**: 모든 비키 속성은 기본키에만 완전 함수 종속
2. **고객 폼 분리**: inquiries/downloads/education/seminar 각각 독립 테이블 (필드 차이 큼)
3. **contents 키-값**: 페이지별 콘텐츠를 정규화하되, 유연성 위해 key-value 방식 유지
4. **JSONB 활용**: 가변 길이 배열(features, curriculum 등)은 JSONB로 저장
5. **감사 추적**: content_audit_logs로 누가/언제/무엇을 변경했는지 기록

## content 키 규칙

```
{page}_{section}     예: home_hero, pricing_faq
{page}_seo_title     예: about_seo_title
{page}_seo_description
```

백오피스에서 content 테이블의 value를 수정하면 프론트엔드 generateMetadata가 자동 반영.
