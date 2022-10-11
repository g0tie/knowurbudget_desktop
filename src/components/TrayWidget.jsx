import ProgressBar from "./ProgressBar";
import Graph from "./Graph"
import { sortExpensesByWeek } from "../helpers/common";
import { useMainContext } from "../store/contexts";

const TrayWidget = () => {

    const {state} = useMainContext();

    const pieData = {
      labels: state.types.map(type => type.name),
      datasets: [
        {
          label: '',
          data: sortExpensesByWeek(state.types),
          backgroundColor: [
            '#2cf6b3',
            '#f0f757',
            '#ffbc42',
            '#715BFD',
            '#ff90b3',
            '#25ced1',
            '#8d918b',  
            '#8f2d56'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 0,
        },
      ],
    };

    return (
        <div className="">
            <ProgressBar showEditBtn={false} />
            <Graph title="Cette semaine" type="pie" data={pieData}/>
        </div>
    )
}

export default TrayWidget;