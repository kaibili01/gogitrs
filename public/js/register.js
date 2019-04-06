const regBtn = $("#register-button");
console.log("This is the register page!");
regBtn.on("click", event => {
  event.preventDefault();
  const email = $("#email")
    .val()
    .trim();
  const firstName = $("#first-name")
    .val()
    .trim();
  const lastName = $("#last-name")
    .val()
    .trim();
  const username = $("#username")
    .val()
    .trim();
  const password1 = $("#password1")
    .val()
    .trim();
  const password2 = $("password2")
    .val()
    .trim();
  let password;
  if (password1 !== password2) {
    $("#password-div")
      .append("<p>")
      .text("Both passwords must match");
    return;
  } else if (email.indexOf(".") === -1 || email.indexOf("@") === -1) {
    $("#email-div")
      .append("<p>")
      .text("You must input a valid email address.");
    return;
  } else {
    password = password1;
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
  }
});
