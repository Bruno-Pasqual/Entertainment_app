fetch('https://server.com/data.json')
  .then((response) => response.json())
  .then((json) => console.log(json));
