const mainWrapperRight = document.querySelector(".main-wrapper-right");
const loader = document.querySelector(".loader");
const categoryDevice = document.querySelector("#category");
const noteBookSection = document.querySelector(".Notebooks-section");
const smartPhoneSection = document.querySelector(".Smartphone-section");
const mainWrapFlex = document.querySelector(".mainWrapper-flex");
const appleNotebookCheckbox = document.querySelector("#Apple");
const hpNotebookCheckbox = document.querySelector("#Hp");
const lenovoNotebookCheckbox = document.querySelector("#Lenovo");
const appleTelCheckbox = document.querySelector("#Apple-tel");
const androidTelCheckbox = document.querySelector("#Android-tel");
const huaweiTelCheckbox = document.querySelector("#Huawei");
const vivoTelCheckbox=document.querySelector("#Vivo")
noteBookSection.style.display = "none";
smartPhoneSection.style.display = "none";
const basketItem=document.querySelector(".header-right-svg")
const basketContainer=document.querySelector(".basketContainer")
basketContainer.style.display="none";
const basketValue=document.querySelector(".basket-value")

let allProducts = [];

const noteBooksArray = [
  { id: 1, name: "Apple", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "255$", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9oytvG9BaFYp39-AROWACdGPJ8Q8xt-7wA&s" },
  { id: 2, name: "Apple", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "300$", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_IKMUAWB1p31MBY6Nt4uHn9CWQCgSePaTg&s" },
  { id: 3, name: "Apple", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "350$", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g6ZWExP8t8Xl2bG0E4cM4mxjJYZ525ZrLQ&s" },
  { id: 4, name: "Hp", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "333$", img: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08873657.png?impolicy=Png_Res" },
  { id: 5, name: "Hp", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "222$", img: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08873717.png?impolicy=Png_Res" },
  { id: 6, name: "Hp", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "366$", img: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08744559.png?impolicy=Png_Res" },
  { id: 7, name: "Lenovo", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "555$", img: "https://www.bakinity.biz/upload/resize_cache/iblock/716/450_450_140cd750bba9870f18aada2478b24840a/se7ixijztvnqm209t8vi9hs9q6k9eng6.jpg" },
  { id: 8, name: "Lenovo", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "444$", img: "https://www.bakinity.biz/upload/resize_cache/iblock/89f/450_450_140cd750bba9870f18aada2478b24840a/x6jg9k058n27m091keck9qyz9hxyiuv3.jpg" },
  { id: 9, name: "Lenovo", description: "Equipped with [processor type/speed] processor and [RAM size] of RAM, this laptop delivers smooth and responsive performance, allowing you to multitask with ease.", price: "45$", img: "https://www.bakinity.biz/upload/resize_cache/iblock/89f/450_450_140cd750bba9870f18aada2478b24840a/x6jg9k058n27m091keck9qyz9hxyiuv3.jpg" },
];

let cardItems=[];

const storedCardItems = localStorage.getItem('cardItems');

if (storedCardItems) {
  cardItems = JSON.parse(storedCardItems);
}

const renderData = (products) => {
  mainWrapFlex.innerHTML = ''; 

  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML =`
      <img src="${product.img || product.thumbnail}" class="product-img" alt="${product.name || product.title}">
      <h3>${product.name || product.title}</h3>
      <div>${product.description}</div>
      <div>Price: ${product.price}</div>
      <div class="product-counter">
        <button class="counter-btn minus">-</button>
        <span class="counter-value">1</span>
        <button class="counter-btn plus">+</button>
      </div>
      <button class="add-to-cart-btn">Добавить в корзину</button>
    `;
    mainWrapFlex.append(productItem);

    mainWrapFlex.classList.add("mainWrap-flex")
    const minusBtn = productItem.querySelector('.minus');
    const plusBtn = productItem.querySelector('.plus');
    const counterValue = productItem.querySelector('.counter-value');
    let counter = 1;

    minusBtn.addEventListener('click', () => {
      if (counter > 1) {
        counter--;
        counterValue.textContent = counter;
      }
    });

    plusBtn.addEventListener('click', () => {
      counter++;
      counterValue.textContent = counter;
    });

    const addToCartBtn = productItem.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
      const findItem = cardItems.find((item)=>{
      return  item.product.id === product.id});
      if (findItem) {
        findItem.quantity += counter;
      } else {
        cardItems.push({
          product: product,
          quantity: counter
        });
      }
      console.log(cardItems)
      updateTotalPrice()
      basketValueQuantity()

      localStorage.setItem('cardItems', JSON.stringify(cardItems));
    });
  });
};

const calculateTotalPrice = () => {
  let totalPrice = 0; 

  cardItems.forEach((item) => {
    totalPrice += parseFloat(item.product.price) * item.quantity; 
  });
  return totalPrice; 
};

const basketCartItems = () => {
  basketContainer.innerHTML = ''; 
  basketContainer.classList.add("basketContainer");

  let totalSum = 0;

  cardItems.forEach((item, index) => {
    const newProduct = document.createElement("div");
    newProduct.classList.add("basket-product");
    newProduct.innerHTML = `
        <img src="${item.product.img || item.product.thumbnail}" class="basket-img" alt="${item.product.name || item.product.title}">
        <h3>${item.product.name || item.product.title}</h3>
        <div>Price: ${item.product.price}$</div>
        <div>Quantity: ${item.quantity}</div>
        <div>Total: ${item.product.price * item.quantity}$</div>
        <button class="remove-item-btn" data-index="${index}">Удалить</button>
    `;
    basketContainer.append(newProduct);

    totalSum += item.product.price * item.quantity;
  });

  const totalSumAdult=document.createElement("div")
  totalSumAdult.classList.add("total-sum-adult")
  const totalSumElement = document.createElement("div");
  totalSumElement.classList.add("total-sum");
  totalSumElement.innerHTML = `Общая сумма: ${totalSum}$`;
  totalSumAdult.append(totalSumElement)
  basketContainer.append(totalSumAdult);

  const removeButtons = basketContainer.querySelectorAll(".remove-item-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      cardItems.splice(index, 1);
      basketCartItems();

      const totalPrice = calculateTotalPrice(); 
      totalSumElement.textContent = `Общая сумма: ${totalPrice}$`; 
      localStorage.setItem('cardItems', JSON.stringify(cardItems));
    });
  });
};
const updateTotalPrice = () => {
  const totalPrice = calculateTotalPrice(); 
  const totalSumElement = document.querySelector(".total-sum");
  if (totalSumElement) {
    totalSumElement.textContent = `Общая сумма: ${totalPrice}$`; 
  }
};

