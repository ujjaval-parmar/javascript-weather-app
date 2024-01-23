const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDeatils = document.querySelector('.weather-details');

const inputEl = document.querySelector('.search-box input');

const image = document.querySelector('.weather-box img');
const temparatue = document.querySelector('.weather-box .temparature');
const description = document.querySelector('.weather-box .description')

const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

const error404 = document.querySelector('.not-found');



function getData() {

  

    const APIKey = '3eaef9aa950030ade09e5e979d3186cb';

    const city = inputEl.value;

    if (city.trim() === '') {
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`

    fetch(apiUrl)
        .then(responce => responce.json())
        .then(data => {

            // console.log(data);
            
            if(data.cod === '404'){
                container.style.height = '400px';
                error404.style.visibility = 'visible';
                weatherBox.style.visibility = 'hidden';
                weatherDeatils.style.visibility = 'hidden';
                return;
            }else{
                weatherBox.style.visibility = 'visible';
                weatherDeatils.style.visibility = 'visible';
                error404.style.visibility = 'hidden';
                container.style.height = '555px';
            }

            switch (data.weather[0].main) {

                case 'Clear':
                    image.setAttribute('src', 'images/clear.png');
                    break;

                case 'Rain':
                    image.setAttribute('src', 'images/rain.png');
                    break;

                case 'Snow':
                    image.setAttribute('src', 'images/snow.png');
                    break;

                case 'Clouds':
                    image.setAttribute('src', 'images/cloud.png');
                    break;

                case 'Mist':
                    image.setAttribute('src', 'images/mist.png');
                    break;

                case 'Haze':
                    image.setAttribute('src', 'images/mist.png');
                    break;

                default:
                    image.setAttribute('src', 'images/cloud.png');
            }


            temparatue.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
            description.innerHTML = `${data.weather[0].description}`
            humidity.innerHTML = `${data.main.humidity}%`
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`

            // inputEl.value = '';
            inputEl.blur();




        });

}



search.addEventListener('click', getData);

inputEl.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getData();
    }
});
