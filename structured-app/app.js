const navButtons = document.querySelectorAll(".bottom-nav button");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});