const basketValueQuantity = () => {
  let totalQuantity = 0;
  cardItems.forEach((item) => {
    totalQuantity += item.quantity;
  });
  basketValue.textContent = totalQuantity;
};

basketItem.addEventListener("click", () => {
  console.log("Клик по корзине");
  if (basketContainer.style.display === "none") {
    basketContainer.style.display = "flex";
  } else {
    basketContainer.style.display = "none";
  }
  basketCartItems();
  updateTotalPrice(); 
});

document.addEventListener("click", (event) => {
  const item = event.target.closest(".basketContainer") || event.target.closest(".header-right-svg");
  if (!item) {
    basketContainer.style.display = "none"; 
  }
});

const fetchApi = fetch('https://dummyjson.com/products/category/smartphones');
fetchApi
  .then((data) => data.json())
  .then((data) => {
    fetchApiData = data.products;
    allProducts = [...noteBooksArray, ...fetchApiData];
    loader.style.display = "none";
    renderData(allProducts);
    filterProducts();
  })
  
const filterProducts = () => {
  let filteredProducts = allProducts;

  if (categoryDevice.value === "Notebook") {
    filteredProducts = noteBooksArray;
    if (appleNotebookCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product)=>{
    return  product.name.toLowerCase() === 'apple'});
    }
    if (hpNotebookCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product)=>{
    return  product.name.toLowerCase() === 'hp'});
    }
    if (lenovoNotebookCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product)=>{
    return   product.name.toLowerCase() === 'lenovo'});
    }
  } else if (categoryDevice.value === "Smartphone") {
    filteredProducts = fetchApiData;
    if (appleTelCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product)=>{
    return   product.brand.toLowerCase() === 'apple'});
    }
    if (androidTelCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product)=>{
    return   product.brand.toLowerCase() === 'samsung'});
    }
    if (huaweiTelCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product)=>{
    return   product.brand === 'Oppo'});
    }
    if (vivoTelCheckbox.checked) {
      filteredProducts = filteredProducts.filter((product) =>{
    return   product.brand === 'Vivo'});
    }
  }
  renderData(filteredProducts);
};

