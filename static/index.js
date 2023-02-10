let workspace = Blockly.inject("blocklyDiv", {
  toolbox: toolbox,
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: "start",
  css: true,
  // media: "../blockly/media/",
  rtl: false,
  scrollbars: true,
  sounds: false,
  oneBasedIndex: true,
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
});

var socket = io();
socket.on("generatedCode", function(code){
  console.log("Generated code:", code);
});

document.getElementById("codebt").addEventListener("click", function() {
  let code = Blockly.Python.workspaceToCode(workspace);
  document.getElementById('res').value = code;
  socket.emit("generateCode", code);
});

document.getElementById("jsonbt").addEventListener("click", function() {
  let code = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
  document.getElementById('res').value = code;
  socket.emit("generateCode", code);
});

document.getElementById("loadbt").addEventListener("click", function() {
  try {
    Blockly.serialization.workspaces.load(JSON.parse(document.getElementById('res').value), workspace);
  }
  catch {
    console.log("ERROR");
  }
});

window.addEventListener('resize', function() {
  Blockly.svgResize(workspace);
});