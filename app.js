import listLink from "./data.js";

const linkBtns = document.querySelectorAll('.link-btn');
const subMenu = document.querySelector('.submenu');
const section = document.querySelector('section');
const header = document.querySelector('.header-container');

const hamburgerIcon = document.querySelector('.hamburger-icon');
const sidebar = document.querySelector('.sidebar-b2');
const sidebarHeader = document.querySelector('.sidebar-header')
const buttonClose = document.querySelector('.button-close');

const subMenuF = () => {
  
  linkBtns.forEach( btns => {
    btns.addEventListener('mouseover' , (e) => {
      const text = e.currentTarget.textContent;
      const tempBtn = e.currentTarget.getBoundingClientRect();


      const center = (tempBtn.left + tempBtn.right) / 2;
      const bottom = tempBtn.bottom - 0;

      const tempPage = listLink.find( link => link.page === text);
  
      if (tempPage) {
        const { page , link } = tempPage;
  
        subMenu.classList.add('show');
        subMenu.style.left = `${center}px`;
        subMenu.style.top = `${bottom}px`;
  
        let columns = 'col-2';
  
        if (link.length === 3) {
          columns = 'col-3';
        }
        if (link.length > 3) {
          columns = 'col-4';
        }
  
        subMenu.innerHTML = `<section>
        <h4>${page}</h4>
        <div class="submenu-center ${columns}">
        ${link.map( (link) => {
          return `<a href="${link.url}">
                    <i>${link.icon}</i>
                    ${link.label}
                  </a>`
          }).join('')}
        </div>
      </section>`
      }
    })
  })
};


sidebar.innerHTML = listLink.map( item => {
  const { link , page } = item ;

  return `<section class="section-sidebar">
            <h4 class="h4-sidebar">${page}</h4>
            ${link.map( link => {
              return `<a href="" class="title-sidebar">
                        <i>${link.icon}</i>
                        <p>${link.label}</p>
                      </a>`
            }).join("")}
          </section>`
}).join("");

hamburgerIcon.addEventListener('click' , () => {
  sidebarHeader.classList.add('show');
});

buttonClose.addEventListener('click' , () => {
  sidebarHeader.classList.remove('show');
})


const headerContainer = () => {

  const scrollY = window.pageYOffset;
  const containerHeader = document.getElementById('container-header');

    containerHeader.classList.toggle('header-container-change' , scrollY > 80);
    containerHeader.classList.toggle('header-container' , !(scrollY > 80));

}


// ********************* class ************************
class tilt {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.element = this.container.querySelector('.tilt-element');
    this.glareElement = this.element.querySelector('.rr')


    this.init();
    this.setupEventListeners();
  }

  init() {

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation' , this.handleDeviceOrientation.bind(this));
    } else {
      this.container.addEventListener('mousemove' , this.handleMouseMove.bind(this));
      this.container.addEventListener("mouseleave" , this.resetTransform.bind(this));
    }

  }

  setupEventListeners() {
    this.container.addEventListener('click' , this.handleContainerClick.bind(this))
  }

  handleMouseMove(e) {
    const {clientX , clientY } = e;
    const containerRect = this.container.getBoundingClientRect();
    const offsetX = (clientX - containerRect.left) / containerRect.width - 0.5 ;
    const offsetY = (clientY - containerRect.top) / containerRect.height - 0.5 ; 

    const tiltValue = 80;
    const transformValue = `rotateX(${tiltValue * offsetY}deg) rotateY(${tiltValue * offsetX}deg)`;

    this.element.style.transform = transformValue;

    // Adjust glare position based on mouse movement
    const glareTransformValue = `translate(${-offsetX * 500}px, ${-offsetY * 500}px)`;
    this.glareElement.style.transform = glareTransformValue;

  }

  handleDeviceOrientation(e) {
    const tiltValue = 80;
    const offsetX = (e.beta || 0) / 400;
    const offsetY = (e.gamma || 0) / 400;

    const transformValue = `rotateX(${tiltValue * offsetY}deg) rotateY(${tiltValue * offsetX}deg)`;
    this.element.style.transform = transformValue;

    const glareTransformValue = `translate(${-offsetX * 400}px, ${-offsetY * 400}px)`;
    this.glareElement.style.transform = glareTransformValue;
  }

  resetTransform() {
    this.element.style.transform = "none";
    this.glareElement.style.transform = "none";
  }

  handleContainerClick() {
    alert('container clicked!')
  }
  
};

const tiltr = new tilt('.tilt-container');


// ************* show function ****************
subMenuF();




// ************ window listener *****************


window.addEventListener('scroll' , () => {
  headerContainer();
})



section.addEventListener('mouseover' , () => {
    subMenu.classList.remove('show');
});

header.addEventListener('mouseover' , e => {
  if (!e.target.classList.contains('link-btn')) {
    subMenu.classList.remove('show');
  }
})