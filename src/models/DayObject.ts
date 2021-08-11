export interface DayObject {
  dayIndex: number;
  dayNumber: number;
  dayValue: number;
  dayString: string;
  dayShortSrting: string;
  monthName: string;
  year: number;
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
  isCurrentWeek: boolean;
  isWeekend: boolean;
  jsDate: Date;
}

export interface DaysObject {
  [day: string]: DayObject;
}

export interface TimelineData {
  [year: string]: { [month: string]: DaysObject };
}
