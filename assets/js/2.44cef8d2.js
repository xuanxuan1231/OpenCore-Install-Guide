(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{258:function(t,e,a){},260:function(t,e){t.exports=function(t){return null==t}},263:function(t,e,a){},264:function(t,e,a){},265:function(t,e,a){},267:function(t,e,a){"use strict";a(258)},274:function(t,e,a){"use strict";a.r(e);var n=a(294),s=a(277),i=a(247);function r(t,e){return"group"===e.type&&e.children.some(e=>"group"===e.type?r(t,e):"page"===e.type&&Object(i.e)(t,e.path))}var o={name:"SidebarLinks",components:{SidebarGroup:n.default,SidebarLink:s.default},props:["items","depth","sidebarDepth","initialOpenGroupIndex"],data(){return{openGroupIndex:this.initialOpenGroupIndex||0}},watch:{$route(){this.refreshIndex()}},created(){this.refreshIndex()},methods:{refreshIndex(){const t=function(t,e){for(let a=0;a<e.length;a++){const n=e[a];if(r(t,n))return a}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive(t){return Object(i.e)(this.$route,t.regularPath)}}},l=a(10),u=Object(l.a)(o,(function(){var t=this,e=t._self._c;return t.items.length?e("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(a,n){return e("li",{key:n},["group"===a.type?e("SidebarGroup",{attrs:{item:a,open:n===t.openGroupIndex,collapsable:a.collapsable||a.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(n)}}}):e("SidebarLink",{attrs:{"sidebar-depth":t.sidebarDepth,item:a}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=u.exports},277:function(t,e,a){"use strict";a.r(e);var n=a(247);function s(t,e,a,n,s){const i={props:{to:e,activeClass:"",exactActiveClass:""},class:{active:n,"sidebar-link":!0}};return s>2&&(i.style={"padding-left":s+"rem"}),t("RouterLink",i,a)}function i(t,e,a,r,o,l=1){return!e||l>o?null:t("ul",{class:"sidebar-sub-headers"},e.map(e=>{const u=Object(n.e)(r,a+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[s(t,a+"#"+e.slug,e.title,u,e.level-1),i(t,e.children,a,r,o,l+1)])}))}var r={functional:!0,props:["item","sidebarDepth"],render(t,{parent:{$page:e,$site:a,$route:r,$themeConfig:o,$themeLocaleConfig:l},props:{item:u,sidebarDepth:c}}){const p=Object(n.e)(r,u.path),d="auto"===u.type?p||u.children.some(t=>Object(n.e)(r,u.basePath+"#"+t.slug)):p,h="external"===u.type?function(t,e,a){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[a,t("OutboundLink")])}(t,u.path,u.title||u.path):s(t,u.path,u.title||u.path,d),f=[e.frontmatter.sidebarDepth,c,l.sidebarDepth,o.sidebarDepth,1].find(t=>void 0!==t),b=l.displayAllHeaders||o.displayAllHeaders;if("auto"===u.type)return[h,i(t,u.children,u.basePath,r,f)];if((d||b)&&u.headers&&!n.d.test(u.path)){return[h,i(t,Object(n.c)(u.headers),u.path,r,f)]}return h}},o=(a(267),a(10)),l=Object(o.a)(r,void 0,void 0,!1,null,null,null);e.default=l.exports},279:function(t,e,a){},282:function(t,e,a){"use strict";a(263)},283:function(t,e,a){var n=a(12),s=a(5),i=a(11);t.exports=function(t){return"string"==typeof t||!s(t)&&i(t)&&"[object String]"==n(t)}},284:function(t,e,a){"use strict";a(264)},285:function(t,e,a){},286:function(t,e,a){"use strict";a(265)},287:function(t,e,a){},294:function(t,e,a){"use strict";a.r(e);var n=a(247),s={name:"SidebarGroup",components:{DropdownTransition:a(255).default},props:["item","open","collapsable","depth"],beforeCreate(){this.$options.components.SidebarLinks=a(274).default},methods:{isActive:n.e}},i=(a(286),a(10)),r=Object(i.a)(s,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-"+t.depth]},[t.item.path?e("RouterLink",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?e("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):e("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?e("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),e("DropdownTransition",[t.open||!t.collapsable?e("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,"sidebar-depth":t.item.sidebarDepth,"initial-open-group-index":t.item.initialOpenGroupIndex,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null);e.default=r.exports},295:function(t,e,a){"use strict";a.r(e);var n=a(260),s=a.n(n),i=a(247),r={name:"PageEdit",computed:{lastUpdated(){return this.$page.lastUpdated},lastUpdatedText(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink(){const t=s()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,{repo:e,docsDir:a="",docsBranch:n="master",docsRepo:i=e}=this.$site.themeConfig;return t&&i&&this.$page.relativePath?this.createEditLink(e,i,a,n,this.$page.relativePath):null},editLinkText(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink(t,e,a,n,s){if(/bitbucket.org/.test(e)){return e.replace(i.a,"")+"/src"+`/${n}/`+(a?a.replace(i.a,"")+"/":"")+s+`?mode=edit&spa=0&at=${n}&fileviewer=file-view-default`}if(/gitlab.com/.test(e)){return e.replace(i.a,"")+"/-/edit"+`/${n}/`+(a?a.replace(i.a,"")+"/":"")+s}return(i.i.test(e)?e:"https://github.com/"+e).replace(i.a,"")+"/edit"+`/${n}/`+(a?a.replace(i.a,"")+"/":"")+s}}},o=(a(282),a(10)),l=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("footer",{staticClass:"page-edit"},[t.editLink?e("div",{staticClass:"edit-link"},[e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),e("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?e("div",{staticClass:"last-updated"},[e("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null);e.default=l.exports},296:function(t,e,a){"use strict";a.r(e);a(93);var n=a(247),s=a(283),i=a.n(s),r=a(260),o=a.n(r),l={name:"PageNav",props:["sidebarItems"],computed:{prev(){return c(u.PREV,this)},next(){return c(u.NEXT,this)}}};const u={NEXT:{resolveLink:function(t,e){return p(t,e,1)},getThemeLinkConfig:({nextLinks:t})=>t,getPageLinkConfig:({frontmatter:t})=>t.next},PREV:{resolveLink:function(t,e){return p(t,e,-1)},getThemeLinkConfig:({prevLinks:t})=>t,getPageLinkConfig:({frontmatter:t})=>t.prev}};function c(t,{$themeConfig:e,$page:a,$route:s,$site:r,sidebarItems:l}){const{resolveLink:u,getThemeLinkConfig:c,getPageLinkConfig:p}=t,d=c(e),h=p(a),f=o()(h)?d:h;return!1===f?void 0:i()(f)?Object(n.k)(r.pages,f,s.path):u(a,l)}function p(t,e,a){const n=[];!function t(e,a){for(let n=0,s=e.length;n<s;n++)"group"===e[n].type?t(e[n].children||[],a):a.push(e[n])}(e,n);for(let e=0;e<n.length;e++){const s=n[e];if("page"===s.type&&s.path===decodeURIComponent(t.path))return n[e+a]}}var d=l,h=(a(284),a(10)),f=Object(h.a)(d,(function(){var t=this,e=t._self._c;return t.prev||t.next?e("div",{staticClass:"page-nav"},[e("p",{staticClass:"inner"},[t.prev?e("span",{staticClass:"prev"},[t._v("\n      ⟵\n      "),"external"===t.prev.type?e("a",{staticClass:"prev",attrs:{href:t.prev.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n\n        "),e("OutboundLink")],1):e("RouterLink",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n      ")])],1):t._e(),t._v(" "),t.next?e("span",{staticClass:"next"},["external"===t.next.type?e("a",{attrs:{href:t.next.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n\n        "),e("OutboundLink")],1):e("RouterLink",{attrs:{to:t.next.path}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n      ")]),t._v("\n      ⟶\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null);e.default=f.exports},301:function(t,e,a){"use strict";a(279)},303:function(t,e,a){"use strict";a(285)},304:function(t,e,a){"use strict";a(287)},337:function(t,e,a){"use strict";a.r(e);var n={name:"Home",components:{NavLink:a(252).default},computed:{data(){return this.$page.frontmatter},actionLink(){return{link:this.data.actionLink,text:this.data.actionText}}}},s=(a(301),a(10)),i=Object(s.a)(n,(function(){var t=this,e=t._self._c;return e("main",{staticClass:"home",attrs:{"aria-labelledby":null!==t.data.heroText?"main-title":null}},[e("header",{staticClass:"hero"},[t.data.heroImage?e("img",{attrs:{src:t.$withBase(t.data.heroImage),alt:t.data.heroAlt||"hero"}}):t._e(),t._v(" "),null!==t.data.heroText?e("h1",{attrs:{id:"main-title"}},[t._v("\n      "+t._s(t.data.heroText||t.$title||"Hello")+"\n    ")]):t._e(),t._v(" "),null!==t.data.tagline?e("p",{staticClass:"description"},[t._v("\n      "+t._s(t.data.tagline||t.$description||"Welcome to your VuePress site")+"\n    ")]):t._e(),t._v(" "),t.data.actionText&&t.data.actionLink?e("p",{staticClass:"action"},[e("NavLink",{staticClass:"action-button",attrs:{item:t.actionLink}})],1):t._e()]),t._v(" "),t.data.features&&t.data.features.length?e("div",{staticClass:"features"},t._l(t.data.features,(function(a,n){return e("div",{key:n,staticClass:"feature"},[e("h2",[t._v(t._s(a.title))]),t._v(" "),e("p",[t._v(t._s(a.details))])])})),0):t._e(),t._v(" "),e("Content",{staticClass:"theme-succinct-content custom"}),t._v(" "),t.data.footer?e("div",{staticClass:"footer"},[t._v("\n    "+t._s(t.data.footer)+"\n  ")]):t._e()],1)}),[],!1,null,null,null);e.default=i.exports},338:function(t,e,a){"use strict";a.r(e);var n=a(295),s=a(296),i={components:{PageEdit:n.default,PageNav:s.default},props:["sidebarItems"]},r=(a(303),a(10)),o=Object(r.a)(i,(function(){var t=this._self._c;return t("main",{staticClass:"page"},[this._t("top"),this._v(" "),t("Content",{staticClass:"theme-succinct-content"}),this._v(" "),t("PageEdit"),this._v(" "),t("PageNav",this._b({},"PageNav",{sidebarItems:this.sidebarItems},!1)),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null);e.default=o.exports},339:function(t,e,a){"use strict";a.r(e);var n=a(274),s=a(293),i={name:"Sidebar",components:{SidebarLinks:n.default,NavLinks:s.default},props:["items"]},r=(a(304),a(10)),o=Object(r.a)(i,(function(){var t=this._self._c;return t("aside",{staticClass:"sidebar"},[t("NavLinks"),this._v(" "),this._t("top"),this._v(" "),t("SidebarLinks",{attrs:{depth:0,items:this.items}}),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null);e.default=o.exports},563:function(t,e,a){"use strict";a.r(e);var n=a(337),s=a(556),i=a(338),r=a(339),o=a(247),l={name:"Layout",components:{Home:n.default,Page:i.default,Sidebar:r.default,Navbar:s.default},data:()=>({isSidebarOpen:!1}),computed:{shouldShowNavbar(){const{themeConfig:t}=this.$site,{frontmatter:e}=this.$page;return!1!==e.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar(){const{frontmatter:t}=this.$page;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems(){return Object(o.l)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses(){const t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted(){this.$router.afterEach(()=>{this.isSidebarOpen=!1})},methods:{toggleSidebar(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd(t){const e=t.changedTouches[0].clientX-this.touchStart.x,a=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(a)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}},u=a(10),c=Object(u.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?e("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),e("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),e("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("sidebar-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("sidebar-bottom")]},proxy:!0}],null,!0)}),t._v(" "),t.$page.frontmatter.home?e("Home"):e("Page",{attrs:{"sidebar-items":t.sidebarItems},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("page-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("page-bottom")]},proxy:!0}],null,!0)})],1)}),[],!1,null,null,null);e.default=c.exports}}]);