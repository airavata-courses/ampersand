/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 28.88888888888889, "KoPercent": 71.11111111111111};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.09955555555555555, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Reset Password"], "isController": false}, {"data": [0.0, 500, 1500, "Update User Profile"], "isController": false}, {"data": [0.4, 500, 1500, "Get User Status"], "isController": false}, {"data": [0.0, 500, 1500, "Register User"], "isController": false}, {"data": [0.23255813953488372, 500, 1500, "Get Users"], "isController": false}, {"data": [0.23255813953488372, 500, 1500, "Check Username Availability"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1125, 800, 71.11111111111111, 26769.8293333333, 189, 113585, 32960.0, 60039.0, 60082.7, 90899.42000000007, 7.339653046445325, 9.227702337924152, 2.2134023491782853], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Reset Password", 65, 0, 0.0, 36263.692307692305, 30491, 83056, 30885.0, 56550.799999999996, 58229.4, 83056.0, 0.4423634458070751, 0.30196489122963427, 0.16199833220473941], "isController": false}, {"data": ["Update User Profile", 22, 1, 4.545454545454546, 64144.13636363635, 31564, 85066, 63648.5, 84531.8, 85022.05, 85066.0, 0.20462451401677922, 0.1945240852354112, 0.08512699508901167], "isController": false}, {"data": ["Get User Status", 130, 45, 34.61538461538461, 18866.776923076923, 189, 63257, 680.0, 60064.8, 60080.8, 63248.01, 1.3394605065221423, 1.8335978714169432, 0.2888211717188369], "isController": false}, {"data": ["Register User", 650, 650, 100.0, 30843.760000000006, 644, 113585, 34218.0, 38583.6, 60069.35, 113514.39, 5.28459580972203, 5.964924003447183, 1.8724348749786583], "isController": false}, {"data": ["Get Users", 86, 17, 19.767441860465116, 14396.06976744186, 671, 60046, 1775.0, 60040.3, 60045.0, 60046.0, 0.8594843094143514, 1.270741461373176, 0.20674118966120328], "isController": false}, {"data": ["Check Username Availability", 172, 87, 50.58139534883721, 15166.046511627907, 198, 63263, 744.5, 60043.7, 62787.95, 63247.67, 1.8195089441558852, 3.2827566155546855, 0.28860613515672107], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 15, 1.875, 1.3333333333333333], "isController": false}, {"data": ["503/Service Unavailable", 1, 0.125, 0.08888888888888889], "isController": false}, {"data": ["504/Gateway Time-out", 10, 1.25, 0.8888888888888888], "isController": false}, {"data": ["500/Internal Server Error", 493, 61.625, 43.82222222222222], "isController": false}, {"data": ["Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 281, 35.125, 24.977777777777778], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1125, 800, "500/Internal Server Error", 493, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 281, "400/Bad Request", 15, "504/Gateway Time-out", 10, "503/Service Unavailable", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Update User Profile", 22, 1, "504/Gateway Time-out", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get User Status", 130, 45, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 38, "400/Bad Request", 7, null, null, null, null, null, null], "isController": false}, {"data": ["Register User", 650, 650, "500/Internal Server Error", 493, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 145, "504/Gateway Time-out", 9, "400/Bad Request", 2, "503/Service Unavailable", 1], "isController": false}, {"data": ["Get Users", 86, 17, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 17, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Check Username Availability", 172, 87, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 81, "400/Bad Request", 6, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
