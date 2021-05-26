var webSocket = null;
var ws_protocol = null;
var ws_hostname = null;
var ws_port = null;
var ws_endpoint = null;
/**
 * Event handler for clicking on button "Connect"
 */
function onConnectClick() {
  var ws_protocol = document.getElementById("protocol").value;
  var ws_hostname = document.getElementById("hostname").value;
  var ws_port = document.getElementById("port").value;
  var ws_endpoint = document.getElementById("endpoint").value;
  openWSConnection(ws_protocol, ws_hostname, ws_port, ws_endpoint);
}
/**
 * Event handler for clicking on button "Disconnect"
 */
function onDisconnectClick() {
  webSocket.close();
}
/**
 * Open a new WebSocket connection using the given parameters
 */
function openWSConnection(protocol, hostname, port, endpoint) {
  var webSocketURL = null;
  webSocketURL = protocol + "://" + hostname + ":" + port + endpoint;
  console.log("openWSConnection::Connecting to: " + webSocketURL);
  try {
    webSocket = io(webSocketURL);
    console.log('--webSocket--');
    console.dir(webSocket, { depth: null, colors: true });

    webSocket.on('new parameters', (parameters) => {
      console.dir(parameters, { depth: null, colors: true });

      template = document.getElementById('template').innerHTML;

      renderTemplate(parameters, template);

        //simulate onclose - need to remove!!!
        setTimeout(() => webSocket.close(1000, "bye Bye"), 10000);

    });

      webSocket.on('connect_failed', (details) => {
      console.log("WebSocket CONNECTION FAILED: " + JSON.stringify(details, null, 4));

      ////add spiner template when connect_failed///
        template = document.getElementById('template-spinner').innerHTML;
        renderTemplate(false, template);
      ///////

    });

    webSocket.on('error', (details) => {
      console.log("WebSocket ERROR: " + JSON.stringify(details, null, 4));
    });

    webSocket.onopen = function (openEvent) {
      console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));
      document.getElementById("btnSend").disabled = false;
      document.getElementById("btnConnect").disabled = true;
      document.getElementById("btnDisconnect").disabled = false;
    };
    webSocket.onclose = function (closeEvent) {
      console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));

      // document.getElementById("btnSend").disabled = true;
      // document.getElementById("btnConnect").disabled = false;
      // document.getElementById("btnDisconnect").disabled = true;

        ////add spiner template when connect_failed///
        template = document.getElementById('template-spinner').innerHTML;
        renderTemplate(false, template);


    };
    webSocket.onerror = function (errorEvent) {
      console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
    };
    webSocket.onmessage = function (messageEvent) {
      var wsMsg = messageEvent.data;
      console.log("WebSocket MESSAGE: " + wsMsg);
      if (wsMsg.indexOf("error") > 0) {
        document.getElementById("incomingMsgOutput").value += "error: " + wsMsg.error + "\r\n";
      } else {
        document.getElementById("incomingMsgOutput").value += "message: " + wsMsg + "\r\n";
      }
    };
  } catch (exception) {
    console.error(exception);
    webSocket.close();
  }
}
/**
 * Send a message to the WebSocket server
 */
function onSendClick() {
  if (webSocket.readyState !== WebSocket.OPEN) {
    console.error("webSocket is not open: " + webSocket.readyState);
    webSocket.close();
    return;
  }
  var msg = document.getElementById("message").value;
  webSocket.send(msg);
}

function renderTemplate(data, templ) {
  // get the EJS template as a string
  console.log('EJS template:');
  // console.log(templ);
  // data to output to the template function
  // var data = { names: ['loki', 'tobi', 'jane'] };
  // stores the rendered HTML
  var html = ejs.compile(templ)(data);
  console.log('Rendered HTML:');
  // console.log(html);
  // inject the rendered data to <body>
  document.getElementById('output').innerHTML = html;
  console.log('HTML injected to id=output');
}
