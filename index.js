
const body = document.querySelector('body');
const main = {'dom' :document.querySelector('.main'), 'next': null};
const aboutMe = {'dom':document.querySelector('.aboutMe'),'prev': null,'next':null};
const projects = {'dom':document.querySelector('.projects'),'prev':null,'next':null};
const moreAboutMe = {'dom':document.querySelector('.additionalInfo'), 'prev':null};
const mainText = document.querySelector('#mainText');
const imgMe = document.querySelector('#imgMe');
const aboutMeBox = document.querySelectorAll('.aboutMeBox');
const aboutMeText = document.querySelectorAll('.aboutMeText');
const projectsBox = document.querySelectorAll('.projects-container');
const projectsText = document.querySelectorAll('.projects-text');

let canScroll = true;

main.next = aboutMe;
aboutMe.prev = main;
aboutMe.next = projects;
projects.prev = aboutMe;
projects.next = moreAboutMe;
moreAboutMe.prev = projects;

const arrowUp = document.querySelector('.arrowUp');
const arrowDown = document.querySelector('.arrowDown');

let prevSlide;
let curSlide=main;
let nextSlide=aboutMe;


body.addEventListener('wheel',(event)=>{
    if(event.deltaY>0 && canScroll){
        scrollLock();
        return moveUp();
    }
    else if(event.deltaY<0 && canScroll){
        scrollLock();
        return moveDown();
    }
})
arrowDown.addEventListener('click',moveUp)
arrowUp.addEventListener('click',moveDown)

function moveUp(){
    if (nextSlide){
        curSlide.dom.classList.toggle('moveUp');
        if (curSlide.dom.classList.contains('moveDown')){
            curSlide.dom.classList.toggle('moveDown');
        }
        prevSlide = curSlide;
        curSlide = nextSlide;
        nextSlide = curSlide.next;
        // console.log('moving up');
        // console.log(prevSlide);
        // console.log(curSlide);
        // console.log(nextSlide);
        displayArrow();
    }
    
}

function moveDown(){
    if(prevSlide){
        prevSlide.dom.classList.toggle('moveDown');
        if (prevSlide.dom.classList.contains('moveUp')){
            prevSlide.dom.classList.toggle('moveUp');
        }
        nextSlide=curSlide;
        curSlide=prevSlide;
        prevSlide=curSlide.prev;
        // console.log('moving down');
        // console.log(prevSlide);
        // console.log(curSlide);
        // console.log(nextSlide);
        displayArrow();
    }
}

function displayArrow(){
    if (curSlide===main){
        arrowUp.hidden = true;
        arrowDown.hidden = false;
    }
    else if(curSlide===moreAboutMe){
        arrowUp.hidden = false;
        arrowDown.hidden = true;
    }
    else{
        arrowUp.hidden = false;
        arrowDown.hidden = false;
    }

}

function showText(text,time){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(text)
            },time
        )
    })
}

async function displayMainText(){
    mainText.innerHTML = await showText('<h1 class="fade-in">Hi!</h2>',500);
    mainText.innerHTML = await showText('<h1 class="fade-in">My name is Yu Song</h2>',2500);
    mainText.innerHTML = await showText('<h1 class="fade-in">This is me!</h2>',2500);
    imgMe.hidden = false;
    imgMe.classList.add('fade-in');
    mainText.innerHTML = await showText('<h1 class="fade-in">Scroll down to know more about me!</h2>',2500);
}

async function scrollLock(){
    canScroll=false;
    await new Promise(resolve=>setTimeout(()=>resolve(),1250));
    canScroll=true;
}


displayMainText();

for (let i=0;i<aboutMeBox.length;i++){

    aboutMeBox[i].addEventListener('mouseover',function (){

        aboutMeText[i].hidden = false;
    });
    aboutMeBox[i].addEventListener('mouseleave',function (){
        aboutMeText[i].hidden = true;
    });
}


hideProjects();

function hideProjects(){
    if (window.matchMedia("(max-width:800px)").matches){
        projectsText[3].innerText = 'A game made using Unity where you control a spaceship and shoot down incoming asteriods';
        projectsText[5].innerText = 'A script written in python to help me automate my download of files from my school website';
        for (let i=0;i<projectsBox.length;i++){
            projectsText[i].hidden = true;
            if (i===5){
                
            }
            projectsBox[i].addEventListener('mouseover',function (){
                projectsText[i].hidden = false;
            });
            projectsBox[i].addEventListener('mouseleave',function (){
                projectsText[i].hidden = true;
            });
        }
    }


}

