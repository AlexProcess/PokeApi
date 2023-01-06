///1.Obtener datos de la API, devolverlos etc...

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

let allPokemons = []

const conct = (value)  => {
    const pokedex = fetch(baseUrl+value) 
        .then((response) => {
            
        //console.log(response);
        return response.json();
        })
            
        .then((myJson) => {
        //console.log(myJson)
        allPokemons.push(myJson)
        return myJson; 
        });
        return pokedex;    
    }
    
/// 2. /MAP de los datos  


const pokeMap = (pokesData) =>{


const mappedData = pokesData.map((pokeData) =>({
    name: pokeData.name,
    weight: pokeData.weight,
    type: pokeData.types,
    img: pokeData.sprites.front_default
    }))
    
    return mappedData;
}
// 2.1 PINTAR LOS DATOS




const drawPokes = (pokemons) =>{
    for (const poke of pokemons) {
        let section$$ = document.querySelector('#father')
        let article$$ = document.createElement('article')
    
    let pokeName$$ = document.createElement('h4')
    let img$$ = document.createElement('img')
    let type$$ = document.createElement('div')
    let weight$$ = document.createElement('p')

    pokeName$$.className = 'title__desc'
    img$$.className = 'img__desc'
    type$$.className = 'element__desc__cointainer'
    weight$$.className = 'element__desc'
    article$$.className = 'gallery-card__container'
    

    
    pokeName$$.textContent = poke.name;
    img$$.setAttribute("src", poke.sprites.other?.["official-artwork"].front_default);
    //type$$.textContent = poke.types[0].type.name;


    for (let i = 0; i < poke.types.length; i++) {
        const element = poke.types[i];
        let span$$ = document.createElement ('span')
        span$$.textContent = element.type.name
        type$$.appendChild(span$$)
        span$$.className = 'element__desc_' + element.type.name
        
    }
    weight$$.textContent = 'Weigth: '  + poke.weight +'kg ';
    
    

    article$$.appendChild(pokeName$$)
    article$$.appendChild(img$$)
    article$$.appendChild(type$$)
    article$$.appendChild(weight$$)
        
        section$$.appendChild(article$$)
    }
}

const searchPokes = (name, pokes) => {
    const filteredPokes = pokes.filter((poke) => poke.title.toLowerCase().includes(name.toLowerCase()))
    drawPokes(filteredPokes);
}
const selectInput = document.querySelector('input')

const selectButton = document.querySelector('#searcher__form')


selectButton.addEventListener('submit',(event) =>{
    event.preventDefault()
    if (selectInput.value.length === 0) {
        document.querySelector('#father').classList.remove('hidden__pokes')
        document.querySelector('#searcher').classList.add('hidden__pokes')
        return 
    }
    let filterLetters = allPokemons.filter(poke =>poke.name.includes(selectInput.value) )
    if  (filterLetters.length > 0) {
        document.querySelector('#searcher').classList.remove('hidden__pokes')
        document.querySelector('#father').classList.add('hidden__pokes')

        const articlesAll = document.querySelectorAll('.gallery__s')
        const query = document.querySelector('#searcher') 
        
        for (let i = 0; i < articlesAll.length; i++) {
            
            query.removeChild(articlesAll[i])
        }

        

        for (const poke of filterLetters) {
            let section$$ = document.querySelector('#searcher')
            let article$$ = document.createElement('article')
        
        let pokeName$$ = document.createElement('h4')
        let img$$ = document.createElement('img')
        let type$$ = document.createElement('div')
        let weight$$ = document.createElement('p')
    
        pokeName$$.className = 'title__desc'
        img$$.className = 'img__desc'
        type$$.className = 'element__desc__cointainer'
        weight$$.className = 'element__desc'
        article$$.className = 'gallery-card__container'
        article$$.classList.add('gallery__s') 
        
    
        
        pokeName$$.textContent = poke.name;
        img$$.setAttribute("src", poke.sprites.other?.["official-artwork"].front_default);
    
    
        for (let i = 0; i < poke.types.length; i++) {
            const element = poke.types[i];
            let span$$ = document.createElement ('span')
            span$$.textContent = element.type.name
            type$$.appendChild(span$$)
            span$$.className = 'element__desc_' + element.type.name
            
        }
        weight$$.textContent = 'Weigth: '  + poke.weight +'kg ';
        
        
    
        article$$.appendChild(pokeName$$)
        article$$.appendChild(img$$)
        article$$.appendChild(type$$)
        article$$.appendChild(weight$$)
            
            section$$.appendChild(article$$)
        }
    }
    
})





const init = async () => {
    for (let i = 1; i < 152; i++) {
     await conct(i)
        }

drawPokes(allPokemons);

}

init();
