import React from "react";

function FormCategorie({ categories, selectedCategories, handleCheckboxChange }) {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    handleCheckboxChange(name, checked);
  };

  return (
    <div className="row mb-3">
      <div className="col">
        {Object.entries(categories).map(([name, label]) => (
          <div className="form-check" key={name}>
            <input
              className="form-check-input"
              type="checkbox"
              name={name}
              id={`flexCheck${name}`}
              checked={selectedCategories[name]}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`flexCheck${name}`}>
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormCategorie;
