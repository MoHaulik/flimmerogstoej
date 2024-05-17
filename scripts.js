document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("flimmerCanvas");
    const ctx = canvas.getContext("2d");
    const audioPlayer = document.getElementById("audioPlayer");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let isBrownNoise = false;

    function generateWhiteNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const randomValue = Math.random() * 255;
            imageData.data[i] = randomValue;     // R
            imageData.data[i + 1] = randomValue; // G
            imageData.data[i + 2] = randomValue; // B
            imageData.data[i + 3] = 255;         // A
        }
        return imageData;
    }

    function generateBrownNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        let lastValue = 127;
        for (let i = 0; i < imageData.data.length; i += 4) {
            const randomValue = Math.random() * 20 - 10 + lastValue;
            const clampedValue = Math.max(0, Math.min(255, randomValue));
            lastValue = clampedValue;
            imageData.data[i] = clampedValue;     // R
            imageData.data[i + 1] = clampedValue; // G
            imageData.data[i + 2] = clampedValue; // B
            imageData.data[i + 3] = 255;          // A
        }
        return imageData;
    }

    function renderNoise() {
        const noise = isBrownNoise ? generateBrownNoise() : generateWhiteNoise();
        ctx.putImageData(noise, 0, 0);
        requestAnimationFrame(renderNoise);
    }

    function playWhiteNoise() {
        audioPlayer.src = 'white-noise.mp3'; // Replace with your white noise file
        audioPlayer.play();
    }

    function playBrownNoise() {
        audioPlayer.src = 'brown-noise.mp3'; // Replace with your brown noise file
        audioPlayer.play();
    }

    canvas.addEventListener('click', function() {
        isBrownNoise = !isBrownNoise;
        if (isBrownNoise) {
            playBrownNoise();
        } else {
            playWhiteNoise();
        }
    });

    playWhiteNoise();
    renderNoise();
});