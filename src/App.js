/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Graph from "./vendor/src";
import RelationshipFilters from "./components/RelationshipFilters";
import AddRelation from "./components/AddRelation";
import useDebounce from "./hooks/useDebounce";

import { org, getColorByType } from "./constant/org";
import "./index.css";

import Javier from "./images/Javier.svg";
import David from "./images/David.svg";
import Elizabeth from "./images/Elizabeth.svg";
import Zsolt from "./images/Zsolt.svg";
import Natalie from "./images/Natalie.svg";
import Viktor from "./images/Viktor.svg";
import Z from "./images/Z.svg";
import Nick from "./images/Nick.svg";

const App = (props) => {
  const [orgs, setOrgs] = useState(org);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [nodes, setNodes] = useState(null);


  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const generateEdges = (or) => {
    return or.map((connection) => {
      return connection.parentPersons.map(parent => {
        return ({ from: connection.id, to: parent.id, color: { color: getColorByType(parent.type) } })
      })
    }).flat();
  };

  const generateNodes = () => {
    const nodes = org.map((org) => {
      const image = getImageDataURL(org.id);
      return {
        ...org,
        image: image,
        shape: "image",
        size: 65,
        label: "",
      };
    });
    setNodes(nodes);
  };

  function getImageDataURL(id) {
    switch (id) {
      case 1: 
      return Nick;
      case 2: 
      return Z;
      case 3:
        return Javier;
      case 4:
        return Natalie;
      case 5:
        return Zsolt;
      case 6:
        return Viktor;
      case 7:
        return Elizabeth;
      case 8:
        return David;
      default:
        return Zsolt;
    }
  }

  useEffect(() => {
    generateNodes();
  }, []);

  const options = {
    layout: {
      hierarchical: true,
      clusterThreshold: 500,
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
    height: "800px",
    width: "100%",
    physics: {
      enabled: true,
      stabilization: false
    }
  };


  useEffect(
    ()  => {
      const updatedOrgs = org.filter(or => [...or.hardSkills, ...or.softSkills].some(predicete => predicete.indexOf(searchTerm) >= 0));
      console.log(updatedOrgs);
      setOrgs(updatedOrgs);
    },
    [searchTerm] // Only call effect if debounced search term changes
  );


  console.log(orgs);

  return (
    <div style={{ height: '100%' }}>
      <input onChange={(evt) => setSearchTerm(evt.target.value)}></input>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <RelationshipFilters onFilterStateChange={(filters) => console.log({ filters })} />
        <AddRelation onAdd={e => console.log(e)} />
        {nodes && (
        <Graph
        graph={{
          nodes: nodes,
          edges: generateEdges(org),
        }}
        options={options}
      />
        )}
      </div>
    </div>
  );
};

export default App;
