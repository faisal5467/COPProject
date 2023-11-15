
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const router = express.Router();


dotenv.config({path:"./.env"})

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  // host: 'localhost', 
  // user: 'root',
  // password: '',
  // database: 'earthlink_cop', // Your database name
  
  host:process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
  
});
// const connection = mysql.createConnection({
//   host: 'localhost', 
//   user: 'f4zii1hsuoie_earthlink-cop-admin',
//   password: 'Z%McIBoyzE#k',
//   database: 'f4zii1hsuoie_earthlink_cop', // Your database name
// });

// Ensure the connection to the MySQL database is established
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


app.get('/', (req, res) =>{
  res.send('hellow ')
 })
 
// //////////////////////////////


// Create a transporter using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//       user: 'ignatius.cormier76@ethereal.email',
//       pass: 'UJ9pD23xJ1MaffuCCj'
//   }
// });



// app.post('/submit', (req, res) => {
//   // Save the sale record to the database (Add your database saving logic here)

//   // Define the email data
//   const mailOptions = {
//     from: 'ignatius.cormier76@ethereal.email',
//     to: 'fgul8868298@gmail.com', // Replace with the actual recipient's email address
//     subject: 'Sale Record Submitted',
//     text: 'A new sale record has been submitted.',
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Email sending failed:', error);
//       res.status(500).send('Email sending failed.');
//     } else {
//       console.log('Email sent:', info.response);

//       // Send a success response to the client
//       res.status(200).send('Sale record submitted successfully hoo.');
//     }
//   });
// });

// //////////////////////////////////////


const transporter = nodemailer.createTransport({
  // service: 'gmail',
  // // Port: 465,
  // auth: {
  //   user: 'fgul8868298@gmail.com',
  //     pass: 'rtva borg tnzo flxc'
  // },

  host: 'mail.earthlink.com.pk',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'report@earthlink.com.pk',
    pass: 'earthlink@1234',
  },
 
});

// app.post('/send-email', (req, res) => {
//   const { to, subject, text } = req.body;

//   const mailOptions = {
//     from: 'fgul8868298@gmail.com', // Replace with your Gmail email
//     to: 'businesswork5467@gmail.com', // The recipient's email
//     subject: 'subject',
//     text: 'text',
//   };

//   // const mailOptions = {
//   //   from: 'fgul8868298@gmail.com', // Replace with your Gmail email
//   //   to: to, // The recipient's email
//   //   subject: subject,
//   //   text: text,
//   // };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Email sending failed:', error);
//       res.status(500).send('Email sending failed.');
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).send('Email sent successfully.');
//     }
//   });
// });


//////////////////////////////////////
app.post('/send-email', (req, res) => {
  const { to, subject, formData } = req.body; // Assuming formData contains all the form fields
  const { customername, contactnumber, cnic, customerEmail, agentEmpid, managerEmpid , slotNumber, unitNumber, floorNumber, projectName, projectDownPayment, fullPayment, token, tokenInWords ,downpaymentInWords, fullPaymentInWords, copType } = formData;

  const mailOptions = {
    from: 'report@earthlink.com.pk', // Replace with your Gmail email
    to: to, // The recipient's email
    subject: subject,
    text: `
      Customer Name: ${customername}
      Contact Number: ${contactnumber}
      CNIC: ${cnic}
      Customer Email: ${customerEmail}
      Agent Employee ID: ${agentEmpid}
      Manager Employee ID: ${managerEmpid}
      Slot Number: ${slotNumber}
      Unit Number: ${unitNumber}
      Floor Number: ${floorNumber}
      Project Name: ${projectName}
      Project Down Payment: ${projectDownPayment}
      Full Payment: ${fullPayment}
      Token: ${token}
      Token Payment in Words: ${tokenInWords}
      Down Payment in Words: ${downpaymentInWords}
      Full Payment in Words: ${fullPaymentInWords}
      COP Type: ${copType}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
      res.status(500).send('Email sending failed.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully.');
    }
  });
});

// app.post('/submit-sale-record', (req, res) => {
//   // Code to save the sale record in the database

//   // Check if record is saved successfully
//   if (recordSavedSuccessfully) {
//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ message: 'Error sending email' });
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).json({ message: 'Sale record submitted successfully' });
//       }
//     });
//   } else {
//     res.status(500).json({ message: 'Error saving sale record' });
//   }
// });

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
    // const { email ,EmployeeID, password } = req.body;
    const { employeeid, password } = req.body;
  
    // Query your database to check if the provided email and password match a user
    connection.query(
      'SELECT * FROM users WHERE EmployeeID = ? AND password = ?',
      [employeeid, password],
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

// for store the salerecord data in the database

app.post('/saveSaleRecord', (req, res) => {
  const saleRecord = req.body; // Assuming you send the sale record data in the request body

  // Add the current date and time to the sale record
  saleRecord.saleDateTime = new Date();

  // Insert the sale record into the database
  const sql = 'INSERT INTO salerecord SET ?';

  connection.query(sql, saleRecord, (err, result) => {
    if (err) {
      console.error('Error saving sale record:', err);
      return res.status(500).json({ error: 'Failed to save sale record' });
    }
    console.log('Sale record saved successfully');
    return res.status(201).json({ message: 'Sale record saved successfully' });
  });
});



app.get('/', (req, res) => {
    res.send('Hello, g. server!');
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
