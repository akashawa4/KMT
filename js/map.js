let map;

function initMap() {
    // Kolhapur coordinates
    const kolhapur = { lat: 16.7050, lng: 74.2433 };
    
    // Create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: kolhapur,
        zoom: 13,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });

    // Draw bus routes
    const busRoutes = {
        'KMT-01': [
            { lat: 16.7050, lng: 74.2433 }, // Central Bus Stand
            { lat: 16.7080, lng: 74.2350 }, // Bindu Chowk
            { lat: 16.7100, lng: 74.2300 }, // Rankala Lake
        ],
        'KMT-02': [
            { lat: 16.7050, lng: 74.2433 }, // Central Bus Stand
            { lat: 16.7000, lng: 74.2400 }, // Shahupuri
            { lat: 16.6950, lng: 74.2350 }, // Kalamba
        ]
    };

    // Draw routes on map
    Object.entries(busRoutes).forEach(([routeId, path]) => {
        new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: routeId === 'KMT-01' ? '#FF0000' : '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        });
    });
}

window.initMap = initMap;