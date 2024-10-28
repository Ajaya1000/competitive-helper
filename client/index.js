let isNotificationVisible = false
const notification = document.createElement('div');

notification.textContent = 'Your notification message';

notification.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    z-index: 9999;
`;

const handleShowToast = () => {
  if (isNotificationVisible) return;
  isNotificationVisible = true;

  document.body.appendChild(notification);
};

const removeToast = () => {
  if (!isNotificationVisible) return;
  isNotificationVisible = false;

  setTimeout(() => {
    notification.parentNode
    if (isNotificationVisible) return;
    notification.remove();
  }, 3000);
};

const showInitialMessage = (code) => {
  notification.textContent = `Opening VSCode for ${code}`;
  notification.style.backgroundColor = '#333';
  notification.style.color = '#fff';
  handleShowToast();
};

const showError = (error) => {
  notification.textContent = `Couldn't open VSCode, ${error}`;
  notification.style.backgroundColor = '#ef5136';
  notification.style.color = '#fff';
  handleShowToast();
};

const showSuccess = () => {
  notification.textContent = `Success. VSCode has opened`;
  notification.style.backgroundColor = '#49b249';
  notification.style.color = '#fff';
  handleShowToast();
};

const startIDE = (code) => {
  if (code == null) {
    showError('code not found');
    removeToast()
    return;
  }

  showInitialMessage(code);

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
      showSuccess();
      removeToast()
      console.log(data); // Script executed successfully
    })
    .catch((error) => {
      showError(error);
      removeToast()
      console.error('There was a problem with the request:', error);
    });
};

const messageHandler = (message, sender, sendResponse) => {
  console.log("DEBUG Recieved Message", message)
  const { type, payload } = message;
  try {
    if (type == 'startIDE') {
      startIDE(payload);
    } else if (type == 'checkIfLoaded') {
        sendResponse("yes");
    }
    throw new Error("couldn't start IDE");
  } catch (err) {
    sendResponse(`error, ${err}`);
  }
};

chrome.runtime.onMessage.addListener(messageHandler);

// Regular expression to match contest code
const contestRegex = /\/contest\/(\d+)/;

// Function to extract contest code from URL
const extractContestCode = (url) => {
  const match = url.match(contestRegex);
  if (match && match[1]) {
    return match[1];
  } else if (url.test("/^https:\/\/codeforces\.com\/problemset/")){
    return "practice";
  } else {
    return null; // URL format doesn't match
  }
};

// To start the IDE
console.log("content JS Loaded", window.location.href)