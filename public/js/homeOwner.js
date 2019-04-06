const states = require("./statecodes");

for (let i = 0; i < states.length; i++) {
    $("#dDownMenu").append(
        `<button class="dropdown-item" type="button">${states[i]}</button>`
    );
}

let dDownBtn = "Dropdown";

$("#dDownBtn").text(dDownBtn);

$("#dDownBtn").on("click", function () {
    dDownBtn = $(this.text);
    console.log(dDownBtn);
    return dDownBtn;
});
