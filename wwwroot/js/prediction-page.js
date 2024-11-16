// Get the district selector dropdown and the image element
const districtSelector = document.getElementById('district-selector');
const mapImage = document.querySelector('.ankara-map');

// Event listener for dropdown selection
districtSelector.addEventListener('change', function() {
    // Get the selected district from the dropdown (e.g., "Akyurt - Yıldırım Mh.")
    const selectedDistrict = districtSelector.value;

    // Extract only the district name (the part before the first hyphen)
    const districtName = selectedDistrict.split(' -')[0].toLowerCase(); // Keeps the district name as it is
    
    // Construct the new image source based on the district name
    mapImage.src = `images/ankara-${districtName}.png`;
});
