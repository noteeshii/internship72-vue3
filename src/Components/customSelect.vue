<template>
    <List_box class="w-full mb-5 md:mb-0 sm:w-1/2 md:w-1/3 lg:w-1/4" v-model="selectedDirection">
        <div class="relative">
            <List_boxButton
                class="shadow-lg bg-white border border-pink-200 w-full relative cursor-default rounded-full sm:rounded-r-none md:rounded-l-full
                        py-3 pl-3 pr-10 text-left sm:text-sm">
                <span class="block truncate">{{ selectedDirection }}</span>
                <span class="pointer-events-none absolute inset-y-0
                right-0 flex items-center pr-2">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </List_boxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <List_boxOptions class="shadow-lg absolute z-[999] mt-1 max-h-60 w-full
                        overflow-auto rounded-b-lg bg-white py-1 text-base
                         ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm">
                    <List_boxOption
                        v-slot="{ active, selected }"
                        v-for="direction in directions"
                        :key="direction.id"
                        :value="direction.name"
                        as="template">
                        <li :class="[active ? 'bg-pink-100 text-pink-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                        <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                            {{ direction.name }}
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
    <List_box class="w-full mb-20 md:mb-0 sm:w-1/2 md:w-1/3 lg:w-1/4" v-model="selectedForm">
        <div class="relative">
            <List_boxButton
                class="shadow-lg bg-white border border-pink-200 w-full relative cursor-default rounded-full sm:rounded-l-none md:rounded-none
                        py-3 pl-3 pr-10 text-left sm:text-sm">
                <span class="block truncate">{{ selectedForm }}</span>
                <span class="pointer-events-none absolute inset-y-0
                right-0 flex items-center pr-2">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </List_boxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <List_boxOptions class="shadow-lg absolute z-[999] mt-1 max-h-60 w-full
                        overflow-auto rounded-b-lg bg-white py-1 text-base
                         ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm">
                    <List_boxOption
                        v-slot="{ active, selected }"
                        v-for="form in forms"
                        :key="form.id"
                        :value="form.name"
                        as="template">
                        <li :class="[active ? 'bg-pink-100 text-pink-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                        <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                            {{ form.name }}
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
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {CheckIcon, SelectorIcon} from "@heroicons/vue/solid";

export default {
    name: "customSelect",
    components: {
        List_box: Listbox,
        List_boxButton: ListboxButton,
        List_boxOptions: ListboxOptions,
        List_boxOption: ListboxOption,
        CheckIcon,
        SelectorIcon
    },
    props: {
        selectedForm: String,
        selectedDirection: String,
        forms: Array,
        directions: Array
    },
    watch: {
        selectedForm() {
            this.$emit('update:selectedForm',this.selectedForm)
        },
        selectedDirection() {
            this.$emit('update:selectedDirection',this.selectedDirection)
        }
    }
}
</script>

<style scoped>

</style>
