import React, { useState, useEffect } from "react";
import "./styles/index.css";
import "./styles/chart.css";

import { OrgChartComponent } from "./components/OrgChart";
import * as d3 from "d3";

const App = (props) => {
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;

  function addNode() {
    const node = {
      nodeId: "testtt",
      parentNodeId: "O-1",
      width: 330,
      height: 147,
      borderWidth: 1,
      borderRadius: 5,
      nodeImage: {
        url:
          "./assets/user_icon.png",
        width: 500,
        height: 100,
        centerTopDistance: 0,
        centerLeftDistance: 0,
        cornerShape: "ROUNDED",
        shadow: true,
        borderWidth: 0
      },
      nodeIcon: {
        icon: "https://to.ly/1yZnX",
        size: 30
      },
      connectorLineColor: {
        red: 220,
        green: 189,
        blue: 207,
        alpha: 1
      },
      connectorLineWidth: 100,
      dashArray: "",
      expanded: false,
      template: `
        <div class="template">
          <div class"template-root">Added Root Child </div>
          <div class"template-position">Added position </div>
          <div class"template-unit">Added unit</div>
          <div class"template-office">
            <div>Added office</div>
            <div class"template-area">Added area</div>
          </div>
        </div>
      `
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    console.log("d3", d3.event);
    alert("clicked " + nodeId);
  }

  useEffect(() => {
    d3.json(
      "https://gist.githubusercontent.com/bumbeishvili/dc0d47bc95ef359fdc75b63cd65edaf2/raw/c33a3a1ef4ba927e3e92b81600c8c6ada345c64b/orgChart.json"
    ).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <button onClick={() => addNode()}>add node as root's child</button>
      <OrgChartComponent
        setClick={(click) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
        data={data}
      />
    </div>
  );
};

export default App;
