export function createEventMessage(data: any) {
  return `data: ${typeof data === "string" ? data : JSON.stringify(data)} \n\n`;
}
