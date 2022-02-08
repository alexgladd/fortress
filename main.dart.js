(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q))b[q]=a[q]}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(r.__proto__&&r.__proto__.p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function setFunctionNamesIfNecessary(a){function t(){};if(typeof t.name=="string")return
for(var s=0;s<a.length;s++){var r=a[s]
var q=Object.keys(r)
for(var p=0;p<q.length;p++){var o=q[p]
var n=r[o]
if(typeof n=="function")n.name=o}}}function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){a.prototype.__proto__=b.prototype
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++)inherit(b[s],a)}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazyOld(a,b,c,d){var s=a
a[b]=s
a[c]=function(){a[c]=function(){A.jL(b)}
var r
var q=d
try{if(a[b]===s){r=a[b]=q
r=a[b]=d()}else r=a[b]}finally{if(r===q)a[b]=null
a[c]=function(){return this[b]}}return r}}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s)a[b]=d()
a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s)A.jM(b)
a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s)convertToFastObject(a[s])}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.ff(b)
return new s(c,this)}:function(){if(s===null)s=A.ff(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.ff(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number")h+=x
return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,lazyOld:lazyOld,updateHolder:updateHolder,convertToFastObject:convertToFastObject,setFunctionNamesIfNecessary:setFunctionNamesIfNecessary,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var A={eU:function eU(){},
fF(a){return new A.aU("Field '"+a+"' has not been initialized.")},
fS(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
iq(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
ex(a,b,c){return a},
ip(a,b,c,d){A.b_(b,"start")
if(c!=null){A.b_(c,"end")
if(b>c)A.ah(A.X(b,0,c,"start",null))}return new A.bK(a,b,c,d.h("bK<0>"))},
fI(a,b,c,d){if(t.X.b(a))return new A.bi(a,b,c.h("@<0>").B(d).h("bi<1,2>"))
return new A.a8(a,b,c.h("@<0>").B(d).h("a8<1,2>"))},
ir(a,b,c){var s="takeCount"
A.eN(b,s,t.S)
A.b_(b,s)
if(t.X.b(a))return new A.bk(a,b,c.h("bk<0>"))
return new A.aF(a,b,c.h("aF<0>"))},
io(a,b,c){var s="count"
if(t.X.b(a)){A.eN(b,s,t.S)
A.b_(b,s)
return new A.bj(a,b,c.h("bj<0>"))}A.eN(b,s,t.S)
A.b_(b,s)
return new A.aE(a,b,c.h("aE<0>"))},
eS(){return new A.bG("No element")},
aU:function aU(a){this.a=a},
eI:function eI(){},
dK:function dK(){},
o:function o(){},
aB:function aB(){},
bK:function bK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aC:function aC(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
a8:function a8(a,b,c){this.a=a
this.b=b
this.$ti=c},
bi:function bi(a,b,c){this.a=a
this.b=b
this.$ti=c},
bz:function bz(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
bO:function bO(a,b,c){this.a=a
this.b=b
this.$ti=c},
aH:function aH(a,b,c){this.a=a
this.b=b
this.$ti=c},
aF:function aF(a,b,c){this.a=a
this.b=b
this.$ti=c},
bk:function bk(a,b,c){this.a=a
this.b=b
this.$ti=c},
bL:function bL(a,b,c){this.a=a
this.b=b
this.$ti=c},
aE:function aE(a,b,c){this.a=a
this.b=b
this.$ti=c},
bj:function bj(a,b,c){this.a=a
this.b=b
this.$ti=c},
bE:function bE(a,b,c){this.a=a
this.b=b
this.$ti=c},
hY(a){if(typeof a=="number")return B.c.gl(a)
if(t.bv.b(a))return A.aY(a)
return A.eJ(a)},
hZ(a){return new A.dn(a)},
hn(a){var s,r=v.mangledGlobalNames[a]
if(r!=null)return r
s="minified:"+a
return s},
jC(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.da.b(a)},
u(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.dc(a)
return s},
aY(a){var s,r,q=$.fM
if(q==null){s=Symbol("identityHashCode")
q=$.fM=s}r=a[q]
if(r==null){r=Math.random()*0x3fffffff|0
a[q]=r}return r},
dG(a){return A.i8(a)},
i8(a){var s,r,q,p,o
if(a instanceof A.j)return A.K(A.N(a),null)
s=J.ba(a)
if(s===B.au||s===B.aw||t.cr.b(a)){r=B.F(a)
q=r!=="Object"&&r!==""
if(q)return r
p=a.constructor
if(typeof p=="function"){o=p.name
if(typeof o=="string")q=o!=="Object"&&o!==""
else q=!1
if(q)return o}}return A.K(A.N(a),null)},
i9(){return Date.now()},
ii(){var s,r
if($.dH!==0)return
$.dH=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.dH=1e6
$.bC=new A.dF(r)},
eX(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.a.aI(s,10)|55296)>>>0,s&1023|56320)}throw A.a(A.X(a,0,1114111,null,null))},
aX(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
ih(a){var s=A.aX(a).getFullYear()+0
return s},
ie(a){var s=A.aX(a).getMonth()+1
return s},
ia(a){var s=A.aX(a).getDate()+0
return s},
ib(a){var s=A.aX(a).getHours()+0
return s},
id(a){var s=A.aX(a).getMinutes()+0
return s},
ig(a){var s=A.aX(a).getSeconds()+0
return s},
ic(a){var s=A.aX(a).getMilliseconds()+0
return s},
i(a,b){if(a==null)J.ak(a)
throw A.a(A.d7(a,b))},
d7(a,b){var s,r="index",q=null
if(!A.f9(b))return new A.a4(!0,b,r,q)
s=A.d6(J.ak(a))
if(b<0||b>=s)return A.cp(b,a,r,q,s)
return new A.aZ(q,q,!0,b,r,"Value not in range")},
jo(a){return new A.a4(!0,a,null,null)},
a(a){var s,r
if(a==null)a=new A.cz()
s=new Error()
s.dartException=a
r=A.jN
if("defineProperty" in Object){Object.defineProperty(s,"message",{get:r})
s.name=""}else s.toString=r
return s},
jN(){return J.dc(this.dartException)},
ah(a){throw A.a(a)},
aL(a){throw A.a(A.aO(a))},
ac(a){var s,r,q,p,o,n
a=A.jI(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.n([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.dT(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
dU(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
fU(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
eV(a,b){var s=b==null,r=s?null:b.method
return new A.ct(a,r,s?null:b.receiver)},
ai(a){if(a==null)return new A.dE(a)
if(a instanceof A.bl)return A.ax(a,t.K.a(a.a))
if(typeof a!=="object")return a
if("dartException" in a)return A.ax(a,a.dartException)
return A.jn(a)},
ax(a,b){if(t.R.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
jn(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.a.aI(r,16)&8191)===10)switch(q){case 438:return A.ax(a,A.eV(A.u(s)+" (Error "+q+")",e))
case 445:case 5007:p=A.u(s)+" (Error "+q+")"
return A.ax(a,new A.bB(p,e))}}if(a instanceof TypeError){o=$.hv()
n=$.hw()
m=$.hx()
l=$.hy()
k=$.hB()
j=$.hC()
i=$.hA()
$.hz()
h=$.hE()
g=$.hD()
f=o.P(s)
if(f!=null)return A.ax(a,A.eV(A.aK(s),f))
else{f=n.P(s)
if(f!=null){f.method="call"
return A.ax(a,A.eV(A.aK(s),f))}else{f=m.P(s)
if(f==null){f=l.P(s)
if(f==null){f=k.P(s)
if(f==null){f=j.P(s)
if(f==null){f=i.P(s)
if(f==null){f=l.P(s)
if(f==null){f=h.P(s)
if(f==null){f=g.P(s)
p=f!=null}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0
if(p){A.aK(s)
return A.ax(a,new A.bB(s,f==null?e:f.method))}}}return A.ax(a,new A.cK(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bF()
s=function(b){try{return String(b)}catch(d){}return null}(a)
return A.ax(a,new A.a4(!1,e,e,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bF()
return a},
af(a){var s
if(a instanceof A.bl)return a.b
if(a==null)return new A.bT(a)
s=a.$cachedTrace
if(s!=null)return s
return a.$cachedTrace=new A.bT(a)},
eJ(a){if(a==null||typeof a!="object")return J.fp(a)
else return A.aY(a)},
hf(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.H(0,a[s],a[r])}return b},
jB(a,b,c,d,e,f){t.a.a(a)
switch(A.d6(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.a(new A.e2("Unsupported number of arguments for wrapped closure"))},
b9(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.jB)
a.$identity=s
return s},
hT(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cG().constructor.prototype):Object.create(new A.aN(null,null).constructor.prototype)
s.$initialize=s.constructor
if(h)r=function static_tear_off(){this.$initialize()}
else r=function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.fA(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.hP(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.fA(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
hP(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.a("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.hM)}throw A.a("Error in functionType of tearoff")},
hQ(a,b,c,d){var s=A.fx
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
fA(a,b,c,d){var s,r
if(c)return A.hS(a,b,d)
s=b.length
r=A.hQ(s,d,a,b)
return r},
hR(a,b,c,d){var s=A.fx,r=A.hN
switch(b?-1:a){case 0:throw A.a(new A.cE("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
hS(a,b,c){var s,r,q,p=$.fv
p==null?$.fv=A.fu("interceptor"):p
s=$.fw
s==null?$.fw=A.fu("receiver"):s
r=b.length
q=A.hR(r,c,a,b)
return q},
ff(a){return A.hT(a)},
hM(a,b){return A.em(v.typeUniverse,A.N(a.a),b)},
fx(a){return a.a},
hN(a){return a.b},
fu(a){var s,r,q,p=new A.aN("receiver","interceptor"),o=J.eT(Object.getOwnPropertyNames(p),t.Q)
for(s=o.length,r=0;r<s;++r){q=o[r]
if(p[q]===a)return q}throw A.a(A.c8("Field name "+a+" not found.",null))},
c2(a){if(a==null)A.jp("boolean expression must not be null")
return a},
jp(a){throw A.a(new A.cN(a))},
jL(a){throw A.a(new A.cd(a))},
jv(a){return v.getIsolateTag(a)},
kB(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jE(a){var s,r,q,p,o,n=A.aK($.hh.$1(a)),m=$.ey[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.eE[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.iS($.hd.$2(a,n))
if(q!=null){m=$.ey[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.eE[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.eG(s)
$.ey[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.eE[n]=s
return s}if(p==="-"){o=A.eG(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.hl(a,s)
if(p==="*")throw A.a(A.eY(n))
if(v.leafTags[n]===true){o=A.eG(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.hl(a,s)},
hl(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.fk(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
eG(a){return J.fk(a,!1,null,!!a.$ics)},
jF(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.eG(s)
else return J.fk(s,c,null,null)},
jy(){if(!0===$.fj)return
$.fj=!0
A.jz()},
jz(){var s,r,q,p,o,n,m,l
$.ey=Object.create(null)
$.eE=Object.create(null)
A.jx()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.hm.$1(o)
if(n!=null){m=A.jF(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
jx(){var s,r,q,p,o,n,m=B.ab()
m=A.b8(B.ac,A.b8(B.ad,A.b8(B.G,A.b8(B.G,A.b8(B.ae,A.b8(B.af,A.b8(B.ag(B.F),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(s.constructor==Array)for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.hh=new A.eB(p)
$.hd=new A.eC(o)
$.hm=new A.eD(n)},
b8(a,b){return a(b)||b},
jK(a,b,c){var s=a.indexOf(b,c)
return s>=0},
jI(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aP:function aP(){},
bg:function bg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
dh:function dh(a){this.a=a},
bm:function bm(a,b){this.a=a
this.$ti=b},
dn:function dn(a){this.a=a},
bn:function bn(){},
bo:function bo(a,b){this.a=a
this.$ti=b},
dF:function dF(a){this.a=a},
dT:function dT(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bB:function bB(a,b){this.a=a
this.b=b},
ct:function ct(a,b,c){this.a=a
this.b=b
this.c=c},
cK:function cK(a){this.a=a},
dE:function dE(a){this.a=a},
bl:function bl(a,b){this.a=a
this.b=b},
bT:function bT(a){this.a=a
this.b=null},
I:function I(){},
ca:function ca(){},
cb:function cb(){},
cI:function cI(){},
cG:function cG(){},
aN:function aN(a,b){this.a=a
this.b=b},
cE:function cE(a){this.a=a},
cN:function cN(a){this.a=a},
W:function W(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ds:function ds(a){this.a=a},
du:function du(a,b){this.a=a
this.b=b
this.c=null},
bu:function bu(a,b){this.a=a
this.$ti=b},
bv:function bv(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
eB:function eB(a){this.a=a},
eC:function eC(a){this.a=a},
eD:function eD(a){this.a=a},
jM(a){return A.ah(new A.aU("Field '"+a+"' has been assigned during initialization."))},
iw(a){var s=new A.dZ(a)
return s.b=s},
fb(a,b){if(a===$)throw A.a(A.fF(b))
return a},
dZ:function dZ(a){this.a=a
this.b=null},
fP(a,b){var s=b.c
return s==null?b.c=A.f2(a,b.z,!0):s},
fO(a,b){var s=b.c
return s==null?b.c=A.bX(a,"T",[b.z]):s},
fQ(a){var s=a.y
if(s===6||s===7||s===8)return A.fQ(a.z)
return s===11||s===12},
im(a){return a.cy},
aw(a){return A.d5(v.typeUniverse,a,!1)},
jA(a,b){var s,r,q,p,o
if(a==null)return null
s=b.Q
r=a.cx
if(r==null)r=a.cx=new Map()
q=b.cy
p=r.get(q)
if(p!=null)return p
o=A.ae(v.typeUniverse,a.z,s,0)
r.set(q,o)
return o},
ae(a,b,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.y
switch(c){case 5:case 1:case 2:case 3:case 4:return b
case 6:s=b.z
r=A.ae(a,s,a0,a1)
if(r===s)return b
return A.h2(a,r,!0)
case 7:s=b.z
r=A.ae(a,s,a0,a1)
if(r===s)return b
return A.f2(a,r,!0)
case 8:s=b.z
r=A.ae(a,s,a0,a1)
if(r===s)return b
return A.h1(a,r,!0)
case 9:q=b.Q
p=A.c1(a,q,a0,a1)
if(p===q)return b
return A.bX(a,b.z,p)
case 10:o=b.z
n=A.ae(a,o,a0,a1)
m=b.Q
l=A.c1(a,m,a0,a1)
if(n===o&&l===m)return b
return A.f0(a,n,l)
case 11:k=b.z
j=A.ae(a,k,a0,a1)
i=b.Q
h=A.jk(a,i,a0,a1)
if(j===k&&h===i)return b
return A.h0(a,j,h)
case 12:g=b.Q
a1+=g.length
f=A.c1(a,g,a0,a1)
o=b.z
n=A.ae(a,o,a0,a1)
if(f===g&&n===o)return b
return A.f1(a,n,f,!0)
case 13:e=b.z
if(e<a1)return b
d=a0[e-a1]
if(d==null)return b
return d
default:throw A.a(A.dd("Attempted to substitute unexpected RTI kind "+c))}},
c1(a,b,c,d){var s,r,q,p,o=b.length,n=A.en(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.ae(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
jl(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.en(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.ae(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
jk(a,b,c,d){var s,r=b.a,q=A.c1(a,r,c,d),p=b.b,o=A.c1(a,p,c,d),n=b.c,m=A.jl(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.cV()
s.a=q
s.b=o
s.c=m
return s},
n(a,b){a[v.arrayRti]=b
return a},
fg(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.jw(s)
return a.$S()}return null},
hi(a,b){var s
if(A.fQ(b))if(a instanceof A.I){s=A.fg(a)
if(s!=null)return s}return A.N(a)},
N(a){var s
if(a instanceof A.j){s=a.$ti
return s!=null?s:A.f7(a)}if(Array.isArray(a))return A.P(a)
return A.f7(J.ba(a))},
P(a){var s=a[v.arrayRti],r=t.ce
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
v(a){var s=a.$ti
return s!=null?s:A.f7(a)},
f7(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.j2(a,s)},
j2(a,b){var s=a instanceof A.I?a.__proto__.__proto__.constructor:b,r=A.iO(v.typeUniverse,s.name)
b.$ccache=r
return r},
jw(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.d5(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
fi(a){var s=a instanceof A.I?A.fg(a):null
return A.fh(s==null?A.N(a):s)},
fh(a){var s,r,q,p=a.x
if(p!=null)return p
s=a.cy
r=s.replace(/\*/g,"")
if(r===s)return a.x=new A.bV(a)
q=A.d5(v.typeUniverse,r,!0)
p=q.x
return a.x=p==null?q.x=new A.bV(q):p},
jO(a){return A.fh(A.d5(v.typeUniverse,a,!1))},
j1(a){var s,r,q,p,o=this
if(o===t.K)return A.b5(o,a,A.j6)
if(!A.ag(o))if(!(o===t._))s=!1
else s=!0
else s=!0
if(s)return A.b5(o,a,A.j9)
s=o.y
r=s===6?o.z:o
if(r===t.S)q=A.f9
else if(r===t.i||r===t.p)q=A.j5
else if(r===t.N)q=A.j7
else q=r===t.w?A.h7:null
if(q!=null)return A.b5(o,a,q)
if(r.y===9){p=r.z
if(r.Q.every(A.jD)){o.r="$i"+p
if(p==="D")return A.b5(o,a,A.j4)
return A.b5(o,a,A.j8)}}else if(s===7)return A.b5(o,a,A.j_)
return A.b5(o,a,A.iY)},
b5(a,b,c){a.b=c
return a.b(b)},
j0(a){var s,r=this,q=A.iX
if(!A.ag(r))if(!(r===t._))s=!1
else s=!0
else s=!0
if(s)q=A.iT
else if(r===t.K)q=A.iR
else{s=A.c4(r)
if(s)q=A.iZ}r.a=q
return r.a(a)},
er(a){var s,r=a.y
if(!A.ag(a))if(!(a===t._))if(!(a===t.J))if(r!==7)s=r===8&&A.er(a.z)||a===t.P||a===t.T
else s=!0
else s=!0
else s=!0
else s=!0
return s},
iY(a){var s=this
if(a==null)return A.er(s)
return A.y(v.typeUniverse,A.hi(a,s),null,s,null)},
j_(a){if(a==null)return!0
return this.z.b(a)},
j8(a){var s,r=this
if(a==null)return A.er(r)
s=r.r
if(a instanceof A.j)return!!a[s]
return!!J.ba(a)[s]},
j4(a){var s,r=this
if(a==null)return A.er(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.r
if(a instanceof A.j)return!!a[s]
return!!J.ba(a)[s]},
iX(a){var s,r=this
if(a==null){s=A.c4(r)
if(s)return a}else if(r.b(a))return a
A.h5(a,r)},
iZ(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.h5(a,s)},
h5(a,b){throw A.a(A.h_(A.fW(a,A.hi(a,b),A.K(b,null))))},
jt(a,b,c,d){var s=null
if(A.y(v.typeUniverse,a,s,b,s))return a
throw A.a(A.h_("The type argument '"+A.K(a,s)+"' is not a subtype of the type variable bound '"+A.K(b,s)+"' of type variable '"+c+"' in '"+d+"'."))},
fW(a,b,c){var s=A.ci(a),r=A.K(b==null?A.N(a):b,null)
return s+": type '"+r+"' is not a subtype of type '"+c+"'"},
h_(a){return new A.bW("TypeError: "+a)},
J(a,b){return new A.bW("TypeError: "+A.fW(a,null,b))},
j6(a){return a!=null},
iR(a){if(a!=null)return a
throw A.a(A.J(a,"Object"))},
j9(a){return!0},
iT(a){return a},
h7(a){return!0===a||!1===a},
kn(a){if(!0===a)return!0
if(!1===a)return!1
throw A.a(A.J(a,"bool"))},
kp(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.a(A.J(a,"bool"))},
ko(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.a(A.J(a,"bool?"))},
kq(a){if(typeof a=="number")return a
throw A.a(A.J(a,"double"))},
ks(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.J(a,"double"))},
kr(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.J(a,"double?"))},
f9(a){return typeof a=="number"&&Math.floor(a)===a},
d6(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.a(A.J(a,"int"))},
ku(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.a(A.J(a,"int"))},
kt(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.a(A.J(a,"int?"))},
j5(a){return typeof a=="number"},
iQ(a){if(typeof a=="number")return a
throw A.a(A.J(a,"num"))},
kw(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.J(a,"num"))},
kv(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.J(a,"num?"))},
j7(a){return typeof a=="string"},
aK(a){if(typeof a=="string")return a
throw A.a(A.J(a,"String"))},
kx(a){if(typeof a=="string")return a
if(a==null)return a
throw A.a(A.J(a,"String"))},
iS(a){if(typeof a=="string")return a
if(a==null)return a
throw A.a(A.J(a,"String?"))},
jh(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.K(a[q],b)
return s},
h6(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=", "
if(a6!=null){s=a6.length
if(a5==null){a5=A.n([],t.s)
r=null}else r=a5.length
q=a5.length
for(p=s;p>0;--p)B.b.F(a5,"T"+(q+p))
for(o=t.Q,n=t._,m="<",l="",p=0;p<s;++p,l=a3){m+=l
k=a5.length
j=k-1-p
if(!(j>=0))return A.i(a5,j)
m=B.l.Z(m,a5[j])
i=a6[p]
h=i.y
if(!(h===2||h===3||h===4||h===5||i===o))if(!(i===n))k=!1
else k=!0
else k=!0
if(!k)m+=" extends "+A.K(i,a5)}m+=">"}else{m=""
r=null}o=a4.z
g=a4.Q
f=g.a
e=f.length
d=g.b
c=d.length
b=g.c
a=b.length
a0=A.K(o,a5)
for(a1="",a2="",p=0;p<e;++p,a2=a3)a1+=a2+A.K(f[p],a5)
if(c>0){a1+=a2+"["
for(a2="",p=0;p<c;++p,a2=a3)a1+=a2+A.K(d[p],a5)
a1+="]"}if(a>0){a1+=a2+"{"
for(a2="",p=0;p<a;p+=3,a2=a3){a1+=a2
if(b[p+1])a1+="required "
a1+=A.K(b[p+2],a5)+" "+b[p]}a1+="}"}if(r!=null){a5.toString
a5.length=r}return m+"("+a1+") => "+a0},
K(a,b){var s,r,q,p,o,n,m,l=a.y
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=A.K(a.z,b)
return s}if(l===7){r=a.z
s=A.K(r,b)
q=r.y
return(q===11||q===12?"("+s+")":s)+"?"}if(l===8)return"FutureOr<"+A.K(a.z,b)+">"
if(l===9){p=A.jm(a.z)
o=a.Q
return o.length>0?p+("<"+A.jh(o,b)+">"):p}if(l===11)return A.h6(a,b,null)
if(l===12)return A.h6(a.z,b,a.Q)
if(l===13){n=a.z
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.i(b,n)
return b[n]}return"?"},
jm(a){var s,r=v.mangledGlobalNames[a]
if(r!=null)return r
s="minified:"+a
return s},
iP(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
iO(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.d5(a,b,!1)
else if(typeof m=="number"){s=m
r=A.bY(a,5,"#")
q=A.en(s)
for(p=0;p<s;++p)q[p]=r
o=A.bX(a,b,q)
n[b]=o
return o}else return m},
iM(a,b){return A.h3(a.tR,b)},
iL(a,b){return A.h3(a.eT,b)},
d5(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.fZ(A.fX(a,null,b,c))
r.set(b,s)
return s},
em(a,b,c){var s,r,q=b.ch
if(q==null)q=b.ch=new Map()
s=q.get(c)
if(s!=null)return s
r=A.fZ(A.fX(a,b,c,!0))
q.set(c,r)
return r},
iN(a,b,c){var s,r,q,p=b.cx
if(p==null)p=b.cx=new Map()
s=c.cy
r=p.get(s)
if(r!=null)return r
q=A.f0(a,b,c.y===10?c.Q:[c])
p.set(s,q)
return q},
av(a,b){b.a=A.j0
b.b=A.j1
return b},
bY(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.Y(null,null)
s.y=b
s.cy=c
r=A.av(a,s)
a.eC.set(c,r)
return r},
h2(a,b,c){var s,r=b.cy+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.iJ(a,b,r,c)
a.eC.set(r,s)
return s},
iJ(a,b,c,d){var s,r,q
if(d){s=b.y
if(!A.ag(b))r=b===t.P||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.Y(null,null)
q.y=6
q.z=b
q.cy=c
return A.av(a,q)},
f2(a,b,c){var s,r=b.cy+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.iI(a,b,r,c)
a.eC.set(r,s)
return s},
iI(a,b,c,d){var s,r,q,p
if(d){s=b.y
if(!A.ag(b))if(!(b===t.P||b===t.T))if(s!==7)r=s===8&&A.c4(b.z)
else r=!0
else r=!0
else r=!0
if(r)return b
else if(s===1||b===t.J)return t.P
else if(s===6){q=b.z
if(q.y===8&&A.c4(q.z))return q
else return A.fP(a,b)}}p=new A.Y(null,null)
p.y=7
p.z=b
p.cy=c
return A.av(a,p)},
h1(a,b,c){var s,r=b.cy+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.iG(a,b,r,c)
a.eC.set(r,s)
return s},
iG(a,b,c,d){var s,r,q
if(d){s=b.y
if(!A.ag(b))if(!(b===t._))r=!1
else r=!0
else r=!0
if(r||b===t.K)return b
else if(s===1)return A.bX(a,"T",[b])
else if(b===t.P||b===t.T)return t.bc}q=new A.Y(null,null)
q.y=8
q.z=b
q.cy=c
return A.av(a,q)},
iK(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.Y(null,null)
s.y=13
s.z=b
s.cy=q
r=A.av(a,s)
a.eC.set(q,r)
return r},
d4(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].cy
return s},
iF(a){var s,r,q,p,o,n,m=a.length
for(s="",r="",q=0;q<m;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
n=a[q+2].cy
s+=r+p+o+n}return s},
bX(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.d4(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.Y(null,null)
r.y=9
r.z=b
r.Q=c
if(c.length>0)r.c=c[0]
r.cy=p
q=A.av(a,r)
a.eC.set(p,q)
return q},
f0(a,b,c){var s,r,q,p,o,n
if(b.y===10){s=b.z
r=b.Q.concat(c)}else{r=c
s=b}q=s.cy+(";<"+A.d4(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.Y(null,null)
o.y=10
o.z=s
o.Q=r
o.cy=q
n=A.av(a,o)
a.eC.set(q,n)
return n},
h0(a,b,c){var s,r,q,p,o,n=b.cy,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.d4(m)
if(j>0){s=l>0?",":""
r=A.d4(k)
g+=s+"["+r+"]"}if(h>0){s=l>0?",":""
r=A.iF(i)
g+=s+"{"+r+"}"}q=n+(g+")")
p=a.eC.get(q)
if(p!=null)return p
o=new A.Y(null,null)
o.y=11
o.z=b
o.Q=c
o.cy=q
r=A.av(a,o)
a.eC.set(q,r)
return r},
f1(a,b,c,d){var s,r=b.cy+("<"+A.d4(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.iH(a,b,c,r,d)
a.eC.set(r,s)
return s},
iH(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.en(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.y===1){r[p]=o;++q}}if(q>0){n=A.ae(a,b,r,0)
m=A.c1(a,c,r,0)
return A.f1(a,n,m,c!==m)}}l=new A.Y(null,null)
l.y=12
l.z=b
l.Q=c
l.cy=d
return A.av(a,l)},
fX(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
fZ(a){var s,r,q,p,o,n,m,l,k,j,i,h=a.r,g=a.s
for(s=h.length,r=0;r<s;){q=h.charCodeAt(r)
if(q>=48&&q<=57)r=A.iA(r+1,q,h,g)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36)r=A.fY(a,r,h,g,!1)
else if(q===46)r=A.fY(a,r,h,g,!0)
else{++r
switch(q){case 44:break
case 58:g.push(!1)
break
case 33:g.push(!0)
break
case 59:g.push(A.at(a.u,a.e,g.pop()))
break
case 94:g.push(A.iK(a.u,g.pop()))
break
case 35:g.push(A.bY(a.u,5,"#"))
break
case 64:g.push(A.bY(a.u,2,"@"))
break
case 126:g.push(A.bY(a.u,3,"~"))
break
case 60:g.push(a.p)
a.p=g.length
break
case 62:p=a.u
o=g.splice(a.p)
A.f_(a.u,a.e,o)
a.p=g.pop()
n=g.pop()
if(typeof n=="string")g.push(A.bX(p,n,o))
else{m=A.at(p,a.e,n)
switch(m.y){case 11:g.push(A.f1(p,m,o,a.n))
break
default:g.push(A.f0(p,m,o))
break}}break
case 38:A.iB(a,g)
break
case 42:p=a.u
g.push(A.h2(p,A.at(p,a.e,g.pop()),a.n))
break
case 63:p=a.u
g.push(A.f2(p,A.at(p,a.e,g.pop()),a.n))
break
case 47:p=a.u
g.push(A.h1(p,A.at(p,a.e,g.pop()),a.n))
break
case 40:g.push(a.p)
a.p=g.length
break
case 41:p=a.u
l=new A.cV()
k=p.sEA
j=p.sEA
n=g.pop()
if(typeof n=="number")switch(n){case-1:k=g.pop()
break
case-2:j=g.pop()
break
default:g.push(n)
break}else g.push(n)
o=g.splice(a.p)
A.f_(a.u,a.e,o)
a.p=g.pop()
l.a=o
l.b=k
l.c=j
g.push(A.h0(p,A.at(p,a.e,g.pop()),l))
break
case 91:g.push(a.p)
a.p=g.length
break
case 93:o=g.splice(a.p)
A.f_(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-1)
break
case 123:g.push(a.p)
a.p=g.length
break
case 125:o=g.splice(a.p)
A.iD(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-2)
break
default:throw"Bad character "+q}}}i=g.pop()
return A.at(a.u,a.e,i)},
iA(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
fY(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.y===10)o=o.z
n=A.iP(s,o.z)[p]
if(n==null)A.ah('No "'+p+'" in "'+A.im(o)+'"')
d.push(A.em(s,o,n))}else d.push(p)
return m},
iB(a,b){var s=b.pop()
if(0===s){b.push(A.bY(a.u,1,"0&"))
return}if(1===s){b.push(A.bY(a.u,4,"1&"))
return}throw A.a(A.dd("Unexpected extended operation "+A.u(s)))},
at(a,b,c){if(typeof c=="string")return A.bX(a,c,a.sEA)
else if(typeof c=="number")return A.iC(a,b,c)
else return c},
f_(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.at(a,b,c[s])},
iD(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.at(a,b,c[s])},
iC(a,b,c){var s,r,q=b.y
if(q===10){if(c===0)return b.z
s=b.Q
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.z
q=b.y}else if(c===0)return b
if(q!==9)throw A.a(A.dd("Indexed base must be an interface type"))
s=b.Q
if(c<=s.length)return s[c-1]
throw A.a(A.dd("Bad index "+c+" for "+b.i(0)))},
y(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(!A.ag(d))if(!(d===t._))s=!1
else s=!0
else s=!0
if(s)return!0
r=b.y
if(r===4)return!0
if(A.ag(b))return!1
if(b.y!==1)s=!1
else s=!0
if(s)return!0
q=r===13
if(q)if(A.y(a,c[b.z],c,d,e))return!0
p=d.y
s=b===t.P||b===t.T
if(s){if(p===8)return A.y(a,b,c,d.z,e)
return d===t.P||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.y(a,b.z,c,d,e)
if(r===6)return A.y(a,b.z,c,d,e)
return r!==7}if(r===6)return A.y(a,b.z,c,d,e)
if(p===6){s=A.fP(a,d)
return A.y(a,b,c,s,e)}if(r===8){if(!A.y(a,b.z,c,d,e))return!1
return A.y(a,A.fO(a,b),c,d,e)}if(r===7){s=A.y(a,t.P,c,d,e)
return s&&A.y(a,b.z,c,d,e)}if(p===8){if(A.y(a,b,c,d.z,e))return!0
return A.y(a,b,c,A.fO(a,d),e)}if(p===7){s=A.y(a,b,c,t.P,e)
return s||A.y(a,b,c,d.z,e)}if(q)return!1
s=r!==11
if((!s||r===12)&&d===t.a)return!0
if(p===12){if(b===t.g)return!0
if(r!==12)return!1
o=b.Q
n=d.Q
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.y(a,k,c,j,e)||!A.y(a,j,e,k,c))return!1}return A.h8(a,b.z,c,d.z,e)}if(p===11){if(b===t.g)return!0
if(s)return!1
return A.h8(a,b,c,d,e)}if(r===9){if(p!==9)return!1
return A.j3(a,b,c,d,e)}return!1},
h8(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.y(a3,a4.z,a5,a6.z,a7))return!1
s=a4.Q
r=a6.Q
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.y(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.y(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.y(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;!0;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.y(a3,e[a+2],a7,g,a5))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
j3(a,b,c,d,e){var s,r,q,p,o,n,m,l=b.z,k=d.z
for(;l!==k;){s=a.tR[l]
if(s==null)return!1
if(typeof s=="string"){l=s
continue}r=s[k]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.em(a,b,r[o])
return A.h4(a,p,null,c,d.Q,e)}n=b.Q
m=d.Q
return A.h4(a,n,null,c,m,e)},
h4(a,b,c,d,e,f){var s,r,q,p=b.length
for(s=0;s<p;++s){r=b[s]
q=e[s]
if(!A.y(a,r,d,q,f))return!1}return!0},
c4(a){var s,r=a.y
if(!(a===t.P||a===t.T))if(!A.ag(a))if(r!==7)if(!(r===6&&A.c4(a.z)))s=r===8&&A.c4(a.z)
else s=!0
else s=!0
else s=!0
else s=!0
return s},
jD(a){var s
if(!A.ag(a))if(!(a===t._))s=!1
else s=!0
else s=!0
return s},
ag(a){var s=a.y
return s===2||s===3||s===4||s===5||a===t.Q},
h3(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
en(a){return a>0?new Array(a):v.typeUniverse.sEA},
Y:function Y(a,b){var _=this
_.a=a
_.b=b
_.x=_.r=_.c=null
_.y=0
_.cy=_.cx=_.ch=_.Q=_.z=null},
cV:function cV(){this.c=this.b=this.a=null},
bV:function bV(a){this.a=a},
cT:function cT(){},
bW:function bW(a){this.a=a},
is(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.jq()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.b9(new A.dW(q),1)).observe(s,{childList:true})
return new A.dV(q,s,r)}else if(self.setImmediate!=null)return A.jr()
return A.js()},
it(a){self.scheduleImmediate(A.b9(new A.dX(t.M.a(a)),0))},
iu(a){self.setImmediate(A.b9(new A.dY(t.M.a(a)),0))},
iv(a){t.M.a(a)
A.iE(0,a)},
iE(a,b){var s=new A.ek()
s.bO(a,b)
return s},
fc(a){return new A.cO(new A.x($.t,a.h("x<0>")),a.h("cO<0>"))},
f6(a,b){a.$2(0,null)
b.b=!0
return b.a},
f3(a,b){A.iU(a,b)},
f5(a,b){b.cn(0,a)},
f4(a,b){b.co(A.ai(a),A.af(a))},
iU(a,b){var s,r,q=new A.eo(b),p=new A.ep(b)
if(a instanceof A.x)a.bc(q,p,t.z)
else{s=t.z
if(t.d.b(a))a.aU(q,p,s)
else{r=new A.x($.t,t.c)
r.a=8
r.c=a
r.bc(q,p,s)}}},
fd(a){var s=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(r){e=r
d=c}}}(a,1)
return $.t.bv(new A.ew(s),t.H,t.S,t.z)},
km(a){return new A.b3(a,1)},
ix(){return B.aR},
iy(a){return new A.b3(a,3)},
jd(a,b){return new A.bU(a,b.h("bU<0>"))},
de(a,b){var s=A.ex(a,"error",t.K)
return new A.bc(s,b==null?A.fr(a):b)},
fr(a){var s
if(t.R.b(a)){s=a.gav()
if(s!=null)return s}return B.ah},
eR(a,b){var s
b.a(a)
s=new A.x($.t,b.h("x<0>"))
s.b1(a)
return s},
eZ(a,b){var s,r,q
for(s=t.c;r=a.a,(r&4)!==0;)a=s.a(a.c)
if((r&24)!==0){q=b.ai()
b.ay(a)
A.b2(b,q)}else{q=t.F.a(b.c)
b.a=b.a&1|4
b.c=a
a.ba(q)}},
b2(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c={},b=c.a=a
for(s=t.n,r=t.F,q=t.d;!0;){p={}
o=b.a
n=(o&16)===0
m=!n
if(a0==null){if(m&&(o&1)===0){l=s.a(b.c)
A.eu(l.a,l.b)}return}p.a=a0
k=a0.a
for(b=a0;k!=null;b=k,k=j){b.a=null
A.b2(c.a,b)
p.a=k
j=k.a}o=c.a
i=o.c
p.b=m
p.c=i
if(n){h=b.c
h=(h&1)!==0||(h&15)===8}else h=!0
if(h){g=b.b.b
if(m){o=o.b===g
o=!(o||o)}else o=!1
if(o){s.a(i)
A.eu(i.a,i.b)
return}f=$.t
if(f!==g)$.t=g
else f=null
b=b.c
if((b&15)===8)new A.ed(p,c,m).$0()
else if(n){if((b&1)!==0)new A.ec(p,i).$0()}else if((b&2)!==0)new A.eb(c,p).$0()
if(f!=null)$.t=f
b=p.c
if(q.b(b)){o=p.a.$ti
o=o.h("T<2>").b(b)||!o.Q[1].b(b)}else o=!1
if(o){q.a(b)
e=p.a.b
if((b.a&24)!==0){d=r.a(e.c)
e.c=null
a0=e.aj(d)
e.a=b.a&30|e.a&1
e.c=b.c
c.a=b
continue}else A.eZ(b,e)
return}}e=p.a.b
d=r.a(e.c)
e.c=null
a0=e.aj(d)
b=p.b
o=p.c
if(!b){e.$ti.c.a(o)
e.a=8
e.c=o}else{s.a(o)
e.a=e.a&1|16
e.c=o}c.a=e
b=e}},
jf(a,b){var s
if(t.C.b(a))return b.bv(a,t.z,t.K,t.l)
s=t.y
if(s.b(a))return s.a(a)
throw A.a(A.eM(a,"onError",u.c))},
je(){var s,r
for(s=$.b6;s!=null;s=$.b6){$.c0=null
r=s.b
$.b6=r
if(r==null)$.c_=null
s.a.$0()}},
jj(){$.f8=!0
try{A.je()}finally{$.c0=null
$.f8=!1
if($.b6!=null)$.fn().$1(A.he())}},
hc(a){var s=new A.cP(a),r=$.c_
if(r==null){$.b6=$.c_=s
if(!$.f8)$.fn().$1(A.he())}else $.c_=r.b=s},
ji(a){var s,r,q,p=$.b6
if(p==null){A.hc(a)
$.c0=$.c_
return}s=new A.cP(a)
r=$.c0
if(r==null){s.b=p
$.b6=$.c0=s}else{q=r.b
s.b=q
$.c0=r.b=s
if(q==null)$.c_=s}},
jJ(a){var s=null,r=$.t
if(B.e===r){A.b7(s,s,B.e,a)
return}A.b7(s,s,r,t.M.a(r.bi(a)))},
k9(a,b){A.ex(a,"stream",t.K)
return new A.d2(b.h("d2<0>"))},
iV(a,b,c){var s,r,q=a.cm(),p=$.hu()
if(q!==p){s=t.b.a(new A.eq(b,c))
p=q.$ti
r=$.t
q.ag(new A.ad(new A.x(r,p),8,s,null,p.h("@<1>").B(p.c).h("ad<1,2>")))}else b.az(c)},
eu(a,b){A.ji(new A.ev(a,b))},
ha(a,b,c,d,e){var s,r=$.t
if(r===c)return d.$0()
$.t=c
s=r
try{r=d.$0()
return r}finally{$.t=s}},
hb(a,b,c,d,e,f,g){var s,r=$.t
if(r===c)return d.$1(e)
$.t=c
s=r
try{r=d.$1(e)
return r}finally{$.t=s}},
jg(a,b,c,d,e,f,g,h,i){var s,r=$.t
if(r===c)return d.$2(e,f)
$.t=c
s=r
try{r=d.$2(e,f)
return r}finally{$.t=s}},
b7(a,b,c,d){t.M.a(d)
if(B.e!==c)d=c.bi(d)
A.hc(d)},
dW:function dW(a){this.a=a},
dV:function dV(a,b,c){this.a=a
this.b=b
this.c=c},
dX:function dX(a){this.a=a},
dY:function dY(a){this.a=a},
ek:function ek(){},
el:function el(a,b){this.a=a
this.b=b},
cO:function cO(a,b){this.a=a
this.b=!1
this.$ti=b},
eo:function eo(a){this.a=a},
ep:function ep(a){this.a=a},
ew:function ew(a){this.a=a},
b3:function b3(a,b){this.a=a
this.b=b},
au:function au(a,b){var _=this
_.a=a
_.d=_.c=_.b=null
_.$ti=b},
bU:function bU(a,b){this.a=a
this.$ti=b},
bc:function bc(a,b){this.a=a
this.b=b},
ad:function ad(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
x:function x(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
e3:function e3(a,b){this.a=a
this.b=b},
ea:function ea(a,b){this.a=a
this.b=b},
e6:function e6(a){this.a=a},
e7:function e7(a){this.a=a},
e8:function e8(a,b,c){this.a=a
this.b=b
this.c=c},
e5:function e5(a,b){this.a=a
this.b=b},
e9:function e9(a,b){this.a=a
this.b=b},
e4:function e4(a,b,c){this.a=a
this.b=b
this.c=c},
ed:function ed(a,b,c){this.a=a
this.b=b
this.c=c},
ee:function ee(a){this.a=a},
ec:function ec(a,b){this.a=a
this.b=b},
eb:function eb(a,b){this.a=a
this.b=b},
cP:function cP(a){this.a=a
this.b=null},
bI:function bI(){},
dO:function dO(a,b){this.a=a
this.b=b},
dP:function dP(a,b){this.a=a
this.b=b},
dM:function dM(a){this.a=a},
dN:function dN(a,b,c){this.a=a
this.b=b
this.c=c},
bJ:function bJ(){},
d2:function d2(a){this.$ti=a},
eq:function eq(a,b){this.a=a
this.b=b},
bZ:function bZ(){},
ev:function ev(a,b){this.a=a
this.b=b},
d1:function d1(){},
ei:function ei(a,b){this.a=a
this.b=b},
ej:function ej(a,b,c){this.a=a
this.b=b
this.c=c},
i2(a,b,c,d){return A.iz(A.ju(),a,b,c,d)},
i3(a,b,c){return b.h("@<0>").B(c).h("dt<1,2>").a(A.hf(a,new A.W(b.h("@<0>").B(c).h("W<1,2>"))))},
fG(a,b){return new A.W(a.h("@<0>").B(b).h("W<1,2>"))},
iz(a,b,c,d,e){var s=c!=null?c:new A.eg(d)
return new A.bR(a,b,s,d.h("@<0>").B(e).h("bR<1,2>"))},
iW(a,b){return J.a3(a,b)},
i0(a,b,c){var s,r
if(A.fa(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.n([],t.s)
B.b.F($.Q,a)
try{A.ja(a,s)}finally{if(0>=$.Q.length)return A.i($.Q,-1)
$.Q.pop()}r=A.fR(b,t.bi.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
fC(a,b,c){var s,r
if(A.fa(a))return b+"..."+c
s=new A.cH(b)
B.b.F($.Q,a)
try{r=s
r.a=A.fR(r.a,a,", ")}finally{if(0>=$.Q.length)return A.i($.Q,-1)
$.Q.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
fa(a){var s,r
for(s=$.Q.length,r=0;r<s;++r)if(a===$.Q[r])return!0
return!1},
ja(a,b){var s,r,q,p,o,n,m,l=a.gq(a),k=0,j=0
while(!0){if(!(k<80||j<3))break
if(!l.n())return
s=A.u(l.gp())
B.b.F(b,s)
k+=s.length+2;++j}if(!l.n()){if(j<=5)return
if(0>=b.length)return A.i(b,-1)
r=b.pop()
if(0>=b.length)return A.i(b,-1)
q=b.pop()}else{p=l.gp();++j
if(!l.n()){if(j<=4){B.b.F(b,A.u(p))
return}r=A.u(p)
if(0>=b.length)return A.i(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gp();++j
for(;l.n();p=o,o=n){n=l.gp();++j
if(j>100){while(!0){if(!(k>75&&j>3))break
if(0>=b.length)return A.i(b,-1)
k-=b.pop().length+2;--j}B.b.F(b,"...")
return}}q=A.u(p)
r=A.u(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
while(!0){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.i(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.F(b,m)
B.b.F(b,q)
B.b.F(b,r)},
eW(a){var s,r={}
if(A.fa(a))return"{...}"
s=new A.cH("")
try{B.b.F($.Q,a)
s.a+="{"
r.a=!0
a.a4(0,new A.dv(r,s))
s.a+="}"}finally{if(0>=$.Q.length)return A.i($.Q,-1)
$.Q.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
eh:function eh(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
bR:function bR(a,b,c,d){var _=this
_.x=a
_.y=b
_.z=c
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=d},
eg:function eg(a){this.a=a},
bq:function bq(){},
bw:function bw(){},
m:function m(){},
bx:function bx(){},
dv:function dv(a,b){this.a=a
this.b=b},
ao:function ao(){},
bS:function bS(){},
hW(a){if(a instanceof A.I)return a.i(0)
return"Instance of '"+A.dG(a)+"'"},
hX(a,b){a=t.K.a(A.a(a))
a.stack=b.i(0)
throw a
throw A.a("unreachable")},
aD(a,b,c,d){var s,r=c?J.fE(a,d):J.fD(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
fH(a,b,c){var s,r=A.n([],c.h("w<0>"))
for(s=a.gq(a);s.n();)B.b.F(r,c.a(s.gp()))
if(b)return r
return J.eT(r,c)},
fR(a,b,c){var s=J.db(b)
if(!s.n())return a
if(c.length===0){do a+=A.u(s.gp())
while(s.n())}else{a+=A.u(s.gp())
for(;s.n();)a=a+c+A.u(s.gp())}return a},
fB(){return new A.ce(Date.now(),!1)},
hU(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
hV(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cf(a){if(a>=10)return""+a
return"0"+a},
ci(a){if(typeof a=="number"||A.h7(a)||a==null)return J.dc(a)
if(typeof a=="string")return JSON.stringify(a)
return A.hW(a)},
dd(a){return new A.bb(a)},
c8(a,b){return new A.a4(!1,null,b,a)},
eM(a,b,c){return new A.a4(!0,a,b,c)},
eN(a,b,c){return a},
ik(a){var s=null
return new A.aZ(s,s,!1,s,s,a)},
X(a,b,c,d,e){return new A.aZ(b,c,!0,a,d,"Invalid value")},
il(a,b,c){if(a>c)throw A.a(A.X(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.a(A.X(b,a,c,"end",null))
return b}return c},
b_(a,b){if(a<0)throw A.a(A.X(a,0,null,b,null))
return a},
cp(a,b,c,d,e){var s=A.d6(e==null?J.ak(b):e)
return new A.co(s,!0,a,c,"Index out of range")},
G(a){return new A.cL(a)},
eY(a){return new A.cJ(a)},
bH(a){return new A.bG(a)},
aO(a){return new A.cc(a)},
i7(a,b){var s,r=a.gl(a)
b=A.aY(b)
s=$.hF()
return A.iq(A.fS(A.fS(s,r),b))},
d9(a){A.jH(a)},
ce:function ce(a,b){this.a=a
this.b=b},
e_:function e_(){},
q:function q(){},
bb:function bb(a){this.a=a},
as:function as(){},
cz:function cz(){},
a4:function a4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aZ:function aZ(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
co:function co(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
cL:function cL(a){this.a=a},
cJ:function cJ(a){this.a=a},
bG:function bG(a){this.a=a},
cc:function cc(a){this.a=a},
bF:function bF(){},
cd:function cd(a){this.a=a},
e2:function e2(a){this.a=a},
f:function f(){},
C:function C(){},
z:function z(){},
j:function j(){},
d3:function d3(){},
dL:function dL(){this.b=this.a=0},
cH:function cH(a){this.a=a},
fy(a,b){var s=document.createElement("canvas")
s.toString
if(b!=null)B.r.sE(s,b)
if(a!=null)B.r.sK(s,a)
return s},
cU(a,b,c,d,e){var s=c==null?null:A.fe(new A.e0(c),t.A)
s=new A.bQ(a,b,s,!1,e.h("bQ<0>"))
s.bd()
return s},
fe(a,b){var s=$.t
if(s===B.e)return a
return s.cl(a,b)},
d:function d(){},
c5:function c5(){},
c7:function c7(){},
ay:function ay(){},
be:function be(){},
Z:function Z(){},
aQ:function aQ(){},
di:function di(){},
dj:function dj(){},
cR:function cR(a,b){this.a=a
this.b=b},
k:function k(){},
b:function b(){},
B:function B(){},
cl:function cl(){},
am:function am(){},
aS:function aS(){},
a_:function a_(){},
cQ:function cQ(a){this.a=a},
h:function h(){},
bA:function bA(){},
cF:function cF(){},
M:function M(){},
b1:function b1(){},
eQ:function eQ(a,b){this.a=a
this.$ti=b},
bP:function bP(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aJ:function aJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bQ:function bQ(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
e0:function e0(a){this.a=a},
e1:function e1(a){this.a=a},
V:function V(){},
az:function az(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
cS:function cS(){},
cW:function cW(){},
cX:function cX(){},
cY:function cY(){},
cZ:function cZ(){},
eP(){var s=window.navigator.userAgent
s.toString
return s},
cj:function cj(a){this.b=a},
dk:function dk(){},
dl:function dl(){},
dm:function dm(){},
hk(a,b,c){A.jt(c,t.p,"T","max")
return Math.max(c.a(a),c.a(b))},
fN(a){var s=new A.d0()
s.bN(a)
return s},
d0:function d0(){this.b=this.a=0},
c:function c(){},
by:function by(){},
aI:function aI(a,b){this.a=a
this.b=b},
bh:function bh(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=0
_.$ti=e},
bM:function bM(a,b){this.a=a
this.$ti=b},
bD:function bD(a,b){this.a=a
this.b=b},
cD:function cD(a){this.a=a},
dJ:function dJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dR:function dR(){},
U:function U(a,b,c){this.a=a
this.b=b
this.$ti=c},
aR:function aR(a,b){this.a=a
this.b=b},
dq:function dq(){},
A:function A(a,b){this.a=a
this.b=b},
dI:function dI(a){this.a=a},
dS:function dS(){},
b0:function b0(){},
cM:function cM(){},
e:function e(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=b},
al:function al(){},
hO(a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c='normal 12 "Menlo", "Courier", monospace',b='normal 24px "Menlo", "Courier", monospace',a=A.fy(d,d)
switch(a1.a){case 0:s=a.getContext("2d")
s.toString
r=a2==null
if(r)q=a4<2?c:b
else q=a2
if(r)r=a4<2?c:b
else r=a2
s.textBaseline="top"
s.font=r
p=s.measureText(A.eX(9608))
r=p.actualBoundingBoxLeft
o=r==null?d:B.c.a8(r)
if(o==null)o=0
r=p.actualBoundingBoxRight
n=r==null?d:B.c.a8(r)
if(n==null)n=0
r=p.width
r=r==null?d:B.c.a8(r)
if(r==null)r=0
m=Math.max(r,Math.abs(o)+Math.abs(n))
r=p.actualBoundingBoxAscent
l=r==null?d:B.c.a8(r)
if(l==null)l=0
r=p.actualBoundingBoxDescent
k=r==null?d:B.c.a8(r)
if(k==null)k=0
j=Math.abs(l)+Math.abs(k)
A.d9("MEASURE: left "+o+", right "+n+", ascent "+l+", descent "+k)
A.d9("CHAR width "+A.u(m)+", height "+j)
i=new A.ck(q,new A.e(m,j),a4,s)
B.j.sao(s,!1)
s.translate(0.5,0.5)
break
case 1:s=a.getContext("2d")
s.toString
i=A.i_("packages/fortress/dos-vga-437.png",B.aE,new A.e(9,16),s,a4)
break
default:i=d}s=J.fo(a0)
s.bw(s,new A.dg())
a0.appendChild(a).toString
s=a0.clientWidth
s.toString
r=a0.clientHeight
r.toString
h=B.a.aY(s,i.gaK())
g=B.a.aY(r,i.gaJ())
h=Math.max(h,a3.a)
g=Math.max(g,a3.b)
f=h*i.gaK()
e=g*i.gaJ()
B.r.sE(a,f*a4)
B.r.sK(a,e*a4)
s=a.style
s.toString
r=""+f+"px"
s.width=r
s=a.style
s.toString
r=""+e+"px"
s.height=r
s=a.style
s.toString
B.m.aG(s,B.m.aw(s,"image-rendering"),"pixelated","")
s=a.style
s.toString
B.m.aG(s,B.m.aw(s,"font-smoothing"),"none","")
s=h*g
return new A.c9(new A.dQ(new A.U(new A.e(h,g),A.aD(s,B.I,!1,t.x),t.U),new A.U(new A.e(h,g),A.aD(s,B.J,!1,t.cj),t.D)),i)},
c9:function c9(a,b){this.c=a
this.d=b},
dg:function dg(){},
fz(a,b,c){var s=b==null?B.d:b
return new A.R(a,s,c==null?B.h:c)},
S(a,b,c){if(typeof a=="string"&&a.length!==0)return A.fz(B.l.b3(a,0),b,c)
else if(A.f9(a))return A.fz(a,b,c)
else throw A.a(A.eM(a,"charOrCharCode","Argument must be a non-empty String or an int"))},
R:function R(a,b,c){this.a=a
this.b=b
this.c=c},
l:function l(a,b,c){this.a=a
this.b=b
this.c=c},
ck:function ck(a,b,c,d){var _=this
_.c=a
_.d=b
_.a=c
_.b=d},
i_(a,b,c,d,e){var s=document.createElement("img")
s.toString
s=new A.cn(c,b,b.gat(b).cK(0,B.aa),s,A.fG(t.k,t.E),e,d)
B.j.sao(d,!1)
d.translate(0.5,0.5)
s.bL(a,b,c,d,e)
return s},
cn:function cn(a,b,c,d,e,f,g){var _=this
_.c=a
_.d=b
_.e=c
_.f=d
_.r=e
_.x=null
_.y=!1
_.a=f
_.b=g},
dp:function dp(a){this.a=a},
cu:function cu(a,b){this.a=a
this.$ti=b},
b4:function b4(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.e=d},
aq:function aq(){},
ab:function ab(){},
bf:function bf(a,b,c){this.c=a
this.d=b
this.e=c},
ap:function ap(){},
dQ:function dQ(a,b){this.a=a
this.b=b},
fJ(a,b,c,d,e,f,g,h,i){var s=(1+g)*2,r=A.fs(new A.A(B.E,new A.e(Math.max(a.length,b.length)+s,3+s)),d,f,e,g)
r.sak(new A.dy(a,h,b,c))
return new A.aW(A.eH(),A.eH(),A.eH(),A.eH(),r,i.h("aW<0>"))},
fK(a,b,c,d,e,f,g,h,i){var s=h?"OK [enter]   Cancel [esc]":"OK [enter]",r=A.fJ(a,s,b,null,c,d,g,null,i)
r.scH(new A.dz(r,f))
if(h)r.scE(new A.dA(r,e))
return r},
i5(a,b,c,d,e,f,g,h){var s=A.fJ(a,"Yes [y]   No [n]",b,null,c,d,f,null,h)
s.scI(new A.dB(s,g))
s.scG(new A.dC(s,e))
return s},
i6(){},
bd:function bd(){},
aW:function aW(a,b,c,d,e,f){var _=this
_.d=a
_.e=b
_.f=c
_.r=d
_.b=e
_.a=null
_.$ti=f},
dy:function dy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dz:function dz(a,b){this.a=a
this.b=b},
dA:function dA(a,b){this.a=a
this.b=b},
dB:function dB(a,b){this.a=a
this.b=b},
dC:function dC(a,b){this.a=a
this.b=b},
ft(a,b,c,d,e){var s=e*2
return A.fs(new A.A(new A.e(0,0),new A.e(a+s+2,b+s+2)),null,c,d,e)},
fs(a,b,c,d,e){var s=c===B.C?e:e+1
return new A.aM(c,d,s,a,a.a_(s),b)},
a9:function a9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null},
aa:function aa(a,b){this.a=a
this.b=b},
a1:function a1(a,b){this.a=a
this.b=b},
aM:function aM(a,b,c,d,e,f){var _=this
_.f=a
_.r=b
_.a=c
_.b=d
_.c=e
_.d=f
_.e=null},
cm:function cm(){},
aG:function aG(a,b,c,d){var _=this
_.a=a
_.c=_.b=null
_.d=b
_.e=!0
_.r=_.f=!1
_.x=0
_.y=c
_.$ti=d},
p:function p(){},
d_:function d_(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=0},
c6:function c6(a){this.b=a
this.c=0
this.a=null},
cx:function cx(a,b){var _=this
_.b=a
_.c=!0
_.d=b
_.a=null},
i4(){$.fm()
var s=new A.cw(new A.dL(),A.ft(24,1,B.u,B.n,1),A.ft(28,1,B.u,B.n,1))
s.bM()
return s},
a5:function a5(a){this.a=a},
cw:function cw(a,b,c){var _=this
_.b=a
_.c=b
_.d=c
_.f=_.e=$
_.r=!1
_.a=null},
dw:function dw(){},
dx:function dx(){},
cy:function cy(a){this.b=a
this.a=this.c=null},
dD:function dD(a,b){this.a=a
this.b=b},
et(){var s=$.hG().G(11)
if(!(s>=0&&s<11))return A.i(B.a0,s)
return B.a0[s]},
eO(a,b,c){var s=b===B.C?0:1
return new A.ch(b,b,c,s,a,a.a_(s),null)},
ch:function ch(a,b,c,d,e,f,g){var _=this
_.cx=a
_.f=b
_.r=c
_.a=d
_.b=e
_.c=f
_.d=g
_.e=null},
cg:function cg(a,b,c,d,e,f,g){var _=this
_.cx=a
_.f=b
_.r=c
_.a=d
_.b=e
_.c=f
_.d=g
_.e=null},
cA:function cA(){this.a=null},
r:function r(){},
aV(a){var s,r,q,p
for(s=a.length,r=0,q=0;q<s;++q){p=a[q].length
if(p>r)r=p}return r},
cv:function cv(){this.b=0
this.a=null},
cB:function cB(){this.a=null},
jH(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
eF(){var s=0,r=A.fc(t.z),q,p,o
var $async$eF=A.fd(function(a,b){if(a===1)return A.f4(b,r)
while(true)switch(s){case 0:p=A.h9()
o=p.d
s=2
return A.f3(o.ga5(o),$async$eF)
case 2:o=p.c.a.a
A.d9("TERM cols "+o.a+", rows "+o.b)
o=A.n([],t.bW)
if($.O.b!=$.O)A.ah(new A.aU("Field '"+$.O.a+"' has already been initialized."))
$.O.b=new A.aG(o,p,new A.cu(A.fG(t.c4,t.Y),t.dc),t.a5)
o=window
o.toString
t.cx.a(A.hj())
t.Z.a(null)
A.cU(o,"resize",A.hj(),!1,t.A)
$.O.N().scA(!0)
$.O.N().y.a2(B.v,"ArrowUp")
$.O.N().y.a2(B.w,"ArrowRight")
$.O.N().y.a2(B.x,"ArrowDown")
$.O.N().y.a2(B.y,"ArrowLeft")
$.O.N().y.a2(B.z,"Enter")
$.O.N().y.a2(B.k,"Escape")
$.O.N().X(new A.cv())
o=$.O.N()
o.f=!0
q=window.performance.now()
q.toString
o.x=q
q=window
q.toString
B.a8.by(q,o.gb9())
return A.f5(null,r)}})
return A.f6($async$eF,r)},
es(a){var s=0,r=A.fc(t.z),q,p
var $async$es=A.fd(function(b,c){if(b===1)return A.f4(c,r)
while(true)switch(s){case 0:q=A.h9()
p=q.d
s=2
return A.f3(p.ga5(p),$async$es)
case 2:$.O.N().scS(q)
return A.f5(null,r)}})
return A.f6($async$es,r)},
h9(){var s,r,q,p=window.devicePixelRatio
p.toString
s=B.c.Y(p)
r=document.querySelector("#game")
p=r.clientWidth
p.toString
p="GAME width "+p+", height "
q=r.clientHeight
q.toString
A.d9(p+q)
switch(1){case 1:return A.hO(r,B.ai,null,new A.e(Math.max(A.aV(B.o),A.aV(B.q)),25),s)}}},J={
fk(a,b,c,d){return{i:a,p:b,e:c,x:d}},
eA(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.fj==null){A.jy()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.a(A.eY("Return interceptor for "+A.u(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.ef
if(o==null)o=$.ef=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.jE(a)
if(p!=null)return p
if(typeof a=="function")return B.av
s=Object.getPrototypeOf(a)
if(s==null)return B.a5
if(s===Object.prototype)return B.a5
if(typeof q=="function"){o=$.ef
if(o==null)o=$.ef=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.D,enumerable:false,writable:true,configurable:true})
return B.D}return B.D},
fD(a,b){if(a<0||a>4294967295)throw A.a(A.X(a,0,4294967295,"length",null))
return J.i1(new Array(a),b)},
fE(a,b){if(a<0)throw A.a(A.c8("Length must be a non-negative integer: "+a,null))
return A.n(new Array(a),b.h("w<0>"))},
i1(a,b){return J.eT(A.n(a,b.h("w<0>")),b)},
eT(a,b){a.fixed$length=Array
return a},
ba(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.br.prototype
return J.cr.prototype}if(typeof a=="string")return J.aT.prototype
if(a==null)return J.bs.prototype
if(typeof a=="boolean")return J.cq.prototype
if(a.constructor==Array)return J.w.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a7.prototype
return a}if(a instanceof A.j)return a
return J.eA(a)},
ez(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(a.constructor==Array)return J.w.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a7.prototype
return a}if(a instanceof A.j)return a
return J.eA(a)},
hg(a){if(a==null)return a
if(a.constructor==Array)return J.w.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a7.prototype
return a}if(a instanceof A.j)return a
return J.eA(a)},
c3(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.a7.prototype
return a}if(a instanceof A.j)return a
return J.eA(a)},
a3(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.ba(a).I(a,b)},
hH(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||A.jC(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.ez(a).v(a,b)},
hI(a,b,c,d){return J.c3(a).bR(a,b,c,d)},
hJ(a,b,c,d){return J.c3(a).cc(a,b,c,d)},
hK(a,b,c){return J.c3(a).cd(a,b,c)},
da(a,b){return J.hg(a).O(a,b)},
fo(a){return J.c3(a).gbl(a)},
fp(a){return J.ba(a).gl(a)},
db(a){return J.hg(a).gq(a)},
ak(a){return J.ez(a).gj(a)},
fq(a){return J.c3(a).cL(a)},
hL(a,b){return J.c3(a).cO(a,b)},
dc(a){return J.ba(a).i(a)},
bp:function bp(){},
cq:function cq(){},
bs:function bs(){},
L:function L(){},
aA:function aA(){},
cC:function cC(){},
bN:function bN(){},
a7:function a7(){},
w:function w(a){this.$ti=a},
dr:function dr(a){this.$ti=a},
H:function H(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bt:function bt(){},
br:function br(){},
cr:function cr(){},
aT:function aT(){}},B={}
var w=[A,J,B]
hunkHelpers.setFunctionNamesIfNecessary(w)
var $={}
A.eU.prototype={}
J.bp.prototype={
I(a,b){return a===b},
gl(a){return A.aY(a)},
i(a){return"Instance of '"+A.dG(a)+"'"}}
J.cq.prototype={
i(a){return String(a)},
gl(a){return a?519018:218159},
$iE:1}
J.bs.prototype={
I(a,b){return null==b},
i(a){return"null"},
gl(a){return 0},
$iz:1}
J.L.prototype={}
J.aA.prototype={
gl(a){return 0},
i(a){return String(a)}}
J.cC.prototype={}
J.bN.prototype={}
J.a7.prototype={
i(a){var s=a[$.hp()]
if(s==null)return this.bJ(a)
return"JavaScript function for "+J.dc(s)},
$ia6:1}
J.w.prototype={
F(a,b){A.P(a).c.a(b)
if(!!a.fixed$length)A.ah(A.G("add"))
a.push(b)},
a4(a,b){var s,r
A.P(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.a(A.aO(a))}},
cB(a,b){var s,r=A.aD(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.H(r,s,A.u(a[s]))
return r.join(b)},
O(a,b){if(!(b>=0&&b<a.length))return A.i(a,b)
return a[b]},
bE(a,b){var s=a.length
if(b>s)throw A.a(A.X(b,0,s,"start",null))
if(b===s)return A.n([],A.P(a))
return A.n(a.slice(b,s),A.P(a))},
gaQ(a){var s=a.length
if(s>0)return a[s-1]
throw A.a(A.eS())},
i(a){return A.fC(a,"[","]")},
gq(a){return new J.H(a,a.length,A.P(a).h("H<1>"))},
gl(a){return A.aY(a)},
gj(a){return a.length},
sj(a,b){if(!!a.fixed$length)A.ah(A.G("set length"))
if(b>a.length)A.P(a).c.a(null)
a.length=b},
H(a,b,c){A.P(a).c.a(c)
if(!!a.immutable$list)A.ah(A.G("indexed set"))
if(!(b>=0&&b<a.length))throw A.a(A.d7(a,b))
a[b]=c},
$io:1,
$if:1,
$iD:1}
J.dr.prototype={}
J.H.prototype={
gp(){return this.$ti.c.a(this.d)},
n(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.a(A.aL(q))
s=r.c
if(s>=p){r.sb4(null)
return!1}r.sb4(q[s]);++r.c
return!0},
sb4(a){this.d=this.$ti.h("1?").a(a)},
$iC:1}
J.bt.prototype={
aM(a,b){var s
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=B.a.gaP(b)
if(this.gaP(a)===s)return 0
if(this.gaP(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaP(a){return a===0?1/a<0:a<0},
Y(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.a(A.G(""+a+".toInt()"))},
cw(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.a(A.G(""+a+".floor()"))},
a8(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.a(A.G(""+a+".round()"))},
aL(a,b,c){if(B.a.aM(b,c)>0)throw A.a(A.jo(b))
if(this.aM(a,b)<0)return b
if(this.aM(a,c)>0)return c
return a},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gl(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
bB(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
aY(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bb(a,b)},
k(a,b){return(a|0)===a?a/b|0:this.bb(a,b)},
bb(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.a(A.G("Result of truncating division is "+A.u(s)+": "+A.u(a)+" ~/ "+b))},
aI(a,b){var s
if(a>0)s=this.cg(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cg(a,b){return b>31?0:a>>>b},
$id8:1,
$ia2:1}
J.br.prototype={$iF:1}
J.cr.prototype={}
J.aT.prototype={
cW(a,b){if(b<0)throw A.a(A.d7(a,b))
if(b>=a.length)A.ah(A.d7(a,b))
return a.charCodeAt(b)},
b3(a,b){if(b>=a.length)throw A.a(A.d7(a,b))
return a.charCodeAt(b)},
Z(a,b){return a+b},
aN(a,b,c){var s=a.length
if(c>s)throw A.a(A.X(c,0,s,null,null))
return A.jK(a,b,c)},
i(a){return a},
gl(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gj(a){return a.length},
$ifL:1,
$ia0:1}
A.aU.prototype={
i(a){var s="LateInitializationError: "+this.a
return s}}
A.eI.prototype={
$0(){return A.eR(null,t.P)},
$S:9}
A.dK.prototype={}
A.o.prototype={}
A.aB.prototype={
gq(a){var s=this
return new A.aC(s,s.gj(s),A.v(s).h("aC<aB.E>"))}}
A.bK.prototype={
gbY(){var s=J.ak(this.a),r=this.c
if(r==null||r>s)return s
return r},
gci(){var s=J.ak(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.ak(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
if(typeof s!=="number")return s.cV()
return s-q},
O(a,b){var s=this,r=s.gci()+b
if(b<0||r>=s.gbY())throw A.a(A.cp(b,s,"index",null,null))
return J.da(s.a,r)},
aV(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.ez(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.fD(0,p.$ti.c)
return n}r=A.aD(s,m.O(n,o),!1,p.$ti.c)
for(q=1;q<s;++q){B.b.H(r,q,m.O(n,o+q))
if(m.gj(n)<l)throw A.a(A.aO(p))}return r}}
A.aC.prototype={
gp(){return this.$ti.c.a(this.d)},
n(){var s,r=this,q=r.a,p=J.ez(q),o=p.gj(q)
if(r.b!==o)throw A.a(A.aO(q))
s=r.c
if(s>=o){r.saa(null)
return!1}r.saa(p.O(q,s));++r.c
return!0},
saa(a){this.d=this.$ti.h("1?").a(a)},
$iC:1}
A.a8.prototype={
gq(a){var s=A.v(this)
return new A.bz(J.db(this.a),this.b,s.h("@<1>").B(s.Q[1]).h("bz<1,2>"))},
gj(a){return J.ak(this.a)},
O(a,b){return this.b.$1(J.da(this.a,b))}}
A.bi.prototype={$io:1}
A.bz.prototype={
n(){var s=this,r=s.b
if(r.n()){s.saa(s.c.$1(r.gp()))
return!0}s.saa(null)
return!1},
gp(){return this.$ti.Q[1].a(this.a)},
saa(a){this.a=this.$ti.h("2?").a(a)}}
A.bO.prototype={
gq(a){return new A.aH(J.db(this.a),this.b,this.$ti.h("aH<1>"))}}
A.aH.prototype={
n(){var s,r
for(s=this.a,r=this.b;s.n();)if(A.c2(r.$1(s.gp())))return!0
return!1},
gp(){return this.a.gp()}}
A.aF.prototype={
gq(a){var s=this.a
return new A.bL(s.gq(s),this.b,A.v(this).h("bL<1>"))}}
A.bk.prototype={
gj(a){var s=this.a,r=s.gj(s)
s=this.b
if(r>s)return s
return r},
$io:1}
A.bL.prototype={
n(){if(--this.b>=0)return this.a.n()
this.b=-1
return!1},
gp(){if(this.b<0)return this.$ti.c.a(null)
return this.a.gp()}}
A.aE.prototype={
gq(a){var s=this.a
return new A.bE(s.gq(s),this.b,A.v(this).h("bE<1>"))}}
A.bj.prototype={
gj(a){var s=this.a,r=s.gj(s)-this.b
if(r>=0)return r
return 0},
$io:1}
A.bE.prototype={
n(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.n()
this.b=0
return s.n()},
gp(){return this.a.gp()}}
A.aP.prototype={
i(a){return A.eW(this)},
$ian:1}
A.bg.prototype={
gj(a){return this.a},
cq(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
v(a,b){if(!this.cq(b))return null
return this.b[A.aK(b)]},
a4(a,b){var s,r,q,p,o,n=this.$ti
n.h("~(1,2)").a(b)
s=this.c
for(r=s.length,q=this.b,n=n.Q[1],p=0;p<r;++p){o=A.aK(s[p])
b.$2(o,n.a(q[o]))}},
gat(a){var s=this.$ti
return A.fI(this.c,new A.dh(this),s.c,s.Q[1])}}
A.dh.prototype={
$1(a){var s=this.a,r=s.$ti
return r.Q[1].a(s.b[A.aK(r.c.a(a))])},
$S(){return this.a.$ti.h("2(1)")}}
A.bm.prototype={
ah(){var s,r,q,p=this,o=p.$map
if(o==null){s=p.$ti
r=s.c
q=A.hZ(r)
o=A.i2(A.jb(),q,r,s.Q[1])
A.hf(p.a,o)
p.$map=o}return o},
v(a,b){return this.ah().v(0,b)},
a4(a,b){this.$ti.h("~(1,2)").a(b)
this.ah().a4(0,b)},
gat(a){var s=this.ah()
return s.gat(s)},
gj(a){var s=this.ah()
return s.gj(s)}}
A.dn.prototype={
$1(a){return this.a.b(a)},
$S:10}
A.bn.prototype={
I(a,b){if(b==null)return!1
return b instanceof A.bn&&this.a.I(0,b.a)&&A.fi(this)===A.fi(b)},
gl(a){return A.i7(this.a,A.fi(this))},
i(a){var s="<"+B.b.cB([A.fh(this.$ti.c)],", ")+">"
return this.a.i(0)+" with "+s}}
A.bo.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.Q[0])},
$S(){return A.jA(A.fg(this.a),this.$ti)}}
A.dF.prototype={
$0(){return B.c.cw(1000*this.a.now())},
$S:4}
A.dT.prototype={
P(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.bB.prototype={
i(a){var s=this.b
if(s==null)return"NoSuchMethodError: "+this.a
return"NoSuchMethodError: method not found: '"+s+"' on null"}}
A.ct.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.cK.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.dE.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bl.prototype={}
A.bT.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iar:1}
A.I.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.hn(r==null?"unknown":r)+"'"},
$ia6:1,
gcU(){return this},
$C:"$1",
$R:1,
$D:null}
A.ca.prototype={$C:"$0",$R:0}
A.cb.prototype={$C:"$2",$R:2}
A.cI.prototype={}
A.cG.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.hn(s)+"'"}}
A.aN.prototype={
I(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aN))return!1
return this.$_target===b.$_target&&this.a===b.a},
gl(a){return(A.eJ(this.a)^A.aY(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dG(t.K.a(this.a))+"'")}}
A.cE.prototype={
i(a){return"RuntimeError: "+this.a}}
A.cN.prototype={
i(a){return"Assertion failed: "+A.ci(this.a)}}
A.W.prototype={
gj(a){return this.a},
gbs(){return new A.bu(this,A.v(this).h("bu<1>"))},
gat(a){var s=A.v(this)
return A.fI(this.gbs(),new A.ds(this),s.c,s.Q[1])},
v(a,b){var s,r,q,p,o=this,n=null
if(typeof b=="string"){s=o.b
if(s==null)return n
r=o.aD(s,b)
q=r==null?n:r.b
return q}else if(typeof b=="number"&&(b&0x3ffffff)===b){p=o.c
if(p==null)return n
r=o.aD(p,b)
q=r==null?n:r.b
return q}else return o.bp(b)},
bp(a){var s,r,q=this,p=q.d
if(p==null)return null
s=q.b5(p,q.ap(a))
r=q.aq(s,a)
if(r<0)return null
return s[r].b},
H(a,b,c){var s,r,q=this,p=A.v(q)
p.c.a(b)
p.Q[1].a(c)
if(typeof b=="string"){s=q.b
q.b_(s==null?q.b=q.aE():s,b,c)}else if(typeof b=="number"&&(b&0x3ffffff)===b){r=q.c
q.b_(r==null?q.c=q.aE():r,b,c)}else q.bq(b,c)},
bq(a,b){var s,r,q,p,o=this,n=A.v(o)
n.c.a(a)
n.Q[1].a(b)
s=o.d
if(s==null)s=o.d=o.aE()
r=o.ap(a)
q=o.b5(s,r)
if(q==null)o.aH(s,r,[o.aF(a,b)])
else{p=o.aq(q,a)
if(p>=0)q[p].b=b
else q.push(o.aF(a,b))}},
a4(a,b){var s,r,q=this
A.v(q).h("~(1,2)").a(b)
s=q.e
r=q.r
for(;s!=null;){b.$2(s.a,s.b)
if(r!==q.r)throw A.a(A.aO(q))
s=s.c}},
b_(a,b,c){var s,r=this,q=A.v(r)
q.c.a(b)
q.Q[1].a(c)
s=r.aD(a,b)
if(s==null)r.aH(a,b,r.aF(b,c))
else s.b=c},
aF(a,b){var s=this,r=A.v(s),q=new A.du(r.c.a(a),r.Q[1].a(b))
if(s.e==null)s.e=s.f=q
else s.f=s.f.c=q;++s.a
s.r=s.r+1&67108863
return q},
ap(a){return J.fp(a)&0x3ffffff},
aq(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a3(a[r].a,b))return r
return-1},
i(a){return A.eW(this)},
aD(a,b){return a[b]},
b5(a,b){return a[b]},
aH(a,b,c){a[b]=c},
bX(a,b){delete a[b]},
aE(){var s="<non-identifier-key>",r=Object.create(null)
this.aH(r,s,r)
this.bX(r,s)
return r},
$idt:1}
A.ds.prototype={
$1(a){var s=this.a,r=A.v(s)
return r.Q[1].a(s.v(0,r.c.a(a)))},
$S(){return A.v(this.a).h("2(1)")}}
A.du.prototype={}
A.bu.prototype={
gj(a){return this.a.a},
gq(a){var s=this.a,r=new A.bv(s,s.r,this.$ti.h("bv<1>"))
r.c=s.e
return r}}
A.bv.prototype={
gp(){return this.d},
n(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.a(A.aO(q))
s=r.c
if(s==null){r.saZ(null)
return!1}else{r.saZ(s.a)
r.c=s.c
return!0}},
saZ(a){this.d=this.$ti.h("1?").a(a)},
$iC:1}
A.eB.prototype={
$1(a){return this.a(a)},
$S:11}
A.eC.prototype={
$2(a,b){return this.a(a,b)},
$S:12}
A.eD.prototype={
$1(a){return this.a(A.aK(a))},
$S:13}
A.dZ.prototype={
N(){var s=this.b
if(s===this)throw A.a(A.fF(this.a))
return s}}
A.Y.prototype={
h(a){return A.em(v.typeUniverse,this,a)},
B(a){return A.iN(v.typeUniverse,this,a)}}
A.cV.prototype={}
A.bV.prototype={
i(a){return A.K(this.a,null)},
$ifT:1}
A.cT.prototype={
i(a){return this.a}}
A.bW.prototype={$ias:1}
A.dW.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:5}
A.dV.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:14}
A.dX.prototype={
$0(){this.a.$0()},
$S:6}
A.dY.prototype={
$0(){this.a.$0()},
$S:6}
A.ek.prototype={
bO(a,b){if(self.setTimeout!=null)self.setTimeout(A.b9(new A.el(this,b),0),a)
else throw A.a(A.G("`setTimeout()` not found."))}}
A.el.prototype={
$0(){this.b.$0()},
$S:0}
A.cO.prototype={
cn(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.b1(b)
else{s=r.a
if(q.h("T<1>").b(b))s.b2(b)
else s.aA(q.c.a(b))}},
co(a,b){var s=this.a
if(this.b)s.a0(a,b)
else s.bS(a,b)}}
A.eo.prototype={
$1(a){return this.a.$2(0,a)},
$S:2}
A.ep.prototype={
$2(a,b){this.a.$2(1,new A.bl(a,t.l.a(b)))},
$S:15}
A.ew.prototype={
$2(a,b){this.a(A.d6(a),b)},
$S:16}
A.b3.prototype={
i(a){return"IterationMarker("+this.b+", "+A.u(this.a)+")"}}
A.au.prototype={
gp(){var s=this.c
if(s==null)return this.$ti.c.a(this.b)
return s.gp()},
n(){var s,r,q,p,o,n,m=this
for(s=m.$ti.h("C<1>");!0;){r=m.c
if(r!=null)if(r.n())return!0
else m.sb7(null)
q=function(a,b,c){var l,k=b
while(true)try{return a(k,l)}catch(j){l=j
k=c}}(m.a,0,1)
if(q instanceof A.b3){p=q.b
if(p===2){o=m.d
if(o==null||o.length===0){m.sb0(null)
return!1}if(0>=o.length)return A.i(o,-1)
m.a=o.pop()
continue}else{r=q.a
if(p===3)throw r
else{n=s.a(J.db(r))
if(n instanceof A.au){r=m.d
if(r==null)r=m.d=[]
B.b.F(r,m.a)
m.a=n.a
continue}else{m.sb7(n)
continue}}}}else{m.sb0(q)
return!0}}return!1},
sb0(a){this.b=this.$ti.h("1?").a(a)},
sb7(a){this.c=this.$ti.h("C<1>?").a(a)},
$iC:1}
A.bU.prototype={
gq(a){return new A.au(this.a(),this.$ti.h("au<1>"))}}
A.bc.prototype={
i(a){return A.u(this.a)},
$iq:1,
gav(){return this.b}}
A.ad.prototype={
cC(a){if((this.c&15)!==6)return!0
return this.b.b.aT(t.m.a(this.d),a.a,t.w,t.K)},
cz(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.cP(q,m,a.b,o,n,t.l)
else p=l.aT(t.y.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.b7.b(A.ai(s))){if((r.c&1)!==0)throw A.a(A.c8("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.a(A.c8("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.x.prototype={
aU(a,b,c){var s,r,q,p=this.$ti
p.B(c).h("1/(2)").a(a)
s=$.t
if(s===B.e){if(b!=null&&!t.C.b(b)&&!t.y.b(b))throw A.a(A.eM(b,"onError",u.c))}else{c.h("@<0/>").B(p.c).h("1(2)").a(a)
if(b!=null)b=A.jf(b,s)}r=new A.x(s,c.h("x<0>"))
q=b==null?1:3
this.ag(new A.ad(r,q,a,b,p.h("@<1>").B(c).h("ad<1,2>")))
return r},
bA(a,b){return this.aU(a,null,b)},
bc(a,b,c){var s,r=this.$ti
r.B(c).h("1/(2)").a(a)
s=new A.x($.t,c.h("x<0>"))
this.ag(new A.ad(s,19,a,b,r.h("@<1>").B(c).h("ad<1,2>")))
return s},
cf(a){this.a=this.a&1|16
this.c=a},
ay(a){this.a=a.a&30|this.a&1
this.c=a.c},
ag(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.ag(a)
return}r.ay(s)}A.b7(null,null,r.b,t.M.a(new A.e3(r,a)))}},
ba(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.ba(a)
return}m.ay(n)}l.a=m.aj(a)
A.b7(null,null,m.b,t.M.a(new A.ea(l,m)))}},
ai(){var s=t.F.a(this.c)
this.c=null
return this.aj(s)},
aj(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bW(a){var s,r,q,p=this
p.a^=2
try{a.aU(new A.e6(p),new A.e7(p),t.P)}catch(q){s=A.ai(q)
r=A.af(q)
A.jJ(new A.e8(p,s,r))}},
az(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
s=r.ai()
q.c.a(a)
r.a=8
r.c=a
A.b2(r,s)},
aA(a){var s,r=this
r.$ti.c.a(a)
s=r.ai()
r.a=8
r.c=a
A.b2(r,s)},
a0(a,b){var s
t.l.a(b)
s=this.ai()
this.cf(A.de(a,b))
A.b2(this,s)},
b1(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("T<1>").b(a)){this.b2(a)
return}this.bT(s.c.a(a))},
bT(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.b7(null,null,s.b,t.M.a(new A.e5(s,a)))},
b2(a){var s=this,r=s.$ti
r.h("T<1>").a(a)
if(r.b(a)){if((a.a&16)!==0){s.a^=2
A.b7(null,null,s.b,t.M.a(new A.e9(s,a)))}else A.eZ(a,s)
return}s.bW(a)},
bS(a,b){this.a^=2
A.b7(null,null,this.b,t.M.a(new A.e4(this,a,b)))},
$iT:1}
A.e3.prototype={
$0(){A.b2(this.a,this.b)},
$S:0}
A.ea.prototype={
$0(){A.b2(this.b,this.a.a)},
$S:0}
A.e6.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.aA(p.$ti.c.a(a))}catch(q){s=A.ai(q)
r=A.af(q)
p.a0(s,r)}},
$S:5}
A.e7.prototype={
$2(a,b){this.a.a0(t.K.a(a),t.l.a(b))},
$S:17}
A.e8.prototype={
$0(){this.a.a0(this.b,this.c)},
$S:0}
A.e5.prototype={
$0(){this.a.aA(this.b)},
$S:0}
A.e9.prototype={
$0(){A.eZ(this.b,this.a)},
$S:0}
A.e4.prototype={
$0(){this.a.a0(this.b,this.c)},
$S:0}
A.ed.prototype={
$0(){var s,r,q,p,o,n,m=this,l=null
try{q=m.a.a
l=q.b.b.bz(t.b.a(q.d),t.z)}catch(p){s=A.ai(p)
r=A.af(p)
q=m.c&&t.n.a(m.b.a.c).a===s
o=m.a
if(q)o.c=t.n.a(m.b.a.c)
else o.c=A.de(s,r)
o.b=!0
return}if(l instanceof A.x&&(l.a&24)!==0){if((l.a&16)!==0){q=m.a
q.c=t.n.a(l.c)
q.b=!0}return}if(t.d.b(l)){n=m.b.a
q=m.a
q.c=l.bA(new A.ee(n),t.z)
q.b=!1}},
$S:0}
A.ee.prototype={
$1(a){return this.a},
$S:18}
A.ec.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.aT(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.ai(l)
r=A.af(l)
q=this.a
q.c=A.de(s,r)
q.b=!0}},
$S:0}
A.eb.prototype={
$0(){var s,r,q,p,o,n,m=this
try{s=t.n.a(m.a.a.c)
p=m.b
if(p.a.cC(s)&&p.a.e!=null){p.c=p.a.cz(s)
p.b=!1}}catch(o){r=A.ai(o)
q=A.af(o)
p=t.n.a(m.a.a.c)
n=m.b
if(p.a===r)n.c=p
else n.c=A.de(r,q)
n.b=!0}},
$S:0}
A.cP.prototype={}
A.bI.prototype={
gj(a){var s,r,q=this,p={},o=new A.x($.t,t.aQ)
p.a=0
s=A.v(q)
r=s.h("~(1)?").a(new A.dO(p,q))
t.Z.a(new A.dP(p,o))
A.cU(q.a,q.b,r,!1,s.c)
return o},
gbo(a){var s,r=this,q=A.v(r),p=new A.x($.t,q.h("x<1>"))
q.h("~(1)?").a(null)
t.Z.a(new A.dM(p))
s=A.cU(r.a,r.b,null,!1,q.c)
s.cF(new A.dN(r,s,p))
return p}}
A.dO.prototype={
$1(a){A.v(this.b).c.a(a);++this.a.a},
$S(){return A.v(this.b).h("~(1)")}}
A.dP.prototype={
$0(){this.b.az(this.a.a)},
$S:0}
A.dM.prototype={
$0(){var s,r,q,p,o
try{q=A.eS()
throw A.a(q)}catch(p){s=A.ai(p)
r=A.af(p)
q=s
o=r
if(o==null)o=A.fr(q)
this.a.a0(q,o)}},
$S:0}
A.dN.prototype={
$1(a){A.iV(this.b,this.c,A.v(this.a).c.a(a))},
$S(){return A.v(this.a).h("~(1)")}}
A.bJ.prototype={}
A.d2.prototype={}
A.eq.prototype={
$0(){return this.a.az(this.b)},
$S:0}
A.bZ.prototype={$ifV:1}
A.ev.prototype={
$0(){var s=this.a,r=this.b
A.ex(s,"error",t.K)
A.ex(r,"stackTrace",t.l)
A.hX(s,r)},
$S:0}
A.d1.prototype={
cQ(a){var s,r,q
t.M.a(a)
try{if(B.e===$.t){a.$0()
return}A.ha(null,null,this,a,t.H)}catch(q){s=A.ai(q)
r=A.af(q)
A.eu(t.K.a(s),t.l.a(r))}},
cR(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.e===$.t){a.$1(b)
return}A.hb(null,null,this,a,b,t.H,c)}catch(q){s=A.ai(q)
r=A.af(q)
A.eu(t.K.a(s),t.l.a(r))}},
bi(a){return new A.ei(this,t.M.a(a))},
cl(a,b){return new A.ej(this,b.h("~(0)").a(a),b)},
bz(a,b){b.h("0()").a(a)
if($.t===B.e)return a.$0()
return A.ha(null,null,this,a,b)},
aT(a,b,c,d){c.h("@<0>").B(d).h("1(2)").a(a)
d.a(b)
if($.t===B.e)return a.$1(b)
return A.hb(null,null,this,a,b,c,d)},
cP(a,b,c,d,e,f){d.h("@<0>").B(e).B(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.t===B.e)return a.$2(b,c)
return A.jg(null,null,this,a,b,c,d,e,f)},
bv(a,b,c,d){return b.h("@<0>").B(c).B(d).h("1(2,3)").a(a)}}
A.ei.prototype={
$0(){return this.a.cQ(this.b)},
$S:0}
A.ej.prototype={
$1(a){var s=this.c
return this.a.cR(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.eh.prototype={
ap(a){return A.eJ(a)&1073741823},
aq(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;++r){q=a[r].a
if(q==null?b==null:q===b)return r}return-1}}
A.bR.prototype={
v(a,b){if(!A.c2(this.z.$1(b)))return null
return this.bH(b)},
H(a,b,c){var s=this.$ti
this.bI(s.c.a(b),s.Q[1].a(c))},
ap(a){return this.y.$1(this.$ti.c.a(a))&1073741823},
aq(a,b){var s,r,q,p
if(a==null)return-1
s=a.length
for(r=this.$ti.c,q=this.x,p=0;p<s;++p)if(A.c2(q.$2(r.a(a[p].a),r.a(b))))return p
return-1}}
A.eg.prototype={
$1(a){return this.a.b(a)},
$S:19}
A.bq.prototype={}
A.bw.prototype={$io:1,$if:1,$iD:1}
A.m.prototype={
gq(a){return new A.aC(a,this.gj(a),A.N(a).h("aC<m.E>"))},
O(a,b){return this.v(a,b)},
gbr(a){return this.gj(a)===0},
aV(a,b){var s,r,q,p,o=this
if(o.gbr(a)){s=J.fE(0,A.N(a).h("m.E"))
return s}r=o.v(a,0)
q=A.aD(o.gj(a),r,!0,A.N(a).h("m.E"))
for(p=1;p<o.gj(a);++p)B.b.H(q,p,o.v(a,p))
return q},
cT(a){return this.aV(a,!0)},
bw(a,b){this.c_(a,A.N(a).h("E(m.E)").a(b),!1)},
c_(a,b,c){var s,r,q,p,o=this,n=A.N(a)
n.h("E(m.E)").a(b)
s=A.n([],n.h("w<m.E>"))
r=o.gj(a)
for(q=0;q<r;++q){p=o.v(a,q)
if(J.a3(b.$1(p),!1))B.b.F(s,p)
if(r!==o.gj(a))throw A.a(A.aO(a))}if(s.length!==o.gj(a)){o.a9(a,0,s.length,s)
o.sj(a,s.length)}},
a9(a,b,c,d){var s,r,q,p=A.N(a)
p.h("f<m.E>").a(d)
A.il(b,c,this.gj(a))
s=c-b
if(s===0)return
A.b_(0,"skipCount")
r=p.h("D<m.E>").b(d)?d:A.ip(d,0,null,A.P(d).c).aV(0,!1)
if(s>r.length)throw A.a(A.bH("Too few elements"))
if(0<b)for(q=s-1;q>=0;--q){if(!(q<r.length))return A.i(r,q)
this.H(a,b+q,r[q])}else for(q=0;q<s;++q){if(!(q<r.length))return A.i(r,q)
this.H(a,b+q,r[q])}},
i(a){return A.fC(a,"[","]")}}
A.bx.prototype={}
A.dv.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=r.a+=A.u(a)
r.a=s+": "
r.a+=A.u(b)},
$S:20}
A.ao.prototype={
gj(a){var s=this.gbs()
return s.gj(s)},
i(a){return A.eW(this)},
$ian:1}
A.bS.prototype={}
A.ce.prototype={
I(a,b){if(b==null)return!1
return b instanceof A.ce&&this.a===b.a&&!0},
gl(a){var s=this.a
return(s^B.a.aI(s,30))&1073741823},
i(a){var s=this,r=A.hU(A.ih(s)),q=A.cf(A.ie(s)),p=A.cf(A.ia(s)),o=A.cf(A.ib(s)),n=A.cf(A.id(s)),m=A.cf(A.ig(s)),l=A.hV(A.ic(s)),k=r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l
return k}}
A.e_.prototype={}
A.q.prototype={
gav(){return A.af(this.$thrownJsError)}}
A.bb.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.ci(s)
return"Assertion failed"}}
A.as.prototype={}
A.cz.prototype={
i(a){return"Throw of null."}}
A.a4.prototype={
gaC(){return"Invalid argument"+(!this.a?"(s)":"")},
gaB(){return""},
i(a){var s,r,q=this,p=q.c,o=p==null?"":" ("+p+")",n=q.d,m=n==null?"":": "+n,l=q.gaC()+o+m
if(!q.a)return l
s=q.gaB()
r=A.ci(q.b)
return l+s+": "+r}}
A.aZ.prototype={
gaC(){return"RangeError"},
gaB(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.u(q):""
else if(q==null)s=": Not greater than or equal to "+A.u(r)
else if(q>r)s=": Not in inclusive range "+A.u(r)+".."+A.u(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.u(r)
return s}}
A.co.prototype={
gaC(){return"RangeError"},
gaB(){if(A.d6(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.cL.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.cJ.prototype={
i(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.bG.prototype={
i(a){return"Bad state: "+this.a}}
A.cc.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.ci(s)+"."}}
A.bF.prototype={
i(a){return"Stack Overflow"},
gav(){return null},
$iq:1}
A.cd.prototype={
i(a){var s="Reading static variable '"+this.a+"' during its initialization"
return s}}
A.e2.prototype={
i(a){return"Exception: "+this.a}}
A.f.prototype={
cK(a,b){var s,r
A.v(this).h("f.E(f.E,f.E)").a(b)
s=this.gq(this)
if(!s.n())throw A.a(A.eS())
r=s.gp()
for(;s.n();)r=b.$2(r,s.gp())
return r},
gj(a){var s,r=this.gq(this)
for(s=0;r.n();)++s
return s},
O(a,b){var s,r,q
A.b_(b,"index")
for(s=this.gq(this),r=0;s.n();){q=s.gp()
if(b===r)return q;++r}throw A.a(A.cp(b,this,"index",null,r))},
i(a){return A.i0(this,"(",")")}}
A.C.prototype={}
A.z.prototype={
gl(a){return A.j.prototype.gl.call(this,this)},
i(a){return"null"}}
A.j.prototype={$ij:1,
I(a,b){return this===b},
gl(a){return A.aY(this)},
i(a){return"Instance of '"+A.dG(this)+"'"},
toString(){return this.i(this)}}
A.d3.prototype={
i(a){return""},
$iar:1}
A.dL.prototype={
gct(){var s,r=this.b
if(r==null)r=$.bC.$0()
s=r-this.a
if($.fm()===1000)return s
return B.a.k(s,1000)},
aS(a){var s=this.b
this.a=s==null?$.bC.$0():s}}
A.cH.prototype={
gj(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.d.prototype={}
A.c5.prototype={
i(a){var s=String(a)
s.toString
return s}}
A.c7.prototype={
i(a){var s=String(a)
s.toString
return s}}
A.ay.prototype={
sK(a,b){a.height=b},
sE(a,b){a.width=b},
$iay:1}
A.be.prototype={
san(a,b){a.fillStyle=b},
sao(a,b){a.imageSmoothingEnabled=!1},
bn(a,b,c,d,e){if(e!=null)a.fillText(b,c,d,e)
else a.fillText(b,c,d)},
cv(a,b,c,d){return this.bn(a,b,c,d,null)},
$ibe:1}
A.Z.prototype={
gj(a){return a.length}}
A.aQ.prototype={
aw(a,b){var s=$.ho(),r=s[b]
if(typeof r=="string")return r
r=this.cj(a,b)
s[b]=r
return r},
cj(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.hq()+b
r=s in a
r.toString
if(r)return s
return b},
aG(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.di.prototype={}
A.dj.prototype={
i(a){var s=String(a)
s.toString
return s}}
A.cR.prototype={
gbr(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
v(a,b){var s=this.b
if(!(b>=0&&b<s.length))return A.i(s,b)
return t.h.a(s[b])},
H(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.i(s,b)
this.a.replaceChild(c,s[b]).toString},
sj(a,b){throw A.a(A.G("Cannot resize element lists"))},
gq(a){var s=this.cT(this)
return new J.H(s,s.length,A.P(s).h("H<1>"))},
bw(a,b){this.c2(0,t.I.a(b),!1)},
c2(a,b,c){var s,r
t.I.a(b)
s=J.fo(this.a)
r=A.v(s)
r.h("E(m.E)").a(b)
for(s=s.gq(s),r=new A.aH(s,b,r.h("aH<m.E>"));r.n();)J.fq(s.gp())},
a9(a,b,c,d){t.B.a(d)
throw A.a(A.eY(null))}}
A.k.prototype={
gbl(a){var s=a.children
s.toString
return new A.cR(a,s)},
i(a){var s=a.localName
s.toString
return s},
$ik:1}
A.b.prototype={$ib:1}
A.B.prototype={
bR(a,b,c,d){return a.addEventListener(b,A.b9(t.o.a(c),1),!1)},
cc(a,b,c,d){return a.removeEventListener(b,A.b9(t.o.a(c),1),!1)},
$iB:1}
A.cl.prototype={
gj(a){return a.length}}
A.am.prototype={
gj(a){var s=a.length
s.toString
return s},
v(a,b){var s=b>>>0!==b||b>=a.length
s.toString
if(s)throw A.a(A.cp(b,a,null,null,null))
s=a[b]
s.toString
return s},
H(a,b,c){t.G.a(c)
throw A.a(A.G("Cannot assign element of immutable List."))},
sj(a,b){throw A.a(A.G("Cannot resize immutable List."))},
O(a,b){if(!(b>=0&&b<a.length))return A.i(a,b)
return a[b]},
$io:1,
$ics:1,
$if:1,
$iD:1,
$iam:1}
A.aS.prototype={
sbD(a,b){a.src=b},
$iaS:1}
A.a_.prototype={$ia_:1}
A.cQ.prototype={
H(a,b,c){var s,r
t.G.a(c)
s=this.a
r=s.childNodes
if(!(b>=0&&b<r.length))return A.i(r,b)
s.replaceChild(c,r[b]).toString},
gq(a){var s=this.a.childNodes
return new A.az(s,s.length,A.N(s).h("az<V.E>"))},
a9(a,b,c,d){t.cH.a(d)
throw A.a(A.G("Cannot setRange on Node list"))},
gj(a){return this.a.childNodes.length},
sj(a,b){throw A.a(A.G("Cannot set length on immutable List."))},
v(a,b){var s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.i(s,b)
return s[b]}}
A.h.prototype={
cL(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
cO(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.hK(s,b,a)}catch(q){}return a},
i(a){var s=a.nodeValue
return s==null?this.bG(a):s},
cd(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$ih:1}
A.bA.prototype={
gj(a){var s=a.length
s.toString
return s},
v(a,b){var s=b>>>0!==b||b>=a.length
s.toString
if(s)throw A.a(A.cp(b,a,null,null,null))
s=a[b]
s.toString
return s},
H(a,b,c){t.G.a(c)
throw A.a(A.G("Cannot assign element of immutable List."))},
sj(a,b){throw A.a(A.G("Cannot resize immutable List."))},
O(a,b){if(!(b>=0&&b<a.length))return A.i(a,b)
return a[b]},
$io:1,
$ics:1,
$if:1,
$iD:1}
A.cF.prototype={
gj(a){return a.length}}
A.M.prototype={}
A.b1.prototype={
by(a,b){var s
t.f.a(b)
this.bZ(a)
s=A.fe(b,t.p)
s.toString
return this.ce(a,s)},
ce(a,b){var s=a.requestAnimationFrame(A.b9(t.f.a(b),1))
s.toString
return s},
bZ(a){var s=!!(a.requestAnimationFrame&&a.cancelAnimationFrame)
s.toString
if(s)return;(function(b){var r=["ms","moz","webkit","o"]
for(var q=0;q<r.length&&!b.requestAnimationFrame;++q){b.requestAnimationFrame=b[r[q]+"RequestAnimationFrame"]
b.cancelAnimationFrame=b[r[q]+"CancelAnimationFrame"]||b[r[q]+"CancelRequestAnimationFrame"]}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)}}
A.eQ.prototype={}
A.bP.prototype={}
A.aJ.prototype={}
A.bQ.prototype={
cm(){var s=this
if(s.b==null)return $.eL()
s.bf()
s.b=null
s.sb8(null)
return $.eL()},
cF(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.a(A.bH("Subscription has been canceled."))
r.bf()
s=A.fe(new A.e1(a),t.A)
r.sb8(s)
r.bd()},
bd(){var s,r=this.d,q=r!=null
if(q&&!0){s=this.b
s.toString
t.o.a(r)
if(q)J.hI(s,this.c,r,!1)}},
bf(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.hJ(s,this.c,t.o.a(r),!1)}},
sb8(a){this.d=t.o.a(a)}}
A.e0.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:7}
A.e1.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:7}
A.V.prototype={
gq(a){return new A.az(a,this.gj(a),A.N(a).h("az<V.E>"))},
a9(a,b,c,d){A.N(a).h("f<V.E>").a(d)
throw A.a(A.G("Cannot setRange on immutable List."))}}
A.az.prototype={
n(){var s=this,r=s.c+1,q=s.b
if(r<q){s.sb6(J.hH(s.a,r))
s.c=r
return!0}s.sb6(null)
s.c=q
return!1},
gp(){return this.$ti.c.a(this.d)},
sb6(a){this.d=this.$ti.h("1?").a(a)},
$iC:1}
A.cS.prototype={}
A.cW.prototype={}
A.cX.prototype={}
A.cY.prototype={}
A.cZ.prototype={}
A.cj.prototype={
ga1(){var s=this.b,r=A.v(s)
return new A.a8(new A.bO(s,r.h("E(m.E)").a(new A.dk()),r.h("bO<m.E>")),r.h("k(m.E)").a(new A.dl()),r.h("a8<m.E,k>"))},
H(a,b,c){var s
t.h.a(c)
s=this.ga1()
J.hL(s.b.$1(J.da(s.a,b)),c)},
sj(a,b){var s=J.ak(this.ga1().a)
if(b>=s)return
else if(b<0)throw A.a(A.c8("Invalid list length",null))
this.cM(0,b,s)},
a9(a,b,c,d){t.B.a(d)
throw A.a(A.G("Cannot setRange on filtered list"))},
cM(a,b,c){var s=this.ga1()
s=A.io(s,b,s.$ti.h("f.E"))
B.b.a4(A.fH(A.ir(s,c-b,A.v(s).h("f.E")),!0,t.z),new A.dm())},
gj(a){return J.ak(this.ga1().a)},
v(a,b){var s=this.ga1()
return s.b.$1(J.da(s.a,b))},
gq(a){var s=A.fH(this.ga1(),!1,t.h)
return new J.H(s,s.length,A.P(s).h("H<1>"))}}
A.dk.prototype={
$1(a){return t.h.b(t.G.a(a))},
$S:21}
A.dl.prototype={
$1(a){return t.h.a(t.G.a(a))},
$S:22}
A.dm.prototype={
$1(a){return J.fq(a)},
$S:2}
A.d0.prototype={
bN(a){var s,r,q,p,o,n,m,l=this,k=4294967296,j=a<0?-1:0
do{s=a>>>0
a=B.a.k(a-s,k)
r=a>>>0
a=B.a.k(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.a.k(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.a.k(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.a.k(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.a.k(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.a.k(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==j)
if(o===0&&n===0)l.a=23063
l.T()
l.T()
l.T()
l.T()},
T(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.a.k(o-n+(q-p)+(m-r),4294967296)>>>0},
G(a){var s,r,q,p=this
if(a<=0||a>4294967296)throw A.a(A.ik("max must be in range 0 < max \u2264 2^32, was "+a))
s=a-1
if((a&s)>>>0===0){p.T()
return(p.a&s)>>>0}do{p.T()
r=p.a
q=r%a}while(r-q+a>=4294967296)
return q},
bt(){var s,r=this
r.T()
s=r.a
r.T()
return((s&67108863)*134217728+(r.a&134217727))/9007199254740992},
$iij:1}
A.c.prototype={
gbl(a){return new A.cj(new A.cQ(a))}}
A.by.prototype={}
A.aI.prototype={
i(a){return"_DungeonTile."+this.b}}
A.bh.prototype={
bj(){var s=this
return A.jd(function(){var r=0,q=1,p,o,n,m,l
return function $async$bj(a,b){if(a===1){p=b
r=q}while(true)switch(r){case 0:m=s.c
l=s.a.a.a
l=l.a*l.b
o=0
case 2:if(!!0){r=3
break}if(!(s.f/l<0.33&&o<100)){r=3
break}n=m.cD()
r=s.bV(n)?4:6
break
case 4:s.ca(n)
r=7
return"Room"
case 7:o=0
r=5
break
case 6:++o
case 5:r=2
break
case 3:return A.ix()
case 1:return A.iy(p)}}},t.N)},
ca(a){var s,r,q,p,o,n,m,l,k,j,i=this
for(s=a.a,r=s.au(),q=r.length,p=i.a,o=i.b,n=p.$ti.c,p=p.a,m=p.$ti.c,l=0;l<r.length;r.length===q||(0,A.aL)(r),++l){k=r[l]
j=o.v(0,B.a9)
j.toString
p.A(k.a,k.b,m.a(n.a(j)))}B.b.F(i.e,a)
i.f=i.f+s.b.gbh()},
bV(a){var s,r,q,p
for(s=this.e,r=s.length,q=a.a,p=0;p<s.length;s.length===r||(0,A.aL)(s),++p)if(s[p].a.cs(q)<1)return!1
return!0}}
A.bM.prototype={
gq(a){var s=this.a.b
return new J.H(s,s.length,A.P(s).h("H<1>"))}}
A.bD.prototype={
i(a){return"roomConstraint(min: "+this.a+", max: "+this.b+")"}}
A.cD.prototype={}
A.dJ.prototype={
cD(){var s,r,q,p,o,n=this,m=n.cb(),l=n.c,k=l.a
l=l.b
s=n.b
r=s.a
s=s.b
q=n.d
while(!0){p=m.a
o=m.b
if(!((p>=o?p/o:o/p)>q))break
p=$.aj()
o=p.a.G(s+1-r)+r
p=p.a.G(l+1-k)+k
m=new A.e(o,p)}l=$.aj()
k=n.a
return new A.cD(new A.A(new A.e(l.as(k.gw(k),k.gD(k)-p),l.as(k.gu(k),k.gC(k)-o)),m))},
cb(){var s=$.aj(),r=this.b,q=this.c
return new A.e(s.as(r.a,r.b),s.as(q.a,q.b))}}
A.dR.prototype={}
A.U.prototype={
gE(a){return this.a.a},
gK(a){return this.a.b},
gq(a){var s=this.b
return new J.H(s,s.length,A.P(s).h("H<1>"))},
aW(a,b){var s,r
this.M(a,b)
s=this.b
r=b*this.a.a+a
if(!(r>=0&&r<s.length))return A.i(s,r)
return s[r]},
A(a,b,c){var s,r,q,p=this
p.$ti.c.a(c)
p.M(a,b)
s=p.b
r=b*p.a.a+a
if(!(r>=0&&r<s.length))return A.i(s,r)
q=s[r]
B.b.H(s,r,c)
return q},
M(a,b){var s=this,r=null
if(a<0||a>=s.a.a)throw A.a(A.X(a,0,s.gE(s)-1,r,r))
if(b<0||b>=s.a.b)throw A.a(A.X(b,0,s.gK(s)-1,r,r))}}
A.aR.prototype={}
A.dq.prototype={}
A.A.prototype={
gu(a){var s=this.a.b
return Math.min(s,s+this.b.b)},
gD(a){var s=this.a.a
return Math.max(s,s+this.b.a)},
gC(a){var s=this.a.b
return Math.max(s,s+this.b.b)},
gw(a){var s=this.a.a
return Math.min(s,s+this.b.a)},
bm(a,b){var s=this,r=s.b
if(r.a===0||r.b===0)throw A.a(A.bH("Cannot clamp a vector inside a Rect with width or height of 0"))
return new A.e(B.c.Y(B.a.aL(b.a,s.gw(s),s.gD(s)-1)),B.c.Y(B.a.aL(b.b,s.gu(s),s.gC(s)-1)))},
cp(a,b){var s=this.cr(b)
return s},
cr(a){var s=this
if(a.gu(a)>=s.gu(s)&&a.gD(a)<=s.gD(s)&&a.gC(a)<=s.gC(s)&&a.gw(a)>=s.gw(s))return!0
else return!1},
cs(a){var s,r,q,p=this
if(p.gu(p)>=a.gC(a))s=p.gu(p)-a.gC(a)
else s=p.gC(p)<=a.gu(a)?a.gu(a)-p.gC(p):-1
if(p.gw(p)>=a.gD(a))r=p.gw(p)-a.gD(a)
else r=p.gD(p)<=a.gw(a)?a.gw(a)-p.gD(p):-1
q=s===-1
if(q&&r===-1)return-1
if(q)return r
if(r===-1)return s
return r+s},
a_(a){var s,r,q,p,o,n,m=this
if(a===0)return m
s=m.b
r=a*2
if(s.a<r){q=m.a.a
p=q}else{p=m.gw(m)+a
q=m.gD(m)-a}if(s.b<r){o=m.a.b
n=o}else{n=m.gu(m)+a
o=m.gC(m)-a}return new A.A(new A.e(p,n),new A.e(q-p,o-n))},
bk(a,b){var s=this
return new A.A(new A.e(s.gw(s)+B.a.k(s.gD(s)-s.gw(s)-a,2),s.gu(s)+B.a.k(s.gC(s)-s.gu(s)-b,2)),new A.e(a,b))},
au(){var s,r,q,p,o,n,m=this,l=A.n([],t.bY)
for(s=m.gu(m),r=m.a,q=r.b,p=m.b,q=Math.max(q,q+p.b),r=r.a,p=r+p.a;s<q;++s)for(o=Math.min(r,p),n=Math.max(r,p);o<n;++o)B.b.F(l,new A.e(o,s))
return l},
I(a,b){var s=this
if(b==null)return!1
if(!(b instanceof A.A))return!1
return s.gu(s)===b.gu(b)&&s.gD(s)===b.gD(b)&&s.gC(s)===b.gC(b)&&s.gw(s)===b.gw(b)},
gl(a){var s,r=this,q=new A.e(r.gw(r),r.gu(r))
q=q.gl(q)
s=new A.e(r.gD(r),r.gC(r))
return(q^s.gl(s))>>>0},
i(a){var s=this
return"rect("+s.gu(s)+", "+s.gD(s)+", "+s.gC(s)+", "+s.gw(s)+")"}}
A.dI.prototype={
cJ(a,b){var s=this.a
return b==null?s.G(a):s.G(b-a)+a},
as(a,b){var s=this.cJ(a,b+1)
return s}}
A.dS.prototype={}
A.b0.prototype={
gq(a){var s=[this.a,this.b]
return new J.H(s,2,A.P(s).h("H<1>"))}}
A.cM.prototype={
gbh(){return Math.abs(this.a)*Math.abs(this.b)},
gj(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
Z(a,b){return new A.e(this.a+b.a,this.b+b.b)},
I(a,b){if(b==null)return!1
if(!(b instanceof A.cM))return!1
return this.a===b.a&&this.b===b.b},
gl(a){var s,r=this.a,q=r>=0?2*r:-2*r-1
r=this.b
s=r>=0?2*r:-2*r-1
r=q+s
return B.a.k(r*(r+1),2)+s},
i(a){return"vec2("+this.a+", "+this.b+")"}}
A.e.prototype={}
A.df.prototype={
i(a){return"CanvasRendererType."+this.b}}
A.al.prototype={}
A.c9.prototype={}
A.dg.prototype={
$1(a){return t.E.b(t.h.a(a))},
$S:23}
A.R.prototype={
gl(a){var s=this.b,r=this.c
return B.a.gl(this.a)^s.gl(s)^r.gl(r)},
I(a,b){if(b==null)return!1
if(b instanceof A.R)return this.a===b.a&&this.b.I(0,b.b)&&this.c.I(0,b.c)
else return!1}}
A.l.prototype={
gl(a){return B.a.gl(this.a)^B.a.gl(this.b)^B.a.gl(this.c)},
I(a,b){if(b==null)return!1
if(b instanceof A.l)return this.a===b.a&&this.b===b.b&&this.c===b.c
return!1}}
A.ck.prototype={
gaJ(){return this.d.b},
gaK(){return this.d.a},
ga5(a){return A.eR(null,t.H)},
bx(a,b,c){var s,r,q,p,o=this.b
o.textBaseline="top"
o.font=this.c
s=c.c
B.j.san(o,"rgb("+s.a+", "+s.b+", "+s.c+")")
s=this.d
r=s.a
q=a*r
s=b*s.b
B.j.cv(o,A.eX(9608),q,s)
p=c.b
B.j.san(o,"rgb("+p.a+", "+p.b+", "+p.c+")")
B.j.bn(o,A.eX(c.a),q,s,r)}}
A.cn.prototype={
gaK(){return this.c.a},
gaJ(){return this.c.b},
ga5(a){var s=0,r=A.fc(t.H),q,p=this
var $async$ga5=A.fd(function(b,c){if(b===1)return A.f4(c,r)
while(true)switch(s){case 0:if(p.y){q=A.eR(null,t.H)
s=1
break}s=3
return A.f3(p.x,$async$ga5)
case 3:p.y=!0
s=1
break
case 1:return A.f5(q,r)}})
return A.f6($async$ga5,r)},
bL(a,b,c,d,e){var s=this,r=s.f,q=t.bt,p=new A.aJ(r,"load",!1,q)
s.sc1(p.gbo(p))
q=new A.aJ(r,"error",!1,q)
q.gbo(q).bA(new A.dp(s),t.ck)
B.at.sbD(r,a)
r=s.c
A.d9("CHAR width "+r.a+", height "+r.b)},
bx(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(!h.y)return
s=h.b
r=c.c
B.j.san(s,"rgb("+r.a+", "+r.b+", "+r.c+")")
r=h.c
q=r.a
p=h.a
o=a*q*p
r=r.b
n=b*r*p
m=q*p
p=r*p
s.fillRect(o,n,m,p)
l=c.a
if(l===0||l===32||l===160)return
k=h.d.v(0,l)
l=k==null?l:k
j=B.a.bB(l,32)
if(l>h.e)return
i=h.c0(c.b)
B.j.sao(s,!1)
s.drawImage(i,j*q,(l/32|0)*r,q,r,o,n,m,p)},
c0(a){var s,r,q,p,o=this.r,n=o.v(0,a)
if(n!=null)return n
s=this.f
r=s.width
q=A.fy(s.height,r)
r=q.style
r.toString
B.m.aG(r,B.m.aw(r,"image-rendering"),"pixelated","")
p=q.getContext("2d")
p.translate(0.5,0.5)
B.j.sao(p,!1)
p.drawImage(s,0,0)
p.globalCompositeOperation="source-atop"
B.j.san(p,"rgb("+a.a+", "+a.b+", "+a.c+")")
s=q.width
s.toString
r=q.height
r.toString
p.fillRect(0,0,s,r)
o.H(0,a,q)
return q},
sc1(a){this.x=t.a_.a(a)}}
A.dp.prototype={
$1(a){t.A.a(a)
return A.ah(A.bH("Failed to load glyphs from "+A.u(this.a.f.src)))},
$S:24}
A.cu.prototype={
a2(a,b){this.a.H(0,new A.b4(b,!1,!1,!1),this.$ti.c.a(a))}}
A.b4.prototype={
I(a,b){var s=this
if(b==null)return!1
if(b instanceof A.b4)return s.a===b.a&&s.b===b.b&&s.d===b.d&&s.e===b.e
return!1},
gl(a){var s=this,r=519018,q=218159,p=B.l.gl(s.a),o=s.b?r:q,n=s.d?r:q,m=s.e?r:q
return(p^o^n^m)>>>0},
i(a){var s=this,r="KEY("+s.a
if(s.b)r+=" shift"
if(s.d)r+=" alt/opt"
return(s.e?r+" win/cmd":r)+")"}}
A.aq.prototype={}
A.ab.prototype={
al(a,b,c,d,e){var s,r,q
if(d==null)d=B.d
if(e==null)e=B.h
for(s=c.length,r=0;r<s;++r){q=a+r
if(q>=this.gE(this))break
this.L(q,b,A.S(B.l.b3(c,r),d,e))}},
ac(a,b,c,d){return this.al(a,b,c,d,null)},
a3(a,b,c){return this.al(a,b,c,null,null)},
aO(a,b,c,d){var s=this,r=b.length
s.al(r>=s.gE(s)?0:B.a.k(s.gE(s)-r,2),a,b,c,d)},
am(a,b,c){return this.aO(a,b,c,null)},
cu(a,b,c,d,e){var s,r,q,p,o
this.J(b,c)
s=b+d
r=c+e
this.J(s-1,r-1)
q=A.S(32,B.d,B.h)
for(p=c;p<r;++p)for(o=b;o<s;++o)this.L(o,p,q)},
R(a,b,c,d){this.J(a,b)
this.J(a+c-1,b+d-1)
return new A.bf(new A.e(a,b),new A.e(c,d),this)},
ab(a){var s=a.a,r=a.b
return this.R(s.a,s.b,r.a,r.b)},
J(a,b){var s=this,r=null
if(a<0||a>=s.gE(s))throw A.a(A.X(a,0,s.gE(s)-1,r,r))
if(b<0||b>=s.gK(s))throw A.a(A.X(b,0,s.gK(s)-1,r,r))}}
A.bf.prototype={
gE(a){return this.d.a},
gK(a){return this.d.b},
L(a,b,c){var s
t.x.a(c)
this.J(a,b)
s=this.c
this.e.L(s.a+a,s.b+b,c)},
R(a,b,c,d){var s=this
s.J(a,b)
s.J(a+c-1,b+d-1)
return new A.bf(s.c.Z(0,new A.e(a,b)),new A.e(c,d),s.e)}}
A.ap.prototype={
gE(a){return this.c.a.a.a},
gK(a){return this.c.a.a.b},
L(a,b,c){var s,r
t.x.a(c)
this.J(a,b)
s=this.c
r=s.b
if(!J.a3(s.a.aW(a,b),c))r.A(a,b,c)
else r.A(a,b,null)}}
A.dQ.prototype={
bC(a,b,c){var s=this.b
if(!J.a3(this.a.aW(a,b),c))s.A(a,b,c)
else s.A(a,b,null)},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=this.a,r=s.a,q=r.b,r=r.a,p=this.b,o=p.b,n=p.a.a,m=o.length,l=0;l<q;++l)for(k=l*n,j=0;j<r;++j){p.M(j,l)
i=k+j
if(!(i>=0&&i<m))return A.i(o,i)
h=o[i]
if(h==null)continue
a.bx(j,l,h)
s.A(j,l,h)
p.A(j,l,null)}}}
A.bd.prototype={
t(a){this.b.t(a)}}
A.aW.prototype={
gU(){return!0},
gV(){return!0},
t(a){var s,r,q,p=this.b
if(!new A.A(new A.e(0,0),new A.e(a.gE(a),a.gK(a))).cp(0,p.b)){s=new A.A(new A.e(0,0),new A.e(a.gE(a),a.gK(a)))
p.b=s
p.c=s.a_(p.a)}s=a.gE(a)
r=a.gK(a)
q=p.b.b
p.t(a.ab(new A.A(new A.e(0,0),new A.e(s,r)).bk(q.a,q.b)))},
ar(a,b,c,d,e,f,g){var s,r=this
switch(c){case"Enter":r.d.$0()
s=!0
break
case"Escape":r.e.$0()
s=!0
break
case"KeyY":r.f.$0()
s=!0
break
case"KeyN":r.r.$0()
s=!0
break
default:s=!1}return s},
scH(a){this.d=t.M.a(a)},
scE(a){this.e=t.M.a(a)},
scI(a){this.f=t.M.a(a)},
scG(a){this.r=t.M.a(a)}}
A.dy.prototype={
$1(a){var s=this
a.am(0,s.a,s.b)
a.am(2,s.c,s.d)},
$S:1}
A.dz.prototype={
$0(){this.a.gm().ad(this.b)},
$S:0}
A.dA.prototype={
$0(){this.a.gm().ad(this.b)},
$S:0}
A.dB.prototype={
$0(){this.a.gm().ad(this.b)},
$S:0}
A.dC.prototype={
$0(){this.a.gm().ad(this.b)},
$S:0}
A.a9.prototype={
t(a){var s,r,q,p=this,o=p.d,n=A.S(32,B.d,o==null?B.h:o)
for(o=p.b.au(),s=o.length,r=0;r<o.length;o.length===s||(0,A.aL)(o),++r){q=o[r]
a.L(q.a,q.b,n)}p.aR(a.ab(p.c))},
aR(a){var s=this.e
if(s!=null)s.$1(a)},
sak(a){this.e=t.a0.a(a)}}
A.aa.prototype={
i(a){return"PanelBorder."+this.b}}
A.a1.prototype={
i(a){return"_BorderChars."+this.b}}
A.aM.prototype={
t(a){var s,r,q,p,o,n,m,l,k=this
k.bK(a)
s=k.r
if(s==null)s=B.d
r=k.d
if(r==null)r=B.h
for(q=k.b,p=q.gw(q)+1;q=k.b,o=q.a,n=o.a,m=q.b,p<Math.max(n,n+m.a)-1;++p){q=o.b
a.L(p,Math.min(q,q+m.b),k.S(B.aG,s,r))
m=k.b
q=m.a.b
a.L(p,Math.max(q,q+m.b.b)-1,k.S(B.aH,s,r))}for(l=q.gu(q)+1;q=k.b,o=q.a,n=o.b,m=q.b,l<Math.max(n,n+m.b)-1;++l){q=o.a
a.L(Math.min(q,q+m.a),l,k.S(B.aI,s,r))
m=k.b
q=m.a.a
a.L(Math.max(q,q+m.b.a)-1,l,k.S(B.aJ,s,r))}o=q.gw(q)
q.gu(q)
q=k.b
q.gw(q)
a.L(o,q.gu(q),k.S(B.aK,s,r))
q=k.b
o=q.gD(q)
q.gu(q)
q=k.b
q.gD(q)
a.L(o-1,q.gu(q),k.S(B.aL,s,r))
q=k.b
o=q.gD(q)
q.gC(q)
q=k.b
q.gD(q)
a.L(o-1,q.gC(q)-1,k.S(B.aN,s,r))
q=k.b
o=q.gw(q)
q.gC(q)
q=k.b
q.gw(q)
a.L(o,q.gC(q)-1,k.S(B.aM,s,r))},
S(a,b,c){var s
switch(this.f.a){case 0:return A.S(32,b,c)
case 1:s=a.a
if(!(s<8))return A.i(B.a_,s)
return A.S(B.a_[s],b,c)
case 2:s=a.a
if(!(s<8))return A.i(B.Z,s)
return A.S(B.Z[s],b,c)
case 3:s=a.a
if(!(s<8))return A.i(B.a1,s)
return A.S(B.a1[s],b,c)
case 4:s=a.a
if(!(s<8))return A.i(B.Y,s)
return A.S(B.Y[s],b,c)}}}
A.cm.prototype={}
A.aG.prototype={
gae(){return new A.A(B.E,this.d.c.a.a)},
scA(a){var s,r,q,p,o,n=this
if(n.r)return
n.r=!0
s=document
r=s.body
r.toString
q=t.ae
p=q.h("~(1)?")
o=p.a(n.gc5())
t.Z.a(null)
q=q.c
n.sc3(A.cU(r,"keydown",o,!1,q))
s=s.body
s.toString
n.sc4(A.cU(s,"keyup",p.a(n.gc7()),!1,q))},
scS(a){var s,r,q,p,o=this
t.aT.a(a)
s=a.c.a.a
r=o.d.c.a.a.I(0,s)
o.sck(a)
if(!r)for(r=o.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.aL)(r),++p)r[p].a6(0,s)
o.e=!0},
X(a){var s=this
s.$ti.h("p<1>").a(a)
A.v(a).h("aG<p.T>").a(s)
a.sbe(s)
a.a6(0,s.d.c.a.a)
a.aX(0)
B.b.F(s.a,a)
s.e=!0},
ad(a){var s,r=this.a,q=r.length
if(q===0)return
if(0>=q)return A.i(r,-1)
s=r.pop()
if(s.a!=null)s.sbe(null)
if(r.length!==0)B.b.gaQ(r).bu(s,a)
this.e=!0},
a7(){return this.ad(null)},
af(a){var s,r
for(s=this.a,r=0;r<s.length;++r)s[r].af(a)},
cN(){var s,r,q=this,p=q.e
if(!p)return
s=q.d
s.cu(0,0,0,s.gE(s),s.gK(s))
p=q.a
r=p.length-1
for(;r>=0;){if(!(r<p.length))return A.i(p,r)
if(!p[r].gV())break;--r}if(r<0)r=0
for(;r<p.length;++r)p[r].t(s)
s.c.t(s.d)
q.e=!1},
c9(a){var s,r=this
A.iQ(a)
s=r.x
r.x=a
r.af((a-s)/1000)
r.cN()
if(r.f){s=window
s.toString
B.a8.by(s,r.gb9())}},
c6(a){var s,r,q,p,o,n,m,l
t.v.a(a)
s=a.code
if(s==null)return
r=a.shiftKey
r.toString
a.ctrlKey.toString
q=a.altKey
q.toString
p=a.metaKey
p.toString
o=this.y.a.v(0,new A.b4(s,r,q,p))
s=o!=null
if(s)a.preventDefault()
r=this.a
if(r.length===0)return
n=B.b.gaQ(r)
n.gU()
if(s&&n.W(0,o))return
s=a.key
s.toString
r=a.code
r.toString
q=a.shiftKey
q.toString
p=a.ctrlKey
p.toString
m=a.altKey
m.toString
l=a.metaKey
l.toString
if(n.ar(0,s,r,m,p,l,q))a.preventDefault()},
c8(a){var s
t.v.a(a)
s=this.a
if(s.length===0)return
if(a.code==null)return
B.b.gaQ(s)
a.key.toString
a.code.toString
a.shiftKey.toString
a.ctrlKey.toString
a.altKey.toString
a.metaKey.toString},
sc3(a){this.b=t.u.a(a)},
sc4(a){this.c=t.u.a(a)},
sck(a){this.d=t.aZ.a(a)}}
A.p.prototype={
gm(){var s=this.a
if(s!=null)return s
throw A.a(A.bH("Attempted to access Layer.ui while Layer is unbound"))},
af(a){},
aX(a){},
bu(a,b){A.v(this).h("p<p.T>").a(a)},
a6(a,b){},
W(a,b){A.v(this).h("p.T").a(b)
return!1},
ar(a,b,c,d,e,f,g){return!1},
sbe(a){this.a=A.v(this).h("aG<p.T>?").a(a)}}
A.d_.prototype={}
A.c6.prototype={
gU(){return!0},
gV(){return!1},
af(a){var s,r,q,p,o,n,m,l,k,j=this
for(s=j.b,r=s.length,q=t.W,p=0;p<s.length;s.length===r||(0,A.aL)(s),++p){o=s[p]
n=o.d=o.d-o.f*a
m=o.a
o.f=((m-n)/m*4+1)*o.b
B.c.Y(o.c)
if(B.c.Y(n)<0){n=j.gm().gae()
l=j.c
if(!(l>=0&&l<4))return A.i(B.t,l)
l=q.a(B.t[l])
k=$.aj().a
o.c=k.G(n.b.a)
o.d=m
k=k.G(3)
if(!(k>=0&&k<3))return A.i(l,k)
o.e=l[k]}}if(j.a!=null)j.gm().e=!0},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
for(s=this.b,r=s.length,q=a.c,p=q.b,o=0;o<s.length;s.length===r||(0,A.aL)(s),++o){n=s[o]
m=B.c.Y(n.c)
l=B.c.Y(n.d)
k=A.S("\u25b2",n.e,f)
a.J(m,l)
j=q.a
j.M(m,l)
i=j.b
j=l*j.a.a+m
if(!(j>=0&&j<i.length))return A.i(i,j)
if(!J.a3(i[j],k))p.A(m,l,k)
else p.A(m,l,f)}h=A.S(9608,B.S,f)
for(s=q.a,r=s.a,q=r.a,r=r.b,m=r-3,g=0;g<q;++g){a.J(g,m)
s.M(g,m)
l=s.b
k=m*q+g
if(!(k>=0&&k<l.length))return A.i(l,k)
if(!J.a3(l[k],h))p.A(g,m,h)
else p.A(g,m,f)}a.am(r-1,"[\u2190\u2192] Change colors.  Press [esc] to go back.",B.i)},
W(a,b){var s
switch(b){case B.k:this.gm().a7()
s=!0
break
case B.w:this.bg(1)
s=!0
break
case B.y:this.bg(-1)
s=!0
break
default:s=!1}return s},
a6(a,b){var s,r,q,p,o,n,m,l,k,j=this.b
B.b.sj(j,0)
s=B.c.a8(b.gbh()*0.5)
for(r=b.a,q=b.b-3,p=t.W,o=0;o<s;++o){n=$.aj().a
m=n.G(r)
l=this.c
if(!(l>=0&&l<4))return A.i(B.t,l)
l=p.a(B.t[l])
k=n.G(3)
if(!(k>=0&&k<3))return A.i(l,k)
k=l[k]
B.b.F(j,new A.d_(q,n.bt()+2,m,n.bt()*q,k))}},
bg(a){var s=this.c+=a
if(s<0)this.c=3
else if(s>=4)this.c=0}}
A.cx.prototype={
gU(){return!0},
gV(){return!1},
t(a){var s=a.c,r=s.a.a,q=r.a
a.R(B.a.k(q-45,2),10,45,1).a3(0,0,"There doesn't seem to be anything here yet...")
a.R(B.a.k(q-26,2),r.b-1,26,1).ac(0,0,"[\u2191\u2193\u2190\u2192]: Move   [esc]: Quit",B.i)
r=this.d
q=r.a
r=r.b
a.J(q,r)
s.bC(q,r,this.b)},
W(a,b){var s,r,q=this
switch(b){case B.v:q.d=q.d.Z(0,B.aq)
s=!0
r=!0
break
case B.w:q.d=q.d.Z(0,B.ar)
s=!0
r=!0
break
case B.x:q.d=q.d.Z(0,B.ap)
s=!0
r=!0
break
case B.y:q.d=q.d.Z(0,B.as)
s=!0
r=!0
break
case B.k:q.gm().a7()
s=!1
r=!0
break
default:s=!1
r=!1}if(s){q.d=q.gm().gae().bm(0,q.d)
if(q.a!=null)q.gm().e=!0}return r},
a6(a,b){var s=this
if(s.c){s.d=new A.e(B.a.k(b.a,2),B.a.k(b.b,2))
s.c=!1
return}s.d=s.gm().gae().bm(0,s.d)}}
A.a5.prototype={}
A.cw.prototype={
gU(){return!0},
gV(){return!1},
bM(){this.c.sak(new A.dw())
this.d.sak(new A.dx())},
aX(a){this.ax()},
af(a){var s=this,r=s.b
if(r.gct()<=100)return
if(A.fb(s.f,"_buildSteps").n()){if(s.a!=null)s.gm().e=!0
r.aS(0)}else{if(!s.r){s.r=!0
if(s.a!=null)s.gm().e=!0}if(r.b==null)r.b=$.bC.$0()
r.aS(0)}},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
for(s=new A.A(new A.e(0,0),new A.e(a.gE(a),a.gK(a))).au(),r=s.length,q=a.c,p=q.b,o=0;o<s.length;s.length===r||(0,A.aL)(s),++o){n=s[o]
m=A.fb(h.e,"_builder").a.a
l=n.a
k=n.b
m.M(l,k)
j=m.b
m=k*m.a.a+l
if(!(m>=0&&m<j.length))return A.i(j,m)
if(j[m].a){a.J(l,k)
m=q.a
m.M(l,k)
j=m.b
m=k*m.a.a+l
if(!(m>=0&&m<j.length))return A.i(j,m)
if(!J.a3(j[m],B.K))p.A(l,k,B.K)
else p.A(l,k,null)}else{a.J(l,k)
m=q.a
m.M(l,k)
j=m.b
m=k*m.a.a+l
if(!(m>=0&&m<j.length))return A.i(j,m)
if(!J.a3(j[m],B.H))p.A(l,k,B.H)
else p.A(l,k,null)}}i=h.r?h.d:h.c
s=q.a.a
r=i.b.b
q=r.a
r=r.b
i.t(a.R(s.a-q-1,s.b-r-1,q,r))},
W(a,b){var s
switch(b){case B.k:this.gm().a7()
s=!0
break
default:s=!1}return s},
ar(a,b,c,d,e,f,g){var s
if(!this.r)return!1
switch(c){case"KeyD":this.ax()
s=!0
break
default:s=!1}return s},
a6(a,b){var s=this.b
if(s.b==null)s.b=$.bC.$0()
s.aS(0)
this.ax()},
ax(){var s,r=this,q=r.gm().gae().b.a,p=r.gm().gae().b.b,o=A.n([],t.cZ),n=t.q,m=A.aD(q*p,B.X,!1,n)
if(Math.max(9,5)/Math.min(9,5)>3)A.ah(A.bH("Room constraints always produce an aspect ratio greater than configured max: width "+B.a7.i(0)+" height "+B.a6.i(0)))
r.sbQ(t.L.a(new A.bh(new A.bM(new A.U(new A.e(q,p),m,t.e),t.cU),A.i3([B.aO,B.X,B.a9,B.B,B.aP,B.B,B.aQ,B.B],t.ba,n),new A.dJ(new A.A(new A.e(1,1),new A.e(q-1-1,p-1-1)),B.a7,B.a6,3),o,t.r)))
q=A.fb(r.e,"_builder").bj()
r.sbP(t.V.a(new A.au(q.a(),q.$ti.h("au<1>"))))
r.r=!1
q=r.b
s=q.b
if(s!=null){q.a=q.a+($.bC.$0()-s)
q.b=null}if(r.a!=null)r.gm().e=!0},
sbQ(a){this.e=t.L.a(a)},
sbP(a){this.f=t.V.a(a)}}
A.dw.prototype={
$1(a){a.a3(0,0,"Building...   [esc] Back")},
$S:1}
A.dx.prototype={
$1(a){a.a3(0,0,"[d] New dungeon   [esc] Back")},
$S:1}
A.cy.prototype={
gU(){return!0},
gV(){return!1},
t(a){var s,r,q,p,o,n,m,l,k,j,i={}
for(s=t.x,r=a.c,q=r.b,p=0;p<this.b.a.b;++p)for(o=0;n=this.b,m=n.a.a,o<m;++o){n.M(o,p)
n=n.b
m=p*m+o
if(!(m>=0&&m<n.length))return A.i(n,m)
m=s.a(n[m])
a.J(o,p)
n=r.a
n.M(o,p)
l=n.b
n=p*n.a.a+o
if(!(n>=0&&n<l.length))return A.i(l,n)
if(!J.a3(l[n],m))q.A(o,p,m)
else q.A(o,p,null)}i.a=null
s=this.c
k=new A.A(new A.e(0,0),new A.e(Math.max((s==null?i.a="No results yet. Choose a modal to get started.":i.a="Your modal result was "+s+"!").length,59)+4,7))
j=new A.a9(2,k,k.a_(2),B.Q)
j.sak(new A.dD(i,j))
s=a.gE(a)
q=a.gK(a)
n=j.b.b
j.t(a.ab(new A.A(new A.e(0,0),new A.e(s,q)).bk(n.a,n.b)))
a.am(r.a.a.b-1,"[1] OK modal. [2] OK/Cancel modal. [3] Yes/No modal.   Press [esc] to go back.",B.i)},
bu(a,b){if(!(t.cA.a(a) instanceof A.aW)||b==null||!1)return
this.c=b},
ar(a,b,c,d,e,f,g){var s,r,q,p,o
switch(c){case"Digit1":s=$.aj()
r=t.j.a($.eK())
q=r.length
s=s.a
q=s.G(q)
if(!(q>=0&&q<r.length))return A.i(r,q)
q=r[q]
t.t.a(B.f)
r=B.f.length
s=s.G(r)
if(!(s>=0&&s<r))return A.i(B.f,s)
p=A.fK("This is a simple OK modal.",B.i,B.f[s],q,null,"OK",2,!1,t.Y)
o=!0
break
case"Digit2":s=$.aj()
r=t.j.a($.eK())
q=r.length
s=s.a
q=s.G(q)
if(!(q>=0&&q<r.length))return A.i(r,q)
q=r[q]
t.t.a(B.f)
r=B.f.length
s=s.G(r)
if(!(s>=0&&s<r))return A.i(B.f,s)
p=A.fK("This is a simple OK/Cancel modal.",B.i,B.f[s],q,"Cancel","OK",2,!0,t.Y)
o=!0
break
case"Digit3":s=$.aj()
r=t.j.a($.eK())
q=r.length
s=s.a
q=s.G(q)
if(!(q>=0&&q<r.length))return A.i(r,q)
q=r[q]
t.t.a(B.f)
r=B.f.length
s=s.G(r)
if(!(s>=0&&s<r))return A.i(B.f,s)
p=A.i5("This is a simple Yes/No modal",B.i,B.f[s],q,"No",2,"Yes",t.Y)
o=!0
break
default:o=!1
p=null}if(p!=null)this.gm().X(p)
return o},
W(a,b){var s
switch(b){case B.k:this.gm().a7()
s=!0
break
default:s=!1}return s},
a6(a,b){var s,r,q,p,o=this,n=b.a,m=b.b-2
o.sbU(0,new A.U(new A.e(n,m),A.aD(n*m,B.J,!1,t.x),t.U))
for(n=t.t,s=0;s<o.b.a.b;++s)for(r=0;r<o.b.a.a;++r){m=$.aj().a
if(m.G(100)<10){q=o.b
n.a(B.p)
p=B.p.length
m=m.G(p)
if(!(m>=0&&m<p))return A.i(B.p,m)
q.A(r,s,A.S(9618,B.p[m],null))}}},
sbU(a,b){this.b=t.U.a(b)}}
A.dD.prototype={
$1(a){var s=this.b.d
a.aO(0,"Modals render as a transparent layer over existing content.",B.d,s)
a.aO(2,this.a.a,B.d,s)},
$S:1}
A.ch.prototype={
aR(a){var s,r,q
switch(this.cx.a){case 0:s="none"
break
case 1:s="single"
break
case 2:s="double"
break
case 3:s="frame"
break
case 4:s="solid"
break
default:s=null}r="This is a "+A.u(s)+" border Panel!"
q=a.d
a.a3(B.a.k(q.a-r.length,2),B.a.k(q.b,2),r)}}
A.cg.prototype={
aR(a){var s=a.d
a.a3(B.a.k(s.a-16,2),B.a.k(s.b,2),"This is a Frame!")}}
A.cA.prototype={
gU(){return!0},
gV(){return!1},
t(a){var s,r,q,p,o,n,m,l,k,j=a.ab(new A.A(new A.e(0,0),new A.e(a.gE(a),a.gK(a))).a_(1)),i=j.d,h=i.a,g=B.a.k(h,2)
i=i.b
s=B.a.k(i,2)
r=g-0
q=s-0
p=A.eO(new A.A(new A.e(0,0),new A.e(r,q)),B.a2,A.et())
o=g+1
h-=o
n=A.eO(new A.A(new A.e(o,0),new A.e(h,q)),B.a3,A.et())
q=s+1
i-=q
m=A.eO(new A.A(new A.e(0,q),new A.e(r,i)),B.u,A.et())
i=new A.A(new A.e(o,q),new A.e(h,i))
h=A.et()
l=new A.cg("Demo Frame",B.a4,h,1,i,i.a_(1),null)
p.t(j)
n.t(j)
m.t(j)
l.bF(j)
k=j.ab(l.b)
k.al(2,0," Demo Frame ",B.d,B.h)
a.ac(B.a.k(a.c.a.a.a-58,2),0,"Press [enter] to randomize colors. Press [esc] to go back.",B.i)},
W(a,b){var s
switch(b){case B.k:this.gm().a7()
s=!0
break
case B.z:if(this.a!=null)this.gm().e=!0
s=!0
break
default:s=!1}return s}}
A.r.prototype={}
A.cv.prototype={
gU(){return!0},
gV(){return!1},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=a.c.a.a,d=e.a
e=e.b
s=a.R(B.a.k(d-A.aV(B.o),2),B.a.k(e-18-5,2),Math.max(A.aV(B.o),A.aV(B.q)),23)
for(r=s.e,q=s.c,p=q.a,q=q.b,o=0;o<18;++o)for(n=q+o,m=0;m<B.o[o].length;++m){l=B.ax[o]
if(!(m<l.length))return A.i(l,m)
k=B.aD.v(0,l[m])
l=B.o[o]
if(!(m<l.length))return A.i(l,m)
j=A.S(l[m],k,B.h)
s.J(m,o)
r.L(p+m,n,j)}i=s.R(B.a.k(s.d.a-A.aV(B.q)-2,2),18,A.aV(B.q)+2,5)
for(h=0;h<5;++h){g=h===this.b
f=g?B.d:B.i
if(g)i.ac(0,h,"\u25ba ",B.A)
i.ac(2,h,B.q[h],f)}a.R(B.a.k(d-28,2),e-1,28,1).ac(0,0,"[\u2191\u2193]: Move   [enter]: Select",B.i)},
W(a,b){var s,r,q=this
switch(b){case B.v:--q.b
s=!0
break
case B.x:++q.b
s=!0
break
case B.z:r=q.b
if(r===0)q.gm().X(new A.cx(A.S("@",B.n,null),B.E))
else if(r===1)q.gm().X(A.i4())
else if(r===2)q.gm().X(new A.cA())
else if(r===3)q.gm().X(new A.cy(new A.U(new A.e(1,1),A.aD(1,B.I,!1,t.x),t.U)))
else if(r===4)q.gm().X(new A.c6(A.n([],t.cT)))
else q.gm().X(new A.cB())
s=!0
break
default:s=!1}q.b=B.c.Y(B.a.aL(q.b,0,4))
if(s)if(q.a!=null)q.gm().e=!0
return s}}
A.cB.prototype={
gU(){return!0},
gV(){return!1},
t(a){var s=a.c.a.a
a.R(B.a.k(s.a-36,2),B.a.k(s.b,2),36,1).a3(0,0,"Coming soon! Press [esc] to go back.")},
W(a,b){switch(b){case B.k:this.gm().a7()
return!0
default:return!1}}};(function aliases(){var s=J.bp.prototype
s.bG=s.i
s=J.aA.prototype
s.bJ=s.i
s=A.W.prototype
s.bH=s.bp
s.bI=s.bq
s=A.a9.prototype
s.bK=s.t
s=A.aM.prototype
s.bF=s.t})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers.installStaticTearOff,o=hunkHelpers._instance_1u
s(A,"jb","hY",26)
r(A,"jc","i9",4)
s(A,"jq","it",3)
s(A,"jr","iu",3)
s(A,"js","iv",3)
r(A,"he","jj",0)
q(A,"ju","iW",27)
p(A,"jG",2,null,["$1$2","$2"],["hk",function(a,b){return A.hk(a,b,t.p)}],28,0)
r(A,"eH","i6",0)
var n
o(n=A.aG.prototype,"gb9","c9",25)
o(n,"gc5","c6",8)
o(n,"gc7","c8",8)
s(A,"hj","es",2)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.j,null)
q(A.j,[A.eU,J.bp,J.H,A.q,A.I,A.dK,A.f,A.aC,A.C,A.aP,A.dT,A.dE,A.bl,A.bT,A.ao,A.du,A.bv,A.dZ,A.Y,A.cV,A.bV,A.ek,A.cO,A.b3,A.au,A.bc,A.ad,A.x,A.cP,A.bI,A.bJ,A.d2,A.bZ,A.bS,A.m,A.ce,A.e_,A.bF,A.e2,A.z,A.d3,A.dL,A.cH,A.di,A.eQ,A.V,A.az,A.d0,A.by,A.dS,A.cD,A.dJ,A.dR,A.cM,A.dq,A.A,A.dI,A.aq,A.ab,A.R,A.l,A.cu,A.b4,A.dQ,A.p,A.a9,A.aG,A.d_])
q(J.bp,[J.cq,J.bs,J.L,J.w,J.bt,J.aT])
q(J.L,[J.aA,A.B,A.be,A.cS,A.dj,A.b,A.cW,A.cY])
q(J.aA,[J.cC,J.bN,J.a7])
r(J.dr,J.w)
q(J.bt,[J.br,J.cr])
q(A.q,[A.aU,A.as,A.ct,A.cK,A.cE,A.bb,A.cT,A.cz,A.a4,A.cL,A.cJ,A.bG,A.cc,A.cd])
q(A.I,[A.ca,A.dh,A.dn,A.bn,A.cb,A.cI,A.ds,A.eB,A.eD,A.dW,A.dV,A.eo,A.e6,A.ee,A.dO,A.dN,A.ej,A.eg,A.e0,A.e1,A.dk,A.dl,A.dm,A.dg,A.dp,A.dy,A.dw,A.dx,A.dD])
q(A.ca,[A.eI,A.dF,A.dX,A.dY,A.el,A.e3,A.ea,A.e8,A.e5,A.e9,A.e4,A.ed,A.ec,A.eb,A.dP,A.dM,A.eq,A.ev,A.ei,A.dz,A.dA,A.dB,A.dC])
q(A.f,[A.o,A.a8,A.bO,A.aF,A.aE,A.bq])
q(A.o,[A.aB,A.bu])
r(A.bK,A.aB)
r(A.bi,A.a8)
q(A.C,[A.bz,A.aH,A.bL,A.bE])
r(A.bk,A.aF)
r(A.bj,A.aE)
q(A.aP,[A.bg,A.bm])
r(A.bo,A.bn)
r(A.bB,A.as)
q(A.cI,[A.cG,A.aN])
r(A.cN,A.bb)
r(A.bx,A.ao)
r(A.W,A.bx)
q(A.cb,[A.eC,A.ep,A.ew,A.e7,A.dv])
r(A.bW,A.cT)
q(A.bq,[A.bU,A.bM,A.U])
r(A.d1,A.bZ)
q(A.W,[A.eh,A.bR])
r(A.bw,A.bS)
q(A.a4,[A.aZ,A.co])
q(A.B,[A.h,A.b1])
q(A.h,[A.k,A.Z])
q(A.k,[A.d,A.c])
q(A.d,[A.c5,A.c7,A.ay,A.cl,A.aS,A.cF])
r(A.aQ,A.cS)
q(A.bw,[A.cR,A.cQ,A.cj])
r(A.cX,A.cW)
r(A.am,A.cX)
r(A.M,A.b)
r(A.a_,A.M)
r(A.cZ,A.cY)
r(A.bA,A.cZ)
r(A.bP,A.bI)
r(A.aJ,A.bP)
r(A.bQ,A.bJ)
q(A.e_,[A.aI,A.df,A.aa,A.a1])
r(A.bh,A.by)
r(A.b0,A.dS)
r(A.bD,A.b0)
q(A.cM,[A.aR,A.e])
r(A.al,A.aq)
q(A.ab,[A.ap,A.bf])
r(A.c9,A.ap)
q(A.al,[A.ck,A.cn])
q(A.p,[A.bd,A.c6,A.cx,A.cw,A.cy,A.cA,A.cv,A.cB])
r(A.aW,A.bd)
r(A.aM,A.a9)
q(A.aM,[A.cm,A.ch])
r(A.a5,A.dR)
r(A.cg,A.cm)
r(A.r,A.dq)
s(A.bS,A.m)
s(A.cS,A.di)
s(A.cW,A.m)
s(A.cX,A.V)
s(A.cY,A.m)
s(A.cZ,A.V)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{F:"int",d8:"double",a2:"num",a0:"String",E:"bool",z:"Null",D:"List"},mangledNames:{},types:["~()","~(ab)","~(@)","~(~())","F()","z(@)","z()","~(b)","~(a_)","T<z>()","E(j?)","@(@)","@(@,a0)","@(a0)","z(~())","z(@,ar)","~(F,@)","z(j,ar)","x<@>(@)","E(@)","~(j?,j?)","E(h)","k(h)","E(k)","0&(b)","~(a2)","F(j?)","E(j?,j?)","0^(0^,0^)<a2>"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.iM(v.typeUniverse,JSON.parse('{"cC":"aA","bN":"aA","a7":"aA","jQ":"b","k1":"b","jP":"c","k4":"c","jR":"d","k7":"d","k5":"h","k0":"h","jT":"M","jS":"Z","ka":"Z","k2":"B","k6":"am","cq":{"E":[]},"bs":{"z":[]},"w":{"D":["1"],"o":["1"],"f":["1"]},"dr":{"w":["1"],"D":["1"],"o":["1"],"f":["1"]},"H":{"C":["1"]},"bt":{"d8":[],"a2":[]},"br":{"d8":[],"F":[],"a2":[]},"cr":{"d8":[],"a2":[]},"aT":{"a0":[],"fL":[]},"aU":{"q":[]},"o":{"f":["1"]},"aB":{"o":["1"],"f":["1"]},"bK":{"aB":["1"],"o":["1"],"f":["1"],"aB.E":"1","f.E":"1"},"aC":{"C":["1"]},"a8":{"f":["2"],"f.E":"2"},"bi":{"a8":["1","2"],"o":["2"],"f":["2"],"f.E":"2"},"bz":{"C":["2"]},"bO":{"f":["1"],"f.E":"1"},"aH":{"C":["1"]},"aF":{"f":["1"],"f.E":"1"},"bk":{"aF":["1"],"o":["1"],"f":["1"],"f.E":"1"},"bL":{"C":["1"]},"aE":{"f":["1"],"f.E":"1"},"bj":{"aE":["1"],"o":["1"],"f":["1"],"f.E":"1"},"bE":{"C":["1"]},"aP":{"an":["1","2"]},"bg":{"aP":["1","2"],"an":["1","2"]},"bm":{"aP":["1","2"],"an":["1","2"]},"bn":{"I":[],"a6":[]},"bo":{"I":[],"a6":[]},"bB":{"as":[],"q":[]},"ct":{"q":[]},"cK":{"q":[]},"bT":{"ar":[]},"I":{"a6":[]},"ca":{"I":[],"a6":[]},"cb":{"I":[],"a6":[]},"cI":{"I":[],"a6":[]},"cG":{"I":[],"a6":[]},"aN":{"I":[],"a6":[]},"cE":{"q":[]},"cN":{"q":[]},"W":{"ao":["1","2"],"dt":["1","2"],"an":["1","2"]},"bu":{"o":["1"],"f":["1"],"f.E":"1"},"bv":{"C":["1"]},"bV":{"fT":[]},"cT":{"q":[]},"bW":{"as":[],"q":[]},"x":{"T":["1"]},"au":{"C":["1"]},"bU":{"f":["1"],"f.E":"1"},"bc":{"q":[]},"bZ":{"fV":[]},"d1":{"bZ":[],"fV":[]},"eh":{"W":["1","2"],"ao":["1","2"],"dt":["1","2"],"an":["1","2"]},"bR":{"W":["1","2"],"ao":["1","2"],"dt":["1","2"],"an":["1","2"]},"bq":{"f":["1"]},"bw":{"m":["1"],"D":["1"],"o":["1"],"f":["1"]},"bx":{"ao":["1","2"],"an":["1","2"]},"ao":{"an":["1","2"]},"F":{"a2":[]},"D":{"o":["1"],"f":["1"]},"a0":{"fL":[]},"bb":{"q":[]},"as":{"q":[]},"cz":{"q":[]},"a4":{"q":[]},"aZ":{"q":[]},"co":{"q":[]},"cL":{"q":[]},"cJ":{"q":[]},"bG":{"q":[]},"cc":{"q":[]},"bF":{"q":[]},"cd":{"q":[]},"d3":{"ar":[]},"ay":{"k":[],"h":[],"B":[]},"k":{"h":[],"B":[]},"a_":{"b":[]},"h":{"B":[]},"d":{"k":[],"h":[],"B":[]},"c5":{"k":[],"h":[],"B":[]},"c7":{"k":[],"h":[],"B":[]},"Z":{"h":[],"B":[]},"cR":{"m":["k"],"D":["k"],"o":["k"],"f":["k"],"m.E":"k"},"cl":{"k":[],"h":[],"B":[]},"am":{"m":["h"],"V":["h"],"D":["h"],"cs":["h"],"o":["h"],"f":["h"],"m.E":"h","V.E":"h"},"aS":{"k":[],"h":[],"B":[]},"cQ":{"m":["h"],"D":["h"],"o":["h"],"f":["h"],"m.E":"h"},"bA":{"m":["h"],"V":["h"],"D":["h"],"cs":["h"],"o":["h"],"f":["h"],"m.E":"h","V.E":"h"},"cF":{"k":[],"h":[],"B":[]},"M":{"b":[]},"b1":{"B":[]},"bP":{"bI":["1"]},"aJ":{"bP":["1"],"bI":["1"]},"bQ":{"bJ":["1"]},"az":{"C":["1"]},"cj":{"m":["k"],"D":["k"],"o":["k"],"f":["k"],"m.E":"k"},"d0":{"ij":[]},"c":{"k":[],"h":[],"B":[]},"bh":{"by":["1"]},"bM":{"f":["1"],"f.E":"1"},"bD":{"b0":["F","F"],"b0.M":"F","b0.N":"F"},"U":{"f":["1"],"f.E":"1"},"al":{"aq":[]},"c9":{"ap":["al"],"ab":[],"ap.T":"al"},"ck":{"al":[],"aq":[]},"cn":{"al":[],"aq":[]},"bf":{"ab":[]},"ap":{"ab":[]},"bd":{"p":["1"]},"aW":{"p":["1"],"p.T":"1"},"aM":{"a9":[]},"cm":{"a9":[]},"c6":{"p":["r"],"p.T":"r"},"cx":{"p":["r"],"p.T":"r"},"cw":{"p":["r"],"p.T":"r"},"cy":{"p":["r"],"p.T":"r"},"ch":{"a9":[]},"cg":{"a9":[]},"cA":{"p":["r"],"p.T":"r"},"cv":{"p":["r"],"p.T":"r"},"cB":{"p":["r"],"p.T":"r"}}'))
A.iL(v.typeUniverse,JSON.parse('{"o":1,"bq":1,"bw":1,"bx":2,"bS":1,"bd":1}'))
var u={i:"                                                                   ",l:"   GGGGGG                                                 GGGGGG",b:"   \u2588\u2588\u2588\u2588\u2588\u2588                                                 \u2588\u2588\u2588\u2588\u2588\u2588",e:"  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.aw
return{U:s("U<R>"),e:s("U<a5>"),D:s("U<R?>"),n:s("bc"),E:s("ay"),x:s("R"),k:s("l"),q:s("a5"),r:s("bh<a5>"),X:s("o<@>"),h:s("k"),R:s("q"),A:s("b"),a:s("a6"),d:s("T<@>"),Y:s("r"),B:s("f<k>"),cH:s("f<h>"),bi:s("f<@>"),V:s("C<a0>"),O:s("w<l>"),bW:s("w<p<r>>"),cZ:s("w<cD>"),s:s("w<a0>"),bY:s("w<e>"),cT:s("w<d_>"),ce:s("w<@>"),T:s("bs"),g:s("a7"),da:s("cs<@>"),dc:s("cu<r>"),v:s("a_"),cA:s("p<r>"),W:s("D<l>"),j:s("D<aa>"),t:s("D<l?>"),L:s("by<a5>"),ck:s("0&"),G:s("h"),P:s("z"),K:s("j"),aT:s("ap<aq>"),l:s("ar"),N:s("a0"),cU:s("bM<a5>"),bv:s("fT"),b7:s("as"),cr:s("bN"),a5:s("aG<r>"),ba:s("aI"),bt:s("aJ<b>"),ae:s("aJ<a_>"),c:s("x<@>"),aQ:s("x<F>"),c4:s("b4"),w:s("E"),I:s("E(k)"),m:s("E(j)"),i:s("d8"),z:s("@"),b:s("@()"),y:s("@(j)"),C:s("@(j,ar)"),S:s("F"),J:s("0&*"),_:s("j*"),cj:s("R?"),a_:s("T<b>?"),bc:s("T<z>?"),Q:s("j?"),aZ:s("ap<aq>?"),u:s("bJ<a_>?"),F:s("ad<@,@>?"),o:s("@(b)?"),Z:s("~()?"),cx:s("~(b)?"),a0:s("~(ab)?"),p:s("a2"),H:s("~"),M:s("~()"),f:s("~(a2)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.r=A.ay.prototype
B.j=A.be.prototype
B.m=A.aQ.prototype
B.at=A.aS.prototype
B.au=J.bp.prototype
B.b=J.w.prototype
B.a=J.br.prototype
B.c=J.bt.prototype
B.l=J.aT.prototype
B.av=J.a7.prototype
B.aw=J.L.prototype
B.a5=J.cC.prototype
B.D=J.bN.prototype
B.a8=A.b1.prototype
B.aa=new A.bo(A.jG(),A.aw("bo<F>"))
B.k=new A.r()
B.w=new A.r()
B.v=new A.r()
B.z=new A.r()
B.x=new A.r()
B.y=new A.r()
B.F=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.ab=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.ag=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.ac=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.ad=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.af=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.ae=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.G=function(hooks) { return hooks; }

B.aS=new A.dK()
B.e=new A.d1()
B.ah=new A.d3()
B.ai=new A.df(1,"glyph")
B.al=new A.l(100,64,32)
B.h=new A.l(0,0,0)
B.H=new A.R(9608,B.al,B.h)
B.d=new A.l(255,255,255)
B.I=new A.R(0,B.d,B.h)
B.J=new A.R(32,B.d,B.h)
B.T=new A.l(190,150,100)
B.K=new A.R(46,B.T,B.h)
B.i=new A.l(128,128,128)
B.Q=new A.l(128,64,0)
B.S=new A.l(160,110,60)
B.A=new A.l(255,128,0)
B.n=new A.l(255,192,0)
B.X=new A.a5(!1)
B.B=new A.a5(!0)
B.ap=new A.aR(0,1)
B.aq=new A.aR(0,-1)
B.ar=new A.aR(1,0)
B.as=new A.aR(-1,0)
B.Y=A.n(s(["\u2580","\u2584","\u258c","\u2590","\u2588","\u2588","\u2588","\u2588"]),t.s)
B.o=A.n(s(["  \u2588\u2588\u2588\u2588\u2588\u2588                                                   \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588                                                     \u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588",u.e,u.b,"   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588     \u2588   \u2588 \u2588   \u2588   \u2588   \u2588   \u2588 \u2588     \u2588     \u2588     \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588   \u2588   \u2588 \u2588\u2588\u2588\u2588\u2588   \u2588   \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588   \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588     \u2588   \u2588 \u2588  \u2588    \u2588   \u2588  \u2588  \u2588         \u2588     \u2588 \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588     \u2588\u2588\u2588\u2588\u2588 \u2588   \u2588   \u2588   \u2588   \u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588",u.b,u.e," \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593","\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591",u.i,u.i,"                         D E M O   M E N U                         ",u.i]),t.s)
B.ax=A.n(s(["  GGGGGG                                                   GGGGGG","   GGGG                                                     GGGG","   GGGG   GGGG  GGGG  GGGG  GGGG   GGGG  GGGG  GGGG  GGGG   GGGG","  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",u.l,"   GGGGGG RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR GGGGGG","   GGGGGG R     R   R R   R   R   R   R R     R     R     GGGGGG","   GGGGGG RRR   R   R RRRRR   R   RRRRR RRR   RRRRR RRRRR GGGGGG","   GGGGGG R     R   R R  R    R   R  R  R         R     R GGGGGG","   GGGGGG R     RRRRR R   R   R   R   R RRRRR RRRRR RRRRR GGGGGG",u.l,"  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"," BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB","BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",u.i,u.i,"                         W W W W   W W W W                         ",u.i]),t.s)
B.C=new A.aa(0,"none")
B.a2=new A.aa(1,"single")
B.a3=new A.aa(2,"double")
B.a4=new A.aa(3,"frame")
B.u=new A.aa(4,"solid")
B.ay=A.n(s([B.C,B.a2,B.a3,B.a4,B.u]),A.aw("w<aa>"))
B.ao=new A.l(255,200,170)
B.p=A.n(s([B.ao,B.A,B.Q]),t.O)
B.q=A.n(s(["Minigame","Map generation","UI Panels","UI Modals","Animation"]),t.s)
B.V=new A.l(255,160,160)
B.U=new A.l(220,0,0)
B.O=new A.l(100,0,0)
B.aC=A.n(s([B.V,B.U,B.O]),t.O)
B.P=new A.l(128,160,255)
B.N=new A.l(0,64,255)
B.aj=new A.l(0,37,168)
B.az=A.n(s([B.P,B.N,B.aj]),t.O)
B.R=new A.l(130,255,90)
B.L=new A.l(0,128,0)
B.ak=new A.l(0,64,0)
B.aB=A.n(s([B.R,B.L,B.ak]),t.O)
B.t=A.n(s([B.p,B.aC,B.az,B.aB]),A.aw("w<D<l>>"))
B.M=new A.l(0,255,255)
B.am=new A.l(128,0,255)
B.W=new A.l(255,255,0)
B.f=A.n(s([B.d,B.M,B.n,B.L,B.P,B.am,B.U,B.W]),t.O)
B.Z=A.n(s(["\u2550","\u2550","\u2551","\u2551","\u2554","\u2557","\u255a","\u255d"]),t.s)
B.a_=A.n(s(["\u2500","\u2500","\u2502","\u2502","\u250c","\u2510","\u2514","\u2518"]),t.s)
B.an=new A.l(200,140,255)
B.a0=A.n(s([B.d,B.i,B.M,B.an,B.V,B.n,B.A,B.W,B.N,B.R,B.T]),t.O)
B.a1=A.n(s(["\u2550","\u2500","\u2502","\u2502","\u2552","\u2555","\u2514","\u2518"]),t.s)
B.aA=A.n(s(["G","B","R","W"]),t.s)
B.aD=new A.bg(4,{G:B.i,B:B.S,R:B.O,W:B.d},B.aA,A.aw("bg<a0,l>"))
B.aE=new A.bm([9786,1,9787,2,9829,3,9830,4,9827,5,9824,6,8226,7,9688,8,9675,9,9689,10,9794,11,9792,12,9834,13,9835,14,9788,15,9658,16,9668,17,8597,18,8252,19,182,20,167,21,9644,22,8616,23,8593,24,8595,25,8594,26,8592,27,8735,28,8596,29,9650,30,9660,31,8962,127,199,128,252,129,233,130,226,131,228,132,224,133,229,134,231,135,234,136,235,137,232,138,239,139,238,140,236,141,196,142,197,143,201,144,230,145,198,146,244,147,246,148,242,149,251,150,249,151,255,152,214,153,220,154,162,155,163,156,165,157,8359,158,402,159,225,160,237,161,243,162,250,163,241,164,209,165,170,166,186,167,191,168,8976,169,172,170,189,171,188,172,161,173,171,174,187,175,9617,176,9618,177,9619,178,9474,179,9508,180,9569,181,9570,182,9558,183,9557,184,9571,185,9553,186,9559,187,9565,188,9564,189,9563,190,9488,191,9492,192,9524,193,9516,194,9500,195,9472,196,9532,197,9566,198,9567,199,9562,200,9556,201,9577,202,9574,203,9568,204,9552,205,9580,206,9575,207,9576,208,9572,209,9573,210,9561,211,9560,212,9554,213,9555,214,9579,215,9578,216,9496,217,9484,218,9608,219,9604,220,9612,221,9616,222,9600,223,945,224,223,225,915,226,960,227,931,228,963,229,181,230,964,231,934,232,920,233,937,234,948,235,8734,236,966,237,949,238,8745,239,8801,240,177,241,8805,242,8804,243,8992,244,8993,245,247,246,8776,247,176,248,8729,249,183,250,8730,251,8319,252,178,253,9632,254],A.aw("bm<F,F>"))
B.a6=new A.bD(5,9)
B.a7=new A.bD(9,15)
B.aF=A.jO("j")
B.E=new A.e(0,0)
B.aG=new A.a1(0,"top")
B.aH=new A.a1(1,"bottom")
B.aI=new A.a1(2,"left")
B.aJ=new A.a1(3,"right")
B.aK=new A.a1(4,"topLeft")
B.aL=new A.a1(5,"topRight")
B.aM=new A.a1(6,"bottomLeft")
B.aN=new A.a1(7,"bottomRight")
B.aO=new A.aI(0,"wall")
B.a9=new A.aI(1,"room")
B.aP=new A.aI(2,"corridor")
B.aQ=new A.aI(3,"door")
B.aR=new A.b3(null,2)})();(function staticFields(){$.ef=null
$.fM=null
$.dH=0
$.bC=A.jc()
$.fw=null
$.fv=null
$.hh=null
$.hd=null
$.hm=null
$.ey=null
$.eE=null
$.fj=null
$.b6=null
$.c_=null
$.c0=null
$.f8=!1
$.t=B.e
$.Q=A.n([],A.aw("w<j>"))
$.O=A.iw("_ui")})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"jV","hp",()=>A.jv("_$dart_dartClosure"))
s($,"kC","eL",()=>B.e.bz(new A.eI(),A.aw("T<z>")))
s($,"kb","hv",()=>A.ac(A.dU({
toString:function(){return"$receiver$"}})))
s($,"kc","hw",()=>A.ac(A.dU({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"kd","hx",()=>A.ac(A.dU(null)))
s($,"ke","hy",()=>A.ac(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"kh","hB",()=>A.ac(A.dU(void 0)))
s($,"ki","hC",()=>A.ac(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"kg","hA",()=>A.ac(A.fU(null)))
s($,"kf","hz",()=>A.ac(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"kk","hE",()=>A.ac(A.fU(void 0)))
s($,"kj","hD",()=>A.ac(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"kl","fn",()=>A.is())
s($,"k3","hu",()=>A.aw("x<z>").a($.eL()))
s($,"kz","hF",()=>A.eJ(B.aF))
s($,"k8","fm",()=>{A.ii()
return $.dH})
s($,"jU","ho",()=>({}))
s($,"jZ","fl",()=>B.l.aN(A.eP(),"Opera",0))
s($,"jY","hs",()=>!A.c2($.fl())&&B.l.aN(A.eP(),"Trident/",0))
s($,"jX","hr",()=>B.l.aN(A.eP(),"Firefox",0))
s($,"jW","hq",()=>"-"+$.ht()+"-")
s($,"k_","ht",()=>{if(A.c2($.hr()))var r="moz"
else if($.hs())r="ms"
else r=A.c2($.fl())?"o":"webkit"
return r})
s($,"kD","aj",()=>new A.dI(A.fN(A.fB().a)))
s($,"ky","eK",()=>B.b.bE(B.ay,1))
s($,"kA","hG",()=>A.fN(A.fB().a))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.L,FontFace:J.L,MediaError:J.L,Navigator:J.L,NavigatorConcurrentHardware:J.L,NavigatorUserMediaError:J.L,OverconstrainedError:J.L,PositionError:J.L,GeolocationPositionError:J.L,TextMetrics:J.L,HTMLAudioElement:A.d,HTMLBRElement:A.d,HTMLBaseElement:A.d,HTMLBodyElement:A.d,HTMLButtonElement:A.d,HTMLContentElement:A.d,HTMLDListElement:A.d,HTMLDataElement:A.d,HTMLDataListElement:A.d,HTMLDetailsElement:A.d,HTMLDialogElement:A.d,HTMLDivElement:A.d,HTMLEmbedElement:A.d,HTMLFieldSetElement:A.d,HTMLHRElement:A.d,HTMLHeadElement:A.d,HTMLHeadingElement:A.d,HTMLHtmlElement:A.d,HTMLIFrameElement:A.d,HTMLInputElement:A.d,HTMLLIElement:A.d,HTMLLabelElement:A.d,HTMLLegendElement:A.d,HTMLLinkElement:A.d,HTMLMapElement:A.d,HTMLMediaElement:A.d,HTMLMenuElement:A.d,HTMLMetaElement:A.d,HTMLMeterElement:A.d,HTMLModElement:A.d,HTMLOListElement:A.d,HTMLObjectElement:A.d,HTMLOptGroupElement:A.d,HTMLOptionElement:A.d,HTMLOutputElement:A.d,HTMLParagraphElement:A.d,HTMLParamElement:A.d,HTMLPictureElement:A.d,HTMLPreElement:A.d,HTMLProgressElement:A.d,HTMLQuoteElement:A.d,HTMLScriptElement:A.d,HTMLShadowElement:A.d,HTMLSlotElement:A.d,HTMLSourceElement:A.d,HTMLSpanElement:A.d,HTMLStyleElement:A.d,HTMLTableCaptionElement:A.d,HTMLTableCellElement:A.d,HTMLTableDataCellElement:A.d,HTMLTableHeaderCellElement:A.d,HTMLTableColElement:A.d,HTMLTableElement:A.d,HTMLTableRowElement:A.d,HTMLTableSectionElement:A.d,HTMLTemplateElement:A.d,HTMLTextAreaElement:A.d,HTMLTimeElement:A.d,HTMLTitleElement:A.d,HTMLTrackElement:A.d,HTMLUListElement:A.d,HTMLUnknownElement:A.d,HTMLVideoElement:A.d,HTMLDirectoryElement:A.d,HTMLFontElement:A.d,HTMLFrameElement:A.d,HTMLFrameSetElement:A.d,HTMLMarqueeElement:A.d,HTMLElement:A.d,HTMLAnchorElement:A.c5,HTMLAreaElement:A.c7,HTMLCanvasElement:A.ay,CanvasRenderingContext2D:A.be,CDATASection:A.Z,CharacterData:A.Z,Comment:A.Z,ProcessingInstruction:A.Z,Text:A.Z,CSSStyleDeclaration:A.aQ,MSStyleCSSProperties:A.aQ,CSS2Properties:A.aQ,DOMException:A.dj,Element:A.k,AbortPaymentEvent:A.b,AnimationEvent:A.b,AnimationPlaybackEvent:A.b,ApplicationCacheErrorEvent:A.b,BackgroundFetchClickEvent:A.b,BackgroundFetchEvent:A.b,BackgroundFetchFailEvent:A.b,BackgroundFetchedEvent:A.b,BeforeInstallPromptEvent:A.b,BeforeUnloadEvent:A.b,BlobEvent:A.b,CanMakePaymentEvent:A.b,ClipboardEvent:A.b,CloseEvent:A.b,CustomEvent:A.b,DeviceMotionEvent:A.b,DeviceOrientationEvent:A.b,ErrorEvent:A.b,ExtendableEvent:A.b,ExtendableMessageEvent:A.b,FetchEvent:A.b,FontFaceSetLoadEvent:A.b,ForeignFetchEvent:A.b,GamepadEvent:A.b,HashChangeEvent:A.b,InstallEvent:A.b,MediaEncryptedEvent:A.b,MediaKeyMessageEvent:A.b,MediaQueryListEvent:A.b,MediaStreamEvent:A.b,MediaStreamTrackEvent:A.b,MessageEvent:A.b,MIDIConnectionEvent:A.b,MIDIMessageEvent:A.b,MutationEvent:A.b,NotificationEvent:A.b,PageTransitionEvent:A.b,PaymentRequestEvent:A.b,PaymentRequestUpdateEvent:A.b,PopStateEvent:A.b,PresentationConnectionAvailableEvent:A.b,PresentationConnectionCloseEvent:A.b,ProgressEvent:A.b,PromiseRejectionEvent:A.b,PushEvent:A.b,RTCDataChannelEvent:A.b,RTCDTMFToneChangeEvent:A.b,RTCPeerConnectionIceEvent:A.b,RTCTrackEvent:A.b,SecurityPolicyViolationEvent:A.b,SensorErrorEvent:A.b,SpeechRecognitionError:A.b,SpeechRecognitionEvent:A.b,SpeechSynthesisEvent:A.b,StorageEvent:A.b,SyncEvent:A.b,TrackEvent:A.b,TransitionEvent:A.b,WebKitTransitionEvent:A.b,VRDeviceEvent:A.b,VRDisplayEvent:A.b,VRSessionEvent:A.b,MojoInterfaceRequestEvent:A.b,ResourceProgressEvent:A.b,USBConnectionEvent:A.b,IDBVersionChangeEvent:A.b,AudioProcessingEvent:A.b,OfflineAudioCompletionEvent:A.b,WebGLContextEvent:A.b,Event:A.b,InputEvent:A.b,SubmitEvent:A.b,FontFaceSet:A.B,Performance:A.B,EventTarget:A.B,HTMLFormElement:A.cl,HTMLCollection:A.am,HTMLFormControlsCollection:A.am,HTMLOptionsCollection:A.am,HTMLImageElement:A.aS,KeyboardEvent:A.a_,Document:A.h,DocumentFragment:A.h,HTMLDocument:A.h,ShadowRoot:A.h,XMLDocument:A.h,Attr:A.h,DocumentType:A.h,Node:A.h,NodeList:A.bA,RadioNodeList:A.bA,HTMLSelectElement:A.cF,CompositionEvent:A.M,FocusEvent:A.M,MouseEvent:A.M,DragEvent:A.M,PointerEvent:A.M,TextEvent:A.M,TouchEvent:A.M,WheelEvent:A.M,UIEvent:A.M,Window:A.b1,DOMWindow:A.b1,SVGAElement:A.c,SVGAnimateElement:A.c,SVGAnimateMotionElement:A.c,SVGAnimateTransformElement:A.c,SVGAnimationElement:A.c,SVGCircleElement:A.c,SVGClipPathElement:A.c,SVGDefsElement:A.c,SVGDescElement:A.c,SVGDiscardElement:A.c,SVGEllipseElement:A.c,SVGFEBlendElement:A.c,SVGFEColorMatrixElement:A.c,SVGFEComponentTransferElement:A.c,SVGFECompositeElement:A.c,SVGFEConvolveMatrixElement:A.c,SVGFEDiffuseLightingElement:A.c,SVGFEDisplacementMapElement:A.c,SVGFEDistantLightElement:A.c,SVGFEFloodElement:A.c,SVGFEFuncAElement:A.c,SVGFEFuncBElement:A.c,SVGFEFuncGElement:A.c,SVGFEFuncRElement:A.c,SVGFEGaussianBlurElement:A.c,SVGFEImageElement:A.c,SVGFEMergeElement:A.c,SVGFEMergeNodeElement:A.c,SVGFEMorphologyElement:A.c,SVGFEOffsetElement:A.c,SVGFEPointLightElement:A.c,SVGFESpecularLightingElement:A.c,SVGFESpotLightElement:A.c,SVGFETileElement:A.c,SVGFETurbulenceElement:A.c,SVGFilterElement:A.c,SVGForeignObjectElement:A.c,SVGGElement:A.c,SVGGeometryElement:A.c,SVGGraphicsElement:A.c,SVGImageElement:A.c,SVGLineElement:A.c,SVGLinearGradientElement:A.c,SVGMarkerElement:A.c,SVGMaskElement:A.c,SVGMetadataElement:A.c,SVGPathElement:A.c,SVGPatternElement:A.c,SVGPolygonElement:A.c,SVGPolylineElement:A.c,SVGRadialGradientElement:A.c,SVGRectElement:A.c,SVGScriptElement:A.c,SVGSetElement:A.c,SVGStopElement:A.c,SVGStyleElement:A.c,SVGElement:A.c,SVGSVGElement:A.c,SVGSwitchElement:A.c,SVGSymbolElement:A.c,SVGTSpanElement:A.c,SVGTextContentElement:A.c,SVGTextElement:A.c,SVGTextPathElement:A.c,SVGTextPositioningElement:A.c,SVGTitleElement:A.c,SVGUseElement:A.c,SVGViewElement:A.c,SVGGradientElement:A.c,SVGComponentTransferFunctionElement:A.c,SVGFEDropShadowElement:A.c,SVGMPathElement:A.c})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,FontFace:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,TextMetrics:true,HTMLAudioElement:true,HTMLBRElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLInputElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLCanvasElement:true,CanvasRenderingContext2D:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,DOMException:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,ProgressEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,ResourceProgressEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,FontFaceSet:true,Performance:true,EventTarget:false,HTMLFormElement:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLImageElement:true,KeyboardEvent:true,Document:true,DocumentFragment:true,HTMLDocument:true,ShadowRoot:true,XMLDocument:true,Attr:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLSelectElement:true,CompositionEvent:true,FocusEvent:true,MouseEvent:true,DragEvent:true,PointerEvent:true,TextEvent:true,TouchEvent:true,WheelEvent:true,UIEvent:false,Window:true,DOMWindow:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGScriptElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true})})()
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q)s[q].removeEventListener("load",onLoad,false)
a(b.target)}for(var r=0;r<s.length;++r)s[r].addEventListener("load",onLoad,false)})(function(a){v.currentScript=a
var s=A.eF
if(typeof dartMainRunner==="function")dartMainRunner(s,[])
else s([])})})()
//# sourceMappingURL=main.dart.js.map
