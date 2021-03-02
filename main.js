(async () => {
  const messageBox = document.getElementById('message-box');
  const controls = document.getElementById('controls');
  const nickNameInput = document.getElementById('nickname');
  const messageInput = document.getElementById('message');

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
  // General, basic error handling
  window.addEventListener('error', function (e) {
    alert(e.error);
  });
})();
