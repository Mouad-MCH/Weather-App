

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


let days = document.querySelectorAll(".days .day");
let display_status_2 = document.getElementById("display_status_2");



/*---------------------- *\
 * - Variables
\* --------------------- */

let arr_days = []

let btn= document.getElementById('btn');


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
    console.log(arr_days)

    input.value = "";

    city_name.innerHTML = data_city.name;
    temp.innerHTML = Math.floor(data_city.main.temp - 274) + "°";
    temp_feel.innerHTML = Math.floor(data_city.main.feels_like - 274) + "°";
    wind.innerHTML = data_city.wind.speed;

    const status = data_city.weather[0].main;
    
    get_status(desplay_status,status)
    
}


// Function get days 

async function get_days(input) {

    const data_of_days = await get_Data_daily(input);

    const arr = data_of_days.list;


    for(let i = 0 ; i<arr.length ; i++) {

        const day = arr.filter(el => {
            return el.dt_txt.includes("00:00:00")
        })

        arr_days.push(day)
        let x = getLocalDayName(day[i].dt_txt, "Europe/London")

        console.log(x.fullName)
        // days[i].querySelector("h1").textContent = x.fullName;
        days[i].firstElementChild.innerHTML = x.fullName.slice(0,3)

        get_status(days[i].childNodes[3].childNodes[1], day[i].weather[0].main)
        days[i].childNodes[3].childNodes[3].innerHTML = day[i].weather[0].main;
        // console.log(days[i].childNodes[3].childNodes )

        // console.log(day[i].dt_txt)

        if(arr_days.length == 7) return
    }
    
    
}

function getLocalDayName(dt_txt,timeZone) {
    const date = new Date(dt_txt + 'Z'); 
    return {
        fullName: date.toLocaleString('en-US', { 
            timeZone: timeZone,
            weekday: 'long',
        })
    }
}



// Function Switch

function get_status(img,parr) {

    switch(parr) {
        case 'Clear': img.src = "amcharts_weather_icons_1.0.0/animated/day.svg"
        break;
        case 'Clouds' : img.src = "amcharts_weather_icons_1.0.0/animated/cloudy.svg" 
        break;
        case 'Snow': img.src = "amcharts_weather_icons_1.0.0/animated/snowy-6.svg" 
        break;
        case 'Thunder': img.src = "amcharts_weather_icons_1.0.0/animated/thunder.svg"
        break;
        case 'Rain' : img.src = "amcharts_weather_icons_1.0.0/animated/rainy-6.svg"
    }
}


//button 


function togglebtn(){
    btn.classList.toggle("active");
    document.querySelector('body').classList.toggle("active")
}


document.addEventListener("keypress" , (e) => {
    if(e.key == "Enter") {
        display()
    }
})