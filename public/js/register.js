const regBtn = $("#registerButton");

regBtn.on("click", () => {
  const email = $("#email").val();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const username = $("#user-name").val();
  const password1 = $("#password1").val();
  const password2 = $("password2").val();
  let password;
  if (password1 !== password2) {
    $("#password-div")
      .append("<p>")
      .text("Both passwords must match");
  } else if (email.indexOf(".") === -1 || email.indexOf("@") === -1) {
    $("#email-div")
      .append("<p>")
      .text("You must input a valid email address.");
  } else {
    password = password1;
  }
  //API POST REQUEST HERE
  const query = `mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password)
  }`;
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { firstName, lastName, username, email, password }
    })
  })
    .then(r => r.json())
    .then(data => console.log("data returned:", data));
});
