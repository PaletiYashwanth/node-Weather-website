const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener("submit",(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((data) =>{
     data.json().then((d)=>{
        if(d.error){
            messageOne.textContent = 'Unable to find the location'
        
        }
        else{
            messageOne.textContent = d.location
            messageTwo.textContent = d.forecast
        }
    })
})
})