process.on("SIGTERM", () => {
  console.log("SIGTERM signal received but I will ignore it");
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received but I will ignore it");
});

console.log("I have started");

setInterval(() => {
  console.log("I am still alive");
}, 60 * 1000);
