import * as nanowire from "../";
import client from "../client";

jest.mock("../");
const {apply: applyMock} = nanowire as jest.Mocked<typeof nanowire>;
applyMock.mockResolvedValue(Promise.resolve())
afterEach(() => applyMock.mockClear())

const fetchMock = jest.fn(() => Promise.resolve({
  text() {return Promise.resolve("mock text")}
} as any as Response));
globalThis.fetch = fetchMock;
afterEach(() => fetchMock.mockClear())

test('client.get should call "fetch" and "apply"', async () => {
  await client.get("test-url")
  expect(fetchMock).toBeCalledWith("test-url", {method: "GET"});
  expect(applyMock).toBeCalledWith(document, "mock text");
})

test('client.post should call "fetch" and "apply"', async () => {
  await client.post("test-url")
  expect(fetchMock).toBeCalledWith("test-url", {method: "POST"});
  expect(applyMock).toBeCalledWith(document, "mock text");
})

test('client.put should call "fetch" and "apply"', async () => {
  await client.put("test-url")
  expect(fetchMock).toBeCalledWith("test-url", {method: "PUT"});
  expect(applyMock).toBeCalledWith(document, "mock text");
})

test('client.delete should call "fetch" and "apply"', async () => {
  await client.delete("test-url")
  expect(fetchMock).toBeCalledWith("test-url", {method: "DELETE"});
  expect(applyMock).toBeCalledWith(document, "mock text");
})
