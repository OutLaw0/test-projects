import './style/main.scss';
import {createHeader, createKeys} from './create.js'
import {keyLayout} from './base.js'

/*start keyboard*/

window.addEventListener("DOMContentLoaded", function () {
    createHeader();
})

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false,
        langRU: false,
    },
 
    keyLayout : keyLayout,

    init() { //create elements

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //add class
        this.elements.main.classList.add("keyboard", "keyboard--hidden1");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(createKeys.call(Keyboard)); //create elements from create JS
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");       
              
     //prevent losefocus!
        this.elements.main.addEventListener("mousedown", (e) => {
           e.preventDefault();
        }, false);

        this.elements.main.appendChild(this.elements.keysContainer)
        document.body.firstElementChild.appendChild(this.elements.main) 
  
        // Automatically use keyboard for elements with .use-keyboard-input
       document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    
      /*  this.open(textArea.value, currentValue => {
          textArea.value = currentValue;
      });*/          
    },

    _triggerEvent(handlerName){ 
     
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
       
        }
    },

    _toggleCapsLock(){
        this.properties.capsLock = !this.properties.capsLock;
        for (let key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },
    _toggleLang(lang){

       let array = this.keyLayout[lang]

        this.elements.keys.forEach((el, i) => {            
            if (el.childElementCount === 0) {
                console.log(array[i])
                el.textContent = array[i];
            }
        })

    },
    _toggleShift(lang){
        let array = this.keyLayout[lang]
     
         this.elements.keys.forEach((el, i) => {            
             if (el.childElementCount === 0) {
                 el.textContent = array[i];
             }
         })
     },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
        
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }

    /*print(){



    }*/

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  
     
    })
    

    //TODO

    // 1. Отменить стандартные нажатия клавиатуры, для этого прописать keycode для всех layout

    // 2. Сделать Shift сделать инверсию для капс лока!

    // 3. Сделать стрелочки 

    // Установить язык после перезагрузки local storage


    // ДОП. Сделать ЗАЛИПАНИЕ клавиш??? не факт что надо, главное чтобы с клавой работало
    //ДОП. удаление выделением backspace
    
    // PROFIT!!!
        
