window.addEventListener("load", () => {
  let long;
  let lat;

  let temeraureDescrptions = document.querySelector(".temeprature-description");
  let temeraureDegree = document.querySelector(".temeprature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let image = document.querySelector(".icon");
  let temperatureSection = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const timezone = data.name;
          const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          let temperature = data.main.temp;
          const weather = data.weather[0].description;

          //set Dom Elements
          temeraureDegree.textContent = temperature;
          temeraureDescrptions.textContent = weather;
          locationTimezone.textContent = timezone;
          image.src = icon;

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperature = ((temperature - 32) * 5) / 9;
              temeraureDegree.textContent = Math.round(temperature);
            } else {
              temperatureSpan.textContent = "F";
              temperature = (temperature * 9) / 5 + 32;
              temeraureDegree.textContent = temperature;
            }
          });
        });
    });
  }
});
