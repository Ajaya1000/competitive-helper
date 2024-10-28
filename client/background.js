// background.js

chrome.action.onClicked.addListener((tab) => {
  injectScript(tab)
});

const injectScript = (tab) => {
  console.log("Injecting content js")
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['run_script.js']
  });
}

const startIDE = (code) => {
  const message = {type: "startIDE", code}
  sendMessage(message)
}

const checkIfLoaded = (callback) => {
  const message = {type: "checkIfLoaded"} 
  sendMessage(message, callback)
} 

const sendMessage = (message, callback) => {
  chrome.runtime.sendMessage(message, (response)=> {
    if(chrome.runtime.lastError) {
     console.log("Encount error", message)
     if(callback) callback('no')
    } else {
      console.log(response)
      if(callback) callback(response)
    }
  })
}

// Regular expression to match contest code
const contestRegex = /\/contest\/(\d+)/;

// Function to extract contest code from URL
const extractContestCode = (url) => {
  const match = url.match(contestRegex);
  if (match && match[1]) {
    return match[1];
  } else if (url.test("/^https:\/\/codeforces\.com\/problemset/")){
    return "practice"; // URL format doesn't match
  } else {
    return null;
  }
};