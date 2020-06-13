// A browser request

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const address = document.querySelector('form > input').value;
    const msgOne = document.querySelector('h2');
    const msgTwo = document.querySelector('p');
    
    msgOne.innerHTML = 'Loading...';

    fetch(`http://localhost:3000/weather?address=${address}`)
        .then(res => {
            res.json().then((data) => {
                if(data.error) {
                    msgOne.innerHTML = data.error;
                    msgTwo.innerHTML = '';
                    return console.error(data.error);
                }

                msgOne.innerHTML = data.location;
                msgTwo.innerHTML = data.forcast;
            });
        }).catch(err => console.error('Failed to fetch from url.'));
});