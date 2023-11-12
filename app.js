let shop=document.getElementById('shop');
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

let basket=JSON.parse(localStorage.getItem("data")) || [];

let generateShop=()=>{
    return  (shop.innerHTML=shopItemsData.map((x)=>{
        let {id,name,price,desc,img}=x;
        let search=basket.find((x)=>x.id === id) || [];
        return `
        <div id="product-id-${id}" class="item">
                <img width="218" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>Rs.${price}</h2>
                        <div class="button">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item===undefined ? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`
    })
    .join(""));
};
generateShop();

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

    //console.log(basket);
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
    //console.log(basket);
    localStorage.setItem("data",JSON.stringify(basket));
};
let update=(id)=>{
    let search=basket.find((x)=>x.id===id);
    //console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
};
let calculation=()=>{
    let cartIcon=document.getElementById("cartAmount");
    //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();