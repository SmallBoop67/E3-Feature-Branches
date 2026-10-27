import eyesUrl from "./assets/eyes.png?no-inline";
import sweatUrl from "./assets/sweat.png?no-inline";

const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A nervous face with wide worried eyes and a sweat drop on the temple",
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

const eyesImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
eyesImage.setAttribute("href", eyesUrl);
eyesImage.setAttribute("x", "40");
eyesImage.setAttribute("y", "22");
eyesImage.setAttribute("width", "120");
eyesImage.setAttribute("height", "120");
face.append(eyesImage);

const sweatImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
sweatImage.setAttribute("href", sweatUrl);
sweatImage.setAttribute("x", "125");
sweatImage.setAttribute("y", "35");
sweatImage.setAttribute("width", "40");
sweatImage.setAttribute("height", "40");
face.append(sweatImage);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
