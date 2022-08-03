import React, {useState, useEffect} from "react";
import axios from 'axios';
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { ContainerCircleChart } from "./StyledChart";

export default function Chart() {

    const [info, setInfo] = useState({});

    useEffect(() => {
        axios.get('/pet/count').then((r) => {setInfo(r.data)})
    }, [])

    const data = [
      { name: "Adoptados", value: info.adopted },
      { name: "Extraviados", value: info.lost },
      { name: "Transito", value: info.transit },
    ];

  return (
    <ContainerCircleChart>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#3da9fc"
          label
        />
        <Tooltip />
      </PieChart>
    </ContainerCircleChart>
  );
}