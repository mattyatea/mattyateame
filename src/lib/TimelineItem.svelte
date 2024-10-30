<script>
    export let title;
    export let date;
    export let description;
</script>

<li class="mb-10 ms-6">
  <span class="absolute flex items-center justify-center w-6 h-6 bg-emerald-200 rounded-full -start-3 ring-8 ring-emerald-100 ">
    <svg class="w-2.5 h-2.5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </span>
    <h3 class="flex items-center mb-1 text-lg">
        {title}
    </h3>
    <time class="block mb-2 text-sm font-normal leading-none text-gray-700">{date}</time>
    {@html description}
</li>