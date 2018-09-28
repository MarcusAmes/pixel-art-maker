const container = document.querySelector('.container')
const footer = document.querySelector('footer')
const radio = document.querySelectorAll('.b')
const brush = document.querySelector('.brush')
const grid = document.querySelector('.grid')
const gridSize = document.querySelector('.grid-size')
const reset = document.querySelector('.reset')
var inputColor = null;
var gridLxW = 50;
var pixel;
var row;

createPixels(gridLxW);
createPallete();


let selectedColor = "red";


function changeColor(e) {
  if (e.shiftKey === true) {
    return
  }
  if (e.target.classList.contains('pixel'))
    e.target.style.backgroundColor = (selectedColor);
}

function replaceColor(e) {
  let tempColor = e.target.style.backgroundColor;
  for(let i = 0; i < pixel.length; i++) {
    if(pixel[i].style.backgroundColor === tempColor) {
      pixel[i].style.backgroundColor = selectedColor;
    }
  }
}

function highlight(div) {
  let selected = document.querySelectorAll('.highlight')
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove('highlight')
  }
  if (div.tagName !== 'footer') {
    div.classList.add('highlight');
    if (div.value) {
      selectedColor = div.value
    } else {
      selectedColor = div.style.backgroundColor
    }
  }
}

function select(div) {
  let selected = document.querySelectorAll('.selected')
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected')
  }
  if (div.tagName !== 'footer') {
    div.classList.add('selected');
  }
}

function changePalleteColor(e) {
  lastPallete.style.backgroundColor = e.target.value;
}

container.addEventListener('mouseover', function(e) {
  let radioValue = '';
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].classList.contains('selected')) {
      radioValue = radio[i].innerText
    }
  }
  if(radioValue === 'Brush') {
    changeColor(e);
  }
})

container.addEventListener('click', function(e) {
  let radioValue = '';
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].classList.contains('selected')) {
      radioValue = radio[i].innerText
    }
  }
  if(radioValue === 'Individual') {
    changeColor(e);
  }
  if(radioValue === 'Replace') {
    replaceColor(e);
  }

})

footer.addEventListener('click', function(e) {
  if (e.target.tagName !== 'FOOTER') {
    let target = e.target;
    highlight(target);
  }
})

inputColor.addEventListener('change', function(e) {
  highlight(e.target)
})

brush.addEventListener('click', function(e) {
  if (e.target.classList.contains('b')) {
    let target = e.target;
    select(target);
  }
})

grid.addEventListener('click', function(e) {
  for (let i = 0; i < pixel.length; i++) {
      pixel[i].classList.toggle('border')
  }
})

gridSize.addEventListener('click', function(e) {
  var size = prompt("What grid size would you like between 2 and 100", '50');
  if (size >= 2 && size <= 100) {
    for(let i = 0; i < row.length; i++) {
      row[i].parentNode.removeChild(row[i]);
    }
    createPixels(size)
  } else {
    alert('Invalid selection')
  }
})

reset.addEventListener('click', function(e) {
  for(let i = 0; i < pixel.length; i++) {
    pixel[i].style.backgroundColor = 'white'
  }
})


function createPixels(grid) {
  for(let i = 0; i < grid; i++){
    let row = document.createElement('div');
    row.classList.add('row')
    row.style.height = `${100 / grid}%`
    for(let j = 0; j < grid; j++) {
      let col = document.createElement('div');
      col.classList.add('border')
      col.classList.add('pixel')
      row.appendChild(col)
    }
    container.appendChild(row)
  }

  pixel = document.querySelectorAll('.pixel')
  row = document.querySelectorAll('.row')
}

function createPallete() {
  let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white']
  let col;
  for(let i = 0; i < colors.length; i++) {
    col = document.createElement('div');
    col.style.backgroundColor = colors[i];
    col.classList.add('palette')
    if(colors[i] === 'red')
      col.classList.add('highlight')
    footer.appendChild(col)
  }
  let input = document.createElement('input')
  input.classList.add('input-color')
  input.type = 'color'
  input.name = 'color'
  input.placeholder = 'Add hex or color name'
  footer.appendChild(input)
  inputColor = input
  lastPallete = col
}
