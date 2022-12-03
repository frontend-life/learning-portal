let clients: Array<{ id: number; response: any }> = [];
export function eventsHandler(request, response) {
  const user_id = request.originalUrl.split("=")[1];
  console.log(user_id);
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
function createEventMessage(data: any) {
  return `data: ${typeof data === "string" ? data : JSON.stringify(data)} \n\n`;
}
export function sendLessonsDoneToUser(user_id, newLessonsDone) {
  const client = clients.find((client) => client.id === user_id);
  client?.response?.write(createEventMessage({ lessonsDone: newLessonsDone }));
}
export function sendLessonsOpenToUser(user_id, newLessonsDone) {
  const client = clients.find((client) => client.id === user_id);
  client?.response?.write(createEventMessage({ lessonsOpen: newLessonsDone }));
}