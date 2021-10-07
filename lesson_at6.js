// Объявление переменных div
const cartPrice = document.querySelector('.cart-price');
const cart = document.querySelector('.cart');
const productAll = document.querySelector('.product-all');
const furtherButton = document.querySelector('.further-button');
const registrationButton = document.querySelector('.registration-button');
const addressButton = document.querySelector('.address-button');
const registration = document.querySelector('.registration');
const address = document.querySelector('.address')
const cartButton = document.querySelector('.cart-button')
const popupNav = document.querySelector('.popup__nav');
console.log(popupNav);

let cartArr = []; //переменная корзины
let productArray = []; //переменная продукта

// создание объекта продукта
function genProductAll(name, company, price, img, description,){ //создание объекта
    this.name = name;
    this.company = company;
    this.price = price;
    this.img = img;
    this.description = description;
    this.id = productId();
};

let productId = genProductId(); // генерация id product

function genProductId(){ // функция генерации id
    let lid = 1;
    return function () {
        return lid++
    };
};

function drawProduct(product){ // обрисовка продуктов 
    productAll.insertAdjacentHTML( 'afterbegin',`
    <div class="prod-one"> 
        <p>Название продукта: ${product.name}</p>
        <p>Фирма: ${product.company}.</p>
        <a class="img" href="#popup__img">
            <img class="img-product" data-id=${product.id} src=${product.img[0]} alt="Photo">
        </a><br>
        <p>Описание:</p>
        <p>${product.description}</p>
        <p>Цена: ${product.price}</p>
        <button class="button-product" data-id=${product.id}> Купить</button>
    </div>` )
};

