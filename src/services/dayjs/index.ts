import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { DaysObject } from "../../models";

dayjs.extend(localeData);
dayjs.extend(weekOfYear);

interface DaysObjectOptions {
  weekends: number[];
}

export const months = dayjs.months();

export const weekDays = dayjs.weekdays();

export const weekDaysShort = dayjs.weekdaysShort();

export const getFirstDateOfTheYear = (dayjsContext: dayjs.Dayjs) =>
  dayjs(dayjsContext).startOf("year").toDate();

export const getLastDateOfTheYear = (dayjsContext: dayjs.Dayjs) =>
  dayjs(dayjsContext).endOf("year").toDate();

const getYear = (dayjsContext: dayjs.Dayjs) => dayjsContext.format("YYYY");

const getMonth = (dayjsContext: dayjs.Dayjs) => dayjsContext.format("MMMM");

const getNumberOfDaysInMonth = (dayjsContext: dayjs.Dayjs) =>
  dayjsContext.daysInMonth();

const getCurrentDate = (dayjsContext: dayjs.Dayjs) => dayjsContext.get("date");

const getCurrentDay = (dayjsContext: dayjs.Dayjs) =>
  parseInt(dayjsContext.format("D"));

const getFirstDayOfTheMonth = (dayjsContext: dayjs.Dayjs) =>
  parseInt(dayjs(dayjsContext).startOf("month").format("d"));

const setDateContextByMonthNumber = (
  dayjsContext: dayjs.Dayjs,
  setDayjsContext: (context: dayjs.Dayjs) => void,
  monthNumber: number
) => {
  // return (monthNumber: number) => {
  setDayjsContext(dayjs(dayjsContext).set("month", monthNumber));
  // };
};

const setDateContextByYearNumber = (
  dayjsContext: dayjs.Dayjs,
  setDayjsContext: (context: dayjs.Dayjs) => void,
  yearNumber: number
) => {
  // return (yearNumber: number) => {
  setDayjsContext(dayjs(dayjsContext).set("year", yearNumber));
  // };
};

const getNextMonth = (dayjsContext: dayjs.Dayjs) =>
  dayjs(dayjsContext).add(1, "month");

const getPrevMonth = (dayjsContext: dayjs.Dayjs) =>
  dayjs(dayjsContext).subtract(1, "month");

const getDaysObject = (
  dayjsContext: dayjs.Dayjs,
  options?: DaysObjectOptions
) => {
  const numberOfDaysInMonth = getNumberOfDaysInMonth(dayjsContext);
  const todayContext = dayjs();
  const currentMonthNumber = todayContext.get("month");
  const currentWeekNumber = todayContext.week();
  let currentWeekends = [0, 1];

  if (options) {
    const { weekends } = options;
    currentWeekends = weekends;
    // console.log(weekends);
  }

  const daysObject: DaysObject = {};

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    const monthDay = i;
    const date = dayjsContext.date(monthDay);
    const weekDay = date.day();
    const monthNumber = date.get("month");
    const monthName = months[monthNumber];
    const weekNumber = date.week();
    const year = date.get("year");
    // const jsDate = date.toDate();

    const dateString = `${monthNumber + 1}-${monthDay}-${year}`;
    const dayObject: DaysObject = {
      [dateString]: {
        dateString,
        dayIndex: weekDay,
        dayNumber: monthDay,
        dayValue: date.valueOf(),
        dayString: weekDays[weekDay],
        dayShortSrting: weekDaysShort[weekDay],
        monthName,
        year,
        isCurrentDay: date.isSame(todayContext, "date"),
        isCurrentMonth: monthNumber === currentMonthNumber,
        isCurrentWeek: weekNumber === currentWeekNumber,
        isWeekend: currentWeekends.indexOf(weekDay) > -1,
        jsDate: date.toDate(),
      },
    };
    Object.assign(daysObject, dayObject);
  }

  // Array.from({ length: numberOfDaysInMonth }, (_, i) => {
  //   const monthDay = i + 1;
  //   const date = dayjsContext.date(monthDay);
  //   const weekDay = date.day();
  //   const monthNumber = date.get("month");
  //   const monthName = months[monthNumber];
  //   const year = date.get("year");

  //   const dayObject = {
  //     [`${monthNumber + 1}-${monthDay}-${year}`]: {
  //       dayNumber: monthDay,
  //       dayValue: date.valueOf(),
  //       dayString: weekDays[weekDay],
  //       dayShortSrting: weekDaysShort[weekDay],
  //       monthName,
  //       year,
  //       isCurrentDay: date.isSame(todayContext),
  //     },
  //   };
  //   return Object.assign(daysObject, dayObject);
  // });
  return daysObject;
};

export const DateFunctions = (dayjsContextParam?: dayjs.Dayjs) => {
  let dayjsContext: dayjs.Dayjs = dayjs();

  const getDayjsContext = () => dayjsContext;

  const setDayjsContext = (context: dayjs.Dayjs) => {
    dayjsContext = context;
    // console.log(dayjsContext.format("MMMM"));
  };

  return {
    // getters
    getDaysObject: (options?: DaysObjectOptions) =>
      getDaysObject(getDayjsContext(), options),
    getDayjsContext: () => getDayjsContext(),
    getYear: () => getYear(getDayjsContext()),
    getMonth: () => getMonth(getDayjsContext()),
    getNumberOfDaysInMonth: () => getNumberOfDaysInMonth(getDayjsContext()),
    getCurrentDate: () => getCurrentDate(getDayjsContext()),
    getCurrentDay: () => getCurrentDay(getDayjsContext()),
    getFirstDayOfTheMonth: () => getFirstDayOfTheMonth(getDayjsContext()),
    getNextMonth: () => getNextMonth(getDayjsContext()),
    getPrevMonth: () => getPrevMonth(getDayjsContext()),
    getFirstDateOfTheYear: () => getFirstDateOfTheYear(getDayjsContext()),
    getLastDateOfTheYear: () => getLastDateOfTheYear(getDayjsContext()),
    // setters
    setDateContextByMonthNumber: (monthNumber: number) =>
      setDateContextByMonthNumber(
        getDayjsContext(),
        setDayjsContext,
        monthNumber
      ),
    setDateContextByYearNumber: (yearNumber: number) =>
      setDateContextByYearNumber(
        getDayjsContext(),
        setDayjsContext,
        yearNumber
      ),
  };
};

export default dayjs;
