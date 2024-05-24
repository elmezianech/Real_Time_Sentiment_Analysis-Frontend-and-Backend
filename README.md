# Real_Time_Sentiment_Analysis-Frontend-and-Backend

This repository contains the frontend and backend components of a real-time sentiment analysis application for Twitter data. The application is built using Angular, ExpressJS, and MongoDB.

## Introduction

This project aims to develop a web application for real-time sentiment analysis of tweets. The objective is to predict the sentiment (positive, negative, neutral, or irrelevant) of a given tweet.

## Architecture and Technologies Used

### Architecture

The architecture of the project consists of the following elements:
1. **Twitter Data Stream**: Tweets are collected from a CSV file `twitter_validation.csv`.
2. **Application Web**: An Angular-based web application is used to visualize the test data and sentiment analysis results.

### Tools and Technologies

The tools and technologies used in this project include:
- **Angular**: For developing the user interface of the web application.
- **ExpressJS**: For creating the backend API that interacts with MongoDB.
- **MongoDB**: For storing the sentiment prediction results.
- **Bootstrap**: For developing a responsive and aesthetically pleasing user interface.

## Implementation

### Frontend

The frontend is developed using Angular and Bootstrap:
- **Landing Page**: Displays an overview of the application.
- **Dashboard**: Shows the sentiment analysis results and visualizations.

### Backend

The backend is developed using ExpressJS and MongoDB:
- **API Creation**: ExpressJS is used to develop the backend API, handling requests and real-time predictions.
- **Database Interaction**: The API interacts with MongoDB to store and retrieve sentiment prediction results.
