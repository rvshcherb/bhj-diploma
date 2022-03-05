/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, result) => {
      if(result.success === true) {
        document.getElementById('login-form').reset();
        App.modals.login.close();
        App.setState( 'user-logged' );
      } else {
        console.log(err);
      }
    });
  }
}