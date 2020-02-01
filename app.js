const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "note title",
      demand: true,
      type: "string"
    },
    body: {
      describe: "body of the note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a new Note",
  title: {
    describe: "note title",
    demandOption: true,
    type: "string"
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: "read",
  describe: "Read a new Note",
  builder: {
    title: {
      describe: "title note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "List all Notes",
  handler() {
    notes.listAllNotes();
  }
});

yargs.parse();
