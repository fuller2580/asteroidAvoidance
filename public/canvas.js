window.onload = () => {

  const stars = [];
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  let startTwinkle;

  function start() {
    const wrapper = document.getElementById("canvasWrapper");
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        change: 0.15,
      });
    }
  }

  function updateStars() {
    for (const star of stars) {
      if (star.size < 0.1) {
        star.change = 0.1;
      } else if (star.size > 0.9) {
        star.change = -0.1;
      }
      star.size += star.change;
    }
  }
  function renderStars() {
    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    for (const star of stars) {
      context.beginPath();
      context.arc(
        star.x * width,
        star.y * height,
        star.size * 3,
        0,
        2 * Math.PI,
        false
      );
      context.fillStyle = "white";
      context.fill();
    }
  }

  function startStars() {
    startTwinkle = setInterval(twinkle, 100);
    renderStars();
  }

  function twinkle() {
    updateStars();
    renderStars();
  }

  start();

  function buildShip() {
    context.fillStyle = '#999993';
    context.strokeStyle = '#000000';
    context.beginPath();
    context.rect(300,300,12,24);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.ellipse(312, 312, 24, 12, 0, Math.PI * 1.5, Math.PI /2, false);
    context.closePath();
    context.fill();
    context.stroke();
    context.fillStyle = '#000000';
    context.beginPath();
    context.ellipse(324, 312, 6, 3, 0, 0, Math.PI *2, true);
    context.closePath();
    context.fill();
    context.stroke();
    context.fillStyle = '#999993';
    context.beginPath();
    context.moveTo(316,300);
    context.lineTo(304,294);
    context.lineTo(300,294);
    context.lineTo(300,300);
    context.moveTo(316,324);
    context.lineTo(304,330);
    context.lineTo(300,330);
    context.lineTo(300,324);
    context.closePath();
    context.fill();
    context.stroke();
  }

  let img = new Image;
  img.src = 'https://drive.google.com/uc?export=view&id=1-BdOE7apqlf8RigFL7_Gn9lQ4XSlXjDF';


  let keyPress = (e) => {
    let key = e.key;
    clearInterval(startTwinkle);

    if(key === '1'){
      buildShip();

    }else if(key === '2') {
      context.drawImage(img, 10, 50, 665, 391);

    }else if(key === '3') {
      startStars();

    } else if(key ==='0') {
      context.clearRect(0,0,canvas.width, canvas.height);

    }
  }

  context.fillStyle = '#999993';
  context.strokeStyle = '#000000';
  context.beginPath();
  context.rect(300,300,12,24);
  context.closePath();
  context.fill();
  context.stroke();


  window.addEventListener('keydown', (e) => keyPress(e));
}
