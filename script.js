//target elements
const arrayContainer = document.querySelector('.array-container')
const pushBtn = document.querySelector('.push-btn')
const popBtn = document.querySelector('.pop-btn')
const animationSpeed = document.querySelector('.visualization-speed')
const animationSpeedOptions = animationSpeed.querySelectorAll('option')

//get animation speed
let speed = getAnimationSpeed()


//push element to array
pushBtn.addEventListener('click', () => {
    const pushValue = document.querySelector('.push-input')
    let value = pushValue.value
    if(value){
        const data = getLocalStorageData()
        if(data){
            data.push(Number(value))
            insertData(data)
        } else{
            const data = []
            data.push(Number(value))
            insertData(data)
        }
        renderArray('push')
        pushValue.value = ''
    }
})


//pop element from array
popBtn.addEventListener('click', () => {
    let speed = getAnimationSpeed()
    let ms = 0
    if(speed === 'normal' ){
        ms = 300
    } else if(speed === 'fast'){
        ms = 100
    } else if(speed === 'slow'){
        ms = 1000
    }
    let allElements = document.querySelectorAll('.array-element')
    for(let i = 0; i < allElements.length; i++){
        if(i === allElements.length - 1){
            allElements[i].style.backgroundColor = 'azure'
            allElements[i].classList.add(`remove-element-${speed}`)
            allElements[i].style.backgroundColor = 'red'
        }
    }
    //this timeout method helps the animation to take place instead of just removing the element
    setTimeout(()=>{
        const data = getLocalStorageData()
        if(data){
            data.pop()
            insertData(data)
        }
        renderArray('pop')
    }, ms)
})



//insert data to local storage
function insertData(array){
    localStorage.setItem('array', JSON.stringify(array))
}


//fetch data from local storage
function getLocalStorageData(){
    let data = JSON.parse(localStorage.getItem('array'))
    if(data){
        return data
    } else{
        return false
    }
}


//function to render the array on the screen
function renderArray(action = ''){
    arrayContainer.innerHTML = ''
    let arrayData = JSON.parse(localStorage.getItem('array'))
    if(arrayData){
        let speed = getAnimationSpeed()
        for(let i = 0; i < arrayData.length; i++){
            let p = document.createElement('p')
            p.textContent = arrayData[i]
            p.setAttribute('class', 'array-element')
            if(action === 'push'){
                if(i === arrayData.length - 1){
                    p.classList.add(`new-element-${speed}`)
                    p.style.backgroundColor ='green'
                    arrayContainer.append(p)
                }
            }
            arrayContainer.append(p)
        }
    } else{
        
    }
}



//set animation speed
animationSpeed.addEventListener('change', (e) => {
    localStorage.setItem('speed', JSON.stringify(e.target.value))
})


//function to get animation speed
function getAnimationSpeed(){
    let speed = JSON.parse(localStorage.getItem('speed'))
    if(speed){
        return speed
    } else{
        return false
    }
}


//display valid animation speed on select box
animationSpeedOptions.forEach(item => {
    if(item.value === speed){
        item.setAttribute('selected', 'selected')
    }
})


//initial render
renderArray()
