const apps = document.querySelector(".apps");
const time = document.querySelector(".time");
const internet = document.querySelector(".internet");
function updateTime() {
  const now = new Date();
  const timeParts = now.toLocaleTimeString("it-IT").split(":");
  time.textContent = `${timeParts[0]}:${timeParts[1]}`;
}

setInterval(updateTime, 1000);

updateTime();

function checkInternet() {
  if (navigator.onLine) {
    internet.src = "./images/internet.png";
  } else {
    internet.src = "./images/no-internet.png";
  }
}

checkInternet();

window.addEventListener("online", checkInternet);
window.addEventListener("offline", checkInternet);

function getColor(percent) {
  if (percent > 60) return "limegreen";
  if (percent > 30) return "orange";
  return "red";
}

navigator.getBattery().then((battery) => {
  function updateBatteryStatus() {
    const level = Math.round(battery.level * 100);
    const levelBar = document.getElementById("level");

    levelBar.style.width = `${level}%`;
    levelBar.textContent = `${level}%`;
    levelBar.style.backgroundColor = getColor(level);

    document.getElementById("chargingStatus").innerHTML = battery.charging
      ? '<img src="./images/thunder.png"/>'
      : "";
  }

  updateBatteryStatus();
  battery.addEventListener("levelchange", updateBatteryStatus);
  battery.addEventListener("chargingchange", updateBatteryStatus);
});

function getApps({ title, image, url }) {
  return `<a href=${url} class="app">
          <img src="${image}" alt=${title} />
        <p>${title}</p>
        </a>`;
}

data.map((el) => {
  apps.innerHTML += getApps(el);
});

console.log(data[0].image);
