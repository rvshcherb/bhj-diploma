/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {

    // Блок по очистке дублированного списка счетов
    document.querySelectorAll('.accounts-select').forEach(select => {
      Array.from(select.children).forEach(option => option.remove());
    });
    // Конец блока по очистке дублированного списка счетов

    Account.list(undefined, (err,response)=> {
      if(response && response.data) {
        response.data.forEach(acc => {
          const option = document.createElement('option');
          option.value = acc.id;
          option.innerText = acc.name;
          this.element.querySelector('.accounts-select').appendChild(option);
        });
      } else {
        //console.log(err);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err,response) => {
      if(response && response.success === true) {
        this.element.reset();
        App.getModal(this.element.closest('.modal').dataset.modalId).close();
        App.update();
      } else {
        console.log(response.error);
      }
    });
  }
}