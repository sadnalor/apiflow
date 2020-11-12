class FlowExecutor {
    constructor(settings, userVariables) {
        this.settings = settings;
        this.whileLimit = 1;
        this.userVariables = userVariables;
        this.loader = new LoadingIndicator();
    }

    testExecute = async (settings, cumulativeResults) => {
        let step, response;
        if (Object.keys(settings.flow).length > 0) {
            for (let i in settings.flow) {
                step = settings.flow[i];
                if (step.type === "apiCall") {
                    response = await this.apiCall(step);
                    cumulativeResults.lastResponse = response;
                    if (response.success === false) {
                        cumulativeResults.responses[step.parentAddress + step.order] = response;
                        cumulativeResults.failedStep = {};
                        cumulativeResults.failedStep[step.parentAddress + step.order] = response;
                        break;
                    } else {
                        cumulativeResults.responses[step.parentAddress + step.order] = response;
                    }
                }
                if (step.type === "conditional" && step.conditionEvaluatesTo === true) {
                    cumulativeResults = await this.testExecute(step, cumulativeResults);
                } else if (step.type === "whileLoop" && step.conditionEvaluatesTo === true) {
                    let iteration = 1;
                    while (step.conditionEvaluatesTo === true && iteration <= this.whileLimit) {
                        iteration++;
                        cumulativeResults = await this.testExecute(step, cumulativeResults);
                    }
                }
            }
            return cumulativeResults;
        } else {
            cumulativeResults.lastResponse = {success: true};
            cumulativeResults.responses = {"N/A": {}};
            return cumulativeResults;
        }
    }

    apiCall = async step => {
        let requestSettings = {
            endpoint: step.endpoint.replace(/\&quot\;/g, '"'),
            method: step.method,
            headers: step.headers,
            payload: JSON.stringify(step.payload)
        },
        response;
        try {
            response = await this.request(requestSettings);
            if (response.success === false) {
                return response;
            } else {
                this.userVariables[step.responseVarName] = response;
                return response;
            }
        } catch(err) {
            return new Promise(fail => {fail(err)});
        }
    }

    request = settings => {
        return new Promise ((success, fail) => {
            let xhr = new XMLHttpRequest();
            xhr.open(settings.method, settings.endpoint, true);
            if (settings.headers) {
                for (let i in settings.headers) {
                    xhr.setRequestHeader(i, settings.headers[i]);
                }
            }
            try {
                settings.payload ? xhr.send(settings.payload) : xhr.send();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        xhr.status === 200 || xhr.status === 201 ? success(JSON.parse(xhr.responseText)) : fail({success: false, requestSettings: settings, response: {status: xhr.status, text: xhr.statusText}});
                    }
                };
            } catch(err) {
                fail({success: false, requestSettings: settings, response: err});
            }
        });
    }
}


class FlowBuilder {






    


