import { FC } from "react";

import { TdWellReportContainer, Item } from "./TdWellReport.styles";

import DynamicForm from "../../../components/dynamic-form/DynamicForm.component";

const TdWellReport: FC = () => {
  const onSubmit = (model: { weekends: string[]; name: string }) => {
    const weekendsNumbers = model.weekends.map((d) => parseInt(d));
    // setWeekendDays(weekendsNumbers);
    console.log(model);
  };

  const handleSttingsOnChange = (values: {
    weekends: string[];
    name: string;
  }) => {
    if (!values) {
      return;
    }
    // const weekendsNumbers = values.weekends.map(d => parseInt(d));
    // setWeekendDays(weekendsNumbers);

    console.log(values);
  };
  return (
    <TdWellReportContainer>
      <Item>
        <DynamicForm
          title="Settings"
          model={[
            {
              key: "name",
              label: "Name",
              element: "input",
              props: { required: true },
            },
            {
              key: "weekends",
              label: "Weekends",
              element: "checkbox",
              options: [
                { key: "sunday", label: "Sunday", value: "0" },
                { key: "monday", label: "Monday", value: "1" },
                { key: "tuseday", label: "Tuseday", value: "2" },
                { key: "wednesday", label: "Wednesday", value: "3" },
                { key: "thursday", label: "Thursday", value: "4" },
                { key: "friday", label: "Friday", value: "5" },
                { key: "saturday", label: "Saturday", value: "6" },
              ],
              props: {},
            },
          ]}
          onSubmit={(model) => {
            onSubmit(model);
          }}
          getOnChangeValues={(values) => handleSttingsOnChange(values)}
        />
      </Item>
    </TdWellReportContainer>
  );
};

export default TdWellReport;
