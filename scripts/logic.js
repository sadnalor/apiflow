class Context {
    constructor() {}

    getData = () => {
        return {
            appUniqueId: "some-app",
            currentObject: {id: "/Project/2tt1jmkgqjgeh20860f2muxdy3336", Name: "My project template", ExternalID: "2tt1jmkgqjgeh20860f2muxdy3336", SYSID: "P-80604", EntityType: "Project"},
            currentUser: {id: "/User/5iud9lre7cfpilbalaailivkt3", Name: "Rolandas Pumputis", Username: "rolandas.demo", ExternalID: "5iud9lre7cfpilbalaailivkt3", Admin: true},
            dataObjectStorageLocation: "/DiscussionGroup/5iud9lre7cfpilbalaailivkt6",
            saveFileDataType: "API Flow Save Data",
            encryptionKey: "test",
            organizationId: "5iud9lre7cfpilbalaailivkt0",
            organizationName: "Roland demo",
            serverUrl: "https://api.clarizen.com/V2.0/services",
<<<<<<< Updated upstream
            sessionId: "157018c7-9b06-4e97-b417-74c5109fdf9f_26464129",
=======
            sessionId: "388bbb62-9f50-4ba7-b6b0-0feae7dc4524_26464129",
>>>>>>> Stashed changes
            viewMode: "Expanded"
        };
    }
}

class ClarizenApiSimulation {
    constructor() {
        this.Context = new Context();
    }
}

const main = async () => {
    let API = new ClarizenApiSimulation();
    let clarizenData = API.Context.getData();
    let clarizenContext = {
        viewMode: clarizenData.viewMode,
        context: {
            currentObject: clarizenData.currentObject,
            currentUser: clarizenData.currentUser,
            server: {
                endpointUrlPrefix: clarizenData.serverUrl,
                sessionId: clarizenData.sessionId
            },
            organization: {
                id: clarizenData.organizationId,
                name: clarizenData.organizationName
            }
        },
        appId: clarizenData.appUniqueId,
        encryptionKey: clarizenData.encryptionKey,
        saveDataStorageObject: clarizenData.dataObjectStorageLocation,
        saveFileDataType: clarizenData.saveFileDataType,

    },
    mainMenu = new ApiFlowMainMenu(clarizenContext);
    await mainMenu.initialize();
}

function partial(func /*, 0..n args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

main();