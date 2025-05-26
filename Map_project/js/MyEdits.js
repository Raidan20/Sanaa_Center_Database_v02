// Adding the center logo to the page 
let logo = document.createElement('img');
logo.src = "images/CenterLogo.png"

logo.style.cssText = `
        position: fixed;    /* This makes the image stay in place, even when scrolling */
        bottom: 0;          /* Aligns the image to the bottom of the page */
        left: 0;            /* Aligns the image to the left side of the page */
        z-index: 999;       /* Makes sure the image stays on top of other content */
        width: 120px;       /* Adjust the size of the image as needed */
        height: auto;       /* Keeps the image's aspect ratio */
        /* Optional: Remove any background to preserve transparency */
        background-color: transparent;
`;
document.body.appendChild(logo);


// Adding the labels of the governorates
var cities = [
        { "name": "Ibb", "lat": 14.076, "lng": 44.168 },
        { "name": "Abyan", "lat": 13.755, "lng": 46.027 },
        { "name": "Al&#8209;Bayda", "lat": 14.32, "lng": 45.337 },
        { "name": "Taiz", "lat": 13.386, "lng": 43.56 },
        { "name": "Al&#8209;Jawf", "lat": 16.737, "lng": 45.524 },
        { "name": "Hajjah", "lat": 16.026, "lng": 43.194 },
        { "name": "Hudaydah", "lat": 14.795, "lng": 42.958 },
        { "name": "Hadramawt", "lat": 16.734, "lng": 48.579 },
        { "name": "Dhamar", "lat": 14.721, "lng": 44.225 },
        { "name": "Shabwa", "lat": 14.899, "lng": 46.542 },
        { "name": "Sa'ada", "lat": 16.984, "lng": 43.814 },
        { "name": "Sana'a", "lat": 15.35, "lng": 44.203 },
        { "name": "Aden", "lat": 12.781, "lng": 45.023 },
        { "name": "Lahj", "lat": 13.154, "lng": 44.542 },
        { "name": "Marib", "lat": 15.539, "lng": 45.242 },
        { "name": "Al&#8209;Mahwit", "lat": 15.369, "lng": 43.3 },
        { "name": "Al&#8209;Mahra", "lat": 16.867, "lng": 51.474 },
        { "name": "Amran", "lat": 16.235, "lng": 43.847},
        { "name": "Al&#8209;Dhalea", "lat": 13.884, "lng": 44.6},
        { "name": "Rayma", "lat": 14.67, "lng": 43.583 },
        { "name": "Socotra", "lat": 12.48, "lng": 53.78 },
    ];

var countries = [
        { "name": "Sudan", "lat": 16.019, "lng": 29.958 },
        { "name": "Oman", "lat": 20.598, "lng": 56.111 },
        { "name": "Eritrea", "lat": 16, "lng": 37.8 },
        { "name": "Ethiopia", "lat": 8.633, "lng": 39.616 },
        { "name": "Somalia", "lat": 9, "lng": 49.4 },
        { "name": "Djibouti", "lat": 11.8, "lng": 42.2 },
        { "name": "Egypt", "lat": 26.554, "lng": 29.79 },
        { "name": "Saudi Arabia", "lat": 24.123, "lng": 44.546 },
];

var yemen = [{ "name": "Yemen", "lat": 16.2, "lng": 47.6 }];



const style_city = document.createElement('style');
document.head.appendChild(style_city);

const style_country = document.createElement('style');
document.head.appendChild(style_country );

const style_yemen = document.createElement('style');
document.head.appendChild(style_yemen);

cities.forEach(function(city) {

        var labelIcon = L.divIcon({
        className: 'label_city', // Use the defined CSS class
        html: `${city.name}`, // Only insert the city name, styling is handled by CSS
        iconSize: [10, 10], // Define a specific size for the icon
        iconAnchor: [10, 10] // Center the icon size at its midpoint
        });

L.marker([city.lat, city.lng], { icon: labelIcon }).addTo(map);
});


countries.forEach(function(country) {

        var labelIcon = L.divIcon({
        className: 'label_country', // Use the defined CSS class
        html: `${country.name}`, // Only insert the city name, styling is handled by CSS
        iconSize: [40, 40], // Define a specific size for the icon
        iconAnchor: [10, 10] // Center the icon size at its midpoint
        });
L.marker([country.lat, country.lng], { icon: labelIcon }).addTo(map);
});


yemen.forEach(function(yem) {

        var labelIcon = L.divIcon({
        className: 'label_yemen', // Use the defined CSS class
        html: `${yem.name}`, // Only insert the city name, styling is handled by CSS
        iconSize: [40, 40], // Define a specific size for the icon
        iconAnchor: [10, 10] // Center the icon size at its midpoint
        });
L.marker([yem.lat, yem.lng], { icon: labelIcon }).addTo(map);
});

