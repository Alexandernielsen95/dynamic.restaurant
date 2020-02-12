const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});


fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCat) {

        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        a.textContent = oneCat;
        document.querySelector("#wrapper>header>nav").appendChild(a);



        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;

        section.appendChild(h2);
        console.log(section)

        document.querySelector("main").appendChild(section);
    })
    getProducts();
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}

function showData(jsonData) {
    console.log(jsonData)

    jsonData.forEach(showSingleDish)
}

function showSingleDish(dish) {


    const template = document.querySelector("#dishTemplate").content;

    const copy = template.cloneNode("true");

    copy.querySelector("h2").textContent = dish.name;
    copy.querySelector("p").textContent = dish.shortdescription;
    if (!dish.soldout) {
        copy.querySelector(".soldout").remove();
    }




    if (dish.discount) {

        copy.querySelector(".price-discount span").textContent = dish.price;

        const newprice = Math.round(dish.price - dish.price * dish.discount / 100);

        copy.querySelector(".price-full span").textContent = newprice;
    } else {
        copy.querySelector(".price-discount").remove()
        copy.querySelector(".price-full").textContent = dish.price;
    }

    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + dish.image + "-sm.jpg";
    copy.querySelector("img").setAttribute("src", smallImg)


    copy.querySelector("#readMore").addEventListener("click", () => {
        console.log("click", dish)
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });

    console.log(`#${dish.category}`)
    document.querySelector(`#${dish.category}`).appendChild(copy);
    //    document.querySelector("#starters").appendChild(copy)

}

/*showDish();
function showDish(dish) {

  copy.querySelector("#readMore").addEventListener("click", () => {
  console.log("click" , dish)
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });
}*/
function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-vegetarian").textContent = "Vegetarian: " + data.vegetarian;
    modal.classList.remove("hide");
}
