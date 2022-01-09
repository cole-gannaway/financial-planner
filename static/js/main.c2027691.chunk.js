(this["webpackJsonpfinancial-planner"]=this["webpackJsonpfinancial-planner"]||[]).push([[0],{152:function(e,t,a){},160:function(e,t,a){},165:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(19),o=a.n(c),i=(a(152),a(15)),u=a(81),s=function(){return Object(u.b)()},l=u.c,d=a(49),f=a(68),b=Object(d.b)({name:"expenses",initialState:{},reducers:{addExpense:function(e,t){var a=Object(f.uuid)();if(t.payload)e[a]=t.payload;else{var n={label:"",date:Date.now(),amount:0,frequency:"once"};e[a]=n}},bulkAddExpenses:function(e,t){t.payload.forEach((function(t){var a=Object(f.uuid)();e[a]=t}))},updateExpense:function(e,t){var a=e[t.payload.id],n=t.payload.expense;void 0!==n.amount&&(a.amount=n.amount),void 0!==n.date&&(a.date=n.date),void 0!==n.frequency&&(a.frequency=n.frequency),void 0!==n.label&&(a.label=n.label)},removeExpense:function(e,t){delete e[t.payload.id]}}}),j=b.actions,p=j.addExpense,h=j.bulkAddExpenses,g=j.updateExpense,v=j.removeExpense,m=function(e){return e.expenses},x=b.reducer,O=Object(d.b)({name:"wage",initialState:{},reducers:{addWage:function(e,t){var a=Object(f.uuid)();if(t.payload)e[a]=t.payload;else{var n={label:"",date:Date.now(),amount:0,frequency:"once"};e[a]=n}},bulkAddWages:function(e,t){t.payload.forEach((function(t){var a=Object(f.uuid)();e[a]=t}))},updateWage:function(e,t){var a=e[t.payload.id],n=t.payload.wage;void 0!==n.amount&&(a.amount=n.amount),void 0!==n.date&&(a.date=n.date),void 0!==n.frequency&&(a.frequency=n.frequency),void 0!==n.label&&(a.label=n.label)},removeWage:function(e,t){delete e[t.payload.id]}}}),y=O.actions,w=y.addWage,E=y.bulkAddWages,M=y.updateWage,C=y.removeWage,k=function(e){return e.wages},D=O.reducer;a(160);function R(e){var t=e[0],a=parseInt(e[1]),n=parseFloat(e[2]),r=e[3];return{label:t,date:isNaN(a)?-1:a,amount:isNaN(n)?-1:n,frequency:r}}var T=a(59),q=a(243),A=a(229),W=a(244),F=a(250),S=a(2);function I(e){return Object(S.jsx)(A.b,{dateAdapter:q.a,children:Object(S.jsx)(W.a,{label:e.label,inputFormat:"MM/dd/yyyy",value:e.value,onChange:function(t){t&&e.onChange(t.getTime())},renderInput:function(e){return Object(S.jsx)(F.a,Object(T.a)({},e))}})})}var Y=a(257),N=a(256),B=a(127),H=a.n(B),J=a(249),X=a(245),L=a(264),P=a(246);function $(e){return Object(S.jsxs)(N.a,{children:[Object(S.jsx)(Y.a,{className:"label-form",children:Object(S.jsx)(X.a,{variant:"outlined",value:e.data.label,onChange:function(t){return e.updateRow(e.uuid,{label:t.target.value})}})}),Object(S.jsx)(Y.a,{className:"label-date",children:Object(S.jsx)(I,{value:e.data.date,onChange:function(t){return e.updateRow(e.uuid,{date:t})}})}),Object(S.jsx)(Y.a,{children:Object(S.jsx)(X.a,{type:"number",variant:"outlined",value:e.data.amount,onChange:function(t){var a=parseFloat(t.target.value);a&&e.updateRow(e.uuid,{amount:a})}})}),Object(S.jsx)(Y.a,{children:Object(S.jsx)(L.a,{fullWidth:!0,children:Object(S.jsxs)(P.a,{value:e.data.frequency,onChange:function(t){return e.updateRow(e.uuid,{frequency:t.target.value})},children:[Object(S.jsx)(J.a,{value:"once",children:"Once"}),Object(S.jsx)(J.a,{value:"daily",children:"Daily"}),Object(S.jsx)(J.a,{value:"weekly",children:"Weekly"}),Object(S.jsx)(J.a,{value:"monthly",children:"Monthly"}),Object(S.jsx)(J.a,{value:"yearly",children:"Yearly"})]})})}),Object(S.jsx)(Y.a,{onClick:function(){return e.deleteRow(e.uuid)},children:Object(S.jsx)(H.a,{})})]})}var z=a(258),G=a(260),K=a(259),Q=a(253),U=a(129),V=a.n(U),Z=a(128);function _(e){return Object(S.jsxs)("div",{children:[Object(S.jsx)("div",{style:{textAlign:"center"},children:Object(S.jsxs)("h3",{children:[e.title," ",Object(S.jsx)(V.a,{onClick:function(){e.addRow()}})]})}),Object(S.jsx)("div",{style:{maxHeight:400,overflowX:"auto"},children:Object(S.jsxs)(z.a,{stickyHeader:!0,children:[Object(S.jsx)(K.a,{children:Object(S.jsxs)(N.a,{children:[Object(S.jsx)(Y.a,{children:"Label "}),Object(S.jsx)(Y.a,{children:"Date"}),Object(S.jsx)(Y.a,{children:"Amount"}),Object(S.jsx)(Y.a,{children:"Frequency"}),Object(S.jsx)(Y.a,{children:"X"})]})}),Object(S.jsx)(G.a,{children:Object.entries(e.data).map((function(t){var a=t[0],n=t[1];return Object(S.jsx)($,{uuid:a,data:n,addRow:e.addRow,updateRow:e.updateRow,deleteRow:e.deleteRow},a)}))})]})}),Object(S.jsx)("input",{type:"file",accept:".csv",onChange:function(t){if(t.target.files){var a=t.target.files[0],n=new FileReader;n.onload=function(t){var a,n=null===(a=t.target)||void 0===a?void 0:a.result;if(n){for(var r=Object(Z.parse)(n.toString()),c=[],o=1;o<r.data.length;o++){var i=R(r.data[o]);c.push(i)}e.onImportComplete(c)}},n.readAsBinaryString(a)}}}),Object(S.jsx)(Q.a,{onClick:function(){var t=e.title,a="data:text/csv;charset=utf-8,"+function(e){var t=e.map((function(e){var t=[];return t.push(e.label),t.push(e.date.toString()),t.push(e.amount.toString()),t.push(e.frequency),t}));return t.unshift(["label","date","amount","frequency"]),t}(Object.values(e.data)).map((function(e){return e.join(",")})).join("\n"),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",t+".csv"),n.click(),n.remove()},children:"Export"})]})}a(163);var ee=a(33),te=new Date;te.setDate(te.getDate()+7);var ae={expenses:[],wages:[],finances:[],aggregateOption:"day",startTimeMs:Date.now(),endTimeMs:te.getTime()},ne=Object(d.b)({name:"chart",initialState:ae,reducers:{setChartData:function(e,t){t.payload.expenses&&(e.expenses=t.payload.expenses),t.payload.finances&&(e.finances=t.payload.finances),t.payload.wages&&(e.wages=t.payload.wages)},setAgggregateOption:function(e,t){e.aggregateOption=t.payload},setStartTimeMs:function(e,t){e.startTimeMs=t.payload},setEndTimeMs:function(e,t){e.endTimeMs=t.payload}}}),re=ne.actions,ce=re.setChartData,oe=re.setAgggregateOption,ie=re.setStartTimeMs,ue=re.setEndTimeMs,se=function(e){return e.chart.expenses},le=function(e){return e.chart.wages},de=function(e){return e.chart.finances},fe=function(e){return e.chart.aggregateOption},be=function(e){return e.chart.startTimeMs},je=function(e){return e.chart.endTimeMs},pe=ne.reducer,he=6048e5;function ge(e,t){var a;switch(t){case"year":var n=new Date("1-1-1970"),r=Number.parseInt(e);n.setFullYear(r),a=n;break;case"month":case"day":a=new Date(e)}return a}function ve(e){var t=e+1;return t<10?"0"+t.toString():t.toString()}function me(e,t,a){var n=new Date(e.date),r=[];if("once"!==e.frequency&&a>t)for(var c=n.getTime();!(c>a);)c>=t&&r.push({date:n.getTime(),amount:e.amount}),xe(e.frequency,n),c=n.getTime();else r.push({date:n.getTime(),amount:e.amount});return r}function xe(e,t){switch(e){case"daily":t.setDate(t.getDate()+1);break;case"weekly":t.setDate(t.getDate()+7);break;case"monthly":t.setMonth(t.getMonth()+1);break;case"yearly":t.setFullYear(t.getFullYear()+1)}}function Oe(e,t){var a=new Map;return e.forEach((function(e){var n=function(e,t){switch(t){case"year":return""+e.getFullYear();case"month":return e.getFullYear()+"/"+ve(e.getMonth());case"day":return e.getFullYear()+"/"+ve(e.getMonth())+"/"+e.getDate()}}(new Date(e.date),t);if(n){var r=a.get(n),c=r||0;a.set(n,c+e.amount)}})),a}var ye=a(251);ee.a.register(ee.b,ee.c,ee.d,ee.f,ee.e,ee.g,ee.h,ee.i);var we={type:"line",data:{datasets:[{label:"Wallet",fill:!0,backgroundColor:"rgb(150, 105, 25, 0.8)",borderColor:"rgb(150, 105, 25, 1)",data:[]},{label:"Income",fill:!0,backgroundColor:"rgba(63, 195, 128, 0.8)",borderColor:"rgba(63, 195, 128, 1)",data:[]},{label:"Expenses",fill:!0,backgroundColor:"rgba(255, 99, 132, 0.8)",borderColor:"rgba(255, 99, 132, 1)",data:[]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Finances"}},scales:{x:{type:"time",distribution:"series"},y:{type:"linear"}}}};function Ee(){var e=s(),t=Object(n.useRef)(null),a=Object(n.useRef)(null),r=l(m),c=l(k),o=l(be),u=l(je),d=l(se),f=l(de),b=l(le),j=l(fe);return Object(n.useEffect)((function(){return t&&t.current&&(a.current=new ee.a(t.current,we)),function(){a&&a.current&&a.current.destroy()}}),[t]),Object(n.useEffect)((function(){if(a&&a.current){var e=f.map((function(e){return{x:new Date(e.date),y:e.amount}})),t=b.map((function(e){return{x:new Date(e.date),y:e.amount}})),n=d.map((function(e){return{x:new Date(e.date),y:e.amount}}));a.current.data.datasets[0].data=e,a.current.data.datasets[1].data=t,a.current.data.datasets[2].data=n,a.current.update()}return function(){}}),[d,b,f,j]),Object(n.useEffect)((function(){var t=function(e,t,a,n,r){var c=[],o=[];e.forEach((function(e){return c.push.apply(c,Object(i.a)(me(e,a,n)))})),t.forEach((function(e){return o.push.apply(o,Object(i.a)(me(e,a,n)))}));var u=Oe(c,r),s=Oe(o,r),l=[],d=[];u.forEach((function(e,t){var a=ge(t,r);l.push({date:a.getTime(),amount:e})})),s.forEach((function(e,t){var a=ge(t,r);d.push({date:a.getTime(),amount:e})})),l.sort((function(e,t){return e.date-t.date})),d.sort((function(e,t){return e.date-t.date}));var f=Oe([].concat(l,d),r),b=[];f.forEach((function(e,t){var a=ge(t,r);b.push({date:a.getTime(),amount:e})})),b.sort((function(e,t){return e.date-t.date}));var j=0;return b.forEach((function(e){j+=e.amount,e.amount=j})),{expenses:l,wages:d,finances:b}}(Object.values(r),Object.values(c),o,u,j);e(ce({expenses:t.expenses,wages:t.wages,finances:t.finances}))}),[e,c,r,j,o,u]),Object(S.jsxs)("div",{children:[Object(S.jsxs)("div",{style:{minWidth:500},children:[Object(S.jsx)(I,{value:o,label:"Start Time",onChange:function(t){e(ie(t))}}),Object(S.jsx)(I,{value:u,label:"End Time",onChange:function(t){e(ue(t))}}),Object(S.jsxs)(L.a,{children:[Object(S.jsx)(ye.a,{id:"aggregate-by-label",children:"Aggregate"}),Object(S.jsxs)(P.a,{labelId:"aggregate-by-label",id:"aggregate-by",label:"Aggregate",value:j,onChange:function(t){var a=t.target.value;e(oe(a))},children:[Object(S.jsx)(J.a,{value:"day",children:"Day"}),Object(S.jsx)(J.a,{value:"month",children:"Month"}),Object(S.jsx)(J.a,{value:"year",children:"Year"})]})]})]}),Object(S.jsx)("div",{children:Object(S.jsx)("canvas",{ref:t})})]})}var Me=function(){var e=l(m),t=l(k),a=s();return Object(S.jsxs)("div",{children:[Object(S.jsx)("div",{style:{textAlign:"center"},children:Object(S.jsx)("h1",{children:"Financial Planner"})}),Object(S.jsx)(Ee,{}),Object(S.jsx)(_,{title:"Income",data:t,addRow:function(e){a(w(e||null))},updateRow:function(e,t){a(M({id:e,wage:t}))},deleteRow:function(e){a(C({id:e}))},onImportComplete:function(e){var t=Object.values(e).map((function(e){return e.date})),n=Math.min.apply(Math,Object(i.a)(t)),r=Math.max.apply(Math,Object(i.a)(t));a(E(e)),a(ie(n)),a(ue(r-n>he?r:n+he))}}),Object(S.jsx)(_,{title:"Expenses",data:e,addRow:function(e){a(p(e||null))},updateRow:function(e,t){a(g({id:e,expense:t}))},deleteRow:function(e){a(v({id:e}))},onImportComplete:function(e){var t=Object.values(e).map((function(e){return e.date})),n=Math.min.apply(Math,Object(i.a)(t)),r=Math.max.apply(Math,Object(i.a)(t));a(h(e)),a(ie(n)),a(ue(r-n>he?r:n+he))}})]})},Ce=Object(d.a)({reducer:{expenses:x,wages:D,chart:pe}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(S.jsx)(r.a.StrictMode,{children:Object(S.jsx)(u.a,{store:Ce,children:Object(S.jsx)(Me,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[165,1,2]]]);
//# sourceMappingURL=main.c2027691.chunk.js.map