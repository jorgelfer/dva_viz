# Data pre-processing
Data is already cleaned and stored in "vehicles2_rec.csv"
Execute Datacleaning.py on original data file "west_oldeastconcat.csv" to create "vehicles2_rec.csv"

# SQLLite Database
Database is already available "vehicles.db"
It can be created by executing DBcreator.py

# Back-end
# Requirements
Python V3.13
pip


To load the images (20gb):
unzip the "img" folder and place it in the root directory

execute:
pip install -r requirements.txt


# Front-end
# Installation
Install [Node.js](https://nodejs.org/en/download/package-manager)

Install dependencies `npm install`

# Run the UI
`npm run start`

# Initiating the Back-end
In the main folder, access new terminal
Execute sqlite.py 


# Execution
1) Install the latest Python version, npm & git.
2) open git BASH and execute 
git clone https://github.com/jorgelfer/dva_viz.git

3) open VS code and open the local repo
4) Start a new terminal in vs code and in the root directory, execute
pip install -r requirements.txt
python .\sqlite.py

6) Let the terminal be open and start a new terminal in vs code using the "+" button on the top right of the terminal.
navigate to src folder
cd src
npm install
npm run start

7) the website should be open in your browser.
8) Make your search preference and click "Submit"
9) 2 option on the top left corner of the map ("cursor" & "brush")
Cursor to select individual points and the brush to select a area.
10) For demo purpose only Georgia state car images are loaded (to view car images select any car from Georgia)
11) you can see the details of your selected car by clicking "Details" button from the side bar



