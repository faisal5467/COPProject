// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'earthlink_cop', // Your database name
// });

// app.post('/signup', (req, res) => {
 
//     const sql = "INSERT INTO users (`name`, `email` , `password` VALUES (?)";

//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     connection.query(sql, [values], (err, data) =>{
//         if(err) {
//             return res.json("Error haai");
//         }
//         return res.json(data);
//     })

// //   const { name, email, password } = req.body;

// //   connection.query(
// //     'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
// //     [name, email, password],
// //     (error, results) => {
// //       if (error) {
// //         console.error('Error registering user: ', error);
// //         res.status(500).send('Error registering user');
// //       } else {
// //         res.status(201).send('User registered successfully');
// //       }
// //     }
// //   );
// });



// // app.get('/', (req, res) => {
// //     res.send('Hello, g.!');
// //   });
  

//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
//   //////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'earthlink_cop', // Your database name
});

// Ensure the connection to the MySQL database is established
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
//////////////////////////signup
app.post('/signup', (req, res) => {
  const { name, email, password, employeeid , role } = req.body;
  const sql = 'INSERT INTO users (name, email, password, EmployeeID, role ) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, password, employeeid , role];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error during user registration:', err);
      return res.status(500).json({ error: 'Registration failed' });
    }
    console.log('User registered successfully');
    return res.status(201).json({ message: 'User registered successfully' });
  });
});

// ////////////////////////////// role

// Define an API endpoint to get the role
// app.get('/getRole/:userId', (req, res) => {
//   const userId = req.params.userId;

//   // Define SQL query to retrieve the role
//   const sql = 'SELECT role FROM users WHERE id = ?';
  
//   // Execute the query
//   connection.query(sql, [userId], (err, results) => {
//     if (err) {
//       console.error('Error fetching user role:', err);
//       return res.status(500).json({ error: 'Failed to fetch user role' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const userRole = results[0].role;
//     res.status(200).json({ role: userRole });
//   });
// });



///////////////////////login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Query your database to check if the provided email and password match a user
    connection.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (error, results) => {
        if (error) {
          console.error('Login error: ', error);
          res.status(500).json({ error: 'Login error' });
        } else if (results.length === 1) {
          // User found and authenticated successfully
          const user = results[0];
          res.status(200).json({ user });
        } else {
          // User not found or invalid credentials
          res.status(401).json({ error: 'Invalid email or password' });
        }
      }
    );
  });

  ////////////////////////////////projects 
  app.get('/projects', (req, res) => {
    // Fetch projects from the Projects table
    connection.query('SELECT * FROM Projects', (error, results) => {
      if (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Error fetching projects' });
      } else {
        res.json(results);
      }
    });
  });

// //////////////////////////////////////project details
// app.get('/projecttable/:projectId', (req, res) => {
//     const projectId = req.params.projectId;
  
//     const sql = `
//        SELECT *
//        FROM projects
//        WHERE ProjectID = ?
//     `;
  
//     connection.query(sql, [projectId], (error, results) => {
//       if (error) {
//         console.error('Error fetching project details:', error);
//         res.status(500).json({ error: 'Error fetching project details' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });
// ///////////////////////////////////////////////////////rat ko jo kam kr raha tha

app.get('/projecttable/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    // Your SQL query
    const sql = `
        SELECT
            p.ProjectID,
            p.ProjectName,
            p.Description,
            f.FloorID,
            f.FloorNumber,
            u.UnitID,
            u.UnitNumber,
            s.SlotID,
            s.SlotNumber,
            s.Size,
            s.Status
        FROM Projects AS p
        LEFT JOIN Floors AS f ON p.ProjectID = f.ProjectID
        LEFT JOIN Units AS u ON f.FloorID = u.FloorID
        LEFT JOIN Slots AS s ON u.UnitID = s.UnitID
        WHERE p.ProjectID = ?;
    `;

    connection.query(sql, [projectId], (error, results) => {
        if (error) {
            console.error('Error fetching project details:', error);
            res.status(500).json({ error: 'Error fetching project details' });
        } else {
            res.status(200).json(results);
        }
    });
});


// ////////////////////////////////////////////////////////////update slot status
app.put('/updateSlotStatus/:slotNumber', (req, res) => {
    const slotNumber = req.params.slotNumber;
    const newStatus = req.body.status;
  
    // Check if newStatus is valid (available, hold, booked, or sold)
    if (['available', 'hold', 'booked', 'sold'].includes(newStatus)) {
      // Perform an SQL query to update the slot status in the database
      const sql = `
        UPDATE slots
        SET Status = ?
        WHERE SlotNumber = ?
      `;
  
      connection.query(sql, [newStatus, slotNumber], (error, results) => {
        if (error) {
          console.error('Error updating slot status:', error);
          res.status(500).json({ error: 'Error updating slot status' });
        } else {
          console.log('Slot status updated successfully');
          res.status(200).json({ message: 'Slot status updated successfully' });
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid status' });
    }
  });


// /////////////////////////////////////////////////////

// Define an endpoint for checking if an email already exists
app.get("/checkEmail/:email", (req, res) => {
  const emailToCheck = req.params.email;
  const query = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  connection.query(query, [emailToCheck], (error, results) => {
    if (error) {
      console.error("Error checking email:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if the email exists
    const count = results[0].count;
    if (count > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
});




// /////////////////////////////////////////////////


app.get('/', (req, res) => {
    res.send('Hello, g.!');
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
