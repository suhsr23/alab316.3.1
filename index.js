var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top'},
        {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#', subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending'},
        {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'},
        {text: 'sign out', href: '/account/signout'},
    ]},
];


const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');


const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');


menuLinks.forEach(link => {
    const aEl = document.createElement('a');
    aEl.setAttribute('href', link.href);
    aEl.textContent = link.text;
    topMenuEl.appendChild(aEl);
});


const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '-100%'; 


const topMenuLinks = Array.from(topMenuEl.querySelectorAll('a'));

topMenuEl.addEventListener('mouseover', showSubMenu);
topMenuEl.addEventListener('mouseout', hideSubMenu);
subMenuEl.addEventListener('mouseover', showSubMenu);
subMenuEl.addEventListener('mouseout', hideSubMenu);


function showSubMenu() {
    subMenuEl.style.top = '3rem';
}


function hideSubMenu() {
    subMenuEl.style.top = '-100%';
}


topMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    topMenuLinks.forEach(link => link.classList.remove('active'));


    event.target.classList.toggle('active');


    const clickedLink = menuLinks.find(link => link.text === event.target.textContent);

    if (clickedLink && clickedLink.subLinks) {
 
        subMenuEl.style.top = '3rem'; 
        buildSubmenu(clickedLink.subLinks);
    } else {

        subMenuEl.style.top = '-100%';
    }
});


function buildSubmenu(subLinks) {

    subMenuEl.innerHTML = '';

    subLinks.forEach(link => {

        const aEl = document.createElement('a');

        aEl.setAttribute('href', link.href);

        aEl.textContent = link.text;

        subMenuEl.appendChild(aEl);
    });
}

subMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    console.log(event.target.textContent);

    subMenuEl.style.top = '-100%';

    topMenuLinks.forEach(link => link.classList.remove('active'));

    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});
