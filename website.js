

let weatherCode= new Map([    [0, "Unknown"], 
    [1000, "Clear, Sunny"],
    [1100, "Mostly Clear"],
    [1101, "Partly Cloudy"],
    [1102, "Mostly Cloudy"],
    [1001, "Cloudy"],
    [2000, "Fog"],
    [2100, "Light Fog"],
    [4000, "Drizzle"],
    [4001, "Rain"],
    [4200, "Light Rain"],
    [4201, "Heavy Rain"],
    [5000, "Snow"],
    [5001, "Flurries"],
    [5100, "Light Snow"],
    [5101, "Heavy Snow"],
    [6000, "Freezing Drizzle"],
    [6001, "Freezing Rain"],
    [6200, "Light Freezing Rain"],
    [6201, "Heavy Freezing Rain"],
    [7000, "Ice Pellets"],
    [7101, "Heavy Ice Pellets"],
    [7102, "Light Ice Pellets"],
    [8000, "Thunderstorm"]
]);


const form=document.querySelector("form");
const search=document.querySelector("#search");
const weather=document.querySelector("#weather");
const report=document.querySelector("#bottom")

let speed;

const getwether= async(city)=>{
         
    weather.innerHTML=`<h1>Loading..</h1>`
    report.innerHTML=`
    
    
       
    <div id="bottom">
    <h1>today report</h1>
<div id="report">


<div class="re"><h1>UV index</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>windSpeed</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>visibility</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>rainIntensity</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>humidity</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>cloudcover</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>Surface.P</h1>
<h2>loading....</h2>
</div>
<div class="re"><h1>dewPoint</h1>
<h2>loading....</h2>
</div>
</div>        
          </div> 
    
   `
   
    const url = `https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast?location=${city}&timesteps=1h&units=metric`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dce5e6390dmsh903d6e216673251p175615jsn3426f35c6094',
            'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
        }
    };
    
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        return showether(result);
    } catch (error) {
      return showether(error);
    }

}

const showether =(result)=>{
            let error=400001;
            if(result.code==error){
                console.log("invalid place");
                weather.innerHTML=`<h1>Place not found</h1>`;
                
                return ;
            }
         console.log(result);
         speed= (result.timelines.hourly[0].values.windSpeed*1.852);
   weather.innerHTML=` 
            <div id="weather">
                <h1 id="temp">${result.timelines.hourly[0].values.temperature}℃</h1>
                <h2>${weatherCode.get(result.timelines.hourly[0].values.weatherCode)}</h2>
            </div>
              
            `
    report.innerHTML=`
    
    
       
    <div id="bottom">
    <h1>Today Report</h1>
<div id="report">


<div class="re"><h1>UV index</h1>
<h2>${result.timelines.hourly[0].values.uvIndex}</h2>
</div>
<div class="re"><h1>windSpeed</h1>
<h2>${speed} km</h2>
</div>
<div class="re"><h1>visibility</h1>
<h2>${result.timelines.hourly[0].values.visibility} km</h2>
</div>
<div class="re"><h1>rainIntensity</h1>
<h2>${result.timelines.hourly[0].values.rainIntensity}</h2>
</div>
<div class="re"><h1>humidity</h1>
<h2>${result.timelines.hourly[0].values.humidity}%</h2>
</div>
<div class="re"><h1>cloudcover</h1>
<h2>${result.timelines.hourly[0].values.cloudCover}</h2>
</div>
<div class="re"><h1>Surface.P</h1>
<h2>${result.timelines.hourly[0].values.pressureSurfaceLevel} mb</h2>
</div>
<div class="re"><h1>dewPoint</h1>
<h2>${result.timelines.hourly[0].values.dewPoint}</h2>
</div>

</div>     
   <h1>thank you for visit</h1>
             </div> 
    
   `


}


form.addEventListener(
    "submit",
    function(event){
        console.log(search.value);
        getwether(search.value);
        event.preventDefault();
    }
)
