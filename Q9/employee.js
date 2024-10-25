const mysql = require('mysql2/promise');

// Function to connect to the MySQL database and perform operations
async function manageEmployees() {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',           // Replace with your MySQL username
      password: '',           // Replace with your MySQL password
      database: 'testdb'       // Replace with your database name
    });

    console.log('Connected to the MySQL database.');

    // Insert a new record into the employee table
    const insertQuery = `INSERT INTO employee (name, position, salary) VALUES (?, ?, ?)`;
    const [insertResult] = await connection.execute(insertQuery, ['John Doe', 'Software Engineer', 75000]);

    console.log('Record inserted:', insertResult);

    // Select and display all records from the employee table
    const [rows] = await connection.execute('SELECT * FROM employee');

    console.log('All employee records:');
    console.table(rows);

    // Close the database connection
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error connecting to MySQL or executing query:', error);
  }
}

// Call the function to manage employee data
manageEmployees();
