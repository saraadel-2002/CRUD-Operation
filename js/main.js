var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory")
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");

var searchInput = document.getElementById("searchInput");

var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var productList = [];

var index = 0;

// ^ ************Dataa********** ^ //
if(localStorage.getItem("productContainer")!== null ){
    productList = JSON.parse(localStorage.getItem("productContainer"));
    displayData();
}

// ! ************* Add Product **************** ! //
function addProduct(){
    if(
        validationName() &&
        validationPrice() &&
        validationCategory() &&
        validationDescription() &&
        validationImage() 
    ){
        var product = {
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            description : productCategoryInput.value,
            image : productImageInput.files[0]?.name
                    ?`images/portfolio/${productImageInput.files[0]?.name}`:
                    "images/portfolio/1.jpg",
         }
        productList.push(product);
        localStorage.setItem("productContainer" , JSON.stringify(productList));
        clearData();
        displayData();
    }
}

// ! ************* Clear Data **************** ! //
function clearData(){
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;

    productNameInput.classList.remove('is-valid');
    productPriceInput.classList.remove('is-valid');
    productCategoryInput.classList.remove('is-valid');
    productDescriptionInput.classList.remove('is-valid');
    productImageInput.classList.remove('is-valid');
}
 
// ! ******** Display Data && Search By Name ******* ! //
function displayData(){
    var term = searchInput.value;
    var cartona = "";
    for(var i=0; i<productList.length; i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()) == true ){
            cartona +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].category}</td>
                    <td>${productList[i].description}</td>
                    <td><img src="${productList[i].image}" alt="" style="width: 100px;"></td>
                    <td>
                    <button onclick="setFormUpdate(${i})" class="btn btn-outline-success">Update</button>
                    <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
             `
        }
    }
    document.getElementById('tbody').innerHTML= cartona;
}

// ! ************* Delete Item **************** ! //
function deleteItem(indexItem){
    productList.splice(indexItem , 1);
    localStorage.setItem("productContainer" , JSON.stringify(productList));
    displayData();
}

// ! ************* Update data **************** ! //
function setFormUpdate(indexElement){
    productNameInput.value=productList[indexElement].name;
    productPriceInput.value=productList[indexElement].price;
    productCategoryInput.value=productList[indexElement].category;
    productDescriptionInput.value=productList[indexElement].description;
 
    btnAdd.classList.add('d-none');
    btnUpdate.classList.remove('d-none')

    index = indexElement;
}


function updateData(){
    var product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        description : productDescriptionInput.value,
        image : productImageInput.files[0]?.name
                ?`images/portfolio/${productImageInput.files[0]?.name}`:
                "images/portfolio/1.jpg",
    }
    productList.splice(index , 1 , product);
    displayData();
    clearData();
    localStorage.setItem("productContainer" , JSON.stringify(productList));

    btnUpdate.classList.add('d-none');
    btnAdd.classList.remove('d-none')
}


// ? ******************* Validation ******************* ? //
function validationName(){
    var text=productNameInput.value;
    var regex = /^[A-Z][a-z]{3,8}$/;
    var msgNameElement = document.getElementById("msgName");
    if(regex.test(text)==true){
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        msgNameElement.classList.add('d-none')
        return true;
    }
    else{
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        msgNameElement.classList.remove('d-none')
        return false;
    }
}

function validationPrice(){
    var text = productPriceInput.value;
    var regex = /^[0-9]{2,5}$/;
    var msgPriceElement = document.getElementById("msgPrice");
    if(regex.test(text)==true){
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        msgPriceElement.classList.add('d-none')
        return true;
    }
    else{
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        msgPriceElement.classList.remove('d-none')
        return false;
    }
}

function validationCategory(){
    var text = productCategoryInput.value;
    var regex = /^(tv|mobile|screens|electronics)$/i;
    var msgCategoryElement = document.getElementById("msgCategory");
    if(regex.test(text)==true){
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid');
        msgCategoryElement.classList.add('d-none')
        return true;
    }
    else{
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        msgCategoryElement.classList.remove('d-none')
        return false;
    }
}

function validationDescription(){
    var text = productDescriptionInput.value;
    var regex = /^.{3,}$/m;
    var msgDecriptionElement = document.getElementById("msgDecription");
    if(regex.test(text)==true){
        productDescriptionInput.classList.add('is-valid');
        productDescriptionInput.classList.remove('is-invalid');
        msgDecriptionElement.classList.add('d-none')
        return true;
    }
    else{
        productDescriptionInput.classList.add('is-invalid');
        productDescriptionInput.classList.remove('is-valid');
        msgDecriptionElement.classList.remove('d-none')
        return false;
    }
}

function validationImage(){
    var text = productImageInput.value;
    var regex = /^.{1,}\.(jpg|jpeg|svg|avif|png)$/;
    var msgImageElement = document.getElementById("msgImage");
    if(regex.test(text) == true){
        productImageInput.classList.add('is-valid');
        productImageInput.classList.remove('is-invalid');
        msgImageElement.classList.add('d-none')
        return true;
    }
    else{
        productImageInput.classList.add('is-invalid');
        productImageInput.classList.remove('is-valid');
        msgImageElement.classList.remove('d-none')
        return false;
    }
}


