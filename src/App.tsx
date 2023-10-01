import {useEffect, useState} from "react";
import {MdiGithub, MdiYoutube, SimpleIconsMisskey} from "./icons.tsx";

type StatsType = {
    originalNotesCount: number
    originalUsersCount: number
}

const fetchStats = async (host:string)=>{
    const res = await fetch(`https://${host}/api/stats`,{
        method: 'POST',
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" }
    })
    const json = await res.json()
    return json as StatsType
}

function Dekirukoto(){
    return (
        <div className="shadow-xl max-w-4xl container mx-auto rounded-lg my-4 bg-gray-900 flex flex-col ">
            <div className="px-4 pt-4">
                <h2 className="font-bold text-2xl">できること</h2>
            </div>
            <div className="flex flex-col p-4">

                <p>サーバーの運用</p>
                <p>サーバー、インフラの保守</p>
                <br/>

                <p>Cloudflare</p>
                <p>Azure</p>
                <p>Amazon Web Service</p>
                <p>Contabo</p>
                <p>Google Cloud Platform</p>
                <br/>

                <p>簡単なアプリ開発</p>
                <p>簡単なWebサイトの作成</p>
                <br/>

                <h2 className="text-xl">Frontend</h2>
                <p>Svelte</p>
                <p>Vue.js</p>
                <p>React</p>
                <p>Astro</p>
                <br/>

                <h2 className="text-xl">Backend</h2>
                <p>Node.js</p>
                <p>Javascript</p>
                <p>PHP</p>

                <br/>
                <h2 className="text-xl">etc..</h2>
                <p>Google Apps Script</p>
                <br/>
                <p>など...</p>
            </div>
        </div>
    )
}
function PC(){
    return (
        <div className="shadow-xl max-w-4xl container mx-auto rounded-lg mt-4 bg-gray-900 flex flex-col">
            <div className="px-4 pt-4">
                <h2 className="font-bold text-2xl">所有しているPC</h2>
            </div>
            <div className="flex flex-col p-4">
                <p className="text-xl">Raspberry Pi 4b</p>
                <p>CPU : Cortex-A72</p>
                <p>Memory : 4GB</p>
                <p>Storage : SSD 128GB (SATA To USB3.0)</p>
                <div className="divider my-2"></div>
                <p className="text-xl">CHUWI LarkBox X 2023 × 2</p>
                <p>CPU : Intel N100</p>
                <p>Memory : 12GB</p>
                <p>Storage : SSD 512GB</p>
            </div>
        </div>
    )
}
function Yattekita(){
    const [mattyaskiStats,setMattyaskiStats] = useState<StatsType>({
        originalNotesCount: 0,
        originalUsersCount: 0
    })
    const [PrisMisskeyStatus,setPrisMisskeyStatus] = useState<StatsType>({
        originalNotesCount: 0,
        originalUsersCount: 0
    })
    useEffect(()=>{
        const stat = async ()=>{
            setMattyaskiStats(await fetchStats('mattyaski.co'))
            setPrisMisskeyStatus(await fetchStats('prismisskey.space'))
        }
        stat()
    },[])
    return (
        <div className="shadow-xl max-w-4xl container mx-auto rounded-lg mt-4 bg-gray-900 flex flex-col">
            <div className="px-4 pt-4">
                <h2 className="font-bold text-2xl">やってきた・やったこと</h2>
            </div>
            <div className="flex-col p-4">
                <h2 className="text-2xl font-bold">gaku-tab-love.com の運用(閉鎖)</h2>
                <p>特定の層へ向けたMisskeyサーバーの運用</p>
                <p>ユーザー 650人</p>
                <p>総投稿数 約8万</p>
                <p>Misskeyサーバー 当時日本6位</p>
                <p>Raspberry Pi 4b 1台で運用</p>

                <div className="divider my-2"></div>

                <h2 className="text-2xl font-bold">mattyaski.co の運用</h2>
                <p>誰でも自由に をテーマとしたMisskeyサーバーの運用</p>
                <p>ユーザー数 {mattyaskiStats.originalUsersCount}人</p>
                <p>総投稿数 {mattyaskiStats.originalNotesCount}投稿</p>
                <p>Misskeyサーバー 日本12位 (2023/07/07現在)</p>

                <div className="divider my-2"></div>

                <h2 className="text-2xl font-bold">PrisMisskey.space の保守</h2>
                <p> 『Misskey発の文化発信』 をテーマとしたMisskeyサーバーの保守</p>
                <p>ユーザー数 {PrisMisskeyStatus.originalUsersCount}人</p>
                <p>総投稿数 {PrisMisskeyStatus.originalNotesCount}投稿</p>

                <div className="divider my-2"></div>
                <p className="text-2xl font-bold">他には</p>
                <p>Misskeyのホスティングサービスの提供</p>
                <p>DDoSの対応</p>
                <p>Grafanaを使ったサーバ監視</p>
                <p>など...</p>
            </div>
        </div>
    )
}
function MyProfile(){
    return (
        <div className="shadow-xl max-w-4xl container mx-auto rounded-lg mt-12 bg-gray-900 flex flex-col">
            <div className="flex px-4 pt-4">
                <div className="avatar">
                    <div className="w-16 rounded">
                        <img src="https://mattyaski.co/avatar/@mattyatea@mattyaski.co" />
                    </div>
                </div>
                <h2 className="text-2xl py-5 pl-3">まっちゃてぃー。</h2>
            </div>
            <div className="flex flex-col p-3">

                <p className="text-xl">生年月日：2008/07/03</p>
                <div className="flex gap-4 mt-2">
                    <a href="https://github.com/mattyatea"><MdiGithub className="h-8 w-8" /></a>
                    <a href="https://mattyaski.co"><SimpleIconsMisskey className="h-8 w-8" /></a>
                    <a href="https://nanasi-apps.xyz"><img src="https://files.mattyaski.co/null/18516dd1-c8a3-4f85-9473-d590dee2ea9a.png" className="h-8 w-8" /></a>
                    <a href="https://youtube.com/@mattyatea"><MdiYoutube className="h-8 w-8" /></a>
                </div>
            </div>
        </div>
    )
}
function App() {
  return (
      <>
          <MyProfile />
          <Yattekita />
          <PC />
          <Dekirukoto />
      </>
  )
}

export default App
