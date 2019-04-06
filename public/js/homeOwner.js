let states = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']

let btn;

for (let i = 0; i < states.length; i++) {
    $("#dDownMenu").append(`<button class="dropdown-item" type="button">${states[i]}</button>`);
}

let dDownBtn = "Dropdown"

$("#dDownBtn").text(dDownBtn);

$("#dDownBtn").on("click", function() {
    dDownBtn = $(this.text);
    console.log(dDownBtn);
    return dDownBtn;
});