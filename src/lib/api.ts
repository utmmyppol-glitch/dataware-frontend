const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Products
  getProducts: (category?: string) =>
    fetchApi<ProductResponse[]>(`/products${category ? `?category=${category}` : ''}`),
  getProduct: (slug: string) =>
    fetchApi<ProductResponse>(`/products/${slug}`),

  // Posts
  getPosts: (category?: string, page = 0, size = 10) =>
    fetchApi<PageResponse<PostResponse>>(
      `/posts?page=${page}&size=${size}${category ? `&category=${category}` : ''}`
    ),
  getPost: (id: number) =>
    fetchApi<PostResponse>(`/posts/${id}`),

  // Customer Stories
  getCustomerStories: (industry?: string, page = 0, size = 10) =>
    fetchApi<PageResponse<CustomerStoryResponse>>(
      `/customer-stories?page=${page}&size=${size}${industry ? `&industry=${industry}` : ''}`
    ),

  // Banners
  getBanners: (position?: string) =>
    fetchApi<BannerResponse[]>(`/banners${position ? `?position=${position}` : ''}`),

  // Client Logos
  getClientLogos: () =>
    fetchApi<ClientLogoResponse[]>('/client-logos'),

  // Inquiry
  submitInquiry: (data: InquiryRequest) =>
    fetchApi<InquiryResponse>('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Download
  submitDownload: (data: DownloadRequest) =>
    fetchApi<{ message: string; id: number }>('/downloads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Education
  submitEducation: (data: EducationRequest) =>
    fetchApi<{ message: string; id: number }>('/educations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Seminar
  submitSeminar: (data: SeminarRequest) =>
    fetchApi<{ message: string; id: number }>('/seminars', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Types used by API
interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface ProductResponse {
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

interface PostResponse {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnailUrl: string;
  viewCount: number;
  createdAt: string;
}

interface CustomerStoryResponse {
  id: number;
  company: string;
  industry: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  logoUrl: string;
  createdAt: string;
}

interface BannerResponse {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
}

interface ClientLogoResponse {
  id: number;
  name: string;
  logoUrl: string;
}

interface InquiryRequest {
  name: string;
  company: string;
  phone: string;
  email: string;
  message?: string;
  product?: string;
  consentPrivacy: boolean;
  consentThirdParty?: boolean;
}

interface InquiryResponse {
  id: number;
  name: string;
  company: string;
  status: string;
  createdAt: string;
}

interface DownloadRequest {
  name: string;
  company: string;
  phone: string;
  email: string;
  fileType?: string;
  consentPrivacy: boolean;
  consentThirdParty?: boolean;
  consentMarketing?: boolean;
}

interface EducationRequest {
  name: string;
  company: string;
  phone: string;
  email: string;
  position?: string;
  preferredDate?: string;
  note?: string;
  consentPrivacy: boolean;
  consentThirdParty?: boolean;
}

interface SeminarRequest {
  name: string;
  company: string;
  phone: string;
  email: string;
  department?: string;
  preferredDate?: string;
  attendees?: number;
  topic?: string;
  note?: string;
  consentPrivacy: boolean;
  consentThirdParty?: boolean;
}

export type {
  PageResponse,
  ProductResponse,
  PostResponse,
  CustomerStoryResponse,
  BannerResponse,
  ClientLogoResponse,
  InquiryRequest,
  InquiryResponse,
  DownloadRequest,
  EducationRequest,
  SeminarRequest,
};
