class DropUpload {

    #filesDc = {}
    #node
    #elementId
    #acceptFiles
    #previewId

    constructor(node, elementId, acceptFiles) {
        this.#elementId = elementId
        this.#node = node

        if(acceptFiles == undefined || acceptFiles == null)
            this.#acceptFiles = "*"
        else
            this.#acceptFiles = acceptFiles
        
        this.#addEvents()
    }

    #addEvents() {
        const el = this.#node.querySelector(this.#elementId)

        el.owner = this
        el.ondrop = (ev) => {
            ev.preventDefault();

            if (ev.dataTransfer.items) {
                for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                    if (ev.dataTransfer.items[i].kind === 'file') {
                        var file = ev.dataTransfer.items[i].getAsFile();
                        el.owner.addFile(file)
                    }
                }
            } 
        }
        
        el.ondragover = (ev) => {
            ev.preventDefault()
        }
        
        el.innerHTML += `<input type="file" style="display:none;" accept="${this.#acceptFiles}">`
        
        el.onclick = () => {
            el.querySelector("input").click()
            el.querySelector("input").onchange = function() {
                for(var i = 0; i < this.files.length; i++)
                    el.owner.addFile(this.files[i])
            }
        }
    }

    addFile(file) {
        this.#filesDc[file.name] = file
        console.log(this.#filesDc)
        this.#renderPreview()

    }

    getFiles() {
        return this.#filesDc
    }

    #renderPreview() {
        this.#node.querySelector(this.#previewId).innerHTML = ""
        Object.keys(this.#filesDc).forEach((k) => {
            this.#node.querySelector(this.#previewId).innerHTML += `<div class="preview-item">${k}</div>`
        })
    }

    addPreview(id) {
        this.#previewId = id
        this.#renderPreview()
    }
}

