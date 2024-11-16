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

$(document).ready(function () {
    $("#PredictButton").click(function (event) {
        event.preventDefault();

        var formData = {
            Area: $("#AreaTextBox").val(),
            HouseType: $("#HouseTypeTextBox").val(),
            Location: $("#LocationTextBox").val(),
            Floor: $("#FloorTextBox").val(),
        };

        $.ajax({
            type: "POST",
            url: "/PredictionPage/Predict",
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.success) {

                }
                else {
                    alert("Tahmin süreci esnasında bir hata oluştu.");
                }
            },
            error: function (xhr, status, error) {
                console.log("Error details:", xhr, status, error);
                alert("Sunucu ile iletişim kurulurken bir hata oluştu.");
            }
        });
    });
});