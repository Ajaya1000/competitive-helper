const startIDE = () => {
  fetch('http://localhost:3001/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: '12321',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Script executed successfully
    })
    .catch((error) => {
      console.error('There was a problem with the request:', error);
    });
};

console.log("Compe Script Loaded v3")
startIDE()