(()=>{var Im=Object.create;var Ru=Object.defineProperty;var Bm=Object.getOwnPropertyDescriptor;var jm=Object.getOwnPropertyNames;var Um=Object.getPrototypeOf,Vm=Object.prototype.hasOwnProperty;var wn=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Wm=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of jm(e))!Vm.call(t,i)&&i!==n&&Ru(t,i,{get:()=>e[i],enumerable:!(r=Bm(e,i))||r.enumerable});return t};var Qu=(t,e,n)=>(n=t!=null?Im(Um(t)):{},Wm(e||!t||!t.__esModule?Ru(n,"default",{value:t,enumerable:!0}):n,t));var rc=wn(M=>{"use strict";var Ir=Symbol.for("react.element"),Hm=Symbol.for("react.portal"),Rm=Symbol.for("react.fragment"),Qm=Symbol.for("react.strict_mode"),Ym=Symbol.for("react.profiler"),$m=Symbol.for("react.provider"),Xm=Symbol.for("react.context"),Gm=Symbol.for("react.forward_ref"),Km=Symbol.for("react.suspense"),qm=Symbol.for("react.memo"),Zm=Symbol.for("react.lazy"),Yu=Symbol.iterator;function Jm(t){return t===null||typeof t!="object"?null:(t=Yu&&t[Yu]||t["@@iterator"],typeof t=="function"?t:null)}var Gu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ku=Object.assign,qu={};function Gn(t,e,n){this.props=t,this.context=e,this.refs=qu,this.updater=n||Gu}Gn.prototype.isReactComponent={};Gn.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Gn.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Zu(){}Zu.prototype=Gn.prototype;function zl(t,e,n){this.props=t,this.context=e,this.refs=qu,this.updater=n||Gu}var Ol=zl.prototype=new Zu;Ol.constructor=zl;Ku(Ol,Gn.prototype);Ol.isPureReactComponent=!0;var $u=Array.isArray,Ju=Object.prototype.hasOwnProperty,Ml={current:null},ec={key:!0,ref:!0,__self:!0,__source:!0};function tc(t,e,n){var r,i={},o=null,l=null;if(e!=null)for(r in e.ref!==void 0&&(l=e.ref),e.key!==void 0&&(o=""+e.key),e)Ju.call(e,r)&&!ec.hasOwnProperty(r)&&(i[r]=e[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var a=Array(s),u=0;u<s;u++)a[u]=arguments[u+2];i.children=a}if(t&&t.defaultProps)for(r in s=t.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:Ir,type:t,key:o,ref:l,props:i,_owner:Ml.current}}function eh(t,e){return{$$typeof:Ir,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Dl(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ir}function th(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Xu=/\/+/g;function Pl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?th(""+t.key):e.toString(36)}function Ri(t,e,n,r,i){var o=typeof t;(o==="undefined"||o==="boolean")&&(t=null);var l=!1;if(t===null)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(t.$$typeof){case Ir:case Hm:l=!0}}if(l)return l=t,i=i(l),t=r===""?"."+Pl(l,0):r,$u(i)?(n="",t!=null&&(n=t.replace(Xu,"$&/")+"/"),Ri(i,e,n,"",function(u){return u})):i!=null&&(Dl(i)&&(i=eh(i,n+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(Xu,"$&/")+"/")+t)),e.push(i)),1;if(l=0,r=r===""?".":r+":",$u(t))for(var s=0;s<t.length;s++){o=t[s];var a=r+Pl(o,s);l+=Ri(o,e,n,a,i)}else if(a=Jm(t),typeof a=="function")for(t=a.call(t),s=0;!(o=t.next()).done;)o=o.value,a=r+Pl(o,s++),l+=Ri(o,e,n,a,i);else if(o==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return l}function Hi(t,e,n){if(t==null)return t;var r=[],i=0;return Ri(t,r,"","",function(o){return e.call(n,o,i++)}),r}function nh(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ce={current:null},Qi={transition:null},rh={ReactCurrentDispatcher:Ce,ReactCurrentBatchConfig:Qi,ReactCurrentOwner:Ml};function nc(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:Hi,forEach:function(t,e,n){Hi(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Hi(t,function(){e++}),e},toArray:function(t){return Hi(t,function(e){return e})||[]},only:function(t){if(!Dl(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};M.Component=Gn;M.Fragment=Rm;M.Profiler=Ym;M.PureComponent=zl;M.StrictMode=Qm;M.Suspense=Km;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rh;M.act=nc;M.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Ku({},t.props),i=t.key,o=t.ref,l=t._owner;if(e!=null){if(e.ref!==void 0&&(o=e.ref,l=Ml.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(a in e)Ju.call(e,a)&&!ec.hasOwnProperty(a)&&(r[a]=e[a]===void 0&&s!==void 0?s[a]:e[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){s=Array(a);for(var u=0;u<a;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:Ir,type:t.type,key:i,ref:o,props:r,_owner:l}};M.createContext=function(t){return t={$$typeof:Xm,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:$m,_context:t},t.Consumer=t};M.createElement=tc;M.createFactory=function(t){var e=tc.bind(null,t);return e.type=t,e};M.createRef=function(){return{current:null}};M.forwardRef=function(t){return{$$typeof:Gm,render:t}};M.isValidElement=Dl;M.lazy=function(t){return{$$typeof:Zm,_payload:{_status:-1,_result:t},_init:nh}};M.memo=function(t,e){return{$$typeof:qm,type:t,compare:e===void 0?null:e}};M.startTransition=function(t){var e=Qi.transition;Qi.transition={};try{t()}finally{Qi.transition=e}};M.unstable_act=nc;M.useCallback=function(t,e){return Ce.current.useCallback(t,e)};M.useContext=function(t){return Ce.current.useContext(t)};M.useDebugValue=function(){};M.useDeferredValue=function(t){return Ce.current.useDeferredValue(t)};M.useEffect=function(t,e){return Ce.current.useEffect(t,e)};M.useId=function(){return Ce.current.useId()};M.useImperativeHandle=function(t,e,n){return Ce.current.useImperativeHandle(t,e,n)};M.useInsertionEffect=function(t,e){return Ce.current.useInsertionEffect(t,e)};M.useLayoutEffect=function(t,e){return Ce.current.useLayoutEffect(t,e)};M.useMemo=function(t,e){return Ce.current.useMemo(t,e)};M.useReducer=function(t,e,n){return Ce.current.useReducer(t,e,n)};M.useRef=function(t){return Ce.current.useRef(t)};M.useState=function(t){return Ce.current.useState(t)};M.useSyncExternalStore=function(t,e,n){return Ce.current.useSyncExternalStore(t,e,n)};M.useTransition=function(){return Ce.current.useTransition()};M.version="18.3.1"});var Ll=wn(($g,ic)=>{"use strict";ic.exports=rc()});var mc=wn(V=>{"use strict";function Bl(t,e){var n=t.length;t.push(e);e:for(;0<n;){var r=n-1>>>1,i=t[r];if(0<Yi(i,e))t[r]=e,t[n]=i,n=r;else break e}}function at(t){return t.length===0?null:t[0]}function Xi(t){if(t.length===0)return null;var e=t[0],n=t.pop();if(n!==e){t[0]=n;e:for(var r=0,i=t.length,o=i>>>1;r<o;){var l=2*(r+1)-1,s=t[l],a=l+1,u=t[a];if(0>Yi(s,n))a<i&&0>Yi(u,s)?(t[r]=u,t[a]=n,r=a):(t[r]=s,t[l]=n,r=l);else if(a<i&&0>Yi(u,n))t[r]=u,t[a]=n,r=a;else break e}}return e}function Yi(t,e){var n=t.sortIndex-e.sortIndex;return n!==0?n:t.id-e.id}typeof performance=="object"&&typeof performance.now=="function"?(oc=performance,V.unstable_now=function(){return oc.now()}):(Fl=Date,lc=Fl.now(),V.unstable_now=function(){return Fl.now()-lc});var oc,Fl,lc,_t=[],Wt=[],ih=1,Ze=null,ge=3,Gi=!1,kn=!1,jr=!1,uc=typeof setTimeout=="function"?setTimeout:null,cc=typeof clearTimeout=="function"?clearTimeout:null,sc=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function jl(t){for(var e=at(Wt);e!==null;){if(e.callback===null)Xi(Wt);else if(e.startTime<=t)Xi(Wt),e.sortIndex=e.expirationTime,Bl(_t,e);else break;e=at(Wt)}}function Ul(t){if(jr=!1,jl(t),!kn)if(at(_t)!==null)kn=!0,Wl(Vl);else{var e=at(Wt);e!==null&&Hl(Ul,e.startTime-t)}}function Vl(t,e){kn=!1,jr&&(jr=!1,cc(Ur),Ur=-1),Gi=!0;var n=ge;try{for(jl(e),Ze=at(_t);Ze!==null&&(!(Ze.expirationTime>e)||t&&!pc());){var r=Ze.callback;if(typeof r=="function"){Ze.callback=null,ge=Ze.priorityLevel;var i=r(Ze.expirationTime<=e);e=V.unstable_now(),typeof i=="function"?Ze.callback=i:Ze===at(_t)&&Xi(_t),jl(e)}else Xi(_t);Ze=at(_t)}if(Ze!==null)var o=!0;else{var l=at(Wt);l!==null&&Hl(Ul,l.startTime-e),o=!1}return o}finally{Ze=null,ge=n,Gi=!1}}var Ki=!1,$i=null,Ur=-1,fc=5,dc=-1;function pc(){return!(V.unstable_now()-dc<fc)}function Al(){if($i!==null){var t=V.unstable_now();dc=t;var e=!0;try{e=$i(!0,t)}finally{e?Br():(Ki=!1,$i=null)}}else Ki=!1}var Br;typeof sc=="function"?Br=function(){sc(Al)}:typeof MessageChannel<"u"?(Il=new MessageChannel,ac=Il.port2,Il.port1.onmessage=Al,Br=function(){ac.postMessage(null)}):Br=function(){uc(Al,0)};var Il,ac;function Wl(t){$i=t,Ki||(Ki=!0,Br())}function Hl(t,e){Ur=uc(function(){t(V.unstable_now())},e)}V.unstable_IdlePriority=5;V.unstable_ImmediatePriority=1;V.unstable_LowPriority=4;V.unstable_NormalPriority=3;V.unstable_Profiling=null;V.unstable_UserBlockingPriority=2;V.unstable_cancelCallback=function(t){t.callback=null};V.unstable_continueExecution=function(){kn||Gi||(kn=!0,Wl(Vl))};V.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):fc=0<t?Math.floor(1e3/t):5};V.unstable_getCurrentPriorityLevel=function(){return ge};V.unstable_getFirstCallbackNode=function(){return at(_t)};V.unstable_next=function(t){switch(ge){case 1:case 2:case 3:var e=3;break;default:e=ge}var n=ge;ge=e;try{return t()}finally{ge=n}};V.unstable_pauseExecution=function(){};V.unstable_requestPaint=function(){};V.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var n=ge;ge=t;try{return e()}finally{ge=n}};V.unstable_scheduleCallback=function(t,e,n){var r=V.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,t){case 1:var i=-1;break;case 2:i=250;break;case 5:i=1073741823;break;case 4:i=1e4;break;default:i=5e3}return i=n+i,t={id:ih++,callback:e,priorityLevel:t,startTime:n,expirationTime:i,sortIndex:-1},n>r?(t.sortIndex=n,Bl(Wt,t),at(_t)===null&&t===at(Wt)&&(jr?(cc(Ur),Ur=-1):jr=!0,Hl(Ul,n-r))):(t.sortIndex=i,Bl(_t,t),kn||Gi||(kn=!0,Wl(Vl))),t};V.unstable_shouldYield=pc;V.unstable_wrapCallback=function(t){var e=ge;return function(){var n=ge;ge=e;try{return t.apply(this,arguments)}finally{ge=n}}}});var _c=wn((Gg,hc)=>{"use strict";hc.exports=mc()});var wp=wn(Ye=>{"use strict";var oh=Ll(),Re=_c();function N(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var bf=new Set,ai={};function Fn(t,e){_r(t,e),_r(t+"Capture",e)}function _r(t,e){for(ai[t]=e,t=0;t<e.length;t++)bf.add(e[t])}var Mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ds=Object.prototype.hasOwnProperty,lh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,gc={},vc={};function sh(t){return ds.call(vc,t)?!0:ds.call(gc,t)?!1:lh.test(t)?vc[t]=!0:(gc[t]=!0,!1)}function ah(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function uh(t,e,n,r){if(e===null||typeof e>"u"||ah(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ne(t,e,n,r,i,o,l){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=o,this.removeEmptyString=l}var me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){me[t]=new Ne(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];me[e]=new Ne(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){me[t]=new Ne(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){me[t]=new Ne(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){me[t]=new Ne(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){me[t]=new Ne(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){me[t]=new Ne(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){me[t]=new Ne(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){me[t]=new Ne(t,5,!1,t.toLowerCase(),null,!1,!1)});var ia=/[\-:]([a-z])/g;function oa(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ia,oa);me[e]=new Ne(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ia,oa);me[e]=new Ne(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ia,oa);me[e]=new Ne(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){me[t]=new Ne(t,1,!1,t.toLowerCase(),null,!1,!1)});me.xlinkHref=new Ne("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){me[t]=new Ne(t,1,!1,t.toLowerCase(),null,!0,!0)});function la(t,e,n,r){var i=me.hasOwnProperty(e)?me[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(uh(e,n,i,r)&&(n=null),r||i===null?sh(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var At=oh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,qi=Symbol.for("react.element"),Zn=Symbol.for("react.portal"),Jn=Symbol.for("react.fragment"),sa=Symbol.for("react.strict_mode"),ps=Symbol.for("react.profiler"),Cf=Symbol.for("react.provider"),Ef=Symbol.for("react.context"),aa=Symbol.for("react.forward_ref"),ms=Symbol.for("react.suspense"),hs=Symbol.for("react.suspense_list"),ua=Symbol.for("react.memo"),Rt=Symbol.for("react.lazy"),Tf=Symbol.for("react.offscreen"),yc=Symbol.iterator;function Vr(t){return t===null||typeof t!="object"?null:(t=yc&&t[yc]||t["@@iterator"],typeof t=="function"?t:null)}var K=Object.assign,Rl;function Gr(t){if(Rl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Rl=e&&e[1]||""}return`
`+Rl+t}var Ql=!1;function Yl(t,e){if(!t||Ql)return"";Ql=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var r=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){r=u}t.call(e.prototype)}else{try{throw Error()}catch(u){r=u}t()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),l=i.length-1,s=o.length-1;1<=l&&0<=s&&i[l]!==o[s];)s--;for(;1<=l&&0<=s;l--,s--)if(i[l]!==o[s]){if(l!==1||s!==1)do if(l--,s--,0>s||i[l]!==o[s]){var a=`
`+i[l].replace(" at new "," at ");return t.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",t.displayName)),a}while(1<=l&&0<=s);break}}}finally{Ql=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Gr(t):""}function ch(t){switch(t.tag){case 5:return Gr(t.type);case 16:return Gr("Lazy");case 13:return Gr("Suspense");case 19:return Gr("SuspenseList");case 0:case 2:case 15:return t=Yl(t.type,!1),t;case 11:return t=Yl(t.type.render,!1),t;case 1:return t=Yl(t.type,!0),t;default:return""}}function _s(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Jn:return"Fragment";case Zn:return"Portal";case ps:return"Profiler";case sa:return"StrictMode";case ms:return"Suspense";case hs:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Ef:return(t.displayName||"Context")+".Consumer";case Cf:return(t._context.displayName||"Context")+".Provider";case aa:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ua:return e=t.displayName||null,e!==null?e:_s(t.type)||"Memo";case Rt:e=t._payload,t=t._init;try{return _s(t(e))}catch{}}return null}function fh(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _s(e);case 8:return e===sa?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function on(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Nf(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function dh(t){var e=Nf(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(l){r=""+l,o.call(this,l)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Zi(t){t._valueTracker||(t._valueTracker=dh(t))}function Pf(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Nf(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function To(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function gs(t,e){var n=e.checked;return K({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function xc(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=on(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function zf(t,e){e=e.checked,e!=null&&la(t,"checked",e,!1)}function vs(t,e){zf(t,e);var n=on(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?ys(t,e.type,n):e.hasOwnProperty("defaultValue")&&ys(t,e.type,on(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function wc(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function ys(t,e,n){(e!=="number"||To(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Kr=Array.isArray;function cr(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+on(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function xs(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(N(91));return K({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function kc(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(N(92));if(Kr(n)){if(1<n.length)throw Error(N(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:on(n)}}function Of(t,e){var n=on(e.value),r=on(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Sc(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Mf(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ws(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Mf(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ji,Df=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t})(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ji=Ji||document.createElement("div"),Ji.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ji.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ui(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Jr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ph=["Webkit","ms","Moz","O"];Object.keys(Jr).forEach(function(t){ph.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Jr[e]=Jr[t]})});function Lf(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Jr.hasOwnProperty(t)&&Jr[t]?(""+e).trim():e+"px"}function Ff(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Lf(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var mh=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ks(t,e){if(e){if(mh[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(N(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(N(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(N(61))}if(e.style!=null&&typeof e.style!="object")throw Error(N(62))}}function Ss(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bs=null;function ca(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Cs=null,fr=null,dr=null;function bc(t){if(t=Ti(t)){if(typeof Cs!="function")throw Error(N(280));var e=t.stateNode;e&&(e=tl(e),Cs(t.stateNode,t.type,e))}}function Af(t){fr?dr?dr.push(t):dr=[t]:fr=t}function If(){if(fr){var t=fr,e=dr;if(dr=fr=null,bc(t),e)for(t=0;t<e.length;t++)bc(e[t])}}function Bf(t,e){return t(e)}function jf(){}var $l=!1;function Uf(t,e,n){if($l)return t(e,n);$l=!0;try{return Bf(t,e,n)}finally{$l=!1,(fr!==null||dr!==null)&&(jf(),If())}}function ci(t,e){var n=t.stateNode;if(n===null)return null;var r=tl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(N(231,e,typeof n));return n}var Es=!1;if(Mt)try{Kn={},Object.defineProperty(Kn,"passive",{get:function(){Es=!0}}),window.addEventListener("test",Kn,Kn),window.removeEventListener("test",Kn,Kn)}catch{Es=!1}var Kn;function hh(t,e,n,r,i,o,l,s,a){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(c){this.onError(c)}}var ei=!1,No=null,Po=!1,Ts=null,_h={onError:function(t){ei=!0,No=t}};function gh(t,e,n,r,i,o,l,s,a){ei=!1,No=null,hh.apply(_h,arguments)}function vh(t,e,n,r,i,o,l,s,a){if(gh.apply(this,arguments),ei){if(ei){var u=No;ei=!1,No=null}else throw Error(N(198));Po||(Po=!0,Ts=u)}}function An(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Vf(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Cc(t){if(An(t)!==t)throw Error(N(188))}function yh(t){var e=t.alternate;if(!e){if(e=An(t),e===null)throw Error(N(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Cc(i),t;if(o===r)return Cc(i),e;o=o.sibling}throw Error(N(188))}if(n.return!==r.return)n=i,r=o;else{for(var l=!1,s=i.child;s;){if(s===n){l=!0,n=i,r=o;break}if(s===r){l=!0,r=i,n=o;break}s=s.sibling}if(!l){for(s=o.child;s;){if(s===n){l=!0,n=o,r=i;break}if(s===r){l=!0,r=o,n=i;break}s=s.sibling}if(!l)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?t:e}function Wf(t){return t=yh(t),t!==null?Hf(t):null}function Hf(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Hf(t);if(e!==null)return e;t=t.sibling}return null}var Rf=Re.unstable_scheduleCallback,Ec=Re.unstable_cancelCallback,xh=Re.unstable_shouldYield,wh=Re.unstable_requestPaint,ie=Re.unstable_now,kh=Re.unstable_getCurrentPriorityLevel,fa=Re.unstable_ImmediatePriority,Qf=Re.unstable_UserBlockingPriority,zo=Re.unstable_NormalPriority,Sh=Re.unstable_LowPriority,Yf=Re.unstable_IdlePriority,qo=null,xt=null;function bh(t){if(xt&&typeof xt.onCommitFiberRoot=="function")try{xt.onCommitFiberRoot(qo,t,void 0,(t.current.flags&128)===128)}catch{}}var pt=Math.clz32?Math.clz32:Th,Ch=Math.log,Eh=Math.LN2;function Th(t){return t>>>=0,t===0?32:31-(Ch(t)/Eh|0)|0}var eo=64,to=4194304;function qr(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Oo(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,o=t.pingedLanes,l=n&268435455;if(l!==0){var s=l&~i;s!==0?r=qr(s):(o&=l,o!==0&&(r=qr(o)))}else l=n&~i,l!==0?r=qr(l):o!==0&&(r=qr(o));if(r===0)return 0;if(e!==0&&e!==r&&(e&i)===0&&(i=r&-r,o=e&-e,i>=o||i===16&&(o&4194240)!==0))return e;if((r&4)!==0&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-pt(e),i=1<<n,r|=t[n],e&=~i;return r}function Nh(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ph(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,o=t.pendingLanes;0<o;){var l=31-pt(o),s=1<<l,a=i[l];a===-1?((s&n)===0||(s&r)!==0)&&(i[l]=Nh(s,e)):a<=e&&(t.expiredLanes|=s),o&=~s}}function Ns(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function $f(){var t=eo;return eo<<=1,(eo&4194240)===0&&(eo=64),t}function Xl(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ci(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-pt(e),t[e]=n}function zh(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-pt(n),o=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~o}}function da(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-pt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var I=0;function Xf(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var Gf,pa,Kf,qf,Zf,Ps=!1,no=[],Kt=null,qt=null,Zt=null,fi=new Map,di=new Map,Yt=[],Oh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Tc(t,e){switch(t){case"focusin":case"focusout":Kt=null;break;case"dragenter":case"dragleave":qt=null;break;case"mouseover":case"mouseout":Zt=null;break;case"pointerover":case"pointerout":fi.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":di.delete(e.pointerId)}}function Wr(t,e,n,r,i,o){return t===null||t.nativeEvent!==o?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},e!==null&&(e=Ti(e),e!==null&&pa(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function Mh(t,e,n,r,i){switch(e){case"focusin":return Kt=Wr(Kt,t,e,n,r,i),!0;case"dragenter":return qt=Wr(qt,t,e,n,r,i),!0;case"mouseover":return Zt=Wr(Zt,t,e,n,r,i),!0;case"pointerover":var o=i.pointerId;return fi.set(o,Wr(fi.get(o)||null,t,e,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,di.set(o,Wr(di.get(o)||null,t,e,n,r,i)),!0}return!1}function Jf(t){var e=Cn(t.target);if(e!==null){var n=An(e);if(n!==null){if(e=n.tag,e===13){if(e=Vf(n),e!==null){t.blockedOn=e,Zf(t.priority,function(){Kf(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function go(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=zs(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);bs=r,n.target.dispatchEvent(r),bs=null}else return e=Ti(n),e!==null&&pa(e),t.blockedOn=n,!1;e.shift()}return!0}function Nc(t,e,n){go(t)&&n.delete(e)}function Dh(){Ps=!1,Kt!==null&&go(Kt)&&(Kt=null),qt!==null&&go(qt)&&(qt=null),Zt!==null&&go(Zt)&&(Zt=null),fi.forEach(Nc),di.forEach(Nc)}function Hr(t,e){t.blockedOn===e&&(t.blockedOn=null,Ps||(Ps=!0,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,Dh)))}function pi(t){function e(i){return Hr(i,t)}if(0<no.length){Hr(no[0],t);for(var n=1;n<no.length;n++){var r=no[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Kt!==null&&Hr(Kt,t),qt!==null&&Hr(qt,t),Zt!==null&&Hr(Zt,t),fi.forEach(e),di.forEach(e),n=0;n<Yt.length;n++)r=Yt[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Yt.length&&(n=Yt[0],n.blockedOn===null);)Jf(n),n.blockedOn===null&&Yt.shift()}var pr=At.ReactCurrentBatchConfig,Mo=!0;function Lh(t,e,n,r){var i=I,o=pr.transition;pr.transition=null;try{I=1,ma(t,e,n,r)}finally{I=i,pr.transition=o}}function Fh(t,e,n,r){var i=I,o=pr.transition;pr.transition=null;try{I=4,ma(t,e,n,r)}finally{I=i,pr.transition=o}}function ma(t,e,n,r){if(Mo){var i=zs(t,e,n,r);if(i===null)ts(t,e,r,Do,n),Tc(t,r);else if(Mh(i,t,e,n,r))r.stopPropagation();else if(Tc(t,r),e&4&&-1<Oh.indexOf(t)){for(;i!==null;){var o=Ti(i);if(o!==null&&Gf(o),o=zs(t,e,n,r),o===null&&ts(t,e,r,Do,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else ts(t,e,r,null,n)}}var Do=null;function zs(t,e,n,r){if(Do=null,t=ca(r),t=Cn(t),t!==null)if(e=An(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Vf(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Do=t,null}function ed(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(kh()){case fa:return 1;case Qf:return 4;case zo:case Sh:return 16;case Yf:return 536870912;default:return 16}default:return 16}}var Xt=null,ha=null,vo=null;function td(){if(vo)return vo;var t,e=ha,n=e.length,r,i="value"in Xt?Xt.value:Xt.textContent,o=i.length;for(t=0;t<n&&e[t]===i[t];t++);var l=n-t;for(r=1;r<=l&&e[n-r]===i[o-r];r++);return vo=i.slice(t,1<r?1-r:void 0)}function yo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ro(){return!0}function Pc(){return!1}function Qe(t){function e(n,r,i,o,l){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?ro:Pc,this.isPropagationStopped=Pc,this}return K(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ro)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ro)},persist:function(){},isPersistent:ro}),e}var Sr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},_a=Qe(Sr),Ei=K({},Sr,{view:0,detail:0}),Ah=Qe(Ei),Gl,Kl,Rr,Zo=K({},Ei,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ga,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Rr&&(Rr&&t.type==="mousemove"?(Gl=t.screenX-Rr.screenX,Kl=t.screenY-Rr.screenY):Kl=Gl=0,Rr=t),Gl)},movementY:function(t){return"movementY"in t?t.movementY:Kl}}),zc=Qe(Zo),Ih=K({},Zo,{dataTransfer:0}),Bh=Qe(Ih),jh=K({},Ei,{relatedTarget:0}),ql=Qe(jh),Uh=K({},Sr,{animationName:0,elapsedTime:0,pseudoElement:0}),Vh=Qe(Uh),Wh=K({},Sr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Hh=Qe(Wh),Rh=K({},Sr,{data:0}),Oc=Qe(Rh),Qh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$h={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xh(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=$h[t])?!!e[t]:!1}function ga(){return Xh}var Gh=K({},Ei,{key:function(t){if(t.key){var e=Qh[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=yo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Yh[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ga,charCode:function(t){return t.type==="keypress"?yo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?yo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Kh=Qe(Gh),qh=K({},Zo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mc=Qe(qh),Zh=K({},Ei,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ga}),Jh=Qe(Zh),e0=K({},Sr,{propertyName:0,elapsedTime:0,pseudoElement:0}),t0=Qe(e0),n0=K({},Zo,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),r0=Qe(n0),i0=[9,13,27,32],va=Mt&&"CompositionEvent"in window,ti=null;Mt&&"documentMode"in document&&(ti=document.documentMode);var o0=Mt&&"TextEvent"in window&&!ti,nd=Mt&&(!va||ti&&8<ti&&11>=ti),Dc=" ",Lc=!1;function rd(t,e){switch(t){case"keyup":return i0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function id(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var er=!1;function l0(t,e){switch(t){case"compositionend":return id(e);case"keypress":return e.which!==32?null:(Lc=!0,Dc);case"textInput":return t=e.data,t===Dc&&Lc?null:t;default:return null}}function s0(t,e){if(er)return t==="compositionend"||!va&&rd(t,e)?(t=td(),vo=ha=Xt=null,er=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return nd&&e.locale!=="ko"?null:e.data;default:return null}}var a0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!a0[t.type]:e==="textarea"}function od(t,e,n,r){Af(r),e=Lo(e,"onChange"),0<e.length&&(n=new _a("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var ni=null,mi=null;function u0(t){_d(t,0)}function Jo(t){var e=rr(t);if(Pf(e))return t}function c0(t,e){if(t==="change")return e}var ld=!1;Mt&&(Mt?(oo="oninput"in document,oo||(Zl=document.createElement("div"),Zl.setAttribute("oninput","return;"),oo=typeof Zl.oninput=="function"),io=oo):io=!1,ld=io&&(!document.documentMode||9<document.documentMode));var io,oo,Zl;function Ac(){ni&&(ni.detachEvent("onpropertychange",sd),mi=ni=null)}function sd(t){if(t.propertyName==="value"&&Jo(mi)){var e=[];od(e,mi,t,ca(t)),Uf(u0,e)}}function f0(t,e,n){t==="focusin"?(Ac(),ni=e,mi=n,ni.attachEvent("onpropertychange",sd)):t==="focusout"&&Ac()}function d0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Jo(mi)}function p0(t,e){if(t==="click")return Jo(e)}function m0(t,e){if(t==="input"||t==="change")return Jo(e)}function h0(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ht=typeof Object.is=="function"?Object.is:h0;function hi(t,e){if(ht(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ds.call(e,i)||!ht(t[i],e[i]))return!1}return!0}function Ic(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Bc(t,e){var n=Ic(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ic(n)}}function ad(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?ad(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function ud(){for(var t=window,e=To();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=To(t.document)}return e}function ya(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function _0(t){var e=ud(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&ad(n.ownerDocument.documentElement,n)){if(r!==null&&ya(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!t.extend&&o>r&&(i=r,r=o,o=i),i=Bc(n,o);var l=Bc(n,r);i&&l&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==l.node||t.focusOffset!==l.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),o>r?(t.addRange(e),t.extend(l.node,l.offset)):(e.setEnd(l.node,l.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var g0=Mt&&"documentMode"in document&&11>=document.documentMode,tr=null,Os=null,ri=null,Ms=!1;function jc(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ms||tr==null||tr!==To(r)||(r=tr,"selectionStart"in r&&ya(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ri&&hi(ri,r)||(ri=r,r=Lo(Os,"onSelect"),0<r.length&&(e=new _a("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=tr)))}function lo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var nr={animationend:lo("Animation","AnimationEnd"),animationiteration:lo("Animation","AnimationIteration"),animationstart:lo("Animation","AnimationStart"),transitionend:lo("Transition","TransitionEnd")},Jl={},cd={};Mt&&(cd=document.createElement("div").style,"AnimationEvent"in window||(delete nr.animationend.animation,delete nr.animationiteration.animation,delete nr.animationstart.animation),"TransitionEvent"in window||delete nr.transitionend.transition);function el(t){if(Jl[t])return Jl[t];if(!nr[t])return t;var e=nr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in cd)return Jl[t]=e[n];return t}var fd=el("animationend"),dd=el("animationiteration"),pd=el("animationstart"),md=el("transitionend"),hd=new Map,Uc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function sn(t,e){hd.set(t,e),Fn(e,[t])}for(so=0;so<Uc.length;so++)ao=Uc[so],Vc=ao.toLowerCase(),Wc=ao[0].toUpperCase()+ao.slice(1),sn(Vc,"on"+Wc);var ao,Vc,Wc,so;sn(fd,"onAnimationEnd");sn(dd,"onAnimationIteration");sn(pd,"onAnimationStart");sn("dblclick","onDoubleClick");sn("focusin","onFocus");sn("focusout","onBlur");sn(md,"onTransitionEnd");_r("onMouseEnter",["mouseout","mouseover"]);_r("onMouseLeave",["mouseout","mouseover"]);_r("onPointerEnter",["pointerout","pointerover"]);_r("onPointerLeave",["pointerout","pointerover"]);Fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),v0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Zr));function Hc(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,vh(r,e,void 0,t),t.currentTarget=null}function _d(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var o=void 0;if(e)for(var l=r.length-1;0<=l;l--){var s=r[l],a=s.instance,u=s.currentTarget;if(s=s.listener,a!==o&&i.isPropagationStopped())break e;Hc(i,s,u),o=a}else for(l=0;l<r.length;l++){if(s=r[l],a=s.instance,u=s.currentTarget,s=s.listener,a!==o&&i.isPropagationStopped())break e;Hc(i,s,u),o=a}}}if(Po)throw t=Ts,Po=!1,Ts=null,t}function H(t,e){var n=e[Is];n===void 0&&(n=e[Is]=new Set);var r=t+"__bubble";n.has(r)||(gd(e,t,2,!1),n.add(r))}function es(t,e,n){var r=0;e&&(r|=4),gd(n,t,r,e)}var uo="_reactListening"+Math.random().toString(36).slice(2);function _i(t){if(!t[uo]){t[uo]=!0,bf.forEach(function(n){n!=="selectionchange"&&(v0.has(n)||es(n,!1,t),es(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[uo]||(e[uo]=!0,es("selectionchange",!1,e))}}function gd(t,e,n,r){switch(ed(e)){case 1:var i=Lh;break;case 4:i=Fh;break;default:i=ma}n=i.bind(null,e,n,t),i=void 0,!Es||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function ts(t,e,n,r,i){var o=r;if((e&1)===0&&(e&2)===0&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(l===4)for(l=r.return;l!==null;){var a=l.tag;if((a===3||a===4)&&(a=l.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;l=l.return}for(;s!==null;){if(l=Cn(s),l===null)return;if(a=l.tag,a===5||a===6){r=o=l;continue e}s=s.parentNode}}r=r.return}Uf(function(){var u=o,c=ca(n),p=[];e:{var _=hd.get(t);if(_!==void 0){var v=_a,y=t;switch(t){case"keypress":if(yo(n)===0)break e;case"keydown":case"keyup":v=Kh;break;case"focusin":y="focus",v=ql;break;case"focusout":y="blur",v=ql;break;case"beforeblur":case"afterblur":v=ql;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=zc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Bh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Jh;break;case fd:case dd:case pd:v=Vh;break;case md:v=t0;break;case"scroll":v=Ah;break;case"wheel":v=r0;break;case"copy":case"cut":case"paste":v=Hh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Mc}var h=(e&4)!==0,k=!h&&t==="scroll",g=h?_!==null?_+"Capture":null:_;h=[];for(var d=u,m;d!==null;){m=d;var x=m.stateNode;if(m.tag===5&&x!==null&&(m=x,g!==null&&(x=ci(d,g),x!=null&&h.push(gi(d,x,m)))),k)break;d=d.return}0<h.length&&(_=new v(_,y,null,n,c),p.push({event:_,listeners:h}))}}if((e&7)===0){e:{if(_=t==="mouseover"||t==="pointerover",v=t==="mouseout"||t==="pointerout",_&&n!==bs&&(y=n.relatedTarget||n.fromElement)&&(Cn(y)||y[Dt]))break e;if((v||_)&&(_=c.window===c?c:(_=c.ownerDocument)?_.defaultView||_.parentWindow:window,v?(y=n.relatedTarget||n.toElement,v=u,y=y?Cn(y):null,y!==null&&(k=An(y),y!==k||y.tag!==5&&y.tag!==6)&&(y=null)):(v=null,y=u),v!==y)){if(h=zc,x="onMouseLeave",g="onMouseEnter",d="mouse",(t==="pointerout"||t==="pointerover")&&(h=Mc,x="onPointerLeave",g="onPointerEnter",d="pointer"),k=v==null?_:rr(v),m=y==null?_:rr(y),_=new h(x,d+"leave",v,n,c),_.target=k,_.relatedTarget=m,x=null,Cn(c)===u&&(h=new h(g,d+"enter",y,n,c),h.target=m,h.relatedTarget=k,x=h),k=x,v&&y)t:{for(h=v,g=y,d=0,m=h;m;m=qn(m))d++;for(m=0,x=g;x;x=qn(x))m++;for(;0<d-m;)h=qn(h),d--;for(;0<m-d;)g=qn(g),m--;for(;d--;){if(h===g||g!==null&&h===g.alternate)break t;h=qn(h),g=qn(g)}h=null}else h=null;v!==null&&Rc(p,_,v,h,!1),y!==null&&k!==null&&Rc(p,k,y,h,!0)}}e:{if(_=u?rr(u):window,v=_.nodeName&&_.nodeName.toLowerCase(),v==="select"||v==="input"&&_.type==="file")var w=c0;else if(Fc(_))if(ld)w=m0;else{w=d0;var E=f0}else(v=_.nodeName)&&v.toLowerCase()==="input"&&(_.type==="checkbox"||_.type==="radio")&&(w=p0);if(w&&(w=w(t,u))){od(p,w,n,c);break e}E&&E(t,_,u),t==="focusout"&&(E=_._wrapperState)&&E.controlled&&_.type==="number"&&ys(_,"number",_.value)}switch(E=u?rr(u):window,t){case"focusin":(Fc(E)||E.contentEditable==="true")&&(tr=E,Os=u,ri=null);break;case"focusout":ri=Os=tr=null;break;case"mousedown":Ms=!0;break;case"contextmenu":case"mouseup":case"dragend":Ms=!1,jc(p,n,c);break;case"selectionchange":if(g0)break;case"keydown":case"keyup":jc(p,n,c)}var b;if(va)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else er?rd(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(nd&&n.locale!=="ko"&&(er||C!=="onCompositionStart"?C==="onCompositionEnd"&&er&&(b=td()):(Xt=c,ha="value"in Xt?Xt.value:Xt.textContent,er=!0)),E=Lo(u,C),0<E.length&&(C=new Oc(C,t,null,n,c),p.push({event:C,listeners:E}),b?C.data=b:(b=id(n),b!==null&&(C.data=b)))),(b=o0?l0(t,n):s0(t,n))&&(u=Lo(u,"onBeforeInput"),0<u.length&&(c=new Oc("onBeforeInput","beforeinput",null,n,c),p.push({event:c,listeners:u}),c.data=b))}_d(p,e)})}function gi(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Lo(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=ci(t,n),o!=null&&r.unshift(gi(t,o,i)),o=ci(t,e),o!=null&&r.push(gi(t,o,i))),t=t.return}return r}function qn(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Rc(t,e,n,r,i){for(var o=e._reactName,l=[];n!==null&&n!==r;){var s=n,a=s.alternate,u=s.stateNode;if(a!==null&&a===r)break;s.tag===5&&u!==null&&(s=u,i?(a=ci(n,o),a!=null&&l.unshift(gi(n,a,s))):i||(a=ci(n,o),a!=null&&l.push(gi(n,a,s)))),n=n.return}l.length!==0&&t.push({event:e,listeners:l})}var y0=/\r\n?/g,x0=/\u0000|\uFFFD/g;function Qc(t){return(typeof t=="string"?t:""+t).replace(y0,`
`).replace(x0,"")}function co(t,e,n){if(e=Qc(e),Qc(t)!==e&&n)throw Error(N(425))}function Fo(){}var Ds=null,Ls=null;function Fs(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var As=typeof setTimeout=="function"?setTimeout:void 0,w0=typeof clearTimeout=="function"?clearTimeout:void 0,Yc=typeof Promise=="function"?Promise:void 0,k0=typeof queueMicrotask=="function"?queueMicrotask:typeof Yc<"u"?function(t){return Yc.resolve(null).then(t).catch(S0)}:As;function S0(t){setTimeout(function(){throw t})}function ns(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),pi(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);pi(e)}function Jt(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function $c(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var br=Math.random().toString(36).slice(2),yt="__reactFiber$"+br,vi="__reactProps$"+br,Dt="__reactContainer$"+br,Is="__reactEvents$"+br,b0="__reactListeners$"+br,C0="__reactHandles$"+br;function Cn(t){var e=t[yt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Dt]||n[yt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=$c(t);t!==null;){if(n=t[yt])return n;t=$c(t)}return e}t=n,n=t.parentNode}return null}function Ti(t){return t=t[yt]||t[Dt],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function rr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(N(33))}function tl(t){return t[vi]||null}var Bs=[],ir=-1;function an(t){return{current:t}}function R(t){0>ir||(t.current=Bs[ir],Bs[ir]=null,ir--)}function W(t,e){ir++,Bs[ir]=t.current,t.current=e}var ln={},we=an(ln),De=an(!1),zn=ln;function gr(t,e){var n=t.type.contextTypes;if(!n)return ln;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=e[o];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Le(t){return t=t.childContextTypes,t!=null}function Ao(){R(De),R(we)}function Xc(t,e,n){if(we.current!==ln)throw Error(N(168));W(we,e),W(De,n)}function vd(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(N(108,fh(t)||"Unknown",i));return K({},n,r)}function Io(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ln,zn=we.current,W(we,t),W(De,De.current),!0}function Gc(t,e,n){var r=t.stateNode;if(!r)throw Error(N(169));n?(t=vd(t,e,zn),r.__reactInternalMemoizedMergedChildContext=t,R(De),R(we),W(we,t)):R(De),W(De,n)}var Nt=null,nl=!1,rs=!1;function yd(t){Nt===null?Nt=[t]:Nt.push(t)}function E0(t){nl=!0,yd(t)}function un(){if(!rs&&Nt!==null){rs=!0;var t=0,e=I;try{var n=Nt;for(I=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Nt=null,nl=!1}catch(i){throw Nt!==null&&(Nt=Nt.slice(t+1)),Rf(fa,un),i}finally{I=e,rs=!1}}return null}var or=[],lr=0,Bo=null,jo=0,Je=[],et=0,On=null,Pt=1,zt="";function Sn(t,e){or[lr++]=jo,or[lr++]=Bo,Bo=t,jo=e}function xd(t,e,n){Je[et++]=Pt,Je[et++]=zt,Je[et++]=On,On=t;var r=Pt;t=zt;var i=32-pt(r)-1;r&=~(1<<i),n+=1;var o=32-pt(e)+i;if(30<o){var l=i-i%5;o=(r&(1<<l)-1).toString(32),r>>=l,i-=l,Pt=1<<32-pt(e)+i|n<<i|r,zt=o+t}else Pt=1<<o|n<<i|r,zt=t}function xa(t){t.return!==null&&(Sn(t,1),xd(t,1,0))}function wa(t){for(;t===Bo;)Bo=or[--lr],or[lr]=null,jo=or[--lr],or[lr]=null;for(;t===On;)On=Je[--et],Je[et]=null,zt=Je[--et],Je[et]=null,Pt=Je[--et],Je[et]=null}var He=null,We=null,Y=!1,dt=null;function wd(t,e){var n=tt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Kc(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,He=t,We=Jt(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,He=t,We=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=On!==null?{id:Pt,overflow:zt}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=tt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,He=t,We=null,!0):!1;default:return!1}}function js(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Us(t){if(Y){var e=We;if(e){var n=e;if(!Kc(t,e)){if(js(t))throw Error(N(418));e=Jt(n.nextSibling);var r=He;e&&Kc(t,e)?wd(r,n):(t.flags=t.flags&-4097|2,Y=!1,He=t)}}else{if(js(t))throw Error(N(418));t.flags=t.flags&-4097|2,Y=!1,He=t}}}function qc(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;He=t}function fo(t){if(t!==He)return!1;if(!Y)return qc(t),Y=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Fs(t.type,t.memoizedProps)),e&&(e=We)){if(js(t))throw kd(),Error(N(418));for(;e;)wd(t,e),e=Jt(e.nextSibling)}if(qc(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(N(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){We=Jt(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}We=null}}else We=He?Jt(t.stateNode.nextSibling):null;return!0}function kd(){for(var t=We;t;)t=Jt(t.nextSibling)}function vr(){We=He=null,Y=!1}function ka(t){dt===null?dt=[t]:dt.push(t)}var T0=At.ReactCurrentBatchConfig;function Qr(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,t));var i=r,o=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===o?e.ref:(e=function(l){var s=i.refs;l===null?delete s[o]:s[o]=l},e._stringRef=o,e)}if(typeof t!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,t))}return t}function po(t,e){throw t=Object.prototype.toString.call(e),Error(N(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Zc(t){var e=t._init;return e(t._payload)}function Sd(t){function e(g,d){if(t){var m=g.deletions;m===null?(g.deletions=[d],g.flags|=16):m.push(d)}}function n(g,d){if(!t)return null;for(;d!==null;)e(g,d),d=d.sibling;return null}function r(g,d){for(g=new Map;d!==null;)d.key!==null?g.set(d.key,d):g.set(d.index,d),d=d.sibling;return g}function i(g,d){return g=rn(g,d),g.index=0,g.sibling=null,g}function o(g,d,m){return g.index=m,t?(m=g.alternate,m!==null?(m=m.index,m<d?(g.flags|=2,d):m):(g.flags|=2,d)):(g.flags|=1048576,d)}function l(g){return t&&g.alternate===null&&(g.flags|=2),g}function s(g,d,m,x){return d===null||d.tag!==6?(d=cs(m,g.mode,x),d.return=g,d):(d=i(d,m),d.return=g,d)}function a(g,d,m,x){var w=m.type;return w===Jn?c(g,d,m.props.children,x,m.key):d!==null&&(d.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Rt&&Zc(w)===d.type)?(x=i(d,m.props),x.ref=Qr(g,d,m),x.return=g,x):(x=Eo(m.type,m.key,m.props,null,g.mode,x),x.ref=Qr(g,d,m),x.return=g,x)}function u(g,d,m,x){return d===null||d.tag!==4||d.stateNode.containerInfo!==m.containerInfo||d.stateNode.implementation!==m.implementation?(d=fs(m,g.mode,x),d.return=g,d):(d=i(d,m.children||[]),d.return=g,d)}function c(g,d,m,x,w){return d===null||d.tag!==7?(d=Pn(m,g.mode,x,w),d.return=g,d):(d=i(d,m),d.return=g,d)}function p(g,d,m){if(typeof d=="string"&&d!==""||typeof d=="number")return d=cs(""+d,g.mode,m),d.return=g,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case qi:return m=Eo(d.type,d.key,d.props,null,g.mode,m),m.ref=Qr(g,null,d),m.return=g,m;case Zn:return d=fs(d,g.mode,m),d.return=g,d;case Rt:var x=d._init;return p(g,x(d._payload),m)}if(Kr(d)||Vr(d))return d=Pn(d,g.mode,m,null),d.return=g,d;po(g,d)}return null}function _(g,d,m,x){var w=d!==null?d.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return w!==null?null:s(g,d,""+m,x);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case qi:return m.key===w?a(g,d,m,x):null;case Zn:return m.key===w?u(g,d,m,x):null;case Rt:return w=m._init,_(g,d,w(m._payload),x)}if(Kr(m)||Vr(m))return w!==null?null:c(g,d,m,x,null);po(g,m)}return null}function v(g,d,m,x,w){if(typeof x=="string"&&x!==""||typeof x=="number")return g=g.get(m)||null,s(d,g,""+x,w);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case qi:return g=g.get(x.key===null?m:x.key)||null,a(d,g,x,w);case Zn:return g=g.get(x.key===null?m:x.key)||null,u(d,g,x,w);case Rt:var E=x._init;return v(g,d,m,E(x._payload),w)}if(Kr(x)||Vr(x))return g=g.get(m)||null,c(d,g,x,w,null);po(d,x)}return null}function y(g,d,m,x){for(var w=null,E=null,b=d,C=d=0,S=null;b!==null&&C<m.length;C++){b.index>C?(S=b,b=null):S=b.sibling;var T=_(g,b,m[C],x);if(T===null){b===null&&(b=S);break}t&&b&&T.alternate===null&&e(g,b),d=o(T,d,C),E===null?w=T:E.sibling=T,E=T,b=S}if(C===m.length)return n(g,b),Y&&Sn(g,C),w;if(b===null){for(;C<m.length;C++)b=p(g,m[C],x),b!==null&&(d=o(b,d,C),E===null?w=b:E.sibling=b,E=b);return Y&&Sn(g,C),w}for(b=r(g,b);C<m.length;C++)S=v(b,g,C,m[C],x),S!==null&&(t&&S.alternate!==null&&b.delete(S.key===null?C:S.key),d=o(S,d,C),E===null?w=S:E.sibling=S,E=S);return t&&b.forEach(function(z){return e(g,z)}),Y&&Sn(g,C),w}function h(g,d,m,x){var w=Vr(m);if(typeof w!="function")throw Error(N(150));if(m=w.call(m),m==null)throw Error(N(151));for(var E=w=null,b=d,C=d=0,S=null,T=m.next();b!==null&&!T.done;C++,T=m.next()){b.index>C?(S=b,b=null):S=b.sibling;var z=_(g,b,T.value,x);if(z===null){b===null&&(b=S);break}t&&b&&z.alternate===null&&e(g,b),d=o(z,d,C),E===null?w=z:E.sibling=z,E=z,b=S}if(T.done)return n(g,b),Y&&Sn(g,C),w;if(b===null){for(;!T.done;C++,T=m.next())T=p(g,T.value,x),T!==null&&(d=o(T,d,C),E===null?w=T:E.sibling=T,E=T);return Y&&Sn(g,C),w}for(b=r(g,b);!T.done;C++,T=m.next())T=v(b,g,C,T.value,x),T!==null&&(t&&T.alternate!==null&&b.delete(T.key===null?C:T.key),d=o(T,d,C),E===null?w=T:E.sibling=T,E=T);return t&&b.forEach(function(O){return e(g,O)}),Y&&Sn(g,C),w}function k(g,d,m,x){if(typeof m=="object"&&m!==null&&m.type===Jn&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case qi:e:{for(var w=m.key,E=d;E!==null;){if(E.key===w){if(w=m.type,w===Jn){if(E.tag===7){n(g,E.sibling),d=i(E,m.props.children),d.return=g,g=d;break e}}else if(E.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Rt&&Zc(w)===E.type){n(g,E.sibling),d=i(E,m.props),d.ref=Qr(g,E,m),d.return=g,g=d;break e}n(g,E);break}else e(g,E);E=E.sibling}m.type===Jn?(d=Pn(m.props.children,g.mode,x,m.key),d.return=g,g=d):(x=Eo(m.type,m.key,m.props,null,g.mode,x),x.ref=Qr(g,d,m),x.return=g,g=x)}return l(g);case Zn:e:{for(E=m.key;d!==null;){if(d.key===E)if(d.tag===4&&d.stateNode.containerInfo===m.containerInfo&&d.stateNode.implementation===m.implementation){n(g,d.sibling),d=i(d,m.children||[]),d.return=g,g=d;break e}else{n(g,d);break}else e(g,d);d=d.sibling}d=fs(m,g.mode,x),d.return=g,g=d}return l(g);case Rt:return E=m._init,k(g,d,E(m._payload),x)}if(Kr(m))return y(g,d,m,x);if(Vr(m))return h(g,d,m,x);po(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,d!==null&&d.tag===6?(n(g,d.sibling),d=i(d,m),d.return=g,g=d):(n(g,d),d=cs(m,g.mode,x),d.return=g,g=d),l(g)):n(g,d)}return k}var yr=Sd(!0),bd=Sd(!1),Uo=an(null),Vo=null,sr=null,Sa=null;function ba(){Sa=sr=Vo=null}function Ca(t){var e=Uo.current;R(Uo),t._currentValue=e}function Vs(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function mr(t,e){Vo=t,Sa=sr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&e)!==0&&(Me=!0),t.firstContext=null)}function rt(t){var e=t._currentValue;if(Sa!==t)if(t={context:t,memoizedValue:e,next:null},sr===null){if(Vo===null)throw Error(N(308));sr=t,Vo.dependencies={lanes:0,firstContext:t}}else sr=sr.next=t;return e}var En=null;function Ea(t){En===null?En=[t]:En.push(t)}function Cd(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Ea(e)):(n.next=i.next,i.next=n),e.interleaved=n,Lt(t,r)}function Lt(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Qt=!1;function Ta(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ed(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ot(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function en(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(A&2)!==0){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Lt(t,n)}return i=r.interleaved,i===null?(e.next=e,Ea(r)):(e.next=i.next,i.next=e),r.interleaved=e,Lt(t,n)}function xo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,da(t,n)}}function Jc(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=l:o=o.next=l,n=n.next}while(n!==null);o===null?i=o=e:o=o.next=e}else i=o=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Wo(t,e,n,r){var i=t.updateQueue;Qt=!1;var o=i.firstBaseUpdate,l=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var a=s,u=a.next;a.next=null,l===null?o=u:l.next=u,l=a;var c=t.alternate;c!==null&&(c=c.updateQueue,s=c.lastBaseUpdate,s!==l&&(s===null?c.firstBaseUpdate=u:s.next=u,c.lastBaseUpdate=a))}if(o!==null){var p=i.baseState;l=0,c=u=a=null,s=o;do{var _=s.lane,v=s.eventTime;if((r&_)===_){c!==null&&(c=c.next={eventTime:v,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=t,h=s;switch(_=e,v=n,h.tag){case 1:if(y=h.payload,typeof y=="function"){p=y.call(v,p,_);break e}p=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=h.payload,_=typeof y=="function"?y.call(v,p,_):y,_==null)break e;p=K({},p,_);break e;case 2:Qt=!0}}s.callback!==null&&s.lane!==0&&(t.flags|=64,_=i.effects,_===null?i.effects=[s]:_.push(s))}else v={eventTime:v,lane:_,tag:s.tag,payload:s.payload,callback:s.callback,next:null},c===null?(u=c=v,a=p):c=c.next=v,l|=_;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;_=s,s=_.next,_.next=null,i.lastBaseUpdate=_,i.shared.pending=null}}while(!0);if(c===null&&(a=p),i.baseState=a,i.firstBaseUpdate=u,i.lastBaseUpdate=c,e=i.shared.interleaved,e!==null){i=e;do l|=i.lane,i=i.next;while(i!==e)}else o===null&&(i.shared.lanes=0);Dn|=l,t.lanes=l,t.memoizedState=p}}function ef(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(N(191,i));i.call(r)}}}var Ni={},wt=an(Ni),yi=an(Ni),xi=an(Ni);function Tn(t){if(t===Ni)throw Error(N(174));return t}function Na(t,e){switch(W(xi,e),W(yi,t),W(wt,Ni),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ws(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ws(e,t)}R(wt),W(wt,e)}function xr(){R(wt),R(yi),R(xi)}function Td(t){Tn(xi.current);var e=Tn(wt.current),n=ws(e,t.type);e!==n&&(W(yi,t),W(wt,n))}function Pa(t){yi.current===t&&(R(wt),R(yi))}var X=an(0);function Ho(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var is=[];function za(){for(var t=0;t<is.length;t++)is[t]._workInProgressVersionPrimary=null;is.length=0}var wo=At.ReactCurrentDispatcher,os=At.ReactCurrentBatchConfig,Mn=0,G=null,se=null,ce=null,Ro=!1,ii=!1,wi=0,N0=0;function ve(){throw Error(N(321))}function Oa(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ht(t[n],e[n]))return!1;return!0}function Ma(t,e,n,r,i,o){if(Mn=o,G=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,wo.current=t===null||t.memoizedState===null?M0:D0,t=n(r,i),ii){o=0;do{if(ii=!1,wi=0,25<=o)throw Error(N(301));o+=1,ce=se=null,e.updateQueue=null,wo.current=L0,t=n(r,i)}while(ii)}if(wo.current=Qo,e=se!==null&&se.next!==null,Mn=0,ce=se=G=null,Ro=!1,e)throw Error(N(300));return t}function Da(){var t=wi!==0;return wi=0,t}function vt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ce===null?G.memoizedState=ce=t:ce=ce.next=t,ce}function it(){if(se===null){var t=G.alternate;t=t!==null?t.memoizedState:null}else t=se.next;var e=ce===null?G.memoizedState:ce.next;if(e!==null)ce=e,se=t;else{if(t===null)throw Error(N(310));se=t,t={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},ce===null?G.memoizedState=ce=t:ce=ce.next=t}return ce}function ki(t,e){return typeof e=="function"?e(t):e}function ls(t){var e=it(),n=e.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=t;var r=se,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var l=i.next;i.next=o.next,o.next=l}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var s=l=null,a=null,u=o;do{var c=u.lane;if((Mn&c)===c)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:t(r,u.action);else{var p={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(s=a=p,l=r):a=a.next=p,G.lanes|=c,Dn|=c}u=u.next}while(u!==null&&u!==o);a===null?l=r:a.next=s,ht(r,e.memoizedState)||(Me=!0),e.memoizedState=r,e.baseState=l,e.baseQueue=a,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do o=i.lane,G.lanes|=o,Dn|=o,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ss(t){var e=it(),n=e.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,o=e.memoizedState;if(i!==null){n.pending=null;var l=i=i.next;do o=t(o,l.action),l=l.next;while(l!==i);ht(o,e.memoizedState)||(Me=!0),e.memoizedState=o,e.baseQueue===null&&(e.baseState=o),n.lastRenderedState=o}return[o,r]}function Nd(){}function Pd(t,e){var n=G,r=it(),i=e(),o=!ht(r.memoizedState,i);if(o&&(r.memoizedState=i,Me=!0),r=r.queue,La(Md.bind(null,n,r,t),[t]),r.getSnapshot!==e||o||ce!==null&&ce.memoizedState.tag&1){if(n.flags|=2048,Si(9,Od.bind(null,n,r,i,e),void 0,null),fe===null)throw Error(N(349));(Mn&30)!==0||zd(n,e,i)}return i}function zd(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=G.updateQueue,e===null?(e={lastEffect:null,stores:null},G.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Od(t,e,n,r){e.value=n,e.getSnapshot=r,Dd(e)&&Ld(t)}function Md(t,e,n){return n(function(){Dd(e)&&Ld(t)})}function Dd(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ht(t,n)}catch{return!0}}function Ld(t){var e=Lt(t,1);e!==null&&mt(e,t,1,-1)}function tf(t){var e=vt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:t},e.queue=t,t=t.dispatch=O0.bind(null,G,t),[e.memoizedState,t]}function Si(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=G.updateQueue,e===null?(e={lastEffect:null,stores:null},G.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Fd(){return it().memoizedState}function ko(t,e,n,r){var i=vt();G.flags|=t,i.memoizedState=Si(1|e,n,void 0,r===void 0?null:r)}function rl(t,e,n,r){var i=it();r=r===void 0?null:r;var o=void 0;if(se!==null){var l=se.memoizedState;if(o=l.destroy,r!==null&&Oa(r,l.deps)){i.memoizedState=Si(e,n,o,r);return}}G.flags|=t,i.memoizedState=Si(1|e,n,o,r)}function nf(t,e){return ko(8390656,8,t,e)}function La(t,e){return rl(2048,8,t,e)}function Ad(t,e){return rl(4,2,t,e)}function Id(t,e){return rl(4,4,t,e)}function Bd(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function jd(t,e,n){return n=n!=null?n.concat([t]):null,rl(4,4,Bd.bind(null,e,t),n)}function Fa(){}function Ud(t,e){var n=it();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Oa(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Vd(t,e){var n=it();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Oa(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Wd(t,e,n){return(Mn&21)===0?(t.baseState&&(t.baseState=!1,Me=!0),t.memoizedState=n):(ht(n,e)||(n=$f(),G.lanes|=n,Dn|=n,t.baseState=!0),e)}function P0(t,e){var n=I;I=n!==0&&4>n?n:4,t(!0);var r=os.transition;os.transition={};try{t(!1),e()}finally{I=n,os.transition=r}}function Hd(){return it().memoizedState}function z0(t,e,n){var r=nn(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Rd(t))Qd(e,n);else if(n=Cd(t,e,n,r),n!==null){var i=Te();mt(n,t,r,i),Yd(n,e,r)}}function O0(t,e,n){var r=nn(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rd(t))Qd(e,i);else{var o=t.alternate;if(t.lanes===0&&(o===null||o.lanes===0)&&(o=e.lastRenderedReducer,o!==null))try{var l=e.lastRenderedState,s=o(l,n);if(i.hasEagerState=!0,i.eagerState=s,ht(s,l)){var a=e.interleaved;a===null?(i.next=i,Ea(e)):(i.next=a.next,a.next=i),e.interleaved=i;return}}catch{}n=Cd(t,e,i,r),n!==null&&(i=Te(),mt(n,t,r,i),Yd(n,e,r))}}function Rd(t){var e=t.alternate;return t===G||e!==null&&e===G}function Qd(t,e){ii=Ro=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Yd(t,e,n){if((n&4194240)!==0){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,da(t,n)}}var Qo={readContext:rt,useCallback:ve,useContext:ve,useEffect:ve,useImperativeHandle:ve,useInsertionEffect:ve,useLayoutEffect:ve,useMemo:ve,useReducer:ve,useRef:ve,useState:ve,useDebugValue:ve,useDeferredValue:ve,useTransition:ve,useMutableSource:ve,useSyncExternalStore:ve,useId:ve,unstable_isNewReconciler:!1},M0={readContext:rt,useCallback:function(t,e){return vt().memoizedState=[t,e===void 0?null:e],t},useContext:rt,useEffect:nf,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ko(4194308,4,Bd.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ko(4194308,4,t,e)},useInsertionEffect:function(t,e){return ko(4,2,t,e)},useMemo:function(t,e){var n=vt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=vt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=z0.bind(null,G,t),[r.memoizedState,t]},useRef:function(t){var e=vt();return t={current:t},e.memoizedState=t},useState:tf,useDebugValue:Fa,useDeferredValue:function(t){return vt().memoizedState=t},useTransition:function(){var t=tf(!1),e=t[0];return t=P0.bind(null,t[1]),vt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=G,i=vt();if(Y){if(n===void 0)throw Error(N(407));n=n()}else{if(n=e(),fe===null)throw Error(N(349));(Mn&30)!==0||zd(r,e,n)}i.memoizedState=n;var o={value:n,getSnapshot:e};return i.queue=o,nf(Md.bind(null,r,o,t),[t]),r.flags|=2048,Si(9,Od.bind(null,r,o,n,e),void 0,null),n},useId:function(){var t=vt(),e=fe.identifierPrefix;if(Y){var n=zt,r=Pt;n=(r&~(1<<32-pt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=wi++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=N0++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},D0={readContext:rt,useCallback:Ud,useContext:rt,useEffect:La,useImperativeHandle:jd,useInsertionEffect:Ad,useLayoutEffect:Id,useMemo:Vd,useReducer:ls,useRef:Fd,useState:function(){return ls(ki)},useDebugValue:Fa,useDeferredValue:function(t){var e=it();return Wd(e,se.memoizedState,t)},useTransition:function(){var t=ls(ki)[0],e=it().memoizedState;return[t,e]},useMutableSource:Nd,useSyncExternalStore:Pd,useId:Hd,unstable_isNewReconciler:!1},L0={readContext:rt,useCallback:Ud,useContext:rt,useEffect:La,useImperativeHandle:jd,useInsertionEffect:Ad,useLayoutEffect:Id,useMemo:Vd,useReducer:ss,useRef:Fd,useState:function(){return ss(ki)},useDebugValue:Fa,useDeferredValue:function(t){var e=it();return se===null?e.memoizedState=t:Wd(e,se.memoizedState,t)},useTransition:function(){var t=ss(ki)[0],e=it().memoizedState;return[t,e]},useMutableSource:Nd,useSyncExternalStore:Pd,useId:Hd,unstable_isNewReconciler:!1};function ct(t,e){if(t&&t.defaultProps){e=K({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ws(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:K({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var il={isMounted:function(t){return(t=t._reactInternals)?An(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Te(),i=nn(t),o=Ot(r,i);o.payload=e,n!=null&&(o.callback=n),e=en(t,o,i),e!==null&&(mt(e,t,i,r),xo(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Te(),i=nn(t),o=Ot(r,i);o.tag=1,o.payload=e,n!=null&&(o.callback=n),e=en(t,o,i),e!==null&&(mt(e,t,i,r),xo(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Te(),r=nn(t),i=Ot(n,r);i.tag=2,e!=null&&(i.callback=e),e=en(t,i,r),e!==null&&(mt(e,t,r,n),xo(e,t,r))}};function rf(t,e,n,r,i,o,l){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,o,l):e.prototype&&e.prototype.isPureReactComponent?!hi(n,r)||!hi(i,o):!0}function $d(t,e,n){var r=!1,i=ln,o=e.contextType;return typeof o=="object"&&o!==null?o=rt(o):(i=Le(e)?zn:we.current,r=e.contextTypes,o=(r=r!=null)?gr(t,i):ln),e=new e(n,o),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=il,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=o),e}function of(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&il.enqueueReplaceState(e,e.state,null)}function Hs(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Ta(t);var o=e.contextType;typeof o=="object"&&o!==null?i.context=rt(o):(o=Le(e)?zn:we.current,i.context=gr(t,o)),i.state=t.memoizedState,o=e.getDerivedStateFromProps,typeof o=="function"&&(Ws(t,e,o,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&il.enqueueReplaceState(i,i.state,null),Wo(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function wr(t,e){try{var n="",r=e;do n+=ch(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:t,source:e,stack:i,digest:null}}function as(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Rs(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var F0=typeof WeakMap=="function"?WeakMap:Map;function Xd(t,e,n){n=Ot(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){$o||($o=!0,ea=r),Rs(t,e)},n}function Gd(t,e,n){n=Ot(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Rs(t,e)}}var o=t.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Rs(t,e),typeof r!="function"&&(tn===null?tn=new Set([this]):tn.add(this));var l=e.stack;this.componentDidCatch(e.value,{componentStack:l!==null?l:""})}),n}function lf(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new F0;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=G0.bind(null,t,e,n),e.then(t,t))}function sf(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function af(t,e,n,r,i){return(t.mode&1)===0?(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ot(-1,1),e.tag=2,en(n,e,1))),n.lanes|=1),t):(t.flags|=65536,t.lanes=i,t)}var A0=At.ReactCurrentOwner,Me=!1;function Ee(t,e,n,r){e.child=t===null?bd(e,null,n,r):yr(e,t.child,n,r)}function uf(t,e,n,r,i){n=n.render;var o=e.ref;return mr(e,i),r=Ma(t,e,n,r,o,i),n=Da(),t!==null&&!Me?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Ft(t,e,i)):(Y&&n&&xa(e),e.flags|=1,Ee(t,e,r,i),e.child)}function cf(t,e,n,r,i){if(t===null){var o=n.type;return typeof o=="function"&&!Ha(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=o,Kd(t,e,o,r,i)):(t=Eo(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(o=t.child,(t.lanes&i)===0){var l=o.memoizedProps;if(n=n.compare,n=n!==null?n:hi,n(l,r)&&t.ref===e.ref)return Ft(t,e,i)}return e.flags|=1,t=rn(o,r),t.ref=e.ref,t.return=e,e.child=t}function Kd(t,e,n,r,i){if(t!==null){var o=t.memoizedProps;if(hi(o,r)&&t.ref===e.ref)if(Me=!1,e.pendingProps=r=o,(t.lanes&i)!==0)(t.flags&131072)!==0&&(Me=!0);else return e.lanes=t.lanes,Ft(t,e,i)}return Qs(t,e,n,r,i)}function qd(t,e,n){var r=e.pendingProps,i=r.children,o=t!==null?t.memoizedState:null;if(r.mode==="hidden")if((e.mode&1)===0)e.memoizedState={baseLanes:0,cachePool:null,transitions:null},W(ur,Ve),Ve|=n;else{if((n&1073741824)===0)return t=o!==null?o.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,W(ur,Ve),Ve|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,W(ur,Ve),Ve|=r}else o!==null?(r=o.baseLanes|n,e.memoizedState=null):r=n,W(ur,Ve),Ve|=r;return Ee(t,e,i,n),e.child}function Zd(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Qs(t,e,n,r,i){var o=Le(n)?zn:we.current;return o=gr(e,o),mr(e,i),n=Ma(t,e,n,r,o,i),r=Da(),t!==null&&!Me?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Ft(t,e,i)):(Y&&r&&xa(e),e.flags|=1,Ee(t,e,n,i),e.child)}function ff(t,e,n,r,i){if(Le(n)){var o=!0;Io(e)}else o=!1;if(mr(e,i),e.stateNode===null)So(t,e),$d(e,n,r),Hs(e,n,r,i),r=!0;else if(t===null){var l=e.stateNode,s=e.memoizedProps;l.props=s;var a=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=rt(u):(u=Le(n)?zn:we.current,u=gr(e,u));var c=n.getDerivedStateFromProps,p=typeof c=="function"||typeof l.getSnapshotBeforeUpdate=="function";p||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||a!==u)&&of(e,l,r,u),Qt=!1;var _=e.memoizedState;l.state=_,Wo(e,r,l,i),a=e.memoizedState,s!==r||_!==a||De.current||Qt?(typeof c=="function"&&(Ws(e,n,c,r),a=e.memoizedState),(s=Qt||rf(e,n,s,r,_,a,u))?(p||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(e.flags|=4194308)):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=a),l.props=r,l.state=a,l.context=u,r=s):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{l=e.stateNode,Ed(t,e),s=e.memoizedProps,u=e.type===e.elementType?s:ct(e.type,s),l.props=u,p=e.pendingProps,_=l.context,a=n.contextType,typeof a=="object"&&a!==null?a=rt(a):(a=Le(n)?zn:we.current,a=gr(e,a));var v=n.getDerivedStateFromProps;(c=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==p||_!==a)&&of(e,l,r,a),Qt=!1,_=e.memoizedState,l.state=_,Wo(e,r,l,i);var y=e.memoizedState;s!==p||_!==y||De.current||Qt?(typeof v=="function"&&(Ws(e,n,v,r),y=e.memoizedState),(u=Qt||rf(e,n,u,r,_,y,a)||!1)?(c||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,y,a),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,y,a)),typeof l.componentDidUpdate=="function"&&(e.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=y),l.props=r,l.state=y,l.context=a,r=u):(typeof l.componentDidUpdate!="function"||s===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),r=!1)}return Ys(t,e,n,r,o,i)}function Ys(t,e,n,r,i,o){Zd(t,e);var l=(e.flags&128)!==0;if(!r&&!l)return i&&Gc(e,n,!1),Ft(t,e,o);r=e.stateNode,A0.current=e;var s=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&l?(e.child=yr(e,t.child,null,o),e.child=yr(e,null,s,o)):Ee(t,e,s,o),e.memoizedState=r.state,i&&Gc(e,n,!0),e.child}function Jd(t){var e=t.stateNode;e.pendingContext?Xc(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Xc(t,e.context,!1),Na(t,e.containerInfo)}function df(t,e,n,r,i){return vr(),ka(i),e.flags|=256,Ee(t,e,n,r),e.child}var $s={dehydrated:null,treeContext:null,retryLane:0};function Xs(t){return{baseLanes:t,cachePool:null,transitions:null}}function ep(t,e,n){var r=e.pendingProps,i=X.current,o=!1,l=(e.flags&128)!==0,s;if((s=l)||(s=t!==null&&t.memoizedState===null?!1:(i&2)!==0),s?(o=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),W(X,i&1),t===null)return Us(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((e.mode&1)===0?e.lanes=1:t.data==="$!"?e.lanes=8:e.lanes=1073741824,null):(l=r.children,t=r.fallback,o?(r=e.mode,o=e.child,l={mode:"hidden",children:l},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=l):o=sl(l,r,0,null),t=Pn(t,r,n,null),o.return=e,t.return=e,o.sibling=t,e.child=o,e.child.memoizedState=Xs(n),e.memoizedState=$s,t):Aa(e,l));if(i=t.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return I0(t,e,l,r,s,i,n);if(o){o=r.fallback,l=e.mode,i=t.child,s=i.sibling;var a={mode:"hidden",children:r.children};return(l&1)===0&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=a,e.deletions=null):(r=rn(i,a),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?o=rn(s,o):(o=Pn(o,l,n,null),o.flags|=2),o.return=e,r.return=e,r.sibling=o,e.child=r,r=o,o=e.child,l=t.child.memoizedState,l=l===null?Xs(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},o.memoizedState=l,o.childLanes=t.childLanes&~n,e.memoizedState=$s,r}return o=t.child,t=o.sibling,r=rn(o,{mode:"visible",children:r.children}),(e.mode&1)===0&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Aa(t,e){return e=sl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function mo(t,e,n,r){return r!==null&&ka(r),yr(e,t.child,null,n),t=Aa(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function I0(t,e,n,r,i,o,l){if(n)return e.flags&256?(e.flags&=-257,r=as(Error(N(422))),mo(t,e,l,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(o=r.fallback,i=e.mode,r=sl({mode:"visible",children:r.children},i,0,null),o=Pn(o,i,l,null),o.flags|=2,r.return=e,o.return=e,r.sibling=o,e.child=r,(e.mode&1)!==0&&yr(e,t.child,null,l),e.child.memoizedState=Xs(l),e.memoizedState=$s,o);if((e.mode&1)===0)return mo(t,e,l,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(N(419)),r=as(o,r,void 0),mo(t,e,l,r)}if(s=(l&t.childLanes)!==0,Me||s){if(r=fe,r!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=(i&(r.suspendedLanes|l))!==0?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Lt(t,i),mt(r,t,i,-1))}return Wa(),r=as(Error(N(421))),mo(t,e,l,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=K0.bind(null,t),i._reactRetry=e,null):(t=o.treeContext,We=Jt(i.nextSibling),He=e,Y=!0,dt=null,t!==null&&(Je[et++]=Pt,Je[et++]=zt,Je[et++]=On,Pt=t.id,zt=t.overflow,On=e),e=Aa(e,r.children),e.flags|=4096,e)}function pf(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Vs(t.return,e,n)}function us(t,e,n,r,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function tp(t,e,n){var r=e.pendingProps,i=r.revealOrder,o=r.tail;if(Ee(t,e,r.children,n),r=X.current,(r&2)!==0)r=r&1|2,e.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&pf(t,n,e);else if(t.tag===19)pf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(W(X,r),(e.mode&1)===0)e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Ho(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),us(e,!1,i,n,o);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Ho(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}us(e,!0,n,null,o);break;case"together":us(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function So(t,e){(e.mode&1)===0&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ft(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Dn|=e.lanes,(n&e.childLanes)===0)return null;if(t!==null&&e.child!==t.child)throw Error(N(153));if(e.child!==null){for(t=e.child,n=rn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=rn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function B0(t,e,n){switch(e.tag){case 3:Jd(e),vr();break;case 5:Td(e);break;case 1:Le(e.type)&&Io(e);break;case 4:Na(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;W(Uo,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(W(X,X.current&1),e.flags|=128,null):(n&e.child.childLanes)!==0?ep(t,e,n):(W(X,X.current&1),t=Ft(t,e,n),t!==null?t.sibling:null);W(X,X.current&1);break;case 19:if(r=(n&e.childLanes)!==0,(t.flags&128)!==0){if(r)return tp(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),W(X,X.current),r)break;return null;case 22:case 23:return e.lanes=0,qd(t,e,n)}return Ft(t,e,n)}var np,Gs,rp,ip;np=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Gs=function(){};rp=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Tn(wt.current);var o=null;switch(n){case"input":i=gs(t,i),r=gs(t,r),o=[];break;case"select":i=K({},i,{value:void 0}),r=K({},r,{value:void 0}),o=[];break;case"textarea":i=xs(t,i),r=xs(t,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Fo)}ks(n,r);var l;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var s=i[u];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ai.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var a=r[u];if(s=i?.[u],r.hasOwnProperty(u)&&a!==s&&(a!=null||s!=null))if(u==="style")if(s){for(l in s)!s.hasOwnProperty(l)||a&&a.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in a)a.hasOwnProperty(l)&&s[l]!==a[l]&&(n||(n={}),n[l]=a[l])}else n||(o||(o=[]),o.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(o=o||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(o=o||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ai.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&H("scroll",t),o||s===a||(o=[])):(o=o||[]).push(u,a))}n&&(o=o||[]).push("style",n);var u=o;(e.updateQueue=u)&&(e.flags|=4)}};ip=function(t,e,n,r){n!==r&&(e.flags|=4)};function Yr(t,e){if(!Y)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function ye(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function j0(t,e,n){var r=e.pendingProps;switch(wa(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ye(e),null;case 1:return Le(e.type)&&Ao(),ye(e),null;case 3:return r=e.stateNode,xr(),R(De),R(we),za(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(fo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,dt!==null&&(ra(dt),dt=null))),Gs(t,e),ye(e),null;case 5:Pa(e);var i=Tn(xi.current);if(n=e.type,t!==null&&e.stateNode!=null)rp(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(N(166));return ye(e),null}if(t=Tn(wt.current),fo(e)){r=e.stateNode,n=e.type;var o=e.memoizedProps;switch(r[yt]=e,r[vi]=o,t=(e.mode&1)!==0,n){case"dialog":H("cancel",r),H("close",r);break;case"iframe":case"object":case"embed":H("load",r);break;case"video":case"audio":for(i=0;i<Zr.length;i++)H(Zr[i],r);break;case"source":H("error",r);break;case"img":case"image":case"link":H("error",r),H("load",r);break;case"details":H("toggle",r);break;case"input":xc(r,o),H("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},H("invalid",r);break;case"textarea":kc(r,o),H("invalid",r)}ks(n,o),i=null;for(var l in o)if(o.hasOwnProperty(l)){var s=o[l];l==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&co(r.textContent,s,t),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&co(r.textContent,s,t),i=["children",""+s]):ai.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&H("scroll",r)}switch(n){case"input":Zi(r),wc(r,o,!0);break;case"textarea":Zi(r),Sc(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Fo)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Mf(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=l.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=l.createElement(n,{is:r.is}):(t=l.createElement(n),n==="select"&&(l=t,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):t=l.createElementNS(t,n),t[yt]=e,t[vi]=r,np(t,e,!1,!1),e.stateNode=t;e:{switch(l=Ss(n,r),n){case"dialog":H("cancel",t),H("close",t),i=r;break;case"iframe":case"object":case"embed":H("load",t),i=r;break;case"video":case"audio":for(i=0;i<Zr.length;i++)H(Zr[i],t);i=r;break;case"source":H("error",t),i=r;break;case"img":case"image":case"link":H("error",t),H("load",t),i=r;break;case"details":H("toggle",t),i=r;break;case"input":xc(t,r),i=gs(t,r),H("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=K({},r,{value:void 0}),H("invalid",t);break;case"textarea":kc(t,r),i=xs(t,r),H("invalid",t);break;default:i=r}ks(n,i),s=i;for(o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="style"?Ff(t,a):o==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Df(t,a)):o==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&ui(t,a):typeof a=="number"&&ui(t,""+a):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ai.hasOwnProperty(o)?a!=null&&o==="onScroll"&&H("scroll",t):a!=null&&la(t,o,a,l))}switch(n){case"input":Zi(t),wc(t,r,!1);break;case"textarea":Zi(t),Sc(t);break;case"option":r.value!=null&&t.setAttribute("value",""+on(r.value));break;case"select":t.multiple=!!r.multiple,o=r.value,o!=null?cr(t,!!r.multiple,o,!1):r.defaultValue!=null&&cr(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Fo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ye(e),null;case 6:if(t&&e.stateNode!=null)ip(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(N(166));if(n=Tn(xi.current),Tn(wt.current),fo(e)){if(r=e.stateNode,n=e.memoizedProps,r[yt]=e,(o=r.nodeValue!==n)&&(t=He,t!==null))switch(t.tag){case 3:co(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&co(r.nodeValue,n,(t.mode&1)!==0)}o&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[yt]=e,e.stateNode=r}return ye(e),null;case 13:if(R(X),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Y&&We!==null&&(e.mode&1)!==0&&(e.flags&128)===0)kd(),vr(),e.flags|=98560,o=!1;else if(o=fo(e),r!==null&&r.dehydrated!==null){if(t===null){if(!o)throw Error(N(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(N(317));o[yt]=e}else vr(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;ye(e),o=!1}else dt!==null&&(ra(dt),dt=null),o=!0;if(!o)return e.flags&65536?e:null}return(e.flags&128)!==0?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,(e.mode&1)!==0&&(t===null||(X.current&1)!==0?ae===0&&(ae=3):Wa())),e.updateQueue!==null&&(e.flags|=4),ye(e),null);case 4:return xr(),Gs(t,e),t===null&&_i(e.stateNode.containerInfo),ye(e),null;case 10:return Ca(e.type._context),ye(e),null;case 17:return Le(e.type)&&Ao(),ye(e),null;case 19:if(R(X),o=e.memoizedState,o===null)return ye(e),null;if(r=(e.flags&128)!==0,l=o.rendering,l===null)if(r)Yr(o,!1);else{if(ae!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(l=Ho(t),l!==null){for(e.flags|=128,Yr(o,!1),r=l.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)o=n,t=r,o.flags&=14680066,l=o.alternate,l===null?(o.childLanes=0,o.lanes=t,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,t=l.dependencies,o.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return W(X,X.current&1|2),e.child}t=t.sibling}o.tail!==null&&ie()>kr&&(e.flags|=128,r=!0,Yr(o,!1),e.lanes=4194304)}else{if(!r)if(t=Ho(l),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Yr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!Y)return ye(e),null}else 2*ie()-o.renderingStartTime>kr&&n!==1073741824&&(e.flags|=128,r=!0,Yr(o,!1),e.lanes=4194304);o.isBackwards?(l.sibling=e.child,e.child=l):(n=o.last,n!==null?n.sibling=l:e.child=l,o.last=l)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=ie(),e.sibling=null,n=X.current,W(X,r?n&1|2:n&1),e):(ye(e),null);case 22:case 23:return Va(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&(e.mode&1)!==0?(Ve&1073741824)!==0&&(ye(e),e.subtreeFlags&6&&(e.flags|=8192)):ye(e),null;case 24:return null;case 25:return null}throw Error(N(156,e.tag))}function U0(t,e){switch(wa(e),e.tag){case 1:return Le(e.type)&&Ao(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return xr(),R(De),R(we),za(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 5:return Pa(e),null;case 13:if(R(X),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(N(340));vr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return R(X),null;case 4:return xr(),null;case 10:return Ca(e.type._context),null;case 22:case 23:return Va(),null;case 24:return null;default:return null}}var ho=!1,xe=!1,V0=typeof WeakSet=="function"?WeakSet:Set,P=null;function ar(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){te(t,e,r)}else n.current=null}function Ks(t,e,n){try{n()}catch(r){te(t,e,r)}}var mf=!1;function W0(t,e){if(Ds=Mo,t=ud(),ya(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var l=0,s=-1,a=-1,u=0,c=0,p=t,_=null;t:for(;;){for(var v;p!==n||i!==0&&p.nodeType!==3||(s=l+i),p!==o||r!==0&&p.nodeType!==3||(a=l+r),p.nodeType===3&&(l+=p.nodeValue.length),(v=p.firstChild)!==null;)_=p,p=v;for(;;){if(p===t)break t;if(_===n&&++u===i&&(s=l),_===o&&++c===r&&(a=l),(v=p.nextSibling)!==null)break;p=_,_=p.parentNode}p=v}n=s===-1||a===-1?null:{start:s,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ls={focusedElem:t,selectionRange:n},Mo=!1,P=e;P!==null;)if(e=P,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,P=t;else for(;P!==null;){e=P;try{var y=e.alternate;if((e.flags&1024)!==0)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var h=y.memoizedProps,k=y.memoizedState,g=e.stateNode,d=g.getSnapshotBeforeUpdate(e.elementType===e.type?h:ct(e.type,h),k);g.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var m=e.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(x){te(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,P=t;break}P=e.return}return y=mf,mf=!1,y}function oi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var o=i.destroy;i.destroy=void 0,o!==void 0&&Ks(e,n,o)}i=i.next}while(i!==r)}}function ol(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function qs(t){var e=t.ref;if(e!==null){var n=t.stateNode;t.tag,t=n,typeof e=="function"?e(t):e.current=t}}function op(t){var e=t.alternate;e!==null&&(t.alternate=null,op(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[yt],delete e[vi],delete e[Is],delete e[b0],delete e[C0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function lp(t){return t.tag===5||t.tag===3||t.tag===4}function hf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||lp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Zs(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Fo));else if(r!==4&&(t=t.child,t!==null))for(Zs(t,e,n),t=t.sibling;t!==null;)Zs(t,e,n),t=t.sibling}function Js(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Js(t,e,n),t=t.sibling;t!==null;)Js(t,e,n),t=t.sibling}var de=null,ft=!1;function Ht(t,e,n){for(n=n.child;n!==null;)sp(t,e,n),n=n.sibling}function sp(t,e,n){if(xt&&typeof xt.onCommitFiberUnmount=="function")try{xt.onCommitFiberUnmount(qo,n)}catch{}switch(n.tag){case 5:xe||ar(n,e);case 6:var r=de,i=ft;de=null,Ht(t,e,n),de=r,ft=i,de!==null&&(ft?(t=de,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):de.removeChild(n.stateNode));break;case 18:de!==null&&(ft?(t=de,n=n.stateNode,t.nodeType===8?ns(t.parentNode,n):t.nodeType===1&&ns(t,n),pi(t)):ns(de,n.stateNode));break;case 4:r=de,i=ft,de=n.stateNode.containerInfo,ft=!0,Ht(t,e,n),de=r,ft=i;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,l=o.destroy;o=o.tag,l!==void 0&&((o&2)!==0||(o&4)!==0)&&Ks(n,e,l),i=i.next}while(i!==r)}Ht(t,e,n);break;case 1:if(!xe&&(ar(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){te(n,e,s)}Ht(t,e,n);break;case 21:Ht(t,e,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,Ht(t,e,n),xe=r):Ht(t,e,n);break;default:Ht(t,e,n)}}function _f(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new V0),e.forEach(function(r){var i=q0.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function ut(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=t,l=e,s=l;e:for(;s!==null;){switch(s.tag){case 5:de=s.stateNode,ft=!1;break e;case 3:de=s.stateNode.containerInfo,ft=!0;break e;case 4:de=s.stateNode.containerInfo,ft=!0;break e}s=s.return}if(de===null)throw Error(N(160));sp(o,l,i),de=null,ft=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(u){te(i,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)ap(e,t),e=e.sibling}function ap(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ut(e,t),gt(t),r&4){try{oi(3,t,t.return),ol(3,t)}catch(h){te(t,t.return,h)}try{oi(5,t,t.return)}catch(h){te(t,t.return,h)}}break;case 1:ut(e,t),gt(t),r&512&&n!==null&&ar(n,n.return);break;case 5:if(ut(e,t),gt(t),r&512&&n!==null&&ar(n,n.return),t.flags&32){var i=t.stateNode;try{ui(i,"")}catch(h){te(t,t.return,h)}}if(r&4&&(i=t.stateNode,i!=null)){var o=t.memoizedProps,l=n!==null?n.memoizedProps:o,s=t.type,a=t.updateQueue;if(t.updateQueue=null,a!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&zf(i,o),Ss(s,l);var u=Ss(s,o);for(l=0;l<a.length;l+=2){var c=a[l],p=a[l+1];c==="style"?Ff(i,p):c==="dangerouslySetInnerHTML"?Df(i,p):c==="children"?ui(i,p):la(i,c,p,u)}switch(s){case"input":vs(i,o);break;case"textarea":Of(i,o);break;case"select":var _=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?cr(i,!!o.multiple,v,!1):_!==!!o.multiple&&(o.defaultValue!=null?cr(i,!!o.multiple,o.defaultValue,!0):cr(i,!!o.multiple,o.multiple?[]:"",!1))}i[vi]=o}catch(h){te(t,t.return,h)}}break;case 6:if(ut(e,t),gt(t),r&4){if(t.stateNode===null)throw Error(N(162));i=t.stateNode,o=t.memoizedProps;try{i.nodeValue=o}catch(h){te(t,t.return,h)}}break;case 3:if(ut(e,t),gt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{pi(e.containerInfo)}catch(h){te(t,t.return,h)}break;case 4:ut(e,t),gt(t);break;case 13:ut(e,t),gt(t),i=t.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(ja=ie())),r&4&&_f(t);break;case 22:if(c=n!==null&&n.memoizedState!==null,t.mode&1?(xe=(u=xe)||c,ut(e,t),xe=u):ut(e,t),gt(t),r&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!c&&(t.mode&1)!==0)for(P=t,c=t.child;c!==null;){for(p=P=c;P!==null;){switch(_=P,v=_.child,_.tag){case 0:case 11:case 14:case 15:oi(4,_,_.return);break;case 1:ar(_,_.return);var y=_.stateNode;if(typeof y.componentWillUnmount=="function"){r=_,n=_.return;try{e=r,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(h){te(r,n,h)}}break;case 5:ar(_,_.return);break;case 22:if(_.memoizedState!==null){vf(p);continue}}v!==null?(v.return=_,P=v):vf(p)}c=c.sibling}e:for(c=null,p=t;;){if(p.tag===5){if(c===null){c=p;try{i=p.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=p.stateNode,a=p.memoizedProps.style,l=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=Lf("display",l))}catch(h){te(t,t.return,h)}}}else if(p.tag===6){if(c===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(h){te(t,t.return,h)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;c===p&&(c=null),p=p.return}c===p&&(c=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:ut(e,t),gt(t),r&4&&_f(t);break;case 21:break;default:ut(e,t),gt(t)}}function gt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(lp(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(ui(i,""),r.flags&=-33);var o=hf(t);Js(t,o,i);break;case 3:case 4:var l=r.stateNode.containerInfo,s=hf(t);Zs(t,s,l);break;default:throw Error(N(161))}}catch(a){te(t,t.return,a)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function H0(t,e,n){P=t,up(t,e,n)}function up(t,e,n){for(var r=(t.mode&1)!==0;P!==null;){var i=P,o=i.child;if(i.tag===22&&r){var l=i.memoizedState!==null||ho;if(!l){var s=i.alternate,a=s!==null&&s.memoizedState!==null||xe;s=ho;var u=xe;if(ho=l,(xe=a)&&!u)for(P=i;P!==null;)l=P,a=l.child,l.tag===22&&l.memoizedState!==null?yf(i):a!==null?(a.return=l,P=a):yf(i);for(;o!==null;)P=o,up(o,e,n),o=o.sibling;P=i,ho=s,xe=u}gf(t,e,n)}else(i.subtreeFlags&8772)!==0&&o!==null?(o.return=i,P=o):gf(t,e,n)}}function gf(t){for(;P!==null;){var e=P;if((e.flags&8772)!==0){var n=e.alternate;try{if((e.flags&8772)!==0)switch(e.tag){case 0:case 11:case 15:xe||ol(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!xe)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:ct(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=e.updateQueue;o!==null&&ef(e,o,r);break;case 3:var l=e.updateQueue;if(l!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}ef(e,l,n)}break;case 5:var s=e.stateNode;if(n===null&&e.flags&4){n=s;var a=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var p=c.dehydrated;p!==null&&pi(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}xe||e.flags&512&&qs(e)}catch(_){te(e,e.return,_)}}if(e===t){P=null;break}if(n=e.sibling,n!==null){n.return=e.return,P=n;break}P=e.return}}function vf(t){for(;P!==null;){var e=P;if(e===t){P=null;break}var n=e.sibling;if(n!==null){n.return=e.return,P=n;break}P=e.return}}function yf(t){for(;P!==null;){var e=P;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ol(4,e)}catch(a){te(e,n,a)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(a){te(e,i,a)}}var o=e.return;try{qs(e)}catch(a){te(e,o,a)}break;case 5:var l=e.return;try{qs(e)}catch(a){te(e,l,a)}}}catch(a){te(e,e.return,a)}if(e===t){P=null;break}var s=e.sibling;if(s!==null){s.return=e.return,P=s;break}P=e.return}}var R0=Math.ceil,Yo=At.ReactCurrentDispatcher,Ia=At.ReactCurrentOwner,nt=At.ReactCurrentBatchConfig,A=0,fe=null,le=null,pe=0,Ve=0,ur=an(0),ae=0,bi=null,Dn=0,ll=0,Ba=0,li=null,Oe=null,ja=0,kr=1/0,Tt=null,$o=!1,ea=null,tn=null,_o=!1,Gt=null,Xo=0,si=0,ta=null,bo=-1,Co=0;function Te(){return(A&6)!==0?ie():bo!==-1?bo:bo=ie()}function nn(t){return(t.mode&1)===0?1:(A&2)!==0&&pe!==0?pe&-pe:T0.transition!==null?(Co===0&&(Co=$f()),Co):(t=I,t!==0||(t=window.event,t=t===void 0?16:ed(t.type)),t)}function mt(t,e,n,r){if(50<si)throw si=0,ta=null,Error(N(185));Ci(t,n,r),((A&2)===0||t!==fe)&&(t===fe&&((A&2)===0&&(ll|=n),ae===4&&$t(t,pe)),Fe(t,r),n===1&&A===0&&(e.mode&1)===0&&(kr=ie()+500,nl&&un()))}function Fe(t,e){var n=t.callbackNode;Ph(t,e);var r=Oo(t,t===fe?pe:0);if(r===0)n!==null&&Ec(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Ec(n),e===1)t.tag===0?E0(xf.bind(null,t)):yd(xf.bind(null,t)),k0(function(){(A&6)===0&&un()}),n=null;else{switch(Xf(r)){case 1:n=fa;break;case 4:n=Qf;break;case 16:n=zo;break;case 536870912:n=Yf;break;default:n=zo}n=gp(n,cp.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function cp(t,e){if(bo=-1,Co=0,(A&6)!==0)throw Error(N(327));var n=t.callbackNode;if(hr()&&t.callbackNode!==n)return null;var r=Oo(t,t===fe?pe:0);if(r===0)return null;if((r&30)!==0||(r&t.expiredLanes)!==0||e)e=Go(t,r);else{e=r;var i=A;A|=2;var o=dp();(fe!==t||pe!==e)&&(Tt=null,kr=ie()+500,Nn(t,e));do try{$0();break}catch(s){fp(t,s)}while(!0);ba(),Yo.current=o,A=i,le!==null?e=0:(fe=null,pe=0,e=ae)}if(e!==0){if(e===2&&(i=Ns(t),i!==0&&(r=i,e=na(t,i))),e===1)throw n=bi,Nn(t,0),$t(t,r),Fe(t,ie()),n;if(e===6)$t(t,r);else{if(i=t.current.alternate,(r&30)===0&&!Q0(i)&&(e=Go(t,r),e===2&&(o=Ns(t),o!==0&&(r=o,e=na(t,o))),e===1))throw n=bi,Nn(t,0),$t(t,r),Fe(t,ie()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(N(345));case 2:bn(t,Oe,Tt);break;case 3:if($t(t,r),(r&130023424)===r&&(e=ja+500-ie(),10<e)){if(Oo(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){Te(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=As(bn.bind(null,t,Oe,Tt),e);break}bn(t,Oe,Tt);break;case 4:if($t(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var l=31-pt(r);o=1<<l,l=e[l],l>i&&(i=l),r&=~o}if(r=i,r=ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*R0(r/1960))-r,10<r){t.timeoutHandle=As(bn.bind(null,t,Oe,Tt),r);break}bn(t,Oe,Tt);break;case 5:bn(t,Oe,Tt);break;default:throw Error(N(329))}}}return Fe(t,ie()),t.callbackNode===n?cp.bind(null,t):null}function na(t,e){var n=li;return t.current.memoizedState.isDehydrated&&(Nn(t,e).flags|=256),t=Go(t,e),t!==2&&(e=Oe,Oe=n,e!==null&&ra(e)),t}function ra(t){Oe===null?Oe=t:Oe.push.apply(Oe,t)}function Q0(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!ht(o(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $t(t,e){for(e&=~Ba,e&=~ll,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-pt(e),r=1<<n;t[n]=-1,e&=~r}}function xf(t){if((A&6)!==0)throw Error(N(327));hr();var e=Oo(t,0);if((e&1)===0)return Fe(t,ie()),null;var n=Go(t,e);if(t.tag!==0&&n===2){var r=Ns(t);r!==0&&(e=r,n=na(t,r))}if(n===1)throw n=bi,Nn(t,0),$t(t,e),Fe(t,ie()),n;if(n===6)throw Error(N(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,bn(t,Oe,Tt),Fe(t,ie()),null}function Ua(t,e){var n=A;A|=1;try{return t(e)}finally{A=n,A===0&&(kr=ie()+500,nl&&un())}}function Ln(t){Gt!==null&&Gt.tag===0&&(A&6)===0&&hr();var e=A;A|=1;var n=nt.transition,r=I;try{if(nt.transition=null,I=1,t)return t()}finally{I=r,nt.transition=n,A=e,(A&6)===0&&un()}}function Va(){Ve=ur.current,R(ur)}function Nn(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,w0(n)),le!==null)for(n=le.return;n!==null;){var r=n;switch(wa(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ao();break;case 3:xr(),R(De),R(we),za();break;case 5:Pa(r);break;case 4:xr();break;case 13:R(X);break;case 19:R(X);break;case 10:Ca(r.type._context);break;case 22:case 23:Va()}n=n.return}if(fe=t,le=t=rn(t.current,null),pe=Ve=e,ae=0,bi=null,Ba=ll=Dn=0,Oe=li=null,En!==null){for(e=0;e<En.length;e++)if(n=En[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var l=o.next;o.next=i,r.next=l}n.pending=r}En=null}return t}function fp(t,e){do{var n=le;try{if(ba(),wo.current=Qo,Ro){for(var r=G.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Ro=!1}if(Mn=0,ce=se=G=null,ii=!1,wi=0,Ia.current=null,n===null||n.return===null){ae=1,bi=e,le=null;break}e:{var o=t,l=n.return,s=n,a=e;if(e=pe,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,c=s,p=c.tag;if((c.mode&1)===0&&(p===0||p===11||p===15)){var _=c.alternate;_?(c.updateQueue=_.updateQueue,c.memoizedState=_.memoizedState,c.lanes=_.lanes):(c.updateQueue=null,c.memoizedState=null)}var v=sf(l);if(v!==null){v.flags&=-257,af(v,l,s,o,e),v.mode&1&&lf(o,u,e),e=v,a=u;var y=e.updateQueue;if(y===null){var h=new Set;h.add(a),e.updateQueue=h}else y.add(a);break e}else{if((e&1)===0){lf(o,u,e),Wa();break e}a=Error(N(426))}}else if(Y&&s.mode&1){var k=sf(l);if(k!==null){(k.flags&65536)===0&&(k.flags|=256),af(k,l,s,o,e),ka(wr(a,s));break e}}o=a=wr(a,s),ae!==4&&(ae=2),li===null?li=[o]:li.push(o),o=l;do{switch(o.tag){case 3:o.flags|=65536,e&=-e,o.lanes|=e;var g=Xd(o,a,e);Jc(o,g);break e;case 1:s=a;var d=o.type,m=o.stateNode;if((o.flags&128)===0&&(typeof d.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(tn===null||!tn.has(m)))){o.flags|=65536,e&=-e,o.lanes|=e;var x=Gd(o,s,e);Jc(o,x);break e}}o=o.return}while(o!==null)}mp(n)}catch(w){e=w,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function dp(){var t=Yo.current;return Yo.current=Qo,t===null?Qo:t}function Wa(){(ae===0||ae===3||ae===2)&&(ae=4),fe===null||(Dn&268435455)===0&&(ll&268435455)===0||$t(fe,pe)}function Go(t,e){var n=A;A|=2;var r=dp();(fe!==t||pe!==e)&&(Tt=null,Nn(t,e));do try{Y0();break}catch(i){fp(t,i)}while(!0);if(ba(),A=n,Yo.current=r,le!==null)throw Error(N(261));return fe=null,pe=0,ae}function Y0(){for(;le!==null;)pp(le)}function $0(){for(;le!==null&&!xh();)pp(le)}function pp(t){var e=_p(t.alternate,t,Ve);t.memoizedProps=t.pendingProps,e===null?mp(t):le=e,Ia.current=null}function mp(t){var e=t;do{var n=e.alternate;if(t=e.return,(e.flags&32768)===0){if(n=j0(n,e,Ve),n!==null){le=n;return}}else{if(n=U0(n,e),n!==null){n.flags&=32767,le=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ae=6,le=null;return}}if(e=e.sibling,e!==null){le=e;return}le=e=t}while(e!==null);ae===0&&(ae=5)}function bn(t,e,n){var r=I,i=nt.transition;try{nt.transition=null,I=1,X0(t,e,n,r)}finally{nt.transition=i,I=r}return null}function X0(t,e,n,r){do hr();while(Gt!==null);if((A&6)!==0)throw Error(N(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(N(177));t.callbackNode=null,t.callbackPriority=0;var o=n.lanes|n.childLanes;if(zh(t,o),t===fe&&(le=fe=null,pe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||_o||(_o=!0,gp(zo,function(){return hr(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=nt.transition,nt.transition=null;var l=I;I=1;var s=A;A|=4,Ia.current=null,W0(t,n),ap(n,t),_0(Ls),Mo=!!Ds,Ls=Ds=null,t.current=n,H0(n,t,i),wh(),A=s,I=l,nt.transition=o}else t.current=n;if(_o&&(_o=!1,Gt=t,Xo=i),o=t.pendingLanes,o===0&&(tn=null),bh(n.stateNode,r),Fe(t,ie()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if($o)throw $o=!1,t=ea,ea=null,t;return(Xo&1)!==0&&t.tag!==0&&hr(),o=t.pendingLanes,(o&1)!==0?t===ta?si++:(si=0,ta=t):si=0,un(),null}function hr(){if(Gt!==null){var t=Xf(Xo),e=nt.transition,n=I;try{if(nt.transition=null,I=16>t?16:t,Gt===null)var r=!1;else{if(t=Gt,Gt=null,Xo=0,(A&6)!==0)throw Error(N(331));var i=A;for(A|=4,P=t.current;P!==null;){var o=P,l=o.child;if((P.flags&16)!==0){var s=o.deletions;if(s!==null){for(var a=0;a<s.length;a++){var u=s[a];for(P=u;P!==null;){var c=P;switch(c.tag){case 0:case 11:case 15:oi(8,c,o)}var p=c.child;if(p!==null)p.return=c,P=p;else for(;P!==null;){c=P;var _=c.sibling,v=c.return;if(op(c),c===u){P=null;break}if(_!==null){_.return=v,P=_;break}P=v}}}var y=o.alternate;if(y!==null){var h=y.child;if(h!==null){y.child=null;do{var k=h.sibling;h.sibling=null,h=k}while(h!==null)}}P=o}}if((o.subtreeFlags&2064)!==0&&l!==null)l.return=o,P=l;else e:for(;P!==null;){if(o=P,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:oi(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,P=g;break e}P=o.return}}var d=t.current;for(P=d;P!==null;){l=P;var m=l.child;if((l.subtreeFlags&2064)!==0&&m!==null)m.return=l,P=m;else e:for(l=d;P!==null;){if(s=P,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:ol(9,s)}}catch(w){te(s,s.return,w)}if(s===l){P=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,P=x;break e}P=s.return}}if(A=i,un(),xt&&typeof xt.onPostCommitFiberRoot=="function")try{xt.onPostCommitFiberRoot(qo,t)}catch{}r=!0}return r}finally{I=n,nt.transition=e}}return!1}function wf(t,e,n){e=wr(n,e),e=Xd(t,e,1),t=en(t,e,1),e=Te(),t!==null&&(Ci(t,1,e),Fe(t,e))}function te(t,e,n){if(t.tag===3)wf(t,t,n);else for(;e!==null;){if(e.tag===3){wf(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(tn===null||!tn.has(r))){t=wr(n,t),t=Gd(e,t,1),e=en(e,t,1),t=Te(),e!==null&&(Ci(e,1,t),Fe(e,t));break}}e=e.return}}function G0(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Te(),t.pingedLanes|=t.suspendedLanes&n,fe===t&&(pe&n)===n&&(ae===4||ae===3&&(pe&130023424)===pe&&500>ie()-ja?Nn(t,0):Ba|=n),Fe(t,e)}function hp(t,e){e===0&&((t.mode&1)===0?e=1:(e=to,to<<=1,(to&130023424)===0&&(to=4194304)));var n=Te();t=Lt(t,e),t!==null&&(Ci(t,e,n),Fe(t,n))}function K0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),hp(t,n)}function q0(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(e),hp(t,n)}var _p;_p=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||De.current)Me=!0;else{if((t.lanes&n)===0&&(e.flags&128)===0)return Me=!1,B0(t,e,n);Me=(t.flags&131072)!==0}else Me=!1,Y&&(e.flags&1048576)!==0&&xd(e,jo,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;So(t,e),t=e.pendingProps;var i=gr(e,we.current);mr(e,n),i=Ma(null,e,r,t,i,n);var o=Da();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Le(r)?(o=!0,Io(e)):o=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Ta(e),i.updater=il,e.stateNode=i,i._reactInternals=e,Hs(e,r,t,n),e=Ys(null,e,r,!0,o,n)):(e.tag=0,Y&&o&&xa(e),Ee(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(So(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=J0(r),t=ct(r,t),i){case 0:e=Qs(null,e,r,t,n);break e;case 1:e=ff(null,e,r,t,n);break e;case 11:e=uf(null,e,r,t,n);break e;case 14:e=cf(null,e,r,ct(r.type,t),n);break e}throw Error(N(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ct(r,i),Qs(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ct(r,i),ff(t,e,r,i,n);case 3:e:{if(Jd(e),t===null)throw Error(N(387));r=e.pendingProps,o=e.memoizedState,i=o.element,Ed(t,e),Wo(e,r,null,n);var l=e.memoizedState;if(r=l.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},e.updateQueue.baseState=o,e.memoizedState=o,e.flags&256){i=wr(Error(N(423)),e),e=df(t,e,r,n,i);break e}else if(r!==i){i=wr(Error(N(424)),e),e=df(t,e,r,n,i);break e}else for(We=Jt(e.stateNode.containerInfo.firstChild),He=e,Y=!0,dt=null,n=bd(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(vr(),r===i){e=Ft(t,e,n);break e}Ee(t,e,r,n)}e=e.child}return e;case 5:return Td(e),t===null&&Us(e),r=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,Fs(r,i)?l=null:o!==null&&Fs(r,o)&&(e.flags|=32),Zd(t,e),Ee(t,e,l,n),e.child;case 6:return t===null&&Us(e),null;case 13:return ep(t,e,n);case 4:return Na(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=yr(e,null,r,n):Ee(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ct(r,i),uf(t,e,r,i,n);case 7:return Ee(t,e,e.pendingProps,n),e.child;case 8:return Ee(t,e,e.pendingProps.children,n),e.child;case 12:return Ee(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,o=e.memoizedProps,l=i.value,W(Uo,r._currentValue),r._currentValue=l,o!==null)if(ht(o.value,l)){if(o.children===i.children&&!De.current){e=Ft(t,e,n);break e}}else for(o=e.child,o!==null&&(o.return=e);o!==null;){var s=o.dependencies;if(s!==null){l=o.child;for(var a=s.firstContext;a!==null;){if(a.context===r){if(o.tag===1){a=Ot(-1,n&-n),a.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?a.next=a:(a.next=c.next,c.next=a),u.pending=a}}o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Vs(o.return,n,e),s.lanes|=n;break}a=a.next}}else if(o.tag===10)l=o.type===e.type?null:o.child;else if(o.tag===18){if(l=o.return,l===null)throw Error(N(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),Vs(l,n,e),l=o.sibling}else l=o.child;if(l!==null)l.return=o;else for(l=o;l!==null;){if(l===e){l=null;break}if(o=l.sibling,o!==null){o.return=l.return,l=o;break}l=l.return}o=l}Ee(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,mr(e,n),i=rt(i),r=r(i),e.flags|=1,Ee(t,e,r,n),e.child;case 14:return r=e.type,i=ct(r,e.pendingProps),i=ct(r.type,i),cf(t,e,r,i,n);case 15:return Kd(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ct(r,i),So(t,e),e.tag=1,Le(r)?(t=!0,Io(e)):t=!1,mr(e,n),$d(e,r,i),Hs(e,r,i,n),Ys(null,e,r,!0,t,n);case 19:return tp(t,e,n);case 22:return qd(t,e,n)}throw Error(N(156,e.tag))};function gp(t,e){return Rf(t,e)}function Z0(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(t,e,n,r){return new Z0(t,e,n,r)}function Ha(t){return t=t.prototype,!(!t||!t.isReactComponent)}function J0(t){if(typeof t=="function")return Ha(t)?1:0;if(t!=null){if(t=t.$$typeof,t===aa)return 11;if(t===ua)return 14}return 2}function rn(t,e){var n=t.alternate;return n===null?(n=tt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Eo(t,e,n,r,i,o){var l=2;if(r=t,typeof t=="function")Ha(t)&&(l=1);else if(typeof t=="string")l=5;else e:switch(t){case Jn:return Pn(n.children,i,o,e);case sa:l=8,i|=8;break;case ps:return t=tt(12,n,e,i|2),t.elementType=ps,t.lanes=o,t;case ms:return t=tt(13,n,e,i),t.elementType=ms,t.lanes=o,t;case hs:return t=tt(19,n,e,i),t.elementType=hs,t.lanes=o,t;case Tf:return sl(n,i,o,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Cf:l=10;break e;case Ef:l=9;break e;case aa:l=11;break e;case ua:l=14;break e;case Rt:l=16,r=null;break e}throw Error(N(130,t==null?t:typeof t,""))}return e=tt(l,n,e,i),e.elementType=t,e.type=r,e.lanes=o,e}function Pn(t,e,n,r){return t=tt(7,t,r,e),t.lanes=n,t}function sl(t,e,n,r){return t=tt(22,t,r,e),t.elementType=Tf,t.lanes=n,t.stateNode={isHidden:!1},t}function cs(t,e,n){return t=tt(6,t,null,e),t.lanes=n,t}function fs(t,e,n){return e=tt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function e_(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xl(0),this.expirationTimes=Xl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xl(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ra(t,e,n,r,i,o,l,s,a){return t=new e_(t,e,n,s,a),e===1?(e=1,o===!0&&(e|=8)):e=0,o=tt(3,null,null,e),t.current=o,o.stateNode=t,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ta(o),t}function t_(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Zn,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function vp(t){if(!t)return ln;t=t._reactInternals;e:{if(An(t)!==t||t.tag!==1)throw Error(N(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Le(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(N(171))}if(t.tag===1){var n=t.type;if(Le(n))return vd(t,n,e)}return e}function yp(t,e,n,r,i,o,l,s,a){return t=Ra(n,r,!0,t,i,o,l,s,a),t.context=vp(null),n=t.current,r=Te(),i=nn(n),o=Ot(r,i),o.callback=e??null,en(n,o,i),t.current.lanes=i,Ci(t,i,r),Fe(t,r),t}function al(t,e,n,r){var i=e.current,o=Te(),l=nn(i);return n=vp(n),e.context===null?e.context=n:e.pendingContext=n,e=Ot(o,l),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=en(i,e,l),t!==null&&(mt(t,i,l,o),xo(t,i,l)),l}function Ko(t){return t=t.current,t.child?(t.child.tag===5,t.child.stateNode):null}function kf(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Qa(t,e){kf(t,e),(t=t.alternate)&&kf(t,e)}function n_(){return null}var xp=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ya(t){this._internalRoot=t}ul.prototype.render=Ya.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(N(409));al(t,e,null,null)};ul.prototype.unmount=Ya.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ln(function(){al(null,t,null,null)}),e[Dt]=null}};function ul(t){this._internalRoot=t}ul.prototype.unstable_scheduleHydration=function(t){if(t){var e=qf();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Yt.length&&e!==0&&e<Yt[n].priority;n++);Yt.splice(n,0,t),n===0&&Jf(t)}};function $a(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function cl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Sf(){}function r_(t,e,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=Ko(l);o.call(u)}}var l=yp(e,r,t,0,null,!1,!1,"",Sf);return t._reactRootContainer=l,t[Dt]=l.current,_i(t.nodeType===8?t.parentNode:t),Ln(),l}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var u=Ko(a);s.call(u)}}var a=Ra(t,0,!1,null,null,!1,!1,"",Sf);return t._reactRootContainer=a,t[Dt]=a.current,_i(t.nodeType===8?t.parentNode:t),Ln(function(){al(e,a,n,r)}),a}function fl(t,e,n,r,i){var o=n._reactRootContainer;if(o){var l=o;if(typeof i=="function"){var s=i;i=function(){var a=Ko(l);s.call(a)}}al(e,l,t,i)}else l=r_(n,e,t,i,r);return Ko(l)}Gf=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=qr(e.pendingLanes);n!==0&&(da(e,n|1),Fe(e,ie()),(A&6)===0&&(kr=ie()+500,un()))}break;case 13:Ln(function(){var r=Lt(t,1);if(r!==null){var i=Te();mt(r,t,1,i)}}),Qa(t,1)}};pa=function(t){if(t.tag===13){var e=Lt(t,134217728);if(e!==null){var n=Te();mt(e,t,134217728,n)}Qa(t,134217728)}};Kf=function(t){if(t.tag===13){var e=nn(t),n=Lt(t,e);if(n!==null){var r=Te();mt(n,t,e,r)}Qa(t,e)}};qf=function(){return I};Zf=function(t,e){var n=I;try{return I=t,e()}finally{I=n}};Cs=function(t,e,n){switch(e){case"input":if(vs(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=tl(r);if(!i)throw Error(N(90));Pf(r),vs(r,i)}}}break;case"textarea":Of(t,n);break;case"select":e=n.value,e!=null&&cr(t,!!n.multiple,e,!1)}};Bf=Ua;jf=Ln;var i_={usingClientEntryPoint:!1,Events:[Ti,rr,tl,Af,If,Ua]},$r={findFiberByHostInstance:Cn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},o_={bundleType:$r.bundleType,version:$r.version,rendererPackageName:$r.rendererPackageName,rendererConfig:$r.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:At.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Wf(t),t===null?null:t.stateNode},findFiberByHostInstance:$r.findFiberByHostInstance||n_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Xr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Xr.isDisabled&&Xr.supportsFiber))try{qo=Xr.inject(o_),xt=Xr}catch{}var Xr;Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=i_;Ye.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!$a(e))throw Error(N(200));return t_(t,e,null,n)};Ye.createRoot=function(t,e){if(!$a(t))throw Error(N(299));var n=!1,r="",i=xp;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Ra(t,1,!1,null,null,n,!1,r,i),t[Dt]=e.current,_i(t.nodeType===8?t.parentNode:t),new Ya(e)};Ye.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(N(188)):(t=Object.keys(t).join(","),Error(N(268,t)));return t=Wf(e),t=t===null?null:t.stateNode,t};Ye.flushSync=function(t){return Ln(t)};Ye.hydrate=function(t,e,n){if(!cl(e))throw Error(N(200));return fl(null,t,e,!0,n)};Ye.hydrateRoot=function(t,e,n){if(!$a(t))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",l=xp;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),e=yp(e,null,t,1,n??null,i,!1,o,l),t[Dt]=e.current,_i(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new ul(e)};Ye.render=function(t,e,n){if(!cl(e))throw Error(N(200));return fl(null,t,e,!1,n)};Ye.unmountComponentAtNode=function(t){if(!cl(t))throw Error(N(40));return t._reactRootContainer?(Ln(function(){fl(null,null,t,!1,function(){t._reactRootContainer=null,t[Dt]=null})}),!0):!1};Ye.unstable_batchedUpdates=Ua;Ye.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!cl(n))throw Error(N(200));if(t==null||t._reactInternals===void 0)throw Error(N(38));return fl(t,e,n,!1,r)};Ye.version="18.3.1-next-f1338f8080-20240426"});var bp=wn((qg,Sp)=>{"use strict";function kp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kp)}catch(t){console.error(t)}}kp(),Sp.exports=wp()});var Ep=wn(Xa=>{"use strict";var Cp=bp();Xa.createRoot=Cp.createRoot,Xa.hydrateRoot=Cp.hydrateRoot;var Zg});var f=Qu(Ll()),Wu=Qu(Ep());function It(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Fp(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var je={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Li={duration:.5,overwrite:!1,delay:0},du,he,$,lt=1e8,U=1/lt,nu=Math.PI*2,l_=nu/4,s_=0,Ap=Math.sqrt,a_=Math.cos,u_=Math.sin,ue=function(e){return typeof e=="string"},ne=function(e){return typeof e=="function"},jt=function(e){return typeof e=="number"},wl=function(e){return typeof e>"u"},bt=function(e){return typeof e=="object"},Be=function(e){return e!==!1},pu=function(){return typeof window<"u"},dl=function(e){return ne(e)||ue(e)},Ip=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Se=Array.isArray,c_=/random\([^)]+\)/g,f_=/,\s*/g,Tp=/(?:-?\.?\d|\.)+/gi,mu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Un=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ga=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,hu=/[+-]=-?[.\d]+/,d_=/[^,'"\[\]\s]+/gi,p_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Z,kt,ru,_u,Xe={},_l={},Bp,jp=function(e){return(_l=Er(e,Xe))&&be},kl=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},Fi=function(e,n){return!n&&console.warn(e)},Up=function(e,n){return e&&(Xe[e]=n)&&_l&&(_l[e]=n)||Xe},Ai=function(){return 0},m_={suppressEvents:!0,isStart:!0,kill:!1},pl={suppressEvents:!0,kill:!1},h_={suppressEvents:!0},gu={},fn=[],iu={},Vp,Ae={},Ka={},Np=30,ml=[],vu="",yu=function(e){var n=e[0],r,i;if(bt(n)||ne(n)||(e=[e]),!(r=(n._gsap||{}).harness)){for(i=ml.length;i--&&!ml[i].targetTest(n););r=ml[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Su(e[i],r)))||e.splice(i,1);return e},dn=function(e){return e._gsap||yu(st(e))[0]._gsap},xu=function(e,n,r){return(r=e[n])&&ne(r)?e[n]():wl(r)&&e.getAttribute&&e.getAttribute(n)||r},Pe=function(e,n){return(e=e.split(",")).forEach(n)||e},re=function(e){return Math.round(e*1e5)/1e5||0},q=function(e){return Math.round(e*1e7)/1e7||0},Vn=function(e,n){var r=n.charAt(0),i=parseFloat(n.substr(2));return e=parseFloat(e),r==="+"?e+i:r==="-"?e-i:r==="*"?e*i:e/i},__=function(e,n){for(var r=n.length,i=0;e.indexOf(n[i])<0&&++i<r;);return i<r},gl=function(){var e=fn.length,n=fn.slice(0),r,i;for(iu={},fn.length=0,r=0;r<e;r++)i=n[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},wu=function(e){return!!(e._initted||e._startAt||e.add)},Wp=function(e,n,r,i){fn.length&&!he&&gl(),e.render(n,r,i||!!(he&&n<0&&wu(e))),fn.length&&!he&&gl()},Hp=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(d_).length<2?n:ue(e)?e.trim():e},Rp=function(e){return e},Ge=function(e,n){for(var r in n)r in e||(e[r]=n[r]);return e},g_=function(e){return function(n,r){for(var i in r)i in n||i==="duration"&&e||i==="ease"||(n[i]=r[i])}},Er=function(e,n){for(var r in n)e[r]=n[r];return e},Pp=function t(e,n){for(var r in n)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(e[r]=bt(n[r])?t(e[r]||(e[r]={}),n[r]):n[r]);return e},vl=function(e,n){var r={},i;for(i in e)i in n||(r[i]=e[i]);return r},Oi=function(e){var n=e.parent||Z,r=e.keyframes?g_(Se(e.keyframes)):Ge;if(Be(e.inherit))for(;n;)r(e,n.vars.defaults),n=n.parent||n._dp;return e},v_=function(e,n){for(var r=e.length,i=r===n.length;i&&r--&&e[r]===n[r];);return r<0},Qp=function(e,n,r,i,o){r===void 0&&(r="_first"),i===void 0&&(i="_last");var l=e[i],s;if(o)for(s=n[o];l&&l[o]>s;)l=l._prev;return l?(n._next=l._next,l._next=n):(n._next=e[r],e[r]=n),n._next?n._next._prev=n:e[i]=n,n._prev=l,n.parent=n._dp=e,n},Sl=function(e,n,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var o=n._prev,l=n._next;o?o._next=l:e[r]===n&&(e[r]=l),l?l._prev=o:e[i]===n&&(e[i]=o),n._next=n._prev=n.parent=null},pn=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},In=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var r=e;r;)r._dirty=1,r=r.parent;return e},y_=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},ou=function(e,n,r,i){return e._startAt&&(he?e._startAt.revert(pl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,i))},x_=function t(e){return!e||e._ts&&t(e.parent)},zp=function(e){return e._repeat?Tr(e._tTime,e=e.duration()+e._rDelay)*e:0},Tr=function(e,n){var r=Math.floor(e=q(e/n));return e&&r===e?r-1:r},yl=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},bl=function(e){return e._end=q(e._start+(e._tDur/Math.abs(e._ts||e._rts||U)||0))},Cl=function(e,n){var r=e._dp;return r&&r.smoothChildTiming&&e._ts&&(e._start=q(r._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),bl(e),r._dirty||In(r,e)),e},Yp=function(e,n){var r;if((n._time||!n._dur&&n._initted||n._start<e._time&&(n._dur||!n.add))&&(r=yl(e.rawTime(),n),(!n._dur||ji(0,n.totalDuration(),r)-n._tTime>U)&&n.render(r,!0)),In(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(r=e;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;e._zTime=-U}},St=function(e,n,r,i){return n.parent&&pn(n),n._start=q((jt(r)?r:r||e!==Z?ot(e,r,n):e._time)+n._delay),n._end=q(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),Qp(e,n,"_first","_last",e._sort?"_start":0),lu(n)||(e._recent=n),i||Yp(e,n),e._ts<0&&Cl(e,e._tTime),e},$p=function(e,n){return(Xe.ScrollTrigger||kl("scrollTrigger",n))&&Xe.ScrollTrigger.create(n,e)},Xp=function(e,n,r,i,o){if(Eu(e,n,o),!e._initted)return 1;if(!r&&e._pt&&!he&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Vp!==Ie.frame)return fn.push(e),e._lazy=[o,i],1},w_=function t(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||t(n))},lu=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},k_=function(e,n,r,i){var o=e.ratio,l=n<0||!n&&(!e._start&&w_(e)&&!(!e._initted&&lu(e))||(e._ts<0||e._dp._ts<0)&&!lu(e))?0:1,s=e._rDelay,a=0,u,c,p;if(s&&e._repeat&&(a=ji(0,e._tDur,n),c=Tr(a,s),e._yoyo&&c&1&&(l=1-l),c!==Tr(e._tTime,s)&&(o=1-l,e.vars.repeatRefresh&&e._initted&&e.invalidate())),l!==o||he||i||e._zTime===U||!n&&e._zTime){if(!e._initted&&Xp(e,n,i,r,a))return;for(p=e._zTime,e._zTime=n||(r?U:0),r||(r=n&&!p),e.ratio=l,e._from&&(l=1-l),e._time=0,e._tTime=a,u=e._pt;u;)u.r(l,u.d),u=u._next;n<0&&ou(e,n,r,!0),e._onUpdate&&!r&&$e(e,"onUpdate"),a&&e._repeat&&!r&&e.parent&&$e(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===l&&(l&&pn(e,1),!r&&!he&&($e(e,l?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},S_=function(e,n,r){var i;if(r>n)for(i=e._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>n)return i;i=i._next}else for(i=e._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<n)return i;i=i._prev}},Nr=function(e,n,r,i){var o=e._repeat,l=q(n)||0,s=e._tTime/e._tDur;return s&&!i&&(e._time*=l/e._dur),e._dur=l,e._tDur=o?o<0?1e10:q(l*(o+1)+e._rDelay*o):l,s>0&&!i&&Cl(e,e._tTime=e._tDur*s),e.parent&&bl(e),r||In(e.parent,e),e},Op=function(e){return e instanceof ke?In(e):Nr(e,e._dur)},b_={_start:0,endTime:Ai,totalDuration:Ai},ot=function t(e,n,r){var i=e.labels,o=e._recent||b_,l=e.duration()>=lt?o.endTime(!1):e._dur,s,a,u;return ue(n)&&(isNaN(n)||n in i)?(a=n.charAt(0),u=n.substr(-1)==="%",s=n.indexOf("="),a==="<"||a===">"?(s>=0&&(n=n.replace(/=/,"")),(a==="<"?o._start:o.endTime(o._repeat>=0))+(parseFloat(n.substr(1))||0)*(u?(s<0?o:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=l),i[n]):(a=parseFloat(n.charAt(s-1)+n.substr(s+1)),u&&r&&(a=a/100*(Se(r)?r[0]:r).totalDuration()),s>1?t(e,n.substr(0,s-1),r)+a:l+a)):n==null?l:+n},Mi=function(e,n,r){var i=jt(n[1]),o=(i?2:1)+(e<2?0:1),l=n[o],s,a;if(i&&(l.duration=n[1]),l.parent=r,e){for(s=l,a=r;a&&!("immediateRender"in s);)s=a.vars.defaults||{},a=Be(a.vars.inherit)&&a.parent;l.immediateRender=Be(s.immediateRender),e<2?l.runBackwards=1:l.startAt=n[o-1]}return new oe(n[0],l,n[o+1])},mn=function(e,n){return e||e===0?n(e):n},ji=function(e,n,r){return r<e?e:r>n?n:r},_e=function(e,n){return!ue(e)||!(n=p_.exec(e))?"":n[1]},C_=function(e,n,r){return mn(r,function(i){return ji(e,n,i)})},su=[].slice,Gp=function(e,n){return e&&bt(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&bt(e[0]))&&!e.nodeType&&e!==kt},E_=function(e,n,r){return r===void 0&&(r=[]),e.forEach(function(i){var o;return ue(i)&&!n||Gp(i,1)?(o=r).push.apply(o,st(i)):r.push(i)})||r},st=function(e,n,r){return $&&!n&&$.selector?$.selector(e):ue(e)&&!r&&(ru||!Pr())?su.call((n||_u).querySelectorAll(e),0):Se(e)?E_(e,r):Gp(e)?su.call(e,0):e?[e]:[]},au=function(e){return e=st(e)[0]||Fi("Invalid scope")||{},function(n){var r=e.current||e.nativeElement||e;return st(n,r.querySelectorAll?r:r===e?Fi("Invalid scope")||_u.createElement("div"):e)}},Kp=function(e){return e.sort(function(){return .5-Math.random()})},qp=function(e){if(ne(e))return e;var n=bt(e)?e:{each:e},r=Bn(n.ease),i=n.from||0,o=parseFloat(n.base)||0,l={},s=i>0&&i<1,a=isNaN(i)||s,u=n.axis,c=i,p=i;return ue(i)?c=p={center:.5,edges:.5,end:1}[i]||0:!s&&a&&(c=i[0],p=i[1]),function(_,v,y){var h=(y||n).length,k=l[h],g,d,m,x,w,E,b,C,S;if(!k){if(S=n.grid==="auto"?0:(n.grid||[1,lt])[1],!S){for(b=-lt;b<(b=y[S++].getBoundingClientRect().left)&&S<h;);S<h&&S--}for(k=l[h]=[],g=a?Math.min(S,h)*c-.5:i%S,d=S===lt?0:a?h*p/S-.5:i/S|0,b=0,C=lt,E=0;E<h;E++)m=E%S-g,x=d-(E/S|0),k[E]=w=u?Math.abs(u==="y"?x:m):Ap(m*m+x*x),w>b&&(b=w),w<C&&(C=w);i==="random"&&Kp(k),k.max=b-C,k.min=C,k.v=h=(parseFloat(n.amount)||parseFloat(n.each)*(S>h?h-1:u?u==="y"?h/S:S:Math.max(S,h/S))||0)*(i==="edges"?-1:1),k.b=h<0?o-h:o,k.u=_e(n.amount||n.each)||0,r=r&&h<0?j_(r):r}return h=(k[_]-k.min)/k.max||0,q(k.b+(r?r(h):h)*k.v)+k.u}},uu=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(r){var i=q(Math.round(parseFloat(r)/e)*e*n);return(i-i%1)/n+(jt(r)?0:_e(r))}},Zp=function(e,n){var r=Se(e),i,o;return!r&&bt(e)&&(i=r=e.radius||lt,e.values?(e=st(e.values),(o=!jt(e[0]))&&(i*=i)):e=uu(e.increment)),mn(n,r?ne(e)?function(l){return o=e(l),Math.abs(o-l)<=i?o:l}:function(l){for(var s=parseFloat(o?l.x:l),a=parseFloat(o?l.y:0),u=lt,c=0,p=e.length,_,v;p--;)o?(_=e[p].x-s,v=e[p].y-a,_=_*_+v*v):_=Math.abs(e[p]-s),_<u&&(u=_,c=p);return c=!i||u<=i?e[c]:l,o||c===l||jt(l)?c:c+_e(l)}:uu(e))},Jp=function(e,n,r,i){return mn(Se(e)?!n:r===!0?!!(r=0):!i,function(){return Se(e)?e[~~(Math.random()*e.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((e-r/2+Math.random()*(n-e+r*.99))/r)*r*i)/i})},T_=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(i){return n.reduce(function(o,l){return l(o)},i)}},N_=function(e,n){return function(r){return e(parseFloat(r))+(n||_e(r))}},P_=function(e,n,r){return tm(e,n,0,1,r)},em=function(e,n,r){return mn(r,function(i){return e[~~n(i)]})},z_=function t(e,n,r){var i=n-e;return Se(e)?em(e,t(0,e.length),n):mn(r,function(o){return(i+(o-e)%i)%i+e})},O_=function t(e,n,r){var i=n-e,o=i*2;return Se(e)?em(e,t(0,e.length-1),n):mn(r,function(l){return l=(o+(l-e)%o)%o||0,e+(l>i?o-l:l)})},zr=function(e){return e.replace(c_,function(n){var r=n.indexOf("[")+1,i=n.substring(r||7,r?n.indexOf("]"):n.length-1).split(f_);return Jp(r?i:+i[0],r?0:+i[1],+i[2]||1e-5)})},tm=function(e,n,r,i,o){var l=n-e,s=i-r;return mn(o,function(a){return r+((a-e)/l*s||0)})},M_=function t(e,n,r,i){var o=isNaN(e+n)?0:function(v){return(1-v)*e+v*n};if(!o){var l=ue(e),s={},a,u,c,p,_;if(r===!0&&(i=1)&&(r=null),l)e={p:e},n={p:n};else if(Se(e)&&!Se(n)){for(c=[],p=e.length,_=p-2,u=1;u<p;u++)c.push(t(e[u-1],e[u]));p--,o=function(y){y*=p;var h=Math.min(_,~~y);return c[h](y-h)},r=n}else i||(e=Er(Se(e)?[]:{},e));if(!c){for(a in n)bu.call(s,e,a,"get",n[a]);o=function(y){return Pu(y,s)||(l?e.p:e)}}}return mn(r,o)},Mp=function(e,n,r){var i=e.labels,o=lt,l,s,a;for(l in i)s=i[l]-n,s<0==!!r&&s&&o>(s=Math.abs(s))&&(a=l,o=s);return a},$e=function(e,n,r){var i=e.vars,o=i[n],l=$,s=e._ctx,a,u,c;if(o)return a=i[n+"Params"],u=i.callbackScope||e,r&&fn.length&&gl(),s&&($=s),c=a?o.apply(u,a):o.call(u),$=l,c},Pi=function(e){return pn(e),e.scrollTrigger&&e.scrollTrigger.kill(!!he),e.progress()<1&&$e(e,"onInterrupt"),e},Cr,nm=[],rm=function(e){if(e)if(e=!e.name&&e.default||e,pu()||e.headless){var n=e.name,r=ne(e),i=n&&!r&&e.init?function(){this._props=[]}:e,o={init:Ai,render:Pu,add:bu,kill:G_,modifier:X_,rawVars:0},l={targetTest:0,get:0,getSetter:El,aliases:{},register:0};if(Pr(),e!==i){if(Ae[n])return;Ge(i,Ge(vl(e,o),l)),Er(i.prototype,Er(o,vl(e,l))),Ae[i.prop=n]=i,e.targetTest&&(ml.push(i),gu[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}Up(n,i),e.register&&e.register(be,i,ze)}else nm.push(e)},j=255,zi={aqua:[0,j,j],lime:[0,j,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,j],navy:[0,0,128],white:[j,j,j],olive:[128,128,0],yellow:[j,j,0],orange:[j,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[j,0,0],pink:[j,192,203],cyan:[0,j,j],transparent:[j,j,j,0]},qa=function(e,n,r){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(r-n)*e*6:e<.5?r:e*3<2?n+(r-n)*(2/3-e)*6:n)*j+.5|0},im=function(e,n,r){var i=e?jt(e)?[e>>16,e>>8&j,e&j]:0:zi.black,o,l,s,a,u,c,p,_,v,y;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),zi[e])i=zi[e];else if(e.charAt(0)==="#"){if(e.length<6&&(o=e.charAt(1),l=e.charAt(2),s=e.charAt(3),e="#"+o+o+l+l+s+s+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&j,i&j,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&j,e&j]}else if(e.substr(0,3)==="hsl"){if(i=y=e.match(Tp),!n)a=+i[0]%360/360,u=+i[1]/100,c=+i[2]/100,l=c<=.5?c*(u+1):c+u-c*u,o=c*2-l,i.length>3&&(i[3]*=1),i[0]=qa(a+1/3,o,l),i[1]=qa(a,o,l),i[2]=qa(a-1/3,o,l);else if(~e.indexOf("="))return i=e.match(mu),r&&i.length<4&&(i[3]=1),i}else i=e.match(Tp)||zi.transparent;i=i.map(Number)}return n&&!y&&(o=i[0]/j,l=i[1]/j,s=i[2]/j,p=Math.max(o,l,s),_=Math.min(o,l,s),c=(p+_)/2,p===_?a=u=0:(v=p-_,u=c>.5?v/(2-p-_):v/(p+_),a=p===o?(l-s)/v+(l<s?6:0):p===l?(s-o)/v+2:(o-l)/v+4,a*=60),i[0]=~~(a+.5),i[1]=~~(u*100+.5),i[2]=~~(c*100+.5)),r&&i.length<4&&(i[3]=1),i},om=function(e){var n=[],r=[],i=-1;return e.split(Bt).forEach(function(o){var l=o.match(Un)||[];n.push.apply(n,l),r.push(i+=l.length+1)}),n.c=r,n},Dp=function(e,n,r){var i="",o=(e+i).match(Bt),l=n?"hsla(":"rgba(",s=0,a,u,c,p;if(!o)return e;if(o=o.map(function(_){return(_=im(_,n,1))&&l+(n?_[0]+","+_[1]+"%,"+_[2]+"%,"+_[3]:_.join(","))+")"}),r&&(c=om(e),a=r.c,a.join(i)!==c.c.join(i)))for(u=e.replace(Bt,"1").split(Un),p=u.length-1;s<p;s++)i+=u[s]+(~a.indexOf(s)?o.shift()||l+"0,0,0,0)":(c.length?c:o.length?o:r).shift());if(!u)for(u=e.split(Bt),p=u.length-1;s<p;s++)i+=u[s]+o[s];return i+u[p]},Bt=(function(){var t="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in zi)t+="|"+e+"\\b";return new RegExp(t+")","gi")})(),D_=/hsl[a]?\(/,ku=function(e){var n=e.join(" "),r;if(Bt.lastIndex=0,Bt.test(n))return r=D_.test(n),e[1]=Dp(e[1],r),e[0]=Dp(e[0],r,om(e[1])),!0},Ii,Ie=(function(){var t=Date.now,e=500,n=33,r=t(),i=r,o=1e3/240,l=o,s=[],a,u,c,p,_,v,y=function h(k){var g=t()-i,d=k===!0,m,x,w,E;if((g>e||g<0)&&(r+=g-n),i+=g,w=i-r,m=w-l,(m>0||d)&&(E=++p.frame,_=w-p.time*1e3,p.time=w=w/1e3,l+=m+(m>=o?4:o-m),x=1),d||(a=u(h)),x)for(v=0;v<s.length;v++)s[v](w,_,E,k)};return p={time:0,frame:0,tick:function(){y(!0)},deltaRatio:function(k){return _/(1e3/(k||60))},wake:function(){Bp&&(!ru&&pu()&&(kt=ru=window,_u=kt.document||{},Xe.gsap=be,(kt.gsapVersions||(kt.gsapVersions=[])).push(be.version),jp(_l||kt.GreenSockGlobals||!kt.gsap&&kt||{}),nm.forEach(rm)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,a&&p.sleep(),u=c||function(k){return setTimeout(k,l-p.time*1e3+1|0)},Ii=1,y(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(a),Ii=0,u=Ai},lagSmoothing:function(k,g){e=k||1/0,n=Math.min(g||33,e)},fps:function(k){o=1e3/(k||240),l=p.time*1e3+o},add:function(k,g,d){var m=g?function(x,w,E,b){k(x,w,E,b),p.remove(m)}:k;return p.remove(k),s[d?"unshift":"push"](m),Pr(),m},remove:function(k,g){~(g=s.indexOf(k))&&s.splice(g,1)&&v>=g&&v--},_listeners:s},p})(),Pr=function(){return!Ii&&Ie.wake()},F={},L_=/^[\d.\-M][\d.\-,\s]/,F_=/["']/g,A_=function(e){for(var n={},r=e.substr(1,e.length-3).split(":"),i=r[0],o=1,l=r.length,s,a,u;o<l;o++)a=r[o],s=o!==l-1?a.lastIndexOf(","):a.length,u=a.substr(0,s),n[i]=isNaN(u)?u.replace(F_,"").trim():+u,i=a.substr(s+1).trim();return n},I_=function(e){var n=e.indexOf("(")+1,r=e.indexOf(")"),i=e.indexOf("(",n);return e.substring(n,~i&&i<r?e.indexOf(")",r+1):r)},B_=function(e){var n=(e+"").split("("),r=F[n[0]];return r&&n.length>1&&r.config?r.config.apply(null,~e.indexOf("{")?[A_(n[1])]:I_(e).split(",").map(Hp)):F._CE&&L_.test(e)?F._CE("",e):r},j_=function(e){return function(n){return 1-e(1-n)}},Bn=function(e,n){return e&&(ne(e)?e:F[e]||B_(e))||n},Wn=function(e,n,r,i){r===void 0&&(r=function(a){return 1-n(1-a)}),i===void 0&&(i=function(a){return a<.5?n(a*2)/2:1-n((1-a)*2)/2});var o={easeIn:n,easeOut:r,easeInOut:i},l;return Pe(e,function(s){F[s]=Xe[s]=o,F[l=s.toLowerCase()]=r;for(var a in o)F[l+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=F[s+"."+a]=o[a]}),o},lm=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},Za=function t(e,n,r){var i=n>=1?n:1,o=(r||(e?.3:.45))/(n<1?n:1),l=o/nu*(Math.asin(1/i)||0),s=function(c){return c===1?1:i*Math.pow(2,-10*c)*u_((c-l)*o)+1},a=e==="out"?s:e==="in"?function(u){return 1-s(1-u)}:lm(s);return o=nu/o,a.config=function(u,c){return t(e,u,c)},a},Ja=function t(e,n){n===void 0&&(n=1.70158);var r=function(l){return l?--l*l*((n+1)*l+n)+1:0},i=e==="out"?r:e==="in"?function(o){return 1-r(1-o)}:lm(r);return i.config=function(o){return t(e,o)},i};Pe("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var n=e<5?e+1:e;Wn(t+",Power"+(n-1),e?function(r){return Math.pow(r,n)}:function(r){return r},function(r){return 1-Math.pow(1-r,n)},function(r){return r<.5?Math.pow(r*2,n)/2:1-Math.pow((1-r)*2,n)/2})});F.Linear.easeNone=F.none=F.Linear.easeIn;Wn("Elastic",Za("in"),Za("out"),Za());(function(t,e){var n=1/e,r=2*n,i=2.5*n,o=function(s){return s<n?t*s*s:s<r?t*Math.pow(s-1.5/e,2)+.75:s<i?t*(s-=2.25/e)*s+.9375:t*Math.pow(s-2.625/e,2)+.984375};Wn("Bounce",function(l){return 1-o(1-l)},o)})(7.5625,2.75);Wn("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)});Wn("Circ",function(t){return-(Ap(1-t*t)-1)});Wn("Sine",function(t){return t===1?1:-a_(t*l_)+1});Wn("Back",Ja("in"),Ja("out"),Ja());F.SteppedEase=F.steps=Xe.SteppedEase={config:function(e,n){e===void 0&&(e=1);var r=1/e,i=e+(n?0:1),o=n?1:0,l=1-U;return function(s){return((i*ji(0,l,s)|0)+o)*r}}};Li.ease=F["quad.out"];Pe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return vu+=t+","+t+"Params,"});var Su=function(e,n){this.id=s_++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:xu,this.set=n?n.getSetter:El},Bi=(function(){function t(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,Nr(this,+n.duration,1,1),this.data=n.data,$&&(this._ctx=$,$.data.push(this)),Ii||Ie.wake()}var e=t.prototype;return e.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},e.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},e.totalDuration=function(r){return arguments.length?(this._dirty=0,Nr(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(r,i){if(Pr(),!arguments.length)return this._tTime;var o=this._dp;if(o&&o.smoothChildTiming&&this._ts){for(Cl(this,r),!o._dp||o.parent||Yp(o,this);o&&o.parent;)o.parent._time!==o._start+(o._ts>=0?o._tTime/o._ts:(o.totalDuration()-o._tTime)/-o._ts)&&o.totalTime(o._tTime,!0),o=o.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&St(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===U||!this._initted&&this._dur&&r||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),Wp(this,r,i)),this},e.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+zp(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},e.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+zp(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(r,i){var o=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*o,i):this._repeat?Tr(this._tTime,o)+1:1},e.timeScale=function(r,i){if(!arguments.length)return this._rts===-U?0:this._rts;if(this._rts===r)return this;var o=this.parent&&this._ts?yl(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-U?0:this._rts,this.totalTime(ji(-Math.abs(this._delay),this.totalDuration(),o),i!==!1),bl(this),y_(this)},e.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Pr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==U&&(this._tTime-=U)))),this):this._ps},e.startTime=function(r){if(arguments.length){this._start=q(r);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&St(i,this,this._start-this._delay),this}return this._start},e.endTime=function(r){return this._start+(Be(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?yl(i.rawTime(r),this):this._tTime:this._tTime},e.revert=function(r){r===void 0&&(r=h_);var i=he;return he=r,wu(this)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),he=i,this},e.globalTime=function(r){for(var i=this,o=arguments.length?r:i.rawTime();i;)o=i._start+o/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(r):o},e.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,Op(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,Op(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},e.seek=function(r,i){return this.totalTime(ot(this,r),Be(i))},e.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,Be(i)),this._dur||(this._zTime=-U),this},e.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},e.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-U:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-U,this},e.isActive=function(){var r=this.parent||this._dp,i=this._start,o;return!!(!r||this._ts&&this._initted&&r.isActive()&&(o=r.rawTime(!0))>=i&&o<this.endTime(!0)-U)},e.eventCallback=function(r,i,o){var l=this.vars;return arguments.length>1?(i?(l[r]=i,o&&(l[r+"Params"]=o),r==="onUpdate"&&(this._onUpdate=i)):delete l[r],this):l[r]},e.then=function(r){var i=this,o=i._prom;return new Promise(function(l){var s=ne(r)?r:Rp,a=function(){var c=i.then;i.then=null,o&&o(),ne(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=c),l(s),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Pi(this)},t})();Ge(Bi.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-U,_prom:0,_ps:!1,_rts:1});var ke=(function(t){Fp(e,t);function e(r,i){var o;return r===void 0&&(r={}),o=t.call(this,r)||this,o.labels={},o.smoothChildTiming=!!r.smoothChildTiming,o.autoRemoveChildren=!!r.autoRemoveChildren,o._sort=Be(r.sortChildren),Z&&St(r.parent||Z,It(o),i),r.reversed&&o.reverse(),r.paused&&o.paused(!0),r.scrollTrigger&&$p(It(o),r.scrollTrigger),o}var n=e.prototype;return n.to=function(i,o,l){return Mi(0,arguments,this),this},n.from=function(i,o,l){return Mi(1,arguments,this),this},n.fromTo=function(i,o,l,s){return Mi(2,arguments,this),this},n.set=function(i,o,l){return o.duration=0,o.parent=this,Oi(o).repeatDelay||(o.repeat=0),o.immediateRender=!!o.immediateRender,new oe(i,o,ot(this,l),1),this},n.call=function(i,o,l){return St(this,oe.delayedCall(0,i,o),l)},n.staggerTo=function(i,o,l,s,a,u,c){return l.duration=o,l.stagger=l.stagger||s,l.onComplete=u,l.onCompleteParams=c,l.parent=this,new oe(i,l,ot(this,a)),this},n.staggerFrom=function(i,o,l,s,a,u,c){return l.runBackwards=1,Oi(l).immediateRender=Be(l.immediateRender),this.staggerTo(i,o,l,s,a,u,c)},n.staggerFromTo=function(i,o,l,s,a,u,c,p){return s.startAt=l,Oi(s).immediateRender=Be(s.immediateRender),this.staggerTo(i,o,s,a,u,c,p)},n.render=function(i,o,l){var s=this._time,a=this._dirty?this.totalDuration():this._tDur,u=this._dur,c=i<=0?0:q(i),p=this._zTime<0!=i<0&&(this._initted||!u),_,v,y,h,k,g,d,m,x,w,E,b;if(this!==Z&&c>a&&i>=0&&(c=a),c!==this._tTime||l||p){if(s!==this._time&&u&&(c+=this._time-s,i+=this._time-s),_=c,x=this._start,m=this._ts,g=!m,p&&(u||(s=this._zTime),(i||!o)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,k=u+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(k*100+i,o,l);if(_=q(c%k),c===a?(h=this._repeat,_=u):(w=q(c/k),h=~~w,h&&h===w&&(_=u,h--),_>u&&(_=u)),w=Tr(this._tTime,k),!s&&this._tTime&&w!==h&&this._tTime-w*k-this._dur<=0&&(w=h),E&&h&1&&(_=u-_,b=1),h!==w&&!this._lock){var C=E&&w&1,S=C===(E&&h&1);if(h<w&&(C=!C),s=C?0:c%u?u:c,this._lock=1,this.render(s||(b?0:q(h*k)),o,!u)._lock=0,this._tTime=c,!o&&this.parent&&$e(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1,w=h),s&&s!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,a=this._tDur,S&&(this._lock=2,s=C?u:-1e-4,this.render(s,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(d=S_(this,q(s),q(_)),d&&(c-=_-(_=d._start))),this._tTime=c,this._time=_,this._act=!!m,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,s=0),!s&&c&&u&&!o&&!w&&($e(this,"onStart"),this._tTime!==c))return this;if(_>=s&&i>=0)for(v=this._first;v;){if(y=v._next,(v._act||_>=v._start)&&v._ts&&d!==v){if(v.parent!==this)return this.render(i,o,l);if(v.render(v._ts>0?(_-v._start)*v._ts:(v._dirty?v.totalDuration():v._tDur)+(_-v._start)*v._ts,o,l),_!==this._time||!this._ts&&!g){d=0,y&&(c+=this._zTime=-U);break}}v=y}else{v=this._last;for(var T=i<0?i:_;v;){if(y=v._prev,(v._act||T<=v._end)&&v._ts&&d!==v){if(v.parent!==this)return this.render(i,o,l);if(v.render(v._ts>0?(T-v._start)*v._ts:(v._dirty?v.totalDuration():v._tDur)+(T-v._start)*v._ts,o,l||he&&wu(v)),_!==this._time||!this._ts&&!g){d=0,y&&(c+=this._zTime=T?-U:U);break}}v=y}}if(d&&!o&&(this.pause(),d.render(_>=s?0:-U)._zTime=_>=s?1:-1,this._ts))return this._start=x,bl(this),this.render(i,o,l);this._onUpdate&&!o&&$e(this,"onUpdate",!0),(c===a&&this._tTime>=this.totalDuration()||!c&&s)&&(x===this._start||Math.abs(m)!==Math.abs(this._ts))&&(this._lock||((i||!u)&&(c===a&&this._ts>0||!c&&this._ts<0)&&pn(this,1),!o&&!(i<0&&!s)&&(c||s||!a)&&($e(this,c===a&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<a&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(i,o){var l=this;if(jt(o)||(o=ot(this,o,i)),!(i instanceof Bi)){if(Se(i))return i.forEach(function(s){return l.add(s,o)}),this;if(ue(i))return this.addLabel(i,o);if(ne(i))i=oe.delayedCall(0,i);else return this}return this!==i?St(this,i,o):this},n.getChildren=function(i,o,l,s){i===void 0&&(i=!0),o===void 0&&(o=!0),l===void 0&&(l=!0),s===void 0&&(s=-lt);for(var a=[],u=this._first;u;)u._start>=s&&(u instanceof oe?o&&a.push(u):(l&&a.push(u),i&&a.push.apply(a,u.getChildren(!0,o,l)))),u=u._next;return a},n.getById=function(i){for(var o=this.getChildren(1,1,1),l=o.length;l--;)if(o[l].vars.id===i)return o[l]},n.remove=function(i){return ue(i)?this.removeLabel(i):ne(i)?this.killTweensOf(i):(i.parent===this&&Sl(this,i),i===this._recent&&(this._recent=this._last),In(this))},n.totalTime=function(i,o){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=q(Ie.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),t.prototype.totalTime.call(this,i,o),this._forcing=0,this):this._tTime},n.addLabel=function(i,o){return this.labels[i]=ot(this,o),this},n.removeLabel=function(i){return delete this.labels[i],this},n.addPause=function(i,o,l){var s=oe.delayedCall(0,o||Ai,l);return s.data="isPause",this._hasPause=1,St(this,s,ot(this,i))},n.removePause=function(i){var o=this._first;for(i=ot(this,i);o;)o._start===i&&o.data==="isPause"&&pn(o),o=o._next},n.killTweensOf=function(i,o,l){for(var s=this.getTweensOf(i,l),a=s.length;a--;)cn!==s[a]&&s[a].kill(i,o);return this},n.getTweensOf=function(i,o){for(var l=[],s=st(i),a=this._first,u=jt(o),c;a;)a instanceof oe?__(a._targets,s)&&(u?(!cn||a._initted&&a._ts)&&a.globalTime(0)<=o&&a.globalTime(a.totalDuration())>o:!o||a.isActive())&&l.push(a):(c=a.getTweensOf(s,o)).length&&l.push.apply(l,c),a=a._next;return l},n.tweenTo=function(i,o){o=o||{};var l=this,s=ot(l,i),a=o,u=a.startAt,c=a.onStart,p=a.onStartParams,_=a.immediateRender,v,y=oe.to(l,Ge({ease:o.ease||"none",lazy:!1,immediateRender:!1,time:s,overwrite:"auto",duration:o.duration||Math.abs((s-(u&&"time"in u?u.time:l._time))/l.timeScale())||U,onStart:function(){if(l.pause(),!v){var k=o.duration||Math.abs((s-(u&&"time"in u?u.time:l._time))/l.timeScale());y._dur!==k&&Nr(y,k,0,1).render(y._time,!0,!0),v=1}c&&c.apply(y,p||[])}},o));return _?y.render(0):y},n.tweenFromTo=function(i,o,l){return this.tweenTo(o,Ge({startAt:{time:ot(this,i)}},l))},n.recent=function(){return this._recent},n.nextLabel=function(i){return i===void 0&&(i=this._time),Mp(this,ot(this,i))},n.previousLabel=function(i){return i===void 0&&(i=this._time),Mp(this,ot(this,i),1)},n.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+U)},n.shiftChildren=function(i,o,l){l===void 0&&(l=0);var s=this._first,a=this.labels,u;for(i=q(i);s;)s._start>=l&&(s._start+=i,s._end+=i),s=s._next;if(o)for(u in a)a[u]>=l&&(a[u]+=i);return In(this)},n.invalidate=function(i){var o=this._first;for(this._lock=0;o;)o.invalidate(i),o=o._next;return t.prototype.invalidate.call(this,i)},n.clear=function(i){i===void 0&&(i=!0);for(var o=this._first,l;o;)l=o._next,this.remove(o),o=l;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),In(this)},n.totalDuration=function(i){var o=0,l=this,s=l._last,a=lt,u,c,p;if(arguments.length)return l.timeScale((l._repeat<0?l.duration():l.totalDuration())/(l.reversed()?-i:i));if(l._dirty){for(p=l.parent;s;)u=s._prev,s._dirty&&s.totalDuration(),c=s._start,c>a&&l._sort&&s._ts&&!l._lock?(l._lock=1,St(l,s,c-s._delay,1)._lock=0):a=c,c<0&&s._ts&&(o-=c,(!p&&!l._dp||p&&p.smoothChildTiming)&&(l._start+=q(c/l._ts),l._time-=c,l._tTime-=c),l.shiftChildren(-c,!1,-1/0),a=0),s._end>o&&s._ts&&(o=s._end),s=u;Nr(l,l===Z&&l._time>o?l._time:o,1,1),l._dirty=0}return l._tDur},e.updateRoot=function(i){if(Z._ts&&(Wp(Z,yl(i,Z)),Vp=Ie.frame),Ie.frame>=Np){Np+=je.autoSleep||120;var o=Z._first;if((!o||!o._ts)&&je.autoSleep&&Ie._listeners.length<2){for(;o&&!o._ts;)o=o._next;o||Ie.sleep()}}},e})(Bi);Ge(ke.prototype,{_lock:0,_hasPause:0,_forcing:0});var U_=function(e,n,r,i,o,l,s){var a=new ze(this._pt,e,n,0,1,Nu,null,o),u=0,c=0,p,_,v,y,h,k,g,d;for(a.b=r,a.e=i,r+="",i+="",(g=~i.indexOf("random("))&&(i=zr(i)),l&&(d=[r,i],l(d,e,n),r=d[0],i=d[1]),_=r.match(Ga)||[];p=Ga.exec(i);)y=p[0],h=i.substring(u,p.index),v?v=(v+1)%5:h.substr(-5)==="rgba("&&(v=1),y!==_[c++]&&(k=parseFloat(_[c-1])||0,a._pt={_next:a._pt,p:h||c===1?h:",",s:k,c:y.charAt(1)==="="?Vn(k,y)-k:parseFloat(y)-k,m:v&&v<4?Math.round:0},u=Ga.lastIndex);return a.c=u<i.length?i.substring(u,i.length):"",a.fp=s,(hu.test(i)||g)&&(a.e=0),this._pt=a,a},bu=function(e,n,r,i,o,l,s,a,u,c){ne(i)&&(i=i(o||0,e,l));var p=e[n],_=r!=="get"?r:ne(p)?u?e[n.indexOf("set")||!ne(e["get"+n.substr(3)])?n:"get"+n.substr(3)](u):e[n]():p,v=ne(p)?u?Q_:um:Tu,y;if(ue(i)&&(~i.indexOf("random(")&&(i=zr(i)),i.charAt(1)==="="&&(y=Vn(_,i)+(_e(_)||0),(y||y===0)&&(i=y))),!c||_!==i||cu)return!isNaN(_*i)&&i!==""?(y=new ze(this._pt,e,n,+_||0,i-(_||0),typeof p=="boolean"?$_:cm,0,v),u&&(y.fp=u),s&&y.modifier(s,this,e),this._pt=y):(!p&&!(n in e)&&kl(n,i),U_.call(this,e,n,_,i,v,a||je.stringFilter,u))},V_=function(e,n,r,i,o){if(ne(e)&&(e=Di(e,o,n,r,i)),!bt(e)||e.style&&e.nodeType||Se(e)||Ip(e))return ue(e)?Di(e,o,n,r,i):e;var l={},s;for(s in e)l[s]=Di(e[s],o,n,r,i);return l},Cu=function(e,n,r,i,o,l){var s,a,u,c;if(Ae[e]&&(s=new Ae[e]).init(o,s.rawVars?n[e]:V_(n[e],i,o,l,r),r,i,l)!==!1&&(r._pt=a=new ze(r._pt,o,e,0,1,s.render,s,0,s.priority),r!==Cr))for(u=r._ptLookup[r._targets.indexOf(o)],c=s._props.length;c--;)u[s._props[c]]=a;return s},cn,cu,Eu=function t(e,n,r){var i=e.vars,o=i.ease,l=i.startAt,s=i.immediateRender,a=i.lazy,u=i.onUpdate,c=i.runBackwards,p=i.yoyoEase,_=i.keyframes,v=i.autoRevert,y=e._dur,h=e._startAt,k=e._targets,g=e.parent,d=g&&g.data==="nested"?g.vars.targets:k,m=e._overwrite==="auto"&&!du,x=e.timeline,w=i.easeReverse||p,E,b,C,S,T,z,O,D,L,Q,ee,B,qe;if(x&&(!_||!o)&&(o="none"),e._ease=Bn(o,Li.ease),e._rEase=w&&(Bn(w)||e._ease),e._from=!x&&!!i.runBackwards,e._from&&(e.ratio=1),!x||_&&!i.stagger){if(D=k[0]?dn(k[0]).harness:0,B=D&&i[D.prop],E=vl(i,gu),h&&(h._zTime<0&&h.progress(1),n<0&&c&&s&&!v?h.render(-1,!0):h.revert(c&&y?pl:m_),h._lazy=0),l){if(pn(e._startAt=oe.set(k,Ge({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!h&&Be(a),startAt:null,delay:0,onUpdate:u&&function(){return $e(e,"onUpdate")},stagger:0},l))),e._startAt._dp=0,e._startAt._sat=e,n<0&&(he||!s&&!v)&&e._startAt.revert(pl),s&&y&&n<=0&&r<=0){n&&(e._zTime=n);return}}else if(c&&y&&!h){if(n&&(s=!1),C=Ge({overwrite:!1,data:"isFromStart",lazy:s&&!h&&Be(a),immediateRender:s,stagger:0,parent:g},E),B&&(C[D.prop]=B),pn(e._startAt=oe.set(k,C)),e._startAt._dp=0,e._startAt._sat=e,n<0&&(he?e._startAt.revert(pl):e._startAt.render(-1,!0)),e._zTime=n,!s)t(e._startAt,U,U);else if(!n)return}for(e._pt=e._ptCache=0,a=y&&Be(a)||a&&!y,b=0;b<k.length;b++){if(T=k[b],O=T._gsap||yu(k)[b]._gsap,e._ptLookup[b]=Q={},iu[O.id]&&fn.length&&gl(),ee=d===k?b:d.indexOf(T),D&&(L=new D).init(T,B||E,e,ee,d)!==!1&&(e._pt=S=new ze(e._pt,T,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(Xn){Q[Xn]=S}),L.priority&&(z=1)),!D||B)for(C in E)Ae[C]&&(L=Cu(C,E,e,ee,T,d))?L.priority&&(z=1):Q[C]=S=bu.call(e,T,C,"get",E[C],ee,d,0,i.stringFilter);e._op&&e._op[b]&&e.kill(T,e._op[b]),m&&e._pt&&(cn=e,Z.killTweensOf(T,Q,e.globalTime(n)),qe=!e.parent,cn=0),e._pt&&a&&(iu[O.id]=1)}z&&zu(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!qe,_&&n<=0&&x.render(lt,!0,!0)},W_=function(e,n,r,i,o,l,s,a){var u=(e._pt&&e._ptCache||(e._ptCache={}))[n],c,p,_,v;if(!u)for(u=e._ptCache[n]=[],_=e._ptLookup,v=e._targets.length;v--;){if(c=_[v][n],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==n&&c.fp!==n;)c=c._next;if(!c)return cu=1,e.vars[n]="+=0",Eu(e,s),cu=0,a?Fi(n+" not eligible for reset. Try splitting into individual properties"):1;u.push(c)}for(v=u.length;v--;)p=u[v],c=p._pt||p,c.s=(i||i===0)&&!o?i:c.s+(i||0)+l*c.c,c.c=r-c.s,p.e&&(p.e=re(r)+_e(p.e)),p.b&&(p.b=c.s+_e(p.b))},H_=function(e,n){var r=e[0]?dn(e[0]).harness:0,i=r&&r.aliases,o,l,s,a;if(!i)return n;o=Er({},n);for(l in i)if(l in o)for(a=i[l].split(","),s=a.length;s--;)o[a[s]]=o[l];return o},R_=function(e,n,r,i){var o=n.ease||i||"power1.inOut",l,s;if(Se(n))s=r[e]||(r[e]=[]),n.forEach(function(a,u){return s.push({t:u/(n.length-1)*100,v:a,e:o})});else for(l in n)s=r[l]||(r[l]=[]),l==="ease"||s.push({t:parseFloat(e),v:n[l],e:o})},Di=function(e,n,r,i,o){return ne(e)?e.call(n,r,i,o):ue(e)&&~e.indexOf("random(")?zr(e):e},sm=vu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",am={};Pe(sm+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return am[t]=1});var oe=(function(t){Fp(e,t);function e(r,i,o,l){var s;typeof i=="number"&&(o.duration=i,i=o,o=null),s=t.call(this,l?i:Oi(i))||this;var a=s.vars,u=a.duration,c=a.delay,p=a.immediateRender,_=a.stagger,v=a.overwrite,y=a.keyframes,h=a.defaults,k=a.scrollTrigger,g=i.parent||Z,d=(Se(r)||Ip(r)?jt(r[0]):"length"in i)?[r]:st(r),m,x,w,E,b,C,S,T;if(s._targets=d.length?yu(d):Fi("GSAP target "+r+" not found. https://gsap.com",!je.nullTargetWarn)||[],s._ptLookup=[],s._overwrite=v,y||_||dl(u)||dl(c)){i=s.vars;var z=i.easeReverse||i.yoyoEase;if(m=s.timeline=new ke({data:"nested",defaults:h||{},targets:g&&g.data==="nested"?g.vars.targets:d}),m.kill(),m.parent=m._dp=It(s),m._start=0,_||dl(u)||dl(c)){if(E=d.length,S=_&&qp(_),bt(_))for(b in _)~sm.indexOf(b)&&(T||(T={}),T[b]=_[b]);for(x=0;x<E;x++)w=vl(i,am),w.stagger=0,z&&(w.easeReverse=z),T&&Er(w,T),C=d[x],w.duration=+Di(u,It(s),x,C,d),w.delay=(+Di(c,It(s),x,C,d)||0)-s._delay,!_&&E===1&&w.delay&&(s._delay=c=w.delay,s._start+=c,w.delay=0),m.to(C,w,S?S(x,C,d):0),m._ease=F.none;m.duration()?u=c=0:s.timeline=0}else if(y){Oi(Ge(m.vars.defaults,{ease:"none"})),m._ease=Bn(y.ease||i.ease||"none");var O=0,D,L,Q;if(Se(y))y.forEach(function(ee){return m.to(d,ee,">")}),m.duration();else{w={};for(b in y)b==="ease"||b==="easeEach"||R_(b,y[b],w,y.easeEach);for(b in w)for(D=w[b].sort(function(ee,B){return ee.t-B.t}),O=0,x=0;x<D.length;x++)L=D[x],Q={ease:L.e,duration:(L.t-(x?D[x-1].t:0))/100*u},Q[b]=L.v,m.to(d,Q,O),O+=Q.duration;m.duration()<u&&m.to({},{duration:u-m.duration()})}}u||s.duration(u=m.duration())}else s.timeline=0;return v===!0&&!du&&(cn=It(s),Z.killTweensOf(d),cn=0),St(g,It(s),o),i.reversed&&s.reverse(),i.paused&&s.paused(!0),(p||!u&&!y&&s._start===q(g._time)&&Be(p)&&x_(It(s))&&g.data!=="nested")&&(s._tTime=-U,s.render(Math.max(0,-c)||0)),k&&$p(It(s),k),s}var n=e.prototype;return n.render=function(i,o,l){var s=this._time,a=this._tDur,u=this._dur,c=i<0,p=i>a-U&&!c?a:i<U?0:i,_,v,y,h,k,g,d,m;if(!u)k_(this,i,o,l);else if(p!==this._tTime||!i||l||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(_=p,m=this.timeline,this._repeat){if(h=u+this._rDelay,this._repeat<-1&&c)return this.totalTime(h*100+i,o,l);if(_=q(p%h),p===a?(y=this._repeat,_=u):(k=q(p/h),y=~~k,y&&y===k?(_=u,y--):_>u&&(_=u)),g=this._yoyo&&y&1,g&&(_=u-_),k=Tr(this._tTime,h),_===s&&!l&&this._initted&&y===k)return this._tTime=p,this;y!==k&&this.vars.repeatRefresh&&!g&&!this._lock&&_!==h&&this._initted&&(this._lock=l=1,this.render(q(h*y),!0).invalidate()._lock=0)}if(!this._initted){if(Xp(this,c?i:_,l,o,p))return this._tTime=0,this;if(s!==this._time&&!(l&&this.vars.repeatRefresh&&y!==k))return this;if(u!==this._dur)return this.render(i,o,l)}if(this._rEase){var x=_<s;if(x!==this._inv){var w=x?s:u-s;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=s,this._invRecip=w?(x?-1:1)/w:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=d=this._invRatio+this._invScale*this._invEase((_-this._invTime)*this._invRecip)}else this.ratio=d=this._ease(_/u);if(this._from&&(this.ratio=d=1-d),this._tTime=p,this._time=_,!this._act&&this._ts&&(this._act=1,this._lazy=0),!s&&p&&!o&&!k&&($e(this,"onStart"),this._tTime!==p))return this;for(v=this._pt;v;)v.r(d,v.d),v=v._next;m&&m.render(i<0?i:m._dur*m._ease(_/this._dur),o,l)||this._startAt&&(this._zTime=i),this._onUpdate&&!o&&(c&&ou(this,i,o,l),$e(this,"onUpdate")),this._repeat&&y!==k&&this.vars.onRepeat&&!o&&this.parent&&$e(this,"onRepeat"),(p===this._tDur||!p)&&this._tTime===p&&(c&&!this._onUpdate&&ou(this,i,!0,!0),(i||!u)&&(p===this._tDur&&this._ts>0||!p&&this._ts<0)&&pn(this,1),!o&&!(c&&!s)&&(p||s||g)&&($e(this,p===a?"onComplete":"onReverseComplete",!0),this._prom&&!(p<a&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),t.prototype.invalidate.call(this,i)},n.resetTo=function(i,o,l,s,a){Ii||Ie.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||Eu(this,u),c=this._ease(u/this._dur),W_(this,i,o,l,s,c,u,a)?this.resetTo(i,o,l,s,1):(Cl(this,0),this.parent||Qp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(i,o){if(o===void 0&&(o="all"),!i&&(!o||o==="all"))return this._lazy=this._pt=0,this.parent?Pi(this):this.scrollTrigger&&this.scrollTrigger.kill(!!he),this;if(this.timeline){var l=this.timeline.totalDuration();return this.timeline.killTweensOf(i,o,cn&&cn.vars.overwrite!==!0)._first||Pi(this),this.parent&&l!==this.timeline.totalDuration()&&Nr(this,this._dur*this.timeline._tDur/l,0,1),this}var s=this._targets,a=i?st(i):s,u=this._ptLookup,c=this._pt,p,_,v,y,h,k,g;if((!o||o==="all")&&v_(s,a))return o==="all"&&(this._pt=0),Pi(this);for(p=this._op=this._op||[],o!=="all"&&(ue(o)&&(h={},Pe(o,function(d){return h[d]=1}),o=h),o=H_(s,o)),g=s.length;g--;)if(~a.indexOf(s[g])){_=u[g],o==="all"?(p[g]=o,y=_,v={}):(v=p[g]=p[g]||{},y=o);for(h in y)k=_&&_[h],k&&((!("kill"in k.d)||k.d.kill(h)===!0)&&Sl(this,k,"_pt"),delete _[h]),v!=="all"&&(v[h]=1)}return this._initted&&!this._pt&&c&&Pi(this),this},e.to=function(i,o){return new e(i,o,arguments[2])},e.from=function(i,o){return Mi(1,arguments)},e.delayedCall=function(i,o,l,s){return new e(o,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:o,onReverseComplete:o,onCompleteParams:l,onReverseCompleteParams:l,callbackScope:s})},e.fromTo=function(i,o,l){return Mi(2,arguments)},e.set=function(i,o){return o.duration=0,o.repeatDelay||(o.repeat=0),new e(i,o)},e.killTweensOf=function(i,o,l){return Z.killTweensOf(i,o,l)},e})(Bi);Ge(oe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Pe("staggerTo,staggerFrom,staggerFromTo",function(t){oe[t]=function(){var e=new ke,n=su.call(arguments,0);return n.splice(t==="staggerFromTo"?5:4,0,0),e[t].apply(e,n)}});var Tu=function(e,n,r){return e[n]=r},um=function(e,n,r){return e[n](r)},Q_=function(e,n,r,i){return e[n](i.fp,r)},Y_=function(e,n,r){return e.setAttribute(n,r)},El=function(e,n){return ne(e[n])?um:wl(e[n])&&e.setAttribute?Y_:Tu},cm=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},$_=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},Nu=function(e,n){var r=n._pt,i="";if(!e&&n.b)i=n.b;else if(e===1&&n.e)i=n.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*e):Math.round((r.s+r.c*e)*1e4)/1e4)+i,r=r._next;i+=n.c}n.set(n.t,n.p,i,n)},Pu=function(e,n){for(var r=n._pt;r;)r.r(e,r.d),r=r._next},X_=function(e,n,r,i){for(var o=this._pt,l;o;)l=o._next,o.p===i&&o.modifier(e,n,r),o=l},G_=function(e){for(var n=this._pt,r,i;n;)i=n._next,n.p===e&&!n.op||n.op===e?Sl(this,n,"_pt"):n.dep||(r=1),n=i;return!r},K_=function(e,n,r,i){i.mSet(e,n,i.m.call(i.tween,r,i.mt),i)},zu=function(e){for(var n=e._pt,r,i,o,l;n;){for(r=n._next,i=o;i&&i.pr>n.pr;)i=i._next;(n._prev=i?i._prev:l)?n._prev._next=n:o=n,(n._next=i)?i._prev=n:l=n,n=r}e._pt=o},ze=(function(){function t(n,r,i,o,l,s,a,u,c){this.t=r,this.s=o,this.c=l,this.p=i,this.r=s||cm,this.d=a||this,this.set=u||Tu,this.pr=c||0,this._next=n,n&&(n._prev=this)}var e=t.prototype;return e.modifier=function(r,i,o){this.mSet=this.mSet||this.set,this.set=K_,this.m=r,this.mt=o,this.tween=i},t})();Pe(vu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(t){return gu[t]=1});Xe.TweenMax=Xe.TweenLite=oe;Xe.TimelineLite=Xe.TimelineMax=ke;Z=new ke({sortChildren:!1,defaults:Li,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});je.stringFilter=ku;var jn=[],hl={},q_=[],Lp=0,Z_=0,eu=function(e){return(hl[e]||q_).map(function(n){return n()})},fu=function(){var e=Date.now(),n=[];e-Lp>2&&(eu("matchMediaInit"),jn.forEach(function(r){var i=r.queries,o=r.conditions,l,s,a,u;for(s in i)l=kt.matchMedia(i[s]).matches,l&&(a=1),l!==o[s]&&(o[s]=l,u=1);u&&(r.revert(),a&&n.push(r))}),eu("matchMediaRevert"),n.forEach(function(r){return r.onMatch(r,function(i){return r.add(null,i)})}),Lp=e,eu("matchMedia"))},fm=(function(){function t(n,r){this.selector=r&&au(r),this.data=[],this._r=[],this.isReverted=!1,this.id=Z_++,n&&this.add(n)}var e=t.prototype;return e.add=function(r,i,o){ne(r)&&(o=i,i=r,r=ne);var l=this,s=function(){var u=$,c=l.selector,p;return u&&u!==l&&u.data.push(l),o&&(l.selector=au(o)),$=l,p=i.apply(l,arguments),ne(p)&&l._r.push(p),$=u,l.selector=c,l.isReverted=!1,p};return l.last=s,r===ne?s(l,function(a){return l.add(null,a)}):r?l[r]=s:s},e.ignore=function(r){var i=$;$=null,r(this),$=i},e.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof t?r.push.apply(r,i.getTweens()):i instanceof oe&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(r,i){var o=this;if(r?(function(){for(var s=o.getTweens(),a=o.data.length,u;a--;)u=o.data[a],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(c){return s.splice(s.indexOf(c),1)}));for(s.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,p){return p.g-c.g||-1/0}).forEach(function(c){return c.t.revert(r)}),a=o.data.length;a--;)u=o.data[a],u instanceof ke?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof oe)&&u.revert&&u.revert(r);o._r.forEach(function(c){return c(r,o)}),o.isReverted=!0})():this.data.forEach(function(s){return s.kill&&s.kill()}),this.clear(),i)for(var l=jn.length;l--;)jn[l].id===this.id&&jn.splice(l,1)},e.revert=function(r){this.kill(r||{})},t})(),J_=(function(){function t(n){this.contexts=[],this.scope=n,$&&$.data.push(this)}var e=t.prototype;return e.add=function(r,i,o){bt(r)||(r={matches:r});var l=new fm(0,o||this.scope),s=l.conditions={},a,u,c;$&&!l.selector&&(l.selector=$.selector),this.contexts.push(l),i=l.add("onMatch",i),l.queries=r;for(u in r)u==="all"?c=1:(a=kt.matchMedia(r[u]),a&&(jn.indexOf(l)<0&&jn.push(l),(s[u]=a.matches)&&(c=1),a.addListener?a.addListener(fu):a.addEventListener("change",fu)));return c&&i(l,function(p){return l.add(null,p)}),this},e.revert=function(r){this.kill(r||{})},e.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},t})(),xl={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];n.forEach(function(i){return rm(i)})},timeline:function(e){return new ke(e)},getTweensOf:function(e,n){return Z.getTweensOf(e,n)},getProperty:function(e,n,r,i){ue(e)&&(e=st(e)[0]);var o=dn(e||{}).get,l=r?Rp:Hp;return r==="native"&&(r=""),e&&(n?l((Ae[n]&&Ae[n].get||o)(e,n,r,i)):function(s,a,u){return l((Ae[s]&&Ae[s].get||o)(e,s,a,u))})},quickSetter:function(e,n,r){if(e=st(e),e.length>1){var i=e.map(function(c){return be.quickSetter(c,n,r)}),o=i.length;return function(c){for(var p=o;p--;)i[p](c)}}e=e[0]||{};var l=Ae[n],s=dn(e),a=s.harness&&(s.harness.aliases||{})[n]||n,u=l?function(c){var p=new l;Cr._pt=0,p.init(e,r?c+r:c,Cr,0,[e]),p.render(1,p),Cr._pt&&Pu(1,Cr)}:s.set(e,a);return l?u:function(c){return u(e,a,r?c+r:c,s,1)}},quickTo:function(e,n,r){var i,o=be.to(e,Ge((i={},i[n]="+=0.1",i.paused=!0,i.stagger=0,i),r||{})),l=function(a,u,c){return o.resetTo(n,a,u,c)};return l.tween=o,l},isTweening:function(e){return Z.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Bn(e.ease,Li.ease)),Pp(Li,e||{})},config:function(e){return Pp(je,e||{})},registerEffect:function(e){var n=e.name,r=e.effect,i=e.plugins,o=e.defaults,l=e.extendTimeline;(i||"").split(",").forEach(function(s){return s&&!Ae[s]&&!Xe[s]&&Fi(n+" effect requires "+s+" plugin.")}),Ka[n]=function(s,a,u){return r(st(s),Ge(a||{},o),u)},l&&(ke.prototype[n]=function(s,a,u){return this.add(Ka[n](s,bt(a)?a:(u=a)&&{},this),u)})},registerEase:function(e,n){F[e]=Bn(n)},parseEase:function(e,n){return arguments.length?Bn(e,n):F},getById:function(e){return Z.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var r=new ke(e),i,o;for(r.smoothChildTiming=Be(e.smoothChildTiming),Z.remove(r),r._dp=0,r._time=r._tTime=Z._time,i=Z._first;i;)o=i._next,(n||!(!i._dur&&i instanceof oe&&i.vars.onComplete===i._targets[0]))&&St(r,i,i._start-i._delay),i=o;return St(Z,r,0),r},context:function(e,n){return e?new fm(e,n):$},matchMedia:function(e){return new J_(e)},matchMediaRefresh:function(){return jn.forEach(function(e){var n=e.conditions,r,i;for(i in n)n[i]&&(n[i]=!1,r=1);r&&e.revert()})||fu()},addEventListener:function(e,n){var r=hl[e]||(hl[e]=[]);~r.indexOf(n)||r.push(n)},removeEventListener:function(e,n){var r=hl[e],i=r&&r.indexOf(n);i>=0&&r.splice(i,1)},utils:{wrap:z_,wrapYoyo:O_,distribute:qp,random:Jp,snap:Zp,normalize:P_,getUnit:_e,clamp:C_,splitColor:im,toArray:st,selector:au,mapRange:tm,pipe:T_,unitize:N_,interpolate:M_,shuffle:Kp},install:jp,effects:Ka,ticker:Ie,updateRoot:ke.updateRoot,plugins:Ae,globalTimeline:Z,core:{PropTween:ze,globals:Up,Tween:oe,Timeline:ke,Animation:Bi,getCache:dn,_removeLinkedListItem:Sl,reverting:function(){return he},context:function(e){return e&&$&&($.data.push(e),e._ctx=$),$},suppressOverwrites:function(e){return du=e}}};Pe("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return xl[t]=oe[t]});Ie.add(ke.updateRoot);Cr=xl.to({},{duration:0});var eg=function(e,n){for(var r=e._pt;r&&r.p!==n&&r.op!==n&&r.fp!==n;)r=r._next;return r},tg=function(e,n){var r=e._targets,i,o,l;for(i in n)for(o=r.length;o--;)l=e._ptLookup[o][i],l&&(l=l.d)&&(l._pt&&(l=eg(l,i)),l&&l.modifier&&l.modifier(n[i],e,r[o],i))},tu=function(e,n){return{name:e,headless:1,rawVars:1,init:function(i,o,l){l._onInit=function(s){var a,u;if(ue(o)&&(a={},Pe(o,function(c){return a[c]=1}),o=a),n){a={};for(u in o)a[u]=n(o[u]);o=a}tg(s,o)}}}},be=xl.registerPlugin({name:"attr",init:function(e,n,r,i,o){var l,s,a;this.tween=r;for(l in n)a=e.getAttribute(l)||"",s=this.add(e,"setAttribute",(a||0)+"",n[l],i,o,0,0,l),s.op=l,s.b=a,this._props.push(l)},render:function(e,n){for(var r=n._pt;r;)he?r.set(r.t,r.p,r.b,r):r.r(e,r.d),r=r._next}},{name:"endArray",headless:1,init:function(e,n){for(var r=n.length;r--;)this.add(e,r,e[r]||0,n[r],0,0,0,0,0,1)}},tu("roundProps",uu),tu("modifiers"),tu("snap",Zp))||xl;oe.version=ke.version=be.version="3.15.0";Bp=1;pu()&&Pr();var ng=F.Power0,rg=F.Power1,ig=F.Power2,og=F.Power3,lg=F.Power4,sg=F.Linear,ag=F.Quad,ug=F.Cubic,cg=F.Quart,fg=F.Quint,dg=F.Strong,pg=F.Elastic,mg=F.Back,hg=F.SteppedEase,_g=F.Bounce,gg=F.Sine,vg=F.Expo,yg=F.Circ;var dm,hn,Mr,Au,Yn,xg,pm,Iu,wg=function(){return typeof window<"u"},Vt={},Qn=180/Math.PI,Dr=Math.PI/180,Or=Math.atan2,mm=1e8,Bu=/([A-Z])/g,kg=/(left|right|width|margin|padding|x)/i,Sg=/[\s,\(]\S/,Ct={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Mu=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},bg=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},Cg=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},Eg=function(e,n){return n.set(n.t,n.p,e===1?n.e:e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},Tg=function(e,n){var r=n.s+n.c*e;n.set(n.t,n.p,~~(r+(r<0?-.5:.5))+n.u,n)},km=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},Sm=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},Ng=function(e,n,r){return e.style[n]=r},Pg=function(e,n,r){return e.style.setProperty(n,r)},zg=function(e,n,r){return e._gsap[n]=r},Og=function(e,n,r){return e._gsap.scaleX=e._gsap.scaleY=r},Mg=function(e,n,r,i,o){var l=e._gsap;l.scaleX=l.scaleY=r,l.renderTransform(o,l)},Dg=function(e,n,r,i,o){var l=e._gsap;l[n]=r,l.renderTransform(o,l)},J="transform",Ue=J+"Origin",Lg=function t(e,n){var r=this,i=this.target,o=i.style,l=i._gsap;if(e in Vt&&o){if(this.tfm=this.tfm||{},e!=="transform")e=Ct[e]||e,~e.indexOf(",")?e.split(",").forEach(function(s){return r.tfm[s]=Ut(i,s)}):this.tfm[e]=l.x?l[e]:Ut(i,e),e===Ue&&(this.tfm.zOrigin=l.zOrigin);else return Ct.transform.split(",").forEach(function(s){return t.call(r,s,n)});if(this.props.indexOf(J)>=0)return;l.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Ue,n,"")),e=J}(o||n)&&this.props.push(e,n,o[e])},bm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Fg=function(){var e=this.props,n=this.target,r=n.style,i=n._gsap,o,l;for(o=0;o<e.length;o+=3)e[o+1]?e[o+1]===2?n[e[o]](e[o+2]):n[e[o]]=e[o+2]:e[o+2]?r[e[o]]=e[o+2]:r.removeProperty(e[o].substr(0,2)==="--"?e[o]:e[o].replace(Bu,"-$1").toLowerCase());if(this.tfm){for(l in this.tfm)i[l]=this.tfm[l];i.svg&&(i.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),o=Iu(),(!o||!o.isStart)&&!r[J]&&(bm(r),i.zOrigin&&r[Ue]&&(r[Ue]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Cm=function(e,n){var r={target:e,props:[],revert:Fg,save:Lg};return e._gsap||be.core.getCache(e),n&&e.style&&e.nodeType&&n.split(",").forEach(function(i){return r.save(i)}),r},Em,Du=function(e,n){var r=hn.createElementNS?hn.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):hn.createElement(e);return r&&r.style?r:hn.createElement(e)},Ke=function t(e,n,r){var i=getComputedStyle(e);return i[n]||i.getPropertyValue(n.replace(Bu,"-$1").toLowerCase())||i.getPropertyValue(n)||!r&&t(e,Lr(n)||n,1)||""},hm="O,Moz,ms,Ms,Webkit".split(","),Lr=function(e,n,r){var i=n||Yn,o=i.style,l=5;if(e in o&&!r)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);l--&&!(hm[l]+e in o););return l<0?null:(l===3?"ms":l>=0?hm[l]:"")+e},Lu=function(){wg()&&window.document&&(dm=window,hn=dm.document,Mr=hn.documentElement,Yn=Du("div")||{style:{}},xg=Du("div"),J=Lr(J),Ue=J+"Origin",Yn.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Em=!!Lr("perspective"),Iu=be.core.reverting,Au=1)},_m=function(e){var n=e.ownerSVGElement,r=Du("svg",n&&n.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),o;i.style.display="block",r.appendChild(i),Mr.appendChild(r);try{o=i.getBBox()}catch{}return r.removeChild(i),Mr.removeChild(r),o},gm=function(e,n){for(var r=n.length;r--;)if(e.hasAttribute(n[r]))return e.getAttribute(n[r])},Tm=function(e){var n,r;try{n=e.getBBox()}catch{n=_m(e),r=1}return n&&(n.width||n.height)||r||(n=_m(e)),n&&!n.width&&!n.x&&!n.y?{x:+gm(e,["x","cx","x1"])||0,y:+gm(e,["y","cy","y1"])||0,width:0,height:0}:n},Nm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Tm(e))},gn=function(e,n){if(n){var r=e.style,i;n in Vt&&n!==Ue&&(n=J),r.removeProperty?(i=n.substr(0,2),(i==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),r.removeProperty(i==="--"?n:n.replace(Bu,"-$1").toLowerCase())):r.removeAttribute(n)}},_n=function(e,n,r,i,o,l){var s=new ze(e._pt,n,r,0,1,l?Sm:km);return e._pt=s,s.b=i,s.e=o,e._props.push(r),s},vm={deg:1,rad:1,turn:1},Ag={grid:1,flex:1},vn=function t(e,n,r,i){var o=parseFloat(r)||0,l=(r+"").trim().substr((o+"").length)||"px",s=Yn.style,a=kg.test(n),u=e.tagName.toLowerCase()==="svg",c=(u?"client":"offset")+(a?"Width":"Height"),p=100,_=i==="px",v=i==="%",y,h,k,g;if(i===l||!o||vm[i]||vm[l])return o;if(l!=="px"&&!_&&(o=t(e,n,r,"px")),g=e.getCTM&&Nm(e),(v||l==="%")&&(Vt[n]||~n.indexOf("adius")))return y=g?e.getBBox()[a?"width":"height"]:e[c],re(v?o/y*p:o/100*y);if(s[a?"width":"height"]=p+(_?l:i),h=i!=="rem"&&~n.indexOf("adius")||i==="em"&&e.appendChild&&!u?e:e.parentNode,g&&(h=(e.ownerSVGElement||{}).parentNode),(!h||h===hn||!h.appendChild)&&(h=hn.body),k=h._gsap,k&&v&&k.width&&a&&k.time===Ie.time&&!k.uncache)return re(o/k.width*p);if(v&&(n==="height"||n==="width")){var d=e.style[n];e.style[n]=p+i,y=e[c],d?e.style[n]=d:gn(e,n)}else(v||l==="%")&&!Ag[Ke(h,"display")]&&(s.position=Ke(e,"position")),h===e&&(s.position="static"),h.appendChild(Yn),y=Yn[c],h.removeChild(Yn),s.position="absolute";return a&&v&&(k=dn(h),k.time=Ie.time,k.width=h[c]),re(_?y*o/p:y&&o?p/y*o:0)},Ut=function(e,n,r,i){var o;return Au||Lu(),n in Ct&&n!=="transform"&&(n=Ct[n],~n.indexOf(",")&&(n=n.split(",")[0])),Vt[n]&&n!=="transform"?(o=Wi(e,i),o=n!=="transformOrigin"?o[n]:o.svg?o.origin:Nl(Ke(e,Ue))+" "+o.zOrigin+"px"):(o=e.style[n],(!o||o==="auto"||i||~(o+"").indexOf("calc("))&&(o=Tl[n]&&Tl[n](e,n,r)||Ke(e,n)||xu(e,n)||(n==="opacity"?1:0))),r&&!~(o+"").trim().indexOf(" ")?vn(e,n,o,r)+r:o},Ig=function(e,n,r,i){if(!r||r==="none"){var o=Lr(n,e,1),l=o&&Ke(e,o,1);l&&l!==r?(n=o,r=l):n==="borderColor"&&(r=Ke(e,"borderTopColor"))}var s=new ze(this._pt,e.style,n,0,1,Nu),a=0,u=0,c,p,_,v,y,h,k,g,d,m,x,w;if(s.b=r,s.e=i,r+="",i+="",i.substring(0,6)==="var(--"&&(i=Ke(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(h=e.style[n],e.style[n]=i,i=Ke(e,n)||i,h?e.style[n]=h:gn(e,n)),c=[r,i],ku(c),r=c[0],i=c[1],_=r.match(Un)||[],w=i.match(Un)||[],w.length){for(;p=Un.exec(i);)k=p[0],d=i.substring(a,p.index),y?y=(y+1)%5:(d.substr(-5)==="rgba("||d.substr(-5)==="hsla(")&&(y=1),k!==(h=_[u++]||"")&&(v=parseFloat(h)||0,x=h.substr((v+"").length),k.charAt(1)==="="&&(k=Vn(v,k)+x),g=parseFloat(k),m=k.substr((g+"").length),a=Un.lastIndex-m.length,m||(m=m||je.units[n]||x,a===i.length&&(i+=m,s.e+=m)),x!==m&&(v=vn(e,n,h,m)||0),s._pt={_next:s._pt,p:d||u===1?d:",",s:v,c:g-v,m:y&&y<4||n==="zIndex"?Math.round:0});s.c=a<i.length?i.substring(a,i.length):""}else s.r=n==="display"&&i==="none"?Sm:km;return hu.test(i)&&(s.e=0),this._pt=s,s},ym={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Bg=function(e){var n=e.split(" "),r=n[0],i=n[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(e=r,r=i,i=e),n[0]=ym[r]||r,n[1]=ym[i]||i,n.join(" ")},jg=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var r=n.t,i=r.style,o=n.u,l=r._gsap,s,a,u;if(o==="all"||o===!0)i.cssText="",a=1;else for(o=o.split(","),u=o.length;--u>-1;)s=o[u],Vt[s]&&(a=1,s=s==="transformOrigin"?Ue:J),gn(r,s);a&&(gn(r,J),l&&(l.svg&&r.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Wi(r,1),l.uncache=1,bm(i)))}},Tl={clearProps:function(e,n,r,i,o){if(o.data!=="isFromStart"){var l=e._pt=new ze(e._pt,n,r,0,0,jg);return l.u=i,l.pr=-10,l.tween=o,e._props.push(r),1}}},Vi=[1,0,0,1,0,0],Pm={},zm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},xm=function(e){var n=Ke(e,J);return zm(n)?Vi:n.substr(7).match(mu).map(re)},ju=function(e,n){var r=e._gsap||dn(e),i=e.style,o=xm(e),l,s,a,u;return r.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,o=[a.a,a.b,a.c,a.d,a.e,a.f],o.join(",")==="1,0,0,1,0,0"?Vi:o):(o===Vi&&!e.offsetParent&&e!==Mr&&!r.svg&&(a=i.display,i.display="block",l=e.parentNode,(!l||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,s=e.nextElementSibling,Mr.appendChild(e)),o=xm(e),a?i.display=a:gn(e,"display"),u&&(s?l.insertBefore(e,s):l?l.appendChild(e):Mr.removeChild(e))),n&&o.length>6?[o[0],o[1],o[4],o[5],o[12],o[13]]:o)},Fu=function(e,n,r,i,o,l){var s=e._gsap,a=o||ju(e,!0),u=s.xOrigin||0,c=s.yOrigin||0,p=s.xOffset||0,_=s.yOffset||0,v=a[0],y=a[1],h=a[2],k=a[3],g=a[4],d=a[5],m=n.split(" "),x=parseFloat(m[0])||0,w=parseFloat(m[1])||0,E,b,C,S;r?a!==Vi&&(b=v*k-y*h)&&(C=x*(k/b)+w*(-h/b)+(h*d-k*g)/b,S=x*(-y/b)+w*(v/b)-(v*d-y*g)/b,x=C,w=S):(E=Tm(e),x=E.x+(~m[0].indexOf("%")?x/100*E.width:x),w=E.y+(~(m[1]||m[0]).indexOf("%")?w/100*E.height:w)),i||i!==!1&&s.smooth?(g=x-u,d=w-c,s.xOffset=p+(g*v+d*h)-g,s.yOffset=_+(g*y+d*k)-d):s.xOffset=s.yOffset=0,s.xOrigin=x,s.yOrigin=w,s.smooth=!!i,s.origin=n,s.originIsAbsolute=!!r,e.style[Ue]="0px 0px",l&&(_n(l,s,"xOrigin",u,x),_n(l,s,"yOrigin",c,w),_n(l,s,"xOffset",p,s.xOffset),_n(l,s,"yOffset",_,s.yOffset)),e.setAttribute("data-svg-origin",x+" "+w)},Wi=function(e,n){var r=e._gsap||new Su(e);if("x"in r&&!n&&!r.uncache)return r;var i=e.style,o=r.scaleX<0,l="px",s="deg",a=getComputedStyle(e),u=Ke(e,Ue)||"0",c,p,_,v,y,h,k,g,d,m,x,w,E,b,C,S,T,z,O,D,L,Q,ee,B,qe,Xn,Fr,Ar,yn,Hu,Et,xn;return c=p=_=h=k=g=d=m=x=0,v=y=1,r.svg=!!(e.getCTM&&Nm(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(i[J]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[J]!=="none"?a[J]:"")),i.scale=i.rotate=i.translate="none"),b=ju(e,r.svg),r.svg&&(r.uncache?(qe=e.getBBox(),u=r.xOrigin-qe.x+"px "+(r.yOrigin-qe.y)+"px",B=""):B=!n&&e.getAttribute("data-svg-origin"),Fu(e,B||u,!!B||r.originIsAbsolute,r.smooth!==!1,b)),w=r.xOrigin||0,E=r.yOrigin||0,b!==Vi&&(z=b[0],O=b[1],D=b[2],L=b[3],c=Q=b[4],p=ee=b[5],b.length===6?(v=Math.sqrt(z*z+O*O),y=Math.sqrt(L*L+D*D),h=z||O?Or(O,z)*Qn:0,d=D||L?Or(D,L)*Qn+h:0,d&&(y*=Math.abs(Math.cos(d*Dr))),r.svg&&(c-=w-(w*z+E*D),p-=E-(w*O+E*L))):(xn=b[6],Hu=b[7],Fr=b[8],Ar=b[9],yn=b[10],Et=b[11],c=b[12],p=b[13],_=b[14],C=Or(xn,yn),k=C*Qn,C&&(S=Math.cos(-C),T=Math.sin(-C),B=Q*S+Fr*T,qe=ee*S+Ar*T,Xn=xn*S+yn*T,Fr=Q*-T+Fr*S,Ar=ee*-T+Ar*S,yn=xn*-T+yn*S,Et=Hu*-T+Et*S,Q=B,ee=qe,xn=Xn),C=Or(-D,yn),g=C*Qn,C&&(S=Math.cos(-C),T=Math.sin(-C),B=z*S-Fr*T,qe=O*S-Ar*T,Xn=D*S-yn*T,Et=L*T+Et*S,z=B,O=qe,D=Xn),C=Or(O,z),h=C*Qn,C&&(S=Math.cos(C),T=Math.sin(C),B=z*S+O*T,qe=Q*S+ee*T,O=O*S-z*T,ee=ee*S-Q*T,z=B,Q=qe),k&&Math.abs(k)+Math.abs(h)>359.9&&(k=h=0,g=180-g),v=re(Math.sqrt(z*z+O*O+D*D)),y=re(Math.sqrt(ee*ee+xn*xn)),C=Or(Q,ee),d=Math.abs(C)>2e-4?C*Qn:0,x=Et?1/(Et<0?-Et:Et):0),r.svg&&(B=e.getAttribute("transform"),r.forceCSS=e.setAttribute("transform","")||!zm(Ke(e,J)),B&&e.setAttribute("transform",B))),Math.abs(d)>90&&Math.abs(d)<270&&(o?(v*=-1,d+=h<=0?180:-180,h+=h<=0?180:-180):(y*=-1,d+=d<=0?180:-180)),n=n||r.uncache,r.x=c-((r.xPercent=c&&(!n&&r.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*r.xPercent/100:0)+l,r.y=p-((r.yPercent=p&&(!n&&r.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-p)?-50:0)))?e.offsetHeight*r.yPercent/100:0)+l,r.z=_+l,r.scaleX=re(v),r.scaleY=re(y),r.rotation=re(h)+s,r.rotationX=re(k)+s,r.rotationY=re(g)+s,r.skewX=d+s,r.skewY=m+s,r.transformPerspective=x+l,(r.zOrigin=parseFloat(u.split(" ")[2])||!n&&r.zOrigin||0)&&(i[Ue]=Nl(u)),r.xOffset=r.yOffset=0,r.force3D=je.force3D,r.renderTransform=r.svg?Vg:Em?Om:Ug,r.uncache=0,r},Nl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ou=function(e,n,r){var i=_e(n);return re(parseFloat(n)+parseFloat(vn(e,"x",r+"px",i)))+i},Ug=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,Om(e,n)},Hn="0deg",Ui="0px",Rn=") ",Om=function(e,n){var r=n||this,i=r.xPercent,o=r.yPercent,l=r.x,s=r.y,a=r.z,u=r.rotation,c=r.rotationY,p=r.rotationX,_=r.skewX,v=r.skewY,y=r.scaleX,h=r.scaleY,k=r.transformPerspective,g=r.force3D,d=r.target,m=r.zOrigin,x="",w=g==="auto"&&e&&e!==1||g===!0;if(m&&(p!==Hn||c!==Hn)){var E=parseFloat(c)*Dr,b=Math.sin(E),C=Math.cos(E),S;E=parseFloat(p)*Dr,S=Math.cos(E),l=Ou(d,l,b*S*-m),s=Ou(d,s,-Math.sin(E)*-m),a=Ou(d,a,C*S*-m+m)}k!==Ui&&(x+="perspective("+k+Rn),(i||o)&&(x+="translate("+i+"%, "+o+"%) "),(w||l!==Ui||s!==Ui||a!==Ui)&&(x+=a!==Ui||w?"translate3d("+l+", "+s+", "+a+") ":"translate("+l+", "+s+Rn),u!==Hn&&(x+="rotate("+u+Rn),c!==Hn&&(x+="rotateY("+c+Rn),p!==Hn&&(x+="rotateX("+p+Rn),(_!==Hn||v!==Hn)&&(x+="skew("+_+", "+v+Rn),(y!==1||h!==1)&&(x+="scale("+y+", "+h+Rn),d.style[J]=x||"translate(0, 0)"},Vg=function(e,n){var r=n||this,i=r.xPercent,o=r.yPercent,l=r.x,s=r.y,a=r.rotation,u=r.skewX,c=r.skewY,p=r.scaleX,_=r.scaleY,v=r.target,y=r.xOrigin,h=r.yOrigin,k=r.xOffset,g=r.yOffset,d=r.forceCSS,m=parseFloat(l),x=parseFloat(s),w,E,b,C,S;a=parseFloat(a),u=parseFloat(u),c=parseFloat(c),c&&(c=parseFloat(c),u+=c,a+=c),a||u?(a*=Dr,u*=Dr,w=Math.cos(a)*p,E=Math.sin(a)*p,b=Math.sin(a-u)*-_,C=Math.cos(a-u)*_,u&&(c*=Dr,S=Math.tan(u-c),S=Math.sqrt(1+S*S),b*=S,C*=S,c&&(S=Math.tan(c),S=Math.sqrt(1+S*S),w*=S,E*=S)),w=re(w),E=re(E),b=re(b),C=re(C)):(w=p,C=_,E=b=0),(m&&!~(l+"").indexOf("px")||x&&!~(s+"").indexOf("px"))&&(m=vn(v,"x",l,"px"),x=vn(v,"y",s,"px")),(y||h||k||g)&&(m=re(m+y-(y*w+h*b)+k),x=re(x+h-(y*E+h*C)+g)),(i||o)&&(S=v.getBBox(),m=re(m+i/100*S.width),x=re(x+o/100*S.height)),S="matrix("+w+","+E+","+b+","+C+","+m+","+x+")",v.setAttribute("transform",S),d&&(v.style[J]=S)},Wg=function(e,n,r,i,o){var l=360,s=ue(o),a=parseFloat(o)*(s&&~o.indexOf("rad")?Qn:1),u=a-i,c=i+u+"deg",p,_;return s&&(p=o.split("_")[1],p==="short"&&(u%=l,u!==u%(l/2)&&(u+=u<0?l:-l)),p==="cw"&&u<0?u=(u+l*mm)%l-~~(u/l)*l:p==="ccw"&&u>0&&(u=(u-l*mm)%l-~~(u/l)*l)),e._pt=_=new ze(e._pt,n,r,i,u,bg),_.e=c,_.u="deg",e._props.push(r),_},wm=function(e,n){for(var r in n)e[r]=n[r];return e},Hg=function(e,n,r){var i=wm({},r._gsap),o="perspective,force3D,transformOrigin,svgOrigin",l=r.style,s,a,u,c,p,_,v,y;i.svg?(u=r.getAttribute("transform"),r.setAttribute("transform",""),l[J]=n,s=Wi(r,1),gn(r,J),r.setAttribute("transform",u)):(u=getComputedStyle(r)[J],l[J]=n,s=Wi(r,1),l[J]=u);for(a in Vt)u=i[a],c=s[a],u!==c&&o.indexOf(a)<0&&(v=_e(u),y=_e(c),p=v!==y?vn(r,a,u,y):parseFloat(u),_=parseFloat(c),e._pt=new ze(e._pt,s,a,p,_-p,Mu),e._pt.u=y||0,e._props.push(a));wm(s,i)};Pe("padding,margin,Width,Radius",function(t,e){var n="Top",r="Right",i="Bottom",o="Left",l=(e<3?[n,r,i,o]:[n+o,n+r,i+r,i+o]).map(function(s){return e<2?t+s:"border"+s+t});Tl[e>1?"border"+t:t]=function(s,a,u,c,p){var _,v;if(arguments.length<4)return _=l.map(function(y){return Ut(s,y,u)}),v=_.join(" "),v.split(_[0]).length===5?_[0]:v;_=(c+"").split(" "),v={},l.forEach(function(y,h){return v[y]=_[h]=_[h]||_[(h-1)/2|0]}),s.init(a,v,p)}});var Uu={name:"css",register:Lu,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,r,i,o){var l=this._props,s=e.style,a=r.vars.startAt,u,c,p,_,v,y,h,k,g,d,m,x,w,E,b,C,S;Au||Lu(),this.styles=this.styles||Cm(e),C=this.styles.props,this.tween=r;for(h in n)if(h!=="autoRound"&&(c=n[h],!(Ae[h]&&Cu(h,n,r,i,e,o)))){if(v=typeof c,y=Tl[h],v==="function"&&(c=c.call(r,i,e,o),v=typeof c),v==="string"&&~c.indexOf("random(")&&(c=zr(c)),y)y(this,e,h,c,r)&&(b=1);else if(h.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(h)+"").trim(),c+="",Bt.lastIndex=0,Bt.test(u)||(k=_e(u),g=_e(c),g?k!==g&&(u=vn(e,h,u,g)+g):k&&(c+=k)),this.add(s,"setProperty",u,c,i,o,0,0,h),l.push(h),C.push(h,0,s[h]);else if(v!=="undefined"){if(a&&h in a?(u=typeof a[h]=="function"?a[h].call(r,i,e,o):a[h],ue(u)&&~u.indexOf("random(")&&(u=zr(u)),_e(u+"")||u==="auto"||(u+=je.units[h]||_e(Ut(e,h))||""),(u+"").charAt(1)==="="&&(u=Ut(e,h))):u=Ut(e,h),_=parseFloat(u),d=v==="string"&&c.charAt(1)==="="&&c.substr(0,2),d&&(c=c.substr(2)),p=parseFloat(c),h in Ct&&(h==="autoAlpha"&&(_===1&&Ut(e,"visibility")==="hidden"&&p&&(_=0),C.push("visibility",0,s.visibility),_n(this,s,"visibility",_?"inherit":"hidden",p?"inherit":"hidden",!p)),h!=="scale"&&h!=="transform"&&(h=Ct[h],~h.indexOf(",")&&(h=h.split(",")[0]))),m=h in Vt,m){if(this.styles.save(h),S=c,v==="string"&&c.substring(0,6)==="var(--"){if(c=Ke(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var T=e.style.perspective;e.style.perspective=c,c=Ke(e,"perspective"),T?e.style.perspective=T:gn(e,"perspective")}p=parseFloat(c)}if(x||(w=e._gsap,w.renderTransform&&!n.parseTransform||Wi(e,n.parseTransform),E=n.smoothOrigin!==!1&&w.smooth,x=this._pt=new ze(this._pt,s,J,0,1,w.renderTransform,w,0,-1),x.dep=1),h==="scale")this._pt=new ze(this._pt,w,"scaleY",w.scaleY,(d?Vn(w.scaleY,d+p):p)-w.scaleY||0,Mu),this._pt.u=0,l.push("scaleY",h),h+="X";else if(h==="transformOrigin"){C.push(Ue,0,s[Ue]),c=Bg(c),w.svg?Fu(e,c,0,E,0,this):(g=parseFloat(c.split(" ")[2])||0,g!==w.zOrigin&&_n(this,w,"zOrigin",w.zOrigin,g),_n(this,s,h,Nl(u),Nl(c)));continue}else if(h==="svgOrigin"){Fu(e,c,1,E,0,this);continue}else if(h in Pm){Wg(this,w,h,_,d?Vn(_,d+c):c);continue}else if(h==="smoothOrigin"){_n(this,w,"smooth",w.smooth,c);continue}else if(h==="force3D"){w[h]=c;continue}else if(h==="transform"){Hg(this,c,e);continue}}else h in s||(h=Lr(h)||h);if(m||(p||p===0)&&(_||_===0)&&!Sg.test(c)&&h in s)k=(u+"").substr((_+"").length),p||(p=0),g=_e(c)||(h in je.units?je.units[h]:k),k!==g&&(_=vn(e,h,u,g)),this._pt=new ze(this._pt,m?w:s,h,_,(d?Vn(_,d+p):p)-_,!m&&(g==="px"||h==="zIndex")&&n.autoRound!==!1?Tg:Mu),this._pt.u=g||0,m&&S!==c?(this._pt.b=u,this._pt.e=S,this._pt.r=Eg):k!==g&&g!=="%"&&(this._pt.b=u,this._pt.r=Cg);else if(h in s)Ig.call(this,e,h,u,d?d+c:c);else if(h in e)this.add(e,h,u||e[h],d?d+c:c,i,o);else if(h!=="parseTransform"){kl(h,c);continue}m||(h in s?C.push(h,0,s[h]):typeof e[h]=="function"?C.push(h,2,e[h]()):C.push(h,1,u||e[h])),l.push(h)}}b&&zu(this)},render:function(e,n){if(n.tween._time||!Iu())for(var r=n._pt;r;)r.r(e,r.d),r=r._next;else n.styles.revert()},get:Ut,aliases:Ct,getSetter:function(e,n,r){var i=Ct[n];return i&&i.indexOf(",")<0&&(n=i),n in Vt&&n!==Ue&&(e._gsap.x||Ut(e,"x"))?r&&pm===r?n==="scale"?Og:zg:(pm=r||{})&&(n==="scale"?Mg:Dg):e.style&&!wl(e.style[n])?Ng:~n.indexOf("-")?Pg:El(e,n)},core:{_removeProperty:gn,_getMatrix:ju}};be.utils.checkPrefix=Lr;be.core.getStyleSaver=Cm;(function(t,e,n,r){var i=Pe(t+","+e+","+n,function(o){Vt[o]=1});Pe(e,function(o){je.units[o]="deg",Pm[o]=1}),Ct[i[13]]=t+","+e,Pe(r,function(o){var l=o.split(":");Ct[l[1]]=i[l[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Pe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){je.units[t]="px"});be.registerPlugin(Uu);var Vu=be.registerPlugin(Uu)||be,sv=Vu.core.Tween;window.gsap=Vu;function Mm({onOpenMenu:t,onAudit:e,menuOpen:n,menuBtnRef:r}){let[i,o]=f.default.useState(!1),[l,s]=f.default.useState("");return f.default.useEffect(()=>{let a=()=>o(window.scrollY>24);return window.addEventListener("scroll",a,{passive:!0}),()=>window.removeEventListener("scroll",a)},[]),f.default.useEffect(()=>{let a=()=>{let c=new Date,p={hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:"Asia/Kolkata"};s(c.toLocaleTimeString("en-IN",p)+" IST")};a();let u=setInterval(a,3e4);return()=>clearInterval(u)},[]),f.default.createElement("nav",{className:"mmc-nav "+(i?"is-scrolled ":"")+(n?"is-menu-open":"")},f.default.createElement("div",{className:"mmc-nav__inner"},f.default.createElement("a",{className:"mmc-nav__mark",href:"index.html","aria-label":"Monday Marketing Company"},f.default.createElement("img",{className:"mmc-nav__mark-icon",src:"assets/logo-mark.png",alt:"MMC"}),f.default.createElement("span",{className:"mmc-nav__name"},f.default.createElement("span",{className:"mmc-nav__name-mmc"},"Monday Marketing Company"),f.default.createElement("span",{className:"mmc-nav__name-tag"},"Design \xD7 Marketing \xD7 Technology \xD7 Content \xD7 AI"))),f.default.createElement("div",{className:"mmc-nav__meta"},f.default.createElement("span",{className:"mmc-nav__meta-dot"}),f.default.createElement("span",null,"Onboarding \xB7 Clients \xB7 Hires  \xB7 ",l||"-")),f.default.createElement("div",{className:"mmc-nav__actions"},f.default.createElement("button",{className:"mmc-nav__audit",onClick:e},f.default.createElement("span",null,"Book a call"),f.default.createElement("span",{className:"mmc-nav__audit-arrow","aria-hidden":"true"})),f.default.createElement("button",{ref:r,className:"mmc-menu-btn "+(n?"is-open":""),onClick:t,"aria-expanded":n,"aria-label":n?"Close menu":"Open menu"},f.default.createElement("span",{className:"mmc-menu-btn__halo","aria-hidden":"true"}),f.default.createElement("span",{className:"mmc-menu-btn__label"},f.default.createElement("span",{className:"mmc-menu-btn__word mmc-menu-btn__word--menu"},"Menu"),f.default.createElement("span",{className:"mmc-menu-btn__word mmc-menu-btn__word--close"},"Close")),f.default.createElement("span",{className:"mmc-menu-btn__icon","aria-hidden":"true"},f.default.createElement("span",null),f.default.createElement("span",null),f.default.createElement("span",null))))),f.default.createElement("style",null,`
        .mmc-nav {
          position: fixed;
          top: 20px;
          left: 0; right: 0;
          z-index: 80;
          display: flex;
          justify-content: center;
          padding-inline: var(--shell-gutter);
          pointer-events: none;
          transition: top 280ms var(--ease-out);
        }
        .mmc-nav.is-scrolled { top: 12px; }
        .mmc-nav__inner {
          pointer-events: auto;
          /* Outer edge lands on the shell edge, so the bar and the hero card
             below it start and end at the same x. A fixed 1240 here was why
             the bar looked small beside a full-bleed section. */
          width: 100%;
          max-width: calc(var(--shell-max) - var(--shell-gutter) * 2);
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          border: 1px solid var(--mmc-border);
          border-radius: 999px;
          padding: 8px 8px 8px var(--shell-gutter);
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-3);
          transition: background 280ms var(--ease-out), border-color 280ms var(--ease-out);
        }
        /* When menu is open, keep nav clearly legible on cream background */
        .mmc-nav.is-menu-open .mmc-nav__inner {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(var(--mmc-blue-rgb), 0.16);
        }

        .mmc-nav__mark {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--mmc-blue);
          flex: 0 0 auto;
        }
        .mmc-nav__mark-icon {
          width: 38px;
          height: 38px;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
        }
        .mmc-nav__name {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .mmc-nav__name-mmc {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: var(--mmc-blue);
        }
        .mmc-nav__name-tag {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 9.5px;
          color: var(--fg-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .mmc-nav__meta {
          margin-left: auto;
          margin-right: 0;
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--fg-3);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
        }
        .mmc-nav__meta-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #2BB573;
          box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18);
          animation: pulse 2.4s var(--ease-out) infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18); }
          50%      { box-shadow: 0 0 0 7px rgba(43, 181, 115, 0.05); }
        }

        .mmc-nav__actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          /* Always the last thing on the right. The auto margin used to live on
             .mmc-nav__meta, which is hidden under 880px, so below that width the
             menu button slid back against the logo. */
          margin-left: auto;
          flex: 0 0 auto;
        }

        /* ---- Audit pill ---- */
        .mmc-nav__audit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px 10px 18px;
          border-radius: 999px;
          background: transparent;
          color: var(--mmc-blue);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: border-color var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out);
        }
        .mmc-nav__audit:hover {
          border-color: var(--mmc-blue);
          background: var(--mmc-blue);
          color: #fff;
        }
        .mmc-nav__audit-arrow {
          position: relative;
          display: inline-block;
          width: 14px; height: 1.5px;
          background: currentColor;
          transition: width var(--dur-base) var(--ease-out);
        }
        .mmc-nav__audit-arrow::after {
          content: "";
          position: absolute; right: -1px; top: -3px;
          width: 7px; height: 7px;
          border-top: 1.5px solid currentColor;
          border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .mmc-nav__audit:hover .mmc-nav__audit-arrow { width: 22px; }

        /* ---- Menu trigger ---- */
        .mmc-menu-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px 10px 18px;
          border-radius: 999px;
          background: var(--mmc-blue);
          color: #fff;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          overflow: hidden;
          isolation: isolate;
          transition: background var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .mmc-menu-btn:hover { background: var(--mmc-blue-700); }
        /* Open state, clearly visible on paper menu bg */
        .mmc-menu-btn.is-open {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
        }
        .mmc-menu-btn.is-open:hover { background: #F8A800; }

        .mmc-menu-btn__halo {
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at 50% 50%, rgba(var(--mmc-yellow-rgb), 0.85) 0%, rgba(var(--mmc-yellow-rgb), 0) 60%);
          opacity: 0;
          transform: scale(0.4);
          transition: transform var(--dur-slow) var(--ease-out), opacity var(--dur-slow) var(--ease-out);
          z-index: -1;
        }
        .mmc-menu-btn:hover .mmc-menu-btn__halo { opacity: 0.45; transform: scale(1); }
        .mmc-menu-btn.is-open .mmc-menu-btn__halo { opacity: 0; }

        .mmc-menu-btn__label {
          position: relative;
          display: inline-block;
          height: 14px;
          line-height: 14px;
          overflow: hidden;
        }
        .mmc-menu-btn__word {
          display: block;
          transition: transform var(--dur-base) var(--ease-out);
        }
        .mmc-menu-btn.is-open .mmc-menu-btn__word { transform: translateY(-14px); }

        .mmc-menu-btn__icon {
          position: relative;
          width: 16px;
          height: 14px;
          display: inline-flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mmc-menu-btn__icon span {
          display: block;
          height: 1.5px;
          background: currentColor;
          border-radius: 1px;
          transform-origin: center;
          transition: transform 380ms var(--ease-out), opacity 240ms var(--ease-out);
        }
        .mmc-menu-btn__icon span:nth-child(1) { width: 16px; }
        .mmc-menu-btn__icon span:nth-child(2) { width: 11px; align-self: flex-end; }
        .mmc-menu-btn__icon span:nth-child(3) { width: 16px; }

        .mmc-menu-btn.is-open .mmc-menu-btn__icon span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .mmc-menu-btn.is-open .mmc-menu-btn__icon span:nth-child(2) { opacity: 0; }
        .mmc-menu-btn.is-open .mmc-menu-btn__icon span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        @media (max-width: 880px) {
          .mmc-nav__meta { display: none; }
          .mmc-nav__name-tag { display: none; }
        }
        @media (max-width: 720px) {
          .mmc-nav__audit { display: none; }
          .mmc-nav__inner { padding-left: 14px; padding-right: 6px; gap: 10px; }
          .mmc-nav__mark { min-width: 0; }
          .mmc-nav__name-mmc { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .mmc-nav__mark-icon { width: 32px; height: 32px; }
          .mmc-nav__name-mmc { font-size: 13px; }
        }
      `))}window.Nav=Mm;function Dm({open:t,triggerRef:e,onClose:n,onAudit:r}){let i=f.default.useRef(null),o=f.default.useRef(null),l=f.default.useRef(null),s=f.default.useRef(null),a=f.default.useRef(null),u=f.default.useRef(null),c=f.default.useRef(!1),[p,_]=f.default.useState("Services"),[v,y]=f.default.useState(""),[h,k]=f.default.useState(0),[g,d]=f.default.useState(.95),m=S=>{d(.05),_(S),y("")},x=[{n:"01",label:"Home",url:"index.html",hint:"We build revenue engines."},{n:"02",label:"Services",url:"services.html",hint:"Paid media, search, creative, brand and build",sub:[{name:"Performance marketing",desc:"Paid media read against profit",url:"performance-marketing.html",expandKey:"svc-performance",inner:[{name:"Performance marketing overview",url:"performance-marketing.html"},{name:"Meta Ads",url:"meta-ads.html"},{name:"Google Ads",url:"google-ads.html"},{name:"Amazon Ads",url:"amazon-ads.html"},{name:"Quick commerce ads",url:"quick-commerce-ads.html"}]},{name:"Leads and retention",desc:"Win the right customers, keep them",url:"lead-generation.html",expandKey:"svc-leads",inner:[{name:"Lead generation",url:"lead-generation.html"},{name:"Retention marketing",url:"retention-marketing.html"},{name:"Online reputation management",url:"online-reputation-management.html"}]},{name:"Search and conversion",desc:"Get found, then get chosen",url:"seo.html",expandKey:"svc-search",inner:[{name:"SEO",url:"seo.html"},{name:"Conversion optimisation",url:"conversion-rate-optimisation.html"},{name:"Shopify development",url:"shopify-development.html"},{name:"Website development",url:"web-development.html"},{name:"Mobile app development",url:"mobile-app-development.html"}]},{name:"Creative and brand",desc:"Look and sound like one brand",url:"branding.html",expandKey:"svc-creative",inner:[{name:"Branding",url:"branding.html"},{name:"Packaging design",url:"packaging-design.html"},{name:"UI/UX design",url:"ui-ux-design.html"},{name:"UGC and video",url:"ugc-and-video.html"},{name:"Social media creatives",url:"social-media-creatives.html"},{name:"Influencer marketing",url:"influencer-marketing.html"}]}]},{n:"03",label:"Industries",url:"industries.html",hint:"D2C \xB7 B2B \xB7 Education",sub:[{name:"D2C brands",desc:"Ads, store, creative, retention",url:"d2c.html"},{name:"B2B companies",desc:"Leads judged on fit",url:"b2b.html"},{name:"Educational institutes",desc:"Enquiries through to enrolment",url:"education.html"}]},{n:"04",label:"Our Work",url:"Our Work.html",hint:"Featured \xB7 Growth Blueprints \xB7 Industries"},{n:"05",label:"Resources",url:"resources.html",hint:"Calculators \xB7 Glossary \xB7 Guides",sub:[{name:"Calculators",desc:"Run your own numbers",url:"tools.html",expandKey:"calculators",inner:[{name:"Unit Economics Calculator",url:"unit-economics-calculator.html"},{name:"Growth Trajectory Calculator",url:"growth-trajectory-calculator.html"},{name:"CAC Runway Calculator",url:"cac-runway-calculator.html"},{name:"Funnel ROAS Calculator",url:"funnel-roas-calculator.html"},{name:"Break-even ROAS Calculator",url:"breakeven-roas-calculator.html"},{name:"LTV : CAC Calculator",url:"ltv-cac-calculator.html"},{name:"D2C Marketing Glossary",url:"d2c-marketing-glossary.html"}]},{name:"Guides",desc:"The method behind the numbers",url:"guides.html",expandKey:"guides",inner:[{name:"All guides",url:"guides.html"},{name:"Contribution margin and break-even ROAS",url:"guide-contribution-margin-roas.html"},{name:"Why platform dashboards over-count",url:"guide-attribution-overlap.html"},{name:"How D2C brands test creative",url:"guide-creative-testing.html"}]}]},{n:"06",label:"About Us",url:"About.html",hint:"Story \xB7 Team \xB7 Awards \xB7 Press"},{n:"07",label:"Careers",url:"Careers.html",hint:"6 open senior roles \xB7 Apply with one page",sub:[{name:"Performance",desc:"Run media at scale",url:"Careers.html",expandKey:"performance",inner:[{name:"Senior Meta Buyer \xB7 Mumbai",url:"Job Detail.html?role=senior-meta-buyer"},{name:"Google + Amazon Specialist \xB7 Mumbai",url:"Job Detail.html?role=google-amazon-specialist"}]},{name:"Creative",desc:"Direct + write the work",url:"Careers.html",expandKey:"creative",inner:[{name:"Senior Art Director \xB7 Mumbai",url:"Job Detail.html?role=senior-art-director"},{name:"Performance Copywriter \xB7 Remote",url:"Job Detail.html?role=performance-copywriter"}]},{name:"Strategy",desc:"Own a P&L",url:"Careers.html",expandKey:"strategy",inner:[{name:"Growth Strategist \xB7 D2C \xB7 Mumbai",url:"Job Detail.html?role=growth-strategist"}]},{name:"Technology",desc:"Ship the stack",url:"Careers.html",expandKey:"tech",inner:[{name:"Shopify Plus Engineer \xB7 Remote",url:"Job Detail.html?role=shopify-engineer"}]}]},{n:"08",label:"Insights",url:"Insights.html",hint:"Founder's Journal \xB7 Playbooks \xB7 Breakdowns"},{n:"09",label:"Contact",url:"Contact.html",hint:"Book a call \xB7 Visit Thane"}],w=f.default.useCallback(()=>{let S=window.gsap;if(!S)return null;let T=s.current.querySelectorAll(".sm-link"),z=s.current.querySelectorAll(".sm-fade"),O=i.current.querySelector(".sunmenu__corona"),D=i.current.querySelector(".sunmenu__heat"),L=S.timeline({paused:!0});return L.set(i.current,{pointerEvents:"auto",visibility:"visible"},0).set([o.current,l.current],{scale:0,opacity:1},0).set([O,D],{opacity:0},0).set(T,{yPercent:-120},0).set(z,{opacity:0,y:14},0).to(o.current,{scale:1,duration:.95,ease:"expo.out"},0).to(l.current,{scale:1,duration:.95,ease:"expo.out"},.2).to([O,D],{opacity:1,duration:.5,ease:"power2.out"},.85).to(T,{yPercent:0,duration:.9,stagger:.055,ease:"expo.out"},.9).to(z,{opacity:1,y:0,duration:.65,stagger:.045,ease:"power3.out"},1),L},[]),E=f.default.useCallback(()=>{let S=window.gsap;if(!S)return null;let T=s.current.querySelectorAll(".sm-link"),z=s.current.querySelectorAll(".sm-fade"),O=i.current.querySelector(".sunmenu__corona"),D=i.current.querySelector(".sunmenu__heat"),L=S.timeline({paused:!0});return L.to(z,{opacity:0,y:10,duration:.3,stagger:.02,ease:"power2.in"},0).to(T,{yPercent:-120,duration:.5,stagger:.035,ease:"expo.in"},.05).to([O,D],{opacity:0,duration:.3,ease:"power2.in"},.25).to(l.current,{scale:0,duration:.85,ease:"expo.in"},.45).to(o.current,{scale:0,duration:.85,ease:"expo.in"},.65).set(i.current,{pointerEvents:"none",visibility:"hidden"}),L},[]);f.default.useEffect(()=>(a.current=w(),u.current=E(),()=>{a.current&&a.current.kill(),u.current&&u.current.kill()}),[w,E]),f.default.useEffect(()=>{let S=window.gsap;if(!a.current||!u.current||!S){let T=i.current;if(!T)return;t?(T.style.visibility="visible",T.style.pointerEvents="auto",T.style.opacity="1",document.body.style.overflow="hidden",c.current=!0):c.current&&(T.style.visibility="hidden",T.style.pointerEvents="none",document.body.style.overflow="");return}if(t){_("Services"),y(""),d(.95),k(B=>B+1);let T=e&&e.current,z=window.innerWidth-80,O=40;if(T){let B=T.getBoundingClientRect();z=B.left+B.width/2,O=B.top+B.height/2}let D=Math.max(z,window.innerWidth-z),L=Math.max(O,window.innerHeight-O),Q=Math.ceil(Math.hypot(D,L))+40,ee=Q*2;S.set([o.current,l.current],{width:ee,height:ee,left:z-Q,top:O-Q}),u.current.isActive()&&u.current.pause(0),a.current.play(0),document.body.style.overflow="hidden",c.current=!0}else c.current&&(a.current.isActive()&&a.current.pause(),u.current.play(0),document.body.style.overflow="",y(""))},[t,e]),f.default.useEffect(()=>{let S=T=>{T.key==="Escape"&&t&&n()};return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[t,n]);let b=(S,T)=>{S.preventDefault(),n(),setTimeout(()=>{let z=window.location.pathname.split("/").pop(),[O,D]=T.split("#");if((O===z||z===""&&O==="index.html")&&D){let L=document.getElementById(D);if(L){let Q=L.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:Q,behavior:"smooth"});return}}window.location.href=T},420)},C=x.find(S=>S.label===p)||x[1];return f.default.createElement("div",{className:"sunmenu",ref:i,"aria-hidden":!t},f.default.createElement("div",{className:"sunmenu__paper",ref:l,"aria-hidden":"true"}),f.default.createElement("div",{className:"sunmenu__disc",ref:o,"aria-hidden":"true"}),f.default.createElement("div",{className:"sunmenu__corona","aria-hidden":"true"}),f.default.createElement("div",{className:"sunmenu__heat","aria-hidden":"true"}),f.default.createElement("div",{className:"sunmenu__content",ref:s},f.default.createElement("div",{className:"sunmenu__head"},f.default.createElement("div",{className:"sm-fade sunmenu__eyebrow"},"The Index"),f.default.createElement("div",{className:"sm-fade sunmenu__head-meta"},f.default.createElement("span",null,"06 surfaces \xB7 30+ services"),f.default.createElement("span",{className:"dot"}),f.default.createElement("span",null,"Est. 2019 \xB7 Thane"))),f.default.createElement("div",{className:"sm-fade sunmenu__multi"},f.default.createElement("span",null,"Design"),f.default.createElement("span",{className:"x"},"\xD7"),f.default.createElement("span",null,"Marketing"),f.default.createElement("span",{className:"x"},"\xD7"),f.default.createElement("span",null,"Technology"),f.default.createElement("span",{className:"x"},"\xD7"),f.default.createElement("span",null,"Content"),f.default.createElement("span",{className:"x"},"\xD7"),f.default.createElement("span",null,"AI")),f.default.createElement("div",{className:"sunmenu__panes"},f.default.createElement("nav",{className:"sunmenu__primary","aria-label":"Primary"},f.default.createElement("ul",null,x.map(S=>f.default.createElement("li",{key:S.label,className:"sunmenu__primary-row "+(p===S.label?"is-active":"")},f.default.createElement("a",{href:S.url,className:"sunmenu__primary-link",onMouseEnter:()=>m(S.label),onFocus:()=>m(S.label),onClick:T=>b(T,S.url)},f.default.createElement("span",{className:"sunmenu__link-clip"},f.default.createElement("span",{className:"sm-link"},f.default.createElement("span",{className:"sunmenu__primary-n"},S.n),f.default.createElement("span",{className:"sunmenu__primary-label"},S.label),f.default.createElement("span",{className:"sunmenu__primary-arrow","aria-hidden":"true"},f.default.createElement("svg",{viewBox:"0 0 16 16",width:"14",height:"14"},f.default.createElement("path",{d:"M 4 8 H 12 M 9 5 L 12 8 L 9 11",fill:"none",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})))))))))),f.default.createElement("div",{className:"sunmenu__sub",key:C.label+"#"+h},f.default.createElement("div",{className:"sm-wf sunmenu__sub-head",style:{animationDelay:g+"s"}},f.default.createElement("span",{className:"sunmenu__sub-eyebrow"},C.label),f.default.createElement("span",{className:"sunmenu__sub-rule"})),f.default.createElement("p",{className:"sm-wf sunmenu__sub-hint",style:{animationDelay:g+.07+"s"}},C.hint),C.sub?f.default.createElement("ul",{className:"sunmenu__sub-list"},C.sub.map((S,T)=>{let z=S.expandKey&&v===S.expandKey;return f.default.createElement("li",{key:S.name,className:"sm-wf sunmenu__sub-item "+(z?"is-expanded":""),style:{animationDelay:g+.14+T*.07+"s"}},f.default.createElement("div",{className:"sunmenu__sub-row"},f.default.createElement("a",{href:S.url,className:"sunmenu__sub-link",onClick:O=>{S.inner?(O.preventDefault(),y(z?"":S.expandKey)):b(O,S.url)}},f.default.createElement("span",{className:"sunmenu__sub-n"},String(T+1).padStart(2,"0")),f.default.createElement("span",{className:"sunmenu__sub-body"},f.default.createElement("span",{className:"sunmenu__sub-name"},S.name),f.default.createElement("span",{className:"sunmenu__sub-desc"},S.desc)),f.default.createElement("span",{className:"sunmenu__sub-go","aria-hidden":"true"},f.default.createElement("svg",{viewBox:"0 0 16 16",width:"14",height:"14"},f.default.createElement("path",{d:"M 4 8 H 12 M 9 5 L 12 8 L 9 11",fill:"none",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})))),S.inner&&f.default.createElement("button",{className:"sunmenu__sub-expand",onClick:()=>y(z?"":S.expandKey),"aria-expanded":z,"aria-label":z?"Collapse":"Expand inner services"},f.default.createElement("span",null),f.default.createElement("span",null))),S.inner&&f.default.createElement("div",{className:"sunmenu__inner"},f.default.createElement("div",{className:"sunmenu__inner-inner"},f.default.createElement("ul",null,S.inner.map((O,D)=>f.default.createElement("li",{key:O.name},f.default.createElement("a",{href:O.url,onClick:L=>b(L,O.url)},f.default.createElement("span",{className:"ix-n"},String(D+1).padStart(2,"0")),f.default.createElement("span",{className:"ix-name"},O.name),f.default.createElement("span",{className:"ix-arr","aria-hidden":"true"},"\u2197"))))))))})):f.default.createElement("a",{className:"sm-wf sunmenu__sub-cta",href:C.url,style:{animationDelay:g+.14+"s"},onClick:S=>b(S,C.url)},f.default.createElement("span",null,"Go to ",C.label),f.default.createElement("span",{className:"arrow"},"\u2192")))),f.default.createElement("div",{className:"sunmenu__foot"},f.default.createElement("div",{className:"sm-fade sunmenu__foot-cols"},f.default.createElement("span",null,f.default.createElement("span",{className:"t-muted"},"Working with"),"\xA0 D2C, B2B and education brands"),f.default.createElement("span",null,f.default.createElement("span",{className:"t-muted"},"In market since"),"\xA0 2019"),f.default.createElement("span",null,f.default.createElement("span",{className:"t-muted"},"Revenue compounded"),"\xA0 \u20B9248Cr+")),f.default.createElement("div",{className:"sm-fade sunmenu__cta-wrap"},f.default.createElement("button",{className:"btn btn--solid-blue glow-btn",onClick:()=>{n(),setTimeout(r,420)}},f.default.createElement("span",{className:"glow-btn__glow","aria-hidden":"true"}),f.default.createElement("span",{className:"glow-btn__inner"},"Get a free brand audit",f.default.createElement("span",{className:"arrow"})))))),f.default.createElement("style",null,`
        .sunmenu {
          position: fixed; inset: 0;
          z-index: 70;
          visibility: hidden;
          pointer-events: none;
          isolation: isolate;
        }
        /* White glow circle: expands first from the button origin,
           sits behind the paper so it ends covered once paper completes */
        .sunmenu__disc {
          position: absolute; border-radius: 50%;
          background:
            radial-gradient(circle at 50% 50%,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.96) 30%,
              rgba(235,242,255,0.85) 55%,
              rgba(200,218,245,0.45) 80%,
              rgba(180,200,235,0) 100%);
          box-shadow:
            0 0 120px 30px rgba(255,255,255,0.35),
            0 0 220px 60px rgba(255,255,255,0.18);
          will-change: transform, opacity;
          transform-origin: center;
          z-index: 1;
        }
        /* Brand blue circle: trails by 200ms, covers the white disc */
        .sunmenu__paper {
          position: absolute; border-radius: 50%;
          background: var(--mmc-blue); /* brand blue var(--mmc-blue) */
          will-change: transform, opacity;
          transform-origin: center;
          z-index: 2;
        }
        /* Subtle highlight in the top-right corner, kept faint enough
           to not tint the brand blue */
        .sunmenu__corona {
          position: absolute;
          right: clamp(-120px, -5vw, -40px);
          top: clamp(-160px, -9vw, -80px);
          width: clamp(380px, 50vmin, 640px);
          height: clamp(380px, 50vmin, 640px);
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0.06) 40%,
            rgba(255, 255, 255, 0) 72%);
          filter: blur(14px); pointer-events: none;
          z-index: 3;
          opacity: 0;
          mix-blend-mode: screen;
          transform-origin: center;
        }
        .sunmenu__heat { display: none; }

        .sunmenu__content {
          position: absolute;
          inset: 0;
          z-index: 3;
          padding: clamp(90px, 9vh, 110px) clamp(28px, 5vw, 80px) 22px;
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          gap: clamp(10px, 1.2vw, 18px);
          color: #FFFFFF;
        }

        /* Header */
        .sunmenu__head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.22);
        }
        .sunmenu__eyebrow {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #FFFFFF;
          display: inline-flex; align-items: center; gap: 12px;
        }
        .sunmenu__eyebrow::before {
          content: ""; width: 24px; height: 1.5px; background: var(--mmc-yellow);
        }
        .sunmenu__head-meta {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .sunmenu__head-meta .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--mmc-yellow); }

        /* Tagline */
        .sunmenu__multi {
          display: flex; flex-wrap: wrap; gap: 14px; align-items: baseline;
          padding: 4px 0 14px;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(18px, 2vw, 26px);
          letter-spacing: -0.02em;
          color: #FFFFFF;
          border-bottom: 1px solid rgba(255,255,255,0.22);
        }
        .sunmenu__multi .x {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          color: var(--mmc-yellow); opacity: 0.95; font-size: 0.95em;
        }

        /* TWO-PANE NAV */
        .sunmenu__panes {
          display: grid;
          grid-template-columns: 0.4fr 0.6fr;
          gap: clamp(28px, 4vw, 64px);
          padding-top: clamp(8px, 1.2vw, 16px);
          min-height: 0;
        }

        /* Primary nav (left) */
        .sunmenu__primary { min-width: 0; }
        .sunmenu__primary ul { list-style: none; margin: 0; padding: 0; }
        .sunmenu__primary-row { border-bottom: 1px solid rgba(255,255,255,0.16); }
        .sunmenu__primary-row:last-child { border-bottom: 0; }
        .sunmenu__primary-row.is-active { background: rgba(255,255,255,0.08); }
        .sunmenu__primary-link {
          display: block;
          padding: clamp(6px, min(1.4vw, 1.25vh), 16px) clamp(10px, 1.4vw, 18px) clamp(6px, min(1.4vw, 1.25vh), 16px) 0;
          color: rgba(255,255,255,0.78);
          transition: padding var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__primary-row.is-active .sunmenu__primary-link,
        .sunmenu__primary-link:hover {
          padding-left: 18px;
          color: #FFFFFF;
        }
        .sunmenu__link-clip { display: block; overflow: hidden; }
        .sm-link {
          display: inline-flex; align-items: baseline; gap: 16px;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(22px, min(3vw, 4.3vh), 44px);
          letter-spacing: -0.025em; line-height: 1;
          color: inherit;
          width: 100%;
        }
        .sunmenu__primary-n {
          font-family: var(--font-body); font-weight: 600;
          font-size: 11px; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.5);
          transform: translateY(-0.4em);
        }
        .sunmenu__primary-label { flex: 1; }
        .sunmenu__primary-arrow {
          color: rgba(255,255,255,0.4);
          display: inline-flex; align-items: center;
          transform: translateY(-0.2em);
          transition: transform var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__primary-row.is-active .sunmenu__primary-arrow,
        .sunmenu__primary-link:hover .sunmenu__primary-arrow {
          color: var(--mmc-yellow);
          transform: translate(4px, -0.2em);
        }

        /* Sub-menu (right) */
        .sunmenu__sub {
          min-width: 0;
          padding-left: clamp(20px, 2.4vw, 36px);
          border-left: 1px solid rgba(255,255,255,0.18);
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        /* Waterfall reveal, each row of the right pane drops in top-to-bottom.
           Delays are set inline so they cascade on open and on every swap. */
        .sm-wf { opacity: 0; will-change: transform, opacity; animation: smWaterfall 0.52s var(--ease-out) both; }
        @keyframes smWaterfall {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-wf { opacity: 1; animation: none; }
        }
        .sunmenu__sub-head {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 4px;
        }
        .sunmenu__sub-eyebrow {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .sunmenu__sub-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3), transparent);
        }
        .sunmenu__sub-overview {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #FFFFFF;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .sunmenu__sub-overview .arrow {
          transition: transform var(--dur-base) var(--ease-out);
          display: inline-block;
        }
        .sunmenu__sub-overview:hover .arrow { transform: translateX(4px); }

        .sunmenu__sub-hint {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: 14px; color: rgba(255,255,255,0.85);
          margin: 0 0 12px;
        }

        /* Minimal CTA for items without sub-services */
        .sunmenu__sub-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-top: 12px;
          padding: 18px 24px;
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: background var(--dur-base) var(--ease-out),
                      transform var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-cta:hover {
          background: #FFC940;
          color: var(--mmc-blue-700);
          transform: translateY(-1px);
          position: relative; z-index: 2;
        }
        .sunmenu__sub-cta .arrow {
          font-family: var(--font-display); font-size: 16px;
          transition: transform var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-cta:hover .arrow { transform: translateX(4px); }

        .sunmenu__sub-list { list-style: none; margin: 0; padding: 0; }
        .sunmenu__sub-item { border-top: 1px solid rgba(255,255,255,0.14); }
        .sunmenu__sub-item:first-child { border-top: 0; }
        .sunmenu__sub-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0;
          align-items: stretch;
        }
        .sunmenu__sub-link {
          display: grid;
          grid-template-columns: 32px 1fr 22px;
          gap: 12px;
          align-items: center;
          padding: 12px 14px 12px 0;
          color: rgba(255,255,255,0.82);
          transition: padding var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-link:hover {
          padding-left: 10px;
          background: rgba(255,255,255,0.06);
          color: #FFFFFF;
        }
        .sunmenu__sub-n {
          font-family: var(--font-body); font-weight: 700;
          font-size: 10.5px; letter-spacing: 0.2em;
          color: var(--mmc-yellow); opacity: 0.75;
        }
        .sunmenu__sub-body {
          display: flex; flex-direction: column; gap: 2px;
          min-width: 0;
        }
        .sunmenu__sub-name {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          letter-spacing: -0.012em;
          color: inherit;
          transition: color var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-link:hover .sunmenu__sub-name { color: #FFFFFF; }
        .sunmenu__sub-desc {
          font-family: var(--font-body); font-size: 11.5px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.01em;
        }
        .sunmenu__sub-go {
          color: rgba(255,255,255,0.4);
          display: inline-flex; align-items: center;
          transition: transform var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-link:hover .sunmenu__sub-go {
          transform: translateX(4px);
          color: var(--mmc-yellow);
        }

        /* Expand button for service rows */
        .sunmenu__sub-expand {
          width: 38px;
          background: transparent;
          border-left: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.85);
          position: relative;
          cursor: pointer;
          transition: background var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-expand:hover { background: rgba(255,255,255,0.08); }
        .sunmenu__sub-expand span {
          position: absolute; left: 50%; top: 50%;
          width: 11px; height: 1.5px;
          background: currentColor;
          transform: translate(-50%, -50%);
          transition: transform var(--dur-base) var(--ease-out),
                      opacity var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-expand span:nth-child(2) {
          transform: translate(-50%, -50%) rotate(90deg);
        }
        .sunmenu__sub-item.is-expanded .sunmenu__sub-expand span:nth-child(2) {
          transform: translate(-50%, -50%) rotate(0);
          opacity: 0;
        }

        /* Inner sub-services accordion */
        .sunmenu__inner {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 440ms var(--ease-out);
        }
        .sunmenu__sub-item.is-expanded .sunmenu__inner {
          grid-template-rows: 1fr;
        }
        .sunmenu__inner-inner { overflow: hidden; }
        .sunmenu__inner ul {
          list-style: none; margin: 0; padding: 0 0 16px 44px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0 18px;
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 320ms var(--ease-out) 100ms,
                      transform 320ms var(--ease-out) 100ms;
        }
        .sunmenu__sub-item.is-expanded .sunmenu__inner ul {
          opacity: 1;
          transform: translateY(0);
        }
        .sunmenu__inner a {
          display: grid;
          grid-template-columns: 24px 1fr 16px;
          gap: 8px;
          align-items: center;
          padding: 8px 0;
          color: rgba(255,255,255,0.78);
          border-bottom: 1px solid rgba(255,255,255,0.10);
          transition: padding var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__inner a:hover {
          padding-left: 8px;
          color: #FFFFFF;
        }
        .ix-n {
          font-family: var(--font-body); font-weight: 700;
          font-size: 9.5px; letter-spacing: 0.2em;
          color: var(--mmc-yellow); opacity: 0.7;
        }
        .ix-name {
          font-family: var(--font-display); font-weight: 600;
          font-size: 13.5px; letter-spacing: -0.005em;
          color: inherit;
        }
        .ix-arr { color: var(--mmc-yellow); font-size: 11px; opacity: 0.85; }

        /* Footer */
        .sunmenu__foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 22px; flex-wrap: wrap;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.22);
        }
        .sunmenu__foot-cols {
          display: flex; gap: 28px; flex-wrap: wrap;
          font-family: var(--font-body); font-size: 12px;
          font-weight: 600; letter-spacing: 0.04em;
          color: #FFFFFF;
        }
        .sunmenu__foot-cols .t-muted {
          color: rgba(255,255,255,0.55); font-weight: 500;
        }
        /* CTA: yellow button reads boldly on blue ground */
        .btn--solid-blue {
          background: var(--mmc-yellow); color: var(--mmc-blue-700);
        }
        .btn--solid-blue:hover {
          transform: translateY(-1px);
          background: #FFC940;
          color: var(--mmc-blue-700);
          box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.45);
          position: relative; z-index: 2;
        }

        @media (max-width: 980px) {
          .sunmenu__panes { grid-template-columns: 1fr; gap: 22px; }
          .sunmenu__sub { padding-left: 0; border-left: 0; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.22); }
          .sunmenu__primary { max-height: 38vh; overflow-y: auto; }
          .sm-link { font-size: clamp(22px, 4vw, 32px); }
        }
        @media (max-width: 720px) {
          .sunmenu__content { padding: 90px 22px 18px; }
          .sunmenu__multi { font-size: clamp(15px, 4vw, 20px); gap: 10px; }
          .sunmenu__inner ul { grid-template-columns: 1fr; padding-left: 32px; }
          .sunmenu__head-meta { display: none; }
        }
        @media (max-height: 760px) {
          .sunmenu__content { padding-top: 80px; gap: 8px; }
          .sm-link { font-size: clamp(22px, 2.8vw, 36px); }
          .sunmenu__multi { padding: 4px 0 10px; font-size: 18px; }
        }
      `))}window.Menu=Dm;function Lm({onAudit:t,cta:e}){let n=e&&e.label||"Book a call",r=window.MMC_CALENDLY||"https://calendly.com/mmc-agency-ww/audit-onboarding-calls",i=!0,o=[{title:"Company",items:[{name:"About MMC",url:"About.html"},{name:"Our Work",url:"Our Work.html"},{name:"Insights",url:"Insights.html"},{name:"Careers",url:"Careers.html"},{name:"Contact",url:"Contact.html"}]},{title:"What we do",items:[{name:"Services",url:"services.html"},{name:"Performance marketing",url:"performance-marketing.html"},{name:"Lead generation",url:"lead-generation.html"},{name:"Retention marketing",url:"retention-marketing.html"},{name:"SEO",url:"seo.html"},{name:"Web development",url:"web-development.html"}]},{title:"Industries and resources",items:[{name:"Industries",url:"industries.html"},{name:"D2C brands",url:"d2c.html"},{name:"B2B companies",url:"b2b.html"},{name:"Education",url:"education.html"},{name:"Resources",url:"resources.html"},{name:"Guides",url:"guides.html"}]},{title:"Free tools",items:[{name:"Unit Economics",url:"unit-economics-calculator.html"},{name:"Growth Trajectory",url:"growth-trajectory-calculator.html"},{name:"CAC Runway",url:"cac-runway-calculator.html"},{name:"Funnel ROAS",url:"funnel-roas-calculator.html"},{name:"Break-even ROAS",url:"breakeven-roas-calculator.html"},{name:"LTV : CAC",url:"ltv-cac-calculator.html"},{name:"D2C Marketing Glossary",url:"d2c-marketing-glossary.html"}]}],l=[{label:"Our Work",url:"Our Work.html"},{label:"About",url:"About.html"},{label:"Insights",url:"Insights.html"},{label:"Careers",url:"Careers.html"},{label:"Contact",url:"Contact.html"}];return f.default.createElement("footer",{id:"footer",className:"ft ink-ground"},f.default.createElement("div",{className:"ft__container"},f.default.createElement("div",{className:"ft__top"},f.default.createElement("a",{className:"ft__brand",href:"index.html","aria-label":"Monday Marketing Company"},f.default.createElement("img",{src:"assets/logo-white-yellow.png",alt:"MMC \xB7 Monday Marketing Company",className:"ft__brand-img",style:{width:"158px",height:"127px"}}),f.default.createElement("div",{className:"ft__brand-tag"},"Design \xD7 Marketing \xD7 Technology \xD7 Content \xD7 AI")),f.default.createElement("div",{className:"ft__cta-stack"},f.default.createElement("a",{className:"ft__cta",href:r,target:i?"_blank":void 0,rel:i?"noreferrer":void 0,onClick:s=>window.mmcBookCall("footer",s)},n,f.default.createElement("span",{className:"arrow"})),f.default.createElement("button",{type:"button",className:"ft__cta-alt",onClick:s=>window.mmcOpenBrief(s)},"Not ready for a call? Send a brief instead"))),f.default.createElement("div",{className:"ft__cols"},o.map(s=>f.default.createElement("div",{className:"ft__col",key:s.title},f.default.createElement("div",{className:"ft__col-label"},s.title),f.default.createElement("ul",null,s.items.map(a=>f.default.createElement("li",{key:a.name},f.default.createElement("a",{href:a.url},a.name))))))),f.default.createElement("div",{className:"ft__base"},f.default.createElement("div",{className:"ft__base-l"},f.default.createElement("a",{href:"tel:+917666309102"},"+91 766 630 9102"),f.default.createElement("span",{className:"ft__dot"}),f.default.createElement("a",{href:"Contact.html"},"Thane \xB7 Mumbai \xB7 Maharashtra")),f.default.createElement("div",{className:"ft__base-r"},f.default.createElement("a",{href:"https://www.instagram.com/monday.marketing.co/",target:"_blank",rel:"noreferrer"},"Instagram"),f.default.createElement("a",{href:"https://in.linkedin.com/company/monday-marketing-company",target:"_blank",rel:"noreferrer"},"LinkedIn"),f.default.createElement("a",{href:"Privacy.html"},"Privacy"),f.default.createElement("a",{href:"Terms.html"},"Terms"),f.default.createElement("a",{href:"#",onClick:s=>{s.preventDefault(),window.__mmcOpenCookies&&window.__mmcOpenCookies()}},"Cookies"))),f.default.createElement("div",{className:"ft__legal"},f.default.createElement("span",null,"\xA9 2026 Monday Marketing Company"),f.default.createElement("span",{className:"em-serif ft__tagline"},"Quietly outperforming, since 2019."))),f.default.createElement("style",null,`
        .ft {
          position: relative;
          z-index: 1;
          isolation: isolate;
          padding: clamp(34px, 3.2vw, 52px) 0 18px;
          color: rgba(255, 255, 255, 0.9);
          /* The same ground the case-study covers use: royal blue at the top
             shoulder, sinking to near-black by the base. Reusing the recipe
             rather than approximating it keeps one dark surface across the
             site instead of two that nearly match. */
          background: var(--grad-ink);
        }
        /* The same faint grid, masked so it fades out before the legal line. */
        .ft::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.16;
          pointer-events: none;
          background-image: linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(70% 60% at 50% 12%, #000, transparent);
                  mask-image: radial-gradient(70% 60% at 50% 12%, #000, transparent);
        }
        .ft__container {
          position: relative;
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding-left: var(--gutter);
          padding-right: var(--gutter);
        }

        /* Top row */
        .ft__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-bottom: clamp(22px, 2.4vw, 30px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ft__brand {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          color: #fff;
        }
        .ft__brand:hover { color: #fff; }
        .ft__brand-img {
          height: 64px;
          width: auto;
          max-width: 250px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }
        .ft__brand-tag {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.78);
          max-width: 40ch;
          line-height: 1.5;
        }

        .ft__cta-stack { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
        .ft__cta-alt {
          background: none; border: 0; padding: 0; cursor: pointer;
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          letter-spacing: 0.02em; color: rgba(255,255,255,0.6);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.26); padding-bottom: 2px;
          transition: color var(--dur-base) var(--ease-out);
        }
        .ft__cta-alt:hover { color: #fff; border-bottom-color: var(--mmc-yellow); }
        @media (max-width: 720px) { .ft__cta-stack { align-items: flex-start; } }
        .ft__cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: background var(--dur-base) var(--ease-out),
                      transform var(--dur-base) var(--ease-out);
          align-self: flex-end;
        }
        .ft__cta:hover {
          background: #F8A800;
          transform: translateY(-1px);
          color: var(--mmc-blue-700);
          position: relative; z-index: 2;
        }
        .ft__cta .arrow {
          width: 18px; height: 1.5px;
          background: currentColor;
          position: relative;
          transition: width var(--dur-base) var(--ease-out);
        }
        .ft__cta .arrow::after {
          content: "";
          position: absolute; right: -1px; top: -4px;
          width: 8px; height: 8px;
          border-top: 1.5px solid currentColor;
          border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .ft__cta:hover .arrow { width: 28px; }

        /* Services grid */
        .ft__cols {
          display: grid;
          /* The full-bleed shell made four equal 328px columns very wide and
             very empty. Capping each one keeps the link lists readable and
             stops the block spreading to 1400px on a large monitor. */
          /* Four equal columns that fill the shell, so the block's right edge
             lands on the same line as the CTA above it. Capping the columns
             left 284px of dead gutter and made the two masses look unrelated. */
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(20px, 2.6vw, 44px);
          padding: clamp(30px, 3.4vw, 44px) 0;
          border-bottom: 0;
        }
        @media (max-width: 900px) {
          .ft__cols { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .ft__cols { grid-template-columns: 1fr; }
        }
        .ft__col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ft__col-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.005em;
          color: var(--mmc-yellow);
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(var(--mmc-yellow-rgb), 0.22);
        }
        .ft__col ul {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ft__col a {
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: 0.005em;
          transition: color var(--dur-base) var(--ease-out);
        }
        .ft__col a:hover { color: #fff; }

        /* Nav row */
        /* One bar: contact on the left, social and cookies on the right. */
        .ft__base {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px 28px;
          padding: clamp(20px, 2.4vw, 28px) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ft__base-l, .ft__base-r {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 22px;
        }
        .ft__base a {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          transition: color 200ms var(--ease-out);
        }
        .ft__base a:hover { color: var(--mmc-yellow); }
        .ft__dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.34); flex: none;
        }

        .ft__legal {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          padding-top: 22px;
          font-family: var(--font-body);
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.55);
        }
        .ft__legal-links {
          display: inline-flex;
          gap: 18px;
        }
        .ft__legal-links a {
          color: rgba(255, 255, 255, 0.62);
          transition: color var(--dur-base) var(--ease-out);
        }
        .ft__legal-links a:hover { color: var(--mmc-yellow); }
        .ft__tagline {
          color: rgba(255, 255, 255, 0.55);
          font-size: 13px;
        }

        @media (max-width: 1100px) {
          .ft__cols { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .ft__top { flex-direction: column; align-items: flex-start; }
          .ft__cta { align-self: flex-start; }
          .ft__cols { grid-template-columns: 1fr 1fr; }
          .ft__meta { flex-direction: column; align-items: flex-start; }
          .ft__legal { flex-direction: column; align-items: flex-start; }
          .ft__brand { flex-direction: column; align-items: flex-start; gap: 14px; }
          .ft__brand-tag { max-width: 100%; }
        }
        @media (max-width: 460px) {
          .ft__cols { grid-template-columns: 1fr; }
          .ft__brand-img { height: 72px; }
        }
      `))}window.Footer=Lm;function Fm({open:t,onClose:e}){let[n,r]=f.default.useState(!1);f.default.useEffect(()=>{let m=()=>r(!0);return window.addEventListener("open-audit",m),()=>window.removeEventListener("open-audit",m)},[]);let i=t||n,o=f.default.useCallback(()=>{r(!1),e&&e()},[e]),l=f.default.useRef(null),s=f.default.useRef(null),a=f.default.useRef(null),u=f.default.useRef(null),c=f.default.useRef(!1),[p,_]=f.default.useState({name:"",email:"",brand:"",url:"",revenue:"",channel:"Meta + Google",challenge:""}),[v,y]=f.default.useState(!1),h=m=>x=>_(w=>({...w,[m]:x.target.value}));f.default.useEffect(()=>{if(!window.gsap)return;let x=window.gsap.timeline({paused:!0,defaults:{ease:"expo.out"}});return x.set(l.current,{pointerEvents:"auto",visibility:"visible"},0).fromTo(s.current,{opacity:0},{opacity:1,duration:.5,ease:"power2.out"},0).fromTo(a.current,{yPercent:8,opacity:0},{yPercent:0,opacity:1,duration:.95},.08).fromTo(a.current.querySelectorAll(".am-stagger"),{y:18,opacity:0},{y:0,opacity:1,duration:.6,stagger:.05,ease:"power2.out"},.3),u.current=x,()=>x.kill()},[]),f.default.useEffect(()=>{let m=l.current;if(!m)return;let x=window.gsap;i?(y(!1),u.current?u.current.timeScale(1).play(0):(m.style.visibility="visible",m.style.pointerEvents="auto"),document.body.style.overflow="hidden",c.current=!0):c.current&&(u.current&&x?(u.current.timeScale(1.4).reverse(),x.delayedCall(.7,()=>{i||x.set(m,{pointerEvents:"none",visibility:"hidden"})})):(m.style.visibility="hidden",m.style.pointerEvents="none"),document.body.style.overflow="")},[i]),f.default.useEffect(()=>{let m=x=>{x.key==="Escape"&&i&&o()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[i,o]);let k=m=>{m.preventDefault(),window.MMCForms&&window.MMCForms.submitLead({...p,source:"Brand audit modal"},{subject:"Free brand audit, "+(p.brand||p.name||"New brand")}),y(!0)},g=["Pre-launch / 0\u201310L","\u20B910L \u2013 \u20B91Cr","\u20B91Cr \u2013 \u20B910Cr","\u20B910Cr \u2013 \u20B950Cr","\u20B950Cr+"],d=["Meta + Google","Amazon + Quick-com","TikTok / Reels-led","Email + SMS / Owned","Mixed \xB7 Everything"];return f.default.createElement("div",{className:"audit",ref:l,"aria-hidden":!i,role:"dialog","aria-modal":"true","aria-label":"Free brand audit"},f.default.createElement("div",{className:"audit__scrim",ref:s,onClick:o}),f.default.createElement("div",{className:"audit__sheet",ref:a},f.default.createElement("button",{className:"audit__close",onClick:o,"aria-label":"Close"},f.default.createElement("svg",{viewBox:"0 0 20 20",width:"16",height:"16","aria-hidden":"true"},f.default.createElement("path",{d:"M5 5 L15 15 M15 5 L5 15",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}))),f.default.createElement("div",{className:"audit__cols"},f.default.createElement("aside",{className:"audit__left"},f.default.createElement("div",{className:"audit__left-bg","aria-hidden":"true"},f.default.createElement("span",{className:"audit__left-amber"}),f.default.createElement("span",{className:"audit__left-ring r1"}),f.default.createElement("span",{className:"audit__left-ring r2"}),f.default.createElement("span",{className:"audit__left-ring r3"}),f.default.createElement("span",{className:"audit__left-sun"})),f.default.createElement("div",{className:"audit__left-inner"},f.default.createElement("div",{className:"audit__left-eyebrow am-stagger"},f.default.createElement("span",{className:"dot"}),"Limited \xB7 8 audits per month"),f.default.createElement("h2",{className:"audit__left-h am-stagger"},"A 30-minute look at where your ",f.default.createElement("span",{className:"em-serif",style:{color:"var(--mmc-yellow)"}},"momentum")," is leaking."),f.default.createElement("p",{className:"audit__left-sub am-stagger"},"Performance, retention, creative, and architecture, diagnosed by a senior strategist. No deck. No pitch. A direct read on what to fix first."),f.default.createElement("ul",{className:"audit__left-list"},f.default.createElement("li",{className:"am-stagger"},f.default.createElement("span",{className:"num"},"01"),f.default.createElement("span",{className:"t"},f.default.createElement("b",null,"Funnel diagnostic"),"A line-by-line read of your Meta, Google, Amazon, and email ROAS, by cohort.")),f.default.createElement("li",{className:"am-stagger"},f.default.createElement("span",{className:"num"},"02"),f.default.createElement("span",{className:"t"},f.default.createElement("b",null,"Retention forensic"),"Where customers are dropping, why, and the three highest-ROI levers to pull.")),f.default.createElement("li",{className:"am-stagger"},f.default.createElement("span",{className:"num"},"03"),f.default.createElement("span",{className:"t"},f.default.createElement("b",null,"Creative + brand read"),"What your top-performing creative says about your brand memory."))))),f.default.createElement("section",{className:"audit__right"},v?f.default.createElement("div",{className:"audit__thanks"},f.default.createElement("div",{className:"audit__thanks-ring","aria-hidden":"true"},f.default.createElement("svg",{viewBox:"0 0 80 80",width:"80",height:"80"},f.default.createElement("circle",{cx:"40",cy:"40",r:"36",fill:"none",stroke:"var(--mmc-yellow)",strokeWidth:"2",strokeDasharray:"226",strokeDashoffset:"0"},f.default.createElement("animate",{attributeName:"stroke-dashoffset",from:"226",to:"0",dur:"0.9s",fill:"freeze"})),f.default.createElement("path",{d:"M 26 41 L 36 51 L 56 31",fill:"none",stroke:"var(--mmc-blue)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:"60",strokeDashoffset:"60"},f.default.createElement("animate",{attributeName:"stroke-dashoffset",from:"60",to:"0",dur:"0.5s",begin:"0.4s",fill:"freeze"})))),f.default.createElement("h3",{className:"audit__thanks-h"},"Thanks, ",p.name?p.name.split(" ")[0]:"friend","."),f.default.createElement("p",{className:"audit__thanks-sub"},"We'll read what you sent for ",f.default.createElement("span",{className:"em-serif",style:{color:"var(--mmc-blue)"}},p.brand||"your brand")," and come back inside one working day with a slot and a short pre-read."),f.default.createElement("button",{className:"btn btn--ghost",onClick:o},"Back to the site",f.default.createElement("span",{className:"arrow"}))):f.default.createElement("form",{className:"audit__form",onSubmit:k},f.default.createElement("div",{className:"audit__form-head am-stagger"},f.default.createElement("div",{className:"audit__form-eyebrow eyebrow"},"Begin the system"),f.default.createElement("h3",{className:"audit__form-h"},"Tell us about the brand."),f.default.createElement("p",{className:"audit__form-sub"},"We'll come back inside one working day with a slot and a short pre-read.")),f.default.createElement("div",{className:"audit__field-row am-stagger"},f.default.createElement($n,{label:"Your name",required:!0},f.default.createElement("input",{type:"text",value:p.name,onChange:h("name"),required:!0,placeholder:"Aanya Sharma"})),f.default.createElement($n,{label:"Work email",required:!0},f.default.createElement("input",{type:"email",value:p.email,onChange:h("email"),required:!0,placeholder:"aanya@brand.com"}))),f.default.createElement("div",{className:"audit__field-row am-stagger"},f.default.createElement($n,{label:"Brand name",required:!0},f.default.createElement("input",{type:"text",value:p.brand,onChange:h("brand"),required:!0,placeholder:"Your brand name"})),f.default.createElement($n,{label:"Website"},f.default.createElement("input",{type:"text",value:p.url,onChange:h("url"),placeholder:"yourbrand.com"}))),f.default.createElement($n,{label:"Annual revenue \xB7 last 12 months",required:!0,className:"am-stagger"},f.default.createElement("div",{className:"audit__chips"},g.map(m=>f.default.createElement("button",{type:"button",key:m,className:"audit__chip "+(p.revenue===m?"is-on":""),onClick:()=>_(x=>({...x,revenue:m}))},m)))),f.default.createElement($n,{label:"Where you spend most",className:"am-stagger"},f.default.createElement("div",{className:"audit__chips"},d.map(m=>f.default.createElement("button",{type:"button",key:m,className:"audit__chip "+(p.channel===m?"is-on":""),onClick:()=>_(x=>({...x,channel:m}))},m)))),f.default.createElement($n,{label:"What's the one thing you'd fix tomorrow if you could?",className:"am-stagger"},f.default.createElement("textarea",{rows:"3",value:p.challenge,onChange:h("challenge"),placeholder:"Retention is flat past D30 and our Meta ROAS keeps slipping\u2026"})),f.default.createElement("div",{className:"audit__form-foot am-stagger"},f.default.createElement("button",{type:"submit",className:"btn btn--primary glow-btn audit__submit"},f.default.createElement("span",{className:"glow-btn__glow","aria-hidden":"true"}),f.default.createElement("span",{className:"glow-btn__inner"},"Request the audit",f.default.createElement("span",{className:"arrow"}))),f.default.createElement("span",{className:"audit__form-fineprint"},"No pitch decks \xB7 No spam \xB7 Reply within 1 working day.")))))),f.default.createElement("style",null,`
        .audit {
          position: fixed;
          inset: 0;
          z-index: 100;
          visibility: hidden;
          pointer-events: none;
          isolation: isolate;
          /* Centre with flex, not transform. GSAP animates the sheet's yPercent
             and would overwrite a translate(-50%,-50%), dropping the vertical
             centering and dragging the sheet below the fold. */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .audit__scrim {
          position: absolute;
          inset: 0;
          background: rgba(17, 24, 39, 0.42);
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
        }
        .audit__sheet {
          position: relative;
          width: min(1080px, 100%);
          height: min(720px, 100%);
          max-height: 100%;
          background: var(--mmc-paper);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 36px 96px -20px rgba(17,24,39,0.4);
          border: 1px solid rgba(255,255,255,0.6);
          display: flex;
          flex-direction: column;
        }
        .audit__close {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 5;
          width: 36px; height: 36px;
          border-radius: 999px;
          background: rgba(255,255,255,0.9);
          color: var(--mmc-blue);
          border: 1px solid var(--mmc-border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          transition: transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
        }
        .audit__close:hover {
          transform: rotate(90deg);
          background: var(--mmc-yellow);
        }

        .audit__cols {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        /* ---- Left pitch column ---- */
        .audit__left {
          position: relative;
          background: var(--mmc-blue);
          color: #fff;
          overflow: hidden;
          isolation: isolate;
        }
        .audit__left-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .audit__left-amber {
          position: absolute;
          left: 50%; bottom: -10%;
          transform: translateX(-50%);
          width: 140%; height: 70%;
          background: radial-gradient(ellipse 60% 80% at 50% 100%,
            rgba(var(--mmc-yellow-rgb), 0.5) 0%,
            rgba(var(--mmc-yellow-rgb), 0.12) 40%,
            rgba(var(--mmc-yellow-rgb), 0) 70%);
        }
        .audit__left-ring {
          position: absolute;
          left: 50%; bottom: -10%;
          transform: translateX(-50%);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
        }
        .audit__left-ring.r1 { width: 800px; height: 800px; opacity: 0.16; }
        .audit__left-ring.r2 { width: 560px; height: 560px; opacity: 0.22; }
        .audit__left-ring.r3 { width: 360px; height: 360px; opacity: 0.30; }
        .audit__left-sun {
          position: absolute;
          left: 50%; bottom: -6px;
          transform: translateX(-50%);
          width: 180px; height: 90px;
          background: var(--mmc-yellow);
          border-radius: 180px 180px 0 0;
          box-shadow: 0 -28px 80px rgba(var(--mmc-yellow-rgb), 0.6);
        }
        .audit__left-inner {
          position: relative;
          z-index: 2;
          padding: 36px 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          height: 100%;
        }
        .audit__left-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
        }
        .audit__left-eyebrow .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 4px rgba(var(--mmc-yellow-rgb), 0.18);
        }
        .audit__left-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(26px, 2.6vw, 38px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0;
        }
        .audit__left-sub {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255,255,255,0.72);
          margin: 0;
          max-width: 420px;
        }
        .audit__left-list {
          list-style: none;
          margin: 8px 0 auto;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .audit__left-list li {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: start;
        }
        .audit__left-list .num {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--mmc-yellow);
          padding-top: 2px;
        }
        .audit__left-list .t {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255,255,255,0.78);
        }
        .audit__left-list .t b {
          display: block;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 15px;
          color: #fff;
          margin-bottom: 2px;
        }
        .audit__left-foot {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        /* The rising sun sits directly behind this row, which left the label
           reading white-on-yellow. Fade the column colour back in underneath it. */
        .audit__left-foot::before {
          content: "";
          position: absolute;
          left: -32px; right: -32px; top: 0; bottom: -28px;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(to top,
            var(--mmc-blue) 60%, rgba(29, 78, 216, 0) 100%);
        }
        .audit__left-foot-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 32px;
          color: var(--mmc-yellow);
          letter-spacing: -0.02em;
        }
        .audit__left-foot-num i {
          font-style: normal;
          color: rgba(255,255,255,0.5);
          font-size: 0.65em;
          margin-left: 1px;
        }
        .audit__left-foot-lbl {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
        }

        /* ---- Right form column ---- */
        .audit__right {
          position: relative;
          overflow-y: auto;
          min-height: 0;
          max-height: 100%;
          -webkit-overflow-scrolling: touch;
        }
        .audit__left {
          overflow-y: auto;
          min-height: 0;
          max-height: 100%;
          -webkit-overflow-scrolling: touch;
        }
        .audit__form {
          padding: 36px 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .audit__form-head { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
        .audit__form-eyebrow { margin-bottom: 4px; }
        .audit__form-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.02em;
          color: var(--mmc-text);
          margin: 0;
        }
        .audit__form-sub {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg-3);
          line-height: 1.5;
          margin: 0;
        }

        .audit__field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .audit__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .audit__field-label {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .audit__field-label .req { color: var(--mmc-yellow); margin-left: 4px; }
        .audit__field input,
        .audit__field textarea {
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--mmc-text);
          background: var(--mmc-white);
          border: 1px solid var(--mmc-border);
          border-radius: 8px;
          padding: 11px 14px;
          width: 100%;
          transition: border-color var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out);
          font-weight: 500;
        }
        .audit__field input::placeholder,
        .audit__field textarea::placeholder {
          color: rgba(75, 85, 99, 0.45);
          font-weight: 400;
        }
        .audit__field input:focus,
        .audit__field textarea:focus {
          outline: none;
          border-color: var(--mmc-blue);
          box-shadow: 0 0 0 3px rgba(var(--mmc-blue-rgb), 0.12);
        }
        .audit__field textarea {
          resize: vertical;
          min-height: 76px;
          font-family: var(--font-body);
        }

        .audit__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .audit__chip {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--mmc-white);
          color: var(--mmc-text);
          border: 1px solid var(--mmc-border);
          transition: border-color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .audit__chip:hover {
          border-color: var(--mmc-blue);
          color: var(--mmc-blue);
        }
        .audit__chip.is-on {
          background: var(--mmc-blue);
          color: var(--mmc-yellow);
          border-color: var(--mmc-blue);
        }

        .audit__form-foot {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-top: 4px;
          flex-wrap: wrap;
        }
        .audit__submit {
          font-size: 13px;
          padding: 14px 22px;
        }
        /* Button + emphasis styles the modal needs (self-contained for Home) */
        .audit .btn--primary { background: var(--mmc-blue); color: #fff; }
        .audit .btn--primary:hover { transform: translateY(-2px); box-shadow: 0 20px 44px -16px rgba(29,78,216,0.55);
          position: relative; z-index: 2;
        }
        .audit .btn--ghost { background: transparent; color: var(--mmc-blue); border: 1px solid var(--mmc-border-strong); }
        .audit .btn--ghost:hover { border-color: var(--mmc-blue); background: var(--mmc-blue-50); }
        .audit .em-serif { font-family: var(--font-serif); font-style: italic; font-weight: 600; letter-spacing: -0.005em; }
        .audit__form-fineprint {
          font-family: var(--font-body);
          font-size: 11.5px;
          color: var(--fg-3);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* ---- Thanks state ---- */
        .audit__thanks {
          padding: 56px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
          height: 100%;
          justify-content: center;
          min-height: 540px;
        }
        .audit__thanks-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 32px;
          letter-spacing: -0.025em;
          color: var(--mmc-text);
          margin: 0;
        }
        .audit__thanks-sub {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-2);
          margin: 0;
          max-width: 460px;
        }
        .audit__thanks .btn { margin-top: 8px; }

        @media (max-width: 880px) {
          .audit { padding: 8px; }
          .audit__cols { grid-template-columns: 1fr; }
          .audit__left { display: none; }
          .audit__form { padding: 28px 22px 22px; }
        }
        @media (max-height: 760px) {
          .audit__left-list { gap: 10px; }
          .audit__left-inner { padding: 28px 28px 24px; gap: 14px; }
          .audit__form { gap: 14px; padding: 28px 28px 22px; }
        }
      `))}function $n({label:t,required:e,children:n,className:r}){return f.default.createElement("label",{className:"audit__field "+(r||"")},f.default.createElement("span",{className:"audit__field-label"},t,e&&f.default.createElement("span",{className:"req"},"*")),n)}window.AuditModal=Fm;function Am(){let[t,e]=f.default.useState(!1),[n,r]=f.default.useState(!1),[i,o]=f.default.useState({necessary:!0,analytics:!0,marketing:!0});f.default.useEffect(()=>{try{localStorage.getItem("mmc-cookies-v1")||e(!0)}catch{e(!0)}return window.__mmcOpenCookies=()=>{e(!0),r(!0)},()=>{delete window.__mmcOpenCookies}},[]);let l=s=>{let a=s==="accept-all"?{necessary:!0,analytics:!0,marketing:!0,at:Date.now()}:s==="reject-non-essential"?{necessary:!0,analytics:!1,marketing:!1,at:Date.now()}:{...i,at:Date.now()};try{localStorage.setItem("mmc-cookies-v1",JSON.stringify(a))}catch{}e(!1),r(!1)};return t?f.default.createElement("div",{className:"cookie",role:"dialog","aria-label":"Cookie preferences"},f.default.createElement("div",{className:"cookie__inner"},n?f.default.createElement(f.default.Fragment,null,f.default.createElement("div",{className:"cookie__prefs"},f.default.createElement("div",{className:"cookie__prefs-head"},f.default.createElement("div",{className:"cookie__prefs-title"},"Cookie preferences"),f.default.createElement("button",{className:"cookie__close",onClick:()=>r(!1),"aria-label":"Close"},"\xD7")),f.default.createElement("ul",{className:"cookie__list"},f.default.createElement("li",null,f.default.createElement("div",{className:"cookie__list-head"},f.default.createElement("span",{className:"cookie__list-name"},"Strictly necessary"),f.default.createElement("span",{className:"cookie__list-locked"},"Always on")),f.default.createElement("p",null,"For session, security, and form submission. Cannot be disabled.")),f.default.createElement("li",null,f.default.createElement("div",{className:"cookie__list-head"},f.default.createElement("span",{className:"cookie__list-name"},"Analytics"),f.default.createElement("label",{className:"cookie__toggle"},f.default.createElement("input",{type:"checkbox",checked:i.analytics,onChange:s=>o(a=>({...a,analytics:s.target.checked}))}),f.default.createElement("span",{className:"cookie__toggle-track"}))),f.default.createElement("p",null,"GA4, Hotjar, Microsoft Clarity. Helps us understand where the site needs work.")),f.default.createElement("li",null,f.default.createElement("div",{className:"cookie__list-head"},f.default.createElement("span",{className:"cookie__list-name"},"Marketing"),f.default.createElement("label",{className:"cookie__toggle"},f.default.createElement("input",{type:"checkbox",checked:i.marketing,onChange:s=>o(a=>({...a,marketing:s.target.checked}))}),f.default.createElement("span",{className:"cookie__toggle-track"}))),f.default.createElement("p",null,"Meta Pixel, LinkedIn Insight, Google Ads. So we can show you the right brand audit content."))),f.default.createElement("div",{className:"cookie__prefs-foot"},f.default.createElement("button",{className:"cookie__btn cookie__btn--secondary",onClick:()=>l("reject-non-essential")},"Essential only"),f.default.createElement("button",{className:"cookie__btn cookie__btn--primary",onClick:()=>l("custom")},"Save preferences")))):f.default.createElement(f.default.Fragment,null,f.default.createElement("div",{className:"cookie__l"},f.default.createElement("div",{className:"cookie__eyebrow"},f.default.createElement("span",{className:"cookie__eyebrow-dot"}),"A note about cookies"),f.default.createElement("p",{className:"cookie__body"},"We use cookies to measure how the site performs, improve our work, and show you the right brand audit content. ",f.default.createElement("a",{href:"Privacy.html"},"Read the privacy policy")," or pick what you'd like to allow.")),f.default.createElement("div",{className:"cookie__r"},f.default.createElement("button",{className:"cookie__btn cookie__btn--ghost",onClick:()=>r(!0)},"Choose"),f.default.createElement("button",{className:"cookie__btn cookie__btn--secondary",onClick:()=>l("reject-non-essential")},"Essential only"),f.default.createElement("button",{className:"cookie__btn cookie__btn--primary",onClick:()=>l("accept-all")},"Accept all")))),f.default.createElement("style",null,`
        .cookie {
          position: fixed;
          left: clamp(12px, 2vw, 24px);
          right: clamp(12px, 2vw, 24px);
          bottom: clamp(12px, 2vw, 24px);
          /* Above page content, below anything the visitor deliberately opened:
             the menu (70), the nav (80) and the audit / booking modals (100+).
             At 95 this banner covered the audit form's revenue field. */
          z-index: 60;
          animation: cookieIn 480ms var(--ease-out);
        }
        @keyframes cookieIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cookie__inner {
          background: rgba(255, 252, 244, 0.96);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          border-radius: 16px;
          padding: clamp(18px, 2vw, 26px) clamp(20px, 2.4vw, 32px);
          box-shadow: 0 22px 64px -16px rgba(17, 24, 39, 0.22);
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 36px);
          flex-wrap: wrap;
        }
        .cookie__l { flex: 1; min-width: 260px; }
        .cookie__r {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cookie__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
          margin-bottom: 6px;
        }
        .cookie__eyebrow-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 3px rgba(var(--mmc-yellow-rgb), 0.2);
        }
        .cookie__body {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--fg-1);
          margin: 0;
          max-width: 640px;
        }
        .cookie__body a {
          color: var(--mmc-blue);
          border-bottom: 1px solid currentColor;
        }
        .cookie__body a:hover { color: var(--mmc-blue-700); }

        .cookie__btn {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 11px 18px;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: all var(--dur-base) var(--ease-out);
          cursor: pointer;
          white-space: nowrap;
        }
        .cookie__btn--primary {
          background: var(--mmc-blue);
          color: #fff;
        }
        .cookie__btn--primary:hover {
          background: var(--mmc-blue-700);
          transform: translateY(-1px);
          position: relative; z-index: 2;
        }
        .cookie__btn--secondary {
          background: #fff;
          color: var(--mmc-blue);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
        }
        .cookie__btn--secondary:hover {
          border-color: var(--mmc-blue);
        }
        .cookie__btn--ghost {
          background: transparent;
          color: var(--fg-2);
        }
        .cookie__btn--ghost:hover {
          color: var(--mmc-blue);
        }

        /* Prefs panel */
        .cookie__prefs { flex: 1; min-width: 100%; }
        .cookie__prefs-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
        }
        .cookie__prefs-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.015em;
          color: var(--fg-1);
        }
        .cookie__close {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(var(--mmc-blue-rgb), 0.08);
          color: var(--mmc-blue);
          font-size: 20px; line-height: 1;
          cursor: pointer;
          transition: background var(--dur-base) var(--ease-out);
        }
        .cookie__close:hover { background: rgba(var(--mmc-blue-rgb), 0.16); }

        .cookie__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cookie__list li {
          padding: 14px 0;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .cookie__list li:last-child { border-bottom: 0; }
        .cookie__list-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          gap: 14px;
        }
        .cookie__list-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: -0.005em;
          color: var(--fg-1);
        }
        .cookie__list-locked {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
          padding: 4px 10px;
          background: rgba(var(--mmc-yellow-rgb), 0.16);
          border-radius: 999px;
        }
        .cookie__list p {
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--fg-2);
          margin: 0;
          max-width: 600px;
        }

        /* Toggle */
        .cookie__toggle {
          position: relative;
          width: 42px;
          height: 22px;
          flex-shrink: 0;
          cursor: pointer;
        }
        .cookie__toggle input { opacity: 0; position: absolute; inset: 0; cursor: pointer; }
        .cookie__toggle-track {
          position: absolute; inset: 0;
          background: rgba(var(--mmc-blue-rgb), 0.18);
          border-radius: 999px;
          transition: background var(--dur-base) var(--ease-out);
        }
        .cookie__toggle-track::after {
          content: "";
          position: absolute;
          left: 3px;
          top: 3px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform var(--dur-base) var(--ease-out);
          box-shadow: 0 1px 2px rgba(0,0,0,0.18);
        }
        .cookie__toggle input:checked + .cookie__toggle-track {
          background: var(--mmc-blue);
        }
        .cookie__toggle input:checked + .cookie__toggle-track::after {
          transform: translateX(20px);
        }

        .cookie__prefs-foot {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding-top: 18px;
          margin-top: 8px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
        }

        @media (max-width: 720px) {
          .cookie__inner { flex-direction: column; align-items: stretch; }
          .cookie__r { justify-content: flex-end; }
          .cookie__prefs-foot { flex-direction: column-reverse; }
          .cookie__btn { width: 100%; text-align: center; }
        }
      `)):null}window.CookieBanner=Am;function Rg(){let[t,e]=f.default.useState(!1),[n,r]=f.default.useState(!1),i=f.default.useRef(null);return f.default.useEffect(()=>{let o=()=>r(!0);return window.addEventListener("open-audit",o),()=>window.removeEventListener("open-audit",o)},[]),f.default.createElement(f.default.Fragment,null,f.default.createElement(Mm,{menuBtnRef:i,menuOpen:t,onOpenMenu:()=>e(!t),onAudit:()=>window.mmcBookCall("preview-nav")}),f.default.createElement(Dm,{open:t,triggerRef:i,onClose:()=>e(!1),onAudit:()=>window.mmcBookCall("preview-menu")}),f.default.createElement(Fm,{open:n,onClose:()=>r(!1)}),f.default.createElement(Am,null))}(0,Wu.createRoot)(document.getElementById("preview-shell")).render(f.default.createElement(Rg,null));(0,Wu.createRoot)(document.getElementById("preview-footer")).render(f.default.createElement(Lm,{onAudit:()=>window.mmcBookCall("preview-footer")}));})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.0
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
