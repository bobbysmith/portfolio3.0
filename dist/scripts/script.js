"use strict";function generateAutomata(){ruleNumber=Math.floor(256*Math.random())+0,background.innerHTML="",ruleSet.innerHTML='The generated background is cellular automata <a href="http://atlas.wolfram.com/01/01/'+ruleNumber+'/">rule '+ruleNumber+"</a>.";var e=document.createElement("div");e.setAttribute("class","row"),background.appendChild(e);for(var t=1;t<background.clientWidth/8;t++){var r=document.createElement("div");e.appendChild(r)}randomizeRow(e);for(var n=1;n<background.clientHeight/8;n++)duplicateRow()}function numbertoBooleanArray(e){for(var t=Number(e).toString(2),r=[];t.length<8;)t=0+t;for(var n=0;n<t.length;n++)r.push(!!parseInt(t[n]));return r}function binary(){return Math.floor(2*Math.random())}function randomizeRow(e){for(var t=0;t<e.childNodes.length;t++){var r=e.childNodes[t];r.classList.add(binary()?"active":"inactive")}}function duplicateRow(){var e=document.querySelectorAll(".row"),t=e[e.length-1],r=t.cloneNode(!0);document.querySelector(".background").appendChild(r),processRow(r,t)}function processRow(e,t){for(var r=0;r<e.childNodes.length;r++)for(var n=e.childNodes[r],o=t.childNodes[r],a=o.previousElementSibling||t.childNodes[t.childNodes.length-1],c=o.nextElementSibling||t.childNodes[0],l=setActiveIfMatchesRule.bind(null,n,a,o,c),u=0;u<rulesIcon.length;u++)l(rulesIcon[u],numbertoBooleanArray(ruleNumber)[u])}function setActiveIfMatchesRule(e,t,r,n,o,a){var c=state(t)===o[0]&&state(r)===o[1]&&state(n)===o[2];c&&toggleActive(e,a)}function state(e){return e.classList.contains("active")?1:0}function toggleActive(e,t){t?(e.classList.remove("inactive"),e.classList.add("active")):(e.classList.remove("active"),e.classList.add("inactive"))}var background=document.querySelector(".background"),row=document.querySelector(".row"),ruleSet=document.querySelector(".rule"),newRuleButton=document.querySelector(".new-rule__button"),rulesIcon=[[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]],ruleNumber=void 0;generateAutomata(),newRuleButton.addEventListener("click",generateAutomata);