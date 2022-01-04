class Product {
    constructor(name, price, year) {
        this.name = name
        this.price = price
        this.year = year
    }
}

class UI {

    addProduct(nuevoProducto) {
        const productList = document.getElementById('product-list')
        const element = document.createElement('div')
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${nuevoProducto.name}
                    <strong>Product Price</strong>: ${nuevoProducto.price}
                    <strong>Product Year</strong>: ${nuevoProducto.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `
        productList.appendChild(element)
    }

    resetForm() {
        document.getElementById('product-form').reset()
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('Product Deleted Successfully', 'info')
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div')
        div.className = `alert alert-${cssClass} mt-2`
        div.appendChild(document.createTextNode(message))
        // div.innerHTML = message // OTRA FORMA
        // Showing in DOM
        const container = document.querySelector('.container')
        const app = document.querySelector('#App')
        container.insertBefore(div, app)
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000)
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(e) {
        const name = document.getElementById('name').value
        const price = document.getElementById('price').value
        const year = document.getElementById('year').value
        
        const newProduct = new Product(name, price, year)
        
        const ui = new UI()
        
        if (name === '' || price === '' || year === '') {
            return ui.showMessage('Complete Fields Please', 'danger')
        }
        
        ui.addProduct(newProduct)
        ui.resetForm()
        ui.showMessage('Product Added Successfully', 'success')
        
        e.preventDefault()
    })

document.getElementById('product-list').addEventListener('click', (e) => {
    const ui = new UI()
    ui.deleteProduct(e.target)
})