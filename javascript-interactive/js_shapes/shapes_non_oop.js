let color;
let circle;
let shape;
document.addEventListener('DOMContentLoaded', function() {

    let defaultColor = document.getElementById("color-chooser").firstElementChild;
    let defaultStyle = window.getComputedStyle(defaultColor);
    color = defaultStyle.getPropertyValue("background-color");
    document.getElementById("color-chooser").firstElementChild.classList.add("active");  

    let defaultShape = document.getElementById("shape-chooser").children[0];
    defaultShape.style.backgroundColor = color;
    defaultShape.classList.add("active-shape");

    document.getElementById("color-chooser").addEventListener("click",function(e){
        e.stopPropagation();
        let colorTarget = e.target;

        if(colorTarget.classList.contains("color")){
            colorTarget.classList.add("active");
        }   

        for(let i = 0 ; i < this.children.length ; i++){
            if(this.children[i] != colorTarget && !colorTarget.classList.contains("shape") && e.target != this){
                this.children[i].classList.remove("active");
            }
        }

        let targetStyles = window.getComputedStyle(colorTarget);
        color = targetStyles.getPropertyValue("background-color");
        document.getElementsByClassName("active-shape")[0].style.backgroundColor = color;
    });

    document.getElementById("shape-chooser").addEventListener("click",function(e){
        e.stopPropagation();
        let shapeChoice = e.target;
        for(let i = 0 ; i < this.children.length ; i++){
            if(this.children[i] != shapeChoice && !this.children[i].classList.contains("star-border") && e.target != this){
                this.children[i].style.backgroundColor = "white";
                this.children[i].classList.remove("active-shape");
            }
            if(document.getElementsByClassName("star")[0] != shapeChoice){
                document.getElementsByClassName("star")[0].style.backgroundColor = "white";
                this.children[i].classList.remove("active-shape");
            }
        }
        if(shapeChoice != document.getElementsByClassName("star-border")[0] && shapeChoice != this){
            shapeChoice.classList.add("active-shape");
            shapeChoice.style.backgroundColor = color;
        }
        let shapeStyle = window.getComputedStyle(shapeChoice);
        shape = shapeStyle.getPropertyValue("clip-path");
    });

    document.addEventListener("click",function(e){
        let selected;
        for(let i = 0 ; i < document.getElementsByClassName("color").length ; i++){
            if(document.getElementsByClassName("color")[i].classList.contains("active")){
                selected = true;
            }
        }
        if(selected){
            let randomRadius = Math.floor(Math.random() * (200 - 10 + 1) ) + 10;
            let xCoord = e.offsetX - (randomRadius / 2);
            let yCoord = e.offsetY - (randomRadius / 2);
            circle = document.createElement("p");
            circle.style.cssText = 'position:absolute; top:' + yCoord + 'px; \
            left:'+xCoord+'px; width:'+randomRadius+'px; height:'+randomRadius+'px; \
            border-radius:100%; background-color: '+color+';pointer-events:none;';
            if(shape == "none"){
                circle.style.borderRadius = "0";
            }else{
                circle.style.clipPath = shape;
            }
            document.getElementById("circles-container").appendChild(circle);
            myInterval = setInterval(function(){
                if(document.getElementById("circles-container").children.length > 0){
                    document.getElementById("circles-container").lastChild.classList.add("fadeOut");
                    let lastCircle = document.getElementById("circles-container").firstElementChild;
                    let stylesProp = window.getComputedStyle(lastCircle);
                    widthChange = stylesProp.getPropertyValue("width");
                    if(widthChange == "0px"){
                        lastCircle.remove();
                        clearInterval(myInterval);
                    }
                }
            },100);
        }
    });

    document.getElementById("reset").addEventListener("click",function(e){
        e.stopPropagation();
        document.getElementById("circles-container").innerHTML = "";
    });
    
});