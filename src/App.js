import React from "react";
import Graph from "react-vis-network-graph";

import { org } from "./constant/org";
import "./styles/index.css";


const App = (props) => {

  const generateEdges = () => {
    return org.map((connection) => {
      return connection.parentPersons.map(parent => ({from: parent.id, to: connection.id}))
    }).flat();
  }

  const graph = {
    nodes: org,
    edges: generateEdges(),
  };

  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 300,
        nodeSpacing: 60,
        treeSpacing: 100,
        blockShifting: true,
        parentCentralization: true,
        edgeMinimization: false,
        sortMethod: "hubsize", // hubsize, directed
        direction: "LR", // UD, DU, LR, RL
      },
    },
    edges: {
      color: {
        color: "#000"
      },
      smooth: {
        type: "continuous"
      },
      width: 1
    },
    nodes: {
      shape: "box",
      widthConstraint: 'auto',
      heightConstraint: 'auto',
      shapeProperties: {
        borderDashes: false, // only for borders
        borderRadius: 10 // only for box shape
      },
      font: "20px arial black",
      color: {
        background: "white",
        border: "#E8E8E8"
      },
    },
    physics: { enabled: true },
    manipulation: {
      enabled: true,
      initiallyActive: true,
      addNode: true,
      addEdge: true,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true
    },
    height: "800px",
    width: "100%"
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