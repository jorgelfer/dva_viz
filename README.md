# DATA-DRIVEN RECOMMENDATION FOR USED CAR PURCHASE IN THE USA

This project provides a comprehensive tool for analyzing used car prices across the USA, helping users make informed decisions by visualizing data, predicting prices, and offering personalized recommendations. It combines extensive data scraping, machine learning, and a user-friendly interactive web interface.

DEMO VIDEO - [Watch Demo Video](https://www.youtube.com/watch?v=D8gs4adZwwM)
---

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
    - [Back-End](#back-end)
    - [Front-End](#front-end)
    - [Data Pre-Processing](#data-pre-processing)
5. [Execution Instructions](#execution-instructions)
6. [Usage Guide](#usage-guide)
7. [Detailed Explanations](#detailed-explanations)
    - [Data Collection](#data-collection)
    - [Data Pre-Processing](#data-pre-processing)
    - [Database](#database)
    - [Machine Learning Models](#machine-learning-models)
    - [Interactive Visualization](#interactive-visualization)
8. [Additional Notes](#additional-notes)
9. [Technologies Used](#technologies-used)
10. [Acknowledgments](#acknowledgments)

---

## Overview

The used car market has been rapidly growing due to increased demand, reduced new car production, and supply chain constraints. This project:
- Creates a custom dataset via web scraping (over 60,000 listings).
- Builds an interactive web platform to explore car listings.
- Implements machine learning models to predict prices and recommend listings.

---

## Key Features

1. **Custom Dataset**: Over 60,000 used car records scraped from Craigslist, including:
   - Car make, model, year, condition, price, location, and images.
   - Data on sellers, odometer readings, and title status.
2. **Interactive Visualization**:
   - A map-based tool where users can filter, brush, and select listings.
   - Sidebar displays details and images for selected cars.
3. **Machine Learning**:
   - Random Forest Regressor for price prediction.
   - Cosine similarity for personalized recommendations.
4. **Full-Stack Implementation**:
   - SQLite back-end with Flask-based APIs.
   - React and D3.js for front-end visualization.

---

## Project Structure

```
dva_viz/
├── src/                   # Front-end React and D3.js code
├── backend/               # Flask API and database setup
├── data/                  # Raw and processed datasets
├── img/                   # Car images (only Georgia by default)
├── vehicles.db            # SQLite database file
├── requirements.txt       # Python dependencies
├── package.json           # Front-end dependencies
├── Datacleaning.py        # Data cleaning script
├── DBcreator.py           # Script to generate the SQLite database
└── README.md              # Project documentation
```

---

## Setup and Installation

### Prerequisites
Ensure the following are installed:
- Python 3.13 or later
- Node.js ([Install Here](https://nodejs.org/en/download/package-manager))
- Git
- Dependencies (detailed below)

### Back-End

1. Clone the repository:
   ```bash
   git clone https://github.com/jorgelfer/dva_viz.git
   cd dva_viz
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create and load the SQLite database (if not already available):
   ```bash
   python DBcreator.py
   ```

4. Start the back-end server:
   ```bash
   python sqlite.py
   ```

### Front-End

1. Navigate to the `src` folder:
   ```bash
   cd src
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the front-end server:
   ```bash
   npm run start
   ```

---

## Execution Instructions

1. **Run the Back-End**:
   - Open a terminal and execute:
     ```bash
     python sqlite.py
     ```
   - Leave this terminal open to keep the server running.

2. **Run the Front-End**:
   - Open a new terminal in the `src` folder and execute:
     ```bash
     npm run start
     ```

3. **Access the Application**:
   - Open your browser to the provided localhost URL.

4. **Load Images**:
   - By default, the `img` folder contains images for Georgia car listings.
   - To view images for all states, replace the `img` folder with the full version available [here](https://gtvault-my.sharepoint.com/:u:/g/personal/ssudhakar36_gatech_edu/EUNbA5tKdRNAjs9xs5liNSMBKPhko9hkChnjwiUy8WLbtg?e=nqCGJl). Unzip the folder in the root directory (Size 20gb).

---

## Usage Guide

1. **Search Preferences**:
   - Select filters like price range, make, and color from the form on the landing page.
   - Click "Submit" to generate results.

2. **Map Interaction**:
   - Use the **cursor** to select individual points or the **brush** to select an area.
   - Listings in the selected area will populate the sidebar.

3. **View Car Details**:
   - Click "Details" on a listing in the sidebar to view full car information and images.

4. **Recommendations**:
   - The system ranks listings by relevance using a cosine similarity score.

---

## Detailed Explanations

### Data Collection
- **Tools**: Python (Selenium, BeautifulSoup) for scraping Craigslist.
- **Workflow**:
  1. Gather listings with essential attributes like price, make, year, and condition.
  2. Handle dynamic web pages with custom filters (e.g., private sellers only).
  3. Scrape images alongside textual data for enhanced visualization.
- **Output**: Raw data in CSV format (`west_oldeastconcat.csv`).

### Data Pre-Processing
- **Script**: `Datacleaning.py`
- **Steps**:
  1. Combine multiple CSVs into one dataset.
  2. Remove duplicates using unique post IDs.
  3. Impute missing values intelligently (e.g., replace missing car conditions with the mode).
  4. Standardize categorical columns for consistency.
  5. Save the cleaned data to `vehicles2_rec.csv`.

### Database
- **Schema**:
  - Fields include post ID, car make, model, year, price, and condition.
  - Optimized for quick API queries.
- **Setup**:
  - The database (`vehicles.db`) is already included in the package. Running `DBcreator.py` provides an additional backup option.

### Machine Learning Models
- **Recommendation**:
  - Uses cosine similarity on user preferences (make, price range, color).
  - Weighted scores ensure relevance.
- **Price Prediction**:
  - Random Forest Regressor trained on make, model, year, and condition.
  - Delivers predictions close to current market trends.

### Interactive Visualization
- **Front-End**:
  - Built with React and D3.js.
  - Features a dynamic map for filtering and selecting listings.
- **Interactions**:
  - Brush or click to interact with map points.
  - Results dynamically update in the sidebar.
- **Performance**:
  - React handles DOM efficiently for smooth brushing and linking.

---

## Additional Notes

- The `img` folder in the package contains images for Georgia state only. To access images for all states, download the full `img` zip file from [this OneDrive link](https://gtvault-my.sharepoint.com/:f:/g/personal/ssudhakar36_gatech_edu/Eo-ToCTm9UxFqhco90crpK4B-QO_H7TtDT2_ygVXmD0PsQ?e=p35aog) and replace the existing `img` folder in the root directory.
- The included SQLite database (`vehicles.db`) is preloaded and ready for use. The `DBcreator.py` script is provided as an optional backup step for rebuilding the database.

---

## Technologies Used

- **Python**: Back-end logic, scraping, and machine learning.
- **Flask**: RESTful API for data queries.
- **SQLite**: Lightweight database.
- **React**: Front-end framework.
- **D3.js**: Advanced data visualization.
- **Node.js**: Dependency management and front-end setup.

---

## Acknowledgments

- **Team Members**:
  - Shrramana (ssudhakar36)
  - Anoch (amohan321)
  - Ramya (rsrinivasan40)
  - Jorge (jfernandez87)
  - Zhiyu (zchen763)
  - Alex (agarciamora3)

- **Resources**:
  - Python libraries (Pandas, scikit-learn)
  - React and D3.js for UI development
  - Craigslist for raw data


