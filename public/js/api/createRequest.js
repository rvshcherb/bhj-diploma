/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const testData = {
  url: '/user/register', // адрес
  data: { // произвольные данные, могут отсутствовать
    name: 'vasyaTest',
    email: 'vasyatest@poselok.ru',
    password: 'odinodin'
  },
  method: 'POST', // метод запроса
  /*
    Функция, которая сработает после запроса.
    Если в процессе запроса произойдёт ошибка, её объект
    должен быть в параметре err.
    Если в запросе есть данные, они должны быть переданы в response.
  */
  callback: (err, response) => {
    console.log('Ошибка, если есть', err);
    console.log('Данные, если нет ошибки', response);
  }
};


// Main function
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
      //console.log(url);
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
    //console.log(xhr.response);
    response = xhr.response;
    options.callback(err, response);
  });
};

//createRequest(testData);

const vasyaTest = {
  password: 'odinodin',
  email: 'vasyatest@poselok.ru',
};