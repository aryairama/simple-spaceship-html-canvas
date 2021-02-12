let game = {
    canvas: document.getElementById('canvas'),
    start: function () {
        this.canvas.width = 400
        this.canvas.height = 600
        this.context = this.canvas.getContext('2d');
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}
let handle

function gameStart() {
    soundtrack.play()
    game.start()
    handle = new componentRect((game.canvas.width - 60) / 2, game.canvas.height - 60, 60, 60, "image", player)
    gameRun()
}
let incrase
let scorePlayer = 0
let health = 5
let timer = 0
let left = false
let right = false
let fire = false
let bulletPlayers = []
let totalEnemy = 7
let enemys = []
for (let a = 0; a < 100; a++) {
    let randomX = Math.floor(Math.random() * (game.canvas.width - 60))
    let randomY = Math.floor(2 + Math.random() * 4)
    enemys[a] = {
        enemy: new componentRect(randomX, 0, 60, 60, "image", enemy),
        speed: randomY
    }
}

function componentRect(x, y, width, height, type, source) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.source = source
    this.update = function () {
        if (this.type === "image") {
            game.context.beginPath();
            game.context.drawImage(this.source, this.x, this.y, this.width, this.height);
            game.context.closePath();
        } else if (this.type === "color") {
            game.context.beginPath();
            game.context.rect(this.x, this.y, this.width, this.height)
            game.context.fillStyle = this.source
            game.context.closePath()
        }

    }
}

function gameRun() {
    game.clear()
    handle.update()
    controllHandler()
    renderEnemys()
    bulletHandle()
    detectionBullets()
    detectionEnemyPlayers()
    healthPlayer()
    score()
    if (health === 0) {
        cancelAnimationFrame(gameRun)
        clearInterval(incrase)
        alert("Game Over")
        window.location.reload()
    } else {
        requestAnimationFrame(gameRun)
    }
}

document.addEventListener('keydown', keydownHandler, false)
document.addEventListener('keyup', keyupHandler, false)

function keydownHandler(event) {
    if (event.key === "a" || event.key === "A") {
        left = true
    } else if (event.key === "d" || event.key === "D") {
        right = true
    }
    if (event.key === "Enter") {
        fire = true
        bulletPlayers.push({
            fire: new componentRect(handle.x + handle.width / 2, handle.y, 20, 30, "image", bulletPlayer),
            used: false,
            sound : soundBullet.play()
        })
    }
}

function keyupHandler(event) {
    if (event.key === "a" || event.key === "A") {
        left = false
    } else if (event.key === "d" || event.key === "D") {
        right = false
    }
    if (event.key === "Enter") {}
}

function controllHandler() {
    if (left) {
        handle.x -= 4
        if (handle.x < 0) {
            handle.x = 0
        }
    }

    if (right) {
        handle.x += 4
        if (handle.x + handle.width > game.canvas.width) {
            handle.x = game.canvas.width - handle.width
        }
    }
}

function bulletHandle() {
    if (fire) {
        bulletPlayers.forEach(function (val) {
            if (val.used === false) {
                val.fire.update()
                val.sound
                val.fire.y -= 5
            }
        })
    }
}

function renderEnemys() {
    for (let a = 0; a < totalEnemy; a++) {
        enemys[a].enemy.update()
        enemys[a].enemy.y += enemys[a].speed
        if (enemys[a].enemy.y > game.canvas.height) {
            let randomX = Math.floor(Math.random() * (game.canvas.width - 60))
            let randomY = Math.floor(2 + Math.random() * 4)
            enemys[a].enemy.y = 0
            enemys[a].enemy.x = randomX
            enemys[a].speed = randomY
        }
    }
}

function detectionBullets() {
    bulletPlayers.forEach(bullet => {
        enemys.forEach(enemy => {
            if (bullet.fire.x > enemy.enemy.x - enemy.enemy.width && bullet.fire.x < enemy.enemy.x + enemy.enemy.width &&
                bullet.fire.y > enemy.enemy.y - enemy.enemy.height && bullet.fire.y < enemy.enemy.y + enemy.enemy.height) {
                enemy.enemy.y = -100
                bullet.fire.x = -100
                scorePlayer += 1
                explode.play()
            }
        })
    })
}

function detectionEnemyPlayers() {
    enemys.forEach(enemy => {
        if (handle.x > enemy.enemy.x - enemy.enemy.width && handle.x < enemy.enemy.x + enemy.enemy.width &&
            handle.y > enemy.enemy.y - enemy.enemy.height / 2 && handle.y < enemy.enemy.y + enemy.enemy.height / 2) {
            enemy.enemy.y = -100
            health -= 1
        }
    })
}

function healthPlayer() {
    for (let i = 0; i < health; i++) {
        let health = new componentRect((20 * i) + 10, 20 / 2, 20, 20, "image", healths)
        health.update()
    }
}

function score() {
    game.context.font = '20px sans-serif';
    game.context.fillStyle = "red"
    game.context.fillText(`Score : ${scorePlayer}`, game.canvas.width - 40 * 3, 20, 100)
}

function incraseEnemy() {
    if (scorePlayer % 20 === 0 && scorePlayer != 0) {
        if (totalEnemy === 100 || totalEnemy > 99 && totalEnemy < 100) {
            totalEnemy = 100
        } else {
            totalEnemy += 2
        }
    }

}

incrase = setInterval(incraseEnemy, 1000)