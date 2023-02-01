export interface Shift {
  startDate: {
    seconds: number;
    nanoseconds: number;
  };
  endDate: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  totalHours: number;
  hourlyWage: number;
  workPlace: string;
  shiftName: string;
  comments: string;
  totalProfit: string;
}

export interface ShiftDate {
  startDate: Date;
  endDate: Date;
  id: string;
  totalHours: number;
  hourlyWage: number;
  workPlace: string;
  shiftName: string;
  comments: string;
  totalProfit: string;
}
