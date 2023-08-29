const {
    description
} = require('../package')

module.exports = {
    title: 'OpenCore安装指南',
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        },]
    ],
    base: '/OpenCore-Install-Guide/',

    watch: {
        $page(newPage, oldPage) {
            if (newPage.key !== oldPage.key) {
                requestAnimationFrame(() => {
                    if (this.$route.hash) {
                        const element = document.getElementById(this.$route.hash.slice(1));

                        if (element && element.scrollIntoView) {
                            element.scrollIntoView();
                        }
                    }
                });
            }
        }
    },

    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-multimd-table'), {
                rowspan: true,
            });
        }
    },

    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/xuanxuan1231/OpenCore-Install-Guide',
        editLinks: true,
        editLinkText: '帮助我们改进此页！',
        logo: '/homepage.png',
        nav: [{
            text: 'Dortania指南翻译',
            items: [{
                text: '主页',
                link: 'https://xuanxuan1231.github.io/'
            },
            {
                text: 'ACPI入门',
                link: 'https://xuanxuan1231.github.io/Getting-Started-With-ACPI/'
            },
            {
                text: 'OpenCore安装后',
                link: 'https://xuanxuan1231.github.io/OpenCore-Post-Install/'
            },
            {
                text: 'OpenCore多重引导',
                link: 'https://xuanxuan1231.github.io/OpenCore-Multiboot/'
            },
            {
                text: '图形卡购买指南',
                link: 'https://xuanxuan1231.github.io/GPU-Buyers-Guide/'
            },
            {
                text: '无线网卡购买指南',
                link: 'https://xuanxuan1231.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: '购买踩坑指南',
                link: 'https://xuanxuan1231.github.io/Anti-Hackintosh-Buyers-Guide/'
            },
            ]
        },
        ],
        sidebar: [{
            title: '介绍',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                'prerequisites',
                'macos-limits',
                'find-hardware',
                'terminology',
                'why-oc',
            ]
        },
        {
            title: 'USB创建',
            collapsable: false,
            sidebarDepth: 2,
            children: [{
                title: '创建USB',
                collapsable: true,
                path: '/installer-guide/',
                sidebarDepth: 1,
                children: [
                    '/installer-guide/mac-install',
                    '/installer-guide/windows-install',
                    '/installer-guide/linux-install',
                ],
            },
                '/installer-guide/opencore-efi',
                'ktext',
            ['https://xuanxuan1231.github.io/Getting-Started-With-ACPI/', 'ACPI入门'],
                '/config.plist/',
            ]
        },
        {
            title: '配置',
            collapsable: false,
            children: [{
                title: 'Intel台式机config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/config.plist/penryn', 'Penryn'],
                    ['/config.plist/clarkdale', 'Clarkdale'],
                    ['/config.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config.plist/haswell', 'Haswell'],
                    ['/config.plist/skylake', 'Skylake'],
                    ['/config.plist/kaby-lake', 'Kaby Lake'],
                    ['/config.plist/coffee-lake', 'Coffee Lake'],
                    ['/config.plist/comet-lake', 'Comet Lake'],
                ]
            },
            {
                title: 'Intel笔记本config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/config-laptop.plist/arrandale', 'Arrandale'],
                    ['/config-laptop.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config-laptop.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config-laptop.plist/haswell', 'Haswell'],
                    ['/config-laptop.plist/broadwell', 'Broadwell'],
                    ['/config-laptop.plist/skylake', 'Skylake'],
                    ['/config-laptop.plist/kaby-lake', 'Kaby Lake'],
                    ['/config-laptop.plist/coffee-lake', 'Coffee Lake and Whiskey Lake'],
                    ['/config-laptop.plist/coffee-lake-plus', 'Coffee Lake Plus and Comet Lake'],
                    ['/config-laptop.plist/icelake', 'Ice Lake'],
                ]
            },
            {
                title: 'Intel HEDT config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    '/config-HEDT/nehalem',
                    '/config-HEDT/ivy-bridge-e',
                    '/config-HEDT/haswell-e',
                    '/config-HEDT/broadwell-e',
                    '/config-HEDT/skylake-x',
                ]
            },
            {
                title: 'AMD台式机config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    '/AMD/fx',
                    '/AMD/zen',
                ]
            },
            ['/config.plist/security', 'Apple安全启动']
            ]
        },
        {
            title: '安装',
            collapsable: false,
            children: [
                '/installation/installation-process',

            ]
        },
        {
            title: '排错',
            collapsable: false,
            children: [
                '/troubleshooting/troubleshooting',
                {
                    title: '',
                    collapsable: false,
                    children: [
                        '/troubleshooting/extended/opencore-issues',
                        '/troubleshooting/extended/kernel-issues',
                        '/troubleshooting/extended/userspace-issues',
                        '/troubleshooting/extended/post-issues',
                        '/troubleshooting/extended/misc-issues',

                    ]
                },
                '/troubleshooting/debug',
                '/troubleshooting/boot',
                '/troubleshooting/kernel-debugging',
            ]
        },
        {
            title: '安装后',
            collapsable: false,
            children: [
                ['https://xuanxuan1231.github.io/OpenCore-Post-Install/', '安装后'],
                {
                    title: '通用',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/security', '安全性和文件保险箱'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/audio', '修复音频'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/oc2hdd', '不用USB引导'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/update', '更新OpenCore，内核扩展和macOS'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/drm', '修复DRM'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/iservices', '修复i服务'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/pm', '修复电源管理'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/sleep', '修复睡眠'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/usb/', '修复USB'],
                    ]
                },
                {
                    title: '笔记本的特殊性',
                    collapsable: true,
                    children: [
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/laptop-specific/battery', '修复电池读数'],

                    ]
                },
                {
                    title: '美化',
                    collapsable: true,
                    children: [
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/cosmetic/verbose', '修复分辨率和啰嗦模式'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/cosmetic/gui', '添加GUI和引导铃声'],
                    ]
                },
                {
                    title: '多重引导',
                    collapsable: true,
                    children: [
                        ['https://xuanxuan1231.github.io/OpenCore-Multiboot/', 'OpenCore Multiboot'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/multiboot/bootstrap', '设置启动器选项'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/multiboot/bootcamp', '安装BootCamp'],
                    ]
                },
                {
                    title: '其他',
                    collapsable: true,
                    children: [
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/misc/rtc', '修复RTC'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/misc/msr-lock', '修复CFG锁'],
                        ['https://xuanxuan1231.github.io/OpenCore-Post-Install/misc/nvram', '模拟NVRAM'],
                    ]
                },
            ]
        },
        {
            title: 'Extras',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '/extras/kaslr-fix',
                '/extras/spoof',
                '/extras/ventura',
                ['https://github.com/xuanxuan1231/OpenCore-Install-Guide/tree/master/clover-conversion', 'Clover Conversion'],
                '/extras/smbios-support.md',
            ]
        },
        {
            title: 'Misc',
            collapsable: false,
            children: [
                'CONTRIBUTING',
                '/misc/credit',
            ]
        },
        ],
    },
    plugins: [
        '@vuepress/back-to-top',
        'vuepress-plugin-smooth-scroll',
        'vuepress-plugin-fulltext-search',
        ['@vuepress/medium-zoom',
            {
                selector: ".theme-succinct-content :not(a) > img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}