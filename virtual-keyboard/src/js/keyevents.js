
export function print(key, type){

    const position = this.textArea.selectionStart;

   switch (key) {
       
    case "backspace":
        if (type == "mousedown" || type == "keydown") {
            this.properties.value = this.properties.value.slice(0, position - 1) + this.properties.value.slice(position, this.properties.value.length);
            this._triggerEvent("oninput");
            this.textArea.setSelectionRange(position - 1, position - 1)
        }
        break;

    case "Ctrl":
        
        break;

    case "Alt":
     
        break;

    case "Tab":
        if (type == "mousedown" || type == "keydown") {
            this.properties.value = this.properties.value.slice(0, position) + "\t" + this.properties.value.slice(position, this.properties.value.length);
            this._triggerEvent("oninput");
            this.textArea.setSelectionRange(position + 1, position + 1)
        }
        break;

    case "keyboard_return":
        if (type == "mousedown" || type == "keydown") {
            this.properties.value = this.properties.value.slice(0, position) + "\n" + this.properties.value.slice(position, this.properties.value.length);
            this._triggerEvent("oninput");
            this.textArea.setSelectionRange(position + 1, position + 1)
        }
        break;

    case "space_bar":
        if (type == "mousedown" || type == "keydown") {
            this.properties.value = this.properties.value.slice(0, position) + " " + this.properties.value.slice(position, this.properties.value.length);
            this._triggerEvent("oninput");
            this.textArea.setSelectionRange(position + 1, position + 1)
        }
        break;

    case "keyboard_capslock": {
        if (type == "mousedown" || type == "keydown") {
        const elem = this.elements.keys[29]
            this._toggleCapsLock();
            elem.classList.toggle("keyboard__key--active", this.properties.capsLock);
        }
    }
        break;

    case "Shift": {

        const elem  = this.elements.keys[42]

        if (type == "mousedown" || type == "keydown") {
            this._toggleShift(this.properties.langRU ? 'Shift_ru' : 'Shift_en');
           
            elem.classList.add("keyboard__key--active");
        }

        if (type == "keyup" || type == "mouseup") {
            this._toggleLang(this.properties.langRU ? 'ru' : 'en');
            elem.classList.remove("keyboard__key--active");
        }
    }
        break;


    case "language":

        if (type == "mousedown" || type == "keydown") { 
            this._toggleLang(this.properties.langRU ? 'en' : 'ru');
            this.properties.langRU = !this.properties.langRU;
        }
        break;

    case "Del":

       if (type == "mousedown" || type == "keydown") { 
            this.properties.value = this.properties.value.substring(0, position) + this.properties.value.substring(position + 1);
            this._triggerEvent("oninput");
            this.textArea.setSelectionRange(position, position)
        }

        break;

    case "check_circle": {
        const elem = this.elements.keys[54]
        if (type == "mousedown" || type == "keydown") { 
            elem.focus();
            this.close();
            this._triggerEvent("onclose");
        }
    }
        break;

    default:

        if (type == "mousedown" || type == "keydown") {
        
            this.properties.value = this.properties.value.slice(0, position) + key + this.properties.value.slice(position, this.properties.value.length)
            this._triggerEvent("oninput");
            this.textArea.setSelectionRange(position + 1, position + 1)
        }

        break;
}

}