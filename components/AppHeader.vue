
import { NuxtLink } from '#build/components';
<template>
<header class="header p-10">
    <div class="container mx-auto grid-cols-12 px-4 grid">
        <div class="col-span-12">
            <ul class="flex gap-6 justify-center">
                <li class="text-sm text-black-500 hover:text-black-900 duration-300"><NuxtLink to="/">Home</NuxtLink></li>
                <li class="text-sm text-black-500 hover:text-black-900 duration-300"><NuxtLink to="/calculator">Calculator</NuxtLink></  li>
                <li class="text-sm text-black-500 hover:text-black-900 duration-300"><NuxtLink to="/">About</NuxtLink></  li>
                
            </ul>
        </div>
    </div>
</header>
</template>