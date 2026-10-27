const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A nervous face with a spiky halo around the head and many freckles across the cheeks and nose",
);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});

const SVG_NS = "http://www.w3.org/2000/svg";

function shape(
  tag: string,
  attrs: Record<string, string | number>,
  behind = false,
) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  if (behind) face.prepend(el);
  else face.append(el);
  return el;
}

// Small seeded random generator so the freckles are the same on every Spin.
let seed = 7;
function rand() {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
}

// Freckles: 150 circles in three clusters (two cheeks, one nose)
const clusters = [
  { cx: 65, cy: 118, spread: 22, count: 55 },
  { cx: 135, cy: 118, spread: 22, count: 55 },
  { cx: 100, cy: 105, spread: 14, count: 40 },
];
for (const c of clusters) {
  for (let i = 0; i < c.count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = c.spread * Math.pow(rand(), 1.5);
    shape("circle", {
      cx: c.cx + dist * Math.cos(angle),
      cy: c.cy + dist * Math.sin(angle),
      r: 1.2 + rand() * 1.3,
      fill: "#8a4b2a",
      opacity: 0.8,
    });
  }
}

// Spiky halo: 40 thin triangles pointing outward, alternating long and short
const SPIKES = 40;
for (let i = 0; i < SPIKES; i++) {
  const a = (i / SPIKES) * Math.PI * 2;
  const half = (Math.PI / SPIKES) * 0.6;
  const reach = i % 2 === 0 ? 12 : 7; // alternate long and short
  const pt = (grow: number, ang: number) =>
    `${100 + (78 + grow) * Math.cos(ang)},${100 + (86 + grow) * Math.sin(ang)}`;
  shape("polygon", {
    points: `${pt(-2, a - half)} ${pt(reach, a)} ${pt(-2, a + half)}`,
    fill: "#563b67",
  }, true);
}
