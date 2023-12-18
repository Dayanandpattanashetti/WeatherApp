//fetching data from the weatherAPI
let fetchData = async (city) => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0867a05e7c943a9fa25633e05240fa7d`
      );
      if (!response.ok) {
        let errorData = await response.json();
        throw new Error(`${errorData.message}`);
      }
      let data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };
  