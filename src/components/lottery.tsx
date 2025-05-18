'use client';

import { useEffect,useState } from "react"
import { Select, ConfigProvider, theme, Progress } from 'antd';
import contractABI from "../../public/ABI.json"
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { formatUnits } from "ethers";
import dayjs from 'dayjs';


export default function Lottery(props: any) {
    const [roundSelect, setRoundSelect] = useState<any | null>(null);
    const {
        writeContract,
        data: writeData,
        isPending,
        isSuccess,
        error
    } = useWriteContract();


    const [lotteryInfo, setLotteryInfo] = useState<any | null>(null);
    const { data, isError, isLoading }: any = useReadContract({
        address: "0x6Ea249D3087F64472e689036648416c3FF685FBa",
        abi: contractABI,
        functionName: 'getPoolInfo',
        args: [props.lotteryPath],
    });

    const {
        data: roundInfoData,
        isError: roundInfoError,
        isLoading: roundInfoLoading,
        refetch: refetchRoundInfo
    }: any = useReadContract({
        address: "0x6Ea249D3087F64472e689036648416c3FF685FBa",
        abi: contractABI,
        functionName: 'getRoundInfo',
        args: roundSelect !== null ? [props.lotteryPath, roundSelect] : [],
        query: {
            enabled: roundSelect !== null
        }
    });

    const [roundList, setRoundList] = useState<any | null>([]);

    useEffect(() => {
        console.log(data, isError)
        if (data && !isError) {
            const formattedData = {
                prize: Number(formatUnits(data[0], 6)).toLocaleString(), // 显示为 "1,000"
                totalTickets: Number(data[1]),
                pricePerTicket: Number(formatUnits(data[2], 6)).toLocaleString(),
                roundDuration: Number(data[3]),
                roundGapTime: Number(data[4]),
                currentRound: Number(data[5])
            };
            console.log(formattedData)
            setRoundList(Array.from({ length: formattedData.currentRound }).map((_: any, index: any) => {
                return { value: index + 1, label: index + 1 }
            }))
            setLotteryInfo(formattedData);
            setRoundSelect(formattedData.currentRound)
            // refetchRoundInfo()
        }
    }, [data, isError]);


    const [roundInfo, setRoundInfo] = useState<any | null>(null);
    const [countDown, setCountdown] = useState<any | null>(null);
    useEffect(() => {
       if(roundInfoData && !roundInfoError) {
        console.log(roundInfoData)
        setRoundInfo({
            nextRoundTime:  dayjs((Number(roundInfoData[1]) * 1000 + lotteryInfo.roundGapTime * 1000)).format('YYYY-MM-DD HH:mm:ss'),
            currentRoundEndStart: dayjs(Number(roundInfoData[0]) * 1000).format('YYYY-MM-DD HH:mm:ss'),
            currentRoundEndTime: dayjs(Number(roundInfoData[1]) * 1000).format('YYYY-MM-DD HH:mm:ss'),
            leftTickets: Number(roundInfoData[2])
        })
        // 结束时间倒计时
        const interval = setInterval(() => {
            const diffInSeconds = dayjs(Number(roundInfoData[1]) * 1000).diff(dayjs(), 'second'); // 总秒数

            const h = Math.floor(diffInSeconds / 3600);
            const m = Math.floor((diffInSeconds % 3600) / 60);
            const s = diffInSeconds % 60;

            setCountdown(`${h}小时 ${m}分钟 ${s}秒`);
        }, 1000);

        return () => clearInterval(interval);

       }
    }, [roundInfoData, roundInfoError])

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setRoundSelect(value)
    };





    async function buyLottery () {
        console.log(123)
        await writeContract({
            abi: contractABI,
            address: "0x6Ea249D3087F64472e689036648416c3FF685FBa",
            functionName: 'buyTickets',
            args: [props.lotteryPath, 2, []],
        })
        console.log(writeData, error, isPending, isSuccess)
    }


    return (
        <div>

            { lotteryInfo && roundInfo && 
            <div className="bg-[#1a1725] w-full h-[180px] mt-[20px] rounded-2xl relative p-[24px]">
                {/* {props.lotteryPath} */}
                    <div className="w-[72px] h-[24px] absolute top-0 right-0">
                        等待开始
                        {/* 等待开奖 */}
                        {/* 进行中 */}
                        {/* 已结束 */}
                    </div>

                    <div className="flex flex-row items-center">
                        <div>  
                            <span className='smFont mr-[10px]'>轮次</span>
                            <ConfigProvider
                                theme={{
                                    algorithm: theme.darkAlgorithm,
                                }}
                            >
                                <Select
                                    size="small"
                                    defaultValue={lotteryInfo.currentRound}
                                    style={{ width: 80, borderRadius: "50%" }}
                                    onChange={handleChange}
                                    options={roundList}
                                />
                            </ConfigProvider>
                        </div>
                        <div className='smFont ml-[25px]'>下一轮开始时间：{roundInfo.nextRoundTime}</div>
                    </div>

                    <div className='flex flex-row mt-[20px] justify-between'>

                        <div className='flex flex-col'>
                            <div className='smFont'>奖池</div>
                            <div className="text-[30px] text-[#51AF95] font-bold">{lotteryInfo.prize}</div>
                            <div className="MFont">=0.</div>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <div className='MFont'>{roundInfo.currentRoundEndTime}</div>
                            <div className='smFont'>结束时间</div>
                            <div className='MFont'>待开奖</div>
                            <div className='smFont'>中奖号码</div>
                        </div>

                        <div className='flex flex-col w-4/10 justify-between'>
                            <div className='flex flex-row justify-between'>
                                <div className='text-[#a39fad] text-[14px]'>只需 1 USDT 即可赢取{lotteryInfo.prize} USDT奖励</div>
                                <div className='text-[#a39fad] text-[14px]'>奖池ID</div>
                            </div>
                            <div>
                                <Progress
                                    percent={ Math.floor((lotteryInfo.totalTickets - roundInfo.leftTickets) / lotteryInfo.totalTickets * 100) }
                                    percentPosition={{ align: 'end', type: 'inner' }}
                                    size={['100%', 15]}
                                    strokeColor="#ab2cf8"
                                    trailColor="#3a245c"
                                />
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className='text-[#f4f3f9] text-[14px]'>已购买票数：{lotteryInfo.totalTickets - roundInfo.leftTickets}</div>
                                <div className='text-[#f4f3f9] text-[14px]'>总票数：{lotteryInfo.totalTickets}</div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between items-center'>
                            <div onClick={buyLottery} className='bg-[#8c25f7] w-40 px-[5px] py-[8px] rounded-2xl flex justify-center items-center'>购买彩票</div>
                            <div className='text-[#f4f3f9] text-[14px]'>结束时间：{countDown}</div>
                        </div>

                    </div>

            </div> 
        }


        </div>
    )
}