(async () => {

  const socket = io('http://35.157.80.184:8080/');
  //localStorage.debug = '*';

  // General, basic error handling
  window.addEventListener('error', function (e) {
    alert(e.error);
  });
})();
