import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [state, setState] = useState({
  
  wage_base: 2500,
  wage_evening_comp: 4.67,
  wage_night_comp: 9.43,
  wage_tax_percent: 0.2,
  wage_employee_pension: 0.0719,
  wage_unemployment_insurance: 0.0136,

  wage_total: 0

  })


  useEffect(() => {    // Update the document title using the browser API   
  document.title = `You're getting paid ${state.wage_base}€`;  
  });


  function handleChangeMultiple(evt) {
    setState({
  
      ...state,
  
      [evt.target.name]: evt.target.value
  
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Wage before taxes {Number(state.wage_base) + Number(state.wage_evening_comp)}</p>
        <p>Taxes {Number(state.wage_base) * (Number(state.wage_tax_percent) + Number(state.wage_employee_pension) + Number(state.wage_unemployment_insurance))}</p>
        <p>Wage after taxes {Number(state.wage_base) -  (Number(state.wage_base) * (Number(state.wage_tax_percent) + Number(state.wage_employee_pension) + Number(state.wage_unemployment_insurance)))}</p>
        <button onClick={handleChangeMultiple}>Update</button>

        <form>
          <label>
            Base wage
            <input
              type="number"
              name="wage_base"
              value={state.wage_base}
              onChange={handleChangeMultiple}
            />
          </label>
          <br/>        
          <label>
            Evening compensation
            <input
              type="number"
              name="wage_evening_comp"
              value={state.wage_evening_comp}
              onChange={handleChangeMultiple}
            />
          </label>
          <br/>        
          <label>
            Night compensation
            <input
              type="number"
              name="wage_night_comp"
              value={state.wage_night_comp}
              onChange={handleChangeMultiple}
            />
          </label>
          <br/>        
          <label>
            Tax percent
            <input
              type="number"
              name="wage_tax_percent"
              value={state.wage_tax_percent}
              onChange={handleChangeMultiple}
            />
          </label>
          <br/>        
          <label>
            Employee pension
            <input
              type="number"
              name="wage_employee_pension"
              value={state.wage_employee_pension}
              onChange={handleChangeMultiple}
            />
          </label>
          <br/>        
          <label>
            Unemployment insurance
            <input
              type="number"
              name="wage_unemployment_insurance"
              value={state.wage_unemployment_insurance}
              onChange={handleChangeMultiple}
            />
          </label>
        </form>
      </header>
    </div>
  );
}

export default App;
