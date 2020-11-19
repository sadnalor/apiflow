class FlowBuilderTemplates {
    constructor() {
        this.ipsum = new LoremIpsum();
        this.ipsumText = this.ipsum.textMedium;
        this.words = this.ipsumText.split(" ");
        this.list = {
            "API Call": this.apiCallTemplate,
            "Set Variable": this.setVariableTemplate,
            "JavaScript": this.jsCodeTemplate,
            "Conditional Action List": this.conditionalActionListTemplate,
            "While Loop": this.whileLoopTemplate,
            "Run On": this.runOnLoopTemplate,
            "HTML Output": this.htmlOutputTemplate,
            "User Input Form": this.userInputFormTemplate,
            "Import From Excel": this.importFromExcelTemplate,
            "Clarizen One Get Server Definition": this.clarizenOneGetServerDefinition,
            "Clarizen One Get Session Info": this.clarizenOneGetSessionInfo,
            "Clarizen One Login": this.clarizenOneLogin,
            "Clarizen One Logout": this.clarizenOneLogout,
            "Clarizen One Aggregate Query": this.clarizenOneAggregateQuery,
            "Clarizen One Change State": this.clarizenOneChangeState,
            "Clarizen One Count Query": this.clarizenOneCountQuery,
            "Clarizen One Create and Retrieve": this.clarizenOneCreateAndRetrieve,
            "Clarizen One Create Discussion": this.clarizenOneCreateDiscussion,
            "Clarizen One Create from Template": this.clarizenOneCreateFromTemplate,
            "Clarizen One Entity Feed Query": this.clarizenOneEntityFeedQuery,
            "Clarizen One Entity Query": this.clarizenOneEntityQuery,
            "Clarizen One Execute Custom Action": this.clarizenOneExecuteCustomAction,
            "Clarizen One Expense Query": this.clarizenOneExpenseQuery,
            "Clarizen One Find User Query": this.clarizenOneFindUserQuery,
            "Clarizen One Get Calendar Exceptions": this.clarizenOneGetCalendarExceptions,
            "Clarizen One Get Calendar Info": this.clarizenOneGetCalendarInfo,
            "Clarizen One Get Template Descriptions": this.clarizenOneGetTemplateDescriptions,
            "Clarizen One Groups Query": this.clarizenOneGroupsQuery,
            "Clarizen One License Consumption": this.clarizenOneLicenseConsumption,
            "Clarizen One Lifecycle": this.clarizenOneLifecycle,
            "Clarizen One Missing Timesheets": this.clarizenOneMissingTimesheets,
            "Clarizen One News Feed Query": this.clarizenOneNewsFeedQuery,
            "Clarizen One Objects GET": this.clarizenOneObjectsGet,
            "Clarizen One Objects POST": this.clarizenOneObjectsPost,
            "Clarizen One Objects PUT": this.clarizenOneObjectsPut,
            "Clarizen One Objects DELETE": this.clarizenOneObjectsDelete,
            "Clarizen One Query": this.clarizenOneQuery,
            "Clarizen One Relation Query": this.clarizenOneRelationQuery,
            "Clarizen One Replies Query": this.clarizenOneRepliesQuery,
            "Clarizen One Retrieve Multiple": this.clarizenOneRetrieveMultiple,
            "Clarizen One Search": this.clarizenOneSearch,
            "Clarizen One Timesheet Query": this.clarizenOneTimesheetQuery,
            "Clarizen One Upsert": this.clarizenOneUpsert,
            "Clarizen One Download": this.clarizenOneDownload,
            "Clarizen One Get Upload URL": this.clarizenOneGetUploadUrl,
            "Clarizen One Update Image": this.clarizenOneUpdateImage,
            "Clarizen One Upload": this.clarizenOneUpload,
            "Clarizen One Describe Entities": this.clarizenOneDescribeEntities,
            "Clarizen One Describe Entity Relations": this.clarizenOneDescribeEntityRelations,
            "Clarizen One Describe Metadata": this.clarizenOneDescribeMetadata,
            "Clarizen One List Entities": this.clarizenOneListEntities,
            "Clarizen One Create Workflow Rule": this.clarizenOneCreateWorkflowRule,
            "Clarizen One Delete Workflow Rule": this.clarizenOneDeleteWorkflowRule,
            "Clarizen One Get Application Status": this.clarizenOneGetApplicationStatus,
            "Clarizen One Install Application": this.clarizenOneInstallApplication,
            "Clarizen One App Login": this.clarizenOneAppLogin,
            "Clarizen One Send Email": this.clarizenOneSendEmail,
            "Clarizen One Bulk Execute In Batches": this.clarizenOneBulkExecuteInBatchesTemplate,
            "Clarizen Go Get Workspaces": this.clarizenGoGetWorkspaces,
            "Clarizen Go Create Workspace": this.clarizenGoCreateWorkspace,
            "Clarizen Go Get Workspace Labels": this.clarizenGoGetWorkspaceLabels,
            "Clarizen Go Delete Workspace": this.clarizenGoDeleteWorkspace,
            "Clarizen Go Edit Workspace": this.clarizenGoEditWorkspace,
            "Clarizen Go Edit Workspace Labels": this.clarizenGoEditWorkspaceLabels,
            "Clarizen Go Delete Workspace Labels": this.clarizenGoDeleteWorkspaceLabels,
            "Clarizen Go Edit Workspace User Role": this.clarizenGoEditWorkspaceUserRole,
            "Clarizen Go Get Workspace Users": this.clarizenGoGetWorkspaceUsers,
            "Clarizen Go Get Workspaces Basic": this.clarizenGoGetWorkspacesBasic,
            "Clarizen Go Get Boards Basic": this.clarizenGoGetBoardsBasic,
            "Clarizen Go Get Milestones Basic": this.clarizenGoGetMilestonesBasic,
            "Clarizen Go Get Epics Basic": this.clarizenGoGetEpicsBasic,
            "Clarizen Go Invite Users": this.clarizenGoInviteUsers,
            "Clarizen Go Add Users to Workspace": this.clarizenGoAddUsersToWorkspace,
            "Clarizen Go Create Milestone": this.clarizenGoCreateMilestone,
            "Clarizen Go Edit Milestone": this.clarizenGoEditMilestone,
            "Clarizen Go Delete Milestone": this.clarizenGoDeleteMilestone,
            "Clarizen Go Get Milestones in a Workspace": this.clarizenGoGetMilestonesInWorkspace,
            "Clarizen Go Get Tasks in a Milestone": this.clarizenGoGetTasksInMilestone,
            "Clarizen Go Get Milestone Details": this.clarizenGoGetMilestoneDetails,
            "Clarizen Go Create Task": this.clarizenGoCreateTask,
            "Clarizen Go Edit Task": this.clarizenGoEditTask,
            "Clarizen Go Get Tasks in a Workspace": this.clarizenGoGetTasksInWorkspace,
            "Clarizen Go Get Task": this.clarizenGoGetTask,
            "Clarizen Go Delete Task": this.clarizenGoDeleteTask,
            "Clarizen Go Move Task to Epic": this.clarizenGoMoveTaskToEpic,
            "Clarizen Go Move Task to Board and Stage": this.clarizenGoMoveTaskToBoardAndStage,
            "Clarizen Go Create Board": this.clarizenGoCreateBoard,
            "Clarizen Go Edit Board": this.clarizenGoEditBoard,
            "Clarizen Go Get Users in a Board": this.clarizenGoGetUsersInBoard,
            "Clarizen Go Get Board": this.clarizenGoGetBoard,
            "Clarizen Go Delete Board": this.clarizenGoDeleteBoard,
            "Clarizen Go Create Epic": this.clarizenGoCreateEpic,
            "Clarizen Go Edit Epic": this.clarizenGoEditEpic,
            "Clarizen Go Delete Epic": this.clarizenGoDeleteEpic,
            
            


            "Clarizen One Login US Prod": this.clarizenOneLoginUsProdTemplate
        };
    }

    //Clarizen Go Templates

    clarizenGoDeleteEpic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `DELETE`,
            `https://go.clarizen.com/api/pub/epics/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Delete Epic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/epics/delete" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditEpic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/epics`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "epicId": 0,
                "name": "New Epic Name",
                "description": "New Epic Description"
              }`,
            "Clarizen Go Edit Epic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/epics/update" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoCreateEpic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/epics`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "workspaceId": 0,
                "name": "Epic Name"
              }`,
            "Clarizen Go Create Epic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/epics/create" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoDeleteBoard = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `DELETE`,
            `https://go.clarizen.com/api/pub/boards/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Delete Board",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/boards/delete" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetBoard = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/getBoard`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "boardId": 0
              }`,
            "Clarizen Go Get Board",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/boards/getBoard" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetUsersInBoard = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/boards/{id}/users`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Users in a Board",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/boards/getBoardUsers" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditBoard = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/boards`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "id": 0,
                "name": "New Board Name"
              }`,
            "Clarizen Go Edit Board",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/boards/update" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoCreateBoard = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/boards`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "workspaceId": 0,
                "name": "Board Name"
              }`,
            "Clarizen Go Create Board",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/boards/createBoard" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

//    674d8672-a1fe-46e0-8ce6-05053160ca21
    clarizenGoMoveTaskToBoardAndStage = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/tasks/column`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "taskId": 0,
                "columnId": "stageIdString",
                "boardId": 0
              }`,
            "Clarizen Go Move Task to Board and Stage",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/moveTaskToStage" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoMoveTaskToEpic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/tasks/epic`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "id": 0,
                "destSectionId": 0
              }`,
            "Clarizen Go Move Task to Epic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/moveTaskToEpic" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoDeleteTask = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `DELETE`,
            `https://go.clarizen.com/api/pub/tasks/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Delete Task",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/deleteTask" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetTask = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/tasks/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Task",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/get" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetTasksInWorkspace = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/tasks?workspaceId={id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Tasks in a Workspace",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/getTasks" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoAddAttachmentOnTask = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/tasks/{id}/attachments`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "attachments": [
                  {
                    "id": "File ID",
                    "fileName": "File Name",
                    "url": "File URL",
                    "taskId": 0
                  }
                ]
              }`,
            "Clarizen Go Add Attachments on Task",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/uploadTaskAttachments" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditTask = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/tasks/{id}/edit`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "name": "Task Name",
                "description": "Some Description"
            }`,
            "Clarizen Go Edit Task",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/edit" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoCreateTask = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/tasks`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "name": "Task Name",
                "workspaceId": 0,
                "sectionId": 0,
                "boardId": 0,
                "startDate": 0,
                "dueDate": 0,
                "description": "Some Description",
                "assignedId": 0
            }`,
            "Clarizen Go Create Task",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/tasks/create" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetMilestonesInWorkspace = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/milestones/workspaces/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Milestones in a Workspace",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/milestones/getMilestonesList" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetMilestoneDetails = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/milestones/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Milestone Details",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/milestones/getMilestone" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetTasksInMilestone = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/milestones/{id}/tasks`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Tasks in a Milestone",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/milestones/getMilestoneTasks" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoDeleteMilestone = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `DELETE`,
            `https://go.clarizen.com/api/pub/milestones/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Delete Milestone",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/milestones/delete" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditMilestone = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/milestones/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "name": "New Name",
                "description": "New description"
              }`,
            "Clarizen Go Edit Milestone",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/milestones/update" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }
    1389568

    clarizenGoCreateMilestone = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/milestones`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "workspaceId": 0,
                "name": "Milestone Name",
                "date": "2021-12-31T00:00:00.000Z",
                "description": "Some description"
              }`,
            "Clarizen Go Create Milestone",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/milestones/create" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }
    
    clarizenGoAddUsersToWorkspace = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/workspaces/{id}/users/add`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "userIds": [
                    0
                ]
              }`,
            "Clarizen Go Add Users to Workspace",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/users/addUserToSpace" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoInviteUsers = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/users/invite`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "invitations": [
                  {
                    "email": "Email address",
                    "role": 0,
                    "workspaceId": 0,
                    "taskId": 0
                  }
                ]
              }`,
            "Clarizen Go Invite Users",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/users/invite" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetEpicsBasic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/web/thin/workspace/{id}/epics`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Epics Basic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/thin/getEpicsBasic" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetMilestonesBasic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/web/thin/workspace/{id}/milestones`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Milestones Basic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/thin/getMilestonesBasic" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetBoardsBasic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/web/thin/workspace/{id}/boards`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Boards Basic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/thin/getBoardsBasic" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetWorkspacesBasic = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/web/thin/workspaces`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Workspaces Basic",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/thin/getWorkspacesBasic" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetWorkspaceUsers = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/web/thin/workspace/{id}/users`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Workspace Users",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/thin/getUsersBasic" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditWorkspaceUserRole = (parentAddress, level, order) => { //11358
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/workspaces/users/role`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "updatedUserId": 123456,
                "workspaceId": 123456,
                "role": 0
              }`,
            "Clarizen Go Edit Workspace User Role",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/setWorkspaceRole" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoDeleteWorkspaceLabels = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `DELETE`,
            `https://go.clarizen.com/api/pub/workspaces/labels`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "workspaceId": 123456,
                "labelName": "Label name"
              }`,
            "Clarizen Go Delete Workspace Labels",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/deleteLabel" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditWorkspaceLabels = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/workspaces/labels`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "workspaceId": 123456,
                "oldName": "Old label name",
                "newName": "New label name",
                "color": "#ff0000"
              }`,
            "Clarizen Go Edit Workspace Labels",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/editLabel" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoEditWorkspace = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/workspaces/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "name": "New Name"
            }`,
            "Clarizen Go Edit Workspace",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/edit" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoDeleteWorkspace = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `DELETE`,
            `https://go.clarizen.com/api/pub/workspaces/{id}`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Delete Workspace",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/deleteWorkspace" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetWorkspaceLabels = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/workspaces/{id}/labels`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Workspace Labels",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/getWorkspaceLabels" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoCreateWorkspace = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `POST`,
            `https://go.clarizen.com/api/pub/workspaces`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{
                "name": "Workspace Name",
                "description": "Workspace description"
              }`,
            "Clarizen Go Create Workspace",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/create" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGoGetWorkspaces = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `GET`,
            `https://go.clarizen.com/api/pub/workspaces`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go Get Workspaces",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/getWorkspaces" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }











    clarizenGo = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/workspaces`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenGo = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            `PUT`,
            `https://go.clarizen.com/api/pub/workspaces`,
            `{
                "Authorization": "ApiKey YOUR_API_KEY",
                "Content-Type": "application/json"
            }`,
            `{}`,
            "Clarizen Go",
            `<a href="https://app.swaggerhub.com/apis-docs/Go16/clarizen_go_final_api/1.0.3#/workspaces/" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    


    //Clarizen One Templates

    clarizenOneGetServerDefinition = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/authentication/GetServerDefinition",
            "{}",
            `{"username": "some.username", "password": "some.password"}`,
            "Clarizen One Get Server Definition",
            `<a href="https://api.clarizen.com/V2.0/services/authentication/GetServerDefinition" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneGetSessionInfo = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/authentication/GetSessionInfo",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Get Session Info",
            `<a href="https://api.clarizen.com/V2.0/services/authentication/GetSessionInfo" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneLogin = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/authentication/Login",
            `{}`,
            `{"username": "some.username", "password": "some.password"}`,
            "Clarizen One Login",
            `<a href="https://api.clarizen.com/V2.0/services/authentication/Login" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneLogout = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/authentication/Logout",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Logout",
            `<a href="https://api.clarizen.com/V2.0/services/authentication/Logout" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneAggregateQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/AggregateQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "typeName": "Task",
                "aggregations": [
                    {
                        "function": "Count",
                        "fieldName": "Name",
                        "alias": "Cnt"
                    }
                ],
                "groupBy": [
                    "State"
                ],
                "orders": [
                    {
                        "fieldName": "Cnt",
                        "order": "Descending"
                    }
                ],
                "paging": {
                    "from": 0,
                    "limit": 10
                }
            }`,
            "Clarizen One Aggregate Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/AggregateQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneChangeState = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/ChangeState",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{"ids": [
                    "/task/ExternalId1",
                    "/task/ExternalId2",
                    "etc."
                ],
                "state": "Active"
            }`,
            "Clarizen One Change State",
            `<a href="https://api.clarizen.com/V2.0/services/data/ChangeState" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneCountQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/CountQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "query": {
                  "_type": "cZQLQuery",
                  "q": "SELECT Name FROM Task WHERE Work > 2000h LIMIT 1000"
                }
              }`,
            "Clarizen One Count Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/CountQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneCreateAndRetrieve = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/CreateAndRetrieve",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "entity": {
                    "Id": "/Task",
                    "Name": "New Task",
                    "StartDate": "2020-11-01",
                    "Duration": {
                        "Unit": "Weeks",
                        "Value": 3
                    }
                },
                "fields": [
                    "DueDate"
                ]
            }`,
            "Clarizen One Create and Retrieve",
            `<a href="https://api.clarizen.com/V2.0/services/data/CreateAndRetrieve" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneCreateDiscussion = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/CreateDiscussion",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "entity": {
                    "id": "/DiscussionPost",
                    "body": "Some text 1",
                    "Container": "/Task/ExternalId"
                },
                "relatedEntities": [
                    "/Project/ExternalId"
                ],
                "notify": [
                    "/User/ExternalId"
                ],
                "topics": [
                    "/Topic/ExternalId"
                ]
            }`,
            "Clarizen One Create Discussion",
            `<a href="https://api.clarizen.com/V2.0/services/data/CreateDiscussion" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneCreateFromTemplate = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/CreateFromTemplate",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "templateName": "name",
                "parentId": "/Project/ExternalId",
                "entity": {
                    "id": "/Project",
                    "Name": "Some name"
                }
            }`,
            "Clarizen One Create from Template",
            `<a href="https://api.clarizen.com/V2.0/services/data/CreateFromTemplate" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneEntityFeedQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/EntityFeedQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "entityId": "/Task/ExternalId",
                "fields": [
                    "CreatedOn",
                    "Body"
                ],
                "feedItemOptions": [
                    "Default",
                    "BodyMarkup",
                    "Summary"
                ],
                "paging": {
                    "from": 0,
                    "limit": 10
                }
            }`,
            "Clarizen One Entity Feed Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/EntityFeedQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneEntityQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/EntityQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "typeName": "Task",
                "fields": ["Name","Manager.Name","DueDate"],
                "orders": [{
                    "fieldName": "Name", 
                    "order": "Descending"
                    }],
                "paging": {"limit": 50},
                "where": {
                    "and": [
                        {
                            "leftExpression":{ "fieldName": "Manager"},
                            "operator": "Equal",
                            "rightExpression": { "value": "/User/ExternalId" }
                        },
                        {
                            "or": [
                            {
                                "leftExpression":{ "fieldName": "State"},
                                "operator": "Equal",
                                "rightExpression": { "value": "Active" }
                            },
                            {
                                "leftExpression":{ "fieldName": "State"},
                                "operator": "Equal",
                                "rightExpression": { "value": "Draft" }
                            }
                            ]
                        }            
                    ]
                }
            }   `,
            "Clarizen One Entity Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/EntityQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneExecuteCustomAction = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/ExecuteCustomAction",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "customAction": "Custom Action Name",
                "targetId": "/Project/ExternalId"
            }`,
            "Clarizen One Execute Custom Action",
            `<a href="https://api.clarizen.com/V2.0/services/data/ExecuteCustomAction" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneExpenseQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/ExpenseQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "projectId": "/Project/ExternalId",
                "typeName": "Task",
                "fields": [
                  "LocalAmount",
                  "CreatedBy"
                ]
              }`,
            "Clarizen One Expense Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/ExpenseQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneFindUserQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/FindUserQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "firstName": "some first name",
                "lastName": "some last name",
                "eMail": "some email address",
                "fields": [
                  "Name",
                  "Admin",
                  "CreatedOn"
                ],
                "fuzzySearchUserName": true,
                "includeSuspendedUsers": false
              }`,
            "Clarizen One Find User Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/FindUserQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneGetCalendarExceptions = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/data/GetCalendarExceptions?fromDate=2015-01-01&toDate=2020-12-31&entityId=/User/ExternalId",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Get Calendar Exceptions",
            `<a href="https://api.clarizen.com/V2.0/services/data/GetCalendarExceptions" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneGetCalendarInfo = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/data/GetCalendarInfo?userId=/User/5iud9lre7cfpilbalaailivkt3",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Get Calendar Info",
            `<a href="https://api.clarizen.com/V2.0/services/data/GetCalendarInfo" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneGetTemplateDescriptions = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/data/GetTemplateDescriptions?typeName=project",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Get Template Descriptions",
            `<a href="https://api.clarizen.com/V2.0/services/data/GetTemplateDescriptions" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }


    clarizenOneGroupsQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/GroupsQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "fields": [
                    "ExternalId"
                ],
                "paging": {
                    "from": 0,
                    "limit": 5
                }
            }`,
            "Clarizen One Groups Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/GroupsQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneLicenseConsumption = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/data/LicenseConsumption",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One License Consumption",
            `<a href="https://api.clarizen.com/V2.0/services/data/LicenseConsumption" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneLifecycle = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/Lifecycle",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "ids": [
                    "/Task/ExternalId"
                ],
                "operation": "Activate"
            }`,
            "Clarizen One Lifecycle",
            `<a href="https://api.clarizen.com/V2.0/services/data/Lifecycle" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneMissingTimesheets = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/data/MissingTimesheets?user=/User/ExternalId&startDate=2020-02-01&endDate=2020-12-31&tolerance=10",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Missing Timesheets",
            `<a href="https://api.clarizen.com/V2.0/services/data/MissingTimesheets" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneNewsFeedQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/NewsFeedQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "mode": "All",
                "fields": [
                    "Body",
                    "CreatedOn",
                    "CreatedBy"
                ],
                "feedItemOptions": [
                    "Default",
                    "BodyMarkup",
                    "Summary"
                ],
                "paging": {
                    "from": 0,
                    "limit": 10
                }
            }`,
            "Clarizen One News Feed Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/NewsFeedQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneObjectsGet = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/data/Objects/Task/ExternalId?fields=Name,StartDate,Duration,Manager.Name",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Objects GET",
            `<a href="https://api.clarizen.com/V2.0/services/data/Objects" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneObjectsPost = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/Objects",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "id": "/Task/ExternalId",
                "Manager": "/User/ExternalId",
                "WorkPolicy": "Fixed Duration"
            }  `,
            "Clarizen One Objects POST",
            `<a href="https://api.clarizen.com/V2.0/services/data/Objects" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

//5iud9lre7cfpilbalaailivkt3 user id

    clarizenOneObjectsPut = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "PUT",
            "{{context.server.endpointUrlPrefix}}/data/Objects",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "id": "/Task/customExternalIdThatCanBeLeftBlank",
                "Parent": "/Milestone/ExternalId",
                "Name": "Task Name",
                "StartDate": "2020-12-01",
                "Duration": {
                    "value": 3,
                    "unit": "Days"
                }
            }`,
            "Clarizen One Objects PUT",
            `<a href="https://api.clarizen.com/V2.0/services/data/Objects" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneObjectsDelete = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "DELETE",
            "{{context.server.endpointUrlPrefix}}/data/Objects/Task/ExternalId",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Objects DELETE",
            `<a href="https://api.clarizen.com/V2.0/services/data/Objects" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/Query",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{"q": "SELECT Name,Manager,WorkPolicy,Duration,StartDate From Project WHERE CreatedOn > \'2020-01-01\' LIMIT 10 OFFSET 0"}`,
            "Clarizen One Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/Query" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneRelationQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/RelationQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "entityId": "/Project/ExternalId",
                "relationName": "Children",
                "fields": [
                  "Parent",
                  "ExternalId",
                  "Name",
                  "EntityType"
                ],
                "orders": [
                  {
                    "fieldName": "CreatedOn",
                    "order": "Descending"
                  }
                ],
                "relations": [
                  {
                    "name": "Children",
                    "fields": [
                      "Name"
                    ],
                    "orders": [
                      {
                        "fieldName": "CreatedOn",
                        "order": "Descending"
                      }
                    ],
                    "fromLink": false
                  }
                ],
                "fromLink": false,
                "paging": {
                  "from": 0,
                  "limit": 10
                }
              }`,
            "Clarizen One Relation Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/RelationQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    //5rva6iier3e0ncl9yl6xs5ude3723 projetc id

    clarizenOneRepliesQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/RepliesQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "postId": "/DiscussionPost/ExternalId",
                "fields": [
                  "Body",
                  "CreatedOn",
                  "CreatedBy"
                ],
                "feedItemOptions": [
                  "Default",
                  "BodyMarkup",
                  "Summary"
                ],
                "paging": {
                  "from": 0,
                  "limit": 10
                }
              }`,
            "Clarizen One Replies Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/RepliesQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneRetrieveMultiple = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/RetrieveMultiple",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "fields": [
                    "Name",
                    "Manager",
                    "Project"
                ],
                "ids": [
                    "/Task/ExternalId1",
                    "/Task/ExternalId2",
                    "etc."
                ]
            }`,
            "Clarizen One Retrieve Multiple",
            `<a href="https://api.clarizen.com/V2.0/services/data/RetrieveMultiple" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneSearch = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            `{{context.server.endpointUrlPrefix}}/data/Search?typeName=WorkItem&q=search term&fields=Name,Duration`,
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Search",
            `<a href="https://api.clarizen.com/V2.0/services/data/Search" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneTimesheetQuery = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/TimesheetQuery",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "projectId": "/Project/ExternalId",
                "iAmTheApprover": false,	
                "workItems": [],	
                "timesheetState": "PendingApproval",	
                "typeName": "WorkItem",
                "fields": [
                    "Duration",
                    "ReportedDate",
                    "ReportedBy.Name"
                ],
                "orders": [
                    {
                        "fieldName": "ReportedDate",
                        "order": "Descending"
                    }
                ],
                "relations": [],
                "deleted": false,
                "originalExternalID": true,	
                "paging": {
                    "from": 0,
                    "limit": 100
                }
            }`,
            "Clarizen One Timesheet Query",
            `<a href="https://api.clarizen.com/V2.0/services/data/TimesheetQuery" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneUpsert = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/data/Upsert",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "insertEntity": {
                    "Id": "/Task/customExternalIdThatCanBeLeftBlank",
                    "Parent": "/Milestone/ExternalId",
                    "Name": "Task Name",
                    "StartDate": "2020-12-01",
                    "Duration": {
                        "value": 3,
                        "unit": "Days"
                    }
                } 
            }`,
            "Clarizen One Upsert",
            `<a href="https://api.clarizen.com/V2.0/services/data/Upsert" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    
    clarizenOneDownload = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/files/Download?documentId=/Document/ExternalId&redirect=false",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Download",
            `<a href="https://api.clarizen.com/V2.0/services/files/Download" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneGetUploadUrl = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/files/GetUploadUrl",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Get Upload URL",
            `<a href="https://api.clarizen.com/V2.0/services/files/GetUploadUrl" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneUpdateImage = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/files/UpdateImage",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "entityId": "/Project/ExternalId",
                "uploadUrl": "URL received when using the Get Upload Url API endpoint"
            }`,
            "Clarizen One Update Image",
            `<a href="https://api.clarizen.com/V2.0/services/files/UpdateImage" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneUpload = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/files/Upload",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "documentId": "/Document/ExternalId",
                "fileInformation": {
                    "storage": {
                        "server": "",
                        "url": "",
                        "link": ""
                    },
                    "url": "",
                    "fileName": "",
                    "subType": "",
                    "extendedInfo": ""
                },
                "uploadUrl": "URL received when using the GetUploadUrl API endpoint"
            }`,
            "Clarizen One Upload",
            `<a href="https://api.clarizen.com/V2.0/services/files/Upload" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneDescribeEntities = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/metadata/DescribeEntities?typeNames=Project,Customer,EnhancementRequest",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Describe Entities",
            `<a href="https://api.clarizen.com/V2.0/services/metadata/DescribeEntities" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneDescribeEntityRelations = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/metadata/DescribeEntityRelations",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "typeNames": [
                    "Project"
                ]
            }`,
            "Clarizen One Describe Entity Relations",
            `<a href="https://api.clarizen.com/V2.0/services/metadata/DescribeEntityRelations" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneDescribeMetadata = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/metadata/DescribeMetadata?typeNames=Project,User&flags=fields,relations",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Describe Metadata",
            `<a href="https://api.clarizen.com/V2.0/services/metadata/DescribeMetadata" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneListEntities = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/metadata/ListEntities",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One List Entities",
            `<a href="https://api.clarizen.com/V2.0/services/metadata/ListEntities" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneCreateWorkflowRule = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "PUT",
            "{{context.server.endpointUrlPrefix}}/metadata/Objects/Workflow",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "forType": "Project",
                "name": "Workflow rule name",
                "description": "Workflow rule description",
                "triggerType": "CreateOrEdit",
                "criteria": "IsChanged($Name)",
                "action": {
                    "url": "API endpont URL",
                    "headers": "Content-Type: application/json\\nAuthorization: Session xxx",
                    "method": "POST",
                    "body" : "Request body"
                }
            }`,
            "Clarizen One Create Workflow Rule",
            `<a href="https://api.clarizen.com/V2.0/services/metadata/Objects" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneDeleteWorkflowRule = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "DELETE",
            "{{context.server.endpointUrlPrefix}}/metadata/Objects/Workflow/ExternalId",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Delete Workflow Rule",
            `<a href="https://api.clarizen.com/V2.0/services/metadata/Objects" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneGetApplicationStatus = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/applications/GetApplicationStatus?applicationId=ApplicationId",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One Get Application Status",
            `<a href="https://api.clarizen.com/V2.0/services/applications/GetApplicationStatus" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneInstallApplication = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/applications/InstallApplication",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "applicationId": "ApplicationId",
                "autoEnable": true
            }`,
            "Clarizen One Install Application",
            `<a href="https://api.clarizen.com/V2.0/services/applications/InstallApplication" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneAppLogin = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "GET",
            "{{context.server.endpointUrlPrefix}}/utils/AppLogin",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{}`,
            "Clarizen One App Login",
            `<a href="https://api.clarizen.com/V2.0/services/utils/AppLogin" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }

    clarizenOneSendEmail = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "{{context.server.endpointUrlPrefix}}/utils/SendEmail",
            `{"Authorization": "Session {{context.server.sessionId}}"}`,
            `{
                "subject": "Email subject",	
                "body": "Email body",	
                "recipients": [
                    {
                        "recipientType": "To",
                        "user": "/User/ExternalId",	
                        "eMail": "Email address"
                    }
                ],
                "relatedEntity": "/Project/ExternalId",	
                "accessType": "Private"
            }`,
            "Clarizen One Send Email",
            `<a href="https://api.clarizen.com/V2.0/services/utils/SendEmail" target="_blank">Documentation</a>`,
            "min-width: 200px; padding: 20px 0px;"
        );
    }


    clarizenOneLoginUsProdTemplate = (parentAddress, level, order) => {
        return this.presetApiCallTemplate(parentAddress, level, order, 
            "POST",
            "https://api.clarizen.com/V2.0/services/authentication/Login",
            "{}",
            `{"username": "rolandas.demo", "password": "S1aptazodis"}`,
            "Clarizen One Login US Prod"
        );
    }


    
    userInputFormTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Form Title": {
                    type: "textInput",
                    stringValue: "Please fill out the form below",
                    value: "Please fill out the form below",
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts HTML.',
                    placeholder: "Enter a title for the input form in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                },
                "Form Size and Position": {
                    type: "textInput",
                    stringValue: "width:80%;height:80%;top:10%;left:10%;",
                    value: "width:80%;height:80%;top:10%;left:10%;",
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts CSS styling for form size and position.',
                    placeholder: "Enter size and position for the input form in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                },
                "Form": {
                    type: "userInputForm",
                    form: this.userInputFormSubform(parentAddress, level, order, 1),
                    validationType: "userInputForm"
                }
            },
            name: "User Input Form",
            type: "userInputForm",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: true
        }
    }

    userInputFormSubform = (parentAddress, level, order, variableNumber) => {
        let subform = {};
        subform[`Variable ${variableNumber} Description`] = {
            type: "textArea",
            stringValue: "",
            value: null,
            mandatory: false,
            error: null,
            tooltip: 'This field accepts HTML.',
            placeholder: "Enter the description user will see in the form...",
            style: "padding-left:0px",
            locked: false,
            validationType: "text"
        };
        subform[`Variable ${variableNumber} Label`] = {
            type: "textInput",
            stringValue: "form" + ("Var" + parentAddress + order).toString().replace(/\./g, "_") + `_${variableNumber}`,
            value: "form" + ("Var" + parentAddress + order).toString().replace(/\./g, "_") + `_${variableNumber}`,
            mandatory: true,
            error: null,
            tooltip: 'This field accepts HTML.',
            placeholder: "Enter the label user will see in the form in this field...",
            style: "padding-left:0px",
            locked: false,
            validationType: "text"
        };
        subform[`Variable ${variableNumber} Name`] = {
            type: "textInput",
                stringValue: "form" + ("Var" + parentAddress + order).toString().replace(/\./g, "_") + `_${variableNumber}`,
                value: "form" + ("Var" + parentAddress + order).toString().replace(/\./g, "_") + `_${variableNumber}`,
                mandatory: true,
                error: null,
                tooltip: "You will be able to access this variable in the following steps. This should be an alphanumeric string (underscores are also allowed).",
                placeholder: "Enter the variable name here...",
                style: "padding-left:0px",
                locked: false,
                validationType: "varName"
        };
        subform[`Variable ${variableNumber} Default`] = {
            type: "textInput",
                stringValue: "",
                value: null,
                mandatory: false,
                error: null,
                tooltip: "This value will be assigned to the variable by default. This field accepts JavaScript.",
                placeholder: "Enter the default value for the variable here...",
                style: "padding-left:0px",
                locked: false,
                validationType: "js"
        };
        subform[`Variable ${variableNumber} Mandatory`] = {
            type: "textInput",
                stringValue: "true",
                value: true,
                mandatory: true,
                error: null,
                tooltip: 'This field accepts JavaScript. The output should be a boolean value (TRUE or FALSE). Nested actions will be repeated while the condition entered remains true or 1,000,000 iterations are exceeded.',
                placeholder: "Enter an expression that evaluates to either TRUE or FALSE and will eventually be FALSE in this field...",
                style: "padding-left:0px",
                locked: false,
                validationType: "booleanJs"
        };
        return subform;
    }

    userInputTemplateAddVariable = (parentAddress, level, order, form) => {
        let variableCount = Object.keys(form).length / 5; //4 inputs per variable
        form = {...form, ...this.userInputFormSubform(parentAddress, level, order, variableCount + 1)};
        return form;
    }

    apiCallTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Variable": {
                    type: "textInput",
                    stringValue: ("var" + parentAddress + order).toString().replace(/\./g, "_"),
                    value: ("var" + parentAddress + order).toString().replace(/\./g, "_"),
                    mandatory: true,
                    error: null,
                    tooltip: "You will be able to access this variable in the following steps. This should be an alphanumeric string (underscores are also allowed).",
                    placeholder: "Enter the variable name here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "varName"
                },
                "Method": {
                    type: "textInput",
                    stringValue: "POST",
                    value: "POST",
                    mandatory: true,
                    error: null,
                    tooltip: "GET, POST, PUT, PATCH or DELETE.",
                    placeholder: "Enter the API method name here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "method"
                },
                "Endpoint": {
                    type: "textInput",
                    stringValue: "",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory.",
                    tooltip: "The URL of an API service. E.g. https://api.clarizen.com/V2.0/services/login",
                    placeholder: "Enter the API service URL here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                },
                "Headers": {
                    type: "textArea",
                    stringValue: "{}",
                    value: {},
                    mandatory: true,
                    error: null,
                    tooltip: 'Headers of the API call in JSON format. E.g. {"Authorization": "Session xxxxx"}',
                    placeholder: "Enter API headers JSON here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "json"
                },
                "Payload": {
                    type: "textArea",
                    stringValue: '{}',
                    value: {},
                    mandatory: true,
                    error: null,
                    tooltip: 'Data in JSON format to be sent to the service. E.g. {"username": "myUsername", "password": "myPassword"}',
                    placeholder: "Enter API payload JSON here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                }
            },
            name: "API Call",
            type: "apiCall",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: false
        }
    }

    importFromExcelTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Variable": {
                    type: "textInput",
                    stringValue: ("var" + parentAddress + order).toString().replace(/\./g, "_"),
                    value: ("var" + parentAddress + order).toString().replace(/\./g, "_"),
                    mandatory: true,
                    error: null,
                    tooltip: "You will be able to access this variable in the following steps. This should be an alphanumeric string (underscores are also allowed).",
                    placeholder: "Enter the variable name here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "varName"
                },
                "Form Size and Position": {
                    type: "textInput",
                    stringValue: "width:40%;height:20%;top:20%;left:30%;",
                    value: "width:40%;height:20%;top:20%;left:30%;",
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts CSS styling for form size and position.',
                    placeholder: "Enter size and position for the input form in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                },
                "Instructions": {
                    type: "textArea",
                    stringValue: "",
                    value: null,
                    mandatory: false,
                    error: null,
                    tooltip: "Instructions for the user.",
                    placeholder: "Enter the instructions here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                }
            },
            name: "Import From Excel",
            type: "importFromExcel",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: true
        }
    }

    presetApiCallTemplate = (parentAddress, level, order, method, endpoint, headers, payload, name, payloadTooltip, payloadTooltipStyle) => {
        let template = this.apiCallTemplate(parentAddress, level, order);
        template.form.Method.stringValue = method;
        template.form.Method.value = method;
        template.form.Endpoint.stringValue = endpoint;
        template.form.Endpoint.value = endpoint;
        template.form.Endpoint.error = null;  
        template.form.Headers.stringValue = JSON.stringify(JSON.parse(headers), null, 2);
        template.form.Headers.value = JSON.parse(headers);
        template.form.Payload.stringValue = JSON.stringify(JSON.parse(payload), null, 2);
        template.form.Payload.value = JSON.parse(payload);
        template.form.Payload.tooltip = typeof payloadTooltip !== "undefined" ? payloadTooltip : template.form.Payload.tooltip;
        template.form.Payload.tooltipStyle = typeof payloadTooltipStyle !== "undefined" ? payloadTooltipStyle : "";
        template.name = name;
        return template;
    }

    conditionalActionListTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Condition": {
                    type: "textArea",
                    stringValue: "true",
                    value: true,
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts JavaScript. The output should be a boolean value (TRUE or FALSE).',
                    placeholder: "Enter an expression that evaluates to either TRUE or FALSE in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "booleanJs"
                }
            },
            name: "Conditional Action List",
            type: "conditional",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: true,
            flow: {}
        }
    }

    whileLoopTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Repeat While": {
                    type: "textArea",
                    stringValue: "true",
                    value: true,
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts JavaScript. The output should be a boolean value (TRUE or FALSE). Nested actions will be repeated while the condition entered remains true or 1,000,000 iterations are exceeded.',
                    placeholder: "Enter an expression that evaluates to either TRUE or FALSE and will eventually be FALSE in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "booleanJs"
                }
            },
            name: "While Loop",
            type: "conditionalWhile",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: true,
            flow: {}
        }
    }

    clarizenOneBulkExecuteInBatchesTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Variable": {
                    type: "textInput",
                    stringValue: ("targetObject" + parentAddress + order).toString().replace(/\./g, "_"),
                    value: ("targetObject" + parentAddress + order).toString().replace(/\./g, "_"),
                    mandatory: true,
                    error: null,
                    tooltip: "You will be able to access this variable in the following steps. This should be an alphanumeric string (underscores are also allowed).",
                    placeholder: "Enter the variable name here...",
                    style: "padding-left:0px",
                    locked: true,
                    validationType: "varName"
                },
                "Source": {
                    type: "textArea",
                    stringValue: "null",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory.",
                    tooltip: 'This field accepts JavaScript. The output should be an iterable (array or object). Element data will be used in Bulk Execute payload generation.',
                    placeholder: "Enter an expression that evaluates to either an array or an object in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "iterableJs"
                },
                "Payload Map": {
                    type: "textArea",
                    stringValue: "null",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory.",
                    tooltip: 'This field accepts JavaScript. The output should be a valid payload in JSON format.',
                    placeholder: "Enter an expression that evaluates to a valid payload in JSON format...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "json"
                },
                "Filter": {
                    type: "textArea",
                    stringValue: "true",
                    value: true,
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts JavaScript. The output should be a boolean value (TRUE or FALSE). Element will be included in the Bulk Execute payload if this evaluates to TRUE.',
                    placeholder: "Enter an expression that evaluates to either TRUE or FALSE...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "booleanJs"
                },
                "Batch Size": {
                    type: "textInput",
                    stringValue: "1000",
                    value: 1000,
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts JavaScript. The output should be an integer. This can be used to split the query into smaller batches in case of poor performance.',
                    placeholder: "Enter an expression that evaluates to an integer...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "integer"
                },
                "Pause Between Batches": {
                    type: "textInput",
                    stringValue: "0",
                    value: 0,
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts JavaScript. The output should be an integer (milliseconds). This can be used to wait before executing each batch of calls in case of poor performance.',
                    placeholder: "Enter an expression that evaluates to an integer (milliseconds)...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "integer"
                }
            },
            name: "Clarizen One Bulk Execute In Batches",
            type: "bulkExecute",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: false
        }
    }

    runOnLoopTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Variable": {
                    type: "textInput",
                    stringValue: ("targetObject" + parentAddress + order).toString().replace(/\./g, "_"),
                    value: ("targetObject" + parentAddress + order).toString().replace(/\./g, "_"),
                    mandatory: true,
                    error: null,
                    tooltip: "You will be able to access this variable in the following steps. This should be an alphanumeric string (underscores are also allowed).",
                    placeholder: "Enter the variable name here...",
                    style: "padding-left:0px",
                    locked: true,
                    validationType: "varName"
                },
                "Run On": {
                    type: "textArea",
                    stringValue: "null",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory.",
                    tooltip: 'This field accepts JavaScript. The output should be an iterable (array or object). Nested actions will be run once for each element of the iterable that matches the filter.',
                    placeholder: "Enter an expression that evaluates to either an array or an object in this field...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "iterableJs"
                },
                "Filter": {
                    type: "textArea",
                    stringValue: "true",
                    value: true,
                    mandatory: true,
                    error: null,
                    tooltip: 'This field accepts JavaScript. The output should be a boolean value (TRUE or FALSE). Nested actions will be run if the filter evaluates to TRUE.',
                    placeholder: "Enter an expression that evaluates to either TRUE or FALSE...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "booleanJs"
                }
            },
            name: "Run On",
            type: "conditionalRunOn",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: false,
            flow: {}
        }
    }

    htmlOutputTemplate = (parentAddress, level, order, customLabel, defaultMessage) => {
        let label = typeof customLabel != "undefined" ? customLabel : "Output";
        let template = {
            id:  this.generateUUID(),
            form: {},
            name: "HTML Output",
            type: "html",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: true
        };
        template.form["Form Size and Position"] = {
            type: "textInput",
            stringValue: "width:80%;height:80%;top:10%;left:10%;",
            value: "width:80%;height:80%;top:10%;left:10%;",
            mandatory: true,
            error: null,
            tooltip: 'This field accepts CSS styling for form size and position.',
            placeholder: "Enter size and position for the input form in this field...",
            style: "padding-left:0px",
            locked: false,
            validationType: "text"
        }
        template.form[label] = {
            type: "textArea",
            stringValue: typeof defaultMessage === "undefined" ? "" : defaultMessage, //`<div style="padding:5px;">API flow executed successfully.</div>`
            value: null,
            mandatory: true,
            error: null,
            tooltip: 'This field accepts HTML. The ouput will be shown when the flow executes successfully.',
            placeholder: "Enter the message here...",
            style: "padding-left:0px",
            locked: false,
            validationType: "html"
        }
        return template;
    }

    setVariableTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "Name": {
                    type: "textInput",
                    stringValue: "",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory",
                    tooltip: 'This field accepts plain text.',
                    placeholder: "Enter a unique name for your variable...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "varName"
                },
                "Value": {
                    type: "textArea",
                    stringValue: "",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory",
                    tooltip: 'This field accepts JavaScript.',
                    placeholder: "Enter a JavaScript expression here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "js"
                }
            },
            name: "Set Variable",
            type: "setVariable",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: false
        }
    }

    jsCodeTemplate = (parentAddress, level, order) => {
        return {
            id:  this.generateUUID(),
            form: {
                "JavaScript": {
                    type: "textArea",
                    stringValue: "",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory",
                    tooltip: 'This field accepts JavaScript.',
                    placeholder: "Enter JavaScript here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "js"
                }
            },
            name: "JavaScript",
            type: "jsCode",
            parentAddress: parentAddress,
            level: level,
            order: order,
            passedSyntaxCheck: false
        }
    }

    newFlowTemplate = () => {
        return {
            id: this.generateUUID(),
            form: {
                "API Flow Name": {
                    type: "textInput",
                    stringValue: "",
                    value: null,
                    mandatory: true,
                    error: "This field is mandatory.",
                    tooltip: "Enter the name for your API flow here.",
                    placeholder: "Enter the name here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                },
                "Description": {
                    type: "textArea",
                    stringValue: "",
                    value: "",
                    mandatory: false,
                    error: null,
                    tooltip: "Enter the description of your API flow here.",
                    placeholder: "Enter the description here...",
                    style: "padding-left:0px",
                    locked: false,
                    validationType: "text"
                }
            },
            type: "app",
            parentAddress: "",
            order: 0,
            name: "test",
            createdOn: new Date(),
            createdBy: null,
            lastUpdatedOn: new Date(),
            lastUpdatedBy: null,
            conditionString: "true",
            condition: true,
            error: null,
            flow: {}
        };
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}