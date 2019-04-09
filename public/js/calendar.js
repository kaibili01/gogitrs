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
  const getReservations = async () => {
    const reservations = await fetch("/graphql", {
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
    });
    const json = await reservations.json();
    const id = json.data.reservations.map(x => x.post.id);
    getPosts(id);
  };
  const getPosts = async id => {
    const newQuery = `
      query Post($id: [Int]) {
        posts(id: $id) {
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
    console.log("Ids: ", id);
    console.log("new query:  ", newQuery);
    const posts = await fetch("/graphql", {
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
    });
    const json = await posts.json();
    console.table(json);
  };
  getReservations();
});
