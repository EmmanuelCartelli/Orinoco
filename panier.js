//récupération des articles dans le panier
function getBasket() {
    let array = JSON.parse(localStorage.getItem("panier"));
    if (array) {
        return array;
    }
    else {
        return 0;
    }
}
const allPrices = [];

//affichage des produits
function displayProducts(product) {
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);
    let total = product.price * product.quantity;

    clone.querySelector(".card img").setAttribute("src", product.img)
    clone.querySelector(".card h3").textContent = `${product.name} ${product.option}`;
    clone.querySelector(".card p").textContent = product.description;
    clone.querySelector(".price span").textContent = total;
    clone.querySelector(".card span").textContent += product.quantity;
    document.querySelector(".grid-container").appendChild(clone);


    allPrices.push(total);
}

//calcul du total du panier
function totalCart() {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return allPrices.reduce(reducer)
}

//fonction de test des expressions régulière qui retourne un booléen
function checkRegex(regex, input) {
    if (regex.test(input)) {
        return true;
    }
    else {
        return false;
    }
}

//Fonction d'écoute du formulaire et methode POST vers l'api
function listenForm() {
    let submitBtn = document.querySelector(".send");
    const letterFormat = /^[a-zA-ZéêèàëÉÈÊË\-]+$/;
    const adressFormat = /^[a-zA-ZéêèàëÉÈÊË0-9\s,.'-]{3,}$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mail = document.querySelector(".email");
    let adress = document.querySelector(".adress");
    let city = document.querySelector(".city");
    let nameInput = document.querySelector(".firstname");
    let lastname = document.querySelector(".lastname");
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (checkRegex(letterFormat, nameInput.value)
            && checkRegex(letterFormat, lastname.value)
            && checkRegex(adressFormat, adress.value)
            && checkRegex(adressFormat, city.value)
            && checkRegex(mailFormat, mail.value)) {
            //post method
            let product = [];
            let storage = JSON.parse(localStorage.getItem("panier"));
            for (i of storage) {
                product.push(i.id);
            }
            let order = {
                contact: {
                    firstName: nameInput.value,
                    lastName: lastname.value,
                    address: adress.value,
                    city: city.value,
                    email: mail.value,
                },
                products: product,
            }
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }
            fetch("https://projet-orinoco.herokuapp.com/api/cameras/order", options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    localStorage.clear();
                    localStorage.setItem("orderID", data.orderId);
                    window.location.href = "confirmation.html";
                })
                .catch(error => console.error(error));
        }
        else {
            e.preventDefault();
            alert("Veuillez remplir correctement tous les champs");
        }
    });
}

function main() {
    let array = getBasket();
    for (i of array) {
        displayProducts(i);
    }
    document.querySelector(".totalCart").textContent = totalCart();
    listenForm();

    document.querySelector(".delete").addEventListener("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });
    incrementBasket();
}

main();

//fonctions supplémentaires

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
