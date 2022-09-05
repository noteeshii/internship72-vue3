<template>
    <div class="card">
        <div class="card-image" :style="backgroundImageInlineStyle">
        </div>
        <div class="card-bage flex flex-wrap content-center items-center">
            <span class="p-1 bg-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {{data.mentor.likes}}
            </span>
            <span class="p-1">
                {{ data.mentor.city}} ({{data.mentor.form}})
            </span>
        </div>
        <div class="card-body">
            <h3 class="break-all text-2xl indent-32">{{data.mentor.name}}</h3>
            <h4 class="indent-28">
                {{ data.mentor.direction}}
            </h4>
            <p class="truncate">
                {{data.mentor.info}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "QueueMentorCard",
    props: {
        data: Array
    },
    computed: {
        backgroundImageInlineStyle () {
            return `background: url("${this.data.mentor.avatar}") no-repeat; background-size: cover; background-position: center;`;
        },
        queueStatus() {
            return this.data.status.id === 1 ? 'Вы в очереди' : 'Вы состоите в группе';
        }
    }
}
</script>

<style scoped>
.card {
    padding: 0;
    width: 320px;
    height: 400px;
    border-radius: 60px;
    background: #FFC5DE;
    position: relative;
}
.card-image {
    padding: 0;
    margin: 0;
    border-radius: 60px;
    width: 320px;
    height: 50%;
    /*background: url("https://i.picsum.photos/id/447/1280/853.jpg?hmac=4DUUCOsHRIoYbNrPRYEUHOW7wCjM7TROrTrYFivtdPw") no-repeat;*/
    background-size: cover;
}
.card-body {
    position: relative;
    width: 320px;
    height: 50%;
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
