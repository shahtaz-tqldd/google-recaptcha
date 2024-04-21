const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse?.length) {
    alert("Captcha not completed!");
  }

  const fd = new FormData(e.target);
  const params = new URLSearchParams(fd);

  fetch("http://localhost:5000/form-submit", {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.captchaSuccess) {
        alert("Captcha verified successful!");
      }
    });
});
