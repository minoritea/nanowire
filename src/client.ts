import { apply } from "./";

export const client = {
  async get(url: Request | URL | string, init?: RequestInit) {
    init = { ...init, method: "GET" };
    const res = await fetch(url, init);
    return apply(document, await res.text());
  },

  async post(
    url: Request | URL | string,
    body?: BodyInit | null,
    init?: RequestInit
  ) {
    init = { ...init, method: "POST" };
    if (body != null) {
      init.body = body;
    }
    const res = await fetch(url, init);
    return apply(document, await res.text());
  },

  async put(
    url: Request | URL | string,
    body?: BodyInit | null,
    init?: RequestInit
  ) {
    init = { ...init, method: "PUT" };
    if (body != null) {
      init.body = body;
    }
    const res = await fetch(url, init);
    return apply(document, await res.text());
  },

  async delete(url: Request | URL | string, init?: RequestInit) {
    init = { ...init, method: "DELETE" };
    const res = await fetch(url, init);
    return apply(document, await res.text());
  },

  apply,
};

export default client;
