// core modules
import { Component, OnInit } from '@angular/core';

import { FetchDataApiService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

// material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// declare global variables
const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']

})

export class FavoritesComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * gets movies and favoritemovies 
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /** 
  * all movies from the server and compares  users favorites with the movie array.
  * the movies from the user favorites will then be pushed to a new array.

  */

  /**
   *  all movies
   */
  getMovies(): void {
    // this.isLoading: true
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      // this.isLoading: false
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites();
    })
  }

  /**
   * gets users favorite movies
   */
  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favs = resp.favoritemovies;
      console.log(this.favs, 'favs');
      return this.favs;
    })
  }

  /**
   * movies are filtered
   * @returns array of movies to component
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favs.includes(movie._id)) {
        this.favorites.push(movie);
      } console.log(this.favorites, 'favorites');
    });
    return this.favorites;
  }

  /**
   * adds the movie to favoritemovies 
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  addToUserFavorites(id: string, title: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      return this.getUsersFavs();
    })
  }

  /**
   * removes the movie from users favoritemovies array
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  removeFromUserFavorites(id: string, title: string): void {
    this.fetchApiData.removeFromFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUsersFavs();
  }

  /**
   * opens genre modal 
   * @param name (genre name)
   * @param description (genre description)
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px'
    });
  }

  /**
   * opens director modal 
   * @param name (director name)
   * @param bio (director bio)
   * @param birthYear (director birthYear)
   * @param deathYear (director deathYear)
   */
  openDirector(name: string, bio: string, birthYear: number, deathYear: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birthYear, deathYear },
      width: '500px'
    });
  }

  /**
   * opens synopsis modal 
   * @param title (movie title)
   * @param imageUrl (movie image/cover)
   * @param description (movie description)
   * @param year (year of release)
   */
  openSynopsis(title: string, imageUrl: any, description: string, year: number): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, imageUrl, description, year },
      width: '500px'
    });
  }

  /**
   * Compares movie id's with getUsersFavs returned list to display the favorite movie icon correctly
   * @param id 
   * @returns 
   */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
