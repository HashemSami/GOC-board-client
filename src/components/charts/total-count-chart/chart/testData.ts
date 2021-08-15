import { months, DateFunctions } from "../../../../services/dayjs";
import { ChartData, DivisionName, DaysDataModel } from "./models";

export const generateDaysTestData = () => {
  const dataObject: {
    [x: string]: {
      [x: string]: DaysDataModel;
    };
  } = {};
  months.forEach((m, i) => {
    const monthFunctions = DateFunctions();
    monthFunctions.setDateContextByMonthNumber(i);

    const daysObject = monthFunctions.getDaysObject();

    const requiredData = {
      [m]: {},
    };

    Object.keys(daysObject).forEach(daysString => {
      const currDay = daysObject[daysString];

      const { jsDate, monthName, year, dateString, dayNumber } = currDay;

      const rand = Math.floor(Math.random() * 10) + 1;

      const divs: DivisionName = {
        NARCD: {
          name: "NARCD",
          count: 230 * Math.floor(Math.random() * 10) + 1,
          tgf: 800 * rand,
          trf: 500 * rand,
          kpi: 50,
        },
        SARCD: {
          name: "SARCD",
          count: 230 * Math.floor(Math.random() * 10) + 1,
          tgf: 800 * rand,
          trf: 500 * rand,
          kpi: 50,
        },
        GRCD: {
          name: "GRCD",
          count: 230 * Math.floor(Math.random() * 10) + 1,
          tgf: 800 * rand,
          trf: 500 * rand,
          kpi: 50,
        },
      };

      const count = divs.NARCD.count + divs.GRCD.count + divs.SARCD.count;
      const tgf = divs.NARCD.tgf + divs.GRCD.tgf + divs.SARCD.tgf;
      const trf = divs.NARCD.trf + divs.GRCD.trf + divs.SARCD.trf;

      Object.assign(requiredData[monthName], {
        [dateString]: {
          dateString,
          dayNumber: `${dayNumber}`,
          jsDate,
          monthName,
          year,
          monthNumber: i,
          divisions: divs,
          count,
          tgf,
          trf,
          kpi: 50 + i,
        },
      });
    });
    Object.assign(dataObject, requiredData);
  });
  return dataObject;
};
