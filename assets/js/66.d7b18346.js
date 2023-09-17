(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{431:function(t,e,o){t.exports=o.p+"assets/img/good-efi.cdd27487.png"},432:function(t,e,o){t.exports=o.p+"assets/img/bad-efi.3a816e2e.png"},615:function(t,e,o){"use strict";o.r(e);var n=o(10),a=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"installation-process"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installation-process"}},[t._v("#")]),t._v(" Installation Process")]),t._v(" "),e("p",[t._v("Now that you've finished setting up OpenCore, you're finally able to boot, main things to keep in mind:")]),t._v(" "),e("ul",[e("li",[t._v("Enable BIOS settings optimal for macOS")]),t._v(" "),e("li",[t._v("Read up on the "),e("a",{attrs:{href:"https://dortania.github.io/OpenCore-Multiboot/",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCore Multiboot Guide"),e("OutboundLink")],1),t._v(" as well as "),e("a",{attrs:{href:"https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap",target:"_blank",rel:"noopener noreferrer"}},[t._v("Setting up LauncherOption"),e("OutboundLink")],1),t._v(" "),e("ul",[e("li",[t._v("Mainly relevant for those running a single drive for multiple OSes")])])]),t._v(" "),e("li",[t._v("And a copy of the "),e("RouterLink",{attrs:{to:"/troubleshooting/troubleshooting.html"}},[t._v("General Troubleshooting")]),t._v(" page")],1),t._v(" "),e("li",[t._v("Read up on the "),e("RouterLink",{attrs:{to:"/troubleshooting/boot.html"}},[t._v("macOS Boot Process")]),t._v(" "),e("ul",[e("li",[t._v("Can help first time installers better understand where they may be getting stuck")])])],1),t._v(" "),e("li",[t._v("And a ton of patience")])]),t._v(" "),e("h2",{attrs:{id:"double-checking-your-work"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#double-checking-your-work"}},[t._v("#")]),t._v(" Double checking your work")]),t._v(" "),e("p",[t._v("One last thing we should go over before booting is how your EFI is setup:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("Good EFI")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("Bad EFI")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:o(431),alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:o(432),alt:""}})])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("EFI folder found on EFI partition")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("EFI folder missing")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("ACPI Files are compiled(.aml)")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("ACPI Files are not compiled(.dsl)")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("DSDT is not included")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("* DSDT is included")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("Removed unneeded Drivers(.efi)")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("Leaves default Drivers")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("Removed unneeded Tools(.efi)")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("Leaves default Tools")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("All files in the Kexts folder end in .kext")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("Includes source code and folders")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("config.plist found under EFI/OC")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("Neither renamed or placed the .plist in right location")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("Only uses kexts that are needed")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("Downloaded every kext listed")])])])]),t._v(" "),e("h2",{attrs:{id:"booting-the-opencore-usb"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#booting-the-opencore-usb"}},[t._v("#")]),t._v(" Booting the OpenCore USB")]),t._v(" "),e("p",[t._v("So you're now ready to finally put the USB stick into your computer and boot off of it. Remember that most laptops and some desktops will still default to the internal drive with Windows, and you'll need to manually select OpenCore in the BIOS boot options. You'll need to check in the user manual or use a bit of google to find out what Fn key accesses the BIOS and boot menu(ie. Esc, F2, F10 or F12)")]),t._v(" "),e("p",[t._v("Once you boot the USB, you'll likely be greeted to the following boot options:")]),t._v(" "),e("ol",[e("li",[t._v("Windows")]),t._v(" "),e("li",[t._v("macOS Base System (External) / Install macOS Big Sur (External) / "),e("em",[t._v("USB drive name")]),t._v(" (External)")]),t._v(" "),e("li",[t._v("OpenShell.efi")]),t._v(" "),e("li",[t._v("Reset NVRAM")])]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),e("p",[t._v("You might need to press space in order to see the installer, as in later versions of OpenCore "),e("code",[t._v("HideAuxiliary")]),t._v(" is enabled by default.")])]),t._v(" "),e("p",[t._v("For us, "),e("strong",[t._v("Option 2.")]),t._v(" is the one we want. Depending how the installer was made, it may report as either "),e("strong",[t._v('"macOS Base System (External)"')]),t._v(", "),e("strong",[t._v('"Install macOS Big Sur (External)"')]),t._v(" or "),e("strong",[t._v('"'),e("em",[t._v("Your USB drive's name")]),t._v(' (External)"')])]),t._v(" "),e("h2",{attrs:{id:"macos-installer"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#macos-installer"}},[t._v("#")]),t._v(" macOS Installer")]),t._v(" "),e("p",[t._v("So you've finally got the installer booted, got through the verbose and hit the installer! Now that you've gotten this far,  the main things to keep in mind:")]),t._v(" "),e("ul",[e("li",[t._v("Drives you wish to install macOS on "),e("strong",[t._v("must")]),t._v(" be both of GUID partition Scheme "),e("strong",[t._v("and")]),t._v(" APFS\n"),e("ul",[e("li",[t._v("High Sierra on HDD and all Sierra users will need to use macOS Journaled(HFS+)")])])]),t._v(" "),e("li",[t._v("The drive "),e("strong",[t._v("must")]),t._v(" also have a 200MB partition\n"),e("ul",[e("li",[t._v("By default, macOS will setup freshly formatted drives with 200MB")]),t._v(" "),e("li",[t._v("See the "),e("a",{attrs:{href:"https://dortania.github.io/OpenCore-Multiboot/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Multiboot Guide"),e("OutboundLink")],1),t._v(" for more info on partitioning a Windows Drive")])])])]),t._v(" "),e("p",[t._v('Once you start the installation, you will want to wait until the system restarts. You will once again want to boot into OpenCore, but rather than selecting your USB installer/recovery - you will want to select the macOS installer on the hard drive to continue installation. You should get an apple logo, and after a few minutes you should get a timer at the bottom saying "x minutes remaining". This may be a good time to get a drink or snack as this will take a while. It may restart a couple more times, but if all goes well, it should finally plop you at the "Setup your Mac screen"')]),t._v(" "),e("p",[t._v("You're in! 🎉\nYou will want to go through the Post-Installation pages to finish setting up your system.")])])}),[],!1,null,null,null);e.default=a.exports}}]);