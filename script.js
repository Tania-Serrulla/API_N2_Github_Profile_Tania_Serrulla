const direcsion = 'https://api.github.com/users/';

document.getElementById("search").addEventListener('change', funsion);

function funsion() {
  var usuario = document.getElementById("search").value;
  document.getElementById("search").value = "";
  axios.get(direcsion + usuario)
  .then((response) => {
    document.getElementById('main').innerHTML = '';

    /*Div del card*/
    var carddiv = document.createElement('div');
    carddiv.className = 'card';
    document.getElementById('main').appendChild(carddiv);

    /*Imagen del avatar*/
    var imgcard = document.createElement('img');
    imgcard.className = 'avatar';
    imgcard.src = response.data.avatar_url;
    carddiv.appendChild(imgcard);

    /*Div de la información de usuario*/
    var userinfodiv = document.createElement('div');
    userinfodiv.className = 'user-info';
    carddiv.appendChild(userinfodiv);

    /*H2 de la información de usuario*/
    var h2userinfo = document.createElement('h2');
    h2userinfo.innerHTML = response.data.name;
    userinfodiv.appendChild(h2userinfo);

    /*P de la información de usuario*/
    var puserinfo = document.createElement('p');
    puserinfo.innerHTML = response.data.bio;
    userinfodiv.appendChild(puserinfo);

    /*Crear ul de la información de usuario*/
    var uluserinfo = document.createElement('ul');
    userinfodiv.appendChild(uluserinfo);

    /*Crear li de followers*/
    var lifollowers = document.createElement('li');
    lifollowers.innerHTML = response.data.followers + " Followers";
    uluserinfo.appendChild(lifollowers);

    /*Crear li de following*/
    var lifollowing = document.createElement('li');
    lifollowing.innerHTML = response.data.following + " Following";
    uluserinfo.appendChild(lifollowing);

    /*Crear li de repos*/
    var lirepos = document.createElement('li');
    lirepos.innerHTML = response.data.public_repos + " Repos";
    uluserinfo.appendChild(lirepos);
  })
  .catch((err) => {
    console.log(err);
    document.getElementById('main').innerHTML = '';

    /*Div del card*/
    var carddiv = document.createElement('div');
    carddiv.className = 'card';
    document.getElementById('main').appendChild(carddiv);

    /*H2 de la información de usuario*/
    var h2errorinfo = document.createElement('h2');
    h2errorinfo.innerHTML = "No profile with this username";
    carddiv.appendChild(h2errorinfo);
  });

  axios.get(direcsion + usuario + "/repos")
  .then((response) => {
    console.log(response);
    for (let i = 0; i < 5 && i < response.data.length; i++) {
      /*Crear enlaces de repositorios*/
      var hrefrepositorio = document.createElement('a');
      hrefrepositorio.className = 'repo';
      hrefrepositorio.href = response.data[i].html_url;
      hrefrepositorio.innerHTML = response.data[i].name;
      document.getElementsByClassName('user-info')[0].appendChild(hrefrepositorio);
    }
  })
  .catch((err) => {
    console.log(err);
  });
  // a.innerHTML = b.joke;
}
