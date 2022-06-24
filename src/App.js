import React from "react";
import Graph from "react-vis-network-graph";

import { org, relationShipTypes } from "./constant/org";
import "./index.css";



const getColorByType = (type) => {
  console.log(type);
  switch (type) {
    case relationShipTypes.HARD_SKILLS:
      return '#476148';
    case relationShipTypes.MENTORSHIP:
      return '#BF3088';
    case relationShipTypes.OPERATIONAL:

      return '#BF3088';
    case relationShipTypes.PROJECT:

      return '#000000';
    case relationShipTypes.SOFT_SKILLS:
      return '#D0B84E';
    default:
      return 'black';
  }
}

const App = (props) => {

  const generateEdges = () => {
    return org.map((connection) => {
      return connection.parentPersons.map(parent => {        
        return ({ from: connection.id, to: parent.id, color: { color: getColorByType(parent.type) } })})
    }).flat();
  };
  
  const graph = {
    nodes: org,
    edges: generateEdges(),
  };

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  return (
    <div>
      <Graph
        graph={graph}
        options={options}
      />
    </div>
  );
};

export default App;
