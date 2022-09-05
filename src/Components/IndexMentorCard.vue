<template>
    <div class="drop-shadow-2xl card">
        <div class="card-image" :style="backgroundImageInlineStyle">
        </div>
        <div class="card-bage flex flex-wrap content-center">
            <button @click="likeToggle" class="ml-1 w-3/4 bg-white rounded-full">
                <span class="ml-1 p-1 w-full flex ">
                <svg v-if="!mentor.like_from_current_user" xmlns="http://www.w3.org/2000/svg"
                     class="h-5 w-5 text-red-800"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <svg v-if="mentor.like_from_current_user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     fill="currentColor"
                     class="h-5 w-5 text-red-800">
                    <path
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                </svg>

                <span class="mx-auto">{{ mentor.likes }}</span>
            </span>
            </button>
            <span class="px-2 break-words">
                {{ mentor.city }} ({{ mentor.form }})
            </span>
        </div>
        <div class="card-body w-2/3 float-right">
            <h3 class="break-all text-2xl">{{ mentor.name }}</h3>
            <h4 class="">
                {{ mentor.direction }}
            </h4>
            <p class="break-words line-clamp-3">
                {{ mentor.info }}
            </p>
        </div>
        <div class="ml-14 mr-14">
            <span>{{ mentor.company }}</span> <br>
            <span class="text-sm truncate">Зарегистрирован(а) : {{ mentor.created_at }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "IndexMentorCard",
    props: {
        mentor: Object,
        status: Object,
    },
    computed: {
        backgroundImageInlineStyle() {
            return `background: url("${this.mentor.avatar}") no-repeat; background-size: cover; background-position: center;`;
        },
        queueStatus() {
            return this.status.id === 1 ? 'Вы в очереди' : 'Вы состоите в группе';
        }
    },
    methods: {
        likeToggle() {
            const mentorId = this.mentor.id;
            const likeToggle = this.mentor.like_from_current_user;
            this.$emit('like', {mentorId: mentorId, likeToggle: !likeToggle})
        }
    }
}
</script>

<style scoped>
.card {
    padding: 0;
    max-width: 320px;
    height: 400px;
    border-radius: 60px;
    background: #FFC5DE;
    position: relative;
}

.card-image {
    padding: 0;
    margin: 0;
    border-radius: 60px;
    width: 100%;
    height: 50%;
    /*background: url("https://i.picsum.photos/id/447/1280/853.jpg?hmac=4DUUCOsHRIoYbNrPRYEUHOW7wCjM7TROrTrYFivtdPw") no-repeat;*/
    background-size: cover;
}

.card-body {
    position: relative;
    /*width: 100%;*/
    height: 38%;
    padding: 5px;
    border-radius: 0 0 60px 0;
}

.card-bage {
    padding: 0;
    margin: 0;
    position: absolute;
    background: #FFD3E6;
    width: 100px;
    height: 200px;
    /*transform: rotate(90deg);*/
    border-radius: 0 100% 100% 0 / 0 50% 50% 0;
    /*left: -60px;*/
    bottom: 50px;
}
</style>
