//preloder script-----------------------------------
const SectionEdit = document.querySelectorAll('section.navigation'),
      naviGation= document.querySelectorAll('.navbar li a');
const filterButton = document.querySelectorAll('.projects .projectFilter li'),
projectCards = document.querySelectorAll('.projects .carousel .card'),
projectCarousel = document.querySelector('.projects .carousel');

const scrollBtn = document.querySelector(".scroll-top");
const nameInput = document.querySelector(".contact .right .name input"),
  subjectInput = document.querySelector(".contact .right .subject input"),
  messageInput = document.querySelector(".contact .right .message textarea"),
  messageSend = document.querySelector(".contact .right .submit-btn button");
const viewResume = document.getElementById("viewResume"),
      closeResume = document.getElementById('closeResume');
const socialIcons = document.querySelectorAll('.contact .contact-content .social-icons a');
const mainImage = document.querySelector(".popup-carousel .main-img img"),
slideBtn = document.querySelectorAll(".popup-carousel .nav-item"),
ImgConClose = document.querySelector(".popup-carousel .drp.close"),
slideCheckBox = document.querySelector(".popup-carousel #slideCheckBox"),
subImages = document.querySelectorAll(".popup-carousel .sub-img img");

const displayDialogue = document.querySelector(".projects .postVisitSgt");
const dialogueBox = document.querySelector('.projects .postVisitSgt .dialogue');
const dilogueBoxLink = document.querySelector('.projects .postVisitSgt .dialogue a');
const subImgContainer = document.querySelector(".popup-carousel .image-container .sub-img");
const dialogueBtns = document.querySelectorAll('.postVisitSgt .dialogue .btn button');

let PageTitle = document.title;
let navigatePage = sessionStorage.getItem('navigator'),
currentPage;

naviGation.forEach((navigation,index)=>{
  navigation.addEventListener('click',(e)=>{
    e.preventDefault();
    scrollPage(index);
    sessionStorage.setItem('navigator',index);
  });
});

if(navigatePage){
 scrollPage(navigatePage);
}else{
  scrollPage(0);
}

function scrollPage(currentPage){
  sessionStorage.setItem('navigator',currentPage);
  SectionEdit.forEach(section=>{
    section.classList.remove('active');
    SectionEdit[currentPage].classList.add('active');
  });
  document.querySelectorAll("#navBar li").forEach(navBtn=>{
    navBtn.classList.remove("active");
  });
  document.title = "therpaan || "+document.querySelectorAll("#navBar li")[currentPage].textContent;
  document.querySelectorAll("#navBar li")[currentPage].classList.add("active");
}
document.addEventListener('scroll',(e)=>{
  if (window.scrollY > 500){
  scrollBtn.classList.add('active');
 }else{
  scrollBtn.classList.remove('active');
 }
});
scrollBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
};
// Function to animate typing
function typeWordsWithDelay(wordArray, typingDelay, wordChangeDelay, outputDiv) {
  let index = 0;
  let charIndex = 0;
  let isTyping = true;
  let typingTimeout;

  function animateTyping() {
    if (isTyping) {
      const currentWord = wordArray[index].substr(0, charIndex);
      outputDiv.textContent = currentWord;
      charIndex++;

      if (charIndex > wordArray[index].length) {
        isTyping = false;
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          isTyping = true;
          charIndex = 0;
          index = (index + 1) % wordArray.length;
          animateTyping();
        }, wordChangeDelay);
      } else {
        typingTimeout = setTimeout(() => {
          requestAnimationFrame(animateTyping);
        }, typingDelay);
      }
    }
  }
  animateTyping();
}
function startTypingWhenVisible(element, wordArray, typingDelay, wordChangeDelay) {
  let observer = null;

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      typeWordsWithDelay(wordArray, typingDelay, wordChangeDelay, element);
      observer.disconnect();
    }
  });
  observer.observe(element);
  return observer;
}
const wordArray1 = ['Freelancer', "Web Developer"];
const wordArray2 = ['Freelancer', "Web Developer", "BSc.CSIT Student"];
const typingDelay = 100;
const wordChangeDelay = 1000; 
const homeText = document.querySelector(".home .home-content .text-3 span");
const aboutText = document.querySelector(".about .about-content .right .text span");
const homeObserver = startTypingWhenVisible(homeText, wordArray1, typingDelay, wordChangeDelay);
const aboutObserver = startTypingWhenVisible(aboutText, wordArray2, typingDelay, wordChangeDelay);
homeObserver.observe(homeText);
index = 0; 
charIndex = 0;
isTyping = true;
// typing animation finished

