document.addEventListener("DOMContentLoaded", function () {
    // Winkelmandje bijhouden
    let cart = [];

    // Functie om een item aan het winkelmandje toe te voegen
    function addToCart(productId, productName, productPrice) {
        // Zoek het item in het winkelmandje
        const existingItem = cart.find(item => item.id === productId);

        // Als het item al in het winkelmandje zit, verhoog de hoeveelheid
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Zo niet, voeg een nieuw item toe aan het winkelmandje
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // Bijwerken van de winkelmandje-teller
        updateCartCount();

        // Bijwerken van de weergave van het winkelmandje
        displayCartItems();

        // Bijwerken van de totaalprijs
        updateTotalPrice();
    }

    // Functie om de winkelmandje-teller bij te werken
    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Functie om het winkelmandje bij te werken
    function displayCartItems() {
        const cartList = document.getElementById("cart-items");

        // Leeg de huidige inhoud van het winkelmandje
        cartList.innerHTML = "";

        // Voeg elk item toe aan het winkelmandje
        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.quantity}x ${item.name} - $${item.price * item.quantity}`;
            cartList.appendChild(listItem);
        });
    }

    // Functie om de totaalprijs bij te werken
    function updateTotalPrice() {
        const totalPriceElement = document.getElementById("total-price");
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceElement.textContent = `Totaal: $${totalPrice.toFixed(2)}`;
    }

    // Voeg een klikgebeurtenis toe aan de knoppen "Voeg toe aan winkelmandje"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Voorkom standaardgedrag van de knop (formulier verzenden, in dit geval)

            const productId = this.getAttribute("data-product-id");
            const productName = this.parentElement.querySelector("h3").textContent;
            const productPrice = parseFloat(this.parentElement.querySelector("span").textContent.slice(8)); // Verwijder "Prijs: $" en converteer naar een getal
            addToCart(productId, productName, productPrice);
        });
    });

    // Voeg een klikgebeurtenis toe aan elke Wishlist-knop
    var wishlistButtons = document.querySelectorAll(".wishlist");
    wishlistButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("selected");
        });
    });
});
