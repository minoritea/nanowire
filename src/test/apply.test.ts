import { apply } from "../";

test('"apply" should modify a frame', () => {
  document.body.innerHTML = `
    <nw-frame id="frame-1">
      <div class="name">Alice</div>
    </nw-frame>
  `;
  apply(
    document,
    `
    <nw-frame id="frame-1">
      <div class="name">Bob</div>
    </nw-frame>
  `
  );
  expect(document.querySelector("div.name")?.textContent).toBe("Bob");
});

test('"apply" should modify multiple frames', () => {
  document.body.innerHTML = `
    <ol>
      <nw-frame id="frame-1">
        <li>Alice</li>
      </nw-frame>
      <nw-frame id="frame-2">
        <li>Bob</li>
      </nw-frame>
    </ol>
  `;
  apply(
    document,
    `
    <ol>
      <nw-frame id="frame-1">
        <li>Bob</li>
      </nw-frame>
      <nw-frame id="frame-2">
        <li>Alice</li>
      </nw-frame>
    </ol>
  `
  );
  expect(
    Array.from(document.querySelectorAll("li")).map((el) => el.textContent)
  ).toStrictEqual(["Bob", "Alice"]);
});

test('"apply" should NOT update frames without ID', () => {
  document.body.innerHTML = `
    <nw-frame>
      <div class="name">Alice</div>
    </nw-frame>
  `;
  apply(
    document,
    `
    <nw-frame id="frame-1">
      <div class="name">Bob</div>
    </nw-frame>
  `
  );
  expect(document.querySelector("div.name")?.textContent).toBe("Alice");
});

test('"apply" should update a frame when the target frame is surrounded by another frame', () => {
  document.body.innerHTML = `
    <nw-frame id="frame-1">
      <div id="alice">Alice</div>
      <nw-frame id="frame-2">
      </nw-frame>
    </nw-frame>
  `;
  apply(
    document,
    `
    <nw-frame id="frame-2">
      <div id="bob">Bob</div>
    </nw-frame>
  `
  );
  expect(document.querySelector("#alice")?.textContent).toBe("Alice");
  expect(document.querySelector("#bob")?.textContent).toBe("Bob");
});

test('"apply" should update only top level frames', () => {
  document.body.innerHTML = `
    <nw-frame id="frame-1">
      <div id="alice">Alice</div>
      <nw-frame id="frame-2">
        <div id="bob">Bob</div>
      </nw-frame>
    </nw-frame>
    <div class="outside-frame-1">
      <nw-frame id="frame-3">
      </nw-frame>
    </div>
  `;
  apply(
    document,
    `
    <nw-frame id="frame-1">
      <div id="bob">Bob</div>
      <nw-frame id="frame-3">
        <div id="carol">Carol</div>
      </nw-frame>
    </nw-frame>
  `
  );
  expect(document.querySelector("#alice")).toBeNull();
  expect(document.querySelector(".outside-frame-1 #carol")).toBeNull();
  expect(document.querySelector("#carol")?.textContent).toBe("Carol");
});
