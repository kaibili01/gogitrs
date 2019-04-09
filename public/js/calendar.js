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
    let query = `
        query Post($id: [Int!]) {
        posts(id: $id) {
          id
          quantity
          title
          instructions
          city
          state
          date
          startTime
          endTime
          postedBy {
            username
            email
          }
        }
      }
    `;
    const posts = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: {
          id
        }
      })
    });
    const json = await posts.json();
    console.log(json.data.posts);
    console.table(json.data.posts);
    const postArr = await json.data.posts;
    console.log("postArr is array? :", Array.isArray(postArr));
    for (let i = 0; i < postArr.length; i++) {
      console.log(postArr[i].id);
      $("#posts").append(`
        <br>
        <div class="row justify-content-center">
            <div class="card col-10" style="">
                <div class="card-body">
                    <h5 class="card-title text-center">${postArr[i].quantity} ${postArr[i].title}</h5>
                    <p class="card-text text-center">${postArr[i].city}, ${postArr[i].state}</p>
                    <p class="card-text text-center">${postArr[i].date}, ${postArr[i].startTime}—${postArr[i].endTime}</p>
                    <p class="card-text text-center">Instructions: ${postArr[i].instructions}</p>
                    <p class="card-text text-center">posted by <b>${postArr[i].postedBy.username}</b></p>
                    <div class="row">
                        <div class="col text-center">
                            <button type="button" class="btn btn-outline-success">
                                <a style="color: inherit; text-decoration:none"
                                    href="mailto:${postArr[i].postedBy.email}">Contact</a>
                            </button>
                        </div>
                        <div class="col text-center">
                            <button type="button" class="btn btn-outline-secondary">
                                <a data-post="${postArr[i].id}" class="delete-btn">Remove from calendar</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `);
    }
  };
  getReservations();
  $(document).on("click", ".delete-btn", () => {
    const postId = parseInt(event.target.attributes["data-post"].nodeValue);
    const jwt = getCookie("jwt");
    const query = `
    mutation removeReservation($jwt: String!, $postId: Int!) {
      removeReservation(jwt: $jwt, postId:$postId){
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
        variables: { jwt, postId }
      })
    }).then(() => {
      location.reload();
    });
  });
});
