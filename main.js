
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ruler = document.getElementById('ruler');
const captureBtn = document.getElementById('capture');
const toggleRulerBtn = document.getElementById('toggleRuler');

let isRulerVisible = false;

// Ruler toggle
toggleRulerBtn.addEventListener('click', () => {
  isRulerVisible = !isRulerVisible;
  ruler.style.display = isRulerVisible ? 'block' : 'none';
});

// Camera setup
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert('カメラにアクセスできません: ' + err);
  });

// Capture
captureBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);
  if (isRulerVisible) {
    const rulerImg = new Image();
    rulerImg.src = 'tetra-ruler.png';
    rulerImg.onload = () => {
      ctx.drawImage(rulerImg, 0, 0, canvas.width, canvas.height);
      downloadImage();
    };
  } else {
    downloadImage();
  }
});

function downloadImage() {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'tetra_snap.png';
  a.click();
}
