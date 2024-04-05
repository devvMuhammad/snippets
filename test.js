const fs = require("fs");

const mcqs = JSON.parse(fs.readFileSync("physics-mohd.json", "utf-8"));
mcqs[0].questions.forEach((question) => {
  if (question.options.A) {
    question.answer = question.options[question.answer];
    question.options = Object.values(question.options);
  }
});

fs.writeFile("physics-mohd.json", JSON.stringify(mcqs, null, 2), (err) => {
  if (err) console.log(err);
  console.log("Done");
});
