环境配置
1. 下载安装git bash
2. 下载安装maven
3. 下载安装myeclipse8.5（群共享里面有）
4. 下载代码，github页面：https://github.com/justinliucs/haflow
	git clone git@github.com:justinliucs/haflow.git
5. 将工程导入MyEclipse
	a 进入工程根目录，输入命令 mvn eclipse:eclipse,建立eclipse工程
	b 导入myeclipse或eclipse
	c 使用myeclipse插件部署到tomcat中 或者使用 mvn package命令打包成war文件手动部署到tomcat
	

如何阅读源码
1. 在工程里搜索demo.jsp，这个是项目的主页
	跟踪rOpenFlow(this)这个方法，查看整个项目工作原理。
	当在主页左侧导航树结构中右键，点击打开按钮时触发该rOpenFlow方法。
	
	大部分js函数在如下两个文件中实现：
	src/main/webapp/static/js/src.js
	src/main/webapp/static/dojolib/haflow/flow.js