let baseUrl2 = window.location.href;
let locationCheck = false;
let city;
let map;

// get getLocation attribute, and have the inputted form communicate with backend
$("#getLocation").submit(async (e) => {
    // prevent default behavior (the loading of a new page)
    e.preventDefault();
    let location = document.getElementById("user-location").value;
    let url = baseUrl2;
    console.log("location: " + location);
    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"location": location})
    }).then(
        function(res) {
            return res.json()
        }
    ).then(
        function(data) {
            city = data.fromServerLocation;
            console.log("City: " + city);
            updateLocationCheck();
            //updates map to new location
            map = updateMap(city);
            showGenerateStoresButton();
        }
    )
})

function updateMap(city) {
    let map;
    let geocoder = new google.maps.Geocoder();
    let coordinates = [];

    geocoder.geocode( { 'address': city }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            coordinates.push(results[0].geometry.location.lat());
            coordinates.push(results[0].geometry.location.lng());

            var latlng = new google.maps.LatLng(coordinates[0], coordinates[1]);
            var mapOptions = {
                zoom: 13,
                center: latlng,
                disableDefaultUI: true,
                gestureHandling: "none",
                scrollwheel: false,
                disableDoubleClickZoom: true,
                zoomControl: false,
                clickableIcons: false
            }
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
        } else {
            alert("Could not find city: " + city);
        }
    });
    return map;
}

function updateLocationCheck() {
    if (locationCheck == false) {
        locationCheck = true;
    } else {
        locationCheck = false;
    }
    return locationCheck;
}

function getLocationCheck() {
    return locationCheck;
}

function resetInputField() {
    $('#getLocation')[0].reset();
}

function getCity() {
    return city;
}

function getMap() {
    return map;
}