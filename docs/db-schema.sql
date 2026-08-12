-- ============================================================
-- UNION DATAWARE 백오피스 DB 스키마 (PostgreSQL 14+)
-- 생성일: 2026-08-04
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. 메뉴 관리
-- ─────────────────────────────────────────────────────────────

CREATE TABLE menus (
    id            BIGSERIAL     PRIMARY KEY,
    parent_id     BIGINT        REFERENCES menus(id) ON DELETE CASCADE,
    name          VARCHAR(100)  NOT NULL,            -- 메뉴 표시명
    url           VARCHAR(255)  NOT NULL,            -- 라우트 경로 (/products 등)
    is_exposed    BOOLEAN       NOT NULL DEFAULT TRUE,
    sort_order    INT           NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_menus_parent ON menus(parent_id);
CREATE INDEX idx_menus_sort   ON menus(sort_order);

COMMENT ON TABLE menus IS '사이트 GNB/서브 메뉴 구조 (트리)';

-- ─────────────────────────────────────────────────────────────
-- 2. 페이지별 콘텐츠 (CMS 키-값)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE contents (
    id            BIGSERIAL     PRIMARY KEY,
    key           VARCHAR(120)  NOT NULL UNIQUE,     -- home_hero, about_seo_title 등
    value         TEXT          NOT NULL DEFAULT '',  -- HTML/텍스트/JSON 허용
    content_type  VARCHAR(20)   NOT NULL DEFAULT 'text'
                  CHECK (content_type IN ('text', 'html', 'json', 'image')),
    page          VARCHAR(60),                       -- 소속 페이지 (home, about, products…)
    description   VARCHAR(255),                      -- 백오피스 표시 설명
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_contents_page ON contents(page);
CREATE INDEX idx_contents_key  ON contents(key);

COMMENT ON TABLE contents IS '페이지별 편집 가능 콘텐츠 (key-value 방식)';

-- ─────────────────────────────────────────────────────────────
-- 3. 제품 (DATAWARE 라인업)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE products (
    id            BIGSERIAL     PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,            -- DA#, META# 등
    slug          VARCHAR(100)  NOT NULL UNIQUE,     -- da-sharp, meta-sharp
    category      VARCHAR(50),                       -- modeling, governance 등
    subtitle      VARCHAR(255),
    description   TEXT,
    features      JSONB,                             -- 기능 목록 (배열)
    icon_url      VARCHAR(500),
    thumbnail_url VARCHAR(500),
    certification VARCHAR(200),                      -- GS인증 정보
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    sort_order    INT           NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_slug   ON products(slug);
CREATE INDEX idx_products_active ON products(is_active, sort_order);

COMMENT ON TABLE products IS 'DATAWARE 솔루션 제품 목록';

-- ─────────────────────────────────────────────────────────────
-- 4. 고객사례 (Customer Stories)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE customer_stories (
    id            BIGSERIAL     PRIMARY KEY,
    company       VARCHAR(100)  NOT NULL,            -- 고객사명
    slug          VARCHAR(100)  NOT NULL UNIQUE,
    industry      VARCHAR(50)   NOT NULL,            -- 금융, 유통, 공공 등
    title         VARCHAR(255)  NOT NULL,
    summary       VARCHAR(500),
    content       TEXT,                              -- 본문 (HTML)
    background    JSONB,                             -- 도입 배경 목록
    effects       JSONB,                             -- 도입 효과 목록
    quote         TEXT,                              -- 인용문
    quote_source  VARCHAR(100),                      -- 인용 출처
    thumbnail_url VARCHAR(500),
    logo_url      VARCHAR(500),
    meta_date     VARCHAR(50),                       -- 도입 시기
    meta_purpose  VARCHAR(200),                      -- 도입 목적
    is_featured   BOOLEAN       NOT NULL DEFAULT FALSE,
    sort_order    INT           NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_stories_industry ON customer_stories(industry);
CREATE INDEX idx_stories_featured ON customer_stories(is_featured, sort_order);

COMMENT ON TABLE customer_stories IS '고객사 도입 사례';

-- ─────────────────────────────────────────────────────────────
-- 5. 고객 로고 (신뢰 마크)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE client_logos (
    id            BIGSERIAL     PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    logo_url      VARCHAR(500)  NOT NULL,
    category      VARCHAR(50)   DEFAULT 'client',    -- client, trusted
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    sort_order    INT           NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE client_logos IS '홈페이지 고객사 / 신뢰 로고';

-- ─────────────────────────────────────────────────────────────
-- 6. 배너
-- ─────────────────────────────────────────────────────────────

CREATE TABLE banners (
    id            BIGSERIAL     PRIMARY KEY,
    title         VARCHAR(200)  NOT NULL,
    image_url     VARCHAR(500)  NOT NULL,
    link_url      VARCHAR(500),
    position      VARCHAR(50)   NOT NULL DEFAULT 'hero',  -- hero, sidebar, popup
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    start_date    TIMESTAMPTZ,
    end_date      TIMESTAMPTZ,
    sort_order    INT           NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_banners_position ON banners(position, is_active);

COMMENT ON TABLE banners IS '페이지별 배너 (히어로, 팝업 등)';

-- ─────────────────────────────────────────────────────────────
-- 7. 게시글 / 뉴스
-- ─────────────────────────────────────────────────────────────

CREATE TABLE posts (
    id            BIGSERIAL     PRIMARY KEY,
    title         VARCHAR(300)  NOT NULL,
    slug          VARCHAR(300)  NOT NULL UNIQUE,
    content       TEXT,
    excerpt       VARCHAR(500),
    category      VARCHAR(50)   NOT NULL DEFAULT 'news',  -- news, notice, blog
    thumbnail_url VARCHAR(500),
    view_count    INT           NOT NULL DEFAULT 0,
    is_published  BOOLEAN       NOT NULL DEFAULT FALSE,
    published_at  TIMESTAMPTZ,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_category ON posts(category, is_published);
CREATE INDEX idx_posts_date     ON posts(published_at DESC);

COMMENT ON TABLE posts IS '공지사항, 뉴스, 블로그 게시글';

-- ─────────────────────────────────────────────────────────────
-- 8. 도입문의 (Inquiries)
-- ─────────────────────────────────────────────────────────────

CREATE TYPE inquiry_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

CREATE TABLE inquiries (
    id                   BIGSERIAL       PRIMARY KEY,
    name                 VARCHAR(100)    NOT NULL,
    company              VARCHAR(200)    NOT NULL,
    phone                VARCHAR(30)     NOT NULL,
    email                VARCHAR(200)    NOT NULL,
    product              VARCHAR(100),                -- 관심 제품
    message              TEXT,
    file_url             VARCHAR(500),                -- 첨부파일 S3 경로
    file_name            VARCHAR(255),
    status               inquiry_status  NOT NULL DEFAULT 'pending',
    admin_note           TEXT,                        -- 관리자 메모
    consent_privacy      BOOLEAN         NOT NULL DEFAULT FALSE,
    consent_third_party  BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at           TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE INDEX idx_inquiries_status ON inquiries(status, created_at DESC);
CREATE INDEX idx_inquiries_date   ON inquiries(created_at DESC);

COMMENT ON TABLE inquiries IS '도입문의 / 견적요청 접수';

-- ─────────────────────────────────────────────────────────────
-- 9. 소개서 다운로드 신청
-- ─────────────────────────────────────────────────────────────

CREATE TABLE downloads (
    id                   BIGSERIAL     PRIMARY KEY,
    name                 VARCHAR(100)  NOT NULL,
    company              VARCHAR(200)  NOT NULL,
    phone                VARCHAR(30)   NOT NULL,
    email                VARCHAR(200)  NOT NULL,
    file_type            VARCHAR(100),                -- DA#_BROCHURE 등
    consent_privacy      BOOLEAN       NOT NULL DEFAULT FALSE,
    consent_third_party  BOOLEAN       NOT NULL DEFAULT FALSE,
    consent_marketing    BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_downloads_date ON downloads(created_at DESC);

COMMENT ON TABLE downloads IS '소개서 다운로드 신청 이력';

-- ─────────────────────────────────────────────────────────────
-- 10. 무료교육 신청
-- ─────────────────────────────────────────────────────────────

CREATE TABLE education_applications (
    id                   BIGSERIAL     PRIMARY KEY,
    name                 VARCHAR(100)  NOT NULL,
    company              VARCHAR(200)  NOT NULL,
    phone                VARCHAR(30)   NOT NULL,
    email                VARCHAR(200)  NOT NULL,
    position             VARCHAR(100),
    preferred_date       VARCHAR(100),
    note                 TEXT,
    consent_privacy      BOOLEAN       NOT NULL DEFAULT FALSE,
    consent_third_party  BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_edu_apps_date ON education_applications(created_at DESC);

COMMENT ON TABLE education_applications IS '무료 교육 신청';

-- ─────────────────────────────────────────────────────────────
-- 11. 교육 세션 (일정)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE education_sessions (
    id             BIGSERIAL     PRIMARY KEY,
    title          VARCHAR(300)  NOT NULL,
    session_date   VARCHAR(100)  NOT NULL,            -- "2026.08.22(금) 14:00~17:00"
    tag            VARCHAR(50),                       -- "DA#", "DQ#" 등
    description    VARCHAR(500),
    content        TEXT,
    curriculum     JSONB,                             -- 커리큘럼 목록
    target         JSONB,                             -- 교육 대상
    location       VARCHAR(200),
    price          VARCHAR(50)   DEFAULT '무료',
    thumbnail_url  VARCHAR(500),
    detail_images  JSONB,                             -- 상세 이미지 URL 배열
    capacity       INT,                               -- 정원
    is_active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE education_sessions IS '교육 프로그램 일정';

-- ─────────────────────────────────────────────────────────────
-- 12. 방문세미나 신청
-- ─────────────────────────────────────────────────────────────

CREATE TABLE seminar_applications (
    id                   BIGSERIAL     PRIMARY KEY,
    name                 VARCHAR(100)  NOT NULL,
    company              VARCHAR(200)  NOT NULL,
    phone                VARCHAR(30)   NOT NULL,
    email                VARCHAR(200)  NOT NULL,
    department           VARCHAR(100),
    preferred_date       VARCHAR(100),
    attendees            INT,
    topic                VARCHAR(300),
    note                 TEXT,
    consent_privacy      BOOLEAN       NOT NULL DEFAULT FALSE,
    consent_third_party  BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_seminar_apps_date ON seminar_applications(created_at DESC);

COMMENT ON TABLE seminar_applications IS '방문 세미나 신청';

-- ─────────────────────────────────────────────────────────────
-- 13. 백오피스 관리자 계정
-- ─────────────────────────────────────────────────────────────

CREATE TABLE admins (
    id            BIGSERIAL     PRIMARY KEY,
    email         VARCHAR(200)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,             -- bcrypt
    name          VARCHAR(100)  NOT NULL,
    role          VARCHAR(30)   NOT NULL DEFAULT 'editor'
                  CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_admins_email ON admins(email);

COMMENT ON TABLE admins IS '백오피스 관리자 계정 (RBAC)';

-- ─────────────────────────────────────────────────────────────
-- 14. 콘텐츠 수정 이력 (감사 로그)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE content_audit_logs (
    id            BIGSERIAL     PRIMARY KEY,
    admin_id      BIGINT        REFERENCES admins(id),
    table_name    VARCHAR(60)   NOT NULL,             -- 변경된 테이블
    record_id     BIGINT        NOT NULL,             -- 변경된 레코드 ID
    action        VARCHAR(20)   NOT NULL              -- create, update, delete
                  CHECK (action IN ('create', 'update', 'delete')),
    old_value     JSONB,
    new_value     JSONB,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_table  ON content_audit_logs(table_name, record_id);
CREATE INDEX idx_audit_admin  ON content_audit_logs(admin_id);
CREATE INDEX idx_audit_date   ON content_audit_logs(created_at DESC);

COMMENT ON TABLE content_audit_logs IS '콘텐츠 변경 감사 로그';

-- ─────────────────────────────────────────────────────────────
-- 15. 파일 업로드 관리
-- ─────────────────────────────────────────────────────────────

CREATE TABLE uploaded_files (
    id            BIGSERIAL     PRIMARY KEY,
    original_name VARCHAR(255)  NOT NULL,
    stored_name   VARCHAR(255)  NOT NULL,             -- 랜덤화된 저장 파일명
    mime_type     VARCHAR(100)  NOT NULL,
    file_size     BIGINT        NOT NULL,             -- bytes
    storage_path  VARCHAR(500)  NOT NULL,             -- S3 또는 로컬 경로
    uploader_type VARCHAR(30)   NOT NULL DEFAULT 'customer'
                  CHECK (uploader_type IN ('customer', 'admin')),
    uploader_ref  BIGINT,                             -- inquiry_id 또는 admin_id
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_files_ref ON uploaded_files(uploader_type, uploader_ref);

COMMENT ON TABLE uploaded_files IS '업로드 파일 메타데이터';

-- ─────────────────────────────────────────────────────────────
-- updated_at 자동 갱신 트리거
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'menus', 'contents', 'products', 'customer_stories',
            'banners', 'posts', 'inquiries', 'education_sessions', 'admins'
        ])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %I
             FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
            t, t
        );
    END LOOP;
END;
$$;
