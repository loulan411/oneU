'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from "react-i18next";

export default function Wallert() {
    const { t } = useTranslation()

    return (
        // <div className="text-[14px] px-[13px] py-[6px] mr-[10px] cursor-pointer border border-[#7f00ff] rounded-2xl"><ConnectButton/></div>
        <div className="text-[14px] px-[13px] py-[6px] mr-[10px] cursor-pointer">
            <ConnectButton
                label={t('connectWallet')}
                accountStatus="full"
                chainStatus="icon"
                showBalance={true}
            />
        </div>
    )
}