import morphdom from "morphdom";

interface Root {
  querySelectorAll: typeof document.querySelectorAll;
}

export const apply = async (root: Root, text: string) => {
  const frames = root.querySelectorAll("nw-frame");
  const frameMap = new Map<string, Element>();
  frames.forEach((el) => {
    if (el.id !== "") {
      if (frameMap.has(el.id)) {
        console.warn(
          `Some frames has a same ID: "${el.id}". It might cause invalid rendering.`
        );
      }
      frameMap.set(el.id, el);
    }
  });
  const parser = new DOMParser();
  const newFrames = parser
    .parseFromString(text, "text/html")
    .querySelectorAll("nw-frame:not(nw-frame nw-frame)");
  newFrames.forEach((el) => {
    const dest = frameMap.get(el.id);
    if (dest != null) {
      morphdom(dest, el);
    }
  });
};
