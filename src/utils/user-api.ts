import { redirect } from 'next/navigation';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HttpOptions {
  headers?: Record<string, string>;
  authToken?: string;
  redirectOnUnauthorized?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api-users';

export async function userApi<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: unknown,
  options: HttpOptions = {}
) {
  const url = `${BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (typeof window !== 'undefined') {
    const token = options.authToken || localStorage.getItem('authToken');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (options.redirectOnUnauthorized !== false) {
      return Promise.reject('Unauthorized');
    }
  }

  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
}
