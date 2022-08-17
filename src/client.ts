import { apply } from "./";

type FetchInput = Parameters<typeof fetch>[0];
const fetchAndApply = async (
  input: FetchInput,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: BodyInit | null,
  init?: RequestInit | null
) => {
  init = { ...init, method };
  if (body != null) {
    init.body = body;
  }
  const res = await fetch(input, init);
  return apply(document, await res.text());
};

export const client = {
  async get(input: FetchInput, init?: RequestInit) {
    return fetchAndApply(input, "GET", null, init);
  },
  async post(input: FetchInput, body?: BodyInit | null, init?: RequestInit) {
    return fetchAndApply(input, "POST", body, init);
  },
  async put(input: FetchInput, body?: BodyInit | null, init?: RequestInit) {
    return fetchAndApply(input, "PUT", body, init);
  },
  async delete(input: FetchInput, init?: RequestInit) {
    return fetchAndApply(input, "DELETE", null, init);
  },
  apply,
};

export default client;
