let label=document.getElementById("label");
let shoppingCart=document.getElementById("shopping-cart");
let basket=JSON.parse(localStorage.getItem("data")) || [];

let shopItemsData=[{
    id:"card1",
    name:"Men's Green Formal Shirt",
    price:1199,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img1.jpg"
},
{
    id:"card2",
    name:"Allen Solly Checked Shirt",
    price:1649,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img2.jpg"
},
{
    id:"card3",
    name:"Maroon Slim Fit Casual Shirt",
    price:1499,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img3.jpg"
},
{
    id:"card4",
    name:"Men's Black Slim Fit Shirt",
    price:1739,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img4.jpg"
},
{
    id:"card5",
    name:"Men's Regular Fit T-Shirt",
    price:1189,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img5.jpg"
},
{
    id:"card6",
    name:"Men's Black Slim Fit Shirt",
    price:1739,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img6.jpg"
},
{
    id:"card7",
    name:"Men's Regular Yellow T-Shirt",
    price:1299,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img7.jpg"
},
{
    id:"card8",
    name:"Men's Slim Fit Seagreen T-Shirt",
    price:889,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img8.jpg"
},
{
    id:"card9",
    name:"Men's Voilet Full Sleeve Jacket",
    price:1789,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img9.jpg"
},
{
    id:"card10",
    name:"Allen Solly Men's Blue Hooded Jacket",
    price:2199,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img10.jpg"
},
{
    id:"card11",
    name:"Men's Colourblocked Hooded Hooded Jacket",
    price:1999,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img11.jpg"
},
{
    id:"card12",
    name:"Allen Solly Men's Green Hooded Sweatshirt",
    price:2239,
    desc:"Lorem ipsum dolor sit amet, consectetu?",
    img:"images/img12.jpg"
}];

let calculation=()=>{
    let cartIcon=document.getElementById("cartAmount");
    //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();

let generateCartItems=()=>{
    if(basket.length !==0)
    {
        return (shoppingCart.innerHTML=basket.map((x)=>{
            let {id,item}=x;//destructuring
            let search=shopItemsData.find((y)=>y.id===id) || [];
            return `
            <div class="cart-item">
                <img width="250" height="180px" src=${search.img} alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">Rs.${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-square"></i>
                    </div>

                <div class="button">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>

                <h3>Rs.${item*search.price}</h3>
            </div>
            </div>`;
        })
        .join(""));//used to remove commas while seperating
    }
    else
    {
        shoppingCart.innerHTML=``;
        label.innerHTML=`
        <h2>Cart is Empty !!</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>`;
    }
}
generateCartItems();

let increment=(id)=>{
    let selectedItem=id;
    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search===undefined)
    {
        basket.push({id:selectedItem.id , item:1});
    }
    else
    {
        search.item+=1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
};
let decrement=(id)=>{
    let selectedItem=id;
    let search=basket.find((x)=>x.id===selectedItem.id);

    if(search===undefined)
    return;

    else if(search.item===0)
    {
        return;
    }
    else
    {
        search.item-=1;
    }
    
    update(selectedItem.id);
    basket=basket.filter((x)=>x.item!==0);
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};
let update=(id)=>{
    let search=basket.find((x)=>x.id===id);
    //console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmt();
};

let removeItem=(id)=>{
    let selectedItem=id;
    //console.log(selectedItem.id);
    basket=basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    totalAmt();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));    
};

let clearCart=()=>{
    basket=[];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));    
};

let totalAmt=()=>{
    if(basket.length!==0)
    {
        let amt=basket.map((x)=>{
            let{item,id}=x;
            let search=shopItemsData.find((y)=>y.id===id) || [];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        //console.log(amt);
        label.innerHTML=`
        <h2>Total bill value : Rs.${amt}</h2>
        <button class="checkout">Checkout</button> 
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;        
    }
    else
    {
        return;
    }
};
totalAmt();