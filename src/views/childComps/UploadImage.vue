<template>
    <div >
        <div @click="imageClick">
             <el-image :src="imageSrc ? imageSrc : coverImage" style="width: 100px; height: 100px"  fit="cover"></el-image>
        </div>
        
         <el-dialog title="选择封面" :visible.sync="imageDialogVisible" width="50%">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="素材库" name="first">
                    <material-image ref="mater" :image-status="false" :bottom-status="false"></material-image>
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="second">
                    <input type="file" @change="imageChange" ref="file">
                    <div>
                        <el-image ref="img" :src="imgSrc" style="width: 100px; height: 100px"></el-image>
                    </div>
      
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="imageDialogVisible = false">取 消</el-button>
                <el-button :loading="loadingStatus" type="primary" @click="imageSubmit">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
import MaterialImage from 'components/content/MaterialImage'
import {submitImage} from 'network/image.js'
export default {
    name: 'UploadImage',
    components: {
        MaterialImage
    },
    props: ['coverImage'],
    data() {
        return {
            imageDialogVisible: false,
            activeName: 'first',
            fileObj: null,
            imageSrc: '',
            imgSrc: '',
            loadingStatus: false
        }
    },
    methods: {
        imageClick() {
            console.log('imageClick')
            this.imageDialogVisible = true
        },
        imageChange() {
            // console.log('change')
            this.fileObj = this.$refs.file.files[0]
           const imageSrc = window.URL.createObjectURL(this.fileObj)
        //    this.$refs.img.src = imageSrc
           this.imgSrc = imageSrc


           console.log(imageSrc);
           console.log(this.$refs.img.src);
        },
        imageSubmit() {
            this.loadingStatus = true
            if(this.activeName === 'second' && this.$refs.file.files[0]) {
                 const fd = new FormData()
                 console.log(this.fileObj);
                 fd.append('image',this.fileObj)
                console.log(fd)
                 submitImage(fd).then(res => {
                     console.log(res)
                     this.imageSrc = res.data.data.url
                    console.log(this.imageSrc)
                    this.imageDialogVisible = false
                    this.$emit('imageSubmit',this.imageSrc)
                    this.loadingStatus = true

                 })
            }else if(this.activeName === 'first') {
                
                const selected = this.$refs.mater.selectId
                console.log(this.$refs.mater.images[selected].url)
                if(!selected === null) {
                    this.$message('请选择封面')
                    return
                }
                console.log(this.fileObj)
                this.imageDialogVisible = false
                this.loadingStatus = false
                this.imageSrc = this.$refs.mater.images[selected].url
                // this.$emit('imageSubmit',this.$refs.mater.images[selected].url)
             
            
            }
           
        }
    }
}
</script>

<style scoped>
.el-image {
    border: 1px solid #000;
}
</style>