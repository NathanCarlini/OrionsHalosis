
import {   Chart as ChartJS,DoughnutController, ArcElement } from "chart.js";
import { Doughnut  } from "react-chartjs-2";
ChartJS.register(DoughnutController, ArcElement);

function DougChart(data) {
    return (
        <div>
            
            <Doughnut
                data={{
                    labels:[
                        'Wins',
                        'Loses'
                    ],
                    datasets:[{
                        data: data.data,
                        backgroundColor:[
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)'
                        ],
                        hoverOffset: 4
                    }]

                }}


            />
        </div>
    );
}

export default DougChart;