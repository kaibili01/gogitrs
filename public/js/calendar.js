console.log("calendar.js");
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
  const userId = getCookie("jwt");
  if (!userId) {
    window.location.href = "/login";
  }
  const query = `
    query reservations($userId: String!) {
      reservations(userId: $userId) {
        post{
          id
        }
      }
    }
    `;
  console.log(userId);
  console.log(query);
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query,
      variables: {
        userId
      }
    })
  })
    .then(r => r.json())
    .then(data => {
      const id = data.data.reservations.map(x => x.post.id);
      console.log(id);
      const newQuery = `
        query posts($id: [Int]) {
          posts(id:$id) {
            id
            title
            instructions
            postedBy {
              username
              email
            }
          }
        }
      `;
      console.log("new query:  ", newQuery);
      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          newQuery,
          variables: {
            id
          }
        })
      })
        .then(r => r.json())
        .then(data => {
          console.table(data);
        });
    });
});
