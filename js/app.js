const navBar = document.getElementById("nav");
const toTop = document.getElementById("to-top");
const scrollbar = document.getElementById('scrollbar');
const boxes = document.getElementsByClassName('box');


navBar.addEventListener("click", function(e) {
  // console.log(e.target.parentNode.parentNode);
  if((e.target.className.includes("btn"))){
  	removeActiveClass();
  	// Append "active" class to target li.
  	e.target.className += " active"; 	
  }
  
});

function removeActiveClass(){
	// Removes all other instances of "active" class from li 
  	let navDiv = document.getElementById("nav");
  	let items = navDiv.getElementsByTagName("li");
  	for(let i = 0; i < items.length; i++){
  			let activeElement = items[i].firstElementChild;
  			items[i].firstElementChild.className = activeElement.className.replace("active", "");
  		
  	}
}

document.addEventListener('scroll', scrollTopButton);
document.addEventListener('scroll', scrollbarProgress);


function scrollTopButton(){
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("to-top").style.display = "block";
  } else {
    document.getElementById("to-top").style.display = "none";
  }
}

function scrollbarProgress(){
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll/height) * 100;
  scrollbar.style.width = scrolled + '%';
}

