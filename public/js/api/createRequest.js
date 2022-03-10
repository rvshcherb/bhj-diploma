/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  let err = null;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let url = options.url;

  if (options.data) {
    const params = Object.entries(options.data);
    if (options.method === 'GET') {
      const getParams = '?' + params.map(element => element.join('=')).join('&');
      url += getParams;
      try {
        xhr.open(options.method, url);
        xhr.send();
      } catch (e) {
        err = e;
      }
    } else {
      const formData = new FormData();
      params.forEach(param => formData.append(...param));

      try {
        xhr.open(options.method, url);
        xhr.send(formData);
      } catch (e) {
        err = e;
      }
    }
  } else {
    try {
      xhr.open(options.method, url);
      xhr.send();
    } catch (e) {
      err = e;
    }
  }


  xhr.addEventListener('load', function () {
    response = xhr.response;
    options.callback(err, response);
  });
};
