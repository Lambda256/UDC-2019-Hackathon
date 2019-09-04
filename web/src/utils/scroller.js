export const scrollTop = function(animate = true) {
  window.scrollTo({ top: 0, left: 0, behavior: animate ? "smooth": "auto" });
};

export const scrollBottom = function() {
  const body = document.getElementById("content-body");
  window.scrollTo({ top: body.scrollHeight, left: 0, behavior: "smooth" });
};
