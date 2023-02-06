//fetch de l'api
async function getProducts() {
    return fetch(`https://projet-orinoco.herokuapp.com/api/cameras`)
        .then(function (apiResponse) {
            return apiResponse.json()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//affichage des produits
function displayProducts(articles) {
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".link").setAttribute("href", "article.html?id=" + articles._id);
    clone.querySelector(".link img").setAttribute("src", articles.imageUrl);
    clone.querySelector(".link h3").textContent = articles.name;
    clone.querySelector(".link p").textContent = articles.description;
    clone.querySelector(".link span").textContent = articles.price / 100 + "€";

    document.querySelector("main").appendChild(clone);
}

//Affichage du nombre d'article dans le panier
function incrementBasket() {
    let articleQuantity = 0;
    if (localStorage.getItem("panier")) {
        let articles = JSON.parse(localStorage.getItem("panier"));
        for (article of articles) {
            articleQuantity = articleQuantity + article.quantity;
        }
    }
    else {
        return;
    }
    let basket = document.querySelector(".basket span");
    basket.textContent = `${articleQuantity}`;
}

async function main() {
    products = await getProducts();
    for (article of products) {
        displayProducts(article);
    }
    document.querySelector(".basket").addEventListener("click", (e) => {
        if (!localStorage.getItem("panier")) {
            e.preventDefault();
            alert("Vous n'avez aucun article dans le panier");
        }
    })
    incrementBasket();
}
main()