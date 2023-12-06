    let timer;
        let sessionTimer;
        let minutes = 0;
        let seconds = 0;
        let elementCount = 0;

    function startSession() {
        
        document.getElementById('startButton').disabled = true;

        sessionTimer = setInterval(function () {
            updateSessionTimerDisplay();
            if (seconds % 5 === 0) {
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
        const tree = document.createElement('img');
        const randomTreeIcon = getRandomTreeIcon();
        tree.src = randomTreeIcon;
        tree.classList.add('tree');
        tree.style.left = Math.random() * window.innerWidth + 'px';
        tree.style.top = Math.random() * window.innerHeight + 'px';
        tree.addEventListener('mousedown', startDrag);
        document.body.appendChild(tree);
        elementCount++;
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

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleRelease);
    }

    function startGrowth(tree) {
        let growthInterval;
        growthInterval = setInterval(function () {
            animateTreeGrowth(tree);
        }, 10000);
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
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function getRandomTreeIcon() {
        const treeIcons = ['tree1.png', 'tree2.png', 'tree3.png'];
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

    function takeScreenshot() {
        const screenshot = document.documentElement.cloneNode(true);
        screenshot.style.overflow = 'hidden';
        return screenshot;
    }

    function saveScreenshot(screenshot) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([screenshot.outerHTML], { type: 'text/html' }));
        link.download = 'tree_session.html';
        link.click();
    }

    function resetSession() {
        minutes = 0;
        seconds = 0;
        elementCount = 0;
        clearInterval(sessionTimer);
        document.getElementById('timer').textContent = '00:00';

        const trees = document.querySelectorAll('.tree');
        trees.forEach(tree => tree.remove());

        document.getElementById('startButton').disabled = false;
    }

    function displayCurrentTime() {
        const currentTimeDisplay = document.createElement('p');
        currentTimeDisplay.id = 'currentTime';
        document.body.appendChild(currentTimeDisplay);
            setInterval(updateCurrentTime, 1000);
    }
    
    function updateCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        console.log(hours, minutes, seconds);
    
        const currentTimeDisplay = document.getElementById('currentTime');
        currentTimeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
    
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }