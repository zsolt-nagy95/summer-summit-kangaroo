import React from "react";
import Graph from "react-vis-network-graph";
import RelationshipFilters from "./components/RelationshipFilters";

import { org, getColorByType } from "./constant/org";
import "./index.css";

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
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <RelationshipFilters onFilterStateChange={(filters) => console.log({filters})} />
      <Graph
        graph={graph}
        options={options}
      />
    </div>
  );
};

export default App;
