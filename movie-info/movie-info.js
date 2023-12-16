const movieDetails = document.querySelector(".details");
const favBtnElement = document.querySelector(".favorite-btn");
// Get references to the elements in the HTML
const posterImg = document.getElementById('posterImg');
const movieInfo = document.getElementById('movieInfo');

favBtnElement.addEventListener('click', ()=>{
    window.history.back();
});


async function getMovieDetails(){
    const savedMovie = JSON.parse(localStorage.getItem('movie-info'));
    console.log(savedMovie);
    const imdb = savedMovie.imdbID;

    try{
        const moviesResponse = await fetch(`https://www.omdbapi.com/?apikey=f7b7be76&i=${imdb}&plot=full`);
        const movie = await moviesResponse.json();
        console.log(movie);

        posterImg.src = movie.Poster;
        posterImg.alt = movie.Title;

        // Create an array of movie details to display
        const details = [
            `<h2>${movie.Title} (${movie.Year})<h2>`,
            `<strong>Rated:</strong> ${movie.Rated}`,
            `<strong>Genre:</strong> ${movie.Genre}`,
            `<strong>Language:</strong> ${movie.Language}`,
            `<strong>Awards:</strong> ${movie.Awards}`,
            `<strong>Director:</strong> ${movie.Director}`,
            `<strong>Actors:</strong> ${movie.Actors}`,
            `<strong>Plot:</strong> ${movie.Plot}`,
            `<strong>IMDb Rating:</strong> ${movie.imdbRating}`,
            `<strong>Box Office:</strong> ${movie.BoxOffice}`,
            `<strong>Runtime:</strong> ${movie.Runtime}`,
            // Include other details similarly
        ];
        movieInfo.innerHTML = '';
        // Loop through details array and create HTML elements to display them
        details.forEach(detail => {
            const p = document.createElement('p');
            p.innerHTML = detail;
            movieInfo.appendChild(p);
        });
    }catch(err){
        console.log(`Error getting movies: ${err}`);
    }

}

getMovieDetails();



