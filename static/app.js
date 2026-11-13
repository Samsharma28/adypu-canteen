const CART_KEY = "ADYPU Canteen_cart";
function readCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||"{}")}catch(e){return {}}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c))}
function initCart(userId){
 let cart=readCart();
 const update=()=>{
  let count=0,total=0;
  document.querySelectorAll(".add-cart").forEach(b=>{const n=cart[b.dataset.id]||0;b.textContent=n?`Added (${n})`:"Add +";});
  Object.entries(cart).forEach(([id,q])=>{const b=document.querySelector(`.add-cart[data-id="${id}"]`);if(b){count+=q;total+=Number(b.dataset.price)*q}});
  document.getElementById("cartCount").textContent=count;
  document.getElementById("cartTotal").textContent=total.toFixed(2);
  document.getElementById("cartBar").classList.toggle("show",count>0);
 };
 document.querySelectorAll(".add-cart").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.id;cart[id]=(cart[id]||0)+1;saveCart(cart);update()}));
 document.getElementById("checkoutBtn").addEventListener("click",()=>{
  if(!userId){location.href="/login";return}
  document.getElementById("cartData").value=JSON.stringify(cart);
  document.getElementById("checkoutForm").submit();
  localStorage.removeItem(CART_KEY);
 });
 update();
}
function watchOrder(id){
 const node=document.getElementById("orderStatus");
 setInterval(async()=>{try{const r=await fetch(`/api/orders/${id}`);if(r.ok){const d=await r.json();node.textContent=d.status}}catch(e){}},5000);
}
