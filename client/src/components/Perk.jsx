import React from "react";

const Perk = ({ name, Icon, choosePerk }) => {
  return (
    <label
      className="h-16 border border-gray-400 rounded-xl flex items-center px-4"
      htmlFor={name}
    >
      <input 
        type="checkbox" 
        name={name} 
        id={name} 
        className="mr-1" 
        onChange={(ev) => {
          ev.target.checked ? 
            choosePerk((selected) => [...selected, name])
            :
            choosePerk((selected) => 
              [...selected.filter((perk) => perk !== name)]
            )
        }}
      />
      <Icon  className="mr-[3px]" />
      <span className="capitalize">{name}</span>
    </label>
  );
};

export default Perk;
