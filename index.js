let isLocal = false;
let apiUrl =  "https://valoria-llc.onrender.com";
let wsUrl = "ws://" + new URL(apiUrl).host + "/"
if(apiUrl.startsWith('https')){
  wsUrl = "wss://" + new URL(apiUrl).host + "/"
}
let ws;

const loading = document.getElementById('loading');
const loadingBar = document.getElementById('loadingBar');
loadingBar.style.width = '1%';

const loadingInterval = setInterval(() => {
    if (parseFloat(loadingBar.style.width) > 85) {
        return
    }
    loadingBar.style.width = parseFloat(loadingBar.style.width) + 15 + '%';
}, 200)

let touchEl;
let jumpBtn = document.querySelector('.jumpBtn');

valoria.load();

createText('Welcome to Rezeverse!\nWe are a creative software agency.', valoria.scene, 'welcome', false, valoria.THREE)
createText("Rezeverse creates virtual worlds and 3D Experiences for online communities!\nWe make worlds for virtual conferences, virtual events, AMA's and more.\nHire us by emailing odd@hey.com\nsubject line: WORLDS AWAIT", valoria.scene, 'bar', false, valoria.THREE)
createText('By the way, this is a multiplayer world! \n Dont believe us? Join in another tab, or on your phone! \n Heck, even phone a friend or two to join!\nWe can host thousands of concurrent guests.', valoria.scene, 'bar2', false, valoria.THREE)
createText(`Looking for the old rezeverse game? Go to game.rezeverse.com`, valoria.scene, 'game', false, valoria.THREE)


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
// valoria.avatar.url = '3dmodels/joe.glb';
// valoria.avatar.url = 'https://models.readyplayer.me/647d8ae9786b05cdb7cb407a.glb'
valoria.avatar.receiveShadow = true;

// const skySphere = new valoria.THREE.SphereGeometry(500, 500, 500)
// const skyTexture = new valoria.THREE.TextureLoader().load('/universe.jpeg')
// const skyMat = new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//     side: THREE.BackSide,
//     map: skyTexture,
// })
// const skyBox = new THREE.Mesh(skySphere, skyMat)
// skyBox.rotation.y = 0;
// valoria.scene.add(skyBox)

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

function getDistance(mesh1, mesh2) { 
  var dx = mesh1.position.x - mesh2.position.x; 
  var dy = mesh1.position.y - mesh2.position.y; 
  var dz = mesh1.position.z - mesh2.position.z; 
  return Math.sqrt(dx*dx+dy*dy+dz*dz);
}


function deepCopy(obj, hash = new Map()) {
    // If the object is null, undefined, or not an object, return it as is
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    // If the object is already memoized, return the memoized copy
    if (hash.has(obj)) {
      return hash.get(obj);
    }
  
    // Create an empty copy of the object
    const copy = Array.isArray(obj) ? [] : {};
  
    // Memoize the copy before deep copying its properties
    hash.set(obj, copy);
  
    // Iterate over the object's properties and deep copy them
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key], hash);
      }
    }
  
    return copy;
  }

const avatarOptions = ['3dmodels/default-man.glb', '3dmodels/default-woman.glb', 'https://www.valoria.net/valoria/steven.glb', 'https://www.valoria.net/valoria/sophia.glb'];
const avatarOption = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];


var isChangeCharacterListenerAdded = false;
const changingRoom = document.querySelector('#changingRoom');

function addChangeCharacterListenerIfNotExists() {
  if (!isChangeCharacterListenerAdded) {
    changingRoom.style.display = 'flex';  
    // Add the event listener
    document.body.addEventListener('keydown', handleChangeCharacter);
    isEventListenerAdded = true;
  }
}

function removeChangeCharacterListenerIfExists() {
  if (isChangeCharacterListenerAdded) {
    changingRoom.style.display = 'none';
    // Remove the event listener
    document.body.removeEventListener('keydown', handleChangeCharacter);
    isEventListenerAdded = false;
  }
}

let currentCharacter = avatarOption
let randomCharacter = avatarOption
function handleChangeCharacter(event) {
  if (event.code === 'KeyC') {
    while (randomCharacter === currentCharacter) {
      randomCharacter = avatarOptions[Math.floor(Math.random() * avatarOptions.length)]
    }

    currentCharacter = randomCharacter;
    valoria.avatar.set(randomCharacter)
  }
}


