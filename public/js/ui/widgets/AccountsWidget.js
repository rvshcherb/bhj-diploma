/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount').element.setAttribute('style', 'display: block');
    });

    // this.element.querySelectorAll('.account').addEventListener('click', ()=>console.log('test'));
    console.log(this.element.querySelectorAll('.account'));
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    Account.list(24, (err,response)=> this.renderItem(response.data));
    //console.log('update');
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = Array.from(App.widgets.accounts.element.children);
    for (let i = 1; i <accounts.length; i++) {
      accounts[i].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    console.log('onSelectAccount');
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id="${item.id}">
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum}</span>
              </a>
            </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach(element => {
      document.querySelector(".accounts-panel").insertAdjacentHTML('beforeend', this.getAccountHTML(element));
    });
    // const accountItem = document.createElement('li');
    // const accountLink = document.createElement('a');
    // const accountName = document.createElement('span');
    // const accountBalance = document.createElement('span');
    // accountItem.class = 'active account'
    // accountItem.data.id = data.id;
    // accountLink.setAttribute('href', '#');
    // accountName.innerText = `${data.name}`;
    // accountBalance.innerText = `${data.sum}`;
    // accountItem.appendChild(accountLink);
    // accountLink.appendChild(accountName);
    // accountLink.appendChild(accountBalance);
  }
}

// Отдельная функция отрисовки счета. Удалить в конце. 

// const renderItem = function(data){
//   const accountItem = document.createElement('li');
//   const accountLink = document.createElement('a');
//   const accountName = document.createElement('span');
//   const accountBalance = document.createElement('span');
//   accountItem.class = 'active account'
//   accountItem.dataset.id = data.id;
//   accountLink.setAttribute('href', '#');
//   accountName.innerText = `${data.name} `;
//   accountBalance.innerText = `${data.sum}`;
//   accountItem.appendChild(accountLink);
//   accountLink.appendChild(accountName);
//   accountLink.appendChild(accountBalance);
//   document.querySelector(".accounts-panel").appendChild(accountItem);
// }