import sqlite3 from 'sqlite3';
const DBSOURCE = "usersdb.sqlite";


export const openConnection = () => {
  let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } 
  else {        
      
      db.run(`CREATE TABLE Products (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name string,
          Price number,
          UpdateDate DATE
          )`,
      (err) => {
          if (err) {
              // Table already created
          } else{
              // Table just created, creating some rows
              var insert = 'INSERT INTO Products (Name, Price, UpdateDate) VALUES (?,?,?)'
              db.run(insert, ["1", "12", Date()])
              db.run(insert, ["2", "13", Date()])
              db.run(insert, ["3", "14,55", Date()])
          }
      });  
  }
})
  return db 
}


export const dbQueryFirst = async (query: string, params?: any[]) => {
  const returning = await dbQuery(query, params);
  return returning[0];
}


export const dbQuery = (query: string, params?: any[]) => {
  let db = openConnection()
  return new Promise<any[]>((resolve, reject) => {

      db.all(query, params, (err, rows) => {
          if(err)
              reject(err);
          else
              resolve(rows);
      })

  })
  .finally(() => {
      db.close();
  })
}

