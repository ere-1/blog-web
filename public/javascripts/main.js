document.addEventListener('DOMContentLoaded', () => {
    console.log('fuck bitches')
    const searchBtn = document.querySelector('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const closeBtn = document.getElementById('searchClose');
    console.log(searchBar, searchBtn)
    searchBtn.addEventListener('click', ()=> {
        searchBar.style.visibility = 'visible';
        searchBar.style.transform = 'translateY(0)'
        searchBtn.setAttribute('aria-expanded', 'true');
        searchInput.focus();
    });
    closeBtn.addEventListener('click', ()=> {
        searchBar.style.visibility = 'hidden';
        searchBar.style.transform = 'translateY(-100px)'
    })

})