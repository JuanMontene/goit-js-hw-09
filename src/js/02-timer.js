import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Elementos del DOM
const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

// Función para obtener la diferencia en milisegundos entre dos fechas
function getMsDiff(date1, date2) {
  return Math.abs(date1 - date2);
}

// Función para formatear el tiempo con ceros principales
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Función para actualizar el temporizador
function updateTimer(endDate) {
  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = getMsDiff(endDate, currentDate);

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown completed!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
}

// Evento al hacer clic en el botón "Start"
startButton.addEventListener('click', () => {
  const selectedDate = dateTimePicker._flatpickr.selectedDates[0];

  if (!selectedDate) {
    Notiflix.Notify.warning('Please choose a valid date and time.');
    return;
  }

  startButton.disabled = true;
  updateTimer(selectedDate);
});

// Inicializar flatpickr en el elemento dateTimePicker
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future.');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Función para convertir milisegundos en días, horas, minutos y segundos
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
