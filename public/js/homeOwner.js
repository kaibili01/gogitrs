const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];
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

for (let i = 0; i < states.length; i++) {
  $("#dDownMenu").append(
    `<button class="dropdown-item" type="button">${states[i]}</button>`
  );
}

let dDownBtn = "State";

$("#dDownBtn").text(dDownBtn);

$(".dropdown-item").on("click", function () {
  dDownBtn = $(this).text();
  $("#dDownBtn").text(dDownBtn);
});

$("#submit-btn").on("click", function () {
  const title = $("#title")
    .val()
    .trim();
  const quantity = parseInt(
    $("#quantity")
      .val()
      .trim()
  );
  const address = $("#address")
    .val()
    .trim();
  const city = $("#city")
    .val()
    .trim();
  const state = $("#dDownBtn").text();
  const date = $("#date")
    .val()
    .trim();
  const startTime = $("#start-time")
    .val()
    .trim();
  const endTime = $("#end-time")
    .val()
    .trim();
  const instructions = $("#instructions")
    .val()
    .trim();
  const userId = getCookie("jwt"); //set up request with JWT!!!!!
  const query = `
    mutation addPost($title: String!, $quantity: Int!, $instructions: String, $address: String!, $city: String!, $state: String!, $date: String!, $startTime: String!, $endTime: String!, $userId: String!) {
      addPost(title: $title,quantity:$quantity,instructions:$instructions,address:$address,city:$city,state:$state,date:$date,startTime:$startTime,endTime:$endTime,userId:$userId) {
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
      variables: {
        title,
        quantity,
        instructions,
        address,
        city,
        state,
        date,
        startTime,
        endTime,
        userId
      }
    })
  })
    .then(r => r.json())
    .then(() => {
      window.location.href = "/feed";
    });
});
