import React, { useState, useEffect } from "react";
import "./index.css";

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
          "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
        width: 100,
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
      connectorLineWidth: 5,
      dashArray: "",
      expanded: false,
      template: `<div>
                  <div style="margin-left:80px;
                              margin-top:10px;
                              font-size:20px;
                              font-weight:bold;
                         ">Added Root Child </div>
                 <div style="margin-left:80px;
                              margin-top:3px;
                              font-size:16px;
                         ">Added position </div>

                 <div style="margin-left:80px;
                              margin-top:3px;
                              font-size:14px;
                         ">Added unit</div>

                 <div style="margin-left:200px;
                             margin-top:15px;
                             font-size:13px;
                             position:absolute;
                             bottom:5px;
                            ">
                      <div>Added office</div>
                      <div style="margin-top:5px">Added area</div>
                 </div>
              </div>`
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
      Click node to trigger action in parent or &nbsp;
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
