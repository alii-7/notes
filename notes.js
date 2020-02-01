const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicate = notes.find(note => {
    return note.title === title;
  });

  debugger;

  if (!duplicate) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("note added"));
  } else {
    console.log(chalk.red.inverse("note taken"));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const filteredNotes = notes.filter(note => {
    return note.title !== title;
  });

  if (notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse("note removed:", title));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.red.inverse("no notes were removed"));
  }
};

const listAllNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse("Your Notes"));
  notes.forEach((note, index) => {
    console.log("note " + index + ": " + note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();

  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(
      chalk.green.inverse("note title: ", note.title, " note body: ", note.body)
    );
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
  addNotes,
  removeNote,
  listAllNotes,
  readNote
};
