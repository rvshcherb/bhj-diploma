/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err,result) => {
      if(result && result.success === true) {
        document.getElementById('register-form').reset();
        App.modals.register.close();
        App.setState( 'user-logged' );
      }
    });
  }
}