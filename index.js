import {el, setChildren, mount} from 'redom';
// TODO: сверстать с ипользованием redom
// TODO: вводимые данные должны отображаться в
// TODO: .credit-card в соответствующих полях
// TODO: использовать regExp для ввода данных в input

const init = () => {
  const wrapper = el('div.wrapper');
  const card = el(
      'div.card', el(
          'p', {className: 'secure'}, 'Secure Checkout'));
  const creditCard = el('div.credit-card');
  const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
  const cardPersonal = el('div.card__personal');
  const cardName = el('span.card__name', 'John Doe');
  const cardDate = el('span.card__date', '04/24');
  setChildren(cardPersonal, [cardName, cardDate]);
  setChildren(creditCard, [cardNumber, cardPersonal]);

  const form = el('form.form', {id: 'form', action: '#'});
  const inputHolder = el('input.input.input__holder', {id: 'cardHolder'});
  const formInputWrapHolder = el('div.form__input-wrap_holder.form__input-wrap',
      [el('label.form__holder-label.form__label', {
        for: ''}, 'Card Holder'), inputHolder]);
  const inputNumber = el('input.input.input__number', {id: 'cardNumber',
    placeholder: 'xxxx xxxx xxxx xxxx'});
  const formInputWrapNumber = el('div.form__input-wrap_number.form__input-wrap',
      [el('label.form__number-label.form__label', {
        for: ''}, 'Card Number'), inputNumber]);
  const inputDate = el('input.input.input__date', {id: 'cardDate',
    placeholder: '__/__'});
  const formInputWrapDate = el('div.form__input-wrap_date.form__input-wrap',
      [el('label.form__date-label.form__label', {
        for: ''}, 'Card Expiry'), inputDate]);
  const inputCvv = el('input.input.input__cvv', {id: 'cardCvv',
    placeholder: '___'});
  const formInputWrapCvv = el('div.form__input-wrap_cvv.form__input-wrap',
      [el('label.form__cvv-label.form__label', {
        for: ''}, 'CVV'), inputCvv]);
  const buttonSubmitForm = el('button.form__button', {
    type: 'submit', value: 'pay',
  }, 'CHECK OUT');
  setChildren(form, [
    formInputWrapHolder,
    formInputWrapNumber,
    formInputWrapDate,
    formInputWrapCvv,
    buttonSubmitForm,
  ]);
  setChildren(card, [creditCard, form]);
  setChildren(wrapper, card);
  mount(document.body, wrapper);

  form.addEventListener('input', ({target}) => {
    if (target.id === 'cardHolder') {
      target.value = target.value.replace(/[^a-zA-Z ]/g, '');
      cardName.textContent = target.value.trim();
    } else if (target.id === 'cardNumber') {
      target.value = target.value.replace(/\D/g, '');
      target.value = target.value.slice(0, 19);
      target.value = target.value.replace(/(.{4})/g, '$1 ');
      cardNumber.textContent = target.value.trim();
    } else if (target.id === 'cardDate') {
      target.value = target.value.replace(/\D/g, '');
      target.value = target.value.slice(0, 4);
      target.value = target.value.replace(/^(.{2})/, '$1/');
      cardDate.textContent = target.value.trim();
    } else if (target.id === 'cardCvv') {
      target.value = target.value.replace(/\D/g, '');
      target.value = target.value.slice(0, 3);
    }
  });
};
init();
