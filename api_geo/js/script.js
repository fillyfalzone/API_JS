const form = document.querySelector('form');
const result = document.querySelector('.result');
const select = document.querySelector('select');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // annule le comportement par défaut du formulaire
    const inputCodePostal = document.querySelector('.codePostal');
    getInfosAPI(inputCodePostal.value);
    
});



function getInfosAPI(codePostal) {
    fetch("https://geo.api.gouv.fr/communes?codePostal=" + codePostal + "&fields=nom,code,population,codeRegion,codeDepartment")
    .then(response => response.json()) // Analyser la réponse JSON
    .then(data => {
        select.innerHTML = ''; // Efface les options précédentes

        for (let i = 0; i < data.length; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.innerHTML = data[i].nom;
            select.appendChild(option);
        }

        // Sélectionnez la première option par défaut
        select.selectedIndex = 0;

        // Afficher les informations de la première option par défaut
        const selectedOption = data[select.value];
        result.innerHTML = "Nom : " + selectedOption.nom + "<br>" + "Population : " + selectedOption.population + "<br>" + "Code région : " + selectedOption.codeRegion + "<br>" + "Code département : " + selectedOption.codeDepartment + "<br>";

        //S'il ya plusieurs viles afficher les info au changement d'option
        select.addEventListener('change', () => {
            const selectedOption = data[select.value];
            result.innerHTML = "Nom : " + selectedOption.nom + "<br>" + "Population : " + selectedOption.population + "<br>" + "Code région : " + selectedOption.codeRegion + "<br>" + "Code département : " + "<br>";
        });
    })
    .catch(error => {
        console.error('Erreur de requête :', error);
    });
}
