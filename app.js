const container = document.querySelector('.container')
const footer = document.querySelector('footer')
const radio = document.querySelectorAll('.b')
const brush = document.querySelector('.brush')
const grid = document.querySelector('.grid')
var inputColor = null;


createPixels();
createPallete();

const pixel = document.querySelectorAll('.pixel')

let selectedColor = "red";


function changeColor(pixel) {
  if (pixel.shiftKey === true) {
    return
  }
  if (pixel.target.classList.contains('pixel'))
    pixel.target.style.backgroundColor = (selectedColor);
}

function highlight(div) {
  let selected = document.querySelectorAll('.highlight')
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove('highlight')
  }
  if (div.tagName !== 'footer') {
    div.classList.add('highlight');
    selectedColor = div.style.backgroundColor
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

function use(div) {
  let selected = document.querySelectorAll('.used')
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove('used')
  }
  if (div.tagName !== 'footer') {
    div.classList.add('used');
  }
}

function changePalleteColor(e) {
  lastPallete.style.backgroundColor = e.target.value;
}

container.addEventListener('mouseover', function(e) {
  let radioValue = '';
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].innerText === 'Brush' && radio[i].classList.contains('selected')) {
      radioValue = radio[i].innerText
    }
  }
  if(radioValue === 'Brush') {
    let target = e;
    changeColor(target);
  }
})

container.addEventListener('click', function(e) {
  let radioValue = '';
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].innerText === 'Individual' && radio[i].classList.contains('selected')) {
      radioValue = radio[i].innerText
    }
  }
  if(radioValue === 'Individual') {
    let target = e;
    changeColor(target);
  }
})

footer.addEventListener('click', function(e) {
  if (e.target.tagName !== 'INPUT') {
    let target = e.target;
    highlight(target);
  }
})

inputColor.addEventListener('keydown', function(e) {
  if(e.key === 'Enter') {
    changePalleteColor(e)
  }
})

brush.addEventListener('click', function(e) {
  if (e.target.classList.contains('b')) {
    let target = e.target;
    select(target);
  }
})

grid.addEventListener('click', function(e) {
  if (e.target.classList.contains('b')) {
    let target = e.target;
    use(target);
    for (let i = 0; i < pixel.length; i++) {
      // if (e.target.innerText === "Grid")
      //   pixel[i].classList.add('border')
      // else
      //   pixel[i].classList.remove('border')
      pixel[i].classList.toggle('border')
    }
}
})


function createPixels() {
  for(let i = 0; i < 50; i++){
    let row = document.createElement('div');
    row.style.height = '2%'
    row.style.width = '100%'
    row.style.display = 'flex'
    for(let j = 0; j < 50; j++) {
      let col = document.createElement('div');
      col.style.height = ("100%")
      col.style.width = ("100%")
      col.classList.add('border')
      col.classList.add('pixel')
      row.appendChild(col)
    }
    container.appendChild(row)
  }
}

function createPallete() {
  let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'black']
  let col;
  for(let i = 0; i < colors.length; i++) {
    col = document.createElement('div');
    col.style.height = ("50px")
    col.style.width = ("50px")
    col.style.backgroundColor = colors[i];
    col.style.borderRadius = ("50%")
    col.style.border = "1px solid black"
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
