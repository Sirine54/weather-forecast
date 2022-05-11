let weather = {
    // apiKey: "3d5ad915bd588ead9ffe6f7eee2cbc9c",
    fetchWeather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+
       city+'&appid=3d5ad915bd588ead9ffe6f7eee2cbc9c')
     
        .then((response)=> response.json())
        
        .then((data)=>
            this.displayWeather(data)
       )
       
        ;
    },
   
 
    displayWeather:function(data){
        const {name} = data;
        const {icon,description} = data.weather[0]
        const{temp,humidity} = data.main
        const{speed} = data.wind;
        /////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector(".city").innerHTML="Weather in "+name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = (temp-273.15).toFixed(2)+" °C";  ///convert from kelvin to celsius and show first 2 numbers of long decimal numbers
        document.querySelector(".humidity").innerHTML = "Humidity : "+humidity+" %";
        document.querySelector(".wind").innerHTML = "Wind Speed : " + speed + " km/h";
        ///////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector(".weather-card").classList.remove("loading")
        document.body.style.background= "linear-gradient(rgba(0, 0, 1, 0.426),rgba(0, 0, 1, 0.415)),url('https://source.unsplash.com/1600x900/?" + name + "')";
        
    } , 
    
    search:function(){
        let searchCity = document.querySelector('#search-Bar').value
        if(searchCity===''){alert('Invalid Input')}
        this.fetchWeather(searchCity)
        document.querySelector('#search-Bar').value ='';
      
       
    }

};
/////////////////Copy code from open Cage ////////////////////////


let geocode ={

    reverseGeocode:function(latitude,longitude){

    var api_key = '4ee15a8fd25844fd889cf6f3f1849073';
    
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
      //console.log(data.results[0].components.country)
        weather.fetchWeather(data.results[0].components.country)

    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request
},
getLocation:function(){
    function success(data){
        geocode.reverseGeocode(data.coords.latitude,data.coords.longitude);
    }
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(success, console.error);
    }else{
        weather.fetchWeather("tunisia")
    }
}

}


////////////////////Add event listener to search button //////////////////////

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
})


////////////////Add event listener to enter key /////////////////////

document.addEventListener("keyup",function(e){
    if(e.keyCode==13){
        weather.search()
    }
})
///////////////////Add DAte //////////////////////////////

const dateElement = document.getElementById("date");
const options={weekday:"long", month:"short", day:"numeric"}
const toDay = new Date();
dateElement.innerHTML = toDay.toLocaleDateString("en-US",options)






geocode.getLocation()
