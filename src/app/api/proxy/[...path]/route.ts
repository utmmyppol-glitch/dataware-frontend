import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

/* ── 허용 API 경로 (SSRF 방지) ── */
const ALLOWED_PREFIXES = [
  'dataware/products',
  'dataware/posts',
  'dataware/customer-stories',
  'dataware/banners',
  'dataware/client-logos',
  'dataware/inquiries',
  'dataware/downloads',
  'dataware/educations',
  'dataware/seminars',
  'dataware/menus',
  'dataware/content',
];

function isAllowedPath(segments: string[]): boolean {
  const path = segments.join('/');
  return ALLOWED_PREFIXES.some(prefix => path === prefix || path.startsWith(prefix + '/'));
}

/* ── 요청 크기 제한 (10MB) ── */
const MAX_BODY_SIZE = 10 * 1024 * 1024;

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params.path);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params.path);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params.path);
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params.path);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params.path);
}

async function proxyRequest(req: NextRequest, pathSegments: string[]) {
  if (!isAllowedPath(pathSegments)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const path = pathSegments.join('/');
  const url = `${BACKEND_URL}/api/${path}`;
  const searchParams = req.nextUrl.searchParams.toString();
  const fullUrl = searchParams ? `${url}?${searchParams}` : url;

  const headers: Record<string, string> = {};
  const contentType = req.headers.get('content-type');
  if (contentType) headers['Content-Type'] = contentType;

  let body: BodyInit | null = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const buf = await req.arrayBuffer();
    if (buf.byteLength > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }
    body = buf.byteLength > 0 ? Buffer.from(buf) : null;
  }

  try {
    const res = await fetch(fullUrl, {
      method: req.method,
      headers,
      body,
    });

    const data = await res.arrayBuffer();
    return new NextResponse(data, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 502 });
  }
}
