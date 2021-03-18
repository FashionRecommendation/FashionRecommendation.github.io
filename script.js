// Proprietes for element counting in array
Object.defineProperties(Array.prototype, {
  count: {
    value: function (value) {
      return this.filter(x => x == value).length;
    }
  }
});


/*
function check_feature(var value, var ){
  if (value != null) { // if category is not a vecor, otherwise must be a list
        
        if (Array.isArray(value)==true) {
          
          for (let i=0 ; i<category.length; i++)
          {
            if (value[i] == actual_rand_value[3].replace(/\s/g, ''))  // if category matches
              {
              check[0] = 1;
              break;
              }
          else {
              check[0] = 0;
            }
          }
        }else{
          if (value == actual_rand_value[3].replace(/\s/g, ''))  // if category matches
              {
                check[0] = 1;
              }
              else{
                check[0] = 0;
              }
        }

      } else {
        check[0] = 0;
      }
}
*/
function global_query(allText, scope, gender = null, color = null, season = null, usage = null, sub_category = null, result_number = null)  // mod copy of second_query
{
  if (color == "favourite"){
    color = favourite_colour;
  }
  if (season == "favourite"){
    season = favourite_season;
  }
  if(usage == "favourite"){
    usage = favourite_usage;
  }
  if (gender == "Male") {
    gender = "Men"; // that's how it is saved in DB
  } else if (gender == "Female") {
    gender = "Women";
  } else if (gender == "Other") {
    gender = null;
  }

  //console.log("cat is" +  Array.isArray(sub_category))
  //console.log("[+] Starting search function...");

 // console.log("gender : " + gender + "\ncolor: " + color + "\nseason: " + season + "\nusage: " + usage + "\nsub category: " + sub_category + "\nresult num: " + result_number); // debug message

  // Now we want to count the number of not empty values we are passing to the function
  // then we are counting number of feature we want that matches in the search(gender is included)
  counting_array = [gender, color, season, usage, sub_category];
  //console.log(counting_array);
  var result = counting_array.count(null); //result is number of feature we want to match
  result = counting_array.length - result;
  //console.log("elements to match: " + result);



  var allTextLines = allText.split(/\r\n|\n/); //allTextLines[i] contiene l'iesima RIGA della tabella

  var headers = allTextLines[0].split(','); //headers: array contenente tt gli header (linea 0 splittata)

  //$('#employee_table').html(headers);

  var lines = [];
  var lines_2 = [];  //conterrà tutta la tabella con valori associati all'header   
  var z = 0;
  var random_actual = Math.floor(Math.random() * allTextLines.length);

  var actual_rand_value = allTextLines[random_actual].split(',')

  var already_visited = [];     // avoid already visited rows
  var selected_tuple_id = [];   // array of selected tuples IDs
  var selected_tuple_row = [];  // array of selected tuples full row
  var random_value = [];        // list of complete selected values
  var selected_item_id = document.getElementById("question1").value;

  var category = sub_category; //old selection

  var type;
  var selected_item_url;
  var d;
  for (var i = 1; i < allTextLines.length; i++) { // find image and link of corresponding ID
    d = allTextLines[i].split(',');
    if (d[0] == selected_item_id) {
      type = d[8];
      selected_item_url = d[11];
    }
  }





  i = 0;
  while (i < result_number) {

    var random_actual = Math.floor(Math.random() * allTextLines.length); // calculate next random value
    var actual_rand_value = allTextLines[random_actual].split(',')  // row to array conversion
    // console.log(random_actual + " gender is: " + actual_rand_value[1].replace(/\s/g, '') + " category: " + actual_rand_value[3].replace(/\s/g, ''));
    // act_val[1] is gender,  act_val[3] is category, ensure to not repeat random values

    //if(gender == "MaleTEST"){
    if (true) {


      var check = []; // array that tells which fields of the current selection are satisfied, respectively: category, season, color, usage (1 if matches, 0 else)
      
      //
      //console.log(category);

      if (category != null) { // if category is not a vecor, otherwise must be a list
        
        if (Array.isArray(category)==true) {
          
          for (let i=0 ; i<category.length; i++)
          {
            if (category[i] == actual_rand_value[3].replace(/\s/g, ''))  // if category matches
              {
              check[0] = 1;
              break;
              }
          else {
              check[0] = 0;
            }
          }
        }else{
          if (category == actual_rand_value[3].replace(/\s/g, ''))  // if category matches
              {
                check[0] = 1;
              }
              else{
                check[0] = 0;
              }
        }

      } else {
        check[0] = 0;
      }


      if (season) {
        if (season == actual_rand_value[6].replace(/\s/g, '')) {
          //console.log("\nseason  c'è");
          check[1] = 1;
        }
        else {
          check[1] = 0;
        }
      } else {
        check[1] = 0;
      }

      if (color != null) { // if category is not a vecor, otherwise must be a list
        
        if (Array.isArray(category)==true) {
          
          for (let i=0 ; i<color.length; i++)
          {
            if (color[i] == actual_rand_value[5].replace(/\s/g, ''))  // if category matches
              {
                check[2] = 1;
                break;
              }
          else {
              check[2] = 0;
            }
          }
        }else{
          if (color == actual_rand_value[5].replace(/\s/g, ''))  // if category matches
              {
                check[2] = 1;
              }
              else{
                check[2] = 0;
              }
        }

      } else {
        check[2] = 0;
      }

      
      if (usage) {
        if (usage == actual_rand_value[8].replace(/\s/g, '')) {
          //console.log("\nusage  c'è");
          check[3] = 1;
        }
        else {
          check[3] = 0;
        }
      } else {
        check[3] = 0;
      }

      // if gender is present -> man or woman
      if (actual_rand_value[1].replace(/\s/g, '') == gender) {
        check[4] = 1;
      } else { // if gender = other, then we write other
        check[4] = 0;
      }




      // console.log(check);  // debug

      if (check.count(1) == result) {
        i = i + 1;

        selected_tuple_id.push(actual_rand_value[0]);
        already_visited.push(actual_rand_value[0]);
        selected_tuple_row.push(random_actual);
        random_value.push(actual_rand_value); //LISTA contenente tutte le info dei selezionati <------------!!!!

      }

    }

  }


  if(scope == "grid"){
    for (let i = 0; i < result_number; i++) {
      //console.log("op"+i);
      //console.log(random_value[i][11]);


      document.getElementById("checkboxes-" + i).value = selected_tuple_id[i]

      document.getElementById("img" + i).src = random_value[i][11]
      document.getElementById("img" + i).height = 200


    }
  }
  else if(scope == "list"){
    var criterion = "";
    if(usage != null){
      criterion = criterion + "u";
    }
    if(color != null){
      criterion = criterion+ "c";
    }
    if(season != null){
      criterion = criterion + "s";
    }
    for(let i = 0; i<result_number;i++){
        var j = i+1;
        document.getElementById(sub_category + j + "-"+criterion).src = random_value[i][11]
      }
    }
  }

  //console.log("i: " + i);
  //console.log(random_value);

  //document.getElementById("question2").name = selected_item_id
  //document.getElementById("img-1").src = selected_item_url

  //document.getElementById("op1-2").value = selected_tuple_id[0]
  //document.getElementById("op2-2").value = selected_tuple_id[1]
  //document.getElementById("op3-2").value = selected_tuple_id[2]
  //document.getElementById("op4-2").value = selected_tuple_id[3]

  //document.getElementById("img1-2").src = random_value[0][11]
  //document.getElementById("img2-2").src = random_value[1][11]
  //document.getElementById("img3-2").src = random_value[2][11]
  //document.getElementById("img4-2").src = random_value[3][11]


