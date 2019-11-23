import { random, sleep } from './tools'
import Bezier from 'bezier-easing'

interface Vector {
    x: number
    y: number
}

interface Particle extends HTMLDivElement {
    createdAt: number
    pos: Vector
    scale: Vector
    opacity: number
    velocity: Vector
    rotation: number
}

// const applyChanges = (particle: Particle) => {
//     particle.style.transform = `rotate(${particle.rotation}deg) translate3d(${particle.pos.x}px, ${particle.pos.y}px, 0) scale(${particle.scale.x}, ${particle.scale.y})`
//     particle.style.opacity = `${particle.opacity}`
// }
const applyPosition = (particle: Particle) => {
    particle.style.transform = `translate3d(${particle.pos.x}px, ${particle.pos.y}px, 0)`
}

const stars: Particle[] = []
const meteors: Particle[] = []
// const easing = Bezier(0, 0.55, 0.67, 0.59)

const PREF = {
    STAR_TTL: 10000,
    STAR_SCALE_RANGE: [0.3, 1.5],
    STAR_BIRTH_INTERVAL: 300,
    METEOR_TTL: 4000,
    METEOR_BIRTH_INTERVAL: 1000
}

// create stars
const createstarsIntervalId = setInterval(() => {
    const star = document.createElement('div') as Particle
    star.classList.add('star')
    star.classList.add('star-anim')
    star.addEventListener('animationend', async ev => {
        star.pos = {
            x: random(0, window.innerWidth),
            y: random(0, window.innerHeight)
        }
        star.classList.remove('star-anim')
        await sleep(0)
        star.classList.add('star-anim')
        applyPosition(star)
    })
    // star.createdAt = TS
    star.pos = {
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight)
    }
    // const scale = random(PREF.STAR_SCALE_RANGE[0], PREF.STAR_SCALE_RANGE[1])
    // star.scale = {
    //     x: 1,
    //     y: 1
    // }
    // star.rotation = 0
    // star.opacity = 1
    applyPosition(star)
    stars.push(star)
    document.body.appendChild(star)
    if (stars.length >= 20) {
        clearInterval(createstarsIntervalId)
    }
}, 200)
// create stars
// setInterval(() => {
//     const star = document.createElement('div') as Particle
//     star.classList.add('star')
//     star.createdAt = TS
//     star.pos = {
//         x: random(0, window.innerWidth),
//         y: random(0, window.innerHeight)
//     }
//     const scale = random(PREF.STAR_SCALE_RANGE[0], PREF.STAR_SCALE_RANGE[1])
//     star.scale = {
//         x: scale,
//         y: scale
//     }
//     star.rotation = 0
//     star.opacity = 0
//     stars.push(star)
//     document.body.appendChild(star)
// }, PREF.STAR_BIRTH_INTERVAL)

// // create meteors
// setInterval(() => {
//     const meteor = document.createElement('div') as Particle
//     meteor.classList.add('meteor')
//     meteor.createdAt = TS
//     meteor.pos = { x: random(0, window.innerWidth), y: -100 }
//     meteor.scale = { x: 1, y: 5 }
//     meteor.velocity = { x: 0, y: 8 }
//     meteor.rotation = random(-45, 45)
//     meteors.push(meteor)
//     document.body.appendChild(meteor)
// }, PREF.METEOR_BIRTH_INTERVAL)

// let TS = 0
// const tick = (now: number) => {
//     TS = now

//     // stars
//     // for (let i = stars.length - 1; i >= 0; i--) {
//     //     const star = stars[i]
//     //     const age = TS - star.createdAt

//     // remove old stars
//     // if (age >= PREF.STAR_TTL) {
//     //     stars.splice(i, 1)
//     //     star.classList.remove('star-anim')
//     //     star.style.opacity = '0'
//     //     // star.remove()
//     // }

//     // let opacity = easing(age.remap([0, PREF.STAR_TTL], [0, 1]))
//     // let opacity = 0
//     // const TTL_HALF = PREF.STAR_TTL * 0.5
//     // if (age < TTL_HALF) {
//     //     opacity = age.remap([0, TTL_HALF], [0, 1])
//     // } else {
//     //     opacity = age.remap([TTL_HALF, PREF.STAR_TTL], [1, 0])
//     // }
//     // star.opacity = opacity
//     // render(star)
//     // }

//     // meteors
//     for (let i = meteors.length - 1; i >= 0; i--) {
//         const meteor = meteors[i]
//         const age = TS - meteor.createdAt

//         // remove old stars
//         if (age >= PREF.METEOR_TTL) {
//             meteors.splice(i, 1)
//             meteor.remove()
//         }

//         // apply velocity
//         meteor.pos.x += meteor.velocity.x
//         meteor.pos.y += meteor.velocity.y

//         // shrink
//         meteor.scale.y *= 0.99

//         // reduce velocity
//         meteor.velocity.x *= 0.99
//         meteor.velocity.y *= 0.99

//         let opacity = age.remap([0, PREF.METEOR_TTL], [1, 0])
//         meteor.opacity = opacity
//         applyChanges(meteor)
//     }
//     requestAnimationFrame(tick)
// }
// requestAnimationFrame(tick)
