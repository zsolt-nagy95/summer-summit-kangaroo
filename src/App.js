/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Graph from "./vendor/src";

import { org, relationShipTypes } from "./constant/org";
import useDebounce from "./hooks/useDebounce";
import { uniqueId } from "lodash";

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
  const [orgs, setOrgs] = useState(org);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const generateEdges = () => {
    return orgs.map((connection) => {
      return connection.parentPersons.map(parent => {
        return ({ from: connection.id, to: parent.id, color: { color: getColorByType(parent.type) } })
      })
    }).flat();
  };

  const options = {
    layout: {
      hierarchical: true,
      allowRedraw: true,
    },
    edges: {
      color: "#000000"
    },
    height: "768px"
  };


  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        if (debouncedSearchTerm.length > 3) {
          const updatedOrgs = org.filter(or => or.hardSkills.includes(debouncedSearchTerm) || or.softSkills.includes(debouncedSearchTerm));
          console.log(updatedOrgs);
          setOrgs(updatedOrgs);
                }
        setLoading(false);
      } else {
        setOrgs(org);
        setLoading(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );


  return (
    <div style={{ height: '100%' }}>
      <input onChange={(evt) => setSearchTerm(evt.target.value)}></input>
      {isLoading && <div>Loading....</div>}
      {!isLoading &&
        <Graph
          graph={{
            nodes: orgs,
             edges: generateEdges(),
          }}
          options={options}
        />
      }
    </div>
  );
};

export default App;
