import { numberToCurrency } from "../helpers/numberCurrency.js"
import { db } from "./products.js"

export const pagination = () => {
    const product = db.methods.getAll()
    const productLength = product.length
    
    const itemsPerPage = 5;
    let currentPage = 1;

    function showPage(pageNumber, product) {
        currentPage = pageNumber;
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = product.slice(startIndex, endIndex);

        const dataContainer = document.getElementById("product-container");
        dataContainer.innerHTML = "";
        let html = ''

        pageData.forEach((item) => {
            html += `
            <div class="grid">
                <div class="card" id="card" data-id="${item.id}">
                    <div class="card-img">
                        <img src=".${item.imagen}" alt="${item.titulo}">
                    </div>
                    <div class="card-description">
                        <h4 class="card-title">${item.titulo}</h4>
                        <span class="card-price">${numberToCurrency(item.precio)}</span>
                        <span class="card-details">Lorem ipsum dolor sit amet.</span>
                    </div>
                    <div class="addCart" id="addCart">
                        <i class="fa-solid fa-cart-plus addCarts" data-id="${item.id}"></i>
                    </div>
                </div>
            </div>
            `
            dataContainer.innerHTML = html;
        });

        updatePaginationButtons();
    }

    function generatePaginationButtons(totalPages) {
        const paginationContainer = document.getElementById("number-page");
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.classList.add('counter-page')
            button.textContent = i;
            button.addEventListener("click", () => showPage(i, product));
            paginationContainer.appendChild(button);
        }
    }

    function updatePaginationButtons() {
        const buttons = document.querySelectorAll("#number-page .counter-page");
        buttons.forEach((button, index) => {
            if (index + 1 === currentPage) {
                button.classList.add("current");
            } else {
                button.classList.remove("current");
            }
        });
    }

    function goToNextPage() {
        const totalPages = Math.ceil(productLength / itemsPerPage);
        if (currentPage < totalPages) {
            showPage(currentPage + 1, product);
        }
    }

    function goToPrevPage() {
        if (currentPage > 1) {
            showPage(currentPage - 1, product);
        }
    }

    function initializePagination() {
        const totalPages = Math.ceil(productLength / itemsPerPage);
        generatePaginationButtons(totalPages);
        showPage(currentPage, product);

        document.getElementById("prev").addEventListener("click", goToPrevPage);
        document.getElementById("next").addEventListener("click", goToNextPage);
    }

    initializePagination();

}