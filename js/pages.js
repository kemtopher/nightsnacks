import Highway from "@dogstudio/highway";
import gsap from "gsap";
import $ from 'jquery';


class PageTransition extends Highway.Transition {
    in({ from, to, done }) {
        // window.scrollTo(0, 0);
        from.remove();

        function removeClass (targetClass) {
            const imageGroup = document.querySelectorAll('.images-well img');

            imageGroup.forEach(el => {
                el.classList.remove(targetClass);
            })
        }

        const title = document.querySelector('.current-title');
        title.addEventListener('click', (e) => {
            window.location.assign('/');
        })

        function getBgColor () {
            const bgColor = to.dataset.page;
            document.body.className = "";
            document.body.classList.add("body-" + bgColor);
        }
        function followTheMouse () {
            // const mouseFollow = document.querySelector('#mouse-follow');

            // document.addEventListener('mousemove', (e) => {
            // mouseFollow.style.cssText = `
            //     left: ${e.clientX - 25}px;
            //     top:  ${e.clientY - 25}px;
            // `;
            // });

            var targets = document.querySelectorAll(".targetClass");

            targets.forEach( x => {
                function handlerIn (e) {
                    const attribute = this.getAttribute('src');
                    // document.querySelector('#mouse-follow').innerHTML = attribute;
                    console.log(attribute);
                }
                function handlerOut () {
                    // document.querySelector('#mouse-follow').innerHTML = '';
                }
                $( x ).mouseenter( handlerIn ).mouseleave( handlerOut );
            })
        }
        // function dddd () {
        //     var targets = document.querySelectorAll(".targetClass");

        //     targets.forEach( x => {
        //         // x.addEventListener("mouseover", (e) => {
        //         //     // e.target.setAttribute("style", "opacity: 0.5;")
        //         //     const attribute = e.target.getAttribute('src');
        //         //     console.log(attribute);
        //         //     // document.querySelector('#mouse-follow').innerHTML = attribute;
        //         // });
        //         function handlerIn () {
        //             const attribute = this.getAttribute('src');
        //             console.log(attribute);
        //         }
        //         function handlerOut () {
        //             console.log("out");
        //         }
        //         $( x ).mouseenter( handlerIn ).mouseleave( handlerOut );
        //     })
        // }
        
        const tl = gsap.timeline({
            onComplete: async () => {
                await getBgColor();
                await removeClass('inactive-card');
                await followTheMouse();
                await done();
            }
        });

        tl
        .from('.page-title-char', {
            duration: 1,
            ease: "power4",
            yPercent: -100,
            stagger: 0.045
        },0.0)
        .fromTo('.bg-segment', { 
            width: '0%'
        },
        {
            duration: 2.5,
            width: '100%',
            ease: "power4",
            stagger: 0.25
        }, 0.0)
        .fromTo('#skoot', { 
            width: '0%'
        },
        {
            duration: 2.5,
            width: '100%',
            ease: "power4"
        }, 0.0);
    }

    out({ from, done }) {
        done();
    }
}

export default PageTransition;