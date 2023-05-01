# Financial-Tracker
This is a simple income and expense tracker web application developed using Node.js, Express.js, EJS templating engine and MongoDB database.
![finance-tracker-app](https://user-images.githubusercontent.com/38762229/235467671-4938bb0f-d0b0-4b33-bbeb-6f831307b60f.png)



<h2>Requirements</h2>
To run the application, you will need the following installed on your system:

<ul>
<li>Node.js</li>
<li>MongoDB</li>
<li>API key from apilayer.com</li>
</ul>

<h2>Installation</h2>
<ol>
<li>Clone this repository to your local machine.</li>
<li>Navigate to the project directory in the terminal/command prompt.</li>
<li>Run npm install to install the required dependencies.</li>
<li>Create a .env file in the root directory of the project.</li>
<li>Add the following environment variables to the .env file:</li>
<ul>
<li>MONGODB_URL="your_mongodb_url"</li>
<li>API_KEY="your_api_key"</li>
</ul>
<li>Run the application using npm start or node index.js.</li>
<li>Open a web browser and navigate to http://localhost:3000 to access the application.</li>
</ol>

<h2>Usage</h2>
The application allows you to keep track of your expenses and income. You can add new transactions, filter them by currency, and delete transactions. The application fetches currency rates from the apilayer.com API and calculates the dollar value of each transaction based on the selected currency and convert it to desired currency.


<h2>Dependencies</h2>
The following npm packages are used in the application:

<ul>
<li>express</li>
<li>ejs</li>
<li>body-parser</li>
<li>mongoose</li>
<li>shortid</li>
</ul>









