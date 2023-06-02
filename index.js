const loading = document.getElementById('loading');
const loadingBar = document.getElementById('loadingBar');
loadingBar.style.width = '1%';

const loadingInterval = setInterval(() => {
    loadingBar.style.width = parseFloat(loadingBar.style.width) + 15 + '%';
}, 200)

let touchEl;
let jumpBtn = document.querySelector('.jumpBtn');

valoria.load();

createText('Welcome to Rezeverse!', valoria.scene, 'welcome', false, valoria.THREE)
createText('Rezeverse creates virtual worlds and 3D Experiences\nfor online communities!\nWe make worlds for virtual conferences, virtual events, and more.\nHire us by emailing odd@hey.com', valoria.scene, 'bar', false, valoria.THREE)
createText('By the way, this is a multiplayer world! \n Dont believe us? Join in another tab, or on your phone! \n Heck, even phone a friend or two to join!', valoria.scene, 'bar2', false, valoria.THREE)


const directionalLight = new valoria.THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.y = 10
directionalLight.castShadow = true
valoria.scene.add(directionalLight)

const pLight2 = new valoria.THREE.PointLight(0x777777, 1)
pLight2.position.y = 10
pLight2.position.x = 0
pLight2.position.z = 0
pLight2.castShadow = true
valoria.scene.add(pLight2)

valoria.avatar.name = 'Guest#' + Math.floor((Math.random() * 8999) + 1000);
valoria.avatar.nameObject = valoria.addText(valoria.avatar.name || "Player");


// const skySphere = new valoria.THREE.SphereGeometry(500, 500, 500)
// const skyTexture = new valoria.THREE.TextureLoader().load('/universe.jpeg')
// const skyMat = new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//     side: THREE.BackSide,
//     map: skyTexture,
// })
// const skyBox = new THREE.Mesh(skySphere, skyMat)
// skyBox.rotation.y = 0;
// // valoria.scene.add(skyBox)

let fallCount = 0;

const fallMap = [
'Thought you might try doing that.\nRest assured, there is no escape.',
'Did you think I was kidding?',
'Welcome back.\nThis is all the world has to offer.\n Might as well get used to it.',
'You really dont like it here do you?',
'Well I dont know what to tell you.\n Nothing special will happen if you keep doing this.',
'There really isnt any special easter egg after the 10th time, trust me.',
'Okay youre starting to anger me.\n If you do it again im turning off the lights',
'Okay fine. I lied about the lights.',
'I dislike you.',
"Gravity called. It wants me to tell you it's not your friend.",
"Congratulations on completing the 'Fall and Return' tutorial.\n Now try something else!",
"Falling from great heights seems to be your thing.\n Have you considered becoming a professional diver?",
"Are you testing the boundaries of this rooftop bar\n or just looking for attention?\n Either way, you found it.",
"I hope the view from up there was worth it.\n Spoiler alert: it's the same down here.",
"You know, there's a perfectly good staircase inside the bar.\n But who am I to judge your life choices?",
"I've seen pigeons with better landing skills.\n Just saying.",
"Did you hear that? It was the sound\n of disappointment echoing through the universe.",
"Keep falling like that and you might become\n a permanent resident here.\n We could use a mascot.",
"If falling was an Olympic sport, \nyou'd definitely win a gold medal for your enthusiasm.",
"You're like a boomerang, always coming back for more.\n Only less useful.",
"Have you ever considered taking up skydiving?\n It might be a safer outlet for your adrenaline.",
"Congratulations on defying the laws of physics.\n Unfortunately, that's not an impressive talent around here.",
"Oh, look who it is again.\n You're really pushing my buttons now.",
"You seem determined to ruin your own fun. Bravo.",
"Do you enjoy wasting your time?\n Because I have all day.",
"Why don't you try doing something productive for once?\n Like leaving.",
"I can't believe you're still doing this.\n Are you trying to test my patience?",
"You're like a broken record.\n Falling and returning, falling and returning.\n It's getting old.",
"You must have a lot of free time on your hands to keep doing this nonsense.",
"Listen, I've had it with your rooftop antics.\n Find another bar to bother.",
"You're officially banned from rooftop activities.\n Consider yourself unwelcome.",
"I don't know what satisfaction you get from this,\n but it's not amusing anymore.",
"If you think you're being clever or rebellious, you're mistaken.\n You're just annoying.",
"This is your last warning.\n I'm calling the authorities if you jump off that roof again.",
"Do you ever wonder what it all means?\n The endless cycle of falling and returning...",
  "In the grand scheme of things,\n your rooftop escapades are as meaningless as the void itself.",
  "Existence can be a strange thing.\n Perhaps you're searching for purpose in all the wrong places.",
  "When you fall, do you feel a fleeting moment of freedom?\n Or does it only lead to another fall?",
  "The rooftop bar is a microcosm of existence.\n A constant repetition of actions, devoid of significance.",
  "Are you hoping to find answers by defying gravity?\n Unfortunately, the answers won't be found here.",
  "Each fall is a reminder of the void that lies beneath.\n It beckons you, tempting you to seek meaning.",
  "Maybe the futility of your actions is a metaphor for the human condition.\n Lost, searching, falling.",
  "The rooftop is but a temporary escape\n from the existential dread that plagues us all.",
  "As you plummet through the abyss, ask yourself:\n What is the purpose of your repetitive descent?",
  "Is this rooftop bar a prison or a sanctuary?\n The answer lies within your own perception.",
  "The fall symbolizes our futile attempts to escape the inevitable.\n We are bound to return, unchanged.",
  "There is beauty in the repetition, if you look closely.\n The rhythm of falling, the dance of futility.",
  "Perhaps we're all just falling, hoping to stumble\n upon meaning in the midst of this eternal descent.",
  "In this rooftop theater of existence,\n your repeated falls are the tragic comedy that keeps us entertained.",
  "The void above and below mirrors the void within.\n Maybe the answers lie not in falling, but in stillness.",
  "The rooftop bar is a stage, and you are the performer.\n Will you continue the act or seek a new script?",
  "What lies beyond this rooftop realm?\n Is there something greater, or is it merely another illusion?",
  "Embrace the absurdity of your actions.\nFind solace in the meaningless, and the fall becomes liberation.",
  "The rooftop bar is a blank canvas.\n It's up to you to paint meaning in the strokes of your falls.",
  "As you keep falling and returning,\n remember that the search for meaning is an eternal journey.",
  "In the grand symphony of existence,\n your falls are but a single note. Play it well, for it is yours alone.",
  "Does the rooftop bar define you,\n or do you define the rooftop bar? The answer lies in your perception.",
  "As you fall, contemplate the emptiness within.\n Only when we confront nothingness can we find true meaning.",
  "Let the wind guide your descent, and let your falls become\n a graceful dance in the theater of existence.",
  "In the infinity of this rooftop realm,\n your falls are both insignificant and infinitely profound.",
  "As you embrace the void, remember that \neven in nothingness, there is a spark of possibility.",
  "The rooftop bar is a paradox.\n A place of both confinement and liberation.\n The choice is yours.",
  "You've reached the edge of this rooftop bar's snarky wisdom.\n Time to find your own path.",
  "Congratulations on surviving the fall and returning.\n Now, go forth and create your own narrative.",
  "The rooftop bar bids you farewell.\n May your future adventures be filled with less falling and more purpose.",
  "This rooftop saga ends here.\n Seek meaning beyond the bounds of this snarky universe.",
  "You've exhausted the limits of this rooftop's patience.\n It's time to move on, or perhaps, look up.",
  "The rooftop bar fades into the background \nas you venture into new horizons. Bon voyage!",
  "The fall and return journey concludes.\n What lies ahead? Only you can find out.",
  "The rooftop's snarky messages fade away,\n but the memories of your repeated falls shall linger.",
  "As the rooftop bar recedes from view,\n remember that the journey continues,\n even without a snarky narrator.",
  "You've jumped, fallen, and returned.\n Now it's time to soar,\n to explore the vast expanse beyond this rooftop.",
  "This rooftop bar has served its purpose.\n It's time to write your own story,\n beyond the realm of falling and returning."

]

