import indexPage from './pages/index'
// import indexSections from './sections/indexSections'
import dynForm from './components/dynForm'
import list from './components/list'
import menu from './components/menu'
import modal from "./layout/modal";
import accordion from './components/accordion';
import table from './components/table'
import tabs from './components/tabs'
import drawer from './components/drawer';

export const contextData = {
  "/index.html": { ...indexPage, dynForm, list, menu, modal, accordion, table, tabs, drawer },
};
