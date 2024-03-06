let api_url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let api_key="6395c0e0da778b75db222be4692ddfb0";

let btn=document.querySelector(".search-btn");
let searchBox=document.querySelector(".search-bar");
let loader = document.querySelector(".loader");

async function checkweather(city){
    loader.style.display = "inline-block";
    clearWeatherData();

    setTimeout(async() => {
        const response=await fetch(api_url +city+ `&appid=${api_key}`);
        const data= await response.json();
        if(response.status!==404){
            document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + data.name + "')";
            document.querySelector(".city").innerHTML="Weather in " + data.name;
            document.querySelector(".temp").innerHTML=data.main.temp + " °C";
            document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            document.querySelector(".description").innerHTML=data.weather[0].description;
            document.querySelector(".humidity").innerHTML=  "Humidity: " + data.main.humidity + " %";
            document.querySelector(".wind").innerHTML="Wind speed: " + data.wind.speed + " km/h";
            document.querySelector('[data-countryFlag]').src="https://flagcdn.com/144x108/"+ data.sys?.country.toLowerCase()+".png";
            document.querySelector(".error").style.display="none";
            showWeatherData();
            loader.style.display = "none";
            }
        else{
            document.querySelector(".error").style.display="block";
            loader.style.display = "none";
        }
    }, 1500);

 
}

function clearWeatherData() {
    // Hide existing content in the weather elements
    document.querySelector(".city").style.display = "none";
    document.querySelector(".temp").style.display = "none";
    document.querySelector(".icon").style.display = "none";
    document.querySelector(".description").style.display = "none";
    document.querySelector(".humidity").style.display = "none";
    document.querySelector(".wind").style.display = "none";
    document.querySelector('[data-countryFlag]').style.display="none";
    document.body.style.backgroundImage = ""; // Clear background image
}

function showWeatherData() {
    // Show the weather elements
    document.querySelector(".city").style.display = "block";
    document.querySelector(".temp").style.display = "block";
    document.querySelector(".icon").style.display = "block";
    document.querySelector(".description").style.display = "block";
    document.querySelector(".humidity").style.display = "block";
    document.querySelector(".wind").style.display = "block";
    document.querySelector('[data-countryFlag]').style.display="block";
}

searchBox.addEventListener('keyup',function(e){
    if(e.key=="Enter"){
        checkweather(searchBox.value);
        searchBox.value="";
    }
})

btn.addEventListener('click',()=>{
    checkweather(searchBox.value);
    searchBox.value="";
})

loader.style.display = "none";
checkweather("Gwalior");
