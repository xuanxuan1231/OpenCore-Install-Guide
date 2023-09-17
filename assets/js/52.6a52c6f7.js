(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{314:function(t,e,a){t.exports=a.p+"assets/img/populated-efi.8d46cc52.png"},389:function(t,e,a){t.exports=a.p+"assets/img/sample-location.9e091fb2.png"},390:function(t,e,a){t.exports=a.p+"assets/img/renamed.9b06868d.png"},391:function(t,e,a){t.exports=a.p+"assets/img/before-snapshot.f2dccade.png"},392:function(t,e,a){t.exports=a.p+"assets/img/after-snapshot.0dfaaf2b.png"},393:function(t,e,a){t.exports=a.p+"assets/img/duplicate.b628676a.png"},592:function(t,e,a){"use strict";a.r(e);var l=a(10),i=Object(l.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"config-plist-setup"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#config-plist-setup"}},[t._v("#")]),t._v(" config.plist Setup")]),t._v(" "),e("p",[t._v("Now that we've got all our Kexts(.kext), SSDTs(.aml) and firmware drivers(.efi), your USB should start to look something like this:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(314),alt:"Populated EFI folder"}})]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Note")]),t._v(": Your USB "),e("strong",[t._v("will look different")]),t._v(", everyone's system will have different requirements.")])]),t._v(" "),e("h2",{attrs:{id:"creating-your-config-plist"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#creating-your-config-plist"}},[t._v("#")]),t._v(" Creating your config.plist")]),t._v(" "),e("p",[t._v("First we'll want to grab the "),e("code",[t._v("Sample.plist")]),t._v(" from the "),e("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCorePkg"),e("OutboundLink")],1),t._v(", this will be located under the "),e("code",[t._v("Docs")]),t._v(" folder:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(389),alt:""}})]),t._v(" "),e("p",[t._v("Next lets move it onto our USB's EFI partition(will be called BOOT on Windows) under "),e("code",[t._v("EFI/OC/")]),t._v(", and rename it to config.plist:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(390),alt:""}})]),t._v(" "),e("h2",{attrs:{id:"adding-your-ssdts-kexts-and-firmware-drivers"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#adding-your-ssdts-kexts-and-firmware-drivers"}},[t._v("#")]),t._v(" Adding your SSDTs, Kexts and Firmware Drivers")]),t._v(" "),e("p",[t._v("For the rest of this guide, you're gonna need some form of plist editing. And for our guide, we'll be using ProperTree and GenSMBIOS to help automate some of the tedious work:")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/corpnewt/ProperTree",target:"_blank",rel:"noopener noreferrer"}},[t._v("ProperTree"),e("OutboundLink")],1),t._v(" "),e("ul",[e("li",[t._v("Universal plist editor")])])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/corpnewt/GenSMBIOS",target:"_blank",rel:"noopener noreferrer"}},[t._v("GenSMBIOS"),e("OutboundLink")],1),t._v(" "),e("ul",[e("li",[t._v("For generating our SMBIOS data")])])])]),t._v(" "),e("p",[t._v("Next, let's open ProperTree and edit our config.plist:")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("ProperTree.command")]),t._v(" "),e("ul",[e("li",[t._v("For macOS")]),t._v(" "),e("li",[t._v("Pro tip: there's a "),e("code",[t._v("buildapp.command")]),t._v(" utility in the "),e("code",[t._v("Scripts")]),t._v(" folder that lets you turn ProperTree into a dedicated app in macOS")])])]),t._v(" "),e("li",[e("code",[t._v("ProperTree.bat")]),t._v(" "),e("ul",[e("li",[t._v("For Windows")])])])]),t._v(" "),e("p",[t._v("Once ProperTree is running, open your config.plist by pressing "),e("strong",[t._v("Cmd/Ctrl + O")]),t._v(" and selecting the "),e("code",[t._v("config.plist")]),t._v(" file on your USB.")]),t._v(" "),e("p",[t._v("After the config is opened, press "),e("strong",[t._v("Cmd/Ctrl + Shift + R")]),t._v(' and point it at your EFI/OC folder to perform a "Clean Snapshot":')]),t._v(" "),e("ul",[e("li",[t._v("This will remove all the entries from the config.plist and then adds all your SSDTs, Kexts and Firmware drivers to the config")]),t._v(" "),e("li",[e("strong",[t._v("Cmd/Ctrl + R")]),t._v(" is another option that will add all your files as well but will leave entries disabled if they were set like that before, useful for when you're troubleshooting but for us not needed right now")])]),t._v(" "),e("p",[e("img",{attrs:{src:a(391),alt:""}})]),t._v(" "),e("p",[t._v("Once done, you'll see your SSDTs, Kexts and firmware drivers populated in the config.plist:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(392),alt:""}})]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Note:")]),t._v(' If you get a pop up "Disable the following kexts with Duplicate CFBundleIdentifiers?", press "Yes". This is to ensure you don\'t have duplicate kexts being injected, as some kexts may have some of the same plugins(ie. VoodooInput is in both VoodooPS2 and VoodooI2C\'s plugin folder)')])]),t._v(" "),e("p",[e("img",{attrs:{src:a(393),alt:""}})]),t._v(" "),e("p",[t._v("If you wish to clean up the file a bit, you can remove the "),e("code",[t._v("#WARNING")]),t._v(" entries. Though they cause no issues staying there, so up to personal preference.")]),t._v(" "),e("div",{staticClass:"custom-block danger"},[e("p",{staticClass:"custom-block-title"},[t._v("DANGER")]),t._v(" "),e("p",[t._v("The config.plist "),e("strong",[t._v("must")]),t._v(" match the contents of the EFI folder. If you delete a file but leave it listed in the Config.plist, OpenCore will error and stop booting.")]),t._v(" "),e("p",[t._v("If you make any modifications, you can use the OC snapshot tool ("),e("strong",[t._v("Cmd/Ctrl + R")]),t._v(") in ProperTree to update the config.plist.")])]),t._v(" "),e("h2",{attrs:{id:"selecting-your-platform"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#selecting-your-platform"}},[t._v("#")]),t._v(" Selecting your platform")]),t._v(" "),e("p",[t._v("Now comes the important part, selecting the configuration path. Each platform has their own unique quirks that you need to account for so knowing your hardware is super important. See below for what to follow:")]),t._v(" "),e("h3",{attrs:{id:"intel-desktop"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#intel-desktop"}},[t._v("#")]),t._v(" Intel Desktop")]),t._v(" "),e("ul",[e("li",[t._v("Note: Intel's NUC series are considered mobile hardware, for these situations we recommend following the "),e("a",{attrs:{href:"#intel-laptop"}},[t._v("Intel Laptop Section")])])]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Code Name")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Series")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Release")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/penryn.html"}},[t._v("Yonah, Conroe and Penryn")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("E8XXX, Q9XXX, "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Yonah_(microprocessor)",target:"_blank",rel:"noopener noreferrer"}},[t._v("etc 1"),e("OutboundLink")],1),t._v(", "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Penryn_(microarchitecture)",target:"_blank",rel:"noopener noreferrer"}},[t._v("etc 2"),e("OutboundLink")],1)]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2006-2009 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/clarkdale.html"}},[t._v("Lynnfield and Clarkdale")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("5XX-8XX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2010 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/sandy-bridge.html"}},[t._v("Sandy Bridge")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2011 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/ivy-bridge.html"}},[t._v("Ivy Bridge")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("3XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2012 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/haswell.html"}},[t._v("Haswell")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("4XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2013-2014 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/skylake.html"}},[t._v("Skylake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("6XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2015-2016 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/kaby-lake.html"}},[t._v("Kaby Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2017 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/coffee-lake.html"}},[t._v("Coffee Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("8XXX-9XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2017-2019 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config.plist/comet-lake.html"}},[t._v("Comet Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("10XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2020 era")])])])]),t._v(" "),e("h3",{attrs:{id:"intel-laptop"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#intel-laptop"}},[t._v("#")]),t._v(" Intel Laptop")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Code Name")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Series")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Release")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/arrandale.html"}},[t._v("Clarksfield and Arrandale")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("3XX-9XX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2010 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/sandy-bridge.html"}},[t._v("Sandy Bridge")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2011 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/ivy-bridge.html"}},[t._v("Ivy Bridge")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("3XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2012 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/haswell.html"}},[t._v("Haswell")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("4XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2013-2014 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/broadwell.html"}},[t._v("Broadwell")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("5XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2014-2015 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/skylake.html"}},[t._v("Skylake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("6XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2015-2016 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/kaby-lake.html"}},[t._v("Kaby Lake and Amber Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2017 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/coffee-lake.html"}},[t._v("Coffee Lake and Whiskey Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("8XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2017-2018 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/coffee-lake-plus.html"}},[t._v("Coffee Lake Plus and Comet Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("9XXX-10XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2019-2020 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-laptop.plist/icelake.html"}},[t._v("Ice Lake")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("10XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2019-2020 era")])])])]),t._v(" "),e("h3",{attrs:{id:"intel-hedt"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#intel-hedt"}},[t._v("#")]),t._v(" Intel HEDT")]),t._v(" "),e("p",[t._v("This section includes both enthusiast and server based hardware.")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Code Name")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Series")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Release")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-HEDT/nehalem.html"}},[t._v("Nehalem and Westmere")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("9XX, X3XXX, X5XXX, "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)",target:"_blank",rel:"noopener noreferrer"}},[t._v("etc 1"),e("OutboundLink")],1),t._v(", "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Westmere_(microarchitecture)",target:"_blank",rel:"noopener noreferrer"}},[t._v("2"),e("OutboundLink")],1)]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2008-2010 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-HEDT/ivy-bridge-e.html"}},[t._v("Sandy/Ivy Bridge-E")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("3XXX, 4XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2011-2013 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-HEDT/haswell-e.html"}},[t._v("Haswell-E")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("5XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2014 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-HEDT/broadwell-e.html"}},[t._v("Broadwell-E")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("6XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2016 era")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/config-HEDT/skylake-x.html"}},[t._v("Skylake/Cascade Lake-X/W")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7XXX, 9XXX, 10XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2017-2019 era")])])])]),t._v(" "),e("h3",{attrs:{id:"amd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#amd"}},[t._v("#")]),t._v(" AMD")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Code Name")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Series")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Release")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/AMD/fx.html"}},[t._v("Bulldozer/Jaguar")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("a",{attrs:{href:"https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)",target:"_blank",rel:"noopener noreferrer"}},[t._v("It's weird"),e("OutboundLink")],1)]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("a",{attrs:{href:"https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)",target:"_blank",rel:"noopener noreferrer"}},[t._v("AMD was really bad with naming back then"),e("OutboundLink")],1)])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("RouterLink",{attrs:{to:"/AMD/zen.html"}},[t._v("Zen")])],1),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("1XXX, 2XXX, 3XXX, 5XXX")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("2017-2020 era")])])])]),t._v(" "),e("ul",[e("li",[t._v("Note: "),e("s",[t._v("Threadripper 3rd gen(39XX) are not supported, 1st and 2nd gen however are supported")]),t._v(" "),e("ul",[e("li",[t._v("Latest BIOS and OpenCore version has resolved this issue, all Threadripper platforms are now supported")])])])])])}),[],!1,null,null,null);e.default=i.exports}}]);