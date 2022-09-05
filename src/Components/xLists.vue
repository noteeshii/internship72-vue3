<template>
    <List_box class="w-1/4" @change="$emit('update:modelValue',selected)" v-model="selected">
        <div class="">
            <List_boxButton
                class="custom-select w-full relative cursor-default rounded-r-full
                        py-3 pl-3 pr-10 text-left sm:text-sm">
                <span class="block truncate">{{ selected }}</span>
                <span class="pointer-events-none absolute inset-y-0
                right-0 flex items-center pr-2">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </List_boxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <List_boxOptions class="absolute mt-1 max-h-60 w-1/4
                        overflow-auto rounded-b-lg bg-white py-1 text-base
                         ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm">
                    <List_boxOption
                        v-slot="{ active, selected }"
                        v-for="item in dataList"
                        :key="item.id"
                        :value="item.name"
                        as="template">
                        <li :class="[active ? 'bg-pink-100 text-pink-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                        <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                            {{ item.name }}
                        </span>
                            <span v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                        </li>
                    </List_boxOption>
                </List_boxOptions>
            </transition>
        </div>
    </List_box>
</template>

<script>
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export default {
    name: "xLists",
    components: {
        List_box: Listbox,
        List_boxButton: ListboxButton,
        List_boxOptions: ListboxOptions,
        List_boxOption: ListboxOption,
        CheckIcon, SelectorIcon
    },
    props: {
        dataList: Array,
        modelValue: String
    },
    data() {
        return {
            selected: ''
        }
    }
}
</script>

<style scoped>

</style>
