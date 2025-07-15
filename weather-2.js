var key = "65db1e2a4e1bdc9712e8d45ce6e1da71";
function daydate() {
    var date = new Date();
    var weakday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById(`day`).innerHTML = (`${weakday[date.getDay()].toUpperCase()}`);
    var month = ["January", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById(`date`).innerHTML = (`${date.getDate()} ${month[date.getMonth()].toUpperCase()} ${date.getFullYear()}`);
}
function bodyload() {
    daydate()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=65db1e2a4e1bdc9712e8d45ce6e1da71`).then(function (convert) {
        return convert.json();
    }).then(function (city) {
        console.log(city);
        lat = city.coord.lat;
        lon = city.coord.lon;
        document.getElementById("cityname").innerHTML = city.name;
        document.getElementById("tempbox").innerHTML = `${(parseFloat(city.main.temp) - 273.15).toFixed(2)}&degC`;
        document.getElementById("humidity").innerHTML = `${city.main.humidity} %`;
        document.getElementById("speed").innerHTML = `${city.wind.speed}Km/h`;
        document.getElementById("temp").innerHTML = `${(parseFloat(city.main.temp) - 273.15).toFixed(2)}&degC`;
        document.getElementById("cloud").innerHTML = city.weather[0].main;
        hourwise();
    })
}


var cityname;
var lat;
var lon;

function searchclick() {

    cityname = document.getElementById("txtcity").value;

    var key = "65db1e2a4e1bdc9712e8d45ce6e1da71";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`).then(function (convert) {
        if (convert.ok) {
            return convert.json();
        }
        else {
            throw new Error(alert("Please Enter Valid City Name"))
        }
    }).then(function (city) {
        lat = city.coord.lat;
        lon = city.coord.lon;

        console.log(city);
        document.getElementById("cityname").innerHTML = city.name;
        document.getElementById("tempbox").innerHTML = `${(parseFloat(city.main.temp) - 273.15).toFixed(2)}&degC`;
        document.getElementById("humidity").innerHTML = `${city.main.humidity} %`;
        document.getElementById("speed").innerHTML = `${city.wind.speed}Km/h`;
        document.getElementById("temp").innerHTML = `${(parseFloat(city.main.temp) - 273.15).toFixed(2)}&degC`;
        document.getElementById("cloud").innerHTML = city.weather[0].main;

        var changing = city.weather[0].main;
        changeweather(changing);
        hourwise();
    }).catch(function (error) {
        document.getElementById("cityname").innerHTML = `City Is Not Found`;
    })
    document.getElementById("txtcity").value = "";

}


function hourwise() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=65db1e2a4e1bdc9712e8d45ce6e1da71`).then(function (convert) {
        return convert.json();
    }).then(function (data) {

        var xyz = data.list;
        for (let i = 0; i < 4; i++) {
            let abc = xyz[i * 8];
            if (abc) {
                let temp = (parseFloat(abc.main.temp) - 273.15).toFixed(2);
                document.getElementById("tempb").innerHTML = `${temp} &degC`;
                let tempElement = document.getElementById(`tempb${i}`);
                if (tempElement) {
                    document.getElementById(`tempb${i}`).innerHTML = `${temp} &degC`;
                }
            }

        };
        var date = new Date();
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        document.getElementById("datebox").innerText = (`${weekday[(date.getDay() + 1) % 7].toUpperCase()}`);
        for (let i = 0; i < 4; i++) {
            let dayElement = document.getElementById(`datebox${i}`);
            if (dayElement) {
                dayElement.innerHTML = weekday[(date.getDay() + i + 1) % 7].toUpperCase();
            }
        };

    })
}

function changeweather(changing) {
    var weatherimg = document.getElementById("backbox");
    var icon = document.getElementById("iconbox");
    switch (changing) {
        case 'Haze':
            weatherimg.style.backgroundImage = " url('./image/haze.jpg')";
            weatherimg.style.color = "black";
            icon.src = "./image/clouds.png"
            break;
        case 'Clear':
            weatherimg.style.backgroundImage = "url('./image/clearimg.jpg')";
            icon.src = "./image/clear.png";
            break;
        case 'Clouds':
            weatherimg.style.backgroundImage = "url('./image/fewclouds.jpeg')";

            icon.src = "./image/clouds.png";
            break;
        case 'Rain':
            weatherimg.style.backgroundImage = "url('./image/rain2.jpg')";
            icon.src = "./image/rain.png";
            break;
        case 'Drizzle':
            weatherimg.style.backgroundImage = "url('./image/drizzles.png/.jpg')";
            icon.src = "./image/drizzles.png";
            break;
        case 'Thunderstorm':
            weatherimg.style.backgroundImage = "url('./image/thinder.jpg')";
            icon.src = "./image/rain.png";
            break;
        case 'Snow':
            weatherimg.style.backgroundImage = "url('./image/snow.jpeg')";
            icon.src = "./image/snow.png";
            break;
        case 'Mist':
            weatherimg.style.backgroundImage = "url('./image/mist.webp')";
            weatherimg.style.color = "black";
            icon.src = "./image/mist.png";
            break;
        case 'Fog':
            weatherimg.style.backgroundImage = "url('./image/foog.jpeg')";
            weatherimg.style.color = "black";
            icon.src = "./image/snow.png";
            break;
        default:
            weatherimg.style.backgroundImage = "url('./image/clouddefoult.jpeg')";
            weatherimg.style.color = "black";
    }
}

