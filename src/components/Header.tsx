'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { Dropdown, Space, ConfigProvider, theme } from 'antd';
import Wallert from "./wallet";
import { DownOutlined } from '@ant-design/icons';


export default function Header() {
    const { t, i18n } = useTranslation()

    const pathname = usePathname()

    const navList = [
        { key: 'lottery', path: '/' },
        { key: 'referral', path: '/referral' },
        { key: 'tutorial', path: '/tutorial' },
    ];
    const communityMenu = [
        { name: 'Discord', logo: '/Image/Discord.png', link: 'https://discord.com/' },
        { name: 'Twitter', logo: '/Image/Twitter.png', link: 'https://x.com/' },
        { name: 'Github', logo: '/Image/Github.png', link: 'https://github.com/1ustd' },
    ]
    const items: MenuProps['items'] = communityMenu.map((item, index) => {
        return {
            key: `menu_${index}`,
            label: (
                <div className="flex flex-row" onClick={() => { window.open(item.link) }}>
                    <Image
                        className="w-[20px] h-[20px] cursor-pointer mr-[10px]"
                        src={item.logo}
                        alt={`${item.name} logo`}
                        width={20}
                        height={20}
                        priority
                    />
                    <span>{item.name}</span>
                </div>
            )
        }
    })

    const i18nItems: MenuProps['items'] = [
        { key: 'lng_zh', label: '简体中文' },
        { key: 'lng_en', label: 'English' },
    ]

    return (
        <div className="w-full bg-[#0b051a] h-[70px] flex flex-row justify-between px-[20px] relative border-b-1 border-slate-700">
            <div className="py-[25px]">
                <Image
                    className="w-[70px] h-[20px] cursor-pointer"
                    src="/Image/Logo.png"
                    alt="OneU logo"
                    width={70}
                    height={20}
                    priority
                />
            </div>
            <div className="flex flex-row max-md:hidden absolute left-[50%] translate-[-50%] top-[36px]">
                {
                    navList.map(({key, path}) => {
                        return  <Link
                                    className={`cursor-pointer h-full mx-[24px] text-[16px] font-bold flex items-center
                                        ${
                                            pathname === path ? 'text-[#a851ff]' : ''
                                        }
                                        `}
                                    href={path}
                                    key={key}
                                >
                                    {t(key)}
                                </Link>
                    })
                }
            <ConfigProvider
                theme={{
                algorithm: theme.darkAlgorithm, // 可选：暗色用 theme.darkAlgorithm
                }}
            >
                <Dropdown menu={{ items }} className="cursor-pointer h-full mx-[24px] text-[16px] font-bold flex items-center">
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {t('community')}
                        <DownOutlined/>
                    </Space>
                    </a>
                </Dropdown>
            </ConfigProvider>
                
            </div>
            <div className="flex flex-row items-center">
                <Wallert />
                <div className="cursor-pointer w-[22px] h-[22px]">
                   <div className="max-md:hidden">
                        {/* 国际化 */}
                        <ConfigProvider
                            theme={{
                                algorithm: theme.darkAlgorithm, // 可选：暗色用 theme.darkAlgorithm
                            }}
                        >
                            <Dropdown menu={{
                                items: i18nItems,
                                onClick: ({ key }) => {
                                    if (key === 'lng_en') i18n.changeLanguage('en');
                                    if (key === 'lng_zh') i18n.changeLanguage('zh');
                                }
                            }}>
                                <Space>
                                    <Image
                                        className=" w-[20px] h-[20px]"
                                        src="/Image/in18Logo.png"
                                        alt="in18Logo"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                </Space>
                            </Dropdown>
                        </ConfigProvider>
                   </div>
                    {/* 菜单 */}
                    <Image
                        className="md:hidden w-[20px] h-[20px]"
                        src="/Image/menu.png"
                        alt="in18Logo"
                        width={20}
                        height={20}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
