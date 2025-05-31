// Custom Leaflet icons for the map
document.addEventListener('DOMContentLoaded', function() {
    // Define custom icons
    window.customIcons = {
        // DC colored bright flagred
        flag: L.icon({
            iconUrl: '/assets/images/icons/flag.png',
            shadowUrl: '/assets/images/icons/flagshadow.png',
            iconSize: [56, 60],     // size of the icon
            iconAnchor: [12, 54],   // point of the icon which will correspond to marker's location
            popupAnchor: [0, -40],  // point from which the popup should open relative to the iconAnchor
            shadowSize: [60, 60],
            shadowAnchor: [12, 54]
        }),
        // Red flag icon
        flagred: L.icon({
            iconUrl: '/assets/images/icons/flagred.png',
            shadowUrl: '/assets/images/icons/flagshadow.png',
            iconSize: [56, 60],     // size of the icon
            iconAnchor: [12, 54],   // point of the icon which will correspond to marker's location
            popupAnchor: [0, -40,],   // point from which the popup should open relative to the iconAnchor
            shadowSize: [60, 60],
            shadowAnchor: [12, 54]
        }),
        // Yellow flag icon
        flagyellow: L.icon({
            iconUrl: '/assets/images/icons/flagyellow.png',
            shadowUrl: '/assets/images/icons/flagshadow.png',
            iconSize: [52, 60],     // size of the icon
            iconAnchor: [7, 56],   // point of the icon which will correspond to marker's location
            popupAnchor: [0, -40],   // point from which the popup should open relative to the iconAnchor
            shadowSize: [60, 60],
            shadowAnchor: [7, 56]
        })
    };
});

