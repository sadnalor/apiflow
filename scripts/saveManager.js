class SaveManager{
    constructor(settings) {
        this.username = settings.username;
        this.password = settings.password;
        this.useApiKey = settings.useApiKey;
        this.apiKey = settings.apiKey;
        this.useSessionId = settings.useSessionId;
        this.sessionId = settings.sessionId;
        this.endpointUrlPrefix = settings.endpointUrlPrefix;
        this.saveDataStorageObject = settings.saveDataStorageObject;
        this.saveFileDataType = settings.saveFileDataType;
        this.appId = settings.appId;
        this.authorization = null;
        this.rawData = null;
        this.groupedRawData = null;
        this.decryptedData = null;
        this.encryptionKey = settings.encryptionKey;
    }

    load = async () => {
        this.authorization = await this.initialize();
        let querySettings = {
            endpoint: this.endpointUrlPrefix + "/data/Query",
            method: "POST",
            headers: {"Authorization": this.authorization},
            query: `SELECT ExternalId,Name,Description FROM Data WHERE Name LIKE '%` + this.appId + `%' AND DataObjectType='` + this.saveFileDataType + `'`,
            offset: 0
        }
        this.rawData = await this.recursiveRequest(querySettings, []);
        for (let i in this.rawData) {
            this.rawData[i]["info"] = JSON.parse(this.rawData[i].Name);
        }
        this.groupRawData();
        this.sortSectionDataBySequenceNumber();
        //console.log("All data:", this.rawData);
        //console.log("Grouped all data:", this.groupedRawData);
        this.decryptGroupedRawData();
        //console.log("Decrypted data:", this.decryptedData);
    }

    groupRawData = () => {
        this.groupedRawData = {};
        for (let i in this.rawData) {
            if (this.rawData[i].info.sectionId in this.groupedRawData) {
                this.groupedRawData[this.rawData[i].info.sectionId].push(this.rawData[i]);
            } else {
                this.groupedRawData[this.rawData[i].info.sectionId] = [this.rawData[i]];
            }
        }
    }

    sortSectionDataBySequenceNumber = () => {
        for (let i in this.groupedRawData) {
            this.groupedRawData[i].sort((a, b) => {
                a = a.info.sequenceNumber;
                b = b.info.sequenceNumber;
                if (a > b) {return 1} else if (a < b) {return -1} else {return 0}
            });
        }
    }

    decryptGroupedRawData = () => {
        let sectionData, encryptedString = "";
        this.decryptedData = {};
        for (let i in this.groupedRawData) {
            sectionData = this.groupedRawData[i];
            for (let j in sectionData) {
                encryptedString += sectionData[j].Description;
            }
            this.decryptedData[i] = this.decrypt(encryptedString);
            encryptedString = "";
        }
    }

    loadSection = sectionId => {
        let querySettings = {
            endpoint: this.endpointUrlPrefix + "/data/Query",
            method: "POST",
            headers: {"Authorization": this.authorization},
            query: `SELECT ExternalId,Name,Description FROM Data WHERE Name LIKE '%` + sectionId + `%' AND DataObjectType='` + this.saveFileDataType + `'`,
            offset: 0
        }
        return this.recursiveRequest(querySettings, []);
    }

    save = async (json, sectionId) => {
        if (this.authorization === null) {
            this.authorization = await this.initialize();
        }
        let oldSectionData = await this.loadSection(sectionId), encrypted, decrypted, version, dataToSave, newSaveRequestsArray, newSectionData, deletionArray, deleteDataCallResponse;     
        console.log("Old section data:", oldSectionData);
        if (oldSectionData.length === 0) {version = 0} else {version = JSON.parse(oldSectionData[0].Name).version}
        console.log("Old version:", version);
        encrypted = this.encrypt(json);
        dataToSave = this.stringTo2kCharArray(encrypted);
        newSaveRequestsArray = this.newSaveRequestsArray(dataToSave, sectionId, version + 1); //incrementing version before saving
        console.log("Req array:", newSaveRequestsArray);
        newSectionData = await this.updateDataInBulk(newSaveRequestsArray);
        console.log("New section data:", newSectionData);
        console.log("All good:", this.bulkExecuteSuccessful(newSectionData.responses));
        if (oldSectionData.length != 0) {
            deletionArray = this.deleteDataObjectsArray(oldSectionData);
            console.log("Deletion array:", deletionArray);
            deleteDataCallResponse = await this.updateDataInBulk(deletionArray);
            console.log("Deletion responses:", deleteDataCallResponse);
            console.log("All Good:", this.bulkExecuteSuccessful(deleteDataCallResponse.responses));
        }
    }

    deleteSection = async sectionId => {
        if (this.authorization === null) {
            this.authorization = await this.initialize();
        }
        let oldSectionData = await this.loadSection(sectionId), deletionArray, deleteDataCallResponse;
        if (oldSectionData.length != 0) {
            deletionArray = this.deleteDataObjectsArray(oldSectionData);
            console.log("Deletion array:", deletionArray);
            deleteDataCallResponse = await this.updateDataInBulk(deletionArray);
            console.log("Deletion responses:", deleteDataCallResponse);
            console.log("All Good:", this.bulkExecuteSuccessful(deleteDataCallResponse.responses));
        }
    }

    bulkExecuteSuccessful = responses => {
        for (let i in responses) {
            if (responses[i].statusCode != 200) {
                return false;
            }
        }
        return true;
    }

    deleteDataObjectsArray = (data) => {
        let requestsArray = [],
            url = "/data/objects",
            method = "DELETE",
            objects = [],
            object = {};
        for (let i in data){
            object["id"] = data[i].id;
            objects.push(JSON.parse(JSON.stringify(object)));
        }
        for (let j in objects){
            requestsArray.push({"url": url, "method": method, "body": objects[j]});
        }
        return requestsArray;
    }

    newSaveRequestsArray = (data, sectionId, version) => {
        let requestsArray = [],
            url = "/data/objects/Data",
            method = "PUT",
            objects = [],
            object = {};
        for (let i in data){
            object["Name"] = JSON.stringify(
                {
                    appId: this.appId,
                    sectionId: sectionId,
                    version: version,
                    sequenceNumber: parseInt(i)
                }
            );
            object["Description"] = data[i];
            object["SourceObject"] = this.saveDataStorageObject;
            object["DataObjectType"] = this.saveFileDataType;
            objects.push(JSON.parse(JSON.stringify(object)));
        }
        for (let j in objects){
            requestsArray.push({"url": url, "method": method, "body": objects[j]});
        }
        return requestsArray;
    }

    updateDataInBulk = requests => {
        return new Promise(results => {results(this.bulkExecute({"Requests": requests}));});
    }


    stringTo2kCharArray = string => {
        let arr = [], substring;
        while (string.length > 0) {
            substring = string.slice(0, 512);
            arr.push(substring);
            string = string.replace(substring, "");
        }
        return arr;
    }

    encrypt = json => {
        return CryptoJS.AES.encrypt(JSON.stringify(json), this.encryptionKey).toString();
    }

    decrypt = encryptedString => {
        return JSON.parse(CryptoJS.AES.decrypt(encryptedString, this.encryptionKey).toString(CryptoJS.enc.Utf8));
    }

    initialize = async () => {
        if (this.useApiKey === true) {
            if (this.apiKey === null || typeof this.apiKey === "undefined") {console.log("Pleae provide an ApiKey.")} else {return "ApiKey " + this.apiKey}
        } else if (this.useSessionId === true) {
            if (this.sessionId === null || typeof this.sessionId === "undefined") {console.log("Pleae provide a SessionId.")} else {return "Session " + this.sessionId}
        } else {
            if (this.username === null || typeof this.username === "undefined") {console.log("Pleae provide a username.")}
            if (this.password === null || typeof this.password === "undefined") {console.log("Pleae provide a password.")}
            if (this.username != null && this.password != null) {return "Session " + (await this.login()).sessionId}
        }
        return null;
    }

    bulkExecute = async payload => {
        let settings = {
            endpoint: this.endpointUrlPrefix + "/bulk/execute",
            method: "POST",
            headers: {"Authorization": this.authorization},
            payload: JSON.stringify(payload)
        };
        try {
            return this.request(settings);
        } catch (err) {
            console.log("Bulk execution failed. Reason: " + JSON.stringify(err));
            return null;
        }
    }

    login = async () => {
        if (typeof this.endpointUrlPrefix === "undefined" || this.endpointUrlPrefix === null) {
            this.endpointUrlPrefix = (await this.getServerDefinition()).serverLocation;
        }
        let settings = {
            endpoint: this.endpointUrlPrefix + "/authentication/Login",
            method: "POST",
            headers: {},
            payload: JSON.stringify(
                {
                    username: this.username,
                    password: this.password
                }
            )
        };
        try {
            return this.request(settings);
        } catch (err) {
            console.log("Login failed. Reason: " + JSON.stringify(err));
            return null;
        }
    }

    getServerDefinition = () => {
        console.log("getting definition");
        let settings = {
            endpoint: "https://api2.clarizen.com/v2.0/services/authentication/getServerDefinition",
            method: "POST",
            headers: {},
            payload: JSON.stringify(
                {
                    username: this.username,
                    password: this.password
                }
            )
        };
        try {
            return this.request(settings);
        } catch (err) {
            console.log("Login failed. Reason: " + JSON.stringify(err));
            return null;
        }
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