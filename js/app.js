import Highway from "@dogstudio/highway";
import PageTransition from "./pages.js";
import gsap from "gsap";
import $ from 'jquery';

const H = new Highway.Core({
  transitions: {
    default: PageTransition
  }
});

var timeout;
$('body').mousemove(function(e){
  // if(timeout) clearTimeout(timeout);
  // setTimeout(callParallax.bind(null, e), 200);
});

function callParallax(e){
  parallaxIt(e, '.images-well', -50);
}

function parallaxIt(e, target, movement){
  var $this = $('body');
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;
  
  gsap.to(target, 1, {
    x: (relX - $this.width()/2) / $this.width() * movement,
    y: (relY - $this.height()/2) / $this.height() * movement
  })
}

const tl = gsap.timeline({
  onComplete: () => {
      done();
  }
});

tl
// GENERAL TITLE->IN
.from('.page-title-js', {
  duration: 1,
  ease: "power4",
  yPercent: -120,
  stagger: 0.045,
  delay: 0.3
}, 0.0);
