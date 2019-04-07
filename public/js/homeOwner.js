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
    const quantity = $("#quantity")
        .val()
        .trim();
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
    const userId = "????"; //set up request with JWT!!!!!
    const query = `
    mutation login($userEntry: String!, $passwordEntry: String!) {
      login(username: $userEntry, password: $passwordEntry){
        token
      }
    }
    mutation addPost($title: String!, $quantity: Int!, $instructions: String, $address: String!, $city: String!, $state: String!, $date: String!, $startTime: String!, $endTime: String!, $userId: Int!) {
      addPost(title: $title,quantity:$quantity,instructions:$instructions,address:$address,city:$city,state:$state,date:$date,startTime:$startTime,endTime:$endTime,userId:$userId) {
        id
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
        .then(data => {
            //initializes user token as cookie
            window.location.href = "/feed";
        });
});
