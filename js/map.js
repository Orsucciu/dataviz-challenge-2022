    //zoom levels are used to help us know the current state of the app
    //values:
    // initial
    // region
    // commune
    var current_zoom = "initial";

    var map = L.map('map').setView([42.158115, 9.031013], 9);
    map.options.minZoom = 9;
    map.setMaxBounds(map.getBounds());

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var json_data;

    //extend Leaflet to create a GeoJSON layer from a TopoJSON file
    L.TopoJSON = L.GeoJSON.extend({
        addData: function (data) {
        var geojson, key;
        if (data.type === "Topology") {
            json_data = data;
            for (key in data.objects) {
                if (data.objects.hasOwnProperty(key)) {
                    geojson = topojson.feature(data, data.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            }
            return this;
        }
        L.GeoJSON.prototype.addData.call(this, data);
        return this;
        }
    });

    L.topoJson = function(json, options) {
        return new L.TopoJSON(json, options);
    };

    var regions = {
        "Balagna": {
            "name": "Balagna",
            "color": "#13e735",
            "communes" : [
                "Algajola",
                "Aregno",
                "Avapessa",
                "Belgodère",
                "Calenzana",
                "Calvi",
                "Cateri",
                "Corbara",
                "Costa",
                "Feliceto",
                "L'Île-Rousse",
                "Lavatoggio",
                "Lumio",
                "Moncale",
                "Montegrosso",
                "Monticello",
                "Muro",
                "Nessa",
                "Occhiatana",
                "Pigna",
                "Sant'Antonino",
                "Santa-Reparata-di-Balagna",
                "Speloncato",
                "Ville-di-Paraso",
                "Zilia"
            ]
        },
        
        "Nebbiu": {
            "name": "Nebbiu",
            "color": "#13e200",
            "communes" : [
                "Barbaggio",
                "Farinole",
                "Murato",
                "Oletta",
                "Olmeta-di-Tuda",
                "Patrimonio",
                "Piève",
                "Poggio-d'Oletta",
                "Rapale",
                "Rutali",
                "Saint-Florent",
                "San-Gavino-di-Tenda",
                "Santo-Pietro-di-Tenda",
                "Sorio",
                "Vallecalle"
            ]
        },

        "Capicorsu": {
            "name": "Capicorsu",
            "color": "#09e735",
            "communes": [
                "Barrettali",
                "Brando",
                "Cagnano",
                "Canari",
                "Centuri",
                "Ersa",
                "Luri",
                "Meria",
                "Morsiglia",
                "Nonza",
                "Ogliastro",
                "Olcani",
                "Olmeta-di-Capocorso",
                "Pietracorbara",
                "Pino",
                "Rogliano",
                "Sisco",
                "Tomino"
            ]
        },

        "Bagnaja": {
            "name": "Bagnaja",
            "color": "#09e200",
            "communes": [
                "Bastia",
                "San-Martino-di-Lota",
                "Biguglia",
                "Borgo",
                "Lucciana",
                "Bigorno",
                "Campitello",
                "Canavaggia",
                "Santa-Maria-di-Lota",
                "Ville-di-Pietrabugno",
                "Furiani",
                "Vignale",
                "Lento",
                "Scolca",
                "Volpajola"
            ]
        },

        "Castagniccia": {
            "name": "Castagniccia",
            "color": "#09e735",
            "communes": [
                "Bisinchi",
                "Castello-di-Rostino",
                "Castineta",
                "Gavignano",
                "Campile",
                "Crocicchia",
                "Monte",
                "Olmo",
                "Morosaglia",
                "Saliceto",
                "Valle-di-Rostino",
                "Ortiporio",
                "Penta-Acquatella",
                "Prunelli-di-Casacconi",
                "Casalta",
                "Casabianca",
                "Croce",
                "Ficaja",
                "Giocatojo",
                "La Porta",
                "Piano",
                "Poggio-Marinaccio",
                "Polveroso",
                "Pruno",
                "Quercitello",
                "San-Damiano",
                "San-Gavino-d'Ampugnani",
                "Scata",
                "Silvareccio",
                "Castellare di Casinca",
                "Loreto di Casinca",
                "Penta di Casinca",
                "Porri",
                "Sorbo-Ocagnano",
                "Venzolasca",
                "Vescovato",
                "Pero-Casevecchie",
                "Poggio-Mezzana",
                "Taglio-Isolaccio",
                "Talasani",
                "Velone-Orneto",
                "San-Giovanni-di-Moriani",
                "San-Nicolao",
                "Santa-Lucia-di-Moriani",
                "Santa-Maria-Poggio",
                "Santa-Reparata-di-Moriani",
                "Camapana",
                "Carcheto-Brustico",
                "Carpineto",
                "Monacia-d'Orezza",
                "Nocario",
                "Parata",
                "Piazzole",
                "Pie-d'Orezza",
                "Piedicroce",
                "Piedipartino",
                "Rapaggio",
                "Stazzona",
                "Valle-d'Orezza",
                "Verdese",
                "Felce",
                "Novale",
                "Ortale",
                "Perelli",
                "Piazzali",
                "Pietricaggio",
                "Piobetta",
                "Tarrano",
                "Valle-d'Alesani",
                "Cervione",
                "San-Giuliano",
                "Sant'Andréa-di-Cotone",
                "Valle-di-Campoloro",
                "Campi",
                "Canale-di-Verde",
                "Chiatra",
                "Linguizzetta",
                "Pietra-di-Verde",
                "Tox",
                "Aiti",
                "Cambia",
                "Carticasi",
                "Érone",
                "Lano",
                "Rusio",
                "San-Lorenzo"
            ]
        },

        "Curtinese": {
            "name": "Curtinese",
            "color": "#09e735",
            "communes": [
                "Castiglione",
                "Piedigriggio",
                "Popolasca",
                "Prato-di-Giovellina",
                "Albertacce",
                "Calacuccia",
                "Casamaccioli",
                "Corscia",
                "Lozzi",
                "Castirla",
                "Corte",
                "Omessa",
                "Santa-Lucia-di-Mercurio",
                "Soveria",
                "Tralonca",
                "Casanova",
                "Poggio-di-Venaco",
                "Venaco",
                "Muracciole",
                "Noceta",
                "Rospigliani",
                "Vivario"
            ]
        },

        "Tavignanu": {
            "name": "Tavignanu",
            "color": "#fff",
            "communes": [
                "Aghione",
                "Aléria",
                "Casevecchie",
                "Ghisonaccia",
                "Alando",
                "Alzi",
                "Bustanico",
                "Castellare-di-Mercurio",
                "Favalello",
                "Mazzola",
                "Sant'Andrea-di-Bozio",
                "Sermano",
                "Altiani",
                "Antisanti",
                "Erbajolo",
                "Focicchia",
                "Giuncaggio",
                "Pancheraccia",
                "Piedicorte-di-Gaggio",
                "Pietraserena",
                "Ampriani",
                "Moïta",
                "Matra",
                "Pianello",
                "Tallone",
                "Zalana",
                "Zuani"
            ]
        },

        "Fiumorbu": {
            "name": "Fiumorbo",
            "color": "#ffff",
            "communes": [
                "Ghisoni",
                "Lugo-di-Nazza",
                "Pietroso",
                "Poggio-di-Nazza",
                "Vezzani",
                "Isolaccio-di-Fiumorbo",
                "Prunelli-di-Fiumorbo",
                "San-Gavino-di-Fiumorbo",
                "Chisa",
                "Serra-di-Fiumorbo",
                "Solaro",
                "Ventiseri"
            ]
        },

        "Bunifaziu": {
            "name": "Bunifaziu",
            "color": "#00000",
            "communes": [
                "Bonifacio",
                "Figari",
                "Monacia-d'Aullène",
                "Pianottoli-Caldarello",
                "Sotta",
                "Conca",
                "Lecci",
                "Porto-Vecchio",
                "Sari-Solenzara"
            ]
        },

        "Rocca": {
            "name": "Rocca",
            "color": "#12eF",
            "communes": [
                "Belvédère-Campomoro",
                "Bilia",
                "Foce",
                "Giuncheto",
                "Granace",
                "Grossa",
                "Sartène",
                "Arbellara",
                "Fozzano",
                "Propriano",
                "Santa-Maria-Figaniella",
                "Viggianello"
            ]
        },

        "Alta Rocca": {
            "name": "Alta Rocca",
            "color": "#3232",
            "communes": [
                "Carbini",
                "Levie",
                "San-Gavino-di-Carbini",
                "Zonza",
                "Altagène",
                "Cargiaca",
                "Loreto-di-Tallano",
                "Mela",
                "Olmiccia",
                "Sainte-Lucie-de-Tallano",
                "Zoza",
                "Aullène",
                "Quenza",
                "Serra-di-Scopamène",
                "Sorbollano",
                "Zérubia"
            ]
        },

        "Taravu": {
            "name": "Taravu",
            "color": "#ff0000",
            "communes": [
                "Argiusta-Moriccio",
                "Casalabriva",
                "Moca-Croce",
                "Olivese",
                "Olmeto",
                "Petreto-Bicchisano",
                "Sollacaro",
                "Ciamannacce",
                "Corrano",
                "Cozzano",
                "Guitera-les-Bains",
                "Palneca",
                "Sampolo",
                "Tasso",
                "Zévaco",
                "Zicavo",
                "Albitreccia",
                "Azilone-Ampaza",
                "Cardo-Torgia",
                "Campo",
                "Cognocoli-Monticchi",
                "Coti-Chiavari",
                "Forciolo",
                "Frasseto",
                "Grosseto-Prugna",
                "Guargualé",
                "Pietrosella",
                "Pila-Canale",
                "Quasquara",
                "Santa-Maria-Siché",
                "Serra-di-Ferro",
                "Urbalacone",
                "Zigliara"
            ]
        },

        "Gravona-Prunelli": {
            "name": "Gravona-Prunelli",
            "color": "#ff0000",
            "communes": [
                "Ajaccio",
                "Alata",
                "Appietto",
                "Villanova",
                "Afa",
                "Cuttoli-Corticchiato",
                "Peri",
                "Sarrola-Carcopino",
                "Tavaco",
                "Valle-di-Mezzana",
                "Bocognano",
                "Carbuccia",
                "Tavera",
                "Ucciani",
                "Vero",
                "Bastelica",
                "Bastelicaccia",
                "Cauro",
                "Eccica-Suarella",
                "Ocana",
                "Tolla"
            ]
        },

        "Liamone": {
            "name": "Liamone",
            "color": "#ff0000",
            "communes": [
                "Ambiegna",
                "Arro",
                "Calcatoggio",
                "Cannelle",
                "Casaglione",
                "Lopigna",
                "Sant'Andréa-d'Orcino",
                "Sari-d'Orcino",
                "Azzana",
                "Pastricciola",
                "Rezza",
                "Rosazia",
                "Salice",
                "Arbori",
                "Balogna",
                "Coggia",
                "Letia",
                "Murzo",
                "Renno",
                "Vico",
                "Guagno",
                "Orto",
                "Poggiolo",
                "Soccia"
            ]
        },

        "Duii Sevi": {
            "name": "Duii Sevi",
            "color": "#ff0000",
            "communes": [
                "Cristinacce",
                "Évisa",
                "Marignana",
                "Cargèse",
                "Ota",
                "Piana",
                "Osani",
                "Partinello",
                "Serriera"
            ]
        }
    };

    //take in a feature, read its name, and returns the region specific things
    function getRegionSpecs(feature) {
        Object.entries(regions).forEach(([key, value]) => {
            if (value.communes.includes(feature.properties.libgeo)) {
                
                console.log(feature.properties.libgeo + " is in " + regions[key].name);
                return {
                    name: regions[key].name,
                    color: regions[key].color
                }
            }
        });
    }

    //create an empty geojson layer
    //with a style and a popup on click

    var geojson = L.topoJson(null, {
        style: function(feature){
            return {
                color: "#000",
                opacity: 1,
                weight: 1,
                fillColor: "#000",
                fillOpacity: 0.2
            }
        },
        onEachFeature: function(feature, layer) {
            console.log(feature);

            featureBounds = L.geoJson(feature).getBounds();

            var sw = featureBounds.getSouthWest();
            var ne = featureBounds.getNorthEast();
            var southWest = new L.LatLng(sw.lat, sw.lng);
            var northEast = new L.LatLng(ne.lat, ne.lng);
            bounds = new L.LatLngBounds(southWest, northEast);
            console.log(bounds);

            layer.bindPopup('<p>'+feature.properties.libgeo+'</p>').on('click', function() { commune = (feature.properties.libgeo); map.fitBounds(getBoundsFromFeature(this)); });

        },
    }).addTo(map);

    //takes in a feature, and gives back the bounds to zoom to
    function getBoundsFromFeature(feature) {
        featureBounds = feature.getBounds();

        var sw = featureBounds.getSouthWest();
        var ne = featureBounds.getNorthEast();
        var southWest = new L.LatLng(sw.lat, sw.lng);
        var northEast = new L.LatLng(ne.lat, ne.lng);
        bounds = new L.LatLngBounds(southWest, northEast);

        return bounds;
    }

    //fill: #317581;
    //define a function to get and parse geojson from URL
    async function getGeoData(url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    //fetch the geojson and add it to our geojson layer
    getGeoData('communes_4326.json').then(data => geojson.addData(data));