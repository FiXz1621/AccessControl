import { useState } from 'react';
import { useEffect } from 'react';
import { Light } from './Styles/Themes';
import { Dark } from './Styles/Themes';

const API_URL = 'http://192.168.1.4/api/v1';
let alertCounter = 0;

//Function to change the theme
export const changeTheme = (theme: string): void => {
  const root = document.documentElement;
  const h2 = document.getElementsByTagName('h2');
  const h3 = document.getElementsByTagName('h3');
  const offcanvasbody = document.getElementsByClassName('offcanvas-body') as HTMLCollectionOf<HTMLElement>;
  const label = document.getElementsByTagName('label');

  root.style.setProperty('--bodyColor', theme === 'dark' ? '#181818' : '#F7F2F6');
  root.style.setProperty('--textColor', theme === 'dark' ? '#fff' : '#252525');
  for (let i = 0; i < h2.length; i++) {
    h2[i].style.setProperty('color', theme === 'dark' ? '#fff' : '#252525');
  }
  for (let i = 0; i < h3.length; i++) {
    h3[i].style.setProperty('color', theme === 'dark' ? '#fff' : '#252525');
  }
  for (let i = 0; i < offcanvasbody.length; i++) {
    offcanvasbody[i].style.setProperty('background-color', theme === 'dark' ? '#181818' : '#F7F2F6');
  }
  for (let i = 0; i < label.length; i++) {
    label[i].style.setProperty('color', theme === 'dark' ? '#fff' : '#252525');
  }
};

//Function to get the current theme and change it
export function useTheme(initialTheme: any) {
  //Initialization of the state and condition to change the theme
  const [theme, setTheme] = useState(initialTheme);

  if (theme === Light) {
    changeTheme('light');
  }
  else {
    changeTheme('dark');
  }

  //useEffect is called when the component is mounted or when the value of initialTheme changes
  useEffect(() => {
    let localTheme = localStorage.getItem('theme');
    let themeStorage = localTheme ? localTheme : initialTheme;
    let themeToApply = themeStorage === 'light' ? Light : Dark;
    setTheme(themeToApply);
  }, [initialTheme]);

  //handleSwitch function is used to switch the theme and store it in local storage
  const handleSwitch = () => {
    if (theme === Light) {
      setTheme(Dark);
      localStorage.setItem('theme', 'dark');
      changeTheme('dark');
    } else {
      setTheme(Light);
      localStorage.setItem('theme', 'light');
      changeTheme('light');
    }

    if (window.location.pathname === '/home')
      window.location.reload();
  };

  //Returns an array with the current theme and the handleSwitch function. 
  //These values can be used in other app components to change and control the theme
  return [theme, handleSwitch];
};

//Function to display a message to the user 
export const alertMessage = (message: string, type: string, container: HTMLElement) => {

  if (alertCounter < 3) {
    alertCounter++;
    const wrapper = document.createElement('div');

    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible alert-warning" role="alert">`,
      `   <div>${message}</div>`,
      '</div>'
    ].join('');

    container.appendChild(wrapper)

    setTimeout(() => {
      wrapper.remove()
      alertCounter--;
    }, 5000);
  }

};

//Function that returns the date in a long format
export function longDate(stringDate: string | null) {
  if (!stringDate) return 'Ninguno';
  const date = new Date(stringDate);
  const locale = navigator.language;
  return Intl.DateTimeFormat(
    locale,
    {
      dateStyle: 'full',
      timeStyle: 'long'
    }
  ).format(date);
}

//Function to get API URL
export function getAPIUrl() {
  return API_URL;
}
