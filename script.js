document.body.classList.add("loading");
let scroll;

function initScroll() {
  scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

function loaderAnimation() {

  const tl = gsap.timeline({
    onComplete: () => {

    document.querySelector("#preloader").remove();

    document.body.classList.remove("loading");

    gsap.set("#main", { opacity: 1 });

    initScroll();

    setTimeout(() => {
      scroll.update();
      firstPageAnim();
    }, 200);
  }
  });

  tl.to(".loader-text", {
    y: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
  })

  .to({}, { duration: 0.4 })

  .to(".loader-panel", {
    y: "-100%",
    duration: 1.2,
    ease: "power4.inOut"
  })

  .to("#preloader", {
    y: "-100%",
    duration: 1,
    ease: "power4.inOut"
  }, "-=1");

}


window.addEventListener("load", function() {
  loaderAnimation();
});


function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })
  .to("#hero", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 2,
    delay: -1,
    stagger: .2
  })
  .from("#herofooter", {
    y: -10,
    opacity: 0,
    delay: -1,
    duration: 1.5,
    ease: Expo.easeInOut
  })

  console.log("Hero Animation Running");  
}
var timeout;

function circleSkew() {
  let timeout;
  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (dets) {

    clearTimeout(timeout);

    let xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    let yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    gsap.to("#minicircle", {
      x: dets.clientX,
      y: dets.clientY,
      scaleX: xscale,
      scaleY: yscale,
      duration: 0.2,
      ease: "power3.out"
    });

    timeout = setTimeout(function () {
      gsap.to("#minicircle", {
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    }, 100);
  });
}

circleSkew();

document.querySelectorAll(".elem").forEach(function(elem){
  let rotate = 0;

  elem.addEventListener("mouseleave", function(){
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power2.out",
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function(dets){
    const bounds = elem.getBoundingClientRect();
    
    const x = dets.clientX - bounds.left;
    const y = dets.clientY - bounds.top;

    const diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      left: x,
      top: y,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      ease: "power2.out",
    });
  });
});
