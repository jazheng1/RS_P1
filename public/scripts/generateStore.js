var service;
var generateStoresBtn = document.getElementById('generateStores');

function generateStores() {
    const arr = getArr();
    const city = getCity();
    const map = getMap();
    console.log("inside generate: " + city);
    let query = "";
    for(let i = 0; i < arr.length; i++) {
        query += arr[i] + " "
    }

    query += "in " + city;
    console.log(query);

    var request = {
        location: city,
        radius: '500',
        query: query
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    console.log("search success")
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place);
            // createMarker(results[i]);
        }
    }
}

// generateStoresBtn.addEventListener("click", generateStores());