$(document).ready(() => {
  $("#logout-btn").on("click", event => {
    event.preventDefault();
    document.cookie = "jwt=;";
    window.location.href = "/login";
  });
});
