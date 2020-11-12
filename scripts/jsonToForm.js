class JsonToForm {
    constructor(name, json, step) {
        this.step = step;
        this.name = name;
        this.json = json;
        this.uuid = this.generateUUID();
        this.classUniqueString = "roland-component-json-form";
        this.jsonFormId = "json-form-" + this.uuid;
        this.jsonFormClass = "json-form-" + this.classUniqueString;
        this.formRowsId = "form-rows-" + this.uuid;
        this.formRowsClass = "form-rows-" + this.classUniqueString;
        this.formRowId = "form-row-" + this.uuid;
        this.formRowClass = "form-row-" + this.classUniqueString;
        this.textInputId = "text-input-" + this.uuid;
        this.textInputClass = "text-input-" + this.classUniqueString;
        this.textAreaId = "text-area-" + this.uuid;
        this.textAreaClass = "text-area-" + this.classUniqueString;
        this.labelClass = "form-input-label-" + this.classUniqueString;
        this.questionMarkId = "question-mark-" + this.uuid;
        this.questionMarkClass = "question-mark-" + this.classUniqueString;
        this.syntaxErrorIndicatorID = "syntax-error-indicator-" + this.uuid;
        this.syntaxErrorIndicatorClass = "syntax-error-indicator-" + this.classUniqueString; 
        this.syntaxCheckPassedIndicatorID = "syntax-check-passed-indicator-" + this.uuid;
        this.syntaxCheckPassedIndicatorClass = "syntax-check-passed-indicator-" + this.classUniqueString;
        
        
    }

    getHtml = () => {
        return `<div id="${this.name + "-" + this.jsonFormId}" class="${this.jsonFormClass}">${this.formRows()}</div>`;
    }

    formRows = () => {
        let html = `<div id="${this.name + "-" + this.formRowsId}" class="${this.formRowsClass}">`;
        for (let i in this.json) {
            html += this.formRow(i.trim(), this.json[i]);
        }
        html += `</div>`;
        return html;
    } 
    
    formRow = (index, rowData) => {
        let indexWithSpaces = index;
        index = index.replace(/ /g, "");
        let html = `<div style="${rowData.style}" id="${this.name + "-" + index + "-" + this.formRowId}" class="${this.formRowClass}">`;
        switch (rowData.type) {
            case "textInput":
                html += this.textInputRow(index, rowData, indexWithSpaces) + `</div>`;
                break;
            case "textArea":
                html += this.textAreaRow(index, rowData, indexWithSpaces) + `</div>`;
                break;
            case "userInputForm":
                html += this.userInputFormRows(rowData) + `</div>`;
                break;
            case "text":
                if (rowData.value !== "") {
                    html += this.textRow(rowData) + `</div>`;
                } else {
                    html = "";
                    html += this.textRow(rowData);
                }
                break;
            default:
                html += this.textInputRow(index, rowData, indexWithSpaces) + `</div>`;
        }
        //html += `</div>`;
        return html;
    }

    userInputFormRows = (rowData) => {
        let html = `<div id="" class="">`;
        for (let i in rowData.form) {
            html += this.userInputFormRow(i, rowData.form[i]);
        }
        return html + `</div>`;
    }

    userInputFormRow = (indexWithSpaces, rowData) => {
        let indexWithoutSpaces = indexWithSpaces.replace(/ /g, "");
        if (rowData.type === "textInput") {
            $(document).off("change", "#" + this.name + "-" + indexWithoutSpaces + "-" + this.textInputId).on("change", "#" + this.name + "-" + indexWithoutSpaces + "-" + this.textInputId, e => {
                rowData.stringValue = $("#" + e.target.id).val().replace(/\"/g, "&quot;");
            });
            return `<div class="${this.labelClass}">
                        ${rowData.error == null ? this.syntaxCheckPassedIndicator() : this.syntaxError(rowData.error)} 
                        ${indexWithSpaces + (rowData.mandatory ? "*" : "")} 
                        ${this.questionMark(rowData.tooltip)} 
                    </div>
                    <div>
                        <input id="${this.name + "-" + indexWithoutSpaces + "-" + this.textInputId}" class="${this.textInputClass} ${this.classUniqueString}" type="text" value="${rowData.stringValue}" placeholder="${rowData.placeholder}" ${rowData.locked ? "disabled" : ""}></input>
                    </div>`;
        } else if (rowData.type === "textArea") {
            $(document).off("change", "#" + this.name + "-" + indexWithoutSpaces + "-" + this.textAreaId).on("change", "#" + this.name + "-" + indexWithoutSpaces + "-" + this.textAreaId, e => {
                rowData.stringValue = $("#" + e.target.id).val();
            });
            return `<div class="${this.labelClass}">
                        ${rowData.error == null ? this.syntaxCheckPassedIndicator() : this.syntaxError(rowData.error)}  
                        ${indexWithSpaces + (rowData.mandatory ? "*" : "")} 
                        ${this.questionMark(rowData.tooltip)} 
                    </div>
                    <div>
                        <textarea id="${this.name + "-" + indexWithoutSpaces + "-" + this.textAreaId}" class="${this.textAreaClass} ${this.classUniqueString}" type="text" placeholder="${rowData.placeholder}" ${rowData.locked ? "disabled" : ""}>${rowData.stringValue}</textarea>
                    </div>`;
        } else if (rowData.type === "text") {
            return rowData.value !== "" ? `<div class="${this.labelClass}">
                        ${rowData.value}
                    </div>` : "";
        }
    }

    textRow = rowData => {
        return rowData.value !== "" ? `<div class="${this.labelClass}">
                                            ${rowData.value}
                                        </div>` : "";
    }

    textInputRow = (index, rowData, indexWithSpaces) => {
        $(document).off("change", "#" + this.name + "-" + index + "-" + this.textInputId).on("change", "#" + this.name + "-" + index + "-" + this.textInputId, e => {
            rowData.stringValue = $("#" + e.target.id).val().replace(/\"/g, "&quot;");
        });
        return `<div class="${this.labelClass}">${rowData.validationType !== null ? rowData.error == null ? this.syntaxCheckPassedIndicator() : this.syntaxError(rowData.error) : ""} ${indexWithSpaces + (rowData.mandatory ? "*" : "")} ${rowData.tooltip !== null ? this.questionMark(rowData.tooltip) : ""} </div>
        <div><input id="${this.name + "-" + index + "-" + this.textInputId}" class="${this.textInputClass} ${this.classUniqueString}" type="text" value="${rowData.stringValue}" placeholder="${rowData.placeholder}" ${rowData.locked ? "disabled" : ""}></input></div>`;
    }

    textAreaRow = (index, rowData, indexWithSpaces) => {
        $(document).off("change", "#" + this.name + "-" + index + "-" + this.textAreaId).on("change", "#" + this.name + "-" + index + "-" + this.textAreaId, e => {
            rowData.stringValue = $("#" + e.target.id).val();
        });
        return `<div class="${this.labelClass}">${rowData.error == null ? this.syntaxCheckPassedIndicator() : this.syntaxError(rowData.error)} ${indexWithSpaces + (rowData.mandatory ? "*" : "")} ${this.questionMark(rowData.tooltip, rowData.tooltipStyle)} </div>
        <div><textarea id="${this.name + "-" + index + "-" + this.textAreaId}" class="${this.textAreaClass} ${this.classUniqueString}" type="text" placeholder="${rowData.placeholder}" ${rowData.locked ? "disabled" : ""}>${rowData.stringValue}</textarea></div>`;
    }

    questionMark = (content, tooltipStyle) => {
        return `<div id="${this.questionMarkId}" class="${this.questionMarkClass} tooltip-roland-component-json-form">
                    <span class="tooltiptext-roland-component-json-form" style="${typeof tooltipStyle !== "undefined" ? tooltipStyle : ""}">${content}</span>
                </div>`;
    }

    syntaxError = content => {
        return `<div id="${this.syntaxErrorIndicatorID}" class="${this.syntaxErrorIndicatorClass} tooltip-roland-component-json-form">
                    <span class="tooltiptext-roland-component-json-form">${content}</span>
                </div>`;
    }

    syntaxCheckPassedIndicator = () => {
        return `<div id="${this.syntaxCheckPassedIndicatorID}" class="${this.syntaxCheckPassedIndicatorClass} tooltip-roland-component-json-form">
                    <span class="tooltiptext-roland-component-json-form">${"This field is looking good!"}</span>
                </div>`;
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}