productArray = [ // запрос на обрисовку
    new genProductAll('свитер', 'DORI', 2600,[ 'img/big_cat.jpg', 'img/blouse.jpg' ], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Штаны', 'LONER', 3500, ['img/blouse.jpg', 'img/blouse.jpg', 'img/pants.jpg'] , 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Педжак', 'FITY', 3100, ['img/shirt.jpg', 'img/blouse.jpg', 'img/pants.jpg'], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Рубашка', 'RUYYY', 1200, ['img/hat.jpg', 'img/blouse.jpg', 'img/pants.jpg' ], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Кросовки', 'POLOTYK', 2800, ['img/hat.jpg', 'img/blouse.jpg', 'img/pants.jpg' ], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Ремень', 'LOCY', 600, ['img/shirt.jpg', 'img/blouse.jpg', 'img/pants.jpg' ], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Куртка', 'DON', 5900, ['img/sun.jpg', 'img/blouse.jpg', 'img/pants.jpg' ], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
    new genProductAll('Джемпер', 'LOLI', 1200, ['img/pants.jpg', 'img/blouse.jpg', 'img/pants.jpg' ], 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolor enim dicta, dolorum eum optio delectus rerum rem ex soluta!'),
];

productArray.forEach(product => { // перебирает массив и отдает на перересовку
    drawProduct(product);
});
// добавляет в корзину

function buttonProduct(){
    const buttonProducts = productAll.querySelectorAll('.button-product');
    // console.log(buttonProducts);
    
    buttonProducts.forEach(function(elem){
    elem.addEventListener('click', (e) => addProductInCart(Number(e.target.getAttribute('data-id'))));
    });
};
 buttonProduct();
// productAll.addEventListener('click', function(e){ //при нажатии на блок с data-id считывает его 
//     addProductInCart(Number(e.target.getAttribute('data-id')));
//     // 
// });

// gпробник


// productAll.childNodes.forEach(function(elem){
//     elem.childNodes.forEach(function(elem2){
//         console.log(elem2)
//     })
// })

// const elem = productAll.children;
// console.log(elem)
// for(let elem2 of elem){
//     // elem2.children;
//     for(elem3 of elem2.children){
//        console.log(elem3.getElementsByTagName('button'));
        
//     }
// }


function addProductInCart(id){ // ищет блок с выбранным data-id добавляет его при помощи конструктора и вызывает функцию прорисовывания
    let prodCt = productArray.find((product) =>{
        return product.id === id;
    });
    cartArr.push(new productInCart(prodCt));
    // console.log(cartArr);
    
    CartProductOpen(); //функция для раскрытия масива чтобы в дальнейшем обрисовать
    getSummCart(cartArr);
};



//создание объекта корзины

let cartId = genProductId(); // генерирует id для cart

function productInCart({name, company, price}){ // собирает объект для cart
    this.name = name;
    this.company = company;
    this.price = price;
    this.id = cartId();

}; 

function drawCartList(product){ // рисует cart
    
    cart.insertAdjacentHTML('afterbegin', `
    <div class="product-list">
    Название: ${product.name} <br>
    Фирма: ${product.company} <br>
    Цена: ${product.price}<br>
    <button  data-id=${product.id}> Удалить </button>
    </div>
    `);
};

function CartProductOpen(){ // перебор для ризования
    cart.textContent = '';
    cartArr.forEach(product =>{ 
        return drawCartList(product)
    });
    
;}

  // создание мини корзины  





function getSummCart(){

    let sumTot = cartArr.reduce((total, product) =>{
        return total + product.price;
    },0);
    return  druwCartVisual(sumTot);
    
};


function druwCartVisual(summCart){
    if(cartArr.length !== 0 ){
        cartPrice.innerHTML = `В корзине товара на сумму: ${summCart} рублей `;
    }else{
        cartPrice.innerHTML = ` Корзина пуста `;
    }
    
}




const summCart = getSummCart(cartArr);

cartPrice.addEventListener('click', function(){
    cart.classList.add('open');
})

// удаление из карзины


cart.addEventListener('click', function(e){
    remuveProductFromCart(Number(e.target.getAttribute('data-id')))
//
});

function remuveProductFromCart(id){
    // console.log(id);

    for(i = 0; i < cartArr.length; i++){
        if(cartArr[i].id === id){
            cartArr.splice(i , 1);
        }
    }
    // console.log(cartArr);
    CartProductOpen();
    getSummCart()
    // const rv = cartArr.findIndex(prod =>{
    //     prod.id == id
    // })
    // console.log(rv);
    // for(let rv of cartArr){
    //     if(rv.id === id){
    //         console.log(rv);
    //     }
    // }
    
}

// скрыть/ показать карзину

cartPrice.addEventListener('click', function(){
    // cart.classList.toggle('hiden-cart')
});
 

// открытие картинки

const productImg = productAll.querySelectorAll('.img-product');
// console.log(productImg);
productImg.forEach(function(imgPr){
    imgPr.addEventListener('click', e => searchImg(Number(e.target.getAttribute('data-id'))));
});

function searchImg(id){
    for(let product of productArray){
        if(product.id === id){
            indexImg(product.img);
        };
    };



    // let prodId = productArray.forEach(product => id === product.id);

    

};
function drawImg(img, i = 0 ){
    

    let imgMain = document.querySelector('.popup__img_main');
    imgMain.innerHTML = '';
    imgMain.insertAdjacentHTML('afterbegin', `<img src="${img[i]}" alt="photo">`)
};


function indexImg(img){
    let i = 0;
    const leftImg = document.querySelector('.popup__img_arow-left');
    const rightImg = document.querySelector('.popup__img_arow-right');
    // console.log(leftImg);
    // console.log(rightImg);
 
    drawImg(img, i)
    
    leftImg.addEventListener('click', leftImgDrawt)


    function leftImgDrawt(e){
        i--;
        if(i < 0){
            i = img.length-1;
           drawImg(img, i); 
        }else{
            drawImg(img, i);
        };
        
        
    };

   
    
    rightImg.addEventListener('click', rightImgDrawt)

    function rightImgDrawt(e){
        i++;
        if(i === img.length){
            i = 0;
            drawImg(img, i);  
        }else{
            drawImg(img, i);  
        };
        
    };

    document.addEventListener('keydown', function(e){
        if(e.key === 'ArrowLeft'){
            leftImgDrawt()

        }else if(e.key === 'ArrowRight'){
            rightImgDrawt()
        }
    });
    
};


 registrationButton.addEventListener('click', function(){
    colectionRegistr();

});



function colectionRegistr(){
    //
        registration.classList.add('open');
        registrationButton.classList.add('hidden');
        addressButton.classList.remove('hidden');
        address.classList.remove('open');
        cartButton.classList.add('open');
        cart.classList.add('hidden')
        cart.classList.remove('open');
        cartButton.classList.remove('hidden');
        // console.log(cart);
    // 
}

addressButton.addEventListener('click', function(){
    colectionAddress()
});

// function colectionRegistr(){
//     registration.classList.add('open');
//     registrationButton.classList.add('hidden');
//     addressButton.classList.remove('hidden');
//     address.classList.remove('open');
//     cartButton.classList.add('open');
//     cart.classList.add('hidden')
//     cart.classList.remove('open');
//     cartButton.classList.remove('hidden')
   
//     // console.log(cart);
// };

function colectionAddress(){
    // 
        address.classList.add('open');
        addressButton.classList.add('hidden');
        registrationButton.classList.remove('hidden');
        registration.classList.remove('open');
        cartButton.classList.add('open');
        cart.classList.add('hidden');
        cart.classList.remove('open');
        cartButton.classList.remove('hidden');
    // 
};
cartButton.addEventListener('click',function(){
    colectionCart();
});


function colectionCart(){
    // 
        address.classList.remove('open');
        addressButton.classList.remove('hidden');
        registrationButton.classList.remove('hidden');
        registration.classList.remove('open');
        cartButton.classList.remove('open');
        cartButton.classList.remove('hideen');
        cart.classList.remove('hidden')
        cart.classList.add('open');
        cartButton.classList.add('hidden');
    // 
};




    furtherButton.addEventListener('click', function(){
        // console.log(popupNav.children)
foot1:    for(let i = 0; i < popupNav.children.length; i++){
            
            //    console.log(popupNav.children[i].classList)
foot2:    for(let k = 0; k < popupNav.children[i].classList.length; k++){
                if(popupNav.children[i].classList[k] === 'hidden'){

                    console.log(i);
                    
                    switch(i){
                        case 0:
                            colectionRegistr();
                        break foot1;
                        case 1:
                            colectionAddress();
                        break foot1;
                        case 2:
                            colectionCart();
                        break foot1;
                        
                    };
                };
                
            };

        };
        
    });

// colectionRegistr();
// colectionAddress();
// colectionCart();