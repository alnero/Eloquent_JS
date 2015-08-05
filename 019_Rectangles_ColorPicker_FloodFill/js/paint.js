function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    for (var attr in attributes)
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}

var controls = Object.create(null);

function createPaint(parent) {
  var canvas = elt("canvas", {width: 500, height: 300});
  var cx = canvas.getContext("2d");
  var toolbar = elt("div", {class: "toolbar"});
  for (var name in controls)
    toolbar.appendChild(controls[name](cx));

  var panel = elt("div", {class: "picturepanel"}, canvas);
  parent.appendChild(elt("div", null, panel, toolbar));
}

var tools = Object.create(null);

controls.tool = function(cx) {
  var select = elt("select");
  for (var name in tools)
    select.appendChild(elt("option", null, name));

  cx.canvas.addEventListener("mousedown", function(event) {
    if (event.which == 1) {
      tools[select.value](event, cx);
      event.preventDefault();
    }
  });

  return elt("span", null, "Tool: ", select);
};

function relativePos(event, element) {
  var rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left),
          y: Math.floor(event.clientY - rect.top)};
}

function trackDrag(onMove, onEnd) {
  function end(event) {
    removeEventListener("mousemove", onMove);
    removeEventListener("mouseup", end);
    if (onEnd)
      onEnd(event);
  }
  addEventListener("mousemove", onMove);
  addEventListener("mouseup", end);
}

tools.Line = function(event, cx, onEnd) {
  cx.lineCap = "round";

  var pos = relativePos(event, cx.canvas);
  trackDrag(function(event) {
    cx.beginPath();
    cx.moveTo(pos.x, pos.y);
    pos = relativePos(event, cx.canvas);
    cx.lineTo(pos.x, pos.y);
    cx.stroke();
  }, onEnd);
};

tools.Erase = function(event, cx) {
  cx.globalCompositeOperation = "destination-out";
  tools.Line(event, cx, function() {
    cx.globalCompositeOperation = "source-over";
  });
};

controls.color = function(cx) {
  var input = elt("input", {type: "color", id: "color"});
  input.addEventListener("change", function() {
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return elt("span", null, "Color: ", input);
};

controls.brushSize = function(cx) {
  var select = elt("select");
  var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
  sizes.forEach(function(size) {
    select.appendChild(elt("option", {value: size},
                           size + " pixels"));
  });
  select.addEventListener("change", function() {
    cx.lineWidth = select.value;
  });
  return elt("span", null, "Brush size: ", select);
};

controls.save = function(cx) {
  var link = elt("a", {href: "/"}, "Save");
  function update() {
    try {
      link.href = cx.canvas.toDataURL();
    } catch (e) {
      if (e instanceof SecurityError)
        link.href = "javascript:alert(" +
          JSON.stringify("Can't save: " + e.toString()) + ")";
      else
        throw e;
    }
  }
  link.addEventListener("mouseover", update);
  link.addEventListener("focus", update);
  return link;
};

function loadImageURL(cx, url) {
  var image = document.createElement("img");
  image.addEventListener("load", function() {
    var color = cx.fillStyle, size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image, 0, 0);
    cx.fillStyle = color;
    cx.strokeStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;
}

controls.openFile = function(cx) {
  var input = elt("input", {type: "file"});
  input.addEventListener("change", function() {
    if (input.files.length == 0) return;
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      loadImageURL(cx, reader.result);
    });
    reader.readAsDataURL(input.files[0]);
  });
  return elt("div", null, "Open file: ", input);
};

controls.openURL = function(cx) {
  var input = elt("input", {type: "text"});
  var form = elt("form", null,
                 "Open URL: ", input,
                 elt("button", {type: "submit"}, "load"));
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    loadImageURL(cx, input.value);
  });
  return form;
};

tools.Text = function(event, cx) {
  var text = prompt("Text:", "");
  if (text) {
    var pos = relativePos(event, cx.canvas);
    cx.font = Math.max(7, cx.lineWidth) + "px sans-serif";
    cx.fillText(text, pos.x, pos.y);
  }
};

