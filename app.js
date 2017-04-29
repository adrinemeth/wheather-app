$(document).ready(function () {
    /*get geolocation*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        console.log("geez");
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var appid = "bfa3f336903f91f27d169739eb7b70e0";
        var url = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + appid;
        $.getJSON(url, function (weatherData) {
            var icon = '<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png" alt="Weather Icon">';
            var tempCelsius = Math.round(weatherData.main.temp - 273) + "<a href=# class='unitBtn' title='Change Temperature Unit Here'> °C</a>";
            var tempFahrenheit = Math.round(weatherData.main.temp * 9 / 5 - 459.67) + "<a href=# class='unitBtn' title='Change Temperature Unit Here'> °F</a>";
            var windDir;
            function getWindDir(dir) {
                var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                var eightPoint = Math.floor(dir / 45);
                windDir = rose[eightPoint];
            }
            getWindDir(weatherData.wind.deg);
            $("#icon").html(icon + tempCelsius);
            $("#location").text(weatherData.name + ", " + weatherData.sys.country);
            $("#sky").text(weatherData.weather[0].description);
            $("#wind").text("Wind:" + " " + weatherData.wind.speed + " m/s" + ", " + " " + windDir);
            $("body").on("click", "a.unitBtn", function () {
                var unit = $(".unitBtn")[0].innerText;
                if (unit == " °C") {
                    $("#icon").html(icon + tempFahrenheit);
                } else {
                    $("#icon").html(icon + tempCelsius);
                }
            });

            function changeBackground(descriptionId) {
                console.log(descriptionId.toString().charAt(0));
                switch (descriptionId.toString().charAt(0)) {
                    default: $("body").css({ "background": "url(http://s11.postimg.org/z96l9l1qr/sea_sky_beach_holiday.jpg) no-repeat fixed center", "background-size": "cover", "-moz-background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                    case "8": $("body").css({ "background": "url(http://s8.postimg.org/7e8n4sqzp/sea_nature_beach_clouds.jpg) no-repeat fixed center", "background-size": "cover", "-moz-background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                    case "7": $("body").css({ "background": "url(http://s9.postimg.org/wl2q0hkwf/road_winter_fog_slippery.jpg) no-repeat fixed center", "background-size": "cover", "-moz-background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                    case "6": $("body").css({ "background": "url(http://s11.postimg.org/9tgi2dfdf/cold_snow_landscape_nature_1.jpg) no-repeat fixed center", "background-size": "cover", "-moz-background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                    case "3":
                    case "5": $("body").css({ "background": "url(http://s10.postimg.org/vwt9nknd5/pexels_photo_1.jpg) no-repeat fixed center", "background-size": "cover", "-moz-background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                    case "2": $("body").css({ "background": "url(http://s8.postimg.org/k2btxe5r9/pexels_photo_2.jpg) no-repeat fixed center", "background-size": "cover", "-moz-background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                }
                switch (descriptionId) {
                    case 800: $("body").css({ "background": "url(http://s11.postimg.org/z96l9l1qr/sea_sky_beach_holiday.jpg) no-repeat fixed center", "background-size": "cover", "-moz-       background-size": "cover", "-webkit-background-size": "cover", "-o-background-size": "cover" });
                        break;
                }
            }
            changeBackground(weatherData.weather[0].id);
        });
    }
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

});
