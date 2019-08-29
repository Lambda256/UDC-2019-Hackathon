// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function go() {
  document.getElementById("body2").style.display = "";
  document.getElementById("emptydiv").style.display = "";
  window.location = "./index.html#body2";
}
