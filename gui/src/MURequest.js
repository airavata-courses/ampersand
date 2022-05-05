import './App.css';
import {React, useEffect} from 'react';
import axios from 'axios';
const host_url = require("./Utilities.js")

function URequest() {
  var usernamed = ""
  document.title = "User History"
    useEffect(async () => {

      var user_data_url = host_url.host_url+ ":30001/merra/name";
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const uname = urlParams.get("username");
      usernamed = uname
      console.log(uname);
      
      axios.post(user_data_url, {
         username: uname 
      })
      .then(res =>{
        var list = res.data;
        
        // data formatting
        for (var i = 0; i < list.length; i++) {
          delete list[i].username
          delete list[i]._id
          delete list[i].__v
          delete list[i].place
        }

        console.log(list)
        // var head = ["Time Stamp", "Radar Station", "Year", "Month", "Day", "STIME-HOUR", "STIME-MIN", "STIME-SEC", "ETIME-HOUR", "ETIME-MIN", "ETIME-SEC", "IMAGE-URL"];
        var head = ["Time Stamp", "Year", "Longitude", "Latitude", "IMAGE-URL"];
        var cols = [];
			
        for (var j = 0; j < list.length; j++) {
          for (var k in list[j]) {
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

        for (var q = 0; q < cols.length; q++) {
				
          // Create the table header "th" element
          var theader = document.createElement("th");
          theader.innerHTML = head[q];
          
          // Append columnName to the table row
          tr.appendChild(theader);
			  }
        
			  // Adding the data to the table
			  for (var c = 0; c < list.length; c++) {

          // Create a new row
          var trow = table.insertRow(-1);
          for (var d = 0; d < cols.length; d++) {
            var cell = trow.insertCell(-1);
            

            // Inserting the cell at particular place
            cell.innerHTML = list[c][cols[d]];

            if(d === cols.length-1){

              console.log(list[c][cols[d]])

              var link = list[c][cols[d]]
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
      <h1 style={{color:"whitesmoke"}}> USER REQUEST HISTORY FOR {usernamed}</h1>
      <hr/><br/><br/>
      <table id="table" align="center" border="1px" color="whitesmoke"  style={{color:"whitesmoke"}}></table>
    </div>
  );
}

export default URequest;