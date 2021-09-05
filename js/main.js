'use strict';
// получения данных из файла
const getData = () => {
  return fetch('./dbHeroes.json');
};

// создание карточки героя
const createHeroCard = hero => {
  const wrapper = document.querySelector('.wrapper');
    if(!hero.actors) hero.actors = 'unknown';
    if(!hero.realName) hero.realName = 'unknown';
    if(!hero.name) hero.name = 'unknown';
    if(!hero.deathDay) hero.deathDay = 'unknown';
    if(!hero.birthDay) hero.birthDay = 'unknown';    
    if(!hero.citizenship) hero.citizenship = 'unknown';
    if(!hero.species) hero.species = 'unknown';

    const div = document.createElement('div');
    div.classList.add('hero-card');
    div.innerHTML = `
    <div class="photo">
      <img class="photo-item"src="${hero.photo}" alt="${hero.name}" />
    </div>
    <div class="hero-info">
      <p><b>Actor:</b> ${hero.actors}</p>    
      <p><b>Hero:</b> ${hero.name}</p>
      <p><b>Hero real name:</b> ${hero.realName}</p>      
      <p><b>Gender:</b> ${hero.gender}</p>      
      <p><b>Race:</b> ${hero.species}</p>      
      <p><b>Citizenship:</b> ${hero.citizenship}</p>
      <p><b>Birthday:</b> ${hero.birthDay}</p>
      <p><b>Deathday:</b> ${hero.deathDay}</p>
      <p><b>Status:</b>${hero.status}</p>
      <p><b>Movies:</b> ${hero.movies}</p>
    </div>`;
    wrapper.append(div);
};

// фильтр
const filter = data => {
  const filter = document.getElementById('filter');
    
    
  filter.addEventListener('change', ()=> {
    // удаление старых карточек
    const heroCard = document.querySelectorAll('.hero-card');
    heroCard.forEach(item => item.remove());
    // добавление отфильтрованных карточек
    data.forEach(hero => {
      if(hero.movies.match(filter.value)) createHeroCard(hero);
    });
  });
};

// отображение данных на странице
const showHeroes = (data) => {
  data.forEach((hero) => {    
    if(!hero.movies) {
      hero.movies = 'unknown';
    } else {
      hero.movies = hero.movies.join(', ');
    }
    createHeroCard(hero);
  });

  filter(data);
};

// запуск функции получения данных
getData()
  .then((response) => response.json())
  .then((data) => showHeroes(data))
  .catch((error) => console.log(error));