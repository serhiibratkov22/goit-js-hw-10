document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('dateInput');
  const startButton = document.getElementById('startButton');
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  let countdownInterval;
  let targetDate;

  function formatNumber(number) {
    return number < 10 ? '0' + number : number;
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

  startButton.addEventListener('click', function () {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    targetDate = new Date(dateInput.value).getTime();

    if (isNaN(targetDate) || targetDate <= Date.now()) {
      alert('Please choose a valid future date.');
      return;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });
});
