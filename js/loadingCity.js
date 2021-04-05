function loadingCity() {
  let cities = document.querySelector('.cities');
  let template = document.querySelector('#templateOtherCity');

  let clone = document.importNode(template.content, true);
  cities.append(clone);

  return cities.lastElementChild;
}
