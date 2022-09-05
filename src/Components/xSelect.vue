<template>
    <List_box class="w-full mb-5 md:mb-0 " v-model="selected">
        <div class="relative ">
            <List_boxButton
                class="shadow-lg bg-white border border-pink-200 w-full relative cursor-default rounded-full
                        py-3 pl-3 pr-10 text-left sm:text-sm">
                <span class="block truncate">{{ selected.name }}</span>
                <span class="pointer-events-none absolute inset-y-0
                right-0 flex items-center pr-2">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </span>
            </List_boxButton>
            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">

                <List_boxOptions
                    class="shadow-lg absolute z-[999] mt-1
                        max-h-44 overflow-auto w-full
                        rounded-b-lg bg-white py-1 text-base
                         ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm">
                    <div v-if="slot" class="p-2 flex">
                        <slot></slot>
                    </div>
                    <List_boxOption
                        v-slot="{ active, selected }"
                        v-for="option in options"
                        :key="option.id"
                        :value="option"
                        as="template">
                        <li :class="[active ? 'bg-pink-100 text-pink-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                        <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                            {{ option.name }}
                        </span>
                            <span v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                            <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                        </span>
                        </li>
                    </List_boxOption>
                </List_boxOptions>
            </transition>
        </div>
    </List_box>
</template>

<script>
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {CheckIcon, SelectorIcon} from "@heroicons/vue/solid";

export default {
    name: "xSelect",
    components: {
        List_box: Listbox,
        List_boxButton: ListboxButton,
        List_boxOptions: ListboxOptions,
        List_boxOption: ListboxOption,
        CheckIcon,
        SelectorIcon
    },
    props: {
        options: {required: true},
        selected: {required: false},
        slot: {required: false}
    },
    watch: {
        selected() {
            this.$emit('update:selected', this.selected)
        }
    }
}
</script>

<style scoped>

</style>
