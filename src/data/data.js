import indexPage from "./pages/index";
// import indexSections from './sections/indexSections'
import dynForm from "./components/dynForm";
import list from "./components/list";
import menu from "./components/menu";
import modal from "./layout/modal";
import accordion from "./components/accordion";
import table from "./components/table";
import tabs from "./components/tabs";
import drawer from "./components/drawer";
import skeleton from "./components/skeleton";
import tooltip from "./components/tooltip";
import rating from "./components/rating";
import pagination from "./components/pagination";
import carousel from "./components/carousel";
import countdown from "./components/countdown";
import steps from "./components/steps";
import timeline from "./components/timeline";

export const contextData = {
  "/index.html": { ...indexPage, dynForm, list, menu, modal, accordion, table, tabs, drawer, skeleton, tooltip, rating, pagination, carousel, countdown, steps, timeline },
};
