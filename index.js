const searchInputElement = document.querySelector(".search-input");
const mainElement = document.querySelector("main");
const submitBtnElement = document.querySelector("submit-btn");
const searchFormElement = document.getElementById("searchForm");
const favoriteBtnElement = document.querySelector(".favorite-btn");

show();

function show(){
    const inputText = localStorage.getItem('searchInput');
    if(inputText && inputText.length > 0){
        searchInputElement.value = inputText;
    }
    const existingMovies = JSON.parse(localStorage.getItem('homeMovies')) || [];
    render(existingMovies);
}

favoriteBtnElement.addEventListener('click', ()=>{
    window.location.href = 'favorite/favorite.html';
})

searchFormElement.addEventListener('submit', (event)=>{
    event.preventDefault();
});

searchInputElement.addEventListener('input', async (event)=> {
    let movies = await getMovies(event.target.value.toString());
    // if atleast one movie is present then render that.
    if(movies.Search){
        // store searchInput text into localstorage
        localStorage.setItem('searchInput', event.target.value.toString());
        removePrevMovies(mainElement);
        render(movies.Search);
    }
});

function removePrevMovies(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}


async function getMovies(title){
    try{
        const moviesResponse = await fetch(`http://www.omdbapi.com/?apikey=f7b7be76&s=${title}&page=1`);
        const movies = await moviesResponse.json();
        return movies;
    }catch(err){
        console.log(`Error getting movies: ${err}`);
    }
}

function render(movies){

    localStorage.setItem('homeMovies', JSON.stringify(movies));

    if(movies.length > 0){
        movies.forEach(movie => {
            const imdbId = movie.imdbID;
            const poster = movie.Poster;
            const title = movie.Title;
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.style.cursor = 'pointer';
            
            // clicking on movieelement should open movie details page
            // movieElement.querySelector
            // movieElement.addEventListener('click', ()=>{
            //     // store the current movie to localstorage
            //     localStorage.setItem('movie-info', JSON.stringify(movie));
            //     window.location.href = 'movie-info.html';
            // });

            // create poster
            const posterElement = document.createElement('img');
            posterElement.classList.add('poster');
            if(poster == "N/A"){
                posterElement.src = 'assets/image-not-found.jpg';
            }else{
                posterElement.src = poster;
                posterElement.onerror = () => {
                    posterElement.src = 'assets/image-not-found.jpg';
                };
            }

            posterElement.addEventListener('click', ()=>{
                    // store the current movie to localstorage
                localStorage.setItem('movie-info', JSON.stringify(movie));
                window.location.href = 'movie-info/movie-info.html';
            });

            // create bottom
            const bottomElement = document.createElement('div');
            bottomElement.classList.add('bottom');

            // create title
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = title;

            // create fav-btn
            const favBtnElement = document.createElement('button');
            favBtnElement.classList.add('fav-btn');
            favBtnElement.textContent = 'fav'
            favBtnElement.addEventListener('click', ()=>{
                const existingMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
                
                // check if movie is present in fav or not
                const isMovieInFavorites = existingMovies.find((m) => {
                    return m.imdbID == imdbId;
                });

                // if current movie does not exist in favorites then add it to favorites
                if(!isMovieInFavorites){
                    existingMovies.push(movie);
                    localStorage.setItem('favoriteMovies', JSON.stringify(existingMovies));
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    x.textContent = `Movie added to favorites: ${title}`;
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    console.log('Added to favorites', title);
                }else{
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    x.textContent = `Movie already present in favorites: ${title}`;
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    console.log('Movie already present in Favorites', title);
                }
            })   

            // add title and fav-btn in bottom
            bottomElement.appendChild(titleElement);
            bottomElement.appendChild(favBtnElement);

            // add bottom and poster in movieElement
            movieElement.appendChild(posterElement);
            movieElement.appendChild(bottomElement);

            // add movieElement into mainElement
            mainElement.appendChild(movieElement);
        });
    }
}
