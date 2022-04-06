const arrayContainer = document.querySelector('.array-container')
const pushBtn = document.querySelector('.push-btn')
const popBtn = document.querySelector('.pop-btn')
const animationSpeed = document.querySelector('.visualization-speed')
const animationSpeedOptions = animationSpeed.querySelectorAll('option')

//get animation speed
let speed = getAnimationSpeed()
console.log('1', speed)



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
    const data = getLocalStorageData()
    if(data){
        data.pop()
        insertData(data)
    }
    renderArray('pop')
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
    console.log('2', speed)
    arrayContainer.innerHTML = ''
    let arrayData = JSON.parse(localStorage.getItem('array'))
    if(arrayData){
        let speed = getAnimationSpeed()
        for(let i = 0; i < arrayData.length; i++){
            let p = document.createElement('p')
            p.textContent = arrayData[i]
            p.setAttribute('class', 'array-element')
            if(action === 'push'){
                console.log('3', speed)
                if(i === arrayData.length - 1){
                    p.classList.add(`new-element-${speed}`)
                    arrayContainer.append(p)
                }
            }
            arrayContainer.append(p)
        }
    } else{
        con
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
