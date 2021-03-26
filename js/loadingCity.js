function loadingCity() {
  let cities = document.querySelector('.cities');
  let template = document.querySelector('#templateOtherCity');
  template.content.querySelector('.city').setAttribute("id", `-1`);

  let clone = document.importNode(template.content, true);
  cities.append(clone);
}
