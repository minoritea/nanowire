# Nanowire
Nanowire is a minimal DOM renderer inspired by Hotwire's Turbo-Frames.

# How to use
```html
<nw-frame id="frame0">
  <div>Hello, <span>Alice</span></div>
</nw-frame>
<button onClick="fetchAndApply('./bob.html')">Update</button>
<script src="module">
import { apply } from "./nanowire.mjs"
window.fetchAndApply = async (url) =>
  fetch(url).then(res => res.text()).then(doc => apply(document, doc));
</script>
```

# LICENSE
MIT License(see LICENSE file).
