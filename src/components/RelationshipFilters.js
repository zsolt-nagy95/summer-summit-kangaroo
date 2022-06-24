import { useState } from "react";
import { getColorByType, relationShipTypes } from "../constant/org";
import RelationshipFilter from "./RelationshipFilter";

const filters = [
    {label: 'Hard Skills', id: relationShipTypes.HARD_SKILLS, color: getColorByType(relationShipTypes.HARD_SKILLS)},
    {label: 'Soft Skills', id: relationShipTypes.SOFT_SKILLS, color: getColorByType(relationShipTypes.SOFT_SKILLS)},
    {label: 'Operational', id: relationShipTypes.OPERATIONAL, color: getColorByType(relationShipTypes.OPERATIONAL)},
    {label: 'Project', id: relationShipTypes.PROJECT, color: getColorByType(relationShipTypes.PROJECT)},
    {label: 'Mentorship', id: relationShipTypes.MENTORSHIP, color: getColorByType(relationShipTypes.MENTORSHIP)},
]

const RelationshipFilters = ({onFilterStateChange}) => {
    const [filterStates, setFilters] = useState({
        [relationShipTypes.HARD_SKILLS]: true,
        [relationShipTypes.SOFT_SKILLS]: true,
        [relationShipTypes.OPERATIONAL]: true,
        [relationShipTypes.PROJECT]: true,
        [relationShipTypes.MENTORSHIP]: true,
    });

    const changeFilterState = (filterType) => {
        setFilters(currentFilters => {
            const newState = {...currentFilters, [filterType]: !currentFilters[filterType]};
            onFilterStateChange(newState);
            return newState
        })
    }

    return <div style={{display: 'flex'}}>
       {filters.map(filter => (
            <RelationshipFilter 
                value={filterStates[filter.id]}
                onChange={() => changeFilterState(filter.id)} 
                color={filter.color} 
                label={filter.label} />
        ))}
    </div>
}

export default RelationshipFilters;