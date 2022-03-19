import './App.css';
import {React, useEffect} from 'react';
import axios from 'axios';

function URequest() {
  document.title = "User History"
    useEffect(async () => {

      var user_data_url = "http://localhost:3001/users/name";
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const name = urlParams.get("name");
      console.log(name);
      
      axios.post(user_data_url, {
         username: name 
      })
      .then(res =>{
        var list = res.data;
        
        // data formatting
        for (var i = 0; i < list.length; i++) {
          delete list[i].username
          delete list[i]._id
          delete list[i].aws_fname
          delete list[i].aws_url
          delete list[i].__v
        }

        console.log(list)
        var head = ["Time Stamp", "Radar Station", "Year", "Month", "Day", "STIME-HOUR", "STIME-MIN", "STIME-SEC", "ETIME-HOUR", "ETIME-MIN", "ETIME-SEC", "IMAGE-URL"];
        var cols = [];
			
        for (var i = 0; i < list.length; i++) {
          for (var k in list[i]) {
            if (cols.indexOf(k) === -1) {
              
              // Push all keys to the array
              cols.push(k);
            }
          }
        }
        console.log(cols)
        // Create a table element
        var table = document.createElement("table");
        
        // Create table row tr element of a table
        var tr = table.insertRow(-1);

        for (var i = 0; i < cols.length; i++) {
				
          // Create the table header "th" element
          var theader = document.createElement("th");
          theader.innerHTML = head[i];
          
          // Append columnName to the table row
          tr.appendChild(theader);
			  }
        
			  // Adding the data to the table
			  for (var i = 0; i < list.length; i++) {

          // Create a new row
          var trow = table.insertRow(-1);
          for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);
            

            // Inserting the cell at particular place
            cell.innerHTML = list[i][cols[j]];

            if(j==cols.length-1){

              console.log(list[i][cols[j]])

              var link = list[i][cols[j]]
              var newA = document.createElement('a')
              newA.setAttribute('href',link)
              newA.innerHTML = '&#8599'
              
              cell.appendChild(newA)
              
            }
            
				}
			}
			
			// Add the newly created table containing json data
			var el = document.getElementById("table");
			el.innerHTML = "";
			el.appendChild(table);

      })

    });
      
  return (
    <div className="App">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
      <h1>USER REQUESTS HISTORY</h1>
      <hr/><br/><br/>
      <table id="table" align="center" border="1px"></table>
    </div>
  );
}

export default URequest;