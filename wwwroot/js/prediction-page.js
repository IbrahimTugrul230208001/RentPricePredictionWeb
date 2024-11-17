const districtSelector = document.getElementById('district-selector');
const mapImage = document.querySelector('.ankara-map');

// Event listener for dropdown selection
districtSelector.addEventListener('change', function() {
    const selectedDistrict = districtSelector.value;

    const districtName = selectedDistrict.split(' -')[0].toLowerCase(); // Keeps the district name as it is
    
    mapImage.src = `/Images/ankara-${districtName}.png`;
});

$(document).ready( function () {
    $("#PredictButton").click( function (event) {
        event.preventDefault();

        // Collect user input
        var formData = {
            Area: $(".AreaTextBox").val(),
            HouseType: $(".HouseTypeComboBox").val(),
            Location: $(".LocationComboBox").val(),
            Floor: $(".FloorComboBox").val(),
        };

        // Send AJAX request
        $.ajax({
            type: "POST",
            url: "/PredictionPage/Predict",
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.success) {
                    $(".prediction-result").text("Tahmin Edilen Fiyat: " + response.prediction);
                } else {
                    alert("Tahmin süreci esnasında bir hata oluştu.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error details:", xhr, status, error);
                alert("Sunucu ile iletişim kurulurken bir hata oluştu.");
            }
        });
    });
});
