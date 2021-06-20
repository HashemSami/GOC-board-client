import { FC } from "react";
import { HomePageContainer, Item } from "./HomePage.styles";

// import { useActions } from "../../hooks/useActions";

// import TimelineViewer from "../../components/timeline/timeline-viewer/TimelineViewer.component";
import DynamicForm from "../../components/dynamic-form/DynamicForm.component";
import DynamicChart from "../../components/dynamic-chart/DynamicChart.component";

const HomePage: FC = () => {
  // const { setWeekendDays } = useActions();

  const onSubmit = (model: { weekends: string[]; name: string }) => {
    const weekendsNumbers = model.weekends.map(d => parseInt(d));
    // setWeekendDays(weekendsNumbers);
    console.log(model);
  };

  const handleSttingsOnChange = (values: { weekends: string[]; name: string }) => {
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
            { key: "name", label: "Name", element: "input", props: { required: true } },
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
          onSubmit={model => {
            onSubmit(model);
          }}
          getOnChangeValues={values => handleSttingsOnChange(values)}
        />
      </Item>
      <Item>
        <DynamicChart width={500} height={300} />
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
