"use strict";!function(){var n=window.API_TOKEN,t=window.API_SERVER,e=function(e,o){o=o||{},o.token=n;var r=t+e;return fetch(r,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(o)}).then(function(n){return n.json()}).then(function(n){return n.state?n.value:Promise.reject(n.reason)})};window.IRIS=window.IRIS||{},window.IRIS.webwidget={getTerminals:function(){return e("/agent/info").then(function(n){return n.ws_available})},getTerminalLayout:function(n){return e("/terminal/bootstrap",{workstation:n}).then(function(n){return n.views})},getTerminalFields:function(n){return e("/terminal/bootstrap",{workstation:n}).then(function(n){return n})},getAvailableDays:function(n){return e("/prebook/available-days",n)},getDaySlots:function(n){return e("/prebook/ticket-observe",n).then(function(n){return n.slots})},confirmTicket:function(n){return e("/prebook/ticket-confirm",n)}}}();