document.querySelector(".logo").onclick = () => {
  SectionEdit.forEach(sect=>{
    sect.classList.remove('active');
  })
 SectionEdit[0].classList.add('active');
 document.title = PageTitle;
}
messageSend.addEventListener("click", (e) => {
  e.preventDefault();
  const isValid = validateInputs();
  if (isValid) {
    const mailInfo = `mailto:darpand263@gmail.com?&subject=${subjectInput.value}&body=My Name is ${nameInput.value}, ${messageInput.value}`;
    window.open(mailInfo, "_blank");
  }
});

function validateInputs() {
  const inputs = [nameInput, subjectInput, messageInput];
  let isValid = true;

  inputs.forEach((input) => {
    input.classList.remove("invalid");
    if (input.value === "") {
      input.classList.add("invalid");
      input.setAttribute("placeholder", `${input.name} field must be filled..`);
      isValid = false;
    }
  });

  return isValid;
}
const messageText = document.getElementById('message');
const characterCount = document.getElementById('count');
characterCount.textContent = 0;
messageText.addEventListener('input', function () {
  characterCount.textContent = messageText.value.length;
});
// projects things
filterButton.forEach(filterProject=>{
  let dataId = filterProject.getAttribute('data-id');
  filterProject.onclick=()=>{
    if(dataId !== 'All'){
      projectCards.forEach(pCards=>{
        let cardDataId = pCards.getAttribute('data-id');
        if(cardDataId === dataId){
          pCards.style.display = "block";
        }else{
          pCards.style.display = "none";
        }
      });
    }else{
      projectCards.forEach(pCards=>{
        pCards.style.display = "block";
      });
    }
  }
});
// image carousel script----------------------------------
projectCards.forEach((desc,index) => {
  desc.onclick = () => {
    eachCardDisplay(index);
  }
});

function eachCardDisplay(index){
  let link = projectCards[index].getAttribute('data-link');
  if(link){
    document.querySelector('.postVisitSgt .dialogue #alert').textContent = "If you want to visit this page press 'GoTO'. Otherwise, press 'Open' for overview of images.";
    dilogueBoxLink.href = link;
    dialogueBtns[1].style.display = "block";
  }else{
    document.querySelector('.postVisitSgt .dialogue #alert').textContent = "press 'Open' to view my images of projects.";
    dialogueBtns[1].style.display = "none";
  }
  displayImage = true;
    setTimeout(()=>{
      displayImage = false;
    },3000);
  displayDialogue.classList.add("active");
}
dialogueBtns[1].addEventListener('click',(e)=>{
  e.preventDefault();
  window.open(dilogueBoxLink.href,"_blank");
});

dialogueBtns.forEach(BTnC=>{
  BTnC.addEventListener('click',()=>{
    displayDialogue.classList.remove('active');
  });
})
document.querySelector('.projects .postVisitSgt .dialogue .drp.close').onclick=()=>{
  displayDialogue.classList.remove('active');
}
dialogueBtns[0].onclick=()=>{
  document.querySelector(".popup-carousel").classList.add('active');
}
window.addEventListener('popstate',(e)=>{
  if(document.querySelector(".popup-carousel").classList.contains('active')){
    e.preventDefault();
    document.querySelector(".popup-carousel").classList.remove('active');
  }
});

ImgConClose.onclick = () => {
  subImgContainer.classList.remove("active");
}

var counter = 0;
subImages.forEach((image,index) => {
  image.onclick = () => {
    mainImage.classList.toggle('animate');
    let update = image.getAttribute("src");
    mainImage.setAttribute("src", update);
    counter = index;
    image.classList.add("active");
    setTimeout(() => {
      image.classList.remove("active");
    }, 1500);
  }
});

let imageNo = subImages.length;
let displayImage = false;
projectCards.forEach(img => {
  img.onmouseover = () => {
    if (!displayImage) {
      let fetched = img.querySelector('img').getAttribute("src");
      for (var i = 0; i < imageNo; i++) {
        if (fetched == subImages[i].getAttribute("src")) {
          mainImage.setAttribute("src", subImages[i].getAttribute('src'));
          counter = i;
        }
      }
    }
  }
});

