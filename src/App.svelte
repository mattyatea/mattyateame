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
    <div class="flex flex-col gap-y-4 md:w-2/4 mx-auto">
            <div class="bg-emerald-100 p-4 rounded-2xl shadow-[8px_12px_23px_-10px_#052E164d]">
                <h1 class="text-3xl">プロフィール</h1>
                <div class="flex gap-x-4 flex-col sm:flex-row gap-y-4 sm:gap-x-8 sm:gap-y-0 items-center">
                    <img alt="まっちゃてぃー。のアイコン アニメ調の女の子の画像" src="https://mattyaski.co/avatar/@mattyatea" class="rounded-2xl w-48 h-48">
                    <div class="flex flex-col items-left">
                        <span>名前：まっちゃてぃー。</span>
                        <span>生年月日：2008/07/03</span>
                        <span>株式会社9ineverse 執行役員</span>
                    </div>
                </div>

            </div>

        <div class="flex flex-col w-full mt-4 bg-emerald-100 p-8 rounded-2xl shadow-[8px_12px_23px_-10px_#052E164d]">
            <h1 class="text-3xl">技術スタック</h1>

            <div class="my-2">
                <h1 class="text-base mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(5)}</span> <br>他者にも教えることができます ✅</h1>
                <h1 class="text-base mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(4)}</span> <br>大規模プロジェクトで活躍できます ✅</h1>
                <h1 class="text-base mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(3)}</span> <br>小〜中規模のプロジェクトでなら活躍できます ✅</h1>
                <h1 class="text-base mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(2)}</span> <br>基本的なことは理解している ✅</h1>
                <h1 class="text-base mb-3 sm:text-xl"><span class="text-yellow-500">{getStarRating(1)}</span> <br>チュートリアル ✅</h1>
            </div>

                {#each stacks as stack}
                    <div class="flex justify-between items-center text-base">
                        <span>{stack.name}</span>
                        <span class="text-yellow-500">{getStarRating(stack.star)}</span>
                    </div>
                {/each}
        </div>

        <div class="flex flex-col w-full mt-4 bg-emerald-100 p-8 rounded-2xl shadow-[8px_12px_23px_-10px_#052E164d] c">
            <ol class="relative border-s border-gray-200 ">
                <TimelineItem
                        title="nanasi-apps.xyz"
                        date="2021/11/06 ~ 現在"
                        description='<p class="text-base text-gray-800">私自身が知見を得たことを発信していくためのブログです。</p>'
                />

                <TimelineItem
                        title="mkey.nanasi-apps.xyz"
                        date="2022/05/06 ~ 2022/07/24"
                        description='
                        <p class="text-base text-gray-800">
                            サーバーに興味があったので、当時自分の中で流行っていた Misskey のサーバーを立てました。
                            <br>
                            この経験で、S3互換ファイルサーバーや、Linuxへの理解など、ここには書ききれないほどの知見を得ることができました。</p>'
                />

                <TimelineItem
                        title="mattyaski.co"
                        date="2022/12/24 ~ 現在"
                        description='
                        <p class="text-base text-gray-800">

                        </p>'
                />

                <TimelineItem
                        title="PrisMisskey.space"
                        date="2023/09/24 ~ 現在"
                        description='
                        <p class="text-base text-gray-800">

                        </p>'
                />

                <TimelineItem
                        title="Misskey-dev Member"
                        date="2023/10/19 ~ 現在"
                        description='
                        <p class="text-base text-gray-800">

                        </p>'
                />

                <TimelineItem
                        title="S高等学校 - 入学"
                        date="2024/04/01 ~ 現在"
                        description='
                        <p class="text-base text-gray-800">

                        </p>'
                />

                <TimelineItem
                        title="株式会社9ineverse - 執行役員"
                        date="2024/08/01 ~ 現在"
                        description='
                        <p class="text-base text-gray-800">

                        </p>'
                />
            </ol>

        </div>

        <div class="mx-auto">
            <p>Copyright © 2024 mattyatea All rights reserved. </p>
        </div>
    </div>
</main>

<style>
</style>
