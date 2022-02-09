import "./components/conditional-component/conditional-component";
import "./components/loop-component/loop-component";


import  ("./components/click-count/click-count")
    .then((response)=> setTimeout(() => {

        const element = document.createElement('click-count');
        document.querySelector('body').appendChild(element);

    }, 3000));

(() => {
  const contactos = [
        {
            nombre: "Juan",
            email: "juanruiz@paradigman.com",
            ganas: false
        },
        {
            nombre: "Jose",
            email: "KyloTorres@<pongaSutextoX5€>.com",
            ganas: false
        },
        {
            nombre: "Victor",
            email: "captainHook@paradigman.com",
            ganas: true
        },
        {
            nombre: "Jaime",
            email: "ceomutua@mutua.es",
            ganas: false

        }
    ];
  const tag = document.querySelector('loop-component');
  tag.setAttribute('contactos', JSON.stringify(contactos));
})()

