import type { BookingFormData } from '../../components/BookingForm';

const LOCAL_KEY = 'bookingForm';

export function getBookings(): BookingFormData[] {
  const saved = localStorage.getItem(LOCAL_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function addBooking(data: BookingFormData): BookingFormData[] {
  const arr = getBookings();
  arr.push(data);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  return arr;
}

export function removeBooking(idx: number): BookingFormData[] {
  const arr = getBookings();
  arr.splice(idx, 1);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  return arr;
}
