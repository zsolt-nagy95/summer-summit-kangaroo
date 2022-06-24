import React from "react";
import Graph from "react-vis-network-graph";

import { org } from "./constant/org";
import "./index.css";




const App = (props) => {

  const generateEdges = () => {
    return org.map((connection) => {
      return connection.parentPersons.map(parent => ({from: parent.id, to: connection.id}))
    }).flat();
  }


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

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    }
  };


  return (
    <div>
      <Graph
        graph={graph}
        options={options}
        events={events}
      
        getNetwork={network => {
          console.log(network);
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );
};

export default App;
