(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{mfBn:function(t,n,e){"use strict";e.r(n),e.d(n,"LearnerModule",function(){return l});var i=e("ofXK"),r=e("IzEk"),s=e("fXoL"),c=e("kR/R"),u=e("Wtnc"),o=e("tyNb");const a=[{path:"",component:(()=>{class t{constructor(t,n,e){this.auth=t,this.snackbar=n,this.router=e,this.userEmail="",this.isEmailVerified=!0}ngOnInit(){this.auth.user$.pipe(Object(r.a)(1)).subscribe(t=>{t&&(this.userEmail=t.email,0==t.emailVerified&&(this.isEmailVerified=!1))})}signOut(){this.auth.logout()}}return t.\u0275fac=function(n){return new(n||t)(s.Mb(c.a),s.Mb(u.b),s.Mb(o.f))},t.\u0275cmp=s.Gb({type:t,selectors:[["app-learner-dashboard"]],decls:6,vars:1,consts:[[1,"button",3,"click"]],template:function(t,n){1&t&&(s.Sb(0,"h1"),s.uc(1,"learner-dashboard works!"),s.Rb(),s.Sb(2,"p"),s.uc(3),s.Rb(),s.Sb(4,"button",0),s.Zb("click",function(){return n.signOut()}),s.uc(5,"Sign Out"),s.Rb()),2&t&&(s.Bb(3),s.vc("email is : ",n.userEmail,""))},styles:[""]}),t})()}];let b=(()=>{class t{}return t.\u0275mod=s.Kb({type:t}),t.\u0275inj=s.Jb({factory:function(n){return new(n||t)},imports:[[o.j.forChild(a)],o.j]}),t})(),l=(()=>{class t{}return t.\u0275mod=s.Kb({type:t}),t.\u0275inj=s.Jb({factory:function(n){return new(n||t)},imports:[[i.c,b]]}),t})()}}]);