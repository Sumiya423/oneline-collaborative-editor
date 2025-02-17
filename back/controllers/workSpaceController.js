const Container = require("../models/container");
const StickyNote = require("../models/stickyNote");
const Workspace = require("../models/workSpace");

const getWorkspaces = async (req, res, next) => {
  try {
    const newWorkspaces = await Workspace.find();
    res.status(200).json(newWorkspaces);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getWorkspaceByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newWorkspaces = await Workspace.findById(id).populate('createdBy').exec();
    res.status(200).json(newWorkspaces);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


const createWorkspace = async (req, res, next) => {
  const { theme, createdBy } = req.body;

  try {
    const newWorkspace = new Workspace({
      theme,
      createdBy,
    });

    await newWorkspace.save();

    res.json(newWorkspace);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const editWorkspace = async (req, res, next) => {
  const { title, containers } = req.body;
  const { id } = req.params;

  try {
    let workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({ msg: "Workspace not found" });
    }

    for (const containerData of containers) {
      const container = new Container({ owner: containerData.owner });
      console.log(container.id)

      for (const stickyNoteData of containerData.stickyNotes) {
        const stickyNote = new StickyNote(stickyNoteData);

        container.stickyNotes.push(stickyNote);
        await stickyNote.save();
        // console.log(stickyNote.container)
      }
      console.log('later',container)

      workspace.containers.push(container);
      await container.save();
    }
    
    await workspace.save();

    res.json(workspace);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getWorkspaces = getWorkspaces;
exports.getWorkspaceByID = getWorkspaceByID;
exports.createWorkspace = createWorkspace;
exports.editWorkspace = editWorkspace;
