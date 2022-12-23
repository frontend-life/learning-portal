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
  console.log("Events connection writeHead", headers);
  // const data = ` data: ${JSON.stringify(facts)}\n\n`;

  response.write("data: events connected\n\n");
  console.log("Events connection response.write");

  clients[user_id] = response;
  console.log("Events connection clients.push(newClient);");

  request.on("close", () => {
    console.log("Events connection closed");
    delete clients[user_id];
  });
}
function createEventMessage(data: any) {
  return `data: ${typeof data === "string" ? data : JSON.stringify(data)} \n\n`;
}
export function sendLessonsDoneToUser(user_id, newLessonsDone) {
  clients[user_id]?.write(createEventMessage({ lessonsDone: newLessonsDone }));
}
export function sendLessonsOpenToUser(user_id, newLessonsDone) {
  clients[user_id]?.write(createEventMessage({ lessonsOpen: newLessonsDone }));
}
export function sendNewUserDataToUser(user_id, userData) {
  clients[user_id]?.write(createEventMessage({ userData }));
}