function second_query(allText, gender, result_number) {
  if (gender == "Male") {
    gender = "Men";
  }
  else if (gender == "Female") {
    gender = "Women";
  }
  var allTextLines = allText.split(/\r\n|\n/);
  //allTextLines[i] contiene l'iesima RIGA della tabella

  var headers = allTextLines[0].split(',');
  //headers: array contenente tt gli header (linea 0 splittata)

  //$('#employee_table').html(headers);

  var lines = [];
  var lines_2 = [];
  //conterrà tutta la tabella con valori associati all'header   
  var z = 0;
  var random_actual = Math.floor(Math.random() * allTextLines.length);

  var actual_rand_value = allTextLines[random_actual].split(',')

  var already_visited = [];
  var selected_tuple_id = [];
  var selected_tuple_row = [];
  var random_value = []; // list of complete selected values
  var selected_item_id = document.getElementById("question1").value;

  var category = "Topwear"
  var type;
  var selected_item_url;
  var d;
  for (var i = 1; i < allTextLines.length; i++) { // find image and link of corresponding ID
    d = allTextLines[i].split(',');
    if (d[0] == selected_item_id) {
      type = d[8];
      selected_item_url = d[11];
    }
  }
  i = 0;
  while (i < result_number) {
    var random_actual = Math.floor(Math.random() * allTextLines.length);
    var actual_rand_value = allTextLines[random_actual].split(',')
    // console.log(random_actual + " gender is: " + actual_rand_value[1].replace(/\s/g, '') + " category: " + actual_rand_value[3].replace(/\s/g, ''));
    // act_val[1] is gender,  act_val[3] is category, ensure to not repeat random values
    if (actual_rand_value[1].replace(/\s/g, '') == gender && actual_rand_value[3].replace(/\s/g, '') == category && !already_visited.includes(actual_rand_value[0])) {
      // console.log(actual_rand_value[0]);
      selected_tuple_id.push(actual_rand_value[0]);
      already_visited.push(actual_rand_value[0]);
      selected_tuple_row.push(random_actual);
      i = i + 1;
      random_value.push(actual_rand_value); //LISTA contenente tutte le info dei selezionati <------------!!!!

    }

    if (gender == "Other") {
      if (actual_rand_value[3].replace(/\s/g, '') == category && !already_visited.includes(actual_rand_value[0])) {
        // console.log(actual_rand_value[0]);
        selected_tuple_id.push(actual_rand_value[0]);
        already_visited.push(actual_rand_value[0]);
        selected_tuple_row.push(random_actual);
        i = i + 1;
        random_value.push(actual_rand_value); //LISTA contenente tutte le info dei selezionati <------------!!!!
      }
    }

  }
  document.getElementById("question2").name = selected_item_id
  document.getElementById("img-1").src = selected_item_url
  document.getElementById("op1-2").value = selected_tuple_id[0]
  document.getElementById("op2-2").value = selected_tuple_id[1]
  document.getElementById("op3-2").value = selected_tuple_id[2]
  document.getElementById("op4-2").value = selected_tuple_id[3]
  document.getElementById("img1-2").src = random_value[0][11]
  document.getElementById("img2-2").src = random_value[1][11]
  document.getElementById("img3-2").src = random_value[2][11]
  document.getElementById("img4-2").src = random_value[3][11]
}


