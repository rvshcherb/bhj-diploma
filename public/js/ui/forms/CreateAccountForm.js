/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {  
    Account.create(data, (err, response) => {
      if(response && response.success === true) {
        App.updateWidgets();
        App.updateForms();
        App.modals.createAccount.element.querySelector('.form').reset();
        App.modals.createAccount.close();
      }
    });
  }
}