categoryDevice.addEventListener("change", () => {
  const selectedValue = categoryDevice.value;
  noteBookSection.style.display = "none";
  smartPhoneSection.style.display = "none";
  if(selectedValue==="Allproduct"){
    noteBookSection.style.display = "none";
    smartPhoneSection.style.display = "none";
  } else if(selectedValue === "Notebook") {
    noteBookSection.style.display = "block";
    smartPhoneSection.style.display = "none";
  } else if (selectedValue === "Smartphone") {
    noteBookSection.style.display = "none";
    smartPhoneSection.style.display = "block";
  }
  filterProducts();
});

appleNotebookCheckbox.addEventListener('change', filterProducts);
hpNotebookCheckbox.addEventListener('change', filterProducts);
lenovoNotebookCheckbox.addEventListener('change', filterProducts);
appleTelCheckbox.addEventListener('change', filterProducts);
androidTelCheckbox.addEventListener('change', filterProducts);
huaweiTelCheckbox.addEventListener('change', filterProducts);
vivoTelCheckbox.addEventListener('change', filterProducts);

const searchInput = document.querySelector("#input-search")
searchInput.addEventListener("input", () => {
  const searchInputValue = searchInput.value.toLowerCase().trim(); 
  if (searchInputValue === "") {
    renderData(allProducts);
    return;
  }
  const filteredProducts = allProducts.filter((product) => {
    const productName = (product.name || '').toLowerCase();
    const productDescription = (product.description || '').toLowerCase();
    const inputValue = (searchInputValue || '').toLowerCase();
    return productName.includes(inputValue) || productDescription.includes(inputValue);
  });
  console.log(filteredProducts);
  renderData(filteredProducts);
});

const translations = {
  az: {
      filter: "Filtrasiya",
      allProducts: "Bütün məhsullar",
      notebooks: "Noutbuklar",
      smartphones: "Smartfonlar",
      apple: "Apple",
      hp: "Hp",
      lenovo: "Lenovo",
      appleTel: "Apple",
      androidTel: "Android",
      huawei: "Huawei",
      vivo: "Vivo",
      searchPlaceholder: "Axtarış"
  },
  en: {
      filter: "Filter",
      allProducts: "All products",
      notebooks: "Notebooks",
      smartphones: "Smartphones",
      apple: "Apple",
      hp: "Hp",
      lenovo: "Lenovo",
      appleTel: "Apple",
      androidTel: "Android",
      huawei: "Huawei",
      vivo: "Vivo",
      searchPlaceholder: "Search"
  },
  ru: {
      filter: "Фильтрация",
      allProducts: "Все товары",
      notebooks: "Ноутбуки",
      smartphones: "Смартфоны",
      apple: "Apple",
      hp: "Hp",
      lenovo: "Lenovo",
      appleTel: "Apple",
      androidTel: "Android",
      huawei: "Oppo",
      vivo: "Vivo",
      searchPlaceholder: "Поиск"
  }
};

/*const translatePage=(language)=>{
  const elements = document.querySelectorAll('[data-key]');
  elements.forEach(element => {
      const key = element.getAttribute('data-key');
      if (element.tagName === 'INPUT' && element.type === 'search') {
          element.setAttribute('placeholder', translations[language][key]);
      } else if (element.tagName === 'OPTION') {
          element.textContent = translations[language][key];
      } else {
          element.textContent = translations[language][key];
      }
  });
}

document.querySelector('#lang').addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  translatePage(selectedLanguage);
});

translatePage('ru');
*/