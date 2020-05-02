<template>
    <div class="ProcessList">
        <h2>ProcessList</h2>
        <button @click="saves(file.content, file.fileName, 'txt')">Сохранить</button>
        <button>
            <label class="add-item" for="id-input-file-2" style="margin-bottom: 0">
                <input type="file" class="d-none" id="id-input-file-2"
                       value=""
                       accept=".txt"
                       @change.prevent="loadFile($event)">
                Загрузить
            </label>
        </button>
        <div>{{file}}</div>
    </div>
</template>

<script>
    export default {
        head: {
            title: 'PsyProcessor : Процессы'
        },
        name: "ProcessList",
        components: {},
        props: [],
        data() {
            return {
                file: null,
            }
        },
        computed: {},
        methods: {
            saves(data, filename, type) {
                let file = new Blob([data], {type: type});
                if (window.navigator.msSaveOrOpenBlob) // IE10+
                    window.navigator.msSaveOrOpenBlob(file, filename);
                else { // Others
                    let a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 0);
                }
            },
            loadFile(event) {
                console.log('processFile::event.target =', event.target);
                let file = event.target.files[0];
                console.log('processFile::event.target.files[0] =', file);
                let content;
                // if (file.text) {
                //     file.text().then(v => {
                //         console.log(v.toString());
                //
                //        content = v.toString();
                //         this.addTab({content, fileName: file.name});
                //     });
                // } else {
                //     content = file.toString();
                //     console.log('content =',content);
                //     this.addTab({content, fileName: file.name});
                // }

                let reader = new FileReader();
                reader.onload = () => {
                    content = reader.result;
                    console.log('content (FR) =', content);
                    this.file = {content, fileName: file.name};
                };
                reader.readAsText(file);
            },
        },
        mounted(){
        },
    }
</script>

<style lang="scss">
    .ProcessList {
        width: 100%;
        height: auto;
    }
</style>
