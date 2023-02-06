
let confirmation = document.querySelector('.confirmation').textContent = localStorage.getItem('orderID'); //affiche la réponse du back-end
localStorage.clear(); //on ne stocke pas la réponse




//fonctions supplémentaires

function incrementBasket(){
        let articleQuantity = 0;
        if(localStorage.getItem("panier")){
            let articles = JSON.parse(localStorage.getItem("panier"));
            for(article of articles){
                articleQuantity = articleQuantity + article.quantity;
            }
        }
        else{
            return;
        }
        let basket = document.querySelector(".basket span");
        basket.textContent = `${articleQuantity}`;
}

incrementBasket();

document.querySelector(".basket").addEventListener("click",(e)=>{
        e.preventDefault();
        alert("Vous n'avez aucun article dans le panier");
})

