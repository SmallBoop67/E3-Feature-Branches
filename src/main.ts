const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

function buildFace(): SVGSVGElement {
  const SVG_NS = "http://www.w3.org/2000/svg";

  const face = document.createElementNS(SVG_NS, "svg");
  face.setAttribute("viewBox", "0 0 200 200");
  face.setAttribute("role", "img");
  face.setAttribute(
    "aria-label",
    "A worried face shaded from green at the top to lavender at the bottom, with curved worried eyebrows and a wobbly mouth",
  );

  const defs = document.createElementNS(SVG_NS, "defs");
  const gradient = document.createElementNS(SVG_NS, "linearGradient");
  gradient.setAttribute("id", "head-shade");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "0%");
  gradient.setAttribute("y2", "100%");

  const topStop = document.createElementNS(SVG_NS, "stop");
  topStop.setAttribute("offset", "0%");
  topStop.setAttribute("stop-color", "#9ee6a8");

  const midStop = document.createElementNS(SVG_NS, "stop");
  midStop.setAttribute("offset", "50%");
  midStop.setAttribute("stop-color", "#c9e3d6");

  const bottomStop = document.createElementNS(SVG_NS, "stop");
  bottomStop.setAttribute("offset", "100%");
  bottomStop.setAttribute("stop-color", "#b9a7e8");

  gradient.append(topStop, midStop, bottomStop);
  defs.append(gradient);
  face.append(defs);

  const head = document.createElementNS(SVG_NS, "ellipse");
  head.setAttribute("cx", "100");
  head.setAttribute("cy", "100");
  head.setAttribute("rx", "78");
  head.setAttribute("ry", "86");
  head.setAttribute("fill", "url(#head-shade)");
  head.setAttribute("stroke", "#302c29");
  head.setAttribute("stroke-width", "4");
  face.append(head);

  const leftEye = document.createElementNS(SVG_NS, "ellipse");
  leftEye.setAttribute("cx", "72");
  leftEye.setAttribute("cy", "82");
  leftEye.setAttribute("rx", "6");
  leftEye.setAttribute("ry", "9");
  leftEye.setAttribute("fill", "#302c29");
  face.append(leftEye);

  const rightEye = document.createElementNS(SVG_NS, "ellipse");
  rightEye.setAttribute("cx", "128");
  rightEye.setAttribute("cy", "82");
  rightEye.setAttribute("rx", "6");
  rightEye.setAttribute("ry", "9");
  rightEye.setAttribute("fill", "#302c29");
  face.append(rightEye);

  const nose = document.createElementNS(SVG_NS, "line");
  nose.setAttribute("x1", "100");
  nose.setAttribute("y1", "96");
  nose.setAttribute("x2", "96");
  nose.setAttribute("y2", "112");
  nose.setAttribute("stroke", "#302c29");
  nose.setAttribute("stroke-width", "4");
  nose.setAttribute("stroke-linecap", "round");
  face.append(nose);

  const mouth = document.createElementNS(SVG_NS, "path");
  mouth.setAttribute("d", "M 72 142 Q 86 128 100 138 Q 114 148 128 136");
  mouth.setAttribute("fill", "none");
  mouth.setAttribute("stroke", "#302c29");
  mouth.setAttribute("stroke-width", "4");
  mouth.setAttribute("stroke-linecap", "round");
  face.append(mouth);

  // Worried brows
  for (const d of ["M 52 66 Q 68 56 90 52", "M 110 52 Q 132 56 148 66"]) {
    const brow = document.createElementNS(SVG_NS, "path");
    brow.setAttribute("d", d);
    brow.setAttribute("fill", "none");
    brow.setAttribute("stroke", "#302c29");
    brow.setAttribute("stroke-width", "4");
    brow.setAttribute("stroke-linecap", "round");
    face.append(brow);
  }

  return face;
}

const face = buildFace();
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
