import './style/main.scss';

/*start keyboard*/

function createHeader() { 
    const container = document.createElement("div");
    const footer = document.createElement("footer");

    container.classList.add("container");
   
    document.body.appendChild(container)
    document.body.appendChild(footer)

    const new_desc_inner = `<h1>Virtual Keyboard w/ Vanilla JS</h1>
    <h3>Features</h3>
    <ul>
        <li>Easy to integrate</li>
        <li>Responsive</li>
        <li>Vanilla JS (<strong>no libraries required!</strong>)</li>
    </ul>
    <textarea name="keyboard_text" class="use-keyboard-input" rows="5" cols="35"></textarea>`;
    
    container.insertAdjacentHTML("afterBegin", new_desc_inner);

    const new_footer_inner =

    `<div class="footer__container footer-copyright">
    <div class="footer-copyright__element">
        <p class="copyright">©</p>
        <p class="year">2022</p>
        <a class="github-username" href="https://github.com/OutLaw0" target="_blank" rel="noopener noreferrer">github</a>
    </div>
    <a href="https://rs.school/js/" class="rss" target="_blank"> Rolling Scopes School </a>
</div>`
    
footer.insertAdjacentHTML("afterBegin", new_footer_inner);
}


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
 
    keyLayout : [
        "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace",
        "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'","enter",
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "Close", "Ctrl", "ChangeLang", "Alt", "space"
    ],

     keyLayoutRU : [
        "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace",
        "Tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э","enter",
        "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
        "Close", "Ctrl", "ChangeLang", "Alt", "space"
    ],

    init() { //create elements

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //add class
        this.elements.main.classList.add("keyboard", "keyboard--hidden1");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        //add to body > container
       
              
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
    /*
        const textArea = document.querySelector(".use-keyboard-input");
        this.open(textArea.value, currentValue => {
          textArea.value = currentValue;
      });*/          
    },
  
    _createKeys() {
      
        const fragment = document.createDocumentFragment();
      

        //Create HTML icon
        const createIconHtml = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        this.keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ["backspace", "Del", "enter", "?"].indexOf(key) !== -1;
            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            if (key == "backspace"){

                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHtml("backspace")
                keyElement.addEventListener("click", () => {
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    this._triggerEvent("oninput");

                });
            }
            else if (key == "caps"){
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createIconHtml("keyboard_capslock")
                keyElement.addEventListener("click", () => {
                    this._toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                });
            }
            else if (key == "enter"){
                keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHtml("keyboard_return");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
                }
                else if (key == "space"){
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHtml("space_bar");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    }
                else if (key == "ChangeLang"){
                       keyElement.classList.add("keyboard__key--dark");
                        keyElement.innerHTML = createIconHtml("language");
                        keyElement.addEventListener("click", () => {
                            this._toggleLang();
                        });
                        }
                else if (key == "Close"){
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHtml("check_circle");

                    keyElement.addEventListener("click", () => {

                        this.close();
                        this._triggerEvent("onclose");
                    });
                }
                 else {
                        keyElement.textContent = key.toLowerCase();
    
                        keyElement.addEventListener("mousedown", () => {
                         
                           this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                           this._triggerEvent("oninput");
                       
                        }, false);

                    }
                        fragment.appendChild(keyElement);

                        if (insertLineBreak) {
                            fragment.appendChild(document.createElement("br"));
                        }            
                  
                      
        })
      
        return fragment;

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
    _toggleLang(){
        let array = [];
       if (this.properties.langRU) {
           array = this.keyLayout;
           this.properties.langRU = false
       }
       else {
        array = this.keyLayoutRU;
        this.properties.langRU = true
    }
        for (let i = 0; i < this.elements.keys.length; i++) {
            if (this.elements.keys[i].childElementCount === 0) {
                this.elements.keys[i].textContent = array[i];
            }
        }
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

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
   
     
    })
    

    //TODO

    // 1. Отменить стандартные нажатия клавиатуры, для этого прописать keycode для всех layout

    // 2. Сделать Shift для этого также нужны KeyCode

    // 3. Сделать стрелочки 

    // 4. Сделать ЗАЛИПАНИЕ клавиш

    //5. Сделать Del
    
    // PROFIT!!!
        
