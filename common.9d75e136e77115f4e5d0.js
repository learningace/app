(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{HTFn:function(e,n,t){"use strict";t.d(n,"a",function(){return y}),t.d(n,"b",function(){return W});var u=t("fXoL"),a=(t("tyNb"),t("LRne")),i=t("mCNh"),l=t("lJxs"),s=(t("IzEk"),t("eIep")),c=t("XNiG"),r=t("HDdC"),b=t("Cfvw"),o=t("VRyK"),d=t("pxpQ"),O=t("UXun"),g=t("SxV6");function j(e,n){return n?Object(s.a)(()=>e,n):Object(s.a)(()=>e)}var h=t("tf+s"),p=t("pLZG"),S=t("spgP"),f=t("ofXK");const w=new u.q("angularfire2.auth.use-emulator"),I=new u.q("angularfire2.auth.settings"),A=new u.q("angularfire2.auth.tenant-id"),m=new u.q("angularfire2.auth.langugage-code"),k=new u.q("angularfire2.auth.use-device-language"),C=new u.q("angularfire.auth.persistence");let R=(()=>{class e{constructor(e,n,u,i,w,I,A,m,k,C){const R=new S.d(i),v=Object(S.h)(R),T=new c.a,W=Object(a.a)(void 0).pipe(Object(d.b)(R.outsideAngular),Object(s.a)(()=>i.runOutsideAngular(()=>t.e(7).then(t.bind(null,"6nsN")))),Object(l.a)(()=>Object(S.g)(e,i,n)),Object(l.a)(e=>i.runOutsideAngular(()=>{const n=w,t=I;return Object(S.f)(e.name+".auth","AngularFireAuth",e,()=>{const u=i.runOutsideAngular(()=>e.auth());return n&&u.useEmulator("http://"+n.join(":")),A&&(u.tenantId=A),u.languageCode=m,k&&u.useDeviceLanguage(),t&&(u.settings=t),C&&u.setPersistence(C),u},[n,A,m,k,t,C])})),Object(O.a)({bufferSize:1,refCount:!1}));if(Object(f.q)(u))this.authState=this.user=this.idToken=this.idTokenResult=this.credential=Object(a.a)(null);else{W.pipe(Object(g.a)()).subscribe();const e=W.pipe(Object(s.a)(e=>e.getRedirectResult().then(e=>e,()=>null)),v,Object(O.a)({bufferSize:1,refCount:!1})),n=e=>new r.a(n=>({unsubscribe:i.runOutsideAngular(()=>e(n))})),t=W.pipe(Object(s.a)(e=>n(e.onAuthStateChanged.bind(e)))),u=W.pipe(Object(s.a)(e=>n(e.onIdTokenChanged.bind(e))));this.authState=e.pipe(j(t),Object(h.a)(R.outsideAngular),Object(d.b)(R.insideAngular)),this.user=e.pipe(j(u),Object(h.a)(R.outsideAngular),Object(d.b)(R.insideAngular)),this.idToken=this.user.pipe(Object(s.a)(e=>e?Object(b.a)(e.getIdToken()):Object(a.a)(null))),this.idTokenResult=this.user.pipe(Object(s.a)(e=>e?Object(b.a)(e.getIdTokenResult()):Object(a.a)(null))),this.credential=Object(o.a)(e,T,this.authState.pipe(Object(p.a)(e=>!e))).pipe(Object(l.a)(e=>(null==e?void 0:e.user)?e:null),Object(h.a)(R.outsideAngular),Object(d.b)(R.insideAngular))}return Object(S.i)(this,W,i,{spy:{apply:(e,n,t)=>{(e.startsWith("signIn")||e.startsWith("createUser"))&&t.then(e=>T.next(e))}}})}}return e.\u0275fac=function(n){return new(n||e)(u.Sb(S.c),u.Sb(S.b,8),u.Sb(u.B),u.Sb(u.z),u.Sb(w,8),u.Sb(I,8),u.Sb(A,8),u.Sb(m,8),u.Sb(k,8),u.Sb(C,8))},e.\u0275prov=Object(u.Fb)({factory:function(){return new e(Object(u.Sb)(S.c),Object(u.Sb)(S.b,8),Object(u.Sb)(u.B),Object(u.Sb)(u.z),Object(u.Sb)(w,8),Object(u.Sb)(I,8),Object(u.Sb)(A,8),Object(u.Sb)(m,8),Object(u.Sb)(k,8),Object(u.Sb)(C,8))},token:e,providedIn:"any"}),e})();Object(S.e)(R,[{app:null,applyActionCode:null,checkActionCode:null,confirmPasswordReset:null,createUserWithEmailAndPassword:null,currentUser:null,fetchSignInMethodsForEmail:null,isSignInWithEmailLink:null,getRedirectResult:null,languageCode:null,settings:null,onAuthStateChanged:null,onIdTokenChanged:null,sendSignInLinkToEmail:null,sendPasswordResetEmail:null,setPersistence:null,signInAndRetrieveDataWithCredential:null,signInAnonymously:null,signInWithCredential:null,signInWithCustomToken:null,signInWithEmailAndPassword:null,signInWithPhoneNumber:null,signInWithEmailLink:null,signInWithPopup:null,signInWithRedirect:null,signOut:null,tenantId:null,updateCurrentUser:null,useDeviceLanguage:null,useEmulator:null,verifyPasswordResetCode:null}]);const v=Object(l.a)(e=>!!e);Object(l.a)(e=>!!e&&!e.isAnonymous);const T=Object(s.a)(e=>e?e.getIdTokenResult():Object(a.a)(null)),W=(Object(l.a)(e=>!!e&&e.emailVerified),Object(i.a)(T,Object(l.a)(e=>e?e.claims:[])),e=>Object(i.a)(v,Object(l.a)(n=>n||e))),y=e=>Object(i.a)(v,Object(l.a)(n=>n&&e||!0))}}]);