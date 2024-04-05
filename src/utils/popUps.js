
const body = document.querySelector('body')
export function popUpTimer(message, second) {
    const popup = document.createElement('span');
    popup.classList.add('popupscreen');
    
    popup.innerHTML = `
        <div class="popUps" id="popUpDetailLogin">
            <h3>${message}</h3>
            <div class="botonPopup">
                Redirigiendote en <b id="counter"><b> segundos ...
            </div>  
        </div>
    `;
    body.appendChild(popup);
    startTimer(second)
}

function startTimer(seconds) {
    const TIME_LIMIT = seconds
    let timePassed = 0
    let timeLeft;
    let timerInterval = setInterval(() => {
        
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        
        document.getElementById("counter").innerHTML = timeLeft;
        if (timePassed == TIME_LIMIT) {
            popUpoOff()
            clearInterval(timerInterval)
        }
    }, 1000);
}

function popUpoOff(){
    
    const elementosPopup = document.querySelector('.popupscreen');
    
    body.removeChild(elementosPopup);
    
}