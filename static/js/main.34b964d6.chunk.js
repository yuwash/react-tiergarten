(this.webpackJsonptiergarten=this.webpackJsonptiergarten||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(6),a=n.n(c),i=n(1),s=n(0),l=function(e){var t=e.children;return Object(s.jsx)("div",{className:"large-emoji",children:t})},u=function(e){return Object(s.jsx)("div",{className:"ui labeled icon compact menu",children:Object.entries(e.config.participantTypes).map((function(t){var n=Object(i.a)(t,2),r=n[0],c=n[1];return Object(s.jsxs)("a",{className:"item add-{participantType}",onClick:e.handleClick(r),children:[Object(s.jsx)(l,{children:c.emoji}),c.label,Object(s.jsx)("div",{className:"ui top right attached label",children:e.state[r]})]},r)}))})},o={participantTypes:{rabbit:{label:"Hase",emoji:"\ud83d\udc07",requirements:{legs:4,shirts:1}},cricket:{label:"Grille",emoji:"\ud83e\udd97",requirements:{legs:6,shirts:0}},octopus:{label:"Oktopus",emoji:"\ud83d\udc19",requirements:{legs:8,shirts:0}}}},j=n(5),b=n(3),d={persons:"Stirnb\xe4nder",legs:"Socken",shirts:"T-Shirts (leider nur f\xfcr Hasen)"},p=[[0,0,1],[4,-.5,-2],[-3,.5,1]],h=function(e){return Object(b.jStat)(["rabbit","cricket","octopus"].map((function(t){var n=e[t].requirements;return["persons","legs","shirts"].map((function(e){return"persons"===e?1:n[e]}))}))).transpose()},O=function(e){return e<0?0:Math.floor(e)},m=function(e){return function(e){var t=Object(i.a)(e,3);return{rabbit:t[0],cricket:t[1],octopus:t[2]}}(Object(b.jStat)(p).multiply(function(e){return Object(b.jStat)([e.persons,e.legs,e.shirts]).transpose()}(e)).toArray().map(O))},f=function(e){var t=Object(r.useState)((function(){return Object.fromEntries(Object.keys(d).map((function(e){return[e,""]})))})),n=Object(i.a)(t,2),c=n[0],a=n[1],l=function(e){var t=Object.assign({},c);t[e.target.name]=e.target.value,a(t)};return Object(s.jsxs)("form",{class:"ui form",onSubmit:function(t){var n=m(c);console.log("submit",c,n),e.updateValues(n),t.preventDefault()},children:[Object(s.jsx)("div",{class:"fields",children:Object.entries(c).map((function(t){var n=Object(i.a)(t,2),r=n[0],c=n[1];return Object(s.jsxs)("div",{class:"field",children:[Object(s.jsx)("label",{children:d[r]}),Object(s.jsx)("input",{type:"number",min:"0",required:!0,name:r,placeholder:e.materialCounts[r],value:c,onChange:l})]},r)}))}),Object(s.jsx)("button",{class:"ui button",type:"submit",children:"Teilnehmer*innenzahlen erraten"})]})},v=function(e,t){return function(e){var t=Object(i.a)(e,3);return{persons:t[0],legs:t[1],shirts:t[2]}}(h(t).multiply(function(e){return Object(b.jStat)([e.rabbit,e.cricket,e.octopus]).transpose()}(e)).toArray().map(Math.floor))},g=function(e){var t=e.config.participantTypes;console.log("mat",h(t));var n=v(e.state,t),r={rabbit:{onClick:e.handleDelete("rabbit")},cricket:{onClick:e.handleDelete("cricket")},octopus:{onClick:e.handleDelete("octopus")}},c=Object.entries(e.state).reduce((function(e,n){var c=Object(i.a)(n,2),a=c[0],l=c[1];return e.concat(function(e,t,n,r){return Array.from(Array(t).entries()).map((function(t){var c=Object(i.a)(t,2),a=c[0];return c[1],Object(s.jsx)("a",Object(j.a)(Object(j.a)({"data-tooltip":"entfernen",alt:n.label},r),{},{children:n.emoji}),e+a)}))}(a,l,t[a],r[a]))}),[]),a=c.length?c:"leerer Tiergarten\u2026";return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{class:"ui card",children:[Object(s.jsx)("div",{class:"image",children:Object(s.jsx)("div",{class:"tiergarten",children:a})}),Object(s.jsxs)("div",{class:"content",children:[Object(s.jsx)("h2",{class:"header",children:"Ben\xf6tigte Materialien"}),Object.entries(n).map((function(e){var t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(s.jsxs)("div",{class:"ui tiny horizontal statistic",children:[Object(s.jsx)("div",{class:"value",children:r}),Object(s.jsx)("div",{class:"label",children:d[n]})]},n)}))]}),Object(s.jsxs)("div",{class:"content",children:[Object(s.jsx)("h2",{class:"header",children:"Materialien schon da?"}),Object(s.jsx)(f,{materialCounts:n,updateValues:e.updateValues})]})]})})},x=(n(12),n(13),function(e){return Object.fromEntries(Object.keys(e.participantTypes).map((function(e){return[e,0]})))}),y=function(e,t){var n=Object.assign({},e);switch(t.type){case"update":return Object.assign(n,t.values),n;case"add":return n[t.participantType]+=1,n;case"delete":return n[t.participantType]-=1,n}},k=function(){var e=Object(r.useState)(o),t=Object(i.a)(e,2),n=t[0],c=(t[1],Object(r.useReducer)(y,n,x)),a=Object(i.a)(c,2),l=a[0],j=a[1];return Object(s.jsxs)("div",{className:"ui container",children:[Object(s.jsx)("h1",{className:"ui header",children:"Tiergarten"}),Object(s.jsx)("p",{className:"ui info message",children:"Klick auf die Teilnehmer*innen-Kn\xf6pfe, damit sie in den Tiergarten kommen!"}),Object(s.jsx)(u,{config:n,state:l,handleClick:function(e){return function(t){j({type:"add",participantType:e}),console.log(l)}}}),Object(s.jsx)(g,{config:n,state:l,updateValues:function(e){j({type:"update",values:e})},handleDelete:function(e){return function(t){j({type:"delete",participantType:e}),console.log(l)}}})]})};a.a.render(Object(s.jsx)(k,{}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.34b964d6.chunk.js.map