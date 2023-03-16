var service;
var generateStoresBtn = document.getElementById('generateStores');

console.log(getArr());

function generateStores() {
    const city = getCity();
    const map = getMap();
    console.log("inside generate: " + city);

    var request = {
        location: pyrmont,
        radius: '500',
        query: 'restaurant'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place);
            // createMarker(results[i]);
        }
    }
}

function reset() {
    inputArr = [];
    updateLocationCheck();
    resetInputField();
}