    conditionalActionListInput = (label, tooltip, step) => {
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.conditionalActionListConditonInputId).on("change", "#" + step.level + "-" + step.order + "-" + this.conditionalActionListConditonInputId, e => {
            step.conditionString = $("#" + e.target.id).val();
        });
        return `<div class="${this.labelClass}">${step.conditionError != null ? this.syntaxError(step.conditionError) : this.syntaxCheckPassedIndicator()} ${label} ${this.questionMark(tooltip)}</div>
        <div><textarea id="${step.level + "-" + step.order + "-" + this.conditionalActionListConditonInputId}" class="${this.conditionalActionListConditonInputClass} ${this.classUniqueString}" placeholder="Enter the condition here...">${step.conditionString}</textarea></div>`;
    }


    varNameInput = (label, tooltip, step) => {
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.variableNameInputId).on("change", "#" + step.level + "-" + step.order + "-" + this.variableNameInputId, e => {
            step.responseVarName = $("#" + e.target.id).val();
        });
        return `<div class="${this.labelClass}">${step.responseVariableNameError != null ? this.syntaxError(step.responseVariableNameError) : this.syntaxCheckPassedIndicator()} ${label} ${this.questionMark(tooltip)} </div>
        <div><input id="${step.level + "-" + step.order + "-" + this.variableNameInputId}" class="${this.variableNameInputClass} ${this.classUniqueString}" type="text" value="${step.responseVarName}" placeholder="Enter the variable name here..."></input></div>`;
    }

    endpointInput = (label, tooltip, step) => {
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.endpointInputId).on("change", "#" + step.level + "-" + step.order + "-" + this.endpointInputId, e => {
            step.endpoint = $("#" + e.target.id).val().replace(/\"/g, "&quot;");
        });
        return `<div class="${this.labelClass}">${step.endpointError != null ? this.syntaxError(step.endpointError) : this.syntaxCheckPassedIndicator()} ${label} ${this.questionMark(tooltip)} </div>
        <div><input id="${step.level + "-" + step.order + "-" + this.endpointInputId}" class="${this.endpointInputClass} ${this.classUniqueString}" type="text" value="${step.endpoint}" placeholder="Enter the URL here..."></input></div>`;
    }

    methodInput = (label, tooltip, step) => {
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.methodInputId).on("change", "#" + step.level + "-" + step.order + "-" + this.methodInputId, e => {
            step.method = $("#" + e.target.id).val();
        });
        return `<div class="${this.labelClass}">${step.methodError != null ? this.syntaxError(step.methodError) : this.syntaxCheckPassedIndicator()} ${label} ${this.questionMark(tooltip)} </div>
        <div><input id="${step.level + "-" + step.order + "-" + this.methodInputId}" class="${this.methodInputClass} ${this.classUniqueString}" type="text" value="${step.method}" placeholder="Enter the method here..."></input></div>`;        
    }

    headersInput = (label, tooltip, step) => {
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.headerInputId).on("change", "#" + step.level + "-" + step.order + "-" + this.headerInputId, e => {
            step.headersString = $("#" + e.target.id).val();
        });
        return `<div class="${this.labelClass}">${step.headersError != null ? this.syntaxError(step.headersError) : this.syntaxCheckPassedIndicator()} ${label} ${this.questionMark(tooltip)}</div>
        <div><textarea id="${step.level + "-" + step.order + "-" + this.headerInputId}" class="${this.headerInputClass} ${this.classUniqueString}" placeholder="Enter the headers JSON here...">${step.headersString}</textarea></div>`;
    }

    payloadInput = (label, tooltip, step) => {
        $(document).off("change", "#" + step.level + "-" + step.order + "-" + this.payloadInputId).on("change", "#" + step.level + "-" + step.order + "-" + this.payloadInputId, e => {
            step.payloadString = $("#" + e.target.id).val();
        });
        return `<div class="${this.labelClass}">${step.payloadError != null ? this.syntaxError(step.payloadError) : this.syntaxCheckPassedIndicator()} ${label} ${this.questionMark(tooltip)} </div>
        <div><textarea id="${step.level + "-" + step.order + "-" + this.payloadInputId}" class="${this.payloadInputClass} ${this.classUniqueString}" placeholder="Enter the payload JSON here...">${step.payloadString}</textarea></div>`;
    }








    


    testApiCall = async (step, e) => {
        if (this.apiCallSyntaxCheck(step)) {
            this.loader.show();
            let requestSettings = {
                endpoint: step.endpoint.replace(/\&quot\;/g, '"'),
                method: step.method,
                headers: step.headers,
                payload: JSON.stringify(step.payload)
            },
            response;
            try {
                response = await this.request(requestSettings);
                this.apiTestPopup(e, "API call succeeded. Response below.", `<textarea style="width:100%;height:100%;resize:none;">` + JSON.stringify(response, null, 2) + `</textarea>`);
                this.userVariables[step.responseVarName] = response;
            } catch(err) {
                this.apiTestPopup(e, "API call failed. Reason below.", `<textarea style="width:100%;height:100%;resize:none;">` + JSON.stringify(err, null, 2) + `</textarea>`);
                this.userVariables[step.responseVarName] = response;
            }
            this.loader.hide();
        } 
    }


    conditionalActionListButtonsDiv = (step) => {
        let html = `<div id="${step.id + "-" + this.buttonsDivId}" class="${this.buttonsDivClass}">`;
        html += this.buttonDiv("check-syntax", "Check Syntax", step, this.partial(this.flowSyntaxCheck, step));
        html += this.buttonDiv("delete-step", "Delete", step, this.partial(this.deleteStep, step));
        html += `</div>`;
        return html;
    }

    whileLoopButtonsDiv = (step) => {
        let html = `<div id="${step.id + "-" + this.buttonsDivId}" class="${this.buttonsDivClass}">`;
        html += this.buttonDiv("check-syntax", "Check Syntax", step, this.partial(this.flowSyntaxCheck, step));
        html += this.buttonDiv("test-while-loop", "Test Loop", step, this.partial(this.testAll, step));
        html += this.buttonDiv("delete-step", "Delete", step, this.partial(this.deleteStep, step));
        html += `</div>`;
        return html;
    }

    getParentById = id => {
        return null;
    }

    render = targetDivId => {
        this.targetDivId = targetDivId;
        $("#" + targetDivId).html(this.getHtml());
    }

    partial(func /*, 0..n args */) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            var allArguments = args.concat(Array.prototype.slice.call(arguments));
            return func.apply(this, allArguments);
        };
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

//call, hook, pure JS, if/else if/else, while, for, map
}