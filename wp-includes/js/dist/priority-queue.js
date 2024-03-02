(function(){var __webpack_modules__=({3159:(function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_FACTORY__=(factory),__WEBPACK_AMD_DEFINE_RESULT__=(typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__)):__WEBPACK_AMD_DEFINE_FACTORY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}}(function(){'use strict';var scheduleStart,throttleDelay,lazytimer,lazyraf;var root=typeof window!='undefined'?window:typeof __webpack_require__.g!=undefined?__webpack_require__.g:this||{};var requestAnimationFrame=root.cancelRequestAnimationFrame&&root.requestAnimationFrame||setTimeout;var cancelRequestAnimationFrame=root.cancelRequestAnimationFrame||clearTimeout;var tasks=[];var runAttempts=0;var isRunning=false;var remainingTime=7;var minThrottle=35;var throttle=125;var index=0;var taskStart=0;var tasklength=0;var IdleDeadline={get didTimeout(){return false;},timeRemaining:function(){var timeRemaining=remainingTime-(Date.now()-taskStart);return timeRemaining<0?0:timeRemaining;},};var setInactive=debounce(function(){remainingTime=22;throttle=66;minThrottle=0;});function debounce(fn){var id,timestamp;var wait=99;var check=function(){var last=(Date.now())-timestamp;if(last<wait){id=setTimeout(check,wait-last);}else{id=null;fn();}};return function(){timestamp=Date.now();if(!id){id=setTimeout(check,wait);}};}
function abortRunning(){if(isRunning){if(lazyraf){cancelRequestAnimationFrame(lazyraf);}
if(lazytimer){clearTimeout(lazytimer);}
isRunning=false;}}
function onInputorMutation(){if(throttle!=125){remainingTime=7;throttle=125;minThrottle=35;if(isRunning){abortRunning();scheduleLazy();}}
setInactive();}
function scheduleAfterRaf(){lazyraf=null;lazytimer=setTimeout(runTasks,0);}
function scheduleRaf(){lazytimer=null;requestAnimationFrame(scheduleAfterRaf);}
function scheduleLazy(){if(isRunning){return;}
throttleDelay=throttle-(Date.now()-taskStart);scheduleStart=Date.now();isRunning=true;if(minThrottle&&throttleDelay<minThrottle){throttleDelay=minThrottle;}
if(throttleDelay>9){lazytimer=setTimeout(scheduleRaf,throttleDelay);}else{throttleDelay=0;scheduleRaf();}}
function runTasks(){var task,i,len;var timeThreshold=remainingTime>9?9:1;taskStart=Date.now();isRunning=false;lazytimer=null;if(runAttempts>2||taskStart-throttleDelay-50<scheduleStart){for(i=0,len=tasks.length;i<len&&IdleDeadline.timeRemaining()>timeThreshold;i++){task=tasks.shift();tasklength++;if(task){task(IdleDeadline);}}}
if(tasks.length){scheduleLazy();}else{runAttempts=0;}}
function requestIdleCallbackShim(task){index++;tasks.push(task);scheduleLazy();return index;}
function cancelIdleCallbackShim(id){var index=id-1-tasklength;if(tasks[index]){tasks[index]=null;}}
if(!root.requestIdleCallback||!root.cancelIdleCallback){root.requestIdleCallback=requestIdleCallbackShim;root.cancelIdleCallback=cancelIdleCallbackShim;if(root.document&&document.addEventListener){root.addEventListener('scroll',onInputorMutation,true);root.addEventListener('resize',onInputorMutation);document.addEventListener('focus',onInputorMutation,true);document.addEventListener('mouseover',onInputorMutation,true);['click','keypress','touchstart','mousedown'].forEach(function(name){document.addEventListener(name,onInputorMutation,{capture:true,passive:true});});if(root.MutationObserver){new MutationObserver(onInputorMutation).observe(document.documentElement,{childList:true,subtree:true,attributes:true});}}}else{try{root.requestIdleCallback(function(){},{timeout:0});}catch(e){(function(rIC){var timeRemainingProto,timeRemaining;root.requestIdleCallback=function(fn,timeout){if(timeout&&typeof timeout.timeout=='number'){return rIC(fn,timeout.timeout);}
return rIC(fn);};if(root.IdleCallbackDeadline&&(timeRemainingProto=IdleCallbackDeadline.prototype)){timeRemaining=Object.getOwnPropertyDescriptor(timeRemainingProto,'timeRemaining');if(!timeRemaining||!timeRemaining.configurable||!timeRemaining.get){return;}
Object.defineProperty(timeRemainingProto,'timeRemaining',{value:function(){return timeRemaining.get.call(this);},enumerable:true,configurable:true,});}})(root.requestIdleCallback)}}
return{request:requestIdleCallbackShim,cancel:cancelIdleCallbackShim,};}));})});var __webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(cachedModule!==undefined){return cachedModule.exports;}
var module=__webpack_module_cache__[moduleId]={exports:{}};__webpack_modules__[moduleId](module,module.exports,__webpack_require__);return module.exports;}
!function(){__webpack_require__.d=function(exports,definition){for(var key in definition){if(__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)){Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});}}};}();!function(){__webpack_require__.g=(function(){if(typeof globalThis==='object')return globalThis;try{return this||new Function('return this')();}catch(e){if(typeof window==='object')return window;}})();}();!function(){__webpack_require__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}}();!function(){__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined'&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});}
Object.defineProperty(exports,'__esModule',{value:true});};}();var __webpack_exports__={};!function(){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{createQueue:function(){return createQueue;}});var requestidlecallback=__webpack_require__(3159);;function createRequestIdleCallback(){if(typeof window==='undefined'){return callback=>{setTimeout(()=>callback(Date.now()),0);};}
return window.requestIdleCallback;}
var request_idle_callback=(createRequestIdleCallback());;const createQueue=()=>{const waitingList=new Map();let isRunning=false;const runWaitingList=deadline=>{for(const[nextElement,callback]of waitingList){waitingList.delete(nextElement);callback();if('number'===typeof deadline||deadline.timeRemaining()<=0){break;}}
if(waitingList.size===0){isRunning=false;return;}
request_idle_callback(runWaitingList);};const add=(element,item)=>{waitingList.set(element,item);if(!isRunning){isRunning=true;request_idle_callback(runWaitingList);}};const flush=element=>{const callback=waitingList.get(element);if(undefined===callback){return false;}
waitingList.delete(element);callback();return true;};const cancel=element=>{return waitingList.delete(element);};const reset=()=>{waitingList.clear();isRunning=false;};return{add,flush,cancel,reset};};}();(window.wp=window.wp||{}).priorityQueue=__webpack_exports__;})();