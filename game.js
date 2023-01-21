//Creamos el objeto para las tarjetas
const CardsArray = [
    {'Name':'HTML','img':'html.png'},
    {'Name':'CSS','img':'css.png'},
    {'Name':'JS','img':'js.png'},
    {'Name':'DOCKER','img':'docker.png'},
    {'Name':'NODE','img':'node.png'},
    {'Name':'TYPESCRIPT','img':'typescript.png'},
    {'Name':'PYTHON','img':'python.png'},
    {'Name':'VUE','img':'vue.svg'},
    {'Name':'ANGULAR','img':'angular.svg'},
    {'Name':'REACT','img':'react.svg'},
    {'Name':'JAVA','img':'java.png'},
    {'Name':'WORDPRESS','img':'wordpress.png'},
    {'Name':'PHP','img':'php.png'},
    {'Name':'CMASMAS','img':'cMasMas.png'},
    {'Name':'CSHARP','img':'cSharp.png'},
];

//GENERAMOS EL DUPLICADO PARA TENER COINCIDENCIAS
let GameGrid = CardsArray.concat(CardsArray);


//creamos una grilla 
GameGrid.sort(function(){
    return 0.5 - Math.random();
});


let Game = document.getElementById("game-board");
let Grid = document.createElement("section");
Grid.setAttribute("Class","Grid");
Game.appendChild(Grid);

//recorrer la matriz de tarjetas
for(let i=0; i<GameGrid.length; i++) {
    let Card = document.createElement("div");
    Card.setAttribute("Class","Card");
    Card.setAttribute("data-name", GameGrid[i].Name);

    //creamos la parte frontal de la tarjeta
    let front = document.createElement("div");
    front.classList.add("front");
    //creamos la parte trasera de la tarjeta
    let back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `Url(${GameGrid[i].img})`;
    //agregamos la tarjeta a la grilla
    Grid.appendChild(Card);
    Card.appendChild(front);
    Card.appendChild(back);
}



let primerClic = "";
let segundoClic = "";
let count = 0;
let previousTarget = null;
let delay = 1200;

const Match = function() {
    const Selected = document.querySelectorAll(".Selected");
    for(let i = 0; i<Selected.length; i++){
        Selected[i].classList.add("Match");
    }
};

//si no coninciden se reinicia y voltea la tarjeta
const resetGuesses = function(){
    primerClic = "";
    segundoClic = "";
    count = 0;
    previousTarget = null;

    const Selected = document.querySelectorAll(".Selected");
    for(i = 0; i<Selected.length;i++){
        Selected[i].classList.remove("Selected");
    }
};

//dectamos los eventos en la grilla
Grid.addEventListener("click", function(event){
    let clicked = event.target;
    if(clicked.NodeName === "section" || clicked === previousTarget || clicked.parentNode.classList.contains("Match")||clicked.parentNode.classList.contains("Selected")){
        return;
    }
    if(count < 2) {
        count++;
    if(count === 1) {
        primerClic = clicked.parentNode.dataset.Name;
        clicked.parentNode.classList.add("Selected");
    } else {
        segundoClic = clicked.parentNode.dataset.Name;
        clicked.parentNode.classList.add("Selected");
    }
    //si ambos coinciden
    if(primerClic !==  "&& segundoClic !==") {
        if(primerClic === segundoClic){
            setTimeout(Match,delay);
            setTimeout(resetGuesses,delay);
        }else {
            setTimeout(resetGuesses,delay);
        }
    }
    previousTarget = clicked;
    }
})