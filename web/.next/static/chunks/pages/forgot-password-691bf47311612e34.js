(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[742],{4612:function(n,k,c){"use strict";c.d(k,{II:function(){return d}});var o=c(9762),a=c(1604),b=c(4592),p=c(7294),q=c(6450);function r(){return(r=Object.assign?Object.assign.bind():function(d){for(var a=1;a<arguments.length;a++){var b=arguments[a];for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(d[c]=b[c])}return d}).apply(this,arguments)}function s(c,f){if(null==c)return{};var a,b,d={},e=Object.keys(c);for(b=0;b<e.length;b++)a=e[b],f.indexOf(a)>=0||(d[a]=c[a]);return d}var t=["htmlSize"],d=(0,a.Gp)(function(c,e){var f=c.htmlSize,d=s(c,t),g=(0,a.jC)("Input",d),h=(0,a.Lr)(d),i=(0,o.Yp)(h),j=(0,b.cx)("chakra-input",c.className);return p.createElement(a.m$.input,r({size:f},i,{__css:g.field,ref:e,className:j}))});b.Ts&&(d.displayName="Input"),d.id="Input";var u=["children","className"],e=(0,a.eC)("InputGroup"),v=e[0],w=e[1],l=(0,a.Gp)(function(d,g){var e=(0,a.jC)("Input",d),c=(0,a.Lr)(d),h=c.children,i=c.className,j=s(c,u),k=(0,b.cx)("chakra-input__group",i),m={},f=(0,q.WR)(h),n=e.field;f.forEach(function(a){var b,c;e&&(n&&"InputLeftElement"===a.type.id&&(m.paddingStart=null!=(b=n.height)?b:n.h),n&&"InputRightElement"===a.type.id&&(m.paddingEnd=null!=(c=n.height)?c:n.h),"InputRightAddon"===a.type.id&&(m.borderEndRadius=0),"InputLeftAddon"===a.type.id&&(m.borderStartRadius=0))});var l=f.map(function(a){var c,e,f=(0,b.YU)({size:(null==(c=a.props)?void 0:c.size)||d.size,variant:(null==(e=a.props)?void 0:e.variant)||d.variant});return"Input"!==a.type.id?p.cloneElement(a,f):p.cloneElement(a,Object.assign(f,m,a.props))});return p.createElement(a.m$.div,r({className:k,ref:g,__css:{width:"100%",display:"flex",position:"relative"}},j),p.createElement(v,{value:e},l))});b.Ts&&(l.displayName="InputGroup");var x=["placement"],y={left:{marginEnd:"-1px",borderEndRadius:0,borderEndColor:"transparent"},right:{marginStart:"-1px",borderStartRadius:0,borderStartColor:"transparent"}},z=(0,a.m$)("div",{baseStyle:{flex:"0 0 auto",width:"auto",display:"flex",alignItems:"center",whiteSpace:"nowrap"}}),m=(0,a.Gp)(function(a,d){var b,c=a.placement,e=s(a,x),f=null!=(b=y[void 0===c?"left":c])?b:{},g=w();return p.createElement(z,r({ref:d},e,{__css:r({},g.addon,f)}))});b.Ts&&(m.displayName="InputAddon");var f=(0,a.Gp)(function(a,c){return p.createElement(m,r({ref:c,placement:"left"},a,{className:(0,b.cx)("chakra-input__left-addon",a.className)}))});b.Ts&&(f.displayName="InputLeftAddon"),f.id="InputLeftAddon";var g=(0,a.Gp)(function(a,c){return p.createElement(m,r({ref:c,placement:"right"},a,{className:(0,b.cx)("chakra-input__right-addon",a.className)}))});b.Ts&&(g.displayName="InputRightAddon"),g.id="InputRightAddon";var A=["placement"],B=["className"],C=["className"],D=(0,a.m$)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0",zIndex:2}}),h=(0,a.Gp)(function(c,h){var d,e,b,f=c.placement,i=s(c,A),g=w(),a=g.field,j="left"===(void 0===f?"left":f)?"insetStart":"insetEnd",k=r(((b={})[j]="0",b.width=null!=(d=null==a?void 0:a.height)?d:null==a?void 0:a.h,b.height=null!=(e=null==a?void 0:a.height)?e:null==a?void 0:a.h,b.fontSize=null==a?void 0:a.fontSize,b),g.element);return p.createElement(D,r({ref:h,__css:k},i))});h.id="InputElement",b.Ts&&(h.displayName="InputElement");var i=(0,a.Gp)(function(a,c){var d=a.className,e=s(a,B),f=(0,b.cx)("chakra-input__left-element",d);return p.createElement(h,r({ref:c,placement:"left",className:f},e))});i.id="InputLeftElement",b.Ts&&(i.displayName="InputLeftElement");var j=(0,a.Gp)(function(a,c){var d=a.className,e=s(a,C),f=(0,b.cx)("chakra-input__right-element",d);return p.createElement(h,r({ref:c,placement:"right",className:f},e))});j.id="InputRightElement",b.Ts&&(j.displayName="InputRightElement")},7627:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forgot-password",function(){return c(8804)}])},8804:function(d,b,a){"use strict";a.r(b);var e=a(7568),f=a(603),g=a(1351),c=a(4051),h=a.n(c),i=a(5893),j=a(6252),k=a(8527),l=a(9762),m=a(4612),n=a(5193),o=a(2175),p=a(1163),q=a(7294),r=a(6277);b.default=function(a){var a=null!==a?a:(0,g.Z)(TypeError("Cannot destructure undefined")),b=(0,q.useState)(!1),d=b[0],s=b[1];(0,p.useRouter)();var c,t=(0,f.Z)((0,r.zN)(),1)[0];return(0,j.x)(),(0,i.jsx)(k.kC,{bg:"gray.100",justify:"center",h:"980px",children:(0,i.jsx)(o.J9,{initialValues:{email:""},onSubmit:(c=(0,e.Z)(h().mark(function a(b){return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t({variables:b});case 2:s(!0);case 3:case"end":return a.stop()}},a)})),function(a){return c.apply(this,arguments)}),children:function(a){var b=a.handleSubmit,c=a.isSubmitting;return d?(0,i.jsx)(k.xu,{children:"If an account with that Email ID exists, we sent you an email to reset password"}):(0,i.jsx)("form",{onSubmit:b,children:(0,i.jsx)(k.xu,{bg:"white",p:6,rounded:"md",w:80,h:"auto",mt:240,children:(0,i.jsxs)(k.gC,{spacing:10,align:"flex-start",children:[(0,i.jsxs)(l.NI,{children:[(0,i.jsx)(l.lX,{htmlFor:"email",children:"Email Address"}),(0,i.jsx)(o.gN,{as:m.II,id:"email",name:"email",type:"email",variant:"filled"})]}),(0,i.jsx)(n.zx,{type:"submit",colorScheme:"purple",width:"full",isLoading:c,children:"Reset Password"})]})})})}})})}},1351:function(c,a,b){"use strict";function d(a){throw a}b.d(a,{Z:function(){return d}})}},function(a){a.O(0,[460,277,774,888,179],function(){var b;return a(a.s=7627)}),_N_E=a.O()}])