import { Client } from "pg";
const {CONNECTION_STRING}=require("../config");

const client = new Client({
    connectionString: CONNECTION_STRING
})



async function createTable() {
    await client.connect();
    // ` helps us write multi line strings in JS
    const result = await client.query(`  
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
    )
    console.log(result);
}

// createTable();
async function insertData() {
    try {
        await client.connect(); // Ensure client connection is established
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ('shivam', 'shivam@example.com', '123456');";
        const res = await client.query(insertQuery);
        console.log('Insertion success:', res); // Output insertion result
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end(); // Close the client connection
      }  
}

insertData();