function zoom_style() {
        var zoomLevel = map.getZoom();
        if (zoomLevel<7) {
                style_city.innerHTML = `
                .label_city {
                        display: none !important; 
                        
                }`

                style_yemen.innerHTML = `
                .label_yemen {
                        font-size: 18px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 1px;
                        
                }`
                

                style_country.innerHTML = `
                .label_country {
                        font-size: 18px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 1px;
                        
                }`
        }
        else if (zoomLevel === 7) {
                style_city.innerHTML = `
                .label_city  {
                        font-size: 9px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 10px;
                }`
                
                style_country.innerHTML = `
                .label_country {
                        font-size: 18px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 1px;
                        
                }`

                style_yemen.innerHTML = `
                .label_yemen {
                        display: none;
                        
                }`
        }

        else if (zoomLevel === 8) {
                style_city.innerHTML = `
                .label_city  {
                        font-size: 12px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 10px;
                }`

                style_country.innerHTML = `
                .label_country {
                        font-size: 18px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 1px;
                        
                }`

                style_yemen.innerHTML = `
                .label_yemen {
                        display: none;
                        
                }`
        }

        else if (zoomLevel > 8) {
                style_city.innerHTML = `
                .label_city  {
                        font-size: 12px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 10px;
                }`

                style_country.innerHTML = `
                .label_country {
                        font-size: 18px; 
                        color: #adb7be;   
                        font-weight: bold;
                        font-family: georgia;
                        padding: 1px;
                        
                }`

                style_yemen.innerHTML = `
                .label_yemen {
                        display: none;
                        
                }`
        }

}

map.on('zoomend', zoom_style);
zoom_style();


window.addEventListener("message", function (event) {
  if (event.data.type === "updateMap") {
    const filteredData = event.data.data;
    database = filteredData;
  }
});


// Showing the data in the map
const eventLayer = L.layerGroup().addTo(map); // Making a layer for shown data

function createCustomIcon(eventType) {
        let color;
        switch (eventType) {
            case 'Demonstrations':
                color = '#0c5d9be5';
                break;
            case 'Political violence':
                color = '#eb1414e8';
                break;
            case 'Political violence; Demonstrations':
                color = '#dfc309e5';
                break;
            case 'Strategic developments':
                color = '#09a416e5';
                break;
            default:
                color = 'gray'; // Default color for unknown types
        }
    
        // Return the custom DivIcon
        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="custom-marker" style="background-color: ${color};"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
        });
    }

// Create a custom DivIcon
const customDivIcon = L.divIcon({
        className: 'custom-div-icon', // CSS class to style the marker
        html: '<div class="custom-marker"></div>', // HTML content of the marker
        iconSize: [30, 30], // Size of the icon
        iconAnchor: [15, 15] // Anchor point
    });
    function createPopupContent(event) {
        // Helper function to conditionally add rows
        function addRow(label, value) {
            return value ? `<tr><th>${label}</th><td>${value}</td></tr>` : '';
        }
    
        return `
            <table>
                <tr>
                    <th colspan="2" style="font-weight: bold; font-size: 16px; text-align: center; padding: 10px 0;">
                        ${event.disorder_type || 'No Type'}
                    </th>
                </tr>
                <tr>
                    <th colspan="2" style="font-weight: bold; font-size: 14px; text-align: center; padding-bottom: 10px;">
                    ${typeof event.event_date === "string" ? (event.event_date.split(' ')[0] || 'No Date') : 'No Date'}
                    </th>
                </tr>
                ${addRow('Type', event.event_type)}
                ${addRow('Sub_Type', event.sub_event_type)}
                ${addRow('Governorate', event.admin1)}
                ${addRow('Directorate', event.admin2)}
                ${addRow('Location', event.location)}
                ${addRow('Actor 1', event.actor1)}
                ${addRow('Actor 2', event.actor2)}
                ${addRow('Fatalities', event.fatalities)}
                ${addRow('Details', event.notes)}
                ${addRow('_', '_')}
                ${addRow('Sources', event.source)}
            </table>
        `;
    }


// Array of legend types and their colors
const legendTypes = [
        { color: '#0c5d9be5', label: 'Demonstrations' },
        { color: '#eb1414e8', label: 'Political violence' },
        { color: '#dfc309e5', label: 'Political violence; Demonstrations' },
        { color: '#09a416e5', label: 'Strategic developments'},
    ];
    
    // Create a table for the legend
    const legendTable = document.createElement('table');
    legendTable.className = 'legend-table';
    
    // Create rows for each legend type
    legendTypes.forEach(type => {
        const row = document.createElement('tr');
    
        // Create the first cell with the color box
        const colorCell = document.createElement('th');
        const colorBox = document.createElement('div');
        colorBox.className = 'legend';
        colorBox.style.cssText = `
            background-color: ${type.color};
            
        `;
        colorCell.appendChild(colorBox);
        colorCell.style.padding = '10px';
        row.appendChild(colorCell);
    
        // Create the second cell with the legend title
        const labelCell = document.createElement('td');
        labelCell.textContent = type.label;
        labelCell.className = 'legLeb';
        labelCell.style.padding = '4px';
        row.appendChild(labelCell);
    
        // Add the row to the table
        legendTable.appendChild(row);
    });
    
    // Append the legend table to the body
    document.body.appendChild(legendTable);



addMarkers(database);
window.addEventListener("message", function (event) {
  if (event.data.type === "updateMap") {
    database = event.data.data;
    eventLayer.clearLayers();
    addMarkers(database);
  }
});

// External function to handle downloading
function handleDownload() {
    const ws = XLSX.utils.json_to_sheet(database);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");
    XLSX.writeFile(wb, "filtered_data.csv");
};

// Add the event listener for the download button externally
window.parent.document.getElementById('downloadBtn').addEventListener('click', handleDownload);

// Function to add markers to the map
function addMarkers(events) {
    const markers = L.markerClusterGroup();
    events.forEach(event => {
        if (event.Coordinates) {
            const [lng, lat] = event.Coordinates.split(',').map(coord => parseFloat(coord));
            const marker = L.marker([lat, lng], { icon: createCustomIcon(event.disorder_type) })
                .bindPopup(createPopupContent(event));
            markers.addLayer(marker);
        }
    });
    markers.addTo(eventLayer);
};
