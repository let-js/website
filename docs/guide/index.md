## 介绍
### Letjs 是什么？
Letjs是一套前端工程化体系设计方案，结合领域驱动设计思想，希望能够通过合理的层级划分，通用的逻辑抽象和组件复用，解决前端工程初始化层级拆分的困扰及项目后续迭代维护过程中逐渐变得臃肿难以维护的问题。
#### 关于工程初始化
当我们初始化前端工程时，我们在考虑什么？
- 项目层级怎么划分更合理，后续维护不混乱。
- 前端轮子这么多，到底我该怎么选？
- 各种规范，配置太麻烦，怎样才能更全面？

解决上述问题Letjs通过项目组多年的实践和沉淀，总结出一套相对合理的结构设计划分，并引入领域设计概念，更好地解决业务层和展现层分离，避免单独的view层文件动辄几百行的现象，使后续维护更加清晰明了。具体的分层结构划分及各层级的书写规范将在后续文章详细阐述。

同时Letjs采用最新的Vue3的技术生态搭建，[Vue3](https://vuejs.org/)，[Vite](https://vitejs.dev/),[Vue-Router4](https://router.vuejs.org/),[Pinia](https://pinia.vuejs.org/),[Naive UI](https://www.naiveui.com/)或[Element-Plus UI](https://element-plus.gitee.io/zh-CN/),解决大家选型的困扰。

最后Letjs配置了基础的代码规范，git提交规范，比较通用的项目配置等，真正达到开箱即用，功能齐全。
#### 设计思想
letjs参考[DDD](https://en.wikipedia.org/wiki/Domain-driven_design)（Domain Driven Design）领域驱动设计，在前端也抽象出业务的领域，这样使得开发中更加关注业务理解，对后续设计更加高效。同时将视图层和业务层完全解耦，在业务迭代过程中，即使业务不断复杂膨胀，视图更加专注于页面展现，领域专注于业务模型，从而避免后续迭代过程中对整个前端工程复杂度的失控。领域驱动设计是一种思想，Letjs也取其适合前端项目的业务抽象，沉淀出前端项目的domain层。

同时letjs在整体层级升级上也会借鉴经典的MVC、MVP、MVVM等设计思想，在组件划分上同样会结合AKF立方体设计理念。letjs相关设计思想详见：[Letjs设计思想白皮书](https://github.com/let-js/docs/blob/master/letjs-whitepaper.md)

### Letjs的目标
#### 和各种cli工具有啥不一样？
各种cli工具，仅仅是简单的初始化，并不会有基础的技术选型，规范约束，以及分层结构设计。Letjs希望能够真正提供给开发者一个开箱即用，并为后续业务迭代，项目不断复杂提供一个合理的结构划分。
### 和各种admin项目又有啥区别？
层出不穷的各种admin工程项目，更加专注于比较通用化的页面示例，更加像一个开发样例模板集合。Letjs也会提供一些通用的样例参考，但更加专注于如何解决前端项目工程化体系的设计，解决如何将视图和业务真正解耦，减少后续维护不下去的尴尬局面。

## 快速上手

::: warning 前提条件
letjs 需要 [Node.js](https://nodejs.org/en/) >= 16
:::

本部分会帮助你从头搭建一个简单的 letjs 工程。

### 安装 letjs-cli

letjs-cli 是一个简单的命令行工具，用于构建基于letjs的脚手架项目，支持选择项目模板，UI框架。

```sh
$ npm install -g @let-js/letjs-cli
```

### letjs 命令介绍

```
$ letjs

Usage: letjs <command> [options]

Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  init [options] <app-name>  create a new project powered by letjs
  help [command]             display help for command

Run letjs <command> --help for detailed usage of given command.
```

### 使用示例

```sh
# 初始化工程
letjs init demp-app
# 选择框架
? please select framework: (Use arrow keys)
❯ vue 
# 选择 ts 还是 es 版本
? please select template: (Use arrow keys)
❯ letjs 
  letjs-ts 
# 选择 UI 库
? please select UI: (Use arrow keys)
❯ naive-ui 
  element-plus 
# 补充一些基本信息
? what's your name? 
? please enter version? 1.0.0
? please enter description.

# 进入创建工程目录，安装NPM依赖，然后启动demo页面
cd demp-app
npm install
npm run dev

# 根据提示访问页面，看到欢迎页表示成功

# 编译/打包项目代码
npm run build
```

## 项目结构设计

### 整体结构

```ts
|-- src
    |-- App.vue
    |-- main.ts
    |-- api                              // api后端请求接口集合，按照业务场景划分
    |-- assets
    |-- components                       // 全局公用组件，例如layout
    |-- composition                      // 全局公用composition
    |-- config                           // 相关枚举和常量
    |-- domain                           // 领域层，根据业务逻辑进行相关抽象的业务类，和前端展现解耦
    |-- libs                             // 引用的并需要结合业务修改的第三方库等，例如md5js
    |-- pages                            // 业务场景复杂时，可按展现划分模块并增加对应模块的components文件夹
    |-- router                           // 业务复杂场景时，可按照模块划分增加文件夹
    |-- services                         // 业务逻辑处理层，对后端数据的转换，展现逻辑处理等。Service更关注于展现
    |-- stores
    |-- styles
    |-- utils                            // 全局公共方法，如通用请求封装
```
### Domain
Letjs引入领域驱动的设计理念，划分Domain层，从具体业务场景抽象出发，划定领域。和一般的视图驱动不同，domain层的的边界确认更加关注具体的业务场景。页面的变更是常态化的，而业务的底层逻辑一般是比较稳定的，这样在业务迭代的过程中，页面的改变并不会太多影响到领域这一层的改变，使得我们真正做到视图和逻辑解耦。

Domain层是业务的核心层，也是你的项目的核心代码，它并不会因为你使用的前端框架，UI库，页面逻辑，或调用的接口是GraphQL抑或Restful而变更。是对整个项目的业务逻辑的抽象。

具体业务场景举例，在音视频项目场景下，可能你的Domain定义的是节目或专辑，Domain中包括节目应该包含哪些属性，比如频道，名称，描述，演员等等。同时也需要包含它本身的方法，是否满足发布状态等。而Domain不需要关注页面上需要展示节目的哪些信息，不同页面展示的形式，这些都和核心业务无关都属于视图逻辑，需要在View层做相应处理。

领域模型可以是贫血模式，简单的属性集合，在使用的时候创建实例，方便处理逻辑的时候获取各种属性，流转的时候有相应的提示和限制。
例如：

```js

export class User {
  userId: number
  userName: string
  gender: number
  role: RoleType
  constructor(user: User) {
    this.userId = user.userId
    this.userName = user.userName
    this.gender = user.gender
    this.role = user.role
  }
  static createEmptyUser(): User {
    const user = new User({
      userId: 0,
      userName: '',
      gender: 0,
      role: 'user',
    })
    return user
  }
}

```
同时，领域模型也可以是充血模式，在复杂逻辑抽象的过程中，可能简单属性聚合并不能很好的表示当前业务模型，可以适当的增加业务领域模型自身的业务处理方法，内聚的一些业务逻辑抽象。
例如
```js
// 对一个视频节目的抽象
type Channel = 'movie' | 'series' | 'anime' | 'variety' | 'documentary' ｜ 'other'
export class VideoProgram {
  id: number
  title: string
  type: VideoType
  channel: Channel
  album: Album // 省略对专辑类型Album的描述
  // 此处省略相关属性
  constructor(program: VideoProgram) {
    this.id = program.id
    this.title = program.title
    this.type = program.type
    this.channel = program.channel
    this.album = program.album
    //此处省略相关属性
  }
  // 
  get produceStatus() {
    return produceStatusMap[this.status] // 此处status只做说明，并未在对象中生命此属性
  }
  // 复杂的业务逻辑处理，但也是领域模型的对应方法
  canPutOnline(): boolean {
    // 这里需要判断视频的生产状态，审核状态等等来决定是否可以将视频上线
    // 在修改上线状态的时候，需要前置判断
    ......
    // return true | false
  }
}
```

### Service
Service业务处理层，Service层处理来自Api层的数据，同时调用相关领域模型，并提供给View层使用。前后端的领域设计从业务层面上不一定是相同的，需要从自身需求考虑。从后端获取的数据，在Service层需要转换为前端的领域模型，并做相应的数据转换。View层需要的数据，可能来自多个领域整合，这部分工作就需要放在Service进行处理，Service面向View层负责，View层需要的数据在Service处理转换后，拿到View层可以直接使用，或仅做一些简单处理。

Service层面可以对应处理多个Api，多个Domain。Service的划分尽量贴近View层，但如果页面比较复杂，可以拆分多个Service，分别处理视图不同区域或不同模块的逻辑。

例如：
```js
import videoApi from '@/api/video'
import albumApi from '@/api/album'
// 最简单的方式就是直接调用api获取相应的数据
export async function getList() {
  const res = await videoApi.getlist()
  return res.data
}
// 对返回的数据进行相应的转换或处理
export async function getFormatList() {
    const list = await videoApi.getlist()
    list.map((item) => {
        // 做一些数据的转换或整合
    })
    return list
}
// 同时可以对多个API进行整合
export async function getVideoInfo(vid: number) {
    const basicInfo = await videoApi.getBasicInfo(vid)
    const albumInfo = await albumApi.getAlbumByVideoId(vid)
    const statusInfo = await videoApi.getVideoStatus(vid)
    const res = // 此处整合桑格接口信息并整体返回
    return res
}
```
### Api
Api层顾名思义，主要调用外部接口获取数据。这一层功能比较单一，主要就是按照外部提供的接口进行划分，并通过这一层进行调用，并将结果暴露出去。乍一看可能这一层有些多余，完全可以在Service里面甚至页面直接调用。但试想，当业务足够复杂的情况下，我们需要在Service层组织外部数据，进行多个接口返回数据的整合。同时，当接口数量不断增加，统一的维护，对后续的改动迭代会带来极大的便利。

例如；
```js
import { request } from '@/common/utils/useRequest'
// 此处requst为封装的request请求
export function getList() {
  return request({
    method: 'GET',
    url: '/api/video/list',
  })
}

```

### Composition
这个文件夹使用过Vue3.0的应该都不会陌生，就是对应的Vue中composition api的概念。为了避免View层的臃肿，页面的可复用逻辑，放在composition中更加合理，同时可以在多个页面进行服用。
举例说明，每个列表页都需要关心如何分页，如何初始化列表，如何更新列表等功能，可以抽取useTable将这些复用逻辑封装。除此，当页面视图逻辑过于复杂，可以把复杂的视图逻辑放在composition中，让View层更加简洁清晰，更方便后期维护。比如，处理Srevise中的业务逻辑数据转换的同时，调用Store进行相应数据更新的操作等。

例如
```js
// 关于列表的方法整合
function useTable() {
    const setPageSize = function(size) {
        // 设置pageSize
    }
    const setPage = function(page) {
        // 初始化列表Page对象
    }
    const initPageSort = function(options) {
        // 初始化列表排序
    }
    const setQuery = function(query) {
        // 设置查询项
    }
    const resetQuery = function() {
        // 情况查询项
    }
    // ......
    return {
        setPage,
        setPageSize,
        initPageSort,
        setQuery,
        resetQuery,
        .....
    }
    export { useTable }
}
```

### Pages
视图（View）层，简单讲就是对应的Vue文件。当项目不复杂的时候，页面级别的文件可以直接放在Pages下，并创建Components文件夹来存放各页面的组件。当项目足够复杂的时候，可以拆分模块，在Pages下建立模块，每个模块下对应存放相应的页面并可在模块下增加components文件夹存放模块下对应的组件。

在这一层，视图层面的逻辑，交互的操作等会写在这里，但当页面过于复杂时，建议将视图逻辑封装并转入composition。这样会让你的页面简洁清晰，在后期维护的时候一目了然，各方法都做了什么。

### Components
Components在一级目录下，主要存放一些公共的全局组件，比如layouts，header，footer之类。也可以是全局多模块公用的组件比如日历选择组件，截图上传组件等。

在Pages下的Components模块，主要是模块或者页面级别的组件。这里建议区分容器组件和视图组件，对React比较了解的可能会比较熟悉这个概念 Container Components 和 Presentational Components。

容器组件（Container Components）主要关注的是页面的逻辑，数据的流转。容器组件是有状态的，会和Store交互做数据处理，也会调用Service处理业务逻辑等。所有视图组件的数据都由容器组件提供，同时会对视图组件抛出来的事件做相应的响应。

```js
<template>
  <div class="container">
    <MyForm :data="formData" @change="changeQuery" />
    <MyContralBar :config="controlConfig.value" />
    <MyTable :data="tableData.value" @page-change="changePage" />
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue'
import { MyForm, MyContralBar, MyTable } from 'components/listComponents'
import { getList } from '../api/listApi'

const formData = reactive({})
const tableData = reactive({})
// .......省略部分代码
onBeforeMount(async () => {
  tableData = await getList()
})

async function changeQuery() {
  tableData = await getList(formData)
}
// .......省略部分代码
</script>
```

视图组件（Presentational Components）建议只关注展现，不依赖外部。比如不会去依赖Store的数据，不会依赖具体Service的业务数据处理等。视图组件的数据都是从上级组件通过props传入，和外部通过事件进行反馈。视图组件通常没有具体状态。

```javascript
// MyForm.vue
<template>
  <div class="query-form">
    <el-form :model="formData">
      <el-form-item>
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      // 省略相关代码
    </el-form>
    <el-form-item>
      <el-button @click="search">搜索</el-button>
    </el-form-item>
  </div>
</template>
<script setup>

defineProps({
  formData: Object
  // 省略相关代码
})
const emit = defineEmits(['change'])
function search() {
  emit('change')
}
</script>
```

### Store
这个大家就比较熟悉了，主要存放一些组件之间或全局共享数据。此处提下当前letjs使用的是Pinia状态管理，相比较Vuex的优点这里不再赘述。只强调在使用过程中，Pinia不再是全局数据中心，它支持多个store，是扁平化结构，所以在使用过程中负担也不会那么大。一个模块甚至也个页面可以使用单独属于自己的store，更加灵活放方便。

```js
export const useAbcStore = defineStore('abc', {
  state: () => ({
    a: 0,
    b: 'abc',
    c: true
  }),
  getters: {
    doubleA() {
      return this.a * 2
    },  
  },
  actions: {
    changeC(bool) {
      this.c = bool
    },
    updateB(name) {
      this.b = this.c ? name | this.b
    }
  },
})
```

### Config
这个文件夹，主要存放一些静态的配置，常量，枚举等。在其他的脚手架模版中，可能会存在Constants, Enums等结构。Config类似此功鞥，将所有这些配置都集中存放。
```js
export enum Type {
  Movie,
  Series,
  Comic,
  Variety,
}

export const START_NUM = 5

export const Role = {
  admin: '管理员',
  editor: '编辑',
  developer: '开发',
  operator: '运营',
  user: '普通用户',
}
```

### Utils
在Utils中我们一般存放一些纯函数公共方法，和业务不相关。这个文件夹理论上在任何其他项目中也可以使用。例如生成uuid的方法，时间格式化方法等。
```js
export const convertNum = (num) => {
  return Number(num.toFixed(2))
}
```

### Libs
这里建议存放一些后续可能独立成npm包的一些方法，或者封装的第三方库。比如某种加密方法，或者对MD5类似方法的封装以满足业务需求。

## 相关示例
针对letjs的工程结构划分，有几个简单的示例可以参考；
- [商城示例](https://github.com/let-js/examples/tree/master/letjs-xmall)
- 音乐网站示例(即将推出)
- 简单的admin(即将推出)
