const express = require('express');
const axios = require('axios');
const path = require('path');

console.log('test');

const charQuery = async () => {
  try {
    const url = 'https://hp-assessment-api.herokuapp.com/hp/characters';
    const characters = await axios.get(url);

    console.log('Data is being requested!');

    const { data } = characters;

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const app = express();

const port = 3456;

app.listen(port, () => console.log(`Server is running. Port: ${port}`));

// res.sendFile(path.join(__dirname, '/index.html'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/characters', async (req, res) => {
  const data = await charQuery();
  //   console.log(data);
  res.send(data);
});

app.get('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id); // bv 10
  const characters = await charQuery();

  const foundID = characters.find((character) => {
    return character.id === id;
  });

  const { name, imgUrl } = foundID;

  const imageRender = `<center><h1>${name}</h1><img src="${imgUrl}" alt="image" height="300" width="220"></center>`;
  res.send(imageRender);
});

app.get('/house/:house', async (req, res) => {
  const houseFound = req.params.house;
  const characters = await charQuery();

  const charactersFromHouse = characters.filter((character) => {
    return character.house.name.toLowerCase() === houseFound;
  });

  const allCharactersFromHouse = charactersFromHouse.map((character) => {
    return `<div class="character"><center><h1>${character.name}</h1><h2>${character.house.name}</h2><img src="${character.imgUrl}" alt="image"></center></div>`;
  });

  res.send(allCharactersFromHouse.join(' '));
});
