var editArea = document.getElementById('editArea');
var files = document.getElementById('files');
var fileToSave = document.getElementById('fileToSave');

var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:8000/');
req.send(null);

req.addEventListener('load', function(){
	var list = req.responseText.split('\n');

	list.forEach(function(fileName){
		var optionNode = document.createElement('option');
		var textNode = document.createTextNode(fileName);
		optionNode.value = fileName;
		optionNode.appendChild(textNode);
		files.appendChild(optionNode);
	});

	files.addEventListener('click', function(){
		getFile(files.value);
		fileToSave.value = files.value;
	});
});

function getFile(name){
	var req = new XMLHttpRequest();
	req.open('GET', 'http://localhost:8000/' + name);
	req.send(null);
	req.addEventListener('load', function(){
		editArea.value = req.responseText;
	});
}

function saveFile(){
	var text = editArea.value;
	var fileName = fileToSave.value;
	var req = new XMLHttpRequest();
	req.open('PUT', "http://localhost:8000/" + fileName);
	req.send(text);
}