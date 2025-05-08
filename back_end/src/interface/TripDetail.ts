export interface SeatRow {
  [seatNumber: number]: boolean; 
}

export interface GheTrong {
  [row: number]: SeatRow; 
}

export interface TripDetail {
  giodi: number;
  phutdi: number;
  gioden: number;
  phutden: number;
  ghetrong: GheTrong;
}
