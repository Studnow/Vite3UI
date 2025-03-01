import indexPage from './pages/index'
// import indexSections from './sections/indexSections'
import dynForm from './components/dynForm'
import list from './components/list'
import menu from './components/menu'
import modal from "./layout/modal";
import accordion from './components/accordion';

export const contextData = {
  "/index.html": { ...indexPage, dynForm, list, menu, modal, accordion },
};
