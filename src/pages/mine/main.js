import Vue from 'vue'
import App from './mine'
import 'iview-mpvue/dist/components/card/style/css'
import 'iview-mpvue/dist/components/cell/style/css'
import 'iview-mpvue/dist/components/cell-group/style/css'
import 'iview-mpvue/dist/components/tag/style/css'
import "viewerjs/dist/viewer.css"

const app = new Vue(App)
app.$mount()