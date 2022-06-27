    wait = (seconds) => 
    new Promise(resolve => 
    setTimeout(() => resolve(true), seconds * 1000)
    );
    
    var map = L.map('map').setView([42.158115, 9.031013], 9);
    map.options.minZoom = 9;
    map.setMaxBounds(map.getBounds());
    map.on("zoomend",function() {
        if (map.getZoom() < 10) {
            swapZoomLevel();
        }
    });

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
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
            "color": "#de893f",
            "communes" : [
                "Pietralba",
                "Palasca",
                "Olmi-Cappella",
                "Novella",
                "Mausoléo",
                "Manso",
                "Lama",
                "Galéria",
                "Castifao",
                "Moltifao",
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
                "Zilia",
                "Asco",
                "Vallica",
                "Urtaca",
                "Pioggiola"
            ]
        },
        
        "Nebbiu": {
            "name": "Nebbiu",
            "color": "#41abb7",
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
            "color": "#e18736",
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
            "name": "5096a4",
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
            "color": "#e9ada9",
            "communes": [
                "Loreto-di-Casinca",
                "Penta-di-Casinca",
                "Castellare-di-Casinca",
                "Campana",
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
                "Verdèse",
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
            "color": "#8b6f9a",
            "communes": [
                "Riventosa",
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
                "Santo-Pietro-di-Venaco",
                "Venaco",
                "Muracciole",
                "Noceta",
                "Rospigliani",
                "Vivario"
            ]
        },

        "Tavignanu": {
            "name": "Tavignanu",
            "color": "#fef000",
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
                "Sant'Andréa-di-Bozio",
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
            "color": "#424c70",
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
            "color": "#d88d4a",
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
            "color": "#fef000",
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
            "color": "#3f4c6e",
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
            "color": "#69a45b",
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
            "color": "#48713e",
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
            "color": "#f1be00",
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
            "color": "#cc4625",
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
            //no point going further if the region has no communes
            if(value.hasOwnProperty("communes")) {
                //if the commune is in the region's communes array
                if (value.communes.includes(feature.properties.libgeo)) {
                    
                    const theRegion = regions[key].name;
                    const theColor = regions[key].color;
                    //console.log(feature.properties.libgeo + " is in " + theRegion);
                    feature.properties.region = theRegion;
                    feature.properties.color = theColor;

                    return true;
                }
            } else {

                return false;
            }
        });
    }

    function swapZoomLevel() {

        if (current_zoom == "region"){

            current_zoom = "commune";
            map.addLayer(communesLayer);


        } else if (current_zoom == "commune") {

            current_zoom = "region";
            map.addLayer(regionsTopo);
            
            map.removeLayer(communesLayer);
        }
    }

    //polygons to merge
    //each regions has an associated array witht the features to mege (the thing turf expects)
    var regionsUnions = {

    };

    var regionsLayer = {

        "type": "FeatureCollection",
        "features": []
    };

    var regionsTopo = L.topoJson(null, {
        style: function(feature) {
            return {
                fillColor: feature.properties.color,
                fillOpacity: 0.0,
                weight: 1.5,
                opacity: 1,
                color: feature.properties.color
            };
        },
        onEachFeature: function(feature, layer) {

            //this makes us zoom to the region when we click on it
            featureBounds = L.geoJson(feature).getBounds();

            var sw = featureBounds.getSouthWest();
            var ne = featureBounds.getNorthEast();
            var southWest = new L.LatLng(sw.lat, sw.lng);
            var northEast = new L.LatLng(ne.lat, ne.lng);
            bounds = new L.LatLngBounds(southWest, northEast);

            layer.bindPopup('<p>'+feature.properties.region+'</p>').on('click', function() { map.fitBounds(getBoundsFromFeature(this)); change(); swapZoomLevel(); });
        }
    });


    //need regionsUnions and regionsLayer to work
    function populateRegionsLayer() {

        Object.entries(regionsUnions).forEach(([key, value]) => {
        
            var union = regionsUnions[key][0];

            for (let i = 1; i < regionsUnions[key].length; i++) {
                union = turf.union(union, regionsUnions[key][i]);
            }

            regionsLayer.features.push(union);
        });
    }

    //create an empty geojson layer
    //with a style and a popup on click

    var communesLayer = L.topoJson(null, {
        style: function(feature){
            return {
                color: feature.properties.color,
                opacity: 1,
                weight: 1.5,
                fillColor: "#000",
                fillOpacity: 0.00
            }
        },
        onEachFeature: function(feature, layer) {

            getRegionSpecs(feature);

            //if the region is in the regionsUnions dictionnary
            if(regionsUnions.hasOwnProperty(feature.properties.region)) {

                //add the missing regions dynamically
                regionsUnions[feature.properties.region].push(feature);
            
            } else {

                //create the array for the region
                regionsUnions[feature.properties.region] = [feature];

            }

            //bounds code

            featureBounds = L.geoJson(feature).getBounds();

            var sw = featureBounds.getSouthWest();
            var ne = featureBounds.getNorthEast();
            var southWest = new L.LatLng(sw.lat, sw.lng);
            var northEast = new L.LatLng(ne.lat, ne.lng);
            bounds = new L.LatLngBounds(southWest, northEast);

            //no need to zoom constantly in the end
            //layer.bindPopup('<p>'+feature.properties.libgeo+'</p>').on('click', function() { swapZoomLevel(); commune = (feature.properties.libgeo); map.fitBounds(getBoundsFromFeature(this)); change(); });

            layer.bindPopup('<p>'+feature.properties.libgeo+'</p>').on('click', function() {commune = (feature.properties.libgeo); change(); });

        },
    });

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
    getGeoData('communes_4326.json').then(data => 
        {
            communesLayer.addData(data);
            communesLayer.resetStyle();
            populateRegionsLayer();
            regionsTopo.addData(regionsLayer).addTo(map);
        }    
    );