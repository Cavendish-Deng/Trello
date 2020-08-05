# 在线任务管理 Web App

由于作者能力有限，无法将应用部署上线，在这里只展示开发版本

* 前端：使用了 Vue，Vue Router，Vuex

  * 项目目录结构

    ![5f619688d1dbb22c9494a5defb93138](https://i.loli.net/2020/08/05/xHGEzRKcoJvrSXd.png)

    ![a13cb5ec7a1415286c99c822d23ba10](https://i.loli.net/2020/08/05/zYrKL65t2Eucqeb.png)

    说明：

    1. api：放置向后端请求资源的接口

    2. assets：静态资源（图片，CSS）放在这里

    3. components：主要存放功能组件

    4. filters：放置一些负责格式化数据的函数

    5. router：放置路由配置文件

    6. views：放置路由组件的目录

    7. store：每个页面对应的状态 module

    8. App.js：应用的跟组件

    9. main.js：整个应用的入口文件

    10. 通过配置 vue.config.js 来配置 webpack，使用代理，解决浏览器跨域问题

        ![image-20200805173334365](https://i.loli.net/2020/08/05/y7hgHvxe9OXpoMj.png)

    11. 将 Message 组件挂载到 Vue 的原型链上，可以在全局使用，供所有组件使用。

        ![image-20200805174904113](https://i.loli.net/2020/08/05/mPqE3k1zgMbilZG.png)

* 后端：使用了 Koa，TypeScript，MySQL，Sequelize

  * 项目目录结构

    ![image-20200805173641942](https://i.loli.net/2020/08/05/pawiBmYVCN7JQ8S.png)

    说明：

    1. Sequelize：`Sequelize` 是一个基于 `Node.js` 的 `ORM` 库，用对象来表达关系，通过实例对象的语法，完成关系型数据库的操作的技术，简单来说，就是像操作对象一样去操作数据库，而不是 `SQL` 语句。

