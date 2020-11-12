class Notification {
    constructor(options) {
        this.classUniqueString = "roland-component-notifcation";
        this.uuid = this.generateUUID();
        this.content = options.content;
        this.title = options.title;
        this.duration = options.duration;
        this.contentStyle = options.contentStyle;
        this.containerId = "notification-container-" + this.uuid;
        this.containerClass = "notification-container-" + this.classUniqueString;
        this.contentId = "notification-content-" + this.uuid;
        this.contentClass = "notification-content-" + this.classUniqueString;
        this.popupOptions = {
            title: this.title,
            content: `<div id="${this.contentId}" class="${this.contentClass}" style="${this.contentStyle}">${this.content}</div>`,
            expandStepDuration: 0,
            collapseStepDuration: 100,
            duration: this.duration
        };
        this.popup = new Popup(this.popupOptions);
    }
    
    container = () => {
        return `<div id="${this.containerId}" class="${this.containerClass}" style="position:fixed;width:30%;height:15%;top:20px;right:20px;z-index: 9990;"></div>`;
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    render = () => {
        $("body").append(this.container());
        this.popup.render(this.containerId);
        this.popup.expand({pageX: $(window).width(), pageY: 0});
    }
}