slideBtn.forEach(slide => {
  slide.addEventListener('click', (e) => {
    if (slide.classList.contains('close')) {
      document.querySelector(".popup-carousel").classList.remove('active');
    }
    if (slide.classList.contains('prev')) {
      if (counter <= 0) {
        counter = imageNo - 1;
      } else {
        counter--;
      }
      mainImage.setAttribute("src", subImages[counter].getAttribute('src'));
    }
    if (slide.classList.contains('next')) {
      if (counter >= imageNo - 1) {
        counter = 0;
      } else {
        counter++;
      }
      mainImage.setAttribute("src", subImages[counter].getAttribute('src'));
    }
    if (slide.classList.contains('galary')) {
      subImgContainer.classList.add("active");
    }
  });
});
document.addEventListener('click',(e)=>{
  let popupNavbar = document.querySelector('.popup-carousel .carousel-navbar');
  if(!popupNavbar.contains(e.target) && !subImgContainer.contains(e.target) && !mainImage.contains(e.target) && !displayDialogue.contains(e.target)){
    document.querySelector(".popup-carousel").classList.remove('active');
  }
  speak(); 
});
window.oncontextmenu = () => {
  return false;
}
document.body.addEventListener('keydown', function (e) {
  if ((e.ctrlKey && e.key === 'u') || 
      (e.ctrlKey && e.key === 'p') || 
      (e.ctrlKey && e.key === 's') ||
      (e.ctrlKey && e.key === 'a'))
  {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'c') {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'i') {
    e.preventDefault();
  }
  if (e.keyCode == 123) {
    e.preventDefault();
  }
  speak(); 
});

window.addEventListener("offline", () => {
  setTimeout(() => {
    document.querySelector(".bottom-network-check").classList.remove("active");
  }, 5000)
  document.querySelector(".bottom-network-check").classList.add("active");
  document.querySelector(".bottom-network-check").textContent = "you are offline!!😥";
  document.querySelector(".bottom-network-check").style.background = "red";
});
window.addEventListener("online", () => {
  setTimeout(() => {
    document.querySelector(".bottom-network-check").classList.remove("active");
  }, 5000)
  document.querySelector(".bottom-network-check").classList.add("active");
  document.querySelector(".bottom-network-check").textContent = "Back to online🥰";
  document.querySelector(".bottom-network-check").style.background = "green";
});

const date = new Date();
document.getElementById("date").textContent = date.getFullYear();


const greet = [`Good Morning`, `Good Afternoon`, `Good Evening`, `best wish for your night. Shubha Raartrii`];
const thisTime = new Date().getHours();

let greetIng = thisTime <= 11.99 && thisTime >= 0 ? 0 : thisTime >= 12 && thisTime <= 17 ? 1 : thisTime >= 17 && thisTime <= 21 ? 2 : thisTime >= 21 && thisTime <= 23.99 ? 3 : 0;
var msgCount = 0;

function speak() {
   let speaked = sessionStorage.getItem('speaked');
  if (msgCount < 1 && !speaked) {
      if (speechSynthesis.speaking !== true) {
          if ('speechSynthesis' in window) {
              const msg = new SpeechSynthesisUtterance();
              msg.text = `${greet[greetIng].slice(0, -1)}, I'm Darpan, welcome to my portfolio`;
              msg.volume = 0.5;
              window.speechSynthesis.speak(msg);
          }
          if (speechSynthesis.speaking === true) {
              msgCount += 1;
              sessionStorage.setItem('speaked',true);
          }
      } else {
          msgCount += 1;
          sessionStorage.setItem('speaked',true);
      }
  }
}
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = function() {
      speak(); 
  };
}
const yourDate = new Date();
const dateStr = yourDate.toString();
const timeZoneAbbreviation = dateStr.match(/\(([^)]+)\)/)[1];
const userLocation = timeZoneAbbreviation.split(" ");
if(userLocation){
  document.querySelector('.fnav .logo').style.setProperty('--name', '"'+userLocation[0]+'"');
}

// social links

socialIcons.forEach(icons=>{
  icons.addEventListener('click',(e)=>{
    e.preventDefault();
    if(icons.classList.contains('facebook')){
      window.open('https://www.facebook.com/darpan.adhikari2','_blank');
    }
    if(icons.classList.contains('messenger')){
      window.open('https://www.facebook.com/messages/t/100025269360617','_blank');
    }
    if(icons.classList.contains('instagram')){
      window.open('https://www.instagram.com/d_arpanadhikari/','_blank');
    }
    if(icons.classList.contains('whatsapp')){
      window.open('https://wa.me/qr/ZO3IQ3ZSXTASJ1','_blank');
    }
    if(icons.classList.contains('twitter')){
      window.open('https://x.com/Darpan_3','_blank');
    }
    if(icons.classList.contains('youtube')){
      window.open('https://www.youtube.com/channel/UC3aO9DqsvyvIufXQSubbeeA','_blank');
    }
    if(icons.classList.contains('github')){
      window.open('https://github.com/DarpanAdhikari?tab=repositories','_blank');
    }
  })
})


viewResume.addEventListener('click',()=>{
  document.getElementById("resumePopUp").classList.add('show');
});
closeResume.addEventListener('click',()=>{
  document.getElementById("resumePopUp").classList.remove('show');
});
document.addEventListener('click',(e)=>{
  e.preventDefault();
  if(!closeResume.contains(e.target) && !viewResume.contains(e.target)){
    document.getElementById("resumePopUp").classList.remove('show');
  }
})
