function displayProducts(products) {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
       const listItem = document.createElement("li");
       listItem.textContent = `Title: ${product.title},\t\t Price: ${product.price}`;
       productList.appendChild(listItem);
    });
   }
async function fetchJsonData(url) {
    try {
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error("Error fetching data: ", response.status);
       }
       return await response.json();
    } catch (error) {
       console.error(error);
       return null;
    }
   }
   
   // Function to process data and display it in the presentation of your choice
   async function processData(url) {
    const data = await fetchJsonData(url);
    // const productsArray = Object.values(data.products);
    let productsArray = [];
    if(data != null){
        productsArray = Object.keys(data.products).map((key) => ({
            ID:key,
            subcategory: data.products[key].subcategory,
            title: data.products[key].title,
            price: data.products[key].price,
            popularity: data.products[key].popularity
        }));
    }
       console.log(productsArray);
       productsArray.sort((a, b) => b.popularity - a.popularity);
   
       // Display the products in your preferred presentation (e.g., HTML)
       displayProducts(productsArray);
    }
//    }
   
   // Call the processData function with the URL of the JSON file
processData("https://s3.amazonaws.com/open-to-cors/assignment.json");