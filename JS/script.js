
import { deleteProductById, editProduct, getAllProducts, getCateg, getProductCat, postNewProduct } from "./service.js";

//////////////////////////////////////// Dəyişən    lərin Təyin Edilməsi

const cards = document.getElementById("cards");
const headSec = document.getElementById("headSec");
let categData = [];
let cardsData = [];
let productsData = [];
let currentCategory = 'pizza';
const categList = document.getElementById("categList");
const inputs = document.querySelectorAll("#inputs input");
let globalId;

// //////////////////////  Ana Səhifəyə Qayıdış

window.homePage = function() {
    window.location.href = 'index.htm'
};

async function getProducts(category = 'pizza') {
    productsData = await getAllProducts(category);
};
getProducts();


// ////////// //////// Yuxarı NavBarın menyu seçimlərin yaradılması Funksiyası başladı

async function printCateg() {
    categData = await getCateg();
    categList.innerHTML = "";
    categData.forEach(item => {
        const onclckEvent = `onclick="printCatProds('${item.slug}')"`
        const printHeadSec = `onclick="printHeadSec()"`
        categList.innerHTML += `
        <li ${item.slug != 'kampaniyalar' ? onclckEvent : printHeadSec}>
          <a href="#" class="flex py-3 px-3 rounded-xl text-white hover:bg-red-900  md:bg-transparent uppercase font-bold" aria-current="page">${item.slug}</a>
        </li>
        `
    });

};
printCateg();

// ////////// //////// Yuxarı NavBarın menyu seçimlərin yaradılması Funksiyası bitdi

// HeadSection un əvvəlki vəziyyətinə qayıtma funksiyası 
window.printHeadSec = function(){
    headSec.style.display = "initial";
    cards.innerHTML = "";
    window.inputs.style.display = "none";
};

///////////// Seçilən Menyu dakı Seçimə Uyğun Cardların gəlmə prossesi və HeadSec görünürlüyünü yox eləmə prossesi
// Input ID-li Elementin gizlədilməsi
window.printCatProds = async function(ctg) {
    cards.innerHTML = "";
    printLoad();
    cardsData = await getProductCat(ctg);
    printCard(ctg);
    window.inputs.style.display = "none"
    currentCategory = ctg
     productsData = cardsData
     headSec.style.display = "none";
     window.inputs.style.display = "flex"

     document.querySelector("#inputs h1").textContent = `create ${ctg}`


}

function printCard(ctg) {
    cards.innerHTML = ""
    cardsData.forEach(item => {
        cards.innerHTML +=  `  
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                <a href="#">
                    <img class="rounded-t-lg" src="${item.img}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">${item.title}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${item.composition}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Qiymət : ${item.price} AZN</p>
                    <button onclick="handleDelete( '${ctg}' , '${item.id}')" class="mb-3 font-normal  text-white capitalize cursor-pointer bg-red-800 p-3 rounded">delete</button>
                    <button onclick="showInps( '${item.id }')" class="mb-3 font-normal  text-white capitalize cursor-pointer bg-blue-800 p-3 rounded">edit</button>
                </div>
            </div>
        `
     })
};


function printLoad() {
        for (let i = 0; i < 8 ; i++) {
            cards.innerHTML += `
            <div class="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div class="h-48 rounded-t dark:bg-gray-300"></div>
            <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                <div class="w-3/4 h-6 rounded dark:bg-gray-300"></div>
            </div>
        </div>
    `
    }
};

//////////////////////////////// Silinmə Prossesi

window.handleDelete = async function(ctg,id) {
    await deleteProductById(ctg,id);
    const newArr =   productsData.filter(item => item.id != id);
    await printCard(ctg);
  Swal.fire({
             title: `Product deleted succesfully.`,
             text: 'Do you want to continue',
             icon: 'success',
             confirmButtonText: 'Yes'
         })
  productsData = newArr
};


function getVal() {
    const newObj = {
        img: inputs[0].value,
        title: inputs[1].value,
        composition: inputs[2].value,
        price: inputs[3].value,
    };      
    return newObj
};  

window.handlePost = async function(id) {
    let newObj = getVal();
    await postNewProduct(newObj,currentCategory);
    console.warn("POST əməliyyatı uğurludur");
    await printCatProds(currentCategory)
};

// // // // // // // // // // Editləmə Prossesləri


window.showInps = async function(id) {
    const element = productsData.find(item => item.id == id);
    globalId = id
    inputs[0].value = element.img
    inputs[1].value = element.title
    inputs[2].value = element.composition
    inputs[3].value = element.price
    console.log(element);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    
};  

window.handleEdit = async function() {
    const newProduct =  getVal();
  await editProduct(newProduct,globalId,currentCategory);
  await printCatProds(currentCategory)

    Swal.fire({
        title: `edit function worked. Process has been end succesfully.`,
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Yes'
    })
    
};


window.updateSingleCard = function(id,newData) {
    const cardElement = document.querySelector(`[data-id="${id}"]`);
    if(cardElement) {
        cardElement.querySelector('.title').textContent = newData.title
        cardElement.querySelector('.composition').textContent = newData.composition
        cardElement.querySelector('.price').textContent = `Qiymət: ${newData.price} AZN`
        cardElement.querySelector('.img').src = newData.img
    };
};  

