let offscreen;
let offctx;

function ensureOffscreen(w, h) {
  if (!offscreen) {
    offscreen = document.createElement("canvas");
    offctx = offscreen.getContext("2d");
  }
  if (offscreen.width !== w) offscreen.width = w;
  if (offscreen.height !== h) offscreen.height = h;
  return { offscreen, offctx };
}

export function tintWhiteSprite(spriteImg, hexColor) {
  const w = spriteImg.width;
  const h = spriteImg.height;

  const { offscreen, offctx } = ensureOffscreen(w, h);

  // Clear
  offctx.setTransform(1, 0, 0, 1, 0, 0);
  offctx.clearRect(0, 0, w, h);

  // 1) Draw the white mask sprite
  offctx.globalCompositeOperation = "source-over";
  offctx.drawImage(spriteImg, 0, 0);

  // 2) Multiply the chosen color onto it
  offctx.globalCompositeOperation = "multiply";
  offctx.fillStyle = hexColor;
  offctx.fillRect(0, 0, w, h);

  // 3) Keep only the sprite's alpha (so color doesn't fill the whole rect)
  offctx.globalCompositeOperation = "destination-in";
  offctx.drawImage(spriteImg, 0, 0);

  // Reset comp mode for safety
  offctx.globalCompositeOperation = "source-over";

  return offscreen;
}