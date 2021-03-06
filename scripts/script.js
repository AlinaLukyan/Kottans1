'use strict';

const input = document.querySelector('input');
const sendButton = document.querySelector('button');


sendButton.addEventListener('click', addReply);

input.addEventListener('keydown', (e) => {
    if (e.which == 13) addReply();
});


function get(url, resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            resolve(JSON.parse(xhr.responseText));
        }
    };

    xhr.onerror = (e) => {
        reject(e);
    };

    xhr.open('GET', url, true);
    xhr.send();
}

function onError(e) {
    throw new Error(e.message);
}

function addReply() {
    const replies = document.querySelector('.replies');

    let text = input.value.trim();

    if (!text.length) return;

    let reply = document.createElement('div');
    reply.classList.add('reply');
    reply.innerHTML = `<p>${text}</p>`;
    replies.appendChild(reply);
    input.value = null;
}

function drawPhotos(photos) {
    const gallery = document.getElementById('gallery');

    photos.forEach(photo => {
        let div = document.createElement('div'),
            img = document.createElement('img');

        div.classList.add('photo');
        img.src = photo.url;

        div.appendChild(img);
        gallery.appendChild(div);
    });
}

function drawProfileInfo(profile) {
    const avatar = document.querySelector('.avatar');
    const name = document.querySelector('.name');
    const phone = document.querySelector('.phone');
    const email = document.querySelector('.email');

    avatar.src = profile.picture.large;
    name.innerText = `${profile.name.first} ${profile.name.last}`;
    phone.textContent = profile.cell;
    email.textContent = profile.email;
}

function drawFriends(users) {
    const friends = document.getElementById('friends');

    users.forEach(friend => {
        let div = document.createElement('div'),
            img = document.createElement('img');

        div.classList.add('friend');
        img.src = friend.picture.medium;
        div.appendChild(img);
        friends.appendChild(div);
    });
}

get('/photos', (response) => {
    drawPhotos(response);

    get('https://randomuser.me/api/', (response) => {
        drawProfileInfo(response.results[0]);

        get('https://randomuser.me/api/?results=32', (response) => {
            drawFriends(response.results);
        }, onError);

    }, onError);

}, onError);