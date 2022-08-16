# Nanowire
Nanowire is a minimal DOM patcher for HTML-over-the-wire.

# How to use
1. Enclose the element to be updated in a `<nw-frame>` tag with a unique ID.
2. Give the following arguments to the `apply` function,
    1. The DOM node or document that is the ancestor of the "nw-frame" to be updated,
    2. Text containing "nw-frame" tags surrounding the updated content.

The following HTML is displayed first,
```html
<nw-frame id="frame">
Hello?
</nw-frame>
```

and then the following code is executed,

```javascript
import { apply } from 'nanowire';
apply(document, '<nw-frame id="frame">Hello, World!</nw-frame>');
```

the result is as follows.
```html
<nw-frame id="frame">
Hello, World!
</nw-frame>
```

You can apply server-side rendered HTML as updates.
```javascript
fetch('your API').then(res => res.text()).then(text => apply(document, text));
```

The `nanowire/client` module provides short hands for fetch and apply.
```html
<script src="/nanowire/client.js"></script>

<button onClick="nanowire.get('your API')">GET</button>

<button onClick="nanowire.post('your API', JSON.stringify(['request body']))">POST</button>
```

# Example

See the example.
```shell
# in this repository.
$ cd example
$ yarn serve
```

# LICENSE
MIT License(see LICENSE file).
