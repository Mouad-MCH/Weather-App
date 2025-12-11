

/*---------------------- *\
 * - DOM Variables
\* --------------------- */

let input = document.getElementById('search');


let city_name = document.getElementById('city_name');
let city_p = document.querySelector(".display_info p")
let temp = document.querySelector(".temp")
let desplay_status = document.getElementById('display_status')


let temp_feel = document.querySelector('.feel .value')
let wind = document.querySelector('.wind .value')
let rain = document.querySelector('.rain .value')
let index = document.querySelector('.index .value')



/*---------------------- *\
 * - Variables
\* --------------------- */




/*---------------------- *\
 * - Fetch API
\* --------------------- */


let url = 'https://api.openweathermap.org/data/2.5/weather?q='
let url2 ='https://api.openweathermap.org/data/2.5/forecast?q='

let API_key = '27fa75125863ccf06f87c5ac4166aace';


async function get_Data_City(city) {
    const res = await fetch(url + city + '&appid=' + API_key);
    const data = await res.json();
    return data
}

async function get_Data_daily(city) {
    const res = await fetch(url2 + city + '&appid=' + API_key);
    const data = await res.json();
    return data
}


/*---------------------- *\
 * - Function
\* --------------------- */


// Funcrion display data of city

async function display() {
    if(input.value == "") {
        alert("your search input is empty");
        return;
    }


    const data_city = await get_Data_City(input.value);


    if (data_city.message == 'city not found') {
        alert('city not found') 
        return
    }

    console.log(data_city)
    get_days(input.value)
    input.value = "";

    city_name.innerHTML = data_city.name;
    temp.innerHTML = Math.floor(data_city.main.temp - 274) + "°";
    temp_feel.innerHTML = Math.floor(data_city.main.feels_like - 274) + "°";
    wind.innerHTML = data_city.wind.speed;

    const status = data_city.weather[0].main;
    
    get_status(status)

}


// Function get days 

async function get_days(input) {

    const data_of_days = await get_Data_daily(input);

    const arr = data_of_days.list;

    for(let i = 0 ; i<arr.length ; i++) {
       if(arr[i].dt_txt === `2025-12-13 00:00:00`) {
        console.log("hello")
       }
    }
    
}


// Function Switch

function get_status(parr) {

    switch(parr) {
        case 'Clear': desplay_status.src = "amcharts_weather_icons_1.0.0/animated/day.svg"
        break;
        case 'Clouds' : desplay_status.src = "amcharts_weather_icons_1.0.0/animated/cloudy.svg" 
        break;
        case 'Snow': desplay_status.src = "amcharts_weather_icons_1.0.0/animated/snowy-6.svg" 
        break;
        case 'Thunder': desplay_status.src = "amcharts_weather_icons_1.0.0/animated/thunder.svg"
        break;
        case 'Rain' : desplay_status.src = "amcharts_weather_icons_1.0.0/animated/rainy-6.svg"
    }
}

document.addEventListener("keypress" , (e) => {
    if(e.key == "Enter") {
        display()
    }
})