import Highway from "@dogstudio/highway";
import gsap from "gsap";



class PageTransition extends Highway.Transition {
    in({ from, to, done }) {
        window.scrollTo(0, 0);
        from.remove();

        const tl = gsap.timeline();
        tl
        .from(['.page-title-char'], {
            duration: 1,
            yPercent: -100,
            ease: "power4",
            stagger: 0.045
        },0.0)
        .fromTo(['.bg-segment'], 0.5, { 
            width: '0%',
            ease: "power4"
        },
        {
            width: '100%',
            stagger: 0.25,
            onComplete: function() {
                console.log("In")
                const changeColor = () => {
                    const bgColor = to.dataset.page;
                    document.body.className = "";
                    document.body.classList.add("body-" + bgColor);
                }
                changeColor();
                done();
            }
        }, 0.0)
        .to(['.images-well img'], { 
            duration: 0.5,
            autoAlpha: 1,
            ease: "power4",
        });
    }

    out({ from, done }) {
        // Tween.fromTo(from, 0.5,
        //   { opacity: 1 },
        //   {
        //     opacity: 0,
        //     onComplete: function() {
        //         console.log("out")
        //         done();
        //     }
        //   }
        // );
        // console.log('out')
        done();
    }
}

export default PageTransition;