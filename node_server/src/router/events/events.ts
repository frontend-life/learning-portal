import { createEventMessage } from "./utils";

const clients: { id: any } | {} = {};
export function eventsHandler(request, response) {
  const user_id = request.originalUrl.split("=")[1];
  console.log("Events connection started");
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  response.writeHead(200, headers);
  response.write("data: events connected\n\n");

  clients[user_id] = response;

  request.on("close", () => {
    console.log("Events connection closed");
    delete clients[user_id];
  });
}

export function sendLessonsDoneToUser(user_id, newLessonsDone) {
  clients[user_id]?.write(createEventMessage({ lessonsDone: newLessonsDone }));
}
export function sendLessonsOpenToUser(user_id, newLessonsOpened) {
  clients[user_id]?.write(
    createEventMessage({ lessonsOpen: newLessonsOpened })
  );
}
export function sendNewUserDataToUser(user_id, userData) {
  clients[user_id]?.write(createEventMessage({ userData }));
}
