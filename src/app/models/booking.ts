export interface Booking {
  mailId: string;
  tr_no: number;
  date: number; // timestamp
  from_stn: string;
  to_stn: string;
  seats: number;
  amount: number;
  transId: string;
}
