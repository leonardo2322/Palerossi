export const modal = () => {
    const openModal = document.querySelectorAll('.shortcuts__items');
    const closeModal = document.querySelectorAll('.close-modal');
    let modalContent = null; // Definir la variable fuera de los bucles
    let modalContainer = null; // Declaración global

    openModal.forEach((open) => {
        open.addEventListener('click', () => {
            const target = open.getAttribute('data-target');
            modalContent = document.getElementById(target); // Asignar el valor aquí

            modalContainer = modalContent.closest('.modal-container'); // Asignación global
            modalContainer.style.opacity = '1';
            modalContainer.style.visibility = 'visible';
        });
    });

    closeModal.forEach(close => {
        close.addEventListener('click', () => {
            modalContent.classList.toggle('modal-close');
            setTimeout(() => {
                modalContainer.style.opacity = '0';
                modalContainer.style.visibility = 'hidden';
                modalContent.classList.remove('modal-close')
            }, 500);
        })
    })

    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContent.classList.toggle('modal-close');
            setTimeout(() => {
                modalContainer.style.opacity = '0';
                modalContainer.style.visibility = 'hidden';
            }, 500);
        }
    });
};

/* const modalButtons = document.querySelectorAll(".modal-button"); // abrir modal
const modals = document.querySelectorAll(".modal"); // contenedor modal
const closeButton = document.querySelectorAll(".close-button"); // cerrar modal

modalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const target = button.getAttribute("data-target");
        const modal = document.getElementById(target);

        modals.forEach(function (modal) {
            modal.style.display = "none";
        });

        modal.style.display = "block";
    });
});

closeButton.forEach(function (button) {
    button.addEventListener("click", function () {
        const modal = button.closest(".modal");
        modal.style.display = "none";
    });
}); */