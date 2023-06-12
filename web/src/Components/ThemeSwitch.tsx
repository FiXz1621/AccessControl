import { useEffect, useState } from 'react';
import './CssComponents/ThemeSwitch.css'

const ThemeSwitch = (props: any) => {

  //Leave the switch fixed when the page is reloaded
    useEffect(() => {
      if(localStorage.getItem('theme') === 'dark') {
        document.getElementById('check-theme')?.removeAttribute('checked');
      }else {
        document.getElementById('check-theme')?.setAttribute('checked', 'true');
      }
    }, [props.theme]);

    return (
        //Switch to change theme from light to dark
        <div className="form-check form-switch">
            <input onClick={props.handleSwitch} className="form-check-input static-switch"
                type="checkbox" role="switch" id="check-theme" />
        </div>
    );
}

export default ThemeSwitch;
