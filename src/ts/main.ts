import { sleep, random } from './tools'
import './tools'
import anime from 'animejs'

// interface Vector {
//     x: number
//     y: number
// }

// interface Particle extends HTMLDivElement {
//     createdAt: number
//     pos: Vector
//     scale: Vector
//     opacity: number
//     velocity: Vector
//     rotation: number
// }

// const applyChanges = (particle: Particle) => {
//     particle.style.transform = `rotate(${particle.rotation}deg) translate3d(${particle.pos.x}px, ${particle.pos.y}px, 0) scale(${particle.scale.x}, ${particle.scale.y})`
//     particle.style.opacity = `${particle.opacity}`
// }
// const applyPosition = (particle: Particle) => {
//     particle.style.transform = `translate3d(${particle.pos.x}px, ${particle.pos.y}px, 0)`
// }

// const stars: Particle[] = []
// const meteors: Particle[] = []
// const easing = Bezier(0, 0.55, 0.67, 0.59)

const PREF = {
    STAR_TTL: 10000,
    STAR_SCALE_RANGE: [0.3, 1.5],
    STAR_BIRTH_INTERVAL: 300,
    METEOR_TTL: 4000,
    METEOR_BIRTH_INTERVAL: 1000
}

// create stars

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
const randomScreenX = () => Math.random().remap([0, 1], [0, winSize.w])
const randomScreenY = () => Math.random().remap([0, 1], [0, winSize.h])
const randomRotation = () => Math.random().remap([0, 1], [-60, 60])

let winSize: { w: number; h: number } = { w: 0, h: 0 }
let nightSkyContainer: HTMLDivElement

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')

    winSize = {
        w: window.innerWidth,
        h: window.innerHeight
    }

    nightSkyContainer = document.querySelector('.night-sky-container')

    const createstarsIntervalId = setInterval(() => {
        const star = document.createElement('div')
        star.classList.add('star')
        nightSkyContainer.appendChild(star)
        star.style.transform = `translate3d(${randomScreenX()}px,${randomScreenY()}px, 0)`

        const starAnim = anime({
            targets: star,
            opacity: 1,
            duration: 3000,
            direction: 'alternate',
            loop: 2,
            easing: 'linear',
            complete: () => {
                // console.log('complete')
                star.style.transform = `translate3d(${randomScreenX()}px,${randomScreenY()}px, 0)`
                starAnim.restart()
            }
            // loopComplete: () => {
            //     console.log('loopComplete')
            // }
        })

        // console.log('star anim:', starAnim)
    }, 1000)

    // meteorAnchor.classList.add('meteor-anchor')
    // meteorAnchor.style.transform = `translateX(${randomScreenX()}px) rotate(${randomRotation()}deg)`
    // const meteor = document.createElement('div')
    // meteor.classList.add('meteor', 'meteor-anim')
    // meteorAnchor.appendChild(meteor)
    // nightSkyContainer.appendChild(meteorAnchor)
    // document.body.insertBefore(nightSkyContainer, document.body.firstChild)
    // meteor.addEventListener('animationend', async ev => {
    //     console.log('animationend')

    //     // const meteorClone = meteor.cloneNode(true) as HTMLDivElement
    //     // meteorClone.classList.add('hej')

    //     // meteor.style.animation = ''
    //     meteor.classList.remove('meteor-anim')
    //     meteorAnchor.style.transform = `translate3d(${randomScreenX()}px, 0, 0) rotate(${randomRotation()}deg)`
    //     await sleep(random(300, 3000))
    //     // meteor.replaceWith(meteorClone)

    //     // meteor.parentNode.replaceChild(meteorClone, meteor)

    //     // console.log('done')

    //     // meteor.style.animation = 'meteor'
    //     // setTimeout(() => {
    //     meteor.classList.add('meteor-anim')
    //     // }, 1000)
    // })

    // const createstarsIntervalId = setInterval(() => {
    //     const star = document.createElement('div') as Particle
    //     star.classList.add('star', 'star-anim')
    //     star.addEventListener('animationend', async ev => {
    //         star.pos = {
    //             x: random(0, winSize.w),
    //             y: random(0, winSize.h)
    //         }
    //         // star.style.animation = ''
    //         star.classList.remove('star-anim')
    //         await sleep(0)
    //         // star.style.animation = 'star'
    //         star.classList.add('star-anim')
    //         applyPosition(star)
    //     })
    //     // star.createdAt = TS
    //     star.pos = {
    //         x: random(0, winSize.w),
    //         y: random(0, winSize.h)
    //     }
    //     // const scale = random(PREF.STAR_SCALE_RANGE[0], PREF.STAR_SCALE_RANGE[1])
    //     // star.scale = {
    //     //     x: 1,
    //     //     y: 1
    //     // }
    //     // star.rotation = 0
    //     // star.opacity = 1
    //     applyPosition(star)
    //     stars.push(star)
    //     nightSkyContainer.appendChild(star)
    //     if (stars.length >= 10) {
    //         clearInterval(createstarsIntervalId)
    //     }
    // }, 200)
})
//     // const meteor = document.createElement('div') as Particle
//     // meteors.push(meteor)
//     // document.body.appendChild(meteor)
//     const anim = anime({
//         targets: '.meteor',

//         // duration: 3000,
//         keyframes: [
//             {
//                 // rotate: -5,
//                 // translateX: window.innerWidth / 2,
//                 translateY: -500,
//                 opacity: 0,
//                 duration: 0
//             },
//             {
//                 // translateY: 250,
//                 opacity: 1,
//                 duration: 200
//             },
//             {
//                 // translateY: 250,
//                 opacity: 1,
//                 duration: 1500
//             },
//             {
//                 translateY: 700,
//                 opacity: 0,
//                 duration: 1500,
//                 scale: 0.5
//             }
//         ],
//         loop: true,
//         easing: 'easeOutCubic',
//         loopComplete: () => {
//             console.log('done')

//             // const i = meteors.findIndex(m => m == meteor)
//             // meteors.splice()
//             // setTin
//         }
//     })
//     // anim.play()

//     console.log('tut')
// })

// meteor.classList.add('meteor')
// star.addEventListener('animationend', async ev => {})
// // meteor.createdAt = TS
// // meteor.pos = { x: random(0, window.innerWidth), y: -100 }
// // meteor.scale = { x: 1, y: 5 }
// // meteor.velocity = { x: 0, y: 8 }
// // meteor.rotation = random(-45, 45)
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
