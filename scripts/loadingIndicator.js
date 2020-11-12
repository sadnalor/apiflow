class LoadingIndicator {
    constructor() {
        this.uuid = this.generateUUID();
        this.classUniqueString = "roland-component-loading-indicator";
        this.dimmerId = "dimmer-" + this.uuid;
        this.dimmerClass = "dimmer-" + this.classUniqueString;
        this.loaderId = "loader-" + this.uuid;
        this.loaderClass = "loader-" + this.classUniqueString;
        this.dimmerHtml = `<div id="${this.dimmerId}" class="${this.dimmerClass}"></div>`;
        this.loaderHtml = `<div id="${this.loaderId}" class="${this.loaderClass}"></div>`;
        $("body").append(this.dimmerHtml);
        $("body").append(this.loaderHtml);
    }

    show = () => {
        $("#" + this.dimmerId).show();
        $("#" + this.loaderId).show();
    }

    hide = () => {
        $("#" + this.dimmerId).hide();
        $("#" + this.loaderId).hide();
    }

    destroy = () => {
        $("#" + this.dimmerId).remove();
        $("#" + this.loaderId).remove();
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}