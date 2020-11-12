class Popup {
    constructor(options) {
        this.classUniqueString = "roland-component-popup";
        this.uuid = this.generateUUID();
        this.title = options.title;
        this.content = options.content;
        this.buttons = options.buttons;
        this.keyEvents = options.keyEvents;
        this.duration = options.duration;
        this.dim = options.dim;
        this.expandStepDuration;
        typeof options.expandStepDuration === "undefined" ? this.expandStepDuration = 300 : this.expandStepDuration = options.expandStepDuration;
        this.collapseStepDuration;
        typeof options.collapseStepDuration === "undefined" ? this.collapseStepDuration = 300 : this.collapseStepDuration = options.collapseStepDuration;
        this.expandCallback = options.expandCallback;
        this.collapseCallback = options.collapseCallback;
        this.dimmerId = "popup-dimmer-" + this.uuid;
        this.containerId = "popup_container-" + this.uuid;
        this.containerClass = "popup-container-" + this.classUniqueString;
        this.contentDivId = "content-div-" + this.uuid;
        this.contentDivClass = "content-div-" + this.classUniqueString;
        this.titleBarId = "title-bar-" + this.uuid;
        this.titleBarClass = "title-bar-" + this.classUniqueString;
        this.titleTextId = "title-text-" + this.uuid;
        this.titleTextClass = "title-text-" + this.classUniqueString;
        this.closeButtonId = "close-button-" + this.uuid;
        this.closeButtonClass = "close-button-" + this.classUniqueString;
        this.buttonsDivId = "buttons-div-" + this.uuid;
        this.buttonsDivClass = "buttons-div-" + this.classUniqueString;
        this.buttonDivId = "button-div-" + this.uuid;
        this.buttonDivClass = "button-div-" + this.classUniqueString;
        this.buttonId = "button-" + this.uuid;
        this.buttonClass = "button-" + this.classUniqueString;
        this.expansionStartLeft;
        this.expansionStartTop;
    }

    addEvents = () => {
        $(document).on("click", "#" + this.closeButtonId, () => {
            this.collapse();
        });
        window.onresize = () => {
            //Setting the height of the content to the height of the container - the title bar - the buttons div - content top and bottom padding
            let titleBarHeight, buttonsDivHeight;
            typeof this.title === "undefined" ? titleBarHeight = 0 : titleBarHeight = $("#" + this.titleBarId).height();
            typeof this.buttons === "undefined" ? buttonsDivHeight = 0 : buttonsDivHeight = $("#" + this.buttonsDivId).height();
            $("#" + this.contentDivId).height($("#" + this.containerId).height() - titleBarHeight - buttonsDivHeight - parseFloat($("#" + this.contentDivId).css("padding-bottom").replace("px", "")) - parseFloat($("#" + this.contentDivId).css("padding-top").replace("px", "")));
        };
        let self = this;
        if (typeof self.keyEvents != "undefined") {
            $("#" + self.targetDivId).attr("tabindex", "0");
            $("#" + self.targetDivId).focus(() => {
                $("#" + this.targetDivId).css("outline","none");
            });
            $("#" + self.targetDivId).focus();
            $("#" + self.targetDivId).keyup(function(event) {
                for (let i in self.keyEvents) { 
                    if (event.keyCode === parseInt(i)) { 
                        if (typeof self.keyEvents[i].handler === "function") {
                            self.keyEvents[i].handler();
                        }
                    }
                }; 
            });
        }
        $(document).on("click", "#" + this.dimmerId, () => {
            this.collapse();
        });
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    closeButton = () => {
        return `<div id="${this.closeButtonId}" class="${this.closeButtonClass}"></div>`;
    }

    titleText = () => {
        return `<div id="${this.titleTextId}" class="${this.titleTextClass}">${this.title}</div>`;
    }

    titleBar = () => {
        if (typeof this.title != "undefined") {
            return `<div id="${this.titleBarId}" class="${this.titleBarClass}">${this.titleText() + this.closeButton()}</div>`;
        } else {
            return "";
        }
    }

    button = (index, handler) => {
        let idSafeIndex = index.replace(/ /g, "");
        $(document).on("click", "#" + idSafeIndex + "-" + this.buttonId, e => {
            this.buttons[index].handler === null ? this.collapse() : this.buttons[index].handler(e);
        });
        return `<div id="${idSafeIndex + "-" + this.buttonId}" class="${this.buttonClass}">${index}</div>`;
    }



    buttonDiv = (index, button) => {
        return `<div id="${this.buttonDivId + index}" class="${this.buttonDivClass}">${this.button(index, button.handler)}</div>`;
    }

    buttonsDiv = () => {
        if (typeof this.buttons === "undefined") {
            return "";
        } else {
            let html = `<div id="${this.buttonsDivId}" class="${this.buttonsDivClass}">`;
            for (let i in this.buttons) {
                html += this.buttonDiv(i, this.buttons[i]);
            }
            html += `</div>`;
            return html;
        }
    }

    contentHtml = () => {
        return `<div id="${this.contentDivId}" class="${this.contentDivClass}">${typeof this.content === "undefined" ? "" : this.content}</div>`;
    }

    getHtml = () => {
        return `<div id="${this.containerId}" class ="${this.containerClass}">${this.titleBar() + this.contentHtml() + this.buttonsDiv()}</div>`;
    }

    render = targetDivId => {
        this.targetDivId = targetDivId;
        //typeof this.dim === "undefined" || this.dim === null ? false : typeof this.dim === "object" && typeof this.dim.zindex != "undefined" ? $("body").append(`<div id="${this.dimmerId}" style="z-index:${this.dim.zindex};position:fixed;width:100%;height:100%;background:rgba(0, 0, 0, 0.2);"></div>`) : false;
        this.dim ? $("body").append(`<div id="${this.dimmerId}" style="cursor:pointer;z-index:${parseInt($("#" + this.targetDivId).css("z-index")) - 1};position:fixed;top:0px;width:100%;height:100%;background:rgba(0, 0, 0, 0.2);"></div>`) : false;
        $("#" + targetDivId).html(this.getHtml());

        this.addEvents();
    }

    expand = e => {
        let windowX, windowY;
        if (typeof e === "undefined") {
            windowX = $(window).width / 2,
            windowY = $(window).height / 2;
        } else {
            windowX = e.pageX,
            windowY = e.pageY;
        }
        let targetDivOffset = $("#" + this.targetDivId).offset(), 
        targetX = targetDivOffset.left,
        targetY = targetDivOffset.top;
        this.expansionStartLeft = windowX - targetX;
        this.expansionStartTop = windowY - targetY;
        $("#" + this.containerId).css("left", this.expansionStartLeft + "px");
        $("#" + this.containerId).css("top", this.expansionStartTop + "px");
        $("#" + this.containerId).animate(
            {width: "100%",height: "100%", left: "0px", top: "0px"}, 
            this.expandStepDuration, 
            () => {
                //Setting the height of the content to the height of the container - the title bar - the buttons div - content top and bottom padding
                let titleBarHeight, buttonsDivHeight;
                typeof this.title === "undefined" ? titleBarHeight = 0 : titleBarHeight = $("#" + this.titleBarId).height();
                typeof this.buttons === "undefined" ? buttonsDivHeight = 0 : buttonsDivHeight = $("#" + this.buttonsDivId).height();
                $("#" + this.contentDivId).height($("#" + this.containerId).height() - titleBarHeight - buttonsDivHeight - parseFloat($("#" + this.contentDivId).css("padding-bottom").replace("px", "")) - parseFloat($("#" + this.contentDivId).css("padding-top").replace("px", "")));
                $("#" + this.contentInnerDivId).height($("#" + this.containerId).height() - titleBarHeight - buttonsDivHeight - parseFloat($("#" + this.contentDivId).css("padding-bottom").replace("px", "")) - parseFloat($("#" + this.contentDivId).css("padding-top").replace("px", "")));
                $("#" + this.titleBarId).animate(
                    {opacity: 1},
                    this.expandStepDuration,
                    () => {
                        if (typeof this.expandCallback != "undefined" && this.expandCallback != null) {
                            this.expandCallback();
                        }
                        if (typeof this.duration != "undefined") {
                            setTimeout(() => {
                                this.collapse();
                            }, this.duration);
                        }
                    }
                );
                $("#" + this.buttonsDivId).animate(
                    {opacity: 1},
                    this.expandStepDuration,
                    () => {}
                );
                $("#" + this.contentDivId).animate(
                    {opacity: 1},
                    this.expandStepDuration,
                    () => {}
                );
            }
        );
        
    }

    collapse = () => {
        $("#" + this.buttonsDivId).animate(
            {opacity: 0},
            this.collapseStepDuration,
            () => {}
        );
        $("#" + this.contentDivId).animate(
            {opacity: 0},
            this.collapseStepDuration,
            () => {
                $("#" + this.containerId).animate(
                    {width: "0px",height: "0px", left: this.expansionStartLeft, top: this.expansionStartTop}, 
                    this.collapseStepDuration, 
                    () => {
                        if (typeof this.collapseCallback != "undefined" && this.collapseCallback != null) {
                            this.collapseCallback();
                        }
                        $("#" + this.targetDivId).remove();
                        $("#" + this.dimmerId).remove();
                    }
                );
            }
        );
        $("#" + this.titleBarId).animate(
            {opacity: 0},
            this.collapseStepDuration,
            () => {}
        );
    }
}