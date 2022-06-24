
import React, {useEffect, useState} from "react";
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <RelationshipFilters onFilterStateChange={(filters) => console.log({ filters })} />
        <AddRelation onAdd={e => console.log(e)} />
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
    </div>
  );
};

export default App;
