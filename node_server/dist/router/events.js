"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewUserDataToUser = exports.sendLessonsOpenToUser = exports.sendLessonsDoneToUser = exports.eventsHandler = void 0;
let clients = [];
function eventsHandler(request, response) {
    const user_id = request.originalUrl.split("=")[1];
    console.log("Events connected for user_id: " + user_id);
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    response.writeHead(200, headers);
    // const data = ` data: ${JSON.stringify(facts)}\n\n`;
    response.write("data: events connected\n\n");
    const newClient = {
        id: user_id,
        response,
    };
    clients.push(newClient);
    request.on("close", () => {
        console.log(`${user_id} Connection closed`);
        clients = clients.filter((client) => client.id !== user_id);
    });
}
exports.eventsHandler = eventsHandler;
function createEventMessage(data) {
    return `data: ${typeof data === "string" ? data : JSON.stringify(data)} \n\n`;
}
function sendLessonsDoneToUser(user_id, newLessonsDone) {
    var _a;
    const client = clients.find((client) => client.id === user_id);
    (_a = client === null || client === void 0 ? void 0 : client.response) === null || _a === void 0 ? void 0 : _a.write(createEventMessage({ lessonsDone: newLessonsDone }));
}
exports.sendLessonsDoneToUser = sendLessonsDoneToUser;
function sendLessonsOpenToUser(user_id, newLessonsDone) {
    var _a;
    const client = clients.find((client) => client.id === user_id);
    (_a = client === null || client === void 0 ? void 0 : client.response) === null || _a === void 0 ? void 0 : _a.write(createEventMessage({ lessonsOpen: newLessonsDone }));
}
exports.sendLessonsOpenToUser = sendLessonsOpenToUser;
function sendNewUserDataToUser(user_id, userData) {
    var _a;
    const client = clients.find((client) => client.id === user_id);
    (_a = client === null || client === void 0 ? void 0 : client.response) === null || _a === void 0 ? void 0 : _a.write(createEventMessage({ userData }));
}
exports.sendNewUserDataToUser = sendNewUserDataToUser;
