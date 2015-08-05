function request(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.method || "GET", options.pathname, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(null, req.responseText);
    else
      callback(new Error("Request failed: " + req.statusText));
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.body || null);
}

var lastServerTime = 0;

request({pathname: "talks"}, function(error, response) {
  if (error) {
    reportError(error);
  } else {
    response = JSON.parse(response);
    displayTalks(response.talks);
    lastServerTime = response.serverTime;
    waitForChanges();
  }
});

function reportError(error) {
  if (error)
    alert(error.toString());
}

var talkDiv = document.querySelector("#talks");
var shownTalks = Object.create(null);

function displayTalks(talks) {
  talks.forEach(function(talk) {
    var shown = shownTalks[talk.title];
    if (talk.deleted) {
      if (shown) {
        talkDiv.removeChild(shown);
        delete shownTalks[talk.title];
      }
    } else {
      var node = drawTalk(talk);
      if (shown)
        talkDiv.replaceChild(node, shown);
      else
        talkDiv.appendChild(node);
      shownTalks[talk.title] = node;
    }
  });
}

// Exercise 3: Better Templates
// changes in the instantiateTemplate() function
// and commented lines in drawTalk() function 

function instantiateTemplate(name, values) {
  function instantiateText(text) {
    return text.replace(/\{\{(\w+)\}\}/g, function(_, name) {
      return values[name];
    });
  }
  function instantiate(node, context) {
    if(context) values = context;

    if (node.nodeType == document.ELEMENT_NODE) {
      var copy = node.cloneNode();
      for (var i = 0; i < node.childNodes.length; i++){
        if(node.childNodes[i].attributes && 'template-repeat' in node.childNodes[i].attributes){
          var items = node.childNodes[i].attributes['template-repeat'].value;
          values[items].forEach(function(item){
            copy.appendChild(instantiate(node.childNodes[i], item));
          });
        } else {
          copy.appendChild(instantiate(node.childNodes[i]));
        }
        
      }
      return copy;
    } else if (node.nodeType == document.TEXT_NODE) {
      return document.createTextNode(
               instantiateText(node.nodeValue));
    } else {
      return node;
    }
  }

  // var template = document.querySelector("#template ." + name);
  return instantiate(template);
}

function drawTalk(talk) {
  var node = instantiateTemplate("talk", talk);
  // var comments = node.querySelector(".comments");
  // talk.comments.forEach(function(comment) {
  //   comments.appendChild(
  //     instantiateTemplate("comment", comment));
  // });

  node.querySelector("button.del").addEventListener(
    "click", deleteTalk.bind(null, talk.title));

  var form = node.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    addComment(talk.title, form.elements.comment.value);
    form.reset();
  });

  // NB. Exercise 2: Comment Field Reset
  // saving of the comment field value works in different browsers
  // because implemented via local storage
  var commentField = form.elements.comment;
  commentField.value = localStorage.getItem('comment' + talk.title) || "";
  commentField.addEventListener("change", function(){
    localStorage.setItem('comment' + talk.title, commentField.value);
  });

  return node;
}


function talkURL(title) {
  return "talks/" + encodeURIComponent(title);
}

function deleteTalk(title) {
  request({pathname: talkURL(title), method: "DELETE"},
          reportError);
}





function addComment(title, comment) {
  var comment = {author: nameField.value, message: comment};
  localStorage.setItem('comment' + title, "");
  request({pathname: talkURL(title) + "/comments",
           body: JSON.stringify(comment),
           method: "POST"},
          reportError);
}

var nameField = document.querySelector("#name");

nameField.value = localStorage.getItem("name") || "";

nameField.addEventListener("change", function() {
  localStorage.setItem("name", nameField.value);
});

var talkForm = document.querySelector("#newtalk");

talkForm.addEventListener("submit", function(event) {
  event.preventDefault();
  request({pathname: talkURL(talkForm.elements.title.value),
           method: "PUT",
           body: JSON.stringify({
             presenter: nameField.value,
             summary: talkForm.elements.summary.value
           })}, reportError);
  talkForm.reset();
});

function waitForChanges() {
  request({pathname: "talks?changesSince=" + lastServerTime},
          function(error, response) {
    if (error) {
      setTimeout(waitForChanges, 2500);
      console.error(error.stack);
    } else {
      response = JSON.parse(response);
      displayTalks(response.talks);
      lastServerTime = response.serverTime;
      waitForChanges();
    }
  });
}
