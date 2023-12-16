const mainElement = document.querySelector("main");
const homeBtnElement = document.querySelector(".home-btn");

homeBtnElement.addEventListener('click', ()=>{
    window.location.href = '../index.html';
})

function show(){
    const existingMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    
    render(existingMovies);
}

function render(movies){
    if(movies.length > 0){
        movies.forEach(movie => {
            const imdbId = movie.imdbID;
            const poster = movie.Poster;
            const title = movie.Title;
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.style.cursor = 'pointer';
            
            // clicking on movieelement should open movie details page
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
            // posterElement.alt = 'assets/image-not-found.jpg'
            posterElement.addEventListener('click', ()=>{
                // store the current movie to localstorage
                localStorage.setItem('movie-info', JSON.stringify(movie));
                window.location.href = '../movie-info/movie-info.html';
            });

            // create bottom
            const bottomElement = document.createElement('div');
            bottomElement.classList.add('bottom');

            // create title
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = title;

            // create fav-btn
            const removeBtnElement = document.createElement('button');
            removeBtnElement.classList.add('remove-btn');
            removeBtnElement.textContent = 'Remove'
            removeBtnElement.addEventListener('click', ()=>{
                let existingMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
                
                // remove this movie from existing movies
                existingMovies = existingMovies.filter((m) => {
                    return !(m.imdbID == imdbId);
                });

                // update the localStorage
                localStorage.setItem('favoriteMovies', JSON.stringify(existingMovies));
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent = `Movie removed from favorites: ${title}`;
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                console.log('Movie removed - ', title);

                mainElement.innerHTML = '';
                render(existingMovies);

            });

            // add title and fav-btn in bottom
            bottomElement.appendChild(titleElement);
            bottomElement.appendChild(removeBtnElement);

            // add bottom and poster in movieElement
            movieElement.appendChild(posterElement);
            movieElement.appendChild(bottomElement);

            // add movieElement into mainElement
            mainElement.appendChild(movieElement);
        });
    }
}


show();