import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { Tweet } from '../interfaces/tweet.interface';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TweetBrute } from '../interfaces/tweetBrute.interface';
import { TweetsService } from '../services/tweets.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, TableModule, CommonModule, ChartModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private tweetService: TweetsService, private cdr: ChangeDetectorRef){}

  sentimentCounts: { [key: string]: number } = {
    Positive: 0,
    Negative: 0,
    Neutral: 0,
    Irrelevant: 0
  };

  tweetsFromService: TweetBrute[] = [];

  data: any;
  options: any;

  data2: any;
  options2: any;

  data3: any;
  options3: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['Positive', 'Negative', 'Neutral', 'Irrelevant'],
        datasets: [
            {
                data: [540, 325, 702, 204],
                backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--gray-400')]
            }
        ]
    };

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    this.data2 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--teal-500')
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--orange-500'),
                tension: 0.4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };
    
    this.options2 = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };

    this.data3 = {
      labels: ['GrandTheftAuto(GTA)', 'Google', 'Cyberpunk2077', 'johnson&johnson', 'HomeDepot', 'Nvidia', 'LeagueOfLegends'],
      datasets: [
          {
              label: 'Positive',
              borderColor: documentStyle.getPropertyValue('--green-400'),
              pointBackgroundColor: documentStyle.getPropertyValue('--green-400'),
              pointBorderColor: documentStyle.getPropertyValue('--green-400'),
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: documentStyle.getPropertyValue('--green-400'),
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: 'Negative',
              borderColor: documentStyle.getPropertyValue('--pink-400'),
              pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
              pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
    };
  
    this.options3 = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: textColorSecondary
                },
                pointLabels: {
                    color: textColorSecondary
                }
            }
        }
    };

    this.fetchTweets();

  }

  fetchTweets(): void {
    this.tweetService.getTweets().subscribe(
      (data: any[]) => { 
        this.tweetsFromService = data.map((obj: any) => ({
          tweetID: obj.tweetID,
          entity: obj.entity,
          sentiment: obj.sentiment,
          prediction: obj.prediction,
          tweetContent: obj.tweetContent
        }));
        console.log(this.tweetsFromService);
  
        // Appel de la fonction pour compter les sentiments
        this.countSentiments();
        
        // Update chart data after sentiment counts are calculated
        this.updateChartData();   

        this.countSentimentsByEntity();

        // Force update of the chart component
        this.cdr.detectChanges();
        console.log(this.sentimentCounts); // Affichez les décomptes des sentiments dans la console
      },
      (error: any) => {
        console.error('Error fetching tweets:', error);
      }
    );
  }

  countSentiments(): void {
    this.sentimentCounts = {
      Positive: 0,
      Negative: 0,
      Neutral: 0,
      Irrelevant: 0
    };

    this.tweetsFromService.forEach(tweet => {
      this.sentimentCounts[tweet.sentiment]++;
    });
  }

  updateChartData(): void {
    this.data.datasets[0].data = [
      this.sentimentCounts['Positive'],
      this.sentimentCounts['Negative'],
      this.sentimentCounts['Neutral'],
      this.sentimentCounts['Irrelevant']
    ];
  }

  countSentimentsByEntity(): void {
    // Shuffle the tweets array to get a random selection
    const shuffledTweets = this.shuffleArray(this.tweetsFromService);
  
    // Get unique entities from the shuffled array
    const uniqueEntities = Array.from(new Set(shuffledTweets.map(tweet => tweet.entity)));
  
    // Randomly choose 7 entities
    const chosenEntities = this.chooseRandomEntities(uniqueEntities, 7);
  
    // Initialize an object to store sentiment counts for each chosen entity
    const entitySentiments: {
      [entity: string]: {
        Positive: number;
        Negative: number;
      };
    } = {};
  
    // Initialize the chosen entities in the object
    chosenEntities.forEach(entity => {
      entitySentiments[entity] = { Positive: 0, Negative: 0 };
    });
  
    // Loop through the shuffled tweets and count positive and negative sentiments for each chosen entity
    shuffledTweets.forEach(tweet => {
      const entity = tweet.entity;
      const sentiment = tweet.sentiment;
  
      // Increment the sentiment count if the entity is one of the chosen entities
      if (entitySentiments[entity]) {
        if (sentiment === 'Positive') {
          entitySentiments[entity].Positive++;
        } else if (sentiment === 'Negative') {
          entitySentiments[entity].Negative++;
        }
      }
    });
  
    // Prepare the data for the chart
    const positiveData = chosenEntities.map(entity => entitySentiments[entity].Positive);
    const negativeData = chosenEntities.map(entity => entitySentiments[entity].Negative);
  
    // Update the chart data and labels
    this.data3.labels = chosenEntities;
    this.data3.datasets[0].data = positiveData;
    this.data3.datasets[1].data = negativeData;
  
    // Log the results to the console for debugging
    console.log("Data3 Before Update: ", this.data3);

    // Call detectChanges to ensure Angular detects the changes and updates the view
    this.cdr.detectChanges();

    // Log the updated data3 after detectChanges
    console.log("Data3 After Update: ", this.data3);
    console.log("Entity Sentiments: ", entitySentiments);
  }
  
  // Function to shuffle an array
  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Function to choose n random elements from an array
  chooseRandomEntities(array: any[], n: number): any[] {
    const shuffled = this.shuffleArray(array);
    return shuffled.slice(0, n);
  }
  
  
}
  

