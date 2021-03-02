(async () => {
  const controls = document.getElementById('controls');
  const nickNameInput = document.getElementById('nickname');
  const messageInput = document.getElementById('message');

  const socket = io('http://35.157.80.184:8080/');
  //localStorage.debug = '*';

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
