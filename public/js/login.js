$("#login-btn").on("click", () => {
  const userEntry = $("#user-entry")
    .val()
    .trim();
  const passwordEntry = $("#password-entry")
    .val()
    .trim();
  const query = `
    mutation login($userEntry: String!, $passwordEntry: String!) {
      login(username: $userEntry, password: $passwordEntry){
        user {
          username
          firstName
          lastName
        }
        token
      }
    }`;
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { userEntry, passwordEntry }
    })
  })
    .then(r => r.json())
    .then(data => console.log("data returned:", data)); //PROBABLY MAKE THIS INTO A COOKIE OR SOMETHING
});
