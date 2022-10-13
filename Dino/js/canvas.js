const platform = '../dino/assets/platform.png'
const canvas = document.querySelector(
    'canvas'
)
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = .5

// Player klasse maken
class Player {
    constructor() {
        // locatie
        this.position = {
            x: 100,
            y: 100
        }
        // dimensions
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = '#397006'
        c.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        // zwaartekracht gebruiken enkel als player in de lucht is
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}



//Platform klasse maken
class Platform {
    constructor(x, y) {
        this.position = {
            x,
            y
        }

        this.height = 125
        this.width = 580

    }
    draw() {
        //foto inladen
        var image = new Image()
        image.src = platform
        // foto gebruiken
        c.drawImage(image, this.position.x, this.position.y)


        // Vaste kleur
        // c.fillStyle = '#063970'
        // c.fillRect(this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height)
    }
}

// Player en Platformen initialiseren
const player = new Player()
const platforms = [new Platform({ x: 100, y: 200 }),
new Platform(1000, 200),
new Platform(2000, 200)
]



const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

// animatie loop
let scrollOffset = 0
function animatie() {
    requestAnimationFrame(animatie)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()


    // links rechts movement
    const vel = 5 // snelheid van de player
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = vel

    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -vel

    } else {
        player.velocity.x = 0
        // als player tegen de rechtermuur zit
        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.position.x -= vel
                scrollOffset -= vel
            })

        } else if (keys.left.pressed) {
            // player tegen de linker muur
            platforms.forEach((platform) => {
                platform.position.x += vel
                scrollOffset += vel
            })

        }
    }

    //jump movement
    if (keys.up.pressed) {
        player.velocity.y -= 2
    }

    // platform collision detection y-top -werkt
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {

            player.velocity.y = 0
        }
    })

    /*       // platform collision detection y-bot
          platforms.forEach((platform) => {
              if (player.position.y + player.height <= platform.position.y + platform.height &&
                  player.position.y + player.height + player.velocity.y >= platform.position.y + platform.height &&
                  player.position.x + player.width >= platform.position.x &&
                  player.position.x <= platform.position.x + platform.width) {
      
                  player.velocity.y = 0
              }
          }) */

    // platform collision detection x-left -werkt
    platforms.forEach((platform) => {
        if (player.position.x + player.width <= platform.position.x &&
            player.position.x + player.width + player.velocity.x >= platform.position.x &&
            player.position.y + player.height >= platform.position.y &&
            player.position.y <= platform.position.y + platform.height) {

            player.velocity.x = 0
        }
    })

    // platform collision detection x-right
    platforms.forEach((platform) => {
        if (player.position.x + player.width <= platform.position.x &&
            player.position.x + player.width + player.velocity.x >= platform.position.x &&
            player.position.y + player.height >= platform.position.y &&
            player.position.y <= platform.position.y + platform.height) {

            player.velocity.x = 0
        }
    })


    // win situatie
    if (scrollOffset == -2000) {
        alert('yeet')
    }
}
animatie()

// Keyboard events
window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case " ":
            keys.up.pressed = true
            break
        case "d":
            keys.right.pressed = true
            break
        case "a":
            keys.left.pressed = true
            break
        default:
            break
    }
})

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case " ":
            keys.up.pressed = false
            break
        case "d":
            keys.right.pressed = false
            break
        case "a":
            keys.left.pressed = false
            break
        default:
            break
    }
})
