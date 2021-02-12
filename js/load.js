let player = new Image()
player.src = "img/player.png"

let enemy = new Image()
enemy.src = "img/enemy.png"

let bulletPlayer = new Image()
bulletPlayer.src = "img/bulletPlayer.png"

let bulletEnemy = new Image()
bulletEnemy.src = "img/bulletEnemy.png"

let healths = new Image()
healths.src = "img/hearts.png"

let points = new Image()
points.src = "img/seven-pointed-star.png"

let soundBullet = new Audio()
soundBullet.src = "sound/gun-gunshot-01.mp3"

let explode = new Audio()
explode.src = "sound/explosion-01.mp3"

let soundtrack = new Audio()
soundtrack.src = "sound/SkyFire (Title Screen).ogg"

document.querySelector(".play").addEventListener("click", function () {
    document.querySelector('.header-game').style.display = "none"
})