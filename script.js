let images = [];

let current = 0;

fetch("bilder.json")
.then(r => r.json())
.then(data => {

    images = data;

    const gallery = document.getElementById("gallery");

    data.forEach((file,index)=>{

        const img=document.createElement("img");

        img.src="bilder/"+file;

        img.loading="lazy";

        img.onclick=()=>show(index);

        gallery.appendChild(img);

    });

});

const lightbox=document.getElementById("lightbox");

const lightboxImage=document.getElementById("lightbox-image");

function show(index){

    current=index;

    lightboxImage.src="bilder/"+images[index];

    lightbox.classList.remove("hidden");
}

document.getElementById("close").onclick=close;

lightbox.onclick=e=>{

    if(e.target===lightbox)

        close();
};

function close(){

    lightbox.classList.add("hidden");
}

document.addEventListener("keydown",e=>{

    if(lightbox.classList.contains("hidden"))

        return;

    if(e.key==="Escape")

        close();

    if(e.key==="ArrowRight")

        next();

    if(e.key==="ArrowLeft")

        previous();

});

function next(){

    current=(current+1)%images.length;

    lightboxImage.src="bilder/"+images[current];
}

function previous(){

    current=(current-1+images.length)%images.length;

    lightboxImage.src="bilder/"+images[current];
}