function first_query(allText, gender, result_number) {
  if (gender == "Male") {
    gender = "Men";
  }
  else if (gender == "Female") {
    gender = "Women";
  }
  var allTextLines = allText.split(/\r\n|\n/);
  //allTextLines[i] contiene l'iesima RIGA della tabella

  var headers = allTextLines[0].split(',');
  //headers: array contenente tt gli header (linea 0 splittata)

  //$('#employee_table').html(headers);

  var lines = [];
  var lines_2 = [];
  //conterrà tutta la tabella con valori associati all'header   
  var z = 0;
  var random_actual = Math.floor(Math.random() * allTextLines.length);

  var actual_rand_value = allTextLines[random_actual].split(',')

  var already_visited = [];
  var selected_tuple_id = [];
  var selected_tuple_row = [];
  var random_value = []; // list of complete selected values
  //console.log(headers);

  var category = "Bottomwear"

  i = 0;
  while (i < result_number) {

    var random_actual = Math.floor(Math.random() * allTextLines.length);
    var actual_rand_value = allTextLines[random_actual].split(',')

    // console.log(random_actual + " gender is: " + actual_rand_value[1].replace(/\s/g, '') + " category: " + actual_rand_value[3].replace(/\s/g, ''));

    // act_val[1] is gender,  act_val[3] is category, ensure to not repeat random values
    if (actual_rand_value[1].replace(/\s/g, '') == gender && actual_rand_value[3].replace(/\s/g, '') == category && !already_visited.includes(actual_rand_value[0])) {
      // console.log(actual_rand_value[0]);
      selected_tuple_id.push(actual_rand_value[0]);
      already_visited.push(actual_rand_value[0]);
      selected_tuple_row.push(random_actual);
      i = i + 1;
      random_value.push(actual_rand_value); //LISTA contenente tutte le info dei selezionati <------------!!!!

    }

    if (gender == "Other") {
      if (actual_rand_value[3].replace(/\s/g, '') == category && !already_visited.includes(actual_rand_value[0])) {
        // console.log(actual_rand_value[0]);
        selected_tuple_id.push(actual_rand_value[0]);
        already_visited.push(actual_rand_value[0]);
        selected_tuple_row.push(random_actual);
        i = i + 1;
        random_value.push(actual_rand_value); //LISTA contenente tutte le info dei selezionati <------------!!!!
      }
    }

  }
  document.getElementById("op1-1").value = selected_tuple_id[0]
  document.getElementById("op2-1").value = selected_tuple_id[1]
  document.getElementById("op3-1").value = selected_tuple_id[2]
  document.getElementById("op4-1").value = selected_tuple_id[3]

  document.getElementById("img1-1").src = random_value[0][11]
  document.getElementById("img2-1").src = random_value[1][11]
  document.getElementById("img3-1").src = random_value[2][11]
  document.getElementById("img4-1").src = random_value[3][11]
}

