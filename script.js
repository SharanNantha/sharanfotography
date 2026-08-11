const gallery=document.getElementById("gallery"),filters=document.getElementById("filters");
const cats=["All",...new Set(PHOTOS.map(p=>p.group))];let active="All",current=0;
cats.forEach(cat=>{const b=document.createElement("button");b.className="filter"+(cat==="All"?" active":"");b.textContent=cat;b.onclick=()=>{active=cat;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()};filters.appendChild(b)});
function render(){gallery.innerHTML="";PHOTOS.filter(p=>active==="All"||p.group===active).forEach((p)=>{const card=document.createElement("article");card.className="card";card.innerHTML=`<img loading="lazy" src="photos/${encodeURIComponent(p.file)}" alt="${p.title} — ${p.group}"><div class="overlay"><h3>${p.title}</h3><p>${p.group}</p></div>`;card.onclick=()=>openBox(PHOTOS.indexOf(p));gallery.appendChild(card)})}
const lb=document.getElementById("lightbox"),img=document.getElementById("lightbox-img"),ttl=document.getElementById("lightbox-title"),meta=document.getElementById("lightbox-meta");
function openBox(i){current=i;const p=PHOTOS[current];img.src="photos/"+encodeURIComponent(p.file);img.alt=p.title;ttl.textContent=p.title;meta.textContent=p.group+" · "+String(p.index).padStart(2,"0")+" / "+PHOTOS.length;lb.classList.add("open");lb.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeBox(){lb.classList.remove("open");lb.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function move(n){current=(current+n+PHOTOS.length)%PHOTOS.length;openBox(current)}
document.getElementById("close").onclick=closeBox;document.getElementById("prev").onclick=()=>move(-1);document.getElementById("next").onclick=()=>move(1);
lb.addEventListener("click",e=>{if(e.target===lb)closeBox()});document.addEventListener("keydown",e=>{if(!lb.classList.contains("open"))return;if(e.key==="Escape")closeBox();if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1)});
render();