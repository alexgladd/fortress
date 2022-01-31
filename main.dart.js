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
a[c]=function(){a[c]=function(){A.ja(b)}
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
if(a[b]!==s)A.jb(b)
a[b]=r}a[c]=function(){return this[b]}
return a[b]}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s)convertToFastObject(a[s])}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.eR(b)
return new s(c,this)}:function(){if(s===null)s=A.eR(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.eR(a).prototype
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
a(hunkHelpers,v,w,$)}var A={ew:function ew(){},
fo(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
hR(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
fM(a,b,c){return a},
hQ(a,b,c,d){A.aV(b,"start")
if(c!=null){A.aV(c,"end")
if(b>c)A.at(A.S(b,0,c,"start",null))}return new A.by(a,b,c,d.h("by<0>"))},
ff(a,b,c,d){if(t.X.b(a))return new A.bb(a,b,c.h("@<0>").A(d).h("bb<1,2>"))
return new A.a5(a,b,c.h("@<0>").A(d).h("a5<1,2>"))},
hS(a,b,c){var s="takeCount"
A.ep(b,s,t.S)
A.aV(b,s)
if(t.X.b(a))return new A.bd(a,b,c.h("bd<0>"))
return new A.aB(a,b,c.h("aB<0>"))},
hP(a,b,c){var s="count"
if(t.X.b(a)){A.ep(b,s,t.S)
A.aV(b,s)
return new A.bc(a,b,c.h("bc<0>"))}A.ep(b,s,t.S)
A.aV(b,s)
return new A.aA(a,b,c.h("aA<0>"))},
eu(){return new A.bv("No element")},
aO:function aO(a){this.a=a},
ej:function ej(){},
dp:function dp(){},
n:function n(){},
ay:function ay(){},
by:function by(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
az:function az(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
a5:function a5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bb:function bb(a,b,c){this.a=a
this.b=b
this.$ti=c},
bq:function bq(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
bB:function bB(a,b,c){this.a=a
this.b=b
this.$ti=c},
aD:function aD(a,b,c){this.a=a
this.b=b
this.$ti=c},
aB:function aB(a,b,c){this.a=a
this.b=b
this.$ti=c},
bd:function bd(a,b,c){this.a=a
this.b=b
this.$ti=c},
bz:function bz(a,b,c){this.a=a
this.b=b
this.$ti=c},
aA:function aA(a,b,c){this.a=a
this.b=b
this.$ti=c},
bc:function bc(a,b,c){this.a=a
this.b=b
this.$ti=c},
bt:function bt(a,b,c){this.a=a
this.b=b
this.$ti=c},
hu(a){if(typeof a=="number")return B.c.gk(a)
if(t.bv.b(a))return A.aT(a)
return A.ek(a)},
hv(a){return new A.d8(a)},
fU(a){var s,r=v.mangledGlobalNames[a]
if(r!=null)return r
s="minified:"+a
return s},
j1(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.da.b(a)},
v(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.cY(a)
return s},
aT(a){var s=a.$identityHash
if(s==null){s=Math.random()*0x3fffffff|0
a.$identityHash=s}return s},
dm(a){return A.hD(a)},
hD(a){var s,r,q,p
if(a instanceof A.j)return A.J(A.L(a),null)
if(J.b3(a)===B.am||t.cr.b(a)){s=B.D(a)
r=s!=="Object"&&s!==""
if(r)return s
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string")r=p!=="Object"&&p!==""
else r=!1
if(r)return p}}return A.J(A.L(a),null)},
ez(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.a.aC(s,10)|55296)>>>0,s&1023|56320)}throw A.a(A.S(a,0,1114111,null,null))},
aS(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
hK(a){var s=A.aS(a).getFullYear()+0
return s},
hI(a){var s=A.aS(a).getMonth()+1
return s},
hE(a){var s=A.aS(a).getDate()+0
return s},
hF(a){var s=A.aS(a).getHours()+0
return s},
hH(a){var s=A.aS(a).getMinutes()+0
return s},
hJ(a){var s=A.aS(a).getSeconds()+0
return s},
hG(a){var s=A.aS(a).getMilliseconds()+0
return s},
h(a,b){if(a==null)J.ag(a)
throw A.a(A.cT(a,b))},
cT(a,b){var s,r="index",q=null
if(!A.eM(b))return new A.a0(!0,b,r,q)
s=A.cS(J.ag(a))
if(b<0||b>=s)return A.cb(b,a,r,q,s)
return new A.aU(q,q,!0,b,r,"Value not in range")},
iN(a){return new A.a0(!0,a,null,null)},
a(a){var s,r
if(a==null)a=new A.ck()
s=new Error()
s.dartException=a
r=A.jc
if("defineProperty" in Object){Object.defineProperty(s,"message",{get:r})
s.name=""}else s.toString=r
return s},
jc(){return J.cY(this.dartException)},
at(a){throw A.a(a)},
cW(a){throw A.a(A.aI(a))},
aa(a){var s,r,q,p,o,n
a=A.j7(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.o([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.dv(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
dw(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
fq(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
ex(a,b){var s=b==null,r=s?null:b.method
return new A.cf(a,r,s?null:b.receiver)},
af(a){if(a==null)return new A.dl(a)
if(a instanceof A.be)return A.as(a,t.K.a(a.a))
if(typeof a!=="object")return a
if("dartException" in a)return A.as(a,a.dartException)
return A.iM(a)},
as(a,b){if(t.R.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
iM(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.a.aC(r,16)&8191)===10)switch(q){case 438:return A.as(a,A.ex(A.v(s)+" (Error "+q+")",e))
case 445:case 5007:p=A.v(s)+" (Error "+q+")"
return A.as(a,new A.bs(p,e))}}if(a instanceof TypeError){o=$.h1()
n=$.h2()
m=$.h3()
l=$.h4()
k=$.h7()
j=$.h8()
i=$.h6()
$.h5()
h=$.ha()
g=$.h9()
f=o.O(s)
if(f!=null)return A.as(a,A.ex(A.aF(s),f))
else{f=n.O(s)
if(f!=null){f.method="call"
return A.as(a,A.ex(A.aF(s),f))}else{f=m.O(s)
if(f==null){f=l.O(s)
if(f==null){f=k.O(s)
if(f==null){f=j.O(s)
if(f==null){f=i.O(s)
if(f==null){f=l.O(s)
if(f==null){f=h.O(s)
if(f==null){f=g.O(s)
p=f!=null}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0
if(p){A.aF(s)
return A.as(a,new A.bs(s,f==null?e:f.method))}}}return A.as(a,new A.cv(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bu()
s=function(b){try{return String(b)}catch(d){}return null}(a)
return A.as(a,new A.a0(!1,e,e,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bu()
return a},
ad(a){var s
if(a instanceof A.be)return a.b
if(a==null)return new A.bG(a)
s=a.$cachedTrace
if(s!=null)return s
return a.$cachedTrace=new A.bG(a)},
ek(a){if(a==null||typeof a!="object")return J.f_(a)
else return A.aT(a)},
iU(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.w(0,a[s],a[r])}return b},
j0(a,b,c,d,e,f){t.a.a(a)
switch(A.cS(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.a(new A.dF("Unsupported number of arguments for wrapped closure"))},
b2(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.j0)
a.$identity=s
return s},
hq(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cr().constructor.prototype):Object.create(new A.aH(null,null).constructor.prototype)
s.$initialize=s.constructor
if(h)r=function static_tear_off(){this.$initialize()}
else r=function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.f8(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.hm(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.f8(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
hm(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.a("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.hj)}throw A.a("Error in functionType of tearoff")},
hn(a,b,c,d){var s=A.f5
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
f8(a,b,c,d){var s,r
if(c)return A.hp(a,b,d)
s=b.length
r=A.hn(s,d,a,b)
return r},
ho(a,b,c,d){var s=A.f5,r=A.hk
switch(b?-1:a){case 0:throw A.a(new A.co("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
hp(a,b,c){var s,r,q,p=$.f3
p==null?$.f3=A.f2("interceptor"):p
s=$.f4
s==null?$.f4=A.f2("receiver"):s
r=b.length
q=A.ho(r,c,a,b)
return q},
eR(a){return A.hq(a)},
hj(a,b){return A.dZ(v.typeUniverse,A.L(a.a),b)},
f5(a){return a.a},
hk(a){return a.b},
f2(a){var s,r,q,p=new A.aH("receiver","interceptor"),o=J.ev(Object.getOwnPropertyNames(p),t.Q)
for(s=o.length,r=0;r<s;++r){q=o[r]
if(p[q]===a)return q}throw A.a(A.bV("Field name "+a+" not found.",null))},
bP(a){if(a==null)A.iO("boolean expression must not be null")
return a},
iO(a){throw A.a(new A.cy(a))},
ja(a){throw A.a(new A.c_(a))},
iV(a){return v.getIsolateTag(a)},
jZ(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
j3(a){var s,r,q,p,o,n=A.aF($.fO.$1(a)),m=$.e9[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ef[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ih($.fK.$2(a,n))
if(q!=null){m=$.e9[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ef[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.eh(s)
$.e9[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ef[n]=s
return s}if(p==="-"){o=A.eh(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.fS(a,s)
if(p==="*")throw A.a(A.eA(n))
if(v.leafTags[n]===true){o=A.eh(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.fS(a,s)},
fS(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.eW(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
eh(a){return J.eW(a,!1,null,!!a.$ice)},
j4(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.eh(s)
else return J.eW(s,c,null,null)},
iY(){if(!0===$.eV)return
$.eV=!0
A.iZ()},
iZ(){var s,r,q,p,o,n,m,l
$.e9=Object.create(null)
$.ef=Object.create(null)
A.iX()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.fT.$1(o)
if(n!=null){m=A.j4(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
iX(){var s,r,q,p,o,n,m=B.a3()
m=A.b1(B.a4,A.b1(B.a5,A.b1(B.E,A.b1(B.E,A.b1(B.a6,A.b1(B.a7,A.b1(B.a8(B.D),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(s.constructor==Array)for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.fO=new A.ec(p)
$.fK=new A.ed(o)
$.fT=new A.ee(n)},
b1(a,b){return a(b)||b},
j9(a,b,c){var s=a.indexOf(b,c)
return s>=0},
j7(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aJ:function aJ(){},
ba:function ba(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
d2:function d2(a){this.a=a},
bf:function bf(a,b){this.a=a
this.$ti=b},
d8:function d8(a){this.a=a},
bg:function bg(){},
bh:function bh(a,b){this.a=a
this.$ti=b},
dv:function dv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bs:function bs(a,b){this.a=a
this.b=b},
cf:function cf(a,b,c){this.a=a
this.b=b
this.c=c},
cv:function cv(a){this.a=a},
dl:function dl(a){this.a=a},
be:function be(a,b){this.a=a
this.b=b},
bG:function bG(a){this.a=a
this.b=null},
E:function E(){},
bX:function bX(){},
bY:function bY(){},
ct:function ct(){},
cr:function cr(){},
aH:function aH(a,b){this.a=a
this.b=b},
co:function co(a){this.a=a},
cy:function cy(a){this.a=a},
a4:function a4(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dc:function dc(a){this.a=a},
dd:function dd(a,b){this.a=a
this.b=b
this.c=null},
bm:function bm(a,b){this.a=a
this.$ti=b},
bn:function bn(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ec:function ec(a){this.a=a},
ed:function ed(a){this.a=a},
ee:function ee(a){this.a=a},
jb(a){return A.at(new A.aO("Field '"+a+"' has been assigned during initialization."))},
hX(a){var s=new A.dB(a)
return s.b=s},
dB:function dB(a){this.a=a
this.b=null},
fl(a,b){var s=b.c
return s==null?b.c=A.eF(a,b.z,!0):s},
fk(a,b){var s=b.c
return s==null?b.c=A.bJ(a,"P",[b.z]):s},
fm(a){var s=a.y
if(s===6||s===7||s===8)return A.fm(a.z)
return s===11||s===12},
hO(a){return a.cy},
ar(a){return A.cR(v.typeUniverse,a,!1)},
j_(a,b){var s,r,q,p,o
if(a==null)return null
s=b.Q
r=a.cx
if(r==null)r=a.cx=new Map()
q=b.cy
p=r.get(q)
if(p!=null)return p
o=A.ac(v.typeUniverse,a.z,s,0)
r.set(q,o)
return o},
ac(a,b,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.y
switch(c){case 5:case 1:case 2:case 3:case 4:return b
case 6:s=b.z
r=A.ac(a,s,a0,a1)
if(r===s)return b
return A.fz(a,r,!0)
case 7:s=b.z
r=A.ac(a,s,a0,a1)
if(r===s)return b
return A.eF(a,r,!0)
case 8:s=b.z
r=A.ac(a,s,a0,a1)
if(r===s)return b
return A.fy(a,r,!0)
case 9:q=b.Q
p=A.bO(a,q,a0,a1)
if(p===q)return b
return A.bJ(a,b.z,p)
case 10:o=b.z
n=A.ac(a,o,a0,a1)
m=b.Q
l=A.bO(a,m,a0,a1)
if(n===o&&l===m)return b
return A.eD(a,n,l)
case 11:k=b.z
j=A.ac(a,k,a0,a1)
i=b.Q
h=A.iJ(a,i,a0,a1)
if(j===k&&h===i)return b
return A.fx(a,j,h)
case 12:g=b.Q
a1+=g.length
f=A.bO(a,g,a0,a1)
o=b.z
n=A.ac(a,o,a0,a1)
if(f===g&&n===o)return b
return A.eE(a,n,f,!0)
case 13:e=b.z
if(e<a1)return b
d=a0[e-a1]
if(d==null)return b
return d
default:throw A.a(A.cZ("Attempted to substitute unexpected RTI kind "+c))}},
bO(a,b,c,d){var s,r,q,p,o=b.length,n=A.e_(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.ac(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
iK(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.e_(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.ac(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
iJ(a,b,c,d){var s,r=b.a,q=A.bO(a,r,c,d),p=b.b,o=A.bO(a,p,c,d),n=b.c,m=A.iK(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.cG()
s.a=q
s.b=o
s.c=m
return s},
o(a,b){a[v.arrayRti]=b
return a},
eS(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.iW(s)
return a.$S()}return null},
fP(a,b){var s
if(A.fm(b))if(a instanceof A.E){s=A.eS(a)
if(s!=null)return s}return A.L(a)},
L(a){var s
if(a instanceof A.j){s=a.$ti
return s!=null?s:A.eK(a)}if(Array.isArray(a))return A.U(a)
return A.eK(J.b3(a))},
U(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
t(a){var s=a.$ti
return s!=null?s:A.eK(a)},
eK(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.it(a,s)},
it(a,b){var s=a instanceof A.E?a.__proto__.__proto__.constructor:b,r=A.ic(v.typeUniverse,s.name)
b.$ccache=r
return r},
iW(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.cR(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
eU(a){var s=a instanceof A.E?A.eS(a):null
return A.eT(s==null?A.L(a):s)},
eT(a){var s,r,q,p=a.x
if(p!=null)return p
s=a.cy
r=s.replace(/\*/g,"")
if(r===s)return a.x=new A.bH(a)
q=A.cR(v.typeUniverse,r,!0)
p=q.x
return a.x=p==null?q.x=new A.bH(q):p},
jd(a){return A.eT(A.cR(v.typeUniverse,a,!1))},
is(a){var s,r,q,p,o=this
if(o===t.K)return A.aZ(o,a,A.ix)
if(!A.ae(o))if(!(o===t._))s=!1
else s=!0
else s=!0
if(s)return A.aZ(o,a,A.iA)
s=o.y
r=s===6?o.z:o
if(r===t.S)q=A.eM
else if(r===t.i||r===t.p)q=A.iw
else if(r===t.N)q=A.iy
else q=r===t.w?A.fE:null
if(q!=null)return A.aZ(o,a,q)
if(r.y===9){p=r.z
if(r.Q.every(A.j2)){o.r="$i"+p
if(p==="B")return A.aZ(o,a,A.iv)
return A.aZ(o,a,A.iz)}}else if(s===7)return A.aZ(o,a,A.iq)
return A.aZ(o,a,A.io)},
aZ(a,b,c){a.b=c
return a.b(b)},
ir(a){var s,r=this,q=A.im
if(!A.ae(r))if(!(r===t._))s=!1
else s=!0
else s=!0
if(s)q=A.ii
else if(r===t.K)q=A.ig
else{s=A.bR(r)
if(s)q=A.ip}r.a=q
return r.a(a)},
e3(a){var s,r=a.y
if(!A.ae(a))if(!(a===t._))if(!(a===t.I))if(r!==7)s=r===8&&A.e3(a.z)||a===t.P||a===t.T
else s=!0
else s=!0
else s=!0
else s=!0
return s},
io(a){var s=this
if(a==null)return A.e3(s)
return A.x(v.typeUniverse,A.fP(a,s),null,s,null)},
iq(a){if(a==null)return!0
return this.z.b(a)},
iz(a){var s,r=this
if(a==null)return A.e3(r)
s=r.r
if(a instanceof A.j)return!!a[s]
return!!J.b3(a)[s]},
iv(a){var s,r=this
if(a==null)return A.e3(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.r
if(a instanceof A.j)return!!a[s]
return!!J.b3(a)[s]},
im(a){var s,r=this
if(a==null){s=A.bR(r)
if(s)return a}else if(r.b(a))return a
A.fC(a,r)},
ip(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.fC(a,s)},
fC(a,b){throw A.a(A.fw(A.fs(a,A.fP(a,b),A.J(b,null))))},
iS(a,b,c,d){var s=null
if(A.x(v.typeUniverse,a,s,b,s))return a
throw A.a(A.fw("The type argument '"+A.J(a,s)+"' is not a subtype of the type variable bound '"+A.J(b,s)+"' of type variable '"+c+"' in '"+d+"'."))},
fs(a,b,c){var s=A.c4(a),r=A.J(b==null?A.L(a):b,null)
return s+": type '"+r+"' is not a subtype of type '"+c+"'"},
fw(a){return new A.bI("TypeError: "+a)},
I(a,b){return new A.bI("TypeError: "+A.fs(a,null,b))},
ix(a){return a!=null},
ig(a){if(a!=null)return a
throw A.a(A.I(a,"Object"))},
iA(a){return!0},
ii(a){return a},
fE(a){return!0===a||!1===a},
jL(a){if(!0===a)return!0
if(!1===a)return!1
throw A.a(A.I(a,"bool"))},
jN(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.a(A.I(a,"bool"))},
jM(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.a(A.I(a,"bool?"))},
jO(a){if(typeof a=="number")return a
throw A.a(A.I(a,"double"))},
jQ(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.I(a,"double"))},
jP(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.I(a,"double?"))},
eM(a){return typeof a=="number"&&Math.floor(a)===a},
cS(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.a(A.I(a,"int"))},
jS(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.a(A.I(a,"int"))},
jR(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.a(A.I(a,"int?"))},
iw(a){return typeof a=="number"},
ie(a){if(typeof a=="number")return a
throw A.a(A.I(a,"num"))},
jU(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.I(a,"num"))},
jT(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a(A.I(a,"num?"))},
iy(a){return typeof a=="string"},
aF(a){if(typeof a=="string")return a
throw A.a(A.I(a,"String"))},
jV(a){if(typeof a=="string")return a
if(a==null)return a
throw A.a(A.I(a,"String"))},
ih(a){if(typeof a=="string")return a
if(a==null)return a
throw A.a(A.I(a,"String?"))},
iG(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.J(a[q],b)
return s},
fD(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=", "
if(a6!=null){s=a6.length
if(a5==null){a5=A.o([],t.s)
r=null}else r=a5.length
q=a5.length
for(p=s;p>0;--p)B.b.C(a5,"T"+(q+p))
for(o=t.Q,n=t._,m="<",l="",p=0;p<s;++p,l=a3){m+=l
k=a5.length
j=k-1-p
if(!(j>=0))return A.h(a5,j)
m=B.k.U(m,a5[j])
i=a6[p]
h=i.y
if(!(h===2||h===3||h===4||h===5||i===o))if(!(i===n))k=!1
else k=!0
else k=!0
if(!k)m+=" extends "+A.J(i,a5)}m+=">"}else{m=""
r=null}o=a4.z
g=a4.Q
f=g.a
e=f.length
d=g.b
c=d.length
b=g.c
a=b.length
a0=A.J(o,a5)
for(a1="",a2="",p=0;p<e;++p,a2=a3)a1+=a2+A.J(f[p],a5)
if(c>0){a1+=a2+"["
for(a2="",p=0;p<c;++p,a2=a3)a1+=a2+A.J(d[p],a5)
a1+="]"}if(a>0){a1+=a2+"{"
for(a2="",p=0;p<a;p+=3,a2=a3){a1+=a2
if(b[p+1])a1+="required "
a1+=A.J(b[p+2],a5)+" "+b[p]}a1+="}"}if(r!=null){a5.toString
a5.length=r}return m+"("+a1+") => "+a0},
J(a,b){var s,r,q,p,o,n,m,l=a.y
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=A.J(a.z,b)
return s}if(l===7){r=a.z
s=A.J(r,b)
q=r.y
return(q===11||q===12?"("+s+")":s)+"?"}if(l===8)return"FutureOr<"+A.J(a.z,b)+">"
if(l===9){p=A.iL(a.z)
o=a.Q
return o.length>0?p+("<"+A.iG(o,b)+">"):p}if(l===11)return A.fD(a,b,null)
if(l===12)return A.fD(a.z,b,a.Q)
if(l===13){n=a.z
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
iL(a){var s,r=v.mangledGlobalNames[a]
if(r!=null)return r
s="minified:"+a
return s},
id(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
ic(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.cR(a,b,!1)
else if(typeof m=="number"){s=m
r=A.bK(a,5,"#")
q=A.e_(s)
for(p=0;p<s;++p)q[p]=r
o=A.bJ(a,b,q)
n[b]=o
return o}else return m},
ia(a,b){return A.fA(a.tR,b)},
i9(a,b){return A.fA(a.eT,b)},
cR(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.fv(A.ft(a,null,b,c))
r.set(b,s)
return s},
dZ(a,b,c){var s,r,q=b.ch
if(q==null)q=b.ch=new Map()
s=q.get(c)
if(s!=null)return s
r=A.fv(A.ft(a,b,c,!0))
q.set(c,r)
return r},
ib(a,b,c){var s,r,q,p=b.cx
if(p==null)p=b.cx=new Map()
s=c.cy
r=p.get(s)
if(r!=null)return r
q=A.eD(a,b,c.y===10?c.Q:[c])
p.set(s,q)
return q},
aq(a,b){b.a=A.ir
b.b=A.is
return b},
bK(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.T(null,null)
s.y=b
s.cy=c
r=A.aq(a,s)
a.eC.set(c,r)
return r},
fz(a,b,c){var s,r=b.cy+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.i7(a,b,r,c)
a.eC.set(r,s)
return s},
i7(a,b,c,d){var s,r,q
if(d){s=b.y
if(!A.ae(b))r=b===t.P||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.T(null,null)
q.y=6
q.z=b
q.cy=c
return A.aq(a,q)},
eF(a,b,c){var s,r=b.cy+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.i6(a,b,r,c)
a.eC.set(r,s)
return s},
i6(a,b,c,d){var s,r,q,p
if(d){s=b.y
if(!A.ae(b))if(!(b===t.P||b===t.T))if(s!==7)r=s===8&&A.bR(b.z)
else r=!0
else r=!0
else r=!0
if(r)return b
else if(s===1||b===t.I)return t.P
else if(s===6){q=b.z
if(q.y===8&&A.bR(q.z))return q
else return A.fl(a,b)}}p=new A.T(null,null)
p.y=7
p.z=b
p.cy=c
return A.aq(a,p)},
fy(a,b,c){var s,r=b.cy+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.i4(a,b,r,c)
a.eC.set(r,s)
return s},
i4(a,b,c,d){var s,r,q
if(d){s=b.y
if(!A.ae(b))if(!(b===t._))r=!1
else r=!0
else r=!0
if(r||b===t.K)return b
else if(s===1)return A.bJ(a,"P",[b])
else if(b===t.P||b===t.T)return t.bc}q=new A.T(null,null)
q.y=8
q.z=b
q.cy=c
return A.aq(a,q)},
i8(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.T(null,null)
s.y=13
s.z=b
s.cy=q
r=A.aq(a,s)
a.eC.set(q,r)
return r},
cQ(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].cy
return s},
i3(a){var s,r,q,p,o,n,m=a.length
for(s="",r="",q=0;q<m;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
n=a[q+2].cy
s+=r+p+o+n}return s},
bJ(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cQ(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.T(null,null)
r.y=9
r.z=b
r.Q=c
if(c.length>0)r.c=c[0]
r.cy=p
q=A.aq(a,r)
a.eC.set(p,q)
return q},
eD(a,b,c){var s,r,q,p,o,n
if(b.y===10){s=b.z
r=b.Q.concat(c)}else{r=c
s=b}q=s.cy+(";<"+A.cQ(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.T(null,null)
o.y=10
o.z=s
o.Q=r
o.cy=q
n=A.aq(a,o)
a.eC.set(q,n)
return n},
fx(a,b,c){var s,r,q,p,o,n=b.cy,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cQ(m)
if(j>0){s=l>0?",":""
r=A.cQ(k)
g+=s+"["+r+"]"}if(h>0){s=l>0?",":""
r=A.i3(i)
g+=s+"{"+r+"}"}q=n+(g+")")
p=a.eC.get(q)
if(p!=null)return p
o=new A.T(null,null)
o.y=11
o.z=b
o.Q=c
o.cy=q
r=A.aq(a,o)
a.eC.set(q,r)
return r},
eE(a,b,c,d){var s,r=b.cy+("<"+A.cQ(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.i5(a,b,c,r,d)
a.eC.set(r,s)
return s},
i5(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.e_(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.y===1){r[p]=o;++q}}if(q>0){n=A.ac(a,b,r,0)
m=A.bO(a,c,r,0)
return A.eE(a,n,m,c!==m)}}l=new A.T(null,null)
l.y=12
l.z=b
l.Q=c
l.cy=d
return A.aq(a,l)},
ft(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
fv(a){var s,r,q,p,o,n,m,l,k,j,i,h=a.r,g=a.s
for(s=h.length,r=0;r<s;){q=h.charCodeAt(r)
if(q>=48&&q<=57)r=A.hZ(r+1,q,h,g)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36)r=A.fu(a,r,h,g,!1)
else if(q===46)r=A.fu(a,r,h,g,!0)
else{++r
switch(q){case 44:break
case 58:g.push(!1)
break
case 33:g.push(!0)
break
case 59:g.push(A.ap(a.u,a.e,g.pop()))
break
case 94:g.push(A.i8(a.u,g.pop()))
break
case 35:g.push(A.bK(a.u,5,"#"))
break
case 64:g.push(A.bK(a.u,2,"@"))
break
case 126:g.push(A.bK(a.u,3,"~"))
break
case 60:g.push(a.p)
a.p=g.length
break
case 62:p=a.u
o=g.splice(a.p)
A.eC(a.u,a.e,o)
a.p=g.pop()
n=g.pop()
if(typeof n=="string")g.push(A.bJ(p,n,o))
else{m=A.ap(p,a.e,n)
switch(m.y){case 11:g.push(A.eE(p,m,o,a.n))
break
default:g.push(A.eD(p,m,o))
break}}break
case 38:A.i_(a,g)
break
case 42:p=a.u
g.push(A.fz(p,A.ap(p,a.e,g.pop()),a.n))
break
case 63:p=a.u
g.push(A.eF(p,A.ap(p,a.e,g.pop()),a.n))
break
case 47:p=a.u
g.push(A.fy(p,A.ap(p,a.e,g.pop()),a.n))
break
case 40:g.push(a.p)
a.p=g.length
break
case 41:p=a.u
l=new A.cG()
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
A.eC(a.u,a.e,o)
a.p=g.pop()
l.a=o
l.b=k
l.c=j
g.push(A.fx(p,A.ap(p,a.e,g.pop()),l))
break
case 91:g.push(a.p)
a.p=g.length
break
case 93:o=g.splice(a.p)
A.eC(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-1)
break
case 123:g.push(a.p)
a.p=g.length
break
case 125:o=g.splice(a.p)
A.i1(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-2)
break
default:throw"Bad character "+q}}}i=g.pop()
return A.ap(a.u,a.e,i)},
hZ(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
fu(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.y===10)o=o.z
n=A.id(s,o.z)[p]
if(n==null)A.at('No "'+p+'" in "'+A.hO(o)+'"')
d.push(A.dZ(s,o,n))}else d.push(p)
return m},
i_(a,b){var s=b.pop()
if(0===s){b.push(A.bK(a.u,1,"0&"))
return}if(1===s){b.push(A.bK(a.u,4,"1&"))
return}throw A.a(A.cZ("Unexpected extended operation "+A.v(s)))},
ap(a,b,c){if(typeof c=="string")return A.bJ(a,c,a.sEA)
else if(typeof c=="number")return A.i0(a,b,c)
else return c},
eC(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.ap(a,b,c[s])},
i1(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.ap(a,b,c[s])},
i0(a,b,c){var s,r,q=b.y
if(q===10){if(c===0)return b.z
s=b.Q
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.z
q=b.y}else if(c===0)return b
if(q!==9)throw A.a(A.cZ("Indexed base must be an interface type"))
s=b.Q
if(c<=s.length)return s[c-1]
throw A.a(A.cZ("Bad index "+c+" for "+b.i(0)))},
x(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(!A.ae(d))if(!(d===t._))s=!1
else s=!0
else s=!0
if(s)return!0
r=b.y
if(r===4)return!0
if(A.ae(b))return!1
if(b.y!==1)s=!1
else s=!0
if(s)return!0
q=r===13
if(q)if(A.x(a,c[b.z],c,d,e))return!0
p=d.y
s=b===t.P||b===t.T
if(s){if(p===8)return A.x(a,b,c,d.z,e)
return d===t.P||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.x(a,b.z,c,d,e)
if(r===6)return A.x(a,b.z,c,d,e)
return r!==7}if(r===6)return A.x(a,b.z,c,d,e)
if(p===6){s=A.fl(a,d)
return A.x(a,b,c,s,e)}if(r===8){if(!A.x(a,b.z,c,d,e))return!1
return A.x(a,A.fk(a,b),c,d,e)}if(r===7){s=A.x(a,t.P,c,d,e)
return s&&A.x(a,b.z,c,d,e)}if(p===8){if(A.x(a,b,c,d.z,e))return!0
return A.x(a,b,c,A.fk(a,d),e)}if(p===7){s=A.x(a,b,c,t.P,e)
return s||A.x(a,b,c,d.z,e)}if(q)return!1
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
if(!A.x(a,k,c,j,e)||!A.x(a,j,e,k,c))return!1}return A.fF(a,b.z,c,d.z,e)}if(p===11){if(b===t.g)return!0
if(s)return!1
return A.fF(a,b,c,d,e)}if(r===9){if(p!==9)return!1
return A.iu(a,b,c,d,e)}return!1},
fF(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.x(a3,a4.z,a5,a6.z,a7))return!1
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
if(!A.x(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.x(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.x(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.x(a3,e[a+2],a7,g,a5))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
iu(a,b,c,d,e){var s,r,q,p,o,n,m,l=b.z,k=d.z
for(;l!==k;){s=a.tR[l]
if(s==null)return!1
if(typeof s=="string"){l=s
continue}r=s[k]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dZ(a,b,r[o])
return A.fB(a,p,null,c,d.Q,e)}n=b.Q
m=d.Q
return A.fB(a,n,null,c,m,e)},
fB(a,b,c,d,e,f){var s,r,q,p=b.length
for(s=0;s<p;++s){r=b[s]
q=e[s]
if(!A.x(a,r,d,q,f))return!1}return!0},
bR(a){var s,r=a.y
if(!(a===t.P||a===t.T))if(!A.ae(a))if(r!==7)if(!(r===6&&A.bR(a.z)))s=r===8&&A.bR(a.z)
else s=!0
else s=!0
else s=!0
else s=!0
return s},
j2(a){var s
if(!A.ae(a))if(!(a===t._))s=!1
else s=!0
else s=!0
return s},
ae(a){var s=a.y
return s===2||s===3||s===4||s===5||a===t.Q},
fA(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
e_(a){return a>0?new Array(a):v.typeUniverse.sEA},
T:function T(a,b){var _=this
_.a=a
_.b=b
_.x=_.r=_.c=null
_.y=0
_.cy=_.cx=_.ch=_.Q=_.z=null},
cG:function cG(){this.c=this.b=this.a=null},
bH:function bH(a){this.a=a},
cE:function cE(){},
bI:function bI(a){this.a=a},
hT(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.iP()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.b2(new A.dy(q),1)).observe(s,{childList:true})
return new A.dx(q,s,r)}else if(self.setImmediate!=null)return A.iQ()
return A.iR()},
hU(a){self.scheduleImmediate(A.b2(new A.dz(t.M.a(a)),0))},
hV(a){self.setImmediate(A.b2(new A.dA(t.M.a(a)),0))},
hW(a){t.M.a(a)
A.i2(0,a)},
i2(a,b){var s=new A.dX()
s.bF(a,b)
return s},
eO(a){return new A.cz(new A.w($.q,a.h("w<0>")),a.h("cz<0>"))},
eJ(a,b){a.$2(0,null)
b.b=!0
return b.a},
eG(a,b){A.ij(a,b)},
eI(a,b){b.c8(0,a)},
eH(a,b){b.c9(A.af(a),A.ad(a))},
ij(a,b){var s,r,q=new A.e0(b),p=new A.e1(b)
if(a instanceof A.w)a.b4(q,p,t.z)
else{s=t.z
if(t.d.b(a))a.aP(q,p,s)
else{r=new A.w($.q,t.c)
r.a=8
r.c=a
r.b4(q,p,s)}}},
eP(a){var s=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(r){e=r
d=c}}}(a,1)
return $.q.bm(new A.e8(s),t.H,t.S,t.z)},
d_(a,b){var s=A.fM(a,"error",t.K)
return new A.b6(s,b==null?A.f1(a):b)},
f1(a){var s
if(t.R.b(a)){s=a.gaq()
if(s!=null)return s}return B.a9},
et(a,b){var s
b.a(a)
s=new A.w($.q,b.h("w<0>"))
s.aV(a)
return s},
eB(a,b){var s,r,q
for(s=t.c;r=a.a,(r&4)!==0;)a=s.a(a.c)
if((r&24)!==0){q=b.af()
b.as(a)
A.aX(b,q)}else{q=t.F.a(b.c)
b.a=b.a&1|4
b.c=a
a.b2(q)}},
aX(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c={},b=c.a=a
for(s=t.n,r=t.F,q=t.d;!0;){p={}
o=b.a
n=(o&16)===0
m=!n
if(a0==null){if(m&&(o&1)===0){l=s.a(b.c)
A.e6(l.a,l.b)}return}p.a=a0
k=a0.a
for(b=a0;k!=null;b=k,k=j){b.a=null
A.aX(c.a,b)
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
A.e6(i.a,i.b)
return}f=$.q
if(f!==g)$.q=g
else f=null
b=b.c
if((b&15)===8)new A.dQ(p,c,m).$0()
else if(n){if((b&1)!==0)new A.dP(p,i).$0()}else if((b&2)!==0)new A.dO(c,p).$0()
if(f!=null)$.q=f
b=p.c
if(q.b(b)){o=p.a.$ti
o=o.h("P<2>").b(b)||!o.Q[1].b(b)}else o=!1
if(o){q.a(b)
e=p.a.b
if((b.a&24)!==0){d=r.a(e.c)
e.c=null
a0=e.ag(d)
e.a=b.a&30|e.a&1
e.c=b.c
c.a=b
continue}else A.eB(b,e)
return}}e=p.a.b
d=r.a(e.c)
e.c=null
a0=e.ag(d)
b=p.b
o=p.c
if(!b){e.$ti.c.a(o)
e.a=8
e.c=o}else{s.a(o)
e.a=e.a&1|16
e.c=o}c.a=e
b=e}},
iE(a,b){var s
if(t.C.b(a))return b.bm(a,t.z,t.K,t.l)
s=t.y
if(s.b(a))return s.a(a)
throw A.a(A.eo(a,"onError",u.c))},
iD(){var s,r
for(s=$.b_;s!=null;s=$.b_){$.bN=null
r=s.b
$.b_=r
if(r==null)$.bM=null
s.a.$0()}},
iI(){$.eL=!0
try{A.iD()}finally{$.bN=null
$.eL=!1
if($.b_!=null)$.eY().$1(A.fL())}},
fJ(a){var s=new A.cA(a),r=$.bM
if(r==null){$.b_=$.bM=s
if(!$.eL)$.eY().$1(A.fL())}else $.bM=r.b=s},
iH(a){var s,r,q,p=$.b_
if(p==null){A.fJ(a)
$.bN=$.bM
return}s=new A.cA(a)
r=$.bN
if(r==null){s.b=p
$.b_=$.bN=s}else{q=r.b
s.b=q
$.bN=r.b=s
if(q==null)$.bM=s}},
j8(a){var s=null,r=$.q
if(B.e===r){A.b0(s,s,B.e,a)
return}A.b0(s,s,r,t.M.a(r.b9(a)))},
jy(a,b){A.fM(a,"stream",t.K)
return new A.cO(b.h("cO<0>"))},
ik(a,b,c){var s,r,q=a.c7(),p=$.h0()
if(q!==p){s=t.W.a(new A.e2(b,c))
p=q.$ti
r=$.q
q.ad(new A.ab(new A.w(r,p),8,s,null,p.h("@<1>").A(p.c).h("ab<1,2>")))}else b.at(c)},
e6(a,b){A.iH(new A.e7(a,b))},
fH(a,b,c,d,e){var s,r=$.q
if(r===c)return d.$0()
$.q=c
s=r
try{r=d.$0()
return r}finally{$.q=s}},
fI(a,b,c,d,e,f,g){var s,r=$.q
if(r===c)return d.$1(e)
$.q=c
s=r
try{r=d.$1(e)
return r}finally{$.q=s}},
iF(a,b,c,d,e,f,g,h,i){var s,r=$.q
if(r===c)return d.$2(e,f)
$.q=c
s=r
try{r=d.$2(e,f)
return r}finally{$.q=s}},
b0(a,b,c,d){t.M.a(d)
if(B.e!==c)d=c.b9(d)
A.fJ(d)},
dy:function dy(a){this.a=a},
dx:function dx(a,b,c){this.a=a
this.b=b
this.c=c},
dz:function dz(a){this.a=a},
dA:function dA(a){this.a=a},
dX:function dX(){},
dY:function dY(a,b){this.a=a
this.b=b},
cz:function cz(a,b){this.a=a
this.b=!1
this.$ti=b},
e0:function e0(a){this.a=a},
e1:function e1(a){this.a=a},
e8:function e8(a){this.a=a},
b6:function b6(a,b){this.a=a
this.b=b},
ab:function ab(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
w:function w(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
dG:function dG(a,b){this.a=a
this.b=b},
dN:function dN(a,b){this.a=a
this.b=b},
dJ:function dJ(a){this.a=a},
dK:function dK(a){this.a=a},
dL:function dL(a,b,c){this.a=a
this.b=b
this.c=c},
dI:function dI(a,b){this.a=a
this.b=b},
dM:function dM(a,b){this.a=a
this.b=b},
dH:function dH(a,b,c){this.a=a
this.b=b
this.c=c},
dQ:function dQ(a,b,c){this.a=a
this.b=b
this.c=c},
dR:function dR(a){this.a=a},
dP:function dP(a,b){this.a=a
this.b=b},
dO:function dO(a,b){this.a=a
this.b=b},
cA:function cA(a){this.a=a
this.b=null},
bw:function bw(){},
ds:function ds(a,b){this.a=a
this.b=b},
dt:function dt(a,b){this.a=a
this.b=b},
dq:function dq(a){this.a=a},
dr:function dr(a,b,c){this.a=a
this.b=b
this.c=c},
bx:function bx(){},
cO:function cO(a){this.$ti=a},
e2:function e2(a,b){this.a=a
this.b=b},
bL:function bL(){},
e7:function e7(a,b){this.a=a
this.b=b},
cN:function cN(){},
dV:function dV(a,b){this.a=a
this.b=b},
dW:function dW(a,b,c){this.a=a
this.b=b
this.c=c},
hz(a,b,c,d){return A.hY(A.iT(),a,b,c,d)},
fd(a,b){return new A.a4(a.h("@<0>").A(b).h("a4<1,2>"))},
hY(a,b,c,d,e){var s=c!=null?c:new A.dT(d)
return new A.bE(a,b,s,d.h("@<0>").A(e).h("bE<1,2>"))},
il(a,b){return J.au(a,b)},
hx(a,b,c){var s,r
if(A.eN(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.o([],t.s)
B.b.C($.N,a)
try{A.iB(a,s)}finally{if(0>=$.N.length)return A.h($.N,-1)
$.N.pop()}r=A.fn(b,t.e.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
fa(a,b,c){var s,r
if(A.eN(a))return b+"..."+c
s=new A.cs(b)
B.b.C($.N,a)
try{r=s
r.a=A.fn(r.a,a,", ")}finally{if(0>=$.N.length)return A.h($.N,-1)
$.N.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
eN(a){var s,r
for(s=$.N.length,r=0;r<s;++r)if(a===$.N[r])return!0
return!1},
iB(a,b){var s,r,q,p,o,n,m,l=a.gq(a),k=0,j=0
while(!0){if(!(k<80||j<3))break
if(!l.m())return
s=A.v(l.gn())
B.b.C(b,s)
k+=s.length+2;++j}if(!l.m()){if(j<=5)return
if(0>=b.length)return A.h(b,-1)
r=b.pop()
if(0>=b.length)return A.h(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.m()){if(j<=4){B.b.C(b,A.v(p))
return}r=A.v(p)
if(0>=b.length)return A.h(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.m();p=o,o=n){n=l.gn();++j
if(j>100){while(!0){if(!(k>75&&j>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2;--j}B.b.C(b,"...")
return}}q=A.v(p)
r=A.v(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
while(!0){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.C(b,m)
B.b.C(b,q)
B.b.C(b,r)},
ey(a){var s,r={}
if(A.eN(a))return"{...}"
s=new A.cs("")
try{B.b.C($.N,a)
s.a+="{"
r.a=!0
a.a3(0,new A.de(r,s))
s.a+="}"}finally{if(0>=$.N.length)return A.h($.N,-1)
$.N.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
dU:function dU(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
bE:function bE(a,b,c,d){var _=this
_.x=a
_.y=b
_.z=c
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=d},
dT:function dT(a){this.a=a},
bi:function bi(){},
bo:function bo(){},
m:function m(){},
bp:function bp(){},
de:function de(a,b){this.a=a
this.b=b},
ak:function ak(){},
bF:function bF(){},
ht(a){if(a instanceof A.E)return a.i(0)
return"Instance of '"+A.dm(a)+"'"},
aP(a,b,c,d){var s,r=c?J.fc(a,d):J.fb(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
fe(a,b,c){var s,r=A.o([],c.h("y<0>"))
for(s=a.gq(a);s.m();)B.b.C(r,c.a(s.gn()))
if(b)return r
return J.ev(r,c)},
fn(a,b,c){var s=J.en(b)
if(!s.m())return a
if(c.length===0){do a+=A.v(s.gn())
while(s.m())}else{a+=A.v(s.gn())
for(;s.m();)a=a+c+A.v(s.gn())}return a},
f9(){return new A.c0(Date.now(),!1)},
hr(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
hs(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c1(a){if(a>=10)return""+a
return"0"+a},
c4(a){if(typeof a=="number"||A.fE(a)||a==null)return J.cY(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ht(a)},
cZ(a){return new A.b5(a)},
bV(a,b){return new A.a0(!1,null,b,a)},
eo(a,b,c){return new A.a0(!0,a,b,c)},
ep(a,b,c){return a},
hM(a){var s=null
return new A.aU(s,s,!1,s,s,a)},
S(a,b,c,d,e){return new A.aU(b,c,!0,a,d,"Invalid value")},
hN(a,b,c){if(a>c)throw A.a(A.S(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.a(A.S(b,a,c,"end",null))
return b}return c},
aV(a,b){if(a<0)throw A.a(A.S(a,0,null,b,null))
return a},
cb(a,b,c,d,e){var s=A.cS(e==null?J.ag(b):e)
return new A.ca(s,!0,a,c,"Index out of range")},
H(a){return new A.cw(a)},
eA(a){return new A.cu(a)},
cq(a){return new A.bv(a)},
aI(a){return new A.bZ(a)},
hC(a,b){var s,r=a.gk(a)
b=A.aT(b)
s=$.hb()
return A.hR(A.fo(A.fo(s,r),b))},
cV(a){A.j6(a)},
c0:function c0(a,b){this.a=a
this.b=b},
dC:function dC(){},
p:function p(){},
b5:function b5(a){this.a=a},
ao:function ao(){},
ck:function ck(){},
a0:function a0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aU:function aU(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
ca:function ca(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
cw:function cw(a){this.a=a},
cu:function cu(a){this.a=a},
bv:function bv(a){this.a=a},
bZ:function bZ(a){this.a=a},
bu:function bu(){},
c_:function c_(a){this.a=a},
dF:function dF(a){this.a=a},
f:function f(){},
G:function G(){},
z:function z(){},
j:function j(){},
cP:function cP(){},
cs:function cs(a){this.a=a},
f6(a,b){var s=document.createElement("canvas")
s.toString
if(b!=null)B.q.sv(s,b)
if(a!=null)B.q.sE(s,a)
return s},
cF(a,b,c,d,e){var s=c==null?null:A.eQ(new A.dD(c),t.A)
s=new A.bD(a,b,s,!1,e.h("bD<0>"))
s.b5()
return s},
eQ(a,b){var s=$.q
if(s===B.e)return a
return s.c6(a,b)},
d:function d(){},
bS:function bS(){},
bU:function bU(){},
av:function av(){},
b8:function b8(){},
X:function X(){},
aK:function aK(){},
d3:function d3(){},
d4:function d4(){},
cC:function cC(a,b){this.a=a
this.b=b},
k:function k(){},
b:function b(){},
A:function A(){},
c7:function c7(){},
ai:function ai(){},
aM:function aM(){},
Y:function Y(){},
cB:function cB(a){this.a=a},
e:function e(){},
br:function br(){},
cp:function cp(){},
K:function K(){},
aW:function aW(){},
es:function es(a,b){this.a=a
this.$ti=b},
bC:function bC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aE:function aE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bD:function bD(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
dD:function dD(a){this.a=a},
dE:function dE(a){this.a=a},
R:function R(){},
aw:function aw(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
cD:function cD(){},
cH:function cH(){},
cI:function cI(){},
cJ:function cJ(){},
cK:function cK(){},
er(){var s=window.navigator.userAgent
s.toString
return s},
c5:function c5(a){this.b=a},
d5:function d5(){},
d6:function d6(){},
d7:function d7(){},
fR(a,b,c){A.iS(c,t.p,"T","max")
return Math.max(c.a(a),c.a(b))},
fj(a){var s=new A.cM()
s.bE(a)
return s},
cM:function cM(){this.b=this.a=0},
c:function c(){},
a1:function a1(a,b,c){this.a=a
this.b=b
this.$ti=c},
aL:function aL(a,b){this.a=a
this.b=b},
da:function da(){},
D:function D(a,b){this.a=a
this.b=b},
dn:function dn(a){this.a=a},
cx:function cx(){},
i:function i(a,b){this.a=a
this.b=b},
d0:function d0(a,b){this.a=a
this.b=b},
ah:function ah(){},
hl(a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c='normal 12 "Menlo", "Courier", monospace',b='normal 24px "Menlo", "Courier", monospace',a=A.f6(d,d)
switch(a1.a){case 0:s=a.getContext("2d")
s.toString
r=a2==null
if(r)q=a4<2?c:b
else q=a2
if(r)r=a4<2?c:b
else r=a2
s.textBaseline="top"
s.font=r
p=s.measureText(A.ez(9608))
r=p.actualBoundingBoxLeft
o=r==null?d:B.c.a5(r)
if(o==null)o=0
r=p.actualBoundingBoxRight
n=r==null?d:B.c.a5(r)
if(n==null)n=0
r=p.width
r=r==null?d:B.c.a5(r)
if(r==null)r=0
m=Math.max(r,Math.abs(o)+Math.abs(n))
r=p.actualBoundingBoxAscent
l=r==null?d:B.c.a5(r)
if(l==null)l=0
r=p.actualBoundingBoxDescent
k=r==null?d:B.c.a5(r)
if(k==null)k=0
j=Math.abs(l)+Math.abs(k)
A.cV("MEASURE: left "+o+", right "+n+", ascent "+l+", descent "+k)
A.cV("CHAR width "+A.v(m)+", height "+j)
i=new A.c6(q,new A.i(m,j),a4,s)
B.i.sal(s,!1)
s.translate(0.5,0.5)
break
case 1:s=a.getContext("2d")
s.toString
i=A.hw("packages/fortress/dos-vga-437.png",B.av,new A.i(9,16),s,a4)
break
default:i=d}s=J.eZ(a0)
s.bn(s,new A.d1())
a0.appendChild(a).toString
s=a0.clientWidth
s.toString
r=a0.clientHeight
r.toString
h=B.a.aS(s,i.gaE())
g=B.a.aS(r,i.gaD())
h=Math.max(h,a3.a)
g=Math.max(g,a3.b)
f=h*i.gaE()
e=g*i.gaD()
B.q.sv(a,f*a4)
B.q.sE(a,e*a4)
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
B.m.aA(s,B.m.ar(s,"image-rendering"),"pixelated","")
s=a.style
s.toString
B.m.aA(s,B.m.ar(s,"font-smoothing"),"none","")
s=h*g
return new A.bW(new A.du(new A.a1(new A.i(h,g),A.aP(s,B.F,!1,t.x),t.U),new A.a1(new A.i(h,g),A.aP(s,B.G,!1,t.cj),t.J)),i)},
bW:function bW(a,b){this.c=a
this.d=b},
d1:function d1(){},
f7(a,b,c){var s=b==null?B.d:b
return new A.W(a,s,c==null?B.j:c)},
O(a,b,c){if(typeof a=="string"&&a.length!==0)return A.f7(B.k.aX(a,0),b,c)
else if(A.eM(a))return A.f7(a,b,c)
else throw A.a(A.eo(a,"charOrCharCode","Argument must be a non-empty String or an int"))},
W:function W(a,b,c){this.a=a
this.b=b
this.c=c},
l:function l(a,b,c){this.a=a
this.b=b
this.c=c},
c6:function c6(a,b,c,d){var _=this
_.c=a
_.d=b
_.a=c
_.b=d},
hw(a,b,c,d,e){var s=document.createElement("img")
s.toString
s=new A.c9(c,b,b.gap(b).cp(0,B.a2),s,A.fd(t.k,t.E),e,d)
B.i.sal(d,!1)
d.translate(0.5,0.5)
s.bD(a,b,c,d,e)
return s},
c9:function c9(a,b,c,d,e,f,g){var _=this
_.c=a
_.d=b
_.e=c
_.f=d
_.r=e
_.x=null
_.y=!1
_.a=f
_.b=g},
d9:function d9(a){this.a=a},
cg:function cg(a,b){this.a=a
this.$ti=b},
aY:function aY(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.e=d},
am:function am(){},
a9:function a9(){},
b9:function b9(a,b,c){this.c=a
this.d=b
this.e=c},
al:function al(){},
du:function du(a,b){this.a=a
this.b=b},
fg(a,b,c,d,e,f,g,h,i){var s=(1+g)*2,r=A.hi(new A.D(B.C,new A.i(Math.max(a.length,b.length)+s,3+s)),d,f,e,g)
r.sbd(new A.df(a,h,b,c))
return new A.aR(A.ei(),A.ei(),A.ei(),A.ei(),r,i.h("aR<0>"))},
fh(a,b,c,d,e,f,g,h,i){var s=h?"OK [enter]   Cancel [esc]":"OK [enter]",r=A.fg(a,s,b,null,c,d,g,null,i)
r.scn(new A.dg(r,f))
if(h)r.sck(new A.dh(r,e))
return r},
hA(a,b,c,d,e,f,g,h){var s=A.fg(a,"Yes [y]   No [n]",b,null,c,d,f,null,h)
s.sco(new A.di(s,g))
s.scm(new A.dj(s,e))
return s},
hB(){},
b7:function b7(){},
aR:function aR(a,b,c,d,e,f){var _=this
_.d=a
_.e=b
_.f=c
_.r=d
_.b=e
_.a=null
_.$ti=f},
df:function df(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dg:function dg(a,b){this.a=a
this.b=b},
dh:function dh(a,b){this.a=a
this.b=b},
di:function di(a,b){this.a=a
this.b=b},
dj:function dj(a,b){this.a=a
this.b=b},
hi(a,b,c,d,e){var s=c===B.A?e:e+1
return new A.aG(c,d,s,a,a.a_(s),b)},
a6:function a6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null},
a7:function a7(a,b){this.a=a
this.b=b},
Z:function Z(a,b){this.a=a
this.b=b},
aG:function aG(a,b,c,d,e,f){var _=this
_.f=a
_.r=b
_.a=c
_.b=d
_.c=e
_.d=f
_.e=null},
c8:function c8(){},
aC:function aC(a,b,c,d){var _=this
_.a=a
_.c=_.b=null
_.d=b
_.e=!0
_.r=_.f=!1
_.x=0
_.y=c
_.$ti=d},
r:function r(){},
cL:function cL(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=0},
bT:function bT(a){this.b=a
this.c=0
this.a=null},
ci:function ci(a,b){var _=this
_.b=a
_.c=!0
_.d=b
_.a=null},
cj:function cj(a){this.b=a
this.a=this.c=null},
dk:function dk(a,b){this.a=a
this.b=b},
e5(){var s=$.hc().J(11)
if(!(s>=0&&s<11))return A.h(B.V,s)
return B.V[s]},
eq(a,b,c){var s=b===B.A?0:1
return new A.c3(b,b,c,s,a,a.a_(s),null)},
c3:function c3(a,b,c,d,e,f,g){var _=this
_.cx=a
_.f=b
_.r=c
_.a=d
_.b=e
_.c=f
_.d=g
_.e=null},
c2:function c2(a,b,c,d,e,f,g){var _=this
_.cx=a
_.f=b
_.r=c
_.a=d
_.b=e
_.c=f
_.d=g
_.e=null},
cl:function cl(){this.a=null},
u:function u(){},
aQ(a){var s,r,q,p
for(s=a.length,r=0,q=0;q<s;++q){p=a[q].length
if(p>r)r=p}return r},
ch:function ch(){this.b=0
this.a=null},
cm:function cm(){this.a=null},
j6(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
eg(){var s=0,r=A.eO(t.z),q,p,o
var $async$eg=A.eP(function(a,b){if(a===1)return A.eH(b,r)
while(true)switch(s){case 0:p=A.fG()
o=p.d
s=2
return A.eG(o.ga4(o),$async$eg)
case 2:o=p.c.a.a
A.cV("TERM cols "+o.a+", rows "+o.b)
o=A.o([],t.q)
if($.M.b!=$.M)A.at(new A.aO("Field '"+$.M.a+"' has already been initialized."))
$.M.b=new A.aC(o,p,new A.cg(A.fd(t.c4,t.Y),t.dc),t.a5)
o=window
o.toString
t.cx.a(A.fQ())
t.Z.a(null)
A.cF(o,"resize",A.fQ(),!1,t.A)
$.M.M().scg(!0)
$.M.M().y.a2(B.t,"ArrowUp")
$.M.M().y.a2(B.u,"ArrowRight")
$.M.M().y.a2(B.v,"ArrowDown")
$.M.M().y.a2(B.w,"ArrowLeft")
$.M.M().y.a2(B.x,"Enter")
$.M.M().y.a2(B.l,"Escape")
$.M.M().Z(new A.ch())
o=$.M.M()
o.f=!0
q=window
q=q.performance.now()
q.toString
o.x=q
q=window
q.toString
B.a1.bp(q,o.gb1())
return A.eI(null,r)}})
return A.eJ($async$eg,r)},
e4(a){var s=0,r=A.eO(t.z),q,p
var $async$e4=A.eP(function(b,c){if(b===1)return A.eH(c,r)
while(true)switch(s){case 0:q=A.fG()
p=q.d
s=2
return A.eG(p.ga4(p),$async$e4)
case 2:$.M.M().scz(q)
return A.eI(null,r)}})
return A.eJ($async$e4,r)},
fG(){var s,r,q,p=window.devicePixelRatio
p.toString
s=B.c.T(p)
r=document.querySelector("#game")
p=r.clientWidth
p.toString
p="GAME width "+p+", height "
q=r.clientHeight
q.toString
A.cV(p+q)
switch(1){case 1:return A.hl(r,B.aa,null,new A.i(Math.max(A.aQ(B.n),A.aQ(B.p)),25),s)}}},J={
eW(a,b,c,d){return{i:a,p:b,e:c,x:d}},
eb(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.eV==null){A.iY()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.a(A.eA("Return interceptor for "+A.v(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.dS
if(o==null)o=$.dS=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.j3(a)
if(p!=null)return p
if(typeof a=="function")return B.an
s=Object.getPrototypeOf(a)
if(s==null)return B.a0
if(s===Object.prototype)return B.a0
if(typeof q=="function"){o=$.dS
if(o==null)o=$.dS=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.B,enumerable:false,writable:true,configurable:true})
return B.B}return B.B},
fb(a,b){if(a<0||a>4294967295)throw A.a(A.S(a,0,4294967295,"length",null))
return J.hy(new Array(a),b)},
fc(a,b){if(a<0)throw A.a(A.bV("Length must be a non-negative integer: "+a,null))
return A.o(new Array(a),b.h("y<0>"))},
hy(a,b){return J.ev(A.o(a,b.h("y<0>")),b)},
ev(a,b){a.fixed$length=Array
return a},
b3(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bj.prototype
return J.cd.prototype}if(typeof a=="string")return J.aN.prototype
if(a==null)return J.bk.prototype
if(typeof a=="boolean")return J.cc.prototype
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a3.prototype
return a}if(a instanceof A.j)return a
return J.eb(a)},
ea(a){if(typeof a=="string")return J.aN.prototype
if(a==null)return a
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a3.prototype
return a}if(a instanceof A.j)return a
return J.eb(a)},
fN(a){if(a==null)return a
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a3.prototype
return a}if(a instanceof A.j)return a
return J.eb(a)},
bQ(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.a3.prototype
return a}if(a instanceof A.j)return a
return J.eb(a)},
au(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.b3(a).B(a,b)},
hd(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||A.j1(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.ea(a).u(a,b)},
he(a,b,c,d){return J.bQ(a).bG(a,b,c,d)},
hf(a,b,c,d){return J.bQ(a).bZ(a,b,c,d)},
hg(a,b,c){return J.bQ(a).c_(a,b,c)},
cX(a,b){return J.fN(a).N(a,b)},
eZ(a){return J.bQ(a).gbb(a)},
f_(a){return J.b3(a).gk(a)},
en(a){return J.fN(a).gq(a)},
ag(a){return J.ea(a).gj(a)},
f0(a){return J.bQ(a).cq(a)},
hh(a,b){return J.bQ(a).ct(a,b)},
cY(a){return J.b3(a).i(a)},
F:function F(){},
cc:function cc(){},
bk:function bk(){},
ax:function ax(){},
cn:function cn(){},
bA:function bA(){},
a3:function a3(){},
y:function y(a){this.$ti=a},
db:function db(a){this.$ti=a},
Q:function Q(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bl:function bl(){},
bj:function bj(){},
cd:function cd(){},
aN:function aN(){}},B={}
var w=[A,J,B]
hunkHelpers.setFunctionNamesIfNecessary(w)
var $={}
A.ew.prototype={}
J.F.prototype={
B(a,b){return a===b},
gk(a){return A.aT(a)},
i(a){return"Instance of '"+A.dm(a)+"'"}}
J.cc.prototype={
i(a){return String(a)},
gk(a){return a?519018:218159},
$iC:1}
J.bk.prototype={
B(a,b){return null==b},
i(a){return"null"},
gk(a){return 0},
$iz:1}
J.ax.prototype={
gk(a){return 0},
i(a){return String(a)}}
J.cn.prototype={}
J.bA.prototype={}
J.a3.prototype={
i(a){var s=a[$.fW()]
if(s==null)return this.bz(a)
return"JavaScript function for "+J.cY(s)},
$ia2:1}
J.y.prototype={
C(a,b){A.U(a).c.a(b)
if(!!a.fixed$length)A.at(A.H("add"))
a.push(b)},
a3(a,b){var s,r
A.U(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.a(A.aI(a))}},
ci(a,b){var s,r=A.aP(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.w(r,s,A.v(a[s]))
return r.join(b)},
N(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
bw(a,b){var s=a.length
if(b>s)throw A.a(A.S(b,0,s,"start",null))
if(b===s)return A.o([],A.U(a))
return A.o(a.slice(b,s),A.U(a))},
gaK(a){var s=a.length
if(s>0)return a[s-1]
throw A.a(A.eu())},
i(a){return A.fa(a,"[","]")},
gq(a){return new J.Q(a,a.length,A.U(a).h("Q<1>"))},
gk(a){return A.aT(a)},
gj(a){return a.length},
sj(a,b){if(!!a.fixed$length)A.at(A.H("set length"))
if(b>a.length)A.U(a).c.a(null)
a.length=b},
w(a,b,c){A.U(a).c.a(c)
if(!!a.immutable$list)A.at(A.H("indexed set"))
if(!(b>=0&&b<a.length))throw A.a(A.cT(a,b))
a[b]=c},
$in:1,
$if:1,
$iB:1}
J.db.prototype={}
J.Q.prototype={
gn(){return this.$ti.c.a(this.d)},
m(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.a(A.cW(q))
s=r.c
if(s>=p){r.saY(null)
return!1}r.saY(q[s]);++r.c
return!0},
saY(a){this.d=this.$ti.h("1?").a(a)},
$iG:1}
J.bl.prototype={
aG(a,b){var s
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=B.a.gaJ(b)
if(this.gaJ(a)===s)return 0
if(this.gaJ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaJ(a){return a===0?1/a<0:a<0},
T(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.a(A.H(""+a+".toInt()"))},
a5(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.a(A.H(""+a+".round()"))},
aF(a,b,c){if(B.a.aG(b,c)>0)throw A.a(A.iN(b))
if(this.aG(a,b)<0)return b
if(this.aG(a,c)>0)return c
return a},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gk(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
bt(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
aS(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.b3(a,b)},
l(a,b){return(a|0)===a?a/b|0:this.b3(a,b)},
b3(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.a(A.H("Result of truncating division is "+A.v(s)+": "+A.v(a)+" ~/ "+b))},
aC(a,b){var s
if(a>0)s=this.c2(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
c2(a,b){return b>31?0:a>>>b},
$icU:1,
$ia_:1}
J.bj.prototype={$iV:1}
J.cd.prototype={}
J.aN.prototype={
cD(a,b){if(b<0)throw A.a(A.cT(a,b))
if(b>=a.length)A.at(A.cT(a,b))
return a.charCodeAt(b)},
aX(a,b){if(b>=a.length)throw A.a(A.cT(a,b))
return a.charCodeAt(b)},
U(a,b){return a+b},
aH(a,b,c){var s=a.length
if(c>s)throw A.a(A.S(c,0,s,null,null))
return A.j9(a,b,c)},
i(a){return a},
gk(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gj(a){return a.length},
$ifi:1,
$ia8:1}
A.aO.prototype={
i(a){var s="LateInitializationError: "+this.a
return s}}
A.ej.prototype={
$0(){return A.et(null,t.P)},
$S:8}
A.dp.prototype={}
A.n.prototype={}
A.ay.prototype={
gq(a){var s=this
return new A.az(s,s.gj(s),A.t(s).h("az<ay.E>"))}}
A.by.prototype={
gbM(){var s=J.ag(this.a),r=this.c
if(r==null||r>s)return s
return r},
gc3(){var s=J.ag(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.ag(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
if(typeof s!=="number")return s.cC()
return s-q},
N(a,b){var s=this,r=s.gc3()+b
if(b<0||r>=s.gbM())throw A.a(A.cb(b,s,"index",null,null))
return J.cX(s.a,r)},
aQ(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.ea(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.fb(0,p.$ti.c)
return n}r=A.aP(s,m.N(n,o),!1,p.$ti.c)
for(q=1;q<s;++q){B.b.w(r,q,m.N(n,o+q))
if(m.gj(n)<l)throw A.a(A.aI(p))}return r}}
A.az.prototype={
gn(){return this.$ti.c.a(this.d)},
m(){var s,r=this,q=r.a,p=J.ea(q),o=p.gj(q)
if(r.b!==o)throw A.a(A.aI(q))
s=r.c
if(s>=o){r.sa7(null)
return!1}r.sa7(p.N(q,s));++r.c
return!0},
sa7(a){this.d=this.$ti.h("1?").a(a)},
$iG:1}
A.a5.prototype={
gq(a){var s=A.t(this)
return new A.bq(J.en(this.a),this.b,s.h("@<1>").A(s.Q[1]).h("bq<1,2>"))},
gj(a){return J.ag(this.a)},
N(a,b){return this.b.$1(J.cX(this.a,b))}}
A.bb.prototype={$in:1}
A.bq.prototype={
m(){var s=this,r=s.b
if(r.m()){s.sa7(s.c.$1(r.gn()))
return!0}s.sa7(null)
return!1},
gn(){return this.$ti.Q[1].a(this.a)},
sa7(a){this.a=this.$ti.h("2?").a(a)}}
A.bB.prototype={
gq(a){return new A.aD(J.en(this.a),this.b,this.$ti.h("aD<1>"))}}
A.aD.prototype={
m(){var s,r
for(s=this.a,r=this.b;s.m();)if(A.bP(r.$1(s.gn())))return!0
return!1},
gn(){return this.a.gn()}}
A.aB.prototype={
gq(a){var s=this.a
return new A.bz(s.gq(s),this.b,A.t(this).h("bz<1>"))}}
A.bd.prototype={
gj(a){var s=this.a,r=s.gj(s)
s=this.b
if(r>s)return s
return r},
$in:1}
A.bz.prototype={
m(){if(--this.b>=0)return this.a.m()
this.b=-1
return!1},
gn(){if(this.b<0)return this.$ti.c.a(null)
return this.a.gn()}}
A.aA.prototype={
gq(a){var s=this.a
return new A.bt(s.gq(s),this.b,A.t(this).h("bt<1>"))}}
A.bc.prototype={
gj(a){var s=this.a,r=s.gj(s)-this.b
if(r>=0)return r
return 0},
$in:1}
A.bt.prototype={
m(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.m()
this.b=0
return s.m()},
gn(){return this.a.gn()}}
A.aJ.prototype={
i(a){return A.ey(this)},
$iaj:1}
A.ba.prototype={
gj(a){return this.a},
cb(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
u(a,b){if(!this.cb(b))return null
return this.b[A.aF(b)]},
a3(a,b){var s,r,q,p,o,n=this.$ti
n.h("~(1,2)").a(b)
s=this.c
for(r=s.length,q=this.b,n=n.Q[1],p=0;p<r;++p){o=A.aF(s[p])
b.$2(o,n.a(q[o]))}},
gap(a){var s=this.$ti
return A.ff(this.c,new A.d2(this),s.c,s.Q[1])}}
A.d2.prototype={
$1(a){var s=this.a,r=s.$ti
return r.Q[1].a(s.b[A.aF(r.c.a(a))])},
$S(){return this.a.$ti.h("2(1)")}}
A.bf.prototype={
ae(){var s,r,q,p=this,o=p.$map
if(o==null){s=p.$ti
r=s.c
q=A.hv(r)
o=A.hz(A.iC(),q,r,s.Q[1])
A.iU(p.a,o)
p.$map=o}return o},
u(a,b){return this.ae().u(0,b)},
a3(a,b){this.$ti.h("~(1,2)").a(b)
this.ae().a3(0,b)},
gap(a){var s=this.ae()
return s.gap(s)},
gj(a){var s=this.ae()
return s.gj(s)}}
A.d8.prototype={
$1(a){return this.a.b(a)},
$S:9}
A.bg.prototype={
B(a,b){if(b==null)return!1
return b instanceof A.bg&&this.a.B(0,b.a)&&A.eU(this)===A.eU(b)},
gk(a){return A.hC(this.a,A.eU(this))},
i(a){var s="<"+B.b.ci([A.eT(this.$ti.c)],", ")+">"
return this.a.i(0)+" with "+s}}
A.bh.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.Q[0])},
$S(){return A.j_(A.eS(this.a),this.$ti)}}
A.dv.prototype={
O(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.bs.prototype={
i(a){var s=this.b
if(s==null)return"NoSuchMethodError: "+this.a
return"NoSuchMethodError: method not found: '"+s+"' on null"}}
A.cf.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.cv.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.dl.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.be.prototype={}
A.bG.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ian:1}
A.E.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.fU(r==null?"unknown":r)+"'"},
$ia2:1,
gcB(){return this},
$C:"$1",
$R:1,
$D:null}
A.bX.prototype={$C:"$0",$R:0}
A.bY.prototype={$C:"$2",$R:2}
A.ct.prototype={}
A.cr.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.fU(s)+"'"}}
A.aH.prototype={
B(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aH))return!1
return this.$_target===b.$_target&&this.a===b.a},
gk(a){return(A.ek(this.a)^A.aT(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dm(t.K.a(this.a))+"'")}}
A.co.prototype={
i(a){return"RuntimeError: "+this.a}}
A.cy.prototype={
i(a){return"Assertion failed: "+A.c4(this.a)}}
A.a4.prototype={
gj(a){return this.a},
gbj(){return new A.bm(this,A.t(this).h("bm<1>"))},
gap(a){var s=A.t(this)
return A.ff(this.gbj(),new A.dc(this),s.c,s.Q[1])},
u(a,b){var s,r,q,p,o=this,n=null
if(typeof b=="string"){s=o.b
if(s==null)return n
r=o.ax(s,b)
q=r==null?n:r.b
return q}else if(typeof b=="number"&&(b&0x3ffffff)===b){p=o.c
if(p==null)return n
r=o.ax(p,b)
q=r==null?n:r.b
return q}else return o.bg(b)},
bg(a){var s,r,q=this,p=q.d
if(p==null)return null
s=q.aZ(p,q.am(a))
r=q.an(s,a)
if(r<0)return null
return s[r].b},
w(a,b,c){var s,r,q=this,p=A.t(q)
p.c.a(b)
p.Q[1].a(c)
if(typeof b=="string"){s=q.b
q.aU(s==null?q.b=q.ay():s,b,c)}else if(typeof b=="number"&&(b&0x3ffffff)===b){r=q.c
q.aU(r==null?q.c=q.ay():r,b,c)}else q.bh(b,c)},
bh(a,b){var s,r,q,p,o=this,n=A.t(o)
n.c.a(a)
n.Q[1].a(b)
s=o.d
if(s==null)s=o.d=o.ay()
r=o.am(a)
q=o.aZ(s,r)
if(q==null)o.aB(s,r,[o.az(a,b)])
else{p=o.an(q,a)
if(p>=0)q[p].b=b
else q.push(o.az(a,b))}},
a3(a,b){var s,r,q=this
A.t(q).h("~(1,2)").a(b)
s=q.e
r=q.r
for(;s!=null;){b.$2(s.a,s.b)
if(r!==q.r)throw A.a(A.aI(q))
s=s.c}},
aU(a,b,c){var s,r=this,q=A.t(r)
q.c.a(b)
q.Q[1].a(c)
s=r.ax(a,b)
if(s==null)r.aB(a,b,r.az(b,c))
else s.b=c},
az(a,b){var s=this,r=A.t(s),q=new A.dd(r.c.a(a),r.Q[1].a(b))
if(s.e==null)s.e=s.f=q
else s.f=s.f.c=q;++s.a
s.r=s.r+1&67108863
return q},
am(a){return J.f_(a)&0x3ffffff},
an(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.au(a[r].a,b))return r
return-1},
i(a){return A.ey(this)},
ax(a,b){return a[b]},
aZ(a,b){return a[b]},
aB(a,b,c){a[b]=c},
bL(a,b){delete a[b]},
ay(){var s="<non-identifier-key>",r=Object.create(null)
this.aB(r,s,r)
this.bL(r,s)
return r}}
A.dc.prototype={
$1(a){var s=this.a,r=A.t(s)
return r.Q[1].a(s.u(0,r.c.a(a)))},
$S(){return A.t(this.a).h("2(1)")}}
A.dd.prototype={}
A.bm.prototype={
gj(a){return this.a.a},
gq(a){var s=this.a,r=new A.bn(s,s.r,this.$ti.h("bn<1>"))
r.c=s.e
return r}}
A.bn.prototype={
gn(){return this.d},
m(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.a(A.aI(q))
s=r.c
if(s==null){r.saT(null)
return!1}else{r.saT(s.a)
r.c=s.c
return!0}},
saT(a){this.d=this.$ti.h("1?").a(a)},
$iG:1}
A.ec.prototype={
$1(a){return this.a(a)},
$S:10}
A.ed.prototype={
$2(a,b){return this.a(a,b)},
$S:11}
A.ee.prototype={
$1(a){return this.a(A.aF(a))},
$S:12}
A.dB.prototype={
M(){var s=this.b
if(s===this)throw A.a(new A.aO("Field '"+this.a+"' has not been initialized."))
return s}}
A.T.prototype={
h(a){return A.dZ(v.typeUniverse,this,a)},
A(a){return A.ib(v.typeUniverse,this,a)}}
A.cG.prototype={}
A.bH.prototype={
i(a){return A.J(this.a,null)},
$ifp:1}
A.cE.prototype={
i(a){return this.a}}
A.bI.prototype={$iao:1}
A.dy.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:3}
A.dx.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:13}
A.dz.prototype={
$0(){this.a.$0()},
$S:4}
A.dA.prototype={
$0(){this.a.$0()},
$S:4}
A.dX.prototype={
bF(a,b){if(self.setTimeout!=null)self.setTimeout(A.b2(new A.dY(this,b),0),a)
else throw A.a(A.H("`setTimeout()` not found."))}}
A.dY.prototype={
$0(){this.b.$0()},
$S:0}
A.cz.prototype={
c8(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.aV(b)
else{s=r.a
if(q.h("P<1>").b(b))s.aW(b)
else s.au(q.c.a(b))}},
c9(a,b){var s=this.a
if(this.b)s.a0(a,b)
else s.bH(a,b)}}
A.e0.prototype={
$1(a){return this.a.$2(0,a)},
$S:1}
A.e1.prototype={
$2(a,b){this.a.$2(1,new A.be(a,t.l.a(b)))},
$S:14}
A.e8.prototype={
$2(a,b){this.a(A.cS(a),b)},
$S:15}
A.b6.prototype={
i(a){return A.v(this.a)},
$ip:1,
gaq(){return this.b}}
A.ab.prototype={
cj(a){if((this.c&15)!==6)return!0
return this.b.b.aO(t.m.a(this.d),a.a,t.w,t.K)},
cf(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.cu(q,m,a.b,o,n,t.l)
else p=l.aO(t.y.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.b7.b(A.af(s))){if((r.c&1)!==0)throw A.a(A.bV("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.a(A.bV("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.w.prototype={
aP(a,b,c){var s,r,q,p=this.$ti
p.A(c).h("1/(2)").a(a)
s=$.q
if(s===B.e){if(b!=null&&!t.C.b(b)&&!t.y.b(b))throw A.a(A.eo(b,"onError",u.c))}else{c.h("@<0/>").A(p.c).h("1(2)").a(a)
if(b!=null)b=A.iE(b,s)}r=new A.w(s,c.h("w<0>"))
q=b==null?1:3
this.ad(new A.ab(r,q,a,b,p.h("@<1>").A(c).h("ab<1,2>")))
return r},
br(a,b){return this.aP(a,null,b)},
b4(a,b,c){var s,r=this.$ti
r.A(c).h("1/(2)").a(a)
s=new A.w($.q,c.h("w<0>"))
this.ad(new A.ab(s,19,a,b,r.h("@<1>").A(c).h("ab<1,2>")))
return s},
c1(a){this.a=this.a&1|16
this.c=a},
as(a){this.a=a.a&30|this.a&1
this.c=a.c},
ad(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.ad(a)
return}r.as(s)}A.b0(null,null,r.b,t.M.a(new A.dG(r,a)))}},
b2(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.b2(a)
return}m.as(n)}l.a=m.ag(a)
A.b0(null,null,m.b,t.M.a(new A.dN(l,m)))}},
af(){var s=t.F.a(this.c)
this.c=null
return this.ag(s)},
ag(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bK(a){var s,r,q,p=this
p.a^=2
try{a.aP(new A.dJ(p),new A.dK(p),t.P)}catch(q){s=A.af(q)
r=A.ad(q)
A.j8(new A.dL(p,s,r))}},
at(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
s=r.af()
q.c.a(a)
r.a=8
r.c=a
A.aX(r,s)},
au(a){var s,r=this
r.$ti.c.a(a)
s=r.af()
r.a=8
r.c=a
A.aX(r,s)},
a0(a,b){var s
t.l.a(b)
s=this.af()
this.c1(A.d_(a,b))
A.aX(this,s)},
aV(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("P<1>").b(a)){this.aW(a)
return}this.bI(s.c.a(a))},
bI(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.b0(null,null,s.b,t.M.a(new A.dI(s,a)))},
aW(a){var s=this,r=s.$ti
r.h("P<1>").a(a)
if(r.b(a)){if((a.a&16)!==0){s.a^=2
A.b0(null,null,s.b,t.M.a(new A.dM(s,a)))}else A.eB(a,s)
return}s.bK(a)},
bH(a,b){this.a^=2
A.b0(null,null,this.b,t.M.a(new A.dH(this,a,b)))},
$iP:1}
A.dG.prototype={
$0(){A.aX(this.a,this.b)},
$S:0}
A.dN.prototype={
$0(){A.aX(this.b,this.a.a)},
$S:0}
A.dJ.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.au(p.$ti.c.a(a))}catch(q){s=A.af(q)
r=A.ad(q)
p.a0(s,r)}},
$S:3}
A.dK.prototype={
$2(a,b){this.a.a0(t.K.a(a),t.l.a(b))},
$S:16}
A.dL.prototype={
$0(){this.a.a0(this.b,this.c)},
$S:0}
A.dI.prototype={
$0(){this.a.au(this.b)},
$S:0}
A.dM.prototype={
$0(){A.eB(this.b,this.a)},
$S:0}
A.dH.prototype={
$0(){this.a.a0(this.b,this.c)},
$S:0}
A.dQ.prototype={
$0(){var s,r,q,p,o,n,m=this,l=null
try{q=m.a.a
l=q.b.b.bq(t.W.a(q.d),t.z)}catch(p){s=A.af(p)
r=A.ad(p)
q=m.c&&t.n.a(m.b.a.c).a===s
o=m.a
if(q)o.c=t.n.a(m.b.a.c)
else o.c=A.d_(s,r)
o.b=!0
return}if(l instanceof A.w&&(l.a&24)!==0){if((l.a&16)!==0){q=m.a
q.c=t.n.a(l.c)
q.b=!0}return}if(t.d.b(l)){n=m.b.a
q=m.a
q.c=l.br(new A.dR(n),t.z)
q.b=!1}},
$S:0}
A.dR.prototype={
$1(a){return this.a},
$S:17}
A.dP.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.aO(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.af(l)
r=A.ad(l)
q=this.a
q.c=A.d_(s,r)
q.b=!0}},
$S:0}
A.dO.prototype={
$0(){var s,r,q,p,o,n,m=this
try{s=t.n.a(m.a.a.c)
p=m.b
if(p.a.cj(s)&&p.a.e!=null){p.c=p.a.cf(s)
p.b=!1}}catch(o){r=A.af(o)
q=A.ad(o)
p=t.n.a(m.a.a.c)
n=m.b
if(p.a===r)n.c=p
else n.c=A.d_(r,q)
n.b=!0}},
$S:0}
A.cA.prototype={}
A.bw.prototype={
gj(a){var s,r,q=this,p={},o=new A.w($.q,t.aQ)
p.a=0
s=A.t(q)
r=s.h("~(1)?").a(new A.ds(p,q))
t.Z.a(new A.dt(p,o))
A.cF(q.a,q.b,r,!1,s.c)
return o},
gbf(a){var s,r=this,q=A.t(r),p=new A.w($.q,q.h("w<1>"))
q.h("~(1)?").a(null)
t.Z.a(new A.dq(p))
s=A.cF(r.a,r.b,null,!1,q.c)
s.cl(new A.dr(r,s,p))
return p}}
A.ds.prototype={
$1(a){A.t(this.b).c.a(a);++this.a.a},
$S(){return A.t(this.b).h("~(1)")}}
A.dt.prototype={
$0(){this.b.at(this.a.a)},
$S:0}
A.dq.prototype={
$0(){var s,r,q,p,o
try{q=A.eu()
throw A.a(q)}catch(p){s=A.af(p)
r=A.ad(p)
q=s
o=r
if(o==null)o=A.f1(q)
this.a.a0(q,o)}},
$S:0}
A.dr.prototype={
$1(a){A.ik(this.b,this.c,A.t(this.a).c.a(a))},
$S(){return A.t(this.a).h("~(1)")}}
A.bx.prototype={}
A.cO.prototype={}
A.e2.prototype={
$0(){return this.a.at(this.b)},
$S:0}
A.bL.prototype={$ifr:1}
A.e7.prototype={
$0(){var s=t.K.a(A.a(this.a))
s.stack=this.b.i(0)
throw s},
$S:0}
A.cN.prototype={
cv(a){var s,r,q,p,o
t.M.a(a)
try{if(B.e===$.q){a.$0()
return}A.fH(null,null,this,a,t.H)}catch(q){s=A.af(q)
r=A.ad(q)
p=t.K.a(s)
o=t.l.a(r)
A.e6(p,o)}},
cw(a,b,c){var s,r,q,p,o
c.h("~(0)").a(a)
c.a(b)
try{if(B.e===$.q){a.$1(b)
return}A.fI(null,null,this,a,b,t.H,c)}catch(q){s=A.af(q)
r=A.ad(q)
p=t.K.a(s)
o=t.l.a(r)
A.e6(p,o)}},
b9(a){return new A.dV(this,t.M.a(a))},
c6(a,b){return new A.dW(this,b.h("~(0)").a(a),b)},
bq(a,b){b.h("0()").a(a)
if($.q===B.e)return a.$0()
return A.fH(null,null,this,a,b)},
aO(a,b,c,d){c.h("@<0>").A(d).h("1(2)").a(a)
d.a(b)
if($.q===B.e)return a.$1(b)
return A.fI(null,null,this,a,b,c,d)},
cu(a,b,c,d,e,f){d.h("@<0>").A(e).A(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.q===B.e)return a.$2(b,c)
return A.iF(null,null,this,a,b,c,d,e,f)},
bm(a,b,c,d){return b.h("@<0>").A(c).A(d).h("1(2,3)").a(a)}}
A.dV.prototype={
$0(){return this.a.cv(this.b)},
$S:0}
A.dW.prototype={
$1(a){var s=this.c
return this.a.cw(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.dU.prototype={
am(a){return A.ek(a)&1073741823},
an(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;++r){q=a[r].a
if(q==null?b==null:q===b)return r}return-1}}
A.bE.prototype={
u(a,b){if(!A.bP(this.z.$1(b)))return null
return this.bA(b)},
w(a,b,c){var s=this.$ti
this.bB(s.c.a(b),s.Q[1].a(c))},
am(a){return this.y.$1(this.$ti.c.a(a))&1073741823},
an(a,b){var s,r,q,p
if(a==null)return-1
s=a.length
for(r=this.$ti.c,q=this.x,p=0;p<s;++p)if(A.bP(q.$2(r.a(a[p].a),r.a(b))))return p
return-1}}
A.dT.prototype={
$1(a){return this.a.b(a)},
$S:18}
A.bi.prototype={}
A.bo.prototype={$in:1,$if:1,$iB:1}
A.m.prototype={
gq(a){return new A.az(a,this.gj(a),A.L(a).h("az<m.E>"))},
N(a,b){return this.u(a,b)},
gbi(a){return this.gj(a)===0},
aQ(a,b){var s,r,q,p,o=this
if(o.gbi(a)){s=J.fc(0,A.L(a).h("m.E"))
return s}r=o.u(a,0)
q=A.aP(o.gj(a),r,!0,A.L(a).h("m.E"))
for(p=1;p<o.gj(a);++p)B.b.w(q,p,o.u(a,p))
return q},
cA(a){return this.aQ(a,!0)},
bn(a,b){this.bO(a,A.L(a).h("C(m.E)").a(b),!1)},
bO(a,b,c){var s,r,q,p,o=this,n=A.L(a)
n.h("C(m.E)").a(b)
s=A.o([],n.h("y<m.E>"))
r=o.gj(a)
for(q=0;q<r;++q){p=o.u(a,q)
if(J.au(b.$1(p),!1))B.b.C(s,p)
if(r!==o.gj(a))throw A.a(A.aI(a))}if(s.length!==o.gj(a)){o.a6(a,0,s.length,s)
o.sj(a,s.length)}},
a6(a,b,c,d){var s,r,q,p=A.L(a)
p.h("f<m.E>").a(d)
A.hN(b,c,this.gj(a))
s=c-b
if(s===0)return
A.aV(0,"skipCount")
r=p.h("B<m.E>").b(d)?d:A.hQ(d,0,null,A.U(d).c).aQ(0,!1)
if(s>r.length)throw A.a(A.cq("Too few elements"))
if(0<b)for(q=s-1;q>=0;--q){if(!(q<r.length))return A.h(r,q)
this.w(a,b+q,r[q])}else for(q=0;q<s;++q){if(!(q<r.length))return A.h(r,q)
this.w(a,b+q,r[q])}},
i(a){return A.fa(a,"[","]")}}
A.bp.prototype={}
A.de.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=r.a+=A.v(a)
r.a=s+": "
r.a+=A.v(b)},
$S:19}
A.ak.prototype={
gj(a){var s=this.gbj()
return s.gj(s)},
i(a){return A.ey(this)},
$iaj:1}
A.bF.prototype={}
A.c0.prototype={
B(a,b){if(b==null)return!1
return b instanceof A.c0&&this.a===b.a&&!0},
gk(a){var s=this.a
return(s^B.a.aC(s,30))&1073741823},
i(a){var s=this,r=A.hr(A.hK(s)),q=A.c1(A.hI(s)),p=A.c1(A.hE(s)),o=A.c1(A.hF(s)),n=A.c1(A.hH(s)),m=A.c1(A.hJ(s)),l=A.hs(A.hG(s)),k=r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l
return k}}
A.dC.prototype={}
A.p.prototype={
gaq(){return A.ad(this.$thrownJsError)}}
A.b5.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.c4(s)
return"Assertion failed"}}
A.ao.prototype={}
A.ck.prototype={
i(a){return"Throw of null."}}
A.a0.prototype={
gaw(){return"Invalid argument"+(!this.a?"(s)":"")},
gav(){return""},
i(a){var s,r,q=this,p=q.c,o=p==null?"":" ("+p+")",n=q.d,m=n==null?"":": "+n,l=q.gaw()+o+m
if(!q.a)return l
s=q.gav()
r=A.c4(q.b)
return l+s+": "+r}}
A.aU.prototype={
gaw(){return"RangeError"},
gav(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.v(q):""
else if(q==null)s=": Not greater than or equal to "+A.v(r)
else if(q>r)s=": Not in inclusive range "+A.v(r)+".."+A.v(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.v(r)
return s}}
A.ca.prototype={
gaw(){return"RangeError"},
gav(){if(A.cS(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.cw.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.cu.prototype={
i(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.bv.prototype={
i(a){return"Bad state: "+this.a}}
A.bZ.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.c4(s)+"."}}
A.bu.prototype={
i(a){return"Stack Overflow"},
gaq(){return null},
$ip:1}
A.c_.prototype={
i(a){var s="Reading static variable '"+this.a+"' during its initialization"
return s}}
A.dF.prototype={
i(a){return"Exception: "+this.a}}
A.f.prototype={
cp(a,b){var s,r
A.t(this).h("f.E(f.E,f.E)").a(b)
s=this.gq(this)
if(!s.m())throw A.a(A.eu())
r=s.gn()
for(;s.m();)r=b.$2(r,s.gn())
return r},
gj(a){var s,r=this.gq(this)
for(s=0;r.m();)++s
return s},
N(a,b){var s,r,q
A.aV(b,"index")
for(s=this.gq(this),r=0;s.m();){q=s.gn()
if(b===r)return q;++r}throw A.a(A.cb(b,this,"index",null,r))},
i(a){return A.hx(this,"(",")")}}
A.G.prototype={}
A.z.prototype={
gk(a){return A.j.prototype.gk.call(this,this)},
i(a){return"null"}}
A.j.prototype={$ij:1,
B(a,b){return this===b},
gk(a){return A.aT(this)},
i(a){return"Instance of '"+A.dm(this)+"'"},
toString(){return this.i(this)}}
A.cP.prototype={
i(a){return""},
$ian:1}
A.cs.prototype={
gj(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.d.prototype={}
A.bS.prototype={
i(a){var s=String(a)
s.toString
return s}}
A.bU.prototype={
i(a){var s=String(a)
s.toString
return s}}
A.av.prototype={
sE(a,b){a.height=b},
sv(a,b){a.width=b},
$iav:1}
A.b8.prototype={
sak(a,b){a.fillStyle=b},
sal(a,b){a.imageSmoothingEnabled=!1},
be(a,b,c,d,e){if(e!=null)a.fillText(b,c,d,e)
else a.fillText(b,c,d)},
ce(a,b,c,d){return this.be(a,b,c,d,null)},
$ib8:1}
A.X.prototype={
gj(a){return a.length}}
A.aK.prototype={
ar(a,b){var s=$.fV(),r=s[b]
if(typeof r=="string")return r
r=this.c4(a,b)
s[b]=r
return r},
c4(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.fX()+b
r=s in a
r.toString
if(r)return s
return b},
aA(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.d3.prototype={}
A.d4.prototype={
i(a){var s=String(a)
s.toString
return s}}
A.cC.prototype={
gbi(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
u(a,b){var s=this.b
if(!(b>=0&&b<s.length))return A.h(s,b)
return t.h.a(s[b])},
w(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.h(s,b)
this.a.replaceChild(c,s[b]).toString},
sj(a,b){throw A.a(A.H("Cannot resize element lists"))},
gq(a){var s=this.cA(this)
return new J.Q(s,s.length,A.U(s).h("Q<1>"))},
bn(a,b){this.bR(0,t.L.a(b),!1)},
bR(a,b,c){var s,r
t.L.a(b)
s=J.eZ(this.a)
r=A.t(s)
r.h("C(m.E)").a(b)
for(s=s.gq(s),r=new A.aD(s,b,r.h("aD<m.E>"));r.m();)J.f0(s.gn())},
a6(a,b,c,d){t.B.a(d)
throw A.a(A.eA(null))}}
A.k.prototype={
gbb(a){var s=a.children
s.toString
return new A.cC(a,s)},
i(a){var s=a.localName
s.toString
return s},
$ik:1}
A.b.prototype={$ib:1}
A.A.prototype={
bG(a,b,c,d){return a.addEventListener(b,A.b2(t.o.a(c),1),!1)},
bZ(a,b,c,d){return a.removeEventListener(b,A.b2(t.o.a(c),1),!1)},
$iA:1}
A.c7.prototype={
gj(a){return a.length}}
A.ai.prototype={
gj(a){var s=a.length
s.toString
return s},
u(a,b){var s=b>>>0!==b||b>=a.length
s.toString
if(s)throw A.a(A.cb(b,a,null,null,null))
s=a[b]
s.toString
return s},
w(a,b,c){t.G.a(c)
throw A.a(A.H("Cannot assign element of immutable List."))},
sj(a,b){throw A.a(A.H("Cannot resize immutable List."))},
N(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
$in:1,
$ice:1,
$if:1,
$iB:1,
$iai:1}
A.aM.prototype={
sbv(a,b){a.src=b},
$iaM:1}
A.Y.prototype={$iY:1}
A.cB.prototype={
w(a,b,c){var s,r
t.G.a(c)
s=this.a
r=s.childNodes
if(!(b>=0&&b<r.length))return A.h(r,b)
s.replaceChild(c,r[b]).toString},
gq(a){var s=this.a.childNodes
return new A.aw(s,s.length,A.L(s).h("aw<R.E>"))},
a6(a,b,c,d){t.D.a(d)
throw A.a(A.H("Cannot setRange on Node list"))},
gj(a){return this.a.childNodes.length},
sj(a,b){throw A.a(A.H("Cannot set length on immutable List."))},
u(a,b){var s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.h(s,b)
return s[b]}}
A.e.prototype={
cq(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
ct(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.hg(s,b,a)}catch(q){}return a},
i(a){var s=a.nodeValue
return s==null?this.by(a):s},
c_(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$ie:1}
A.br.prototype={
gj(a){var s=a.length
s.toString
return s},
u(a,b){var s=b>>>0!==b||b>=a.length
s.toString
if(s)throw A.a(A.cb(b,a,null,null,null))
s=a[b]
s.toString
return s},
w(a,b,c){t.G.a(c)
throw A.a(A.H("Cannot assign element of immutable List."))},
sj(a,b){throw A.a(A.H("Cannot resize immutable List."))},
N(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
$in:1,
$ice:1,
$if:1,
$iB:1}
A.cp.prototype={
gj(a){return a.length}}
A.K.prototype={}
A.aW.prototype={
bp(a,b){var s
t.f.a(b)
this.bN(a)
s=A.eQ(b,t.p)
s.toString
return this.c0(a,s)},
c0(a,b){var s=a.requestAnimationFrame(A.b2(t.f.a(b),1))
s.toString
return s},
bN(a){var s=!!(a.requestAnimationFrame&&a.cancelAnimationFrame)
s.toString
if(s)return;(function(b){var r=["ms","moz","webkit","o"]
for(var q=0;q<r.length&&!b.requestAnimationFrame;++q){b.requestAnimationFrame=b[r[q]+"RequestAnimationFrame"]
b.cancelAnimationFrame=b[r[q]+"CancelAnimationFrame"]||b[r[q]+"CancelRequestAnimationFrame"]}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)}}
A.es.prototype={}
A.bC.prototype={}
A.aE.prototype={}
A.bD.prototype={
c7(){var s=this
if(s.b==null)return $.em()
s.b7()
s.b=null
s.sb0(null)
return $.em()},
cl(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.a(A.cq("Subscription has been canceled."))
r.b7()
s=A.eQ(new A.dE(a),t.A)
r.sb0(s)
r.b5()},
b5(){var s,r=this.d,q=r!=null
if(q&&!0){s=this.b
s.toString
t.o.a(r)
if(q)J.he(s,this.c,r,!1)}},
b7(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.hf(s,this.c,t.o.a(r),!1)}},
sb0(a){this.d=t.o.a(a)}}
A.dD.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:5}
A.dE.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:5}
A.R.prototype={
gq(a){return new A.aw(a,this.gj(a),A.L(a).h("aw<R.E>"))},
a6(a,b,c,d){A.L(a).h("f<R.E>").a(d)
throw A.a(A.H("Cannot setRange on immutable List."))}}
A.aw.prototype={
m(){var s=this,r=s.c+1,q=s.b
if(r<q){s.sb_(J.hd(s.a,r))
s.c=r
return!0}s.sb_(null)
s.c=q
return!1},
gn(){return this.$ti.c.a(this.d)},
sb_(a){this.d=this.$ti.h("1?").a(a)},
$iG:1}
A.cD.prototype={}
A.cH.prototype={}
A.cI.prototype={}
A.cJ.prototype={}
A.cK.prototype={}
A.c5.prototype={
ga1(){var s=this.b,r=A.t(s)
return new A.a5(new A.bB(s,r.h("C(m.E)").a(new A.d5()),r.h("bB<m.E>")),r.h("k(m.E)").a(new A.d6()),r.h("a5<m.E,k>"))},
w(a,b,c){var s
t.h.a(c)
s=this.ga1()
J.hh(s.b.$1(J.cX(s.a,b)),c)},
sj(a,b){var s=J.ag(this.ga1().a)
if(b>=s)return
else if(b<0)throw A.a(A.bV("Invalid list length",null))
this.cr(0,b,s)},
a6(a,b,c,d){t.B.a(d)
throw A.a(A.H("Cannot setRange on filtered list"))},
cr(a,b,c){var s=this.ga1()
s=A.hP(s,b,s.$ti.h("f.E"))
B.b.a3(A.fe(A.hS(s,c-b,A.t(s).h("f.E")),!0,t.z),new A.d7())},
gj(a){return J.ag(this.ga1().a)},
u(a,b){var s=this.ga1()
return s.b.$1(J.cX(s.a,b))},
gq(a){var s=A.fe(this.ga1(),!1,t.h)
return new J.Q(s,s.length,A.U(s).h("Q<1>"))}}
A.d5.prototype={
$1(a){return t.h.b(t.G.a(a))},
$S:20}
A.d6.prototype={
$1(a){return t.h.a(t.G.a(a))},
$S:21}
A.d7.prototype={
$1(a){return J.f0(a)},
$S:1}
A.cM.prototype={
bE(a){var s,r,q,p,o,n,m,l=this,k=4294967296,j=a<0?-1:0
do{s=a>>>0
a=B.a.l(a-s,k)
r=a>>>0
a=B.a.l(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.a.l(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.a.l(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.a.l(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.a.l(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.a.l(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==j)
if(o===0&&n===0)l.a=23063
l.R()
l.R()
l.R()
l.R()},
R(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.a.l(o-n+(q-p)+(m-r),4294967296)>>>0},
J(a){var s,r,q,p=this
if(a<=0||a>4294967296)throw A.a(A.hM("max must be in range 0 < max \u2264 2^32, was "+a))
s=a-1
if((a&s)>>>0===0){p.R()
return(p.a&s)>>>0}do{p.R()
r=p.a
q=r%a}while(r-q+a>=4294967296)
return q},
bk(){var s,r=this
r.R()
s=r.a
r.R()
return((s&67108863)*134217728+(r.a&134217727))/9007199254740992},
$ihL:1}
A.c.prototype={
gbb(a){return new A.c5(new A.cB(a))}}
A.a1.prototype={
gv(a){return this.a.a},
gE(a){return this.a.b},
gq(a){var s=this.b
return new J.Q(s,s.length,A.U(s).h("Q<1>"))},
aR(a,b){var s,r
this.V(a,b)
s=this.b
r=b*this.a.a+a
if(!(r>=0&&r<s.length))return A.h(s,r)
return s[r]},
G(a,b,c){var s,r,q,p=this
p.$ti.c.a(c)
p.V(a,b)
s=p.b
r=b*p.a.a+a
if(!(r>=0&&r<s.length))return A.h(s,r)
q=s[r]
B.b.w(s,r,c)
return q},
V(a,b){var s=this,r=null
if(a<0||a>=s.a.a)throw A.a(A.S(a,0,s.gv(s)-1,r,r))
if(b<0||b>=s.a.b)throw A.a(A.S(b,0,s.gE(s)-1,r,r))}}
A.aL.prototype={}
A.da.prototype={}
A.D.prototype={
gF(a){var s=this.a.b
return Math.min(s,s+this.b.b)},
gL(a){var s=this.a.a
return Math.max(s,s+this.b.a)},
gK(a){var s=this.a.b
return Math.max(s,s+this.b.b)},
gI(a){var s=this.a.a
return Math.min(s,s+this.b.a)},
bc(a,b){var s=this,r=s.b
if(r.a===0||r.b===0)throw A.a(A.cq("Cannot clamp a vector inside a Rect with width or height of 0"))
return new A.i(B.c.T(B.a.aF(b.a,s.gI(s),s.gL(s)-1)),B.c.T(B.a.aF(b.b,s.gF(s),s.gK(s)-1)))},
ca(a,b){var s=this.cc(b)
return s},
cc(a){var s=this
if(a.gF(a)>=s.gF(s)&&a.gL(a)<=s.gL(s)&&a.gK(a)<=s.gK(s)&&a.gI(a)>=s.gI(s))return!0
else return!1},
a_(a){var s,r,q,p,o,n,m=this
if(a===0)return m
s=m.b
r=a*2
if(s.a<r){q=m.a.a
p=q}else{p=m.gI(m)+a
q=m.gL(m)-a}if(s.b<r){o=m.a.b
n=o}else{n=m.gF(m)+a
o=m.gK(m)-a}return new A.D(new A.i(p,n),new A.i(q-p,o-n))},
ba(a,b){var s=this.a,r=this.b
return new A.D(new A.i(s.a+B.a.l(r.a-a,2),s.b+B.a.l(r.b-b,2)),new A.i(a,b))},
bs(){var s,r,q,p,o,n,m=this,l=A.o([],t.r)
for(s=m.gF(m),r=m.a,q=r.b,p=m.b,q=Math.max(q,q+p.b),r=r.a,p=r+p.a;s<q;++s)for(o=Math.min(r,p),n=Math.max(r,p);o<n;++o)B.b.C(l,new A.i(o,s))
return l},
B(a,b){var s=this
if(b==null)return!1
if(!(b instanceof A.D))return!1
return s.gF(s)===b.gF(b)&&s.gL(s)===b.gL(b)&&s.gK(s)===b.gK(b)&&s.gI(s)===b.gI(b)},
gk(a){var s=this
return B.a.gk(s.gF(s))^B.a.gk(s.gL(s))^B.a.gk(s.gK(s))^B.a.gk(s.gI(s))},
i(a){var s=this
return"rect("+s.gF(s)+", "+s.gL(s)+", "+s.gK(s)+", "+s.gI(s)+")"}}
A.dn.prototype={}
A.cx.prototype={
gj(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
U(a,b){return new A.i(this.a+b.a,this.b+b.b)},
B(a,b){if(b==null)return!1
if(!(b instanceof A.cx))return!1
return this.a===b.a&&this.b===b.b},
gk(a){var s,r=this.a,q=r>=0?2*r:-2*r-1
r=this.b
s=r>=0?2*r:-2*r-1
r=q+s
return B.a.l(r*(r+1),2)+s},
i(a){return"vec2("+this.a+", "+this.b+")"}}
A.i.prototype={}
A.d0.prototype={
i(a){return"CanvasRendererType."+this.b}}
A.ah.prototype={}
A.bW.prototype={}
A.d1.prototype={
$1(a){return t.E.b(t.h.a(a))},
$S:22}
A.W.prototype={
gk(a){var s=this.b,r=this.c
return B.a.gk(this.a)^s.gk(s)^r.gk(r)},
B(a,b){if(b==null)return!1
if(b instanceof A.W)return this.a===b.a&&this.b.B(0,b.b)&&this.c.B(0,b.c)
else return!1}}
A.l.prototype={
gk(a){return B.a.gk(this.a)^B.a.gk(this.b)^B.a.gk(this.c)},
B(a,b){if(b==null)return!1
if(b instanceof A.l)return this.a===b.a&&this.b===b.b&&this.c===b.c
return!1}}
A.c6.prototype={
gaD(){return this.d.b},
gaE(){return this.d.a},
ga4(a){return A.et(null,t.H)},
bo(a,b,c){var s,r,q,p,o=this.b
o.textBaseline="top"
o.font=this.c
s=c.c
B.i.sak(o,"rgb("+s.a+", "+s.b+", "+s.c+")")
s=this.d
r=s.a
q=a*r
s=b*s.b
B.i.ce(o,A.ez(9608),q,s)
p=c.b
B.i.sak(o,"rgb("+p.a+", "+p.b+", "+p.c+")")
B.i.be(o,A.ez(c.a),q,s,r)}}
A.c9.prototype={
gaE(){return this.c.a},
gaD(){return this.c.b},
ga4(a){var s=0,r=A.eO(t.H),q,p=this
var $async$ga4=A.eP(function(b,c){if(b===1)return A.eH(c,r)
while(true)switch(s){case 0:if(p.y){q=A.et(null,t.H)
s=1
break}s=3
return A.eG(p.x,$async$ga4)
case 3:p.y=!0
s=1
break
case 1:return A.eI(q,r)}})
return A.eJ($async$ga4,r)},
bD(a,b,c,d,e){var s=this,r=s.f,q=t.bt,p=new A.aE(r,"load",!1,q)
s.sbQ(p.gbf(p))
q=new A.aE(r,"error",!1,q)
q.gbf(q).br(new A.d9(s),t.ck)
B.al.sbv(r,a)
r=s.c
A.cV("CHAR width "+r.a+", height "+r.b)},
bo(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(!h.y)return
s=h.b
r=c.c
B.i.sak(s,"rgb("+r.a+", "+r.b+", "+r.c+")")
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
k=h.d.u(0,l)
l=k==null?l:k
j=B.a.bt(l,32)
if(l>h.e)return
i=h.bP(c.b)
B.i.sal(s,!1)
s.drawImage(i,j*q,(l/32|0)*r,q,r,o,n,m,p)},
bP(a){var s,r,q,p,o=this.r,n=o.u(0,a)
if(n!=null)return n
s=this.f
r=s.width
q=A.f6(s.height,r)
r=q.style
r.toString
B.m.aA(r,B.m.ar(r,"image-rendering"),"pixelated","")
p=q.getContext("2d")
p.translate(0.5,0.5)
B.i.sal(p,!1)
p.drawImage(s,0,0)
p.globalCompositeOperation="source-atop"
B.i.sak(p,"rgb("+a.a+", "+a.b+", "+a.c+")")
s=q.width
s.toString
r=q.height
r.toString
p.fillRect(0,0,s,r)
o.w(0,a,q)
return q},
sbQ(a){this.x=t.a_.a(a)}}
A.d9.prototype={
$1(a){t.A.a(a)
return A.at(A.cq("Failed to load glyphs from "+A.v(this.a.f.src)))},
$S:23}
A.cg.prototype={
a2(a,b){this.a.w(0,new A.aY(b,!1,!1,!1),this.$ti.c.a(a))}}
A.aY.prototype={
B(a,b){var s=this
if(b==null)return!1
if(b instanceof A.aY)return s.a===b.a&&s.b===b.b&&s.d===b.d&&s.e===b.e
return!1},
gk(a){var s=this,r=519018,q=218159,p=B.k.gk(s.a),o=s.b?r:q,n=s.d?r:q,m=s.e?r:q
return(p^o^n^m)>>>0},
i(a){var s=this,r="KEY("+s.a
if(s.b)r+=" shift"
if(s.d)r+=" alt/opt"
return(s.e?r+" win/cmd":r)+")"}}
A.am.prototype={}
A.a9.prototype={
ai(a,b,c,d,e){var s,r,q
if(d==null)d=B.d
if(e==null)e=B.j
for(s=c.length,r=0;r<s;++r){q=a+r
if(q>=this.gv(this))break
this.D(q,b,A.O(B.k.aX(c,r),d,e))}},
a9(a,b,c,d){return this.ai(a,b,c,d,null)},
ah(a,b,c){return this.ai(a,b,c,null,null)},
aI(a,b,c,d){var s=this,r=b.length
s.ai(r>=s.gv(s)?0:B.a.l(s.gv(s)-r,2),a,b,c,d)},
aj(a,b,c){return this.aI(a,b,c,null)},
cd(a,b,c,d,e){var s,r,q,p,o
this.H(b,c)
s=b+d
r=c+e
this.H(s-1,r-1)
q=A.O(32,B.d,B.j)
for(p=c;p<r;++p)for(o=b;o<s;++o)this.D(o,p,q)},
S(a,b,c,d){this.H(a,b)
this.H(a+c-1,b+d-1)
return new A.b9(new A.i(a,b),new A.i(c,d),this)},
a8(a){var s=a.a,r=a.b
return this.S(s.a,s.b,r.a,r.b)},
H(a,b){var s=this,r=null
if(a<0||a>=s.gv(s))throw A.a(A.S(a,0,s.gv(s)-1,r,r))
if(b<0||b>=s.gE(s))throw A.a(A.S(b,0,s.gE(s)-1,r,r))}}
A.b9.prototype={
gv(a){return this.d.a},
gE(a){return this.d.b},
D(a,b,c){var s
t.x.a(c)
this.H(a,b)
s=this.c
this.e.D(s.a+a,s.b+b,c)},
S(a,b,c,d){var s=this
s.H(a,b)
s.H(a+c-1,b+d-1)
return new A.b9(s.c.U(0,new A.i(a,b)),new A.i(c,d),s.e)}}
A.al.prototype={
gv(a){return this.c.a.a.a},
gE(a){return this.c.a.a.b},
D(a,b,c){var s,r
t.x.a(c)
this.H(a,b)
s=this.c
r=s.b
if(!J.au(s.a.aR(a,b),c))r.G(a,b,c)
else r.G(a,b,null)}}
A.du.prototype={
bu(a,b,c){var s=this.b
if(!J.au(this.a.aR(a,b),c))s.G(a,b,c)
else s.G(a,b,null)},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=this.a,r=s.a,q=r.b,r=r.a,p=this.b,o=p.b,n=p.a.a,m=o.length,l=0;l<q;++l)for(k=l*n,j=0;j<r;++j){p.V(j,l)
i=k+j
if(!(i>=0&&i<m))return A.h(o,i)
h=o[i]
if(h==null)continue
a.bo(j,l,h)
s.G(j,l,h)
p.G(j,l,null)}}}
A.b7.prototype={
t(a){this.b.t(a)}}
A.aR.prototype={
gW(){return!0},
gX(){return!0},
t(a){var s,r,q,p=this.b
if(!new A.D(new A.i(0,0),new A.i(a.gv(a),a.gE(a))).ca(0,p.b)){s=new A.D(new A.i(0,0),new A.i(a.gv(a),a.gE(a)))
p.b=s
p.c=s.a_(p.a)}s=a.gv(a)
r=a.gE(a)
q=p.b.b
p.t(a.a8(new A.D(new A.i(0,0),new A.i(s,r)).ba(q.a,q.b)))},
aL(a,b,c,d,e,f,g){var s,r=this
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
scn(a){this.d=t.M.a(a)},
sck(a){this.e=t.M.a(a)},
sco(a){this.f=t.M.a(a)},
scm(a){this.r=t.M.a(a)}}
A.df.prototype={
$1(a){var s=this
a.aj(0,s.a,s.b)
a.aj(2,s.c,s.d)},
$S:6}
A.dg.prototype={
$0(){this.a.gp().ac(this.b)},
$S:0}
A.dh.prototype={
$0(){this.a.gp().ac(this.b)},
$S:0}
A.di.prototype={
$0(){this.a.gp().ac(this.b)},
$S:0}
A.dj.prototype={
$0(){this.a.gp().ac(this.b)},
$S:0}
A.a6.prototype={
t(a){var s,r,q,p=this,o=p.d,n=A.O(32,B.d,o==null?B.j:o)
for(o=p.b.bs(),s=o.length,r=0;r<o.length;o.length===s||(0,A.cW)(o),++r){q=o[r]
a.D(q.a,q.b,n)}p.aM(a.a8(p.c))},
aM(a){var s=this.e
if(s!=null)s.$1(a)},
sbd(a){this.e=t.a0.a(a)}}
A.a7.prototype={
i(a){return"PanelBorder."+this.b}}
A.Z.prototype={
i(a){return"_BorderChars."+this.b}}
A.aG.prototype={
t(a){var s,r,q,p,o,n,m,l,k=this
k.bC(a)
s=k.r
if(s==null)s=B.d
r=k.d
if(r==null)r=B.j
for(q=k.b,p=q.gI(q)+1;q=k.b,o=q.a,n=o.a,m=q.b,p<Math.max(n,n+m.a)-1;++p){q=o.b
a.D(p,Math.min(q,q+m.b),k.P(B.ax,s,r))
m=k.b
q=m.a.b
a.D(p,Math.max(q,q+m.b.b)-1,k.P(B.ay,s,r))}for(l=q.gF(q)+1;q=k.b,o=q.a,n=o.b,m=q.b,l<Math.max(n,n+m.b)-1;++l){q=o.a
a.D(Math.min(q,q+m.a),l,k.P(B.az,s,r))
m=k.b
q=m.a.a
a.D(Math.max(q,q+m.b.a)-1,l,k.P(B.aA,s,r))}o=q.gI(q)
q.gF(q)
q=k.b
q.gI(q)
a.D(o,q.gF(q),k.P(B.aB,s,r))
q=k.b
o=q.gL(q)
q.gF(q)
q=k.b
q.gL(q)
a.D(o-1,q.gF(q),k.P(B.aC,s,r))
q=k.b
o=q.gL(q)
q.gK(q)
q=k.b
q.gL(q)
a.D(o-1,q.gK(q)-1,k.P(B.aE,s,r))
q=k.b
o=q.gI(q)
q.gK(q)
q=k.b
q.gI(q)
a.D(o,q.gK(q)-1,k.P(B.aD,s,r))},
P(a,b,c){var s
switch(this.f.a){case 0:return A.O(32,b,c)
case 1:s=a.a
if(!(s<8))return A.h(B.U,s)
return A.O(B.U[s],b,c)
case 2:s=a.a
if(!(s<8))return A.h(B.T,s)
return A.O(B.T[s],b,c)
case 3:s=a.a
if(!(s<8))return A.h(B.W,s)
return A.O(B.W[s],b,c)
case 4:s=a.a
if(!(s<8))return A.h(B.S,s)
return A.O(B.S[s],b,c)}}}
A.c8.prototype={}
A.aC.prototype={
gaN(){return new A.D(B.C,this.d.c.a.a)},
scg(a){var s,r,q,p,o,n=this
if(n.r)return
n.r=!0
s=document
r=s.body
r.toString
q=t.ae
p=q.h("~(1)?")
o=p.a(n.gbU())
t.Z.a(null)
q=q.c
n.sbS(A.cF(r,"keydown",o,!1,q))
s=s.body
s.toString
n.sbT(A.cF(s,"keyup",p.a(n.gbW()),!1,q))},
scz(a){var s,r,q,p,o=this
t.aT.a(a)
s=a.c.a.a
r=o.d.c.a.a.B(0,s)
o.sc5(a)
if(!r)for(r=o.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.cW)(r),++p)r[p].aa(0,s)
o.e=!0},
Z(a){var s=this
s.$ti.h("r<1>").a(a)
A.t(a).h("aC<r.T>").a(s)
a.sb6(s)
a.aa(0,s.d.c.a.a)
B.b.C(s.a,a)
s.e=!0},
ac(a){var s,r=this.a,q=r.length
if(q===0)return
if(0>=q)return A.h(r,-1)
s=r.pop()
if(s.a!=null)s.sb6(null)
if(r.length!==0)B.b.gaK(r).bl(s,a)
this.e=!0},
ab(){return this.ac(null)},
ao(a){var s,r
for(s=this.a,r=0;r<s.length;++r)s[r].ao(a)},
cs(){var s,r,q=this,p=q.e
if(!p)return
s=q.d
s.cd(0,0,0,s.gv(s),s.gE(s))
p=q.a
r=p.length-1
for(;r>=0;){if(!(r<p.length))return A.h(p,r)
if(!p[r].gX())break;--r}if(r<0)r=0
for(;r<p.length;++r)p[r].t(s)
s.c.t(s.d)
q.e=!1},
bY(a){var s,r=this
A.ie(a)
s=r.x
r.x=a
r.ao((a-s)/1000)
r.cs()
if(r.f){s=window
s.toString
B.a1.bp(s,r.gb1())}},
bV(a){var s,r,q,p,o,n,m,l
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
o=this.y.a.u(0,new A.aY(s,r,q,p))
s=o!=null
if(s)a.preventDefault()
r=this.a
if(r.length===0)return
n=B.b.gaK(r)
n.gW()
if(s&&n.Y(0,o))return
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
if(n.aL(0,s,r,m,p,l,q))a.preventDefault()},
bX(a){var s
t.v.a(a)
s=this.a
if(s.length===0)return
if(a.code==null)return
B.b.gaK(s)
a.key.toString
a.code.toString
a.shiftKey.toString
a.ctrlKey.toString
a.altKey.toString
a.metaKey.toString},
sbS(a){this.b=t.u.a(a)},
sbT(a){this.c=t.u.a(a)},
sc5(a){this.d=t.aZ.a(a)}}
A.r.prototype={
gp(){var s=this.a
if(s!=null)return s
throw A.a(A.cq("Attempted to access Layer.ui while Layer is unbound"))},
ao(a){},
bl(a,b){A.t(this).h("r<r.T>").a(a)},
aa(a,b){},
Y(a,b){A.t(this).h("r.T").a(b)
return!1},
aL(a,b,c,d,e,f,g){return!1},
sb6(a){this.a=A.t(this).h("aC<r.T>?").a(a)}}
A.cL.prototype={}
A.bT.prototype={
gW(){return!0},
gX(){return!1},
ao(a){var s,r,q,p,o,n,m,l,k,j=this
for(s=j.b,r=s.length,q=t.V,p=0;p<s.length;s.length===r||(0,A.cW)(s),++p){o=s[p]
n=o.d=o.d-o.f*a
m=o.a
o.f=((m-n)/m*4+1)*o.b
B.c.T(o.c)
if(B.c.T(n)<0){n=j.gp().gaN()
l=j.c
if(!(l>=0&&l<4))return A.h(B.r,l)
l=q.a(B.r[l])
k=$.b4().a
o.c=k.J(n.b.a)
o.d=m
k=k.J(3)
if(!(k>=0&&k<3))return A.h(l,k)
o.e=l[k]}}if(j.a!=null)j.gp().e=!0},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
for(s=this.b,r=s.length,q=a.c,p=q.b,o=0;o<s.length;s.length===r||(0,A.cW)(s),++o){n=s[o]
m=B.c.T(n.c)
l=B.c.T(n.d)
k=A.O("\u25b2",n.e,f)
a.H(m,l)
j=q.a
j.V(m,l)
i=j.b
j=l*j.a.a+m
if(!(j>=0&&j<i.length))return A.h(i,j)
if(!J.au(i[j],k))p.G(m,l,k)
else p.G(m,l,f)}h=A.O(9608,B.O,f)
for(s=q.a,r=s.a,q=r.a,r=r.b,m=r-3,g=0;g<q;++g){a.H(g,m)
s.V(g,m)
l=s.b
k=m*q+g
if(!(k>=0&&k<l.length))return A.h(l,k)
if(!J.au(l[k],h))p.G(g,m,h)
else p.G(g,m,f)}a.aj(r-1,"[\u2190\u2192] Change colors.  Press [esc] to go back.",B.h)},
Y(a,b){var s
switch(b){case B.l:this.gp().ab()
s=!0
break
case B.u:this.b8(1)
s=!0
break
case B.w:this.b8(-1)
s=!0
break
default:s=!1}return s},
aa(a,b){var s,r,q,p,o,n,m,l,k,j=this.b
B.b.sj(j,0)
s=b.a
r=b.b
q=B.c.a5(Math.abs(s)*Math.abs(r)*0.5)
for(r-=3,p=t.V,o=0;o<q;++o){n=$.b4().a
m=n.J(s)
l=this.c
if(!(l>=0&&l<4))return A.h(B.r,l)
l=p.a(B.r[l])
k=n.J(3)
if(!(k>=0&&k<3))return A.h(l,k)
k=l[k]
B.b.C(j,new A.cL(r,n.bk()+2,m,n.bk()*r,k))}},
b8(a){var s=this.c+=a
if(s<0)this.c=3
else if(s>=4)this.c=0}}
A.ci.prototype={
gW(){return!0},
gX(){return!1},
t(a){var s=a.c,r=s.a.a,q=r.a
a.S(B.a.l(q-45,2),10,45,1).ah(0,0,"There doesn't seem to be anything here yet...")
a.S(B.a.l(q-26,2),r.b-1,26,1).a9(0,0,"[\u2191\u2193\u2190\u2192]: Move   [esc]: Quit",B.h)
r=this.d
q=r.a
r=r.b
a.H(q,r)
s.bu(q,r,this.b)},
Y(a,b){var s,r,q=this
switch(b){case B.t:q.d=q.d.U(0,B.ai)
s=!0
r=!0
break
case B.u:q.d=q.d.U(0,B.aj)
s=!0
r=!0
break
case B.v:q.d=q.d.U(0,B.ah)
s=!0
r=!0
break
case B.w:q.d=q.d.U(0,B.ak)
s=!0
r=!0
break
case B.l:q.gp().ab()
s=!1
r=!0
break
default:s=!1
r=!1}if(s){q.d=q.gp().gaN().bc(0,q.d)
if(q.a!=null)q.gp().e=!0}return r},
aa(a,b){var s=this
if(s.c){s.d=new A.i(B.a.l(b.a,2),B.a.l(b.b,2))
s.c=!1
return}s.d=s.gp().gaN().bc(0,s.d)}}
A.cj.prototype={
gW(){return!0},
gX(){return!1},
t(a){var s,r,q,p,o,n,m,l,k,j,i={}
for(s=t.x,r=a.c,q=r.b,p=0;p<this.b.a.b;++p)for(o=0;n=this.b,m=n.a.a,o<m;++o){n.V(o,p)
n=n.b
m=p*m+o
if(!(m>=0&&m<n.length))return A.h(n,m)
m=s.a(n[m])
a.H(o,p)
n=r.a
n.V(o,p)
l=n.b
n=p*n.a.a+o
if(!(n>=0&&n<l.length))return A.h(l,n)
if(!J.au(l[n],m))q.G(o,p,m)
else q.G(o,p,null)}i.a=null
s=this.c
k=new A.D(new A.i(0,0),new A.i(Math.max((s==null?i.a="No results yet. Choose a modal to get started.":i.a="Your modal result was "+s+"!").length,59)+4,7))
j=new A.a6(2,k,k.a_(2),B.M)
j.sbd(new A.dk(i,j))
s=a.gv(a)
q=a.gE(a)
n=j.b.b
j.t(a.a8(new A.D(new A.i(0,0),new A.i(s,q)).ba(n.a,n.b)))
a.aj(r.a.a.b-1,"[1] OK modal. [2] OK/Cancel modal. [3] Yes/No modal.   Press [esc] to go back.",B.h)},
bl(a,b){if(!(t.cA.a(a) instanceof A.aR)||b==null||!1)return
this.c=b},
aL(a,b,c,d,e,f,g){var s,r,q,p,o
switch(c){case"Digit1":s=$.b4()
r=t.j.a($.el())
q=r.length
s=s.a
q=s.J(q)
if(!(q>=0&&q<r.length))return A.h(r,q)
q=r[q]
t.t.a(B.f)
r=B.f.length
s=s.J(r)
if(!(s>=0&&s<r))return A.h(B.f,s)
p=A.fh("This is a simple OK modal.",B.h,B.f[s],q,null,"OK",2,!1,t.Y)
o=!0
break
case"Digit2":s=$.b4()
r=t.j.a($.el())
q=r.length
s=s.a
q=s.J(q)
if(!(q>=0&&q<r.length))return A.h(r,q)
q=r[q]
t.t.a(B.f)
r=B.f.length
s=s.J(r)
if(!(s>=0&&s<r))return A.h(B.f,s)
p=A.fh("This is a simple OK/Cancel modal.",B.h,B.f[s],q,"Cancel","OK",2,!0,t.Y)
o=!0
break
case"Digit3":s=$.b4()
r=t.j.a($.el())
q=r.length
s=s.a
q=s.J(q)
if(!(q>=0&&q<r.length))return A.h(r,q)
q=r[q]
t.t.a(B.f)
r=B.f.length
s=s.J(r)
if(!(s>=0&&s<r))return A.h(B.f,s)
p=A.hA("This is a simple Yes/No modal",B.h,B.f[s],q,"No",2,"Yes",t.Y)
o=!0
break
default:o=!1
p=null}if(p!=null)this.gp().Z(p)
return o},
Y(a,b){var s
switch(b){case B.l:this.gp().ab()
s=!0
break
default:s=!1}return s},
aa(a,b){var s,r,q,p,o=this,n=b.a,m=b.b-2
o.sbJ(0,new A.a1(new A.i(n,m),A.aP(n*m,B.G,!1,t.x),t.U))
for(n=t.t,s=0;s<o.b.a.b;++s)for(r=0;r<o.b.a.a;++r){m=$.b4().a
if(m.J(100)<10){q=o.b
n.a(B.o)
p=B.o.length
m=m.J(p)
if(!(m>=0&&m<p))return A.h(B.o,m)
q.G(r,s,A.O(9618,B.o[m],null))}}},
sbJ(a,b){this.b=t.U.a(b)}}
A.dk.prototype={
$1(a){var s=this.b.d
a.aI(0,"Modals render as a transparent layer over existing content.",B.d,s)
a.aI(2,this.a.a,B.d,s)},
$S:6}
A.c3.prototype={
aM(a){var s,r,q
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
default:s=null}r="This is a "+A.v(s)+" border Panel!"
q=a.d
a.ah(B.a.l(q.a-r.length,2),B.a.l(q.b,2),r)}}
A.c2.prototype={
aM(a){var s=a.d
a.ah(B.a.l(s.a-16,2),B.a.l(s.b,2),"This is a Frame!")}}
A.cl.prototype={
gW(){return!0},
gX(){return!1},
t(a){var s,r,q,p,o,n,m,l,k,j=a.a8(new A.D(new A.i(0,0),new A.i(a.gv(a),a.gE(a))).a_(1)),i=j.d,h=i.a,g=B.a.l(h,2)
i=i.b
s=B.a.l(i,2)
r=g-0
q=s-0
p=A.eq(new A.D(new A.i(0,0),new A.i(r,q)),B.X,A.e5())
o=g+1
h-=o
n=A.eq(new A.D(new A.i(o,0),new A.i(h,q)),B.Y,A.e5())
q=s+1
i-=q
m=A.eq(new A.D(new A.i(0,q),new A.i(r,i)),B.a_,A.e5())
i=new A.D(new A.i(o,q),new A.i(h,i))
h=A.e5()
l=new A.c2("Demo Frame",B.Z,h,1,i,i.a_(1),null)
p.t(j)
n.t(j)
m.t(j)
l.bx(j)
k=j.a8(l.b)
k.ai(2,0," Demo Frame ",B.d,B.j)
a.a9(B.a.l(a.c.a.a.a-58,2),0,"Press [enter] to randomize colors. Press [esc] to go back.",B.h)},
Y(a,b){var s
switch(b){case B.l:this.gp().ab()
s=!0
break
case B.x:if(this.a!=null)this.gp().e=!0
s=!0
break
default:s=!1}return s}}
A.u.prototype={}
A.ch.prototype={
gW(){return!0},
gX(){return!1},
t(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=a.c.a.a,d=e.a
e=e.b
s=a.S(B.a.l(d-A.aQ(B.n),2),B.a.l(e-18-5,2),Math.max(A.aQ(B.n),A.aQ(B.p)),23)
for(r=s.e,q=s.c,p=q.a,q=q.b,o=0;o<18;++o)for(n=q+o,m=0;m<B.n[o].length;++m){l=B.ao[o]
if(!(m<l.length))return A.h(l,m)
k=B.au.u(0,l[m])
l=B.n[o]
if(!(m<l.length))return A.h(l,m)
j=A.O(l[m],k,B.j)
s.H(m,o)
r.D(p+m,n,j)}i=s.S(B.a.l(s.d.a-A.aQ(B.p)-2,2),18,A.aQ(B.p)+2,5)
for(h=0;h<5;++h){g=h===this.b
f=g?B.d:B.h
if(g)i.a9(0,h,"\u25ba ",B.y)
i.a9(2,h,B.p[h],f)}a.S(B.a.l(d-28,2),e-1,28,1).a9(0,0,"[\u2191\u2193]: Move   [enter]: Select",B.h)},
Y(a,b){var s,r,q=this
switch(b){case B.t:--q.b
s=!0
break
case B.v:++q.b
s=!0
break
case B.x:r=q.b
if(r===0)q.gp().Z(new A.ci(A.O("@",B.z,null),B.C))
else if(r===2)q.gp().Z(new A.cl())
else if(r===3)q.gp().Z(new A.cj(new A.a1(new A.i(1,1),A.aP(1,B.F,!1,t.x),t.U)))
else if(r===4)q.gp().Z(new A.bT(A.o([],t.cT)))
else q.gp().Z(new A.cm())
s=!0
break
default:s=!1}q.b=B.c.T(B.a.aF(q.b,0,4))
if(s)if(q.a!=null)q.gp().e=!0
return s}}
A.cm.prototype={
gW(){return!0},
gX(){return!1},
t(a){var s=a.c.a.a
a.S(B.a.l(s.a-36,2),B.a.l(s.b,2),36,1).ah(0,0,"Coming soon! Press [esc] to go back.")},
Y(a,b){switch(b){case B.l:this.gp().ab()
return!0
default:return!1}}};(function aliases(){var s=J.F.prototype
s.by=s.i
s=J.ax.prototype
s.bz=s.i
s=A.a4.prototype
s.bA=s.bg
s.bB=s.bh
s=A.a6.prototype
s.bC=s.t
s=A.aG.prototype
s.bx=s.t})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers.installStaticTearOff,o=hunkHelpers._instance_1u
s(A,"iC","hu",25)
s(A,"iP","hU",2)
s(A,"iQ","hV",2)
s(A,"iR","hW",2)
r(A,"fL","iI",0)
q(A,"iT","il",26)
p(A,"j5",2,null,["$1$2","$2"],["fR",function(a,b){return A.fR(a,b,t.p)}],27,0)
r(A,"ei","hB",0)
var n
o(n=A.aC.prototype,"gb1","bY",24)
o(n,"gbU","bV",7)
o(n,"gbW","bX",7)
s(A,"fQ","e4",1)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.j,null)
q(A.j,[A.ew,J.F,J.Q,A.p,A.E,A.dp,A.f,A.az,A.G,A.aJ,A.dv,A.dl,A.be,A.bG,A.ak,A.dd,A.bn,A.dB,A.T,A.cG,A.bH,A.dX,A.cz,A.b6,A.ab,A.w,A.cA,A.bw,A.bx,A.cO,A.bL,A.bF,A.m,A.c0,A.dC,A.bu,A.dF,A.z,A.cP,A.cs,A.d3,A.es,A.R,A.aw,A.cM,A.cx,A.da,A.D,A.dn,A.am,A.a9,A.W,A.l,A.cg,A.aY,A.du,A.r,A.a6,A.aC,A.cL])
q(J.F,[J.cc,J.bk,J.ax,J.y,J.bl,J.aN,A.A,A.b8,A.cD,A.d4,A.b,A.cH,A.cJ])
q(J.ax,[J.cn,J.bA,J.a3])
r(J.db,J.y)
q(J.bl,[J.bj,J.cd])
q(A.p,[A.aO,A.ao,A.cf,A.cv,A.co,A.b5,A.cE,A.ck,A.a0,A.cw,A.cu,A.bv,A.bZ,A.c_])
q(A.E,[A.bX,A.d2,A.d8,A.bg,A.bY,A.ct,A.dc,A.ec,A.ee,A.dy,A.dx,A.e0,A.dJ,A.dR,A.ds,A.dr,A.dW,A.dT,A.dD,A.dE,A.d5,A.d6,A.d7,A.d1,A.d9,A.df,A.dk])
q(A.bX,[A.ej,A.dz,A.dA,A.dY,A.dG,A.dN,A.dL,A.dI,A.dM,A.dH,A.dQ,A.dP,A.dO,A.dt,A.dq,A.e2,A.e7,A.dV,A.dg,A.dh,A.di,A.dj])
q(A.f,[A.n,A.a5,A.bB,A.aB,A.aA,A.bi])
q(A.n,[A.ay,A.bm])
r(A.by,A.ay)
r(A.bb,A.a5)
q(A.G,[A.bq,A.aD,A.bz,A.bt])
r(A.bd,A.aB)
r(A.bc,A.aA)
q(A.aJ,[A.ba,A.bf])
r(A.bh,A.bg)
r(A.bs,A.ao)
q(A.ct,[A.cr,A.aH])
r(A.cy,A.b5)
r(A.bp,A.ak)
r(A.a4,A.bp)
q(A.bY,[A.ed,A.e1,A.e8,A.dK,A.de])
r(A.bI,A.cE)
r(A.cN,A.bL)
q(A.a4,[A.dU,A.bE])
r(A.bo,A.bF)
q(A.a0,[A.aU,A.ca])
q(A.A,[A.e,A.aW])
q(A.e,[A.k,A.X])
q(A.k,[A.d,A.c])
q(A.d,[A.bS,A.bU,A.av,A.c7,A.aM,A.cp])
r(A.aK,A.cD)
q(A.bo,[A.cC,A.cB,A.c5])
r(A.cI,A.cH)
r(A.ai,A.cI)
r(A.K,A.b)
r(A.Y,A.K)
r(A.cK,A.cJ)
r(A.br,A.cK)
r(A.bC,A.bw)
r(A.aE,A.bC)
r(A.bD,A.bx)
r(A.a1,A.bi)
q(A.cx,[A.aL,A.i])
q(A.dC,[A.d0,A.a7,A.Z])
r(A.ah,A.am)
q(A.a9,[A.al,A.b9])
r(A.bW,A.al)
q(A.ah,[A.c6,A.c9])
q(A.r,[A.b7,A.bT,A.ci,A.cj,A.cl,A.ch,A.cm])
r(A.aR,A.b7)
r(A.aG,A.a6)
q(A.aG,[A.c8,A.c3])
r(A.c2,A.c8)
r(A.u,A.da)
s(A.bF,A.m)
s(A.cD,A.d3)
s(A.cH,A.m)
s(A.cI,A.R)
s(A.cJ,A.m)
s(A.cK,A.R)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{V:"int",cU:"double",a_:"num",a8:"String",C:"bool",z:"Null",B:"List"},mangledNames:{},types:["~()","~(@)","~(~())","z(@)","z()","~(b)","~(a9)","~(Y)","P<z>()","C(j?)","@(@)","@(@,a8)","@(a8)","z(~())","z(@,an)","~(V,@)","z(j,an)","w<@>(@)","C(@)","~(j?,j?)","C(e)","k(e)","C(k)","0&(b)","~(a_)","V(j?)","C(j?,j?)","0^(0^,0^)<a_>"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.ia(v.typeUniverse,JSON.parse('{"cn":"ax","bA":"ax","a3":"ax","jf":"b","jr":"b","je":"c","ju":"c","jg":"d","jx":"d","jv":"e","jq":"e","ji":"K","jh":"X","jz":"X","js":"A","jw":"ai","cc":{"C":[]},"bk":{"z":[]},"y":{"B":["1"],"n":["1"],"f":["1"]},"db":{"y":["1"],"B":["1"],"n":["1"],"f":["1"]},"Q":{"G":["1"]},"bl":{"cU":[],"a_":[]},"bj":{"cU":[],"V":[],"a_":[]},"cd":{"cU":[],"a_":[]},"aN":{"a8":[],"fi":[]},"aO":{"p":[]},"n":{"f":["1"]},"ay":{"n":["1"],"f":["1"]},"by":{"ay":["1"],"n":["1"],"f":["1"],"ay.E":"1","f.E":"1"},"az":{"G":["1"]},"a5":{"f":["2"],"f.E":"2"},"bb":{"a5":["1","2"],"n":["2"],"f":["2"],"f.E":"2"},"bq":{"G":["2"]},"bB":{"f":["1"],"f.E":"1"},"aD":{"G":["1"]},"aB":{"f":["1"],"f.E":"1"},"bd":{"aB":["1"],"n":["1"],"f":["1"],"f.E":"1"},"bz":{"G":["1"]},"aA":{"f":["1"],"f.E":"1"},"bc":{"aA":["1"],"n":["1"],"f":["1"],"f.E":"1"},"bt":{"G":["1"]},"aJ":{"aj":["1","2"]},"ba":{"aJ":["1","2"],"aj":["1","2"]},"bf":{"aJ":["1","2"],"aj":["1","2"]},"bg":{"E":[],"a2":[]},"bh":{"E":[],"a2":[]},"bs":{"ao":[],"p":[]},"cf":{"p":[]},"cv":{"p":[]},"bG":{"an":[]},"E":{"a2":[]},"bX":{"E":[],"a2":[]},"bY":{"E":[],"a2":[]},"ct":{"E":[],"a2":[]},"cr":{"E":[],"a2":[]},"aH":{"E":[],"a2":[]},"co":{"p":[]},"cy":{"p":[]},"a4":{"ak":["1","2"],"aj":["1","2"]},"bm":{"n":["1"],"f":["1"],"f.E":"1"},"bn":{"G":["1"]},"bH":{"fp":[]},"cE":{"p":[]},"bI":{"ao":[],"p":[]},"w":{"P":["1"]},"b6":{"p":[]},"bL":{"fr":[]},"cN":{"bL":[],"fr":[]},"dU":{"a4":["1","2"],"ak":["1","2"],"aj":["1","2"]},"bE":{"a4":["1","2"],"ak":["1","2"],"aj":["1","2"]},"bi":{"f":["1"]},"bo":{"m":["1"],"B":["1"],"n":["1"],"f":["1"]},"bp":{"ak":["1","2"],"aj":["1","2"]},"ak":{"aj":["1","2"]},"V":{"a_":[]},"B":{"n":["1"],"f":["1"]},"a8":{"fi":[]},"b5":{"p":[]},"ao":{"p":[]},"ck":{"p":[]},"a0":{"p":[]},"aU":{"p":[]},"ca":{"p":[]},"cw":{"p":[]},"cu":{"p":[]},"bv":{"p":[]},"bZ":{"p":[]},"bu":{"p":[]},"c_":{"p":[]},"cP":{"an":[]},"av":{"k":[],"e":[],"A":[]},"k":{"e":[],"A":[]},"Y":{"b":[]},"e":{"A":[]},"d":{"k":[],"e":[],"A":[]},"bS":{"k":[],"e":[],"A":[]},"bU":{"k":[],"e":[],"A":[]},"X":{"e":[],"A":[]},"cC":{"m":["k"],"B":["k"],"n":["k"],"f":["k"],"m.E":"k"},"c7":{"k":[],"e":[],"A":[]},"ai":{"m":["e"],"R":["e"],"B":["e"],"ce":["e"],"n":["e"],"f":["e"],"m.E":"e","R.E":"e"},"aM":{"k":[],"e":[],"A":[]},"cB":{"m":["e"],"B":["e"],"n":["e"],"f":["e"],"m.E":"e"},"br":{"m":["e"],"R":["e"],"B":["e"],"ce":["e"],"n":["e"],"f":["e"],"m.E":"e","R.E":"e"},"cp":{"k":[],"e":[],"A":[]},"K":{"b":[]},"aW":{"A":[]},"bC":{"bw":["1"]},"aE":{"bC":["1"],"bw":["1"]},"bD":{"bx":["1"]},"aw":{"G":["1"]},"c5":{"m":["k"],"B":["k"],"n":["k"],"f":["k"],"m.E":"k"},"cM":{"hL":[]},"c":{"k":[],"e":[],"A":[]},"a1":{"f":["1"],"f.E":"1"},"ah":{"am":[]},"bW":{"al":["ah"],"a9":[],"al.T":"ah"},"c6":{"ah":[],"am":[]},"c9":{"ah":[],"am":[]},"b9":{"a9":[]},"al":{"a9":[]},"b7":{"r":["1"]},"aR":{"r":["1"],"r.T":"1"},"aG":{"a6":[]},"c8":{"a6":[]},"bT":{"r":["u"],"r.T":"u"},"ci":{"r":["u"],"r.T":"u"},"cj":{"r":["u"],"r.T":"u"},"c3":{"a6":[]},"c2":{"a6":[]},"cl":{"r":["u"],"r.T":"u"},"ch":{"r":["u"],"r.T":"u"},"cm":{"r":["u"],"r.T":"u"}}'))
A.i9(v.typeUniverse,JSON.parse('{"n":1,"bi":1,"bo":1,"bp":2,"bF":1,"b7":1}'))
var u={i:"                                                                   ",l:"   GGGGGG                                                 GGGGGG",b:"   \u2588\u2588\u2588\u2588\u2588\u2588                                                 \u2588\u2588\u2588\u2588\u2588\u2588",e:"  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.ar
return{U:s("a1<W>"),J:s("a1<W?>"),n:s("b6"),E:s("av"),x:s("W"),k:s("l"),X:s("n<@>"),h:s("k"),R:s("p"),A:s("b"),a:s("a2"),d:s("P<@>"),Y:s("u"),B:s("f<k>"),D:s("f<e>"),e:s("f<@>"),O:s("y<l>"),q:s("y<r<u>>"),s:s("y<a8>"),r:s("y<i>"),cT:s("y<cL>"),b:s("y<@>"),T:s("bk"),g:s("a3"),da:s("ce<@>"),dc:s("cg<u>"),v:s("Y"),cA:s("r<u>"),V:s("B<l>"),j:s("B<a7>"),t:s("B<l?>"),ck:s("0&"),G:s("e"),P:s("z"),K:s("j"),aT:s("al<am>"),l:s("an"),N:s("a8"),bv:s("fp"),b7:s("ao"),cr:s("bA"),a5:s("aC<u>"),bt:s("aE<b>"),ae:s("aE<Y>"),c:s("w<@>"),aQ:s("w<V>"),c4:s("aY"),w:s("C"),L:s("C(k)"),m:s("C(j)"),i:s("cU"),z:s("@"),W:s("@()"),y:s("@(j)"),C:s("@(j,an)"),S:s("V"),I:s("0&*"),_:s("j*"),cj:s("W?"),a_:s("P<b>?"),bc:s("P<z>?"),Q:s("j?"),aZ:s("al<am>?"),u:s("bx<Y>?"),F:s("ab<@,@>?"),o:s("@(b)?"),Z:s("~()?"),cx:s("~(b)?"),a0:s("~(a9)?"),p:s("a_"),H:s("~"),M:s("~()"),f:s("~(a_)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.q=A.av.prototype
B.i=A.b8.prototype
B.m=A.aK.prototype
B.al=A.aM.prototype
B.am=J.F.prototype
B.b=J.y.prototype
B.a=J.bj.prototype
B.c=J.bl.prototype
B.k=J.aN.prototype
B.an=J.a3.prototype
B.a0=J.cn.prototype
B.B=J.bA.prototype
B.a1=A.aW.prototype
B.a2=new A.bh(A.j5(),A.ar("bh<V>"))
B.l=new A.u()
B.u=new A.u()
B.t=new A.u()
B.x=new A.u()
B.v=new A.u()
B.w=new A.u()
B.D=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.a3=function() {
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
B.a8=function(getTagFallback) {
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
B.a4=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a5=function(hooks) {
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
B.a7=function(hooks) {
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
B.a6=function(hooks) {
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
B.E=function(hooks) { return hooks; }

B.aF=new A.dp()
B.e=new A.cN()
B.a9=new A.cP()
B.aa=new A.d0(1,"glyph")
B.d=new A.l(255,255,255)
B.j=new A.l(0,0,0)
B.F=new A.W(0,B.d,B.j)
B.G=new A.W(32,B.d,B.j)
B.h=new A.l(128,128,128)
B.M=new A.l(128,64,0)
B.O=new A.l(160,110,60)
B.y=new A.l(255,128,0)
B.z=new A.l(255,192,0)
B.ah=new A.aL(0,1)
B.ai=new A.aL(0,-1)
B.aj=new A.aL(1,0)
B.ak=new A.aL(-1,0)
B.S=A.o(s(["\u2580","\u2584","\u258c","\u2590","\u2588","\u2588","\u2588","\u2588"]),t.s)
B.n=A.o(s(["  \u2588\u2588\u2588\u2588\u2588\u2588                                                   \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588                                                     \u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588",u.e,u.b,"   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588     \u2588   \u2588 \u2588   \u2588   \u2588   \u2588   \u2588 \u2588     \u2588     \u2588     \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588   \u2588   \u2588 \u2588\u2588\u2588\u2588\u2588   \u2588   \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588   \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588     \u2588   \u2588 \u2588  \u2588    \u2588   \u2588  \u2588  \u2588         \u2588     \u2588 \u2588\u2588\u2588\u2588\u2588\u2588","   \u2588\u2588\u2588\u2588\u2588\u2588 \u2588     \u2588\u2588\u2588\u2588\u2588 \u2588   \u2588   \u2588   \u2588   \u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588",u.b,u.e," \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593","\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591",u.i,u.i,"                         D E M O   M E N U                         ",u.i]),t.s)
B.ao=A.o(s(["  GGGGGG                                                   GGGGGG","   GGGG                                                     GGGG","   GGGG   GGGG  GGGG  GGGG  GGGG   GGGG  GGGG  GGGG  GGGG   GGGG","  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",u.l,"   GGGGGG RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR GGGGGG","   GGGGGG R     R   R R   R   R   R   R R     R     R     GGGGGG","   GGGGGG RRR   R   R RRRRR   R   RRRRR RRR   RRRRR RRRRR GGGGGG","   GGGGGG R     R   R R  R    R   R  R  R         R     R GGGGGG","   GGGGGG R     RRRRR R   R   R   R   R RRRRR RRRRR RRRRR GGGGGG",u.l,"  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"," BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB","BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",u.i,u.i,"                         W W W W   W W W W                         ",u.i]),t.s)
B.A=new A.a7(0,"none")
B.X=new A.a7(1,"single")
B.Y=new A.a7(2,"double")
B.Z=new A.a7(3,"frame")
B.a_=new A.a7(4,"solid")
B.ap=A.o(s([B.A,B.X,B.Y,B.Z,B.a_]),A.ar("y<a7>"))
B.ag=new A.l(255,200,170)
B.o=A.o(s([B.ag,B.y,B.M]),t.O)
B.p=A.o(s(["Minigame","Map generation","UI Panels","UI Modals","Animation"]),t.s)
B.Q=new A.l(255,160,160)
B.P=new A.l(220,0,0)
B.K=new A.l(100,0,0)
B.at=A.o(s([B.Q,B.P,B.K]),t.O)
B.L=new A.l(128,160,255)
B.J=new A.l(0,64,255)
B.ab=new A.l(0,37,168)
B.aq=A.o(s([B.L,B.J,B.ab]),t.O)
B.N=new A.l(130,255,90)
B.H=new A.l(0,128,0)
B.ac=new A.l(0,64,0)
B.as=A.o(s([B.N,B.H,B.ac]),t.O)
B.r=A.o(s([B.o,B.at,B.aq,B.as]),A.ar("y<B<l>>"))
B.I=new A.l(0,255,255)
B.ad=new A.l(128,0,255)
B.R=new A.l(255,255,0)
B.f=A.o(s([B.d,B.I,B.z,B.H,B.L,B.ad,B.P,B.R]),t.O)
B.T=A.o(s(["\u2550","\u2550","\u2551","\u2551","\u2554","\u2557","\u255a","\u255d"]),t.s)
B.U=A.o(s(["\u2500","\u2500","\u2502","\u2502","\u250c","\u2510","\u2514","\u2518"]),t.s)
B.af=new A.l(200,140,255)
B.ae=new A.l(190,150,100)
B.V=A.o(s([B.d,B.h,B.I,B.af,B.Q,B.z,B.y,B.R,B.J,B.N,B.ae]),t.O)
B.W=A.o(s(["\u2550","\u2500","\u2502","\u2502","\u2552","\u2555","\u2514","\u2518"]),t.s)
B.ar=A.o(s(["G","B","R","W"]),t.s)
B.au=new A.ba(4,{G:B.h,B:B.O,R:B.K,W:B.d},B.ar,A.ar("ba<a8,l>"))
B.av=new A.bf([9786,1,9787,2,9829,3,9830,4,9827,5,9824,6,8226,7,9688,8,9675,9,9689,10,9794,11,9792,12,9834,13,9835,14,9788,15,9658,16,9668,17,8597,18,8252,19,182,20,167,21,9644,22,8616,23,8593,24,8595,25,8594,26,8592,27,8735,28,8596,29,9650,30,9660,31,8962,127,199,128,252,129,233,130,226,131,228,132,224,133,229,134,231,135,234,136,235,137,232,138,239,139,238,140,236,141,196,142,197,143,201,144,230,145,198,146,244,147,246,148,242,149,251,150,249,151,255,152,214,153,220,154,162,155,163,156,165,157,8359,158,402,159,225,160,237,161,243,162,250,163,241,164,209,165,170,166,186,167,191,168,8976,169,172,170,189,171,188,172,161,173,171,174,187,175,9617,176,9618,177,9619,178,9474,179,9508,180,9569,181,9570,182,9558,183,9557,184,9571,185,9553,186,9559,187,9565,188,9564,189,9563,190,9488,191,9492,192,9524,193,9516,194,9500,195,9472,196,9532,197,9566,198,9567,199,9562,200,9556,201,9577,202,9574,203,9568,204,9552,205,9580,206,9575,207,9576,208,9572,209,9573,210,9561,211,9560,212,9554,213,9555,214,9579,215,9578,216,9496,217,9484,218,9608,219,9604,220,9612,221,9616,222,9600,223,945,224,223,225,915,226,960,227,931,228,963,229,181,230,964,231,934,232,920,233,937,234,948,235,8734,236,966,237,949,238,8745,239,8801,240,177,241,8805,242,8804,243,8992,244,8993,245,247,246,8776,247,176,248,8729,249,183,250,8730,251,8319,252,178,253,9632,254],A.ar("bf<V,V>"))
B.aw=A.jd("j")
B.C=new A.i(0,0)
B.ax=new A.Z(0,"top")
B.ay=new A.Z(1,"bottom")
B.az=new A.Z(2,"left")
B.aA=new A.Z(3,"right")
B.aB=new A.Z(4,"topLeft")
B.aC=new A.Z(5,"topRight")
B.aD=new A.Z(6,"bottomLeft")
B.aE=new A.Z(7,"bottomRight")})();(function staticFields(){$.dS=null
$.f4=null
$.f3=null
$.fO=null
$.fK=null
$.fT=null
$.e9=null
$.ef=null
$.eV=null
$.b_=null
$.bM=null
$.bN=null
$.eL=!1
$.q=B.e
$.N=A.o([],A.ar("y<j>"))
$.M=A.hX("_ui")})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"jk","fW",()=>A.iV("_$dart_dartClosure"))
s($,"k_","em",()=>B.e.bq(new A.ej(),A.ar("P<z>")))
s($,"jA","h1",()=>A.aa(A.dw({
toString:function(){return"$receiver$"}})))
s($,"jB","h2",()=>A.aa(A.dw({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"jC","h3",()=>A.aa(A.dw(null)))
s($,"jD","h4",()=>A.aa(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"jG","h7",()=>A.aa(A.dw(void 0)))
s($,"jH","h8",()=>A.aa(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"jF","h6",()=>A.aa(A.fq(null)))
s($,"jE","h5",()=>A.aa(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"jJ","ha",()=>A.aa(A.fq(void 0)))
s($,"jI","h9",()=>A.aa(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"jK","eY",()=>A.hT())
s($,"jt","h0",()=>A.ar("w<z>").a($.em()))
s($,"jX","hb",()=>A.ek(B.aw))
s($,"jj","fV",()=>({}))
s($,"jo","eX",()=>B.k.aH(A.er(),"Opera",0))
s($,"jn","fZ",()=>!A.bP($.eX())&&B.k.aH(A.er(),"Trident/",0))
s($,"jm","fY",()=>B.k.aH(A.er(),"Firefox",0))
s($,"jl","fX",()=>"-"+$.h_()+"-")
s($,"jp","h_",()=>{if(A.bP($.fY()))var r="moz"
else if($.fZ())r="ms"
else r=A.bP($.eX())?"o":"webkit"
return r})
s($,"k0","b4",()=>new A.dn(A.fj(A.f9().a)))
s($,"jW","el",()=>B.b.bw(B.ap,1))
s($,"jY","hc",()=>A.fj(A.f9().a))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.F,FontFace:J.F,MediaError:J.F,Navigator:J.F,NavigatorConcurrentHardware:J.F,NavigatorUserMediaError:J.F,OverconstrainedError:J.F,PositionError:J.F,GeolocationPositionError:J.F,TextMetrics:J.F,HTMLAudioElement:A.d,HTMLBRElement:A.d,HTMLBaseElement:A.d,HTMLBodyElement:A.d,HTMLButtonElement:A.d,HTMLContentElement:A.d,HTMLDListElement:A.d,HTMLDataElement:A.d,HTMLDataListElement:A.d,HTMLDetailsElement:A.d,HTMLDialogElement:A.d,HTMLDivElement:A.d,HTMLEmbedElement:A.d,HTMLFieldSetElement:A.d,HTMLHRElement:A.d,HTMLHeadElement:A.d,HTMLHeadingElement:A.d,HTMLHtmlElement:A.d,HTMLIFrameElement:A.d,HTMLInputElement:A.d,HTMLLIElement:A.d,HTMLLabelElement:A.d,HTMLLegendElement:A.d,HTMLLinkElement:A.d,HTMLMapElement:A.d,HTMLMediaElement:A.d,HTMLMenuElement:A.d,HTMLMetaElement:A.d,HTMLMeterElement:A.d,HTMLModElement:A.d,HTMLOListElement:A.d,HTMLObjectElement:A.d,HTMLOptGroupElement:A.d,HTMLOptionElement:A.d,HTMLOutputElement:A.d,HTMLParagraphElement:A.d,HTMLParamElement:A.d,HTMLPictureElement:A.d,HTMLPreElement:A.d,HTMLProgressElement:A.d,HTMLQuoteElement:A.d,HTMLScriptElement:A.d,HTMLShadowElement:A.d,HTMLSlotElement:A.d,HTMLSourceElement:A.d,HTMLSpanElement:A.d,HTMLStyleElement:A.d,HTMLTableCaptionElement:A.d,HTMLTableCellElement:A.d,HTMLTableDataCellElement:A.d,HTMLTableHeaderCellElement:A.d,HTMLTableColElement:A.d,HTMLTableElement:A.d,HTMLTableRowElement:A.d,HTMLTableSectionElement:A.d,HTMLTemplateElement:A.d,HTMLTextAreaElement:A.d,HTMLTimeElement:A.d,HTMLTitleElement:A.d,HTMLTrackElement:A.d,HTMLUListElement:A.d,HTMLUnknownElement:A.d,HTMLVideoElement:A.d,HTMLDirectoryElement:A.d,HTMLFontElement:A.d,HTMLFrameElement:A.d,HTMLFrameSetElement:A.d,HTMLMarqueeElement:A.d,HTMLElement:A.d,HTMLAnchorElement:A.bS,HTMLAreaElement:A.bU,HTMLCanvasElement:A.av,CanvasRenderingContext2D:A.b8,CDATASection:A.X,CharacterData:A.X,Comment:A.X,ProcessingInstruction:A.X,Text:A.X,CSSStyleDeclaration:A.aK,MSStyleCSSProperties:A.aK,CSS2Properties:A.aK,DOMException:A.d4,Element:A.k,AbortPaymentEvent:A.b,AnimationEvent:A.b,AnimationPlaybackEvent:A.b,ApplicationCacheErrorEvent:A.b,BackgroundFetchClickEvent:A.b,BackgroundFetchEvent:A.b,BackgroundFetchFailEvent:A.b,BackgroundFetchedEvent:A.b,BeforeInstallPromptEvent:A.b,BeforeUnloadEvent:A.b,BlobEvent:A.b,CanMakePaymentEvent:A.b,ClipboardEvent:A.b,CloseEvent:A.b,CustomEvent:A.b,DeviceMotionEvent:A.b,DeviceOrientationEvent:A.b,ErrorEvent:A.b,ExtendableEvent:A.b,ExtendableMessageEvent:A.b,FetchEvent:A.b,FontFaceSetLoadEvent:A.b,ForeignFetchEvent:A.b,GamepadEvent:A.b,HashChangeEvent:A.b,InstallEvent:A.b,MediaEncryptedEvent:A.b,MediaKeyMessageEvent:A.b,MediaQueryListEvent:A.b,MediaStreamEvent:A.b,MediaStreamTrackEvent:A.b,MessageEvent:A.b,MIDIConnectionEvent:A.b,MIDIMessageEvent:A.b,MutationEvent:A.b,NotificationEvent:A.b,PageTransitionEvent:A.b,PaymentRequestEvent:A.b,PaymentRequestUpdateEvent:A.b,PopStateEvent:A.b,PresentationConnectionAvailableEvent:A.b,PresentationConnectionCloseEvent:A.b,ProgressEvent:A.b,PromiseRejectionEvent:A.b,PushEvent:A.b,RTCDataChannelEvent:A.b,RTCDTMFToneChangeEvent:A.b,RTCPeerConnectionIceEvent:A.b,RTCTrackEvent:A.b,SecurityPolicyViolationEvent:A.b,SensorErrorEvent:A.b,SpeechRecognitionError:A.b,SpeechRecognitionEvent:A.b,SpeechSynthesisEvent:A.b,StorageEvent:A.b,SyncEvent:A.b,TrackEvent:A.b,TransitionEvent:A.b,WebKitTransitionEvent:A.b,VRDeviceEvent:A.b,VRDisplayEvent:A.b,VRSessionEvent:A.b,MojoInterfaceRequestEvent:A.b,ResourceProgressEvent:A.b,USBConnectionEvent:A.b,IDBVersionChangeEvent:A.b,AudioProcessingEvent:A.b,OfflineAudioCompletionEvent:A.b,WebGLContextEvent:A.b,Event:A.b,InputEvent:A.b,SubmitEvent:A.b,FontFaceSet:A.A,Performance:A.A,EventTarget:A.A,HTMLFormElement:A.c7,HTMLCollection:A.ai,HTMLFormControlsCollection:A.ai,HTMLOptionsCollection:A.ai,HTMLImageElement:A.aM,KeyboardEvent:A.Y,Document:A.e,DocumentFragment:A.e,HTMLDocument:A.e,ShadowRoot:A.e,XMLDocument:A.e,Attr:A.e,DocumentType:A.e,Node:A.e,NodeList:A.br,RadioNodeList:A.br,HTMLSelectElement:A.cp,CompositionEvent:A.K,FocusEvent:A.K,MouseEvent:A.K,DragEvent:A.K,PointerEvent:A.K,TextEvent:A.K,TouchEvent:A.K,WheelEvent:A.K,UIEvent:A.K,Window:A.aW,DOMWindow:A.aW,SVGAElement:A.c,SVGAnimateElement:A.c,SVGAnimateMotionElement:A.c,SVGAnimateTransformElement:A.c,SVGAnimationElement:A.c,SVGCircleElement:A.c,SVGClipPathElement:A.c,SVGDefsElement:A.c,SVGDescElement:A.c,SVGDiscardElement:A.c,SVGEllipseElement:A.c,SVGFEBlendElement:A.c,SVGFEColorMatrixElement:A.c,SVGFEComponentTransferElement:A.c,SVGFECompositeElement:A.c,SVGFEConvolveMatrixElement:A.c,SVGFEDiffuseLightingElement:A.c,SVGFEDisplacementMapElement:A.c,SVGFEDistantLightElement:A.c,SVGFEFloodElement:A.c,SVGFEFuncAElement:A.c,SVGFEFuncBElement:A.c,SVGFEFuncGElement:A.c,SVGFEFuncRElement:A.c,SVGFEGaussianBlurElement:A.c,SVGFEImageElement:A.c,SVGFEMergeElement:A.c,SVGFEMergeNodeElement:A.c,SVGFEMorphologyElement:A.c,SVGFEOffsetElement:A.c,SVGFEPointLightElement:A.c,SVGFESpecularLightingElement:A.c,SVGFESpotLightElement:A.c,SVGFETileElement:A.c,SVGFETurbulenceElement:A.c,SVGFilterElement:A.c,SVGForeignObjectElement:A.c,SVGGElement:A.c,SVGGeometryElement:A.c,SVGGraphicsElement:A.c,SVGImageElement:A.c,SVGLineElement:A.c,SVGLinearGradientElement:A.c,SVGMarkerElement:A.c,SVGMaskElement:A.c,SVGMetadataElement:A.c,SVGPathElement:A.c,SVGPatternElement:A.c,SVGPolygonElement:A.c,SVGPolylineElement:A.c,SVGRadialGradientElement:A.c,SVGRectElement:A.c,SVGScriptElement:A.c,SVGSetElement:A.c,SVGStopElement:A.c,SVGStyleElement:A.c,SVGElement:A.c,SVGSVGElement:A.c,SVGSwitchElement:A.c,SVGSymbolElement:A.c,SVGTSpanElement:A.c,SVGTextContentElement:A.c,SVGTextElement:A.c,SVGTextPathElement:A.c,SVGTextPositioningElement:A.c,SVGTitleElement:A.c,SVGUseElement:A.c,SVGViewElement:A.c,SVGGradientElement:A.c,SVGComponentTransferFunctionElement:A.c,SVGFEDropShadowElement:A.c,SVGMPathElement:A.c})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,FontFace:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,TextMetrics:true,HTMLAudioElement:true,HTMLBRElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLInputElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLCanvasElement:true,CanvasRenderingContext2D:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,DOMException:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,ProgressEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,ResourceProgressEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,FontFaceSet:true,Performance:true,EventTarget:false,HTMLFormElement:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLImageElement:true,KeyboardEvent:true,Document:true,DocumentFragment:true,HTMLDocument:true,ShadowRoot:true,XMLDocument:true,Attr:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLSelectElement:true,CompositionEvent:true,FocusEvent:true,MouseEvent:true,DragEvent:true,PointerEvent:true,TextEvent:true,TouchEvent:true,WheelEvent:true,UIEvent:false,Window:true,DOMWindow:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGScriptElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true})})()
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q)s[q].removeEventListener("load",onLoad,false)
a(b.target)}for(var r=0;r<s.length;++r)s[r].addEventListener("load",onLoad,false)})(function(a){v.currentScript=a
var s=A.eg
if(typeof dartMainRunner==="function")dartMainRunner(s,[])
else s([])})})()
//# sourceMappingURL=main.dart.js.map
