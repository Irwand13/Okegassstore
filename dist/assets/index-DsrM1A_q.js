function nm(a,o){for(var s=0;s<o.length;s++){const d=o[s];if(typeof d!="string"&&!Array.isArray(d)){for(const p in d)if(p!=="default"&&!(p in a)){const u=Object.getOwnPropertyDescriptor(d,p);u&&Object.defineProperty(a,p,u.get?u:{enumerable:!0,get:()=>d[p]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))d(p);new MutationObserver(p=>{for(const u of p)if(u.type==="childList")for(const m of u.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function s(p){const u={};return p.integrity&&(u.integrity=p.integrity),p.referrerPolicy&&(u.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?u.credentials="include":p.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function d(p){if(p.ep)return;p.ep=!0;const u=s(p);fetch(p.href,u)}})();function am(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var Ns={exports:{}},ii={},Es={exports:{}},Pe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Au;function im(){if(Au)return Pe;Au=1;var a=Symbol.for("react.element"),o=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),d=Symbol.for("react.strict_mode"),p=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),m=Symbol.for("react.context"),g=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),b=Symbol.iterator;function N(R){return R===null||typeof R!="object"?null:(R=b&&R[b]||R["@@iterator"],typeof R=="function"?R:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,A={};function _(R,I,xe){this.props=R,this.context=I,this.refs=A,this.updater=xe||w}_.prototype.isReactComponent={},_.prototype.setState=function(R,I){if(typeof R!="object"&&typeof R!="function"&&R!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,R,I,"setState")},_.prototype.forceUpdate=function(R){this.updater.enqueueForceUpdate(this,R,"forceUpdate")};function q(){}q.prototype=_.prototype;function $(R,I,xe){this.props=R,this.context=I,this.refs=A,this.updater=xe||w}var J=$.prototype=new q;J.constructor=$,M(J,_.prototype),J.isPureReactComponent=!0;var ne=Array.isArray,Q=Object.prototype.hasOwnProperty,Z={current:null},j={key:!0,ref:!0,__self:!0,__source:!0};function B(R,I,xe){var ve,be={},Ne=null,_e=null;if(I!=null)for(ve in I.ref!==void 0&&(_e=I.ref),I.key!==void 0&&(Ne=""+I.key),I)Q.call(I,ve)&&!j.hasOwnProperty(ve)&&(be[ve]=I[ve]);var Fe=arguments.length-2;if(Fe===1)be.children=xe;else if(1<Fe){for(var Ue=Array(Fe),yt=0;yt<Fe;yt++)Ue[yt]=arguments[yt+2];be.children=Ue}if(R&&R.defaultProps)for(ve in Fe=R.defaultProps,Fe)be[ve]===void 0&&(be[ve]=Fe[ve]);return{$$typeof:a,type:R,key:Ne,ref:_e,props:be,_owner:Z.current}}function X(R,I){return{$$typeof:a,type:R.type,key:I,ref:R.ref,props:R.props,_owner:R._owner}}function ye(R){return typeof R=="object"&&R!==null&&R.$$typeof===a}function ze(R){var I={"=":"=0",":":"=2"};return"$"+R.replace(/[=:]/g,function(xe){return I[xe]})}var Re=/\/+/g;function Ce(R,I){return typeof R=="object"&&R!==null&&R.key!=null?ze(""+R.key):I.toString(36)}function O(R,I,xe,ve,be){var Ne=typeof R;(Ne==="undefined"||Ne==="boolean")&&(R=null);var _e=!1;if(R===null)_e=!0;else switch(Ne){case"string":case"number":_e=!0;break;case"object":switch(R.$$typeof){case a:case o:_e=!0}}if(_e)return _e=R,be=be(_e),R=ve===""?"."+Ce(_e,0):ve,ne(be)?(xe="",R!=null&&(xe=R.replace(Re,"$&/")+"/"),O(be,I,xe,"",function(yt){return yt})):be!=null&&(ye(be)&&(be=X(be,xe+(!be.key||_e&&_e.key===be.key?"":(""+be.key).replace(Re,"$&/")+"/")+R)),I.push(be)),1;if(_e=0,ve=ve===""?".":ve+":",ne(R))for(var Fe=0;Fe<R.length;Fe++){Ne=R[Fe];var Ue=ve+Ce(Ne,Fe);_e+=O(Ne,I,xe,Ue,be)}else if(Ue=N(R),typeof Ue=="function")for(R=Ue.call(R),Fe=0;!(Ne=R.next()).done;)Ne=Ne.value,Ue=ve+Ce(Ne,Fe++),_e+=O(Ne,I,xe,Ue,be);else if(Ne==="object")throw I=String(R),Error("Objects are not valid as a React child (found: "+(I==="[object Object]"?"object with keys {"+Object.keys(R).join(", ")+"}":I)+"). If you meant to render a collection of children, use an array instead.");return _e}function pe(R,I,xe){if(R==null)return R;var ve=[],be=0;return O(R,ve,"","",function(Ne){return I.call(xe,Ne,be++)}),ve}function he(R){if(R._status===-1){var I=R._result;I=I(),I.then(function(xe){(R._status===0||R._status===-1)&&(R._status=1,R._result=xe)},function(xe){(R._status===0||R._status===-1)&&(R._status=2,R._result=xe)}),R._status===-1&&(R._status=0,R._result=I)}if(R._status===1)return R._result.default;throw R._result}var je={current:null},z={transition:null},te={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:z,ReactCurrentOwner:Z};function Y(){throw Error("act(...) is not supported in production builds of React.")}return Pe.Children={map:pe,forEach:function(R,I,xe){pe(R,function(){I.apply(this,arguments)},xe)},count:function(R){var I=0;return pe(R,function(){I++}),I},toArray:function(R){return pe(R,function(I){return I})||[]},only:function(R){if(!ye(R))throw Error("React.Children.only expected to receive a single React element child.");return R}},Pe.Component=_,Pe.Fragment=s,Pe.Profiler=p,Pe.PureComponent=$,Pe.StrictMode=d,Pe.Suspense=h,Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=te,Pe.act=Y,Pe.cloneElement=function(R,I,xe){if(R==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+R+".");var ve=M({},R.props),be=R.key,Ne=R.ref,_e=R._owner;if(I!=null){if(I.ref!==void 0&&(Ne=I.ref,_e=Z.current),I.key!==void 0&&(be=""+I.key),R.type&&R.type.defaultProps)var Fe=R.type.defaultProps;for(Ue in I)Q.call(I,Ue)&&!j.hasOwnProperty(Ue)&&(ve[Ue]=I[Ue]===void 0&&Fe!==void 0?Fe[Ue]:I[Ue])}var Ue=arguments.length-2;if(Ue===1)ve.children=xe;else if(1<Ue){Fe=Array(Ue);for(var yt=0;yt<Ue;yt++)Fe[yt]=arguments[yt+2];ve.children=Fe}return{$$typeof:a,type:R.type,key:be,ref:Ne,props:ve,_owner:_e}},Pe.createContext=function(R){return R={$$typeof:m,_currentValue:R,_currentValue2:R,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},R.Provider={$$typeof:u,_context:R},R.Consumer=R},Pe.createElement=B,Pe.createFactory=function(R){var I=B.bind(null,R);return I.type=R,I},Pe.createRef=function(){return{current:null}},Pe.forwardRef=function(R){return{$$typeof:g,render:R}},Pe.isValidElement=ye,Pe.lazy=function(R){return{$$typeof:S,_payload:{_status:-1,_result:R},_init:he}},Pe.memo=function(R,I){return{$$typeof:x,type:R,compare:I===void 0?null:I}},Pe.startTransition=function(R){var I=z.transition;z.transition={};try{R()}finally{z.transition=I}},Pe.unstable_act=Y,Pe.useCallback=function(R,I){return je.current.useCallback(R,I)},Pe.useContext=function(R){return je.current.useContext(R)},Pe.useDebugValue=function(){},Pe.useDeferredValue=function(R){return je.current.useDeferredValue(R)},Pe.useEffect=function(R,I){return je.current.useEffect(R,I)},Pe.useId=function(){return je.current.useId()},Pe.useImperativeHandle=function(R,I,xe){return je.current.useImperativeHandle(R,I,xe)},Pe.useInsertionEffect=function(R,I){return je.current.useInsertionEffect(R,I)},Pe.useLayoutEffect=function(R,I){return je.current.useLayoutEffect(R,I)},Pe.useMemo=function(R,I){return je.current.useMemo(R,I)},Pe.useReducer=function(R,I,xe){return je.current.useReducer(R,I,xe)},Pe.useRef=function(R){return je.current.useRef(R)},Pe.useState=function(R){return je.current.useState(R)},Pe.useSyncExternalStore=function(R,I,xe){return je.current.useSyncExternalStore(R,I,xe)},Pe.useTransition=function(){return je.current.useTransition()},Pe.version="18.3.1",Pe}var Iu;function tc(){return Iu||(Iu=1,Es.exports=im()),Es.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $u;function lm(){if($u)return ii;$u=1;var a=tc(),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,p=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function m(g,h,x){var S,b={},N=null,w=null;x!==void 0&&(N=""+x),h.key!==void 0&&(N=""+h.key),h.ref!==void 0&&(w=h.ref);for(S in h)d.call(h,S)&&!u.hasOwnProperty(S)&&(b[S]=h[S]);if(g&&g.defaultProps)for(S in h=g.defaultProps,h)b[S]===void 0&&(b[S]=h[S]);return{$$typeof:o,type:g,key:N,ref:w,props:b,_owner:p.current}}return ii.Fragment=s,ii.jsx=m,ii.jsxs=m,ii}var Ou;function om(){return Ou||(Ou=1,Ns.exports=lm()),Ns.exports}var n=om(),Pl={},zs={exports:{}},Rt={},Rs={exports:{}},Ps={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uu;function sm(){return Uu||(Uu=1,(function(a){function o(z,te){var Y=z.length;z.push(te);e:for(;0<Y;){var R=Y-1>>>1,I=z[R];if(0<p(I,te))z[R]=te,z[Y]=I,Y=R;else break e}}function s(z){return z.length===0?null:z[0]}function d(z){if(z.length===0)return null;var te=z[0],Y=z.pop();if(Y!==te){z[0]=Y;e:for(var R=0,I=z.length,xe=I>>>1;R<xe;){var ve=2*(R+1)-1,be=z[ve],Ne=ve+1,_e=z[Ne];if(0>p(be,Y))Ne<I&&0>p(_e,be)?(z[R]=_e,z[Ne]=Y,R=Ne):(z[R]=be,z[ve]=Y,R=ve);else if(Ne<I&&0>p(_e,Y))z[R]=_e,z[Ne]=Y,R=Ne;else break e}}return te}function p(z,te){var Y=z.sortIndex-te.sortIndex;return Y!==0?Y:z.id-te.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;a.unstable_now=function(){return u.now()}}else{var m=Date,g=m.now();a.unstable_now=function(){return m.now()-g}}var h=[],x=[],S=1,b=null,N=3,w=!1,M=!1,A=!1,_=typeof setTimeout=="function"?setTimeout:null,q=typeof clearTimeout=="function"?clearTimeout:null,$=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function J(z){for(var te=s(x);te!==null;){if(te.callback===null)d(x);else if(te.startTime<=z)d(x),te.sortIndex=te.expirationTime,o(h,te);else break;te=s(x)}}function ne(z){if(A=!1,J(z),!M)if(s(h)!==null)M=!0,he(Q);else{var te=s(x);te!==null&&je(ne,te.startTime-z)}}function Q(z,te){M=!1,A&&(A=!1,q(B),B=-1),w=!0;var Y=N;try{for(J(te),b=s(h);b!==null&&(!(b.expirationTime>te)||z&&!ze());){var R=b.callback;if(typeof R=="function"){b.callback=null,N=b.priorityLevel;var I=R(b.expirationTime<=te);te=a.unstable_now(),typeof I=="function"?b.callback=I:b===s(h)&&d(h),J(te)}else d(h);b=s(h)}if(b!==null)var xe=!0;else{var ve=s(x);ve!==null&&je(ne,ve.startTime-te),xe=!1}return xe}finally{b=null,N=Y,w=!1}}var Z=!1,j=null,B=-1,X=5,ye=-1;function ze(){return!(a.unstable_now()-ye<X)}function Re(){if(j!==null){var z=a.unstable_now();ye=z;var te=!0;try{te=j(!0,z)}finally{te?Ce():(Z=!1,j=null)}}else Z=!1}var Ce;if(typeof $=="function")Ce=function(){$(Re)};else if(typeof MessageChannel<"u"){var O=new MessageChannel,pe=O.port2;O.port1.onmessage=Re,Ce=function(){pe.postMessage(null)}}else Ce=function(){_(Re,0)};function he(z){j=z,Z||(Z=!0,Ce())}function je(z,te){B=_(function(){z(a.unstable_now())},te)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(z){z.callback=null},a.unstable_continueExecution=function(){M||w||(M=!0,he(Q))},a.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<z?Math.floor(1e3/z):5},a.unstable_getCurrentPriorityLevel=function(){return N},a.unstable_getFirstCallbackNode=function(){return s(h)},a.unstable_next=function(z){switch(N){case 1:case 2:case 3:var te=3;break;default:te=N}var Y=N;N=te;try{return z()}finally{N=Y}},a.unstable_pauseExecution=function(){},a.unstable_requestPaint=function(){},a.unstable_runWithPriority=function(z,te){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Y=N;N=z;try{return te()}finally{N=Y}},a.unstable_scheduleCallback=function(z,te,Y){var R=a.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?R+Y:R):Y=R,z){case 1:var I=-1;break;case 2:I=250;break;case 5:I=1073741823;break;case 4:I=1e4;break;default:I=5e3}return I=Y+I,z={id:S++,callback:te,priorityLevel:z,startTime:Y,expirationTime:I,sortIndex:-1},Y>R?(z.sortIndex=Y,o(x,z),s(h)===null&&z===s(x)&&(A?(q(B),B=-1):A=!0,je(ne,Y-R))):(z.sortIndex=I,o(h,z),M||w||(M=!0,he(Q))),z},a.unstable_shouldYield=ze,a.unstable_wrapCallback=function(z){var te=N;return function(){var Y=N;N=te;try{return z.apply(this,arguments)}finally{N=Y}}}})(Ps)),Ps}var Wu;function cm(){return Wu||(Wu=1,Rs.exports=sm()),Rs.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hu;function dm(){if(Hu)return Rt;Hu=1;var a=tc(),o=cm();function s(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d=new Set,p={};function u(e,t){m(e,t),m(e+"Capture",t)}function m(e,t){for(p[e]=t,e=0;e<t.length;e++)d.add(t[e])}var g=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,x=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,S={},b={};function N(e){return h.call(b,e)?!0:h.call(S,e)?!1:x.test(e)?b[e]=!0:(S[e]=!0,!1)}function w(e,t,r,i){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return i?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function M(e,t,r,i){if(t===null||typeof t>"u"||w(e,t,r,i))return!0;if(i)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function A(e,t,r,i,l,c,f){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=i,this.attributeNamespace=l,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=c,this.removeEmptyString=f}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){_[e]=new A(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];_[t]=new A(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){_[e]=new A(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_[e]=new A(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){_[e]=new A(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){_[e]=new A(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){_[e]=new A(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){_[e]=new A(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){_[e]=new A(e,5,!1,e.toLowerCase(),null,!1,!1)});var q=/[\-:]([a-z])/g;function $(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(q,$);_[t]=new A(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(q,$);_[t]=new A(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(q,$);_[t]=new A(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){_[e]=new A(e,1,!1,e.toLowerCase(),null,!1,!1)}),_.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){_[e]=new A(e,1,!1,e.toLowerCase(),null,!0,!0)});function J(e,t,r,i){var l=_.hasOwnProperty(t)?_[t]:null;(l!==null?l.type!==0:i||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(M(t,r,l,i)&&(r=null),i||l===null?N(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):l.mustUseProperty?e[l.propertyName]=r===null?l.type===3?!1:"":r:(t=l.attributeName,i=l.attributeNamespace,r===null?e.removeAttribute(t):(l=l.type,r=l===3||l===4&&r===!0?"":""+r,i?e.setAttributeNS(i,t,r):e.setAttribute(t,r))))}var ne=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Q=Symbol.for("react.element"),Z=Symbol.for("react.portal"),j=Symbol.for("react.fragment"),B=Symbol.for("react.strict_mode"),X=Symbol.for("react.profiler"),ye=Symbol.for("react.provider"),ze=Symbol.for("react.context"),Re=Symbol.for("react.forward_ref"),Ce=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),pe=Symbol.for("react.memo"),he=Symbol.for("react.lazy"),je=Symbol.for("react.offscreen"),z=Symbol.iterator;function te(e){return e===null||typeof e!="object"?null:(e=z&&e[z]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Object.assign,R;function I(e){if(R===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);R=t&&t[1]||""}return`
`+R+e}var xe=!1;function ve(e,t){if(!e||xe)return"";xe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(D){var i=D}Reflect.construct(e,[],t)}else{try{t.call()}catch(D){i=D}e.call(t.prototype)}else{try{throw Error()}catch(D){i=D}e()}}catch(D){if(D&&i&&typeof D.stack=="string"){for(var l=D.stack.split(`
`),c=i.stack.split(`
`),f=l.length-1,y=c.length-1;1<=f&&0<=y&&l[f]!==c[y];)y--;for(;1<=f&&0<=y;f--,y--)if(l[f]!==c[y]){if(f!==1||y!==1)do if(f--,y--,0>y||l[f]!==c[y]){var C=`
`+l[f].replace(" at new "," at ");return e.displayName&&C.includes("<anonymous>")&&(C=C.replace("<anonymous>",e.displayName)),C}while(1<=f&&0<=y);break}}}finally{xe=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?I(e):""}function be(e){switch(e.tag){case 5:return I(e.type);case 16:return I("Lazy");case 13:return I("Suspense");case 19:return I("SuspenseList");case 0:case 2:case 15:return e=ve(e.type,!1),e;case 11:return e=ve(e.type.render,!1),e;case 1:return e=ve(e.type,!0),e;default:return""}}function Ne(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case j:return"Fragment";case Z:return"Portal";case X:return"Profiler";case B:return"StrictMode";case Ce:return"Suspense";case O:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ze:return(e.displayName||"Context")+".Consumer";case ye:return(e._context.displayName||"Context")+".Provider";case Re:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pe:return t=e.displayName||null,t!==null?t:Ne(e.type)||"Memo";case he:t=e._payload,e=e._init;try{return Ne(e(t))}catch{}}return null}function _e(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ne(t);case 8:return t===B?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Fe(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ue(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function yt(e){var t=Ue(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var l=r.get,c=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(f){i=""+f,c.call(this,f)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return i},setValue:function(f){i=""+f},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Dn(e){e._valueTracker||(e._valueTracker=yt(e))}function nt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=Ue(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function Xt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Mn(e,t){var r=t.checked;return Y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function ki(e,t){var r=t.defaultValue==null?"":t.defaultValue,i=t.checked!=null?t.checked:t.defaultChecked;r=Fe(t.value!=null?t.value:r),e._wrapperState={initialChecked:i,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ar(e,t){t=t.checked,t!=null&&J(e,"checked",t,!1)}function ya(e,t){ar(e,t);var r=Fe(t.value),i=t.type;if(r!=null)i==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?_n(e,t.type,r):t.hasOwnProperty("defaultValue")&&_n(e,t.type,Fe(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ji(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type;if(!(i!=="submit"&&i!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function _n(e,t,r){(t!=="number"||Xt(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var cn=Array.isArray;function Fr(e,t,r,i){if(e=e.options,t){t={};for(var l=0;l<r.length;l++)t["$"+r[l]]=!0;for(r=0;r<e.length;r++)l=t.hasOwnProperty("$"+e[r].value),e[r].selected!==l&&(e[r].selected=l),l&&i&&(e[r].defaultSelected=!0)}else{for(r=""+Fe(r),t=null,l=0;l<e.length;l++){if(e[l].value===r){e[l].selected=!0,i&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function ba(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(s(91));return Y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Si(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(s(92));if(cn(r)){if(1<r.length)throw Error(s(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Fe(r)}}function ir(e,t){var r=Fe(t.value),i=Fe(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),i!=null&&(e.defaultValue=""+i)}function Tr(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function va(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function dn(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?va(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var kt,_t=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,i,l){MSApp.execUnsafeLocalFunction(function(){return e(t,r,i,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(kt=kt||document.createElement("div"),kt.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=kt.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Br(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var un={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},wa=["Webkit","ms","Moz","O"];Object.keys(un).forEach(function(e){wa.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),un[t]=un[e]})});function Ci(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||un.hasOwnProperty(e)&&un[e]?(""+t).trim():t+"px"}function At(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var i=r.indexOf("--")===0,l=Ci(r,t[r],i);r==="float"&&(r="cssFloat"),i?e.setProperty(r,l):e[r]=l}}var Ni=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function An(e,t){if(t){if(Ni[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(s(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(s(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(s(61))}if(t.style!=null&&typeof t.style!="object")throw Error(s(62))}}function In(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ka=null;function $n(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Dr=null,hr=null,lr=null;function Ei(e){if(e=Ha(e)){if(typeof Dr!="function")throw Error(s(280));var t=e.stateNode;t&&(t=Gi(t),Dr(e.stateNode,e.type,t))}}function ja(e){hr?lr?lr.push(e):lr=[e]:hr=e}function zi(){if(hr){var e=hr,t=lr;if(lr=hr=null,Ei(e),t)for(e=0;e<t.length;e++)Ei(t[e])}}function Sa(e,t){return e(t)}function pn(){}var Mr=!1;function Ca(e,t,r){if(Mr)return e(t,r);Mr=!0;try{return Sa(e,t,r)}finally{Mr=!1,(hr!==null||lr!==null)&&(pn(),zi())}}function fn(e,t){var r=e.stateNode;if(r===null)return null;var i=Gi(r);if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(s(231,t,typeof r));return r}var Na=!1;if(g)try{var k={};Object.defineProperty(k,"passive",{get:function(){Na=!0}}),window.addEventListener("test",k,k),window.removeEventListener("test",k,k)}catch{Na=!1}function P(e,t,r,i,l,c,f,y,C){var D=Array.prototype.slice.call(arguments,3);try{t.apply(r,D)}catch(H){this.onError(H)}}var T=!1,W=null,K=!1,ce=null,fe={onError:function(e){T=!0,W=e}};function re(e,t,r,i,l,c,f,y,C){T=!1,W=null,P.apply(fe,arguments)}function ie(e,t,r,i,l,c,f,y,C){if(re.apply(this,arguments),T){if(T){var D=W;T=!1,W=null}else throw Error(s(198));K||(K=!0,ce=D)}}function oe(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Se(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ue(e){if(oe(e)!==e)throw Error(s(188))}function Ee(e){var t=e.alternate;if(!t){if(t=oe(e),t===null)throw Error(s(188));return t!==e?null:e}for(var r=e,i=t;;){var l=r.return;if(l===null)break;var c=l.alternate;if(c===null){if(i=l.return,i!==null){r=i;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===r)return ue(l),e;if(c===i)return ue(l),t;c=c.sibling}throw Error(s(188))}if(r.return!==i.return)r=l,i=c;else{for(var f=!1,y=l.child;y;){if(y===r){f=!0,r=l,i=c;break}if(y===i){f=!0,i=l,r=c;break}y=y.sibling}if(!f){for(y=c.child;y;){if(y===r){f=!0,r=c,i=l;break}if(y===i){f=!0,i=c,r=l;break}y=y.sibling}if(!f)throw Error(s(189))}}if(r.alternate!==i)throw Error(s(190))}if(r.tag!==3)throw Error(s(188));return r.stateNode.current===r?e:t}function Te(e){return e=Ee(e),e!==null?tt(e):null}function tt(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=tt(e);if(t!==null)return t;e=e.sibling}return null}var Je=o.unstable_scheduleCallback,lt=o.unstable_cancelCallback,Ae=o.unstable_shouldYield,jt=o.unstable_requestPaint,Ie=o.unstable_now,mn=o.unstable_getCurrentPriorityLevel,It=o.unstable_ImmediatePriority,Pt=o.unstable_UserBlockingPriority,_r=o.unstable_NormalPriority,gn=o.unstable_LowPriority,or=o.unstable_IdlePriority,xr=null,bt=null;function Be(e){if(bt&&typeof bt.onCommitFiberRoot=="function")try{bt.onCommitFiberRoot(xr,e,void 0,(e.current.flags&128)===128)}catch{}}var Oe=Math.clz32?Math.clz32:Ve,Ar=Math.log,yr=Math.LN2;function Ve(e){return e>>>=0,e===0?32:31-(Ar(e)/yr|0)|0}var br=64,hn=4194304;function xn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ri(e,t){var r=e.pendingLanes;if(r===0)return 0;var i=0,l=e.suspendedLanes,c=e.pingedLanes,f=r&268435455;if(f!==0){var y=f&~l;y!==0?i=xn(y):(c&=f,c!==0&&(i=xn(c)))}else f=r&~l,f!==0?i=xn(f):c!==0&&(i=xn(c));if(i===0)return 0;if(t!==0&&t!==i&&(t&l)===0&&(l=i&-i,c=t&-t,l>=c||l===16&&(c&4194240)!==0))return t;if((i&4)!==0&&(i|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=i;0<t;)r=31-Oe(t),l=1<<r,i|=e[r],t&=~l;return i}function kf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function jf(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,l=e.expirationTimes,c=e.pendingLanes;0<c;){var f=31-Oe(c),y=1<<f,C=l[f];C===-1?((y&r)===0||(y&i)!==0)&&(l[f]=kf(y,t)):C<=t&&(e.expiredLanes|=y),c&=~y}}function Vl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function gc(){var e=br;return br<<=1,(br&4194240)===0&&(br=64),e}function Yl(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ea(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Oe(t),e[t]=r}function Sf(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<r;){var l=31-Oe(r),c=1<<l;t[l]=0,i[l]=-1,e[l]=-1,r&=~c}}function Kl(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-Oe(r),l=1<<i;l&t|e[i]&t&&(e[i]|=t),r&=~l}}var $e=0;function hc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var xc,ql,yc,bc,vc,Ql=!1,Pi=[],Ir=null,$r=null,Or=null,za=new Map,Ra=new Map,Ur=[],Cf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function wc(e,t){switch(e){case"focusin":case"focusout":Ir=null;break;case"dragenter":case"dragleave":$r=null;break;case"mouseover":case"mouseout":Or=null;break;case"pointerover":case"pointerout":za.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ra.delete(t.pointerId)}}function Pa(e,t,r,i,l,c){return e===null||e.nativeEvent!==c?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:c,targetContainers:[l]},t!==null&&(t=Ha(t),t!==null&&ql(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Nf(e,t,r,i,l){switch(t){case"focusin":return Ir=Pa(Ir,e,t,r,i,l),!0;case"dragenter":return $r=Pa($r,e,t,r,i,l),!0;case"mouseover":return Or=Pa(Or,e,t,r,i,l),!0;case"pointerover":var c=l.pointerId;return za.set(c,Pa(za.get(c)||null,e,t,r,i,l)),!0;case"gotpointercapture":return c=l.pointerId,Ra.set(c,Pa(Ra.get(c)||null,e,t,r,i,l)),!0}return!1}function kc(e){var t=yn(e.target);if(t!==null){var r=oe(t);if(r!==null){if(t=r.tag,t===13){if(t=Se(r),t!==null){e.blockedOn=t,vc(e.priority,function(){yc(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Li(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Jl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);ka=i,r.target.dispatchEvent(i),ka=null}else return t=Ha(r),t!==null&&ql(t),e.blockedOn=r,!1;t.shift()}return!0}function jc(e,t,r){Li(e)&&r.delete(t)}function Ef(){Ql=!1,Ir!==null&&Li(Ir)&&(Ir=null),$r!==null&&Li($r)&&($r=null),Or!==null&&Li(Or)&&(Or=null),za.forEach(jc),Ra.forEach(jc)}function La(e,t){e.blockedOn===t&&(e.blockedOn=null,Ql||(Ql=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Ef)))}function Fa(e){function t(l){return La(l,e)}if(0<Pi.length){La(Pi[0],e);for(var r=1;r<Pi.length;r++){var i=Pi[r];i.blockedOn===e&&(i.blockedOn=null)}}for(Ir!==null&&La(Ir,e),$r!==null&&La($r,e),Or!==null&&La(Or,e),za.forEach(t),Ra.forEach(t),r=0;r<Ur.length;r++)i=Ur[r],i.blockedOn===e&&(i.blockedOn=null);for(;0<Ur.length&&(r=Ur[0],r.blockedOn===null);)kc(r),r.blockedOn===null&&Ur.shift()}var On=ne.ReactCurrentBatchConfig,Fi=!0;function zf(e,t,r,i){var l=$e,c=On.transition;On.transition=null;try{$e=1,Xl(e,t,r,i)}finally{$e=l,On.transition=c}}function Rf(e,t,r,i){var l=$e,c=On.transition;On.transition=null;try{$e=4,Xl(e,t,r,i)}finally{$e=l,On.transition=c}}function Xl(e,t,r,i){if(Fi){var l=Jl(e,t,r,i);if(l===null)ho(e,t,i,Ti,r),wc(e,i);else if(Nf(l,e,t,r,i))i.stopPropagation();else if(wc(e,i),t&4&&-1<Cf.indexOf(e)){for(;l!==null;){var c=Ha(l);if(c!==null&&xc(c),c=Jl(e,t,r,i),c===null&&ho(e,t,i,Ti,r),c===l)break;l=c}l!==null&&i.stopPropagation()}else ho(e,t,i,null,r)}}var Ti=null;function Jl(e,t,r,i){if(Ti=null,e=$n(i),e=yn(e),e!==null)if(t=oe(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Se(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ti=e,null}function Sc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(mn()){case It:return 1;case Pt:return 4;case _r:case gn:return 16;case or:return 536870912;default:return 16}default:return 16}}var Wr=null,Zl=null,Bi=null;function Cc(){if(Bi)return Bi;var e,t=Zl,r=t.length,i,l="value"in Wr?Wr.value:Wr.textContent,c=l.length;for(e=0;e<r&&t[e]===l[e];e++);var f=r-e;for(i=1;i<=f&&t[r-i]===l[c-i];i++);return Bi=l.slice(e,1<i?1-i:void 0)}function Di(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Mi(){return!0}function Nc(){return!1}function Lt(e){function t(r,i,l,c,f){this._reactName=r,this._targetInst=l,this.type=i,this.nativeEvent=c,this.target=f,this.currentTarget=null;for(var y in e)e.hasOwnProperty(y)&&(r=e[y],this[y]=r?r(c):c[y]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Mi:Nc,this.isPropagationStopped=Nc,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Mi)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Mi)},persist:function(){},isPersistent:Mi}),t}var Un={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},eo=Lt(Un),Ta=Y({},Un,{view:0,detail:0}),Pf=Lt(Ta),to,ro,Ba,_i=Y({},Ta,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ao,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ba&&(Ba&&e.type==="mousemove"?(to=e.screenX-Ba.screenX,ro=e.screenY-Ba.screenY):ro=to=0,Ba=e),to)},movementY:function(e){return"movementY"in e?e.movementY:ro}}),Ec=Lt(_i),Lf=Y({},_i,{dataTransfer:0}),Ff=Lt(Lf),Tf=Y({},Ta,{relatedTarget:0}),no=Lt(Tf),Bf=Y({},Un,{animationName:0,elapsedTime:0,pseudoElement:0}),Df=Lt(Bf),Mf=Y({},Un,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),_f=Lt(Mf),Af=Y({},Un,{data:0}),zc=Lt(Af),If={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$f={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Of={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Uf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Of[e])?!!t[e]:!1}function ao(){return Uf}var Wf=Y({},Ta,{key:function(e){if(e.key){var t=If[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Di(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?$f[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ao,charCode:function(e){return e.type==="keypress"?Di(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Di(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Hf=Lt(Wf),Gf=Y({},_i,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Rc=Lt(Gf),Vf=Y({},Ta,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ao}),Yf=Lt(Vf),Kf=Y({},Un,{propertyName:0,elapsedTime:0,pseudoElement:0}),qf=Lt(Kf),Qf=Y({},_i,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xf=Lt(Qf),Jf=[9,13,27,32],io=g&&"CompositionEvent"in window,Da=null;g&&"documentMode"in document&&(Da=document.documentMode);var Zf=g&&"TextEvent"in window&&!Da,Pc=g&&(!io||Da&&8<Da&&11>=Da),Lc=" ",Fc=!1;function Tc(e,t){switch(e){case"keyup":return Jf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wn=!1;function e0(e,t){switch(e){case"compositionend":return Bc(t);case"keypress":return t.which!==32?null:(Fc=!0,Lc);case"textInput":return e=t.data,e===Lc&&Fc?null:e;default:return null}}function t0(e,t){if(Wn)return e==="compositionend"||!io&&Tc(e,t)?(e=Cc(),Bi=Zl=Wr=null,Wn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Pc&&t.locale!=="ko"?null:t.data;default:return null}}var r0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!r0[e.type]:t==="textarea"}function Mc(e,t,r,i){ja(i),t=Ui(t,"onChange"),0<t.length&&(r=new eo("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var Ma=null,_a=null;function n0(e){ed(e,0)}function Ai(e){var t=Kn(e);if(nt(t))return e}function a0(e,t){if(e==="change")return t}var _c=!1;if(g){var lo;if(g){var oo="oninput"in document;if(!oo){var Ac=document.createElement("div");Ac.setAttribute("oninput","return;"),oo=typeof Ac.oninput=="function"}lo=oo}else lo=!1;_c=lo&&(!document.documentMode||9<document.documentMode)}function Ic(){Ma&&(Ma.detachEvent("onpropertychange",$c),_a=Ma=null)}function $c(e){if(e.propertyName==="value"&&Ai(_a)){var t=[];Mc(t,_a,e,$n(e)),Ca(n0,t)}}function i0(e,t,r){e==="focusin"?(Ic(),Ma=t,_a=r,Ma.attachEvent("onpropertychange",$c)):e==="focusout"&&Ic()}function l0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ai(_a)}function o0(e,t){if(e==="click")return Ai(t)}function s0(e,t){if(e==="input"||e==="change")return Ai(t)}function c0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Jt=typeof Object.is=="function"?Object.is:c0;function Aa(e,t){if(Jt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var l=r[i];if(!h.call(t,l)||!Jt(e[l],t[l]))return!1}return!0}function Oc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Uc(e,t){var r=Oc(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Oc(r)}}function Wc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Wc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hc(){for(var e=window,t=Xt();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Xt(e.document)}return t}function so(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function d0(e){var t=Hc(),r=e.focusedElem,i=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Wc(r.ownerDocument.documentElement,r)){if(i!==null&&so(r)){if(t=i.start,e=i.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=r.textContent.length,c=Math.min(i.start,l);i=i.end===void 0?c:Math.min(i.end,l),!e.extend&&c>i&&(l=i,i=c,c=l),l=Uc(r,c);var f=Uc(r,i);l&&f&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),c>i?(e.addRange(t),e.extend(f.node,f.offset)):(t.setEnd(f.node,f.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var u0=g&&"documentMode"in document&&11>=document.documentMode,Hn=null,co=null,Ia=null,uo=!1;function Gc(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;uo||Hn==null||Hn!==Xt(i)||(i=Hn,"selectionStart"in i&&so(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ia&&Aa(Ia,i)||(Ia=i,i=Ui(co,"onSelect"),0<i.length&&(t=new eo("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=Hn)))}function Ii(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Gn={animationend:Ii("Animation","AnimationEnd"),animationiteration:Ii("Animation","AnimationIteration"),animationstart:Ii("Animation","AnimationStart"),transitionend:Ii("Transition","TransitionEnd")},po={},Vc={};g&&(Vc=document.createElement("div").style,"AnimationEvent"in window||(delete Gn.animationend.animation,delete Gn.animationiteration.animation,delete Gn.animationstart.animation),"TransitionEvent"in window||delete Gn.transitionend.transition);function $i(e){if(po[e])return po[e];if(!Gn[e])return e;var t=Gn[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Vc)return po[e]=t[r];return e}var Yc=$i("animationend"),Kc=$i("animationiteration"),qc=$i("animationstart"),Qc=$i("transitionend"),Xc=new Map,Jc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Hr(e,t){Xc.set(e,t),u(t,[e])}for(var fo=0;fo<Jc.length;fo++){var mo=Jc[fo],p0=mo.toLowerCase(),f0=mo[0].toUpperCase()+mo.slice(1);Hr(p0,"on"+f0)}Hr(Yc,"onAnimationEnd"),Hr(Kc,"onAnimationIteration"),Hr(qc,"onAnimationStart"),Hr("dblclick","onDoubleClick"),Hr("focusin","onFocus"),Hr("focusout","onBlur"),Hr(Qc,"onTransitionEnd"),m("onMouseEnter",["mouseout","mouseover"]),m("onMouseLeave",["mouseout","mouseover"]),m("onPointerEnter",["pointerout","pointerover"]),m("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $a="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),m0=new Set("cancel close invalid load scroll toggle".split(" ").concat($a));function Zc(e,t,r){var i=e.type||"unknown-event";e.currentTarget=r,ie(i,t,void 0,e),e.currentTarget=null}function ed(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],l=i.event;i=i.listeners;e:{var c=void 0;if(t)for(var f=i.length-1;0<=f;f--){var y=i[f],C=y.instance,D=y.currentTarget;if(y=y.listener,C!==c&&l.isPropagationStopped())break e;Zc(l,y,D),c=C}else for(f=0;f<i.length;f++){if(y=i[f],C=y.instance,D=y.currentTarget,y=y.listener,C!==c&&l.isPropagationStopped())break e;Zc(l,y,D),c=C}}}if(K)throw e=ce,K=!1,ce=null,e}function He(e,t){var r=t[ko];r===void 0&&(r=t[ko]=new Set);var i=e+"__bubble";r.has(i)||(td(t,e,2,!1),r.add(i))}function go(e,t,r){var i=0;t&&(i|=4),td(r,e,i,t)}var Oi="_reactListening"+Math.random().toString(36).slice(2);function Oa(e){if(!e[Oi]){e[Oi]=!0,d.forEach(function(r){r!=="selectionchange"&&(m0.has(r)||go(r,!1,e),go(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Oi]||(t[Oi]=!0,go("selectionchange",!1,t))}}function td(e,t,r,i){switch(Sc(t)){case 1:var l=zf;break;case 4:l=Rf;break;default:l=Xl}r=l.bind(null,t,r,e),l=void 0,!Na||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),i?l!==void 0?e.addEventListener(t,r,{capture:!0,passive:l}):e.addEventListener(t,r,!0):l!==void 0?e.addEventListener(t,r,{passive:l}):e.addEventListener(t,r,!1)}function ho(e,t,r,i,l){var c=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var f=i.tag;if(f===3||f===4){var y=i.stateNode.containerInfo;if(y===l||y.nodeType===8&&y.parentNode===l)break;if(f===4)for(f=i.return;f!==null;){var C=f.tag;if((C===3||C===4)&&(C=f.stateNode.containerInfo,C===l||C.nodeType===8&&C.parentNode===l))return;f=f.return}for(;y!==null;){if(f=yn(y),f===null)return;if(C=f.tag,C===5||C===6){i=c=f;continue e}y=y.parentNode}}i=i.return}Ca(function(){var D=c,H=$n(r),G=[];e:{var U=Xc.get(e);if(U!==void 0){var ee=eo,le=e;switch(e){case"keypress":if(Di(r)===0)break e;case"keydown":case"keyup":ee=Hf;break;case"focusin":le="focus",ee=no;break;case"focusout":le="blur",ee=no;break;case"beforeblur":case"afterblur":ee=no;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ee=Ec;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ee=Ff;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ee=Yf;break;case Yc:case Kc:case qc:ee=Df;break;case Qc:ee=qf;break;case"scroll":ee=Pf;break;case"wheel":ee=Xf;break;case"copy":case"cut":case"paste":ee=_f;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ee=Rc}var se=(t&4)!==0,Ze=!se&&e==="scroll",L=se?U!==null?U+"Capture":null:U;se=[];for(var E=D,F;E!==null;){F=E;var V=F.stateNode;if(F.tag===5&&V!==null&&(F=V,L!==null&&(V=fn(E,L),V!=null&&se.push(Ua(E,V,F)))),Ze)break;E=E.return}0<se.length&&(U=new ee(U,le,null,r,H),G.push({event:U,listeners:se}))}}if((t&7)===0){e:{if(U=e==="mouseover"||e==="pointerover",ee=e==="mouseout"||e==="pointerout",U&&r!==ka&&(le=r.relatedTarget||r.fromElement)&&(yn(le)||le[vr]))break e;if((ee||U)&&(U=H.window===H?H:(U=H.ownerDocument)?U.defaultView||U.parentWindow:window,ee?(le=r.relatedTarget||r.toElement,ee=D,le=le?yn(le):null,le!==null&&(Ze=oe(le),le!==Ze||le.tag!==5&&le.tag!==6)&&(le=null)):(ee=null,le=D),ee!==le)){if(se=Ec,V="onMouseLeave",L="onMouseEnter",E="mouse",(e==="pointerout"||e==="pointerover")&&(se=Rc,V="onPointerLeave",L="onPointerEnter",E="pointer"),Ze=ee==null?U:Kn(ee),F=le==null?U:Kn(le),U=new se(V,E+"leave",ee,r,H),U.target=Ze,U.relatedTarget=F,V=null,yn(H)===D&&(se=new se(L,E+"enter",le,r,H),se.target=F,se.relatedTarget=Ze,V=se),Ze=V,ee&&le)t:{for(se=ee,L=le,E=0,F=se;F;F=Vn(F))E++;for(F=0,V=L;V;V=Vn(V))F++;for(;0<E-F;)se=Vn(se),E--;for(;0<F-E;)L=Vn(L),F--;for(;E--;){if(se===L||L!==null&&se===L.alternate)break t;se=Vn(se),L=Vn(L)}se=null}else se=null;ee!==null&&rd(G,U,ee,se,!1),le!==null&&Ze!==null&&rd(G,Ze,le,se,!0)}}e:{if(U=D?Kn(D):window,ee=U.nodeName&&U.nodeName.toLowerCase(),ee==="select"||ee==="input"&&U.type==="file")var de=a0;else if(Dc(U))if(_c)de=s0;else{de=l0;var me=i0}else(ee=U.nodeName)&&ee.toLowerCase()==="input"&&(U.type==="checkbox"||U.type==="radio")&&(de=o0);if(de&&(de=de(e,D))){Mc(G,de,r,H);break e}me&&me(e,U,D),e==="focusout"&&(me=U._wrapperState)&&me.controlled&&U.type==="number"&&_n(U,"number",U.value)}switch(me=D?Kn(D):window,e){case"focusin":(Dc(me)||me.contentEditable==="true")&&(Hn=me,co=D,Ia=null);break;case"focusout":Ia=co=Hn=null;break;case"mousedown":uo=!0;break;case"contextmenu":case"mouseup":case"dragend":uo=!1,Gc(G,r,H);break;case"selectionchange":if(u0)break;case"keydown":case"keyup":Gc(G,r,H)}var ge;if(io)e:{switch(e){case"compositionstart":var ke="onCompositionStart";break e;case"compositionend":ke="onCompositionEnd";break e;case"compositionupdate":ke="onCompositionUpdate";break e}ke=void 0}else Wn?Tc(e,r)&&(ke="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(ke="onCompositionStart");ke&&(Pc&&r.locale!=="ko"&&(Wn||ke!=="onCompositionStart"?ke==="onCompositionEnd"&&Wn&&(ge=Cc()):(Wr=H,Zl="value"in Wr?Wr.value:Wr.textContent,Wn=!0)),me=Ui(D,ke),0<me.length&&(ke=new zc(ke,e,null,r,H),G.push({event:ke,listeners:me}),ge?ke.data=ge:(ge=Bc(r),ge!==null&&(ke.data=ge)))),(ge=Zf?e0(e,r):t0(e,r))&&(D=Ui(D,"onBeforeInput"),0<D.length&&(H=new zc("onBeforeInput","beforeinput",null,r,H),G.push({event:H,listeners:D}),H.data=ge))}ed(G,t)})}function Ua(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Ui(e,t){for(var r=t+"Capture",i=[];e!==null;){var l=e,c=l.stateNode;l.tag===5&&c!==null&&(l=c,c=fn(e,r),c!=null&&i.unshift(Ua(e,c,l)),c=fn(e,t),c!=null&&i.push(Ua(e,c,l))),e=e.return}return i}function Vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function rd(e,t,r,i,l){for(var c=t._reactName,f=[];r!==null&&r!==i;){var y=r,C=y.alternate,D=y.stateNode;if(C!==null&&C===i)break;y.tag===5&&D!==null&&(y=D,l?(C=fn(r,c),C!=null&&f.unshift(Ua(r,C,y))):l||(C=fn(r,c),C!=null&&f.push(Ua(r,C,y)))),r=r.return}f.length!==0&&e.push({event:t,listeners:f})}var g0=/\r\n?/g,h0=/\u0000|\uFFFD/g;function nd(e){return(typeof e=="string"?e:""+e).replace(g0,`
`).replace(h0,"")}function Wi(e,t,r){if(t=nd(t),nd(e)!==t&&r)throw Error(s(425))}function Hi(){}var xo=null,yo=null;function bo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vo=typeof setTimeout=="function"?setTimeout:void 0,x0=typeof clearTimeout=="function"?clearTimeout:void 0,ad=typeof Promise=="function"?Promise:void 0,y0=typeof queueMicrotask=="function"?queueMicrotask:typeof ad<"u"?function(e){return ad.resolve(null).then(e).catch(b0)}:vo;function b0(e){setTimeout(function(){throw e})}function wo(e,t){var r=t,i=0;do{var l=r.nextSibling;if(e.removeChild(r),l&&l.nodeType===8)if(r=l.data,r==="/$"){if(i===0){e.removeChild(l),Fa(t);return}i--}else r!=="$"&&r!=="$?"&&r!=="$!"||i++;r=l}while(r);Fa(t)}function Gr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function id(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Yn=Math.random().toString(36).slice(2),sr="__reactFiber$"+Yn,Wa="__reactProps$"+Yn,vr="__reactContainer$"+Yn,ko="__reactEvents$"+Yn,v0="__reactListeners$"+Yn,w0="__reactHandles$"+Yn;function yn(e){var t=e[sr];if(t)return t;for(var r=e.parentNode;r;){if(t=r[vr]||r[sr]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=id(e);e!==null;){if(r=e[sr])return r;e=id(e)}return t}e=r,r=e.parentNode}return null}function Ha(e){return e=e[sr]||e[vr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Kn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(s(33))}function Gi(e){return e[Wa]||null}var jo=[],qn=-1;function Vr(e){return{current:e}}function Ge(e){0>qn||(e.current=jo[qn],jo[qn]=null,qn--)}function We(e,t){qn++,jo[qn]=e.current,e.current=t}var Yr={},ft=Vr(Yr),St=Vr(!1),bn=Yr;function Qn(e,t){var r=e.type.contextTypes;if(!r)return Yr;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var l={},c;for(c in r)l[c]=t[c];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ct(e){return e=e.childContextTypes,e!=null}function Vi(){Ge(St),Ge(ft)}function ld(e,t,r){if(ft.current!==Yr)throw Error(s(168));We(ft,t),We(St,r)}function od(e,t,r){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!="function")return r;i=i.getChildContext();for(var l in i)if(!(l in t))throw Error(s(108,_e(e)||"Unknown",l));return Y({},r,i)}function Yi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Yr,bn=ft.current,We(ft,e),We(St,St.current),!0}function sd(e,t,r){var i=e.stateNode;if(!i)throw Error(s(169));r?(e=od(e,t,bn),i.__reactInternalMemoizedMergedChildContext=e,Ge(St),Ge(ft),We(ft,e)):Ge(St),We(St,r)}var wr=null,Ki=!1,So=!1;function cd(e){wr===null?wr=[e]:wr.push(e)}function k0(e){Ki=!0,cd(e)}function Kr(){if(!So&&wr!==null){So=!0;var e=0,t=$e;try{var r=wr;for($e=1;e<r.length;e++){var i=r[e];do i=i(!0);while(i!==null)}wr=null,Ki=!1}catch(l){throw wr!==null&&(wr=wr.slice(e+1)),Je(It,Kr),l}finally{$e=t,So=!1}}return null}var Xn=[],Jn=0,qi=null,Qi=0,$t=[],Ot=0,vn=null,kr=1,jr="";function wn(e,t){Xn[Jn++]=Qi,Xn[Jn++]=qi,qi=e,Qi=t}function dd(e,t,r){$t[Ot++]=kr,$t[Ot++]=jr,$t[Ot++]=vn,vn=e;var i=kr;e=jr;var l=32-Oe(i)-1;i&=~(1<<l),r+=1;var c=32-Oe(t)+l;if(30<c){var f=l-l%5;c=(i&(1<<f)-1).toString(32),i>>=f,l-=f,kr=1<<32-Oe(t)+l|r<<l|i,jr=c+e}else kr=1<<c|r<<l|i,jr=e}function Co(e){e.return!==null&&(wn(e,1),dd(e,1,0))}function No(e){for(;e===qi;)qi=Xn[--Jn],Xn[Jn]=null,Qi=Xn[--Jn],Xn[Jn]=null;for(;e===vn;)vn=$t[--Ot],$t[Ot]=null,jr=$t[--Ot],$t[Ot]=null,kr=$t[--Ot],$t[Ot]=null}var Ft=null,Tt=null,Ye=!1,Zt=null;function ud(e,t){var r=Gt(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function pd(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ft=e,Tt=Gr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ft=e,Tt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=vn!==null?{id:kr,overflow:jr}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Gt(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Ft=e,Tt=null,!0):!1;default:return!1}}function Eo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function zo(e){if(Ye){var t=Tt;if(t){var r=t;if(!pd(e,t)){if(Eo(e))throw Error(s(418));t=Gr(r.nextSibling);var i=Ft;t&&pd(e,t)?ud(i,r):(e.flags=e.flags&-4097|2,Ye=!1,Ft=e)}}else{if(Eo(e))throw Error(s(418));e.flags=e.flags&-4097|2,Ye=!1,Ft=e}}}function fd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ft=e}function Xi(e){if(e!==Ft)return!1;if(!Ye)return fd(e),Ye=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!bo(e.type,e.memoizedProps)),t&&(t=Tt)){if(Eo(e))throw md(),Error(s(418));for(;t;)ud(e,t),t=Gr(t.nextSibling)}if(fd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Tt=Gr(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Tt=null}}else Tt=Ft?Gr(e.stateNode.nextSibling):null;return!0}function md(){for(var e=Tt;e;)e=Gr(e.nextSibling)}function Zn(){Tt=Ft=null,Ye=!1}function Ro(e){Zt===null?Zt=[e]:Zt.push(e)}var j0=ne.ReactCurrentBatchConfig;function Ga(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(s(309));var i=r.stateNode}if(!i)throw Error(s(147,e));var l=i,c=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===c?t.ref:(t=function(f){var y=l.refs;f===null?delete y[c]:y[c]=f},t._stringRef=c,t)}if(typeof e!="string")throw Error(s(284));if(!r._owner)throw Error(s(290,e))}return e}function Ji(e,t){throw e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function gd(e){var t=e._init;return t(e._payload)}function hd(e){function t(L,E){if(e){var F=L.deletions;F===null?(L.deletions=[E],L.flags|=16):F.push(E)}}function r(L,E){if(!e)return null;for(;E!==null;)t(L,E),E=E.sibling;return null}function i(L,E){for(L=new Map;E!==null;)E.key!==null?L.set(E.key,E):L.set(E.index,E),E=E.sibling;return L}function l(L,E){return L=rn(L,E),L.index=0,L.sibling=null,L}function c(L,E,F){return L.index=F,e?(F=L.alternate,F!==null?(F=F.index,F<E?(L.flags|=2,E):F):(L.flags|=2,E)):(L.flags|=1048576,E)}function f(L){return e&&L.alternate===null&&(L.flags|=2),L}function y(L,E,F,V){return E===null||E.tag!==6?(E=vs(F,L.mode,V),E.return=L,E):(E=l(E,F),E.return=L,E)}function C(L,E,F,V){var de=F.type;return de===j?H(L,E,F.props.children,V,F.key):E!==null&&(E.elementType===de||typeof de=="object"&&de!==null&&de.$$typeof===he&&gd(de)===E.type)?(V=l(E,F.props),V.ref=Ga(L,E,F),V.return=L,V):(V=kl(F.type,F.key,F.props,null,L.mode,V),V.ref=Ga(L,E,F),V.return=L,V)}function D(L,E,F,V){return E===null||E.tag!==4||E.stateNode.containerInfo!==F.containerInfo||E.stateNode.implementation!==F.implementation?(E=ws(F,L.mode,V),E.return=L,E):(E=l(E,F.children||[]),E.return=L,E)}function H(L,E,F,V,de){return E===null||E.tag!==7?(E=Rn(F,L.mode,V,de),E.return=L,E):(E=l(E,F),E.return=L,E)}function G(L,E,F){if(typeof E=="string"&&E!==""||typeof E=="number")return E=vs(""+E,L.mode,F),E.return=L,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Q:return F=kl(E.type,E.key,E.props,null,L.mode,F),F.ref=Ga(L,null,E),F.return=L,F;case Z:return E=ws(E,L.mode,F),E.return=L,E;case he:var V=E._init;return G(L,V(E._payload),F)}if(cn(E)||te(E))return E=Rn(E,L.mode,F,null),E.return=L,E;Ji(L,E)}return null}function U(L,E,F,V){var de=E!==null?E.key:null;if(typeof F=="string"&&F!==""||typeof F=="number")return de!==null?null:y(L,E,""+F,V);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case Q:return F.key===de?C(L,E,F,V):null;case Z:return F.key===de?D(L,E,F,V):null;case he:return de=F._init,U(L,E,de(F._payload),V)}if(cn(F)||te(F))return de!==null?null:H(L,E,F,V,null);Ji(L,F)}return null}function ee(L,E,F,V,de){if(typeof V=="string"&&V!==""||typeof V=="number")return L=L.get(F)||null,y(E,L,""+V,de);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case Q:return L=L.get(V.key===null?F:V.key)||null,C(E,L,V,de);case Z:return L=L.get(V.key===null?F:V.key)||null,D(E,L,V,de);case he:var me=V._init;return ee(L,E,F,me(V._payload),de)}if(cn(V)||te(V))return L=L.get(F)||null,H(E,L,V,de,null);Ji(E,V)}return null}function le(L,E,F,V){for(var de=null,me=null,ge=E,ke=E=0,ct=null;ge!==null&&ke<F.length;ke++){ge.index>ke?(ct=ge,ge=null):ct=ge.sibling;var Me=U(L,ge,F[ke],V);if(Me===null){ge===null&&(ge=ct);break}e&&ge&&Me.alternate===null&&t(L,ge),E=c(Me,E,ke),me===null?de=Me:me.sibling=Me,me=Me,ge=ct}if(ke===F.length)return r(L,ge),Ye&&wn(L,ke),de;if(ge===null){for(;ke<F.length;ke++)ge=G(L,F[ke],V),ge!==null&&(E=c(ge,E,ke),me===null?de=ge:me.sibling=ge,me=ge);return Ye&&wn(L,ke),de}for(ge=i(L,ge);ke<F.length;ke++)ct=ee(ge,L,ke,F[ke],V),ct!==null&&(e&&ct.alternate!==null&&ge.delete(ct.key===null?ke:ct.key),E=c(ct,E,ke),me===null?de=ct:me.sibling=ct,me=ct);return e&&ge.forEach(function(nn){return t(L,nn)}),Ye&&wn(L,ke),de}function se(L,E,F,V){var de=te(F);if(typeof de!="function")throw Error(s(150));if(F=de.call(F),F==null)throw Error(s(151));for(var me=de=null,ge=E,ke=E=0,ct=null,Me=F.next();ge!==null&&!Me.done;ke++,Me=F.next()){ge.index>ke?(ct=ge,ge=null):ct=ge.sibling;var nn=U(L,ge,Me.value,V);if(nn===null){ge===null&&(ge=ct);break}e&&ge&&nn.alternate===null&&t(L,ge),E=c(nn,E,ke),me===null?de=nn:me.sibling=nn,me=nn,ge=ct}if(Me.done)return r(L,ge),Ye&&wn(L,ke),de;if(ge===null){for(;!Me.done;ke++,Me=F.next())Me=G(L,Me.value,V),Me!==null&&(E=c(Me,E,ke),me===null?de=Me:me.sibling=Me,me=Me);return Ye&&wn(L,ke),de}for(ge=i(L,ge);!Me.done;ke++,Me=F.next())Me=ee(ge,L,ke,Me.value,V),Me!==null&&(e&&Me.alternate!==null&&ge.delete(Me.key===null?ke:Me.key),E=c(Me,E,ke),me===null?de=Me:me.sibling=Me,me=Me);return e&&ge.forEach(function(rm){return t(L,rm)}),Ye&&wn(L,ke),de}function Ze(L,E,F,V){if(typeof F=="object"&&F!==null&&F.type===j&&F.key===null&&(F=F.props.children),typeof F=="object"&&F!==null){switch(F.$$typeof){case Q:e:{for(var de=F.key,me=E;me!==null;){if(me.key===de){if(de=F.type,de===j){if(me.tag===7){r(L,me.sibling),E=l(me,F.props.children),E.return=L,L=E;break e}}else if(me.elementType===de||typeof de=="object"&&de!==null&&de.$$typeof===he&&gd(de)===me.type){r(L,me.sibling),E=l(me,F.props),E.ref=Ga(L,me,F),E.return=L,L=E;break e}r(L,me);break}else t(L,me);me=me.sibling}F.type===j?(E=Rn(F.props.children,L.mode,V,F.key),E.return=L,L=E):(V=kl(F.type,F.key,F.props,null,L.mode,V),V.ref=Ga(L,E,F),V.return=L,L=V)}return f(L);case Z:e:{for(me=F.key;E!==null;){if(E.key===me)if(E.tag===4&&E.stateNode.containerInfo===F.containerInfo&&E.stateNode.implementation===F.implementation){r(L,E.sibling),E=l(E,F.children||[]),E.return=L,L=E;break e}else{r(L,E);break}else t(L,E);E=E.sibling}E=ws(F,L.mode,V),E.return=L,L=E}return f(L);case he:return me=F._init,Ze(L,E,me(F._payload),V)}if(cn(F))return le(L,E,F,V);if(te(F))return se(L,E,F,V);Ji(L,F)}return typeof F=="string"&&F!==""||typeof F=="number"?(F=""+F,E!==null&&E.tag===6?(r(L,E.sibling),E=l(E,F),E.return=L,L=E):(r(L,E),E=vs(F,L.mode,V),E.return=L,L=E),f(L)):r(L,E)}return Ze}var ea=hd(!0),xd=hd(!1),Zi=Vr(null),el=null,ta=null,Po=null;function Lo(){Po=ta=el=null}function Fo(e){var t=Zi.current;Ge(Zi),e._currentValue=t}function To(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function ra(e,t){el=e,Po=ta=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Nt=!0),e.firstContext=null)}function Ut(e){var t=e._currentValue;if(Po!==e)if(e={context:e,memoizedValue:t,next:null},ta===null){if(el===null)throw Error(s(308));ta=e,el.dependencies={lanes:0,firstContext:e}}else ta=ta.next=e;return t}var kn=null;function Bo(e){kn===null?kn=[e]:kn.push(e)}function yd(e,t,r,i){var l=t.interleaved;return l===null?(r.next=r,Bo(t)):(r.next=l.next,l.next=r),t.interleaved=r,Sr(e,i)}function Sr(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var qr=!1;function Do(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function bd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Cr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Qr(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(De&2)!==0){var l=i.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),i.pending=t,Sr(e,r)}return l=i.interleaved,l===null?(t.next=t,Bo(i)):(t.next=l.next,l.next=t),i.interleaved=t,Sr(e,r)}function tl(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,Kl(e,r)}}function vd(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var l=null,c=null;if(r=r.firstBaseUpdate,r!==null){do{var f={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};c===null?l=c=f:c=c.next=f,r=r.next}while(r!==null);c===null?l=c=t:c=c.next=t}else l=c=t;r={baseState:i.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:i.shared,effects:i.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function rl(e,t,r,i){var l=e.updateQueue;qr=!1;var c=l.firstBaseUpdate,f=l.lastBaseUpdate,y=l.shared.pending;if(y!==null){l.shared.pending=null;var C=y,D=C.next;C.next=null,f===null?c=D:f.next=D,f=C;var H=e.alternate;H!==null&&(H=H.updateQueue,y=H.lastBaseUpdate,y!==f&&(y===null?H.firstBaseUpdate=D:y.next=D,H.lastBaseUpdate=C))}if(c!==null){var G=l.baseState;f=0,H=D=C=null,y=c;do{var U=y.lane,ee=y.eventTime;if((i&U)===U){H!==null&&(H=H.next={eventTime:ee,lane:0,tag:y.tag,payload:y.payload,callback:y.callback,next:null});e:{var le=e,se=y;switch(U=t,ee=r,se.tag){case 1:if(le=se.payload,typeof le=="function"){G=le.call(ee,G,U);break e}G=le;break e;case 3:le.flags=le.flags&-65537|128;case 0:if(le=se.payload,U=typeof le=="function"?le.call(ee,G,U):le,U==null)break e;G=Y({},G,U);break e;case 2:qr=!0}}y.callback!==null&&y.lane!==0&&(e.flags|=64,U=l.effects,U===null?l.effects=[y]:U.push(y))}else ee={eventTime:ee,lane:U,tag:y.tag,payload:y.payload,callback:y.callback,next:null},H===null?(D=H=ee,C=G):H=H.next=ee,f|=U;if(y=y.next,y===null){if(y=l.shared.pending,y===null)break;U=y,y=U.next,U.next=null,l.lastBaseUpdate=U,l.shared.pending=null}}while(!0);if(H===null&&(C=G),l.baseState=C,l.firstBaseUpdate=D,l.lastBaseUpdate=H,t=l.shared.interleaved,t!==null){l=t;do f|=l.lane,l=l.next;while(l!==t)}else c===null&&(l.shared.lanes=0);Cn|=f,e.lanes=f,e.memoizedState=G}}function wd(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],l=i.callback;if(l!==null){if(i.callback=null,i=r,typeof l!="function")throw Error(s(191,l));l.call(i)}}}var Va={},cr=Vr(Va),Ya=Vr(Va),Ka=Vr(Va);function jn(e){if(e===Va)throw Error(s(174));return e}function Mo(e,t){switch(We(Ka,t),We(Ya,e),We(cr,Va),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:dn(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=dn(t,e)}Ge(cr),We(cr,t)}function na(){Ge(cr),Ge(Ya),Ge(Ka)}function kd(e){jn(Ka.current);var t=jn(cr.current),r=dn(t,e.type);t!==r&&(We(Ya,e),We(cr,r))}function _o(e){Ya.current===e&&(Ge(cr),Ge(Ya))}var Ke=Vr(0);function nl(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ao=[];function Io(){for(var e=0;e<Ao.length;e++)Ao[e]._workInProgressVersionPrimary=null;Ao.length=0}var al=ne.ReactCurrentDispatcher,$o=ne.ReactCurrentBatchConfig,Sn=0,qe=null,at=null,ot=null,il=!1,qa=!1,Qa=0,S0=0;function mt(){throw Error(s(321))}function Oo(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Jt(e[r],t[r]))return!1;return!0}function Uo(e,t,r,i,l,c){if(Sn=c,qe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,al.current=e===null||e.memoizedState===null?z0:R0,e=r(i,l),qa){c=0;do{if(qa=!1,Qa=0,25<=c)throw Error(s(301));c+=1,ot=at=null,t.updateQueue=null,al.current=P0,e=r(i,l)}while(qa)}if(al.current=sl,t=at!==null&&at.next!==null,Sn=0,ot=at=qe=null,il=!1,t)throw Error(s(300));return e}function Wo(){var e=Qa!==0;return Qa=0,e}function dr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ot===null?qe.memoizedState=ot=e:ot=ot.next=e,ot}function Wt(){if(at===null){var e=qe.alternate;e=e!==null?e.memoizedState:null}else e=at.next;var t=ot===null?qe.memoizedState:ot.next;if(t!==null)ot=t,at=e;else{if(e===null)throw Error(s(310));at=e,e={memoizedState:at.memoizedState,baseState:at.baseState,baseQueue:at.baseQueue,queue:at.queue,next:null},ot===null?qe.memoizedState=ot=e:ot=ot.next=e}return ot}function Xa(e,t){return typeof t=="function"?t(e):t}function Ho(e){var t=Wt(),r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=e;var i=at,l=i.baseQueue,c=r.pending;if(c!==null){if(l!==null){var f=l.next;l.next=c.next,c.next=f}i.baseQueue=l=c,r.pending=null}if(l!==null){c=l.next,i=i.baseState;var y=f=null,C=null,D=c;do{var H=D.lane;if((Sn&H)===H)C!==null&&(C=C.next={lane:0,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null}),i=D.hasEagerState?D.eagerState:e(i,D.action);else{var G={lane:H,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null};C===null?(y=C=G,f=i):C=C.next=G,qe.lanes|=H,Cn|=H}D=D.next}while(D!==null&&D!==c);C===null?f=i:C.next=y,Jt(i,t.memoizedState)||(Nt=!0),t.memoizedState=i,t.baseState=f,t.baseQueue=C,r.lastRenderedState=i}if(e=r.interleaved,e!==null){l=e;do c=l.lane,qe.lanes|=c,Cn|=c,l=l.next;while(l!==e)}else l===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Go(e){var t=Wt(),r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=e;var i=r.dispatch,l=r.pending,c=t.memoizedState;if(l!==null){r.pending=null;var f=l=l.next;do c=e(c,f.action),f=f.next;while(f!==l);Jt(c,t.memoizedState)||(Nt=!0),t.memoizedState=c,t.baseQueue===null&&(t.baseState=c),r.lastRenderedState=c}return[c,i]}function jd(){}function Sd(e,t){var r=qe,i=Wt(),l=t(),c=!Jt(i.memoizedState,l);if(c&&(i.memoizedState=l,Nt=!0),i=i.queue,Vo(Ed.bind(null,r,i,e),[e]),i.getSnapshot!==t||c||ot!==null&&ot.memoizedState.tag&1){if(r.flags|=2048,Ja(9,Nd.bind(null,r,i,l,t),void 0,null),st===null)throw Error(s(349));(Sn&30)!==0||Cd(r,t,l)}return l}function Cd(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=qe.updateQueue,t===null?(t={lastEffect:null,stores:null},qe.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Nd(e,t,r,i){t.value=r,t.getSnapshot=i,zd(t)&&Rd(e)}function Ed(e,t,r){return r(function(){zd(t)&&Rd(e)})}function zd(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Jt(e,r)}catch{return!0}}function Rd(e){var t=Sr(e,1);t!==null&&nr(t,e,1,-1)}function Pd(e){var t=dr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xa,lastRenderedState:e},t.queue=e,e=e.dispatch=E0.bind(null,qe,e),[t.memoizedState,e]}function Ja(e,t,r,i){return e={tag:e,create:t,destroy:r,deps:i,next:null},t=qe.updateQueue,t===null?(t={lastEffect:null,stores:null},qe.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e)),e}function Ld(){return Wt().memoizedState}function ll(e,t,r,i){var l=dr();qe.flags|=e,l.memoizedState=Ja(1|t,r,void 0,i===void 0?null:i)}function ol(e,t,r,i){var l=Wt();i=i===void 0?null:i;var c=void 0;if(at!==null){var f=at.memoizedState;if(c=f.destroy,i!==null&&Oo(i,f.deps)){l.memoizedState=Ja(t,r,c,i);return}}qe.flags|=e,l.memoizedState=Ja(1|t,r,c,i)}function Fd(e,t){return ll(8390656,8,e,t)}function Vo(e,t){return ol(2048,8,e,t)}function Td(e,t){return ol(4,2,e,t)}function Bd(e,t){return ol(4,4,e,t)}function Dd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Md(e,t,r){return r=r!=null?r.concat([e]):null,ol(4,4,Dd.bind(null,t,e),r)}function Yo(){}function _d(e,t){var r=Wt();t=t===void 0?null:t;var i=r.memoizedState;return i!==null&&t!==null&&Oo(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Ad(e,t){var r=Wt();t=t===void 0?null:t;var i=r.memoizedState;return i!==null&&t!==null&&Oo(t,i[1])?i[0]:(e=e(),r.memoizedState=[e,t],e)}function Id(e,t,r){return(Sn&21)===0?(e.baseState&&(e.baseState=!1,Nt=!0),e.memoizedState=r):(Jt(r,t)||(r=gc(),qe.lanes|=r,Cn|=r,e.baseState=!0),t)}function C0(e,t){var r=$e;$e=r!==0&&4>r?r:4,e(!0);var i=$o.transition;$o.transition={};try{e(!1),t()}finally{$e=r,$o.transition=i}}function $d(){return Wt().memoizedState}function N0(e,t,r){var i=en(e);if(r={lane:i,action:r,hasEagerState:!1,eagerState:null,next:null},Od(e))Ud(t,r);else if(r=yd(e,t,r,i),r!==null){var l=wt();nr(r,e,i,l),Wd(r,t,i)}}function E0(e,t,r){var i=en(e),l={lane:i,action:r,hasEagerState:!1,eagerState:null,next:null};if(Od(e))Ud(t,l);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=t.lastRenderedReducer,c!==null))try{var f=t.lastRenderedState,y=c(f,r);if(l.hasEagerState=!0,l.eagerState=y,Jt(y,f)){var C=t.interleaved;C===null?(l.next=l,Bo(t)):(l.next=C.next,C.next=l),t.interleaved=l;return}}catch{}finally{}r=yd(e,t,l,i),r!==null&&(l=wt(),nr(r,e,i,l),Wd(r,t,i))}}function Od(e){var t=e.alternate;return e===qe||t!==null&&t===qe}function Ud(e,t){qa=il=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Wd(e,t,r){if((r&4194240)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,Kl(e,r)}}var sl={readContext:Ut,useCallback:mt,useContext:mt,useEffect:mt,useImperativeHandle:mt,useInsertionEffect:mt,useLayoutEffect:mt,useMemo:mt,useReducer:mt,useRef:mt,useState:mt,useDebugValue:mt,useDeferredValue:mt,useTransition:mt,useMutableSource:mt,useSyncExternalStore:mt,useId:mt,unstable_isNewReconciler:!1},z0={readContext:Ut,useCallback:function(e,t){return dr().memoizedState=[e,t===void 0?null:t],e},useContext:Ut,useEffect:Fd,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ll(4194308,4,Dd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ll(4194308,4,e,t)},useInsertionEffect:function(e,t){return ll(4,2,e,t)},useMemo:function(e,t){var r=dr();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var i=dr();return t=r!==void 0?r(t):t,i.memoizedState=i.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},i.queue=e,e=e.dispatch=N0.bind(null,qe,e),[i.memoizedState,e]},useRef:function(e){var t=dr();return e={current:e},t.memoizedState=e},useState:Pd,useDebugValue:Yo,useDeferredValue:function(e){return dr().memoizedState=e},useTransition:function(){var e=Pd(!1),t=e[0];return e=C0.bind(null,e[1]),dr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var i=qe,l=dr();if(Ye){if(r===void 0)throw Error(s(407));r=r()}else{if(r=t(),st===null)throw Error(s(349));(Sn&30)!==0||Cd(i,t,r)}l.memoizedState=r;var c={value:r,getSnapshot:t};return l.queue=c,Fd(Ed.bind(null,i,c,e),[e]),i.flags|=2048,Ja(9,Nd.bind(null,i,c,r,t),void 0,null),r},useId:function(){var e=dr(),t=st.identifierPrefix;if(Ye){var r=jr,i=kr;r=(i&~(1<<32-Oe(i)-1)).toString(32)+r,t=":"+t+"R"+r,r=Qa++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=S0++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},R0={readContext:Ut,useCallback:_d,useContext:Ut,useEffect:Vo,useImperativeHandle:Md,useInsertionEffect:Td,useLayoutEffect:Bd,useMemo:Ad,useReducer:Ho,useRef:Ld,useState:function(){return Ho(Xa)},useDebugValue:Yo,useDeferredValue:function(e){var t=Wt();return Id(t,at.memoizedState,e)},useTransition:function(){var e=Ho(Xa)[0],t=Wt().memoizedState;return[e,t]},useMutableSource:jd,useSyncExternalStore:Sd,useId:$d,unstable_isNewReconciler:!1},P0={readContext:Ut,useCallback:_d,useContext:Ut,useEffect:Vo,useImperativeHandle:Md,useInsertionEffect:Td,useLayoutEffect:Bd,useMemo:Ad,useReducer:Go,useRef:Ld,useState:function(){return Go(Xa)},useDebugValue:Yo,useDeferredValue:function(e){var t=Wt();return at===null?t.memoizedState=e:Id(t,at.memoizedState,e)},useTransition:function(){var e=Go(Xa)[0],t=Wt().memoizedState;return[e,t]},useMutableSource:jd,useSyncExternalStore:Sd,useId:$d,unstable_isNewReconciler:!1};function er(e,t){if(e&&e.defaultProps){t=Y({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Ko(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:Y({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var cl={isMounted:function(e){return(e=e._reactInternals)?oe(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var i=wt(),l=en(e),c=Cr(i,l);c.payload=t,r!=null&&(c.callback=r),t=Qr(e,c,l),t!==null&&(nr(t,e,l,i),tl(t,e,l))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=wt(),l=en(e),c=Cr(i,l);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=Qr(e,c,l),t!==null&&(nr(t,e,l,i),tl(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=wt(),i=en(e),l=Cr(r,i);l.tag=2,t!=null&&(l.callback=t),t=Qr(e,l,i),t!==null&&(nr(t,e,i,r),tl(t,e,i))}};function Hd(e,t,r,i,l,c,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,f):t.prototype&&t.prototype.isPureReactComponent?!Aa(r,i)||!Aa(l,c):!0}function Gd(e,t,r){var i=!1,l=Yr,c=t.contextType;return typeof c=="object"&&c!==null?c=Ut(c):(l=Ct(t)?bn:ft.current,i=t.contextTypes,c=(i=i!=null)?Qn(e,l):Yr),t=new t(r,c),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=cl,e.stateNode=t,t._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=c),t}function Vd(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&cl.enqueueReplaceState(t,t.state,null)}function qo(e,t,r,i){var l=e.stateNode;l.props=r,l.state=e.memoizedState,l.refs={},Do(e);var c=t.contextType;typeof c=="object"&&c!==null?l.context=Ut(c):(c=Ct(t)?bn:ft.current,l.context=Qn(e,c)),l.state=e.memoizedState,c=t.getDerivedStateFromProps,typeof c=="function"&&(Ko(e,t,c,r),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&cl.enqueueReplaceState(l,l.state,null),rl(e,r,l,i),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function aa(e,t){try{var r="",i=t;do r+=be(i),i=i.return;while(i);var l=r}catch(c){l=`
Error generating stack: `+c.message+`
`+c.stack}return{value:e,source:t,stack:l,digest:null}}function Qo(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Xo(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var L0=typeof WeakMap=="function"?WeakMap:Map;function Yd(e,t,r){r=Cr(-1,r),r.tag=3,r.payload={element:null};var i=t.value;return r.callback=function(){hl||(hl=!0,ps=i),Xo(e,t)},r}function Kd(e,t,r){r=Cr(-1,r),r.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var l=t.value;r.payload=function(){return i(l)},r.callback=function(){Xo(e,t)}}var c=e.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(r.callback=function(){Xo(e,t),typeof i!="function"&&(Jr===null?Jr=new Set([this]):Jr.add(this));var f=t.stack;this.componentDidCatch(t.value,{componentStack:f!==null?f:""})}),r}function qd(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new L0;var l=new Set;i.set(t,l)}else l=i.get(t),l===void 0&&(l=new Set,i.set(t,l));l.has(r)||(l.add(r),e=G0.bind(null,e,t,r),t.then(e,e))}function Qd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Xd(e,t,r,i,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Cr(-1,1),t.tag=2,Qr(r,t,1))),r.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var F0=ne.ReactCurrentOwner,Nt=!1;function vt(e,t,r,i){t.child=e===null?xd(t,null,r,i):ea(t,e.child,r,i)}function Jd(e,t,r,i,l){r=r.render;var c=t.ref;return ra(t,l),i=Uo(e,t,r,i,c,l),r=Wo(),e!==null&&!Nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Nr(e,t,l)):(Ye&&r&&Co(t),t.flags|=1,vt(e,t,i,l),t.child)}function Zd(e,t,r,i,l){if(e===null){var c=r.type;return typeof c=="function"&&!bs(c)&&c.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=c,eu(e,t,c,i,l)):(e=kl(r.type,null,i,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(c=e.child,(e.lanes&l)===0){var f=c.memoizedProps;if(r=r.compare,r=r!==null?r:Aa,r(f,i)&&e.ref===t.ref)return Nr(e,t,l)}return t.flags|=1,e=rn(c,i),e.ref=t.ref,e.return=t,t.child=e}function eu(e,t,r,i,l){if(e!==null){var c=e.memoizedProps;if(Aa(c,i)&&e.ref===t.ref)if(Nt=!1,t.pendingProps=i=c,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Nt=!0);else return t.lanes=e.lanes,Nr(e,t,l)}return Jo(e,t,r,i,l)}function tu(e,t,r){var i=t.pendingProps,l=i.children,c=e!==null?e.memoizedState:null;if(i.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},We(la,Bt),Bt|=r;else{if((r&1073741824)===0)return e=c!==null?c.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,We(la,Bt),Bt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=c!==null?c.baseLanes:r,We(la,Bt),Bt|=i}else c!==null?(i=c.baseLanes|r,t.memoizedState=null):i=r,We(la,Bt),Bt|=i;return vt(e,t,l,r),t.child}function ru(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Jo(e,t,r,i,l){var c=Ct(r)?bn:ft.current;return c=Qn(t,c),ra(t,l),r=Uo(e,t,r,i,c,l),i=Wo(),e!==null&&!Nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Nr(e,t,l)):(Ye&&i&&Co(t),t.flags|=1,vt(e,t,r,l),t.child)}function nu(e,t,r,i,l){if(Ct(r)){var c=!0;Yi(t)}else c=!1;if(ra(t,l),t.stateNode===null)ul(e,t),Gd(t,r,i),qo(t,r,i,l),i=!0;else if(e===null){var f=t.stateNode,y=t.memoizedProps;f.props=y;var C=f.context,D=r.contextType;typeof D=="object"&&D!==null?D=Ut(D):(D=Ct(r)?bn:ft.current,D=Qn(t,D));var H=r.getDerivedStateFromProps,G=typeof H=="function"||typeof f.getSnapshotBeforeUpdate=="function";G||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==i||C!==D)&&Vd(t,f,i,D),qr=!1;var U=t.memoizedState;f.state=U,rl(t,i,f,l),C=t.memoizedState,y!==i||U!==C||St.current||qr?(typeof H=="function"&&(Ko(t,r,H,i),C=t.memoizedState),(y=qr||Hd(t,r,y,i,U,C,D))?(G||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=C),f.props=i,f.state=C,f.context=D,i=y):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{f=t.stateNode,bd(e,t),y=t.memoizedProps,D=t.type===t.elementType?y:er(t.type,y),f.props=D,G=t.pendingProps,U=f.context,C=r.contextType,typeof C=="object"&&C!==null?C=Ut(C):(C=Ct(r)?bn:ft.current,C=Qn(t,C));var ee=r.getDerivedStateFromProps;(H=typeof ee=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==G||U!==C)&&Vd(t,f,i,C),qr=!1,U=t.memoizedState,f.state=U,rl(t,i,f,l);var le=t.memoizedState;y!==G||U!==le||St.current||qr?(typeof ee=="function"&&(Ko(t,r,ee,i),le=t.memoizedState),(D=qr||Hd(t,r,D,i,U,le,C)||!1)?(H||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(i,le,C),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(i,le,C)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=le),f.props=i,f.state=le,f.context=C,i=D):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),i=!1)}return Zo(e,t,r,i,c,l)}function Zo(e,t,r,i,l,c){ru(e,t);var f=(t.flags&128)!==0;if(!i&&!f)return l&&sd(t,r,!1),Nr(e,t,c);i=t.stateNode,F0.current=t;var y=f&&typeof r.getDerivedStateFromError!="function"?null:i.render();return t.flags|=1,e!==null&&f?(t.child=ea(t,e.child,null,c),t.child=ea(t,null,y,c)):vt(e,t,y,c),t.memoizedState=i.state,l&&sd(t,r,!0),t.child}function au(e){var t=e.stateNode;t.pendingContext?ld(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ld(e,t.context,!1),Mo(e,t.containerInfo)}function iu(e,t,r,i,l){return Zn(),Ro(l),t.flags|=256,vt(e,t,r,i),t.child}var es={dehydrated:null,treeContext:null,retryLane:0};function ts(e){return{baseLanes:e,cachePool:null,transitions:null}}function lu(e,t,r){var i=t.pendingProps,l=Ke.current,c=!1,f=(t.flags&128)!==0,y;if((y=f)||(y=e!==null&&e.memoizedState===null?!1:(l&2)!==0),y?(c=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),We(Ke,l&1),e===null)return zo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(f=i.children,e=i.fallback,c?(i=t.mode,c=t.child,f={mode:"hidden",children:f},(i&1)===0&&c!==null?(c.childLanes=0,c.pendingProps=f):c=jl(f,i,0,null),e=Rn(e,i,r,null),c.return=t,e.return=t,c.sibling=e,t.child=c,t.child.memoizedState=ts(r),t.memoizedState=es,e):rs(t,f));if(l=e.memoizedState,l!==null&&(y=l.dehydrated,y!==null))return T0(e,t,f,i,y,l,r);if(c){c=i.fallback,f=t.mode,l=e.child,y=l.sibling;var C={mode:"hidden",children:i.children};return(f&1)===0&&t.child!==l?(i=t.child,i.childLanes=0,i.pendingProps=C,t.deletions=null):(i=rn(l,C),i.subtreeFlags=l.subtreeFlags&14680064),y!==null?c=rn(y,c):(c=Rn(c,f,r,null),c.flags|=2),c.return=t,i.return=t,i.sibling=c,t.child=i,i=c,c=t.child,f=e.child.memoizedState,f=f===null?ts(r):{baseLanes:f.baseLanes|r,cachePool:null,transitions:f.transitions},c.memoizedState=f,c.childLanes=e.childLanes&~r,t.memoizedState=es,i}return c=e.child,e=c.sibling,i=rn(c,{mode:"visible",children:i.children}),(t.mode&1)===0&&(i.lanes=r),i.return=t,i.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=i,t.memoizedState=null,i}function rs(e,t){return t=jl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function dl(e,t,r,i){return i!==null&&Ro(i),ea(t,e.child,null,r),e=rs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function T0(e,t,r,i,l,c,f){if(r)return t.flags&256?(t.flags&=-257,i=Qo(Error(s(422))),dl(e,t,f,i)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(c=i.fallback,l=t.mode,i=jl({mode:"visible",children:i.children},l,0,null),c=Rn(c,l,f,null),c.flags|=2,i.return=t,c.return=t,i.sibling=c,t.child=i,(t.mode&1)!==0&&ea(t,e.child,null,f),t.child.memoizedState=ts(f),t.memoizedState=es,c);if((t.mode&1)===0)return dl(e,t,f,null);if(l.data==="$!"){if(i=l.nextSibling&&l.nextSibling.dataset,i)var y=i.dgst;return i=y,c=Error(s(419)),i=Qo(c,i,void 0),dl(e,t,f,i)}if(y=(f&e.childLanes)!==0,Nt||y){if(i=st,i!==null){switch(f&-f){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(i.suspendedLanes|f))!==0?0:l,l!==0&&l!==c.retryLane&&(c.retryLane=l,Sr(e,l),nr(i,e,l,-1))}return ys(),i=Qo(Error(s(421))),dl(e,t,f,i)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=V0.bind(null,e),l._reactRetry=t,null):(e=c.treeContext,Tt=Gr(l.nextSibling),Ft=t,Ye=!0,Zt=null,e!==null&&($t[Ot++]=kr,$t[Ot++]=jr,$t[Ot++]=vn,kr=e.id,jr=e.overflow,vn=t),t=rs(t,i.children),t.flags|=4096,t)}function ou(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),To(e.return,t,r)}function ns(e,t,r,i,l){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:l}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=i,c.tail=r,c.tailMode=l)}function su(e,t,r){var i=t.pendingProps,l=i.revealOrder,c=i.tail;if(vt(e,t,i.children,r),i=Ke.current,(i&2)!==0)i=i&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ou(e,r,t);else if(e.tag===19)ou(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(We(Ke,i),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(r=t.child,l=null;r!==null;)e=r.alternate,e!==null&&nl(e)===null&&(l=r),r=r.sibling;r=l,r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null),ns(t,!1,l,r,c);break;case"backwards":for(r=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&nl(e)===null){t.child=l;break}e=l.sibling,l.sibling=r,r=l,l=e}ns(t,!0,r,null,c);break;case"together":ns(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ul(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Nr(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Cn|=t.lanes,(r&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,r=rn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=rn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function B0(e,t,r){switch(t.tag){case 3:au(t),Zn();break;case 5:kd(t);break;case 1:Ct(t.type)&&Yi(t);break;case 4:Mo(t,t.stateNode.containerInfo);break;case 10:var i=t.type._context,l=t.memoizedProps.value;We(Zi,i._currentValue),i._currentValue=l;break;case 13:if(i=t.memoizedState,i!==null)return i.dehydrated!==null?(We(Ke,Ke.current&1),t.flags|=128,null):(r&t.child.childLanes)!==0?lu(e,t,r):(We(Ke,Ke.current&1),e=Nr(e,t,r),e!==null?e.sibling:null);We(Ke,Ke.current&1);break;case 19:if(i=(r&t.childLanes)!==0,(e.flags&128)!==0){if(i)return su(e,t,r);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),We(Ke,Ke.current),i)break;return null;case 22:case 23:return t.lanes=0,tu(e,t,r)}return Nr(e,t,r)}var cu,as,du,uu;cu=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},as=function(){},du=function(e,t,r,i){var l=e.memoizedProps;if(l!==i){e=t.stateNode,jn(cr.current);var c=null;switch(r){case"input":l=Mn(e,l),i=Mn(e,i),c=[];break;case"select":l=Y({},l,{value:void 0}),i=Y({},i,{value:void 0}),c=[];break;case"textarea":l=ba(e,l),i=ba(e,i),c=[];break;default:typeof l.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=Hi)}An(r,i);var f;r=null;for(D in l)if(!i.hasOwnProperty(D)&&l.hasOwnProperty(D)&&l[D]!=null)if(D==="style"){var y=l[D];for(f in y)y.hasOwnProperty(f)&&(r||(r={}),r[f]="")}else D!=="dangerouslySetInnerHTML"&&D!=="children"&&D!=="suppressContentEditableWarning"&&D!=="suppressHydrationWarning"&&D!=="autoFocus"&&(p.hasOwnProperty(D)?c||(c=[]):(c=c||[]).push(D,null));for(D in i){var C=i[D];if(y=l!=null?l[D]:void 0,i.hasOwnProperty(D)&&C!==y&&(C!=null||y!=null))if(D==="style")if(y){for(f in y)!y.hasOwnProperty(f)||C&&C.hasOwnProperty(f)||(r||(r={}),r[f]="");for(f in C)C.hasOwnProperty(f)&&y[f]!==C[f]&&(r||(r={}),r[f]=C[f])}else r||(c||(c=[]),c.push(D,r)),r=C;else D==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,y=y?y.__html:void 0,C!=null&&y!==C&&(c=c||[]).push(D,C)):D==="children"?typeof C!="string"&&typeof C!="number"||(c=c||[]).push(D,""+C):D!=="suppressContentEditableWarning"&&D!=="suppressHydrationWarning"&&(p.hasOwnProperty(D)?(C!=null&&D==="onScroll"&&He("scroll",e),c||y===C||(c=[])):(c=c||[]).push(D,C))}r&&(c=c||[]).push("style",r);var D=c;(t.updateQueue=D)&&(t.flags|=4)}},uu=function(e,t,r,i){r!==i&&(t.flags|=4)};function Za(e,t){if(!Ye)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function gt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var l=e.child;l!==null;)r|=l.lanes|l.childLanes,i|=l.subtreeFlags&14680064,i|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)r|=l.lanes|l.childLanes,i|=l.subtreeFlags,i|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function D0(e,t,r){var i=t.pendingProps;switch(No(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gt(t),null;case 1:return Ct(t.type)&&Vi(),gt(t),null;case 3:return i=t.stateNode,na(),Ge(St),Ge(ft),Io(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Xi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Zt!==null&&(gs(Zt),Zt=null))),as(e,t),gt(t),null;case 5:_o(t);var l=jn(Ka.current);if(r=t.type,e!==null&&t.stateNode!=null)du(e,t,r,i,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(s(166));return gt(t),null}if(e=jn(cr.current),Xi(t)){i=t.stateNode,r=t.type;var c=t.memoizedProps;switch(i[sr]=t,i[Wa]=c,e=(t.mode&1)!==0,r){case"dialog":He("cancel",i),He("close",i);break;case"iframe":case"object":case"embed":He("load",i);break;case"video":case"audio":for(l=0;l<$a.length;l++)He($a[l],i);break;case"source":He("error",i);break;case"img":case"image":case"link":He("error",i),He("load",i);break;case"details":He("toggle",i);break;case"input":ki(i,c),He("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!c.multiple},He("invalid",i);break;case"textarea":Si(i,c),He("invalid",i)}An(r,c),l=null;for(var f in c)if(c.hasOwnProperty(f)){var y=c[f];f==="children"?typeof y=="string"?i.textContent!==y&&(c.suppressHydrationWarning!==!0&&Wi(i.textContent,y,e),l=["children",y]):typeof y=="number"&&i.textContent!==""+y&&(c.suppressHydrationWarning!==!0&&Wi(i.textContent,y,e),l=["children",""+y]):p.hasOwnProperty(f)&&y!=null&&f==="onScroll"&&He("scroll",i)}switch(r){case"input":Dn(i),ji(i,c,!0);break;case"textarea":Dn(i),Tr(i);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(i.onclick=Hi)}i=l,t.updateQueue=i,i!==null&&(t.flags|=4)}else{f=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=va(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=f.createElement(r,{is:i.is}):(e=f.createElement(r),r==="select"&&(f=e,i.multiple?f.multiple=!0:i.size&&(f.size=i.size))):e=f.createElementNS(e,r),e[sr]=t,e[Wa]=i,cu(e,t,!1,!1),t.stateNode=e;e:{switch(f=In(r,i),r){case"dialog":He("cancel",e),He("close",e),l=i;break;case"iframe":case"object":case"embed":He("load",e),l=i;break;case"video":case"audio":for(l=0;l<$a.length;l++)He($a[l],e);l=i;break;case"source":He("error",e),l=i;break;case"img":case"image":case"link":He("error",e),He("load",e),l=i;break;case"details":He("toggle",e),l=i;break;case"input":ki(e,i),l=Mn(e,i),He("invalid",e);break;case"option":l=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},l=Y({},i,{value:void 0}),He("invalid",e);break;case"textarea":Si(e,i),l=ba(e,i),He("invalid",e);break;default:l=i}An(r,l),y=l;for(c in y)if(y.hasOwnProperty(c)){var C=y[c];c==="style"?At(e,C):c==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,C!=null&&_t(e,C)):c==="children"?typeof C=="string"?(r!=="textarea"||C!=="")&&Br(e,C):typeof C=="number"&&Br(e,""+C):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(p.hasOwnProperty(c)?C!=null&&c==="onScroll"&&He("scroll",e):C!=null&&J(e,c,C,f))}switch(r){case"input":Dn(e),ji(e,i,!1);break;case"textarea":Dn(e),Tr(e);break;case"option":i.value!=null&&e.setAttribute("value",""+Fe(i.value));break;case"select":e.multiple=!!i.multiple,c=i.value,c!=null?Fr(e,!!i.multiple,c,!1):i.defaultValue!=null&&Fr(e,!!i.multiple,i.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Hi)}switch(r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return gt(t),null;case 6:if(e&&t.stateNode!=null)uu(e,t,e.memoizedProps,i);else{if(typeof i!="string"&&t.stateNode===null)throw Error(s(166));if(r=jn(Ka.current),jn(cr.current),Xi(t)){if(i=t.stateNode,r=t.memoizedProps,i[sr]=t,(c=i.nodeValue!==r)&&(e=Ft,e!==null))switch(e.tag){case 3:Wi(i.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Wi(i.nodeValue,r,(e.mode&1)!==0)}c&&(t.flags|=4)}else i=(r.nodeType===9?r:r.ownerDocument).createTextNode(i),i[sr]=t,t.stateNode=i}return gt(t),null;case 13:if(Ge(Ke),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ye&&Tt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)md(),Zn(),t.flags|=98560,c=!1;else if(c=Xi(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[sr]=t}else Zn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;gt(t),c=!1}else Zt!==null&&(gs(Zt),Zt=null),c=!0;if(!c)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=r,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Ke.current&1)!==0?it===0&&(it=3):ys())),t.updateQueue!==null&&(t.flags|=4),gt(t),null);case 4:return na(),as(e,t),e===null&&Oa(t.stateNode.containerInfo),gt(t),null;case 10:return Fo(t.type._context),gt(t),null;case 17:return Ct(t.type)&&Vi(),gt(t),null;case 19:if(Ge(Ke),c=t.memoizedState,c===null)return gt(t),null;if(i=(t.flags&128)!==0,f=c.rendering,f===null)if(i)Za(c,!1);else{if(it!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=nl(e),f!==null){for(t.flags|=128,Za(c,!1),i=f.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=r,r=t.child;r!==null;)c=r,e=i,c.flags&=14680066,f=c.alternate,f===null?(c.childLanes=0,c.lanes=e,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=f.childLanes,c.lanes=f.lanes,c.child=f.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=f.memoizedProps,c.memoizedState=f.memoizedState,c.updateQueue=f.updateQueue,c.type=f.type,e=f.dependencies,c.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return We(Ke,Ke.current&1|2),t.child}e=e.sibling}c.tail!==null&&Ie()>oa&&(t.flags|=128,i=!0,Za(c,!1),t.lanes=4194304)}else{if(!i)if(e=nl(f),e!==null){if(t.flags|=128,i=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Za(c,!0),c.tail===null&&c.tailMode==="hidden"&&!f.alternate&&!Ye)return gt(t),null}else 2*Ie()-c.renderingStartTime>oa&&r!==1073741824&&(t.flags|=128,i=!0,Za(c,!1),t.lanes=4194304);c.isBackwards?(f.sibling=t.child,t.child=f):(r=c.last,r!==null?r.sibling=f:t.child=f,c.last=f)}return c.tail!==null?(t=c.tail,c.rendering=t,c.tail=t.sibling,c.renderingStartTime=Ie(),t.sibling=null,r=Ke.current,We(Ke,i?r&1|2:r&1),t):(gt(t),null);case 22:case 23:return xs(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&(t.mode&1)!==0?(Bt&1073741824)!==0&&(gt(t),t.subtreeFlags&6&&(t.flags|=8192)):gt(t),null;case 24:return null;case 25:return null}throw Error(s(156,t.tag))}function M0(e,t){switch(No(t),t.tag){case 1:return Ct(t.type)&&Vi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return na(),Ge(St),Ge(ft),Io(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return _o(t),null;case 13:if(Ge(Ke),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Zn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ge(Ke),null;case 4:return na(),null;case 10:return Fo(t.type._context),null;case 22:case 23:return xs(),null;case 24:return null;default:return null}}var pl=!1,ht=!1,_0=typeof WeakSet=="function"?WeakSet:Set,ae=null;function ia(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(i){Xe(e,t,i)}else r.current=null}function is(e,t,r){try{r()}catch(i){Xe(e,t,i)}}var pu=!1;function A0(e,t){if(xo=Fi,e=Hc(),so(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var l=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{r.nodeType,c.nodeType}catch{r=null;break e}var f=0,y=-1,C=-1,D=0,H=0,G=e,U=null;t:for(;;){for(var ee;G!==r||l!==0&&G.nodeType!==3||(y=f+l),G!==c||i!==0&&G.nodeType!==3||(C=f+i),G.nodeType===3&&(f+=G.nodeValue.length),(ee=G.firstChild)!==null;)U=G,G=ee;for(;;){if(G===e)break t;if(U===r&&++D===l&&(y=f),U===c&&++H===i&&(C=f),(ee=G.nextSibling)!==null)break;G=U,U=G.parentNode}G=ee}r=y===-1||C===-1?null:{start:y,end:C}}else r=null}r=r||{start:0,end:0}}else r=null;for(yo={focusedElem:e,selectionRange:r},Fi=!1,ae=t;ae!==null;)if(t=ae,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ae=e;else for(;ae!==null;){t=ae;try{var le=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(le!==null){var se=le.memoizedProps,Ze=le.memoizedState,L=t.stateNode,E=L.getSnapshotBeforeUpdate(t.elementType===t.type?se:er(t.type,se),Ze);L.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var F=t.stateNode.containerInfo;F.nodeType===1?F.textContent="":F.nodeType===9&&F.documentElement&&F.removeChild(F.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(s(163))}}catch(V){Xe(t,t.return,V)}if(e=t.sibling,e!==null){e.return=t.return,ae=e;break}ae=t.return}return le=pu,pu=!1,le}function ei(e,t,r){var i=t.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var l=i=i.next;do{if((l.tag&e)===e){var c=l.destroy;l.destroy=void 0,c!==void 0&&is(t,r,c)}l=l.next}while(l!==i)}}function fl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var i=r.create;r.destroy=i()}r=r.next}while(r!==t)}}function ls(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function fu(e){var t=e.alternate;t!==null&&(e.alternate=null,fu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[sr],delete t[Wa],delete t[ko],delete t[v0],delete t[w0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function mu(e){return e.tag===5||e.tag===3||e.tag===4}function gu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||mu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function os(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Hi));else if(i!==4&&(e=e.child,e!==null))for(os(e,t,r),e=e.sibling;e!==null;)os(e,t,r),e=e.sibling}function ss(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(ss(e,t,r),e=e.sibling;e!==null;)ss(e,t,r),e=e.sibling}var dt=null,tr=!1;function Xr(e,t,r){for(r=r.child;r!==null;)hu(e,t,r),r=r.sibling}function hu(e,t,r){if(bt&&typeof bt.onCommitFiberUnmount=="function")try{bt.onCommitFiberUnmount(xr,r)}catch{}switch(r.tag){case 5:ht||ia(r,t);case 6:var i=dt,l=tr;dt=null,Xr(e,t,r),dt=i,tr=l,dt!==null&&(tr?(e=dt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):dt.removeChild(r.stateNode));break;case 18:dt!==null&&(tr?(e=dt,r=r.stateNode,e.nodeType===8?wo(e.parentNode,r):e.nodeType===1&&wo(e,r),Fa(e)):wo(dt,r.stateNode));break;case 4:i=dt,l=tr,dt=r.stateNode.containerInfo,tr=!0,Xr(e,t,r),dt=i,tr=l;break;case 0:case 11:case 14:case 15:if(!ht&&(i=r.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){l=i=i.next;do{var c=l,f=c.destroy;c=c.tag,f!==void 0&&((c&2)!==0||(c&4)!==0)&&is(r,t,f),l=l.next}while(l!==i)}Xr(e,t,r);break;case 1:if(!ht&&(ia(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=r.memoizedProps,i.state=r.memoizedState,i.componentWillUnmount()}catch(y){Xe(r,t,y)}Xr(e,t,r);break;case 21:Xr(e,t,r);break;case 22:r.mode&1?(ht=(i=ht)||r.memoizedState!==null,Xr(e,t,r),ht=i):Xr(e,t,r);break;default:Xr(e,t,r)}}function xu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new _0),t.forEach(function(i){var l=Y0.bind(null,e,i);r.has(i)||(r.add(i),i.then(l,l))})}}function rr(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var l=r[i];try{var c=e,f=t,y=f;e:for(;y!==null;){switch(y.tag){case 5:dt=y.stateNode,tr=!1;break e;case 3:dt=y.stateNode.containerInfo,tr=!0;break e;case 4:dt=y.stateNode.containerInfo,tr=!0;break e}y=y.return}if(dt===null)throw Error(s(160));hu(c,f,l),dt=null,tr=!1;var C=l.alternate;C!==null&&(C.return=null),l.return=null}catch(D){Xe(l,t,D)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)yu(t,e),t=t.sibling}function yu(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(rr(t,e),ur(e),i&4){try{ei(3,e,e.return),fl(3,e)}catch(se){Xe(e,e.return,se)}try{ei(5,e,e.return)}catch(se){Xe(e,e.return,se)}}break;case 1:rr(t,e),ur(e),i&512&&r!==null&&ia(r,r.return);break;case 5:if(rr(t,e),ur(e),i&512&&r!==null&&ia(r,r.return),e.flags&32){var l=e.stateNode;try{Br(l,"")}catch(se){Xe(e,e.return,se)}}if(i&4&&(l=e.stateNode,l!=null)){var c=e.memoizedProps,f=r!==null?r.memoizedProps:c,y=e.type,C=e.updateQueue;if(e.updateQueue=null,C!==null)try{y==="input"&&c.type==="radio"&&c.name!=null&&ar(l,c),In(y,f);var D=In(y,c);for(f=0;f<C.length;f+=2){var H=C[f],G=C[f+1];H==="style"?At(l,G):H==="dangerouslySetInnerHTML"?_t(l,G):H==="children"?Br(l,G):J(l,H,G,D)}switch(y){case"input":ya(l,c);break;case"textarea":ir(l,c);break;case"select":var U=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!c.multiple;var ee=c.value;ee!=null?Fr(l,!!c.multiple,ee,!1):U!==!!c.multiple&&(c.defaultValue!=null?Fr(l,!!c.multiple,c.defaultValue,!0):Fr(l,!!c.multiple,c.multiple?[]:"",!1))}l[Wa]=c}catch(se){Xe(e,e.return,se)}}break;case 6:if(rr(t,e),ur(e),i&4){if(e.stateNode===null)throw Error(s(162));l=e.stateNode,c=e.memoizedProps;try{l.nodeValue=c}catch(se){Xe(e,e.return,se)}}break;case 3:if(rr(t,e),ur(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Fa(t.containerInfo)}catch(se){Xe(e,e.return,se)}break;case 4:rr(t,e),ur(e);break;case 13:rr(t,e),ur(e),l=e.child,l.flags&8192&&(c=l.memoizedState!==null,l.stateNode.isHidden=c,!c||l.alternate!==null&&l.alternate.memoizedState!==null||(us=Ie())),i&4&&xu(e);break;case 22:if(H=r!==null&&r.memoizedState!==null,e.mode&1?(ht=(D=ht)||H,rr(t,e),ht=D):rr(t,e),ur(e),i&8192){if(D=e.memoizedState!==null,(e.stateNode.isHidden=D)&&!H&&(e.mode&1)!==0)for(ae=e,H=e.child;H!==null;){for(G=ae=H;ae!==null;){switch(U=ae,ee=U.child,U.tag){case 0:case 11:case 14:case 15:ei(4,U,U.return);break;case 1:ia(U,U.return);var le=U.stateNode;if(typeof le.componentWillUnmount=="function"){i=U,r=U.return;try{t=i,le.props=t.memoizedProps,le.state=t.memoizedState,le.componentWillUnmount()}catch(se){Xe(i,r,se)}}break;case 5:ia(U,U.return);break;case 22:if(U.memoizedState!==null){wu(G);continue}}ee!==null?(ee.return=U,ae=ee):wu(G)}H=H.sibling}e:for(H=null,G=e;;){if(G.tag===5){if(H===null){H=G;try{l=G.stateNode,D?(c=l.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(y=G.stateNode,C=G.memoizedProps.style,f=C!=null&&C.hasOwnProperty("display")?C.display:null,y.style.display=Ci("display",f))}catch(se){Xe(e,e.return,se)}}}else if(G.tag===6){if(H===null)try{G.stateNode.nodeValue=D?"":G.memoizedProps}catch(se){Xe(e,e.return,se)}}else if((G.tag!==22&&G.tag!==23||G.memoizedState===null||G===e)&&G.child!==null){G.child.return=G,G=G.child;continue}if(G===e)break e;for(;G.sibling===null;){if(G.return===null||G.return===e)break e;H===G&&(H=null),G=G.return}H===G&&(H=null),G.sibling.return=G.return,G=G.sibling}}break;case 19:rr(t,e),ur(e),i&4&&xu(e);break;case 21:break;default:rr(t,e),ur(e)}}function ur(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(mu(r)){var i=r;break e}r=r.return}throw Error(s(160))}switch(i.tag){case 5:var l=i.stateNode;i.flags&32&&(Br(l,""),i.flags&=-33);var c=gu(e);ss(e,c,l);break;case 3:case 4:var f=i.stateNode.containerInfo,y=gu(e);os(e,y,f);break;default:throw Error(s(161))}}catch(C){Xe(e,e.return,C)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function I0(e,t,r){ae=e,bu(e)}function bu(e,t,r){for(var i=(e.mode&1)!==0;ae!==null;){var l=ae,c=l.child;if(l.tag===22&&i){var f=l.memoizedState!==null||pl;if(!f){var y=l.alternate,C=y!==null&&y.memoizedState!==null||ht;y=pl;var D=ht;if(pl=f,(ht=C)&&!D)for(ae=l;ae!==null;)f=ae,C=f.child,f.tag===22&&f.memoizedState!==null?ku(l):C!==null?(C.return=f,ae=C):ku(l);for(;c!==null;)ae=c,bu(c),c=c.sibling;ae=l,pl=y,ht=D}vu(e)}else(l.subtreeFlags&8772)!==0&&c!==null?(c.return=l,ae=c):vu(e)}}function vu(e){for(;ae!==null;){var t=ae;if((t.flags&8772)!==0){var r=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:ht||fl(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!ht)if(r===null)i.componentDidMount();else{var l=t.elementType===t.type?r.memoizedProps:er(t.type,r.memoizedProps);i.componentDidUpdate(l,r.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var c=t.updateQueue;c!==null&&wd(t,c,i);break;case 3:var f=t.updateQueue;if(f!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}wd(t,f,r)}break;case 5:var y=t.stateNode;if(r===null&&t.flags&4){r=y;var C=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":C.autoFocus&&r.focus();break;case"img":C.src&&(r.src=C.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var D=t.alternate;if(D!==null){var H=D.memoizedState;if(H!==null){var G=H.dehydrated;G!==null&&Fa(G)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(s(163))}ht||t.flags&512&&ls(t)}catch(U){Xe(t,t.return,U)}}if(t===e){ae=null;break}if(r=t.sibling,r!==null){r.return=t.return,ae=r;break}ae=t.return}}function wu(e){for(;ae!==null;){var t=ae;if(t===e){ae=null;break}var r=t.sibling;if(r!==null){r.return=t.return,ae=r;break}ae=t.return}}function ku(e){for(;ae!==null;){var t=ae;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{fl(4,t)}catch(C){Xe(t,r,C)}break;case 1:var i=t.stateNode;if(typeof i.componentDidMount=="function"){var l=t.return;try{i.componentDidMount()}catch(C){Xe(t,l,C)}}var c=t.return;try{ls(t)}catch(C){Xe(t,c,C)}break;case 5:var f=t.return;try{ls(t)}catch(C){Xe(t,f,C)}}}catch(C){Xe(t,t.return,C)}if(t===e){ae=null;break}var y=t.sibling;if(y!==null){y.return=t.return,ae=y;break}ae=t.return}}var $0=Math.ceil,ml=ne.ReactCurrentDispatcher,cs=ne.ReactCurrentOwner,Ht=ne.ReactCurrentBatchConfig,De=0,st=null,rt=null,ut=0,Bt=0,la=Vr(0),it=0,ti=null,Cn=0,gl=0,ds=0,ri=null,Et=null,us=0,oa=1/0,Er=null,hl=!1,ps=null,Jr=null,xl=!1,Zr=null,yl=0,ni=0,fs=null,bl=-1,vl=0;function wt(){return(De&6)!==0?Ie():bl!==-1?bl:bl=Ie()}function en(e){return(e.mode&1)===0?1:(De&2)!==0&&ut!==0?ut&-ut:j0.transition!==null?(vl===0&&(vl=gc()),vl):(e=$e,e!==0||(e=window.event,e=e===void 0?16:Sc(e.type)),e)}function nr(e,t,r,i){if(50<ni)throw ni=0,fs=null,Error(s(185));Ea(e,r,i),((De&2)===0||e!==st)&&(e===st&&((De&2)===0&&(gl|=r),it===4&&tn(e,ut)),zt(e,i),r===1&&De===0&&(t.mode&1)===0&&(oa=Ie()+500,Ki&&Kr()))}function zt(e,t){var r=e.callbackNode;jf(e,t);var i=Ri(e,e===st?ut:0);if(i===0)r!==null&&lt(r),e.callbackNode=null,e.callbackPriority=0;else if(t=i&-i,e.callbackPriority!==t){if(r!=null&&lt(r),t===1)e.tag===0?k0(Su.bind(null,e)):cd(Su.bind(null,e)),y0(function(){(De&6)===0&&Kr()}),r=null;else{switch(hc(i)){case 1:r=It;break;case 4:r=Pt;break;case 16:r=_r;break;case 536870912:r=or;break;default:r=_r}r=Fu(r,ju.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function ju(e,t){if(bl=-1,vl=0,(De&6)!==0)throw Error(s(327));var r=e.callbackNode;if(sa()&&e.callbackNode!==r)return null;var i=Ri(e,e===st?ut:0);if(i===0)return null;if((i&30)!==0||(i&e.expiredLanes)!==0||t)t=wl(e,i);else{t=i;var l=De;De|=2;var c=Nu();(st!==e||ut!==t)&&(Er=null,oa=Ie()+500,En(e,t));do try{W0();break}catch(y){Cu(e,y)}while(!0);Lo(),ml.current=c,De=l,rt!==null?t=0:(st=null,ut=0,t=it)}if(t!==0){if(t===2&&(l=Vl(e),l!==0&&(i=l,t=ms(e,l))),t===1)throw r=ti,En(e,0),tn(e,i),zt(e,Ie()),r;if(t===6)tn(e,i);else{if(l=e.current.alternate,(i&30)===0&&!O0(l)&&(t=wl(e,i),t===2&&(c=Vl(e),c!==0&&(i=c,t=ms(e,c))),t===1))throw r=ti,En(e,0),tn(e,i),zt(e,Ie()),r;switch(e.finishedWork=l,e.finishedLanes=i,t){case 0:case 1:throw Error(s(345));case 2:zn(e,Et,Er);break;case 3:if(tn(e,i),(i&130023424)===i&&(t=us+500-Ie(),10<t)){if(Ri(e,0)!==0)break;if(l=e.suspendedLanes,(l&i)!==i){wt(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=vo(zn.bind(null,e,Et,Er),t);break}zn(e,Et,Er);break;case 4:if(tn(e,i),(i&4194240)===i)break;for(t=e.eventTimes,l=-1;0<i;){var f=31-Oe(i);c=1<<f,f=t[f],f>l&&(l=f),i&=~c}if(i=l,i=Ie()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*$0(i/1960))-i,10<i){e.timeoutHandle=vo(zn.bind(null,e,Et,Er),i);break}zn(e,Et,Er);break;case 5:zn(e,Et,Er);break;default:throw Error(s(329))}}}return zt(e,Ie()),e.callbackNode===r?ju.bind(null,e):null}function ms(e,t){var r=ri;return e.current.memoizedState.isDehydrated&&(En(e,t).flags|=256),e=wl(e,t),e!==2&&(t=Et,Et=r,t!==null&&gs(t)),e}function gs(e){Et===null?Et=e:Et.push.apply(Et,e)}function O0(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var i=0;i<r.length;i++){var l=r[i],c=l.getSnapshot;l=l.value;try{if(!Jt(c(),l))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function tn(e,t){for(t&=~ds,t&=~gl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Oe(t),i=1<<r;e[r]=-1,t&=~i}}function Su(e){if((De&6)!==0)throw Error(s(327));sa();var t=Ri(e,0);if((t&1)===0)return zt(e,Ie()),null;var r=wl(e,t);if(e.tag!==0&&r===2){var i=Vl(e);i!==0&&(t=i,r=ms(e,i))}if(r===1)throw r=ti,En(e,0),tn(e,t),zt(e,Ie()),r;if(r===6)throw Error(s(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,zn(e,Et,Er),zt(e,Ie()),null}function hs(e,t){var r=De;De|=1;try{return e(t)}finally{De=r,De===0&&(oa=Ie()+500,Ki&&Kr())}}function Nn(e){Zr!==null&&Zr.tag===0&&(De&6)===0&&sa();var t=De;De|=1;var r=Ht.transition,i=$e;try{if(Ht.transition=null,$e=1,e)return e()}finally{$e=i,Ht.transition=r,De=t,(De&6)===0&&Kr()}}function xs(){Bt=la.current,Ge(la)}function En(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,x0(r)),rt!==null)for(r=rt.return;r!==null;){var i=r;switch(No(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Vi();break;case 3:na(),Ge(St),Ge(ft),Io();break;case 5:_o(i);break;case 4:na();break;case 13:Ge(Ke);break;case 19:Ge(Ke);break;case 10:Fo(i.type._context);break;case 22:case 23:xs()}r=r.return}if(st=e,rt=e=rn(e.current,null),ut=Bt=t,it=0,ti=null,ds=gl=Cn=0,Et=ri=null,kn!==null){for(t=0;t<kn.length;t++)if(r=kn[t],i=r.interleaved,i!==null){r.interleaved=null;var l=i.next,c=r.pending;if(c!==null){var f=c.next;c.next=l,i.next=f}r.pending=i}kn=null}return e}function Cu(e,t){do{var r=rt;try{if(Lo(),al.current=sl,il){for(var i=qe.memoizedState;i!==null;){var l=i.queue;l!==null&&(l.pending=null),i=i.next}il=!1}if(Sn=0,ot=at=qe=null,qa=!1,Qa=0,cs.current=null,r===null||r.return===null){it=1,ti=t,rt=null;break}e:{var c=e,f=r.return,y=r,C=t;if(t=ut,y.flags|=32768,C!==null&&typeof C=="object"&&typeof C.then=="function"){var D=C,H=y,G=H.tag;if((H.mode&1)===0&&(G===0||G===11||G===15)){var U=H.alternate;U?(H.updateQueue=U.updateQueue,H.memoizedState=U.memoizedState,H.lanes=U.lanes):(H.updateQueue=null,H.memoizedState=null)}var ee=Qd(f);if(ee!==null){ee.flags&=-257,Xd(ee,f,y,c,t),ee.mode&1&&qd(c,D,t),t=ee,C=D;var le=t.updateQueue;if(le===null){var se=new Set;se.add(C),t.updateQueue=se}else le.add(C);break e}else{if((t&1)===0){qd(c,D,t),ys();break e}C=Error(s(426))}}else if(Ye&&y.mode&1){var Ze=Qd(f);if(Ze!==null){(Ze.flags&65536)===0&&(Ze.flags|=256),Xd(Ze,f,y,c,t),Ro(aa(C,y));break e}}c=C=aa(C,y),it!==4&&(it=2),ri===null?ri=[c]:ri.push(c),c=f;do{switch(c.tag){case 3:c.flags|=65536,t&=-t,c.lanes|=t;var L=Yd(c,C,t);vd(c,L);break e;case 1:y=C;var E=c.type,F=c.stateNode;if((c.flags&128)===0&&(typeof E.getDerivedStateFromError=="function"||F!==null&&typeof F.componentDidCatch=="function"&&(Jr===null||!Jr.has(F)))){c.flags|=65536,t&=-t,c.lanes|=t;var V=Kd(c,y,t);vd(c,V);break e}}c=c.return}while(c!==null)}zu(r)}catch(de){t=de,rt===r&&r!==null&&(rt=r=r.return);continue}break}while(!0)}function Nu(){var e=ml.current;return ml.current=sl,e===null?sl:e}function ys(){(it===0||it===3||it===2)&&(it=4),st===null||(Cn&268435455)===0&&(gl&268435455)===0||tn(st,ut)}function wl(e,t){var r=De;De|=2;var i=Nu();(st!==e||ut!==t)&&(Er=null,En(e,t));do try{U0();break}catch(l){Cu(e,l)}while(!0);if(Lo(),De=r,ml.current=i,rt!==null)throw Error(s(261));return st=null,ut=0,it}function U0(){for(;rt!==null;)Eu(rt)}function W0(){for(;rt!==null&&!Ae();)Eu(rt)}function Eu(e){var t=Lu(e.alternate,e,Bt);e.memoizedProps=e.pendingProps,t===null?zu(e):rt=t,cs.current=null}function zu(e){var t=e;do{var r=t.alternate;if(e=t.return,(t.flags&32768)===0){if(r=D0(r,t,Bt),r!==null){rt=r;return}}else{if(r=M0(r,t),r!==null){r.flags&=32767,rt=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{it=6,rt=null;return}}if(t=t.sibling,t!==null){rt=t;return}rt=t=e}while(t!==null);it===0&&(it=5)}function zn(e,t,r){var i=$e,l=Ht.transition;try{Ht.transition=null,$e=1,H0(e,t,r,i)}finally{Ht.transition=l,$e=i}return null}function H0(e,t,r,i){do sa();while(Zr!==null);if((De&6)!==0)throw Error(s(327));r=e.finishedWork;var l=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(s(177));e.callbackNode=null,e.callbackPriority=0;var c=r.lanes|r.childLanes;if(Sf(e,c),e===st&&(rt=st=null,ut=0),(r.subtreeFlags&2064)===0&&(r.flags&2064)===0||xl||(xl=!0,Fu(_r,function(){return sa(),null})),c=(r.flags&15990)!==0,(r.subtreeFlags&15990)!==0||c){c=Ht.transition,Ht.transition=null;var f=$e;$e=1;var y=De;De|=4,cs.current=null,A0(e,r),yu(r,e),d0(yo),Fi=!!xo,yo=xo=null,e.current=r,I0(r),jt(),De=y,$e=f,Ht.transition=c}else e.current=r;if(xl&&(xl=!1,Zr=e,yl=l),c=e.pendingLanes,c===0&&(Jr=null),Be(r.stateNode),zt(e,Ie()),t!==null)for(i=e.onRecoverableError,r=0;r<t.length;r++)l=t[r],i(l.value,{componentStack:l.stack,digest:l.digest});if(hl)throw hl=!1,e=ps,ps=null,e;return(yl&1)!==0&&e.tag!==0&&sa(),c=e.pendingLanes,(c&1)!==0?e===fs?ni++:(ni=0,fs=e):ni=0,Kr(),null}function sa(){if(Zr!==null){var e=hc(yl),t=Ht.transition,r=$e;try{if(Ht.transition=null,$e=16>e?16:e,Zr===null)var i=!1;else{if(e=Zr,Zr=null,yl=0,(De&6)!==0)throw Error(s(331));var l=De;for(De|=4,ae=e.current;ae!==null;){var c=ae,f=c.child;if((ae.flags&16)!==0){var y=c.deletions;if(y!==null){for(var C=0;C<y.length;C++){var D=y[C];for(ae=D;ae!==null;){var H=ae;switch(H.tag){case 0:case 11:case 15:ei(8,H,c)}var G=H.child;if(G!==null)G.return=H,ae=G;else for(;ae!==null;){H=ae;var U=H.sibling,ee=H.return;if(fu(H),H===D){ae=null;break}if(U!==null){U.return=ee,ae=U;break}ae=ee}}}var le=c.alternate;if(le!==null){var se=le.child;if(se!==null){le.child=null;do{var Ze=se.sibling;se.sibling=null,se=Ze}while(se!==null)}}ae=c}}if((c.subtreeFlags&2064)!==0&&f!==null)f.return=c,ae=f;else e:for(;ae!==null;){if(c=ae,(c.flags&2048)!==0)switch(c.tag){case 0:case 11:case 15:ei(9,c,c.return)}var L=c.sibling;if(L!==null){L.return=c.return,ae=L;break e}ae=c.return}}var E=e.current;for(ae=E;ae!==null;){f=ae;var F=f.child;if((f.subtreeFlags&2064)!==0&&F!==null)F.return=f,ae=F;else e:for(f=E;ae!==null;){if(y=ae,(y.flags&2048)!==0)try{switch(y.tag){case 0:case 11:case 15:fl(9,y)}}catch(de){Xe(y,y.return,de)}if(y===f){ae=null;break e}var V=y.sibling;if(V!==null){V.return=y.return,ae=V;break e}ae=y.return}}if(De=l,Kr(),bt&&typeof bt.onPostCommitFiberRoot=="function")try{bt.onPostCommitFiberRoot(xr,e)}catch{}i=!0}return i}finally{$e=r,Ht.transition=t}}return!1}function Ru(e,t,r){t=aa(r,t),t=Yd(e,t,1),e=Qr(e,t,1),t=wt(),e!==null&&(Ea(e,1,t),zt(e,t))}function Xe(e,t,r){if(e.tag===3)Ru(e,e,r);else for(;t!==null;){if(t.tag===3){Ru(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Jr===null||!Jr.has(i))){e=aa(r,e),e=Kd(t,e,1),t=Qr(t,e,1),e=wt(),t!==null&&(Ea(t,1,e),zt(t,e));break}}t=t.return}}function G0(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),t=wt(),e.pingedLanes|=e.suspendedLanes&r,st===e&&(ut&r)===r&&(it===4||it===3&&(ut&130023424)===ut&&500>Ie()-us?En(e,0):ds|=r),zt(e,t)}function Pu(e,t){t===0&&((e.mode&1)===0?t=1:(t=hn,hn<<=1,(hn&130023424)===0&&(hn=4194304)));var r=wt();e=Sr(e,t),e!==null&&(Ea(e,t,r),zt(e,r))}function V0(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Pu(e,r)}function Y0(e,t){var r=0;switch(e.tag){case 13:var i=e.stateNode,l=e.memoizedState;l!==null&&(r=l.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(s(314))}i!==null&&i.delete(t),Pu(e,r)}var Lu;Lu=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||St.current)Nt=!0;else{if((e.lanes&r)===0&&(t.flags&128)===0)return Nt=!1,B0(e,t,r);Nt=(e.flags&131072)!==0}else Nt=!1,Ye&&(t.flags&1048576)!==0&&dd(t,Qi,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;ul(e,t),e=t.pendingProps;var l=Qn(t,ft.current);ra(t,r),l=Uo(null,t,i,e,l,r);var c=Wo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ct(i)?(c=!0,Yi(t)):c=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Do(t),l.updater=cl,t.stateNode=l,l._reactInternals=t,qo(t,i,e,r),t=Zo(null,t,i,!0,c,r)):(t.tag=0,Ye&&c&&Co(t),vt(null,t,l,r),t=t.child),t;case 16:i=t.elementType;e:{switch(ul(e,t),e=t.pendingProps,l=i._init,i=l(i._payload),t.type=i,l=t.tag=q0(i),e=er(i,e),l){case 0:t=Jo(null,t,i,e,r);break e;case 1:t=nu(null,t,i,e,r);break e;case 11:t=Jd(null,t,i,e,r);break e;case 14:t=Zd(null,t,i,er(i.type,e),r);break e}throw Error(s(306,i,""))}return t;case 0:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:er(i,l),Jo(e,t,i,l,r);case 1:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:er(i,l),nu(e,t,i,l,r);case 3:e:{if(au(t),e===null)throw Error(s(387));i=t.pendingProps,c=t.memoizedState,l=c.element,bd(e,t),rl(t,i,null,r);var f=t.memoizedState;if(i=f.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},t.updateQueue.baseState=c,t.memoizedState=c,t.flags&256){l=aa(Error(s(423)),t),t=iu(e,t,i,r,l);break e}else if(i!==l){l=aa(Error(s(424)),t),t=iu(e,t,i,r,l);break e}else for(Tt=Gr(t.stateNode.containerInfo.firstChild),Ft=t,Ye=!0,Zt=null,r=xd(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Zn(),i===l){t=Nr(e,t,r);break e}vt(e,t,i,r)}t=t.child}return t;case 5:return kd(t),e===null&&zo(t),i=t.type,l=t.pendingProps,c=e!==null?e.memoizedProps:null,f=l.children,bo(i,l)?f=null:c!==null&&bo(i,c)&&(t.flags|=32),ru(e,t),vt(e,t,f,r),t.child;case 6:return e===null&&zo(t),null;case 13:return lu(e,t,r);case 4:return Mo(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=ea(t,null,i,r):vt(e,t,i,r),t.child;case 11:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:er(i,l),Jd(e,t,i,l,r);case 7:return vt(e,t,t.pendingProps,r),t.child;case 8:return vt(e,t,t.pendingProps.children,r),t.child;case 12:return vt(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(i=t.type._context,l=t.pendingProps,c=t.memoizedProps,f=l.value,We(Zi,i._currentValue),i._currentValue=f,c!==null)if(Jt(c.value,f)){if(c.children===l.children&&!St.current){t=Nr(e,t,r);break e}}else for(c=t.child,c!==null&&(c.return=t);c!==null;){var y=c.dependencies;if(y!==null){f=c.child;for(var C=y.firstContext;C!==null;){if(C.context===i){if(c.tag===1){C=Cr(-1,r&-r),C.tag=2;var D=c.updateQueue;if(D!==null){D=D.shared;var H=D.pending;H===null?C.next=C:(C.next=H.next,H.next=C),D.pending=C}}c.lanes|=r,C=c.alternate,C!==null&&(C.lanes|=r),To(c.return,r,t),y.lanes|=r;break}C=C.next}}else if(c.tag===10)f=c.type===t.type?null:c.child;else if(c.tag===18){if(f=c.return,f===null)throw Error(s(341));f.lanes|=r,y=f.alternate,y!==null&&(y.lanes|=r),To(f,r,t),f=c.sibling}else f=c.child;if(f!==null)f.return=c;else for(f=c;f!==null;){if(f===t){f=null;break}if(c=f.sibling,c!==null){c.return=f.return,f=c;break}f=f.return}c=f}vt(e,t,l.children,r),t=t.child}return t;case 9:return l=t.type,i=t.pendingProps.children,ra(t,r),l=Ut(l),i=i(l),t.flags|=1,vt(e,t,i,r),t.child;case 14:return i=t.type,l=er(i,t.pendingProps),l=er(i.type,l),Zd(e,t,i,l,r);case 15:return eu(e,t,t.type,t.pendingProps,r);case 17:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:er(i,l),ul(e,t),t.tag=1,Ct(i)?(e=!0,Yi(t)):e=!1,ra(t,r),Gd(t,i,l),qo(t,i,l,r),Zo(null,t,i,!0,e,r);case 19:return su(e,t,r);case 22:return tu(e,t,r)}throw Error(s(156,t.tag))};function Fu(e,t){return Je(e,t)}function K0(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Gt(e,t,r,i){return new K0(e,t,r,i)}function bs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function q0(e){if(typeof e=="function")return bs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Re)return 11;if(e===pe)return 14}return 2}function rn(e,t){var r=e.alternate;return r===null?(r=Gt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function kl(e,t,r,i,l,c){var f=2;if(i=e,typeof e=="function")bs(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case j:return Rn(r.children,l,c,t);case B:f=8,l|=8;break;case X:return e=Gt(12,r,t,l|2),e.elementType=X,e.lanes=c,e;case Ce:return e=Gt(13,r,t,l),e.elementType=Ce,e.lanes=c,e;case O:return e=Gt(19,r,t,l),e.elementType=O,e.lanes=c,e;case je:return jl(r,l,c,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ye:f=10;break e;case ze:f=9;break e;case Re:f=11;break e;case pe:f=14;break e;case he:f=16,i=null;break e}throw Error(s(130,e==null?e:typeof e,""))}return t=Gt(f,r,t,l),t.elementType=e,t.type=i,t.lanes=c,t}function Rn(e,t,r,i){return e=Gt(7,e,i,t),e.lanes=r,e}function jl(e,t,r,i){return e=Gt(22,e,i,t),e.elementType=je,e.lanes=r,e.stateNode={isHidden:!1},e}function vs(e,t,r){return e=Gt(6,e,null,t),e.lanes=r,e}function ws(e,t,r){return t=Gt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Q0(e,t,r,i,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Yl(0),this.expirationTimes=Yl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yl(0),this.identifierPrefix=i,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ks(e,t,r,i,l,c,f,y,C){return e=new Q0(e,t,r,y,C),t===1?(t=1,c===!0&&(t|=8)):t=0,c=Gt(3,null,null,t),e.current=c,c.stateNode=e,c.memoizedState={element:i,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Do(c),e}function X0(e,t,r){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Z,key:i==null?null:""+i,children:e,containerInfo:t,implementation:r}}function Tu(e){if(!e)return Yr;e=e._reactInternals;e:{if(oe(e)!==e||e.tag!==1)throw Error(s(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ct(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(s(171))}if(e.tag===1){var r=e.type;if(Ct(r))return od(e,r,t)}return t}function Bu(e,t,r,i,l,c,f,y,C){return e=ks(r,i,!0,e,l,c,f,y,C),e.context=Tu(null),r=e.current,i=wt(),l=en(r),c=Cr(i,l),c.callback=t??null,Qr(r,c,l),e.current.lanes=l,Ea(e,l,i),zt(e,i),e}function Sl(e,t,r,i){var l=t.current,c=wt(),f=en(l);return r=Tu(r),t.context===null?t.context=r:t.pendingContext=r,t=Cr(c,f),t.payload={element:e},i=i===void 0?null:i,i!==null&&(t.callback=i),e=Qr(l,t,f),e!==null&&(nr(e,l,f,c),tl(e,l,f)),f}function Cl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Du(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function js(e,t){Du(e,t),(e=e.alternate)&&Du(e,t)}function J0(){return null}var Mu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ss(e){this._internalRoot=e}Nl.prototype.render=Ss.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));Sl(e,t,null,null)},Nl.prototype.unmount=Ss.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Nn(function(){Sl(null,e,null,null)}),t[vr]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=bc();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Ur.length&&t!==0&&t<Ur[r].priority;r++);Ur.splice(r,0,e),r===0&&kc(e)}};function Cs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function El(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function _u(){}function Z0(e,t,r,i,l){if(l){if(typeof i=="function"){var c=i;i=function(){var D=Cl(f);c.call(D)}}var f=Bu(t,i,e,0,null,!1,!1,"",_u);return e._reactRootContainer=f,e[vr]=f.current,Oa(e.nodeType===8?e.parentNode:e),Nn(),f}for(;l=e.lastChild;)e.removeChild(l);if(typeof i=="function"){var y=i;i=function(){var D=Cl(C);y.call(D)}}var C=ks(e,0,!1,null,null,!1,!1,"",_u);return e._reactRootContainer=C,e[vr]=C.current,Oa(e.nodeType===8?e.parentNode:e),Nn(function(){Sl(t,C,r,i)}),C}function zl(e,t,r,i,l){var c=r._reactRootContainer;if(c){var f=c;if(typeof l=="function"){var y=l;l=function(){var C=Cl(f);y.call(C)}}Sl(t,f,e,l)}else f=Z0(r,t,e,l,i);return Cl(f)}xc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=xn(t.pendingLanes);r!==0&&(Kl(t,r|1),zt(t,Ie()),(De&6)===0&&(oa=Ie()+500,Kr()))}break;case 13:Nn(function(){var i=Sr(e,1);if(i!==null){var l=wt();nr(i,e,1,l)}}),js(e,1)}},ql=function(e){if(e.tag===13){var t=Sr(e,134217728);if(t!==null){var r=wt();nr(t,e,134217728,r)}js(e,134217728)}},yc=function(e){if(e.tag===13){var t=en(e),r=Sr(e,t);if(r!==null){var i=wt();nr(r,e,t,i)}js(e,t)}},bc=function(){return $e},vc=function(e,t){var r=$e;try{return $e=e,t()}finally{$e=r}},Dr=function(e,t,r){switch(t){case"input":if(ya(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var l=Gi(i);if(!l)throw Error(s(90));nt(i),ya(i,l)}}}break;case"textarea":ir(e,r);break;case"select":t=r.value,t!=null&&Fr(e,!!r.multiple,t,!1)}},Sa=hs,pn=Nn;var em={usingClientEntryPoint:!1,Events:[Ha,Kn,Gi,ja,zi,hs]},ai={findFiberByHostInstance:yn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},tm={bundleType:ai.bundleType,version:ai.version,rendererPackageName:ai.rendererPackageName,rendererConfig:ai.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ne.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Te(e),e===null?null:e.stateNode},findFiberByHostInstance:ai.findFiberByHostInstance||J0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rl.isDisabled&&Rl.supportsFiber)try{xr=Rl.inject(tm),bt=Rl}catch{}}return Rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=em,Rt.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Cs(t))throw Error(s(200));return X0(e,t,null,r)},Rt.createRoot=function(e,t){if(!Cs(e))throw Error(s(299));var r=!1,i="",l=Mu;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ks(e,1,!1,null,null,r,!1,i,l),e[vr]=t.current,Oa(e.nodeType===8?e.parentNode:e),new Ss(t)},Rt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=Te(t),e=e===null?null:e.stateNode,e},Rt.flushSync=function(e){return Nn(e)},Rt.hydrate=function(e,t,r){if(!El(t))throw Error(s(200));return zl(null,e,t,!0,r)},Rt.hydrateRoot=function(e,t,r){if(!Cs(e))throw Error(s(405));var i=r!=null&&r.hydratedSources||null,l=!1,c="",f=Mu;if(r!=null&&(r.unstable_strictMode===!0&&(l=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(f=r.onRecoverableError)),t=Bu(t,null,e,1,r??null,l,!1,c,f),e[vr]=t.current,Oa(e),i)for(e=0;e<i.length;e++)r=i[e],l=r._getVersion,l=l(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,l]:t.mutableSourceEagerHydrationData.push(r,l);return new Nl(t)},Rt.render=function(e,t,r){if(!El(t))throw Error(s(200));return zl(null,e,t,!1,r)},Rt.unmountComponentAtNode=function(e){if(!El(e))throw Error(s(40));return e._reactRootContainer?(Nn(function(){zl(null,null,e,!1,function(){e._reactRootContainer=null,e[vr]=null})}),!0):!1},Rt.unstable_batchedUpdates=hs,Rt.unstable_renderSubtreeIntoContainer=function(e,t,r,i){if(!El(r))throw Error(s(200));if(e==null||e._reactInternals===void 0)throw Error(s(38));return zl(e,t,r,!1,i)},Rt.version="18.3.1-next-f1338f8080-20240426",Rt}var Gu;function um(){if(Gu)return zs.exports;Gu=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(o){console.error(o)}}return a(),zs.exports=dm(),zs.exports}var Vu;function pm(){if(Vu)return Pl;Vu=1;var a=um();return Pl.createRoot=a.createRoot,Pl.hydrateRoot=a.hydrateRoot,Pl}var fm=pm(),v=tc();const mm=am(v),gm=nm({__proto__:null,default:mm},[v]);/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Bp=a=>{throw TypeError(a)},hm=(a,o,s)=>o.has(a)||Bp("Cannot "+s),Ls=(a,o,s)=>(hm(a,o,"read from private field"),s?s.call(a):o.get(a)),xm=(a,o,s)=>o.has(a)?Bp("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(a):o.set(a,s),Yu="popstate";function ym(a={}){function o(d,p){let{pathname:u,search:m,hash:g}=d.location;return fi("",{pathname:u,search:m,hash:g},p.state&&p.state.usr||null,p.state&&p.state.key||"default")}function s(d,p){return typeof p=="string"?p:fr(p)}return vm(o,s,null,a)}function Le(a,o){if(a===!1||a===null||typeof a>"u")throw new Error(o)}function et(a,o){if(!a){typeof console<"u"&&console.warn(o);try{throw new Error(o)}catch{}}}function bm(){return Math.random().toString(36).substring(2,10)}function Ku(a,o){return{usr:a.state,key:a.key,idx:o}}function fi(a,o,s=null,d){return{pathname:typeof a=="string"?a:a.pathname,search:"",hash:"",...typeof o=="string"?sn(o):o,state:s,key:o&&o.key||d||bm()}}function fr({pathname:a="/",search:o="",hash:s=""}){return o&&o!=="?"&&(a+=o.charAt(0)==="?"?o:"?"+o),s&&s!=="#"&&(a+=s.charAt(0)==="#"?s:"#"+s),a}function sn(a){let o={};if(a){let s=a.indexOf("#");s>=0&&(o.hash=a.substring(s),a=a.substring(0,s));let d=a.indexOf("?");d>=0&&(o.search=a.substring(d),a=a.substring(0,d)),a&&(o.pathname=a)}return o}function vm(a,o,s,d={}){let{window:p=document.defaultView,v5Compat:u=!1}=d,m=p.history,g="POP",h=null,x=S();x==null&&(x=0,m.replaceState({...m.state,idx:x},""));function S(){return(m.state||{idx:null}).idx}function b(){g="POP";let _=S(),q=_==null?null:_-x;x=_,h&&h({action:g,location:A.location,delta:q})}function N(_,q){g="PUSH";let $=fi(A.location,_,q);x=S()+1;let J=Ku($,x),ne=A.createHref($);try{m.pushState(J,"",ne)}catch(Q){if(Q instanceof DOMException&&Q.name==="DataCloneError")throw Q;p.location.assign(ne)}u&&h&&h({action:g,location:A.location,delta:1})}function w(_,q){g="REPLACE";let $=fi(A.location,_,q);x=S();let J=Ku($,x),ne=A.createHref($);m.replaceState(J,"",ne),u&&h&&h({action:g,location:A.location,delta:0})}function M(_){return Dp(_)}let A={get action(){return g},get location(){return a(p,m)},listen(_){if(h)throw new Error("A history only accepts one active listener");return p.addEventListener(Yu,b),h=_,()=>{p.removeEventListener(Yu,b),h=null}},createHref(_){return o(p,_)},createURL:M,encodeLocation(_){let q=M(_);return{pathname:q.pathname,search:q.search,hash:q.hash}},push:N,replace:w,go(_){return m.go(_)}};return A}function Dp(a,o=!1){let s="http://localhost";typeof window<"u"&&(s=window.location.origin!=="null"?window.location.origin:window.location.href),Le(s,"No window.location.(origin|href) available to create URL");let d=typeof a=="string"?a:fr(a);return d=d.replace(/ $/,"%20"),!o&&d.startsWith("//")&&(d=s+d),new URL(d,s)}var di,qu=class{constructor(a){if(xm(this,di,new Map),a)for(let[o,s]of a)this.set(o,s)}get(a){if(Ls(this,di).has(a))return Ls(this,di).get(a);if(a.defaultValue!==void 0)return a.defaultValue;throw new Error("No value found for context")}set(a,o){Ls(this,di).set(a,o)}};di=new WeakMap;var wm=new Set(["lazy","caseSensitive","path","id","index","children"]);function km(a){return wm.has(a)}var jm=new Set(["lazy","caseSensitive","path","id","index","middleware","children"]);function Sm(a){return jm.has(a)}function Cm(a){return a.index===!0}function mi(a,o,s=[],d={},p=!1){return a.map((u,m)=>{let g=[...s,String(m)],h=typeof u.id=="string"?u.id:g.join("-");if(Le(u.index!==!0||!u.children,"Cannot specify children on an index route"),Le(p||!d[h],`Found a route id collision on id "${h}".  Route id's must be globally unique within Data Router usages`),Cm(u)){let x={...u,id:h};return d[h]=Qu(x,o(x)),x}else{let x={...u,id:h,children:void 0};return d[h]=Qu(x,o(x)),u.children&&(x.children=mi(u.children,o,g,d,p)),x}})}function Qu(a,o){return Object.assign(a,{...o,...typeof o.lazy=="object"&&o.lazy!=null?{lazy:{...a.lazy,...o.lazy}}:{}})}function an(a,o,s="/"){return ui(a,o,s,!1)}function ui(a,o,s,d){let p=typeof o=="string"?sn(o):o,u=qt(p.pathname||"/",s);if(u==null)return null;let m=Mp(a);Em(m);let g=null;for(let h=0;g==null&&h<m.length;++h){let x=Am(u);g=Mm(m[h],x,d)}return g}function Nm(a,o){let{route:s,pathname:d,params:p}=a;return{id:s.id,pathname:d,params:p,data:o[s.id],loaderData:o[s.id],handle:s.handle}}function Mp(a,o=[],s=[],d="",p=!1){let u=(m,g,h=p,x)=>{let S={relativePath:x===void 0?m.path||"":x,caseSensitive:m.caseSensitive===!0,childrenIndex:g,route:m};if(S.relativePath.startsWith("/")){if(!S.relativePath.startsWith(d)&&h)return;Le(S.relativePath.startsWith(d),`Absolute route path "${S.relativePath}" nested under path "${d}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),S.relativePath=S.relativePath.slice(d.length)}let b=pr([d,S.relativePath]),N=s.concat(S);m.children&&m.children.length>0&&(Le(m.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${b}".`),Mp(m.children,o,N,b,h)),!(m.path==null&&!m.index)&&o.push({path:b,score:Bm(b,m.index),routesMeta:N})};return a.forEach((m,g)=>{var h;if(m.path===""||!((h=m.path)!=null&&h.includes("?")))u(m,g);else for(let x of _p(m.path))u(m,g,!0,x)}),o}function _p(a){let o=a.split("/");if(o.length===0)return[];let[s,...d]=o,p=s.endsWith("?"),u=s.replace(/\?$/,"");if(d.length===0)return p?[u,""]:[u];let m=_p(d.join("/")),g=[];return g.push(...m.map(h=>h===""?u:[u,h].join("/"))),p&&g.push(...m),g.map(h=>a.startsWith("/")&&h===""?"/":h)}function Em(a){a.sort((o,s)=>o.score!==s.score?s.score-o.score:Dm(o.routesMeta.map(d=>d.childrenIndex),s.routesMeta.map(d=>d.childrenIndex)))}var zm=/^:[\w-]+$/,Rm=3,Pm=2,Lm=1,Fm=10,Tm=-2,Xu=a=>a==="*";function Bm(a,o){let s=a.split("/"),d=s.length;return s.some(Xu)&&(d+=Tm),o&&(d+=Pm),s.filter(p=>!Xu(p)).reduce((p,u)=>p+(zm.test(u)?Rm:u===""?Lm:Fm),d)}function Dm(a,o){return a.length===o.length&&a.slice(0,-1).every((d,p)=>d===o[p])?a[a.length-1]-o[o.length-1]:0}function Mm(a,o,s=!1){let{routesMeta:d}=a,p={},u="/",m=[];for(let g=0;g<d.length;++g){let h=d[g],x=g===d.length-1,S=u==="/"?o:o.slice(u.length)||"/",b=Ol({path:h.relativePath,caseSensitive:h.caseSensitive,end:x},S),N=h.route;if(!b&&x&&s&&!d[d.length-1].route.index&&(b=Ol({path:h.relativePath,caseSensitive:h.caseSensitive,end:!1},S)),!b)return null;Object.assign(p,b.params),m.push({params:p,pathname:pr([u,b.pathname]),pathnameBase:Om(pr([u,b.pathnameBase])),route:N}),b.pathnameBase!=="/"&&(u=pr([u,b.pathnameBase]))}return m}function Ol(a,o){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[s,d]=_m(a.path,a.caseSensitive,a.end),p=o.match(s);if(!p)return null;let u=p[0],m=u.replace(/(.)\/+$/,"$1"),g=p.slice(1);return{params:d.reduce((x,{paramName:S,isOptional:b},N)=>{if(S==="*"){let M=g[N]||"";m=u.slice(0,u.length-M.length).replace(/(.)\/+$/,"$1")}const w=g[N];return b&&!w?x[S]=void 0:x[S]=(w||"").replace(/%2F/g,"/"),x},{}),pathname:u,pathnameBase:m,pattern:a}}function _m(a,o=!1,s=!0){et(a==="*"||!a.endsWith("*")||a.endsWith("/*"),`Route path "${a}" will be treated as if it were "${a.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/,"/*")}".`);let d=[],p="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(m,g,h)=>(d.push({paramName:g,isOptional:h!=null}),h?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return a.endsWith("*")?(d.push({paramName:"*"}),p+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):s?p+="\\/*$":a!==""&&a!=="/"&&(p+="(?:(?=\\/|$))"),[new RegExp(p,o?void 0:"i"),d]}function Am(a){try{return a.split("/").map(o=>decodeURIComponent(o).replace(/\//g,"%2F")).join("/")}catch(o){return et(!1,`The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`),a}}function qt(a,o){if(o==="/")return a;if(!a.toLowerCase().startsWith(o.toLowerCase()))return null;let s=o.endsWith("/")?o.length-1:o.length,d=a.charAt(s);return d&&d!=="/"?null:a.slice(s)||"/"}function Im({basename:a,pathname:o}){return o==="/"?a:pr([a,o])}var Ap=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,rc=a=>Ap.test(a);function $m(a,o="/"){let{pathname:s,search:d="",hash:p=""}=typeof a=="string"?sn(a):a,u;return s?(s=s.replace(/\/\/+/g,"/"),s.startsWith("/")?u=Ju(s.substring(1),"/"):u=Ju(s,o)):u=o,{pathname:u,search:Um(d),hash:Wm(p)}}function Ju(a,o){let s=o.replace(/\/+$/,"").split("/");return a.split("/").forEach(p=>{p===".."?s.length>1&&s.pop():p!=="."&&s.push(p)}),s.length>1?s.join("/"):"/"}function Fs(a,o,s,d){return`Cannot include a '${a}' character in a manually specified \`to.${o}\` field [${JSON.stringify(d)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ip(a){return a.filter((o,s)=>s===0||o.route.path&&o.route.path.length>0)}function nc(a){let o=Ip(a);return o.map((s,d)=>d===o.length-1?s.pathname:s.pathnameBase)}function ac(a,o,s,d=!1){let p;typeof a=="string"?p=sn(a):(p={...a},Le(!p.pathname||!p.pathname.includes("?"),Fs("?","pathname","search",p)),Le(!p.pathname||!p.pathname.includes("#"),Fs("#","pathname","hash",p)),Le(!p.search||!p.search.includes("#"),Fs("#","search","hash",p)));let u=a===""||p.pathname==="",m=u?"/":p.pathname,g;if(m==null)g=s;else{let b=o.length-1;if(!d&&m.startsWith("..")){let N=m.split("/");for(;N[0]==="..";)N.shift(),b-=1;p.pathname=N.join("/")}g=b>=0?o[b]:"/"}let h=$m(p,g),x=m&&m!=="/"&&m.endsWith("/"),S=(u||m===".")&&s.endsWith("/");return!h.pathname.endsWith("/")&&(x||S)&&(h.pathname+="/"),h}var pr=a=>a.join("/").replace(/\/\/+/g,"/"),Om=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),Um=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,Wm=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a,xi=class{constructor(a,o,s,d=!1){this.status=a,this.statusText=o||"",this.internal=d,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}};function gi(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}function yi(a){return a.map(o=>o.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var $p=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Op(a,o){let s=a;if(typeof s!="string"||!Ap.test(s))return{absoluteURL:void 0,isExternal:!1,to:s};let d=s,p=!1;if($p)try{let u=new URL(window.location.href),m=s.startsWith("//")?new URL(u.protocol+s):new URL(s),g=qt(m.pathname,o);m.origin===u.origin&&g!=null?s=g+m.search+m.hash:p=!0}catch{et(!1,`<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:d,isExternal:p,to:s}}var on=Symbol("Uninstrumented");function Hm(a,o){let s={lazy:[],"lazy.loader":[],"lazy.action":[],"lazy.middleware":[],middleware:[],loader:[],action:[]};a.forEach(p=>p({id:o.id,index:o.index,path:o.path,instrument(u){let m=Object.keys(s);for(let g of m)u[g]&&s[g].push(u[g])}}));let d={};if(typeof o.lazy=="function"&&s.lazy.length>0){let p=ua(s.lazy,o.lazy,()=>{});p&&(d.lazy=p)}if(typeof o.lazy=="object"){let p=o.lazy;["middleware","loader","action"].forEach(u=>{let m=p[u],g=s[`lazy.${u}`];if(typeof m=="function"&&g.length>0){let h=ua(g,m,()=>{});h&&(d.lazy=Object.assign(d.lazy||{},{[u]:h}))}})}return["loader","action"].forEach(p=>{let u=o[p];if(typeof u=="function"&&s[p].length>0){let m=u[on]??u,g=ua(s[p],m,(...h)=>Zu(h[0]));g&&(p==="loader"&&m.hydrate===!0&&(g.hydrate=!0),g[on]=m,d[p]=g)}}),o.middleware&&o.middleware.length>0&&s.middleware.length>0&&(d.middleware=o.middleware.map(p=>{let u=p[on]??p,m=ua(s.middleware,u,(...g)=>Zu(g[0]));return m?(m[on]=u,m):p})),d}function Gm(a,o){let s={navigate:[],fetch:[]};if(o.forEach(d=>d({instrument(p){let u=Object.keys(p);for(let m of u)p[m]&&s[m].push(p[m])}})),s.navigate.length>0){let d=a.navigate[on]??a.navigate,p=ua(s.navigate,d,(...u)=>{let[m,g]=u;return{to:typeof m=="number"||typeof m=="string"?m:m?fr(m):".",...ep(a,g??{})}});p&&(p[on]=d,a.navigate=p)}if(s.fetch.length>0){let d=a.fetch[on]??a.fetch,p=ua(s.fetch,d,(...u)=>{let[m,,g,h]=u;return{href:g??".",fetcherKey:m,...ep(a,h??{})}});p&&(p[on]=d,a.fetch=p)}return a}function ua(a,o,s){return a.length===0?null:async(...d)=>{let p=await Up(a,s(...d),()=>o(...d),a.length-1);if(p.type==="error")throw p.value;return p.value}}async function Up(a,o,s,d){let p=a[d],u;if(p){let m,g=async()=>(m?console.error("You cannot call instrumented handlers more than once"):m=Up(a,o,s,d-1),u=await m,Le(u,"Expected a result"),u.type==="error"&&u.value instanceof Error?{status:"error",error:u.value}:{status:"success",error:void 0});try{await p(g,o)}catch(h){console.error("An instrumentation function threw an error:",h)}m||await g(),await m}else try{u={type:"success",value:await s()}}catch(m){u={type:"error",value:m}}return u||{type:"error",value:new Error("No result assigned in instrumentation chain.")}}function Zu(a){let{request:o,context:s,params:d,unstable_pattern:p}=a;return{request:Vm(o),params:{...d},unstable_pattern:p,context:Ym(s)}}function ep(a,o){return{currentUrl:fr(a.state.location),..."formMethod"in o?{formMethod:o.formMethod}:{},..."formEncType"in o?{formEncType:o.formEncType}:{},..."formData"in o?{formData:o.formData}:{},..."body"in o?{body:o.body}:{}}}function Vm(a){return{method:a.method,url:a.url,headers:{get:(...o)=>a.headers.get(...o)}}}function Ym(a){if(qm(a)){let o={...a};return Object.freeze(o),o}else return{get:o=>a.get(o)}}var Km=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function qm(a){if(a===null||typeof a!="object")return!1;const o=Object.getPrototypeOf(a);return o===Object.prototype||o===null||Object.getOwnPropertyNames(o).sort().join("\0")===Km}var Wp=["POST","PUT","PATCH","DELETE"],Qm=new Set(Wp),Xm=["GET",...Wp],Jm=new Set(Xm),Hp=new Set([301,302,303,307,308]),Zm=new Set([307,308]),Ts={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},eg={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},li={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},tg=a=>({hasErrorBoundary:!!a.hasErrorBoundary}),Gp="remix-router-transitions",Vp=Symbol("ResetLoaderData");function rg(a){const o=a.window?a.window:typeof window<"u"?window:void 0,s=typeof o<"u"&&typeof o.document<"u"&&typeof o.document.createElement<"u";Le(a.routes.length>0,"You must provide a non-empty routes array to createRouter");let d=a.hydrationRouteProperties||[],p=a.mapRouteProperties||tg,u=p;if(a.unstable_instrumentations){let k=a.unstable_instrumentations;u=P=>({...p(P),...Hm(k.map(T=>T.route).filter(Boolean),P)})}let m={},g=mi(a.routes,u,void 0,m),h,x=a.basename||"/";x.startsWith("/")||(x=`/${x}`);let S=a.dataStrategy||og,b={...a.future},N=null,w=new Set,M=null,A=null,_=null,q=a.hydrationData!=null,$=an(g,a.history.location,x),J=!1,ne=null,Q;if($==null&&!a.patchRoutesOnNavigation){let k=Yt(404,{pathname:a.history.location.pathname}),{matches:P,route:T}=Ll(g);Q=!0,$=P,ne={[T.id]:k}}else if($&&!a.hydrationData&&pn($,g,a.history.location.pathname).active&&($=null),$)if($.some(k=>k.route.lazy))Q=!1;else if(!$.some(k=>ic(k.route)))Q=!0;else{let k=a.hydrationData?a.hydrationData.loaderData:null,P=a.hydrationData?a.hydrationData.errors:null;if(P){let T=$.findIndex(W=>P[W.route.id]!==void 0);Q=$.slice(0,T+1).every(W=>!Ys(W.route,k,P))}else Q=$.every(T=>!Ys(T.route,k,P))}else{Q=!1,$=[];let k=pn(null,g,a.history.location.pathname);k.active&&k.matches&&(J=!0,$=k.matches)}let Z,j={historyAction:a.history.action,location:a.history.location,matches:$,initialized:Q,navigation:Ts,restoreScrollPosition:a.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:a.hydrationData&&a.hydrationData.loaderData||{},actionData:a.hydrationData&&a.hydrationData.actionData||null,errors:a.hydrationData&&a.hydrationData.errors||ne,fetchers:new Map,blockers:new Map},B="POP",X=null,ye=!1,ze,Re=!1,Ce=new Map,O=null,pe=!1,he=!1,je=new Set,z=new Map,te=0,Y=-1,R=new Map,I=new Set,xe=new Map,ve=new Map,be=new Set,Ne=new Map,_e,Fe=null;function Ue(){if(N=a.history.listen(({action:k,location:P,delta:T})=>{if(_e){_e(),_e=void 0;return}et(Ne.size===0||T!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let W=hr({currentLocation:j.location,nextLocation:P,historyAction:k});if(W&&T!=null){let K=new Promise(ce=>{_e=ce});a.history.go(T*-1),Dr(W,{state:"blocked",location:P,proceed(){Dr(W,{state:"proceeding",proceed:void 0,reset:void 0,location:P}),K.then(()=>a.history.go(T))},reset(){let ce=new Map(j.blockers);ce.set(W,li),nt({blockers:ce})}}),X==null||X.resolve(),X=null;return}return ar(k,P)}),s){Cg(o,Ce);let k=()=>Ng(o,Ce);o.addEventListener("pagehide",k),O=()=>o.removeEventListener("pagehide",k)}return j.initialized||ar("POP",j.location,{initialHydration:!0}),Z}function yt(){N&&N(),O&&O(),w.clear(),ze&&ze.abort(),j.fetchers.forEach((k,P)=>wa(P)),j.blockers.forEach((k,P)=>$n(P))}function Dn(k){return w.add(k),()=>w.delete(k)}function nt(k,P={}){k.matches&&(k.matches=k.matches.map(K=>{let ce=m[K.route.id],fe=K.route;return fe.element!==ce.element||fe.errorElement!==ce.errorElement||fe.hydrateFallbackElement!==ce.hydrateFallbackElement?{...K,route:ce}:K})),j={...j,...k};let T=[],W=[];j.fetchers.forEach((K,ce)=>{K.state==="idle"&&(be.has(ce)?T.push(ce):W.push(ce))}),be.forEach(K=>{!j.fetchers.has(K)&&!z.has(K)&&T.push(K)}),[...w].forEach(K=>K(j,{deletedFetchers:T,newErrors:k.errors??null,viewTransitionOpts:P.viewTransitionOpts,flushSync:P.flushSync===!0})),T.forEach(K=>wa(K)),W.forEach(K=>j.fetchers.delete(K))}function Xt(k,P,{flushSync:T}={}){var Se,ue;let W=j.actionData!=null&&j.navigation.formMethod!=null&&xt(j.navigation.formMethod)&&j.navigation.state==="loading"&&((Se=k.state)==null?void 0:Se._isRedirect)!==!0,K;P.actionData?Object.keys(P.actionData).length>0?K=P.actionData:K=null:W?K=j.actionData:K=null;let ce=P.loaderData?dp(j.loaderData,P.loaderData,P.matches||[],P.errors):j.loaderData,fe=j.blockers;fe.size>0&&(fe=new Map(fe),fe.forEach((Ee,Te)=>fe.set(Te,li)));let re=pe?!1:Sa(k,P.matches||j.matches),ie=ye===!0||j.navigation.formMethod!=null&&xt(j.navigation.formMethod)&&((ue=k.state)==null?void 0:ue._isRedirect)!==!0;h&&(g=h,h=void 0),pe||B==="POP"||(B==="PUSH"?a.history.push(k,k.state):B==="REPLACE"&&a.history.replace(k,k.state));let oe;if(B==="POP"){let Ee=Ce.get(j.location.pathname);Ee&&Ee.has(k.pathname)?oe={currentLocation:j.location,nextLocation:k}:Ce.has(k.pathname)&&(oe={currentLocation:k,nextLocation:j.location})}else if(Re){let Ee=Ce.get(j.location.pathname);Ee?Ee.add(k.pathname):(Ee=new Set([k.pathname]),Ce.set(j.location.pathname,Ee)),oe={currentLocation:j.location,nextLocation:k}}nt({...P,actionData:K,loaderData:ce,historyAction:B,location:k,initialized:!0,navigation:Ts,revalidation:"idle",restoreScrollPosition:re,preventScrollReset:ie,blockers:fe},{viewTransitionOpts:oe,flushSync:T===!0}),B="POP",ye=!1,Re=!1,pe=!1,he=!1,X==null||X.resolve(),X=null,Fe==null||Fe.resolve(),Fe=null}async function Mn(k,P){if(X==null||X.resolve(),X=null,typeof k=="number"){X||(X=mp());let Te=X.promise;return a.history.go(k),Te}let T=Vs(j.location,j.matches,x,k,P==null?void 0:P.fromRouteId,P==null?void 0:P.relative),{path:W,submission:K,error:ce}=tp(!1,T,P),fe=j.location,re=fi(j.location,W,P&&P.state);re={...re,...a.history.encodeLocation(re)};let ie=P&&P.replace!=null?P.replace:void 0,oe="PUSH";ie===!0?oe="REPLACE":ie===!1||K!=null&&xt(K.formMethod)&&K.formAction===j.location.pathname+j.location.search&&(oe="REPLACE");let Se=P&&"preventScrollReset"in P?P.preventScrollReset===!0:void 0,ue=(P&&P.flushSync)===!0,Ee=hr({currentLocation:fe,nextLocation:re,historyAction:oe});if(Ee){Dr(Ee,{state:"blocked",location:re,proceed(){Dr(Ee,{state:"proceeding",proceed:void 0,reset:void 0,location:re}),Mn(k,P)},reset(){let Te=new Map(j.blockers);Te.set(Ee,li),nt({blockers:Te})}});return}await ar(oe,re,{submission:K,pendingError:ce,preventScrollReset:Se,replace:P&&P.replace,enableViewTransition:P&&P.viewTransition,flushSync:ue,callSiteDefaultShouldRevalidate:P&&P.unstable_defaultShouldRevalidate})}function ki(){Fe||(Fe=mp()),dn(),nt({revalidation:"loading"});let k=Fe.promise;return j.navigation.state==="submitting"?k:j.navigation.state==="idle"?(ar(j.historyAction,j.location,{startUninterruptedRevalidation:!0}),k):(ar(B||j.historyAction,j.navigation.location,{overrideNavigation:j.navigation,enableViewTransition:Re===!0}),k)}async function ar(k,P,T){ze&&ze.abort(),ze=null,B=k,pe=(T&&T.startUninterruptedRevalidation)===!0,zi(j.location,j.matches),ye=(T&&T.preventScrollReset)===!0,Re=(T&&T.enableViewTransition)===!0;let W=h||g,K=T&&T.overrideNavigation,ce=T!=null&&T.initialHydration&&j.matches&&j.matches.length>0&&!J?j.matches:an(W,P,x),fe=(T&&T.flushSync)===!0;if(ce&&j.initialized&&!he&&gg(j.location,P)&&!(T&&T.submission&&xt(T.submission.formMethod))){Xt(P,{matches:ce},{flushSync:fe});return}let re=pn(ce,W,P.pathname);if(re.active&&re.matches&&(ce=re.matches),!ce){let{error:Je,notFoundMatches:lt,route:Ae}=lr(P.pathname);Xt(P,{matches:lt,loaderData:{},errors:{[Ae.id]:Je}},{flushSync:fe});return}ze=new AbortController;let ie=da(a.history,P,ze.signal,T&&T.submission),oe=a.getContext?await a.getContext():new qu,Se;if(T&&T.pendingError)Se=[ln(ce).route.id,{type:"error",error:T.pendingError}];else if(T&&T.submission&&xt(T.submission.formMethod)){let Je=await ya(ie,P,T.submission,ce,oe,re.active,T&&T.initialHydration===!0,{replace:T.replace,flushSync:fe});if(Je.shortCircuited)return;if(Je.pendingActionResult){let[lt,Ae]=Je.pendingActionResult;if(Dt(Ae)&&gi(Ae.error)&&Ae.error.status===404){ze=null,Xt(P,{matches:Je.matches,loaderData:{},errors:{[lt]:Ae.error}});return}}ce=Je.matches||ce,Se=Je.pendingActionResult,K=Bs(P,T.submission),fe=!1,re.active=!1,ie=da(a.history,ie.url,ie.signal)}let{shortCircuited:ue,matches:Ee,loaderData:Te,errors:tt}=await ji(ie,P,ce,oe,re.active,K,T&&T.submission,T&&T.fetcherSubmission,T&&T.replace,T&&T.initialHydration===!0,fe,Se,T&&T.callSiteDefaultShouldRevalidate);ue||(ze=null,Xt(P,{matches:Ee||ce,...up(Se),loaderData:Te,errors:tt}))}async function ya(k,P,T,W,K,ce,fe,re={}){dn();let ie=jg(P,T);if(nt({navigation:ie},{flushSync:re.flushSync===!0}),ce){let ue=await Mr(W,P.pathname,k.signal);if(ue.type==="aborted")return{shortCircuited:!0};if(ue.type==="error"){if(ue.partialMatches.length===0){let{matches:Te,route:tt}=Ll(g);return{matches:Te,pendingActionResult:[tt.id,{type:"error",error:ue.error}]}}let Ee=ln(ue.partialMatches).route.id;return{matches:ue.partialMatches,pendingActionResult:[Ee,{type:"error",error:ue.error}]}}else if(ue.matches)W=ue.matches;else{let{notFoundMatches:Ee,error:Te,route:tt}=lr(P.pathname);return{matches:Ee,pendingActionResult:[tt.id,{type:"error",error:Te}]}}}let oe,Se=_l(W,P);if(!Se.route.action&&!Se.route.lazy)oe={type:"error",error:Yt(405,{method:k.method,pathname:P.pathname,routeId:Se.route.id})};else{let ue=ma(u,m,k,W,Se,fe?[]:d,K),Ee=await Tr(k,ue,K,null);if(oe=Ee[Se.route.id],!oe){for(let Te of W)if(Ee[Te.route.id]){oe=Ee[Te.route.id];break}}if(k.signal.aborted)return{shortCircuited:!0}}if(Pn(oe)){let ue;return re&&re.replace!=null?ue=re.replace:ue=op(oe.response.headers.get("Location"),new URL(k.url),x,a.history)===j.location.pathname+j.location.search,await ir(k,oe,!0,{submission:T,replace:ue}),{shortCircuited:!0}}if(Dt(oe)){let ue=ln(W,Se.route.id);return(re&&re.replace)!==!0&&(B="PUSH"),{matches:W,pendingActionResult:[ue.route.id,oe,Se.route.id]}}return{matches:W,pendingActionResult:[Se.route.id,oe]}}async function ji(k,P,T,W,K,ce,fe,re,ie,oe,Se,ue,Ee){let Te=ce||Bs(P,fe),tt=fe||re||fp(Te),Je=!pe&&!oe;if(K){if(Je){let Oe=_n(ue);nt({navigation:Te,...Oe!==void 0?{actionData:Oe}:{}},{flushSync:Se})}let Be=await Mr(T,P.pathname,k.signal);if(Be.type==="aborted")return{shortCircuited:!0};if(Be.type==="error"){if(Be.partialMatches.length===0){let{matches:Ar,route:yr}=Ll(g);return{matches:Ar,loaderData:{},errors:{[yr.id]:Be.error}}}let Oe=ln(Be.partialMatches).route.id;return{matches:Be.partialMatches,loaderData:{},errors:{[Oe]:Be.error}}}else if(Be.matches)T=Be.matches;else{let{error:Oe,notFoundMatches:Ar,route:yr}=lr(P.pathname);return{matches:Ar,loaderData:{},errors:{[yr.id]:Oe}}}}let lt=h||g,{dsMatches:Ae,revalidatingFetchers:jt}=rp(k,W,u,m,a.history,j,T,tt,P,oe?[]:d,oe===!0,he,je,be,xe,I,lt,x,a.patchRoutesOnNavigation!=null,ue,Ee);if(Y=++te,!a.dataStrategy&&!Ae.some(Be=>Be.shouldLoad)&&!Ae.some(Be=>Be.route.middleware&&Be.route.middleware.length>0)&&jt.length===0){let Be=An();return Xt(P,{matches:T,loaderData:{},errors:ue&&Dt(ue[1])?{[ue[0]]:ue[1].error}:null,...up(ue),...Be?{fetchers:new Map(j.fetchers)}:{}},{flushSync:Se}),{shortCircuited:!0}}if(Je){let Be={};if(!K){Be.navigation=Te;let Oe=_n(ue);Oe!==void 0&&(Be.actionData=Oe)}jt.length>0&&(Be.fetchers=cn(jt)),nt(Be,{flushSync:Se})}jt.forEach(Be=>{At(Be.key),Be.controller&&z.set(Be.key,Be.controller)});let Ie=()=>jt.forEach(Be=>At(Be.key));ze&&ze.signal.addEventListener("abort",Ie);let{loaderResults:mn,fetcherResults:It}=await va(Ae,jt,k,W);if(k.signal.aborted)return{shortCircuited:!0};ze&&ze.signal.removeEventListener("abort",Ie),jt.forEach(Be=>z.delete(Be.key));let Pt=Fl(mn);if(Pt)return await ir(k,Pt.result,!0,{replace:ie}),{shortCircuited:!0};if(Pt=Fl(It),Pt)return I.add(Pt.key),await ir(k,Pt.result,!0,{replace:ie}),{shortCircuited:!0};let{loaderData:_r,errors:gn}=cp(j,T,mn,ue,jt,It);oe&&j.errors&&(gn={...j.errors,...gn});let or=An(),xr=In(Y),bt=or||xr||jt.length>0;return{matches:T,loaderData:_r,errors:gn,...bt?{fetchers:new Map(j.fetchers)}:{}}}function _n(k){if(k&&!Dt(k[1]))return{[k[0]]:k[1].data};if(j.actionData)return Object.keys(j.actionData).length===0?null:j.actionData}function cn(k){return k.forEach(P=>{let T=j.fetchers.get(P.key),W=oi(void 0,T?T.data:void 0);j.fetchers.set(P.key,W)}),new Map(j.fetchers)}async function Fr(k,P,T,W){At(k);let K=(W&&W.flushSync)===!0,ce=h||g,fe=Vs(j.location,j.matches,x,T,P,W==null?void 0:W.relative),re=an(ce,fe,x),ie=pn(re,ce,fe);if(ie.active&&ie.matches&&(re=ie.matches),!re){_t(k,P,Yt(404,{pathname:fe}),{flushSync:K});return}let{path:oe,submission:Se,error:ue}=tp(!0,fe,W);if(ue){_t(k,P,ue,{flushSync:K});return}let Ee=a.getContext?await a.getContext():new qu,Te=(W&&W.preventScrollReset)===!0;if(Se&&xt(Se.formMethod)){await ba(k,P,oe,re,Ee,ie.active,K,Te,Se,W&&W.unstable_defaultShouldRevalidate);return}xe.set(k,{routeId:P,path:oe}),await Si(k,P,oe,re,Ee,ie.active,K,Te,Se)}async function ba(k,P,T,W,K,ce,fe,re,ie,oe){dn(),xe.delete(k);let Se=j.fetchers.get(k);kt(k,Sg(ie,Se),{flushSync:fe});let ue=new AbortController,Ee=da(a.history,T,ue.signal,ie);if(ce){let Ve=await Mr(W,new URL(Ee.url).pathname,Ee.signal,k);if(Ve.type==="aborted")return;if(Ve.type==="error"){_t(k,P,Ve.error,{flushSync:fe});return}else if(Ve.matches)W=Ve.matches;else{_t(k,P,Yt(404,{pathname:T}),{flushSync:fe});return}}let Te=_l(W,T);if(!Te.route.action&&!Te.route.lazy){let Ve=Yt(405,{method:ie.formMethod,pathname:T,routeId:P});_t(k,P,Ve,{flushSync:fe});return}z.set(k,ue);let tt=te,Je=ma(u,m,Ee,W,Te,d,K),lt=await Tr(Ee,Je,K,k),Ae=lt[Te.route.id];if(!Ae){for(let Ve of Je)if(lt[Ve.route.id]){Ae=lt[Ve.route.id];break}}if(Ee.signal.aborted){z.get(k)===ue&&z.delete(k);return}if(be.has(k)){if(Pn(Ae)||Dt(Ae)){kt(k,Rr(void 0));return}}else{if(Pn(Ae))if(z.delete(k),Y>tt){kt(k,Rr(void 0));return}else return I.add(k),kt(k,oi(ie)),ir(Ee,Ae,!1,{fetcherSubmission:ie,preventScrollReset:re});if(Dt(Ae)){_t(k,P,Ae.error);return}}let jt=j.navigation.location||j.location,Ie=da(a.history,jt,ue.signal),mn=h||g,It=j.navigation.state!=="idle"?an(mn,j.navigation.location,x):j.matches;Le(It,"Didn't find any matches after fetcher action");let Pt=++te;R.set(k,Pt);let _r=oi(ie,Ae.data);j.fetchers.set(k,_r);let{dsMatches:gn,revalidatingFetchers:or}=rp(Ie,K,u,m,a.history,j,It,ie,jt,d,!1,he,je,be,xe,I,mn,x,a.patchRoutesOnNavigation!=null,[Te.route.id,Ae],oe);or.filter(Ve=>Ve.key!==k).forEach(Ve=>{let br=Ve.key,hn=j.fetchers.get(br),xn=oi(void 0,hn?hn.data:void 0);j.fetchers.set(br,xn),At(br),Ve.controller&&z.set(br,Ve.controller)}),nt({fetchers:new Map(j.fetchers)});let xr=()=>or.forEach(Ve=>At(Ve.key));ue.signal.addEventListener("abort",xr);let{loaderResults:bt,fetcherResults:Be}=await va(gn,or,Ie,K);if(ue.signal.aborted)return;if(ue.signal.removeEventListener("abort",xr),R.delete(k),z.delete(k),or.forEach(Ve=>z.delete(Ve.key)),j.fetchers.has(k)){let Ve=Rr(Ae.data);j.fetchers.set(k,Ve)}let Oe=Fl(bt);if(Oe)return ir(Ie,Oe.result,!1,{preventScrollReset:re});if(Oe=Fl(Be),Oe)return I.add(Oe.key),ir(Ie,Oe.result,!1,{preventScrollReset:re});let{loaderData:Ar,errors:yr}=cp(j,It,bt,void 0,or,Be);In(Pt),j.navigation.state==="loading"&&Pt>Y?(Le(B,"Expected pending action"),ze&&ze.abort(),Xt(j.navigation.location,{matches:It,loaderData:Ar,errors:yr,fetchers:new Map(j.fetchers)})):(nt({errors:yr,loaderData:dp(j.loaderData,Ar,It,yr),fetchers:new Map(j.fetchers)}),he=!1)}async function Si(k,P,T,W,K,ce,fe,re,ie){let oe=j.fetchers.get(k);kt(k,oi(ie,oe?oe.data:void 0),{flushSync:fe});let Se=new AbortController,ue=da(a.history,T,Se.signal);if(ce){let Ae=await Mr(W,new URL(ue.url).pathname,ue.signal,k);if(Ae.type==="aborted")return;if(Ae.type==="error"){_t(k,P,Ae.error,{flushSync:fe});return}else if(Ae.matches)W=Ae.matches;else{_t(k,P,Yt(404,{pathname:T}),{flushSync:fe});return}}let Ee=_l(W,T);z.set(k,Se);let Te=te,tt=ma(u,m,ue,W,Ee,d,K),lt=(await Tr(ue,tt,K,k))[Ee.route.id];if(z.get(k)===Se&&z.delete(k),!ue.signal.aborted){if(be.has(k)){kt(k,Rr(void 0));return}if(Pn(lt))if(Y>Te){kt(k,Rr(void 0));return}else{I.add(k),await ir(ue,lt,!1,{preventScrollReset:re});return}if(Dt(lt)){_t(k,P,lt.error);return}kt(k,Rr(lt.data))}}async function ir(k,P,T,{submission:W,fetcherSubmission:K,preventScrollReset:ce,replace:fe}={}){T||(X==null||X.resolve(),X=null),P.response.headers.has("X-Remix-Revalidate")&&(he=!0);let re=P.response.headers.get("Location");Le(re,"Expected a Location header on the redirect Response"),re=op(re,new URL(k.url),x,a.history);let ie=fi(j.location,re,{_isRedirect:!0});if(s){let tt=!1;if(P.response.headers.has("X-Remix-Reload-Document"))tt=!0;else if(rc(re)){const Je=Dp(re,!0);tt=Je.origin!==o.location.origin||qt(Je.pathname,x)==null}if(tt){fe?o.location.replace(re):o.location.assign(re);return}}ze=null;let oe=fe===!0||P.response.headers.has("X-Remix-Replace")?"REPLACE":"PUSH",{formMethod:Se,formAction:ue,formEncType:Ee}=j.navigation;!W&&!K&&Se&&ue&&Ee&&(W=fp(j.navigation));let Te=W||K;if(Zm.has(P.response.status)&&Te&&xt(Te.formMethod))await ar(oe,ie,{submission:{...Te,formAction:re},preventScrollReset:ce||ye,enableViewTransition:T?Re:void 0});else{let tt=Bs(ie,W);await ar(oe,ie,{overrideNavigation:tt,fetcherSubmission:K,preventScrollReset:ce||ye,enableViewTransition:T?Re:void 0})}}async function Tr(k,P,T,W){var fe;let K,ce={};try{K=await cg(S,k,P,W,T,!1)}catch(re){return P.filter(ie=>ie.shouldLoad).forEach(ie=>{ce[ie.route.id]={type:"error",error:re}}),ce}if(k.signal.aborted)return ce;if(!xt(k.method))for(let re of P){if(((fe=K[re.route.id])==null?void 0:fe.type)==="error")break;!K.hasOwnProperty(re.route.id)&&!j.loaderData.hasOwnProperty(re.route.id)&&(!j.errors||!j.errors.hasOwnProperty(re.route.id))&&re.shouldCallHandler()&&(K[re.route.id]={type:"error",result:new Error(`No result returned from dataStrategy for route ${re.route.id}`)})}for(let[re,ie]of Object.entries(K))if(bg(ie)){let oe=ie.result;ce[re]={type:"redirect",response:fg(oe,k,re,P,x)}}else ce[re]=await pg(ie);return ce}async function va(k,P,T,W){let K=Tr(T,k,W,null),ce=Promise.all(P.map(async ie=>{if(ie.matches&&ie.match&&ie.request&&ie.controller){let Se=(await Tr(ie.request,ie.matches,W,ie.key))[ie.match.route.id];return{[ie.key]:Se}}else return Promise.resolve({[ie.key]:{type:"error",error:Yt(404,{pathname:ie.path})}})})),fe=await K,re=(await ce).reduce((ie,oe)=>Object.assign(ie,oe),{});return{loaderResults:fe,fetcherResults:re}}function dn(){he=!0,xe.forEach((k,P)=>{z.has(P)&&je.add(P),At(P)})}function kt(k,P,T={}){j.fetchers.set(k,P),nt({fetchers:new Map(j.fetchers)},{flushSync:(T&&T.flushSync)===!0})}function _t(k,P,T,W={}){let K=ln(j.matches,P);wa(k),nt({errors:{[K.route.id]:T},fetchers:new Map(j.fetchers)},{flushSync:(W&&W.flushSync)===!0})}function Br(k){return ve.set(k,(ve.get(k)||0)+1),be.has(k)&&be.delete(k),j.fetchers.get(k)||eg}function un(k,P){At(k,P==null?void 0:P.reason),kt(k,Rr(null))}function wa(k){let P=j.fetchers.get(k);z.has(k)&&!(P&&P.state==="loading"&&R.has(k))&&At(k),xe.delete(k),R.delete(k),I.delete(k),be.delete(k),je.delete(k),j.fetchers.delete(k)}function Ci(k){let P=(ve.get(k)||0)-1;P<=0?(ve.delete(k),be.add(k)):ve.set(k,P),nt({fetchers:new Map(j.fetchers)})}function At(k,P){let T=z.get(k);T&&(T.abort(P),z.delete(k))}function Ni(k){for(let P of k){let T=Br(P),W=Rr(T.data);j.fetchers.set(P,W)}}function An(){let k=[],P=!1;for(let T of I){let W=j.fetchers.get(T);Le(W,`Expected fetcher: ${T}`),W.state==="loading"&&(I.delete(T),k.push(T),P=!0)}return Ni(k),P}function In(k){let P=[];for(let[T,W]of R)if(W<k){let K=j.fetchers.get(T);Le(K,`Expected fetcher: ${T}`),K.state==="loading"&&(At(T),R.delete(T),P.push(T))}return Ni(P),P.length>0}function ka(k,P){let T=j.blockers.get(k)||li;return Ne.get(k)!==P&&Ne.set(k,P),T}function $n(k){j.blockers.delete(k),Ne.delete(k)}function Dr(k,P){let T=j.blockers.get(k)||li;Le(T.state==="unblocked"&&P.state==="blocked"||T.state==="blocked"&&P.state==="blocked"||T.state==="blocked"&&P.state==="proceeding"||T.state==="blocked"&&P.state==="unblocked"||T.state==="proceeding"&&P.state==="unblocked",`Invalid blocker state transition: ${T.state} -> ${P.state}`);let W=new Map(j.blockers);W.set(k,P),nt({blockers:W})}function hr({currentLocation:k,nextLocation:P,historyAction:T}){if(Ne.size===0)return;Ne.size>1&&et(!1,"A router only supports one blocker at a time");let W=Array.from(Ne.entries()),[K,ce]=W[W.length-1],fe=j.blockers.get(K);if(!(fe&&fe.state==="proceeding")&&ce({currentLocation:k,nextLocation:P,historyAction:T}))return K}function lr(k){let P=Yt(404,{pathname:k}),T=h||g,{matches:W,route:K}=Ll(T);return{notFoundMatches:W,route:K,error:P}}function Ei(k,P,T){if(M=k,_=P,A=T||null,!q&&j.navigation===Ts){q=!0;let W=Sa(j.location,j.matches);W!=null&&nt({restoreScrollPosition:W})}return()=>{M=null,_=null,A=null}}function ja(k,P){return A&&A(k,P.map(W=>Nm(W,j.loaderData)))||k.key}function zi(k,P){if(M&&_){let T=ja(k,P);M[T]=_()}}function Sa(k,P){if(M){let T=ja(k,P),W=M[T];if(typeof W=="number")return W}return null}function pn(k,P,T){if(a.patchRoutesOnNavigation)if(k){if(Object.keys(k[0].params).length>0)return{active:!0,matches:ui(P,T,x,!0)}}else return{active:!0,matches:ui(P,T,x,!0)||[]};return{active:!1,matches:null}}async function Mr(k,P,T,W){if(!a.patchRoutesOnNavigation)return{type:"success",matches:k};let K=k;for(;;){let ce=h==null,fe=h||g,re=m;try{await a.patchRoutesOnNavigation({signal:T,path:P,matches:K,fetcherKey:W,patch:(Se,ue)=>{T.aborted||np(Se,ue,fe,re,u,!1)}})}catch(Se){return{type:"error",error:Se,partialMatches:K}}finally{ce&&!T.aborted&&(g=[...g])}if(T.aborted)return{type:"aborted"};let ie=an(fe,P,x),oe=null;if(ie){if(Object.keys(ie[0].params).length===0)return{type:"success",matches:ie};if(oe=ui(fe,P,x,!0),!(oe&&K.length<oe.length&&Ca(K,oe.slice(0,K.length))))return{type:"success",matches:ie}}if(oe||(oe=ui(fe,P,x,!0)),!oe||Ca(K,oe))return{type:"success",matches:null};K=oe}}function Ca(k,P){return k.length===P.length&&k.every((T,W)=>T.route.id===P[W].route.id)}function fn(k){m={},h=mi(k,u,void 0,m)}function Na(k,P,T=!1){let W=h==null;np(k,P,h||g,m,u,T),W&&(g=[...g],nt({}))}return Z={get basename(){return x},get future(){return b},get state(){return j},get routes(){return g},get window(){return o},initialize:Ue,subscribe:Dn,enableScrollRestoration:Ei,navigate:Mn,fetch:Fr,revalidate:ki,createHref:k=>a.history.createHref(k),encodeLocation:k=>a.history.encodeLocation(k),getFetcher:Br,resetFetcher:un,deleteFetcher:Ci,dispose:yt,getBlocker:ka,deleteBlocker:$n,patchRoutes:Na,_internalFetchControllers:z,_internalSetRoutes:fn,_internalSetStateDoNotUseOrYouWillBreakYourApp(k){nt(k)}},a.unstable_instrumentations&&(Z=Gm(Z,a.unstable_instrumentations.map(k=>k.router).filter(Boolean))),Z}function ng(a){return a!=null&&("formData"in a&&a.formData!=null||"body"in a&&a.body!==void 0)}function Vs(a,o,s,d,p,u){let m,g;if(p){m=[];for(let x of o)if(m.push(x),x.route.id===p){g=x;break}}else m=o,g=o[o.length-1];let h=ac(d||".",nc(m),qt(a.pathname,s)||a.pathname,u==="path");if(d==null&&(h.search=a.search,h.hash=a.hash),(d==null||d===""||d===".")&&g){let x=oc(h.search);if(g.route.index&&!x)h.search=h.search?h.search.replace(/^\?/,"?index&"):"?index";else if(!g.route.index&&x){let S=new URLSearchParams(h.search),b=S.getAll("index");S.delete("index"),b.filter(w=>w).forEach(w=>S.append("index",w));let N=S.toString();h.search=N?`?${N}`:""}}return s!=="/"&&(h.pathname=Im({basename:s,pathname:h.pathname})),fr(h)}function tp(a,o,s){if(!s||!ng(s))return{path:o};if(s.formMethod&&!kg(s.formMethod))return{path:o,error:Yt(405,{method:s.formMethod})};let d=()=>({path:o,error:Yt(400,{type:"invalid-body"})}),u=(s.formMethod||"get").toUpperCase(),m=Jp(o);if(s.body!==void 0){if(s.formEncType==="text/plain"){if(!xt(u))return d();let b=typeof s.body=="string"?s.body:s.body instanceof FormData||s.body instanceof URLSearchParams?Array.from(s.body.entries()).reduce((N,[w,M])=>`${N}${w}=${M}
`,""):String(s.body);return{path:o,submission:{formMethod:u,formAction:m,formEncType:s.formEncType,formData:void 0,json:void 0,text:b}}}else if(s.formEncType==="application/json"){if(!xt(u))return d();try{let b=typeof s.body=="string"?JSON.parse(s.body):s.body;return{path:o,submission:{formMethod:u,formAction:m,formEncType:s.formEncType,formData:void 0,json:b,text:void 0}}}catch{return d()}}}Le(typeof FormData=="function","FormData is not available in this environment");let g,h;if(s.formData)g=qs(s.formData),h=s.formData;else if(s.body instanceof FormData)g=qs(s.body),h=s.body;else if(s.body instanceof URLSearchParams)g=s.body,h=sp(g);else if(s.body==null)g=new URLSearchParams,h=new FormData;else try{g=new URLSearchParams(s.body),h=sp(g)}catch{return d()}let x={formMethod:u,formAction:m,formEncType:s&&s.formEncType||"application/x-www-form-urlencoded",formData:h,json:void 0,text:void 0};if(xt(x.formMethod))return{path:o,submission:x};let S=sn(o);return a&&S.search&&oc(S.search)&&g.append("index",""),S.search=`?${g}`,{path:fr(S),submission:x}}function rp(a,o,s,d,p,u,m,g,h,x,S,b,N,w,M,A,_,q,$,J,ne){var pe;let Q=J?Dt(J[1])?J[1].error:J[1].data:void 0,Z=p.createURL(u.location),j=p.createURL(h),B;if(S&&u.errors){let he=Object.keys(u.errors)[0];B=m.findIndex(je=>je.route.id===he)}else if(J&&Dt(J[1])){let he=J[0];B=m.findIndex(je=>je.route.id===he)-1}let X=J?J[1].statusCode:void 0,ye=X&&X>=400,ze={currentUrl:Z,currentParams:((pe=u.matches[0])==null?void 0:pe.params)||{},nextUrl:j,nextParams:m[0].params,...g,actionResult:Q,actionStatus:X},Re=yi(m),Ce=m.map((he,je)=>{let{route:z}=he,te=null;if(B!=null&&je>B?te=!1:z.lazy?te=!0:ic(z)?S?te=Ys(z,u.loaderData,u.errors):ag(u.loaderData,u.matches[je],he)&&(te=!0):te=!1,te!==null)return Ks(s,d,a,Re,he,x,o,te);let Y=!1;typeof ne=="boolean"?Y=ne:ye?Y=!1:(b||Z.pathname+Z.search===j.pathname+j.search||Z.search!==j.search||ig(u.matches[je],he))&&(Y=!0);let R={...ze,defaultShouldRevalidate:Y},I=pi(he,R);return Ks(s,d,a,Re,he,x,o,I,R,ne)}),O=[];return M.forEach((he,je)=>{if(S||!m.some(be=>be.route.id===he.routeId)||w.has(je))return;let z=u.fetchers.get(je),te=z&&z.state!=="idle"&&z.data===void 0,Y=an(_,he.path,q);if(!Y){if($&&te)return;O.push({key:je,routeId:he.routeId,path:he.path,matches:null,match:null,request:null,controller:null});return}if(A.has(je))return;let R=_l(Y,he.path),I=new AbortController,xe=da(p,he.path,I.signal),ve=null;if(N.has(je))N.delete(je),ve=ma(s,d,xe,Y,R,x,o);else if(te)b&&(ve=ma(s,d,xe,Y,R,x,o));else{let be;typeof ne=="boolean"?be=ne:ye?be=!1:be=b;let Ne={...ze,defaultShouldRevalidate:be};pi(R,Ne)&&(ve=ma(s,d,xe,Y,R,x,o,Ne))}ve&&O.push({key:je,routeId:he.routeId,path:he.path,matches:ve,match:R,request:xe,controller:I})}),{dsMatches:Ce,revalidatingFetchers:O}}function ic(a){return a.loader!=null||a.middleware!=null&&a.middleware.length>0}function Ys(a,o,s){if(a.lazy)return!0;if(!ic(a))return!1;let d=o!=null&&a.id in o,p=s!=null&&s[a.id]!==void 0;return!d&&p?!1:typeof a.loader=="function"&&a.loader.hydrate===!0?!0:!d&&!p}function ag(a,o,s){let d=!o||s.route.id!==o.route.id,p=!a.hasOwnProperty(s.route.id);return d||p}function ig(a,o){let s=a.route.path;return a.pathname!==o.pathname||s!=null&&s.endsWith("*")&&a.params["*"]!==o.params["*"]}function pi(a,o){if(a.route.shouldRevalidate){let s=a.route.shouldRevalidate(o);if(typeof s=="boolean")return s}return o.defaultShouldRevalidate}function np(a,o,s,d,p,u){let m;if(a){let x=d[a];Le(x,`No route found to patch children into: routeId = ${a}`),x.children||(x.children=[]),m=x.children}else m=s;let g=[],h=[];if(o.forEach(x=>{let S=m.find(b=>Yp(x,b));S?h.push({existingRoute:S,newRoute:x}):g.push(x)}),g.length>0){let x=mi(g,p,[a||"_","patch",String((m==null?void 0:m.length)||"0")],d);m.push(...x)}if(u&&h.length>0)for(let x=0;x<h.length;x++){let{existingRoute:S,newRoute:b}=h[x],N=S,[w]=mi([b],p,[],{},!0);Object.assign(N,{element:w.element?w.element:N.element,errorElement:w.errorElement?w.errorElement:N.errorElement,hydrateFallbackElement:w.hydrateFallbackElement?w.hydrateFallbackElement:N.hydrateFallbackElement})}}function Yp(a,o){return"id"in a&&"id"in o&&a.id===o.id?!0:a.index===o.index&&a.path===o.path&&a.caseSensitive===o.caseSensitive?(!a.children||a.children.length===0)&&(!o.children||o.children.length===0)?!0:a.children.every((s,d)=>{var p;return(p=o.children)==null?void 0:p.some(u=>Yp(s,u))}):!1}var ap=new WeakMap,Kp=({key:a,route:o,manifest:s,mapRouteProperties:d})=>{let p=s[o.id];if(Le(p,"No route found in manifest"),!p.lazy||typeof p.lazy!="object")return;let u=p.lazy[a];if(!u)return;let m=ap.get(p);m||(m={},ap.set(p,m));let g=m[a];if(g)return g;let h=(async()=>{let x=km(a),b=p[a]!==void 0&&a!=="hasErrorBoundary";if(x)et(!x,"Route property "+a+" is not a supported lazy route property. This property will be ignored."),m[a]=Promise.resolve();else if(b)et(!1,`Route "${p.id}" has a static property "${a}" defined. The lazy property will be ignored.`);else{let N=await u();N!=null&&(Object.assign(p,{[a]:N}),Object.assign(p,d(p)))}typeof p.lazy=="object"&&(p.lazy[a]=void 0,Object.values(p.lazy).every(N=>N===void 0)&&(p.lazy=void 0))})();return m[a]=h,h},ip=new WeakMap;function lg(a,o,s,d,p){let u=s[a.id];if(Le(u,"No route found in manifest"),!a.lazy)return{lazyRoutePromise:void 0,lazyHandlerPromise:void 0};if(typeof a.lazy=="function"){let S=ip.get(u);if(S)return{lazyRoutePromise:S,lazyHandlerPromise:S};let b=(async()=>{Le(typeof a.lazy=="function","No lazy route function found");let N=await a.lazy(),w={};for(let M in N){let A=N[M];if(A===void 0)continue;let _=Sm(M),$=u[M]!==void 0&&M!=="hasErrorBoundary";_?et(!_,"Route property "+M+" is not a supported property to be returned from a lazy route function. This property will be ignored."):$?et(!$,`Route "${u.id}" has a static property "${M}" defined but its lazy function is also returning a value for this property. The lazy route property "${M}" will be ignored.`):w[M]=A}Object.assign(u,w),Object.assign(u,{...d(u),lazy:void 0})})();return ip.set(u,b),b.catch(()=>{}),{lazyRoutePromise:b,lazyHandlerPromise:b}}let m=Object.keys(a.lazy),g=[],h;for(let S of m){if(p&&p.includes(S))continue;let b=Kp({key:S,route:a,manifest:s,mapRouteProperties:d});b&&(g.push(b),S===o&&(h=b))}let x=g.length>0?Promise.all(g).then(()=>{}):void 0;return x==null||x.catch(()=>{}),h==null||h.catch(()=>{}),{lazyRoutePromise:x,lazyHandlerPromise:h}}async function lp(a){let o=a.matches.filter(p=>p.shouldLoad),s={};return(await Promise.all(o.map(p=>p.resolve()))).forEach((p,u)=>{s[o[u].route.id]=p}),s}async function og(a){return a.matches.some(o=>o.route.middleware)?qp(a,()=>lp(a)):lp(a)}function qp(a,o){return sg(a,o,d=>{if(wg(d))throw d;return d},xg,s);function s(d,p,u){if(u)return Promise.resolve(Object.assign(u.value,{[p]:{type:"error",result:d}}));{let{matches:m}=a,g=Math.min(Math.max(m.findIndex(x=>x.route.id===p),0),Math.max(m.findIndex(x=>x.shouldCallHandler()),0)),h=ln(m,m[g].route.id).route.id;return Promise.resolve({[h]:{type:"error",result:d}})}}}async function sg(a,o,s,d,p){let{matches:u,request:m,params:g,context:h,unstable_pattern:x}=a,S=u.flatMap(N=>N.route.middleware?N.route.middleware.map(w=>[N.route.id,w]):[]);return await Qp({request:m,params:g,context:h,unstable_pattern:x},S,o,s,d,p)}async function Qp(a,o,s,d,p,u,m=0){let{request:g}=a;if(g.signal.aborted)throw g.signal.reason??new Error(`Request aborted: ${g.method} ${g.url}`);let h=o[m];if(!h)return await s();let[x,S]=h,b,N=async()=>{if(b)throw new Error("You may only call `next()` once per middleware");try{return b={value:await Qp(a,o,s,d,p,u,m+1)},b.value}catch(w){return b={value:await u(w,x,b)},b.value}};try{let w=await S(a,N),M=w!=null?d(w):void 0;return p(M)?M:b?M??b.value:(b={value:await N()},b.value)}catch(w){return await u(w,x,b)}}function Xp(a,o,s,d,p){let u=Kp({key:"middleware",route:d.route,manifest:o,mapRouteProperties:a}),m=lg(d.route,xt(s.method)?"action":"loader",o,a,p);return{middleware:u,route:m.lazyRoutePromise,handler:m.lazyHandlerPromise}}function Ks(a,o,s,d,p,u,m,g,h=null,x){let S=!1,b=Xp(a,o,s,p,u);return{...p,_lazyPromises:b,shouldLoad:g,shouldRevalidateArgs:h,shouldCallHandler(N){return S=!0,h?typeof x=="boolean"?pi(p,{...h,defaultShouldRevalidate:x}):typeof N=="boolean"?pi(p,{...h,defaultShouldRevalidate:N}):pi(p,h):g},resolve(N){let{lazy:w,loader:M,middleware:A}=p.route,_=S||g||N&&!xt(s.method)&&(w||M),q=A&&A.length>0&&!M&&!w;return _&&(xt(s.method)||!q)?dg({request:s,unstable_pattern:d,match:p,lazyHandlerPromise:b==null?void 0:b.handler,lazyRoutePromise:b==null?void 0:b.route,handlerOverride:N,scopedContext:m}):Promise.resolve({type:"data",result:void 0})}}}function ma(a,o,s,d,p,u,m,g=null){return d.map(h=>h.route.id!==p.route.id?{...h,shouldLoad:!1,shouldRevalidateArgs:g,shouldCallHandler:()=>!1,_lazyPromises:Xp(a,o,s,h,u),resolve:()=>Promise.resolve({type:"data",result:void 0})}:Ks(a,o,s,yi(d),h,u,m,!0,g))}async function cg(a,o,s,d,p,u){s.some(x=>{var S;return(S=x._lazyPromises)==null?void 0:S.middleware})&&await Promise.all(s.map(x=>{var S;return(S=x._lazyPromises)==null?void 0:S.middleware}));let m={request:o,unstable_pattern:yi(s),params:s[0].params,context:p,matches:s},h=await a({...m,fetcherKey:d,runClientMiddleware:x=>{let S=m;return qp(S,()=>x({...S,fetcherKey:d,runClientMiddleware:()=>{throw new Error("Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler")}}))}});try{await Promise.all(s.flatMap(x=>{var S,b;return[(S=x._lazyPromises)==null?void 0:S.handler,(b=x._lazyPromises)==null?void 0:b.route]}))}catch{}return h}async function dg({request:a,unstable_pattern:o,match:s,lazyHandlerPromise:d,lazyRoutePromise:p,handlerOverride:u,scopedContext:m}){let g,h,x=xt(a.method),S=x?"action":"loader",b=N=>{let w,M=new Promise((q,$)=>w=$);h=()=>w(),a.signal.addEventListener("abort",h);let A=q=>typeof N!="function"?Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${S}" [routeId: ${s.route.id}]`)):N({request:a,unstable_pattern:o,params:s.params,context:m},...q!==void 0?[q]:[]),_=(async()=>{try{return{type:"data",result:await(u?u($=>A($)):A())}}catch(q){return{type:"error",result:q}}})();return Promise.race([_,M])};try{let N=x?s.route.action:s.route.loader;if(d||p)if(N){let w,[M]=await Promise.all([b(N).catch(A=>{w=A}),d,p]);if(w!==void 0)throw w;g=M}else{await d;let w=x?s.route.action:s.route.loader;if(w)[g]=await Promise.all([b(w),p]);else if(S==="action"){let M=new URL(a.url),A=M.pathname+M.search;throw Yt(405,{method:a.method,pathname:A,routeId:s.route.id})}else return{type:"data",result:void 0}}else if(N)g=await b(N);else{let w=new URL(a.url),M=w.pathname+w.search;throw Yt(404,{pathname:M})}}catch(N){return{type:"error",result:N}}finally{h&&a.signal.removeEventListener("abort",h)}return g}async function ug(a){let o=a.headers.get("Content-Type");return o&&/\bapplication\/json\b/.test(o)?a.body==null?null:a.json():a.text()}async function pg(a){var d,p,u,m,g;let{result:o,type:s}=a;if(lc(o)){let h;try{h=await ug(o)}catch(x){return{type:"error",error:x}}return s==="error"?{type:"error",error:new xi(o.status,o.statusText,h),statusCode:o.status,headers:o.headers}:{type:"data",data:h,statusCode:o.status,headers:o.headers}}return s==="error"?pp(o)?o.data instanceof Error?{type:"error",error:o.data,statusCode:(d=o.init)==null?void 0:d.status,headers:(p=o.init)!=null&&p.headers?new Headers(o.init.headers):void 0}:{type:"error",error:hg(o),statusCode:gi(o)?o.status:void 0,headers:(u=o.init)!=null&&u.headers?new Headers(o.init.headers):void 0}:{type:"error",error:o,statusCode:gi(o)?o.status:void 0}:pp(o)?{type:"data",data:o.data,statusCode:(m=o.init)==null?void 0:m.status,headers:(g=o.init)!=null&&g.headers?new Headers(o.init.headers):void 0}:{type:"data",data:o}}function fg(a,o,s,d,p){let u=a.headers.get("Location");if(Le(u,"Redirects returned/thrown from loaders/actions must have a Location header"),!rc(u)){let m=d.slice(0,d.findIndex(g=>g.route.id===s)+1);u=Vs(new URL(o.url),m,p,u),a.headers.set("Location",u)}return a}function op(a,o,s,d){let p=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(rc(a)){let u=a,m=u.startsWith("//")?new URL(o.protocol+u):new URL(u);if(p.includes(m.protocol))throw new Error("Invalid redirect location");let g=qt(m.pathname,s)!=null;if(m.origin===o.origin&&g)return m.pathname+m.search+m.hash}try{let u=d.createURL(a);if(p.includes(u.protocol))throw new Error("Invalid redirect location")}catch{}return a}function da(a,o,s,d){let p=a.createURL(Jp(o)).toString(),u={signal:s};if(d&&xt(d.formMethod)){let{formMethod:m,formEncType:g}=d;u.method=m.toUpperCase(),g==="application/json"?(u.headers=new Headers({"Content-Type":g}),u.body=JSON.stringify(d.json)):g==="text/plain"?u.body=d.text:g==="application/x-www-form-urlencoded"&&d.formData?u.body=qs(d.formData):u.body=d.formData}return new Request(p,u)}function qs(a){let o=new URLSearchParams;for(let[s,d]of a.entries())o.append(s,typeof d=="string"?d:d.name);return o}function sp(a){let o=new FormData;for(let[s,d]of a.entries())o.append(s,d);return o}function mg(a,o,s,d=!1,p=!1){let u={},m=null,g,h=!1,x={},S=s&&Dt(s[1])?s[1].error:void 0;return a.forEach(b=>{if(!(b.route.id in o))return;let N=b.route.id,w=o[N];if(Le(!Pn(w),"Cannot handle redirect results in processLoaderData"),Dt(w)){let M=w.error;if(S!==void 0&&(M=S,S=void 0),m=m||{},p)m[N]=M;else{let A=ln(a,N);m[A.route.id]==null&&(m[A.route.id]=M)}d||(u[N]=Vp),h||(h=!0,g=gi(w.error)?w.error.status:500),w.headers&&(x[N]=w.headers)}else u[N]=w.data,w.statusCode&&w.statusCode!==200&&!h&&(g=w.statusCode),w.headers&&(x[N]=w.headers)}),S!==void 0&&s&&(m={[s[0]]:S},s[2]&&(u[s[2]]=void 0)),{loaderData:u,errors:m,statusCode:g||200,loaderHeaders:x}}function cp(a,o,s,d,p,u){let{loaderData:m,errors:g}=mg(o,s,d);return p.filter(h=>!h.matches||h.matches.some(x=>x.shouldLoad)).forEach(h=>{let{key:x,match:S,controller:b}=h;if(b&&b.signal.aborted)return;let N=u[x];if(Le(N,"Did not find corresponding fetcher result"),Dt(N)){let w=ln(a.matches,S==null?void 0:S.route.id);g&&g[w.route.id]||(g={...g,[w.route.id]:N.error}),a.fetchers.delete(x)}else if(Pn(N))Le(!1,"Unhandled fetcher revalidation redirect");else{let w=Rr(N.data);a.fetchers.set(x,w)}}),{loaderData:m,errors:g}}function dp(a,o,s,d){let p=Object.entries(o).filter(([,u])=>u!==Vp).reduce((u,[m,g])=>(u[m]=g,u),{});for(let u of s){let m=u.route.id;if(!o.hasOwnProperty(m)&&a.hasOwnProperty(m)&&u.route.loader&&(p[m]=a[m]),d&&d.hasOwnProperty(m))break}return p}function up(a){return a?Dt(a[1])?{actionData:{}}:{actionData:{[a[0]]:a[1].data}}:{}}function ln(a,o){return(o?a.slice(0,a.findIndex(d=>d.route.id===o)+1):[...a]).reverse().find(d=>d.route.hasErrorBoundary===!0)||a[0]}function Ll(a){let o=a.length===1?a[0]:a.find(s=>s.index||!s.path||s.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:o}],route:o}}function Yt(a,{pathname:o,routeId:s,method:d,type:p,message:u}={}){let m="Unknown Server Error",g="Unknown @remix-run/router error";return a===400?(m="Bad Request",d&&o&&s?g=`You made a ${d} request to "${o}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.`:p==="invalid-body"&&(g="Unable to encode submission body")):a===403?(m="Forbidden",g=`Route "${s}" does not match URL "${o}"`):a===404?(m="Not Found",g=`No route matches URL "${o}"`):a===405&&(m="Method Not Allowed",d&&o&&s?g=`You made a ${d.toUpperCase()} request to "${o}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.`:d&&(g=`Invalid request method "${d.toUpperCase()}"`)),new xi(a||500,m,new Error(g),!0)}function Fl(a){let o=Object.entries(a);for(let s=o.length-1;s>=0;s--){let[d,p]=o[s];if(Pn(p))return{key:d,result:p}}}function Jp(a){let o=typeof a=="string"?sn(a):a;return fr({...o,hash:""})}function gg(a,o){return a.pathname!==o.pathname||a.search!==o.search?!1:a.hash===""?o.hash!=="":a.hash===o.hash?!0:o.hash!==""}function hg(a){var o,s;return new xi(((o=a.init)==null?void 0:o.status)??500,((s=a.init)==null?void 0:s.statusText)??"Internal Server Error",a.data)}function xg(a){return a!=null&&typeof a=="object"&&Object.entries(a).every(([o,s])=>typeof o=="string"&&yg(s))}function yg(a){return a!=null&&typeof a=="object"&&"type"in a&&"result"in a&&(a.type==="data"||a.type==="error")}function bg(a){return lc(a.result)&&Hp.has(a.result.status)}function Dt(a){return a.type==="error"}function Pn(a){return(a&&a.type)==="redirect"}function pp(a){return typeof a=="object"&&a!=null&&"type"in a&&"data"in a&&"init"in a&&a.type==="DataWithResponseInit"}function lc(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.headers=="object"&&typeof a.body<"u"}function vg(a){return Hp.has(a)}function wg(a){return lc(a)&&vg(a.status)&&a.headers.has("Location")}function kg(a){return Jm.has(a.toUpperCase())}function xt(a){return Qm.has(a.toUpperCase())}function oc(a){return new URLSearchParams(a).getAll("index").some(o=>o==="")}function _l(a,o){let s=typeof o=="string"?sn(o).search:o.search;if(a[a.length-1].route.index&&oc(s||""))return a[a.length-1];let d=Ip(a);return d[d.length-1]}function fp(a){let{formMethod:o,formAction:s,formEncType:d,text:p,formData:u,json:m}=a;if(!(!o||!s||!d)){if(p!=null)return{formMethod:o,formAction:s,formEncType:d,formData:void 0,json:void 0,text:p};if(u!=null)return{formMethod:o,formAction:s,formEncType:d,formData:u,json:void 0,text:void 0};if(m!==void 0)return{formMethod:o,formAction:s,formEncType:d,formData:void 0,json:m,text:void 0}}}function Bs(a,o){return o?{state:"loading",location:a,formMethod:o.formMethod,formAction:o.formAction,formEncType:o.formEncType,formData:o.formData,json:o.json,text:o.text}:{state:"loading",location:a,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function jg(a,o){return{state:"submitting",location:a,formMethod:o.formMethod,formAction:o.formAction,formEncType:o.formEncType,formData:o.formData,json:o.json,text:o.text}}function oi(a,o){return a?{state:"loading",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:o}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:o}}function Sg(a,o){return{state:"submitting",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:o?o.data:void 0}}function Rr(a){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:a}}function Cg(a,o){try{let s=a.sessionStorage.getItem(Gp);if(s){let d=JSON.parse(s);for(let[p,u]of Object.entries(d||{}))u&&Array.isArray(u)&&o.set(p,new Set(u||[]))}}catch{}}function Ng(a,o){if(o.size>0){let s={};for(let[d,p]of o)s[d]=[...p];try{a.sessionStorage.setItem(Gp,JSON.stringify(s))}catch(d){et(!1,`Failed to save applied view transitions in sessionStorage (${d}).`)}}}function mp(){let a,o,s=new Promise((d,p)=>{a=async u=>{d(u);try{await s}catch{}},o=async u=>{p(u);try{await s}catch{}}});return{promise:s,resolve:a,reject:o}}var Bn=v.createContext(null);Bn.displayName="DataRouter";var bi=v.createContext(null);bi.displayName="DataRouterState";var Zp=v.createContext(!1);function Eg(){return v.useContext(Zp)}var sc=v.createContext({isTransitioning:!1});sc.displayName="ViewTransition";var ef=v.createContext(new Map);ef.displayName="Fetchers";var zg=v.createContext(null);zg.displayName="Await";var Qt=v.createContext(null);Qt.displayName="Navigation";var Hl=v.createContext(null);Hl.displayName="Location";var gr=v.createContext({outlet:null,matches:[],isDataRoute:!1});gr.displayName="Route";var cc=v.createContext(null);cc.displayName="RouteError";var tf="REACT_ROUTER_ERROR",Rg="REDIRECT",Pg="ROUTE_ERROR_RESPONSE";function Lg(a){if(a.startsWith(`${tf}:${Rg}:{`))try{let o=JSON.parse(a.slice(28));if(typeof o=="object"&&o&&typeof o.status=="number"&&typeof o.statusText=="string"&&typeof o.location=="string"&&typeof o.reloadDocument=="boolean"&&typeof o.replace=="boolean")return o}catch{}}function Fg(a){if(a.startsWith(`${tf}:${Pg}:{`))try{let o=JSON.parse(a.slice(40));if(typeof o=="object"&&o&&typeof o.status=="number"&&typeof o.statusText=="string")return new xi(o.status,o.statusText,o.data)}catch{}}function Tg(a,{relative:o}={}){Le(vi(),"useHref() may be used only in the context of a <Router> component.");let{basename:s,navigator:d}=v.useContext(Qt),{hash:p,pathname:u,search:m}=wi(a,{relative:o}),g=u;return s!=="/"&&(g=u==="/"?s:pr([s,u])),d.createHref({pathname:g,search:m,hash:p})}function vi(){return v.useContext(Hl)!=null}function Pr(){return Le(vi(),"useLocation() may be used only in the context of a <Router> component."),v.useContext(Hl).location}var rf="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function nf(a){v.useContext(Qt).static||v.useLayoutEffect(a)}function Lr(){let{isDataRoute:a}=v.useContext(gr);return a?Kg():Bg()}function Bg(){Le(vi(),"useNavigate() may be used only in the context of a <Router> component.");let a=v.useContext(Bn),{basename:o,navigator:s}=v.useContext(Qt),{matches:d}=v.useContext(gr),{pathname:p}=Pr(),u=JSON.stringify(nc(d)),m=v.useRef(!1);return nf(()=>{m.current=!0}),v.useCallback((h,x={})=>{if(et(m.current,rf),!m.current)return;if(typeof h=="number"){s.go(h);return}let S=ac(h,JSON.parse(u),p,x.relative==="path");a==null&&o!=="/"&&(S.pathname=S.pathname==="/"?o:pr([o,S.pathname])),(x.replace?s.replace:s.push)(S,x.state,x)},[o,s,u,p,a])}var Dg=v.createContext(null);function Mg(a){let o=v.useContext(gr).outlet;return v.useMemo(()=>o&&v.createElement(Dg.Provider,{value:a},o),[o,a])}function wi(a,{relative:o}={}){let{matches:s}=v.useContext(gr),{pathname:d}=Pr(),p=JSON.stringify(nc(s));return v.useMemo(()=>ac(a,JSON.parse(p),d,o==="path"),[a,p,d,o])}function _g(a,o,s,d,p){Le(vi(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:u}=v.useContext(Qt),{matches:m}=v.useContext(gr),g=m[m.length-1],h=g?g.params:{},x=g?g.pathname:"/",S=g?g.pathnameBase:"/",b=g&&g.route;{let $=b&&b.path||"";lf(x,!b||$.endsWith("*")||$.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${x}" (under <Route path="${$}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${$}"> to <Route path="${$==="/"?"*":`${$}/*`}">.`)}let N=Pr(),w;w=N;let M=w.pathname||"/",A=M;if(S!=="/"){let $=S.replace(/^\//,"").split("/");A="/"+M.replace(/^\//,"").split("/").slice($.length).join("/")}let _=an(a,{pathname:A});return et(b||_!=null,`No routes matched location "${w.pathname}${w.search}${w.hash}" `),et(_==null||_[_.length-1].route.element!==void 0||_[_.length-1].route.Component!==void 0||_[_.length-1].route.lazy!==void 0,`Matched leaf route at location "${w.pathname}${w.search}${w.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),Ug(_&&_.map($=>Object.assign({},$,{params:Object.assign({},h,$.params),pathname:pr([S,u.encodeLocation?u.encodeLocation($.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:$.pathname]),pathnameBase:$.pathnameBase==="/"?S:pr([S,u.encodeLocation?u.encodeLocation($.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:$.pathnameBase])})),m,s,d,p)}function Ag(){let a=Yg(),o=gi(a)?`${a.status} ${a.statusText}`:a instanceof Error?a.message:JSON.stringify(a),s=a instanceof Error?a.stack:null,d="rgba(200,200,200, 0.5)",p={padding:"0.5rem",backgroundColor:d},u={padding:"2px 4px",backgroundColor:d},m=null;return console.error("Error handled by React Router default ErrorBoundary:",a),m=v.createElement(v.Fragment,null,v.createElement("p",null,"💿 Hey developer 👋"),v.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",v.createElement("code",{style:u},"ErrorBoundary")," or"," ",v.createElement("code",{style:u},"errorElement")," prop on your route.")),v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},o),s?v.createElement("pre",{style:p},s):null,m)}var Ig=v.createElement(Ag,null),af=class extends v.Component{constructor(a){super(a),this.state={location:a.location,revalidation:a.revalidation,error:a.error}}static getDerivedStateFromError(a){return{error:a}}static getDerivedStateFromProps(a,o){return o.location!==a.location||o.revalidation!=="idle"&&a.revalidation==="idle"?{error:a.error,location:a.location,revalidation:a.revalidation}:{error:a.error!==void 0?a.error:o.error,location:o.location,revalidation:a.revalidation||o.revalidation}}componentDidCatch(a,o){this.props.onError?this.props.onError(a,o):console.error("React Router caught the following error during render",a)}render(){let a=this.state.error;if(this.context&&typeof a=="object"&&a&&"digest"in a&&typeof a.digest=="string"){const s=Fg(a.digest);s&&(a=s)}let o=a!==void 0?v.createElement(gr.Provider,{value:this.props.routeContext},v.createElement(cc.Provider,{value:a,children:this.props.component})):this.props.children;return this.context?v.createElement($g,{error:a},o):o}};af.contextType=Zp;var Ds=new WeakMap;function $g({children:a,error:o}){let{basename:s}=v.useContext(Qt);if(typeof o=="object"&&o&&"digest"in o&&typeof o.digest=="string"){let d=Lg(o.digest);if(d){let p=Ds.get(o);if(p)throw p;let u=Op(d.location,s);if($p&&!Ds.get(o))if(u.isExternal||d.reloadDocument)window.location.href=u.absoluteURL||u.to;else{const m=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(u.to,{replace:d.replace}));throw Ds.set(o,m),m}return v.createElement("meta",{httpEquiv:"refresh",content:`0;url=${u.absoluteURL||u.to}`})}}return a}function Og({routeContext:a,match:o,children:s}){let d=v.useContext(Bn);return d&&d.static&&d.staticContext&&(o.route.errorElement||o.route.ErrorBoundary)&&(d.staticContext._deepestRenderedBoundaryId=o.route.id),v.createElement(gr.Provider,{value:a},s)}function Ug(a,o=[],s=null,d=null,p=null){if(a==null){if(!s)return null;if(s.errors)a=s.matches;else if(o.length===0&&!s.initialized&&s.matches.length>0)a=s.matches;else return null}let u=a,m=s==null?void 0:s.errors;if(m!=null){let S=u.findIndex(b=>b.route.id&&(m==null?void 0:m[b.route.id])!==void 0);Le(S>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(m).join(",")}`),u=u.slice(0,Math.min(u.length,S+1))}let g=!1,h=-1;if(s)for(let S=0;S<u.length;S++){let b=u[S];if((b.route.HydrateFallback||b.route.hydrateFallbackElement)&&(h=S),b.route.id){let{loaderData:N,errors:w}=s,M=b.route.loader&&!N.hasOwnProperty(b.route.id)&&(!w||w[b.route.id]===void 0);if(b.route.lazy||M){g=!0,h>=0?u=u.slice(0,h+1):u=[u[0]];break}}}let x=s&&d?(S,b)=>{var N,w;d(S,{location:s.location,params:((w=(N=s.matches)==null?void 0:N[0])==null?void 0:w.params)??{},unstable_pattern:yi(s.matches),errorInfo:b})}:void 0;return u.reduceRight((S,b,N)=>{let w,M=!1,A=null,_=null;s&&(w=m&&b.route.id?m[b.route.id]:void 0,A=b.route.errorElement||Ig,g&&(h<0&&N===0?(lf("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),M=!0,_=null):h===N&&(M=!0,_=b.route.hydrateFallbackElement||null)));let q=o.concat(u.slice(0,N+1)),$=()=>{let J;return w?J=A:M?J=_:b.route.Component?J=v.createElement(b.route.Component,null):b.route.element?J=b.route.element:J=S,v.createElement(Og,{match:b,routeContext:{outlet:S,matches:q,isDataRoute:s!=null},children:J})};return s&&(b.route.ErrorBoundary||b.route.errorElement||N===0)?v.createElement(af,{location:s.location,revalidation:s.revalidation,component:A,error:w,children:$(),routeContext:{outlet:null,matches:q,isDataRoute:!0},onError:x}):$()},null)}function dc(a){return`${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Wg(a){let o=v.useContext(Bn);return Le(o,dc(a)),o}function Hg(a){let o=v.useContext(bi);return Le(o,dc(a)),o}function Gg(a){let o=v.useContext(gr);return Le(o,dc(a)),o}function uc(a){let o=Gg(a),s=o.matches[o.matches.length-1];return Le(s.route.id,`${a} can only be used on routes that contain a unique "id"`),s.route.id}function Vg(){return uc("useRouteId")}function Yg(){var d;let a=v.useContext(cc),o=Hg("useRouteError"),s=uc("useRouteError");return a!==void 0?a:(d=o.errors)==null?void 0:d[s]}function Kg(){let{router:a}=Wg("useNavigate"),o=uc("useNavigate"),s=v.useRef(!1);return nf(()=>{s.current=!0}),v.useCallback(async(p,u={})=>{et(s.current,rf),s.current&&(typeof p=="number"?await a.navigate(p):await a.navigate(p,{fromRouteId:o,...u}))},[a,o])}var gp={};function lf(a,o,s){!o&&!gp[a]&&(gp[a]=!0,et(!1,s))}var hp={};function xp(a,o){!a&&!hp[o]&&(hp[o]=!0,console.warn(o))}var qg="useOptimistic",yp=gm[qg],Qg=()=>{};function Xg(a){return yp?yp(a):[a,Qg]}function Jg(a){let o={hasErrorBoundary:a.hasErrorBoundary||a.ErrorBoundary!=null||a.errorElement!=null};return a.Component&&(a.element&&et(!1,"You should not include both `Component` and `element` on your route - `Component` will be used."),Object.assign(o,{element:v.createElement(a.Component),Component:void 0})),a.HydrateFallback&&(a.hydrateFallbackElement&&et(!1,"You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."),Object.assign(o,{hydrateFallbackElement:v.createElement(a.HydrateFallback),HydrateFallback:void 0})),a.ErrorBoundary&&(a.errorElement&&et(!1,"You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."),Object.assign(o,{errorElement:v.createElement(a.ErrorBoundary),ErrorBoundary:void 0})),o}var Zg=["HydrateFallback","hydrateFallbackElement"],eh=class{constructor(){this.status="pending",this.promise=new Promise((a,o)=>{this.resolve=s=>{this.status==="pending"&&(this.status="resolved",a(s))},this.reject=s=>{this.status==="pending"&&(this.status="rejected",o(s))}})}};function th({router:a,flushSync:o,onError:s,unstable_useTransitions:d}){d=Eg()||d;let[u,m]=v.useState(a.state),[g,h]=Xg(u),[x,S]=v.useState(),[b,N]=v.useState({isTransitioning:!1}),[w,M]=v.useState(),[A,_]=v.useState(),[q,$]=v.useState(),J=v.useRef(new Map),ne=v.useCallback((B,{deletedFetchers:X,newErrors:ye,flushSync:ze,viewTransitionOpts:Re})=>{ye&&s&&Object.values(ye).forEach(O=>{var pe;return s(O,{location:B.location,params:((pe=B.matches[0])==null?void 0:pe.params)??{},unstable_pattern:yi(B.matches)})}),B.fetchers.forEach((O,pe)=>{O.data!==void 0&&J.current.set(pe,O.data)}),X.forEach(O=>J.current.delete(O)),xp(ze===!1||o!=null,'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');let Ce=a.window!=null&&a.window.document!=null&&typeof a.window.document.startViewTransition=="function";if(xp(Re==null||Ce,"You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."),!Re||!Ce){o&&ze?o(()=>m(B)):d===!1?m(B):v.startTransition(()=>{d===!0&&h(O=>bp(O,B)),m(B)});return}if(o&&ze){o(()=>{A&&(w==null||w.resolve(),A.skipTransition()),N({isTransitioning:!0,flushSync:!0,currentLocation:Re.currentLocation,nextLocation:Re.nextLocation})});let O=a.window.document.startViewTransition(()=>{o(()=>m(B))});O.finished.finally(()=>{o(()=>{M(void 0),_(void 0),S(void 0),N({isTransitioning:!1})})}),o(()=>_(O));return}A?(w==null||w.resolve(),A.skipTransition(),$({state:B,currentLocation:Re.currentLocation,nextLocation:Re.nextLocation})):(S(B),N({isTransitioning:!0,flushSync:!1,currentLocation:Re.currentLocation,nextLocation:Re.nextLocation}))},[a.window,o,A,w,d,h,s]);v.useLayoutEffect(()=>a.subscribe(ne),[a,ne]),v.useEffect(()=>{b.isTransitioning&&!b.flushSync&&M(new eh)},[b]),v.useEffect(()=>{if(w&&x&&a.window){let B=x,X=w.promise,ye=a.window.document.startViewTransition(async()=>{d===!1?m(B):v.startTransition(()=>{d===!0&&h(ze=>bp(ze,B)),m(B)}),await X});ye.finished.finally(()=>{M(void 0),_(void 0),S(void 0),N({isTransitioning:!1})}),_(ye)}},[x,w,a.window,d,h]),v.useEffect(()=>{w&&x&&g.location.key===x.location.key&&w.resolve()},[w,A,g.location,x]),v.useEffect(()=>{!b.isTransitioning&&q&&(S(q.state),N({isTransitioning:!0,flushSync:!1,currentLocation:q.currentLocation,nextLocation:q.nextLocation}),$(void 0))},[b.isTransitioning,q]);let Q=v.useMemo(()=>({createHref:a.createHref,encodeLocation:a.encodeLocation,go:B=>a.navigate(B),push:(B,X,ye)=>a.navigate(B,{state:X,preventScrollReset:ye==null?void 0:ye.preventScrollReset}),replace:(B,X,ye)=>a.navigate(B,{replace:!0,state:X,preventScrollReset:ye==null?void 0:ye.preventScrollReset})}),[a]),Z=a.basename||"/",j=v.useMemo(()=>({router:a,navigator:Q,static:!1,basename:Z,onError:s}),[a,Q,Z,s]);return v.createElement(v.Fragment,null,v.createElement(Bn.Provider,{value:j},v.createElement(bi.Provider,{value:g},v.createElement(ef.Provider,{value:J.current},v.createElement(sc.Provider,{value:b},v.createElement(ih,{basename:Z,location:g.location,navigationType:g.historyAction,navigator:Q,unstable_useTransitions:d},v.createElement(rh,{routes:a.routes,future:a.future,state:g,onError:s})))))),null)}function bp(a,o){return{...a,navigation:o.navigation.state!=="idle"?o.navigation:a.navigation,revalidation:o.revalidation!=="idle"?o.revalidation:a.revalidation,actionData:o.navigation.state!=="submitting"?o.actionData:a.actionData,fetchers:o.fetchers}}var rh=v.memo(nh);function nh({routes:a,future:o,state:s,onError:d}){return _g(a,void 0,s,d,o)}function ah(a){return Mg(a.context)}function ih({basename:a="/",children:o=null,location:s,navigationType:d="POP",navigator:p,static:u=!1,unstable_useTransitions:m}){Le(!vi(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let g=a.replace(/^\/*/,"/"),h=v.useMemo(()=>({basename:g,navigator:p,static:u,unstable_useTransitions:m,future:{}}),[g,p,u,m]);typeof s=="string"&&(s=sn(s));let{pathname:x="/",search:S="",hash:b="",state:N=null,key:w="default"}=s,M=v.useMemo(()=>{let A=qt(x,g);return A==null?null:{location:{pathname:A,search:S,hash:b,state:N,key:w},navigationType:d}},[g,x,S,b,N,w,d]);return et(M!=null,`<Router basename="${g}"> is not able to match the URL "${x}${S}${b}" because it does not start with the basename, so the <Router> won't render anything.`),M==null?null:v.createElement(Qt.Provider,{value:h},v.createElement(Hl.Provider,{children:o,value:M}))}var Al="get",Il="application/x-www-form-urlencoded";function Gl(a){return typeof HTMLElement<"u"&&a instanceof HTMLElement}function lh(a){return Gl(a)&&a.tagName.toLowerCase()==="button"}function oh(a){return Gl(a)&&a.tagName.toLowerCase()==="form"}function sh(a){return Gl(a)&&a.tagName.toLowerCase()==="input"}function ch(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function dh(a,o){return a.button===0&&(!o||o==="_self")&&!ch(a)}function Qs(a=""){return new URLSearchParams(typeof a=="string"||Array.isArray(a)||a instanceof URLSearchParams?a:Object.keys(a).reduce((o,s)=>{let d=a[s];return o.concat(Array.isArray(d)?d.map(p=>[s,p]):[[s,d]])},[]))}function uh(a,o){let s=Qs(a);return o&&o.forEach((d,p)=>{s.has(p)||o.getAll(p).forEach(u=>{s.append(p,u)})}),s}var Tl=null;function ph(){if(Tl===null)try{new FormData(document.createElement("form"),0),Tl=!1}catch{Tl=!0}return Tl}var fh=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ms(a){return a!=null&&!fh.has(a)?(et(!1,`"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Il}"`),null):a}function mh(a,o){let s,d,p,u,m;if(oh(a)){let g=a.getAttribute("action");d=g?qt(g,o):null,s=a.getAttribute("method")||Al,p=Ms(a.getAttribute("enctype"))||Il,u=new FormData(a)}else if(lh(a)||sh(a)&&(a.type==="submit"||a.type==="image")){let g=a.form;if(g==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let h=a.getAttribute("formaction")||g.getAttribute("action");if(d=h?qt(h,o):null,s=a.getAttribute("formmethod")||g.getAttribute("method")||Al,p=Ms(a.getAttribute("formenctype"))||Ms(g.getAttribute("enctype"))||Il,u=new FormData(g,a),!ph()){let{name:x,type:S,value:b}=a;if(S==="image"){let N=x?`${x}.`:"";u.append(`${N}x`,"0"),u.append(`${N}y`,"0")}else x&&u.append(x,b)}}else{if(Gl(a))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');s=Al,d=null,p=Il,m=a}return u&&p==="text/plain"&&(m=u,u=void 0),{action:d,method:s.toLowerCase(),encType:p,formData:u,body:m}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function pc(a,o){if(a===!1||a===null||typeof a>"u")throw new Error(o)}function gh(a,o,s,d){let p=typeof a=="string"?new URL(a,typeof window>"u"?"server://singlefetch/":window.location.origin):a;return s?p.pathname.endsWith("/")?p.pathname=`${p.pathname}_.${d}`:p.pathname=`${p.pathname}.${d}`:p.pathname==="/"?p.pathname=`_root.${d}`:o&&qt(p.pathname,o)==="/"?p.pathname=`${o.replace(/\/$/,"")}/_root.${d}`:p.pathname=`${p.pathname.replace(/\/$/,"")}.${d}`,p}async function hh(a,o){if(a.id in o)return o[a.id];try{let s=await import(a.module);return o[a.id]=s,s}catch(s){return console.error(`Error loading route module \`${a.module}\`, reloading page...`),console.error(s),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function xh(a){return a==null?!1:a.href==null?a.rel==="preload"&&typeof a.imageSrcSet=="string"&&typeof a.imageSizes=="string":typeof a.rel=="string"&&typeof a.href=="string"}async function yh(a,o,s){let d=await Promise.all(a.map(async p=>{let u=o.routes[p.route.id];if(u){let m=await hh(u,s);return m.links?m.links():[]}return[]}));return kh(d.flat(1).filter(xh).filter(p=>p.rel==="stylesheet"||p.rel==="preload").map(p=>p.rel==="stylesheet"?{...p,rel:"prefetch",as:"style"}:{...p,rel:"prefetch"}))}function vp(a,o,s,d,p,u){let m=(h,x)=>s[x]?h.route.id!==s[x].route.id:!0,g=(h,x)=>{var S;return s[x].pathname!==h.pathname||((S=s[x].route.path)==null?void 0:S.endsWith("*"))&&s[x].params["*"]!==h.params["*"]};return u==="assets"?o.filter((h,x)=>m(h,x)||g(h,x)):u==="data"?o.filter((h,x)=>{var b;let S=d.routes[h.route.id];if(!S||!S.hasLoader)return!1;if(m(h,x)||g(h,x))return!0;if(h.route.shouldRevalidate){let N=h.route.shouldRevalidate({currentUrl:new URL(p.pathname+p.search+p.hash,window.origin),currentParams:((b=s[0])==null?void 0:b.params)||{},nextUrl:new URL(a,window.origin),nextParams:h.params,defaultShouldRevalidate:!0});if(typeof N=="boolean")return N}return!0}):[]}function bh(a,o,{includeHydrateFallback:s}={}){return vh(a.map(d=>{let p=o.routes[d.route.id];if(!p)return[];let u=[p.module];return p.clientActionModule&&(u=u.concat(p.clientActionModule)),p.clientLoaderModule&&(u=u.concat(p.clientLoaderModule)),s&&p.hydrateFallbackModule&&(u=u.concat(p.hydrateFallbackModule)),p.imports&&(u=u.concat(p.imports)),u}).flat(1))}function vh(a){return[...new Set(a)]}function wh(a){let o={},s=Object.keys(a).sort();for(let d of s)o[d]=a[d];return o}function kh(a,o){let s=new Set;return new Set(o),a.reduce((d,p)=>{let u=JSON.stringify(wh(p));return s.has(u)||(s.add(u),d.push({key:u,link:p})),d},[])}function of(){let a=v.useContext(Bn);return pc(a,"You must render this element inside a <DataRouterContext.Provider> element"),a}function jh(){let a=v.useContext(bi);return pc(a,"You must render this element inside a <DataRouterStateContext.Provider> element"),a}var fc=v.createContext(void 0);fc.displayName="FrameworkContext";function sf(){let a=v.useContext(fc);return pc(a,"You must render this element inside a <HydratedRouter> element"),a}function Sh(a,o){let s=v.useContext(fc),[d,p]=v.useState(!1),[u,m]=v.useState(!1),{onFocus:g,onBlur:h,onMouseEnter:x,onMouseLeave:S,onTouchStart:b}=o,N=v.useRef(null);v.useEffect(()=>{if(a==="render"&&m(!0),a==="viewport"){let A=q=>{q.forEach($=>{m($.isIntersecting)})},_=new IntersectionObserver(A,{threshold:.5});return N.current&&_.observe(N.current),()=>{_.disconnect()}}},[a]),v.useEffect(()=>{if(d){let A=setTimeout(()=>{m(!0)},100);return()=>{clearTimeout(A)}}},[d]);let w=()=>{p(!0)},M=()=>{p(!1),m(!1)};return s?a!=="intent"?[u,N,{}]:[u,N,{onFocus:si(g,w),onBlur:si(h,M),onMouseEnter:si(x,w),onMouseLeave:si(S,M),onTouchStart:si(b,w)}]:[!1,N,{}]}function si(a,o){return s=>{a&&a(s),s.defaultPrevented||o(s)}}function Ch({page:a,...o}){let{router:s}=of(),d=v.useMemo(()=>an(s.routes,a,s.basename),[s.routes,a,s.basename]);return d?v.createElement(Eh,{page:a,matches:d,...o}):null}function Nh(a){let{manifest:o,routeModules:s}=sf(),[d,p]=v.useState([]);return v.useEffect(()=>{let u=!1;return yh(a,o,s).then(m=>{u||p(m)}),()=>{u=!0}},[a,o,s]),d}function Eh({page:a,matches:o,...s}){let d=Pr(),{future:p,manifest:u,routeModules:m}=sf(),{basename:g}=of(),{loaderData:h,matches:x}=jh(),S=v.useMemo(()=>vp(a,o,x,u,d,"data"),[a,o,x,u,d]),b=v.useMemo(()=>vp(a,o,x,u,d,"assets"),[a,o,x,u,d]),N=v.useMemo(()=>{if(a===d.pathname+d.search+d.hash)return[];let A=new Set,_=!1;if(o.forEach($=>{var ne;let J=u.routes[$.route.id];!J||!J.hasLoader||(!S.some(Q=>Q.route.id===$.route.id)&&$.route.id in h&&((ne=m[$.route.id])!=null&&ne.shouldRevalidate)||J.hasClientLoader?_=!0:A.add($.route.id))}),A.size===0)return[];let q=gh(a,g,p.unstable_trailingSlashAwareDataRequests,"data");return _&&A.size>0&&q.searchParams.set("_routes",o.filter($=>A.has($.route.id)).map($=>$.route.id).join(",")),[q.pathname+q.search]},[g,p.unstable_trailingSlashAwareDataRequests,h,d,u,S,o,a,m]),w=v.useMemo(()=>bh(b,u),[b,u]),M=Nh(b);return v.createElement(v.Fragment,null,N.map(A=>v.createElement("link",{key:A,rel:"prefetch",as:"fetch",href:A,...s})),w.map(A=>v.createElement("link",{key:A,rel:"modulepreload",href:A,...s})),M.map(({key:A,link:_})=>v.createElement("link",{key:A,nonce:s.nonce,..._,crossOrigin:_.crossOrigin??s.crossOrigin})))}function zh(...a){return o=>{a.forEach(s=>{typeof s=="function"?s(o):s!=null&&(s.current=o)})}}var Rh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Rh&&(window.__reactRouterVersion="7.13.0")}catch{}function Ph(a,o){return rg({basename:o==null?void 0:o.basename,getContext:o==null?void 0:o.getContext,future:o==null?void 0:o.future,history:ym({window:o==null?void 0:o.window}),hydrationData:Lh(),routes:a,mapRouteProperties:Jg,hydrationRouteProperties:Zg,dataStrategy:o==null?void 0:o.dataStrategy,patchRoutesOnNavigation:o==null?void 0:o.patchRoutesOnNavigation,window:o==null?void 0:o.window,unstable_instrumentations:o==null?void 0:o.unstable_instrumentations}).initialize()}function Lh(){let a=window==null?void 0:window.__staticRouterHydrationData;return a&&a.errors&&(a={...a,errors:Fh(a.errors)}),a}function Fh(a){if(!a)return null;let o=Object.entries(a),s={};for(let[d,p]of o)if(p&&p.__type==="RouteErrorResponse")s[d]=new xi(p.status,p.statusText,p.data,p.internal===!0);else if(p&&p.__type==="Error"){if(p.__subType){let u=window[p.__subType];if(typeof u=="function")try{let m=new u(p.message);m.stack="",s[d]=m}catch{}}if(s[d]==null){let u=new Error(p.message);u.stack="",s[d]=u}}else s[d]=p;return s}var cf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kt=v.forwardRef(function({onClick:o,discover:s="render",prefetch:d="none",relative:p,reloadDocument:u,replace:m,state:g,target:h,to:x,preventScrollReset:S,viewTransition:b,unstable_defaultShouldRevalidate:N,...w},M){let{basename:A,unstable_useTransitions:_}=v.useContext(Qt),q=typeof x=="string"&&cf.test(x),$=Op(x,A);x=$.to;let J=Tg(x,{relative:p}),[ne,Q,Z]=Sh(d,w),j=Mh(x,{replace:m,state:g,target:h,preventScrollReset:S,relative:p,viewTransition:b,unstable_defaultShouldRevalidate:N,unstable_useTransitions:_});function B(ye){o&&o(ye),ye.defaultPrevented||j(ye)}let X=v.createElement("a",{...w,...Z,href:$.absoluteURL||J,onClick:$.isExternal||u?o:B,ref:zh(M,Q),target:h,"data-discover":!q&&s==="render"?"true":void 0});return ne&&!q?v.createElement(v.Fragment,null,X,v.createElement(Ch,{page:J})):X});Kt.displayName="Link";var Th=v.forwardRef(function({"aria-current":o="page",caseSensitive:s=!1,className:d="",end:p=!1,style:u,to:m,viewTransition:g,children:h,...x},S){let b=wi(m,{relative:x.relative}),N=Pr(),w=v.useContext(bi),{navigator:M,basename:A}=v.useContext(Qt),_=w!=null&&Oh(b)&&g===!0,q=M.encodeLocation?M.encodeLocation(b).pathname:b.pathname,$=N.pathname,J=w&&w.navigation&&w.navigation.location?w.navigation.location.pathname:null;s||($=$.toLowerCase(),J=J?J.toLowerCase():null,q=q.toLowerCase()),J&&A&&(J=qt(J,A)||J);const ne=q!=="/"&&q.endsWith("/")?q.length-1:q.length;let Q=$===q||!p&&$.startsWith(q)&&$.charAt(ne)==="/",Z=J!=null&&(J===q||!p&&J.startsWith(q)&&J.charAt(q.length)==="/"),j={isActive:Q,isPending:Z,isTransitioning:_},B=Q?o:void 0,X;typeof d=="function"?X=d(j):X=[d,Q?"active":null,Z?"pending":null,_?"transitioning":null].filter(Boolean).join(" ");let ye=typeof u=="function"?u(j):u;return v.createElement(Kt,{...x,"aria-current":B,className:X,ref:S,style:ye,to:m,viewTransition:g},typeof h=="function"?h(j):h)});Th.displayName="NavLink";var Bh=v.forwardRef(({discover:a="render",fetcherKey:o,navigate:s,reloadDocument:d,replace:p,state:u,method:m=Al,action:g,onSubmit:h,relative:x,preventScrollReset:S,viewTransition:b,unstable_defaultShouldRevalidate:N,...w},M)=>{let{unstable_useTransitions:A}=v.useContext(Qt),_=Ih(),q=$h(g,{relative:x}),$=m.toLowerCase()==="get"?"get":"post",J=typeof g=="string"&&cf.test(g),ne=Q=>{if(h&&h(Q),Q.defaultPrevented)return;Q.preventDefault();let Z=Q.nativeEvent.submitter,j=(Z==null?void 0:Z.getAttribute("formmethod"))||m,B=()=>_(Z||Q.currentTarget,{fetcherKey:o,method:j,navigate:s,replace:p,state:u,relative:x,preventScrollReset:S,viewTransition:b,unstable_defaultShouldRevalidate:N});A&&s!==!1?v.startTransition(()=>B()):B()};return v.createElement("form",{ref:M,method:$,action:q,onSubmit:d?h:ne,...w,"data-discover":!J&&a==="render"?"true":void 0})});Bh.displayName="Form";function Dh(a){return`${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function df(a){let o=v.useContext(Bn);return Le(o,Dh(a)),o}function Mh(a,{target:o,replace:s,state:d,preventScrollReset:p,relative:u,viewTransition:m,unstable_defaultShouldRevalidate:g,unstable_useTransitions:h}={}){let x=Lr(),S=Pr(),b=wi(a,{relative:u});return v.useCallback(N=>{if(dh(N,o)){N.preventDefault();let w=s!==void 0?s:fr(S)===fr(b),M=()=>x(a,{replace:w,state:d,preventScrollReset:p,relative:u,viewTransition:m,unstable_defaultShouldRevalidate:g});h?v.startTransition(()=>M()):M()}},[S,x,b,s,d,o,a,p,u,m,g,h])}function uf(a){et(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let o=v.useRef(Qs(a)),s=v.useRef(!1),d=Pr(),p=v.useMemo(()=>uh(d.search,s.current?null:o.current),[d.search]),u=Lr(),m=v.useCallback((g,h)=>{const x=Qs(typeof g=="function"?g(new URLSearchParams(p)):g);s.current=!0,u("?"+x,h)},[u,p]);return[p,m]}var _h=0,Ah=()=>`__${String(++_h)}__`;function Ih(){let{router:a}=df("useSubmit"),{basename:o}=v.useContext(Qt),s=Vg(),d=a.fetch,p=a.navigate;return v.useCallback(async(u,m={})=>{let{action:g,method:h,encType:x,formData:S,body:b}=mh(u,o);if(m.navigate===!1){let N=m.fetcherKey||Ah();await d(N,s,m.action||g,{unstable_defaultShouldRevalidate:m.unstable_defaultShouldRevalidate,preventScrollReset:m.preventScrollReset,formData:S,body:b,formMethod:m.method||h,formEncType:m.encType||x,flushSync:m.flushSync})}else await p(m.action||g,{unstable_defaultShouldRevalidate:m.unstable_defaultShouldRevalidate,preventScrollReset:m.preventScrollReset,formData:S,body:b,formMethod:m.method||h,formEncType:m.encType||x,replace:m.replace,state:m.state,fromRouteId:s,flushSync:m.flushSync,viewTransition:m.viewTransition})},[d,p,o,s])}function $h(a,{relative:o}={}){let{basename:s}=v.useContext(Qt),d=v.useContext(gr);Le(d,"useFormAction must be used inside a RouteContext");let[p]=d.matches.slice(-1),u={...wi(a||".",{relative:o})},m=Pr();if(a==null){u.search=m.search;let g=new URLSearchParams(u.search),h=g.getAll("index");if(h.some(S=>S==="")){g.delete("index"),h.filter(b=>b).forEach(b=>g.append("index",b));let S=g.toString();u.search=S?`?${S}`:""}}return(!a||a===".")&&p.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),s!=="/"&&(u.pathname=u.pathname==="/"?s:pr([s,u.pathname])),fr(u)}function Oh(a,{relative:o}={}){let s=v.useContext(sc);Le(s!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:d}=df("useViewTransitionState"),p=wi(a,{relative:o});if(!s.isTransitioning)return!1;let u=qt(s.currentLocation.pathname,d)||s.currentLocation.pathname,m=qt(s.nextLocation.pathname,d)||s.nextLocation.pathname;return Ol(p.pathname,m)!=null||Ol(p.pathname,u)!=null}/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uh=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Wh=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,s,d)=>d?d.toUpperCase():s.toLowerCase()),wp=a=>{const o=Wh(a);return o.charAt(0).toUpperCase()+o.slice(1)},pf=(...a)=>a.filter((o,s,d)=>!!o&&o.trim()!==""&&d.indexOf(o)===s).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Hh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gh=v.forwardRef(({color:a="currentColor",size:o=24,strokeWidth:s=2,absoluteStrokeWidth:d,className:p="",children:u,iconNode:m,...g},h)=>v.createElement("svg",{ref:h,...Hh,width:o,height:o,stroke:a,strokeWidth:d?Number(s)*24/Number(o):s,className:pf("lucide",p),...g},[...m.map(([x,S])=>v.createElement(x,S)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=(a,o)=>{const s=v.forwardRef(({className:d,...p},u)=>v.createElement(Gh,{ref:u,iconNode:o,className:pf(`lucide-${Uh(wp(a))}`,`lucide-${a}`,d),...p}));return s.displayName=wp(a),s};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vh=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Yh=we("arrow-left",Vh);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kh=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],mr=we("arrow-right",Kh);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qh=[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]],Qh=we("arrow-up-down",qh);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xh=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],ff=we("bell",Xh);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jh=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],mf=we("camera",Jh);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zh=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],pa=we("chevron-down",Zh);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e2=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],gf=we("chevron-left",e2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],ga=we("chevron-right",t2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],hi=we("circle-alert",r2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],pt=we("circle-check-big",n2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],i2=we("circle-check",a2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],o2=we("circle-help",l2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],ha=we("clock",s2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c2=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],d2=we("copy",c2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],Xs=we("credit-card",u2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p2=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],hf=we("external-link",p2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f2=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],m2=we("eye-off",f2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Js=we("eye",g2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],x2=we("file-text",h2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y2=[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]],b2=we("gamepad-2",y2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v2=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],w2=we("hash",v2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k2=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],_s=we("heart",k2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],S2=we("info",j2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C2=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],As=we("instagram",C2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N2=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Zs=we("lock",N2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E2=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],ec=we("log-out",E2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],R2=we("mail",z2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],L2=we("map-pin",P2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],T2=we("menu",F2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],$l=we("message-circle",B2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D2=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Ul=we("package",D2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M2=[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]],kp=we("pen-line",M2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _2=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],A2=we("phone",_2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I2=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]],$2=we("quote",I2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],U2=we("refresh-cw",O2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W2=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Wl=we("search",W2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],xf=we("settings",H2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G2=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Mt=we("shield",G2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]],Y2=we("sliders-horizontal",V2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],mc=we("smartphone",K2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Ln=we("star",q2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Fn=we("tag",Q2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X2=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]],yf=we("trending-up",X2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J2=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],bf=we("trophy",J2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z2=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],e5=we("upload",Z2);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t5=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Tn=we("user",t5);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r5=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],xa=we("wallet",r5);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n5=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],fa=we("x",n5);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a5=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Qe=we("zap",a5),vf=v.createContext(void 0);function i5({children:a}){const[o,s]=v.useState(null),[d,p]=v.useState(!1),u=(h,x)=>{s({id:"1",name:"User",email:h,avatar:"👤",verified:h==="demo@okegass.com",balance:15e4}),p(!1)},m=(h,x,S)=>{s({id:"1",name:h,email:x,avatar:"👤",verified:!1,balance:0}),p(!1)},g=()=>{s(null)};return n.jsx(vf.Provider,{value:{user:o,login:u,register:m,logout:g,showAuthModal:d,setShowAuthModal:p},children:a})}function wf(){const a=v.useContext(vf);if(!a)throw new Error("useAuth must be used within AuthProvider");return a}const l5=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

/* ── Overlay ── */
.am-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  padding: 16px; font-family: 'Barlow', sans-serif;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: am-fade 0.2s ease;
}

/* ── Modal ── */
.am-modal {
  position: relative; width: 100%; max-width: 460px;
  background: #0f0f12;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px; overflow: hidden;
  box-shadow:
    0 40px 100px rgba(0,0,0,0.9),
    0 0 0 1px rgba(255,255,255,0.04),
    inset 0 1px 0 rgba(255,255,255,0.06);
  animation: am-up 0.32s cubic-bezier(0.34,1.56,0.64,1);
}

/* ── Hero ── */
.am-hero {
  position: relative; padding: 30px 28px 26px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.am-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg,
    rgba(220,38,38,0.22) 0%,
    rgba(234,88,12,0.10) 45%,
    rgba(0,0,0,0) 100%);
}
.am-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 28px 28px;
}
.am-hero-glow {
  position: absolute; top: -60px; left: -60px;
  width: 240px; height: 240px; border-radius: 50%;
  background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%);
  pointer-events: none;
}
.am-hero-glow2 {
  position: absolute; bottom: -40px; right: -20px;
  width: 160px; height: 160px; border-radius: 50%;
  background: radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 70%);
  pointer-events: none;
}

/* ── Brand ── */
.am-brand {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.am-brand-left { display: flex; align-items: center; gap: 14px; }
.am-brand-icon {
  width: 52px; height: 52px; border-radius: 16px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  box-shadow: 0 8px 24px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  position: relative; overflow: hidden;
}
.am-brand-icon::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  border-radius: 16px 16px 0 0;
}
.am-brand-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 28px; font-weight: 700; color: #fff; letter-spacing: 0.5px;
  line-height: 1;
}
.am-brand-tagline { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; letter-spacing: 0.04em; }
.am-close-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.25s; color: rgba(255,255,255,0.35);
  position: relative; z-index: 2;
}
.am-close-btn:hover {
  background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.35);
  color: #DC2626; transform: rotate(90deg);
}

/* ── Trust badges ── */
.am-trust-row {
  position: relative; z-index: 2;
  display: flex; gap: 8px; flex-wrap: wrap;
}
.am-trust-badge {
  display: flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 5px 11px;
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.38);
  transition: all 0.2s;
}
.am-trust-badge:hover { border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.6); }

/* ── Tabs ── */
.am-tabs-wrap {
  padding: 16px 28px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.am-tabs { display: flex; }
.am-tab {
  flex: 1; padding: 12px 0 14px; font-size: 13px; font-weight: 700;
  font-family: 'Barlow', sans-serif;
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.28); transition: all 0.2s;
  position: relative; letter-spacing: 0.03em;
}
.am-tab.active { color: #fff; }
.am-tab.active::after {
  content: ''; position: absolute; bottom: -1px; left: 16px; right: 16px; height: 2px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
  border-radius: 2px 2px 0 0;
}
.am-tab:hover:not(.active) { color: rgba(255,255,255,0.55); }

/* ── Body ── */
.am-body { padding: 22px 28px 28px; display: flex; flex-direction: column; gap: 14px; }

/* ── Field ── */
.am-field { display: flex; flex-direction: column; gap: 7px; }
.am-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase; letter-spacing: 0.08em;
}

/* ── Input ── */
.am-input-wrap { position: relative; }
.am-input {
  width: 100%; padding: 12px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 11px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.am-input::placeholder { color: rgba(255,255,255,0.13); }
.am-input:focus {
  border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.09);
}
.am-input.has-icon { padding-right: 44px; }
.am-input-icon {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.22); transition: color 0.2s; padding: 0;
  display: flex; align-items: center;
}
.am-input-icon:hover { color: rgba(255,255,255,0.6); }

/* ── Demo hint ── */
.am-demo-hint {
  background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.18);
  border-radius: 11px; padding: 13px 14px;
  font-size: 12px; color: rgba(255,255,255,0.42); line-height: 1.75;
}
.am-demo-hint strong {
  display: block; color: #60A5FA; font-size: 10px;
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px;
}
.am-demo-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; flex-wrap: wrap;
}
.am-demo-vals { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.am-demo-val {
  font-family: monospace; font-size: 12px;
  background: rgba(59,130,246,0.12); border-radius: 6px;
  padding: 2px 8px; color: rgba(255,255,255,0.65);
}
.am-autofill-btn {
  background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.25);
  border-radius: 7px; padding: 5px 11px; cursor: pointer;
  font-size: 11px; font-weight: 700; color: #60A5FA;
  font-family: 'Barlow', sans-serif; transition: all 0.2s;
  white-space: nowrap; flex-shrink: 0;
}
.am-autofill-btn:hover { background: rgba(59,130,246,0.25); color: #93C5FD; }

/* ── Alerts ── */
.am-error {
  background: rgba(220,38,38,0.07); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 11px; padding: 11px 14px;
  font-size: 12px; color: rgba(255,100,100,0.9); font-weight: 600;
  display: flex; align-items: flex-start; gap: 8px;
}
.am-notice {
  background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.18);
  border-radius: 11px; padding: 11px 14px;
  font-size: 12px; color: rgba(245,158,11,0.8); font-weight: 600;
  display: flex; align-items: center; gap: 8px;
}

/* ── Submit ── */
.am-submit {
  width: 100%; padding: 14px; border: none; border-radius: 12px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  transition: all 0.25s; letter-spacing: 0.04em;
  box-shadow: 0 4px 18px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  position: relative; overflow: hidden;
}
.am-submit::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
}
.am-submit:hover {
  box-shadow: 0 8px 28px rgba(220,38,38,0.55); transform: translateY(-1px);
}
.am-submit:active { transform: translateY(0); }
.am-submit.success {
  background: linear-gradient(135deg, #059669, #10B981) !important;
  box-shadow: 0 4px 18px rgba(16,185,129,0.35) !important;
}
.am-submit:disabled { cursor: default; }

/* ── Divider ── */
.am-divider { display: flex; align-items: center; gap: 12px; }
.am-divider::before, .am-divider::after {
  content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06);
}
.am-divider span { font-size: 11px; color: rgba(255,255,255,0.18); font-weight: 700; letter-spacing: 0.05em; }

/* ── Google ── */
.am-google-btn {
  width: 100%; padding: 12px; border-radius: 12px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.5); font-family: 'Barlow', sans-serif;
  font-size: 13px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 9px;
  transition: all 0.2s; letter-spacing: 0.03em;
}
.am-google-btn:hover {
  background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.13); color: #fff;
}

/* ── Footer note ── */
.am-footer-note {
  text-align: center; font-size: 11px; color: rgba(255,255,255,0.18);
  line-height: 1.6;
}
.am-footer-note a { color: rgba(220,80,80,0.6); text-decoration: none; }
.am-footer-note a:hover { color: #DC2626; }

/* ── Animations ── */
@keyframes am-fade { from { opacity:0; } to { opacity:1; } }
@keyframes am-up {
  from { opacity:0; transform: translateY(28px) scale(0.96); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}
`;function o5(){const{showAuthModal:a,setShowAuthModal:o,login:s}=wf(),[d,p]=v.useState(!0),[u,m]=v.useState(!1),[g,h]=v.useState(""),[x,S]=v.useState("idle"),[b,N]=v.useState({name:"",email:"",password:""});if(v.useEffect(()=>{if(!a){const _=setTimeout(()=>{N({name:"",email:"",password:""}),h(""),S("idle"),p(!0),m(!1)},300);return()=>clearTimeout(_)}},[a]),!a)return null;const w=()=>{N(_=>({..._,email:"user@okegass.com",password:"password"})),h("")},M=_=>{_.preventDefault(),h(""),d?b.email==="user@okegass.com"&&b.password==="password"?(S("success"),setTimeout(()=>{s(b.email,b.password),o(!1)},800)):h("Email atau password salah! Gunakan akun demo yang tersedia."):h("Pendaftaran akun dinonaktifkan. Gunakan akun demo untuk login.")},A=_=>{p(_),h("")};return n.jsxs("div",{className:"am-overlay",onClick:()=>o(!1),children:[n.jsx("style",{children:l5}),n.jsxs("div",{className:"am-modal",onClick:_=>_.stopPropagation(),children:[n.jsxs("div",{className:"am-hero",children:[n.jsx("div",{className:"am-hero-bg"}),n.jsx("div",{className:"am-hero-grid"}),n.jsx("div",{className:"am-hero-glow"}),n.jsx("div",{className:"am-hero-glow2"}),n.jsxs("div",{className:"am-brand",children:[n.jsxs("div",{className:"am-brand-left",children:[n.jsx("div",{className:"am-brand-icon",children:"🎮"}),n.jsxs("div",{children:[n.jsx("div",{className:"am-brand-name",children:"OkeGass"}),n.jsx("div",{className:"am-brand-tagline",children:"Top Up Game & Jual Beli Akun"})]})]}),n.jsx("button",{type:"button",className:"am-close-btn",onClick:()=>o(!1),"aria-label":"Tutup modal",children:n.jsx(fa,{size:15})})]}),n.jsxs("div",{className:"am-trust-row",children:[n.jsxs("span",{className:"am-trust-badge",children:[n.jsx(pt,{size:11,color:"#10B981"})," Transaksi Aman"]}),n.jsxs("span",{className:"am-trust-badge",children:[n.jsx(Mt,{size:11,color:"#3B82F6"})," Escrow System"]}),n.jsxs("span",{className:"am-trust-badge",children:[n.jsx(bf,{size:11,color:"#F59E0B"})," Trusted Seller"]})]})]}),n.jsx("div",{className:"am-tabs-wrap",children:n.jsxs("div",{className:"am-tabs",children:[n.jsx("button",{type:"button",className:`am-tab ${d?"active":""}`,onClick:()=>A(!0),children:"Masuk"}),n.jsx("button",{type:"button",className:`am-tab ${d?"":"active"}`,onClick:()=>A(!1),children:"Daftar"})]})}),n.jsx("form",{onSubmit:M,children:n.jsxs("div",{className:"am-body",children:[!d&&n.jsxs("div",{className:"am-field",children:[n.jsx("label",{className:"am-label",children:"Nama Lengkap"}),n.jsx("div",{className:"am-input-wrap",children:n.jsx("input",{type:"text",value:b.name,onChange:_=>N({...b,name:_.target.value}),className:"am-input",placeholder:"Masukkan nama lengkap"})})]}),n.jsxs("div",{className:"am-field",children:[n.jsx("label",{className:"am-label",children:"Email"}),n.jsx("div",{className:"am-input-wrap",children:n.jsx("input",{type:"email",value:b.email,onChange:_=>N({...b,email:_.target.value}),className:"am-input",placeholder:"nama@email.com",required:!0})})]}),n.jsxs("div",{className:"am-field",children:[n.jsx("label",{className:"am-label",children:"Password"}),n.jsxs("div",{className:"am-input-wrap",children:[n.jsx("input",{type:u?"text":"password",value:b.password,onChange:_=>N({...b,password:_.target.value}),className:"am-input has-icon",placeholder:"••••••••",required:!0}),n.jsx("button",{type:"button",className:"am-input-icon",onClick:()=>m(!u),children:u?n.jsx(m2,{size:15}):n.jsx(Js,{size:15})})]})]}),d&&n.jsxs("div",{className:"am-demo-hint",children:[n.jsx("strong",{children:"Akun Demo"}),n.jsxs("div",{className:"am-demo-row",children:[n.jsxs("div",{className:"am-demo-vals",children:[n.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,0.3)"},children:"Email:"}),n.jsx("span",{className:"am-demo-val",children:"user@okegass.com"}),n.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,0.3)"},children:"Pass:"}),n.jsx("span",{className:"am-demo-val",children:"password"})]}),n.jsx("button",{type:"button",className:"am-autofill-btn",onClick:w,children:"⚡ Isi Otomatis"})]})]}),!d&&n.jsxs("div",{className:"am-notice",children:[n.jsx(Qe,{size:13,style:{flexShrink:0}}),"Pendaftaran dinonaktifkan. Gunakan akun demo untuk login."]}),g&&n.jsxs("div",{className:"am-error",children:[n.jsx("span",{style:{flexShrink:0},children:"⚠"}),g]}),n.jsx("button",{type:"submit",className:`am-submit ${x==="success"?"success":""}`,disabled:x==="success",children:x==="success"?"✓ Berhasil Masuk!":d?"Masuk ke OkeGass":"Daftar Sekarang"}),n.jsx("div",{className:"am-divider",children:n.jsx("span",{children:"atau"})}),n.jsxs("button",{type:"button",className:"am-google-btn",children:[n.jsx("span",{style:{fontSize:17,lineHeight:1},children:"🔵"}),"Lanjutkan dengan Google"]}),n.jsxs("p",{className:"am-footer-note",children:["Dengan masuk, kamu menyetujui"," ",n.jsx("a",{href:"#",children:"Syarat & Ketentuan"})," dan"," ",n.jsx("a",{href:"#",children:"Kebijakan Privasi"})," OkeGass."]})]})})]})]})}const s5="https://i.pinimg.com/736x/ad/14/4a/ad144a58f41774b689ee453ed420ca77.jpg",c5=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

/* ─── Root ─── */
.nb2-root {
  position: sticky; top: 0; z-index: 100;
  font-family: 'Barlow', sans-serif;
  transition: all 0.35s ease;
}
.nb2-topline {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(220,38,38,0.6) 20%,
    rgba(234,88,12,0.8) 50%,
    rgba(220,38,38,0.6) 80%,
    transparent 100%);
  z-index: 2;
}
.nb2-root.scrolled {
  background: rgba(8,8,10,0.94);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.055);
  box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.6);
}
.nb2-root.top {
  background: rgba(8,8,10,0.7);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

/* ─── Inner ─── */
.nb2-inner {
  max-width: 1280px; margin: 0 auto;
  padding: 0 24px; height: 66px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
  position: relative; z-index: 1;
}

/* ─── Logo wolf ─── */
.nb2-logo {
  display: flex; align-items: center; gap: 11px;
  text-decoration: none; flex-shrink: 0;
}

/* The wolf logo card — 3D tilt + shimmer handled in JS */
.nb2-logo-wolf {
  width: 42px; height: 42px;
  border-radius: 11px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform;
  /* red glow ring */
  box-shadow:
    0 0 0 1.5px rgba(220,38,38,0.45),
    0 0 0 4px rgba(220,38,38,0.07),
    0 0 18px rgba(220,38,38,0.28),
    0 4px 16px rgba(0,0,0,0.6);
  transition: box-shadow 0.3s ease;
}
.nb2-logo-wolf:hover {
  box-shadow:
    0 0 0 1.5px rgba(220,38,38,0.65),
    0 0 0 5px rgba(220,38,38,0.10),
    0 0 28px rgba(220,38,38,0.45),
    0 6px 20px rgba(0,0,0,0.7);
}
.nb2-logo-wolf img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  border-radius: 11px;
  filter: saturate(1.1) contrast(1.05);
  pointer-events: none; user-select: none;
}
/* shimmer overlay — updated by JS */
.nb2-logo-shimmer {
  position: absolute; inset: 0;
  border-radius: 11px;
  pointer-events: none;
  mix-blend-mode: screen;
}
/* static bottom vignette */
.nb2-logo-vignette {
  position: absolute; inset: 0;
  border-radius: 11px;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.22) 100%);
  pointer-events: none;
}

/* Text beside logo */
.nb2-logo-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 21px; font-weight: 700; color: #fff;
  letter-spacing: 0.03em; line-height: 1;
}
.nb2-logo-sub {
  font-size: 9px; font-weight: 600; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.25); text-transform: uppercase;
  margin-top: 3px;
}

/* ─── Nav links ─── */
.nb2-links {
  display: flex; align-items: center; gap: 2px; flex: 1;
  justify-content: center;
}
.nb2-link {
  position: relative; padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
  color: rgba(255,255,255,0.45); text-decoration: none;
  transition: all 0.22s ease; overflow: hidden;
}
.nb2-link::before {
  content: '';
  position: absolute; inset: 0; border-radius: 10px;
  background: linear-gradient(135deg, rgba(220,38,38,0.12), rgba(234,88,12,0.08));
  opacity: 0; transition: opacity 0.22s;
}
.nb2-link::after {
  content: '';
  position: absolute; bottom: 5px; left: 50%; right: 50%;
  height: 1.5px; background: linear-gradient(90deg, #DC2626, #EA580C);
  border-radius: 1px; transition: all 0.25s ease;
}
.nb2-link:hover { color: #fff; }
.nb2-link:hover::before { opacity: 1; }
.nb2-link:hover::after { left: 16px; right: 16px; }
.nb2-link.active { color: #fff; }
.nb2-link.active::before { opacity: 1; }
.nb2-link.active::after { left: 16px; right: 16px; }

/* ─── Right side ─── */
.nb2-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

.nb2-login-btn {
  padding: 8px 20px; border-radius: 9px;
  background: transparent; border: 1px solid rgba(255,255,255,0.1);
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.55); cursor: pointer;
  letter-spacing: 0.04em; transition: all 0.22s ease;
}
.nb2-login-btn:hover {
  border-color: rgba(255,255,255,0.22); color: #fff; background: rgba(255,255,255,0.05);
}
.nb2-register-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 20px; border-radius: 9px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  border: none; font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  color: #fff; cursor: pointer; letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  transition: all 0.25s ease; position: relative; overflow: hidden;
}
.nb2-register-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
}
.nb2-register-btn:hover { box-shadow: 0 6px 24px rgba(220,38,38,0.55); transform: translateY(-1px); }
.nb2-register-btn:active { transform: translateY(0); }

/* user pill */
.nb2-user-pill {
  display: flex; align-items: center; gap: 9px;
  padding: 5px 12px 5px 6px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; cursor: pointer; transition: all 0.22s ease; position: relative;
}
.nb2-user-pill:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.14); }
.nb2-user-pill.open { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.25); }
.nb2-user-avatar {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 700; color: #fff; font-family: 'Rajdhani', sans-serif;
  box-shadow: 0 2px 8px rgba(220,38,38,0.3); flex-shrink: 0; position: relative; overflow: hidden;
}
.nb2-user-avatar::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
}
.nb2-user-info { display: flex; flex-direction: column; }
.nb2-user-name { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); line-height: 1; letter-spacing: 0.02em; }
.nb2-user-level { font-size: 10px; font-weight: 700; color: rgba(245,158,11,0.75); margin-top: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.nb2-chevron { color: rgba(255,255,255,0.3); transition: transform 0.25s ease; flex-shrink: 0; }
.nb2-chevron.open { transform: rotate(180deg); }

/* bell */
.nb2-bell {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.22s ease; color: rgba(255,255,255,0.35); position: relative;
}
.nb2-bell:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.7); }
.nb2-bell-dot {
  position: absolute; top: 7px; right: 7px;
  width: 7px; height: 7px; border-radius: 50%;
  background: #DC2626; box-shadow: 0 0 0 1.5px #0f0f12;
  animation: nb2-pulse 2s ease-in-out infinite;
}
@keyframes nb2-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:0.7} }

/* dropdown */
.nb2-dropdown {
  position: absolute; top: calc(100% + 10px); right: 0; width: 220px;
  background: #111115; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03);
  animation: nb2-drop 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes nb2-drop { from{opacity:0;transform:translateY(-10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
.nb2-dd-user {
  padding: 14px 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 10px;
}
.nb2-dd-avatar-lg {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 700; color: #fff; font-family: 'Rajdhani', sans-serif;
  box-shadow: 0 4px 12px rgba(220,38,38,0.35); flex-shrink: 0; position: relative; overflow: hidden;
}
.nb2-dd-avatar-lg::before {
  content: ''; position: absolute; top:0; left:0; right:0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
}
.nb2-dd-name { font-size: 13px; font-weight: 700; color: #fff; line-height: 1; letter-spacing: 0.02em; }
.nb2-dd-email { font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px; }
.nb2-dd-balance {
  margin: 8px 10px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.15);
  border-radius: 10px; padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
}
.nb2-dd-balance-label { display: flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; color: rgba(16,185,129,0.6); text-transform: uppercase; letter-spacing: 0.06em; }
.nb2-dd-balance-val { font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700; color: #10B981; }
.nb2-dd-section { padding: 6px 6px; }
.nb2-dd-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.5); text-decoration: none; cursor: pointer;
  background: transparent; border: none; width: 100%; text-align: left;
  transition: all 0.18s ease; letter-spacing: 0.02em;
}
.nb2-dd-item-icon {
  width: 28px; height: 28px; border-radius: 7px; background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.18s ease;
}
.nb2-dd-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
.nb2-dd-item:hover .nb2-dd-item-icon { background: rgba(220,38,38,0.12); color: #DC2626; }
.nb2-dd-item.danger { color: rgba(220,60,60,0.6); }
.nb2-dd-item.danger:hover { color: #DC2626; background: rgba(220,38,38,0.07); }
.nb2-dd-item.danger:hover .nb2-dd-item-icon { background: rgba(220,38,38,0.12); }
.nb2-dd-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 4px 10px; }

/* hamburger */
.nb2-hamburger {
  width: 40px; height: 40px; border-radius: 11px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,0.5); transition: all 0.22s ease;
}
.nb2-hamburger:hover { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.3); color: #DC2626; }
.nb2-hamburger.open { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.25); color: #DC2626; }

/* mobile menu */
.nb2-mobile {
  background: rgba(8,8,10,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.05); padding: 12px 20px 24px;
  animation: nb2-mobile-in 0.25s cubic-bezier(0.34,1.2,0.64,1);
}
@keyframes nb2-mobile-in { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
.nb2-mobile-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 14px; border-radius: 11px; margin-bottom: 4px;
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.45);
  text-decoration: none; cursor: pointer; background: transparent; border: none;
  width: 100%; text-align: left; font-family: 'Barlow', sans-serif;
  transition: all 0.2s ease; letter-spacing: 0.03em;
}
.nb2-mobile-link:hover { background: rgba(255,255,255,0.04); color: #fff; }
.nb2-mobile-link.active { color: #DC2626; background: rgba(220,38,38,0.07); }
.nb2-mobile-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 8px 0; }
.nb2-mobile-auth { display: flex; gap: 10px; margin-top: 12px; }

@media (min-width: 768px) { .nb2-mobile-only { display: none !important; } }
@media (max-width: 767px) { .nb2-desktop-only { display: none !important; } }
`,jp=a=>"Rp "+a.toLocaleString("id-ID");function d5(){const a=v.useRef(null),o=v.useRef(null),s=v.useRef({x:.5,y:.5}),d=v.useRef({rx:0,ry:0,sx:50,sy:50}),p=v.useRef(0);return v.useEffect(()=>{const m=h=>{const x=a.current;if(!x)return;const S=x.getBoundingClientRect();s.current.x=Math.max(0,Math.min(1,(h.clientX-S.left)/S.width)),s.current.y=Math.max(0,Math.min(1,(h.clientY-S.top)/S.height))};window.addEventListener("mousemove",m);const g=()=>{const h=s.current.x,x=s.current.y,S=-(x-.5)*14*2,b=(h-.5)*14*2,N=h*100,w=x*100,M=.1;if(d.current.rx+=(S-d.current.rx)*M,d.current.ry+=(b-d.current.ry)*M,d.current.sx+=(N-d.current.sx)*M,d.current.sy+=(w-d.current.sy)*M,a.current&&(a.current.style.transform=`perspective(400px) rotateX(${d.current.rx.toFixed(2)}deg) rotateY(${d.current.ry.toFixed(2)}deg) scale3d(1.06,1.06,1.06)`),o.current){const A=Math.sqrt((h-.5)**2+(x-.5)**2),_=Math.min(A*2.2,1);o.current.style.background=`
          radial-gradient(
            circle at ${d.current.sx.toFixed(1)}% ${d.current.sy.toFixed(1)}%,
            rgba(255,255,255,${(.2+_*.14).toFixed(2)}) 0%,
            rgba(255,200,100,${(.1+_*.07).toFixed(2)}) 28%,
            transparent 60%
          ),
          linear-gradient(
            ${(d.current.ry*4).toFixed(0)}deg,
            rgba(255,80,20,${(.07+_*.05).toFixed(2)}) 0%,
            transparent 50%,
            rgba(200,40,10,${(.05+_*.03).toFixed(2)}) 100%
          )
        `}p.current=requestAnimationFrame(g)};return p.current=requestAnimationFrame(g),()=>{window.removeEventListener("mousemove",m),cancelAnimationFrame(p.current)}},[]),n.jsxs("div",{ref:a,className:"nb2-logo-wolf",children:[n.jsx("img",{src:s5,alt:"OkeGas",draggable:!1}),n.jsx("div",{ref:o,className:"nb2-logo-shimmer"}),n.jsx("div",{className:"nb2-logo-vignette"})]})}function u5(){const[a,o]=v.useState(!1),[s,d]=v.useState(!1),[p,u]=v.useState(!1),{user:m,logout:g,setShowAuthModal:h}=wf(),x=Pr(),S=v.useRef(null);v.useEffect(()=>{const M=()=>u(window.scrollY>16);return window.addEventListener("scroll",M,{passive:!0}),()=>window.removeEventListener("scroll",M)},[]),v.useEffect(()=>{const M=A=>{S.current&&!S.current.contains(A.target)&&d(!1)};return document.addEventListener("mousedown",M),()=>document.removeEventListener("mousedown",M)},[]),v.useEffect(()=>{o(!1)},[x.pathname]);const b=[{label:"Top Up",to:"/topup"},{label:"Jual Beli Akun",to:"/marketplace"},{label:"Layanan Digital",to:"/layanandigital"},{label:"Bantuan",to:"/Bantuan"}],N=M=>x.pathname===M,w=()=>{h(!0),o(!1)};return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:c5}),n.jsxs("nav",{className:`nb2-root ${p?"scrolled":"top"}`,children:[n.jsx("div",{className:"nb2-topline"}),n.jsxs("div",{className:"nb2-inner",children:[n.jsxs(Kt,{to:"/",className:"nb2-logo",children:[n.jsx(d5,{}),n.jsxs("div",{children:[n.jsx("div",{className:"nb2-logo-text",children:"OkeGass"}),n.jsx("div",{className:"nb2-logo-sub",children:"Game Store"})]})]}),n.jsx("div",{className:"nb2-links nb2-desktop-only",children:b.map(M=>n.jsx(Kt,{to:M.to,className:`nb2-link ${N(M.to)?"active":""}`,children:M.label},M.label))}),n.jsx("div",{className:"nb2-right nb2-desktop-only",children:m?n.jsxs(n.Fragment,{children:[n.jsxs("button",{type:"button",className:"nb2-bell","aria-label":"Notifikasi",children:[n.jsx(ff,{size:16}),n.jsx("span",{className:"nb2-bell-dot"})]}),n.jsxs("div",{ref:S,style:{position:"relative"},children:[n.jsxs("button",{type:"button",className:`nb2-user-pill ${s?"open":""}`,onClick:()=>d(M=>!M),"aria-label":"Menu pengguna",children:[n.jsx("div",{className:"nb2-user-avatar",children:m.avatar}),n.jsxs("div",{className:"nb2-user-info",children:[n.jsx("div",{className:"nb2-user-name",children:m.name}),n.jsx("div",{className:"nb2-user-level",children:"⚡ Trusted Seller"})]}),n.jsx(pa,{size:14,className:`nb2-chevron ${s?"open":""}`})]}),s&&n.jsxs("div",{className:"nb2-dropdown",children:[n.jsxs("div",{className:"nb2-dd-user",children:[n.jsx("div",{className:"nb2-dd-avatar-lg",children:m.avatar}),n.jsxs("div",{children:[n.jsx("div",{className:"nb2-dd-name",children:m.name}),n.jsx("div",{className:"nb2-dd-email",children:m.email})]})]}),n.jsxs("div",{className:"nb2-dd-balance",children:[n.jsxs("div",{className:"nb2-dd-balance-label",children:[n.jsx(xa,{size:11})," Saldo"]}),n.jsx("div",{className:"nb2-dd-balance-val",children:jp(25e4)})]}),n.jsxs("div",{className:"nb2-dd-section",children:[n.jsxs(Kt,{to:"/profile",className:"nb2-dd-item",onClick:()=>d(!1),children:[n.jsx("div",{className:"nb2-dd-item-icon",children:n.jsx(Tn,{size:13})})," Profil Saya"]}),n.jsxs(Kt,{to:"/marketplace/sell",className:"nb2-dd-item",onClick:()=>d(!1),children:[n.jsx("div",{className:"nb2-dd-item-icon",children:n.jsx(Fn,{size:13})})," Jual Akun"]}),n.jsxs(Kt,{to:"/profile",className:"nb2-dd-item",onClick:()=>d(!1),children:[n.jsx("div",{className:"nb2-dd-item-icon",children:n.jsx(xf,{size:13})})," Pengaturan"]}),n.jsx("div",{className:"nb2-dd-divider"}),n.jsxs("button",{type:"button",className:"nb2-dd-item danger",onClick:()=>{g(),d(!1)},children:[n.jsx("div",{className:"nb2-dd-item-icon",children:n.jsx(ec,{size:13})})," Keluar"]})]})]})]})]}):n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"nb2-login-btn",onClick:w,children:"Masuk"}),n.jsxs("button",{type:"button",className:"nb2-register-btn",onClick:w,children:[n.jsx(Qe,{size:13,fill:"white"})," Daftar"]})]})}),n.jsx("button",{type:"button",className:`nb2-hamburger nb2-mobile-only ${a?"open":""}`,onClick:()=>o(M=>!M),"aria-label":"Toggle menu",children:a?n.jsx(fa,{size:18}):n.jsx(T2,{size:18})})]}),a&&n.jsxs("div",{className:"nb2-mobile nb2-mobile-only",children:[b.map(M=>n.jsxs(Kt,{to:M.to,className:`nb2-mobile-link ${N(M.to)?"active":""}`,children:[M.label,n.jsx(pa,{size:14,style:{transform:"rotate(-90deg)",opacity:.3}})]},M.label)),n.jsx("div",{className:"nb2-mobile-divider"}),m?n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",marginBottom:6,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11},children:[n.jsx("div",{className:"nb2-user-avatar",style:{width:36,height:36,fontSize:16,borderRadius:9},children:m.avatar}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#fff"},children:m.name}),n.jsxs("div",{style:{fontSize:10,color:"rgba(16,185,129,0.7)",fontWeight:700},children:["Saldo: ",jp(25e4)]})]})]}),n.jsxs(Kt,{to:"/profile",className:"nb2-mobile-link",children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(Tn,{size:15})," Profil Saya"]}),n.jsx(pa,{size:14,style:{transform:"rotate(-90deg)",opacity:.3}})]}),n.jsxs(Kt,{to:"/marketplace/sell",className:"nb2-mobile-link",children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(Fn,{size:15})," Jual Akun"]}),n.jsx(pa,{size:14,style:{transform:"rotate(-90deg)",opacity:.3}})]}),n.jsx("div",{className:"nb2-mobile-divider"}),n.jsx("button",{type:"button",className:"nb2-mobile-link",style:{color:"rgba(220,60,60,0.7)",border:"none",background:"transparent",cursor:"pointer",width:"100%"},onClick:()=>{g(),o(!1)},children:n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(ec,{size:15})," Keluar"]})})]}):n.jsxs("div",{className:"nb2-mobile-auth",children:[n.jsx("button",{type:"button",className:"nb2-login-btn",style:{flex:1},onClick:w,children:"Masuk"}),n.jsxs("button",{type:"button",className:"nb2-register-btn",style:{flex:1,justifyContent:"center"},onClick:w,children:[n.jsx(Qe,{size:13,fill:"white"})," Daftar"]})]})]})]}),n.jsx(o5,{})]})}const p5="https://i.pinimg.com/736x/ad/14/4a/ad144a58f41774b689ee453ed420ca77.jpg";function f5({size:a=20}){return n.jsx("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"currentColor",children:n.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})})}function m5(){const a=v.useRef(null),o=v.useRef(null),s=v.useRef({x:.5,y:.5}),d=v.useRef({rx:0,ry:0,sx:50,sy:50}),p=v.useRef(0);return v.useEffect(()=>{const m=h=>{const x=a.current;if(!x)return;const S=x.getBoundingClientRect();s.current.x=Math.max(0,Math.min(1,(h.clientX-S.left)/S.width)),s.current.y=Math.max(0,Math.min(1,(h.clientY-S.top)/S.height))};window.addEventListener("mousemove",m);const g=()=>{const h=s.current.x,x=s.current.y,S=-(x-.5)*14*2,b=(h-.5)*14*2,N=h*100,w=x*100,M=.1;if(d.current.rx+=(S-d.current.rx)*M,d.current.ry+=(b-d.current.ry)*M,d.current.sx+=(N-d.current.sx)*M,d.current.sy+=(w-d.current.sy)*M,a.current&&(a.current.style.transform=`perspective(400px) rotateX(${d.current.rx.toFixed(2)}deg) rotateY(${d.current.ry.toFixed(2)}deg) scale3d(1.06,1.06,1.06)`),o.current){const A=Math.sqrt((h-.5)**2+(x-.5)**2),_=Math.min(A*2.2,1);o.current.style.background=`
          radial-gradient(
            circle at ${d.current.sx.toFixed(1)}% ${d.current.sy.toFixed(1)}%,
            rgba(255,255,255,${(.2+_*.14).toFixed(2)}) 0%,
            rgba(255,200,100,${(.1+_*.07).toFixed(2)}) 28%,
            transparent 60%
          ),
          linear-gradient(
            ${(d.current.ry*4).toFixed(0)}deg,
            rgba(255,80,20,${(.07+_*.05).toFixed(2)}) 0%,
            transparent 50%,
            rgba(200,40,10,${(.05+_*.03).toFixed(2)}) 100%
          )
        `}p.current=requestAnimationFrame(g)};return p.current=requestAnimationFrame(g),()=>{window.removeEventListener("mousemove",m),cancelAnimationFrame(p.current)}},[]),n.jsxs("div",{ref:a,style:{width:46,height:46,borderRadius:12,overflow:"hidden",flexShrink:0,position:"relative",transformStyle:"preserve-3d",willChange:"transform",cursor:"pointer",boxShadow:`
          0 0 0 1.5px rgba(220,38,38,0.45),
          0 0 0 5px rgba(220,38,38,0.07),
          0 0 20px rgba(220,38,38,0.28),
          0 6px 18px rgba(0,0,0,0.65)
        `,transition:"box-shadow 0.3s ease"},onMouseEnter:u=>{u.currentTarget.style.boxShadow=`
          0 0 0 1.5px rgba(220,38,38,0.65),
          0 0 0 6px rgba(220,38,38,0.10),
          0 0 30px rgba(220,38,38,0.45),
          0 8px 22px rgba(0,0,0,0.7)
        `},onMouseLeave:u=>{u.currentTarget.style.boxShadow=`
          0 0 0 1.5px rgba(220,38,38,0.45),
          0 0 0 5px rgba(220,38,38,0.07),
          0 0 20px rgba(220,38,38,0.28),
          0 6px 18px rgba(0,0,0,0.65)
        `},children:[n.jsx("img",{src:p5,alt:"OkeGas",draggable:!1,style:{width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:12,filter:"saturate(1.1) contrast(1.05)",pointerEvents:"none",userSelect:"none"}}),n.jsx("div",{ref:o,style:{position:"absolute",inset:0,borderRadius:12,pointerEvents:"none",mixBlendMode:"screen"}}),n.jsx("div",{style:{position:"absolute",inset:0,borderRadius:12,background:"linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.22) 100%)",pointerEvents:"none"}})]})}function g5(){const a=[{href:"https://www.instagram.com/irwndd._",icon:n.jsx(As,{size:17}),label:"Instagram 1"},{href:"https://www.instagram.com/vynurdiansyah",icon:n.jsx(As,{size:17}),label:"Instagram 2"},{href:"https://www.instagram.com/dvalfn0",icon:n.jsx(As,{size:17}),label:"Instagram 3"},{href:"https://api.whatsapp.com/send/?phone=6289667290516&text&type=phone_number&app_absent=0",icon:n.jsx(f5,{size:17}),label:"WhatsApp"}],o={Layanan:[{label:"Top Up Game",to:"/topup"},{label:"Pulsa & Data",to:"/topup"},{label:"Token PLN",to:"/topup"},{label:"E-Wallet",to:"/topup"},{label:"Jual Beli Akun",to:"/marketplace"}],Bantuan:[{label:"Cara Order",href:"#"},{label:"Sistem Escrow",href:"#"},{label:"FAQ",href:"#"},{label:"Hubungi Kami",href:"#"},{label:"Lapor Masalah",href:"#"}],Informasi:[{label:"Tentang Kami",href:"#"},{label:"Kebijakan Privasi",href:"#"},{label:"Syarat & Ketentuan",href:"#"},{label:"Karir",href:"#"},{label:"Blog",href:"#"}]};return n.jsxs("footer",{style:{background:"linear-gradient(180deg, #0d0d0f 0%, #080809 100%)",position:"relative",overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.05)"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .ft-link {
          font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.38); text-decoration: none;
          transition: color 0.2s ease;
          display: flex; align-items: center; gap: 6px;
        }
        .ft-link:hover { color: #DC2626; }
        .ft-link:hover .ft-link-arrow { opacity: 1; transform: translateX(0); }
        .ft-link-arrow { opacity: 0; transform: translateX(-4px); transition: all 0.2s ease; }

        .ft-col-title {
          font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin: 0 0 18px;
        }

        .ft-social {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4); text-decoration: none;
          transition: all 0.25s ease; flex-shrink: 0;
        }
        .ft-social:hover {
          background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.4);
          color: #DC2626; transform: translateY(-2px);
        }

        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          margin: 48px 0 28px;
        }

        .ft-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981; box-shadow: 0 0 8px #10B981;
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; box-shadow: 0 0 6px #10B981; }
          50%      { opacity:.6; box-shadow: 0 0 14px #10B981; }
        }

        .ft-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; }
        @media (max-width: 900px) { .ft-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .ft-grid { grid-template-columns: 1fr; } }
      `}),n.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.4) 30%, rgba(234,88,12,0.4) 50%, rgba(220,38,38,0.4) 70%, transparent 100%)"}}),n.jsx("div",{style:{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:500,height:200,background:"rgba(220,38,38,0.04)",filter:"blur(80px)",pointerEvents:"none",borderRadius:"50%"}}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"60px 24px 0",position:"relative"},children:[n.jsxs("div",{className:"ft-grid",children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:13,marginBottom:18},children:[n.jsx(m5,{}),n.jsx("span",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:22,fontWeight:700,color:"#fff",letterSpacing:"0.02em"},children:"OkeGass Store"})]}),n.jsx("p",{style:{fontFamily:"'Barlow', sans-serif",fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,margin:"0 0 20px",fontWeight:400},children:"Platform top up game dan jual beli akun terpercaya dengan sistem escrow 100% aman di Indonesia."}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginBottom:24},children:[{icon:n.jsx(Mt,{size:12}),label:"Sistem Escrow Terpercaya"},{icon:n.jsx(Qe,{size:12}),label:"Proses Instan < 1 Menit"},{icon:n.jsx(L2,{size:12}),label:"Melayani Seluruh Indonesia"}].map(s=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"'Barlow', sans-serif",fontSize:12,color:"rgba(255,255,255,0.3)",fontWeight:500},children:[n.jsx("span",{style:{color:"#DC2626"},children:s.icon}),s.label]},s.label))}),n.jsx("div",{style:{display:"flex",gap:8},children:a.map(s=>n.jsx("a",{href:s.href,target:"_blank",rel:"noopener noreferrer",className:"ft-social","aria-label":s.label,children:s.icon},s.label))})]}),Object.entries(o).map(([s,d])=>n.jsxs("div",{children:[n.jsx("p",{className:"ft-col-title",children:s}),n.jsx("ul",{style:{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:10},children:d.map(p=>n.jsx("li",{children:"to"in p?n.jsxs(Kt,{to:p.to,className:"ft-link",children:[n.jsx(mr,{size:10,className:"ft-link-arrow"}),p.label]}):n.jsxs("a",{href:p.href,className:"ft-link",children:[n.jsx(mr,{size:10,className:"ft-link-arrow"}),p.label]})},p.label))})]},s))]}),n.jsx("div",{className:"ft-divider"}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,paddingBottom:28},children:[n.jsx("p",{style:{fontFamily:"'Barlow', sans-serif",fontSize:12,color:"rgba(255,255,255,0.2)",margin:0,fontWeight:400},children:"© 2026 OkeGass Store. All rights reserved. Made with ❤️ in Indonesia."}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("div",{className:"ft-status-dot"}),n.jsx("span",{style:{fontFamily:"'Barlow', sans-serif",fontSize:12,color:"rgba(255,255,255,0.25)",fontWeight:500},children:"Sistem berjalan normal"})]})]})]})]})}function h5(){return n.jsx(i5,{children:n.jsxs("div",{className:"min-h-screen flex flex-col",style:{fontFamily:"var(--font-body)"},children:[n.jsx(u5,{}),n.jsx("main",{className:"flex-1",children:n.jsx(ah,{})}),n.jsx(g5,{})]})})}const x5="https://i.pinimg.com/736x/ad/14/4a/ad144a58f41774b689ee453ed420ca77.jpg";function y5(){const a=v.useRef(null);return v.useEffect(()=>{const o=a.current;if(!o)return;const s=o.getContext("2d");let d;const p=()=>{o.width=o.offsetWidth,o.height=o.offsetHeight};p(),window.addEventListener("resize",p);const u=Array.from({length:45},()=>({x:Math.random()*2e3,y:Math.random()*1e3+300,r:Math.random()*1.4+.3,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.15),life:Math.random(),col:Math.random()>.5?"255,55,20":"255,130,15"})),m=()=>{s.clearRect(0,0,o.width,o.height),u.forEach(g=>{g.x+=g.vx,g.y+=g.vy,g.life-=.0035,(g.life<=0||g.y<-10)&&(g.x=Math.random()*o.width,g.y=o.height+5,g.life=.6+Math.random()*.4),s.beginPath(),s.arc(g.x,g.y,g.r,0,Math.PI*2),s.fillStyle=`rgba(${g.col},${(g.life*.7).toFixed(2)})`,s.fill()}),d=requestAnimationFrame(m)};return m(),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",p)}},[]),n.jsx("canvas",{ref:a,style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}})}function b5({n:a,suf:o=""}){const[s,d]=v.useState(0),p=v.useRef(null);return v.useEffect(()=>{const u=new IntersectionObserver(([m])=>{if(!m.isIntersecting)return;let g=0;const h=a/50,x=setInterval(()=>{g+=h,g>=a?(d(a),clearInterval(x)):d(Math.floor(g))},18);u.disconnect()},{threshold:.4});return p.current&&u.observe(p.current),()=>u.disconnect()},[a]),n.jsxs("span",{ref:p,children:[s.toLocaleString(),o]})}function v5({on:a}){const o=v.useRef(null),s=v.useRef(null),d=v.useRef(null),p=v.useRef({x:.5,y:.5}),u=v.useRef({rx:0,ry:0,sx:50,sy:50,glow:0}),m=v.useRef(null);return v.useEffect(()=>{const g=S=>{const b=o.current;if(!b)return;const N=b.getBoundingClientRect();p.current.x=(S.clientX-N.left)/N.width,p.current.y=(S.clientY-N.top)/N.height};window.addEventListener("mousemove",g);const h=18,x=()=>{const S=p.current.x,b=p.current.y,N=-(b-.5)*h*2,w=(S-.5)*h*2,M=S*100,A=b*100,_=Math.sqrt((S-.5)**2+(b-.5)**2),q=Math.min(_*2,1),$=.08;u.current.rx+=(N-u.current.rx)*$,u.current.ry+=(w-u.current.ry)*$,u.current.sx+=(M-u.current.sx)*$,u.current.sy+=(A-u.current.sy)*$,u.current.glow+=(q-u.current.glow)*$;const J=s.current,ne=d.current;if(J&&(J.style.transform=`perspective(700px) rotateX(${u.current.rx.toFixed(2)}deg) rotateY(${u.current.ry.toFixed(2)}deg) scale3d(1.03,1.03,1.03)`),ne){const Q=u.current.glow;ne.style.background=`
          radial-gradient(
            circle at ${u.current.sx.toFixed(1)}% ${u.current.sy.toFixed(1)}%,
            rgba(255,255,255,${(.18+Q*.12).toFixed(2)}) 0%,
            rgba(255,200,120,${(.1+Q*.06).toFixed(2)}) 30%,
            transparent 65%
          ),
          linear-gradient(
            ${(u.current.ry*3).toFixed(0)}deg,
            rgba(255,80,20,${(.06+Q*.04).toFixed(2)}) 0%,
            transparent 50%,
            rgba(200,40,10,${(.04+Q*.03).toFixed(2)}) 100%
          )
        `}m.current=requestAnimationFrame(x)};return m.current=requestAnimationFrame(x),()=>{window.removeEventListener("mousemove",g),cancelAnimationFrame(m.current)}},[]),n.jsxs("div",{ref:o,style:{position:"relative",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsx("div",{style:{position:"absolute",width:"clamp(280px,38vw,430px)",height:"clamp(280px,38vw,430px)",borderRadius:"50%",border:"1px solid rgba(220,40,10,.16)",borderTopColor:"rgba(220,40,10,.04)",borderBottomColor:"rgba(220,40,10,.04)",animation:"rspin 20s linear infinite",pointerEvents:"none"}}),n.jsx("div",{style:{position:"absolute",width:"clamp(220px,30vw,340px)",height:"clamp(220px,30vw,340px)",borderRadius:"50%",border:"1px solid rgba(255,100,0,.1)",borderLeftColor:"rgba(255,100,0,.03)",borderRightColor:"rgba(255,100,0,.03)",animation:"rspin 28s linear infinite reverse",pointerEvents:"none"}}),n.jsxs("div",{ref:s,style:{position:"relative",width:"clamp(200px,26vw,280px)",height:"clamp(200px,26vw,280px)",borderRadius:"50%",transformStyle:"preserve-3d",willChange:"transform",transition:"box-shadow .3s",boxShadow:`
            0 0 0 2.5px rgba(220,40,10,.38),
            0 0 0 10px rgba(220,40,10,.06),
            0 0 50px rgba(220,40,10,.25),
            0 0 100px rgba(220,40,10,.10),
            0 24px 48px rgba(0,0,0,.7)
          `,animation:a?"lf 5s ease-in-out infinite":"none",overflow:"hidden"},children:[n.jsx("img",{src:x5,alt:"OkeGas Wolf",style:{width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:"50%",filter:"saturate(1.12) contrast(1.06)",userSelect:"none",pointerEvents:"none"}}),n.jsx("div",{ref:d,style:{position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",mixBlendMode:"screen",transition:"background .05s"}}),n.jsx("div",{style:{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle at 50% 110%, rgba(0,0,0,.3) 0%, transparent 60%)",pointerEvents:"none"}})]})]})}function w5(){const[a,o]=v.useState(!1);return v.useEffect(()=>{setTimeout(()=>o(!0),80)},[]),n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #060610; overflow-x: hidden; }

        @keyframes rspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes lf    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes mq    { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── HERO ── */
        .H {
          position: relative; min-height: 100vh;
          background: #060610; overflow: hidden;
          font-family: 'Barlow Condensed', sans-serif; color: #fff;
          display: flex; flex-direction: column;
        }
        .H::before {
          content:''; position:absolute; inset:0; z-index:0; pointer-events:none;
          background-image: repeating-linear-gradient(58deg,transparent 0 50px,rgba(220,40,10,.02) 50px 51px);
        }
        .orb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:0; }
        .orb-r { width:520px;height:520px;top:-80px;right:-80px;background:rgba(200,20,0,.06); }
        .orb-o { width:400px;height:400px;bottom:-60px;left:-60px;background:rgba(255,80,0,.05); }

        /* ── GRID ── */
        .G {
          position:relative; z-index:1; flex:1;
          display:grid; grid-template-columns:1fr 480px; gap:0;
          max-width:1340px; width:100%; margin:0 auto;
          padding:0 64px; align-items:center;
          min-height:100vh;
        }
        @media(max-width:1100px){ .G{ grid-template-columns:1fr 400px; padding:0 40px; } }
        @media(max-width:900px){
          .G{ grid-template-columns:1fr; padding:48px 24px 52px; min-height:unset; gap:40px; }
        }

        /* ── LEFT ── */
        .L { display:flex; flex-direction:column; gap:22px; padding:64px 0; }
        @media(max-width:900px){ .L{ padding:0; order:2; } }

        .rv { opacity:0; transform:translateY(18px); transition:opacity .7s,transform .7s; }
        .rv.on { opacity:1; transform:translateY(0); }

        .pill {
          display:inline-flex; align-items:center; gap:8px;
          padding:6px 16px; border-radius:100px; width:fit-content;
          border:1px solid rgba(220,40,10,.32); background:rgba(220,40,10,.09);
          font-size:.78rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#ff7050;
        }
        .dot { width:7px;height:7px;border-radius:50%;background:#ff4422;animation:blink 1.8s infinite; }

        .headline {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(3.2rem,5.5vw,6rem);
          line-height:.92; letter-spacing:.02em;
        }
        .headline .w { color:#f0f0f0; display:block; }
        .headline .g {
          display:block;
          background:linear-gradient(130deg,#ff2a00,#ff9800);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .headline .sm { display:block; color:#f0f0f0; font-size:clamp(1.3rem,2.1vw,2.1rem); margin-top:.1em; }

        .rule { display:flex; align-items:center; gap:8px; }
        .rule-a { height:3px;width:56px;border-radius:2px;background:linear-gradient(90deg,#c51000,#ff4000); }
        .rule-b { height:3px;width:18px;border-radius:2px;background:rgba(197,16,0,.35); }

        .desc { color:rgba(205,205,225,.7); font-size:clamp(.9rem,1.5vw,1.05rem); line-height:1.7; max-width:460px; }

        .btns { display:flex; flex-wrap:wrap; gap:12px; }
        @media(max-width:480px){ .btns{ flex-direction:column; } }

        .bp {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 30px; border-radius:8px;
          background:linear-gradient(135deg,#c51000,#ff4000);
          color:#fff; border:none; cursor:pointer; text-decoration:none;
          font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.12em;
          position:relative; overflow:hidden;
          transition:transform .15s,box-shadow .15s;
        }
        .bp::after {
          content:''; position:absolute; top:0; left:-60%; width:40%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          transform:skewX(-18deg); transition:left .45s;
        }
        .bp:hover { transform:scale(1.04); box-shadow:0 0 28px rgba(197,16,0,.5),0 6px 20px rgba(0,0,0,.4); }
        .bp:hover::after { left:130%; }

        .bo {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 30px; border-radius:8px;
          background:transparent; color:rgba(255,255,255,.78);
          border:1px solid rgba(255,255,255,.18); cursor:pointer; text-decoration:none;
          font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.12em;
          transition:border-color .2s,color .2s,background .2s;
        }
        .bo:hover { border-color:#c51000; color:#fff; background:rgba(197,16,0,.1); }

        /* stats */
        .stats { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,.07); padding-top:20px; }
        .stat { display:flex; flex-direction:column; align-items:center; text-align:center; }
        .stat+.stat { border-left:1px solid rgba(255,255,255,.07); }
        .sv {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(1.8rem,3vw,2.6rem); line-height:1;
          background:linear-gradient(135deg,#ff5533,#ff9900);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .sl { font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(150,150,170,.65); margin-top:5px; }

        /* badges */
        .badges { display:flex; flex-wrap:wrap; gap:7px; }
        .badge {
          padding:4px 11px; border-radius:4px;
          border:1px solid rgba(200,40,10,.2); background:rgba(200,40,10,.06);
          font-size:.7rem; font-weight:700; letter-spacing:.07em; color:rgba(220,110,90,.8);
          cursor:default; transition:border-color .2s,color .2s;
        }
        .badge:hover { border-color:rgba(200,40,10,.45); color:#ff7755; }

        /* ── RIGHT ── */
        .R {
          position:relative; display:flex; align-items:center; justify-content:center;
          height:100%; padding:64px 0 64px 24px;
        }
        @media(max-width:900px){ .R{ order:1; padding:0; height:clamp(300px,72vw,400px); } }

        /* ── MARQUEES ── */
        .MQ {
          position:relative; z-index:1;
          border-top:1px solid rgba(255,255,255,.04);
          background:rgba(8,8,18,.8); overflow:hidden;
        }
        .mq-row { padding:10px 0; display:flex; overflow:hidden; }
        .mq-row+.mq-row { border-top:1px solid rgba(255,255,255,.03); }
        .mq-track { display:flex; gap:40px; width:max-content; animation:mq 22s linear infinite; }
        .mq-track.rev { animation-direction:reverse; }
        .mq-item {
          display:flex; align-items:center; gap:9px;
          font-size:.75rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          color:rgba(170,100,80,.65); white-space:nowrap;
          font-family:'Barlow Condensed',sans-serif; cursor:default; transition:color .2s;
        }
        .mq-item:hover { color:#ff5533; }
        .mq-dot { width:4px;height:4px;border-radius:50%;background:rgba(200,40,10,.45);flex-shrink:0; }
      `}),n.jsxs("section",{className:"H",children:[n.jsx(y5,{}),n.jsx("div",{className:"orb orb-r"}),n.jsx("div",{className:"orb orb-o"}),n.jsxs("div",{className:"G",children:[n.jsxs("div",{className:"L",children:[n.jsxs("div",{className:`pill rv ${a?"on":""}`,style:{transitionDelay:".05s"},children:[n.jsx("span",{className:"dot"})," Dipercaya 19Juta+ Gamer Indonesia"]}),n.jsxs("h1",{className:`headline rv ${a?"on":""}`,style:{transitionDelay:".18s"},children:[n.jsx("span",{className:"w",children:"TOP UP GAME"}),n.jsx("span",{className:"g",children:"TERMURAH!"}),n.jsx("span",{className:"sm",children:"INSTAN & TERPERCAYA"})]}),n.jsxs("div",{className:`rule rv ${a?"on":""}`,style:{transitionDelay:".3s"},children:[n.jsx("div",{className:"rule-a"}),n.jsx("div",{className:"rule-b"})]}),n.jsx("p",{className:`desc rv ${a?"on":""}`,style:{transitionDelay:".4s"},children:"Platform top up & jual beli akun game terpercaya di Indonesia. Transaksi otomatis, aman, dan harga paling predator."}),n.jsxs("div",{className:`btns rv ${a?"on":""}`,style:{transitionDelay:".52s"},children:[n.jsx("a",{href:"/topup",className:"bp",children:"⚡ TOP UP SEKARANG →"}),n.jsx("a",{href:"/marketplace",className:"bo",children:"🎮 JUAL BELI AKUN"})]}),n.jsx("div",{className:`stats rv ${a?"on":""}`,style:{transitionDelay:".64s"},children:[{n:5,s:"",l:"Transaksi"},{n:3,s:"+",l:"User Aktif"},{n:1,s:" MIN",l:"Proses"}].map(({n:s,s:d,l:p})=>n.jsxs("div",{className:"stat",children:[n.jsx("div",{className:"sv",children:n.jsx(b5,{n:s,suf:d})}),n.jsx("div",{className:"sl",children:p})]},p))})]}),n.jsx("div",{className:"R",style:{opacity:a?1:0,transform:a?"none":"translateX(32px)",transition:"opacity .9s .25s, transform .9s .25s"},children:n.jsx(v5,{on:a})})]})]})]})}function k5(){const a=[{icon:"⚡",label:"Proses Instan"},{icon:"🔒",label:"100% Aman"},{icon:"🕐",label:"24/7 Layanan"},{icon:"💯",label:"Harga Terbaik"},{icon:"✅",label:"Terpercaya"},{icon:"🤖",label:"Auto Process"},{icon:"🚀",label:"Top Up Cepat"},{icon:"🏆",label:"No. 1 Indonesia"}],o=[...a,...a,...a];return n.jsxs("div",{style:{position:"relative",background:"linear-gradient(90deg, #0d0d0f 0%, #161018 50%, #0d0d0f 100%)",borderTop:"1px solid rgba(220,38,38,0.25)",borderBottom:"1px solid rgba(220,38,38,0.25)",overflow:"hidden",padding:"0"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');

        @keyframes marquee-trust {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .trust-track {
          display: flex;
          width: max-content;
          animation: marquee-trust 28s linear infinite;
        }

        .trust-track:hover {
          animation-play-state: paused;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          white-space: nowrap;
          position: relative;
        }

        .trust-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #DC2626;
          margin-left: 8px;
          flex-shrink: 0;
          box-shadow: 0 0 6px #DC2626;
        }

        .trust-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          transition: color 0.2s;
        }

        .trust-item:hover .trust-label {
          color: rgba(255,255,255,0.9);
        }

        .trust-icon {
          font-size: 14px;
          line-height: 1;
          filter: grayscale(0.3);
        }

        /* Edge fades */
        .trust-fade-left,
        .trust-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .trust-fade-left {
          left: 0;
          background: linear-gradient(90deg, #0d0d0f 0%, transparent 100%);
        }

        .trust-fade-right {
          right: 0;
          background: linear-gradient(270deg, #0d0d0f 0%, transparent 100%);
        }

        /* Red line top */
        .trust-redline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #DC2626 30%, #EA580C 50%, #DC2626 70%, transparent 100%);
          opacity: 0.6;
        }
      `}),n.jsx("div",{className:"trust-redline"}),n.jsx("div",{className:"trust-fade-left"}),n.jsx("div",{className:"trust-fade-right"}),n.jsx("div",{className:"trust-track",children:o.map((s,d)=>n.jsxs("div",{className:"trust-item",children:[n.jsx("span",{className:"trust-icon",children:s.icon}),n.jsx("span",{className:"trust-label",children:s.label}),n.jsx("span",{className:"trust-dot"})]},d))})]})}const j5="/assets/ml-Dk9OFObz.png",S5="/assets/ff-TaDrZAxq.png",C5="/assets/pubg-Dc-zB1vD.png",N5="/assets/genshin-DwBfTrGM.png",E5="/assets/valo-B5PKg1Qp.png",z5="/assets/cod-qUzn9PLn.png",R5="/assets/aov-BXMAD2kR.png";function P5(){const a=Lr(),[o,s]=v.useState(null),d=[{id:"ml",name:"Mobile Legends",currency:"Diamond",color:"#1E88E5",glowColor:"rgba(30,136,229,0.4)",label:"POPULER",img:j5},{id:"ff",name:"Free Fire",currency:"Diamond",color:"#FF4500",glowColor:"rgba(255,69,0,0.4)",label:"HOT",img:S5},{id:"pubg",name:"PUBG Mobile",currency:"UC",color:"#F59E0B",glowColor:"rgba(245,158,11,0.4)",label:"TERLARIS",img:C5},{id:"genshin",name:"Genshin Impact",currency:"Genesis Crystal",color:"#A78BFA",glowColor:"rgba(167,139,250,0.4)",label:"BARU",img:N5},{id:"valorant",name:"Valorant",currency:"VP",color:"#FF4655",glowColor:"rgba(255,70,85,0.4)",label:"TRENDING",img:E5},{id:"cod",name:"Call of Duty",currency:"CP",color:"#10B981",glowColor:"rgba(16,185,129,0.4)",label:null,img:z5},{id:"aov",name:"Arena of Valor",currency:"Voucher",color:"#F97316",glowColor:"rgba(249,115,22,0.4)",label:null,img:R5}];return n.jsxs("section",{style:{background:"linear-gradient(180deg, #0d0d0f 0%, #111318 50%, #0d0d0f 100%)",fontFamily:"'Rajdhani', 'Barlow Condensed', sans-serif",position:"relative",overflow:"hidden",padding:"80px 0"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500&display=swap');

        .game-card {
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          text-align: left;
          backdrop-filter: blur(10px);
        }

        .game-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .game-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          border-radius: 16px 16px 0 0;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .game-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(255,255,255,0.15);
        }

        .game-card:hover::before { opacity: 1; }
        .game-card:hover::after  { opacity: 1; }

        /* ── Game logo image ── */
        .game-logo-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .game-card:hover .game-logo-wrap {
          transform: scale(1.1) rotate(-3deg);
        }
        .game-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 7px;
          border-radius: 4px;
          font-family: 'Barlow', sans-serif;
        }

        .scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.008) 3px,
            rgba(255,255,255,0.008) 4px
          );
          pointer-events: none;
          border-radius: 16px;
        }

        .topup-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 6px 12px;
          border-radius: 6px;
          margin-top: 4px;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.25s ease 0.05s;
          font-family: 'Barlow', sans-serif;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
        }

        .game-card:hover .topup-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .more-card {
          background: linear-gradient(135deg, #DC2626 0%, #b91c1c 40%, #EA580C 100%);
          border: none;
          position: relative;
          border-radius: 16px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .more-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 50px rgba(220,38,38,0.4);
        }

        .more-card-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
        }

        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.15;
        }

        .section-title-accent {
          display: inline-block;
          position: relative;
        }
        .section-title-accent::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #DC2626, #EA580C, transparent);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-card {
          animation: fadeSlideUp 0.5s ease forwards;
          opacity: 0;
        }
      `}),n.jsx("div",{className:"grid-bg"}),n.jsx("div",{className:"glow-orb",style:{width:400,height:400,top:-100,left:-100,background:"#DC2626"}}),n.jsx("div",{className:"glow-orb",style:{width:300,height:300,bottom:-100,right:200,background:"#1E88E5"}}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{marginBottom:48,display:"flex",justifyContent:"space-between",alignItems:"flex-end"},children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:16},children:[n.jsx(Qe,{size:12,color:"#DC2626",fill:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",fontFamily:"'Barlow', sans-serif",textTransform:"uppercase"},children:"Top Up Instan"})]}),n.jsxs("h2",{style:{fontSize:"clamp(28px, 4vw, 44px)",fontWeight:700,color:"#ffffff",margin:0,lineHeight:1.1,letterSpacing:"-0.01em",fontFamily:"'Rajdhani', sans-serif"},children:[n.jsx("span",{className:"section-title-accent",children:"Pilih Game"})," ",n.jsx("span",{style:{color:"#DC2626"},children:"Favorit"})," ",n.jsx("span",{style:{color:"rgba(255,255,255,0.4)",fontSize:"0.7em"},children:"Kamu"})]}),n.jsx("p",{style:{margin:"12px 0 0",color:"rgba(255,255,255,0.4)",fontSize:14,fontFamily:"'Barlow', sans-serif"},children:"Proses otomatis • Harga terbaik • Aman & terpercaya"})]}),n.jsxs("button",{onClick:()=>a("/topup"),style:{display:"flex",alignItems:"center",gap:8,background:"transparent",border:"1px solid rgba(220,38,38,0.4)",borderRadius:8,padding:"10px 20px",color:"#DC2626",fontSize:13,fontWeight:600,fontFamily:"'Barlow', sans-serif",cursor:"pointer",letterSpacing:"0.04em",transition:"all 0.2s ease",whiteSpace:"nowrap"},onMouseEnter:p=>{p.currentTarget.style.background="rgba(220,38,38,0.1)"},onMouseLeave:p=>{p.currentTarget.style.background="transparent"},children:["Lihat Semua ",n.jsx(mr,{size:14})]})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))",gap:16},children:[d.map((p,u)=>n.jsxs("button",{className:"game-card animate-card",style:{animationDelay:`${u*60}ms`},onClick:()=>a(`/topup?game=${p.id}`),onMouseEnter:()=>s(p.id),onMouseLeave:()=>s(null),children:[n.jsx("style",{children:`
                .game-card:nth-child(${u+1})::before {
                  background: radial-gradient(ellipse at center, ${p.glowColor} 0%, transparent 70%);
                }
                .game-card:nth-child(${u+1})::after {
                  background: linear-gradient(90deg, transparent, ${p.color}, transparent);
                }
              `}),n.jsx("div",{className:"scanline"}),p.label&&n.jsx("div",{className:"badge",style:{background:`${p.color}20`,border:`1px solid ${p.color}50`,color:p.color},children:p.label}),n.jsx("div",{className:"game-logo-wrap",style:{border:`1px solid ${p.color}30`},children:n.jsx("img",{src:p.img,alt:p.name,className:"game-logo-img",draggable:!1})}),n.jsxs("div",{children:[n.jsx("p",{style:{fontSize:16,fontWeight:700,color:"#ffffff",margin:0,lineHeight:1.2,fontFamily:"'Rajdhani', sans-serif",letterSpacing:"0.02em"},children:p.name}),n.jsx("p",{style:{fontSize:12,color:`${p.color}cc`,margin:"4px 0 0",fontFamily:"'Barlow', sans-serif",fontWeight:500},children:p.currency})]}),n.jsxs("div",{className:"topup-btn",style:{background:`${p.color}20`,color:p.color,border:`1px solid ${p.color}40`},children:[n.jsx(Qe,{size:10,fill:p.color}),"Top Up"]}),n.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg, transparent, ${p.color}, transparent)`,opacity:o===p.id?1:0,transition:"opacity 0.3s ease",borderRadius:"0 0 16px 16px"}})]},p.id)),n.jsxs("button",{className:"more-card animate-card",style:{animationDelay:`${d.length*60}ms`},onClick:()=>a("/topup"),children:[n.jsx("div",{className:"more-card-noise"}),n.jsx("div",{style:{width:56,height:56,borderRadius:14,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,position:"relative"},children:"➕"}),n.jsxs("div",{children:[n.jsx("p",{style:{fontSize:16,fontWeight:700,color:"#ffffff",margin:0,fontFamily:"'Rajdhani', sans-serif",lineHeight:1.2,letterSpacing:"0.02em"},children:"Game Lainnya"}),n.jsx("p",{style:{fontSize:12,color:"rgba(255,255,255,0.7)",margin:"4px 0 0",fontFamily:"'Barlow', sans-serif"},children:"20+ game tersedia"})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.9)",fontSize:11,fontWeight:600,fontFamily:"'Barlow', sans-serif",textTransform:"uppercase",letterSpacing:"0.08em"},children:["Lihat Semua ",n.jsx(mr,{size:12})]})]})]}),n.jsx("div",{style:{marginTop:40,padding:"20px 28px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16},children:[{val:"20+",label:"Game Tersedia"},{val:"< 1 Menit",label:"Proses Otomatis"},{val:"30+",label:"Pelanggan Puas"},{val:"24/7",label:"Layanan Aktif"}].map(p=>n.jsxs("div",{style:{textAlign:"center"},children:[n.jsx("p",{style:{fontSize:22,fontWeight:700,color:"#DC2626",margin:0,fontFamily:"'Rajdhani', sans-serif",letterSpacing:"0.02em"},children:p.val}),n.jsx("p",{style:{fontSize:12,color:"rgba(255,255,255,0.4)",margin:"2px 0 0",fontFamily:"'Barlow', sans-serif"},children:p.label})]},p.label))})]})]})}function L5(){const a=Lr(),o=[{id:"pulsa",icon:n.jsx(mc,{strokeWidth:1.5}),title:"Pulsa & Data",description:"Isi pulsa dan paket data semua operator dengan harga termurah. Telkomsel, XL, Indosat, dan lainnya.",color:"#3B82F6",glow:"rgba(59,130,246,0.35)",tag:"20+ Operator",providers:["Telkomsel","XL","Indosat","Tri"]},{id:"pln",icon:n.jsx(Qe,{strokeWidth:1.5}),title:"Token PLN",description:"Beli token listrik PLN proses otomatis 24 jam. Token langsung dikirim ke nomor meter kamu.",color:"#F59E0B",glow:"rgba(245,158,11,0.35)",tag:"Instan 24 Jam",providers:["PLN Prabayar","PLN Pascabayar"]},{id:"ewallet",icon:n.jsx(xa,{strokeWidth:1.5}),title:"E-Wallet",description:"Top up GoPay, OVO, DANA, ShopeePay dan berbagai e-wallet lainnya dengan mudah.",color:"#10B981",glow:"rgba(16,185,129,0.35)",tag:"6+ E-Wallet",providers:["GoPay","OVO","DANA","ShopeePay"]}];return n.jsxs("section",{style:{background:"linear-gradient(180deg, #0d0d0f 0%, #0f1015 100%)",padding:"80px 0",position:"relative",overflow:"hidden"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .svc-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .svc-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.14);
        }

        .svc-card:hover::before {
          opacity: 1;
        }

        .svc-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          transition: transform 0.3s ease;
        }

        .svc-card:hover .svc-icon-wrap {
          transform: scale(1.1) rotate(-4deg);
        }

        .svc-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Barlow', sans-serif;
          margin-bottom: 14px;
        }

        .svc-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px;
          letter-spacing: 0.01em;
          line-height: 1.1;
        }

        .svc-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin: 0 0 20px;
          font-weight: 400;
        }

        .svc-providers {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .svc-provider-chip {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          transition: all 0.2s;
        }

        .svc-card:hover .svc-provider-chip {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.7);
        }

        .svc-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 13px 18px;
          border-radius: 10px;
          border: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: auto;
        }

        .svc-btn-arrow {
          transition: transform 0.25s ease;
        }

        .svc-btn:hover .svc-btn-arrow {
          transform: translateX(4px);
        }

        .svc-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 24px;
        }

        /* Bottom glow per card */
        .svc-bottom-glow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 80px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .svc-card:hover .svc-bottom-glow {
          opacity: 1;
        }

        /* Horizontal rule line */
        .svc-top-line {
          position: absolute;
          top: 0; left: 20px; right: 20px;
          height: 1px;
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 1px;
        }

        .svc-card:hover .svc-top-line {
          opacity: 1;
        }

        @keyframes svcFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .svc-animate {
          animation: svcFadeUp 0.55s ease forwards;
          opacity: 0;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        @media (min-width: 768px) {
          .svc-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}),n.jsx("div",{style:{position:"absolute",top:"30%",left:"10%",width:300,height:300,borderRadius:"50%",background:"#3B82F6",filter:"blur(100px)",opacity:.04,pointerEvents:"none"}}),n.jsx("div",{style:{position:"absolute",bottom:"10%",right:"10%",width:250,height:250,borderRadius:"50%",background:"#10B981",filter:"blur(100px)",opacity:.05,pointerEvents:"none"}}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{marginBottom:48},children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:16},children:[n.jsx(Qe,{size:12,color:"#DC2626",fill:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",fontFamily:"'Barlow', sans-serif",textTransform:"uppercase"},children:"Layanan Digital"})]}),n.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16},children:n.jsxs("div",{children:[n.jsxs("h2",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:"clamp(28px, 4vw, 44px)",fontWeight:700,color:"#ffffff",margin:0,lineHeight:1.1,letterSpacing:"-0.01em"},children:["Semua Kebutuhan"," ",n.jsx("span",{style:{color:"#DC2626"},children:"Digital"})]}),n.jsx("p",{style:{margin:"10px 0 0",color:"rgba(255,255,255,0.4)",fontSize:14,fontFamily:"'Barlow', sans-serif",fontWeight:400},children:"Tidak hanya game — semua layanan digital dalam satu platform"})]})})]}),n.jsx("div",{className:"svc-grid",children:o.map((s,d)=>n.jsxs("div",{className:"svc-card svc-animate",style:{animationDelay:`${d*100}ms`},children:[n.jsx("style",{children:`
                .svc-card:nth-child(${d+1})::before {
                  background: radial-gradient(ellipse at 50% 120%, ${s.glow} 0%, transparent 65%);
                }
              `}),n.jsx("div",{className:"svc-top-line",style:{background:`linear-gradient(90deg, transparent, ${s.color}, transparent)`}}),n.jsx("div",{className:"svc-bottom-glow",style:{background:s.color}}),n.jsxs("div",{className:"svc-tag",style:{background:`${s.color}18`,border:`1px solid ${s.color}40`,color:s.color},children:[n.jsx("span",{children:"●"})," ",s.tag]}),n.jsx("div",{className:"svc-icon-wrap",style:{background:`${s.color}15`,border:`1px solid ${s.color}30`,color:s.color},children:n.jsx("div",{style:{width:28,height:28,color:s.color},children:s.icon})}),n.jsx("h3",{className:"svc-title",children:s.title}),n.jsx("p",{className:"svc-desc",children:s.description}),n.jsx("div",{className:"svc-divider"}),n.jsxs("div",{className:"svc-providers",children:[s.providers.map(p=>n.jsx("span",{className:"svc-provider-chip",children:p},p)),n.jsx("span",{className:"svc-provider-chip",style:{color:`${s.color}99`,borderColor:`${s.color}30`},children:"+lainnya"})]}),n.jsxs("button",{className:"svc-btn",onClick:()=>a("/layanandigital"),style:{background:`${s.color}18`,border:`1px solid ${s.color}40`,color:s.color},onMouseEnter:p=>{p.currentTarget.style.background=`${s.color}28`,p.currentTarget.style.borderColor=`${s.color}80`},onMouseLeave:p=>{p.currentTarget.style.background=`${s.color}18`,p.currentTarget.style.borderColor=`${s.color}40`},children:[n.jsx("span",{children:"Top Up Sekarang"}),n.jsx(mr,{size:16,className:"svc-btn-arrow"})]})]},s.id))})]})]})}function F5(){const a=[{val:"2.500+",label:"Akun Terjual"},{val:"0",label:"Kasus Penipuan"},{val:"100%",label:"Dana Aman"}],o=[{num:"01",title:"Pembeli Bayar",desc:"Dana masuk ke rekening bersama yang diamankan sistem kami",icon:"💳"},{num:"02",title:"Penjual Transfer",desc:"Akun dikirim ke pembeli untuk diverifikasi terlebih dahulu",icon:"📦"},{num:"03",title:"Konfirmasi",desc:"Setelah pembeli konfirmasi, dana diteruskan ke penjual",icon:"✅"}];return n.jsxs("section",{style:{background:"linear-gradient(180deg, #0f1015 0%, #0d0d0f 100%)",padding:"80px 0",position:"relative",overflow:"hidden"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .escrow-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
        }

        /* Header band */
        .escrow-header {
          position: relative;
          padding: 40px 40px 48px;
          background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 100%);
          border-bottom: 1px solid rgba(16,185,129,0.15);
          overflow: hidden;
        }

        .escrow-header::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 250px; height: 250px;
          border-radius: 50%;
          background: rgba(16,185,129,0.08);
          filter: blur(60px);
          pointer-events: none;
        }

        .escrow-header-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #10B981, transparent);
          opacity: 0.5;
        }

        .escrow-icon-shield {
          width: 64px; height: 64px;
          border-radius: 16px;
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #10B981;
        }

        /* Stats row */
        .escrow-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .escrow-stat {
          padding: 28px 24px;
          background: rgba(255,255,255,0.02);
          text-align: center;
          position: relative;
          transition: background 0.25s;
        }

        .escrow-stat:hover {
          background: rgba(16,185,129,0.05);
        }

        .escrow-stat-val {
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #10B981;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .escrow-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Body */
        .escrow-body {
          padding: 36px 40px 40px;
        }

        /* Steps */
        .escrow-steps-wrap {
          position: relative;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .escrow-step {
          position: relative;
          background: rgba(16,185,129,0.05);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 14px;
          padding: 22px 20px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .escrow-step:hover {
          background: rgba(16,185,129,0.09);
          border-color: rgba(16,185,129,0.25);
          transform: translateY(-3px);
        }

        .escrow-step::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .escrow-step:hover::after {
          opacity: 1;
        }

        .step-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(16,185,129,0.5);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .step-icon-circle {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 14px;
        }

        .step-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px;
          letter-spacing: 0.02em;
        }

        .step-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          margin: 0;
        }

        /* Connector arrow between steps */
        .step-connector {
          display: none;
        }

        @media (min-width: 768px) {
          .step-connector {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(16,185,129,0.3);
          }
        }

        /* Alert */
        .escrow-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 12px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.2);
          margin-bottom: 28px;
        }

        .escrow-alert-icon {
          color: #F59E0B;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .escrow-alert-text {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
        }

        .escrow-alert-text strong {
          color: #F59E0B;
          font-weight: 600;
        }

        /* CTA */
        .escrow-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(16,185,129,0.2);
          position: relative;
          overflow: hidden;
        }

        .escrow-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .escrow-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(16,185,129,0.35);
        }

        .escrow-cta:hover::before {
          opacity: 1;
        }

        .escrow-cta-arrow {
          transition: transform 0.25s ease;
        }

        .escrow-cta:hover .escrow-cta-arrow {
          transform: translateX(4px);
        }

        @keyframes escrowFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .escrow-animate {
          animation: escrowFadeUp 0.6s ease forwards;
        }
      `}),n.jsx("div",{style:{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:600,height:300,background:"rgba(16,185,129,0.04)",filter:"blur(80px)",pointerEvents:"none",borderRadius:"50%"}}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{marginBottom:36},children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:14},children:[n.jsx(Zs,{size:11,color:"#10B981"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#10B981",fontFamily:"'Barlow', sans-serif",textTransform:"uppercase"},children:"Sistem Escrow"})]}),n.jsxs("h2",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:"clamp(26px, 3.5vw, 40px)",fontWeight:700,color:"#ffffff",margin:0,lineHeight:1.1},children:["Jual Beli Akun"," ",n.jsx("span",{style:{color:"#10B981"},children:"100% Aman"})]}),n.jsx("p",{style:{margin:"10px 0 0",color:"rgba(255,255,255,0.4)",fontSize:14,fontFamily:"'Barlow', sans-serif"},children:"Dana Anda dijamin aman sampai transaksi selesai"})]}),n.jsxs("div",{className:"escrow-wrap escrow-animate",children:[n.jsxs("div",{className:"escrow-header",children:[n.jsx("div",{className:"escrow-header-top-line"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20,position:"relative"},children:[n.jsx("div",{className:"escrow-icon-shield",children:n.jsx(Mt,{size:28,strokeWidth:1.5})}),n.jsxs("div",{children:[n.jsx("h3",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:"clamp(20px, 2.5vw, 28px)",fontWeight:700,color:"#ffffff",margin:0,letterSpacing:"0.01em"},children:"Transaksi Dilindungi Sistem Escrow"}),n.jsx("p",{style:{margin:"6px 0 0",fontFamily:"'Barlow', sans-serif",fontSize:14,color:"rgba(16,185,129,0.7)",fontWeight:500},children:"Dana tidak langsung ke penjual — disimpan aman sampai kamu konfirmasi"})]})]})]}),n.jsx("div",{className:"escrow-stats",children:a.map(s=>n.jsxs("div",{className:"escrow-stat",children:[n.jsx("div",{className:"escrow-stat-val",children:s.val}),n.jsx("div",{className:"escrow-stat-label",children:s.label})]},s.label))}),n.jsxs("div",{className:"escrow-body",children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[n.jsx(pt,{size:18,color:"#10B981"}),n.jsx("span",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:18,fontWeight:700,color:"#ffffff",letterSpacing:"0.02em"},children:"Bagaimana Sistem Escrow Bekerja?"})]}),n.jsx("div",{className:"escrow-steps-wrap",children:o.map((s,d)=>n.jsxs("div",{style:{display:"contents"},children:[n.jsxs("div",{className:"escrow-step",children:[n.jsxs("div",{className:"step-num",children:["Step ",s.num]}),n.jsx("div",{className:"step-icon-circle",children:s.icon}),n.jsx("p",{className:"step-title",children:s.title}),n.jsx("p",{className:"step-desc",children:s.desc})]}),d<o.length-1&&n.jsx("div",{className:"step-connector",children:n.jsx(mr,{size:18})})]},s.num))}),n.jsxs("div",{className:"escrow-alert",children:[n.jsx(hi,{size:16,className:"escrow-alert-icon"}),n.jsxs("p",{className:"escrow-alert-text",children:[n.jsx("strong",{children:"Penting:"})," Verifikasi KTP diperlukan untuk menjual akun. Ini untuk melindungi semua pihak dari penipuan dan memastikan keamanan transaksi."]})]}),n.jsxs(Kt,{to:"/marketplace",className:"escrow-cta",children:[n.jsx(Qe,{size:16,fill:"white"}),"Jelajahi Marketplace",n.jsx(mr,{size:16,className:"escrow-cta-arrow"})]})]})]})]})]})}const Is="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-gXYICieDt2ZPnROrkqbrtVigrh8HqnqXA&s";function T5(){const a=Lr(),o=[{id:1,game:"Mobile Legends",gameColor:"#1E88E5",glowColor:"rgba(30,136,229,0.35)",image:Is,title:"Akun Mythic 800+ Points",rank:"Mythic Glory",heroes:"120+ Heroes",skins:"200+ Skins",seller:"ProGamer99",sellerRating:4.9,reviewCount:128,price:"Rp 2.500.000",status:"available"},{id:2,game:"PUBG Mobile",gameColor:"#6366F1",glowColor:"rgba(99,102,241,0.35)",image:Is,title:"Conqueror Season 25",rank:"Conqueror",heroes:"50+ Outfits",skins:"100+ Skins",seller:"PUBGKing",sellerRating:5,reviewCount:74,price:"Rp 3.200.000",status:"escrow"},{id:3,game:"Genshin Impact",gameColor:"#A78BFA",glowColor:"rgba(167,139,250,0.35)",image:Is,title:"AR 60 All 5-Star Characters",rank:"AR 60",heroes:"All 5★",skins:"Premium BP",seller:"TravelerMain",sellerRating:4.8,reviewCount:56,price:"Rp 5.000.000",status:"available"}],s={available:{label:"● Tersedia",color:"#10B981",bg:"rgba(16,185,129,0.12)",border:"rgba(16,185,129,0.3)"},escrow:{label:"🔒 In Escrow",color:"#F59E0B",bg:"rgba(245,158,11,0.12)",border:"rgba(245,158,11,0.3)"},sold:{label:"✕ Terjual",color:"rgba(255,255,255,0.3)",bg:"rgba(255,255,255,0.05)",border:"rgba(255,255,255,0.1)"}};return n.jsxs("section",{style:{background:"linear-gradient(180deg, #0d0d0f 0%, #111318 100%)",padding:"80px 0",position:"relative",overflow:"hidden"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .fa-card {
          position: relative;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.38s cubic-bezier(0.23,1,0.32,1);
          display: flex;
          flex-direction: column;
        }

        .fa-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.13);
        }

        /* image area */
        .fa-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #1a1a2e;
        }

        .fa-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }

        .fa-card:hover .fa-img-wrap img {
          transform: scale(1.06);
        }

        /* dark gradient over image bottom */
        .fa-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            0deg,
            rgba(13,13,15,0.95) 0%,
            rgba(13,13,15,0.4) 45%,
            transparent 100%
          );
        }

        /* game tag on image */
        .fa-game-tag {
          position: absolute;
          top: 14px; left: 14px;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 11px;
          border-radius: 6px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }

        /* status badge on image */
        .fa-status-badge {
          position: absolute;
          top: 14px; right: 14px;
          padding: 4px 11px;
          border-radius: 6px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.05em;
          backdrop-filter: blur(8px);
        }

        /* price on image bottom-left */
        .fa-price-overlay {
          position: absolute;
          bottom: 14px; left: 14px;
        }

        /* body */
        .fa-body {
          padding: 20px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        /* stats row */
        .fa-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 8px;
        }

        .fa-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 10px 8px;
          text-align: center;
          transition: all 0.2s;
        }

        .fa-card:hover .fa-stat {
          background: rgba(255,255,255,0.06);
        }

        .fa-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 3px;
          font-weight: 500;
        }

        .fa-stat-val {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          line-height: 1.1;
        }

        /* seller row */
        .fa-seller {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .fa-seller-avatar {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
        }

        .fa-seller-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; font-weight: 700;
          color: rgba(255,255,255,0.8);
        }

        .fa-seller-rating {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        /* hover glow per card via CSS var */
        .fa-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 100px;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .fa-card:hover::after {
          opacity: 0.6;
        }

        /* top accent line */
        .fa-top-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        .fa-card:hover .fa-top-line {
          opacity: 1;
        }

        @keyframes faFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fa-animate {
          animation: faFadeUp 0.5s ease forwards;
          opacity: 0;
        }

        .fa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }

        @media (min-width: 960px) {
          .fa-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .fa-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
          border: none; border-radius: 10px;
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px; font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(220,38,38,0.25);
        }

        .fa-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(220,38,38,0.4);
        }

        .fa-cta-arrow { transition: transform 0.25s ease; }
        .fa-cta-btn:hover .fa-cta-arrow { transform: translateX(5px); }
      `}),n.jsx("div",{style:{position:"absolute",top:"10%",right:"-5%",width:350,height:350,borderRadius:"50%",background:"#DC2626",filter:"blur(120px)",opacity:.04,pointerEvents:"none"}}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:16},children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:14},children:[n.jsx(Qe,{size:11,color:"#DC2626",fill:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",fontFamily:"'Barlow', sans-serif",textTransform:"uppercase"},children:"Marketplace"})]}),n.jsxs("h2",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:"clamp(28px, 4vw, 44px)",fontWeight:700,color:"#fff",margin:0,lineHeight:1.1},children:["Akun"," ",n.jsx("span",{style:{color:"#DC2626"},children:"Unggulan"})]}),n.jsx("p",{style:{margin:"10px 0 0",color:"rgba(255,255,255,0.4)",fontSize:14,fontFamily:"'Barlow', sans-serif"},children:"Akun game berkualitas tinggi • Dijamin aman dengan Escrow"})]}),n.jsxs("button",{onClick:()=>a("/marketplace"),style:{display:"flex",alignItems:"center",gap:8,background:"transparent",border:"1px solid rgba(220,38,38,0.4)",borderRadius:8,padding:"10px 20px",color:"#DC2626",fontSize:13,fontWeight:600,fontFamily:"'Barlow', sans-serif",cursor:"pointer",letterSpacing:"0.04em",transition:"all 0.2s ease",whiteSpace:"nowrap"},onMouseEnter:d=>d.currentTarget.style.background="rgba(220,38,38,0.1)",onMouseLeave:d=>d.currentTarget.style.background="transparent",children:["Lihat Semua ",n.jsx(mr,{size:14})]})]}),n.jsx("div",{className:"fa-grid",style:{marginBottom:40},children:o.map((d,p)=>{const u=s[d.status];return n.jsxs("div",{className:"fa-card fa-animate",style:{animationDelay:`${p*100}ms`,"--glow":d.glowColor},onClick:()=>a("/marketplace"),children:[n.jsx("style",{children:`
                  .fa-card:nth-child(${p+1})::after { background: ${d.gameColor}; }
                  .fa-card:nth-child(${p+1}) .fa-top-line {
                    background: linear-gradient(90deg, transparent, ${d.gameColor}, transparent);
                  }
                `}),n.jsx("div",{className:"fa-top-line"}),n.jsxs("div",{className:"fa-img-wrap",children:[n.jsx("img",{src:d.image,alt:d.title,loading:"lazy"}),n.jsx("div",{className:"fa-img-overlay"}),n.jsxs("div",{className:"fa-game-tag",style:{background:`${d.gameColor}22`,border:`1px solid ${d.gameColor}55`,color:d.gameColor},children:[n.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:d.gameColor,display:"inline-block"}}),d.game]}),n.jsx("div",{className:"fa-status-badge",style:{background:u.bg,border:`1px solid ${u.border}`,color:u.color,fontFamily:"'Barlow', sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.06em",padding:"4px 10px",borderRadius:6},children:u.label}),n.jsxs("div",{className:"fa-price-overlay",children:[n.jsx("div",{style:{fontFamily:"'Barlow', sans-serif",fontSize:10,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:2},children:"Harga"}),n.jsx("div",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:22,fontWeight:700,color:"#fff",lineHeight:1,letterSpacing:"0.01em",textShadow:"0 2px 8px rgba(0,0,0,0.8)"},children:d.price})]})]}),n.jsxs("div",{className:"fa-body",children:[n.jsx("h3",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:18,fontWeight:700,color:"#fff",margin:0,letterSpacing:"0.02em",lineHeight:1.2},children:d.title}),n.jsx("div",{className:"fa-stats",children:[{label:"Rank",val:d.rank},{label:"Heroes",val:d.heroes},{label:"Skins",val:d.skins}].map(m=>n.jsxs("div",{className:"fa-stat",children:[n.jsx("div",{className:"fa-stat-label",children:m.label}),n.jsx("div",{className:"fa-stat-val",children:m.val})]},m.label))}),n.jsxs("div",{className:"fa-seller",children:[n.jsx("div",{className:"fa-seller-avatar",children:n.jsx(Tn,{size:16})}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{className:"fa-seller-name",children:d.seller}),n.jsxs("div",{className:"fa-seller-rating",children:[n.jsx(Ln,{size:10,fill:"#F59E0B",color:"#F59E0B"}),n.jsx("span",{style:{color:"#F59E0B",fontWeight:600},children:d.sellerRating}),n.jsxs("span",{children:["· ",d.reviewCount," ulasan"]})]})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#10B981",fontFamily:"'Barlow', sans-serif",fontWeight:600},children:[n.jsx(Mt,{size:11}),"Escrow"]})]})]})]},d.id)})}),n.jsx("div",{style:{textAlign:"center"},children:n.jsxs("button",{className:"fa-cta-btn",onClick:()=>a("/marketplace"),children:[n.jsx(Qe,{size:16,fill:"white"}),"Lihat Semua Akun",n.jsx(mr,{size:16,className:"fa-cta-arrow"})]})})]})]})}function B5(){const[a,o]=v.useState(0),[s,d]=v.useState(!1),[p,u]=v.useState("right"),m=[{id:1,initials:"LIS",name:"Lionel Irwan Subianto",game:"Mobile Legends",gameColor:"#1E88E5",location:"Lamongan",rating:5,text:"Proses top up sangat cepat! Diamond masuk kurang dari 1 menit. Harga juga paling murah dibanding yang lain. Udah langganan di sini terus."},{id:2,initials:"DVS",name:"Dominik Vio Szoboslzai",game:"Free Fire",gameColor:"#FF4500",location:"Lumajang",rating:5,text:"Sudah langganan di OkeGass dari tahun lalu. Selalu dapat harga terbaik dan pelayanan ramah. Recommended banget buat yang sering top up!"},{id:3,initials:"CDA",name:"Cristiano Dafa Alfino",game:"PUBG Mobile",gameColor:"#6366F1",location:"Kediri",rating:5,text:"Beli akun PUBG pakai sistem escrow, aman banget! Dana baru keluar setelah akun saya terima dan verifikasi. Top markotop!"},{id:4,initials:"DP",name:"Dewi Persik",game:"Genshin Impact",gameColor:"#A78BFA",location:"Jakarta",rating:5,text:"Top up Genesis Crystal lancar jaya. Customer service responsif 24/7. Pokoknya gak nyesel deh pindah ke OkeGass!"},{id:5,initials:"DT",name:"Donald Trump",game:"Valorant",gameColor:"#FF4655",location:"Ngawi",rating:5,text:"Jual akun Valorant di sini, prosesnya cepat dan aman. Uang langsung masuk setelah pembeli konfirmasi. Sistem escrow-nya bikin tenang."}],g=(b,N)=>{s||(d(!0),u(N),setTimeout(()=>{o(b),d(!1)},280))};v.useEffect(()=>{const b=setInterval(()=>{const N=(a+1)%m.length;g(N,"right")},5e3);return()=>clearInterval(b)},[a,m.length]);const h=()=>g((a+1)%m.length,"right"),x=()=>g((a-1+m.length)%m.length,"left"),S=m[a];return n.jsxs("section",{style:{background:"linear-gradient(180deg, #111318 0%, #0d0d0f 100%)",padding:"80px 0",position:"relative",overflow:"hidden"},children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .tm-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 52px;
          overflow: hidden;
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .tm-card.animating-right {
          opacity: 0;
          transform: translateX(40px);
        }

        .tm-card.animating-left {
          opacity: 0;
          transform: translateX(-40px);
        }

        .tm-card.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .tm-card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--game-color), transparent);
          opacity: 0.6;
        }

        .tm-card-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 250px; height: 250px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.06;
          pointer-events: none;
        }

        .tm-quote-icon {
          position: absolute;
          top: 28px; right: 36px;
          opacity: 0.06;
          color: #fff;
        }

        .tm-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }

        .tm-text {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          color: rgba(255,255,255,0.65);
          line-height: 1.75;
          font-weight: 400;
          font-style: italic;
          margin: 0 0 32px;
        }

        .tm-author {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .tm-avatar {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          position: relative;
        }

        .tm-avatar-ring {
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          border: 1px solid;
          opacity: 0.4;
        }

        .tm-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #fff; margin: 0;
          letter-spacing: 0.02em;
        }

        .tm-meta {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin: 3px 0 0;
          font-weight: 500;
        }

        .tm-game-chip {
          margin-left: auto;
          padding: 5px 12px;
          border-radius: 6px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        /* nav buttons */
        .tm-nav-btn {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .tm-nav-btn:hover {
          background: rgba(220,38,38,0.12);
          border-color: rgba(220,38,38,0.35);
          color: #DC2626;
        }

        /* dots */
        .tm-dot {
          height: 4px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.12);
        }

        .tm-dot.active {
          background: #DC2626;
          box-shadow: 0 0 8px rgba(220,38,38,0.6);
        }

        .tm-dot:hover:not(.active) {
          background: rgba(255,255,255,0.25);
        }

        /* side cards preview */
        .tm-side-card {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 200px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 20px;
          opacity: 0.4;
          filter: blur(1px);
          pointer-events: none;
        }

        @keyframes tmFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tm-animate { animation: tmFadeUp 0.6s ease forwards; }
      `}),n.jsx("div",{style:{position:"absolute",bottom:"10%",left:"5%",width:400,height:300,borderRadius:"50%",background:"#DC2626",filter:"blur(120px)",opacity:.04,pointerEvents:"none"}}),n.jsxs("div",{style:{maxWidth:860,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{textAlign:"center",marginBottom:48},className:"tm-animate",children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:16},children:[n.jsx(Ln,{size:11,color:"#DC2626",fill:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",fontFamily:"'Barlow', sans-serif",textTransform:"uppercase"},children:"Testimoni"})]}),n.jsxs("h2",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:"clamp(28px, 4vw, 44px)",fontWeight:700,color:"#fff",margin:0,lineHeight:1.1},children:["Apa Kata"," ",n.jsx("span",{style:{color:"#DC2626"},children:"Mereka?"})]}),n.jsx("p",{style:{margin:"12px 0 0",color:"rgba(255,255,255,0.4)",fontSize:14,fontFamily:"'Barlow', sans-serif"},children:"Testimoni dari ribuan pengguna setia OkeGass Store"})]}),n.jsxs("div",{className:`tm-card ${s?p==="right"?"animating-right":"animating-left":"visible"}`,style:{"--game-color":S.gameColor},children:[n.jsx("div",{className:"tm-card-top-line"}),n.jsx("div",{className:"tm-card-glow",style:{background:S.gameColor}}),n.jsx($2,{size:80,className:"tm-quote-icon"}),n.jsx("div",{className:"tm-stars",children:[...Array(S.rating)].map((b,N)=>n.jsx(Ln,{size:18,fill:"#F59E0B",color:"#F59E0B"},N))}),n.jsxs("p",{className:"tm-text",children:['"',S.text,'"']}),n.jsxs("div",{className:"tm-author",children:[n.jsxs("div",{className:"tm-avatar",style:{background:`${S.gameColor}22`},children:[n.jsx("div",{className:"tm-avatar-ring",style:{borderColor:S.gameColor}}),n.jsx("span",{style:{color:S.gameColor},children:S.initials})]}),n.jsxs("div",{children:[n.jsx("p",{className:"tm-name",children:S.name}),n.jsxs("p",{className:"tm-meta",children:["📍 ",S.location]})]}),n.jsx("div",{className:"tm-game-chip",style:{background:`${S.gameColor}15`,border:`1px solid ${S.gameColor}35`,color:S.gameColor},children:S.game})]})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:28,gap:16},children:[n.jsx("button",{className:"tm-nav-btn",onClick:x,"aria-label":"Previous",children:n.jsx(gf,{size:20})}),n.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",flex:1,justifyContent:"center"},children:m.map((b,N)=>n.jsx("div",{className:`tm-dot ${N===a?"active":""}`,style:{width:N===a?28:16},onClick:()=>g(N,N>a?"right":"left")},N))}),n.jsx("button",{className:"tm-nav-btn",onClick:h,"aria-label":"Next",children:n.jsx(ga,{size:20})})]}),n.jsxs("div",{style:{textAlign:"center",marginTop:20,fontFamily:"'Barlow', sans-serif",fontSize:12,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em"},children:[String(a+1).padStart(2,"0")," / ",String(m.length).padStart(2,"0")]})]})]})}function D5(){return n.jsxs("div",{children:[n.jsx(w5,{}),n.jsx(k5,{}),n.jsx(P5,{}),n.jsx(L5,{}),n.jsx(F5,{}),n.jsx(T5,{}),n.jsx(B5,{})]})}const Bl=[{id:"ml",name:"Mobile Legends",color:"#1E88E5",currency:"Diamonds",icon:"⚔️",category:"MOBA"},{id:"hok",name:"Honor of Kings",color:"#D4AF37",currency:"Tokens",icon:"👑",category:"MOBA"},{id:"wildrift",name:"Wild Rift",color:"#C89B3C",currency:"Wild Cores",icon:"🏹",category:"MOBA"},{id:"dota2",name:"Dota 2",color:"#BF3D3B",currency:"Shards",icon:"🌀",category:"MOBA"},{id:"ff",name:"Free Fire",color:"#FF4500",currency:"Diamonds",icon:"🔥",category:"Battle Royale"},{id:"pubg",name:"PUBG Mobile",color:"#F59E0B",currency:"UC",icon:"🎯",category:"Battle Royale"},{id:"codm",name:"Call of Duty Mobile",color:"#4CAF50",currency:"CP",icon:"🪖",category:"Battle Royale"},{id:"apex",name:"Apex Legends Mobile",color:"#DA3B1F",currency:"Coins",icon:"🦅",category:"Battle Royale"},{id:"zbbr",name:"Zula Mobile",color:"#607D8B",currency:"Z Points",icon:"🔫",category:"Battle Royale"},{id:"valorant",name:"Valorant",color:"#FF4655",currency:"VP",icon:"💀",category:"FPS"},{id:"cs2",name:"CS2 Skins",color:"#F0A500",currency:"Credits",icon:"🧨",category:"FPS"},{id:"xdefiant",name:"XDefiant",color:"#00B4D8",currency:"Credits",icon:"🎮",category:"FPS"},{id:"genshin",name:"Genshin Impact",color:"#A78BFA",currency:"Genesis Crystals",icon:"✨",category:"RPG"},{id:"hsr",name:"Honkai: Star Rail",color:"#7EC8E3",currency:"Oneiric Shards",icon:"🚂",category:"RPG"},{id:"zzz",name:"Zenless Zone Zero",color:"#FFD700",currency:"Polychrome",icon:"⚡",category:"RPG"},{id:"wuwa",name:"Wuthering Waves",color:"#34D399",currency:"Lunite",icon:"🌊",category:"RPG"},{id:"hi3",name:"Honkai Impact 3rd",color:"#E879F9",currency:"Crystals",icon:"🌸",category:"RPG"},{id:"nikke",name:"Goddess of Victory: NIKKE",color:"#F472B6",currency:"Gems",icon:"🤖",category:"RPG"},{id:"coc",name:"Clash of Clans",color:"#FBBF24",currency:"Gems",icon:"🏰",category:"Strategy"},{id:"cr",name:"Clash Royale",color:"#8B5CF6",currency:"Gems",icon:"👾",category:"Strategy"},{id:"riseofkingdoms",name:"Rise of Kingdoms",color:"#10B981",currency:"Gems",icon:"⚜️",category:"Strategy"},{id:"lordsmobile",name:"Lords Mobile",color:"#3B82F6",currency:"Gems",icon:"🗡️",category:"Strategy"},{id:"evony",name:"Evony",color:"#EF4444",currency:"Gems",icon:"🛡️",category:"Strategy"},{id:"efootball",name:"eFootball",color:"#1D4ED8",currency:"Coins",icon:"⚽",category:"Sports"},{id:"nba2k",name:"NBA 2K Mobile",color:"#EA580C",currency:"VC",icon:"🏀",category:"Sports"},{id:"asphalt",name:"Asphalt 9",color:"#DC2626",currency:"Credits",icon:"🏎️",category:"Racing"},{id:"ragnarok",name:"Ragnarok M",color:"#0EA5E9",currency:"Crystals",icon:"🧝",category:"RPG"},{id:"aov",name:"Arena of Valor",color:"#F59E0B",currency:"Vouchers",icon:"🗡️",category:"MOBA"}],M5={ml:[{id:"ml1",amount:50,label:"50 Diamonds",price:14e3},{id:"ml2",amount:75,label:"75 Diamonds",price:2e4},{id:"ml3",amount:150,label:"150 Diamonds",price:38e3,bonus:15},{id:"ml4",amount:250,label:"250 Diamonds",price:6e4,popular:!0},{id:"ml5",amount:500,label:"500 Diamonds",price:115e3,bonus:50},{id:"ml6",amount:750,label:"750 Diamonds",price:165e3},{id:"ml7",amount:1e3,label:"1000 Diamonds",price:21e4,bonus:100,popular:!0},{id:"ml8",amount:2e3,label:"2000 Diamonds",price:405e3,bonus:200},{id:"ml9",amount:5e3,label:"5000 Diamonds",price:99e4,bonus:500},{id:"ml10",amount:1e4,label:"10000 Diamonds",price:195e4,bonus:1e3},{id:"ml11",amount:500,label:"Twilight Pass",price:65e3},{id:"ml12",amount:300,label:"Weekly Diamond Pass",price:32e3}],ff:[{id:"ff1",amount:70,label:"70 Diamonds",price:17e3},{id:"ff2",amount:140,label:"140 Diamonds",price:32e3},{id:"ff3",amount:355,label:"355 Diamonds",price:79e3,popular:!0},{id:"ff4",amount:720,label:"720 Diamonds",price:155e3,bonus:72},{id:"ff5",amount:1450,label:"1450 Diamonds",price:3e5,bonus:145,popular:!0},{id:"ff6",amount:2900,label:"2900 Diamonds",price:59e4,bonus:290}],pubg:[{id:"pubg1",amount:60,label:"60 UC",price:14e3},{id:"pubg2",amount:180,label:"180 UC",price:38e3},{id:"pubg3",amount:325,label:"325 UC",price:68e3,popular:!0},{id:"pubg4",amount:660,label:"660 UC",price:135e3,bonus:60},{id:"pubg5",amount:1800,label:"1800 UC",price:365e3,bonus:180,popular:!0},{id:"pubg6",amount:3850,label:"3850 UC",price:75e4,bonus:350}],genshin:[{id:"gen1",amount:60,label:"60 Crystals",price:15e3},{id:"gen2",amount:300,label:"300 Crystals",price:72e3,bonus:30},{id:"gen3",amount:980,label:"980 Crystals",price:232e3,bonus:110,popular:!0},{id:"gen4",amount:1980,label:"1980 Crystals",price:462e3,bonus:260},{id:"gen5",amount:3280,label:"3280 Crystals",price:762e3,bonus:600,popular:!0},{id:"gen6",amount:6480,label:"6480 Crystals",price:1502e3,bonus:1600}],valorant:[{id:"val1",amount:475,label:"475 VP",price:5e4},{id:"val2",amount:1e3,label:"1000 VP",price:1e5},{id:"val3",amount:2050,label:"2050 VP",price:2e5,popular:!0},{id:"val4",amount:3650,label:"3650 VP",price:35e4,bonus:100},{id:"val5",amount:5350,label:"5350 VP",price:5e5,bonus:250,popular:!0},{id:"val6",amount:11e3,label:"11000 VP",price:1e6,bonus:1e3}],hok:[{id:"hok1",amount:70,label:"70 Tokens",price:15e3},{id:"hok2",amount:180,label:"180 Tokens",price:38e3},{id:"hok3",amount:360,label:"360 Tokens",price:75e3,popular:!0},{id:"hok4",amount:750,label:"750 Tokens",price:15e4},{id:"hok5",amount:1500,label:"1500 Tokens",price:29e4,bonus:100,popular:!0},{id:"hok6",amount:3e3,label:"3000 Tokens",price:57e4,bonus:300}],wildrift:[{id:"wr1",amount:325,label:"325 Wild Cores",price:55e3},{id:"wr2",amount:660,label:"660 Wild Cores",price:109e3},{id:"wr3",amount:1270,label:"1270 Wild Cores",price:209e3,popular:!0},{id:"wr4",amount:2565,label:"2565 Wild Cores",price:419e3,bonus:130,popular:!0},{id:"wr5",amount:5530,label:"5530 Wild Cores",price:839e3,bonus:280}],dota2:[{id:"d1",amount:200,label:"200 Shards",price:28e3},{id:"d2",amount:500,label:"500 Shards",price:65e3},{id:"d3",amount:1e3,label:"1000 Shards",price:125e3,popular:!0},{id:"d4",amount:2500,label:"2500 Shards",price:3e5,bonus:250,popular:!0},{id:"d5",amount:5e3,label:"5000 Shards",price:58e4,bonus:600}],codm:[{id:"codm1",amount:80,label:"80 CP",price:15e3},{id:"codm2",amount:200,label:"200 CP",price:36e3},{id:"codm3",amount:400,label:"400 CP",price:7e4,popular:!0},{id:"codm4",amount:800,label:"800 CP",price:139e3,bonus:80},{id:"codm5",amount:2e3,label:"2000 CP",price:339e3,bonus:200,popular:!0},{id:"codm6",amount:4e3,label:"4000 CP",price:669e3,bonus:500}],apex:[{id:"apex1",amount:100,label:"100 Coins",price:15e3},{id:"apex2",amount:500,label:"500 Coins",price:75e3},{id:"apex3",amount:1e3,label:"1000 Coins",price:145e3,popular:!0},{id:"apex4",amount:2150,label:"2150 Coins",price:299e3,bonus:150,popular:!0},{id:"apex5",amount:4350,label:"4350 Coins",price:589e3,bonus:350}],zbbr:[{id:"zb1",amount:100,label:"100 Z Points",price:18e3},{id:"zb2",amount:300,label:"300 Z Points",price:5e4},{id:"zb3",amount:700,label:"700 Z Points",price:11e4,popular:!0},{id:"zb4",amount:1500,label:"1500 Z Points",price:22e4,bonus:100}],cs2:[{id:"cs1",amount:1e3,label:"1000 Credits",price:99e3},{id:"cs2a",amount:2200,label:"2200 Credits",price:199e3,popular:!0},{id:"cs3",amount:4600,label:"4600 Credits",price:399e3,bonus:400,popular:!0},{id:"cs4",amount:1e4,label:"10000 Credits",price:849e3,bonus:1e3}],xdefiant:[{id:"xd1",amount:500,label:"500 Credits",price:55e3},{id:"xd2",amount:1100,label:"1100 Credits",price:109e3,popular:!0},{id:"xd3",amount:2400,label:"2400 Credits",price:219e3,bonus:100},{id:"xd4",amount:5e3,label:"5000 Credits",price:429e3,bonus:300,popular:!0}],hsr:[{id:"hsr1",amount:60,label:"60 Shards",price:15e3},{id:"hsr2",amount:300,label:"300 Shards",price:72e3,bonus:30},{id:"hsr3",amount:980,label:"980 Shards",price:232e3,bonus:110,popular:!0},{id:"hsr4",amount:1980,label:"1980 Shards",price:462e3,bonus:260},{id:"hsr5",amount:3280,label:"3280 Shards",price:762e3,bonus:600,popular:!0},{id:"hsr6",amount:6480,label:"6480 Shards",price:1502e3,bonus:1600}],zzz:[{id:"zzz1",amount:60,label:"60 Polychrome",price:15e3},{id:"zzz2",amount:300,label:"300 Polychrome",price:72e3,bonus:30},{id:"zzz3",amount:980,label:"980 Polychrome",price:232e3,bonus:110,popular:!0},{id:"zzz4",amount:1980,label:"1980 Polychrome",price:462e3,bonus:260},{id:"zzz5",amount:3280,label:"3280 Polychrome",price:762e3,bonus:600,popular:!0}],wuwa:[{id:"ww1",amount:60,label:"60 Lunite",price:15e3},{id:"ww2",amount:300,label:"300 Lunite",price:72e3,bonus:30},{id:"ww3",amount:980,label:"980 Lunite",price:232e3,bonus:110,popular:!0},{id:"ww4",amount:1980,label:"1980 Lunite",price:462e3,bonus:260},{id:"ww5",amount:3280,label:"3280 Lunite",price:762e3,bonus:600,popular:!0}],hi3:[{id:"hi1",amount:98,label:"98 Crystals",price:25e3},{id:"hi2",amount:196,label:"196 Crystals",price:48e3},{id:"hi3a",amount:394,label:"394 Crystals",price:95e3,popular:!0},{id:"hi4",amount:788,label:"788 Crystals",price:185e3,bonus:80,popular:!0},{id:"hi5",amount:1576,label:"1576 Crystals",price:365e3,bonus:180}],nikke:[{id:"nk1",amount:80,label:"80 Gems",price:16e3},{id:"nk2",amount:200,label:"200 Gems",price:38e3},{id:"nk3",amount:500,label:"500 Gems",price:95e3,popular:!0},{id:"nk4",amount:1e3,label:"1000 Gems",price:185e3,bonus:100,popular:!0},{id:"nk5",amount:2500,label:"2500 Gems",price:455e3,bonus:300}],coc:[{id:"coc1",amount:80,label:"80 Gems",price:16e3},{id:"coc2",amount:500,label:"500 Gems",price:79e3},{id:"coc3",amount:1200,label:"1200 Gems",price:159e3,popular:!0},{id:"coc4",amount:2500,label:"2500 Gems",price:319e3,bonus:250,popular:!0},{id:"coc5",amount:6500,label:"6500 Gems",price:799e3,bonus:750},{id:"coc6",amount:14e3,label:"14000 Gems",price:1599e3,bonus:1500}],cr:[{id:"cr1",amount:80,label:"80 Gems",price:16e3},{id:"cr2",amount:500,label:"500 Gems",price:79e3},{id:"cr3",amount:1200,label:"1200 Gems",price:159e3,popular:!0},{id:"cr4",amount:2500,label:"2500 Gems",price:319e3,bonus:250,popular:!0},{id:"cr5",amount:6500,label:"6500 Gems",price:799e3,bonus:750}],riseofkingdoms:[{id:"rok1",amount:200,label:"200 Gems",price:35e3},{id:"rok2",amount:500,label:"500 Gems",price:85e3},{id:"rok3",amount:1200,label:"1200 Gems",price:195e3,popular:!0},{id:"rok4",amount:2500,label:"2500 Gems",price:395e3,bonus:250,popular:!0},{id:"rok5",amount:6500,label:"6500 Gems",price:995e3,bonus:800}],lordsmobile:[{id:"lm1",amount:100,label:"100 Gems",price:18e3},{id:"lm2",amount:500,label:"500 Gems",price:85e3},{id:"lm3",amount:1200,label:"1200 Gems",price:195e3,popular:!0},{id:"lm4",amount:3e3,label:"3000 Gems",price:475e3,bonus:300,popular:!0},{id:"lm5",amount:6500,label:"6500 Gems",price:995e3,bonus:750}],evony:[{id:"ev1",amount:200,label:"200 Gems",price:35e3},{id:"ev2",amount:600,label:"600 Gems",price:99e3},{id:"ev3",amount:1500,label:"1500 Gems",price:235e3,popular:!0},{id:"ev4",amount:3e3,label:"3000 Gems",price:459e3,bonus:300,popular:!0},{id:"ev5",amount:7e3,label:"7000 Gems",price:1049e3,bonus:800}],efootball:[{id:"ef1",amount:200,label:"200 Coins",price:3e4},{id:"ef2",amount:500,label:"500 Coins",price:7e4},{id:"ef3",amount:1e3,label:"1000 Coins",price:135e3,popular:!0},{id:"ef4",amount:2500,label:"2500 Coins",price:325e3,bonus:200,popular:!0},{id:"ef5",amount:5e3,label:"5000 Coins",price:635e3,bonus:500}],nba2k:[{id:"nba1",amount:200,label:"200 VC",price:28e3},{id:"nba2",amount:500,label:"500 VC",price:68e3},{id:"nba3",amount:1200,label:"1200 VC",price:158e3,popular:!0},{id:"nba4",amount:2500,label:"2500 VC",price:315e3,bonus:200,popular:!0},{id:"nba5",amount:5e3,label:"5000 VC",price:615e3,bonus:500}],asphalt:[{id:"as1",amount:200,label:"200 Credits",price:25e3},{id:"as2",amount:600,label:"600 Credits",price:7e4},{id:"as3",amount:1500,label:"1500 Credits",price:165e3,popular:!0},{id:"as4",amount:3500,label:"3500 Credits",price:375e3,bonus:300,popular:!0},{id:"as5",amount:8e3,label:"8000 Credits",price:829e3,bonus:800}],ragnarok:[{id:"ro1",amount:100,label:"100 Crystals",price:2e4},{id:"ro2",amount:300,label:"300 Crystals",price:58e3},{id:"ro3",amount:700,label:"700 Crystals",price:13e4,popular:!0},{id:"ro4",amount:1500,label:"1500 Crystals",price:268e3,bonus:150,popular:!0},{id:"ro5",amount:4e3,label:"4000 Crystals",price:698e3,bonus:500}],aov:[{id:"aov1",amount:75,label:"75 Vouchers",price:15e3},{id:"aov2",amount:200,label:"200 Vouchers",price:38e3},{id:"aov3",amount:500,label:"500 Vouchers",price:9e4,popular:!0},{id:"aov4",amount:1e3,label:"1000 Vouchers",price:175e3,bonus:100,popular:!0},{id:"aov5",amount:2500,label:"2500 Vouchers",price:425e3,bonus:300}]},Dl=[{id:"gopay",name:"GoPay",emoji:"💚",category:"E-Wallet"},{id:"ovo",name:"OVO",emoji:"💜",category:"E-Wallet"},{id:"dana",name:"DANA",emoji:"💙",category:"E-Wallet"},{id:"shopeepay",name:"ShopeePay",emoji:"🧡",category:"E-Wallet"},{id:"linkaja",name:"LinkAja",emoji:"❤️",category:"E-Wallet"},{id:"bca",name:"BCA Virtual Account",emoji:"🏦",category:"Bank Transfer"},{id:"bni",name:"BNI Virtual Account",emoji:"🏦",category:"Bank Transfer"},{id:"mandiri",name:"Mandiri Virtual Account",emoji:"🏦",category:"Bank Transfer"},{id:"bri",name:"BRI Virtual Account",emoji:"🏦",category:"Bank Transfer"},{id:"qris",name:"QRIS",emoji:"📱",category:"QR Code"},{id:"alfamart",name:"Alfamart",emoji:"🏪",category:"Minimarket"},{id:"indomaret",name:"Indomaret",emoji:"🏪",category:"Minimarket"}],$s=a=>"Rp "+a.toLocaleString("id-ID"),_5=["Semua","MOBA","Battle Royale","FPS","RPG","Strategy","Sports","Racing"],Os=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.tu-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
}

.tu-hero {
  position: relative;
  padding: 40px 0 36px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.tu-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(234,88,12,0.08) 50%, transparent 100%);
}
.tu-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}
.tu-hero-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent);
}

.tu-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}
.tu-card-top {
  position: absolute; top: 0; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}
.tu-step-num {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 700; color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(220,38,38,0.35);
}
.tu-section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px; font-weight: 700;
  color: #fff; margin: 0;
  letter-spacing: 0.02em;
}

/* Search */
.tu-search-wrap {
  position: relative;
  margin-bottom: 14px;
}
.tu-search-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: rgba(255,255,255,0.3); pointer-events: none;
}
.tu-search-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 10px 14px 10px 36px;
  font-family: 'Barlow', sans-serif;
  font-size: 13px; font-weight: 500; color: #fff;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}
.tu-search-input::placeholder { color: rgba(255,255,255,0.2); }
.tu-search-input:focus {
  border-color: rgba(220,38,38,0.4);
  background: rgba(220,38,38,0.03);
}

/* Category tabs */
.tu-cat-tabs {
  display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;
}
.tu-cat-tab {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  font-family: 'Barlow', sans-serif;
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.4);
  cursor: pointer; transition: all 0.18s;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.tu-cat-tab:hover {
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
}
.tu-cat-tab.active {
  background: rgba(220,38,38,0.12);
  border-color: rgba(220,38,38,0.45);
  color: #DC2626;
}

/* Game cards */
.tu-game-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s ease;
  text-align: left; position: relative; overflow: hidden;
}
.tu-game-btn:hover {
  border-color: rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
}
.tu-game-btn.active {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.5);
}
.tu-game-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}

/* Denom cards */
.tu-denom-btn {
  position: relative;
  padding: 14px 14px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s ease;
  text-align: left; overflow: hidden;
}
.tu-denom-btn:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  transform: translateY(-2px);
}
.tu-denom-btn.active {
  border-color: rgba(220,38,38,0.6);
  background: rgba(220,38,38,0.07);
}
.tu-denom-btn.active::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #DC2626, transparent);
}
.tu-popular-badge {
  position: absolute; top: -1px; right: 12px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff; font-size: 9px; font-weight: 700;
  padding: 3px 8px; border-radius: 0 0 6px 6px;
  letter-spacing: 0.06em; text-transform: uppercase;
  font-family: 'Barlow', sans-serif;
}

/* Input */
.tu-input-wrap label {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-bottom: 8px; font-family: 'Barlow', sans-serif;
}
.tu-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 12px 14px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px; font-weight: 500; color: #fff;
  outline: none; transition: all 0.2s; box-sizing: border-box;
}
.tu-input::placeholder { color: rgba(255,255,255,0.2); }
.tu-input:focus {
  border-color: rgba(220,38,38,0.5);
  background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
}

/* Payment */
.tu-pay-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.2s;
}
.tu-pay-btn:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
}
.tu-pay-btn.active {
  border-color: rgba(220,38,38,0.5);
  background: rgba(220,38,38,0.07);
}
.tu-cat-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase; letter-spacing: 0.1em;
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 8px; font-family: 'Barlow', sans-serif;
}

/* Summary */
.tu-summary {
  position: sticky; top: 84px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 24px; overflow: hidden;
}
.tu-summary-line {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
}
.tu-summary-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
}
.tu-summary-row:last-of-type { border-bottom: none; }
.tu-proceed-btn {
  width: 100%; padding: 14px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  border: none; border-radius: 12px; color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px; font-weight: 700; letter-spacing: 0.04em;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(220,38,38,0.3);
}
.tu-proceed-btn:not(:disabled):hover {
  box-shadow: 0 10px 32px rgba(220,38,38,0.5);
  transform: translateY(-1px);
}
.tu-proceed-btn:disabled {
  opacity: 0.35; cursor: not-allowed; box-shadow: none;
}

/* Confirm / Success */
.tu-page-center {
  min-height: 100vh; background: #0d0d0f;
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.tu-confirm-card {
  width: 100%; max-width: 460px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; overflow: hidden;
}
.tu-confirm-header {
  padding: 24px 28px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.015);
}
.tu-confirm-body { padding: 24px 28px; }
.tu-row {
  display: flex; justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
}
.tu-row:last-child { border-bottom: none; }
.tu-alert {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 14px 16px;
  background: rgba(245,158,11,0.07);
  border: 1px solid rgba(245,158,11,0.2);
  border-radius: 10px; margin: 20px 0;
}

/* Empty state */
.tu-empty {
  text-align: center; padding: 40px 20px;
  color: rgba(255,255,255,0.25);
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
}

@keyframes tuFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tu-animate { animation: tuFadeUp 0.4s ease forwards; }

@keyframes successPop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
.tu-success-icon { animation: successPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }

.tu-grid-main {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px; align-items: start;
}
@media (max-width: 960px) {
  .tu-grid-main { grid-template-columns: 1fr; }
  .tu-summary { position: static; }
}

.tu-games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
}
@media (min-width: 600px) {
  .tu-games-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 900px) {
  .tu-games-grid { grid-template-columns: repeat(4, 1fr); }
}

.tu-denoms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
@media (min-width: 600px) {
  .tu-denoms-grid { grid-template-columns: repeat(3, 1fr); }
}

.tu-pay-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
@media (min-width: 600px) {
  .tu-pay-grid { grid-template-columns: repeat(3, 1fr); }
}
`;function A5(){var Ce;const[a]=uf(),o=a.get("game")||"ml",[s,d]=v.useState(o),[p,u]=v.useState(null),[m,g]=v.useState(null),[h,x]=v.useState(""),[S,b]=v.useState(""),[N,w]=v.useState("form"),[M,A]=v.useState(!1),[_,q]=v.useState("Semua"),[$,J]=v.useState(""),ne=Bl.find(O=>O.id===s),Q=M5[s]||[],Z=Q.find(O=>O.id===p),j=[...new Set(Dl.map(O=>O.category))],B=Bl.filter(O=>{const pe=_==="Semua"||O.category===_,he=O.name.toLowerCase().includes($.toLowerCase());return pe&&he}),X=s==="ml"||s==="hok"||s==="ragnarok",ye=()=>{!h||!p||!m||w("confirm")},ze=()=>{A(!0),setTimeout(()=>{A(!1),w("success")},2e3)},Re=()=>{w("form"),u(null),g(null),x(""),b("")};if(N==="success")return n.jsxs("div",{className:"tu-root tu-page-center",children:[n.jsx("style",{children:Os}),n.jsxs("div",{className:"tu-animate",style:{textAlign:"center",maxWidth:420},children:[n.jsx("div",{className:"tu-success-icon",style:{width:96,height:96,background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 28px"},children:n.jsx(pt,{size:48,color:"#10B981",strokeWidth:1.5})}),n.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:16},children:n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.1em",color:"#10B981",textTransform:"uppercase"},children:"Transaksi Sukses"})}),n.jsx("h1",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:36,fontWeight:700,color:"#fff",margin:"0 0 12px"},children:"Pembayaran Berhasil!"}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:14,margin:"0 0 6px"},children:[Z==null?void 0:Z.label," untuk ",ne.name]}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.3)",fontSize:13,margin:"0 0 4px"},children:["ID: ",n.jsxs("span",{style:{color:"rgba(255,255,255,0.7)",fontWeight:600},children:[h,S?` (${S})`:""]})]}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.3)",fontSize:13,margin:"0 0 32px"},children:["Item akan masuk dalam ",n.jsx("strong",{style:{color:"#10B981"},children:"< 1 menit"}),". Cek inbox game kamu!"]}),n.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center"},children:[n.jsxs("button",{onClick:Re,className:"tu-proceed-btn",style:{width:"auto",padding:"12px 24px"},children:[n.jsx(Qe,{size:15,fill:"white"})," Top Up Lagi"]}),n.jsx("button",{onClick:()=>window.location.href="/profile",style:{padding:"12px 24px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.6)",fontFamily:"'Rajdhani', sans-serif",fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:"0.04em"},children:"Lihat Riwayat"})]})]})]});if(N==="confirm"){const O=Dl.find(pe=>pe.id===m);return n.jsxs("div",{className:"tu-root tu-page-center",children:[n.jsx("style",{children:Os}),n.jsxs("div",{className:"tu-confirm-card tu-animate",children:[n.jsxs("div",{className:"tu-confirm-header",children:[n.jsxs("button",{onClick:()=>w("form"),style:{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontSize:13,fontFamily:"'Barlow', sans-serif",marginBottom:16,padding:0},children:[n.jsx(Yh,{size:14})," Kembali"]}),n.jsx("h2",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:22,fontWeight:700,color:"#fff",margin:0},children:"Konfirmasi Pesanan"})]}),n.jsxs("div",{className:"tu-confirm-body",children:[[{label:"Game",val:`${ne.icon} ${ne.name}`},{label:"User ID",val:`${h}${S?` (${S})`:""}`},{label:"Item",val:Z==null?void 0:Z.label},...Z!=null&&Z.bonus?[{label:"Bonus",val:`+${Z.bonus} ${ne.currency}`,green:!0}]:[],{label:"Metode Bayar",val:`${O==null?void 0:O.emoji} ${O==null?void 0:O.name}`}].map(pe=>n.jsxs("div",{className:"tu-row",children:[n.jsx("span",{style:{color:"rgba(255,255,255,0.4)",fontFamily:"'Barlow', sans-serif"},children:pe.label}),n.jsx("span",{style:{color:pe.green?"#10B981":"rgba(255,255,255,0.85)",fontWeight:600,fontFamily:"'Barlow', sans-serif",fontSize:13},children:pe.val})]},pe.label)),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0 0",borderTop:"1px solid rgba(255,255,255,0.08)",marginTop:4},children:[n.jsx("span",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:16,fontWeight:700,color:"#fff"},children:"Total"}),n.jsx("span",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:28,fontWeight:700,color:"#DC2626"},children:$s((Z==null?void 0:Z.price)||0)})]}),n.jsxs("div",{className:"tu-alert",children:[n.jsx(hi,{size:15,color:"#F59E0B",style:{flexShrink:0,marginTop:1}}),n.jsxs("p",{style:{fontSize:13,color:"rgba(255,255,255,0.45)",margin:0,lineHeight:1.6,fontFamily:"'Barlow', sans-serif"},children:[n.jsx("strong",{style:{color:"#F59E0B"},children:"Penting:"})," Pastikan User ID sudah benar. Kesalahan ID tidak dapat dikembalikan."]})]}),n.jsx("button",{onClick:ze,disabled:M,className:"tu-proceed-btn",children:M?n.jsxs(n.Fragment,{children:[n.jsx("span",{style:{width:16,height:16,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite",display:"inline-block"}}),"Memproses..."]}):n.jsxs(n.Fragment,{children:[n.jsx(Qe,{size:16,fill:"white"})," Bayar Sekarang"]})})]})]}),n.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]})}return n.jsxs("div",{className:"tu-root",children:[n.jsx("style",{children:Os}),n.jsxs("div",{className:"tu-hero",children:[n.jsx("div",{className:"tu-hero-bg"}),n.jsx("div",{className:"tu-hero-grid"}),n.jsx("div",{className:"tu-hero-line"}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:14},children:[n.jsx(Qe,{size:11,color:"#DC2626",fill:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",textTransform:"uppercase",fontFamily:"'Barlow', sans-serif"},children:"Top Up Game"})]}),n.jsxs("h1",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff",margin:"0 0 6px"},children:["Top Up ",n.jsx("span",{style:{color:"#DC2626"},children:"Instan"})]}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:14,margin:"0 0 20px",fontFamily:"'Barlow', sans-serif"},children:[Bl.length,"+ game tersedia · Proses otomatis · Harga terbaik · 100% aman"]}),n.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[{icon:n.jsx(ha,{size:12}),label:"Proses < 1 Menit"},{icon:n.jsx(Mt,{size:12}),label:"100% Aman"},{icon:n.jsx(Xs,{size:12}),label:"12+ Metode Bayar"}].map(O=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"6px 14px",fontSize:12,color:"rgba(255,255,255,0.5)",fontFamily:"'Barlow', sans-serif",fontWeight:600},children:[n.jsx("span",{style:{color:"#DC2626"},children:O.icon})," ",O.label]},O.label))})]})]}),n.jsx("div",{style:{maxWidth:1280,margin:"0 auto",padding:"28px 24px 60px"},children:n.jsxs("div",{className:"tu-grid-main",children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20},children:[n.jsxs("div",{className:"tu-card tu-animate",children:[n.jsx("div",{className:"tu-card-top"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[n.jsx("div",{className:"tu-step-num",children:"1"}),n.jsx("h2",{className:"tu-section-title",children:"Pilih Game"}),n.jsxs("span",{style:{marginLeft:"auto",fontSize:11,color:"rgba(255,255,255,0.25)",fontFamily:"'Barlow', sans-serif"},children:[Bl.length," game"]})]}),n.jsxs("div",{className:"tu-search-wrap",children:[n.jsx(Wl,{size:14,className:"tu-search-icon"}),n.jsx("input",{type:"text",className:"tu-search-input",placeholder:"Cari nama game...",value:$,onChange:O=>J(O.target.value)})]}),n.jsx("div",{className:"tu-cat-tabs",children:_5.map(O=>n.jsx("button",{className:`tu-cat-tab ${_===O?"active":""}`,onClick:()=>q(O),children:O},O))}),B.length===0?n.jsxs("div",{className:"tu-empty",children:[n.jsx("div",{style:{fontSize:32,marginBottom:8},children:"🎮"}),"Game tidak ditemukan"]}):n.jsx("div",{className:"tu-games-grid",children:B.map(O=>{const pe=s===O.id;return n.jsxs("button",{className:`tu-game-btn ${pe?"active":""}`,style:pe?{borderColor:`${O.color}60`,background:`${O.color}10`}:{},onClick:()=>{d(O.id),u(null)},children:[n.jsx("div",{className:"tu-game-icon",style:{background:`${O.color}18`},children:O.icon}),n.jsxs("div",{style:{minWidth:0},children:[n.jsx("div",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:13,fontWeight:700,color:pe?"#fff":"rgba(255,255,255,0.7)",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:O.name}),n.jsx("div",{style:{fontSize:10,color:pe?O.color:"rgba(255,255,255,0.25)",marginTop:2,fontWeight:500},children:O.currency})]}),pe&&n.jsx(pt,{size:13,color:O.color,style:{marginLeft:"auto",flexShrink:0}})]},O.id)})})]}),n.jsxs("div",{className:"tu-card tu-animate",style:{animationDelay:"80ms"},children:[n.jsx("div",{className:"tu-card-top"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[n.jsx("div",{className:"tu-step-num",children:"2"}),n.jsx("h2",{className:"tu-section-title",children:"Masukkan User ID"})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:X?"1fr 1fr":"1fr",gap:14},children:[n.jsxs("div",{className:"tu-input-wrap",children:[n.jsxs("label",{children:[n.jsx(Tn,{size:11})," User ID *"]}),n.jsx("input",{type:"text",value:h,onChange:O=>x(O.target.value),placeholder:"Contoh: 123456789",className:"tu-input"})]}),X&&n.jsxs("div",{className:"tu-input-wrap",children:[n.jsxs("label",{children:[n.jsx(w2,{size:11})," Server ID"]}),n.jsx("input",{type:"text",value:S,onChange:O=>b(O.target.value),placeholder:"Contoh: 1234",className:"tu-input"})]})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:10,fontSize:12,color:"rgba(255,255,255,0.25)",fontFamily:"'Barlow', sans-serif"},children:[n.jsx(hi,{size:12})," Pastikan User ID benar sebelum melanjutkan"]})]}),n.jsxs("div",{className:"tu-card tu-animate",style:{animationDelay:"160ms"},children:[n.jsx("div",{className:"tu-card-top"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[n.jsx("div",{className:"tu-step-num",children:"3"}),n.jsx("h2",{className:"tu-section-title",children:"Pilih Nominal"}),n.jsxs("span",{style:{marginLeft:"auto",fontSize:11,color:"rgba(255,255,255,0.25)",fontFamily:"'Barlow', sans-serif"},children:[ne.icon," ",ne.name]})]}),Q.length===0?n.jsx("div",{className:"tu-empty",children:"Belum ada nominal tersedia"}):n.jsx("div",{className:"tu-denoms-grid",children:Q.map(O=>{const pe=p===O.id;return n.jsxs("button",{className:`tu-denom-btn ${pe?"active":""}`,onClick:()=>u(O.id),children:[O.popular&&n.jsx("div",{className:"tu-popular-badge",children:"Populer"}),n.jsx("div",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:14,fontWeight:700,color:pe?"#fff":"rgba(255,255,255,0.75)",marginBottom:2},children:O.label}),O.bonus&&n.jsxs("div",{style:{fontSize:11,color:"#10B981",fontWeight:600,marginBottom:4,fontFamily:"'Barlow', sans-serif"},children:["+",O.bonus," Bonus"]}),n.jsx("div",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:16,fontWeight:700,color:pe?"#DC2626":"rgba(255,255,255,0.5)",marginTop:2},children:$s(O.price)}),pe&&n.jsx(pt,{size:13,color:"#DC2626",style:{position:"absolute",top:10,right:10}})]},O.id)})})]}),n.jsxs("div",{className:"tu-card tu-animate",style:{animationDelay:"240ms"},children:[n.jsx("div",{className:"tu-card-top"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[n.jsx("div",{className:"tu-step-num",children:"4"}),n.jsx("h2",{className:"tu-section-title",children:"Metode Pembayaran"})]}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:18},children:j.map(O=>n.jsxs("div",{children:[n.jsxs("div",{className:"tu-cat-label",children:[O==="E-Wallet"&&n.jsx(xa,{size:11}),O==="Bank Transfer"&&n.jsx(Xs,{size:11}),O==="QR Code"&&n.jsx(mc,{size:11}),O]}),n.jsx("div",{className:"tu-pay-grid",children:Dl.filter(pe=>pe.category===O).map(pe=>{const he=m===pe.id;return n.jsxs("button",{className:`tu-pay-btn ${he?"active":""}`,onClick:()=>g(pe.id),children:[n.jsx("span",{style:{fontSize:18},children:pe.emoji}),n.jsx("span",{style:{fontSize:12,fontWeight:600,color:he?"#fff":"rgba(255,255,255,0.55)",fontFamily:"'Barlow', sans-serif",flex:1,textAlign:"left"},children:pe.name}),he&&n.jsx(pt,{size:13,color:"#DC2626"})]},pe.id)})})]},O))})]})]}),n.jsx("div",{children:n.jsxs("div",{className:"tu-summary",children:[n.jsx("div",{className:"tu-summary-line"}),n.jsx("h3",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:18,fontWeight:700,color:"#fff",margin:"0 0 18px"},children:"Ringkasan Pesanan"}),n.jsx("div",{style:{marginBottom:16},children:[{label:"Game",val:`${ne.icon} ${ne.name}`},{label:"Kategori",val:ne.category},{label:"User ID",val:h||null},{label:"Item",val:(Z==null?void 0:Z.label)||null},...Z!=null&&Z.bonus?[{label:"Bonus",val:`+${Z.bonus}`,green:!0}]:[],{label:"Pembayaran",val:((Ce=Dl.find(O=>O.id===m))==null?void 0:Ce.name)||null}].map(O=>n.jsxs("div",{className:"tu-summary-row",children:[n.jsx("span",{style:{color:"rgba(255,255,255,0.35)",fontFamily:"'Barlow', sans-serif"},children:O.label}),n.jsx("span",{style:{color:O.green?"#10B981":O.val?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.2)",fontWeight:600,fontSize:13,fontFamily:"'Barlow', sans-serif",maxWidth:160,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:O.val||"Belum dipilih"})]},O.label))}),n.jsxs("div",{style:{padding:"16px 0",borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)",marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsx("span",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:16,fontWeight:700,color:"#fff"},children:"Total"}),n.jsx("span",{style:{fontFamily:"'Rajdhani', sans-serif",fontSize:28,fontWeight:700,color:"#DC2626"},children:Z?$s(Z.price):"Rp 0"})]}),n.jsxs("button",{className:"tu-proceed-btn",disabled:!h||!p||!m,onClick:ye,children:["Lanjut ke Pembayaran ",n.jsx(ga,{size:16})]}),n.jsx("div",{style:{marginTop:16,display:"flex",flexDirection:"column",gap:8},children:[{icon:n.jsx(Mt,{size:12,color:"#10B981"}),label:"Transaksi dienkripsi SSL"},{icon:n.jsx(ha,{size:12,color:"#3B82F6"}),label:"Proses otomatis 24/7"}].map(O=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"rgba(255,255,255,0.3)",fontFamily:"'Barlow', sans-serif"},children:[O.icon," ",O.label]},O.label))})]})})]})})]})}const I5=["Semua Game","Mobile Legends","PUBG Mobile","Genshin Impact","Free Fire","Valorant","Honor of Kings"],$5=["Semua Rank","Mythic Glory","Mythic","Legend","Epic","Grandmaster","Master","Platinum","Gold"],O5=["Terbaru","Harga Terendah","Harga Tertinggi","Rating Penjual","Terpopuler"],Us=[{id:1,game:"Mobile Legends",gameColor:"#1E88E5",glow:"rgba(30,136,229,0.3)",icon:"⚔️",title:"Akun Mythic Glory 1500+ Points",rank:"Mythic Glory",heroes:"150+ Heroes",skins:"250+ Skins",seller:"ProGamer99",sellerRating:4.9,sellerSales:234,price:35e5,status:"available",views:1240,favorites:89,badge:"HOT"},{id:2,game:"PUBG Mobile",gameColor:"#6366F1",glow:"rgba(99,102,241,0.3)",icon:"🎯",title:"Conqueror Season 29 Full Set",rank:"Conqueror",heroes:"80+ Outfits",skins:"150+ Skins",seller:"PUBGKing",sellerRating:5,sellerSales:178,price:42e5,status:"escrow",views:876,favorites:67,badge:"ESCROW"},{id:3,game:"Genshin Impact",gameColor:"#A78BFA",glow:"rgba(167,139,250,0.3)",icon:"✨",title:"AR 60 — Semua 5-Star Characters",rank:"AR 60",heroes:"All 5★",skins:"Premium BP",seller:"TravelerMain",sellerRating:4.8,sellerSales:45,price:55e5,status:"available",views:2340,favorites:198,badge:"PREMIUM"},{id:4,game:"Free Fire",gameColor:"#FF4500",glow:"rgba(255,69,0,0.3)",icon:"🔥",title:"Grandmaster Season 30, Rare Bundles",rank:"Grandmaster",heroes:"60+ Bundles",skins:"100+ Skins",seller:"FFlegend",sellerRating:4.7,sellerSales:123,price:12e5,status:"available",views:543,favorites:34,badge:null},{id:5,game:"Mobile Legends",gameColor:"#1E88E5",glow:"rgba(30,136,229,0.3)",icon:"⚔️",title:"Mythic 500 Points, All Core Heroes",rank:"Mythic",heroes:"120+ Heroes",skins:"180+ Skins",seller:"MLBBpro",sellerRating:4.6,sellerSales:89,price:21e5,status:"available",views:765,favorites:52,badge:null},{id:6,game:"Valorant",gameColor:"#FF4655",glow:"rgba(255,70,85,0.3)",icon:"💀",title:"Immortal 3 | Radiant Skins Collector",rank:"Immortal 3",heroes:"20+ Agents",skins:"50+ Skins",seller:"ValorantKing",sellerRating:4.9,sellerSales:312,price:68e5,status:"available",views:1890,favorites:145,badge:"TOP SELLER"},{id:7,game:"Genshin Impact",gameColor:"#A78BFA",glow:"rgba(167,139,250,0.3)",icon:"✨",title:"AR 55, Raiden + Hu Tao + Ayaka",rank:"AR 55",heroes:"3 Main DPS",skins:"Battle Pass",seller:"Paimon_Lover",sellerRating:4.5,sellerSales:28,price:28e5,status:"available",views:423,favorites:31,badge:null},{id:8,game:"Honor of Kings",gameColor:"#D4AF37",glow:"rgba(212,175,55,0.3)",icon:"👑",title:"Supreme Legend Season 12",rank:"Supreme Legend",heroes:"90+ Heroes",skins:"120+ Skins",seller:"HOKmaster",sellerRating:4.8,sellerSales:67,price:18e5,status:"available",views:320,favorites:22,badge:null},{id:9,game:"PUBG Mobile",gameColor:"#6366F1",glow:"rgba(99,102,241,0.3)",icon:"🎯",title:"Ace + Full Premium Outfits",rank:"Ace",heroes:"60+ Outfits",skins:"80+ Skins",seller:"PUBG_Ace99",sellerRating:4.7,sellerSales:55,price:195e4,status:"available",views:430,favorites:29,badge:null}],Sp=a=>"Rp "+a.toLocaleString("id-ID"),ca={HOT:{label:"HOT",color:"#FF4500",bg:"rgba(255,69,0,0.15)",border:"rgba(255,69,0,0.4)"},ESCROW:{label:"ESCROW",color:"#F59E0B",bg:"rgba(245,158,11,0.15)",border:"rgba(245,158,11,0.4)"},PREMIUM:{label:"PREMIUM",color:"#A78BFA",bg:"rgba(167,139,250,0.15)",border:"rgba(167,139,250,0.4)"},"TOP SELLER":{label:"TOP SELLER",color:"#1E88E5",bg:"rgba(30,136,229,0.15)",border:"rgba(30,136,229,0.4)"}},Ws={available:{label:"Tersedia",color:"#10B981",dot:"#10B981"},escrow:{label:"In Escrow",color:"#F59E0B"},sold:{label:"Terjual",color:"rgba(255,255,255,0.2)"}},U5=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.mp-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

/* Hero */
.mp-hero {
  position: relative; padding: 44px 0 36px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.mp-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%);
}
.mp-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}
.mp-hero-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent); }

/* Search bar */
.mp-search-wrap { position: relative; }
.mp-search-input {
  width: 100%; padding: 12px 16px 12px 44px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; color: #fff; font-family:'Barlow',sans-serif; font-size:14px;
  outline: none; transition: all 0.2s; box-sizing: border-box;
}
.mp-search-input::placeholder { color: rgba(255,255,255,0.2); }
.mp-search-input:focus { border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.04); box-shadow: 0 0 0 3px rgba(220,38,38,0.07); }

.mp-select {
  padding: 11px 36px 11px 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; color: rgba(255,255,255,0.7); font-family:'Barlow',sans-serif; font-size:13px;
  outline: none; cursor: pointer; appearance: none; transition: all 0.2s;
}
.mp-select:focus { border-color: rgba(220,38,38,0.4); }
option { background: #1a1a1f; }

.mp-filter-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 18px; border-radius: 12px;
  font-family:'Barlow',sans-serif; font-size:13px; font-weight:700;
  cursor: pointer; transition: all 0.2s; white-space:nowrap;
}
.mp-filter-btn.off { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
.mp-filter-btn.off:hover { border-color: rgba(255,255,255,0.15); color: #fff; }
.mp-filter-btn.on { background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.4); color: #DC2626; }

.mp-sell-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 20px; border-radius: 12px; border: none;
  background: linear-gradient(135deg,#DC2626,#EA580C); color:#fff;
  font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700;
  cursor:pointer; white-space:nowrap; letter-spacing:0.03em;
  transition: all 0.25s; box-shadow: 0 4px 14px rgba(220,38,38,0.3);
}
.mp-sell-btn:hover { box-shadow: 0 8px 24px rgba(220,38,38,0.5); transform: translateY(-1px); }

/* Filter panel */
.mp-filter-panel {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; margin-bottom: 20px;
  animation: mpFadeDown 0.22s ease;
}
@keyframes mpFadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

.mp-filter-label { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:10px; font-family:'Barlow',sans-serif; }

.mp-check-row { display:flex; align-items:center; gap:8px; cursor:pointer; padding:5px 0; }
.mp-check-box {
  width:15px; height:15px; border-radius:4px; border:1px solid rgba(255,255,255,0.15);
  display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s;
}
.mp-check-box.checked { background:#DC2626; border-color:#DC2626; }
.mp-check-label { font-family:'Barlow',sans-serif; font-size:13px; color:rgba(255,255,255,0.5); transition:color 0.15s; }
.mp-check-row:hover .mp-check-label { color:rgba(255,255,255,0.8); }

.mp-filter-input {
  width:100%; padding:10px 12px; border-radius:10px; box-sizing:border-box;
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
  color:#fff; font-family:'Barlow',sans-serif; font-size:13px; outline:none; transition:all 0.2s;
}
.mp-filter-input::placeholder { color:rgba(255,255,255,0.15); }
.mp-filter-input:focus { border-color:rgba(220,38,38,0.4); background:rgba(220,38,38,0.03); }

/* Account card */
.mp-card {
  position:relative; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07);
  border-radius:18px; overflow:hidden; cursor:pointer; transition:all 0.35s cubic-bezier(0.23,1,0.32,1);
  display:flex; flex-direction:column;
}
.mp-card:hover { transform:translateY(-6px); border-color:rgba(255,255,255,0.13); }
.mp-card:hover .mp-card-glow { opacity:1; }
.mp-card-glow {
  position:absolute; bottom:-50px; left:50%; transform:translateX(-50%);
  width:160px; height:80px; border-radius:50%; filter:blur(40px);
  opacity:0; pointer-events:none; transition:opacity 0.35s;
}
.mp-card-top-bar { height:2px; width:100%; }
.mp-card-body { padding:18px 18px 16px; flex:1; display:flex; flex-direction:column; gap:12px; }

.mp-stat-chip {
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06);
  border-radius:8px; padding:8px 6px; text-align:center; transition:background 0.2s;
}
.mp-card:hover .mp-stat-chip { background:rgba(255,255,255,0.06); }

.mp-seller-row {
  display:flex; align-items:center; gap:10px;
  padding-top:12px; border-top:1px solid rgba(255,255,255,0.05);
}
.mp-seller-avatar {
  width:30px; height:30px; border-radius:9px;
  background:linear-gradient(135deg,#DC2626,#EA580C);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}

.mp-fav-btn { background:none; border:none; cursor:pointer; padding:4px; transition:all 0.2s; color:rgba(255,255,255,0.2); }
.mp-fav-btn:hover { color:#DC2626; transform:scale(1.15); }
.mp-fav-btn.active { color:#DC2626; }

@keyframes mpFadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
.mp-animate { animation:mpFadeUp 0.45s ease forwards; opacity:0; }

/* Tag pills */
.mp-active-tag {
  display:inline-flex; align-items:center; gap:6px;
  padding:4px 10px; border-radius:6px;
  font-family:'Barlow',sans-serif; font-size:11px; font-weight:700;
  cursor:pointer;
}

/* Modal */
.mp-modal-overlay {
  position:fixed; inset:0; z-index:50;
  display:flex; align-items:center; justify-content:center; padding:16px;
  background:rgba(0,0,0,0.75); backdrop-filter:blur(8px);
}
.mp-modal {
  position:relative; width:100%; max-width:480px; max-height:90vh;
  background:#141418; border:1px solid rgba(255,255,255,0.08);
  border-radius:22px; overflow:hidden; overflow-y:auto;
  animation:mpModalIn 0.25s cubic-bezier(0.23,1,0.32,1);
}
@keyframes mpModalIn { from{opacity:0;transform:scale(0.95)translateY(16px);} to{opacity:1;transform:scale(1)translateY(0);} }

.mp-modal-body { padding:24px; }
.mp-modal-stat { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:14px 10px; text-align:center; }
.mp-modal-escrow { display:flex; gap:12px; align-items:flex-start; padding:16px; background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.2); border-radius:12px; margin-bottom:20px; }
.mp-modal-seller { display:flex; align-items:center; gap:12px; padding:16px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:12px; margin-bottom:20px; }

.mp-btn-ghost {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:13px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.55);
  font-family:'Barlow',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s;
}
.mp-btn-ghost:hover { border-color:rgba(255,255,255,0.2); color:#fff; }

.mp-btn-primary {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:13px; border-radius:12px; border:none;
  background:linear-gradient(135deg,#DC2626,#EA580C); color:#fff;
  font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700;
  cursor:pointer; letter-spacing:0.04em; transition:all 0.25s;
  box-shadow:0 6px 18px rgba(220,38,38,0.3);
}
.mp-btn-primary:hover { box-shadow:0 10px 28px rgba(220,38,38,0.5); transform:translateY(-1px); }

.mp-load-btn {
  padding:12px 32px; border-radius:12px;
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
  color:rgba(255,255,255,0.4); font-family:'Barlow',sans-serif;
  font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s;
}
.mp-load-btn:hover { border-color:rgba(220,38,38,0.4); color:#DC2626; background:rgba(220,38,38,0.06); }

.mp-cards-grid {
  display:grid; gap:16px;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
}
@media(min-width:768px) { .mp-cards-grid { grid-template-columns:repeat(2,1fr); } }
@media(min-width:1100px){ .mp-cards-grid { grid-template-columns:repeat(3,1fr); } }
`;function W5(){const a=Lr(),[o,s]=v.useState(""),[d,p]=v.useState("Semua Game"),[u,m]=v.useState("Semua Rank"),[g,h]=v.useState("Terbaru"),[x,S]=v.useState(""),[b,N]=v.useState(""),[w,M]=v.useState(!1),[A,_]=v.useState([]),[q,$]=v.useState(null),J=j=>_(B=>B.includes(j)?B.filter(X=>X!==j):[...B,j]),ne=Us.filter(j=>!(d!=="Semua Game"&&j.game!==d||u!=="Semua Rank"&&!j.rank.includes(u.split(" ")[0])||o&&!j.title.toLowerCase().includes(o.toLowerCase())&&!j.game.toLowerCase().includes(o.toLowerCase())||x&&j.price<parseInt(x.replace(/\D/g,""))||b&&j.price>parseInt(b.replace(/\D/g,"")))).sort((j,B)=>g==="Harga Terendah"?j.price-B.price:g==="Harga Tertinggi"?B.price-j.price:g==="Rating Penjual"?B.sellerRating-j.sellerRating:g==="Terpopuler"?B.views-j.views:B.id-j.id),Q=q!==null?Us.find(j=>j.id===q):null,Z=d!=="Semua Game"||u!=="Semua Rank"||o;return n.jsxs("div",{className:"mp-root",children:[n.jsx("style",{children:U5}),n.jsxs("div",{className:"mp-hero",children:[n.jsx("div",{className:"mp-hero-bg"}),n.jsx("div",{className:"mp-hero-grid"}),n.jsx("div",{className:"mp-hero-line"}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative"},children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:14},children:[n.jsx(Fn,{size:11,color:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",textTransform:"uppercase",fontFamily:"'Barlow',sans-serif"},children:"Marketplace"})]}),n.jsxs("h1",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff",margin:"0 0 6px"},children:["Marketplace ",n.jsx("span",{style:{color:"#DC2626"},children:"Akun Game"})]}),n.jsx("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:14,margin:"0 0 20px",fontFamily:"'Barlow',sans-serif"},children:"Beli & jual akun game dengan aman menggunakan sistem Escrow"}),n.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[{icon:n.jsx(yf,{size:12}),label:`${Us.length}+ Akun Aktif`,color:"#10B981"},{icon:n.jsx(Mt,{size:12}),label:"Escrow Protected",color:"#3B82F6"},{icon:n.jsx(Qe,{size:12}),label:"Transaksi Aman",color:"#DC2626"}].map(j=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:20,padding:"6px 14px",fontSize:12,color:"rgba(255,255,255,0.45)",fontFamily:"'Barlow',sans-serif",fontWeight:600},children:[n.jsx("span",{style:{color:j.color},children:j.icon}),j.label]},j.label))})]})]}),n.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"28px 24px 60px"},children:[n.jsxs("div",{style:{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"},children:[n.jsxs("div",{className:"mp-search-wrap",style:{flex:1,minWidth:200},children:[n.jsx(Wl,{size:16,style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.2)",pointerEvents:"none"}}),n.jsx("input",{className:"mp-search-input",type:"text",value:o,onChange:j=>s(j.target.value),placeholder:"Cari akun game..."})]}),n.jsxs("div",{style:{position:"relative"},children:[n.jsx(Qh,{size:13,style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.3)",pointerEvents:"none"}}),n.jsx("select",{className:"mp-select",style:{paddingLeft:32},value:g,onChange:j=>h(j.target.value),children:O5.map(j=>n.jsx("option",{children:j},j))}),n.jsx(pa,{size:13,style:{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.3)",pointerEvents:"none"}})]}),n.jsxs("button",{className:`mp-filter-btn ${w?"on":"off"}`,onClick:()=>M(!w),children:[n.jsx(Y2,{size:14})," Filter"]}),n.jsxs("button",{className:"mp-sell-btn",onClick:()=>a("/marketplace/sell"),children:[n.jsx(Qe,{size:14,fill:"white"})," Jual Akun"]})]}),w&&n.jsx("div",{className:"mp-filter-panel",children:n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:24},children:[n.jsxs("div",{children:[n.jsx("div",{className:"mp-filter-label",children:"Game"}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:2,maxHeight:160,overflowY:"auto"},children:I5.map(j=>n.jsxs("div",{className:"mp-check-row",onClick:()=>p(j),children:[n.jsx("div",{className:`mp-check-box ${d===j?"checked":""}`,children:d===j&&n.jsx(pt,{size:10,color:"#fff"})}),n.jsx("span",{className:"mp-check-label",children:j})]},j))})]}),n.jsxs("div",{children:[n.jsx("div",{className:"mp-filter-label",children:"Rank"}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:2,maxHeight:160,overflowY:"auto"},children:$5.map(j=>n.jsxs("div",{className:"mp-check-row",onClick:()=>m(j),children:[n.jsx("div",{className:`mp-check-box ${u===j?"checked":""}`,children:u===j&&n.jsx(pt,{size:10,color:"#fff"})}),n.jsx("span",{className:"mp-check-label",children:j})]},j))})]}),n.jsxs("div",{children:[n.jsx("div",{className:"mp-filter-label",children:"Harga Min"}),n.jsx("input",{className:"mp-filter-input",type:"text",value:x,onChange:j=>S(j.target.value),placeholder:"500000"})]}),n.jsxs("div",{children:[n.jsx("div",{className:"mp-filter-label",children:"Harga Max"}),n.jsx("input",{className:"mp-filter-input",type:"text",value:b,onChange:j=>N(j.target.value),placeholder:"5000000"}),n.jsx("button",{onClick:()=>{p("Semua Game"),m("Semua Rank"),S(""),N("")},style:{marginTop:12,fontSize:12,color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontWeight:700,fontFamily:"'Barlow',sans-serif",padding:0},children:"Reset Filter"})]})]})}),n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:8},children:[n.jsxs("p",{style:{fontSize:13,color:"rgba(255,255,255,0.3)",margin:0,fontFamily:"'Barlow',sans-serif"},children:["Menampilkan ",n.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:ne.length})," akun"]}),Z&&n.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:[d!=="Semua Game"&&n.jsxs("div",{className:"mp-active-tag",style:{background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",color:"#DC2626"},onClick:()=>p("Semua Game"),children:[d," ",n.jsx(fa,{size:10})]}),u!=="Semua Rank"&&n.jsxs("div",{className:"mp-active-tag",style:{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",color:"#3B82F6"},onClick:()=>m("Semua Rank"),children:[u," ",n.jsx(fa,{size:10})]}),o&&n.jsxs("div",{className:"mp-active-tag",style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"},onClick:()=>s(""),children:['"',o,'" ',n.jsx(fa,{size:10})]})]})]}),ne.length===0?n.jsxs("div",{style:{textAlign:"center",padding:"80px 0"},children:[n.jsx("div",{style:{fontSize:56,marginBottom:16},children:"🔍"}),n.jsx("h3",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:"rgba(255,255,255,0.5)",margin:"0 0 8px"},children:"Akun tidak ditemukan"}),n.jsx("p",{style:{color:"rgba(255,255,255,0.25)",fontSize:14,fontFamily:"'Barlow',sans-serif"},children:"Coba ubah filter atau kata kunci pencarian"})]}):n.jsx("div",{className:"mp-cards-grid",children:ne.map((j,B)=>{const X=Ws[j.status],ye=j.badge?ca[j.badge]:null,ze=A.includes(j.id);return n.jsxs("div",{className:"mp-card mp-animate",style:{animationDelay:`${B*70}ms`},onClick:()=>$(j.id),children:[n.jsx("div",{className:"mp-card-glow",style:{background:j.gameColor}}),n.jsx("div",{className:"mp-card-top-bar",style:{background:`linear-gradient(90deg,${j.gameColor},${j.gameColor}88)`}}),n.jsxs("div",{className:"mp-card-body",children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("div",{style:{width:32,height:32,borderRadius:9,background:`${j.gameColor}18`,border:`1px solid ${j.gameColor}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:j.icon}),n.jsx("span",{style:{fontSize:11,fontWeight:700,color:j.gameColor,fontFamily:"'Barlow',sans-serif",letterSpacing:"0.05em",textTransform:"uppercase"},children:j.game})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[ye&&n.jsx("span",{style:{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,background:ye.bg,border:`1px solid ${ye.border}`,color:ye.color,fontFamily:"'Barlow',sans-serif",letterSpacing:"0.07em"},children:ye.label}),n.jsx("button",{className:`mp-fav-btn ${ze?"active":""}`,onClick:Re=>{Re.stopPropagation(),J(j.id)},children:n.jsx(_s,{size:15,fill:ze?"#DC2626":"none"})})]})]}),n.jsx("h3",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:17,fontWeight:700,color:"#fff",margin:0,lineHeight:1.25,letterSpacing:"0.01em"},children:j.title}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8},children:[{l:"Rank",v:j.rank},{l:"Heroes",v:j.heroes},{l:"Skins",v:j.skins}].map(Re=>n.jsxs("div",{className:"mp-stat-chip",children:[n.jsx("div",{style:{fontSize:9,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:"'Barlow',sans-serif",marginBottom:3},children:Re.l}),n.jsx("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.75)",fontFamily:"'Rajdhani',sans-serif",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:Re.v})]},Re.l))}),n.jsxs("div",{className:"mp-seller-row",children:[n.jsx("div",{className:"mp-seller-avatar",children:n.jsx(Tn,{size:14,color:"#fff"})}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.8)",fontFamily:"'Rajdhani',sans-serif"},children:j.seller}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"rgba(255,255,255,0.3)",fontFamily:"'Barlow',sans-serif"},children:[n.jsx(Ln,{size:10,fill:"#F59E0B",color:"#F59E0B"}),n.jsx("span",{style:{color:"#F59E0B",fontWeight:600},children:j.sellerRating}),"· ",j.sellerSales," terjual"]})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,color:X.color,fontFamily:"'Barlow',sans-serif"},children:[X.dot&&n.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:X.dot,display:"inline-block",boxShadow:`0 0 6px ${X.dot}`}}),X.label]})]}),n.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:10,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:"'Barlow',sans-serif",marginBottom:2},children:"Harga"}),n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:"#DC2626",lineHeight:1},children:Sp(j.price)})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,fontSize:11,color:"rgba(255,255,255,0.2)",fontFamily:"'Barlow',sans-serif"},children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[n.jsx(Js,{size:12})," ",j.views]}),n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[n.jsx(_s,{size:12})," ",j.favorites]})]})]})]})]},j.id)})}),ne.length>0&&n.jsx("div",{style:{textAlign:"center",marginTop:36},children:n.jsx("button",{className:"mp-load-btn",children:"Muat Lebih Banyak"})})]}),Q&&n.jsx("div",{className:"mp-modal-overlay",onClick:()=>$(null),children:n.jsxs("div",{className:"mp-modal",onClick:j=>j.stopPropagation(),children:[n.jsx("div",{style:{height:3,background:`linear-gradient(90deg,${Q.gameColor},${Q.gameColor}66)`}}),n.jsxs("div",{className:"mp-modal-body",children:[n.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20},children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[n.jsx("div",{style:{width:36,height:36,borderRadius:10,background:`${Q.gameColor}18`,border:`1px solid ${Q.gameColor}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18},children:Q.icon}),n.jsx("span",{style:{fontSize:12,fontWeight:700,color:Q.gameColor,fontFamily:"'Barlow',sans-serif",textTransform:"uppercase",letterSpacing:"0.06em"},children:Q.game}),Q.badge&&ca[Q.badge]&&n.jsx("span",{style:{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,background:ca[Q.badge].bg,border:`1px solid ${ca[Q.badge].border}`,color:ca[Q.badge].color,fontFamily:"'Barlow',sans-serif",letterSpacing:"0.07em"},children:ca[Q.badge].label})]}),n.jsx("h2",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:"#fff",margin:0,lineHeight:1.2},children:Q.title})]}),n.jsx("button",{onClick:()=>$(null),style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,0.4)",flexShrink:0},children:n.jsx(fa,{size:16})})]}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20},children:[{l:"Rank",v:Q.rank},{l:"Heroes",v:Q.heroes},{l:"Skins",v:Q.skins}].map(j=>n.jsxs("div",{className:"mp-modal-stat",children:[n.jsx("div",{style:{fontSize:10,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:"'Barlow',sans-serif",marginBottom:4},children:j.l}),n.jsx("div",{style:{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.85)",fontFamily:"'Rajdhani',sans-serif"},children:j.v})]},j.l))}),n.jsxs("div",{className:"mp-modal-escrow",children:[n.jsx(Mt,{size:18,color:"#10B981",style:{flexShrink:0,marginTop:1}}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#10B981",fontFamily:"'Rajdhani',sans-serif",marginBottom:2},children:"Dilindungi Escrow OkeGass"}),n.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"'Barlow',sans-serif"},children:"Dana aman hingga akun berhasil dipindahkan ke pembeli"})]})]}),n.jsxs("div",{className:"mp-modal-seller",children:[n.jsx("div",{style:{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#DC2626,#EA580C)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:n.jsx(Tn,{size:18,color:"#fff"})}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:700,color:"#fff"},children:Q.seller}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"rgba(255,255,255,0.35)",fontFamily:"'Barlow',sans-serif"},children:[n.jsx(Ln,{size:11,fill:"#F59E0B",color:"#F59E0B"}),n.jsx("span",{style:{color:"#F59E0B",fontWeight:600},children:Q.sellerRating}),"· ",Q.sellerSales," Transaksi"]})]}),n.jsx("div",{style:{fontSize:11,fontWeight:700,color:Ws[Q.status].color,fontFamily:"'Barlow',sans-serif"},children:Ws[Q.status].label})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"'Barlow',sans-serif",marginBottom:4},children:"Harga"}),n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:32,fontWeight:700,color:"#DC2626",lineHeight:1},children:Sp(Q.price)})]}),n.jsxs("div",{style:{display:"flex",gap:14,fontSize:12,color:"rgba(255,255,255,0.25)",fontFamily:"'Barlow',sans-serif"},children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:5},children:[n.jsx(Js,{size:13})," ",Q.views]}),n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:5},children:[n.jsx(_s,{size:13})," ",Q.favorites]})]})]}),n.jsxs("div",{style:{display:"flex",gap:10},children:[n.jsxs("button",{className:"mp-btn-ghost",children:[n.jsx($l,{size:15})," Chat Penjual"]}),n.jsxs("button",{className:"mp-btn-primary",children:[n.jsx(Qe,{size:14,fill:"white"})," Beli Sekarang ",n.jsx(ga,{size:14})]})]})]})]})})]})}const Cp=[{id:"ml",name:"Mobile Legends",color:"#1E88E5",glow:"rgba(30,136,229,0.3)"},{id:"ff",name:"Free Fire",color:"#FF6F00",glow:"rgba(255,111,0,0.3)"},{id:"pubg",name:"PUBG Mobile",color:"#6366F1",glow:"rgba(99,102,241,0.3)"},{id:"genshin",name:"Genshin Impact",color:"#A78BFA",glow:"rgba(167,139,250,0.3)"},{id:"valorant",name:"Valorant",color:"#FF4655",glow:"rgba(255,70,85,0.3)"},{id:"hok",name:"Honor of Kings",color:"#D4AF37",glow:"rgba(212,175,55,0.3)"},{id:"cod",name:"Call of Duty Mobile",color:"#2E7D32",glow:"rgba(46,125,50,0.3)"},{id:"other",name:"Lainnya",color:"#78909C",glow:"rgba(120,144,156,0.3)"}],H5={ml:["Warrior","Elite","Master","Grandmaster","Epic","Legend","Mythic","Mythic Honor","Mythic Glory"],ff:["Bronze","Silver","Gold","Platinum","Diamond","Heroic","Grandmaster"],pubg:["Bronze","Silver","Gold","Platinum","Diamond","Crown","Ace","Conqueror"],genshin:["AR 1-29","AR 30-39","AR 40-44","AR 45-49","AR 50-54","AR 55+","AR 60"],valorant:["Iron","Bronze","Silver","Gold","Platinum","Diamond","Ascendant","Immortal","Radiant"],hok:["Warrior","Sentinel","Militia","Veteran","Elite","Master","Grandmaster","Supreme Legend"],cod:["Rookie","Veteran","Pro","Master","Legendary"],other:["Rendah","Sedang","Tinggi","Sangat Tinggi"]},Np=[{id:1,label:"Info Game",icon:b2},{id:2,label:"Detail Akun",icon:x2},{id:3,label:"Foto & Harga",icon:mf},{id:4,label:"Review",icon:Ln}],Ep=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.sell-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

/* Hero */
.sell-hero {
  position: relative; padding: 44px 0 36px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.sell-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%);
}
.sell-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}
.sell-hero-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent); }

/* Steps */
.sell-steps { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; position: relative; }
.sell-steps-line { position: absolute; top: 20px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(220,38,38,0.4), rgba(255,255,255,0.1)); z-index: 0; }
.sell-steps-progress {
  position: absolute; top: 20px; left: 0; height: 1px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
  transition: width 0.5s ease; z-index: 1;
}
.sell-step {
  display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; z-index: 10;
}
.sell-step-circle {
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; font-size: 0;
}
.sell-step.done .sell-step-circle { background: linear-gradient(135deg, #DC2626, #EA580C); border-color: #DC2626; }
.sell-step.active .sell-step-circle { background: #fff; border-color: #DC2626; color: #DC2626; }
.sell-step.active .sell-step-label { color: #DC2626; font-weight: 700; }
.sell-step-label { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; color: rgba(255,255,255,0.25); }

/* Card */
.sell-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 28px; animation: fadeInUp 0.4s ease;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

/* Section */
.sell-section { margin-bottom: 28px; }
.sell-section-title { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.sell-section-desc { font-size: 13px; color: rgba(255,255,255,0.35); margin-bottom: 20px; }

/* Input */
.sell-input-wrap { margin-bottom: 16px; }
.sell-input-label {
  display: block; font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.45); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.sell-input, .sell-textarea, .sell-select {
  width: 100%; padding: 11px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.sell-input::placeholder, .sell-textarea::placeholder { color: rgba(255,255,255,0.15); }
.sell-input:focus, .sell-textarea:focus, .sell-select:focus {
  border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.07);
}
.sell-textarea { resize: vertical; min-height: 100px; }
.sell-select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 10px center; background-size: 16px; padding-right: 36px; cursor: pointer; }

/* Game selector */
.sell-game-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 12px; margin-bottom: 20px; }
.sell-game-btn {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 12px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03); cursor: pointer; transition: all 0.25s;
  text-decoration: none;
}
.sell-game-btn:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
.sell-game-btn.active {
  border-color: #DC2626; background: rgba(220,38,38,0.1);
}
.sell-game-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.sell-game-name { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.2; }

/* Rank grid */
.sell-rank-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)); gap: 8px; }
.sell-rank-btn {
  padding: 8px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; text-align: center;
}
.sell-rank-btn:hover { border-color: rgba(255,255,255,0.15); }
.sell-rank-btn.active { background: rgba(220,38,38,0.12); border-color: #DC2626; color: #DC2626; }

/* Photo upload */
.sell-photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
.sell-photo-item {
  aspect-ratio: 1; border-radius: 10px; display: flex;
  align-items: center; justify-content: center; flex-direction: column;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
}
.sell-photo-item.filled { background: rgba(16,185,129,0.07); border-color: rgba(16,185,129,0.3); }
.sell-photo-item.upload-btn { border: 2px dashed rgba(255,255,255,0.1); cursor: pointer; transition: all 0.2s; }
.sell-photo-item.upload-btn:hover { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04); }

/* Checkbox */
.sell-checkbox { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; margin-bottom: 12px; }
.sell-check-box {
  width: 18px; height: 18px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.1); display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
  transition: all 0.2s; margin-top: 1px;
}
.sell-checkbox input:checked ~ .sell-check-box { background: linear-gradient(135deg, #DC2626, #EA580C); border-color: #DC2626; }
.sell-checkbox-label { font-size: 13px; color: rgba(255,255,255,0.5); transition: color 0.2s; }
.sell-checkbox:hover .sell-checkbox-label { color: rgba(255,255,255,0.8); }

/* Info boxes */
.sell-info-box {
  display: flex; gap: 12px; padding: 14px; border-radius: 12px;
  margin-bottom: 16px; font-size: 12px;
}
.sell-info-box.blue { background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.2); }
.sell-info-box.amber { background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.2); }
.sell-info-icon { width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px; }
.sell-info-title { font-weight: 700; margin-bottom: 4px; }
.sell-info-list { list-style: none; padding: 0; margin: 0; }
.sell-info-list li { padding: 2px 0; }

/* Success screen */
.sell-success {
  text-align: center; padding: 60px 20px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.sell-success-icon {
  width: 80px; height: 80px; background: rgba(16,185,129,0.1);
  border: 2px solid rgba(16,185,129,0.3); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
}

/* Buttons */
.sell-btn {
  padding: 11px 18px; border-radius: 10px; border: none;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.25s; display: inline-flex;
  align-items: center; justify-content: center; gap: 6px;
}
.sell-btn-primary {
  background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff;
  box-shadow: 0 4px 14px rgba(220,38,38,0.3);
}
.sell-btn-primary:hover { box-shadow: 0 8px 24px rgba(220,38,38,0.5); transform: translateY(-1px); }
.sell-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.sell-btn-secondary {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
}
.sell-btn-secondary:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); color: #fff; }

/* Summary card */
.sell-summary {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 16px; margin-bottom: 16px;
}
.sell-summary-row {
  display: flex; justify-content: space-between;
  padding: 8px 0; font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.sell-summary-row:last-child { border-bottom: none; }
.sell-summary-label { color: rgba(255,255,255,0.35); }
.sell-summary-value { color: rgba(255,255,255,0.8); font-weight: 600; font-family: 'Rajdhani', sans-serif; }
.sell-summary-row.total .sell-summary-value { color: #DC2626; font-size: 18px; }

/* Helper text */
.sell-helper { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 5px; display: flex; align-items: center; gap: 4px; }

/* Button group */
.sell-btn-group { display: flex; gap: 10px; margin-top: 24px; }
.sell-btn-group .sell-btn { flex: 1; }
`;function G5(){const a=Lr(),[o,s]=v.useState(1),[d,p]=v.useState(!1),[u,m]=v.useState({game:"",rank:"",title:"",description:"",heroes:"",skins:"",battlePass:"",email:"",price:"",negotiable:!1,photos:[],whatsapp:"",agreeTerms:!1}),g=(w,M)=>m(A=>({...A,[w]:M})),h=Cp.find(w=>w.id===u.game),x=u.game?H5[u.game]||[]:[],S=()=>o===1?!!u.game&&!!u.rank:o===2?!!u.title&&!!u.description&&u.title.length>=10:o===3?!!u.price&&!!u.whatsapp:o===4?u.agreeTerms:!1,b=()=>p(!0),N=()=>{u.photos.length<5&&g("photos",[...u.photos,`Photo ${u.photos.length+1}`])};return d?n.jsxs("div",{className:"sell-root",children:[n.jsx("style",{children:Ep}),n.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},children:n.jsxs("div",{className:"sell-success",style:{maxWidth:480},children:[n.jsx("div",{className:"sell-success-icon",children:n.jsx(pt,{size:40,color:"#10B981"})}),n.jsx("h1",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:32,fontWeight:700,color:"#fff",margin:"0 0 8px"},children:"Listing Berhasil!"}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:14,margin:"0 0 8px"},children:["Akun ",n.jsxs("strong",{style:{color:"#fff"},children:[h==null?void 0:h.name," (",u.rank,")"]})," sedang dalam proses verifikasi"]}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.25)",fontSize:13,margin:"0 0 24px"},children:["Tim kami akan meninjau dalam ",n.jsx("strong",{children:"1x24 jam"}),". Notifikasi akan dikirim via WhatsApp."]}),n.jsxs("div",{className:"sell-info-box blue",style:{display:"block",marginBottom:24},children:[n.jsx("div",{className:"sell-info-title",style:{color:"#10B981",textAlign:"left"},children:"Langkah Selanjutnya"}),n.jsxs("ul",{className:"sell-info-list",style:{color:"rgba(16,185,129,0.7)",fontSize:12,textAlign:"left",marginTop:8},children:[n.jsx("li",{children:"✓ Cek WhatsApp untuk konfirmasi"}),n.jsx("li",{children:"✓ Pantau status di halaman Profile"}),n.jsx("li",{children:"✓ Akun akan aktif setelah verifikasi"})]})]}),n.jsxs("div",{style:{display:"flex",gap:10,width:"100%"},children:[n.jsx("button",{onClick:()=>{p(!1),s(1),m({game:"",rank:"",title:"",description:"",heroes:"",skins:"",battlePass:"",email:"",price:"",negotiable:!1,photos:[],whatsapp:"",agreeTerms:!1})},className:"sell-btn sell-btn-secondary",style:{flex:1},children:"Jual Akun Lagi"}),n.jsxs("button",{onClick:()=>a("/profile"),className:"sell-btn sell-btn-primary",style:{flex:1},children:[n.jsx(Qe,{size:14}),"Lihat Listing"]})]})]})})]}):n.jsxs("div",{className:"sell-root",children:[n.jsx("style",{children:Ep}),n.jsxs("div",{className:"sell-hero",children:[n.jsx("div",{className:"sell-hero-bg"}),n.jsx("div",{className:"sell-hero-grid"}),n.jsx("div",{className:"sell-hero-line"}),n.jsxs("div",{style:{maxWidth:800,margin:"0 auto",padding:"0 24px",position:"relative",zIndex:2},children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,padding:"4px 12px",marginBottom:14},children:[n.jsx(Fn,{size:14,color:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#DC2626",textTransform:"uppercase",fontFamily:"'Barlow',sans-serif"},children:"Jual Akun"})]}),n.jsxs("h1",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff",margin:"0 0 6px"},children:["Jual Akun ",n.jsx("span",{style:{color:"#DC2626"},children:"Game Kamu"})]}),n.jsx("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:14,margin:0,fontFamily:"'Barlow',sans-serif"},children:"Listing akun dengan aman menggunakan sistem Escrow terpercaya"})]})]}),n.jsxs("div",{style:{maxWidth:800,margin:"0 auto",padding:"32px 24px 60px"},children:[n.jsxs("div",{className:"sell-steps",children:[n.jsx("div",{className:"sell-steps-line"}),n.jsx("div",{className:"sell-steps-progress",style:{width:`${(o-1)/(Np.length-1)*100}%`}}),Np.map(w=>{const M=w.icon,A=o>w.id,_=o===w.id;return n.jsxs("div",{className:`sell-step ${A?"done":""} ${_?"active":""}`,children:[n.jsx("div",{className:"sell-step-circle",children:A?n.jsx(pt,{size:16,color:"#fff"}):n.jsx(M,{size:16})}),n.jsx("span",{className:"sell-step-label",children:w.label})]},w.id)})]}),n.jsxs("div",{className:"sell-card",children:[o===1&&n.jsxs("div",{children:[n.jsx("div",{className:"sell-section-title",children:"Pilih Game"}),n.jsx("div",{className:"sell-section-desc",children:"Pilih game yang akunnya ingin kamu jual"}),n.jsx("div",{className:"sell-game-grid",children:Cp.map(w=>n.jsxs("button",{onClick:()=>{g("game",w.id),g("rank","")},className:`sell-game-btn ${u.game===w.id?"active":""}`,style:u.game===w.id?{borderColor:w.color,background:w.glow}:{},children:[n.jsx("div",{className:"sell-game-icon",style:u.game===w.id?{background:w.color+"20"}:{},children:w.name.charAt(0)}),n.jsx("span",{className:"sell-game-name",style:u.game===w.id?{color:w.color}:{},children:w.name}),u.game===w.id&&n.jsx(pt,{size:12,color:w.color})]},w.id))}),u.game&&n.jsxs("div",{style:{marginTop:20,animation:"fadeInUp 0.3s ease"},children:[n.jsx("div",{className:"sell-input-label",children:"Rank / Tingkatan Akun *"}),n.jsx("div",{className:"sell-rank-grid",children:x.map(w=>n.jsx("button",{onClick:()=>g("rank",w),className:`sell-rank-btn ${u.rank===w?"active":""}`,style:u.rank===w?{borderColor:h==null?void 0:h.color}:{},children:w},w))})]})]}),o===2&&n.jsxs("div",{children:[n.jsx("div",{className:"sell-section-title",children:"Detail Akun"}),n.jsx("div",{className:"sell-section-desc",children:"Berikan informasi lengkap agar pembeli tertarik"}),n.jsxs("div",{className:"sell-input-wrap",children:[n.jsx("label",{className:"sell-input-label",children:"Judul Listing * (min. 10 karakter)"}),n.jsx("input",{type:"text",className:"sell-input",value:u.title,onChange:w=>g("title",w.target.value),placeholder:`Akun ${h==null?void 0:h.name} ${u.rank} Full Skin Lengkap`}),n.jsxs("div",{className:"sell-helper",children:[u.title.length," karakter"]})]}),n.jsxs("div",{className:"sell-input-wrap",children:[n.jsx("label",{className:"sell-input-label",children:"Deskripsi Akun *"}),n.jsx("textarea",{className:"sell-textarea",value:u.description,onChange:w=>g("description",w.target.value),placeholder:"Jelaskan detail akun: jumlah hero, skin rare, event terbatas, dll..."})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16},children:[n.jsxs("div",{className:"sell-input-wrap",style:{marginBottom:0},children:[n.jsx("label",{className:"sell-input-label",children:"Heroes"}),n.jsx("input",{type:"text",className:"sell-input",value:u.heroes,onChange:w=>g("heroes",w.target.value),placeholder:"120+"})]}),n.jsxs("div",{className:"sell-input-wrap",style:{marginBottom:0},children:[n.jsx("label",{className:"sell-input-label",children:"Skins"}),n.jsx("input",{type:"text",className:"sell-input",value:u.skins,onChange:w=>g("skins",w.target.value),placeholder:"200+"})]}),n.jsxs("div",{className:"sell-input-wrap",style:{marginBottom:0},children:[n.jsx("label",{className:"sell-input-label",children:"Battle Pass"}),n.jsx("input",{type:"text",className:"sell-input",value:u.battlePass,onChange:w=>g("battlePass",w.target.value),placeholder:"Season 30"})]})]}),n.jsxs("div",{className:"sell-input-wrap",children:[n.jsx("label",{className:"sell-input-label",children:"Email Akun (Opsional)"}),n.jsx("input",{type:"email",className:"sell-input",value:u.email,onChange:w=>g("email",w.target.value),placeholder:"email@gmail.com"}),n.jsxs("div",{className:"sell-helper",children:[n.jsx(Mt,{size:12})," Email tidak ditampilkan publik"]})]})]}),o===3&&n.jsxs("div",{children:[n.jsx("div",{className:"sell-section-title",children:"Foto & Harga"}),n.jsx("div",{className:"sell-section-desc",children:"Upload screenshot dan tentukan harga"}),n.jsxs("div",{className:"sell-input-wrap",children:[n.jsx("label",{className:"sell-input-label",children:"Screenshot Akun (Maks. 5 foto)"}),n.jsxs("div",{className:"sell-photo-grid",children:[u.photos.map((w,M)=>n.jsxs("div",{className:"sell-photo-item filled",children:[n.jsx(pt,{size:20,color:"#10B981"}),n.jsxs("div",{style:{fontSize:9,color:"#10B981",marginTop:4,fontWeight:700},children:["Foto ",M+1]})]},M)),u.photos.length<5&&n.jsxs("button",{onClick:N,className:"sell-photo-item upload-btn",children:[n.jsx(e5,{size:18,color:"rgba(255,255,255,0.2)"}),n.jsx("div",{style:{fontSize:9,color:"rgba(255,255,255,0.25)",marginTop:4,fontWeight:700},children:"Tambah Foto"})]})]}),n.jsxs("div",{className:"sell-helper",children:[n.jsx(S2,{size:12})," Upload screenshot rank, koleksi hero/skin"]})]}),n.jsxs("div",{className:"sell-input-wrap",children:[n.jsx("label",{className:"sell-input-label",children:"Harga Jual (Rp) *"}),n.jsx("input",{type:"number",className:"sell-input",value:u.price,onChange:w=>g("price",w.target.value),placeholder:"2500000",style:{paddingLeft:14}}),u.price&&n.jsxs("div",{style:{fontSize:12,color:"#DC2626",fontWeight:700,marginTop:6,fontFamily:"'Rajdhani',sans-serif"},children:["= Rp ",parseInt(u.price).toLocaleString("id-ID")]})]}),n.jsxs("label",{className:"sell-checkbox",children:[n.jsx("input",{type:"checkbox",checked:u.negotiable,onChange:w=>g("negotiable",w.target.checked),style:{display:"none"}}),n.jsx("span",{className:"sell-check-box"}),n.jsx("span",{className:"sell-checkbox-label",children:"Harga bisa dinegosiasikan"})]}),n.jsxs("div",{className:"sell-input-wrap",children:[n.jsx("label",{className:"sell-input-label",children:"Nomor WhatsApp *"}),n.jsx("input",{type:"tel",className:"sell-input",value:u.whatsapp,onChange:w=>g("whatsapp",w.target.value),placeholder:"08123456789"}),n.jsx("div",{className:"sell-helper",children:"Untuk notifikasi dan komunikasi dengan pembeli"})]})]}),o===4&&n.jsxs("div",{children:[n.jsx("div",{className:"sell-section-title",children:"Review Listing"}),n.jsx("div",{className:"sell-section-desc",children:"Periksa kembali informasi sebelum submit"}),n.jsxs("div",{className:"sell-summary",children:[n.jsxs("div",{className:"sell-summary-row",children:[n.jsx("span",{className:"sell-summary-label",children:"Game"}),n.jsxs("span",{className:"sell-summary-value",children:[h==null?void 0:h.name," - ",u.rank]})]}),n.jsxs("div",{className:"sell-summary-row",children:[n.jsx("span",{className:"sell-summary-label",children:"Judul"}),n.jsx("span",{className:"sell-summary-value",style:{textAlign:"right",maxWidth:200},children:u.title||"-"})]}),n.jsxs("div",{className:"sell-summary-row",children:[n.jsx("span",{className:"sell-summary-label",children:"Heroes"}),n.jsx("span",{className:"sell-summary-value",children:u.heroes||"-"})]}),n.jsxs("div",{className:"sell-summary-row",children:[n.jsx("span",{className:"sell-summary-label",children:"Skins"}),n.jsx("span",{className:"sell-summary-value",children:u.skins||"-"})]}),n.jsxs("div",{className:"sell-summary-row",children:[n.jsx("span",{className:"sell-summary-label",children:"Foto"}),n.jsxs("span",{className:"sell-summary-value",children:[u.photos.length," foto"]})]}),n.jsxs("div",{className:"sell-summary-row total",children:[n.jsx("span",{className:"sell-summary-label",children:"Harga"}),n.jsxs("span",{className:"sell-summary-value",children:["Rp ",u.price?parseInt(u.price).toLocaleString("id-ID"):"-",u.negotiable&&n.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,0.4)"},children:" (nego)"})]})]})]}),n.jsxs("div",{className:"sell-info-box blue",children:[n.jsx(Mt,{size:16,color:"#10B981"}),n.jsxs("div",{children:[n.jsx("div",{className:"sell-info-title",style:{color:"#10B981"},children:"Dilindungi Sistem Escrow"}),n.jsxs("ul",{className:"sell-info-list",style:{color:"rgba(16,185,129,0.7)"},children:[n.jsx("li",{children:"• Dana pembeli ditahan hingga akun diterima"}),n.jsx("li",{children:"• Jika sengketa, tim mediasi"}),n.jsx("li",{children:"• Komisi 5% dari harga jual"})]})]})]}),n.jsxs("div",{className:"sell-info-box amber",children:[n.jsx(hi,{size:16,color:"#F59E0B"}),n.jsxs("div",{children:[n.jsx("div",{className:"sell-info-title",style:{color:"#F59E0B"},children:"Syarat & Ketentuan"}),n.jsxs("ul",{className:"sell-info-list",style:{color:"rgba(245,158,11,0.7)"},children:[n.jsx("li",{children:"• Akun harus milik kamu sendiri"}),n.jsx("li",{children:"• Tidak boleh hasil hack/curian"}),n.jsx("li",{children:"• Informasi harus akurat"}),n.jsx("li",{children:"• Pelanggaran = ban permanen"})]})]})]}),n.jsxs("label",{className:"sell-checkbox",children:[n.jsx("input",{type:"checkbox",checked:u.agreeTerms,onChange:w=>g("agreeTerms",w.target.checked),style:{display:"none"}}),n.jsx("span",{className:"sell-check-box"}),n.jsxs("span",{className:"sell-checkbox-label",children:["Saya menyetujui ",n.jsx("strong",{children:"Syarat & Ketentuan"})," dan ",n.jsx("strong",{children:"Kebijakan Privasi"})," OkeGass Store"]})]})]}),n.jsxs("div",{className:"sell-btn-group",children:[o>1&&n.jsxs("button",{onClick:()=>s(w=>w-1),className:"sell-btn sell-btn-secondary",children:[n.jsx(gf,{size:14})," Kembali"]}),n.jsx("button",{onClick:()=>o<4?s(w=>w+1):b(),disabled:!S(),className:"sell-btn sell-btn-primary",style:{marginLeft:"auto"},children:o<4?n.jsxs(n.Fragment,{children:["Lanjut ",n.jsx(ga,{size:14})]}):n.jsxs(n.Fragment,{children:[n.jsx(pt,{size:14})," Submit Listing"]})})]})]})]})]})}const Ml=[{id:"TRX-001",type:"topup",game:"Mobile Legends",item:"500 Diamonds",amount:115e3,status:"success",date:"14 Mei 2026",time:"14:32"},{id:"TRX-002",type:"buy",game:"PUBG Mobile",item:"Akun Conqueror Season 29",amount:42e5,status:"escrow",date:"13 Mei 2026",time:"10:15"},{id:"TRX-003",type:"topup",game:"Genshin Impact",item:"1980 Genesis Crystals",amount:462e3,status:"success",date:"12 Mei 2026",time:"20:05"},{id:"TRX-004",type:"sell",game:"Free Fire",item:"Akun Grandmaster FF",amount:12e5,status:"pending",date:"10 Mei 2026",time:"09:44"},{id:"TRX-005",type:"topup",game:"Free Fire",item:"355 Diamonds",amount:79e3,status:"success",date:"08 Mei 2026",time:"16:50"},{id:"TRX-006",type:"buy",game:"Mobile Legends",item:"Akun Mythic Glory ML",amount:35e5,status:"success",date:"05 Mei 2026",time:"11:30"}],Hs=[{id:"LST-001",game:"Free Fire",title:"Akun Grandmaster FF Full Bundle",rank:"Grandmaster",price:12e5,status:"pending",views:34,date:"10 Mei 2026"},{id:"LST-002",game:"PUBG Mobile",title:"Akun Ace PUBG Full Outfit",rank:"Ace",price:195e4,status:"active",views:87,date:"01 Mei 2026"}],V5=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.prof-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

/* Hero Section */
.prof-hero {
  position: relative; padding: 44px 0 40px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.prof-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%);
}
.prof-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}

/* Avatar */
.prof-avatar {
  width: 80px; height: 80px; border-radius: 20px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700;
  color: #fff; box-shadow: 0 8px 24px rgba(220,38,38,0.3);
  position: relative;
}
.prof-avatar-cam {
  position: absolute; bottom: -4px; right: -4px;
  width: 28px; height: 28px; background: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer;
  transition: all 0.2s;
}
.prof-avatar-cam:hover { background: #f0f0f0; transform: scale(1.05); }
.prof-badge-verified {
  position: absolute; top: -4px; right: -4px;
  width: 24px; height: 24px; background: #3B82F6;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(59,130,246,0.3);
}

/* Tabs */
.prof-tabs {
  display: flex; gap: 4px; background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
  padding: 4px; width: fit-content; margin-bottom: 24px;
}
.prof-tab {
  display: flex; align-items: center; gap: 8px; padding: 10px 18px;
  border-radius: 8px; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.4);
  background: transparent; border: none;
}
.prof-tab.active {
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff; box-shadow: 0 4px 12px rgba(220,38,38,0.3);
}
.prof-tab:hover:not(.active) { color: rgba(255,255,255,0.7); }

/* Filter Buttons */
.prof-filter-btn {
  padding: 10px 16px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.4); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; font-family: 'Barlow', sans-serif;
}
.prof-filter-btn.active {
  background: linear-gradient(135deg, #DC2626, #EA580C);
  border-color: #DC2626; color: #fff;
}
.prof-filter-btn:hover:not(.active) { border-color: rgba(255,255,255,0.15); }

/* Transaction Item */
.prof-tx-item {
  display: flex; align-items: center; gap: 16px; padding: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05); transition: all 0.2s;
  cursor: pointer;
}
.prof-tx-item:hover { background: rgba(255,255,255,0.02); }
.prof-tx-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.prof-tx-info { flex: 1; min-width: 0; }
.prof-tx-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.prof-tx-meta { font-size: 11px; color: rgba(255,255,255,0.3); }
.prof-tx-amount { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; text-align: right; }
.prof-tx-status { font-size: 11px; margin-top: 6px; text-align: right; display: flex; justify-content: flex-end; }

/* Card */
.prof-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; margin-bottom: 20px;
}
.prof-card-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.prof-card-title { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: #fff; }

/* Input */
.prof-input {
  width: 100%; padding: 12px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.prof-input::placeholder { color: rgba(255,255,255,0.15); }
.prof-input:focus { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04); }

/* Label */
.prof-label {
  display: block; font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.35); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.06em;
}

/* Toggle Switch */
.prof-toggle {
  position: relative; width: 44px; height: 24px; border-radius: 12px;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer; transition: all 0.3s; flex-shrink: 0;
}
.prof-toggle.on { background: #DC2626; border-color: #DC2626; }
.prof-toggle-circle {
  position: absolute; width: 20px; height: 20px;
  border-radius: 10px; background: #fff; top: 2px; left: 2px;
  transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.prof-toggle.on .prof-toggle-circle { transform: translateX(20px); }

/* Status Badge */
.prof-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; padding: 5px 10px; border-radius: 6px;
  font-weight: 700; white-space: nowrap;
}
.prof-badge-success { background: rgba(16,185,129,0.15); color: #10B981; }
.prof-badge-amber { background: rgba(245,158,11,0.15); color: #F59E0B; }
.prof-badge-blue { background: rgba(59,130,246,0.15); color: #3B82F6; }

/* Button */
.prof-btn {
  padding: 11px 18px; border-radius: 10px; border: none;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.25s; display: inline-flex;
  align-items: center; justify-content: center; gap: 6px;
}
.prof-btn-primary {
  background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff;
  box-shadow: 0 4px 12px rgba(220,38,38,0.3);
}
.prof-btn-primary:hover { box-shadow: 0 8px 20px rgba(220,38,38,0.5); }
.prof-btn-secondary {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
}
.prof-btn-secondary:hover { background: rgba(255,255,255,0.08); color: #fff; }

/* Listing Card */
.prof-listing {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 16px; margin-bottom: 16px;
  transition: all 0.2s;
}
.prof-listing:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.035); }

/* Settings Item */
.prof-setting-item {
  padding: 16px; border-radius: 10px; cursor: pointer;
  transition: all 0.2s; border: none; background: transparent;
  width: 100%; text-align: left; display: flex; align-items: center; gap: 12px;
}
.prof-setting-item:hover { background: rgba(255,255,255,0.04); }
.prof-setting-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.04); display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
}
.prof-setting-item:hover .prof-setting-icon { background: rgba(220,38,38,0.1); }

/* Danger Zone */
.prof-danger {
  background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 14px; padding: 16px;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.prof-animate { animation: fadeIn 0.3s ease; }
`,ci=a=>"Rp "+a.toLocaleString("id-ID"),zp=a=>a==="success"?n.jsxs("span",{className:"prof-badge prof-badge-success",children:[n.jsx(pt,{className:"w-3 h-3"}),"Berhasil"]}):a==="escrow"?n.jsxs("span",{className:"prof-badge prof-badge-amber",children:[n.jsx(Mt,{className:"w-3 h-3"}),"Escrow"]}):a==="pending"?n.jsxs("span",{className:"prof-badge prof-badge-blue",children:[n.jsx(ha,{className:"w-3 h-3"}),"Menunggu"]}):a==="active"?n.jsx("span",{className:"prof-badge prof-badge-success",children:"Aktif"}):n.jsx("span",{className:"prof-badge",children:a}),Y5=a=>a==="topup"?n.jsx(Qe,{className:"w-4 h-4",color:"#3B82F6"}):a==="buy"?n.jsx(Ul,{className:"w-4 h-4",color:"#A78BFA"}):a==="sell"?n.jsx(Fn,{className:"w-4 h-4",color:"#10B981"}):null,K5=a=>a==="topup"?"Top Up":a==="buy"?"Beli Akun":a==="sell"?"Jual Akun":a,Vt={name:"User",email:"user@okegass.com",phone:"0812-3456-7890",avatar:"U",joinDate:"Mei 2026",level:"Trusted Seller",rating:4.8,totalSales:12,totalBuy:5,balance:25e4};function q5(){const a=Lr(),[o,s]=v.useState("transactions"),[d,p]=v.useState("Semua"),[u,m]=v.useState(!1),[g,h]=v.useState(!1),[x,S]=v.useState(Vt.name),[b,N]=v.useState(Vt.phone),[w,M]=v.useState(!0),[A,_]=v.useState(!0),[q,$]=v.useState(!1),J=["Semua","Top Up","Beli Akun","Jual Akun"],ne=Ml.filter(B=>d==="Top Up"?B.type==="topup":d==="Beli Akun"?B.type==="buy":d==="Jual Akun"?B.type==="sell":!0),Q=()=>{navigator.clipboard.writeText("OKG-US12345"),m(!0),setTimeout(()=>m(!1),2e3)},Z=Ml.filter(B=>B.status==="success"&&B.type!=="sell").reduce((B,X)=>B+X.amount,0),j=Ml.filter(B=>B.type==="sell"&&B.status==="success").reduce((B,X)=>B+X.amount,0);return n.jsxs("div",{className:"prof-root",children:[n.jsx("style",{children:V5}),n.jsxs("div",{className:"prof-hero",children:[n.jsx("div",{className:"prof-hero-bg"}),n.jsx("div",{className:"prof-hero-grid"}),n.jsx("div",{style:{maxWidth:1200,margin:"0 auto",padding:"0 24px",position:"relative",zIndex:2},children:n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"row",gap:24,alignItems:"flex-start",flexWrap:"wrap"},children:[n.jsxs("div",{className:"prof-avatar",style:{position:"relative"},children:[Vt.avatar,n.jsx("div",{className:"prof-avatar-cam",children:n.jsx(mf,{className:"w-4 h-4",color:"#666"})}),n.jsx("div",{className:"prof-badge-verified",children:n.jsx(pt,{className:"w-4 h-4",color:"#fff"})})]}),n.jsxs("div",{style:{flex:1,minWidth:200},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:8},children:[n.jsx("h1",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:32,fontWeight:700,color:"#fff",margin:0},children:Vt.name}),n.jsxs("span",{style:{background:"rgba(245,158,11,0.15)",border:"1px solid rgba(245,158,11,0.3)",color:"#F59E0B",fontSize:11,padding:"4px 10px",borderRadius:6,fontWeight:700,display:"flex",alignItems:"center",gap:4},children:[n.jsx(bf,{className:"w-3 h-3"})," ",Vt.level]})]}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:13,margin:"0 0 12px"},children:[Vt.email," · Bergabung ",Vt.joinDate]}),n.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",fontSize:13},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,color:"#F59E0B"},children:[n.jsx(Ln,{className:"w-4 h-4",fill:"#F59E0B"}),n.jsx("span",{style:{fontWeight:700},children:Vt.rating}),n.jsx("span",{style:{color:"rgba(255,255,255,0.3)"},children:"Rating"})]}),n.jsx("span",{style:{color:"rgba(255,255,255,0.2)"},children:"·"}),n.jsxs("span",{style:{color:"rgba(255,255,255,0.6)"},children:[n.jsx("strong",{style:{color:"#fff"},children:Vt.totalSales})," Penjualan"]}),n.jsx("span",{style:{color:"rgba(255,255,255,0.2)"},children:"·"}),n.jsxs("span",{style:{color:"rgba(255,255,255,0.6)"},children:[n.jsx("strong",{style:{color:"#fff"},children:Vt.totalBuy})," Pembelian"]})]})]}),n.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,textAlign:"right",backdropFilter:"blur(10px)"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:8,justifyContent:"flex-end"},children:[n.jsx(xa,{className:"w-3.5 h-3.5"})," Saldo OkeGass"]}),n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700,color:"#10B981",marginBottom:8},children:ci(Vt.balance)}),n.jsx("button",{style:{background:"none",border:"none",color:"#EA580C",fontSize:12,fontWeight:700,cursor:"pointer"},children:"+ Top Up Saldo"})]})]}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12},children:[{label:"Total Pengeluaran",value:ci(Z),icon:yf,color:"#3B82F6"},{label:"Total Pendapatan",value:ci(j),icon:xa,color:"#10B981"},{label:"Transaksi Aktif",value:`${Ml.filter(B=>B.status==="escrow"||B.status==="pending").length} Transaksi`,icon:ha,color:"#F59E0B"}].map(B=>{const X=B.icon;return n.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:12},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:11,color:B.color,marginBottom:6},children:[n.jsx(X,{className:"w-3.5 h-3.5"})," ",B.label]}),n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:14},children:B.value})]},B.label)})})]})})]}),n.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:"32px 24px 60px"},children:[n.jsx("div",{className:"prof-tabs",children:[{id:"transactions",label:"Transaksi",icon:Ul},{id:"listings",label:"Listing Saya",icon:Fn},{id:"settings",label:"Pengaturan",icon:xf}].map(B=>{const X=B.icon;return n.jsxs("button",{onClick:()=>s(B.id),className:`prof-tab ${o===B.id?"active":""}`,children:[n.jsx(X,{className:"w-4 h-4"})," ",B.label]},B.id)})}),o==="transactions"&&n.jsxs("div",{className:"prof-animate",children:[n.jsx("div",{style:{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"},children:J.map(B=>n.jsx("button",{onClick:()=>p(B),className:`prof-filter-btn ${d===B?"active":""}`,children:B},B))}),n.jsx("div",{style:{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,overflow:"hidden"},children:ne.length===0?n.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[n.jsx(Ul,{className:"w-12 h-12",style:{color:"rgba(255,255,255,0.1)",margin:"0 auto 12px",display:"block"}}),n.jsx("p",{style:{color:"rgba(255,255,255,0.3)",fontWeight:700},children:"Tidak ada transaksi"})]}):ne.map(B=>n.jsxs("div",{className:"prof-tx-item",children:[n.jsx("div",{className:"prof-tx-icon",children:Y5(B.type)}),n.jsxs("div",{className:"prof-tx-info",children:[n.jsxs("div",{className:"prof-tx-title",children:[K5(B.type)," · ",B.game]}),n.jsxs("div",{className:"prof-tx-meta",children:[B.item," · ",B.date," ",B.time]})]}),n.jsxs("div",{style:{textAlign:"right",flex:"0 0 auto"},children:[n.jsxs("div",{className:"prof-tx-amount",style:{color:B.type==="sell"?"#10B981":"#fff"},children:[B.type==="sell"?"+":"-",ci(B.amount)]}),n.jsx("div",{className:"prof-tx-status",children:zp(B.status)})]}),n.jsx(ga,{className:"w-4 h-4",style:{color:"rgba(255,255,255,0.1)",flex:"0 0 auto"}})]},B.id))})]}),o==="listings"&&n.jsxs("div",{className:"prof-animate",children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},children:[n.jsxs("p",{style:{fontSize:13,color:"rgba(255,255,255,0.3)",margin:0},children:[Hs.length," listing aktif"]}),n.jsxs("button",{onClick:()=>a("/marketplace/sell"),className:"prof-btn prof-btn-primary",children:[n.jsx(Qe,{className:"w-4 h-4"})," + Jual Akun Baru"]})]}),Hs.length===0?n.jsxs("div",{style:{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,textAlign:"center",padding:"60px 20px"},children:[n.jsx(Fn,{className:"w-12 h-12",style:{color:"rgba(255,255,255,0.1)",margin:"0 auto 12px",display:"block"}}),n.jsx("p",{style:{color:"rgba(255,255,255,0.3)",fontWeight:700,marginBottom:8},children:"Belum ada listing"}),n.jsx("button",{onClick:()=>a("/marketplace/sell"),style:{background:"none",border:"none",color:"#DC2626",fontSize:13,fontWeight:700,cursor:"pointer"},children:"Mulai jual akun →"})]}):Hs.map(B=>n.jsxs("div",{className:"prof-listing",children:[n.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:12},children:[n.jsxs("div",{style:{flex:1,minWidth:0},children:[n.jsxs("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",marginBottom:4},children:[B.game," · ",B.rank]}),n.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#fff",marginBottom:4},children:B.title}),n.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.3)"},children:["Dibuat ",B.date," · ",B.views," views"]})]}),n.jsxs("div",{style:{textAlign:"right",flex:"0 0 auto"},children:[zp(B.status),n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:700,color:"#DC2626",marginTop:6},children:ci(B.price)})]})]}),B.status==="pending"&&n.jsxs("div",{style:{display:"flex",gap:8,alignItems:"flex-start",background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:10,padding:10,marginBottom:12},children:[n.jsx(hi,{className:"w-4 h-4",style:{color:"#3B82F6",flex:"0 0 auto",marginTop:1}}),n.jsx("p",{style:{fontSize:11,color:"rgba(59,130,246,0.8)",margin:0},children:"Listing sedang dalam proses verifikasi (1x24 jam)"})]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsxs("button",{className:"prof-btn prof-btn-secondary",children:[n.jsx(kp,{className:"w-3.5 h-3.5"})," Edit"]}),n.jsxs("button",{className:"prof-btn prof-btn-secondary",children:[n.jsx(hf,{className:"w-3.5 h-3.5"})," Lihat"]})]})]},B.id))]}),o==="settings"&&n.jsxs("div",{className:"prof-animate",style:{display:"flex",flexDirection:"column",gap:20},children:[n.jsxs("div",{className:"prof-card",children:[n.jsxs("div",{className:"prof-card-header",children:[n.jsx("h3",{className:"prof-card-title",children:"Informasi Profil"}),n.jsxs("button",{onClick:()=>h(!g),className:`prof-btn ${g?"prof-btn-primary":"prof-btn-secondary"}`,children:[n.jsx(kp,{className:"w-3.5 h-3.5"}),g?"Simpan":"Edit"]})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[n.jsxs("div",{children:[n.jsx("label",{className:"prof-label",children:"Nama Pengguna"}),g?n.jsx("input",{type:"text",value:x,onChange:B=>S(B.target.value),className:"prof-input"}):n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10},children:[n.jsx("span",{style:{color:"#fff",fontWeight:700},children:x}),n.jsx(Tn,{className:"w-4 h-4",color:"rgba(255,255,255,0.2)"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"prof-label",children:"Email"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10},children:[n.jsx("span",{style:{color:"#fff",fontWeight:700},children:Vt.email}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx(pt,{className:"w-4 h-4",color:"#10B981"}),n.jsx("span",{style:{fontSize:11,color:"#10B981",fontWeight:700},children:"Terverifikasi"})]})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"prof-label",children:"Nomor WhatsApp"}),g?n.jsx("input",{type:"tel",value:b,onChange:B=>N(B.target.value),className:"prof-input"}):n.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10},children:n.jsx("span",{style:{color:"#fff",fontWeight:700},children:b})})]}),n.jsxs("div",{children:[n.jsx("label",{className:"prof-label",children:"ID Referral"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10},children:[n.jsx("span",{style:{color:"#fff",fontWeight:700,fontFamily:"monospace"},children:"OKG-US12345"}),n.jsxs("button",{onClick:Q,style:{background:"none",border:"none",color:"#DC2626",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:4},children:[n.jsx(d2,{className:"w-3.5 h-3.5"}),u?"Disalin!":"Salin"]})]}),n.jsx("p",{style:{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:6},children:"Bagikan ke teman untuk mendapatkan komisi referral"})]})]})]}),n.jsxs("div",{className:"prof-card",children:[n.jsx("div",{className:"prof-card-header",children:n.jsxs("h3",{className:"prof-card-title",style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(ff,{className:"w-5 h-5"})," Notifikasi"]})}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[{label:"Notifikasi Top Up",desc:"Status top up dan konfirmasi pembayaran",value:w,set:M},{label:"Notifikasi Transaksi Akun",desc:"Update status listing dan pembelian akun",value:A,set:_},{label:"Promo & Penawaran",desc:"Diskon, cashback, dan event spesial",value:q,set:$}].map(B=>n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{color:"#fff",fontWeight:700,fontSize:13,marginBottom:4},children:B.label}),n.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.3)"},children:B.desc})]}),n.jsx("button",{onClick:()=>B.set(!B.value),className:`prof-toggle ${B.value?"on":""}`,children:n.jsx("span",{className:"prof-toggle-circle"})})]},B.label))})]}),n.jsxs("div",{className:"prof-card",children:[n.jsx("div",{className:"prof-card-header",children:n.jsxs("h3",{className:"prof-card-title",style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(Zs,{className:"w-5 h-5"})," Keamanan"]})}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[{label:"Ganti Password",icon:Zs,desc:"Terakhir diubah 3 bulan lalu"},{label:"Verifikasi 2 Faktor",icon:Mt,desc:"Belum aktif - Direkomendasikan"},{label:"Riwayat Login",icon:o2,desc:"Lihat aktivitas login terakhir"}].map((B,X)=>{const ye=B.icon;return n.jsxs("button",{className:"prof-setting-item",style:{borderBottom:X<2?"1px solid rgba(255,255,255,0.05)":"none"},children:[n.jsx("div",{className:"prof-setting-icon",children:n.jsx(ye,{className:"w-4 h-4",style:{color:"#DC2626"}})}),n.jsxs("div",{style:{flex:1,textAlign:"left"},children:[n.jsx("div",{style:{color:"#fff",fontWeight:700,fontSize:13,marginBottom:2},children:B.label}),n.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.3)"},children:B.desc})]}),n.jsx(ga,{className:"w-4 h-4",color:"rgba(255,255,255,0.2)"})]},B.label)})})]}),n.jsx("div",{className:"prof-danger",children:n.jsxs("button",{onClick:()=>a("/"),style:{background:"none",border:"none",color:"#DC2626",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:8},children:[n.jsx(ec,{className:"w-4 h-4"}),"Keluar dari Akun"]})})]})]})]})}const Q5=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

.hlp-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
  color: #fff;
}

/* ── Hero ── */
.hlp-hero {
  position: relative; padding: 72px 24px 64px;
  text-align: center; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.hlp-hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.13) 0%, transparent 70%);
}
.hlp-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 0%, transparent 75%);
}

.hlp-hero-content { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
.hlp-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 20px; padding: 5px 14px; margin-bottom: 20px;
  font-size: 11px; font-weight: 700; color: rgba(220,38,38,0.85);
  letter-spacing: 0.08em; text-transform: uppercase;
}
.hlp-hero-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 700; color: #fff;
  line-height: 1.05; margin-bottom: 14px;
}
.hlp-hero-title span {
  background: linear-gradient(135deg, #DC2626, #EA580C);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hlp-hero-sub {
  font-size: 15px; color: rgba(255,255,255,0.38);
  line-height: 1.7; margin-bottom: 32px;
}

/* ── Search ── */
.hlp-search-wrap {
  position: relative; max-width: 440px; margin: 0 auto;
}
.hlp-search-icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: rgba(255,255,255,0.2); pointer-events: none;
}
.hlp-search {
  width: 100%; padding: 14px 16px 14px 46px; box-sizing: border-box;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 14px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 14px; outline: none; transition: all 0.22s;
}
.hlp-search::placeholder { color: rgba(255,255,255,0.18); }
.hlp-search:focus {
  border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.05);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.09);
}

/* ── Body ── */
.hlp-body {
  max-width: 880px; margin: 0 auto; padding: 56px 24px 80px;
}

/* ── Section title ── */
.hlp-section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px; font-weight: 700; color: #fff;
  margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
}
.hlp-section-title::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.07), transparent);
}

/* ── Quick topics ── */
.hlp-topics {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; margin-bottom: 52px;
}
.hlp-topic {
  display: flex; flex-direction: column; align-items: center;
  gap: 10px; padding: 20px 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; cursor: pointer;
  transition: all 0.22s ease; text-decoration: none;
}
.hlp-topic:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}
.hlp-topic.active {
  background: rgba(220,38,38,0.09);
  border-color: rgba(220,38,38,0.28);
}
.hlp-topic-icon {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.05);
  transition: all 0.22s;
}
.hlp-topic:hover .hlp-topic-icon,
.hlp-topic.active .hlp-topic-icon {
  background: rgba(220,38,38,0.12);
}
.hlp-topic-label {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45);
  text-align: center; letter-spacing: 0.03em;
  transition: color 0.22s;
}
.hlp-topic:hover .hlp-topic-label,
.hlp-topic.active .hlp-topic-label { color: #fff; }

/* ── FAQ ── */
.hlp-faq-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 52px; }
.hlp-faq-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; overflow: hidden;
  transition: border-color 0.22s;
}
.hlp-faq-item.open {
  border-color: rgba(220,38,38,0.22);
  background: rgba(220,38,38,0.04);
}
.hlp-faq-q {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 18px 20px;
  cursor: pointer; background: transparent; border: none;
  width: 100%; text-align: left; font-family: 'Barlow', sans-serif;
}
.hlp-faq-q-text {
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.75);
  line-height: 1.45; transition: color 0.2s;
}
.hlp-faq-item.open .hlp-faq-q-text { color: #fff; }
.hlp-faq-chevron {
  flex-shrink: 0; color: rgba(255,255,255,0.2);
  transition: transform 0.28s ease, color 0.2s;
}
.hlp-faq-item.open .hlp-faq-chevron {
  transform: rotate(180deg); color: #DC2626;
}
.hlp-faq-a {
  max-height: 0; overflow: hidden;
  transition: max-height 0.35s ease, padding 0.25s ease;
}
.hlp-faq-item.open .hlp-faq-a { max-height: 400px; }
.hlp-faq-a-inner {
  padding: 0 20px 18px;
  font-size: 13px; color: rgba(255,255,255,0.45);
  line-height: 1.75; border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 14px;
}
.hlp-faq-a-inner a { color: #EA580C; text-decoration: none; }
.hlp-faq-a-inner a:hover { color: #DC2626; }

/* ── Contact cards ── */
.hlp-contact-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px; margin-bottom: 52px;
}
.hlp-contact-card {
  padding: 22px 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; cursor: pointer; text-decoration: none;
  transition: all 0.22s ease; display: block;
}
.hlp-contact-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}
.hlp-contact-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
}
.hlp-contact-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px; font-weight: 700; color: #fff;
  margin-bottom: 4px;
}
.hlp-contact-desc {
  font-size: 12px; color: rgba(255,255,255,0.35);
  line-height: 1.6; margin-bottom: 12px;
}
.hlp-contact-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 6px; letter-spacing: 0.04em;
}

/* ── Status banner ── */
.hlp-status {
  background: rgba(16,185,129,0.07);
  border: 1px solid rgba(16,185,129,0.18);
  border-radius: 14px; padding: 16px 20px;
  display: flex; align-items: center; gap: 14px;
}
.hlp-status-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #10B981; flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.2);
  animation: hlp-pulse 2.5s ease-in-out infinite;
}
@keyframes hlp-pulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
  50% { box-shadow: 0 0 0 6px rgba(16,185,129,0.08); }
}
.hlp-status-text {
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.7);
}
.hlp-status-text span { color: #10B981; }

/* ── Animations ── */
@keyframes hlp-fade-up {
  from { opacity:0; transform: translateY(16px); }
  to   { opacity:1; transform: translateY(0); }
}
.hlp-animate { animation: hlp-fade-up 0.45s ease both; }
.hlp-animate-1 { animation-delay: 0.05s; }
.hlp-animate-2 { animation-delay: 0.12s; }
.hlp-animate-3 { animation-delay: 0.19s; }
.hlp-animate-4 { animation-delay: 0.26s; }
`,X5=[{icon:n.jsx(Qe,{size:20,color:"#3B82F6"}),label:"Top Up"},{icon:n.jsx(Ul,{size:20,color:"#A78BFA"}),label:"Jual Beli Akun"},{icon:n.jsx(Xs,{size:20,color:"#10B981"}),label:"Pembayaran"},{icon:n.jsx(Mt,{size:20,color:"#F59E0B"}),label:"Keamanan"},{icon:n.jsx(U2,{size:20,color:"#EA580C"}),label:"Refund"}],J5=[{topic:"Top Up",q:"Berapa lama proses top up setelah pembayaran?",a:"Top up biasanya diproses secara otomatis dalam 1–5 menit setelah pembayaran dikonfirmasi. Jika lebih dari 15 menit belum masuk, silakan hubungi CS kami."},{topic:"Top Up",q:"Metode pembayaran apa saja yang tersedia?",a:"Kami menerima transfer bank (BCA, BNI, BRI, Mandiri), e-wallet (GoPay, OVO, DANA, ShopeePay), QRIS, dan minimarket (Alfamart, Indomaret)."},{topic:"Jual Beli Akun",q:"Bagaimana sistem escrow bekerja?",a:"Dana pembeli ditahan oleh OkeGass hingga pembeli mengkonfirmasi akun diterima dan berfungsi dengan baik. Setelah konfirmasi, dana diteruskan ke penjual. Ini melindungi kedua belah pihak."},{topic:"Jual Beli Akun",q:"Berapa lama listing saya diverifikasi?",a:"Tim kami memverifikasi setiap listing dalam 1×24 jam. Kamu akan mendapat notifikasi setelah listing aktif dan bisa dilihat pembeli."},{topic:"Pembayaran",q:"Apakah ada biaya tambahan saat transaksi?",a:"Untuk top up tidak ada biaya tambahan. Untuk jual beli akun, OkeGass mengambil komisi 5% dari nilai transaksi sebagai biaya layanan dan escrow."},{topic:"Pembayaran",q:"Bagaimana cara mencairkan saldo OkeGass?",a:"Saldo bisa dicairkan ke rekening bank atau e-wallet kapan saja. Proses pencairan membutuhkan waktu 1×24 jam di hari kerja. Minimum pencairan Rp 50.000."},{topic:"Keamanan",q:"Apakah data akun saya aman?",a:"Ya, semua data dienkripsi dengan standar AES-256. Kami tidak pernah menyimpan password akun game kamu secara plaintext. Aktifkan 2FA di pengaturan untuk keamanan ekstra."},{topic:"Refund",q:"Bagaimana jika top up tidak masuk setelah 1 jam?",a:"Hubungi CS kami via WhatsApp atau email dengan menyertakan ID transaksi dan bukti pembayaran. Kami akan memproses refund atau meneruskan top up dalam 24 jam."},{topic:"Refund",q:"Apakah akun yang sudah dibeli bisa dikembalikan?",a:"Pengembalian akun hanya bisa dilakukan dalam 24 jam setelah transaksi selesai, jika terbukti data akun tidak sesuai deskripsi penjual. Ajukan dispute melalui halaman transaksi."}];function Z5(){const[a,o]=v.useState("Semua"),[s,d]=v.useState(0),[p,u]=v.useState(""),m=J5.filter(g=>{const h=a==="Semua"||g.topic===a,x=p===""||g.q.toLowerCase().includes(p.toLowerCase())||g.a.toLowerCase().includes(p.toLowerCase());return h&&x});return n.jsxs("div",{className:"hlp-root",children:[n.jsx("style",{children:Q5}),n.jsxs("div",{className:"hlp-hero",children:[n.jsx("div",{className:"hlp-hero-bg"}),n.jsx("div",{className:"hlp-hero-grid"}),n.jsxs("div",{className:"hlp-hero-content hlp-animate",children:[n.jsxs("div",{className:"hlp-hero-badge",children:[n.jsx($l,{size:11})," Pusat Bantuan"]}),n.jsxs("h1",{className:"hlp-hero-title",children:["Ada yang bisa",n.jsx("br",{}),n.jsx("span",{children:"kami bantu?"})]}),n.jsx("p",{className:"hlp-hero-sub",children:"Temukan jawaban cepat dari FAQ kami, atau hubungi tim support yang siap membantu 24/7."}),n.jsxs("div",{className:"hlp-search-wrap",children:[n.jsx(Wl,{size:16,className:"hlp-search-icon"}),n.jsx("input",{type:"text",className:"hlp-search",placeholder:"Cari pertanyaan...",value:p,onChange:g=>{u(g.target.value),o("Semua"),d(null)}})]})]})]}),n.jsxs("div",{className:"hlp-body",children:[n.jsxs("div",{className:"hlp-status hlp-animate hlp-animate-1",style:{marginBottom:48},children:[n.jsx("div",{className:"hlp-status-dot"}),n.jsxs("div",{children:[n.jsxs("div",{className:"hlp-status-text",children:[n.jsx("span",{children:"Semua sistem berjalan normal."})," Tim support aktif dan siap membantu."]}),n.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:3,display:"flex",alignItems:"center",gap:5},children:[n.jsx(ha,{size:11})," Terakhir dicek: hari ini, 14:00 WIB"]})]})]}),n.jsxs("div",{className:"hlp-animate hlp-animate-2",children:[n.jsx("div",{className:"hlp-section-title",children:"Topik Bantuan"}),n.jsxs("div",{className:"hlp-topics",children:[n.jsxs("button",{className:`hlp-topic ${a==="Semua"?"active":""}`,onClick:()=>{o("Semua"),d(null)},children:[n.jsx("div",{className:"hlp-topic-icon",children:n.jsx($l,{size:20,color:a==="Semua"?"#DC2626":"rgba(255,255,255,0.4)"})}),n.jsx("span",{className:"hlp-topic-label",children:"Semua"})]}),X5.map(g=>n.jsxs("button",{className:`hlp-topic ${a===g.label?"active":""}`,onClick:()=>{o(g.label),d(null)},children:[n.jsx("div",{className:"hlp-topic-icon",children:g.icon}),n.jsx("span",{className:"hlp-topic-label",children:g.label})]},g.label))]})]}),n.jsxs("div",{className:"hlp-animate hlp-animate-3",children:[n.jsx("div",{className:"hlp-section-title",children:"Pertanyaan Umum"}),n.jsx("div",{className:"hlp-faq-list",children:m.length===0?n.jsxs("div",{style:{textAlign:"center",padding:"48px 20px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14},children:[n.jsx(Wl,{size:32,style:{color:"rgba(255,255,255,0.1)",marginBottom:12,display:"block",margin:"0 auto 12px"}}),n.jsxs("p",{style:{color:"rgba(255,255,255,0.3)",fontWeight:700,margin:0},children:['Tidak ada hasil untuk "',p,'"']}),n.jsx("p",{style:{color:"rgba(255,255,255,0.18)",fontSize:12,marginTop:6},children:"Coba kata kunci lain atau hubungi CS kami"})]}):m.map((g,h)=>n.jsxs("div",{className:`hlp-faq-item ${s===h?"open":""}`,children:[n.jsxs("button",{className:"hlp-faq-q",onClick:()=>d(s===h?null:h),children:[n.jsx("span",{className:"hlp-faq-q-text",children:g.q}),n.jsx(pa,{size:16,className:"hlp-faq-chevron"})]}),n.jsx("div",{className:"hlp-faq-a",children:n.jsx("div",{className:"hlp-faq-a-inner",children:g.a})})]},h))})]}),n.jsxs("div",{className:"hlp-animate hlp-animate-4",children:[n.jsx("div",{className:"hlp-section-title",children:"Hubungi Kami"}),n.jsxs("div",{className:"hlp-contact-grid",children:[n.jsxs("a",{href:"https://wa.me/6281234567890",target:"_blank",rel:"noreferrer",className:"hlp-contact-card",children:[n.jsx("div",{className:"hlp-contact-icon",style:{background:"rgba(37,211,102,0.1)"},children:n.jsx(A2,{size:20,color:"#25D366"})}),n.jsx("div",{className:"hlp-contact-name",children:"WhatsApp"}),n.jsx("div",{className:"hlp-contact-desc",children:"Chat langsung dengan tim support kami. Respons tercepat."}),n.jsxs("span",{className:"hlp-contact-tag",style:{background:"rgba(37,211,102,0.1)",color:"#25D366"},children:[n.jsx(pt,{size:11})," Online 24/7"]})]}),n.jsxs("a",{href:"mailto:cs@okegass.com",className:"hlp-contact-card",children:[n.jsx("div",{className:"hlp-contact-icon",style:{background:"rgba(59,130,246,0.1)"},children:n.jsx(R2,{size:20,color:"#3B82F6"})}),n.jsx("div",{className:"hlp-contact-name",children:"Email"}),n.jsx("div",{className:"hlp-contact-desc",children:"Kirim detail masalah kamu, kami balas dalam 1×24 jam."}),n.jsxs("span",{className:"hlp-contact-tag",style:{background:"rgba(59,130,246,0.1)",color:"#3B82F6"},children:[n.jsx(ha,{size:11})," cs@okegass.com"]})]}),n.jsxs("a",{href:"#",className:"hlp-contact-card",children:[n.jsx("div",{className:"hlp-contact-icon",style:{background:"rgba(220,38,38,0.1)"},children:n.jsx($l,{size:20,color:"#DC2626"})}),n.jsx("div",{className:"hlp-contact-name",children:"Live Chat"}),n.jsx("div",{className:"hlp-contact-desc",children:"Chat langsung di platform tanpa perlu keluar halaman."}),n.jsxs("span",{className:"hlp-contact-tag",style:{background:"rgba(220,38,38,0.1)",color:"#DC2626"},children:[n.jsx(hf,{size:11})," Buka Chat"]})]})]})]})]})]})}const e1="/assets/Telkomsel-C1jfNfPS.png",t1="/assets/xl-DA0pwWfo.png",r1="/assets/indosat-C2LpT6qh.png",n1="/assets/tri-__neCL8p.png",a1="/assets/smartfren-Da644JSu.png",i1="/assets/axis-BnlVCSgG.png",Rp=[{id:"telkomsel",label:"Telkomsel",color:"#EF4444",logo:e1},{id:"xl",label:"XL Axiata",color:"#3B82F6",logo:t1},{id:"indosat",label:"Indosat",color:"#F59E0B",logo:r1},{id:"tri",label:"Tri",color:"#8B5CF6",logo:n1},{id:"smartfren",label:"Smartfren",color:"#10B981",logo:a1},{id:"axis",label:"Axis",color:"#EC4899",logo:i1}],Pp=[{val:5e3,label:"Rp 5.000",price:6e3},{val:1e4,label:"Rp 10.000",price:11e3},{val:2e4,label:"Rp 20.000",price:21500},{val:25e3,label:"Rp 25.000",price:26500},{val:5e4,label:"Rp 50.000",price:52e3},{val:1e5,label:"Rp 100.000",price:103e3}],Gs=[{id:"d1",label:"1 GB / 7 hari",price:13e3,tag:"Populer"},{id:"d2",label:"2 GB / 30 hari",price:25e3,tag:""},{id:"d3",label:"5 GB / 30 hari",price:55e3,tag:"Hemat"},{id:"d4",label:"10 GB / 30 hari",price:95e3,tag:""},{id:"d5",label:"15 GB / 30 hari",price:13e4,tag:""},{id:"d6",label:"Unlimited 30 hr",price:16e4,tag:"Best Value"}],Lp=[{val:2e4,price:21500,label:"20.000 token"},{val:5e4,price:51500,label:"50.000 token"},{val:1e5,price:102e3,label:"100.000 token"},{val:2e5,price:202500,label:"200.000 token"},{val:5e5,price:503e3,label:"500.000 token"},{val:1e6,price:1004e3,label:"1.000.000 token"}],Fp=[{id:"gopay",label:"GoPay",color:"#00ADE0",logo:"💙"},{id:"ovo",label:"OVO",color:"#5A2D81",logo:"💜"},{id:"dana",label:"DANA",color:"#1189CC",logo:"💎"},{id:"shopeepay",label:"ShopeePay",color:"#EF4444",logo:"🧡"},{id:"linkaja",label:"LinkAja",color:"#E91E63",logo:"❤️"},{id:"jenius",label:"Jenius",color:"#0EA5E9",logo:"🔷"}],Tp=[{val:1e4,price:11500},{val:2e4,price:21500},{val:5e4,price:51500},{val:1e5,price:102e3},{val:2e5,price:202500},{val:5e5,price:502500}],zr=a=>"Rp "+a.toLocaleString("id-ID");function l1(){var O,pe,he,je;const[a]=uf(),o=Lr(),s=a.get("tab")||"pulsa",[d,p]=v.useState(s),[u,m]=v.useState("pulsa"),[g,h]=v.useState(""),[x,S]=v.useState(""),[b,N]=v.useState(null),[w,M]=v.useState(""),[A,_]=v.useState(""),[q,$]=v.useState(""),[J,ne]=v.useState(!1),[Q,Z]=v.useState(!1);v.useEffect(()=>{const z=a.get("tab");z&&["pulsa","pln","ewallet"].includes(z)&&p(z)},[a]);const j=()=>{h(""),S(""),N(null),M(""),_(""),$(""),ne(!1)},B=z=>{p(z),o(`/topup?tab=${z}`,{replace:!0}),j()},X=()=>d==="pulsa"&&u==="pulsa"?g&&b&&A.length>=10:d==="pulsa"&&u==="data"?g&&w&&A.length>=10:d==="pln"?b&&q.length>=11:d==="ewallet"?x&&b&&A.length>=10:!1,ye=()=>{X()&&(Z(!0),setTimeout(()=>{Z(!1),ne(!0)},1800))},ze=()=>{var z,te,Y,R;return d==="pulsa"&&u==="pulsa"&&b?((z=Pp.find(I=>I.val===b))==null?void 0:z.price)??0:d==="pulsa"&&u==="data"&&w?((te=Gs.find(I=>I.id===w))==null?void 0:te.price)??0:d==="pln"&&b?((Y=Lp.find(I=>I.val===b))==null?void 0:Y.price)??0:d==="ewallet"&&b?((R=Tp.find(I=>I.val===b))==null?void 0:R.price)??0:0},Re=[{id:"pulsa",label:"Pulsa & Data",icon:n.jsx(mc,{size:16,strokeWidth:1.8}),color:"#3B82F6"},{id:"pln",label:"Token PLN",icon:n.jsx(Qe,{size:16,strokeWidth:1.8}),color:"#F59E0B"},{id:"ewallet",label:"E-Wallet",icon:n.jsx(xa,{size:16,strokeWidth:1.8}),color:"#10B981"}],Ce=((O=Re.find(z=>z.id===d))==null?void 0:O.color)??"#DC2626";return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tp-root {
          min-height: 100vh;
          background: #080810;
          font-family: 'Barlow', sans-serif;
          color: #fff;
          padding-bottom: 80px;
        }

        /* ── hero banner ── */
        .tp-banner {
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, #0d0d18 0%, #0a0a12 100%);
          padding: 56px 24px 52px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .tp-banner::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: repeating-linear-gradient(58deg, transparent 0 50px, rgba(220,40,10,.018) 50px 51px);
        }
        .tp-banner-orb {
          position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
        }

        /* ── inner ── */
        .tp-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* ── tabs ── */
        .tp-tabs {
          display: flex; gap: 8px; flex-wrap: wrap;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px; padding: 6px;
          margin-bottom: 36px;
        }
        .tp-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 9px;
          font-size: 14px; font-weight: 700; letter-spacing: .04em;
          border: none; cursor: pointer; transition: all .22s ease;
          background: transparent; color: rgba(255,255,255,.4);
          font-family: 'Barlow', sans-serif;
          flex: 1; justify-content: center;
        }
        .tp-tab.active { color: #fff; }
        .tp-tab:not(.active):hover { background: rgba(255,255,255,.05); color: rgba(255,255,255,.7); }

        /* ── 2-col layout ── */
        .tp-layout {
          display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start;
        }
        @media (max-width: 900px) { .tp-layout { grid-template-columns: 1fr; } }

        /* ── card ── */
        .tp-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px; padding: 28px;
        }
        .tp-card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 700; letter-spacing: .04em;
          color: rgba(255,255,255,.9); margin-bottom: 22px;
        }

        /* ── section label ── */
        .tp-label {
          font-size: 11px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
          margin-bottom: 10px;
        }

        /* ── operator / ewallet grid ── */
        .tp-op-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 24px; }
        @media (max-width: 500px) { .tp-op-grid { grid-template-columns: repeat(2, 1fr); } }

        .tp-op-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 14px 8px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          cursor: pointer; transition: all .2s ease; color: rgba(255,255,255,.6);
          font-size: 12px; font-weight: 600; letter-spacing: .03em;
          font-family: 'Barlow', sans-serif;
        }
        .tp-op-btn.active { color: #fff; }
        .tp-op-btn:not(.active):hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
        .tp-op-logo {
          width: 42px;
          height: 42px;
          object-fit: contain;
          display: block;
        }
        /* ── sub-mode toggle ── */
        .tp-mode-toggle {
          display: flex; gap: 6px; margin-bottom: 22px;
          background: rgba(255,255,255,.04); border-radius: 9px; padding: 4px;
          border: 1px solid rgba(255,255,255,.06);
        }
        .tp-mode-btn {
          flex: 1; padding: 8px; border-radius: 6px;
          font-size: 13px; font-weight: 700; letter-spacing: .04em;
          border: none; cursor: pointer; transition: all .2s ease;
          background: transparent; color: rgba(255,255,255,.4);
          font-family: 'Barlow', sans-serif;
        }
        .tp-mode-btn.active { background: rgba(59,130,246,.2); color: #60A5FA; border: 1px solid rgba(59,130,246,.3); }

        /* ── nominal grid ── */
        .tp-nom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 24px; }
        @media (max-width: 500px) { .tp-nom-grid { grid-template-columns: repeat(2, 1fr); } }

        .tp-nom-btn {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 12px 6px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          cursor: pointer; transition: all .2s ease;
          font-family: 'Barlow', sans-serif; text-align: center;
          position: relative;
        }
        .tp-nom-btn.active { color: #fff; }
        .tp-nom-btn:not(.active):hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
        .tp-nom-val { font-size: 13px; font-weight: 700; }
        .tp-nom-price { font-size: 10px; color: rgba(255,255,255,.35); font-weight: 500; }
        .tp-nom-tag {
          position: absolute; top: -8px; left: 50%; transform: translateX(-50%);
          font-size: 9px; font-weight: 700; letter-spacing: .06em;
          padding: 2px 8px; border-radius: 4px; white-space: nowrap;
        }

        /* data package list */
        .tp-pkg-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .tp-pkg-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          cursor: pointer; transition: all .2s ease;
          font-family: 'Barlow', sans-serif;
        }
        .tp-pkg-btn.active { color: #fff; }
        .tp-pkg-btn:not(.active):hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
        .tp-pkg-name { font-size: 13px; font-weight: 700; }
        .tp-pkg-price { font-size: 13px; font-weight: 700; }
        .tp-pkg-tag {
          font-size: 9px; font-weight: 700; letter-spacing: .06em;
          padding: 2px 8px; border-radius: 4px; margin-left: 8px;
        }

        /* ── input ── */
        .tp-input-wrap { position: relative; margin-bottom: 20px; }
        .tp-input {
          width: 100%; padding: 13px 16px; border-radius: 10px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          color: #fff; font-size: 14px; font-weight: 500;
          font-family: 'Barlow', sans-serif; outline: none;
          transition: border-color .2s, background .2s;
        }
        .tp-input::placeholder { color: rgba(255,255,255,.25); }
        .tp-input:focus { border-color: rgba(255,255,255,.24); background: rgba(255,255,255,.07); }

        /* ── order summary card ── */
        .tp-summary {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px; padding: 24px;
          position: sticky; top: 88px;
        }
        .tp-sum-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: rgba(255,255,255,.5); margin-bottom: 10px;
        }
        .tp-sum-row.total {
          font-size: 15px; font-weight: 700; color: #fff;
          padding-top: 12px; border-top: 1px solid rgba(255,255,255,.07); margin-top: 4px;
        }
        .tp-sum-val { font-weight: 700; color: rgba(255,255,255,.85); }

        /* ── CTA button ── */
        .tp-cta {
          width: 100%; padding: 15px; border-radius: 11px;
          border: none; cursor: pointer;
          font-family: 'Rajdhani', sans-serif; font-size: 17px; font-weight: 700; letter-spacing: .06em;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all .22s ease; margin-top: 18px;
          position: relative; overflow: hidden;
        }
        .tp-cta:disabled { opacity: .45; cursor: not-allowed; }
        .tp-cta:not(:disabled):hover { transform: translateY(-1px); }
        .tp-cta::after {
          content:''; position:absolute; top:0; left:-60%; width:40%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          transform:skewX(-18deg); transition:left .45s;
        }
        .tp-cta:not(:disabled):hover::after { left:130%; }

        /* ── success screen ── */
        .tp-success {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 40px 20px; text-align: center;
        }

        /* ── spinner ── */
        @keyframes spin { to { transform: rotate(360deg); } }
        .tp-spinner {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          animation: spin .7s linear infinite;
        }

        /* ── trust pills ── */
        .tp-trust { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        .tp-trust-pill {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 100px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,.35); letter-spacing: .05em;
        }
      `}),n.jsxs("div",{className:"tp-root",children:[n.jsxs("div",{className:"tp-banner",children:[n.jsx("div",{className:"tp-banner-orb",style:{width:500,height:500,top:-100,right:-100,background:"rgba(220,38,38,.06)"}}),n.jsx("div",{className:"tp-banner-orb",style:{width:300,height:300,bottom:-80,left:-50,background:"rgba(59,130,246,.05)"}}),n.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",position:"relative"},children:[n.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(220,38,38,.1)",border:"1px solid rgba(220,38,38,.3)",borderRadius:6,padding:"4px 12px",marginBottom:14},children:[n.jsx(Qe,{size:11,color:"#DC2626",fill:"#DC2626"}),n.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#DC2626",textTransform:"uppercase"},children:"Layanan Digital"})]}),n.jsxs("h1",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(28px,5vw,48px)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.01em",marginBottom:10},children:["Top Up ",n.jsx("span",{style:{color:"#DC2626"},children:"Pulsa, Token & E-Wallet"})]}),n.jsx("p",{style:{fontSize:14,color:"rgba(255,255,255,.4)",maxWidth:520,lineHeight:1.65,marginBottom:24},children:"Proses instan, harga termurah, tersedia 24 jam. Pilih layanan yang kamu butuhkan."}),n.jsx("div",{className:"tp-trust",children:["⚡ Proses < 1 Menit","🔒 Transaksi Aman","💳 Semua Metode Bayar","⭐ 4.9 / 5 Rating"].map(z=>n.jsx("div",{className:"tp-trust-pill",children:z},z))})]})]}),n.jsxs("div",{className:"tp-inner",style:{marginTop:36},children:[n.jsx("div",{className:"tp-tabs",children:Re.map(z=>n.jsxs("button",{className:`tp-tab ${d===z.id?"active":""}`,style:d===z.id?{background:`${z.color}20`,border:`1px solid ${z.color}40`,color:z.color}:{},onClick:()=>B(z.id),children:[z.icon," ",z.label]},z.id))}),n.jsxs("div",{className:"tp-layout",children:[n.jsxs("div",{children:[d==="pulsa"&&n.jsxs("div",{className:"tp-card",children:[n.jsx("div",{className:"tp-card-title",children:"Pulsa & Paket Data"}),n.jsxs("div",{className:"tp-mode-toggle",children:[n.jsx("button",{className:`tp-mode-btn ${u==="pulsa"?"active":""}`,onClick:()=>m("pulsa"),children:"📶 Pulsa"}),n.jsx("button",{className:`tp-mode-btn ${u==="data"?"active":""}`,onClick:()=>m("data"),children:"📡 Paket Data"})]}),n.jsx("div",{className:"tp-label",children:"Pilih Operator"}),n.jsx("div",{className:"tp-op-grid",children:Rp.map(z=>n.jsxs("button",{className:`tp-op-btn ${g===z.id?"active":""}`,style:g===z.id?{borderColor:`${z.color}60`,background:`${z.color}15`,color:"#fff"}:{},onClick:()=>{h(z.id),N(null),M("")},children:[n.jsx("img",{src:z.logo,alt:z.label,className:"tp-op-logo"}),z.label]},z.id))}),u==="pulsa"?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tp-label",children:"Pilih Nominal"}),n.jsx("div",{className:"tp-nom-grid",children:Pp.map(z=>n.jsxs("button",{className:`tp-nom-btn ${b===z.val?"active":""}`,style:b===z.val?{borderColor:`${Ce}60`,background:`${Ce}15`}:{},onClick:()=>N(z.val),children:[n.jsx("span",{className:"tp-nom-val",children:z.label}),n.jsx("span",{className:"tp-nom-price",children:zr(z.price)})]},z.val))})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tp-label",children:"Pilih Paket Data"}),n.jsx("div",{className:"tp-pkg-list",children:Gs.map(z=>n.jsxs("button",{className:`tp-pkg-btn ${w===z.id?"active":""}`,style:w===z.id?{borderColor:`${Ce}60`,background:`${Ce}15`}:{},onClick:()=>M(z.id),children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{className:"tp-pkg-name",children:z.label}),z.tag&&n.jsx("span",{className:"tp-pkg-tag",style:{background:`${Ce}20`,color:Ce,border:`1px solid ${Ce}40`},children:z.tag})]}),n.jsx("span",{className:"tp-pkg-price",style:w===z.id?{color:Ce}:{color:"rgba(255,255,255,.5)"},children:zr(z.price)})]},z.id))})]}),n.jsx("div",{className:"tp-label",children:"Nomor HP"}),n.jsx("div",{className:"tp-input-wrap",children:n.jsx("input",{className:"tp-input",type:"tel",placeholder:"Contoh: 08123456789",value:A,onChange:z=>_(z.target.value.replace(/\D/g,"")),maxLength:14})})]}),d==="pln"&&n.jsxs("div",{className:"tp-card",children:[n.jsx("div",{className:"tp-card-title",children:"Token Listrik PLN"}),n.jsx("div",{className:"tp-label",children:"Nomor Meter / ID Pelanggan"}),n.jsx("div",{className:"tp-input-wrap",children:n.jsx("input",{className:"tp-input",type:"text",placeholder:"Contoh: 12345678910",value:q,onChange:z=>$(z.target.value.replace(/\D/g,"")),maxLength:13,style:{borderColor:q.length>=11?"rgba(245,158,11,.4)":void 0}})}),n.jsx("div",{className:"tp-label",children:"Pilih Nominal Token"}),n.jsx("div",{className:"tp-nom-grid",children:Lp.map(z=>n.jsxs("button",{className:`tp-nom-btn ${b===z.val?"active":""}`,style:b===z.val?{borderColor:"rgba(245,158,11,.6)",background:"rgba(245,158,11,.15)"}:{},onClick:()=>N(z.val),children:[n.jsx("span",{className:"tp-nom-val",style:b===z.val?{color:"#F59E0B"}:{},children:zr(z.val)}),n.jsx("span",{className:"tp-nom-price",children:z.label})]},z.val))}),n.jsx("div",{style:{padding:"12px 14px",borderRadius:10,marginTop:4,background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.2)",fontSize:12,color:"rgba(245,158,11,.8)",lineHeight:1.6},children:"💡 Token akan dikirim ke nomor HP yang terdaftar di PLN dan ditampilkan di layar ini setelah pembayaran berhasil."})]}),d==="ewallet"&&n.jsxs("div",{className:"tp-card",children:[n.jsx("div",{className:"tp-card-title",children:"Top Up E-Wallet"}),n.jsx("div",{className:"tp-label",children:"Pilih E-Wallet"}),n.jsx("div",{className:"tp-op-grid",children:Fp.map(z=>n.jsxs("button",{className:`tp-op-btn ${x===z.id?"active":""}`,style:x===z.id?{borderColor:`${z.color}60`,background:`${z.color}15`,color:"#fff"}:{},onClick:()=>{S(z.id),N(null)},children:[n.jsx("span",{className:"tp-op-logo",children:z.logo}),z.label]},z.id))}),n.jsx("div",{className:"tp-label",children:"Pilih Nominal"}),n.jsx("div",{className:"tp-nom-grid",children:Tp.map(z=>n.jsxs("button",{className:`tp-nom-btn ${b===z.val?"active":""}`,style:b===z.val?{borderColor:`${Ce}60`,background:`${Ce}15`}:{},onClick:()=>N(z.val),children:[n.jsx("span",{className:"tp-nom-val",style:b===z.val?{color:Ce}:{},children:zr(z.val)}),n.jsx("span",{className:"tp-nom-price",children:zr(z.price)})]},z.val))}),n.jsx("div",{className:"tp-label",children:"Nomor HP / Akun E-Wallet"}),n.jsx("div",{className:"tp-input-wrap",children:n.jsx("input",{className:"tp-input",type:"tel",placeholder:"Contoh: 08123456789",value:A,onChange:z=>_(z.target.value.replace(/\D/g,"")),maxLength:14})})]})]}),n.jsx("div",{children:J?n.jsx("div",{className:"tp-summary",children:n.jsxs("div",{className:"tp-success",children:[n.jsx(i2,{size:56,color:"#10B981"}),n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:"#10B981"},children:"Pesanan Berhasil!"}),n.jsx("p",{style:{fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.65},children:"Transaksi sedang diproses. Token / saldo akan masuk dalam beberapa detik."}),n.jsx("button",{className:"tp-cta",style:{background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.35)",color:"#10B981",marginTop:8},onClick:j,children:"Transaksi Baru"})]})}):n.jsxs("div",{className:"tp-summary",children:[n.jsx("div",{style:{fontFamily:"'Rajdhani',sans-serif",fontSize:17,fontWeight:700,marginBottom:20,color:"rgba(255,255,255,.9)"},children:"Ringkasan Pesanan"}),d==="pulsa"&&g&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"Operator"}),n.jsx("span",{className:"tp-sum-val",children:(pe=Rp.find(z=>z.id===g))==null?void 0:pe.label})]}),d==="pulsa"&&u==="pulsa"&&b&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"Nominal"}),n.jsx("span",{className:"tp-sum-val",children:zr(b)})]}),d==="pulsa"&&u==="data"&&w&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"Paket"}),n.jsx("span",{className:"tp-sum-val",children:(he=Gs.find(z=>z.id===w))==null?void 0:he.label})]}),d==="pln"&&q&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"No. Meter"}),n.jsx("span",{className:"tp-sum-val",children:q})]}),d==="pln"&&b&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"Token"}),n.jsx("span",{className:"tp-sum-val",children:zr(b)})]}),d==="ewallet"&&x&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"E-Wallet"}),n.jsx("span",{className:"tp-sum-val",children:(je=Fp.find(z=>z.id===x))==null?void 0:je.label})]}),d==="ewallet"&&b&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"Nominal"}),n.jsx("span",{className:"tp-sum-val",children:zr(b)})]}),(A||q)&&n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:d==="pln"?"No. Meter":"No. HP"}),n.jsx("span",{className:"tp-sum-val",children:d==="pln"?q:A})]}),ze()>0&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"tp-sum-row",children:[n.jsx("span",{children:"Biaya Admin"}),n.jsx("span",{className:"tp-sum-val",style:{color:"rgba(255,255,255,.4)"},children:"Gratis"})]}),n.jsxs("div",{className:"tp-sum-row total",children:[n.jsx("span",{children:"Total Bayar"}),n.jsx("span",{style:{color:Ce,fontFamily:"'Rajdhani',sans-serif",fontSize:18},children:zr(ze())})]})]}),!ze()&&n.jsxs("div",{style:{textAlign:"center",padding:"28px 0",fontSize:13,color:"rgba(255,255,255,.2)"},children:["Pilih layanan & nominal",n.jsx("br",{}),"untuk melihat ringkasan"]}),n.jsx("button",{className:"tp-cta",disabled:!X()||Q,style:{background:X()?`linear-gradient(135deg, ${Ce}cc, ${Ce}88)`:"rgba(255,255,255,.06)",border:X()?`1px solid ${Ce}60`:"1px solid rgba(255,255,255,.08)",color:X()?"#fff":"rgba(255,255,255,.25)"},onClick:ye,children:Q?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tp-spinner"})," Memproses..."]}):n.jsxs(n.Fragment,{children:["Bayar Sekarang ",n.jsx(mr,{size:16})]})}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7,marginTop:18},children:["🔒 Transaksi terenkripsi SSL","⚡ Proses otomatis real-time","💳 Bayar pakai semua metode"].map(z=>n.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.25)",display:"flex",alignItems:"center",gap:6},children:z},z))})]})})]})]})]})]})}const o1=Ph([{path:"/",Component:h5,children:[{index:!0,Component:D5},{path:"topup",Component:A5},{path:"marketplace",Component:W5},{path:"marketplace/sell",Component:G5},{path:"profile",Component:q5},{path:"bantuan",Component:Z5},{path:"layanandigital",Component:l1}]}]);function s1(){return n.jsx(th,{router:o1})}fm.createRoot(document.getElementById("root")).render(n.jsx(s1,{}));
