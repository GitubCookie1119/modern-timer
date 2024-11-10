// The variables needed

const mod = (dividend, divisor) => {
    // Calculate the quotient and the remainder
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
  
    // Returning the result as object
    return {
      quo: quotient,
      rem: remainder
    };
}

let shakeX, shakeY;

let t;

let timer = {
    isWorking: false,
    whenTimerIsClickedLast: null,
    next: null,
    mode: "active"
};

const isMode = (hours, minutes, seconds) => {
    const time = hours * 3600 + minutes * 60 + seconds
    const remain = mod(time, 1800).rem
    if (remain <= 1800 && 1500 <= remain) {
        return "break";
    } else {
        return "study";
    }
}

// The function of the main loop
const Main = () => {
    // Shaking the background
    window.requestAnimationFrame( Main )
    
    t = performance.now() / 1000;

    shakeX = Math.sin(0.2 * Math.PI * (t - 0.5)) * 0.5 + 0.5;
    shakeY = Math.cos(0.5 * Math.PI * (t - 0.5)) * 0.5 + 0.5;

    document.body.style.backgroundPositionX = "-" + shakeX * 20 + "px";
    document.body.style.backgroundPositionY = "-" + shakeY * 20 + "px";

    // Operating the timer
    if (timer.isWorking) {
        const d = new Date()
        const diff = new Date(d.getTime() - timer.whenTimerIsClickedLast.getTime())
        timer.milliseconds = diff.getMilliseconds()
        timer.seconds = diff.getSeconds();
        timer.minutes = diff.getMinutes();
        timer.hours = diff.getHours() + diff.getTimezoneOffset() / 60;
        console.log(timer.seconds)
        document.querySelector(".time").textContent = `${(timer.hours + "").padStart(2, "0")}:${(timer.minutes + "").padStart(2, "0")}:${(timer.seconds + "").padStart(2, "0")}`;

        // Displaying the next break time
        if (isMode(timer.hours, timer.minutes, timer.seconds) == "study") {
            const tnb = new Date(mod(diff.getTime(), 1800000).quo * 1800000 + 1500000 + timer.whenTimerIsClickedLast.getTime())
            console.log((tnb.getSeconds() + "").padStart(2, "0"))
            document.querySelector(".next").textContent = `next break ${(tnb.getHours() + "").padStart(2, "0")}:${(tnb.getMinutes() + "").padStart(2, "0")}:${(tnb.getSeconds() + "").padStart(2, "0")}`;
            document.body.style.backgroundImage = "url(img/background.jpg)";
        } else if (isMode(timer.hours, timer.minutes, timer.seconds) == "break") {
            const tnb = new Date(mod(diff.getTime(), 1800000).quo * 1800000 + 1800000 + timer.whenTimerIsClickedLast.getTime());
            document.querySelector(".next").textContent = `next study ${(tnb.getHours() + "").padStart(2, "0")}:${(tnb.getMinutes() + "").padStart(2, "0")}:${(tnb.getSeconds() + "").padStart(2, "0")}`;
            document.body.style.backgroundImage = "url(img/break.jpg)";
        }
    }

}

Main();

// Handling that buttons are clicked each.
document.querySelector(".start").addEventListener("click", () => {
    const d = new Date();
    timer.isWorking = true;
    timer.whenTimerIsClickedLast = d;
});

document.querySelector(".stop").addEventListener("click", () => {
    const d = new Date();
    timer.isWorking = false;
    timer.whenTimerIsClickedLast = d;
})