tools.Spray = function(event, cx) {
  var radius = cx.lineWidth / 2;
  var area = radius * radius * Math.PI;
  var dotsPerTick = Math.ceil(area / 30);

  var currentPos = relativePos(event, cx.canvas);
  var spray = setInterval(function() {
    for (var i = 0; i < dotsPerTick; i++) {
      var offset = randomPointInRadius(radius);
      cx.fillRect(currentPos.x + offset.x,
                  currentPos.y + offset.y, 1, 1);
    }
  }, 25);
  trackDrag(function(event) {
    currentPos = relativePos(event, cx.canvas);
  }, function() {
    clearInterval(spray);
  });
};

function randomPointInRadius(radius) {
  for (;;) {
    var x = Math.random() * 2 - 1;
    var y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1)
      return {x: x * radius, y: y * radius};
  }
}

tools.Rectangle = function(event, cx, onEnd){
  var pos = relativePos(event, cx.canvas);
  
  var preview = elt('div');
  var previewX = event.pageX;
  var previewY = event.pageY;
  
  preview.style.position = 'absolute';
  preview.style.background = cx.fillStyle;
  preview.style.left = previewX + "px";
  preview.style.top = previewY + "px";

  trackDrag(function(event) {
    preview.style.left = (event.pageX < previewX ? event.pageX : previewX) + "px";
    preview.style.top = (event.pageY < previewY ? event.pageY : previewY) + "px";

    preview.style.width = Math.abs(event.pageX - previewX) + "px";
    preview.style.height = Math.abs(event.pageY - previewY) + "px";
    document.body.appendChild(preview);
  }, function(event){
    var endPos = relativePos(event, cx.canvas);
    var x = (endPos.x > pos.x ? pos.x : endPos.x);
    var y = (endPos.y > pos.y ? pos.y : endPos.y);

    var width =  Math.abs(endPos.x - pos.x);
    var height = Math.abs(endPos.y - pos.y);

    if(preview.parentNode === document.body) document.body.removeChild(preview);
    cx.fillRect(x, y, width, height);
  });
};   

tools.PickColor = function(event, cx){
  var pos = relativePos(event, cx.canvas);
  try {
    var data = cx.getImageData(pos.x, pos.y, 1, 1).data;
  } catch (e) {
    if (e instanceof SecurityError)
      alert(JSON.stringify("Can't save: " + e.toString()));
    else
      throw e;
  }
  
  var rgbArr = Array.prototype.slice.call(data, 0, 3); // ignore alpha channel
  
  var hexColor = rgbArr.map(function(value){
    var color = value.toString(16);
    if(color.length === 1){
      return 0 + color;
    } 
    return color;
  }).reduce(function(hex, next){
    return hex + next;
  }, "#");

  cx.fillStyle = hexColor;
  cx.strokeStyle = hexColor;;

  document.getElementById('color').value = hexColor;
}

tools.Flood = function(event, cx){
  var pos = relativePos(event, cx.canvas);
  var width = cx.canvas.width;
  var maxPixel = cx.canvas.width * cx.canvas.height;

  var imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height).data;

  var initColor = cx.getImageData(pos.x, pos.y, 1, 1).data;
  cx.fillRect(pos.x, pos.y, 1, 1);

  var busy = [];
  var done = [];
  var startPixel = pos.x + width * pos.y;
  
  busy.push(startPixel);
  done[startPixel] = true;

  while(busy.length){
    var pixel = busy.pop();
    
    if(pixel < 0 || pixel >= maxPixel) continue;

    var neighbours = getNeighbours(pixel, width);

    neighbours.forEach(function(neighbour){
      if(done[neighbour]) return;
      
      var neighbourColor = getColor(neighbour * 4, imageData);
      
      if(equalPixels(neighbourColor, initColor)){
        busy.push(neighbour);
        var y = Math.floor(neighbour / width);
        var x = Math.floor(neighbour - y * width);
        cx.fillRect(x, y, 1, 1);
        done[neighbour] = true;
      }
    });
  }

  function getColor(index, imageData){
    var result = [];
    for(var i = 0; i < 4; i++){
        result.push(imageData[index + i])
    }
    return result;
  }

  function equalPixels(a, b){
    for(var i = 0; i < 4; i++){
      if(a[i] !== b[i]) return false;
    }
    return true;
  }

  function getNeighbours(index, width){
    var result = [];
    result.push(index - width);
    result.push(index + 1);
    result.push(index + width);
    result.push(index - 1);
    return result;
  }

  
}