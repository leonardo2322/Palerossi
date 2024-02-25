import { items } from '../data/data.js'
import { cart, renderCart } from './cart.js'
import { pagination } from './paginations.js'

export const db = {
    items: window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : items,
    methods: {
        find: (id) => {
            return db.items.find(item => item.id === id)
        },
        getAll: () => {
            return db.items
        },
        remove: (items) => {
            items.forEach(item => {
                const product = db.methods.find(item.id)
                product.quantity = product.quantity - item.quantity
            })
        }
    }
}

function handleClickButton(event) {
    const button = event.target
    const id = parseInt(button.getAttribute('data-id'))
    const product = db.methods.find(id)

    if (product && product.quantity > 0) {
        cart.methods.add(id, 1, product.titulo, product.precio)
        renderCart()
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'No Tenemos mas productos en stock'
        })
    }
}

export const renderProducts = () => {
    pagination()
    
    document.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains("addCarts")) {
            handleClickButton(event)
        }
    })

    window.localStorage.setItem('products', JSON.stringify(db.items))
}