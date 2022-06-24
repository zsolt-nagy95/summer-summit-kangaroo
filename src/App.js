/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Graph from "./vendor/src";
import RelationshipFilters from "./components/RelationshipFilters";
import AddRelation from "./components/AddRelation";
import useDebounce from "./hooks/useDebounce";

import { org, getColorByType } from "./constant/org";
import "./index.css";

const App = (props) => {
  const [orgs, setOrgs] = useState(org);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const generateEdges = (or) => {
    return or.map((connection) => {
      return connection.parentPersons.map(parent => {
        return ({ from: connection.id, to: parent.id, color: { color: getColorByType(parent.type) } })
      })
    }).flat();
  };

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
    height: "768px",
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
        <Graph
          graph={{
            nodes: orgs,
            edges: generateEdges(orgs),
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default App;
