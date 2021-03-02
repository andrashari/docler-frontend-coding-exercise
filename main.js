(async () => {
  const messageBox = document.getElementById('message-box');
  const controls = document.getElementById('controls');
  const nickNameInput = document.getElementById('nickname');
  const messageInput = document.getElementById('message');
  const infoBox = document.getElementById('info-box');

  const socket = io('http://35.157.80.184:8080/');
  //localStorage.debug = '*';

  /**
   * Here I handle new messages both from server and client emitted to socket
   */

  socket.on('message', (message) => {
    createMessageElement({ ...message });
  });

  /**
   * @param {Object} data - Data provided by socket
   * @param {string} data.user  - The name of the user
   * @param {string} data.message  - The message prop of socket message
   */
  const createMessageElement = ({ user, message }) => {
    const nickName = nickNameInput.value;

    const element = document.createElement('div');
    element.classList.add('message');

    if (user === nickName) {
      element.classList.add('current-user');
    } else {
      element.classList.add('remote-user');
    }

    element.innerHTML = user === nickName ? `${message}` : `${user}: ${message}`;

    messageBox.appendChild(element);
    messageBox.scrollTo(0, messageBox.scrollHeight);
  };

  /**
   * Handle form submission, current user inputs
   */
  controls.addEventListener('submit', (e) => {
    e.preventDefault();
    submitMessage();
  });

  const submitMessage = () => {
    if (messageInput.value) {
      socket.emit('message', { message: messageInput.value, user: nickNameInput.value });
      messageInput.value = '';
    }
  };

  /**
   * Status handling for socket connection
   */

  socket.on('connect', () => {
    showInfoBox('You are connected to chatBot2000! 🧐', true);
  });

  socket.on('connecting', () => {
    showInfoBox('Connecting is in progress to chatBot2000! 😏');
  });

  socket.on('disconnect', () => {
    showInfoBox('You are disconnected from chatBot2000. 😳');
  });

  socket.on('reconnect', () => {
    showInfoBox('You are successfully reconnected. 😎');
  });

  socket.on('reconnecting', () => {
    showInfoBox('We are trying to reconnect, please wait a bit... 🙄');
  });

  socket.on('reconnect_failed', () => {
    showInfoBox('Reconnection failed, something very bad seems to be here. 🥴');
  });

  socket.on('error', (e) => {
    showInfoBox('There must be some error.');
  });

  const showInfoBox = (content, toBeFade) => {
    infoBox.style.right = 0;
    infoBox.innerHTML = content;
    if (toBeFade) {
      setTimeout(() => {
        infoBox.style.right = '-100%';
      }, 4000);
    }
  };

  // General, basic error handling
  window.addEventListener('error', function (e) {
    alert(e.error);
  });
})();
