
//declaration d'un tableau de villes vide, pour gener les codes postaux qui on plusieurs villes
let villes = [];

// on fetch le lien de l'api pour y extraire des data. 
fetch("https://geo.api.gouv.fr/communes?codePostal=95000&fields=code,nom,centre,population")
.then(response => response.json()) // Analyser la réponse JSON
.then(data => {

    data.forEach((ville) => {
        villes.push(ville);
    })
   
    /*
    Ce code crée une carte Leaflet avec une vue sur les coordonnée [49.0373, 2.0455]. Il ajoute des tuiles OpenStreetMap à la carte et génère des marqueurs pour chaque ville dans le tableau "villes". Chaque marqueur affiche le nom de la ville et sa population dans une fenêtre contextuelle. Les marqueurs sont regroupés dans un groupe "groupMarkers" qui est ensuite ajouté à la carte. Enfin, la carte est ajustée pour afficher tous les marqueurs.
    */
    // Créer une carte Leaflet avec vue sur les coordonnées [49.0373, 2.0455]
    var map = L.map('map').setView([49.0373, 2.0455], 13);

    // Ajouter des tuiles OpenStreetMap à la carte
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

     

    // On groupe les markers qu'on stock dans groupMarkers pour les centrer 
    let groupMarkers = new L.FeatureGroup();

    
    //générer les marqueurs pour les villes
    villes.forEach((point) => {
        //on recupère les coordonnées
        let coords = point.centre.coordinates;
        // on separe les coordonnées en longirude et latitude
        let lat = coords[0];
        let lng = coords[1];

        // on ajouter les marqueurs
        let marker = L.marker([lng, lat]).addTo(map);
        //on ajoute aux marqueurs des popUp personalisés 
        marker.bindPopup(`<strong>${point.nom}</strong> <br>Population : ${point.population} habitants <br> <img href`).openPopup();


        
        // on ajoute à chaque villes du groupe un marker
        groupMarkers.addLayer(marker);
        // on les ajoute à la map
        groupMarkers.addTo(map);
        // on centre le group à la map pour voir l'ensemble des villes 
        map.fitBounds(groupMarkers.getBounds());

        // // retiter les markers par defaut
        // map.eachLayer((mark) => {
        //     if (mark instanceof L.Marker) {
        //         map.removeLayer(mark);
        //     }
        // })

    })
})
// gestion des erreur du fetch
.catch(error => {
    console.error('Erreur de requête :', error);
});