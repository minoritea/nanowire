interface Root {
  querySelectorAll: typeof document.querySelectorAll
}

export const apply = async (text: string, root: Root) => {
  const frames = root.querySelectorAll('nanowire-frame');
  const frameMap = new Map<string, Element>();
  frames.forEach(el => {
    if (el.id !== '') {
      if (frameMap.has(el.id)) {
        console.warn(`Some frames has a same ID: "${el.id}". It might cause invalid rendering.`);
      }
      frameMap.set(el.id, el);
    }
  })
  const parser = new DOMParser();
  const newFrames = parser.parseFromString(text, 'text/html')
    .querySelectorAll('nanowire-frame:not(nanowire-frame nanowire-frame)');
  newFrames.forEach(el => {
    const dist = frameMap.get(el.id)
    if (dist != null) {
      dist.replaceWith(el)
    }
  })
}
