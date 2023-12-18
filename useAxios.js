export function getWeather(city) {
    return axios
      .get("https://api.openweathermap.org/data/2.5/weather?units=metric"
      , {
        params: {
          q: city,
          appid: "0867a05e7c943a9fa25633e05240fa7d",
        },
      })
      // .then((res) => console.log(res.data))
      // .catch((data)=>console.log(`${data.message}`));
  }
  