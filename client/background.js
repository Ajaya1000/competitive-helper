chrome.action.onClicked.addListener((tab) => {
    console.log("DEBUG: ", tab)
    const url = tab.url

    const code = extractContestCode(url)
    if(code) {
      startIDE(code)
    } else {
      console.log("code not found")
    }
});

const startIDE = (code) => {
    fetch('http://localhost:3001/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
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
  
  // Regular expression to match contest code
const contestRegex = /\/contest\/(\d+)/;

// Function to extract contest code from URL
const extractContestCode = (url) => {
    const match = url.match(contestRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null; // URL format doesn't match
    }
}