const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// Path to the CSV file
const csvFilePath = path.join('test.csv');

// Path to the JSON file
const jsonFilePath = path.join('result.json');

// Read the CSV file and convert JSON format
csv()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    let message;
    
    const mappedJsonArray = jsonArray.map(row => {
      return {
        name: row['Name'],
        surname: row['Surname'],
        phone: row['Phone'],
        email: row['Email'],
        description: row['Description'],
        params: [
          {
            country: row['Country'],
          },
          {
            city: row['City'],
          }
        ],
      };
    });

    // Write the JSON output to a file
    fs.writeFile(jsonFilePath, JSON.stringify(mappedJsonArray, null, 2), (err) => {
      if (err) {
        console.error('JSON dosyasına yazılırken bir hata oluştu:', err);
      } else {
        console.log('CSV dosyası başarıyla JSON formatına dönüştürüldü.');
      }
    });
  })
  .catch((err) => {
    console.error('CSV dosyası okunurken bir hata oluştu:', err);
  });
