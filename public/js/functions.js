/*
 * Read station data
 */
// Retrieved from http://jsfiddle.net/e6220t92/2/

var targets =[];
var mymap = L.map('mapid');
const fileUrl = '../src/stations.csv' // provide file location
fetch(fileUrl)
   .then( r => r.text() )
   .then( t => CSVToArray(t) )
   .then( arr => autocomplete(arr) )

/*
 * Start autocomplete logic
 * Add Go() button event listener here
 */
function autocomplete(arr) {
  var input = document.getElementsByClassName("autocomplete-input")
  var optionsVal = document.getElementsByClassName("autocomplete-list")

  input[0].addEventListener('keyup', function(){
      show(0);
  });
  optionsVal[0].onclick = function () {
      setVal(this, 0);
  };

  input[1].addEventListener('keyup', function(){
      show(1);
  });
  optionsVal[1].onclick = function () {
      setVal(this, 1);
  };

  //Use this function to replace potential characters that could break the regex
  RegExp.escape = function (s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  //shows the list
  function show(idx) {
      var dropdown = document.getElementsByClassName("autocomplete-dropdown")[idx]
      dropdown.style.display = 'none';

      optionsVal[idx].options.length = 1;

      if (input[idx].value) {
          dropdown.style.display = '';
          optionsVal[idx].size = 3;
          var textCountry = input[idx].value;

          for (var i = 1; i < arr.length; i++) {
              //var testableRegExp = new RegExp(RegExp.escape(textCountry), "i");
              if (arr[i][3].match(textCountry)) {
                  addValue(arr[i][3], arr[i][3], idx);
              }
          }
      }

      var x, i, j, selElmnt, a, b, c;
      /* Look for any elements with the class "custom-select": */
      x = document.getElementsByClassName("custom-select");
        while (x[idx].childElementCount > 1) {
          x[idx].removeChild(x[idx].lastChild);
        }
        selElmnt = x[idx].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        //a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[idx].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items");
        for (j = 1; j < selElmnt.length; j++) {
          /* For each option in the original select element,
          create a new DIV that will act as an option item: */
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function(e) {
              /* When an item is clicked, update the original select box,
              and the selected item: */
              var y, i, k, s, h;
              s = this.parentNode.parentNode.getElementsByTagName("select")[0];
              h = this.parentNode.previousSibling;
              for (var i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                  s.selectedIndex = i;
                  h.innerHTML = this.innerHTML;
                  y = this.parentNode.getElementsByClassName("same-as-selected");
                  for (k = 0; k < y.length; k++) {
                    y[k].removeAttribute("class");
                  }
                  this.setAttribute("class", "same-as-selected");
                  break;
                }
              }
              h.click();
          });
          b.appendChild(c);
        }
        x[idx].appendChild(b);
        a.addEventListener("click", function(e) {
          /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
          input[idx].value = this.innerHTML;
        });

      function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i)
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < x.length; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
      }

      // Set height
      var options = b.children;
      if (options.length > 0)
      {
         var defaultSize = 40;
         if (options.length < 5) {
            defaultSize *= options.length;
         } else {
            defaultSize *= 5;
         }
         b.style.height = defaultSize + "px";
      }

      /* If the user clicks anywhere outside the select box,
      then close all select boxes: */
      document.addEventListener("click", closeAllSelect);
  }

  function addValue(text, val, idx) {
      var createOptions = document.createElement('option');
      optionsVal[idx].appendChild(createOptions);
      createOptions.text = text;
      createOptions.value = val;
  }

  //Settin the value in the box by firing the click event
  function setVal(selectedVal, idx) {
      input[idx].value = selectedVal.value;
      document.getElementsByClassName("autocomplete-dropdown")[idx].style.display = 'none';
  }


  /*
   * Logo & Go() button event listener
   * Send & Receive transactions here
   */

   // after logo
   UIkit.util.on('#logo', 'scrolled', function () {
     document.getElementById("body2").style.display="none";
     document.getElementById("emptydiv").style.display="none";
   });

   // before go
   UIkit.util.on('#go', 'beforescroll', function () {
     console.log("1. Click go button");
     openSpinner(getTargets);
   });

   // after go
   UIkit.util.on('#go', 'scrolled', function () {
     closeSpinnerAndBody();
   });

  // < Open loading status >
  function openSpinner(callback) {
    console.log("2. Open spinner (loading status)");
    document.getElementById("spinner").style.display="";
    document.getElementById("go").style.display="none";
    callback(getArrivalTime);
  }

  // < Get departure & arrival & targets >
  function getTargets(callback) {
    var departure, arrival, targets;
    console.log("3. Get targets (top 10 closest stations)");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][3] == input[0].value) {
            departure = arr[i];
        }
        if (arr[i][3] == input[1].value) {
            arrival = arr[i];
            targets = getCloseStations(i, 10) // Get top 10 close stations from here
        }
    }
    callback(departure, targets, sendPredictTx);
  }

  // < Make all txs from departure to targets >
  // 1. Get time (departure <-> targets)
  function getArrivalTime(departure, targets, callback) {
    console.log("4. Get target station id & travel time (hr)");
    var targetIDs = [];
    var travelTimes = [];
    for (var i = 0; i < targets.length; i++) {
      targetIDs.push(targets[i][2]);
      travelTimes.push(getTravelTimeHour(departure, targets[i]));
    }
    console.log(targetIDs, travelTimes);
    callback(departure, targets, targetIDs, travelTimes, getPredictResult);
  }

  // 2. Send expected arrival time & target id by Tx
  function sendPredictTx(departure, targets, targetIDs, travelTimes, callback) {
    console.log("5. Send predict tx with timestamp [todo]");
    reqTime = (new Date()).getTime();
    console.log(reqTime);
    /*
    $.ajax({
        url: "https://api.luniverse.io/tx/v1.0/transactions/getBikeNum3",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
        },
        type: 'POST',
        contentType: 'application/json',
        processData: false,
        data: '{"from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b","inputs": {"stationID": "987"}}',
        success: function (data) {
          alert(JSON.stringify(data));
        },
        error: function(){
          alert("Cannot get data");
        }
    });
    */
    callback(departure, targets, updateMap);
  }

  // < Get reply tx and update map>
  // 1. Get (target station id, incentive)
  function getPredictResult(departure, targets, callback) {
    console.log("6. Get predict result [todo]");
    callback(departure, targets);
  }

  // 2. Update map
  function updateMap(departure, targets) {
    // 지도 중심 계산
    let lat_mean = 0;
    let long_mean = 0;
    for (var i=0;i<targets.length;i++){
      lat_mean += parseFloat(targets[i][6]);
      long_mean += parseFloat(targets[i][7]);
    }
    lat_mean /= 10;
    long_mean /= 10;

    // 지도 중심 이동
    mymap.setView([lat_mean,long_mean], 14);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      // 용환 mapbox public accesToken (이대로 두면 됨)
      accessToken: 'pk.eyJ1IjoiZXJpYy15b28iLCJhIjoiY2swMG45M29uMDVjNzNtbGs3Zm01ODVlaiJ9.xUr6rCrxrGVEsaV-vf7fFw'
    }).addTo(mymap);

    // 마커 추가
    for (var i=0;i<targets.length;i++) {
      var marker = L.marker(targets[i].slice(6,8));
      marker.addTo(mymap);
      marker.bindPopup(targets[i][2] + '. ' + targets[i][3] + '\n'
                        + '<span class\="uk-label\" style=\"background-color:#ffd250;color:#000;\"><span uk-icon=\"bolt\"></span>10,000</span>');
      if (i==0) marker.openPopup();
    }
    console.log("7. update map");
    // 여기에서 Targets 정류장을 지도에 표시
    // targets[0]~targets[9] 까지 있음 (목적지 + 목적지와 가까운 정류장 9개)
    // targets[i][6] : 위도, targets[i][7] : 경도
    // 자세한 정보는 이 부분에서 console 에 프린트 되는 targets element 참고
    console.log("Departure : ", departure)
    console.log("Targets : ", targets)

    // Set departure info
    document.getElementById("departure").innerHTML =
    "<B>[" + departure[2] + ". " + departure[3] + "]</B>" + "<br />" + departure[4];
  }

  // Get N closest stations from arr_index
  function getCloseStations(index, n) {
    var target = arr[index]; // arrival station
    // only iterate 100
    var searchStart = ((index-50) > 0) ? index-50 : 1;
    var searchEnd = ((index+50) <= arr.length-1) ? index+50 : arr.length-1;
    var distances = [];
    for (var i = searchStart; i <= searchEnd; i++) {
      // get distance [km]
      distances.push([computeDistance(arr[i],target),i])
    }
    distances.sort(function(left, right) {
      return left[0] < right[0] ? -1 : 1;
    });

    targets = [];
    for (var i = 0; i < n; i++) {
      targets.push(arr[distances[i][1]]);
    }
    return targets;
  }

  // Get travel time
  function getTravelTimeHour(departure, arrival) {
    dist = computeDistance(departure,arrival); // km
    time = dist / 10; // hour (10km/h)
    return Math.round(time);
  }
}




/*
 * Util functions
 */

// https://m.blog.naver.com/javaking75/220342410214
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords[6]);
    var startLongRads = degreesToRadians(startCoords[7]);
    var destLatRads = degreesToRadians(destCoords[6]);
    var destLongRads = degreesToRadians(destCoords[7]);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

// < Close the loading status and scroll to next page >
function closeSpinnerAndBody() {
  console.log("8. Close spinner/body1 (after scroll)");
  document.getElementById("spinner").style.display="none";
  document.getElementById("go").style.display="";
  document.getElementById("body1").style.display="none";
  document.getElementById("emptydiv").style.display="none";
}

function showbody1() {
  document.getElementById("body1").style.display="";
  document.getElementById("emptydiv").style.display="";
  window.scrollTo(0,document.body.scrollHeight);
}

function showbody2() {
  document.getElementById("emptydiv").style.display="";
  document.getElementById("body2").style.display="";
}
