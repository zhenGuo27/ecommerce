import ReactGA from 'react-ga'

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize('UA-123197494-2');
}

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}