'use client'

import "../i18n/config"
import Image from "next/image";
import { useTranslation } from "react-i18next";
import contractABI from "../../public/ABI.json"
import { useAccount, useReadContract } from 'wagmi';
import Lottery from "@/components/lottery";
import { useState, useEffect } from "react";

export default function Home() {

  const { t } = useTranslation()
  const { address, isConnected, connector } = useAccount();

  const [lotteryList, setLotteryList] = useState<any[]>([]);

  const { data, isError, isLoading } = useReadContract({
    address: "0x6Ea249D3087F64472e689036648416c3FF685FBa",
    abi: contractABI,
    functionName: 'getAllPoolIds',
  });
  useEffect(() => {
    if (data) {
      setLotteryList(data);
    }
  }, [data]);

  return (
    <div className="w-full bg-[url('/Image/banner1.png')] bg-no-repeat bg-top bg-[length:680px]">
      <div className="pt-[100px] w-full bg-[url('/Image/banner2.png')] bg-no-repeat bg-[length:100%]">

        <div className="w-full text-center">
          <div className="text-[48px] font-bold">{t('title')}</div>
          <div className="mt-[10px]">{t('des')}</div>
        </div>

        <div className="flex flex-row mx-[10px] my-[80px]">
          <div className="w-[33%] flex flex-col items-center">
            <Image
                className="w-[64px] h-[57px]"
                src="/Image/code.png"
                alt="code"
                width={64}
                height={57}
                priority
            />
            <div className="text-[16px] font-bold mt-[15px]">{t('Lottery_title')}</div>
            <div className="text-[#827f92] text-[14px] mt-[8px]">{t('Lottery_des')}</div>
          </div>
          <div className="w-[33%] flex flex-col items-center">
            <Image
                className="w-[64px] h-[57px]"
                src="/Image/code.png"
                alt="code"
                width={64}
                height={57}
                priority
            />
            <div className="text-[16px] font-bold mt-[15px]">{t('tamper_title')}</div>
            <div className="text-[#827f92] text-[14px] mt-[8px]">{t('tamper_des')}</div>
          </div>
          <div className="w-[33%] flex flex-col items-center">
            <Image
                className="w-[64px] h-[57px]"
                src="/Image/code.png"
                alt="code"
                width={64}
                height={57}
                priority
            />
            <div className="text-[16px] font-bold mt-[15px]">{t('fair_title')}</div>
            <div className="text-[#827f92] text-[14px] mt-[8px]">{t('fair_Dec')}</div>
          </div>
        </div>


        <div className="h-auto p-[30px] border-1 border-slate-700 rounded-2xl mx-[80px]">
            {
              lotteryList.map((item,index) => {
                return (
                  <Lottery key={item} lotteryPath={item} />
                )
              })
            }
        </div>

      </div>
    </div>
  );
}
