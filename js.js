
/**
 * amountOfDays - amount of previous days
 *
 * Connects to the API and prepares the UI with the latest road condition details according to the amount of days given
 * */
function parseWarnings(amountOfDays) {
    $.get( "http://innofactor-talent-2017-challenge.azurewebsites.net/api/warnings")
        .done(function(data) {
            var listOfData = [];
            var dateSince = new Date();
            dateSince.setDate(dateSince.getDate()-amountOfDays);

            data.forEach(function (warning) {
                var date = new Date(parseDateFromString(warning.created_at));
                if(date > dateSince) {
                    listOfData.push(warning);
                }
            });

            prepareDataForUI(listOfData);
        })
        .fail(function() {
            console.log("Error getting data from the API")
        });
}

/**
 * dateString - raw String to be formatted
 * returns - Modified string acceptable for creating Date
 *
 * Changes given string into acceptable Date format
 * */
function parseDateFromString(dateString) {
    var modifiedString = dateString.replace(/ /g,'');
    modifiedString = modifiedString.insert(10, " ");
    return modifiedString;
}

/**
 *
 * index - position to enter the character
 * string - character/string to enter
 *
 * Places a certain character/string into specific place in string
 * */
String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

/**
 * warnings - list of warnings
 *
 * Creates UI elements based on the warnings list
 * */
function prepareDataForUI(warnings) {

    if(warnings.length > 0) {
        console.log(warnings);
        $(".modal-body").empty();
        $(".modal-body").append('<img src="./img/warning.png" class="img-fluid text-center" alt="Road">');
        $(".modal-body").append('<p>Warning! Slippery road conditions in following cities:</p>');
        for (var i=0; i < warnings.length; i++) {
            var date = new Date(parseDateFromString(warnings[i].updated_at));
            $(".modal-body").append("<p>" + warnings[i].city + "</p>" + "<p>" + date.toUTCString() + "</p>");
            console.log(warnings[i].city);
        }
        $(".modal-body").append("<p>Drive carefully!</p>");
    } else {
        //Did not find anything
        $(".modal-body").empty().append('<img src="./img/clearWeather.png" class="img-fluid text-center" alt="Road">');
        $(".modal-body").append("Roads condition seems to be fine these days. Have a safe trip!");
    }

}

$(document).ready(function() {
    $(".dropdown-item[data-id='1']").click(function () {
        parseWarnings(1)
    });

    $(".dropdown-item[data-id='2']").click(function () {
        parseWarnings(7)
    });

    $(".dropdown-item[data-id='3']").click(function () {
        parseWarnings(30)
    });

});

/**
 * enables smooth scrolling
 * */

$(document).ready(function(){

    $(".navbar-nav > a").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

                window.location.hash = hash;
            });
        } // End if
    });
});

/**
 * initialized AOS framework
 * */

AOS.init();
