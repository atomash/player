interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export interface ISFetch {
  url?: string;
  get<T>(path: string, args?: RequestInit): Promise<HttpResponse<T>>;
  post<T>(
    path: string,
    body: any,
    args?: RequestInit
  ): Promise<HttpResponse<T>>;
  put<T>(path: string, body: any, args?: RequestInit): Promise<HttpResponse<T>>;
}

async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export default class SFetch {
  url?: string;
  opt?: {};
  constructor(url?: string, opt?: {}) {
    this.url = url || '';
    this.opt = opt || {};
  }
  get = async <T>(
    path: string,
    args: RequestInit = { method: 'get' }
  ): Promise<HttpResponse<T>> => {
    return await http<T>(
      new Request(this.url + path, { ...this.opt, ...args })
    );
  };

  post = async <T>(
    path: string,
    body: any,
    args: RequestInit = { method: 'post', body: JSON.stringify(body) }
  ): Promise<HttpResponse<T>> => {
    return await http<T>(
      new Request(this.url + path, { ...this.opt, ...args })
    );
  };

  put = async <T>(
    path: string,
    body: any,
    args: RequestInit = { method: 'put', body: JSON.stringify(body) }
  ): Promise<HttpResponse<T>> => {
    return await http<T>(
      new Request(this.url + path, { ...this.opt, ...args })
    );
  };
}
