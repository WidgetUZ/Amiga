// Prosty pixel-art: zmniejszenie rozdzielczości i ograniczenie kolorów.
function loadImageToPixelArt(url) {
  const canvas = document.getElementById('pixelart');
  const ctx = canvas.getContext('2d');
  let img = new window.Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    // Zmniejsz i "rozpikseluj" – pixelizacja 16x16
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 16, 16);
    let imgData = ctx.getImageData(0, 0, 16, 16);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // powiększ – bez wygładzania, jak Amiga
    ctx.putImageData(imgData, 0, 0);
    ctx.drawImage(canvas, 0, 0, 16, 16, 0, 0, 128, 128);
  };
  img.src = url;
}
