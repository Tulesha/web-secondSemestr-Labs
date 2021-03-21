function buttonWidth(){
  if (document.documentElement.clientWidth < 768) {
    document.getElementById("refresh").innerHTML = "<img src='images/icon-set/refresh.png' class='refreshButtonImg'>"
  }
  else {
    document.getElementById("refresh").innerHTML = "Refresh"
  }
}
