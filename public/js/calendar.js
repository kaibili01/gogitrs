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
  if (!getCookie("jwt")) {
    window.location.href = "/login";
  }
  $(document).on("click", ".calendar-btn", event => {
    event.preventDefault();
    const postId = parseInt(event.target.attributes["data-post"].nodeValue);
    console.log("postId:", postId);
    const jwt = getCookie("jwt");
    const query = `
      mutation addReservation($jwt: String!, $postId: Int!) {
        addReservation(jwt: $jwt, postId:$postId)
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
        variables: { jwt, postId }
      })
    });
  });
});
