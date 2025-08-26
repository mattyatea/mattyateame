<script lang="ts">
import TimelineItem from "./lib/TimelineItem.svelte";

const stacks = [{
    name: "HTML",
    star: 4,
},{
    name: "Javascript",
    star: 4,
},{
    name: "Vue.js",
    star: 4,
},{
    name: "Nuxt.js",
    star: 4,
},{
    name: "Svelte",
    star: 1,
},{
    name: "SvelteKit",
    star: 1,
},{
    name: "Node.js",
    star: 5,
},{
    name: "PHP",
    star: 1,
},{
    name: "PostgreSQL",
    star: 3,
},{
    name: "Redis",
    star: 3,
},{
    name: "Linux",
    star: 5,
},{
    name: "Kubernetes",
    star: 1,
},{
    name: "Cloudflare",
    star: 3,
}]

function getStarRating(star: number): string {
    const fullStar = '★';
    const emptyStar = '☆';
    return  fullStar.repeat(star)+emptyStar.repeat(5 - star);
}

</script>

<main>
    <div class="flex flex-col lg:w-9/12 w-full mx-auto">
            <div class="bg-gray-300 dark:bg-slate-500 p-4 rounded-2xl ">
                <div class="flex gap-x-4 flex-col sm:flex-row gap-y-4 sm:gap-x-8 sm:gap-y-0 items-center">
                    <img alt="まっちゃてぃー。のアイコン アニメ調の女の子の画像" src="https://mattyaski.co/avatar/@mattyatea" class="rounded-2xl w-48 h-48">
                    <div class="flex flex-col items-left dark:text-gray-200">
                        <span>名前：まっちゃてぃー。</span>
                        <span>生年月日：2008/07/03</span>
                    </div>
                </div>

            </div>

        <div class="flex flex-col w-full mt-4 bg-gray-300 dark:bg-slate-500 p-8 rounded-2xl">
            <h1 class="text-3xl">技術スタック</h1>

            <div class="my-2">
                <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(5)}</span> <br>他者にも教えることができます ✅</h1>
                <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(4)}</span> <br>大規模プロジェクトで活躍できます ✅</h1>
                <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(3)}</span> <br>小〜中規模のプロジェクトでなら活躍できます ✅</h1>
                <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(2)}</span> <br>基本的なことは理解している ✅</h1>
                <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(1)}</span> <br>チュートリアル ✅</h1>
            </div>

                {#each stacks as stack}
                    <div class="flex justify-between items-center text-base dark:text-gray-200">
                        <span>{stack.name}</span>
                        <span class="text-yellow-500">{getStarRating(stack.star)}</span>
                    </div>
                {/each}
        </div>

        <div class="flex flex-col w-full mt-4 bg-gray-300 dark:bg-slate-500 p-8 rounded-2xl">
            <ol class="relative border-s border-gray-200 ">
                <TimelineItem
                        title="nanasi-apps.xyz"
                        date="2021/11/06 ~ 現在"
                        description='<p class="text-base text-gray-800 dark:text-gray-200">私自身が知見を得たことを発信していくためのブログです。</p>'
                />

                <TimelineItem
                        title="mkey.nanasi-apps.xyz"
                        date="2022/05/06 ~ 2022/07/24"
                        description='
                        <p class="text-base text-gray-800 dark:text-gray-200">
                            サーバーに興味があったので、当時自分の中で流行っていた Misskey のサーバーを立てました。
                            <br>
                            この経験で、S3互換ファイルサーバーや、Linuxへの理解など、ここには書ききれないほどの知見を得ることができました。</p>'
                />

                <TimelineItem
                        title="mattyaski.co"
                        date="2022/12/24 ~ 現在"
                />

                <TimelineItem
                        title="PrisMisskey.space"
                        date="2023/09/24 ~ 現在"
                />

                <TimelineItem
                        title="Misskey-dev Member"
                        date="2023/10/19 ~ 現在"
                />

                <TimelineItem
                        title="S高等学校 - 入学"
                        date="2024/04/01 ~ 現在"
                />

                <TimelineItem
                        title="株式会社9ineverse - 執行役員"
                        date="2024/08/01 ~ 2025/08/01"
                />                
                <TimelineItem
                        title="株式会社****** - アルバイト"
                        date="2025/01/05 ~ 現在"
                        description='
                        <p class="text-base text-gray-800 dark:text-gray-200">
                            Vue.jsや、Java、Next.js等を用いた開発を行っています。
                        </p>'
                />
            </ol>

        </div>

        <div class="mx-auto">
            <p>Copyright © 2025 mattyatea All rights reserved. </p>
        </div>
    </div>
</main>

