import './App.css';
import React, { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {

  const [wage_total, setWage_total] = useState(0);
  const [wage_taxes_total, setWage_taxes_total] = useState(0);
  const [wage_increments_total, setWage_increments_total] = useState(0);

  const [wage_base, setWage_base] = useState(2500);

  //Shift counters
  const [shift_day_mon_sat, setShift_day_mon_sat] = useState(0);
  const [shift_night_mon_fri, setShift_night_mon_fri] = useState(0);
  const [shift_night_sat, setShift_night_sat] = useState(0);
  const [shift_day_sun, setShift_day_sun] = useState(0);
  const [shift_night_sun, setShift_night_sun] = useState(0);
  const [shift_public_holiday, setShift_public_holiday] = useState(0);

  //Overtime
  const [shift_overtime_50, setShift_overtime_50] = useState(0);
  const [shift_overtime_100, setShift_overtime_100] = useState(0);
  const [shift_overtime_150, setShift_overtime_150] = useState(0);
  const [shift_overtime_200, setShift_overtime_200] = useState(0);

  const [shift_overtime_evening, setShift_overtime_evening] = useState(0);  //16-22:00
  const [shift_overtime_night, setShift_overtime_night] = useState(0);      //22:00-06
  const [shift_additional_increments, setShift_additional_increments] = useState(0);      //22:00-06

  //Fine tuning variables
  const [wage_evening_comp, setWage_evening_comp] = useState(4.67);
  const [wage_night_comp, setWage_night_comp] = useState(wage_evening_comp * 2);
  const [wage_sunday_comp, setWage_sunday_comp] = useState(0); //calculated in useEffect, also the hourly pay
  const [wage_employee_pension, setWage_employee_pension] = useState(0.0719);
  const [wage_unemployment_insurance, setWage_unemployment_insurance] = useState(0.0136);
  const [wage_tax_percent, setWage_tax_percent] = useState(0.288);



  useEffect(() => {    // Update the document title using the browser API   
    document.title = `You're getting paid ${wage_total.toFixed(2)}€`;  

    //setWage_tax_percent(wage_base * 2);
    setWage_sunday_comp(Number(wage_base/157.95868));

    setWage_total(Number(wage_base) + Number(wage_increments_total));
    setWage_taxes_total (Number(wage_total * (Number(wage_employee_pension) + Number(wage_unemployment_insurance) + Number(wage_tax_percent))));
    setWage_increments_total(
      (Number(shift_day_mon_sat) * Number(wage_evening_comp)) //mon-sat day
    + (Number(shift_night_mon_fri) * (Number(wage_evening_comp) * 3 + Number(wage_night_comp) * 8)) //mon-fri night
    + (Number(shift_night_sat) * (Number(wage_evening_comp) * 3 + Number(wage_night_comp) * 8 + Number(wage_sunday_comp) * 7))
    + (Number(shift_day_sun) * (Number(wage_sunday_comp) * 12))
    + (Number(shift_night_sun) * (Number(wage_evening_comp) * 3 + Number(wage_night_comp) * 8 + Number(wage_sunday_comp) * 5))
    + (Number(shift_public_holiday) * (Number(wage_evening_comp) * 3 + Number(wage_night_comp) * 8 + Number(wage_sunday_comp) * 12))
    + (Number(shift_overtime_50) * (Number(wage_sunday_comp) * 1.5))
    + (Number(shift_overtime_100) * (Number(wage_sunday_comp) * 2))
    + (Number(shift_overtime_150) * (Number(wage_sunday_comp) * 2.5))
    + (Number(shift_overtime_200) * (Number(wage_sunday_comp) * 3))
    + (Number(shift_overtime_evening) * Number(wage_evening_comp))
    + (Number(shift_overtime_night) * Number(wage_night_comp))
    + (Number(shift_additional_increments))
    );

  },[wage_total, wage_base, wage_evening_comp, wage_employee_pension, wage_unemployment_insurance, wage_tax_percent, shift_day_mon_sat, shift_night_mon_fri, wage_night_comp, wage_increments_total, shift_additional_increments, shift_day_sun, shift_night_sat, shift_night_sun, shift_overtime_50, shift_overtime_evening, shift_overtime_night, shift_public_holiday, wage_sunday_comp, shift_overtime_100, shift_overtime_150, shift_overtime_200]);

  function toFixed( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Wage before taxes {toFixed(wage_total, 2)} <br/>
        Taxes {toFixed(wage_taxes_total, 2)}<br/>
        Wage increments {toFixed(wage_increments_total, 2)}<br/>
        Wage after taxes {toFixed((wage_total - wage_taxes_total), 2)}<br/>
        Hourly wage {toFixed(wage_sunday_comp, 2)}</p>
        <hr/>

        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Basic information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={'span'}>
              <form> 
                <label>
                  Base wage<br/>
                  <input
                    type="text"
                    value={wage_base}
                    onChange={event => setWage_base(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Day shifts between Mon - Sat<br/>
                  <input
                    type="text"
                    value={shift_day_mon_sat}
                    onChange={event => setShift_day_mon_sat(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Night shifts between Mon - Fri<br/>
                  <input
                    type="text"
                    value={shift_night_mon_fri}
                    onChange={event => setShift_night_mon_fri(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Saturday night shifts<br/>
                  <input
                    type="text"
                    value={shift_night_sat}
                    onChange={event => setShift_night_sat(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Sunday day shifts<br/>
                  <input
                    type="text"
                    value={shift_day_sun}
                    onChange={event => setShift_day_sun(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Sunday night shifts<br/>
                  <input
                    type="text"
                    value={shift_night_sun}
                    onChange={event => setShift_night_sun(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Public holidays<br/>
                  <input
                    type="text"
                    value={shift_public_holiday}
                    onChange={event => setShift_public_holiday(event.target.value)}
                  />
                </label>
                <br/>
              </form> 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Overtime</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={'span'}>
              <form> 
                <label>
                  Overtime 50%<br/>
                  <input
                    type="text"
                    value={shift_overtime_50}
                    onChange={event => setShift_overtime_50(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Overtime 100%<br/>
                  <input
                    type="text"
                    value={shift_overtime_100}
                    onChange={event => setShift_overtime_100(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Overtime 150%<br/>
                  <input
                    type="text"
                    value={shift_overtime_150}
                    onChange={event => setShift_overtime_150(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Overtime 200%<br/>
                  <input
                    type="text"
                    value={shift_overtime_200}
                    onChange={event => setShift_overtime_200(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Evening overtime hours<br/>
                  <input
                    type="text"
                    value={shift_overtime_evening}
                    onChange={event => setShift_overtime_evening(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Night overtime hours<br/>
                  <input
                    type="text"
                    value={shift_overtime_night}
                    onChange={event => setShift_overtime_night(event.target.value)}
                  />
                </label>
                <br/>
                <label>
                  Additional wage increments<br/>
                  <input
                    type="text"
                    value={shift_additional_increments}
                    onChange={event => setShift_additional_increments(event.target.value)}
                  />
                </label>
                <br/>
              </form> 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Fine tuning</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={'span'}>
                <form> 
                  <label>
                  Evening compensation<br/>
                  <input
                    type="text"
                    value={wage_evening_comp}
                    onChange={event => setWage_evening_comp(event.target.value)}
                  />
                  </label>
                  <br/>        
                  <label>
                    Night compensation<br/>
                    <input
                      type="text"
                      value={wage_night_comp}
                      onChange={event => setWage_night_comp(event.target.value)}
                    />
                  </label>
                  <br/>        
                  <label>
                    Tax percent<br/>
                    <input
                      type="text"
                      value={wage_tax_percent}
                      onChange={event => setWage_tax_percent(event.target.value)}
                    />
                  </label>
                  <br/>        
                  <label>
                    Employee pension<br/>
                    <input
                      type="text"
                      value={wage_employee_pension}
                      onChange={event => setWage_employee_pension(event.target.value)}
                    />
                  </label>
                  <br/>        
                  <label>
                    Unemployment insurance<br/>
                    <input
                      type="text"
                      value={wage_unemployment_insurance}
                      onChange={event => setWage_unemployment_insurance(event.target.value)}
                    />
                  </label>
                </form>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </header>
    </div>
  );
}

export default App;
