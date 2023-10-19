  // Effectuer une requête GET vers l'API
  for (let i = 1; i < 30; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    .then(response => { return response.json();}) // Analyser la réponse JSON
    .then(data => {
                    // création d'une card
                    let card = document.createElement('div');
                    card.classList.add('card');

                    // création d'une image
                    let image = document.createElement('img');
                    image.src = data.sprites.front_default;
                    image.alt = `image de ${data.name}`;
                    image.classList.add('image');

                    // Création d'un noeud pour le nom
                    let name = document.createElement('h3');
                    name.innerHTML = `Nom : ${data.name}`;
                    name.classList.add('name');

                    // Création d'un noeud pour l'exp
                    let exp = document.createElement('p');
                    exp.classList.add('exp');
                    exp.innerHTML = `Base xp : ${data.base_experience}`;
                    
                    // autres options
                    let weight = document.createElement('p');
                    weight.classList.add('weight');
                    weight.innerHTML = `Weight : ${data.weight}`;

                    let abilities = document.createElement('h4');
                    abilities.classList.add('abilities');
                    abilities.innerHTML = 'Abilities :';

                    // on va créer une liste d'abilités
                    let abilitiesList = document.createElement('lu');
                    abilitiesList.classList.add('abilitiesList');


                    // on ajoute  les éléments à la carte
                    card.appendChild(image);
                    card.appendChild(name);
                    card.appendChild(weight);
                    card.appendChild(exp);
                    card.appendChild(abilities);
                    card.appendChild(abilitiesList);
                    // on boucle dans chaque tableau d'abilité et on affiche le name 
                    data.abilities.forEach((Element) =>{
                        let ability = document.createElement('li');
                        ability.innerHTML = Element.ability.name;
                        abilitiesList.appendChild(ability);
                    })
                
                    

                    // on ajoute toute les cards à la div card-container
                    document.querySelector('.card-container').appendChild(card);

        console.log(data);})// Traiter les données de la réponse ici
    .catch(error => {console.error('Erreur de requête :', error);});
}