var favourite_usage;
var favourite_colour;
var favourite_season;

function retrieve_data(allText) {
  var selected_items = [];
  var usage = [];
  var colour = [];
  var season = [];
  var markedCheckbox = document.getElementsByName('checkboxes');  
  for (var checkbox of markedCheckbox) {  
    if (checkbox.checked) {
      selected_items.push(checkbox.value);
    }
  }  
  var allTextLines = allText.split(/\r\n|\n/);
  var line;
  for (let j=0; j < allTextLines.length; j++){
    for(let i=0; i<selected_items.length;i++){
      if(allTextLines[j].split(",")[0] == selected_items[i]){
        line = allTextLines[j].split(",");
        usage.push(line[8].replace(/\s/g, ''));
        colour.push(line[5].replace(/\s/g, ''));
        season.push(line[6].replace(/\s/g, ''));
      }
    }
  }

function count_preference(dic) {
  
  function find_max(element, max){
    
    if(dic[element]>max[1]){
      max[0] = [];
      max[0].push(element);
      max[1] = dic[element];
    }
    else if(dic[element] == max[1]){
      max[0].push(element);
    }
    return max;
  }
  var keys = Object.entries(dic);
  var max = [[], 0];

  keys.forEach(element=>max = find_max(element[0], max));
  const randomElement = max[0][Math.floor(Math.random() * max[0].length)];
  return randomElement;
}

  var counts_usage = {};
  usage.forEach(function(x) { counts_usage[x] = (counts_usage[x] || 0)+1; });
  var counts_colour = {};
  colour.forEach(function(x) { counts_colour[x] = (counts_colour[x] || 0)+1; });
  var counts_season = {};
  season.forEach(function(x) { counts_season[x] = (counts_season[x] || 0)+1; });


  favourite_usage = count_preference(counts_usage);
  favourite_colour = count_preference(counts_colour);
  favourite_season = count_preference(counts_season);
}