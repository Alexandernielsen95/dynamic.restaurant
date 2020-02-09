fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function (response){
return response.json()
})

.then(function (data) {
    showData(data)
})

function showData (jsonData) {
    console.log(jsonData)
}

jsonDate.forEach(showAsingleDish)

function showAsingleDish (dish)
cosole.log(dish)

const template = document.querySelector("#dishTemplate").content;

const copy = template.cloneNode("true");

copy.querySelector("#head").textContent("hi mom");

document.querySelector("#starters").appendChild(copy);

