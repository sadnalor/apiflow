class FlowBuilderUI {
    constructor(context, settings) {
        this.templates = new FlowBuilderTemplates();
        this.templateNameList = [];
        for (let i in this.templates.list) {this.templateNameList.push(i)};
        this.context = typeof context != "undefined" ?  context : null;
        if (typeof settings != "undefined") {
            this.settings = settings;
        } else {
            this.settings = this.templates.newFlowTemplate();
            this.settings.flow["1"] = this.templates.list["API Call"]("", 0, 1);
            this.settings.successOutput = this.templates.list["HTML Output"]("", 0, 0, "Success Message", `<div style="padding:5px;">API flow executed successfully.</div>`);
            this.settings.failureOutput = this.templates.list["HTML Output"]("", 0, 0, "Failure Message", `<div style="padding:5px;">API flow failed.</div>`);
            //this.settings.flow["2"] = this.templates.list["Conditional Action List"]("", 0, 2);
            //this.settings.flow["3"] = this.templates.list["While Loop"]("", 0, 3);
        }
        this.userVariables = {context: this.context};
        if (context != null) {this.userVariables.context = this.context};
        this.execute = new FlowBuilderExecutor(this.userVariables);
        this.uuid = this.generateUUID();
        this.classUniqueString = "roland-component-flow-builder";
        this.builderDivId = "builder-div-" + this.uuid;
        this.builderDivClass = "builder-div-" + this.classUniqueString;
        this.apiCallStepId = "api-call-step-" + this.uuid;
        this.apiCallStepClass = "api-call-step-" + this.classUniqueString;
        this.conditionalActionListStepId = "conditional-action-list-step-" + this.uuid;
        this.conditionalActionListStepClass = "conditional-action-list-step-" + this.classUniqueString;
        this.conditionalActionListConditonInputId = "conditional-action-list-condition-input-" + this.uuid;
        this.conditionalActionListConditonInputClass = "conditional-action-list-condition-input-" + this.classUniqueString;
        this.whileLoopStepId = "while-loop-step-" + this.uuid;
        this.whileLoopStepClass = "while-loop-step-" + this.classUniqueString;
        this.stepClass = "step-" + this.classUniqueString;
        this.headerInputId = "header-input-" + this.uuid;
        this.headerInputClass = "header-input-" + this.classUniqueString;
        this.payloadInputId = "payload-input-" + this.uuid;
        this.payloadInputClass = "payload-input-" + this.classUniqueString;
        this.endpointInputId = "endpoint-input-" + this.uuid;
        this.endpointInputClass = "endpoint-input-" + this.classUniqueString;
        this.methodInputId = "method-input-" + this.uuid;
        this.methodInputClass = "method-input-" + this.classUniqueString;
        this.variableNameInputId = "variable-name-input-" + this.uuid;
        this.variableNameInputClass = "variable-name-input-" + this.classUniqueString;
        this.stepSelectorId = "step-selector-" + this.uuid;
        this.stepSelectorClass = "step-selector-" + this.classUniqueString;
        this.labelClass = "label-" + this.classUniqueString;
        this.buttonsDivId = "buttons-div-" + this.uuid;
        this.buttonsDivClass = "buttons-div-" + this.classUniqueString;
        this.moveUpDownButtonsDivClass = "move-up-down-buttons-div-" + this.classUniqueString;
        this.moveUpDownButtonClass = "move-up-down-button-" + this.classUniqueString;
        
        this.moveUpButtonId = "move-up-button-" + this.uuid;
        this.moveDownButtonId = "move-down-button-" + this.uuid;
        this.buttonDivId = "button-div-" + this.uuid;
        this.buttonDivClass = "button-div-" + this.classUniqueString;
        this.buttonId = "button-" + this.uuid;
        this.disabledButtonClass = "disabled-button-" + this.classUniqueString;
        this.buttonClass = "button-" + this.classUniqueString;
        this.testPopupId = "test-popup-" + this.uuid;
        this.stepSelectorPicklistId = "step-selector-picklist-" + this.uuid;
        this.loader = new LoadingIndicator();

        this.execute.loader = this.loader;

        this.stepAdderId = "add-step-button-" + this.uuid;
        this.stepAdderClass = "add-step-button-" + this.classUniqueString;
        this.allowedApiMethods = ["get", "post", "put", "patch", "delete"];
    }

    getHtml = () => {
        return `<div id="${this.builderDivId}" class="${this.builderDivClass}">
                    ${this.nameAndDescription(this.settings)} 
                    ${this.stepsHtml(this.settings.flow, "", 0)}
                    ${this.outputEditors(this.settings.flow, "", 0)}
                </div>`;
    }

    nameAndDescription = app => {
        return `<div id="${"0-0-" + this.apiCallStepId}" class="${this.apiCallStepClass} ${this.classUniqueString}" id="${app.id}">
                    ${new JsonToForm("0-0", this.settings.form, this.settings).getHtml()}
                </div>`;
    }

    outputEditors = step => {
        if (typeof this.settings.successOutput === "undefined") {
            this.settings.successOutput = this.templates.list["HTML Output"]("", 0, 0, "Success Message", `<div style="padding:5px;">API flow executed successfully.</div>`);
        }
        if (typeof this.settings.failureOutput === "undefined") {
            this.settings.failureOutput = this.templates.list["HTML Output"]("", 0, 0, "Failure Message", `<div style="padding:5px;">API flow failed.</div>`);
        }
        
        return `<div id="${"successOutput-" + this.uuid}" class="${this.apiCallStepClass} ${this.classUniqueString}">
                    ${new JsonToForm("0-0", this.settings.successOutput.form, this.settings).getHtml()}
                    
                </div>
                <div id="${"failureOutput-" + this.uuid}" class="${this.apiCallStepClass} ${this.classUniqueString}">
                    ${new JsonToForm("0-0", this.settings.failureOutput.form, this.settings).getHtml()}
                    
                </div>`;
    }

    stepsHtml = (steps, parentAddress, level) => {
        let html = "<div>";
        for (let i in steps) {
            html += this.stepHtml(steps, steps[i]);
        }
        html += this.addStepButton(steps, parentAddress, level);
        html += "</div>";
        return html;
    }

    stepHtml = (steps, step) => {
        return `<div id="${step.level + "-" + step.order + "-" + this.apiCallStepId}" class="${this.apiCallStepClass} ${this.classUniqueString}" id="${step.id}">
            ${this.stepSelector(steps, step)}
            ${new JsonToForm(step.level + "-" + step.order, step.form, step).getHtml()}
            ${step.type === "userInputForm" ? this.addVariableButton(steps, step.parentAddress, step.level, step.form.Form.form) : ""}
            ${this.buttonsDiv(step)}       
            ${step.flow != null && typeof step.flow === "object" ? this.stepsHtml(step.flow, step.parentAddress + step.order +  ".", step.level + 1) : ""}
        </div>`;
    }

    addStepButton = (steps, parentAddress, level) => {
        let order = Object.keys(steps).length + 1,
        UUID = this.generateUUID();
        $(document).off("click", "#" + level + "-" + order + "-" + this.stepAdderId + "-" + UUID).on("click", "#" + level + "-" + order + "-" + this.stepAdderId + "-" + UUID, e => {
            steps[order] = this.templates.list["API Call"](parentAddress, level, order);
            this.render(this.targetDivId);  
        });
        return `<div class="${this.stepClass} ${this.classUniqueString}">
                    <div id="${level + "-" + order + "-" + this.stepAdderId + "-" + UUID}" class="${this.stepAdderClass}">Add step</div>
                </div>`;
    }

    addVariableButton = (steps, parentAddress, level, form) => {
        let order = Object.keys(steps).length + 1,
        UUID = this.generateUUID(),
        newForm;
        $(document).off("click", "#" + level + "-" + order + "-" + "variableAdder" + "-" + UUID).on("click", "#" + level + "-" + order + "-" + "variableAdder" + "-" + UUID, e => {
            newForm = this.templates.userInputTemplateAddVariable(parentAddress, level, order, form);
            for (let i in newForm) {
                form[i] = newForm[i];
            }
            this.render(this.targetDivId);  
        });
        return `<div class="${this.stepClass} ${this.classUniqueString}">
                    <div id="${level + "-" + order + "-" + "variableAdder" + "-" + UUID}" class="${this.stepAdderClass}">Add variable</div>
                </div>`;
    }

    syntaxCheck = step => {
        this.execute.syntaxCheck(step, true);
        this.render(this.targetDivId);
    }

    testRunStep = async (step, e) => {
        this.loader.show();
        let results = await this.execute.run(step, {}, {}, e);
        this.loader.hide();
        if (results.success) {
            this.testPopup(e, "Test succeeded. Results below.", `<textarea style="width:100%;height:100%;resize:none;">` + JSON.stringify(results.responses, null, 2) + `</textarea>`);
        } else {
            this.testPopup(e, "Test failed. Results below.", `<textarea style="width:100%;height:100%;resize:none;">` + JSON.stringify({successfulSteps: results.responses, failedStep: results.errors}, null, 2) + `</textarea>`);
        }
        this.render(this.targetDivId);
    }

    testPopup = (e, title, response) => {
        let popupOptions = {
            title: title, 
            content: `<div style="padding:10px;box-sizing:border-box;height:100%;">${response}</div>`,
            buttons: {
                OK: {
                    handler: null
                }            
            },
            expandStepDuration: 300,
            collapseStepDuration: 300,
            keyEvents: {
                13: {
                    handler: null
                },
                27: {
                    handler: null
                }
            },
            dim: true
        },
        popup = new Popup(popupOptions);
        popup.keyEvents[13].handler = popup.collapse
        popup.keyEvents[27].handler = popup.collapse;
        $("body").append(`<div id="${this.testPopupId}" style="position:fixed;width:80%;height:80%;top:10%;left:10%;z-index: 9990;"></div>`);
        popup.render(this.testPopupId);
        popup.expand(e);
    }

    deleteStep = (step) => {
        let parent = this.getParentByChildId(this.settings, step.id),
        done = false,
        keyToDelete = step.order,
        iteration = 1;
        delete parent.flow[keyToDelete];
        while (Object.keys(parent.flow).length > 0 && !done) {
            if (iteration >= keyToDelete) {
                if (iteration <= Object.keys(parent.flow).length) {
                    parent.flow[iteration] = parent.flow[iteration + 1];
                    parent.flow[iteration].order--;
                    delete parent.flow[iteration + 1];
                } else {
                    done = true;
                }
            }
            iteration++;
        }
        this.render(this.targetDivId);
    }

    getParentByChildId = (object, id) => {
        let result;
        for (let i in object.flow) {
            if (object.flow[i].id === id) {
                return object;
            } else if (object.flow[i].type === "conditional" || object.flow[i].type === "conditionalWhile" || object.flow[i].type === "conditionalRunOn") {
                result = this.getParentByChildId(object.flow[i], id);
                if (typeof result != "undefined") {
                    return result;
                }
            }
        }
    }

    button = (index, label, step, handler) => {
        $(document).off("click", "#" + step.id + "-" + index + "-" + this.buttonId).on("click", "#" + step.id + "-" + index + "-" + this.buttonId, e => {
            if (!$("#" + step.id + "-" + index + "-" + this.buttonId).hasClass(this.disabledButtonClass)) {
                handler(e);
            }
        });
        let passedSyntaxCheck = index === "test-step" ? step.passedSyntaxCheck : true;
        //return `<div id="${step.id + "-" + index + "-" + this.buttonId}" class="${this.buttonClass} ${!passedSyntaxCheck ? this.disabledButtonClass : ""}">${label}</div>`; 
        return `<div id="${step.id + "-" + index + "-" + this.buttonId}" class="${this.buttonClass} ${!passedSyntaxCheck ? "" : ""}">${label}</div>`; 
    }

    buttonDiv = (index, label, step, handler) => {
        return `<div id="${step.id + "-" + this.buttonDivId + "-" + index}" class="${this.buttonDivClass}">${this.button(index, label, step, handler)}</div>`;
    }

    buttonsDiv = step => {
        let html = `<div id="${step.id + "-" + this.buttonsDivId}" class="${this.buttonsDivClass}">`;
        html += this.buttonDiv("check-syntax", "Check Syntax", step, this.partial(this.syntaxCheck, step));
        html += this.buttonDiv("test-step", "Test Step", step, this.partial(this.testRunStep, step));
        html += this.buttonDiv("delete-step", "Delete", step, this.partial(this.deleteStep, step));
        html += `</div>`;
        return html;
    }

    stepSelector = (steps, step) => {
        let UUID = this.generateUUID(),
        searchablePiclistSettings = {
            valueList: this.templateNameList,
            changeHandler: this.partial(this.stepChangeHandler, steps, step, this),
            id: step.level + "-" + step.order + "-" + this.stepSelectorPicklistId + "-" + UUID,
            step: step,
            flowBuilderUI: this
        },
        searchablePicklist = new SearchablePicklist(searchablePiclistSettings);
        let html = `<div id="${step.level + "-" + step.order + "-" + this.stepSelectorId + "-" + UUID}" class="${this.stepSelectorClass}">
                        ${this.moveUpDownButtons(steps, step)}
                        <span>Step ${step.parentAddress + step.order}</span>
                        ${searchablePicklist.getHtml()}`;
        html += `</select></div>`;
        return html;
    }

    moveUpDownButtons = (steps, step) => {
        let moveUpButtonSelector = "#" + step.level + "-" + step.order + "-" + this.moveUpButtonId + ":not(.disabled)",
        moveDownButtonSelector =  "#" + step.level + "-" + step.order + "-" + this.moveDownButtonId + ":not(.disabled)";
        $(document).off("click", moveUpButtonSelector).on("click", moveUpButtonSelector, e => {
            this.moveStepUp(step, steps);
        });
        $(document).off("click", moveDownButtonSelector).on("click", moveDownButtonSelector, e => {
            this.moveStepDown(step, steps);
        });
        return `<div class="${this.moveUpDownButtonsDivClass}">
                    <i id="${step.level + "-" + step.order + "-" + this.moveUpButtonId}" class="${step.order === 1 ? "disabled": ""} ${this.moveUpDownButtonClass} fas fa-chevron-up"></i>
                    <i id="${step.level + "-" + step.order + "-" + this.moveDownButtonId}" class="${step.order === Object.keys(steps).length ? "disabled": ""} ${this.moveUpDownButtonClass} fas fa-chevron-down"></i>
                </div>`;
    }

    moveStepUp = (step, steps) => {
        let currentOrder = step.order,
        aboveStep = steps[currentOrder - 1];
        steps[currentOrder - 1] = step;
        step.order --;
        aboveStep.order ++;
        steps[currentOrder] = aboveStep;
        this.recalculateParentAddress(step);
        this.recalculateParentAddress(aboveStep);
        this.render(this.targetDivId);
    }

    moveStepDown = (step, steps) => {
        let currentOrder = step.order,
        belowStep = steps[currentOrder + 1];
        steps[currentOrder + 1] = step;
        step.order ++;
        belowStep.order --;
        steps[currentOrder] = belowStep;
        this.recalculateParentAddress(step);
        this.recalculateParentAddress(belowStep);
        this.render(this.targetDivId);
    }

    recalculateParentAddress = step => {
        if (typeof step.flow === "object") {
            for (let i in step.flow) {
                step.flow[i].parentAddress = step.parentAddress + step.order + ".";
                this.recalculateParentAddress(step.flow[i]);
            }
        }
    }
    

    stepChangeHandler = (steps, step, flowBuilderUI, e) => {
        steps[step.order] = flowBuilderUI.templates.list[$("#" + e.target.id).val()](step.parentAddress, step.level, step.order);
        flowBuilderUI.render(flowBuilderUI.targetDivId);
    }

    stepSelectorold = (steps, step) => {
        let UUID = this.generateUUID();
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.stepSelectorPicklistId + "-" + UUID).on("change", "#" + step.level + "-" + step.order + "-" + this.stepSelectorPicklistId + "-" + UUID, e => {
            steps[step.order] = this.templates.list[$("#" + e.target.id).val()](step.parentAddress, step.level, step.order);
            this.render(this.targetDivId);
        });
        let html = `<div id="${step.level + "-" + step.order + "-" + this.stepSelectorId + "-" + UUID}" class="${this.stepSelectorClass}">
        <span>Step ${step.parentAddress + step.order}</span>
        <select name="actions" id="${step.level + "-" + step.order + "-" + this.stepSelectorPicklistId + "-" + UUID}" class="">`;
        for (let i in this.templateNameList) {
            html += `<option value="${this.templateNameList[i]}" ${this.templateNameList[i] === step.name ? "selected" : ""}>${this.templateNameList[i]}</option>`;
        }
        html += `</select></div>`;
        return html;
    }

    partial(func /*, 0..n args */) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            var allArguments = args.concat(Array.prototype.slice.call(arguments));
            return func.apply(this, allArguments);
        };
    }

    render = targetDivId => {
        this.targetDivId = targetDivId;
        $("#" + targetDivId).html(this.getHtml());
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}