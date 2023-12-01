async function fetchMakeupProducts() {
    const apiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json';
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching makeup products:', error.message);
      throw error;
    }
  }
  
  function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
  
    const brandName = document.createElement('h2');
    brandName.textContent = product.brand;
  
    const productName = document.createElement('h3');
    productName.textContent = product.name;
  
    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: ${product.price}`;
  
    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
  
    const productImage = document.createElement('img');
    productImage.src = product.image_link;
    productImage.alt = product.name;
  
    const productLink = document.createElement('a');
    productLink.href = product.product_link;
    productLink.textContent = 'View Product';
  
    card.append(brandName, productName, productPrice, productDescription, productImage, productLink);
    return card;
  }
  const productsPerPage = 50; 
  async function displayMakeupProducts(pageNumber) {
    const makeupContainer = document.getElementById('makeupContainer');
    const paginationButtons = document.getElementById('paginationButtons');

  
    try {
      const makeupData = await fetchMakeupProducts();
      const totalPages = Math.ceil(makeupData.length / productsPerPage);

      const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    makeupContainer.innerHTML = '';
    for (let i = startIndex; i < endIndex && i < makeupData.length; i++) {
      const productCard = createProductCard(makeupData[i]);
      makeupContainer.appendChild(productCard);
    }

    paginationButtons.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => displayMakeupProducts(i));
      paginationButtons.appendChild(button);
    }
  } catch (error) {
    console.error('Error displaying makeup products:', error.message);
  }
}
    
displayMakeupProducts(1);








  
