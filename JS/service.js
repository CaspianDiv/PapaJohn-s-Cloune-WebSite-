import { CATEGORY_URL, DESERT_URL, ICKI_URL, PAPADIAS_URL, PASTA_URL, PIZZAS_URL, QALYANALTI_URL, SALAT_URL, SOUS_URL } from "./config.js";


function getUrlByCategory(category) {
    switch (category) {
        case "pizza":
            return PIZZAS_URL;
        case "papadias":
            return PAPADIAS_URL;
        case "qalyanaltilar":
            return QALYANALTI_URL;
        case "salat":
            return SALAT_URL;
        case "pasta":
            return PASTA_URL;
        case "souses":
            return SOUS_URL;
        case "icki":
            return ICKI_URL;
        case "desertler":
            return DESERT_URL;
        default: 
        return PIZZAS_URL
    };
};

async function getCateg() {
    try {
        const res = await fetch(CATEGORY_URL.GET);
        if(!res.ok) {
            throw new Error(`request xətası: xəta baş verdi, status: ${res.status}`)
        };
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error.message);
    }
};

async function getAllProducts(category = 'pizza') {
    try {
        const url = getUrlByCategory(category).GET;
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`request xətası: xəta baş verdi, status: ${res.status}`)
        };
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error.message);
    }
};

async function getProductCat(ctg) {
    try {
        const res = await fetch(`https://papadata-3hlh.onrender.com/${ctg}`);
        if(!res.ok) {
            throw new Error(`request xətası: xəta baş verdi: status: ${res.status}`)
        };
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error.message);
    }
};

async function deleteProductById(ctg,id) {
    try {
        const url = getUrlByCategory(ctg).DELETE;
        const res = await fetch(`${url}/${id}` , {
            method: "DELETE"
        }) 
        if(!res.ok) {
            throw new Error(`request xətası: xəta baş verdi: status: ${res.status}`)
        };
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error.message);
    }
};


async function postNewProduct(product,category) {
    try {
        const url = getUrlByCategory(category).POST;
        const res = await fetch(url , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        if(!res.ok) {
            throw new Error(`request xətası: xəta baş verdi: status: ${res.status}`)
        };
        return res
    } catch (error) {
        console.log(error.message);
    }
};

async function editProduct(product,globalId,category) {
    try {
        const url = getUrlByCategory(category).PUT;
        const res =  await fetch(`${url}/${globalId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product,globalId)
        })
        if(!res.ok) {
            throw new Error(`request xətası: xəta baş verdi: status: ${res.status}`)
        };
        return res
    } catch (error) {
        console.log(error.message);
    }
};



export {
    getCateg,
    getProductCat,
    deleteProductById,
    postNewProduct,
    editProduct,
    getAllProducts
};