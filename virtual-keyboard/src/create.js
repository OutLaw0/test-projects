//import {keyLayout} from './base.js'

export function createHeader() {
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

export function createKeys() {

    const fragment = document.createDocumentFragment();
    const textArea = document.querySelector(".use-keyboard-input")
    this.textArea = textArea;
    //Create HTML icon
    const createIconHtml = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
    };
    const createSpecKey = (name) => {
        return `<span class="special-key">${name}</span>`;
    };
    this.keyLayout.en.forEach(key => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ["backspace", "Del", "enter", "&#9658;", "Close"].indexOf(key) !== -1;
        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");


        switch (key) {
            case "backspace":

                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHtml("backspace")
                keyElement.addEventListener("mousedown", () => {
                    const position = textArea.selectionStart;
                    this.properties.value = this.properties.value.slice(0, position - 1) + this.properties.value.slice(position, this.properties.value.length);

                    this._triggerEvent("oninput");
                    textArea.setSelectionRange(position - 1, position - 1)
                });
                break;

            case "Ctrl":
                // keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createSpecKey("Ctrl")
                break;

            case "Alt":
                // keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createSpecKey("Alt")
                break;

            case "Tab":
                //keyElement.classList.add("keyboard__key--wide")
                keyElement.innerHTML = createSpecKey("Tab")
                keyElement.addEventListener("mousedown", () => {
                    const position = textArea.selectionStart;
                    this.properties.value = this.properties.value.slice(0, position) + "\t" + this.properties.value.slice(position, this.properties.value.length);
                    this._triggerEvent("oninput");
                    textArea.setSelectionRange(position + 1, position + 1)
                });
                break;

            case "enter":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHtml("keyboard_return");
                keyElement.addEventListener("mousedown", () => {
                    const position = textArea.selectionStart;
                    this.properties.value = this.properties.value.slice(0, position) + "\n" + this.properties.value.slice(position, this.properties.value.length);
                    this._triggerEvent("oninput");
                    textArea.setSelectionRange(position + 1, position + 1)
                });
                break;

            case "space":
                keyElement.classList.add("keyboard__key--extra-wide");
                keyElement.innerHTML = createIconHtml("space_bar");
                keyElement.addEventListener("mousedown", () => {
                    const position = textArea.selectionStart;
                    this.properties.value = this.properties.value.slice(0, position) + " " + this.properties.value.slice(position, this.properties.value.length);
                    this._triggerEvent("oninput");
                    textArea.setSelectionRange(position + 1, position + 1)
                });
                break;

            case "caps":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createIconHtml("keyboard_capslock")
                keyElement.addEventListener("mousedown", () => {
                    this._toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                });
                break;

            case "Shift":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createSpecKey("Shift")
                keyElement.addEventListener("mousedown", () => {
                    this._toggleShift(this.properties.langRU ? 'Shift_ru' : 'Shift_en');
                    keyElement.classList.toggle("keyboard__key--active");

                });
                keyElement.addEventListener("mouseup", () => {
                    this._toggleLang(this.properties.langRU ? 'ru' : 'en');
                    keyElement.classList.toggle("keyboard__key--active");

                });
                break;


            case "changeLang":
                keyElement.classList.add("keyboard__key--dark");
                keyElement.innerHTML = createIconHtml("language");
                keyElement.addEventListener("mousedown", () => {
                    this._toggleLang(this.properties.langRU ? 'en' : 'ru');
                    this.properties.langRU = !this.properties.langRU;
                });
                break;

            case "Del":
                //keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createSpecKey("Del");
                keyElement.addEventListener("mousedown", () => {
                    const position = textArea.selectionStart;
                    this.properties.value = this.properties.value.substring(0, position) + this.properties.value.substring(position + 1);
                    this._triggerEvent("oninput");
                    textArea.setSelectionRange(position, position)
                });

                break;

            case "Close":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                keyElement.innerHTML = createIconHtml("check_circle");
                
                keyElement.addEventListener("click", () => {
                    keyElement.focus();
                    this.close();
                    this._triggerEvent("onclose");
                });
                break;

            default:
                keyElement.innerHTML = key.toLowerCase();

                keyElement.addEventListener("mousedown", () => {
                    const position = textArea.selectionStart;
                    this.properties.value = this.properties.value.slice(0, position) + this.elements.keys[this.keyLayout.en.indexOf(key)].textContent + this.properties.value.slice(position, this.properties.value.length)
                    this._triggerEvent("oninput");
                    textArea.setSelectionRange(position + 1, position + 1)
                }, false);

                break;
        }
        fragment.appendChild(keyElement);

        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }

    });
    return fragment;
}