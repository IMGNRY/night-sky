import { sleep, random } from './tools'
import './tools'
import * as PIXI from 'pixi.js'
import { RGBSplitFilter } from '@pixi/filter-rgb-split'
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom'

const PREF = {
    STAR_MAX_ALPHA_VELOCITY: 0.015,
    METEOR_VELOCITY: 15,
    // STAR_SCALE_RANGE: [0.3, 1.5],
    STAR_BIRTH_INTERVAL: 50,
    STAR_COUNT: 200
    // METEOR_TTL: 4000,
    // METEOR_BIRTH_INTERVAL: 1000
}

// const randomRotation = () => Math.random().remap([0, 1], [-60, 60])

let winSize: { w: number; h: number } = { w: 0, h: 0 }
// let nightSkyContainer: HTMLDivElement

window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded')

    // winSize = {
    //     w: window.innerWidth,
    //     h: window.innerHeight
    // }

    const nightSkyContainer = document.querySelector('.night-sky-container')
    const containerRect = nightSkyContainer.getBoundingClientRect()
    const app = new PIXI.Application({
        backgroundColor: 0x0b1011,
        width: containerRect.width,
        height: containerRect.height,
        antialias: true,
        // transparent: true,
        autoDensity: true,
        forceFXAA: true
    })
    app.stage.filters = [
        new RGBSplitFilter(new PIXI.Point(-0.5, -0.5), new PIXI.Point(1, -0.5), new PIXI.Point(-1, 0.5)),
        new AdvancedBloomFilter({ threshold: 0.6, blur: 3, bloomScale: 4, brightness: 1.3 })
    ]
    nightSkyContainer.appendChild(app.view)

    const randomScreenX = () => Math.random().remap([0, 1], [0, app.renderer.width])
    const randomScreenY = () => Math.random().remap([0, 1], [0, app.renderer.height])

    interface Star extends PIXI.Sprite {
        alphaVelocity: number
        scaleMax: number
    }

    const resources = await new Promise<Partial<Record<string, PIXI.LoaderResource>>>(resolve => {
        // app.loader.add('meteor', '/textures/meteor.png')
        app.loader.add('star', '/textures/star.png', {})
        app.loader.add('cloud', '/textures/cloud.png')
        app.loader.load((loader, resources) => {
            resolve(resources)
        })
    })

    // app.loader.add('meteor', 'meteor.png').load((loader, resources) => {
    const stars: Star[] = []
    // const particleContainer = new PIXI.ParticleContainer(300, { tint: true })

    const starBirthIntervalId = setInterval(() => {
        const star = new PIXI.Sprite(resources['star'].texture) as Star
        // let star = new PIXI.Graphics() as Star
        // star.beginFill(0xffffff)
        // star.drawCircle(0, 0, random(0.5, 1))
        // star.endFill()

        star.anchor.set(0.5)

        star.x = randomScreenX()
        star.y = randomScreenY()

        star.alphaVelocity = random(-PREF.STAR_MAX_ALPHA_VELOCITY, PREF.STAR_MAX_ALPHA_VELOCITY)
        // star.tint = 0xff0000
        star.alpha = 0
        star.scaleMax = random(0.3, 1)
        star.scale.set(0)

        app.stage.addChild(star)
        // particleContainer.addChild(star)
        stars.push(star)
        if (stars.length == PREF.STAR_COUNT) {
            clearTimeout(starBirthIntervalId)
        }
    }, PREF.STAR_BIRTH_INTERVAL)

    const meteorAnchor = new PIXI.Container()
    meteorAnchor.x = 200
    meteorAnchor.angle = -70

    // const meteor = new PIXI.Sprite(resources.meteor.texture)
    const meteor = new PIXI.Graphics()
    const gradient = createGradient('rgba(95, 220, 255, 0)', 'rgba(255, 255, 255, 255)')
    meteor.beginTextureFill({ texture: gradient })
    meteor.drawRect(0, 0, 4, 100)
    meteor.endFill()

    // meteor.scale.x = 0.5
    meteor.scale.y = 3
    meteor.y = -meteor.height
    // meteor.x = randomScreenX()
    // meteor.y = randomScreenY()

    // star.alphaVelocity = random(-PREF.STAR_MAX_ALPHA_VELOCITY, -PREF.STAR_MAX_ALPHA_VELOCITY)
    // star.alpha = 0.001

    meteorAnchor.addChild(meteor)
    app.stage.addChild(meteorAnchor)

    const cloud = new PIXI.TilingSprite(resources.cloud.texture, 600, 276)
    cloud.width = app.renderer.width
    cloud.y -= 150
    cloud.scale.set(1.5)
    app.stage.addChild(cloud)

    const cloud_ = new PIXI.TilingSprite(resources.cloud.texture, 600, 276)
    cloud_.width = app.renderer.width
    cloud_.y -= 50
    cloud_.tilePosition.x += 300
    app.stage.addChild(cloud_)

    const cloud2 = new PIXI.TilingSprite(resources.cloud.texture, 600, 276)
    cloud2.width = app.renderer.width
    // cloud2.y += 100
    cloud2.scale.set(1.5)
    cloud2.tilePosition.x += 200
    app.stage.addChild(cloud2)

    const cloud3 = new PIXI.TilingSprite(resources.cloud.texture, 600, 276)
    cloud3.width = app.renderer.width
    cloud3.y += 100
    cloud3.alpha = 0.4
    cloud3.scale.set(2.5)
    cloud3.tilePosition.x += 400
    app.stage.addChild(cloud3)

    const cloud4 = new PIXI.TilingSprite(resources.cloud.texture, 600, 276)
    cloud4.width = app.renderer.width
    // cloud4.y += 200
    cloud4.alpha = 0.3
    cloud4.scale.set(3)
    cloud4.tilePosition.x += 500
    app.stage.addChild(cloud4)

    app.ticker.add(deltaTime => {
        // console.log('deltaTime:', deltaTime)

        stars.forEach(star => {
            if (star.alpha >= 1) {
                star.alphaVelocity = -star.alphaVelocity
            } else if (star.alpha <= 0) {
                star.x = randomScreenX()
                star.y = randomScreenY()
                star.alphaVelocity = -star.alphaVelocity
            }
            star.alpha += star.alphaVelocity
            star.scale.set(Math.min(star.scale.x + star.alphaVelocity, star.scaleMax))
        })

        meteor.y += PREF.METEOR_VELOCITY
        meteor.scale.y -= 0.02
        meteor.scale.x *= 0.99
        meteor.alpha *= 0.99

        if (meteor.alpha < 0.1) {
            meteor.scale.y = 3
            meteor.scale.x = 1
            meteor.y = -meteor.height
            console.log('meteor.height:', meteor.height)

            meteor.alpha = 1
            if (random(0, 1) > 0.5) {
                meteorAnchor.x = random(-200, app.renderer.width / 2 - 200)
                meteorAnchor.angle = -random(55, 80)
            } else {
                meteorAnchor.x = random(app.renderer.width / 2 + 200, app.renderer.width + 200)
                meteorAnchor.angle = random(55, 80)
            }
        }

        cloud.tilePosition.x -= 0.2
        cloud_.tilePosition.x = 0.2
        cloud2.tilePosition.x += 0.4
        cloud3.tilePosition.x += 0.8
        cloud4.tilePosition.x += 1
    })

    setInterval(() => {
        console.log('app.renderer.height:', app.renderer.height)
    }, 1000)
})
// })

function createGradient(from: string, to: string) {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    const grd = ctx.createLinearGradient(0, 0, 0, 100)
    grd.addColorStop(0, from)
    // grd.addColorStop(0.5, from)
    grd.addColorStop(1, to)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 100, 100)
    return PIXI.Texture.from(c)
}
