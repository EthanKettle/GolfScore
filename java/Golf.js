function getAvailableCourses() {
  return fetch('https://golf-courses-api.herokuapp.com/courses')
  .then(response => response.json())

  .then(data => {
    myCourses = data.courses; 
    printCourse(myCourses)
  })
};

function getHoles(id, h, n) {
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
  .then(response => response.json())

  .then(data => {
    myHoles = data.data.holes; 
    printTable(myHoles, h, n)
  })
};

function printCourse(courses) {
  courses.forEach(course => console.log(course))
  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<li id="${course.id}" onclick="document.getElementById('change').style.display='block'; document.getElementById('courseHolder').textContent='${course.id}'">${course.name}</li>`;
  });
  document.getElementById('course-select').innerHTML = courseOptionsHtml; 
}

function printTable(holes, h, n) {
  console.log(holes, "printTable")
  let tableHTML = ''
  tableHTML += '<tr><th>HOLES</th>'
  for (let i = 0; i < 9; i++) {
    tableHTML += `<th id="${holes[i].courseHoleId}">${holes[i].hole}</th>`
  }
  tableHTML += '<th>OUT</th>'
  for (let i = 9; i < 18; i++) {
    tableHTML += `<th id="${holes[i].courseHoleId}">${holes[i].hole}}</th>`
  }
  tableHTML += '<th>IN</th><th>TOTAL</th></tr>'
  // yards
  tableHTML += '<tr><td>YARDS</td>'
  for (let i = 0; i < 9; i++) {
    // console.log(holes[i].teeBoxes[h].yards)
    tableHTML += `<td>${holes[i].teeBoxes[h].yards}</td>`
  }
  tableHTML += '<td></td>'
  for (let i = 9; i < 18; i++) {
    tableHTML += `<td>${holes[i].teeBoxes[h].yards}</td>`
  }
  tableHTML += '<td></td><td></td></tr>'
  // handicap
  tableHTML += '<tr><td>HANDICAP</td>'
  for (let i = 0; i < 9; i++) {
    tableHTML += `<td>${holes[i].teeBoxes[h].hcp}</td>`
  }
  tableHTML += '<td></td>'
  for (let i = 9; i < 18; i++) {
    tableHTML += `<td>${holes[i].teeBoxes[h].hcp}</td>`
  }
  tableHTML += '<td></td><td></td></tr>'
  // par
  tableHTML += '<tr><td>PAR</td>'
  for (let i = 0; i < 9; i++) {
    tableHTML += `<td>${holes[i].teeBoxes[h].par}</td>`
  }
  tableHTML += '<td></td>'
  for (let i = 9; i < 18; i++) {
    tableHTML += `<td>${holes[i].teeBoxes[h].par}</td>`
  }
  tableHTML += '<td>IN</td><td>TOTAL</td></tr>'
  // rows
  for (let i = 0; i < n; i++) {
    tableHTML = `<tr><td></td>`;
    for (let j = 0; j < 9; j++) {
      tableHTML+= `<td id="${j}-${i}"><input type="number"><td>`;
    };
    tableHTML+= `<td id="${i}-Out"></td>`;
    for (let j = 9; j < 18; j++) {
      tableHTML += `<td id="${j}-${i}"><input type="number"><td>`;
    }
    tableHTML += `<td id="${i}-In"></td><td id="${i}-Total"></td>`
  }
  tableHTML += `</tr>`
  document.getElementById('tableGolf').innerHTML = tableHTML;
}

function addAll(num) {
  let total = 0;
  for (let i = 0; i < num.length; i++) {
    total += num[i];
  }
  return total;
}
function addOut(num) {
  let total = 0;
  for (let i = 0; i < 9; i++) {
    total += num[i];
  }
  return total;
}

function addIn(num) {
  let total = 0;
  for (let i = 9; i < 18; i++) {
    total += num[i];
  }
  return total;
}  