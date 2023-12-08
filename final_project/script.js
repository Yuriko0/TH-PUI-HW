    let timer;
        let sessionTimer;
        let minutes = 0;
        let seconds = 0;
        let elementCount = 0;

    function startSession() {
        //session start
        
        document.getElementById('startButton').disabled = true;

        sessionTimer = setInterval(function () {
            updateSessionTimerDisplay();
            if (seconds % 5 === 0) {
                //You can change this into anytime you want to make the function of time keeper. For example if minutes % 30 === 0
                //Then it means a tree creates every 30 minutes. Please adjust the tree growth function according to this.
                createTree();
            }
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
        }, 1000);
        createHouses();
        setBackground();
        displayCurrentTime();
        
    }
        
    function createTree() {
        //creates tree every five seconds, this is a step function

        const tree = document.createElement('img');
        const randomTreeIcon = getRandomTreeIcon();
        tree.src = randomTreeIcon;
        tree.classList.add('tree');
        tree.style.left = Math.random() * window.innerWidth + 'px';
        tree.style.top = Math.random() * window.innerHeight + 'px';
        tree.addEventListener('mousedown', startDrag);
        document.body.appendChild(tree);
        elementCount++;
        ;
    }
    
    function setBackground() {
        const background = document.createElement('img');
        background.classList.add('background');
        background.src = 'grass.jpg'; 
        document.body.appendChild(background);
    }

    function createHouses() {
        for (let i = 0; i < 1; i++) {
            const house = document.createElement('img');
            house.classList.add('house');
            house.src = 'house.png'; 
            house.style.left = window.innerWidth / 2 + (Math.random() * 100 - 50) + 'px';
            house.style.top = window.innerHeight / 2 + (Math.random() * 100 - 50) + 'px';
            document.body.appendChild(house);
        }
    }

    function startDrag(event) {

        //dragging function

        const tree = event.target;
        tree.style.cursor = 'grabbing';
        tree.style.zIndex = '1000';

        function handleMove(e) {
            tree.style.left = e.clientX - tree.width / 2 + 'px';
            tree.style.top = e.clientY - tree.height / 2 + 'px';
        }

        function handleRelease() {
            tree.style.cursor = 'grab';
            tree.style.zIndex = 'auto';
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleRelease);
            tree.removeEventListener('mousedown', startDrag);
            startGrowth(tree); 
        }

        //handle functions to support the move and calculate the accurate position
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleRelease);
    }

    function startGrowth(tree) {
        //tree growth every set time
        //You can change this into anytime you want to make the function of time keeper, unit is milisecond.
        let growthInterval;
        growthInterval = setInterval(function () {
            animateTreeGrowth(tree);
        }, 10000); //you can change here
    }

    function animateTreeGrowth(tree) {
        const currentScale = parseFloat(tree.style.transform.replace('scale(', '').replace(')', '')) || 1;

        anime({
            targets: tree,
            scale: currentScale * 1.5,
            duration: 3000,
            easing: 'easeInOutQuad',
        });
    }

    function updateSessionTimerDisplay() {
        const timerDisplay = document.getElementById('timer');
        timerDisplay.textContent = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function getRandomTreeIcon() {
        const treeIcons = ['tree1.png', 'tree2.png', 'tree3.png', 'tree4.png', 'tree5.png'];
        const randomIndex = Math.floor(Math.random() * treeIcons.length);
        return treeIcons[randomIndex];
    }

    function endSession() {
        clearInterval(sessionTimer);
        const screenshot = takeScreenshot();
        const saveConfirmation = confirm('Do you want to save the screenshot?');
        if (saveConfirmation) {
            saveScreenshot(screenshot);
        }
        resetSession();
    }

    document.getElementById('endSessionButton').addEventListener('click', function () {
        const elementToCapture = document.body;
        // Use html2canvas to capture the screenshot. 
        html2canvas(elementToCapture).then(function (canvas) {
            const dataUrl = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'screenshot.png'; 
            link.click();
        });
    });
    

    function resetSession() {
        //entire page reset
        minutes = 0;
        seconds = 0;
        elementCount = 0;
        clearInterval(sessionTimer);
        document.getElementById('timer').textContent = '00:00';

        const trees = document.querySelectorAll('.tree');
        trees.forEach(tree => tree.remove());

        const houses = document.querySelectorAll('.house');
        houses.forEach(house => house.remove());

        document.getElementById('startButton').disabled = false;
    }

    function displayCurrentTime() {
        const currentTimeDisplay = document.createElement('p');
        currentTimeDisplay.id = 'currentTime';
        document.body.appendChild(currentTimeDisplay);
        setInterval(updateCurrentTime, 1000);
    }
    
    function updateCurrentTime() {
        //retrieve current time from the system
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        console.log(hours, minutes);
        const currentTimeDisplay = document.getElementById('currentTime');
        currentTimeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}`;
    }
    
    function formatTime(time) {
        //formate the time to ensure the length 0 or 00 for the min/sec does not affect the display
        return time < 10 ? `0${time}` : time;
    }