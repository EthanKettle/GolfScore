class Player {
  constructor(name, id, scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

let players = [];

function getAvailableCourses() {
  return fetch('https://golf-courses-api.herokuapp.com/courses')
  .then(response => response.json())

  .then(data => {
    myCourses = data.courses; 
    printCourse(myCourses)
  })
};

function getHoles(id) {
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
  .then(response => response.json())

  .then(data => {
    myHoles = data.holes; 
    printTable(myHoles)
    printYards(myHoles)
    printHandicap(myHoles)
    printPar(myHoles)
  })
};

function printCourse(courses) {
  courses.forEach(course => console.log(course))
  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<li id="${course.id}" onclick="getHoles(${course.id})">${course.name}</li>`;
  });
  document.getElementById('course-select').innerHTML = courseOptionsHtml; 
}

function printTable(holes) {
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
  document.getElementById('table-responsive').innerHTML = tableHTML;
}

function printYards(holes) {
  let tableHTML = ''
  tableHTML = '<tr><td>YARDS</td>'
  for (let i = 1; i <= 9; i++) {
    tableHTML += `<td>${i}</td>`
  }
  tableHTML += '<td></td>'
  for (let i = 10; i <= 18; i++) {
    tableHTML += `<td>${i}</td>`
  }
  tableHTML += '<td></td><td></td></tr>'
  document.getElementById('table-responsive').innerHTML = tableHTML;
}

function printHandicap(holes) {
  let tableHTML = ''
  tableHTML = '<tr><td>HANDICAP</td>'
  for (let i = 1; i <= 9; i++) {
    tableHTML += `<td>$</td>`
  }
  tableHTML += '<td></td>'
  for (let i = 10; i <= 18; i++) {
    tableHTML += `<td></td>`
  }
  tableHTML += '<td></td><td></td></tr>'
  document.getElementById('table-responsive').innerHTML = tableHTML;
}

function printPar(holes) {
  let tableHTML = ''
  tableHTML = '<tr><td>PAR</td>'
  for (let i = 1; i <= 9; i++) {
    tableHTML += `<td>${i}</td>`
  }
  tableHTML += '<td>OUT</td>'
  for (let i = 10; i <= 18; i++) {
    tableHTML += `<td>${i}</td>`
  }
  tableHTML += '<td>IN</td><td>TOTAL</td></tr>'
  document.getElementById('table-responsive').innerHTML = tableHTML;
}

function addName(name) {
  let newRow = `<tr><td>${name}</td>`;
  for (let i = 1; i <= 9; i++) {
    newRow += `<td id="${name}${i}"><input type="number"><td>`;
  };
  newRow += `<td id="${name}Out"></td>`;
  for (let i = 10; i <= 18; i++) {
    newRow += `<td id="${name}${i}"><input type="number"><td>`;
  }
  newRow += `<td id="${name}In"></td><td id="${name}Total"></td></tr>`;
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