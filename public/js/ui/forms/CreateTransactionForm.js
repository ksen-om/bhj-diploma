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
    let select = this.element.querySelector('.accounts-select');
    let accounts = '';
    if (User.current()) {
      Account.list(User.current(), (err, resp) => {
        if (resp && resp.success) {
          resp.data.forEach(acc => {
            accounts += `<option value="${acc.id}">${acc.name}</option>`
          });
          select.innerHTML = accounts;
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        this.element.reset();
        App.update();
      };
    });
  };
}