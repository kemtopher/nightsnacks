import Highway from "@dogstudio/highway";
import PageTransition from "./pages.js";

const H = new Highway.Core({
  transitions: {
    default: PageTransition
  }
});