class Table {
    constructor(options) {
        this.classUniqueString = "ahts56h46dfg5152g4awfa6sd4f6sa5df4";
        this.uuid = this.generateUUID();
        this.clarizenQuery = options.clarizenQuery;
        this.entityArray = [];
        this.entityDescriptions = null;
        this.data = options.data;
        this.filters = [];
        this.filteredData = this.data;
        this.sessionId = options.sessionId;
        this.username = options.username;
        this.password = options.password;
        this.columnOptions = options.columnOptions;
        this.targetDivId = options.targetDivId;
        this.serverLocation = null;
        this.ready = false;
        if (this.clarizenQuery != null && typeof this.clarizenQuery != "undefined") {
            this.ready = this.getData();
            //use this.filteredData to generate the table
        } else if (Array.isArray(this.filteredData)) {
            //use this.filteredData to generate the table
        } else {
            console.log("Please provide query or data to the table");
        }
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    request = settings => {
        return new Promise (function(success, fail) {
            let xhr = new XMLHttpRequest();
            xhr.open(settings.method, settings.endpoint, true);
            if (settings.headers) {
                for (let i in settings.headers) {
                    xhr.setRequestHeader(i, settings.headers[i]);
                }
            }
            try {
                if (settings.payload) {
                    xhr.send(settings.payload);
                } else {
                    xhr.send();
                }
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 || xhr.status === 201) {
                            let response = JSON.parse(xhr.responseText);
                            response['payload'] = settings.payload;
                            success(response);
                        } else {
                            fail({"status": xhr.status, "text": xhr.statusText});
                        }
                    }
                };
            } catch {
                fail();
            }
        });
    }

    recursiveRequest = async (settings, allResults) => {
        let payload = JSON.stringify({
            q: settings.query + " LIMIT 1000 OFFSET " + settings.offset
        });
        settings.payload = payload;
        let results;
        try {
            results = await this.request(settings);
        } catch {
            console.log("The values entered resulted in an incorrect query: " + settings.query + ". Please correct them and try again.");
        }
        if (results) {
            allResults = allResults.concat(results.entities);
            if (results.paging.hasMore) {
                settings.offset = results.paging.from;
                return await this.recursiveRequest(settings, allResults);
            } else {
                return new Promise(success => success(allResults));
            }
        } else {
            console.log("No results returned by the query entered.");
        }
    }

    getServerLocation = async () => {
        if (this.username != null && typeof this.username != "undefined" && this.password != null && typeof this.password != "undefined") {
            let settings = {
                endpoint: "https://api2.clarizen.com/V2.0/services/authentication/getServerDefinition",
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                payload: JSON.stringify(
                    {
                        username: this.username,
                        password: this.password
                    }
                )
            };
            try {
                this.serverLocation = (await this.request(settings)).serverLocation;
            } catch (err) {
                console.log("Getting server location failed. Reason: " + JSON.stringify(err));
            }
            return this.serverLocation;
        } else {
            console.log("Session ID has not been provided. Please provide session ID or a username and a password.");
        }
    }

    login = async () => {
        if ((this.sessionId === null || typeof this.sessionId === "undefined") && this.serverLocation != null) {
            let settings = {
                endpoint: this.serverLocation + "/authentication/Login",
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                payload: JSON.stringify(
                    {
                        username: this.username,
                        password: this.password
                    }
                )
            };
            try {
                this.sessionId = (await this.request(settings)).sessionId;
            } catch (err) {
                console.log("Login failed. Reason: " + JSON.stringify(err));
            }
            return this.sessionId;
        } else if ((this.sessionId === null || typeof this.sessionId === "undefined") && this.serverLocation === null) {
            console.log("Session ID and server location are missing.");
        }
    }

    getEntityDescriptions = async () => {
        let settings = {
            endpoint: this.serverLocation + "/metadata/describeEntities?typeNames=" + JSON.stringify(this.entityArray),
            method: "GET",
            headers: {
                "Authorization": "Session " + this.sessionId
            }
        };
        try {
            this.entityDescriptions = (await this.request(settings)).entityDescriptions;
            return this.entityDescriptions;
        } catch (err) {
            console.log("Getting entity description failed. Reason: " + JSON.stringify(err));
        }
    }

    getEntityMetadata = async () => {
        let entitiesToDescribe = [];
        for (let i in this.columnOptions) {
            if (typeof this.columnOptions[i].referencedEntities != "undefined" && Array.isArray(this.columnOptions[i].referencedEntities) && typeof this.columnOptions[i].referencedEntities[0] != "undefined" && !entitiesToDescribe.includes(this.columnOptions[i].referencedEntities[0])) {
                entitiesToDescribe.push(this.columnOptions[i].referencedEntities[0]);
            }
        }
        let settings = {
            endpoint: this.serverLocation + "/metadata/describeMetadata?typeNames=" + JSON.stringify(entitiesToDescribe),
            method: "GET",
            headers: {
                "Authorization": "Session " + this.sessionId
            }
        };
        try {
            this.entityMetadata = (await this.request(settings)).entityDescriptions;
            return this.entityMetadata;
        } catch (err) {
            console.log("Getting entity metadata failed. Reason: " + JSON.stringify(err));
        }
    }

    updateObject = async (object, field, value) => {
        let settings = {
            endpoint: this.serverLocation + "/data/objects",
            method: "POST",
            headers: {
                "Authorization": "Session " + this.sessionId,
                "Content-Type": "text/plain"
            },
            payload: {}
        };
        settings.payload.id = object;
        settings.payload[field] = value;
        settings.payload = JSON.stringify(settings.payload);
        try {
            let response = await this.request(settings);
            return response;
        } catch (err) {
            console.log("Failed to update the object. Reason: " + JSON.stringify(err));
        }
    }

    getData = async () => {
        await this.getServerLocation();
        await this.login();
        let settings = {
            endpoint: this.serverLocation + "/data/Query",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Session " + this.sessionId 
            },
            query: this.clarizenQuery,
            offset: 0
        }
        
        for (let i in this.columnOptions) {
            if (!this.entityArray.includes(this.columnOptions[i].entity)) {
                this.entityArray.push(this.columnOptions[i].entity);
            }
        }
        await this.getEntityDescriptions();
        this.resolveEntityDescriptions();
        await this.getEntityMetadata();
        this.resolveEntityMetadata();
        this.data = await this.recursiveRequest(settings, []);
        this.filteredData = this.data;
        //$("#" + this.targetDivId).html(this.tableHtml());
        this.calculateScrollableWidth();
        this.rowEvents();
        console.log(this.columnOptions);
        return this.filteredData;
    }

    rowEvents = () => {
        $("tr.row_" + this.classUniqueString).hover(e => {
            let id = e.currentTarget.id,
            rowNumber = $("#" + id).attr("row-number");
            $("tr.row_" + this.classUniqueString + "[row-number='" + rowNumber + "']").css("background-color", "#EAF2F8");
        }, e => {
            let id = e.currentTarget.id,
            rowNumber = $("#" + id).attr("row-number");
            $("tr.row_" + this.classUniqueString + "[row-number='" + rowNumber + "']").css("background-color","white");
        });
    }

    resolveEntityDescriptions = () => {
        for (let j in this.columnOptions) {
            for (let k in this.entityDescriptions) {
                if (this.columnOptions[j].entity.toLowerCase() === this.entityDescriptions[k].typeName.toLowerCase()) {
                    this.columnOptions[j].validStates = this.entityDescriptions[k].validStates;
                    this.columnOptions[j].entityLabel = this.entityDescriptions[k].label;
                    this.columnOptions[j].entityLabelPlural = this.entityDescriptions[k].labelPlural;
                    for (let l in this.entityDescriptions[k].fields) {
                        if (this.entityDescriptions[k].fields[l].name.toLowerCase() === this.columnOptions[j].key.toLowerCase()) {
                            this.columnOptions[j].fieldType = this.entityDescriptions[k].fields[l].presentationType;
                            if (typeof this.columnOptions[j].editable === "undefined" || this.columnOptions[j].editable === null) {
                                this.columnOptions[j].editable = this.entityDescriptions[k].fields[l].updateable;
                            }
                            if (typeof this.columnOptions[j].label === "undefined" || this.columnOptions[j].label === null) {
                                this.columnOptions[j].label = this.entityDescriptions[k].fields[l].label;
                            }
                            if (typeof this.entityDescriptions[k].fields[l].referencedEntities != "undefined") {
                                this.columnOptions[j].referencedEntities = this.entityDescriptions[k].fields[l].referencedEntities;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    resolveEntityMetadata = () => {
        for (let m in this.columnOptions) {
            if (typeof this.columnOptions[m].referencedEntities != "undefined" && Array.isArray(this.columnOptions[m].referencedEntities) && typeof this.columnOptions[m].referencedEntities[0] != "undefined") {
                for (let n in this.entityMetadata) {
                    if (this.columnOptions[m].referencedEntities[0] === this.entityMetadata[n].typeName) {
                        if (this.columnOptions[m].key != "State" && typeof this.entityMetadata[n].pickups != "undefined") {
                            this.columnOptions[m].pickups = this.entityMetadata[n].pickups;
                        } else if (this.columnOptions[m].key === "State") {
                            this.columnOptions[m].pickups = [];
                            for (let o in this.entityMetadata[n].pickups) {
                                if (this.columnOptions[m].validStates.includes(this.entityMetadata[n].pickups[o].value)) {
                                    this.columnOptions[m].pickups.push(this.entityMetadata[n].pickups[o]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    calculateScrollableWidth = () => {
        let frozenWidth = $("#tableDiv_frozen_" + this.uuid).width(),
        targetWidth = $("#" + this.targetDivId).width(),
        scrollableWidth = targetWidth - frozenWidth;
        $("#tableDiv_" + this.uuid).width(scrollableWidth);
    }

    getHtml = () => {
        let html = `<div id="${"tableHtml_" + this.uuid}" class="${"tableHtml_" + this.classUniqueString}">`;
        html += this.tableDiv(true);
        html += this.tableDiv(false);
        html += `</div>`;
        return html;
    }

    tableDiv = frozenOrNot => {
        return `<div id="${"tableDiv_" + (frozenOrNot ? "frozen_" : "") + this.uuid}" class="${"tableDiv_" + (frozenOrNot ? "frozen_" : "") + this.classUniqueString}">${this.table(frozenOrNot)}</div>`;
    }

    table = frozenOrNot => {
        return `<table id="${"table_" + (frozenOrNot ? "frozen_" : "") + this.uuid}" class="${"table_" + (frozenOrNot ? "frozen_" : "") + this.classUniqueString}">${this.tbody(frozenOrNot)}</table>`;
    }

    tbody = frozenOrNot => {
        let html = `<tbody id="${"tbody_" + (frozenOrNot ? "frozen_" : "") + this.uuid}" class="${"tbody_" + (frozenOrNot ? "frozen_" : "") + this.classUniqueString}">`;
        html += this.headerRow(frozenOrNot);
        for (let i in this.filteredData) {
            html += this.row(i, this.filteredData[i].id, this.filteredData[i], frozenOrNot);
        }
        if (frozenOrNot) {
            html += `<tr id="filler_row_${this.uuid}" class="filler_row_${this.classUniqueString}"></tr>`;
        }
        html += `</tbody>`;
        return html;
    }

    headerRow = (frozenOrNot) => {
        let html = `<tr id="${"headerRow_" + (frozenOrNot ? "frozen_" : "") + this.uuid}" class="${"headerRow_" + (frozenOrNot ? "frozen_" : "") + this.classUniqueString}">`;
        for (let i in this.columnOptions) {
            if (this.columnOptions[i].frozen === frozenOrNot) {
                html += this.headerCell(this.columnOptions[i].sortable, this.columnOptions[i].freezable, this.columnOptions[i].filterable, this.columnOptions[i].key, this.columnOptions[i].label, this.columnOptions[i].width);
            }
        }
        html += `</tr>`;
        return html;
    }

    row = (rowNumber, objectId, rowData, frozenOrNot) => {
        let html = `<tr id="${"row_" + (frozenOrNot ? "frozen_" : "") + rowNumber + "_" + this.uuid}" class="${"row_" + objectId + " row_" + this.classUniqueString}" object-id="${objectId}" row-number="${rowNumber}">`;
        for (let i in this.columnOptions) {
            if (this.columnOptions[i].frozen === frozenOrNot) {
                if (this.columnOptions[i].fieldType.toLowerCase() === "text") {
                    html += this.textCell(objectId, this.columnOptions[i].key, rowNumber, rowData[this.columnOptions[i].key], this.columnOptions[i].width, this.columnOptions[i].editable);
                } else if (this.columnOptions[i].fieldType.toLowerCase() === "textarea") {
                    html += this.textAreaCell(objectId, this.columnOptions[i].key, rowNumber, rowData[this.columnOptions[i].key], this.columnOptions[i].width, this.columnOptions[i].editable);
                } else {
                    html += this.cell(objectId, this.columnOptions[i].key, rowNumber, rowData[this.columnOptions[i].key], this.columnOptions[i].width, this.columnOptions[i].editable);
                }
            }
        }
        html += `</tr>`;
        return html;
    }

    headerCell = (sortable, freezable, filterable, apiName, label, width) => { //need to implement icons and their visibility
        let widthInPixels = ($("#" + this.targetDivId).width() * width) / 100;
        return `<th id="${"headerCell_" + apiName}" class="${"headerCell_" + this.classUniqueString}" style="min-width:${widthInPixels}px;max-width:${widthInPixels}px">${label}</th>`;
    }

    cell = (objectId, apiName, rowNumber, content, width, editable) => { //need to implement different cell types
        let widthInPixels = ($("#" + this.targetDivId).width() * width) / 100;
        return `<td id="${"cell_" + apiName + "_in_row_" + rowNumber}" class="${"cell_" + this.classUniqueString} ${editable ? "" : "lockedCell_" + this.classUniqueString}" object-id="${objectId}" api-name="${apiName}" row-number="${rowNumber}" style="min-width:${widthInPixels}px;max-width:${widthInPixels}px">${content}</td>`;
    }

    textCell = (objectId, apiName, rowNumber, content, width, editable) => {
        let widthInPixels = ($("#" + this.targetDivId).width() * width) / 100;
        if (editable) {
            $(document).on("click", "#cell_" + apiName + "_in_row_" + rowNumber, e => {
                let windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                editorPopupWidth = 500,
                editorPopupHeight = 120,
                editorLeft = e.pageX - editorPopupWidth / 2 < 0 ? 0 : e.pageX + editorPopupWidth / 2 > windowWidth ? windowWidth - editorPopupWidth : e.pageX - editorPopupWidth / 2,
                editorTop = e.pageY - editorPopupHeight / 2 < 0 ? 0 : e.pageY + editorPopupHeight / 2 > windowHeight ? windowHeight - editorPopupHeight : e.pageY - editorPopupHeight / 2;
                let popupOptions = {
                    title: "Editing",
                    content: `<div><input id="textEditorInput_${this.uuid + "_" + rowNumber + "_" + apiName}" class="textEditorInput_${this.classUniqueString}" type="text" value="${content != null ? content : ""}"></div>`,
                    targetDivId: "textEditor_" + this.uuid + "_" + rowNumber + "_" + apiName,
                    buttons: {
                        Cancel: {
                            handler: null
                        },
                        Save: {
                            handler: null
                        }
                    },
                    stepDuration: 300
                },
                popup = new Popup(popupOptions);
                popup.buttons.Save.handler = this.partial(this.saveEnteredValue, popup, objectId, apiName, "textEditorInput_" + this.uuid + "_" + rowNumber + "_" + apiName); 
                $("body").append(`<div id="textEditor_${this.uuid + "_" + rowNumber + "_" + apiName}" style="position:fixed;width:${editorPopupWidth}px;height:${editorPopupHeight}px;left:${editorLeft}px;top:${editorTop}px;z-index:9000;">${popup.getHtml()}</div>`);  
                popup.targetDivId = "textEditor_" + this.uuid + "_" + rowNumber + "_" + apiName;
                popup.expand(e);
            });
        }
        return `<td id="${"cell_" + apiName + "_in_row_" + rowNumber}" class="${"cell_" + this.classUniqueString} ${editable ? "" : "lockedCell_" + this.classUniqueString}" object-id="${objectId}" 
                api-name="${apiName}" row-number="${rowNumber}" style="${editable ? "cursor:pointer;" : ""}min-width:${widthInPixels}px;max-width:${widthInPixels}px">
                    ${content != null ? content : ""}
                </td>`;
    }

    textAreaCell = (objectId, apiName, rowNumber, content, width, editable) => {
        let widthInPixels = ($("#" + this.targetDivId).width() * width) / 100;
        if (editable) {
            $(document).on("click", "#cell_" + apiName + "_in_row_" + rowNumber, e => {
                let windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                editorPopupWidth = 800,
                editorPopupHeight = 600,
                textAreaHeight = 500,
                editorLeft = e.pageX - editorPopupWidth / 2 < 0 ? 0 : e.pageX + editorPopupWidth / 2 > windowWidth ? windowWidth - editorPopupWidth : e.pageX - editorPopupWidth / 2,
                editorTop = e.pageY - editorPopupHeight / 2 < 0 ? 0 : e.pageY + editorPopupHeight / 2 > windowHeight ? windowHeight - editorPopupHeight : e.pageY - editorPopupHeight / 2;
                console.log(windowHeight);
                let popupOptions = {
                    title: "Editing",
                    content: `<div><textarea id="textEditorInput_${this.uuid + "_" + rowNumber + "_" + apiName}" class="textEditorInput_${this.classUniqueString}" placeholder="Enter text here..." style="height:${textAreaHeight}px;resize:none;">${content != null ? content : ""}</textarea></div>`,
                    targetDivId: "textEditor_" + this.uuid + "_" + rowNumber + "_" + apiName,
                    buttons: {
                        Cancel: {
                            handler: null
                        },
                        Save: {
                            handler: null
                        }
                    },
                    stepDuration: 300
                },
                popup = new Popup(popupOptions);
                popup.buttons.Save.handler = this.partial(this.saveEnteredValue, popup, objectId, apiName, "textEditorInput_" + this.uuid + "_" + rowNumber + "_" + apiName); 
                $("body").append(`<div id="textEditor_${this.uuid + "_" + rowNumber + "_" + apiName}" style="position:fixed;width:${editorPopupWidth}px;height:${editorPopupHeight}px;left:${editorLeft}px;top:${editorTop}px;z-index:9000;">${popup.getHtml()}</div>`);  
                popup.targetDivId = "textEditor_" + this.uuid + "_" + rowNumber + "_" + apiName;
                popup.expand(e);
            });
        }
        return `<td id="${"cell_" + apiName + "_in_row_" + rowNumber}" class="textAreaCell_${this.classUniqueString} ${"cell_" + this.classUniqueString} ${editable ? "" : "lockedCell_" + this.classUniqueString}" object-id="${objectId}" 
                api-name="${apiName}" row-number="${rowNumber}" style="${editable ? "cursor:pointer;" : ""}min-width:${widthInPixels}px;max-width:${widthInPixels}px">
                        ${content != null ? content : ""}
                </td>`;
    }

    saveEnteredValue = async (popup, object, field, inputId) => {
        let newValue = $("#" + inputId).val();
        await this.updateObject(object, field, newValue);
        popup.collapseCallback = this.partial(this.deleteElement, popup.targetDivId);
        popup.collapse();
    }

    partial(func /*, 0..n args */) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            var allArguments = args.concat(Array.prototype.slice.call(arguments));
            return func.apply(this, allArguments);
        };
    }

}