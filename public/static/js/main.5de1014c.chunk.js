(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{24:function(e,t,n){e.exports=n(56)},44:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var r=n(7),o=n.n(r);n(39);o.a.initializeApp({apiKey:"AIzaSyAb-8mhPN9X1aUeSu3EJ4mUBs96eqmy6h4",authDomain:"bus-arrival-dashboard.firebaseapp.com",projectId:"bus-arrival-dashboard"});var a=n(0),s=n.n(a),u=n(19),i=n.n(u),c=(n(44),n(3)),l=n(4),p=n(6),d=n(5),h=n(20),m=n.n(h),f=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).signOut=function(t){t.preventDefault(),e.props.signOut()},e}return Object(l.a)(n,[{key:"render",value:function(){var e=o.a.auth().currentUser,t=e.displayName,n=e.photoURL;return s.a.createElement("div",{className:"display-user"},s.a.createElement("img",{alt:"gravatar",src:n}),s.a.createElement("span",null,t),s.a.createElement("span",{className:"clickable",onClick:this.signOut},"Sign Out"))}}]),n}(s.a.Component),v=o.a.firestore(),b=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={groups:[]},e.handleGroupClick=function(t){console.log("group clicked"),e.props.handleGroupClick(t.target.dataset.id)},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=o.a.auth().currentUser.uid;this.unsubscribe=v.collection("users").doc(t).collection("groups").onSnapshot((function(t){e.setState({groups:t.docs})}))}},{key:"componentWillUnmount",value:function(){this.unsubscribe&&this.unsubscribe()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"tabs"},this.state.groups.map((function(t){return s.a.createElement("span",{className:e.props.selectedGroupId===t.id?"selected":null,onClick:e.handleGroupClick,key:t.id,"data-id":t.id},t.data().name)})),s.a.createElement("span",{className:this.props.admin?"selected":null,onClick:this.handleGroupClick,key:"admin-tab","data-id":"admin"},"Admin"))}}]),n}(s.a.Component),g=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={groups:[]},e}return Object(l.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"navigation"},s.a.createElement("div",{className:"title"},"Bus Arrivals"),this.props.isSignedIn?s.a.createElement(f,{isSignedIn:this.props.isSignedIn,signOut:this.props.signOut}):null,this.props.isSignedIn?s.a.createElement(b,{admin:this.props.admin,selectedGroupId:this.props.selectedGroupId,handleGroupClick:this.props.handleGroupClick}):null)}}]),n}(s.a.Component),I=n(15),y=n(22),O=n(11);var S=function(e){var t=function(t){e.handleDirectionClick(t.target.dataset.id)};return s.a.createElement("div",null,s.a.createElement("p",null,"Direction"),s.a.createElement("ul",null,e.stopGroups.map((function(n,r){return s.a.createElement("li",{className:Number(e.directionIndex)===r?"selected":null,onClick:t,key:"direction-".concat(r),"data-id":r},n.name.name)}))))},k=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={groupStops:[]},e.handleStopClick=function(t){e.addStop(t.target.dataset.id)},e.addStop=function(t){console.log("crud");var n=o.a.auth().currentUser.uid,r=e.props.selectedGroupId;v.collection("users").doc(n).collection("groups").doc(r).collection("stops").add({stopId:t.target.dataset.id,busRouteId:e.props.busRouteId}).then((function(){console.log("stop added")}))},e.removeStop=function(t){console.log("remove stop");var n=o.a.auth().currentUser.uid,r=e.props.selectedGroupId,a=e.state.groupStops.find((function(n){return n.data().stopId===t.target.dataset.id&&n.data().busRouteId===e.props.busRouteId}));console.log(a.id),v.collection("users").doc(n).collection("groups").doc(r).collection("stops").doc(a.id).delete()},e.setGroupStops=function(){console.log("setGroupStops")},e.stopsArray=function(){var t=e.state.groupStops.map((function(e){return e.data().stopId}));return console.log(t),e.props.stopsForDirection},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=o.a.auth().currentUser.uid;this.unsubscribe=v.collection("users").doc(t).collection("groups").doc(this.props.selectedGroupId).collection("stops").where("busRouteId","==",this.props.busRouteId).onSnapshot((function(t){e.setState({groupStops:t.docs},(function(){return e.setGroupStops()}))}))}},{key:"componentWillUnmount",value:function(){this.unsubscribe&&this.unsubscribe()}},{key:"render",value:function(){var e=this,t=this.state.groupStops.map((function(e){return e.data().stopId}));return s.a.createElement("div",null,s.a.createElement("p",null,"Stops"),s.a.createElement("ul",null,this.props.stopsForDirection.map((function(n,r){return s.a.createElement("li",{className:t.includes(n.id)?"selected":null,onClick:t.includes(n.id)?e.removeStop:e.addStop,key:"stop-".concat(r),"data-id":n.id},n.name)}))))}}]),n}(s.a.Component),G=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={newGroupName:"",groups:[]},e.handleGroupChange=function(t){e.setState({newGroupName:t.target.value})},e.handleGroupClick=function(t){e.props.handleGroupClick(t.target.dataset.id)},e.handleGroupBlur=function(t){""!==e.state.newGroupName&&e.addGroup()},e.addGroup=function(t){var n=o.a.auth().currentUser.uid;v.collection("users").doc(n).collection("groups").add({name:e.state.newGroupName}).then((function(){e.setState({newGroupName:""})}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=o.a.auth().currentUser.uid;this.unsubscribe=v.collection("users").doc(t).collection("groups").onSnapshot((function(t){e.setState({groups:t.docs})}))}},{key:"componentWillUnmount",value:function(){this.unsubscribe&&this.unsubscribe()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("p",null,"Group"),s.a.createElement("ul",null,this.state.groups.map((function(t){return s.a.createElement("li",{className:e.props.selectedGroupId===t.id?"selected":null,onClick:e.handleGroupClick,key:t.id,"data-id":t.id},t.data().name)}))),s.a.createElement("input",{type:"text",id:"group-name",name:"group-name",onChange:this.handleGroupChange,onBlur:this.handleGroupBlur}))}}]),n}(s.a.Component),j=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).handleBusNumberChange=function(t){e.props.handleBusNumberChange(t.target.value)},e}return Object(l.a)(n,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("p",null,"Bus"),s.a.createElement("input",{type:"text",id:"bus-number",name:"bus-number",value:this.props.busNumber,required:!0,onChange:this.handleBusNumberChange}))}}]),n}(s.a.Component),E=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).componentDidMount=function(){r.fetchRoutesForAgency()},r.fetchRoutesForAgency=function(){var e=this;fetch("/api/v1/routes").then((function(e){return e.json()})).then((function(t){e.setRoutesForAgency(t.data)})).catch((function(e){console.log("Error while fetching test datas",e)}))},r.fetchStopsForRoute=function(){console.log("fetch stops",r.state.busRouteId),fetch("/api/v1/routes/".concat(r.state.busRouteId,"/stops")).then((function(e){return e.json()})).then((function(e){console.log(e),r.setStopsByBusRouteId(e.data)})).catch((function(e){console.log("Error while fetching test datas",e)}))},r.setRoutesForAgency=function(e){var t=e.list,n=e.references;console.log(t,n),r.setState({routesForAgency:t})},r.setStopsByBusRouteId=function(e){var t=r.state.busRouteId;console.log(e),r.setState({stopsByBusRouteId:Object(y.a)(Object(I.a)({},t,e),r.state.stopsByBusRouteId)})},r.filterRoutesByShortName=function(){var e=r.state.routesForAgency.find((function(e){return e.shortName==r.state.busNumber}));console.log(e),e?r.setState({busRouteId:e.id},(function(){r.fetchStopsForRoute()})):r.setState({busRouteId:""})},r.stopGroups=function(){var e=r.state,t=e.busRouteId,n=(e.stopsByBusRouteId[t]||[]).entry;if(n)return n.stopGroupings[0].stopGroups},r.state={busNumber:"",busRouteId:"",routesForAgency:[],stopsByBusRouteId:{},directionIndex:-1,selectedGroupId:""},r.handleBusNumberChange=r.handleBusNumberChange.bind(Object(O.a)(r)),r.fetchRoutesForAgency=r.fetchRoutesForAgency.bind(Object(O.a)(r)),r.fetchStopsForRoute=r.fetchStopsForRoute.bind(Object(O.a)(r)),r.handleDirectionClick=r.handleDirectionClick.bind(Object(O.a)(r)),r.handleGroupClick=r.handleGroupClick.bind(Object(O.a)(r)),r}return Object(l.a)(n,[{key:"handleFormSubmit",value:function(e){e.preventDefault()}},{key:"handleBusNumberChange",value:function(e){var t=this;this.setState({directionIndex:-1,busNumber:e},(function(){return t.filterRoutesByShortName()}))}},{key:"handleGroupClick",value:function(e){this.setState({selectedGroupId:e,busNumber:"",busRouteId:"",directionIndex:-1})}},{key:"handleDirectionClick",value:function(e){console.log("direction",e),this.setState({directionIndex:e})}},{key:"stopsForDirection",value:function(){var e=this.stopGroups(),t=this.state.directionIndex;if(t>=0){var n=e[t].stopIds,r=this.state,o=r.busRouteId;return(r.stopsByBusRouteId[o]||[]).references.stops.filter((function(e){return n.includes(e.id)}))}}},{key:"render",value:function(){var e=this.stopGroups(),t=this.stopsForDirection();return s.a.createElement("form",{className:"add-bus-form",onSubmit:this.handleFormSubmit,method:"post"},s.a.createElement(G,{groupList:this.state.groups,handleGroupClick:this.handleGroupClick,selectedGroupId:this.state.selectedGroupId}),""!==this.state.selectedGroupId?s.a.createElement(j,{busNumber:this.state.busNumber,handleBusNumberChange:this.handleBusNumberChange}):this.state.selectedGroupId,e?s.a.createElement(S,{stopGroups:e,handleDirectionClick:this.handleDirectionClick,directionIndex:this.state.directionIndex}):null,t?s.a.createElement(k,{busRouteId:this.state.busRouteId,selectedGroupId:this.state.selectedGroupId,stopsForDirection:t}):null)}}]),n}(s.a.Component),C=n(23),R=n.n(C),N=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).arrivalTime=function(){var t=e.props.arrival,n=t.scheduledArrivalTime,r=t.predictedArrivalTime;return Math.max(n,r)},e.minutesToArrival=function(){var t=e.props.now,n=e.arrivalTime();return Math.floor((n-t)/6e4)},e.classNameList=function(){var t=e.minutesToArrival(),n=[];return e.props.arrival.predicted||n.push("scheduled"),t<1?n.push("past"):t<6?n.push("warning"):t<11&&n.push("soon"),n.join(" ")},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.arrival,t=this.minutesToArrival(),n=this.classNameList();return s.a.createElement("tr",{className:n},s.a.createElement("td",null,e.routeShortName),s.a.createElement("td",{className:"time-column"},"".concat(t," min")))}}]),n}(s.a.Component),A=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this;this.props.arrivalsForBusRoutes;return s.a.createElement("table",{className:"arrivals",cellSpacing:0},s.a.createElement("tbody",null,this.props.arrivalsForBusRoutes.map((function(t,n){return s.a.createElement(N,{arrival:t,now:e.props.now})}))))}}]),n}(s.a.Component),B=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={arrivalsForStop:[]},e.componentDidMount=function(){e.fetchArrivalsForStop()},e.fetchArrivalsForStop=function(){var e=this;fetch("/api/v1/stops/".concat(this.props.stopId,"/arrivals")).then((function(e){return e.json()})).then((function(t){e.setArrivalsForStop(t.data)})).catch((function(e){console.log("Error while fetching test datas",e)}))},e.setArrivalsForStop=function(t){console.log(t),e.setState({arrivalsForStop:t})},e.stopLabel=function(){var t=e.state.arrivalsForStop.references;if(!t)return"retrieving information for stop ".concat(e.props.stopId,"...");var n=t.stops.find((function(t){return t.id===e.props.stopId}));return"".concat(n.name," - ").concat(n.direction)},e.busRouteIds=function(){return e.props.busRouteIds.map((function(e){return e.data().busRouteId}))},e.arrivalsForBusRoutes=function(){var t=e.state.arrivalsForStop.entry;if(!t)return[];var n=t.arrivalsAndDepartures,r=e.busRouteIds();return n.filter((function(e){return r.includes(e.routeId)}))},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.stopLabel(),t=this.arrivalsForBusRoutes(),n=Date.now();return s.a.createElement("div",{className:"arrival-card"},s.a.createElement("h2",null,e),t&&t.length>0?s.a.createElement(A,{arrivalsForBusRoutes:t,now:n}):s.a.createElement("p",null,"no arrival details found"))}}]),n}(s.a.Component),w=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={stops:[]},e.componentDidUpdate=function(t,n){t.selectedGroupId!==e.props.selectedGroupId&&e.getStops()},e.getStops=function(){var t=o.a.auth().currentUser.uid;console.log(t,e.props.selectedGroupId),v.collection("users").doc(t).collection("groups").doc(e.props.selectedGroupId).collection("stops").get().then((function(t){e.setState({stops:t.docs})}))},e.busesByStop=function(){return R.a.groupBy(e.state.stops,(function(e){return e.data().stopId}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.getStops()}},{key:"render",value:function(){var e=this.busesByStop();return console.log(e),s.a.createElement("div",{className:"arrivals"},Object.keys(e).map((function(t,n){return s.a.createElement(B,{key:"".concat(t,"-").concat(n),stopId:t,busRouteIds:e[t]})})))}}]),n}(s.a.PureComponent),F=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return s.a.createElement("div",null,this.props.admin?s.a.createElement(E,null):null,""!==this.props.selectedGroupId?s.a.createElement(w,{selectedGroupId:this.props.selectedGroupId}):null)}}]),n}(s.a.Component),D=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={isSignedIn:!1,selectedGroupId:"",admin:!1},e.uiConfig={signInFlow:"popup",signInOptions:[o.a.auth.GoogleAuthProvider.PROVIDER_ID]},e.signOut=function(){o.a.auth().signOut()},e.handleGroupClick=function(t){console.log(t),"admin"===t?e.setState({admin:!0,selectedGroupId:""}):e.setState({admin:!1,selectedGroupId:t})},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.unregisterAuthObserver=o.a.auth().onAuthStateChanged((function(t){e.setState({isSignedIn:!!t})}))}},{key:"componentWillUnmount",value:function(){this.unregisterAuthObserver&&this.unregisterAuthObserver()}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(g,{isSignedIn:this.state.isSignedIn,signOut:this.signOut,handleGroupClick:this.handleGroupClick,admin:this.state.admin,selectedGroupId:this.state.selectedGroupId}),this.state.isSignedIn?s.a.createElement(F,{admin:this.state.admin,selectedGroupId:this.state.selectedGroupId}):s.a.createElement(m.a,{uiConfig:this.uiConfig,firebaseAuth:o.a.auth()}))}}]),n}(s.a.Component);n(54),n(55);var U=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(D,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.5de1014c.chunk.js.map