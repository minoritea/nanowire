import morphdom from "morphdom";

export interface Root {
  querySelectorAll: typeof document.querySelectorAll;
  querySelector: typeof document.querySelector;
}

export const apply = async (root: Root, text: string) => {
  const parser = new DOMParser();
  const frames = parser
    .parseFromString(text, "text/html")
    .querySelectorAll("nw-frame:not(nw-frame nw-frame)");
  frames.forEach((el) => {
    if (el.id === "") {
      return;
    }
    const dest = root.querySelector(`nw-frame#${el.id}`);
    if (dest != null) {
      morphdom(dest, el);
    }
  });
};
