// Form Add Inputs
let prodName = document.getElementById('prodName')
let prodPrice = document.getElementById('prodPrice')
let prodCategory = document.getElementById('prodCategory')
let prodDesc = document.getElementById('prodDesc')
// Form Update Inputs
let updateProdName = document.getElementById('uProdName')
let updateProdPrice = document.getElementById('uProdPrice')
let updateProdCategory = document.getElementById('uProdCategory')
let updateProdDesc = document.getElementById('uProdDesc')
// Array of Products
let productsContainer;
// Delete BTN
let addBTN = document.getElementById('addBTN')
// Add BTN
let deleteBTN = document.getElementById('deleteBTN')
// Updated BTN
let updateBTN = document.getElementById('updateBTN')
// Search Input
let searchInput = document.getElementById('searchInput')
// Product Index
let productIndex = -1

if (JSON.parse(localStorage.getItem('allProducts')) == null) {
  productsContainer = []
} else {
  productsContainer = JSON.parse(localStorage.getItem('allProducts'))
  displayProducts(productsContainer)
}

// Get Values and Fill Array
function addProduct() {
  let prodNameError = document.getElementById("prodNameError")
  let prodPriceError = document.getElementById("prodPriceError")
  let prodCategoryError = document.getElementById("prodCategoryError")
  let prodDescError = document.getElementById("prodDescError")
  let error1 = validateInput(prodName, prodNameError, 'Product name is required')
  let error2 = validateInput(prodPrice, prodPriceError, 'Product price is required')
  let error3 = validateInput(prodCategory, prodCategoryError, 'Product category is required')
  let error4 = validateInput(prodDesc, prodDescError, 'Product description is required')
  if (error1 && error2 && error3 && error4) {
    addBTN.setAttribute('data-target', '#addModal')
    let product = {
      name: prodName.value,
      price: prodPrice.value,
      category: prodCategory.value,
      description: prodDesc.value,
    }
    productsContainer.push(product)
    localStorage.setItem('allProducts', JSON.stringify(productsContainer))
    clearInputs()
  }
}

// Add Product When Click on BTN
addBTN.addEventListener('click', function () {
  addProduct()
  setTimeout(() => {
    displayProducts(productsContainer)
  }, 500);
})

// Clear Inputs
function clearInputs() {
  prodName.value = ''
  prodPrice.value = ''
  prodCategory.value = ''
  prodDesc.value = ''
  updateProdName.value = ''
  updateProdPrice.value = ''
  updateProdCategory.value = ''
  updateProdDesc.value = ''
}

// Display Products
function displayProducts(productsContainer) {
  let tableBody = document.getElementById('tableBody')
  tableBody.innerHTML = ''
  if (productsContainer.length > 0) {
    for (let i = 0; i < productsContainer.length; i++) {
      tableBody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].description}</td>
            <td><button class="btn btn-outline-warning" data-toggle="modal" data-target="#updateModal" 
            onclick="getProductIndex(${i}, 1)">Update</button></td>
            <td><button class="btn btn-outline-danger" data-toggle="modal" data-target="#deleteModal" 
            onclick="getProductIndex(${i}, 0)">Delete</button></td>
        </tr>
    `
    }
  } 
  // else {
  //   tableData.innerHTML = `
  //   <tr>
  //     <td colspan='7'> <h3 class="text-center font-weight-bold text-danger py-5">There are no products!</h3> </td>
  //   </tr>`
  // }
}

// Product Index
function getProductIndex(index, option) {
  productIndex = index
  if (option == 1) {
    updateProdName.value = productsContainer[productIndex].name
    updateProdPrice.value = productsContainer[productIndex].price
    updateProdCategory.value = productsContainer[productIndex].category
    updateProdDesc.value = productsContainer[productIndex].description
  }
}

// Delete Product
deleteBTN.addEventListener('click', function () {
  productsContainer.splice(productIndex, 1)
  localStorage.setItem('allProducts', JSON.stringify(productsContainer))
  displayProducts(productsContainer)
})

// Update Product
updateBTN.addEventListener('click', function () {

  let uProdNameError = document.getElementById("uProdNameError")
  let uProdPriceError = document.getElementById("uProdPriceError")
  let uProdCategoryError = document.getElementById("uProdCategoryError")
  let uProdDescError = document.getElementById("uProdDescError")
  let error1 = validateInput(updateProdName, uProdNameError, 'Product name is required')
  let error2 = validateInput(updateProdPrice, uProdPriceError, 'Product price is required')
  let error3 = validateInput(updateProdCategory, uProdCategoryError, 'Product category is required')
  let error4 = validateInput(updateProdDesc, uProdDescError, 'Product description is required')
  if (error1 && error2 && error3 && error4) {
    updateBTN.setAttribute('data-dismiss', 'modal')
    let updatedProduct = {
      name: updateProdName.value,
      price: updateProdPrice.value,
      category: updateProdCategory.value,
      description: updateProdDesc.value,
    }
    productsContainer.splice(productIndex, 1, updatedProduct)
    localStorage.setItem('allProducts', JSON.stringify(productsContainer))
    displayProducts(productsContainer)
    clearInputs()
  }
})

// Search Products
function searchProducts() {
  let searchText = searchInput.value
  let result = productsContainer.filter((prod) => {
    return prod.name.includes(searchText)
  })
  displayProducts(result)
}
searchInput.addEventListener('keyup', searchProducts)


// Validation Add Products Form Inputs
function validateInput(inputValue, inputErrorMSG, errorMSG) {
  updateBTN.removeAttribute('data-dismiss')
  if (inputValue.value === '') {
    inputErrorMSG.innerHTML = errorMSG
    inputErrorMSG.style.display = 'block'
    return false
  }
  if (inputValue === prodPrice || inputValue === updateProdPrice) {
    let regex = /^[0-9.]+$/
    if (regex.test(inputValue.value)) {
      inputErrorMSG.style.display = 'none'
      return true
    }
    else {
      inputErrorMSG.innerHTML = 'Prodcut price must be only numbers'
      inputErrorMSG.style.display = 'block'
      return false
    }
  }
  if (inputValue === prodDesc || inputValue === updateProdDesc) {
    console.log(inputValue, inputValue.value)
    if (inputValue.value.length < 15 || inputValue.value.length < 15) {
      inputErrorMSG.innerHTML = 'Prodcut description is small'
      inputErrorMSG.style.display = 'block'
      return false
    }
    else {
      inputErrorMSG.style.display = 'none'
      return true
    }
  }
  else {
    inputErrorMSG.style.display = 'none'
    return true
  }
}

