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
        const {name}=data;
        const {icon,description} = data.weather[0]
        const{temp,humidity} = data.main
        const{speed} = data.wind;
        /////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector(".city").innerHTML="Weather in "+name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp+" °C";
        document.querySelector(".humidity").innerHTML = "Humidity : "+humidity+" %";
        document.querySelector(".wind").innerHTML = "Wind Speed : " + speed + " km/h";
        ///////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector(".weather-card").classList.remove("hide")
        document.body.style.background= "linear-gradient(rgba(0, 0, 1, 0.426),rgba(0, 0, 1, 0.415)),url('https://source.unsplash.com/1600x900/?" + name + "')";
        
    } , 
    search:function(){
        let searchCity = document.querySelector('#search-Bar').value
        if(searchCity===''){alert('Invalid Input')}
        this.fetchWeather(searchCity)
        document.querySelector('#search-Bar').value ='';
      
       
    }

};

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

weather.fetchWeather("Tunisia")
