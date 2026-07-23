// Admin API helper — attaches Basic Auth header from sessionStorage

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const ADMIN_API_URL = (API_BASE_URL.replace('/api/dataware', '') || 'http://localhost:8080') + '/api/admin';

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const credentials = sessionStorage.getItem('adminCredentials');
  if (!credentials) return {};
  return { Authorization: `Basic ${credentials}` };
}

async function adminFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('adminCredentials');
      window.location.href = '/admin';
    }
    throw new Error('인증이 만료되었습니다. 다시 로그인해 주세요.');
  }

  if (!response.ok) {
    throw new Error(`API 오류: ${response.status}`);
  }

  // 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export function storeCredentials(username: string, password: string) {
  const encoded = btoa(`${username}:${password}`);
  sessionStorage.setItem('adminCredentials', encoded);
}

export function clearCredentials() {
  sessionStorage.removeItem('adminCredentials');
}

export function hasCredentials(): boolean {
  if (typeof window === 'undefined') return false;
  return !!sessionStorage.getItem('adminCredentials');
}

export async function adminLogin(username: string, password: string): Promise<{ role: string }> {
  const response = await fetch(`${ADMIN_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.');
  return response.json();
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export interface InquiryAdmin {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  product?: string;
  message?: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface EducationAdmin {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  position?: string;
  preferredDate?: string;
  note?: string;
  status: string;
  createdAt: string;
}

export interface SeminarAdmin {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  department?: string;
  preferredDate?: string;
  attendees?: number;
  topic?: string;
  note?: string;
  status: string;
  createdAt: string;
}

export interface ProductAdmin {
  id: number;
  name: string;
  slug: string;
  category: string;
  subtitle: string;
  description: string;
  features: string;
  iconUrl: string;
  thumbnailUrl: string;
  certification: string;
  sortOrder: number;
}

export interface PostAdmin {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnailUrl: string;
  viewCount: number;
  createdAt: string;
}

export interface BannerAdmin {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  sortOrder: number;
  active: boolean;
}

export interface CustomerStoryAdmin {
  id: number;
  company: string;
  industry: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  logoUrl: string;
  createdAt: string;
}

export interface DownloadAdmin {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  fileType?: string;
  consentPrivacy?: boolean;
  consentThirdParty?: boolean;
  consentMarketing?: boolean;
  createdAt: string;
}

// ── API ───────────────────────────────────────────────────────────────────────

export const adminApi = {
  // Downloads
  getDownloads: (page = 0, size = 20) =>
    adminFetch<PageResponse<DownloadAdmin>>(`/downloads?page=${page}&size=${size}`),

  // Inquiries
  getInquiries: (page = 0, size = 20) =>
    adminFetch<PageResponse<InquiryAdmin>>(`/inquiries?page=${page}&size=${size}`),

  updateInquiryStatus: (id: number, status: InquiryStatus) =>
    adminFetch<InquiryAdmin>(`/inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Educations
  getEducations: (page = 0, size = 20) =>
    adminFetch<PageResponse<EducationAdmin>>(`/educations?page=${page}&size=${size}`),

  // Seminars
  getSeminars: (page = 0, size = 20) =>
    adminFetch<PageResponse<SeminarAdmin>>(`/seminars?page=${page}&size=${size}`),

  // Products
  getProducts: () =>
    adminFetch<ProductAdmin[]>('/products'),

  createProduct: (data: Omit<ProductAdmin, 'id'>) =>
    adminFetch<ProductAdmin>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProduct: (id: number, data: Partial<ProductAdmin>) =>
    adminFetch<ProductAdmin>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: number) =>
    adminFetch<void>(`/products/${id}`, { method: 'DELETE' }),

  // Posts
  getPosts: (page = 0, size = 20) =>
    adminFetch<PageResponse<PostAdmin>>(`/posts?page=${page}&size=${size}`),

  createPost: (data: Omit<PostAdmin, 'id' | 'viewCount' | 'createdAt'>) =>
    adminFetch<PostAdmin>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePost: (id: number, data: Partial<PostAdmin>) =>
    adminFetch<PostAdmin>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePost: (id: number) =>
    adminFetch<void>(`/posts/${id}`, { method: 'DELETE' }),

  // Banners
  getBanners: () =>
    adminFetch<BannerAdmin[]>('/banners'),

  createBanner: (data: Omit<BannerAdmin, 'id'>) =>
    adminFetch<BannerAdmin>('/banners', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateBanner: (id: number, data: Partial<BannerAdmin>) =>
    adminFetch<BannerAdmin>(`/banners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteBanner: (id: number) =>
    adminFetch<void>(`/banners/${id}`, { method: 'DELETE' }),

  // Customer Stories
  getCustomerStories: (page = 0, size = 20) =>
    adminFetch<PageResponse<CustomerStoryAdmin>>(`/customer-stories?page=${page}&size=${size}`),

  createCustomerStory: (data: Omit<CustomerStoryAdmin, 'id' | 'createdAt'>) =>
    adminFetch<CustomerStoryAdmin>('/customer-stories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCustomerStory: (id: number, data: Partial<CustomerStoryAdmin>) =>
    adminFetch<CustomerStoryAdmin>(`/customer-stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCustomerStory: (id: number) =>
    adminFetch<void>(`/customer-stories/${id}`, { method: 'DELETE' }),
};
