//Animation Cards
let animation = document.querySelectorAll('.animation');

function showScroll(){
    let scrollTop = document.documentElement.scrollTop;
    for (let i=0; i < animation.length; i++){
        let heightAnimation = animation[i].offsetHeight;
        if(heightAnimation - -450 < scrollTop){
            animation[i].style.opacity = 1;
            animation[i].classList.add('showUp');
        }
    }
}

window.addEventListener('scroll', showScroll);

/*timeline*/

function qs(selector,all=false){
    return all 
    ? document.querySelectorAll(selector)
     : document.querySelector(selector);
}

const sections = qs(".time-line-description",true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottom = 'calc(100% - 20px)';
let prevScrollY = window.scrollY;
let up,down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e){
    const {scrollY} = window;
    up= scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
    const dist = targetY-timelineRect.top ;

    if(dist && !full){
        set = Math.max(set,dist);
        line.style.bottom = `calc(100% - ${set}px)`;
    }
    if(dist> timeline.offsetHeight +50 && !full){
        full = true;
        line.style.bottom = `-50px`;

    }
    sections.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if(rect.top + item.offsetHeight/5< targetY){
            item.classList.add('show-me');
        }
    });
    prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll',scrollHandler);

