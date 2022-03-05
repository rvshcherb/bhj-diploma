/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let currentUser;
    if(localStorage.id && localStorage.name) {
      currentUser = {};
      currentUser.id = localStorage.getItem('id');
      currentUser.name = localStorage.getItem('name');  
    }
    return currentUser;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
     createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        if(response.success === true) {
          this.setCurrent(response.user);
          console.log('user is authorized');
        } else {
          this.unsetCurrent();
          console.log(response.error);
        }
        
        callback();
      }
     });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
   console.log(data);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success === true) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}

User.URL = '/user';

//User.login(vasyaTest, (err, result) => console.log(result));
//User.logout((err, response) => User.unsetCurrent());
//User.unsetCurrent();

// createRequest({
//   url: '/account',
//   method: 'GET',
//   responseType: 'json'
// });

// createRequest({
//   url: '/account',
//   method: 'PUT',
//   responseType: 'json',
//   data: {name: 'Наличные'}
// });