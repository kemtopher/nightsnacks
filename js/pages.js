import Highway from "@dogstudio/highway";
import gsap from "gsap";
import $ from 'jquery';


class PageTransition extends Highway.Transition {
    in({ from, to, done }) {
        // window.scrollTo(0, 0);
        from.remove();

        function removeClass (targetClass) {
            const imageGroup = document.querySelectorAll('.images-well .targetClass');

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

        function projectTooltip () {
            var tooltip = document.querySelectorAll('.project-title');
            document.addEventListener('mousemove', fn, false);

            function fn(e) {
                for (var i=tooltip.length; i--;) {
                    let offset_x = e.offsetX;
                    let offset_y = e.offsetY + 45;
                    tooltip[i].style.left = offset_x + 'px';
                    tooltip[i].style.top = offset_y + 'px';
                }
            }
        }
        
        const tl = gsap.timeline({
            onComplete: () => {
                getBgColor();
                removeClass('inactive-card');
                // followTheMouse();
                projectTooltip();
                done();
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