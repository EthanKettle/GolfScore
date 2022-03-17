class Player {
  constructor(name, id = getNextId(), scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

function getAvailableCourses() {
  return fetch('https://golf-courses-api.herokuapp.com/courses')
  .then(response => response.json())

  .then(data => {
    myCourses = data.courses; 
    printCourse(myCourses)
  })
};

function getHoles(id) {
  return fetch('https://golf-courses-api.herokuapp.com/courses/' + id)
  .then(response => response.json())

  .then(data => {
    myHoles = data.holes; 
    printTable(myHoles)
  })
};

function printCourse(courses) {
  courses.forEach(course => console.log(course))
  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<option value="${course.id}" onselect="myFunction(${course.id})">${course.name}</option>`;
  });
  document.getElementById('course-select').innerHTML = courseOptionsHtml; 
}

function printTable(holes) {
  let tableHTML = ''
  tableHTML = '<tr>'
  teeBoxes.forEach((holes) => {
    tableHTML += `<td id="${holes.courseHoleId}">${holes.name}</td>`
  });
  tableHTML = '</tr>'
  document.getElementById('table-responsive').innerHTML = tableHTML;
}


   