const regBtn = $("#registerButton");

regBtn.on("click", () => {
  const email = $("#email").val();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const userName = $("#user-name").val();
  const password1 = $("#password1").val();
  const password2 = $("password2").val();
  if (password1 !== password2) {
    $("#password-div")
      .append("<p>")
      .text("Both passwords must match");
  } else if (email.indexOf(".") === -1 || email.indexOf("@") === -1) {
    $("#email-div")
      .append("<p>")
      .text("You must input a valid email address.");
  }
  //API POST REQUEST HERE
});
