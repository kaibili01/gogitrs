$(document).ready(() => {
  const getCookie = name => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts
        .pop()
        .split(";")
        .shift();
    }
  };
  const jwt = getCookie("jwt");
  if (!jwt) {
    window.location.href = "/login";
  }
  $(document).on("click", "#logout-btn", event => {
    event.preventDefault();
    document.cookie = "jwt=;";
    window.location.href = "/login";
  });
  $(document).on("click", "#delete-acc", event => {
    event.preventDefault();
    const jwt = getCookie("jwt");
    const query = `
    mutation removeUser($jwt: String!) {
      removeUser(jwt: $jwt){
        id
      }
    }
    `;
    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { jwt }
      })
    }).then(() => {
      document.cookie = "jwt=;";
      window.location.href = "/login";
    });
  });
});
