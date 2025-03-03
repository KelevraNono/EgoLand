import { default as dayjs } from 'dayjs';

const currencyFormat = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export const formatDate = (date: number) =>
  dayjs(date).format('DD-MM-YYYY HH:MM');

export const formatCurrency = (number: number) => currencyFormat.format(number);