valoria.world.add('world','3dmodels/rooftop.glb', {castShadow: false, receiveShadow: true}).then(() => {
    valoria.world.model.position.set(
        -3.7306809839592114,0,-4.067159206763494
    )

    loadingBar.style.width = '100%';


    valoria.avatar.load().then(() => {
        valoria.avatar.model.receiveShadow = true;
        valoria.avatar.model.castShadow = true;         

        if (valoria.isMobile) {
          loading.style.display = 'none';
          clearInterval(loadingInterval);        
        } else {
          valoria.avatar.set(avatarOption).then(() => {
            loading.style.display = 'none';
            clearInterval(loadingInterval);        
          })  
        }

        // Add the plane to the scene
        valoria.world.add('plane', '3dmodels/plane.glb').then(() => {
            valoria.world.models.plane.position.y = -100000000;

            valoria.world.join();          
            chatBox.style.display = 'flex';

            addMsg("World", `${valoria.avatar.name} has joined Valoria!`);
            ws.send(JSON.stringify({
              event: "Join chat",
              data: {
                name: valoria.avatar.name
              }
            }))
      
            if (valoria.isMobile) {
                valoria.avatar.enableTouchControls()
            }
    
            valoria.update("positionCheck", () => {

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

                if (getDistance(valoria.avatar.model, {position: {
                  x: -6.284166919485922, y: 0.6799999754875898, z: -2.517633447003323
                }}) <= 1.5) {
                  addChangeCharacterListenerIfNotExists();
                  isChangeCharacterListenerAdded = true;
                } else {
                  removeChangeCharacterListenerIfExists();
                  isChangeCharacterListenerAdded = false;
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

    if (type === 'game') {
        sprite_.position.set(-10, .5, -22)
    }

    return sprite_;    

}


const chatInputEl = document.querySelector('.chatInput');
const chatSendBtn = document.querySelector('.chatSendBtn');
const chatMsgsEl = document.querySelector('.chatMsgs');
const chatBox = document.querySelector('.chatBox');

ws = new WebSocket(wsUrl)
ws.onopen = async () => {
  console.log("Connected to " + wsUrl);
  ws.onmessage = async (resp) => {
    resp = JSON.parse(resp.data);
    if(wsEvents[resp.event]) wsEvents[resp.event](resp.data);
  }
  ws.send(JSON.stringify({event: "Load npcs", data: {}}));
}

const wsEvents = {
  "New chat message": newChatMsg
}

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyT') {
        chatInputEl.focus();
    }
})

valoria.world.onNewPlayer = (player) => {
    let name = (player.metadata.name || "Player#" + player.id.substr(0,5))
    if(name == "World") name = "Waldo";
    if(player.metadata.justJoined){
      addMsg("World", `${name} has joined Valoria!`)
    }
    valoria.peers[player.metadata.id].subscribed["Valoria Chat Message"] = async (data) => {
      addMsg(name, data.msg)
    }
  }

  async function newChatMsg(data){
    if(!data.msg || !data.msg.name || !data.msg.msg) return;
    addMsg(data.msg.name, data.msg.msg)
  }


  valoria.world.onPlayerLeft = (player) => {
    const name = (player.metadata.name || "Player#" + player.id.substr(0,5))
    if(name == "World") name = "Waldo";
    addMsg("World", `${name} has left Valoria.`)
  }

  chatInputEl.addEventListener("keydown", (e) => {
    if(e.code == "Enter"){
      sendMessage()
    }
  })
  
  chatSendBtn.addEventListener("click", (e) => {
    sendMessage();
  })

  async function sendMessage(){
    const msg = chatInputEl.value;
    if(msg.length < 1) return;
    chatInputEl.blur();
    chatInputEl.value = ""
    const players = Object.keys(valoria.world.players);
    players.forEach((player) => {
      valoria.peers[player].dc.send(JSON.stringify({
        event: "Valoria Chat Message",
        data: {
          msg
        }
      }))
    })
  
    addMsg(valoria.avatar.name, msg);
  
    ws.send(JSON.stringify({
      event: "New msg",
      data: {
        name: valoria.avatar.name,
        msg
      }
    }))
  
  }
  

  function addMsg(name, msg){
    let newMsg = document.createElement('div');
    newMsg.className = "chatMsg";
    let newMsgSender = document.createElement('span');
    newMsgSender.className = "chatMsgSender";
    newMsgSender.textContent = name + ":";
    newMsg.appendChild(newMsgSender)
    let newMsgText = document.createElement('span');
    newMsgText.className = "chatMsgText";
    newMsgText.textContent = msg;
    newMsg.appendChild(newMsgText)
    chatMsgsEl.appendChild(newMsg);
    chatMsgsEl.scrollTop = chatMsgsEl.scrollHeight;
  }  




  // idle
  // run
  // jump
  // dance
  // punch
  // death


  // once on mixamo, export model as fbx, not animations

  // then download each animation seperately as fbx. Save animations as their name.fbx

  // open blender, import the base model, then put in the animations while in the animation action editor.

  // then you can see all your actions. click them and stash them.

  // once all stashed they can be deleted from the scene.

  // scene should only have the base model, but the base model will have animations on a track.

  // export that whole thing as a glb.