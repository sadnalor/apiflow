class FlowBuilderExecutor {
    constructor(userVariables, loader) {
        this.allowedApiMethods = ["get", "post", "put", "delete", "patch"];
        this.userVariables = userVariables;
        this.loader = loader;
    }

    syntaxCheck = (step, fullTreeSyntaxCheck)  => {
        step.passedSyntaxCheck = true;
        let form = step.form, formRow, error;
        if (step.type === "apiCall") {
            for (let i in form) {
                formRow = form[i];
                switch (formRow.validationType) {
                    case "varName":
                        formRow.error = this.varNameValidationError(formRow);
                        break;
                    case "text":
                        formRow.error = this.textValidationError(formRow);
                        //formRow.error = formRow.mandatory ? formRow.error : null;
                        break;
                    case "method":
                        formRow.error = this.methodValidationError(formRow);
                        break;
                    case "json":
                        formRow.error = this.jsonValidationError(formRow);
                        break;
                    case "booleanJs":
                        formRow.error = this.booleanJsValidationError(formRow);
                        break;
                }
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        } else if (step.type === "importFromExcel") {
            for (let i in form) {
                formRow = form[i];
                switch (formRow.validationType) {
                    case "varName":
                        formRow.error = this.varNameValidationError(formRow);
                        break;
                    case "text":
                        formRow.error = this.textValidationError(formRow);
                        break;
                }
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        } else if (step.type === "bulkExecute") {
            for (let i in form) {
                formRow = form[i];
                switch (formRow.validationType) {
                    case "varName":
                        formRow.error = this.varNameValidationError(formRow);
                        break;
                    case "integer":
                        formRow.error = this.integerValidationError(formRow);
                        break;
                    case "js":
                        formRow.error = this.jsValidationError(formRow);
                        break;
                    case "booleanJs":
                        formRow.error = this.booleanJsValidationError(formRow);
                        break;
                    case "iterableJs":
                        formRow.error = this.iterableJsValidationError(formRow);
                        this.assignFirstValueForTesting(step, formRow);
                        break;
                }
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        } else if (step.type === "userInputForm") {
            for (let i in form) {
                formRow = form[i];
                switch (formRow.validationType) {
                    case "text":
                        formRow.error = this.textValidationError(formRow);
                        formRow.error = formRow.mandatory ? formRow.error : null;
                        break;
                    case "userInputForm":
                        formRow.error = this.userInputFormValidationError(formRow);
                        break;
                }
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        } else if (step.type === "conditional" || step.type === "conditionalWhile") {
            for (let i in form) {
                formRow = form[i];
                formRow.error = this.booleanJsValidationError(formRow);
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else if (fullTreeSyntaxCheck) {
                error = this.flowSyntaxCheckError(step, fullTreeSyntaxCheck);
                formRow.error = error;
                return error;
            } else {
                return null;
            }
        } else if (step.type === "conditionalRunOn") {
            for (let i in form) {
                formRow = form[i];
                switch (formRow.validationType) {
                    case "booleanJs":
                        formRow.error = this.booleanJsValidationError(formRow);
                        break;
                    case "iterableJs":
                        formRow.error = this.iterableJsValidationError(formRow);
                        this.assignFirstValueForTesting(step, formRow);
                        break;
                    case "varName":
                        formRow.error = this.varNameValidationError(formRow);
                        break;
                }
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else if (fullTreeSyntaxCheck) {
                error = this.flowSyntaxCheckError(step, fullTreeSyntaxCheck);
                formRow.error = error;
                return error;
            } else {
                return null;
            }
        } else if (step.type === "app") {
            for (let i in form) {
                formRow = form[i];
                formRow.error = this.textValidationError(formRow);
                formRow.error = formRow.mandatory ? formRow.error : null;
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else if (fullTreeSyntaxCheck) {
                error = this.flowSyntaxCheckError(step, fullTreeSyntaxCheck);
                formRow.error = error;
                return error;
            } else {
                return null;
            }
        } else if (step.type === "setVariable") {
            for (let i in form) {
                formRow = form[i];
                switch (formRow.validationType) {
                    case "varName":
                        formRow.error = this.varNameValidationError(formRow);
                        break;
                    case "js":
                        formRow.error = this.jsValidationError(formRow);
                        break;
                }
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        } else if (step.type === "jsCode") {
            for (let i in form) {
                formRow = form[i];
                formRow.error = this.jsValidationErrorSpecial(formRow);
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        } else if (step.type === "html") {
            for (let i in form) {
                formRow = form[i];
                formRow.error = this.textValidationError(formRow);
                if (formRow.error != null) {
                    step.passedSyntaxCheck = false;
                }
            }
            if (!step.passedSyntaxCheck) {
                return "Step " + (step.parentAddress + step.order) + " failed validation check.";
            } else {
                return null;
            }
        }
    }

    assignFirstValueForTesting = (step, formRow) => {
        if (formRow.error === null && typeof this.userVariables[step.form.Variable.value] === "undefined") {
            if (Array.isArray(formRow.value)) {
                if (formRow.value.length > 0) {
                    this.userVariables[step.form.Variable.value + "_key"] = 0;
                    this.userVariables[step.form.Variable.value] = formRow.value[0];
                } else {
                    this.userVariables[step.form.Variable.value + "_key"] = null;
                    this.userVariables[step.form.Variable.value] = null;
                }
            } else if (typeof formRow.value === "object") {
                if (Object.keys(formRow.value).length > 0) {
                    this.userVariables[step.form.Variable.value + "_key"] = Object.keys(formRow.value)[0];
                    this.userVariables[step.form.Variable.value] = formRow.value[Object.keys(formRow.value)[0]];
                } else {
                    this.userVariables[step.form.Variable.value + "_key"] = null;
                    this.userVariables[step.form.Variable.value] = null;
                }
            }
        }
    }

    flowSyntaxCheckError = (step, fullTreeSyntaxCheck) => {
        step.passedSyntaxCheck = true;
        let flow = step.flow, subStep, errors = "";
        for (let i in flow) {
            subStep = flow[i];
            subStep.error = this.syntaxCheck(subStep, fullTreeSyntaxCheck);
            if (subStep.error != null) {
                errors += "Step " + (subStep.parentAddress + subStep.order) + " failed validation check.<br>";
                step.passedSyntaxCheck = false;
            }
        }
        if (!step.passedSyntaxCheck) {
            return errors;
        } else {
            return null;
        }
    }

    userInputFormValidationError = formRow => {
        let subformRow;
        for (let i in formRow.form) {
            subformRow = formRow.form[i];
            switch (subformRow.validationType) {
                case "varName":
                    subformRow.error = this.varNameValidationError(subformRow);
                    break;
                case "text":
                    subformRow.error = this.textValidationError(subformRow);
                    break;
                case "booleanJs":
                    subformRow.error = this.booleanJsValidationError(subformRow);
                    break;
                case "js":
                    subformRow.error = this.jsValidationError(subformRow);
                    break;
            }
            if (subformRow.error != null) {
                return subformRow.error;
            }
        }
        return null;
    }

    varNameValidationError = formRow => {
        if (formRow.stringValue.match("^[a-zA-Z0-9-_]+$")) {
            formRow.value = formRow.stringValue;
            return null;
        } else {
            return "Variable name should be an alphanumeric string (with the exception of underscore, which is also allowed).";
        }
    }

    integerValidationError = formRow => {
        formRow.error = this.jsValidationError(formRow);
        if (formRow.error === null) {
            if (typeof formRow.value === "number" && Number.isInteger(formRow.value)) {
                return null;
            } else {
                return "Value entered should evaluate to an integer.";
            }
        } else {
            return formRow.error;
        }
    }

    textValidationError = formRow => {
        let variableInsertionResults = this.insertVariableValuesInString(formRow.stringValue),
        result = variableInsertionResults.result,
        error = variableInsertionResults.error;
        error = formRow.mandatory && (formRow.stringValue === "" || formRow.stringValue === null) ? "This field is mandatory." : error;
        if (error === null) {
            formRow.value = result;
            return null;
        } else {
            return error;
        }
    }

    methodValidationError = formRow => {
        if (this.allowedApiMethods.includes(formRow.stringValue.toLowerCase())) {
            formRow.value = formRow.stringValue;
            return null;
        } else {
            return "Please enter one of the following methods: GET, POST, PUT, PATCH or DELETE.";
        }
    }

    
    jsonValidationError = formRow => {
        let variableInsertionResults = this.insertVariableValuesInString(formRow.stringValue),
        error = variableInsertionResults.error,
        result = variableInsertionResults.result;
        if (error === null) {
            try {
                result = JSON.parse(result);
                formRow.value = result;
                return null;
            } catch(err) {
                return "The value entered does not appear to be valid JSON. Full error: " + err;
            }  
        } else {
            return error;
        }
    }

    jsValidationError = formRow => {
        let variableInsertionResults = this.insertVariableNamesInString(formRow.stringValue.replace(/\&quot\;/g, '"')),
        error = variableInsertionResults.error,
        result = variableInsertionResults.result;
        if (error === null) {
            try {
                result = eval(result);
                formRow.value = result;
                return null;
            } catch(err) {
                return "The value entered does not appear to be valid JavaScript. Full error: " + err;
            }  
        } else {
            return error;
        }
    }

    jsValidationErrorSpecial = formRow => { //special case when eval should not return anything, like in pure JS
        let variableInsertionResults = this.insertVariableNamesInString(formRow.stringValue),
        error = variableInsertionResults.error,
        result = variableInsertionResults.result;
        if (error === null) {
            try {
                eval(result);
                return null;
            } catch(err) {
                return "The value entered does not appear to be valid JavaScript. Full error: " + err;
            }  
        } else {
            return error;
        }
    }

    booleanJsValidationError = formRow => {
        let error = this.jsValidationError(formRow);
        if (error === null) {
            if (typeof formRow.value === "boolean") {
                return null;
            } else {
                return "The expression entered is not a Boolean (TRUE or FALSE) value.";
            }
        } else {
            return error;
        }
    }

    iterableJsValidationError = formRow => {
        
        let error = this.jsValidationError(formRow);
        if (error === null) {
            if (typeof formRow.value === "object" && formRow.value !== null || Array.isArray(formRow.value)) {
                return null;
            } else {
                return "The expression entered is not an iterable (array or object) value.";
            }
        } else {
            return error;
        }
    }

    insertVariableNamesInString = string => {
        let varBeginning,
        varEnding,
        varName,
        whatToReplace,
        variableValue,
        incorrectVariable = null,
        variableEvaluationResults,
        variableError = null;
        while (string.includes("{{") && string.includes("}}")) {
            varBeginning = string.search("{{");
            varEnding = string.search("}}");
            varName = string.substring(varBeginning + 2, varEnding);
            whatToReplace = string.slice(varBeginning, varEnding + 2);
            try {
                variableEvaluationResults = this.dynamicVariableEval(varName);
                variableValue = variableEvaluationResults.success ? variableEvaluationResults.result : new Error();
                variableError = variableEvaluationResults.error;
                if ((variableValue instanceof Error) || typeof variableValue === "undefined") {
                    variableError = (typeof variableValue === "undefined") ? 'Variable "' + varName + '" is undefined.' : variableEvaluationResults.error;
                    incorrectVariable = varName;
                    break;
                } else {
                    string = string.replace(whatToReplace, "this.userVariables." + varName);
                }
            } catch(err) {
                incorrectVariable = varName;
                variableError = err;
                break;
            }
        }
        return {result: string, incorrectVariable: incorrectVariable, error: variableError};
    }

    insertVariableValuesInString = string => {
        let varBeginning,
        varEnding,
        varName,
        whatToReplace,
        variableValue,
        incorrectVariable = null,
        variableEvaluationResults,
        variableError = null,
        varStartUUID = this.generateUUID(),
        varEndUUID = this.generateUUID();
        string = string.replace(/\{\{/g, varStartUUID);
        string = string.replace(/\}\}/g, varEndUUID);
        while (string.includes(varStartUUID) && string.includes(varEndUUID)) {
            varBeginning = string.search(varStartUUID);
            varEnding = string.search(varEndUUID);
            varName = string.substring(varBeginning + varStartUUID.length, varEnding);
            whatToReplace = string.slice(varBeginning, varEnding + varEndUUID.length);
            variableEvaluationResults = this.dynamicVariableEval(varName);
            variableValue = variableEvaluationResults.success ? variableEvaluationResults.result : new Error();
            variableError = variableEvaluationResults.error;
            if ((variableValue instanceof Error) || typeof variableValue === "undefined") {
                variableError = (typeof variableValue === "undefined") ? 'Variable "' + varName + '" is undefined.' : variableEvaluationResults.error;
                incorrectVariable = varName;
                break;
            } else {
                string = string.replace(whatToReplace, variableEvaluationResults.result);
            }
        }
        return {result: string, incorrectVariable: incorrectVariable, error: variableError};
    }

    insertVariableValuesInStringStable = string => {
        let varBeginning,
        varEnding,
        varName,
        whatToReplace,
        variableValue,
        incorrectVariable = null,
        variableEvaluationResults,
        variableError = null;
        while (string.includes("{{") && string.includes("}}")) {
            varBeginning = string.search("{{");
            varEnding = string.search("}}");
            varName = string.substring(varBeginning + 2, varEnding);
            whatToReplace = string.slice(varBeginning, varEnding + 2);
            variableEvaluationResults = this.dynamicVariableEval(varName);
            variableValue = variableEvaluationResults.success ? variableEvaluationResults.result : new Error();
            variableError = variableEvaluationResults.error;
            if ((variableValue instanceof Error) || typeof variableValue === "undefined") {
                variableError = (typeof variableValue === "undefined") ? 'Variable "' + varName + '" is undefined.' : variableEvaluationResults.error;
                incorrectVariable = varName;
                break;
            } else {
                string = string.replace(whatToReplace, variableEvaluationResults.result);
            }
        }
        return {result: string, incorrectVariable: incorrectVariable, error: variableError};
    }

    dynamicVariableEval = dynamicVariableString => {
        let error = null, 
        result = null, 
        illegalChars = ["\\", "~", "@", "#", "$", "(", ")", "+", "=", "-", ";", ":", "'", '"', "`", ",", "[", "]", "{", "}", "?", "/", "<", ">", "|", "!", "&", "%", "^", "*"];
        for (let i in illegalChars) {
            if (dynamicVariableString.includes(illegalChars[i])) {error = `The following characters are not allowed in variable names: \\, ~, @, #, $, (, ), _, +, =, -, ;, :, ', ", \`, [, ], {, }, ?, /, <, >, |, !, &, %, ^, * and ,`; break;};
        }
        if (error != null) {
            return {success: false, error: error};
        } else {
            try {
                result = eval("this.userVariables." + dynamicVariableString);
                return {success: true, error: error, result: result};
            } catch(err) {
                return {success: false, error: err};
            }
        }
    }

    run = async (step, errors, responses, e) => {
        let response;
        this.syntaxCheck(step, false);
        if (!step.passedSyntaxCheck) {
            errors[step.parentAddress + step.order] = this.stepErrors(step);
            return {success: false, errors: errors, responses: responses};
        } else {
            if (step.type === "apiCall") {
                try {
                    this.userVariables[step.form.Variable.value] = await this.runApiCallStep(step);
                    step.form.Variable.locked = true;
                    responses[step.parentAddress + step.order] = this.userVariables[step.form.Variable.value];
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    this.userVariables[step.form.Variable.value] = err;
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
            } else if (step.type === "conditional") {
                let evaluationCriteria = false;
                for (let i in step.form) {
                    evaluationCriteria = step.form[i].value;
                }
                if (evaluationCriteria) {
                    for (let j in step.flow) {
                        response = await this.run(step.flow[j], errors, responses, e);
                        if (!response.success) {
                            return {success: false, errors: errors, responses: responses};
                        }
                    }
                    return {success: true, errors: errors, responses: responses};
                } else {
                    return {success: true, errors: errors, responses: responses};
                }
            } else if (step.type === "conditionalWhile") {
                let evaluationCriteria = false, iterations = 0;
                for (let i in step.form) {
                    evaluationCriteria = step.form[i].value;
                }
                while (evaluationCriteria && iterations < 1000000) {
                    iterations++;
                    for (let j in step.flow) {
                        response = await this.run(step.flow[j], errors, responses, e);
                        if (!response.success) {
                            return {success: false, errors: errors, responses: responses};
                        }
                    }
                    this.syntaxCheck(step, false);
                    for (let i in step.form) {
                        evaluationCriteria = step.form[i].value;
                    }
                }
                return {success: true, errors: errors, responses: responses};
            } else if (step.type === "conditionalRunOn") {
                let evaluationCriteria = step.form.Filter.value,
                iterable = step.form["Run On"].value;
                for (let i in iterable) {
                    this.userVariables[step.form.Variable.value] = iterable[i];
                    this.userVariables[step.form.Variable.value + "_key"] = i;
                    this.syntaxCheck(step, false);
                    evaluationCriteria = step.form.Filter.value; 
                    if (evaluationCriteria) {
                        for (let j in step.flow) {
                            response = await this.run(step.flow[j], errors, responses, e);
                            if (!response.success) {
                                return {success: false, errors: errors, responses: responses};
                            }
                        }
                    }
                }
                return {success: true, errors: errors, responses: responses};
            } else if (step.type === "app") {
                for (let j in step.flow) {
                    response = await this.run(step.flow[j], errors, responses, e);
                    if (!response.success) {
                        return {success: false, errors: errors, responses: responses};
                    }
                }
                return {success: true, errors: errors, responses: responses};
            } else if (step.type === "setVariable") {
                try {
                    eval(`this.userVariables[step.form.Name.value] = step.form.Value.value`);
                    responses[step.parentAddress + step.order] = `Variable ${step.form.Name.value} was set to ${step.form.Value.value}`;
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
            } else if (step.type === "jsCode") {
                try {
                    eval(step.form.JavaScript.value);
                    responses[step.parentAddress + step.order] = "JavaScript executed successfully.";
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
             } else if (step.type === "html") {
                try {
                    this.loader.hide();
                    await this.htmlOutput(step, e);
                    this.loader.show();
                    responses[step.parentAddress + step.order] = "HTML output shown successfully.";
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
            } else if (step.type === "userInputForm") {
                try {
                    this.loader.hide();
                    await this.userInputForm(step, e);
                    this.loader.show();
                    responses[step.parentAddress + step.order] = "Form shown successfully.";
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
            } else if (step.type === "bulkExecute") {
                //console.log(step);
                try {
                    this.userVariables[step.form["Output Variable"].value] = await this.bulkExecute(step);
                    step.form["Output Variable"].locked = true;
                    responses[step.parentAddress + step.order] = this.userVariables[step.form["Output Variable"].value];
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    this.userVariables[step.form["Output Variable"].value] = err;
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
            } else if (step.type === "importFromExcel") {
                try {
                    this.loader.hide();
                    await this.importFromExcel(step, e);
                    this.loader.show();
                    responses[step.parentAddress + step.order] = "File imported successfully.";
                    return {success: true, errors: errors, responses: responses};
                } catch(err) {
                    errors[step.parentAddress + step.order] = err;
                    return {success: false, errors: errors, responses: responses};
                }
            }
        }
    }

    importFromExcel = (step, e) => {
        let self = this;
        return new Promise(success => {
            let popupOptions = {
                title: "Please select an Excel file",
                content: `<div style="padding:5px;">${step.form.Instructions.value} <br><br><input type="file" id="fileUploader" name="fileUploader" accept=".xls, .xlsx"/></div>`,
                buttons: {},
                expandStepDuration: 200,
                collapseStepDuration: 200,
                collapseCallback: success,
                keyEvents: { //optional
                    13: {
                        handler: null
                    },
                    27: {
                        handler: null
                    }
                },
                dim: true
            },
            popup;
            popup = new Popup(popupOptions);
            $("body").append(`<div id="excel-input" style="padding:5px;position:fixed;${step.form["Form Size and Position"].value};z-index:9100;"></div>`);
            popup.render("excel-input");
            popup.expand(e);
            $("#fileUploader").change(function(evt){
                var selectedFile = evt.target.files[0];
                var reader = new FileReader();
                reader.onload = function(event) {
                  var data = event.target.result;
                  var workbook = XLSX.read(data, {
                      type: 'binary'
                  });
                  workbook.SheetNames.forEach(function(sheetName) {
                      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                      var json_object = JSON.stringify(XL_row_object);
                      //document.getElementById("jsonObject").innerHTML = json_object;
                        console.log(JSON.parse(json_object));
                        self.userVariables[step.form.Variable.value] = JSON.parse(json_object);
                        popup.collapse();
                    })
                };

                reader.onerror = function(event) {
                  console.error("File could not be read! Code " + event.target.error.code);
                };

                reader.readAsBinaryString(selectedFile);
          });
        });
    }

    bulkExecute = async step => {
        console.log(step);
        let fullRequestArray = this.allBulkExecuteRequests(step);
        console.log(fullRequestArray);
        let batchedRequests = this.batchedRequests(fullRequestArray, step.form["Batch Size"].value);
        console.log(batchedRequests);
        let responses = await this.bulkExecuteInbatches(batchedRequests, step.form["Pause Between Batches"].value);
        console.log(responses);
        return responses;
    }

    bulkExecuteInbatches = async (requests, pauseBetweenbatches) => {
        let apiCallSettings,
        responses = [],
        response;
        for (let i in requests) {
            apiCallSettings = {
                endpoint: this.userVariables.context.server.endpointUrlPrefix + "/bulk/execute",
                method: "POST",
                headers: {
                    "Authorization": "Session " + this.userVariables.context.server.sessionId
                },
                payload: JSON.stringify(requests[i])
            }
            response = await this.request(apiCallSettings);
            responses.push(response);
            await this.pause(pauseBetweenbatches);
            console.log("after pause");
        }
        return responses;
    }

    pause = duration => {
        return new Promise(success => {
            console.log("pausing");
            setTimeout(() => {
                success();
            }, duration);
        });
    }

    batchedRequests = (fullRequestArray, batchSize) => {
        let batchedRequests = [],
        batch = {"requests": []},
        counter = 0;
        for (let i in fullRequestArray) {
            if (counter < batchSize) {
                batch.requests.push(fullRequestArray[i]);
                counter ++;
            } else {
                batchedRequests.push(batch);
                batch = {"requests": []};
                batch.requests.push(fullRequestArray[i]);
                counter = 1;
            }
        }
        batchedRequests.push(batch);
        return batchedRequests;
    }

    allBulkExecuteRequests = step => {
        let iterable = step.form.Source.value,
        evaluationCriteria = step.form.Filter.value,
        payloadMap = step.form["Payload Map"].value,
        requests = [];
        for (let i in iterable) {
            this.userVariables[step.form.Variable.value] = iterable[i];
            this.userVariables[step.form.Variable.value + "_key"] = i;
            this.syntaxCheck(step, false);
            evaluationCriteria = step.form.Filter.value;
            payloadMap = step.form["Payload Map"].value;
            if (evaluationCriteria) {
                requests.push(payloadMap);
            }
        }
        return requests;
    }

    htmlOutput = (step, e) => {
        return new Promise(success => {
            let popupOptions = {
                title: "Results",
                content: `<div style="padding:5px;">${step.form["Output"].value}</div>`,
                buttons: {
                    OK: {
                        handler: null
                    }        
                },
                expandStepDuration: 400,
                collapseStepDuration: 400,
                collapseCallback: success,
                keyEvents: { //optional
                    13: {
                        handler: null
                    },
                    27: {
                        handler: null
                    }
                },
                dim: true
            },
            popup,
            formSizeAndPosition = step.form["Form Size and Position"].value;
            popup = new Popup(popupOptions);
            popup.keyEvents[13].handler = popup.collapse;
            popup.keyEvents[27].handler = popup.collapse;
            popup.buttons.OK.handler = popup.collapse;
            $("body").append(`<div id="html-output" style="padding:5px;position:fixed;${formSizeAndPosition};z-index:9100;"></div>`);
            popup.render("html-output");
            popup.expand(e);
        });
    }

    userInputForm = (step, e) => {
        let formJson = this.userInputFormContentJson(step.form["Form"].form),
        popupContent = new JsonToForm("user-input-form", formJson).getHtml();
        return new Promise(success => {
            let popupOptions = {
                title: step.form["Form Title"].value,
                content: `<div style="padding:5px;">${popupContent}</div>`,
                buttons: {
                    Cancel: {
                        handler: null
                    },
                    Submit: {
                        handler: null
                    }   
                },
                expandStepDuration: 400,
                collapseStepDuration: 400,
                collapseCallback: success,
                keyEvents: { //optional
                    13: {
                        handler: null
                    },
                    27: {
                        handler: null
                    }
                },
                dim: true
            },
            popup,
            formSizeAndPosition = step.form["Form Size and Position"].value;
            popup = new Popup(popupOptions);
            popup.keyEvents[13].handler = this.partial(this.formSubmitHandler, formJson, popup, step);
            popup.keyEvents[27].handler = this.partial(this.formCancelHandler, popup, step);
            popup.buttons.Submit.handler =  this.partial(this.formSubmitHandler, formJson, popup, step);
            popup.buttons.Cancel.handler = this.partial(this.formCancelHandler, popup, step);
            $("body").append(`<div id="user-input-form" style="padding:5px;position:fixed;${formSizeAndPosition}z-index:9100;"></div>`);
            popup.render("user-input-form");
            popup.expand(e);
        });
    }

    formSubmitHandler = (form, popup, step) => {
        let mandatoryFieldMissing = false;
        for (let i in form) {
            if (typeof form[i].varName !== "undefined") {
                this.userVariables[form[i].varName] = form[i].stringValue;
            }
            if (form[i].mandatory && form[i].stringValue === "") {
                mandatoryFieldMissing = true;
            }
        }
        this.userVariables["form" + step.parentAddress.replace(/\./g, "_") + step.order + "Submitted"] = true;
        if (!mandatoryFieldMissing) {
            popup.collapse();
        }
    }

    formCancelHandler = (popup, step) => {
        this.userVariables["form" + step.parentAddress.replace(/\./g, "_") + step.order + "Submitted"] = false;
        popup.collapse();
    }

    userInputFormContentJson = formData => {
        let formJson = {},
        valuesFound = true,
        variableNumber = 1,
        label, 
        defaultValue,
        mandatory,
        varName,
        description;
        while (valuesFound) {
            try {
                varName = formData["Variable " + variableNumber + " Name"].value;
                defaultValue = formData["Variable " + variableNumber + " Default"].value;
                mandatory = formData["Variable " + variableNumber + " Mandatory"].value;
                label = formData["Variable " + variableNumber + " Label"].value;
                description = formData["Variable " + variableNumber + " Description"].value;
                formJson[label + variableNumber + "description"] = {
                    error: null,
                    locked: false,
                    mandatory: false,
                    placeholder: "",
                    stringValue: description,
                    value: description,
                    style: "padding-left:0px",
                    tooltip: "",
                    type: "text",
                    validationType: null
                };
                formJson[label] = {
                    error: typeof defaultValue === "undefined" && mandatory ? "This field is mandatory." : null,
                    locked: false,
                    mandatory: mandatory,
                    placeholder: "Enter requested value here...",
                    stringValue: typeof defaultValue === "undefined" ? "" : defaultValue,
                    value: null,
                    style: "padding-left:0px",
                    tooltip: null,
                    type: "textInput",
                    validationType: "text",
                    varName: varName
                };
            } catch {
                valuesFound = false;
            }
            variableNumber++;
        }
        return formJson
    }



    runApiCallStep = step => {
        let payload = typeof step.form.Payload.value === "string" ? step.form.Payload.value : JSON.stringify(step.form.Payload.value);
        let apiCallSettings = {
            endpoint: step.form.Endpoint.value,
            method: step.form.Method.value,
            headers: step.form.Headers.value,
            payload: payload
        }
        return this.request(apiCallSettings);
    }

    stepErrors = step => {
        let errors = {};
        for (let i in step.form) {
            if (step.form[i].error != null) {
                errors[i] = step.form[i].error;
            }
        }
        return errors;
    }

    partial(func /*, 0..n args */) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            var allArguments = args.concat(Array.prototype.slice.call(arguments));
            return func.apply(this, allArguments);
        };
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
                        try{
                            xhr.status === 200 || xhr.status === 201 ? success(JSON.parse(xhr.responseText)) : fail({success: false, requestSettings: settings, response: {status: xhr.status, text: xhr.statusText, response: xhr.responseText}});
                        } catch {
                            xhr.status === 200 || xhr.status === 201 ? success(xhr.responseText) : fail({success: false, requestSettings: settings, response: {status: xhr.status, text: xhr.statusText, response: xhr.responseText}});
                        }
                    }
                };
            } catch(err) {
                fail({success: false, requestSettings: settings, response: err});
            }
        });
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}