valoria.world.add('world','3dmodels/rooftop.glb', {castShadow: false, receiveShadow: true}).then(() => {
    valoria.world.model.position.set(
        -3.7306809839592114,0,-4.067159206763494
    )

    loadingBar.style.width = '100%';


    valoria.avatar.load().then(() => {
        valoria.avatar.model.receiveShadow = true;
        valoria.avatar.model.castShadow = true;            
        // Add the plane to the scene
        valoria.world.add('plane', '3dmodels/plane.glb').then(() => {
            valoria.world.models.plane.position.y = -100000000;

            valoria.world.join();          

            loading.style.display = 'none';
            clearInterval(loadingInterval);        
    
            valoria.update("fall", () => {
                // console.log(valoria.avatar.model.position)
                if (valoria.avatar.model.position.y < -50) {
                    valoria.avatar.model.position.set(2,100,-9)
                    // valoria.addText(valoria.avatar.name || "Player");
                    createText(fallMap[fallCount], valoria.scene, 'we-create', false, valoria.THREE)
                    fallCount++

                    if (!fallMap[fallCount]) {
                        fallCount = 0;
                    }
                }
            })
        })

    })




    valoria.world.onPlayerLeft = (player) => {
        const name = (player.metadata.name || "Player#" + player.id.substr(0,5))
        if(name == "World") name = "Waldo";
        addMsg("World", `${name} has left Valoria.`)
    }
    



    
})








// import * as THREE from 'three'

function createText(name, target, type, firstLbSetUp, THREE) {
    if (!firstLbSetUp) {
        target.remove(target.getObjectByName(`lb-${type}`))
    }

    let dpi = 2 //window.devicePixelRatio
    let fontSize = 17
    let element_ = document.createElement('canvas')
    let context2d_ = element_.getContext('2d')
    context2d_.canvas.width = 2560 * 2
    context2d_.canvas.height = 1280 * 2
    context2d_.fillStyle = '#ffffff' //'#f1c40f'
    context2d_.font = `bold ${fontSize * dpi}pt Sans-Serif`
    context2d_.shadowOffsetX = 1.1
    context2d_.shadowOffsetY = 1.1
    context2d_.shadowColor = 'rgba(0,0,0,1)'
    context2d_.shadowBlur = 2
    context2d_.textAlign = 'center'

    var x = 2560;
    var y = 640;
    var lineheight = 60;
    var lines = name.split('\n');
    
    for (var i = 0; i<lines.length; i++) {
        context2d_.fillText(lines[i], x, y + (i*lineheight) );
    }
    

    // context2d_.fillText(name, 128 * dpi, 64 * dpi)

    const map = new THREE.CanvasTexture(context2d_.canvas)

    let sprite_ = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: map, color: 0xffffff, fog: false })
    )
    sprite_.name = `lb-${type}`
    sprite_.scale.set(16,8,8)


    target.attach(sprite_)

    if (type === 'welcome') {
        sprite_.position.set(0, .5, 0)
    }

    if (type === 'we-create') {
        sprite_.position.set(2, .5, -9)

        setTimeout(() => {
            sprite_.position.set(2000,1,1);
        },7000)
    }

    if (type === 'bar') {
        sprite_.position.set(-10, .5, -8)
    }

    if (type === 'bar2') {
        sprite_.position.set(-10, .5, -15)
    }

    return sprite_;    

}
