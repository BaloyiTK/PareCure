const products={bodylotion:{name:"PareCure Body Lotion · 250 ml",price:129.99},oil:{name:"Dark Inner Thigh & Underarms Remover Tissue Oil · 50 ml",price:99.99},facewash:{name:"PareCure Face Wash · 100 ml",price:79.99},"brightening-serum":{name:"PareCure Brightening Serum · 50 ml",price:179.99},sunscreen:{name:"PareCure Sunscreen SPF 50 (Face) · 100 ml",price:199.99}};
const bag=[];
const count=document.getElementById("bag-count");
const total=document.getElementById("bag-total-count");
const overlay=document.getElementById("bag-overlay");
const items=document.getElementById("bag-items");
function renderBag(){count.textContent=bag.length;total.textContent="("+bag.length+")";items.innerHTML=bag.length?bag.map((id,i)=>'<div class="bag-item"><strong>'+products[id].name+'</strong><div style="margin-top:8px;color:#77736b">R '+products[id].price.toFixed(2)+'</div></div>').join(""):'<p class="empty-bag">Your bag is taking a little breather.<br>Explore the collection to find your essentials.</p>';}
document.querySelectorAll(".add-to-bag").forEach(button=>button.addEventListener("click",()=>{bag.push(button.dataset.product);renderBag();overlay.hidden=false;}));
document.getElementById("bag-open").addEventListener("click",()=>overlay.hidden=false);
document.getElementById("bag-close").addEventListener("click",()=>overlay.hidden=true);
overlay.addEventListener("click",event=>{if(event.target===overlay)overlay.hidden=true;});
document.addEventListener("keydown",event=>{if(event.key==="Escape")overlay.hidden=true;});
const menu=document.querySelector(".menu-toggle");menu.addEventListener("click",()=>{const nav=document.querySelector(".main-nav");const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("newsletter-form").addEventListener("submit",event=>{event.preventDefault();document.getElementById("newsletter-message").textContent="Thank you — newsletter sign-up will be connected when email services are configured.";});
