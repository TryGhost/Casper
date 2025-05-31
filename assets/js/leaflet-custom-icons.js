// Custom Leaflet icons for the map
document.addEventListener('DOMContentLoaded', function() {
    // Define custom icons
    window.customIcons = {
        // Red flag icon
        redflag: L.icon({
            iconUrl: '/assets/images/redflag.png',
            iconSize: [30, 40],     // size of the icon
            iconAnchor: [15, 40],   // point of the icon which will correspond to marker's location
            popupAnchor: [0, -40]   // point from which the popup should open relative to the iconAnchor
        })
    };
});

