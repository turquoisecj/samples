class Shape {
    
    _color;
    _defaultColor;
    _defaultStyle;
    _defaultShape;
    _colorTarget;
    _targetStyles;
    _shapeChoice;
    _selected;
    _randomRadius;
    _xCoord;
    _yCoord;
    _shapeGenerated;
    _myInterval;
    _lastShape;
    _stylesProp;
    _widthChange;
    _shape;
    self = this;

    constructor(){
        self._defaultColor = document.getElementById("color-chooser").firstElementChild;
        self._defaultStyle = window.getComputedStyle(self._defaultColor);
        self._color = self._defaultStyle.getPropertyValue("background-color");
        self._defaultShape = document.getElementById("shape-chooser").children[0];
        self._defaultShape.style.backgroundColor = self._color;
    }

    _initDefaultShape(){
        self._defaultShape.classList.add("active-shape");
    }

    _chooseColor(){
        document.getElementById("color-chooser").addEventListener("click",function(e){
            e.stopPropagation();
            self._colorTarget = e.target;
    
            if(self._colorTarget.classList.contains("color")){
                self._colorTarget.classList.add("active");
            }   
    
            for(let i = 0 ; i < this.children.length ; i++){
                if(this.children[i] != self._colorTarget && !self._colorTarget.classList.contains("shape") && e.target != this){
                    this.children[i].classList.remove("active");
                }
            }
            if(self._colorTarget.classList.contains("color")){
                self._targetStyles = window.getComputedStyle(self._colorTarget);
                self._color = self._targetStyles.getPropertyValue("background-color");
            }
            document.getElementsByClassName("active-shape")[0].style.backgroundColor = self._color;
        });
    }

    _generateShape(){
        document.addEventListener("click",function(e){
            for(let i = 0 ; i < document.getElementsByClassName("color").length ; i++){
                if(document.getElementsByClassName("color")[i].classList.contains("active")){
                    self._selected = true;
                }
            }
            if(self._selected){
                self._randomRadius = Math.floor(Math.random() * (200 - 10 + 1) ) + 10;
                self._xCoord = e.offsetX - (self._randomRadius / 2);
                self._yCoord = e.offsetY - (self._randomRadius / 2);
                self._shapeGenerated = document.createElement("p");
                self._shapeGenerated.style.cssText = 'position:absolute; top:' + self._yCoord + 'px; \
                left:'+self._xCoord+'px; width:'+self._randomRadius+'px; height:'+self._randomRadius+'px; \
                border-radius:100%; background-color: '+self._color+';pointer-events:none;';
                if(self._shape == "none"){
                    self._shapeGenerated.style.borderRadius = "0";
                }else{
                    self._shapeGenerated.style.clipPath = self._shape;
                }
                document.getElementById("circles-container").appendChild(self._shapeGenerated);
                self._myInterval = setInterval(function(){
                    if(document.getElementById("circles-container").children.length > 0){
                        document.getElementById("circles-container").lastChild.classList.add("fadeOut");
                        self._lastShape = document.getElementById("circles-container").firstElementChild;
                        self._stylesProp = window.getComputedStyle(self._lastShape);
                        self._widthChange = self._stylesProp.getPropertyValue("width");
                        if(self._widthChange == "0px"){
                            _lastShape.remove();
                            clearInterval(self._myInterval);
                        }
                    }
                },100);
            }
        });
    }
    
    _resetFunc(){
        document.getElementById("reset").addEventListener("click",function(e){
            e.stopPropagation();
            document.getElementById("circles-container").innerHTML = "";
        });
    }
}

class Square extends Shape {
    self = Shape;
    static _selectSquare(){
        document.getElementsByClassName("square")[0].addEventListener("click",function(e){
            e.stopPropagation();
            self._shapeChoice = e.target;
            for(let i = 0 ; i < document.getElementById("shape-chooser").children.length ; i++){
                if(document.getElementById("shape-chooser").children[i] != self._shapeChoice && !document.getElementById("shape-chooser").children[i].classList.contains("star-border")){
                    document.getElementById("shape-chooser").children[i].style.backgroundColor = "white";
                    document.getElementById("shape-chooser").children[i].classList.remove("active-shape");
                }
                if(document.getElementsByClassName("star")[0] != self._shapeChoice){
                    document.getElementsByClassName("star")[0].style.backgroundColor = "white";
                    document.getElementById("shape-chooser").children[i].classList.remove("active-shape");
                }
            }
            if(self._shapeChoice != document.getElementsByClassName("star-border")[0]){
                self._shapeChoice.classList.add("active-shape");
                self._shapeChoice.style.backgroundColor = self._color;
            }
            self._shape = "none";
        });
    }
}

class Circle extends Shape {
    self = Shape;
    static _selectCircle(){
        document.getElementsByClassName("circle")[0].addEventListener("click",function(e){
            e.stopPropagation();
            self._shapeChoice = e.target;
            for(let i = 0 ; i < document.getElementById("shape-chooser").children.length ; i++){
                if(document.getElementById("shape-chooser").children[i] != self._shapeChoice && !document.getElementById("shape-chooser").children[i].classList.contains("star-border")){
                    document.getElementById("shape-chooser").children[i].style.backgroundColor = "white";
                    document.getElementById("shape-chooser").children[i].classList.remove("active-shape");
                }
                if(document.getElementsByClassName("star")[0] != self._shapeChoice){
                    document.getElementsByClassName("star")[0].style.backgroundColor = "white";
                    document.getElementById("shape-chooser").children[i].classList.remove("active-shape");
                }
            }
            if(self._shapeChoice != document.getElementsByClassName("star-border")[0]){
                self._shapeChoice.classList.add("active-shape");
                self._shapeChoice.style.backgroundColor = self._color;
            }
            self._shape = "circle(50% at 50% 50%)";
        });
    }
}

class Star extends Shape {
    self = Shape;
    static _selectStar(){
        document.getElementsByClassName("star")[0].addEventListener("click",function(e){
            e.stopPropagation();
            self._shapeChoice = e.target;
            for(let i = 0 ; i < document.getElementById("shape-chooser").children.length ; i++){
                if(document.getElementById("shape-chooser").children[i] != self._shapeChoice && !document.getElementById("shape-chooser").children[i].classList.contains("star-border")){
                    document.getElementById("shape-chooser").children[i].style.backgroundColor = "white";
                    document.getElementById("shape-chooser").children[i].classList.remove("active-shape");
                }
                if(document.getElementsByClassName("star")[0] != self._shapeChoice){
                    document.getElementsByClassName("star")[0].style.backgroundColor = "white";
                    document.getElementById("shape-chooser").children[i].classList.remove("active-shape");
                }
            }
            if(self._shapeChoice == document.getElementsByClassName("star")[0]){
                self._shapeChoice.classList.add("active-shape");
                self._shapeChoice.style.backgroundColor = self._color;
            }
            self._shape = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
        });
    }
}