// Retrieved from http://jsfiddle.net/e6220t92/2/

var arr = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe", "Seoul National Univ.", "Sadang"];
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

    optionsVal[idx].options.length = 0;

    if (input[idx].value) {
        dropdown.style.display = '';
        optionsVal[idx].size = 3;
        var textCountry = input[idx].value;

        for (var i = 0; i < arr.length; i++) {
            var testableRegExp = new RegExp(RegExp.escape(textCountry), "i");
            if (arr[i].match(testableRegExp)) {
                addValue(arr[i], arr[i], idx);
            }
        }
        /*
        if (typeof dropdown.children[0].children[0] == 'undefined') {
          console.log("NULL")
        } else {
          console.log(dropdown.children[0].children[0].innerText)
        }
        */

        var size = dropdown.children[0].children;
        if (size.length > 0)
        {
           var defaultSize = 27;
           if (size.length == 1)
           {
              defaultSize = 35;
           }
           else if (size.length < 5)
           {
              defaultSize *= size.length;
           }
           else
           {
              defaultSize *= 5;
           }
           dropdown.children[0].style.height = defaultSize + "px";
        }
        else
        {
          // there is no item
          dropdown.style.display = 'none';
        }

    }
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
