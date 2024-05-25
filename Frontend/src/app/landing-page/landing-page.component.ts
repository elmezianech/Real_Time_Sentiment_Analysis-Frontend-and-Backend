import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  responsiveOptions: any[] | undefined;

  techs: any = [
    {
      tech_name: 'Apache Kafka',
      tech_image: '../../assets/images/techs/kafka.png',
    },
    {
      tech_name: 'Spark MLlib',
      tech_image: '../../assets/images/techs/spark-MLlib.png',
    },
    {
      tech_name: 'Python',
      tech_image: '../../assets/images/techs/python.png',
    },
    {
      tech_name: 'Pandas',
      tech_image: '../../assets/images/techs/pandas.png',
    },
    {
      tech_name: 'Docker',
      tech_image: '../../assets/images/techs/docker.png',
    },
    {
      tech_name: 'MongoDB',
      tech_image: '../../assets/images/techs/mongodb.webp',
    },
    {
      tech_name: 'ExpressJS',
      tech_image: '../../assets/images/techs/expressJS.png',
    },
    {
      tech_name: 'Angular',
      tech_image: '../../assets/images/techs/angular.png',
    },
    {
      tech_name: 'Bootstrap',
      tech_image: '../../assets/images/techs/bootstrap.png',
    }
  ];

  ngOnInit(): void {
      this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '1220px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '1100px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }
  
}
