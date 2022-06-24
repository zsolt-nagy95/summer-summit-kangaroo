const RelationshipFilter = ({label, color, value, onChange}) => {

    return <div style={{display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" checked={value} onChange={onChange} style={{transform: 'scale(1.25)', marginRight: '4px'}} />
        <label>{label}</label>
        <div style={{
            position: 'relative', 
            height: '8px', 
            width: '51px', 
            marginLeft: '4px',
            top: '-3px',
            borderBottom: `3px solid ${color}`}}></div>
    </div>
}

export default RelationshipFilter;