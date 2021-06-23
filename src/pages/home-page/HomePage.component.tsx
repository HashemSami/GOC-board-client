import { FC, useState } from "react";
import { HomePageContainer, Item } from "./HomePage.styles";

// import { useActions } from "../../hooks/useActions";

// import TimelineViewer from "../../components/timeline/timeline-viewer/TimelineViewer.component";
import DynamicForm from "../../components/dynamic-form/DynamicForm.component";
import DynamicChart from "../../components/dynamic-chart/DynamicChart.component";
import { BarChartObj } from "../../models";

import { data, data2 } from "./testData";

const HomePage: FC = () => {
  // const { setWeekendDays } = useActions();
  const [barC, setBarC] = useState<BarChartObj | null>(null);
  const [barC2, setBarC2] = useState<BarChartObj | null>(null);

  const updateBar = () => {
    if (!barC || !barC2) {
      return;
    }
    barC.updateData(data2);
    barC2.updateData(data);
  };
  const updateBar2 = () => {
    if (!barC || !barC2) {
      return;
    }
    barC.updateData(data);
    barC2.updateData(data2);
  };

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
    <HomePageContainer>
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
      <Item>
        <button onClick={updateBar}>upda</button>
        <button onClick={updateBar2}>upda</button>
      </Item>
      <Item>
        <DynamicChart
          chartType="barChart"
          width={500}
          height={300}
          updateFunction={(func) => {
            setBarC(func);
          }}
        />
      </Item>
      <Item>
        <DynamicChart
          chartType="barChart"
          width={500}
          height={300}
          updateFunction={(func) => {
            setBarC2(func);
          }}
        />
      </Item>
      {/* <Item>item2</Item>
      <Item>item3</Item>
      <Item>item4</Item>
      <Item>item5</Item>
      <Item>item6</Item>
      <Item>item7</Item>
      <Item>item8</Item>
      <Item>item9</Item>
      <Item>item10</Item>
      <Item>item11</Item>
      <Item>item12</Item>
      <Item>item12</Item>
      <Item>item12</Item> */}
    </HomePageContainer>
  );
};

export default HomePage;
