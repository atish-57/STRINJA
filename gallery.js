function moveToSelected(element) {
    var selected;
    if (element === "next") {
        selected = $(".selected").next().length ? $(".selected").next() : $(".carousel div:first");
    } else if (element === "prev") {
        selected = $(".selected").prev().length ? $(".selected").prev() : $(".carousel div:last");
    } else {
        selected = element;
    }

    var next = $(selected).next().length ? $(selected).next() : $(".carousel div:first");
    var prev = $(selected).prev().length ? $(selected).prev() : $(".carousel div:last");
    var prevSecond = $(prev).prev().length ? $(prev).prev() : $(".carousel div:last");
    var nextSecond = $(next).next().length ? $(next).next() : $(".carousel div:first");

    $(selected).removeClass().addClass("selected");

    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");

    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");

    $(nextSecond).nextAll().removeClass().addClass("hideRight");
    $(prevSecond).prevAll().removeClass().addClass("hideLeft");

    addWhatsAppIcon();
}




// Keyboard events
$(document).keydown(function (e) {
    switch (e.which) {
        case 37: // left
            moveToSelected("prev");
            break;

        case 39: // right
            moveToSelected("next");
            break;

        default:
            return;
    }
    e.preventDefault();
});

// Click events
$("#carousel div").click(function () {
    moveToSelected($(this));
});

$("#prev").click(function () {
    moveToSelected("prev");
});

$("#next").click(function () {
    moveToSelected("next");
});

function addWhatsAppIcon() {
    $(".whatsapp-icon").remove();
    var selectedImageSrc = $(".selected img").attr("src");

    var whatsappIcon = $('<a href="https://wa.me/9555135603?text=I%20am%20interested%20in%20purchasing%20this%20item:%20' + encodeURIComponent(selectedImageSrc) + '" target="_blank" class="whatsapp-icon"><i class="fab fa-whatsapp"></i></a>');

    $(".selected").append(whatsappIcon);
}

// Ensure you have jQuery included before this script

$(document).ready(function () {
    // Google Sheets URL (replace 'YOUR_GOOGLE_SHEETS_URL' with the published URL)
    var googleSheetsURL = 'https://script.google.com/macros/s/AKfycbylKxRG2N3Qwt3N0jJ66NPWBw9LzYwfJ_dtbmRuG12C2q0v24p_YQ__d6NzgSxNfMt87A/execttps://script.google.com/macros/s/AKfycbylKxRG2N3Qwt3N0jJ66NPWBw9LzYwfJ_dtbmRuG12C2q0v24p_YQ__d6NzgSxNfMt87A/exec';

    // Fetch data from Google Sheets
    $.ajax({
        url: googleSheetsURL,
        method: 'GET',
        success: function (data) {
            // Parse CSV data from Google Sheets
            var rows = Papa.parse(data).data;

            // Get the container where gallery cards will be added
            var galleryContainer = $('#gallery-container');

            // Iterate through the rows and create gallery cards
            for (var i = 1; i < rows.length; i++) {
                var imageUrl = rows[i][0];
                var caption = rows[i][1];

                // Create a card element
                var card = '<div class="gallery-card">';
                card += '<img src="' + imageUrl + '" alt="' + caption + '">';
                card += '<div class="caption">' + caption + '</div>';
                card += '</div>';

                // Append the card to the gallery container
                galleryContainer.append(card);
            }
        },
        error: function (error) {
            console.error('Error fetching data from Google Sheets:', error);
        }
    });
});
