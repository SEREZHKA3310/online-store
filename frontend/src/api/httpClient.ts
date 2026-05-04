type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
};

type HttpResponse<T> = {
  data: T;
  status: number;
};

const BASE_URL = "/api";

const createQueryString = (params?: RequestConfig["params"]) => {
  if (!params) return "";
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

const request = async <T>(method: HttpMethod, url: string, config?: RequestConfig): Promise<HttpResponse<T>> => {
  const query = createQueryString(config?.params);
  const response = await fetch(`${BASE_URL}${url}${query}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(config?.headers ?? {}),
    },
    body: config?.body ? JSON.stringify(config.body) : undefined,
  });

  const data = await parseResponse(response);

  return {
    data: data as T,
    status: response.status,
  };
};

const httpClient = {
  get: <T>(url: string, config?: Omit<RequestConfig, "body">) => request<T>("GET", url, config),
  post: <T>(url: string, config?: RequestConfig) => request<T>("POST", url, config),
  put: <T>(url: string, config?: RequestConfig) => request<T>("PUT", url, config),
  patch: <T>(url: string, config?: RequestConfig) => request<T>("PATCH", url, config),
  delete: <T>(url: string, config?: Omit<RequestConfig, "body">) => request<T>("DELETE", url, config),
};

export default httpClient;
