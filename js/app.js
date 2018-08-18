"use strict";

var navBar = document.getElementById("nav");
var toTop = document.getElementById("to-top");
var scrollbar = document.getElementById('scrollbar');
var boxes = document.getElementsByClassName('box');
var email = document.getElementById('email');



navBar.addEventListener("click", function (e) {
  // console.log(e.target.parentNode.parentNode);
  if (e.target.className.includes("btn")) {
    removeActiveClass();
    // Append "active" class to target li.
    e.target.className += " active";
  }
});

function removeActiveClass() {
  // Removes all other instances of "active" class from li
  var navDiv = document.getElementById("nav");
  var items = navDiv.getElementsByTagName("li");
  for (var i = 0; i < items.length; i++) {
    var activeElement = items[i].firstElementChild;
    items[i].firstElementChild.className = activeElement.className.replace("active", "");
  }
}

document.addEventListener('DOMContentLoaded', addEmail);

document.addEventListener('scroll', scrollTopButton);
document.addEventListener('scroll', scrollbarProgress);



function scrollTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("to-top").style.display = "block";
  } else {
    document.getElementById("to-top").style.display = "none";
  }
}

function scrollbarProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = winScroll / height * 100;
  scrollbar.style.width = scrolled + '%';
}

function addEmail(){
  email.textContent = "andi.beqiri21@gmail.com"

}

function reverse(s) {
  var o = '';
  for (var i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o;
}