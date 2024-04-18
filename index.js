document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('active');
  document.querySelectorAll('.line').forEach((line) => line.classList.toggle('active'));
});
