/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element;
    this.lastOptions = undefined;
    this.transactionId = undefined;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    //this.clear();
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', () => {
      if(window.confirm('Вы действительно хотите удалить счет?') && this.lastOptions) {
        this.removeAccount();
      }
    });

    this.element.querySelector('.content').addEventListener('click', (evt) => {
        if(evt.target.classList.contains('fa-trash') && window.confirm('Вы действительно хотите удалить транзакцию?')) {
          this.removeTransaction({id: evt.target.closest('.transaction__remove').dataset.id});  
        } else if (evt.target.classList.contains('transaction__remove') && window.confirm('Вы действительно хотите удалить транзакцию?')) {
          this.removeTransaction({id: evt.target.dataset.id});
        } 
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    Account.remove({id: this.lastOptions.account_id}, (err, response) => {
      if(response && response.success === true) {
        App.updateWidgets();
        App.updateForms();
      } else {
        console.log(response);
      }
    });
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    Transaction.remove(id, (err,response) => {
      if(response && response.success === true) {
        App.update();
      }
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    const transactions = document.querySelector('.content').children;
    Array.from(transactions).forEach(element => element.remove());
    
    if(options) {
      this.lastOptions = options;

      this.renderTitle(options);

      Transaction.list(options, (err, response) => {
        if (response && response.success === true) {
          response.data.forEach(element => this.renderTransactions(element));
        } else {
          console.log(response.error);
        }
      });
    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
      const transactions = document.querySelector('.content').children;
      Array.from(transactions).forEach(element => element.remove());
      document.querySelector('.content-title').innerText = 'Название счета';
      this.lastOptions = undefined;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    Account.get(name.account_id, (err, response) => {
      if(response && response.success === true) {
        document.querySelector('.content-title').innerText = response.data.name;
      }
    });
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' в ' + 
    new Date(date).toLocaleTimeString('ru-RU', {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    const createdDate = this.formatDate(item.created_at);
 
    const transactionItem = `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${createdDate}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ"> 
            ${item.sum}<span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}"><i class="fa fa-trash"></i></button>
        </div>
      </div>`;

      document.querySelector('.content').insertAdjacentHTML('afterBegin', transactionItem);
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){

    this.getTransactionHTML(data);
  }
}