import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';


export default function Chart(props) {

    return (
      <BarChart
        style={{position: "relative"}}
        width={1900}
        height={400}
        data={props.data}
        margin={{
          top: 50, right: 150, left: 150, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="cogs" fill="#8884d8" />
        <Bar dataKey="sales" fill="#82ca9d" />
        <Bar dataKey="profit" fill="#cc9900" />
      </BarChart>
    );
  }
