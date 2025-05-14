import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('datetime-picker');
  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  let countdownInterval = null;
  let targetDate = null;

  startButton.disabled = true; // спочатку кнопка неактивна

  const fp = flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      targetDate = selectedDates[0];
      if (targetDate <= new Date()) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });

  function formatNumber(value) {
    return String(value).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';

      // Розблокувати інтерфейс після завершення
      startButton.disabled = false;
      dateInput.disabled = false;
      fp.input.disabled = false;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);
  }

  startButton.addEventListener('click', () => {
    if (!targetDate) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please select a date first.',
        position: 'topRight',
      });
      return;
    }

    // Деактивуємо кнопку та поле вводу дати
    startButton.disabled = true;
    dateInput.disabled = true;
    fp.input.disabled = true;

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });
});
