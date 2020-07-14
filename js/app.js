class AjaxWeather {
    // The constructor method is a special method for creating and initializing an object created with a class
    constructor() {
            this.apiKey = "0b2da2e7ee0e89ac3bff6e14ec9db3f9";
        }
        // Pass in city parameter from the weatherappAPI
        // Use async await fetch for the url as parameter
        // Once we recieve the promise back from fetch, then proceed
        // Convert weatherData variable into json using weatherData.json() and return

    async getWeather(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
      this.apiKey
    }&units=metric`;
        const weatherData = await fetch(url);
        const weather = await weatherData.json();
        return weather;
    }
}

class Display {
    constructor() {
        this.results = document.querySelector(".results");
        this.cityName = document.getElementById("cityName");
        this.cityCountry = document.getElementById("cityCountry");
        this.citySunrise = document.getElementById("citySunrise");
        this.citySunset = document.getElementById("citySunset");
        this.cityIcon = document.getElementById("cityIcon");
        this.cityTemp = document.getElementById("cityTemp");
        this.cityHumidity = document.getElementById("cityHumidity");
    }

    // Method to display weatherData
    showWeather(data) {
        console.log(data);
        // ES6 destructuring
        const {
            name,
            sys: { country, sunrise, sunset },
            main: { temp, humidity }
        } = data;
        const { icon } = data.weather[0];

        // Sunrise convertion
        let sunrise_convert = sunrise
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(sunrise_convert * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 0:0:0 format
        var formattedTimeRise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(formattedTimeRise);

        // Sunrise convertion
        let sunset_convert = sunset
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(sunset_convert * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 0:0:0 format
        var formattedTimeSet = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(formattedTimeSet);

        this.results.classList.add("showItem");
        this.cityIcon.classList.add("showIcon");
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemp.textContent = temp;
        this.cityHumidity.textContent = humidity;
        this.citySunrise.textContent = formattedTimeRise;
        this.citySunset.textContent = formattedTimeSet;
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    }
}

// In JS, the functions wrapped in parenthesis are called Immedietely Invoked Function Expressions or Self Executing Functions
// The purpose of wrapping is to control the visibility of member functions.
// It wraps code inside a function scope to decrease clashing with other libraries


(function() {
    const form = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const feedback = document.querySelector(".feedback");

    // class
    const ajax = new AjaxWeather();
    const display = new Display();
    form.addEventListener("submit", event => {
        // Prevents the submit btn refreshing the screen
        event.preventDefault();
        const city = cityInput.value;
        // If no value
        if (city.length === 0) {
            showFeedback("Location value cannot be empty");
        } else {
            ajax.getWeather(city).then(data => {
                if (data.message === "city not found") {
                    showFeedback("Location with such name cannot be found");
                } else {
                    display.showWeather(data);
                }
            });
        }
    });

    function showFeedback(text) {
        feedback.classList.add("showItem");
        feedback.innerHTML = `<p>${text}</p>`;

        setTimeout(() => {
            feedback.classList.remove("showItem");
        }, 3000);
    }
})();