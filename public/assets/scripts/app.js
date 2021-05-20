const searchBar = document.getElementById('searchBar');
var departments = JSON.parse('!{deps}');
console.log(departments);
console.log(searchBar);
searchBar.addEventListener('keyup',(e)=>{
    console.log(e.target.value);
})