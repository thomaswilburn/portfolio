var lastScroll = document.body.scrollTop || document.documentElement.scrollTop;
var timeout;
var body = document.body;
if (window.matchMedia && matchMedia("(min-device-width: 600px)").matches) {
  window.addEventListener("scroll", function() {
    var scroll = document.body.scrollTop || document.documentElement.scrollTop;
    var delta = scroll - lastScroll;
    if (delta < 0) {
      if (body.className.indexOf("up") == -1) body.className = "up";
    } else {
      if (body.className.indexOf("down") == -1) body.className = "down";
    }
    if (Math.abs(delta) > 80 && body.className.indexOf("fast") == -1) {
      body.className += " fast";
    }
    lastScroll = scroll;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function() {
      body.className = "";
    }, 100);
  });
}

var qsa = function(s) { return Array.prototype.slice.call(document.querySelectorAll(s)) };

//obfuscated e-mail address (for what that's worth)
var charset = "abcdefghijklmnopqrstuvwxyz.@";
var cipher = [13, 4, 22, 18, 27, 19, 7, 14, 12, 0, 18, 22, 8, 11, 1, 20,
17, 13, 26, 13, 4, 19];

var mailto = "";
for (var i = 0; i < cipher.length; i++) {
    mailto += charset.charAt(cipher[i]);
}
var link = document.getElementById("mailto");
link.setAttribute('href', "mailto:" + mailto);
link.innerHTML = mailto;

//handle internal scroll
var smoothScroll = function(e) {
  var target = document.querySelector(this.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
}
qsa(`[href^="#"]`).forEach(jump => jump.addEventListener("click", smoothScroll));