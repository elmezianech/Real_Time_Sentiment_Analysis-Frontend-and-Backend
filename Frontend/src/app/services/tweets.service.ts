import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TweetBrute } from '../interfaces/tweetBrute.interface';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  apiURL = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => fetch tweets list
  getTweets(): Observable<TweetBrute[]> {
    return this.http.get<any[]>(this.apiURL + '/getTweets').pipe(
      retry(1),
      map(data => data.map(item => this.transformTweet(item))),
      catchError(this.handleError)
    );
  }

  // Transformation method
  private transformTweet(tweet: any): TweetBrute {
    return {
      tweetID: tweet['Tweet ID'],
      tweetContent: tweet['TweetContent'],
      entity: tweet['Entity'],
      sentiment: tweet['Sentiment'],
      prediction: tweet['prediction']
    };
  }

  getTweetsNomral() {
    return this.http.get(this.apiURL + '/getTweets').toPromise(); 
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
